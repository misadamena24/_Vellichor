<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fines & Payments</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-fines-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-books-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-books-vintage-header">
        <h1>Fines & Payments</h1>
        <p class="member-books-vintage-quote" id="memberFinesQuoteText">A room without books is like a body without a soul.</p>
        <p class="member-books-vintage-author" id="memberFinesQuoteAuthor">Cicero</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header">
          <h2>Fine Notifications</h2>
        </div>

        <p class="message" id="memberFinesMessage"></p>
        <p class="success-message" id="memberFinesSuccess"></p>
        <div id="memberFinesList" class="fines-list"></div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-fines.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
