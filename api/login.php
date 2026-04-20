<?php
header('Content-Type: application/json');

$users = json_decode(file_get_contents("../data/users.json"), true);

$identifier = trim($_POST['identifier'] ?? '');
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

foreach ($users as $user) {
    $matchesIdentifier = $user['username'] === $identifier;

    if (isset($user['libraryId'])) {
        $matchesIdentifier = $matchesIdentifier || (string) $user['libraryId'] === $identifier;
    }

    $matchesRole = $role === '' || $user['role'] === $role;

    if ($matchesIdentifier && $user['password'] === $password && $matchesRole) {
        echo json_encode([
            "success" => true,
            "role" => $user['role'],
            "username" => $user['username'],
            "libraryId" => $user['libraryId'] ?? null,
            "name" => $user['name'] ?? $user['username']
        ]);
        exit;
    }
}

echo json_encode([
    "success" => false,
    "message" => "Invalid credentials"
]);
?>
