<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recommendations</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-recommendations-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1>Recommendations</h1>
        <p class="member-books-vintage-quote" id="memberRecommendationsQuoteText">There is no friend as loyal as a book.</p>
        <p class="member-books-vintage-author" id="memberRecommendationsQuoteAuthor">Ernest Hemingway</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header">
          <h2>Recommended For You</h2>
        </div>

        <div id="memberRecommendationsList" class="books-list"></div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-recommendations.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
