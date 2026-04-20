<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Book Return</title>
  <?php $assetVersion = "20260418s10"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="admin-returns-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container">
      <a class="member-books-top-back" href="admin-dashboard.php">&larr; Back to Dashboard</a>

      <div class="books-page-header">
        <h1>Book Return</h1>
        <p class="member-books-vintage-quote" id="quoteText">A room without books is like a body without a soul.</p>
        <p class="member-books-vintage-author" id="quoteAuthor">Cicero</p>
      </div>

      <div class="admin-returns-split">
        <div class="books-page-card admin-returns-list-card">
          <div class="books-page-list-header admin-returns-head">
            <div class="admin-returns-head-copy">
              <h2>Return Notifications</h2>
            </div>
          </div>

          <div class="admin-returns-search-wrap">
            <input type="search" id="returnSearchInput" class="books-search" placeholder="Search member, library ID, or book...">
          </div>

          <div id="returnRequestsList" class="return-requests-list"></div>
        </div>

        <div class="books-page-card admin-returns-details-card">
          <div class="books-page-list-header">
            <h2>Request Details</h2>
          </div>
          <div id="returnRequestDetails"></div>
        </div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/admin-returns.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
