const memberBooksList = document.getElementById("memberBooksList");
const memberBooksSearch = document.getElementById("memberBooksSearch");
const memberBookModal = document.getElementById("memberBookModal");
const memberBookModalClose = document.getElementById("memberBookModalClose");
const memberBookModalContent = document.getElementById("memberBookModalContent");
const memberBooksQuoteText = document.getElementById("memberBooksQuoteText");
const memberBooksQuoteAuthor = document.getElementById("memberBooksQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberBooksQuoteText, memberBooksQuoteAuthor);
memberBookModal.hidden = true;

let allBooks = [];
let selectedBook = null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function statusText(book) {
  if (book.borrowedByMember) {
    return "Borrowed by you";
  }
  if (book.available) {
    return "Available";
  }
  return "Borrowed";
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

function renderBooksList() {
  const query = (memberBooksSearch.value || "").trim().toLowerCase();
  memberBooksList.innerHTML = "";

  const filtered = allBooks.filter(book => {
    if (!query) {
      return true;
    }

    const haystack = [
      book.name,
      book.author,
      book.genre,
      String(book.year)
    ].join(" ").toLowerCase();

    return haystack.includes(query);
  });

  if (!filtered.length) {
    memberBooksList.innerHTML = "<li class='member-books-empty-li'>No books found.</li>";
    return;
  }

  filtered.forEach(book => {
    const li = document.createElement("li");
    li.className = "member-book-list-item";
    li.setAttribute("data-book-id", String(book.id));
    li.innerHTML = `
      <div class="member-book-list-main">
        <h3>${escapeHtml(book.name)}</h3>
        <p>${escapeHtml(book.author)} | ${escapeHtml(book.genre)} | ${escapeHtml(book.year)}</p>
      </div>
      <span class="member-book-list-status">${escapeHtml(statusText(book))}</span>
    `;
    memberBooksList.appendChild(li);
  });
}

function buildModalActions(book) {
  const actions = [];

  if (book.borrowedByMember) {
    actions.push("<p><strong>Status:</strong> Borrowed by you</p>");
    if (book.favorited) {
      actions.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="unfavorite" data-id="${book.id}">Already in Favorites (Remove)</button>`);
    } else {
      actions.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="favorite" data-id="${book.id}">Add to Favorites</button>`);
    }
    return actions.join("");
  }

  actions.push(`<p><strong>Status:</strong> ${book.available ? "Available" : "Borrowed"}</p>`);

  if (book.available) {
    actions.push(`<button type="button" class="small-btn member-action-btn borrow-btn" data-action="borrow" data-id="${book.id}">Borrow</button>`);
  } else if (!book.waitlisted) {
    actions.push(`<button type="button" class="small-btn member-action-btn waitlist-btn" data-action="waitlist" data-id="${book.id}">Add to Waiting List</button>`);
  } else {
    actions.push(`<button type="button" class="small-btn member-action-btn waitlist-btn" data-action="unwaitlist" data-id="${book.id}">Already in Waiting List (Remove)</button>`);
  }

  if (!book.favorited) {
    actions.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="favorite" data-id="${book.id}">Add to Favorites</button>`);
  } else {
    actions.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="unfavorite" data-id="${book.id}">Already in Favorites (Remove)</button>`);
  }

  return actions.join("");
}

function openBookModal(book) {
  selectedBook = book;
  memberBookModalContent.innerHTML = `
    <div class="member-book-modal-body">
      <h2>${escapeHtml(book.name)}</h2>
      <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
      <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
      <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
      <p><strong>Description:</strong> ${escapeHtml(book.description)}</p>
      <div class="member-book-modal-actions">
        ${buildModalActions(book)}
      </div>
    </div>
  `;

  memberBookModal.hidden = false;
}

function closeBookModal() {
  memberBookModal.hidden = true;
  selectedBook = null;
}

function loadMemberBooks() {
  fetch("../api/get-member-books.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      allBooks = Array.isArray(data) ? data : [];
      renderBooksList();
    })
    .catch(() => {
      memberBooksList.innerHTML = "<li class='member-books-empty-li'>Could not load books.</li>";
    });
}

memberBooksList.addEventListener("click", function (event) {
  const listItem = event.target.closest(".member-book-list-item");
  if (!listItem) {
    return;
  }

  const bookId = Number(listItem.getAttribute("data-book-id"));
  const book = allBooks.find(item => Number(item.id) === bookId);
  if (!book) {
    return;
  }

  openBookModal(book);
});

memberBookModalClose.addEventListener("click", function () {
  closeBookModal();
});

memberBookModal.addEventListener("click", function (event) {
  if (event.target === memberBookModal) {
    closeBookModal();
  }
});

memberBookModalContent.addEventListener("click", function (event) {
  const button = event.target.closest(".member-action-btn");
  if (!button || button.disabled) {
    return;
  }

  const action = button.getAttribute("data-action");
  const bookId = button.getAttribute("data-id");
  if (!action || !bookId) {
    return;
  }

  const endpoint = action === "borrow"
    ? "../api/borrow-book.php"
    : action === "waitlist"
      ? "../api/add-waitlist.php"
      : action === "unwaitlist"
        ? "../api/remove-waitlist.php"
        : action === "unfavorite"
          ? "../api/remove-favorite.php"
          : "../api/add-favorite.php";

  postAction(endpoint, bookId)
    .then(data => {
      if (data.success) {
        closeBookModal();
        loadMemberBooks();
      } else {
        memberBooksList.insertAdjacentHTML("beforebegin", `<p class="message">${escapeHtml(data.message || "Action failed.")}</p>`);
      }
    })
    .catch(() => {
      memberBooksList.insertAdjacentHTML("beforebegin", "<p class='message'>Something went wrong.</p>");
    });
});

memberBooksSearch.addEventListener("input", function () {
  renderBooksList();
});

memberBooksSearch.addEventListener("keyup", function () {
  renderBooksList();
});

loadMemberBooks();
