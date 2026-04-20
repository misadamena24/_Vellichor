const memberFinesList = document.getElementById("memberFinesList");
const memberFinesMessage = document.getElementById("memberFinesMessage");
const memberFinesSuccess = document.getElementById("memberFinesSuccess");
const memberFinesQuoteText = document.getElementById("memberFinesQuoteText");
const memberFinesQuoteAuthor = document.getElementById("memberFinesQuoteAuthor");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

loadRandomQuoteInto(memberFinesQuoteText, memberFinesQuoteAuthor);

function clearMessage() {
  memberFinesMessage.textContent = "";
  if (memberFinesSuccess) {
    memberFinesSuccess.textContent = "";
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMemberFines(items) {
  memberFinesList.innerHTML = "";

  if (!items.length) {
    memberFinesList.innerHTML = "<p class='empty-text'>No fees.</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "fine-card";

    card.innerHTML = `
      <div class="fine-card-top">
        <h3>${escapeHtml(item.bookName)}</h3>
        <span class="member-library-badge">Unreturned</span>
      </div>

      <div class="fine-details-grid">
        <p><strong>Author:</strong> ${escapeHtml(item.author)}</p>
        <p><strong>Genre:</strong> ${escapeHtml(item.genre)}</p>
        <p><strong>Borrow Date:</strong> ${escapeHtml(item.borrowDate || "-")}</p>
        <p><strong>Due Date:</strong> ${escapeHtml(item.dueDate)}</p>
        <p><strong>Days Late:</strong> ${escapeHtml(item.daysLate)}</p>
        <p><strong>Fee Rate:</strong> $${escapeHtml(item.feePerDay)} / day</p>
        <p><strong>Current Fine:</strong> $${escapeHtml(item.amount)}</p>
        <p><strong>Admin Notification Date:</strong> ${escapeHtml(item.notificationDate || "-")}</p>
      </div>
      <div class="request-actions">
        <button type="button" class="small-btn paid-btn member-pay-fine-btn" data-loan-id="${escapeHtml(item.loanId)}">Pay Now</button>
      </div>
    `;

    memberFinesList.appendChild(card);
  });
}

function loadMemberFines() {
  clearMessage();

  fetch("../api/get-member-fine-notifications.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      renderMemberFines(data || []);
    })
    .catch(() => {
      memberFinesMessage.textContent = "Could not load fine notifications.";
      memberFinesList.innerHTML = "<p class='empty-text'>No fees.</p>";
    });
}

memberFinesList.addEventListener("click", function (event) {
  const payButton = event.target.closest(".member-pay-fine-btn");
  if (!payButton || payButton.disabled) {
    return;
  }

  const loanId = payButton.getAttribute("data-loan-id");
  if (!loanId) {
    return;
  }

  clearMessage();
  payButton.disabled = true;

  const formData = new FormData();
  formData.append("libraryId", memberLibraryId);
  formData.append("loanId", loanId);

  fetch("../api/pay-member-fine.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (memberFinesSuccess) {
          memberFinesSuccess.textContent = data.message;
        }
        loadMemberFines();
      } else {
        memberFinesMessage.textContent = data.message || "Could not process payment.";
        payButton.disabled = false;
      }
    })
    .catch(() => {
      memberFinesMessage.textContent = "Something went wrong.";
      payButton.disabled = false;
    });
});

loadMemberFines();
