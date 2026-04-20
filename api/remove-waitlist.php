<?php
// API endpoint: remove member from waitlist
// TODO: implement waitlist removal logic
<?php
header('Content-Type: application/json');

$usersPath = "../data/users.json";
$waitlistPath = "../data/waitlist.json";

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
$waitlist = file_exists($waitlistPath) ? json_decode(file_get_contents($waitlistPath), true) : [];

if (!is_array($users) || !is_array($waitlist)) {
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

foreach ($waitlist as $entry) {
    $isTarget = ((int) ($entry['bookId'] ?? 0) === $bookId)
        && ((int) ($entry['userId'] ?? 0) === $memberId);

    if ($isTarget) {
        $removed = true;
        continue;
    }

    $filtered[] = $entry;
}

if (!$removed) {
    echo json_encode([
        "success" => false,
        "message" => "This book is not in your waiting list."
    ]);
    exit;
}

file_put_contents($waitlistPath, json_encode(array_values($filtered), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode([
    "success" => true,
    "message" => "Book removed from waiting list."
]);
?>
