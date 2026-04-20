<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manage Books</title>
  <?php $assetVersion = "20260418books2"; ?>
  <link rel="stylesheet" href="../css/style.css?v=<?php echo $assetVersion; ?>">
</head>
<body class="admin-books-vintage-page">
  <div class="books-page-shell">
    <div class="books-page-container">
      <a class="member-books-top-back" href="admin-dashboard.php">&larr; Back to Dashboard</a>

      <div class="books-page-header">
        <h1>Manage Books</h1>
        <p class="member-books-vintage-quote" id="quoteText">A reader lives a thousand lives before he dies.</p>
        <p class="member-books-vintage-author" id="quoteAuthor">George R.R. Martin</p>
      </div>

      <div class="admin-books-split">
        <div class="books-page-card admin-books-add-card">
          <h2>Add Book</h2>

          <form id="addBookForm">
            <label for="bookName">Name</label>
            <input type="text" id="bookName" placeholder="Enter book name" required>

            <label for="bookAuthor">Author</label>
            <input type="text" id="bookAuthor" placeholder="Enter author name" required>

            <label for="bookYear">Year</label>
            <input type="number" id="bookYear" placeholder="Enter published year" required>

            <label for="bookDescription">Description</label>
            <textarea id="bookDescription" placeholder="Enter book description" required></textarea>

            <label for="bookGenre">Genre</label>
            <input type="text" id="bookGenre" placeholder="Enter genre" required>

            <button type="submit">Add Book</button>
            <p class="message" id="addBookMessage"></p>
            <p class="success-message" id="addBookSuccess"></p>
          </form>
        </div>

        <div class="books-page-card admin-books-list-card">
          <div class="books-page-list-header">
            <h2>Books List</h2>
            <input type="search" id="bookSearchInput" class="books-search" placeholder="Search by title, author, genre, or year...">
          </div>

          <div id="booksList" class="books-list"></div>
        </div>
      </div>
    </div>
  </div>

  <script src="../js/quotes.js?v=<?php echo $assetVersion; ?>"></script>
  <script src="../js/admin-books.js?v=<?php echo $assetVersion; ?>"></script>
</body>
</html>
