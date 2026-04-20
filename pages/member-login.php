<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Member Login</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="member-login-vintage-page">
  <div class="member-login-shell">
    <a class="member-login-top-back" href="member-access.php">← Back</a>

    <section class="member-login-header">
      <p class="member-login-brand">Vellichor</p>
      <p class="member-login-quote" id="quoteText">A reader lives a thousand lives before he dies.</p>
      <p class="member-login-author" id="quoteAuthor">George R.R. Martin</p>
    </section>

    <div class="form-container">
      <div class="form-box">
        <h2>Member Log In</h2>
        <p class="form-subtitle">Use your username or 5-digit library ID to sign in.</p>

        <form id="memberLoginForm">
          <label for="memberIdentifier">Username or Library ID</label>
          <input type="text" id="memberIdentifier" placeholder="Enter username or library ID" required>

          <label for="memberPassword">Password</label>
          <input type="password" id="memberPassword" placeholder="Password" required>

          <button type="submit">Log In</button>
          <p class="message" id="memberLoginMessage"></p>
        </form>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=20260419q1"></script>
  <script src="../js/member-login.js"></script>
</body>
</html>
