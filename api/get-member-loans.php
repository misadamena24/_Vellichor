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

$result = [];
foreach ($loans as $loan) {
    if ((int) ($loan['userId'] ?? 0) !== $memberId) {
        continue;
    }

    if (!empty($loan['returned'])) {
        continue;
    }

    $bookId = (int) ($loan['bookId'] ?? 0);
    $book = $bookMap[$bookId] ?? null;
    if (!$book) {
        continue;
    }

    $result[] = [
        "loanId" => (int) ($loan['id'] ?? 0),
        "bookId" => $bookId,
        "name" => $book['name'] ?? 'Unknown Book',
        "author" => $book['author'] ?? 'Unknown',
        "year" => $book['year'] ?? '',
        "genre" => $book['genre'] ?? '',
        "description" => $book['description'] ?? '',
        "dueDate" => $loan['dueDate'] ?? '',
        "returnRequested" => !empty($loan['returnRequested'])
    ];
}

echo json_encode($result);
?>
