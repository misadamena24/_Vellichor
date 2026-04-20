<?php
// API endpoint: get member books
// TODO: implement logic to return books borrowed by a member
<?php
header('Content-Type: application/json');

$booksPath = "../data/books.json";
$usersPath = "../data/users.json";
$loansPath = "../data/loans.json";
$waitlistPath = "../data/waitlist.json";
$favoritesPath = "../data/favorites.json";

$libraryId = trim($_GET['libraryId'] ?? '');

if ($libraryId === '') {
    echo json_encode([]);
    exit;
}

$books = file_exists($booksPath) ? json_decode(file_get_contents($booksPath), true) : [];
$users = file_exists($usersPath) ? json_decode(file_get_contents($usersPath), true) : [];
$loans = file_exists($loansPath) ? json_decode(file_get_contents($loansPath), true) : [];
$waitlist = file_exists($waitlistPath) ? json_decode(file_get_contents($waitlistPath), true) : [];
$favorites = file_exists($favoritesPath) ? json_decode(file_get_contents($favoritesPath), true) : [];

if (!is_array($books)) {
    $books = [];
}

if (!is_array($users)) {
    $users = [];
}

if (!is_array($loans)) {
    $loans = [];
}

if (!is_array($waitlist)) {
    $waitlist = [];
}

if (!is_array($favorites)) {
    $favorites = [];
}

$member = null;

foreach ($users as $user) {
    if (($user['libraryId'] ?? '') === $libraryId) {
        $member = $user;
        break;
    }
}

if (!$member) {
    echo json_encode([]);
    exit;
}

$memberId = $member['id'];

foreach ($books as &$book) {
    $bookId = $book['id'] ?? 0;

    $book['favorited'] = false;
    $book['waitlisted'] = false;
    $book['borrowedByMember'] = false;

    foreach ($favorites as $favorite) {
        if (($favorite['bookId'] ?? 0) == $bookId && ($favorite['userId'] ?? 0) == $memberId) {
            $book['favorited'] = true;
            break;
        }
    }

    foreach ($waitlist as $entry) {
        if (($entry['bookId'] ?? 0) == $bookId && ($entry['userId'] ?? 0) == $memberId) {
            $book['waitlisted'] = true;
            break;
        }
    }

    foreach ($loans as $loan) {
        if (($loan['bookId'] ?? 0) == $bookId && ($loan['userId'] ?? 0) == $memberId && !($loan['returned'] ?? false)) {
            $book['borrowedByMember'] = true;
            break;
        }
    }
}
unset($book);

echo json_encode($books);
?>
