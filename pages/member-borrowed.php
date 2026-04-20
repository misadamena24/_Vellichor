<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Borrowed Books</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-borrowed-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1>Borrowed Books</h1>
        <p class="member-books-vintage-quote" id="memberBorrowedQuoteText">A reader lives a thousand lives before he dies.</p>
        <p class="member-books-vintage-author" id="memberBorrowedQuoteAuthor">George R.R. Martin</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header">
          <h2>My Borrowed Books</h2>
        </div>

        <p class="message" id="memberBorrowedMessage"></p>
        <p class="success-message" id="memberBorrowedSuccess"></p>
        <div id="memberBorrowedList" class="books-list"></div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-borrowed.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
