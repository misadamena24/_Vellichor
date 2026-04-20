const favoritesList = document.getElementById("favoritesList");
const waitingListBooks = document.getElementById("waitingListBooks");
const memberFavoritesQuoteText = document.getElementById("memberFavoritesQuoteText");
const memberFavoritesQuoteAuthor = document.getElementById("memberFavoritesQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberFavoritesQuoteText, memberFavoritesQuoteAuthor);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function postAction(url, bookId) {
  const formData = new FormData();
  formData.append("libraryId", memberLibraryId);
  formData.append("bookId", bookId);

  return fetch(url, {
    method: "POST",
    body: formData
  }).then(response => response.json());
}

function renderBookList(target, books, emptyMessage, mode) {
  target.innerHTML = "";

  if (!books.length) {
    target.innerHTML = `<p class="empty-text">${emptyMessage}</p>`;
    return;
  }

  books.forEach(book => {
    const item = document.createElement("div");
    item.className = "book-item";

    const actionButton = mode === "favorites"
      ? `<button type="button" class="small-btn member-action-btn member-remove-btn" data-action="remove-favorite" data-id="${book.id}">Remove Favorite</button>`
      : `<button type="button" class="small-btn member-action-btn member-remove-btn" data-action="remove-waitlist" data-id="${book.id}">Remove Waiting</button>`;

    item.innerHTML = `
      <div class="book-item-info">
        <h4>${escapeHtml(book.name)}</h4>
        <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
        <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
        <p><strong>Description:</strong> ${escapeHtml(book.description)}</p>
        <p><strong>Status:</strong> ${book.available ? "Available" : "Borrowed"}</p>
      </div>
      <div class="request-actions">${actionButton}</div>
    `;

    target.appendChild(item);
  });
}

function loadFavoritesPage() {
  fetch("../api/get-member-favorites.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      renderBookList(favoritesList, data.favorites || [], "No favorite books yet.", "favorites");
      renderBookList(waitingListBooks, data.waitlist || [], "No books in waiting list yet.", "waitlist");
    })
    .catch(() => {
      favoritesList.innerHTML = "<p class='message'>Could not load favorites.</p>";
      waitingListBooks.innerHTML = "<p class='message'>Could not load waiting list.</p>";
    });
}

function handleRemoveClick(event) {
  const button = event.target.closest(".member-remove-btn");
  if (!button || button.disabled) {
    return;
  }

  const action = button.getAttribute("data-action");
  const bookId = button.getAttribute("data-id");
  if (!action || !bookId) {
    return;
  }

  const endpoint = action === "remove-waitlist"
    ? "../api/remove-waitlist.php"
    : "../api/remove-favorite.php";

  button.disabled = true;
  postAction(endpoint, bookId)
    .then(() => {
      loadFavoritesPage();
    })
    .catch(() => {
      button.disabled = false;
    });
}

favoritesList.addEventListener("click", handleRemoveClick);
waitingListBooks.addEventListener("click", handleRemoveClick);

loadFavoritesPage();
