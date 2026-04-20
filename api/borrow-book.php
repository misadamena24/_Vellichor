<?php
// API endpoint: borrow a book
// TODO: implement borrow book logic
<?php
header('Content-Type: application/json');
date_default_timezone_set('Europe/Tirane');

$booksPath = "../data/books.json";
$usersPath = "../data/users.json";
$loansPath = "../data/loans.json";

$libraryId = trim($_POST['libraryId'] ?? '');
$bookId = (int) ($_POST['bookId'] ?? 0);

if ($libraryId === '' || $bookId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$books = file_exists($booksPath) ? json_decode(file_get_contents($booksPath), true) : [];
$users = file_exists($usersPath) ? json_decode(file_get_contents($usersPath), true) : [];
$loans = file_exists($loansPath) ? json_decode(file_get_contents($loansPath), true) : [];

if (!is_array($books) || !is_array($users) || !is_array($loans)) {
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

$bookIndex = -1;
foreach ($books as $index => $book) {
    if (($book['id'] ?? 0) == $bookId) {
        $bookIndex = $index;
        break;
    }
}

if ($bookIndex === -1) {
    echo json_encode([
        "success" => false,
        "message" => "Book not found."
    ]);
    exit;
}

if (!($books[$bookIndex]['available'] ?? false)) {
    echo json_encode([
        "success" => false,
        "message" => "This book is already borrowed."
    ]);
    exit;
}

foreach ($loans as $loan) {
    if (($loan['bookId'] ?? 0) == $bookId && ($loan['userId'] ?? 0) == ($member['id'] ?? 0) && !($loan['returned'] ?? false)) {
        echo json_encode([
            "success" => false,
            "message" => "You already borrowed this book."
        ]);
        exit;
    }
}

$nextLoanId = 1;
foreach ($loans as $loan) {
    if (($loan['id'] ?? 0) >= $nextLoanId) {
        $nextLoanId = $loan['id'] + 1;
    }
}

$borrowDate = date('Y-m-d');
$dueDate = date('Y-m-d', strtotime($borrowDate . ' +14 days'));

$loans[] = [
    "id" => $nextLoanId,
    "userId" => $member['id'],
    "bookId" => $bookId,
    "borrowDate" => $borrowDate,
    "returned" => false,
    "returnRequested" => false,
    "dueDate" => $dueDate
];

$books[$bookIndex]['available'] = false;

file_put_contents($loansPath, json_encode($loans, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents($booksPath, json_encode($books, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    "success" => true,
    "message" => "Book borrowed successfully."
]);
?>
