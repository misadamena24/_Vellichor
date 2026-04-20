<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Member Dashboard</title>
  <link rel="stylesheet" href="../css/style.css?v=20260419q1">
</head>
<body class="member-dashboard-page">
  <main class="member-dashboard-shell">
    <section class="member-dashboard-container">
      <h1 class="member-dashboard-title">VELLICHOR</h1>

      <div class="member-dashboard-quote">
        <span id="quoteText">A reader lives a thousand lives before he dies.</span>
        <span id="quoteAuthor">George R.R. Martin</span>
      </div>

      <div class="member-dashboard-grid">
        <a class="member-dashboard-card" href="member-books.php">
          <span class="member-dashboard-graphic graphic-books" aria-hidden="true"></span>
          <h2>Books</h2>
        </a>

        <a class="member-dashboard-card" href="member-profile.php">
          <span class="member-dashboard-graphic graphic-profile" aria-hidden="true"></span>
          <h2>Profile</h2>
        </a>

        <a class="member-dashboard-card" href="member-borrowed.php">
          <span class="member-dashboard-graphic graphic-borrowed" aria-hidden="true"></span>
          <h2>Borrowed</h2>
        </a>

        <a class="member-dashboard-card" href="member-statistics.php">
          <span class="member-dashboard-graphic graphic-statistics" aria-hidden="true"></span>
          <h2>Statistics</h2>
        </a>

        <a class="member-dashboard-card" href="member-ratings.php">
          <span class="member-dashboard-graphic graphic-ratings" aria-hidden="true"></span>
          <h2>Ratings</h2>
        </a>

        <a class="member-dashboard-card" href="member-facts.php">
          <span class="member-dashboard-graphic graphic-facts" aria-hidden="true"></span>
          <h2>Facts</h2>
        </a>

        <a class="member-dashboard-card" href="member-quizzes.php">
          <span class="member-dashboard-graphic graphic-quizzes" aria-hidden="true"></span>
          <h2>Quizzes</h2>
        </a>

        <a class="member-dashboard-card" href="member-recommendations.php">
          <span class="member-dashboard-graphic graphic-recommendations" aria-hidden="true"></span>
          <h2>Recommendations</h2>
        </a>

        <a class="member-dashboard-card" href="member-fines.php">
          <span class="member-dashboard-graphic graphic-fines" aria-hidden="true"></span>
          <h2>Fines &amp; Payments</h2>
        </a>

        <a class="member-dashboard-card" href="member-community.php">
          <span class="member-dashboard-graphic graphic-community" aria-hidden="true"></span>
          <h2>Community</h2>
        </a>

        <a class="member-dashboard-card" href="member-achievements.php">
          <span class="member-dashboard-graphic graphic-achievements" aria-hidden="true"></span>
          <h2>Achievements</h2>
        </a>

        <a class="member-dashboard-card member-dashboard-card-highlight" href="member-favorites.php">
          <span class="member-dashboard-graphic graphic-favorites" aria-hidden="true"></span>
          <h2>Favorites</h2>
        </a>
      </div>

      <a class="member-dashboard-logout" href="../index.php">Log Out</a>
    </section>
  </main>

  <script src="../js/quotes.js?v=20260419q1"></script>
</body>
</html>
