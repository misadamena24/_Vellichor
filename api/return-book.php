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

$libraryId = trim($_POST['libraryId'] ?? '');
$loanId = (int) ($_POST['loanId'] ?? 0);
$bookId = (int) ($_POST['bookId'] ?? 0);

if ($libraryId === '' || $loanId <= 0 || $bookId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$users = readJsonFile("../data/users.json");
$loansPath = "../data/loans.json";
$loans = readJsonFile($loansPath);

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
$found = false;

foreach ($loans as $index => $loan) {
    if ((int) ($loan['id'] ?? 0) !== $loanId) {
        continue;
    }

    if ((int) ($loan['bookId'] ?? 0) !== $bookId || (int) ($loan['userId'] ?? 0) !== $memberId) {
        echo json_encode([
            "success" => false,
            "message" => "Loan does not belong to you."
        ]);
        exit;
    }

    if (!empty($loan['returned'])) {
        echo json_encode([
            "success" => false,
            "message" => "This book is already marked as returned."
        ]);
        exit;
    }

    $loans[$index]['returnRequested'] = true;
    $found = true;
    break;
}

if (!$found) {
    echo json_encode([
        "success" => false,
        "message" => "Loan not found."
    ]);
    exit;
}

$saved = file_put_contents($loansPath, json_encode($loans, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
if ($saved === false) {
    echo json_encode([
        "success" => false,
        "message" => "Could not submit return request."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Return request sent. Admin confirmation will finalize return and remove active fine."
]);
?>
