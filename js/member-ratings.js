const memberRatingsList = document.getElementById("memberRatingsList");
const memberRatingsMessage = document.getElementById("memberRatingsMessage");
const memberRatingsSuccess = document.getElementById("memberRatingsSuccess");
const memberRatingsQuoteText = document.getElementById("memberRatingsQuoteText");
const memberRatingsQuoteAuthor = document.getElementById("memberRatingsQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberRatingsQuoteText, memberRatingsQuoteAuthor);

function clearMessages() {
  memberRatingsMessage.textContent = "";
  memberRatingsSuccess.textContent = "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function syncStarVisuals(form) {
  if (!form) {
    return;
  }

  const selected = form.querySelector(".member-rating-radio:checked");
  const selectedValue = selected ? Number(selected.value) : 0;
  const options = form.querySelectorAll(".member-star-option");

  options.forEach(option => {
    const input = option.querySelector(".member-rating-radio");
    const span = option.querySelector("span");
    const value = Number(input ? input.value : 0);
    const isActive = value > 0 && value <= selectedValue;

    if (!span) {
      return;
    }

    option.classList.toggle("is-active", isActive);
    span.classList.toggle("is-active", isActive);
  });
}

function renderBooks(books) {
  memberRatingsList.innerHTML = "";

  if (!books.length) {
    memberRatingsList.innerHTML = "<p class='empty-text'>You do not have any returned books to rate yet.</p>";
    return;
  }

  books.forEach(book => {
    const ratingCard = document.createElement("div");
    ratingCard.className = "book-item";

    const existingRating = book.existingRating ? `
      <p><strong>Your Rating:</strong> ${escapeHtml(book.existingRating.rating)} / 5</p>
      <p><strong>Your Comment:</strong> ${escapeHtml(book.existingRating.comment || "No comment")}</p>
    ` : "";

    ratingCard.innerHTML = `
      <div class="book-item-info">
        <h4>${escapeHtml(book.name)}</h4>
        <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
        <p><strong>Genre:</strong> ${escapeHtml(book.genre)}</p>
        <p><strong>Description:</strong> ${escapeHtml(book.description)}</p>
        ${existingRating}
      </div>

      <form class="member-rating-form" data-book-id="${book.id}">
        <label for="rating-${book.id}">Rating</label>
        <div id="rating-${book.id}" class="member-rating-stars" role="radiogroup" aria-label="Select rating">
          <label class="member-star-option">
            <input type="radio" class="member-rating-radio" name="rating-${book.id}" value="1" ${book.existingRating ? "disabled" : ""}>
            <span aria-hidden="true">&#9733;</span>
          </label>
          <label class="member-star-option">
            <input type="radio" class="member-rating-radio" name="rating-${book.id}" value="2" ${book.existingRating ? "disabled" : ""}>
            <span aria-hidden="true">&#9733;</span>
          </label>
          <label class="member-star-option">
            <input type="radio" class="member-rating-radio" name="rating-${book.id}" value="3" ${book.existingRating ? "disabled" : ""}>
            <span aria-hidden="true">&#9733;</span>
          </label>
          <label class="member-star-option">
            <input type="radio" class="member-rating-radio" name="rating-${book.id}" value="4" ${book.existingRating ? "disabled" : ""}>
            <span aria-hidden="true">&#9733;</span>
          </label>
          <label class="member-star-option">
            <input type="radio" class="member-rating-radio" name="rating-${book.id}" value="5" ${book.existingRating ? "disabled" : ""}>
            <span aria-hidden="true">&#9733;</span>
          </label>
        </div>

        <label for="comment-${book.id}">Comment</label>
        <textarea id="comment-${book.id}" class="member-rating-comment" placeholder="Write your opinion about this book..." ${book.existingRating ? "disabled" : ""}></textarea>

        <button type="submit" ${book.existingRating ? "disabled" : ""}>
          ${book.existingRating ? "Already Rated" : "Submit Rating"}
        </button>
      </form>
    `;

    memberRatingsList.appendChild(ratingCard);
    syncStarVisuals(ratingCard.querySelector(".member-rating-form"));
  });
}

function loadRateableBooks() {
  clearMessages();

  fetch("../api/get-member-rateable-books.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      renderBooks(data);
    })
    .catch(() => {
      memberRatingsList.innerHTML = "<p class='message'>Could not load returned books.</p>";
    });
}

memberRatingsList.addEventListener("submit", function (event) {
  const form = event.target.closest(".member-rating-form");

  if (!form) {
    return;
  }

  event.preventDefault();
  clearMessages();

  const bookId = form.getAttribute("data-book-id");
  const selectedRating = form.querySelector(".member-rating-radio:checked");
  const rating = selectedRating ? selectedRating.value : "";
  const comment = form.querySelector(".member-rating-comment").value.trim();

  if (!rating) {
    memberRatingsMessage.textContent = "Please select a star rating.";
    return;
  }

  const formData = new FormData();
  formData.append("libraryId", memberLibraryId);
  formData.append("bookId", bookId);
  formData.append("rating", rating);
  formData.append("comment", comment);

  fetch("../api/add-rating.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        memberRatingsSuccess.textContent = data.message;
        loadRateableBooks();
      } else {
        memberRatingsMessage.textContent = data.message;
      }
    })
    .catch(() => {
      memberRatingsMessage.textContent = "Something went wrong.";
    });
});

memberRatingsList.addEventListener("change", function (event) {
  const radio = event.target.closest(".member-rating-radio");
  if (!radio) {
    return;
  }

  const form = radio.closest(".member-rating-form");
  syncStarVisuals(form);
});

memberRatingsList.addEventListener("click", function (event) {
  const option = event.target.closest(".member-star-option");
  if (!option) {
    return;
  }

  const input = option.querySelector(".member-rating-radio");
  if (!input || input.disabled) {
    return;
  }

  input.checked = true;
  syncStarVisuals(option.closest(".member-rating-form"));
});

loadRateableBooks();
