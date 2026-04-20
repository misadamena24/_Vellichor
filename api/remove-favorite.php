<?php
header('Content-Type: application/json');

$usersPath = "../data/users.json";
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
$favorites = file_exists($favoritesPath) ? json_decode(file_get_contents($favoritesPath), true) : [];

if (!is_array($users) || !is_array($favorites)) {
    echo json_encode([
        "success" => false,
        "message" => "Could not load data."
    ]);
    exit;
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

$memberId = (int) ($member['id'] ?? 0);
$removed = false;
$filtered = [];

foreach ($favorites as $favorite) {
    $isTarget = ((int) ($favorite['bookId'] ?? 0) === $bookId)
        && ((int) ($favorite['userId'] ?? 0) === $memberId);

    if ($isTarget) {
        $removed = true;
        continue;
    }

    $filtered[] = $favorite;
}

if (!$removed) {
    echo json_encode([
        "success" => false,
        "message" => "This book is not in favorites."
    ]);
    exit;
}

file_put_contents($favoritesPath, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    "success" => true,
    "message" => "Book removed from favorites."
]);
?>
