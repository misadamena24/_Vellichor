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
    echo json_encode([]);
    exit;
}

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$loans = readJsonFile("../data/loans.json");
$ratings = readJsonFile("../data/ratings.json");

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

$memberId = (int) ($member['id'] ?? 0);

$bookMap = [];
foreach ($books as $book) {
    $bookMap[(int) ($book['id'] ?? 0)] = $book;
}

$memberRatings = [];
foreach ($ratings as $rating) {
    if ((int) ($rating['userId'] ?? 0) === $memberId) {
        $memberRatings[(int) ($rating['bookId'] ?? 0)] = $rating;
    }
}

$rateableBooks = [];
$addedBooks = [];

foreach ($loans as $loan) {
    if ((int) ($loan['userId'] ?? 0) !== $memberId) {
        continue;
    }

    if (empty($loan['returned'])) {
        continue;
    }

    $bookId = (int) ($loan['bookId'] ?? 0);

    if (isset($addedBooks[$bookId])) {
        continue;
    }

    if (!isset($bookMap[$bookId])) {
        continue;
    }

    if (isset($memberRatings[$bookId])) {
        continue;
    }

    $book = $bookMap[$bookId];

    $rateableBooks[] = $book;
    $addedBooks[$bookId] = true;
}

echo json_encode($rateableBooks);
?>
