const memberBorrowedList = document.getElementById("memberBorrowedList");
const memberBorrowedMessage = document.getElementById("memberBorrowedMessage");
const memberBorrowedSuccess = document.getElementById("memberBorrowedSuccess");
const memberBorrowedQuoteText = document.getElementById("memberBorrowedQuoteText");
const memberBorrowedQuoteAuthor = document.getElementById("memberBorrowedQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberBorrowedQuoteText, memberBorrowedQuoteAuthor);

function clearMessages() {
  memberBorrowedMessage.textContent = "";
  memberBorrowedSuccess.textContent = "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadMemberBorrowed() {
  clearMessages();

  fetch("../api/get-member-loans.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      memberBorrowedList.innerHTML = "";

      if (!data.length) {
        memberBorrowedList.innerHTML = "<p class='empty-text'>You have no borrowed books right now.</p>";
        return;
      }

      data.forEach(loan => {
        const loanCard = document.createElement("div");
        loanCard.className = "book-item";
        const isRequested = Boolean(loan.returnRequested);
        const statusText = isRequested ? "Return Requested" : "Borrowed";

        loanCard.innerHTML = `
          <div class="book-item-info">
            <h4>${escapeHtml(loan.name)}</h4>
            <p><strong>Author:</strong> ${escapeHtml(loan.author)}</p>
            <p><strong>Year:</strong> ${escapeHtml(loan.year)}</p>
            <p><strong>Genre:</strong> ${escapeHtml(loan.genre)}</p>
            <p><strong>Description:</strong> ${escapeHtml(loan.description)}</p>
            <p><strong>Due Date:</strong> ${escapeHtml(loan.dueDate)}</p>
            <p><strong>Status:</strong> ${statusText}</p>
          </div>
          <div class="request-actions">
            <button type="button" class="small-btn paid-btn return-book-btn" data-loan-id="${loan.loanId}" data-book-id="${loan.bookId}" ${isRequested ? "disabled" : ""}>
              ${isRequested ? "Return Requested" : "Return Book"}
            </button>
          </div>
        `;

        memberBorrowedList.appendChild(loanCard);
      });
    })
    .catch(() => {
      memberBorrowedList.innerHTML = "<p class='message'>Could not load your books.</p>";
    });
}

memberBorrowedList.addEventListener("click", function (event) {
  const button = event.target.closest(".return-book-btn");

  if (!button) {
    return;
  }

  clearMessages();

  const formData = new FormData();
  formData.append("libraryId", memberLibraryId);
  formData.append("loanId", button.getAttribute("data-loan-id"));
  formData.append("bookId", button.getAttribute("data-book-id"));

  fetch("../api/return-book.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        memberBorrowedSuccess.textContent = data.message;
        loadMemberBorrowed();
      } else {
        memberBorrowedMessage.textContent = data.message;
      }
    })
    .catch(() => {
      memberBorrowedMessage.textContent = "Something went wrong.";
    });
});

loadMemberBorrowed();
