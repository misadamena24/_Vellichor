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

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$loans = readJsonFile("../data/loans.json");

$userMap = [];
foreach ($users as $user) {
    $userMap[$user['id']] = [
        "name" => trim(($user['name'] ?? '') . ' ' . ($user['surname'] ?? '')),
        "libraryId" => $user['libraryId'] ?? ''
    ];
}

$bookMap = [];
foreach ($books as $book) {
    $bookMap[$book['id']] = $book['name'] ?? 'Unknown Book';
}

$result = [];

foreach ($loans as $loan) {
    if (empty($loan['returnRequested']) || !empty($loan['returned'])) {
        continue;
    }

    $userId = $loan['userId'] ?? 0;
    $bookId = $loan['bookId'] ?? 0;

    $result[] = [
        "loanId" => $loan['id'] ?? 0,
        "memberName" => $userMap[$userId]['name'] ?? 'Unknown Member',
        "libraryId" => $userMap[$userId]['libraryId'] ?? '',
        "bookName" => $bookMap[$bookId] ?? 'Unknown Book',
        "dueDate" => $loan['dueDate'] ?? ''
    ];
}

echo json_encode($result);
?>
