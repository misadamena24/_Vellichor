<?php
header('Content-Type: application/json');

$booksPath = "../data/books.json";
$usersPath = "../data/users.json";
$waitlistPath = "../data/waitlist.json";
$favoritesPath = "../data/favorites.json";

$libraryId = trim($_GET['libraryId'] ?? '');

if ($libraryId === '') {
    echo json_encode([
        "favorites" => [],
        "waitlist" => []
    ]);
    exit;
}

$books = file_exists($booksPath) ? json_decode(file_get_contents($booksPath), true) : [];
$users = file_exists($usersPath) ? json_decode(file_get_contents($usersPath), true) : [];
$waitlist = file_exists($waitlistPath) ? json_decode(file_get_contents($waitlistPath), true) : [];
$favorites = file_exists($favoritesPath) ? json_decode(file_get_contents($favoritesPath), true) : [];

if (!is_array($books)) {
    $books = [];
}

if (!is_array($users)) {
    $users = [];
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
    echo json_encode([
        "favorites" => [],
        "waitlist" => []
    ]);
    exit;
}

$memberId = $member['id'];
$favoriteBooks = [];
$waitlistBooks = [];

foreach ($favorites as $favorite) {
    if (($favorite['userId'] ?? 0) == $memberId) {
        foreach ($books as $book) {
            if (($book['id'] ?? 0) == ($favorite['bookId'] ?? 0)) {
                $favoriteBooks[] = $book;
                break;
            }
        }
    }
}

foreach ($waitlist as $entry) {
    if (($entry['userId'] ?? 0) == $memberId) {
        foreach ($books as $book) {
            if (($book['id'] ?? 0) == ($entry['bookId'] ?? 0)) {
                $waitlistBooks[] = $book;
                break;
            }
        }
    }
}

echo json_encode([
    "favorites" => $favoriteBooks,
    "waitlist" => $waitlistBooks
]);
?>
