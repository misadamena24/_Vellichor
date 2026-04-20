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

$users = readJsonFile("../data/users.json");
$books = readJsonFile("../data/books.json");
$ratings = readJsonFile("../data/ratings.json");

$userMap = [];
foreach ($users as $user) {
    $userId = (int) ($user['id'] ?? 0);
    if ($userId <= 0) {
        continue;
    }

    $fullName = trim((string) ($user['name'] ?? '') . ' ' . (string) ($user['surname'] ?? ''));
    $userMap[$userId] = [
        "name" => $fullName !== '' ? $fullName : "Unknown Member",
        "libraryId" => (string) ($user['libraryId'] ?? '')
    ];
}

$bookMap = [];
foreach ($books as $book) {
    $bookId = (int) ($book['id'] ?? 0);
    if ($bookId <= 0) {
        continue;
    }

    $bookMap[$bookId] = [
        "name" => (string) ($book['name'] ?? 'Unknown Book'),
        "author" => (string) ($book['author'] ?? 'Unknown'),
        "genre" => (string) ($book['genre'] ?? '')
    ];
}

$feed = [];
foreach ($ratings as $rating) {
    $ratingId = (int) ($rating['id'] ?? 0);
    $userId = (int) ($rating['userId'] ?? 0);
    $bookId = (int) ($rating['bookId'] ?? 0);
    $stars = (int) ($rating['rating'] ?? 0);
    $comment = trim((string) ($rating['comment'] ?? ''));

    if ($ratingId <= 0 || $userId <= 0 || $bookId <= 0 || $stars < 1 || $stars > 5) {
        continue;
    }

    $member = $userMap[$userId] ?? ["name" => "Unknown Member", "libraryId" => ""];
    $book = $bookMap[$bookId] ?? ["name" => "Unknown Book", "author" => "Unknown", "genre" => ""];

    $feed[] = [
        "ratingId" => $ratingId,
        "memberName" => $member['name'],
        "libraryId" => $member['libraryId'],
        "bookName" => $book['name'],
        "author" => $book['author'],
        "genre" => $book['genre'],
        "rating" => $stars,
        "comment" => $comment
    ];
}

usort($feed, function ($a, $b) {
    return ((int) ($b['ratingId'] ?? 0)) - ((int) ($a['ratingId'] ?? 0));
});

$averageRating = 0;
if (count($feed) > 0) {
    $sum = 0;
    foreach ($feed as $item) {
        $sum += (int) ($item['rating'] ?? 0);
    }
    $averageRating = round($sum / count($feed), 2);
}

$booksGrouped = [];
foreach ($feed as $item) {
    $bookKey = strtolower((string) ($item['bookName'] ?? '')) . '|' . strtolower((string) ($item['author'] ?? ''));
    if (!isset($booksGrouped[$bookKey])) {
        $booksGrouped[$bookKey] = [
            "bookName" => $item['bookName'] ?? 'Unknown Book',
            "author" => $item['author'] ?? 'Unknown',
            "genre" => $item['genre'] ?? '',
            "ratingsCount" => 0,
            "averageRating" => 0,
            "ratings" => [],
            "ratingsSum" => 0
        ];
    }

    $booksGrouped[$bookKey]["ratings"][] = [
        "ratingId" => (int) ($item['ratingId'] ?? 0),
        "memberName" => $item['memberName'] ?? 'Unknown Member',
        "libraryId" => $item['libraryId'] ?? '',
        "rating" => (int) ($item['rating'] ?? 0),
        "comment" => $item['comment'] ?? ''
    ];
    $booksGrouped[$bookKey]["ratingsCount"] += 1;
    $booksGrouped[$bookKey]["ratingsSum"] += (int) ($item['rating'] ?? 0);
}

$booksList = array_values($booksGrouped);
foreach ($booksList as $index => $group) {
    $count = (int) ($group['ratingsCount'] ?? 0);
    $sum = (int) ($group['ratingsSum'] ?? 0);
    $booksList[$index]['averageRating'] = $count > 0 ? round($sum / $count, 2) : 0;
    unset($booksList[$index]['ratingsSum']);
}

usort($booksList, function ($a, $b) {
    $avgDiff = ((float) ($b['averageRating'] ?? 0)) <=> ((float) ($a['averageRating'] ?? 0));
    if ($avgDiff !== 0) {
        return $avgDiff;
    }

    $countDiff = ((int) ($b['ratingsCount'] ?? 0)) - ((int) ($a['ratingsCount'] ?? 0));
    if ($countDiff !== 0) {
        return $countDiff;
    }

    return strcmp((string) ($a['bookName'] ?? ''), (string) ($b['bookName'] ?? ''));
});

echo json_encode([
    "totalRatings" => count($feed),
    "averageRating" => $averageRating,
    "feed" => $feed,
    "books" => $booksList
]);
?>
