<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Favorites & Waiting List</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-favorites-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1>Favorites & Waiting List</h1>
        <p class="member-books-vintage-quote" id="memberFavoritesQuoteText">Books are a uniquely portable magic.</p>
        <p class="member-books-vintage-author" id="memberFavoritesQuoteAuthor">Stephen King</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header member-favorites-center-head">
          <h2>Saved Books</h2>
        </div>

        <div class="member-favorites-split">
          <section class="member-favorites-column">
            <h3>Favorites</h3>
            <div id="favoritesList" class="books-list"></div>
          </section>

          <section class="member-favorites-column">
            <h3>Waiting List</h3>
            <div id="waitingListBooks" class="books-list"></div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-favorites.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
