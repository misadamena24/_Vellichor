<?php
header('Content-Type: application/json');

function readJsonFile($path) {
    if (!file_exists($path)) {
        return [];
    }

    $content = file_get_contents($path);
    $data = json_decode($content, true);

    return is_array($data) ? $data : [];
}

$libraryId = trim($_POST['libraryId'] ?? '');
$bookId = (int) ($_POST['bookId'] ?? 0);
$rating = (int) ($_POST['rating'] ?? 0);
$comment = trim($_POST['comment'] ?? '');

if ($libraryId === '' || $bookId <= 0 || $rating < 1 || $rating > 5) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid rating data."
    ]);
    exit;
}

$usersPath = "../data/users.json";
$booksPath = "../data/books.json";
$loansPath = "../data/loans.json";
$ratingsPath = "../data/ratings.json";

$users = readJsonFile($usersPath);
$books = readJsonFile($booksPath);
$loans = readJsonFile($loansPath);
$ratings = readJsonFile($ratingsPath);

$member = null;
foreach ($users as $user) {
    if (($user['libraryId'] ?? '') === $libraryId) {
        $member = $user;
        break;
    }
}

if (!$member) {
    echo json_encode([
        "success" => false,
        "message" => "Member not found."
    ]);
    exit;
}

$memberId = (int) ($member['id'] ?? 0);

$bookExists = false;
foreach ($books as $book) {
    if ((int) ($book['id'] ?? 0) === $bookId) {
        $bookExists = true;
        break;
    }
}

if (!$bookExists) {
    echo json_encode([
        "success" => false,
        "message" => "Book not found."
    ]);
    exit;
}

$hasReturnedBook = false;
foreach ($loans as $loan) {
    if (
        (int) ($loan['userId'] ?? 0) === $memberId &&
        (int) ($loan['bookId'] ?? 0) === $bookId &&
        !empty($loan['returned'])
    ) {
        $hasReturnedBook = true;
        break;
    }
}

if (!$hasReturnedBook) {
    echo json_encode([
        "success" => false,
        "message" => "You can only rate books you already returned."
    ]);
    exit;
}

foreach ($ratings as $existingRating) {
    if (
        (int) ($existingRating['userId'] ?? 0) === $memberId &&
        (int) ($existingRating['bookId'] ?? 0) === $bookId
    ) {
        echo json_encode([
            "success" => false,
            "message" => "You already rated this book."
        ]);
        exit;
    }
}

$nextRatingId = 1;
foreach ($ratings as $existingRating) {
    if ((int) ($existingRating['id'] ?? 0) >= $nextRatingId) {
        $nextRatingId = (int) $existingRating['id'] + 1;
    }
}

$ratings[] = [
    "id" => $nextRatingId,
    "userId" => $memberId,
    "bookId" => $bookId,
    "rating" => $rating,
    "comment" => $comment
];

file_put_contents($ratingsPath, json_encode($ratings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    "success" => true,
    "message" => "Rating submitted successfully."
]);
?>
