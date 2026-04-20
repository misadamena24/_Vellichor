<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile</title>
  <?php $assetVersion = "20260419p3"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-profile-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container member-profile-vintage-layout">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <div class="books-page-header member-profile-hero">
        <h1>Profile</h1>
        <p class="member-profile-name" id="memberProfileDisplayName">Member</p>
        <p id="memberProfileBioPreview">Your bio will appear here.</p>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header member-profile-headline">
          <h2>My Profile</h2>
        </div>

        <p class="message" id="memberProfileMessage"></p>
        <p class="success-message" id="memberProfileSuccess"></p>

        <div id="memberProfileStats" class="stats-grid"></div>
      </div>

      <div class="books-page-card">
        <div class="books-page-list-header">
          <h2>My Ratings</h2>
        </div>
        <div id="memberProfileRatings" class="books-list"></div>
      </div>

      <div class="books-page-card member-profile-bio-card">
        <div class="books-page-list-header">
          <h2>Edit Bio</h2>
        </div>

        <form id="memberBioForm" class="member-profile-bio-form">
          <label for="memberBioInput">Bio</label>
          <textarea id="memberBioInput" placeholder="Write a short bio about yourself..."></textarea>
          <button type="submit" class="small-btn">Save Bio</button>
        </form>
      </div>

      <a class="member-dashboard-logout" href="../index.php">Log Out</a>
    </div>
  </div>

  <script src="../js/member-profile.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
