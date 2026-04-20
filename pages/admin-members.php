<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manage Members</title>
  <?php $assetVersion = "20260418s6"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="admin-members-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container">
      <a class="member-books-top-back" href="admin-dashboard.php">&larr; Back to Dashboard</a>

      <div class="books-page-header">
        <h1>Manage Members</h1>
        <p class="member-books-vintage-quote" id="quoteText">A reader lives a thousand lives before he dies.</p>
        <p class="member-books-vintage-author" id="quoteAuthor">George R.R. Martin</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header admin-members-top-row">
          <h2>Members List</h2>
          <input type="search" id="memberSearchInput" class="books-search" placeholder="Search by name, username, email, or library ID...">
        </div>

        <div id="membersList" class="members-list"></div>
      </div>
    </div>
  </div>

  <div id="memberDetailsModal" class="member-details-modal" hidden>
    <div class="member-details-box">
      <button type="button" class="member-details-close" id="memberDetailsClose" aria-label="Close">&times;</button>
      <div id="memberDetailsContent"></div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/admin-members.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
