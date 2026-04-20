<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Community</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-community-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1>Community</h1>
        <p class="member-books-vintage-quote" id="memberCommunityQuoteText">There is no friend as loyal as a book.</p>
        <p class="member-books-vintage-author" id="memberCommunityQuoteAuthor">Ernest Hemingway</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header member-community-head">
          <h2>Community Ratings</h2>
        </div>
        <input type="search" id="communitySearchInput" class="books-search member-community-search" placeholder="Search for a book title...">

        <p class="message" id="communityMessage"></p>
        <div id="communityRatingsList" class="books-list"></div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-community.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
