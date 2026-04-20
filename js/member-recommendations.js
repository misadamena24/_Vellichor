const memberRecommendationsList = document.getElementById("memberRecommendationsList");
const memberRecommendationsQuoteText = document.getElementById("memberRecommendationsQuoteText");
const memberRecommendationsQuoteAuthor = document.getElementById("memberRecommendationsQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberRecommendationsQuoteText, memberRecommendationsQuoteAuthor);

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

function buildActionButtons(book) {
  const buttons = [];

  if (book.borrowedByMember) {
    buttons.push("<button type='button' class='small-btn member-action-btn' disabled>Borrowed by you</button>");
    if (book.favorited) {
      buttons.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="unfavorite" data-id="${book.id}">Already in Favorites (Remove)</button>`);
    } else {
      buttons.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="favorite" data-id="${book.id}">Add to Favorites</button>`);
    }
    return buttons.join("");
  }

  if (book.available) {
    buttons.push(`<button type="button" class="small-btn member-action-btn borrow-btn" data-action="borrow" data-id="${book.id}">Borrow</button>`);
  } else if (!book.waitlisted) {
    buttons.push(`<button type="button" class="small-btn member-action-btn waitlist-btn" data-action="waitlist" data-id="${book.id}">Add to Waiting List</button>`);
  } else {
    buttons.push(`<button type="button" class="small-btn member-action-btn waitlist-btn" data-action="unwaitlist" data-id="${book.id}">Already in Waiting List (Remove)</button>`);
  }

  if (!book.favorited) {
    buttons.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="favorite" data-id="${book.id}">Add to Favorites</button>`);
  } else {
    buttons.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="unfavorite" data-id="${book.id}">Already in Favorites (Remove)</button>`);
  }

  if (!buttons.length) {
    buttons.push(`<button type="button" class="small-btn member-action-btn waitlist-btn" data-action="waitlist" data-id="${book.id}">Add to Waiting List</button>`);
    buttons.push(`<button type="button" class="small-btn member-action-btn favorite-btn" data-action="favorite" data-id="${book.id}">Add to Favorites</button>`);
  }

  return buttons.join("");
}

function renderRecommendations(responseData) {
  const genres = responseData.genres || [];
  const authors = responseData.authors || [];
  const books = responseData.recommendations || [];

  memberRecommendationsList.innerHTML = "";

  if (!genres.length || !authors.length) {
    memberRecommendationsList.innerHTML = "<p class='empty-text'>Borrow books first so we can personalize recommendations by matching genre and author.</p>";
    return;
  }

  if (!books.length) {
    memberRecommendationsList.innerHTML = "<p class='empty-text'>No books found that match both your borrowed genres and authors yet.</p>";
    return;
  }

  books.forEach(book => {
    const availabilityText = book.available ? "Available" : "Borrowed";

    const recommendationCard = document.createElement("div");
    recommendationCard.className = "book-item";
    recommendationCard.innerHTML = `
      <div class="book-item-info">
        <h4>${escapeHtml(book.name)}</h4>
        <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
        <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
        <p><strong>Description:</strong> ${escapeHtml(book.description)}</p>
        <p><strong>Status:</strong> ${availabilityText}</p>
        <p><strong>Why recommended:</strong> ${escapeHtml(book.recommendationReason || "Matches your returned books")}</p>
      </div>
      <div class="request-actions">
        ${buildActionButtons(book)}
      </div>
    `;

    memberRecommendationsList.appendChild(recommendationCard);
  });
}

function loadRecommendations() {
  fetch("../api/get-member-recommendations.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      renderRecommendations(data);
    })
    .catch(() => {
      memberRecommendationsList.innerHTML = "<p class='empty-text'>Could not load recommendations.</p>";
    });
}

memberRecommendationsList.addEventListener("click", function (event) {
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
        loadRecommendations();
      } else {
        memberRecommendationsList.insertAdjacentHTML("afterbegin", `<p class="message">${escapeHtml(data.message || "Action failed.")}</p>`);
      }
    })
    .catch(() => {
      memberRecommendationsList.insertAdjacentHTML("afterbegin", "<p class='message'>Something went wrong.</p>");
    });
});

loadRecommendations();
