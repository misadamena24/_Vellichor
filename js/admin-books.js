const booksList = document.getElementById("booksList");
const bookSearchInput = document.getElementById("bookSearchInput");
const addBookForm = document.getElementById("addBookForm");
const addBookMessage = document.getElementById("addBookMessage");
const addBookSuccess = document.getElementById("addBookSuccess");
let allBooks = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFilteredBooks() {
  const query = (bookSearchInput?.value || "").trim().toLowerCase();

  if (!query) {
    return allBooks;
  }

  return allBooks.filter(book => {
    const searchable = [
      book.name,
      book.author,
      book.genre,
      book.year,
      book.description
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}

function renderBooks() {
  const data = getFilteredBooks();
  booksList.innerHTML = "";

  if (!data.length) {
    booksList.innerHTML = "<p class='empty-text'>No books found.</p>";
    return;
  }

  data.forEach(book => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";

    bookItem.innerHTML = `
      <div class="book-item-info">
        <h4>${escapeHtml(book.name)}</h4>
        <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
        <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
        <p><strong>Description:</strong> ${escapeHtml(book.description)}</p>
        <p><strong>Available:</strong> ${book.available ? "Yes" : "No"}</p>
      </div>
      <button type="button" class="delete-btn admin-book-delete-btn" data-id="${escapeHtml(book.id)}" data-name="${escapeHtml(book.name)}">Delete</button>
    `;

    booksList.appendChild(bookItem);
  });

  booksList.querySelectorAll(".admin-book-delete-btn").forEach(button => {
    button.addEventListener("click", function () {
      const bookId = this.getAttribute("data-id");
      const bookName = this.getAttribute("data-name");

      const confirmed = confirm("Are you sure that you want to delete \"" + bookName + "\"?");

      if (confirmed) {
        deleteBook(bookId);
      }
    });
  });
}

function loadBooks() {
  fetch("../api/get-books.php")
    .then(response => response.json())
    .then(data => {
      allBooks = Array.isArray(data) ? data : [];
      renderBooks();
    })
    .catch(() => {
      booksList.innerHTML = "<p class='message'>Could not load books.</p>";
    });
}

function deleteBook(bookId) {
  const formData = new FormData();
  formData.append("id", bookId);

  fetch("../api/delete-book.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBooks();
      } else {
        alert(data.message);
      }
    })
    .catch(() => {
      alert("Something went wrong.");
    });
}

addBookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  addBookMessage.textContent = "";
  addBookSuccess.textContent = "";

  const formData = new FormData();
  formData.append("name", document.getElementById("bookName").value.trim());
  formData.append("author", document.getElementById("bookAuthor").value.trim());
  formData.append("year", document.getElementById("bookYear").value.trim());
  formData.append("description", document.getElementById("bookDescription").value.trim());
  formData.append("genre", document.getElementById("bookGenre").value.trim());

  fetch("../api/add-book.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        addBookSuccess.textContent = data.message;
        addBookForm.reset();
        loadBooks();
      } else {
        addBookMessage.textContent = data.message;
      }
    })
    .catch(() => {
      addBookMessage.textContent = "Something went wrong.";
    });
});

if (bookSearchInput) {
  bookSearchInput.addEventListener("input", function () {
    renderBooks();
  });
}

loadBooks();
