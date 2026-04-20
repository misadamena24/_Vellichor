<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel</title>
  <link rel="stylesheet" href="../css/style.css?v=20260419q1">
</head>
<body class="member-dashboard-page admin-dashboard-page">
  <main class="member-dashboard-shell">
    <section class="member-dashboard-container">
      <h1 class="member-dashboard-title">VELLICHOR</h1>

      <div class="member-dashboard-quote">
        <span id="quoteText">A reader lives a thousand lives before he dies.</span>
        <span id="quoteAuthor">George R.R. Martin</span>
      </div>

      <div class="member-dashboard-grid">
        <a class="member-dashboard-card" href="admin-members.php">
          <span class="member-dashboard-graphic graphic-profile" aria-hidden="true"></span>
          <h2>Members</h2>
        </a>

        <a class="member-dashboard-card" href="admin-books.php">
          <span class="member-dashboard-graphic graphic-books" aria-hidden="true"></span>
          <h2>Manage Books</h2>
        </a>

        <a class="member-dashboard-card" href="admin-returns.php">
          <span class="member-dashboard-graphic graphic-borrowed" aria-hidden="true"></span>
          <h2>Book Return</h2>
        </a>

        <a class="member-dashboard-card" href="admin-fines.php">
          <span class="member-dashboard-graphic graphic-fines" aria-hidden="true"></span>
          <h2>Fines &amp; Payments</h2>
        </a>

        <a class="member-dashboard-card" href="admin-statistics.php">
          <span class="member-dashboard-graphic graphic-statistics" aria-hidden="true"></span>
          <h2>Statistics</h2>
        </a>

      </div>

      <a class="member-dashboard-logout" href="../index.php">Log Out</a>
    </section>
  </main>

  <script src="../js/quotes.js?v=20260419q1"></script>
</body>
</html>
