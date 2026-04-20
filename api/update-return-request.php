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

$loansPath = "../data/loans.json";
$booksPath = "../data/books.json";
$fineNotificationsPath = "../data/fine-notifications.json";

$loans = readJsonFile($loansPath);
$books = readJsonFile($booksPath);
$fineNotifications = readJsonFile($fineNotificationsPath);

$loanId = (int) ($_POST['loanId'] ?? 0);
$action = trim($_POST['action'] ?? '');

if ($loanId === 0 || ($action !== 'confirm' && $action !== 'delete')) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$loanIndex = -1;
$bookId = 0;

foreach ($loans as $index => $loan) {
    if ((int) ($loan['id'] ?? 0) === $loanId) {
        $loanIndex = $index;
        $bookId = (int) ($loan['bookId'] ?? 0);
        break;
    }
}

if ($loanIndex === -1) {
    echo json_encode([
        "success" => false,
        "message" => "Loan not found."
    ]);
    exit;
}

if ($action === 'confirm') {
    $loans[$loanIndex]['returned'] = true;
    $loans[$loanIndex]['returnRequested'] = false;

    foreach ($books as $index => $book) {
        if ((int) ($book['id'] ?? 0) === $bookId) {
            $books[$index]['available'] = true;
            break;
        }
    }

    $cleanedNotifications = [];
    foreach ($fineNotifications as $notification) {
        if ((int) ($notification['loanId'] ?? 0) === $loanId) {
            continue;
        }
        $cleanedNotifications[] = $notification;
    }
    $fineNotifications = $cleanedNotifications;
} else {
    $loans[$loanIndex]['returnRequested'] = false;
}

$loansSaved = file_put_contents(
    $loansPath,
    json_encode($loans, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

$booksSaved = file_put_contents(
    $booksPath,
    json_encode($books, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

$notificationsSaved = file_put_contents(
    $fineNotificationsPath,
    json_encode($fineNotifications, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

if ($loansSaved === false || $booksSaved === false || $notificationsSaved === false) {
    echo json_encode([
        "success" => false,
        "message" => "Could not update the return request."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Return request updated successfully."
]);
?>
