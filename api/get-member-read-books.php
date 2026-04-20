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
    echo json_encode([
        "count" => 0,
        "books" => []
    ]);
    exit;
}

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$loans = readJsonFile("../data/loans.json");

$member = null;
foreach ($users as $user) {
    if (($user['libraryId'] ?? '') === $libraryId) {
        $member = $user;
        break;
    }
}

if (!$member) {
    echo json_encode([
        "count" => 0,
        "books" => []
    ]);
    exit;
}

$memberId = (int) ($member['id'] ?? 0);

$bookMap = [];
foreach ($books as $book) {
    $bookId = (int) ($book['id'] ?? 0);
    if ($bookId > 0) {
        $bookMap[$bookId] = $book;
    }
}

$readBookIds = [];
$readBooks = [];

foreach ($loans as $loan) {
    if ((int) ($loan['userId'] ?? 0) !== $memberId) {
        continue;
    }

    if (empty($loan['returned'])) {
        continue;
    }

    $bookId = (int) ($loan['bookId'] ?? 0);
    if ($bookId <= 0 || isset($readBookIds[$bookId]) || !isset($bookMap[$bookId])) {
        continue;
    }

    $book = $bookMap[$bookId];
    $readBooks[] = [
        "id" => $bookId,
        "name" => (string) ($book['name'] ?? 'Unknown Book'),
        "author" => (string) ($book['author'] ?? 'Unknown'),
        "year" => (string) ($book['year'] ?? ''),
        "genre" => (string) ($book['genre'] ?? '')
    ];
    $readBookIds[$bookId] = true;
}

usort($readBooks, function ($a, $b) {
    return strcmp((string) ($a['name'] ?? ''), (string) ($b['name'] ?? ''));
});

echo json_encode([
    "count" => count($readBooks),
    "books" => $readBooks
]);
?>
