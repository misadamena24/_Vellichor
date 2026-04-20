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

$name = trim($_POST['name'] ?? '');
$author = trim($_POST['author'] ?? '');
$year = trim($_POST['year'] ?? '');
$description = trim($_POST['description'] ?? '');
$genre = trim($_POST['genre'] ?? '');

if ($name === '' || $author === '' || $year === '' || $description === '' || $genre === '') {
    echo json_encode([
        "success" => false,
        "message" => "Please fill in all fields."
    ]);
    exit;
}

if (!is_numeric($year)) {
    echo json_encode([
        "success" => false,
        "message" => "Year must be a valid number."
    ]);
    exit;
}

$maxId = 0;
foreach ($books as $book) {
    if (isset($book['id']) && $book['id'] > $maxId) {
        $maxId = $book['id'];
    }
}

$newBook = [
    "id" => $maxId + 1,
    "name" => $name,
    "author" => $author,
    "year" => (int) $year,
    "description" => $description,
    "genre" => $genre,
    "available" => true
];

$books[] = $newBook;

$saved = file_put_contents(
    $dataPath,
    json_encode($books, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

if ($saved === false) {
    echo json_encode([
        "success" => false,
        "message" => "Could not save the book."
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Book added successfully."
]);
?>
