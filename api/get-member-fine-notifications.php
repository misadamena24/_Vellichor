<?php
header('Content-Type: application/json');
date_default_timezone_set('Europe/Tirane');

function readJsonFile($path) {
    if (!file_exists($path)) {
        return [];
    }

    $content = file_get_contents($path);
    $data = json_decode($content, true);

    return is_array($data) ? $data : [];
}

$libraryId = trim($_GET['libraryId'] ?? '');
$feePerDay = 0.5;

if ($libraryId === '') {
    echo json_encode([]);
    exit;
}

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$loans = readJsonFile("../data/loans.json");
$notifications = readJsonFile("../data/fine-notifications.json");

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

$notificationMap = [];
foreach ($notifications as $notification) {
    $loanId = (int) ($notification['loanId'] ?? 0);
    if ($loanId > 0 && !empty($notification['notified'])) {
        $notificationMap[$loanId] = $notification;
    }
}

$today = new DateTime(date('Y-m-d'));
$items = [];

foreach ($loans as $loan) {
    if ((int) ($loan['userId'] ?? 0) !== $memberId) {
        continue;
    }

    if (!empty($loan['returned'])) {
        continue;
    }

    $loanId = (int) ($loan['id'] ?? 0);
    $notification = $notificationMap[$loanId] ?? null;
    if (!$notification) {
        continue;
    }

    $dueDateString = trim((string) ($loan['dueDate'] ?? ''));
    if ($dueDateString === '') {
        $borrowDateString = trim((string) ($loan['borrowDate'] ?? ''));
        if ($borrowDateString !== '') {
            $borrowDate = DateTime::createFromFormat('Y-m-d', $borrowDateString);
            if ($borrowDate) {
                $borrowDate->modify('+14 days');
                $dueDateString = $borrowDate->format('Y-m-d');
            }
        }
    }

    $dueDate = DateTime::createFromFormat('Y-m-d', $dueDateString);
    if (!$dueDate || $today <= $dueDate) {
        continue;
    }

    $daysLate = (int) $dueDate->diff($today)->format('%a');
    $amount = number_format($daysLate * $feePerDay, 2, '.', '');

    $bookId = (int) ($loan['bookId'] ?? 0);
    $book = $bookMap[$bookId] ?? [];

    $items[] = [
        "loanId" => $loanId,
        "bookName" => $book['name'] ?? 'Unknown Book',
        "author" => $book['author'] ?? 'Unknown',
        "genre" => $book['genre'] ?? '',
        "borrowDate" => $loan['borrowDate'] ?? '',
        "dueDate" => $dueDateString,
        "daysLate" => $daysLate,
        "feePerDay" => number_format($feePerDay, 2, '.', ''),
        "amount" => $amount,
        "notificationDate" => $notification['notificationDate'] ?? ''
    ];
}

usort($items, function ($a, $b) {
    return ((int) ($b['daysLate'] ?? 0)) - ((int) ($a['daysLate'] ?? 0));
});

echo json_encode($items);
?>
