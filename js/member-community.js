// JavaScript for member-community page
// TODO: add community interaction logic
const communityRatingsList = document.getElementById("communityRatingsList");
const communityMessage = document.getElementById("communityMessage");
const communitySearchInput = document.getElementById("communitySearchInput");
const memberCommunityQuoteText = document.getElementById("memberCommunityQuoteText");
const memberCommunityQuoteAuthor = document.getElementById("memberCommunityQuoteAuthor");
let lastCommunityPayload = null;

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberCommunityQuoteText, memberCommunityQuoteAuthor);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function starsText(rating) {
  const full = Math.max(1, Math.min(5, Number(rating) || 0));
  return "\u2605".repeat(full) + "\u2606".repeat(5 - full);
}

function clearMessages() {
  communityMessage.textContent = "";
}

function getFilteredBooks(books) {
  const query = (communitySearchInput.value || "").trim().toLowerCase();

  if (!query) {
    return books;
  }

  return books.filter(book => {
    return String(book.bookName || "").toLowerCase().includes(query);
  });
}

function renderCommunity(data) {
  lastCommunityPayload = data;
  const groupedBooks = data.books || [];
  const feed = data.feed || [];

  communityRatingsList.innerHTML = "";

  if (!feed.length) {
    communityRatingsList.innerHTML = "<p class='empty-text'>No community ratings available right now.</p>";
    return;
  }

  const source = groupedBooks.length ? getFilteredBooks(groupedBooks) : [];

  if (groupedBooks.length && !source.length) {
    communityRatingsList.innerHTML = "<p class='empty-text'>No rated books match that search.</p>";
    return;
  }

  if (source.length) {
    source.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-item";

      const ratingsRows = (book.ratings || []).map(item => {
        const commentText = item.comment ? escapeHtml(item.comment) : "No comment provided.";
        return `
          <div class="member-community-rating-row">
            <p><strong>Member:</strong> ${escapeHtml(item.memberName)} (${escapeHtml(item.libraryId || "-")})</p>
            <p><strong>Rating:</strong> ${starsText(item.rating)} (${escapeHtml(item.rating)} / 5)</p>
            <p><strong>Comment:</strong> ${commentText}</p>
          </div>
        `;
      }).join("");

      card.innerHTML = `
        <div class="book-item-info">
          <h4>${escapeHtml(book.bookName)}</h4>
          <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
          <p><strong>Genre:</strong> ${escapeHtml(book.genre || "-")}</p>
          <p><strong>Book average:</strong> ${Number(book.averageRating || 0).toFixed(2)} / 5 (${escapeHtml(book.ratingsCount || 0)} ratings)</p>
          <div class="member-community-rating-list">${ratingsRows}</div>
        </div>
      `;
      communityRatingsList.appendChild(card);
    });
  }
}

if (communitySearchInput) {
  communitySearchInput.addEventListener("input", function () {
    if (lastCommunityPayload) {
      renderCommunity(lastCommunityPayload);
    }
  });
}

function loadCommunity() {
  clearMessages();

  fetch("../api/get-community-ratings.php")
    .then(response => response.json())
    .then(data => {
      renderCommunity(data);
    })
    .catch(() => {
      communityMessage.textContent = "Could not load community ratings.";
      communityRatingsList.innerHTML = "<p class='empty-text'>No community ratings available right now.</p>";
    });
}

loadCommunity();
