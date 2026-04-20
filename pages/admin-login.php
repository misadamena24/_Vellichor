<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="member-login-vintage-page admin-login-vintage-page">
  <div class="member-login-shell">
    <a class="member-login-top-back" href="../index.php">&larr; Back</a>

    <section class="member-login-header">
      <p class="member-login-brand">Vellichor</p>
      <p class="member-login-quote" id="quoteText">A reader lives a thousand lives before he dies.</p>
      <p class="member-login-author" id="quoteAuthor">George R.R. Martin</p>
    </section>

    <div class="form-container">
      <div class="form-box">
        <h2>Admin Log In</h2>
        <p class="form-subtitle">Sign in with the admin account to manage the library.</p>

        <form id="adminLoginForm">
          <label for="adminUsername">Username</label>
          <input type="text" id="adminUsername" placeholder="Enter admin username" required>

          <label for="adminPassword">Password</label>
          <input type="password" id="adminPassword" placeholder="Enter password" required>

          <button type="submit">Log In</button>
          <p class="message" id="adminMessage"></p>
        </form>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=20260419q1"></script>
  <script src="../js/admin-login.js"></script>
</body>
</html>
