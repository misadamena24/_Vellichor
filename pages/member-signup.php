<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Member Sign Up</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="member-login-vintage-page member-signup-vintage-page">
  <div class="member-login-shell">
    <a class="member-login-top-back" href="member-access.php">← Back</a>

    <section class="member-login-header">
      <p class="member-login-brand">Vellichor</p>
      <p class="member-login-quote" id="quoteText">A reader lives a thousand lives before he dies.</p>
      <p class="member-login-author" id="quoteAuthor">George R.R. Martin</p>
    </section>

    <div class="form-container">
      <div class="form-box">
        <h2>Member Sign Up</h2>
        <p class="form-subtitle">Create your library account to start borrowing books.</p>

        <form id="memberSignupForm">
          <label for="signupName">Name</label>
          <input type="text" id="signupName" placeholder="Enter your name" required>

          <label for="signupSurname">Surname</label>
          <input type="text" id="signupSurname" placeholder="Enter your surname" required>

          <label for="signupEmail">Email</label>
          <input type="email" id="signupEmail" placeholder="Enter your email" required>

          <label for="signupUsername">Username</label>
          <input type="text" id="signupUsername" placeholder="Choose a unique username" required>

          <label for="signupPassword">Password</label>
          <input type="password" id="signupPassword" placeholder="Minimum 8 characters" required>

          <label for="signupConfirmPassword">Confirm Password</label>
          <input type="password" id="signupConfirmPassword" placeholder="Repeat your password" required>

          <button type="submit">Sign Up</button>
          <p class="message" id="memberSignupMessage"></p>
          <p class="success-message" id="memberSignupSuccess"></p>
        </form>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=20260419q1"></script>
  <script src="../js/member-signup.js"></script>
</body>
</html>
