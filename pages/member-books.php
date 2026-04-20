<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Library Books</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-books-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1 class="member-books-vintage-title">Library Books</h1>
        <p class="member-books-vintage-quote" id="memberBooksQuoteText">A room without books is like a body without a soul.</p>
        <p class="member-books-vintage-author" id="memberBooksQuoteAuthor">Cicero</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header member-books-toolbar">
          <h2>Books List</h2>
        </div>

        <div class="member-books-vintage-search-wrap member-books-list-search-wrap">
          <input type="text" id="memberBooksSearch" placeholder="Search books by title, author, genre, or year...">
        </div>
        <ul id="memberBooksList" class="member-books-list-ui"></ul>
      </div>

    </div>
  </div>

  <div id="memberBookModal" class="member-book-modal" hidden>
    <div class="member-book-modal-dialog">
      <button type="button" id="memberBookModalClose" class="member-book-modal-close" aria-label="Close">&times;</button>
      <div id="memberBookModalContent"></div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-books.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>

