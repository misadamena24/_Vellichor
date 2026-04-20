<?php
header('Content-Type: application/json');

$dataPath = "../data/users.json";
$users = json_decode(file_get_contents($dataPath), true);

if (!is_array($users)) {
    $users = [];
}

$name = trim($_POST['name'] ?? '');
$surname = trim($_POST['surname'] ?? '');
$email = trim($_POST['email'] ?? '');
$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

if (
    $name === '' ||
    $surname === '' ||
    $email === '' ||
    $username === '' ||
    $password === '' ||
    $confirmPassword === ''
) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

if (strlen($password) < 8) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 8 characters long."
    ]);
    exit;
}

if ($password !== $confirmPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Passwords do not match."
    ]);
    exit;
}

foreach ($users as $user) {
    if (strcasecmp($user['username'], $username) === 0) {
        echo json_encode([
            "success" => false,
            "message" => "This username is already taken."
        ]);
        exit;
    }
}

do {
    $libraryId = (string) random_int(10000, 99999);
    $exists = false;

    foreach ($users as $user) {
        if (isset($user['libraryId']) && (string) $user['libraryId'] === $libraryId) {
            $exists = true;
            break;
        }
    }
} while ($exists);

$maxId = 0;
foreach ($users as $user) {
    if (isset($user['id']) && $user['id'] > $maxId) {
        $maxId = $user['id'];
    }
}

$newUser = [
    "id" => $maxId + 1,
    "libraryId" => $libraryId,
    "name" => $name,
    "surname" => $surname,
    "email" => $email,
    "username" => $username,
    "password" => $password,
    "role" => "member",
    "points" => 0
];

$users[] = $newUser;

$saved = file_put_contents(
    $dataPath,
    json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

if ($saved === false) {
    echo json_encode([
        "success" => false,
        "message" => "Could not save the new member."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Account created successfully.",
    "libraryId" => $libraryId,
    "username" => $username,
    "name" => $name
]);
?>
