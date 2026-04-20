<?php
header('Content-Type: application/json');

$dataPath = "../data/books.json";

if (!file_exists($dataPath)) {
    echo json_encode([]);
    exit;
}

$books = json_decode(file_get_contents($dataPath), true);

if (!is_array($books)) {
    $books = [];
}

echo json_encode($books);
?>
