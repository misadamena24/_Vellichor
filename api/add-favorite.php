<?php
header('Content-Type: application/json');

$usersPath = "../data/users.json";
$booksPath = "../data/books.json";
$favoritesPath = "../data/favorites.json";

$libraryId = trim($_POST['libraryId'] ?? '');
$bookId = (int) ($_POST['bookId'] ?? 0);

if ($libraryId === '' || $bookId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$users = file_exists($usersPath) ? json_decode(file_get_contents($usersPath), true) : [];
$books = file_exists($booksPath) ? json_decode(file_get_contents($booksPath), true) : [];
$favorites = file_exists($favoritesPath) ? json_decode(file_get_contents($favoritesPath), true) : [];

if (!is_array($users) || !is_array($books)) {
    echo json_encode([
        "success" => false,
        "message" => "Could not load data."
    ]);
    exit;
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
        "success" => false,
        "message" => "Member not found."
    ]);
    exit;
}

$bookFound = false;
foreach ($books as $book) {
    if (($book['id'] ?? 0) == $bookId) {
        $bookFound = true;
        break;
    }
}

if (!$bookFound) {
    echo json_encode([
        "success" => false,
        "message" => "Book not found."
    ]);
    exit;
}

foreach ($favorites as $favorite) {
    if (($favorite['bookId'] ?? 0) == $bookId && ($favorite['userId'] ?? 0) == ($member['id'] ?? 0)) {
        echo json_encode([
            "success" => false,
            "message" => "This book is already in favorites."
        ]);
        exit;
    }
}

$nextFavoriteId = 1;
foreach ($favorites as $favorite) {
    if (($favorite['id'] ?? 0) >= $nextFavoriteId) {
        $nextFavoriteId = $favorite['id'] + 1;
    }
}

$favorites[] = [
    "id" => $nextFavoriteId,
    "bookId" => $bookId,
    "userId" => $member['id']
];

file_put_contents($favoritesPath, json_encode($favorites, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    "success" => true,
    "message" => "Book added to favorites."
]);
?>
