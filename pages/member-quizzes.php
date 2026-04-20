<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Member Quizzes</title>
  <?php $assetVersion = "20260419q1"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="member-quizzes-page member-quizzes-vintage-page">
  <main class="member-quizzes-shell">
    <section class="member-quizzes-container">
      <a class="member-books-top-back" href="member-dashboard.php" aria-label="Back to Dashboard">&#8592; Back to Dashboard</a>

      <header class="member-quizzes-header">
        <h1>Literature Quizzes</h1>
        <p class="member-books-vintage-quote" id="memberQuizzesQuoteText">A reader lives a thousand lives before he dies.</p>
        <p class="member-books-vintage-author" id="memberQuizzesQuoteAuthor">George R.R. Martin</p>
      </header>

      <section class="member-quizzes-progress">
        <div class="member-quizzes-stat">
          <h2>Progress</h2>
          <p id="quizProgressText">Level 1 unlocked</p>
        </div>
        <div class="member-quizzes-stat">
          <h2>Passed Levels</h2>
          <p id="quizPassedText">0 / 100</p>
        </div>
        <div class="member-quizzes-stat">
          <h2>Rule</h2>
          <p>Next level unlocks only after you pass the current one.</p>
        </div>
      </section>

      <section id="quizLevelsSection" class="member-quizzes-levels-wrap">
        <h2 class="member-quizzes-section-title">Choose a Level</h2>
        <div id="quizLevelsGrid" class="member-quizzes-levels-grid"></div>
      </section>

      <section id="quizPlaySection" class="member-quiz-play" hidden>
        <div class="member-quiz-play-head">
          <h2 id="quizPlayTitle">Level 1</h2>
          <p id="quizPlayMeta">Question 1 of 10</p>
          <p id="quizInlineMessage" class="member-quiz-inline-message"></p>
        </div>

        <article class="member-quiz-question-card">
          <h3 id="quizQuestionText">Question text</h3>
          <form id="quizOptionsForm" class="member-quiz-options"></form>
        </article>

        <div class="member-quiz-actions">
          <button id="quizBackBtn" type="button" class="member-quiz-secondary-btn">Back to Levels</button>
          <button id="quizNextBtn" type="button" class="member-quiz-primary-btn">Next Question</button>
        </div>
      </section>

      <section id="quizResultSection" class="member-quiz-result" hidden>
        <h2 id="quizResultTitle">Result</h2>
        <p id="quizResultText"></p>
        <div class="member-quiz-actions">
          <button id="quizRetryBtn" type="button" class="member-quiz-secondary-btn">Try Again</button>
          <button id="quizNextLevelBtn" type="button" class="member-quiz-primary-btn">Go to Next Level</button>
        </div>
      </section>

      <a class="member-dashboard-logout" href="member-dashboard.php">Back to Dashboard</a>
    </section>
  </main>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/member-quizzes.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
