<?php
header('Content-Type: application/json');

$dataPath = "../data/books.json";
$books = [];

if (file_exists($dataPath)) {
    $books = json_decode(file_get_contents($dataPath), true);
}

if (!is_array($books)) {
    $books = [];
}

$bookId = (int) ($_POST['id'] ?? 0);

if ($bookId === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid book id."
    ]);
    exit;
}

$updatedBooks = [];
$found = false;

foreach ($books as $book) {
    if ((int) $book['id'] === $bookId) {
        $found = true;
        continue;
    }

    $updatedBooks[] = $book;
}

if (!$found) {
    echo json_encode([
        "success" => false,
        "message" => "Book not found."
    ]);
    exit;
}

$saved = file_put_contents(
    $dataPath,
    json_encode($updatedBooks, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

if ($saved === false) {
    echo json_encode([
        "success" => false,
        "message" => "Could not delete the book."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Book deleted successfully."
]);
?>
