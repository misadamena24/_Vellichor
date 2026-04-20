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

$libraryId = trim($_GET['libraryId'] ?? '');
if ($libraryId === '') {
    echo json_encode(["success" => false, "message" => "Library ID is required."]);
    exit;
}

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$loans = readJsonFile("../data/loans.json");
$ratings = readJsonFile("../data/ratings.json");

$bookMap = [];
foreach ($books as $book) {
    $bookMap[(int) ($book['id'] ?? 0)] = $book;
}

$currentMember = null;
foreach ($users as $user) {
    if (($user['libraryId'] ?? '') === $libraryId && ($user['role'] ?? '') === 'member') {
        $currentMember = $user;
        break;
    }
}

if (!$currentMember) {
    echo json_encode(["success" => false, "message" => "Member not found."]);
    exit;
}

$memberId = (int) ($currentMember['id'] ?? 0);
$booksReadCount = 0;
$booksBorrowedCount = 0;

foreach ($loans as $loan) {
    if ((int) ($loan['userId'] ?? 0) !== $memberId) {
        continue;
    }

    if (!empty($loan['returned'])) {
        $booksReadCount += 1;
    } else {
        $booksBorrowedCount += 1;
    }
}

$memberRatings = [];
foreach ($ratings as $rating) {
    if ((int) ($rating['userId'] ?? 0) !== $memberId) {
        continue;
    }

    $bookId = (int) ($rating['bookId'] ?? 0);
    $book = $bookMap[$bookId] ?? [];

    $memberRatings[] = [
        "ratingId" => (int) ($rating['id'] ?? 0),
        "bookId" => $bookId,
        "bookName" => $book['name'] ?? 'Unknown Book',
        "author" => $book['author'] ?? 'Unknown',
        "rating" => (int) ($rating['rating'] ?? 0),
        "comment" => trim((string) ($rating['comment'] ?? ''))
    ];
}

usort($memberRatings, function ($a, $b) {
    return ((int) ($b['ratingId'] ?? 0)) - ((int) ($a['ratingId'] ?? 0));
});

$displayName = trim((string) ($currentMember['name'] ?? '') . ' ' . (string) ($currentMember['surname'] ?? ''));
if ($displayName === '') {
    $displayName = (string) ($currentMember['username'] ?? 'Member');
}

echo json_encode([
    "success" => true,
    "member" => [
        "id" => $memberId,
        "libraryId" => (string) ($currentMember['libraryId'] ?? ''),
        "name" => (string) ($currentMember['name'] ?? ''),
        "surname" => (string) ($currentMember['surname'] ?? ''),
        "displayName" => $displayName,
        "username" => (string) ($currentMember['username'] ?? ''),
        "email" => (string) ($currentMember['email'] ?? ''),
        "bio" => trim((string) ($currentMember['bio'] ?? '')),
        "booksReadCount" => $booksReadCount,
        "booksBorrowedCount" => $booksBorrowedCount,
        "ratingsCount" => count($memberRatings)
    ],
    "ratings" => $memberRatings
]);
?>
