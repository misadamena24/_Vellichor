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
$bio = trim($_POST['bio'] ?? '');

if ($libraryId === '') {
    echo json_encode(["success" => false, "message" => "Library ID is required."]);
    exit;
}

if (strlen($bio) > 500) {
    echo json_encode(["success" => false, "message" => "Bio is too long (max 500 characters)."]);
    exit;
}

$usersPath = "../data/users.json";
$users = readJsonFile($usersPath);

$updated = false;
foreach ($users as $index => $user) {
    if (($user['libraryId'] ?? '') === $libraryId && ($user['role'] ?? '') === 'member') {
        $users[$index]['bio'] = $bio;
        $updated = true;
        break;
    }
}

if (!$updated) {
    echo json_encode(["success" => false, "message" => "Member not found."]);
    exit;
}

$saved = file_put_contents($usersPath, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
if ($saved === false) {
    echo json_encode(["success" => false, "message" => "Could not save bio."]);
    exit;
}

echo json_encode(["success" => true, "message" => "Bio updated successfully."]);
?>
