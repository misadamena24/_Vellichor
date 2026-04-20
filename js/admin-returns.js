const returnRequestsList = document.getElementById("returnRequestsList");
const returnRequestDetails = document.getElementById("returnRequestDetails");
const returnSearchInput = document.getElementById("returnSearchInput");
let allRequests = [];
let selectedLoanId = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFilteredRequests() {
  const query = (returnSearchInput.value || "").trim().toLowerCase();

  return allRequests.filter(request => {
    if (!query) {
      return true;
    }
    const searchable = [
      request.memberName,
      request.libraryId,
      request.bookName,
      request.loanId
    ].join(" ").toLowerCase();
    return searchable.includes(query);
  });
}

function renderRequestDetails() {
  const filtered = getFilteredRequests();
  const selected = filtered.find(request => String(request.loanId) === String(selectedLoanId));

  if (!selected) {
    returnRequestDetails.innerHTML = `
      <div class="admin-returns-empty-card">
        <span class="admin-returns-empty-kicker">Details</span>
        <p class="empty-text">Select a return request to view full details.</p>
      </div>
    `;
    return;
  }

  returnRequestDetails.innerHTML = `
    <div class="return-request-card return-request-card-detail">
      <div class="request-card-top">
        <h3>${escapeHtml(selected.memberName)}</h3>
        <span class="member-library-badge">Book: ${escapeHtml(selected.bookName)}</span>
      </div>

      <div class="request-details-grid">
        <p><strong>Library ID:</strong> ${escapeHtml(selected.libraryId)}</p>
        <p><strong>Loan ID:</strong> ${escapeHtml(selected.loanId)}</p>
        <p><strong>Due Date:</strong> ${escapeHtml(selected.dueDate)}</p>
      </div>

      <p class="request-reason"><strong>Status:</strong> Waiting for admin confirmation.</p>

      <div class="request-actions">
        <button type="button" class="approve-btn" id="confirmSelectedReturn">Confirm</button>
        <button type="button" class="deny-btn" id="deleteSelectedReturn">Delete</button>
      </div>
    </div>
  `;

  document.getElementById("confirmSelectedReturn").addEventListener("click", function () {
    const confirmed = confirm("Confirm this returned book?");
    if (confirmed) {
      updateReturnRequest(selected.loanId, "confirm");
    }
  });

  document.getElementById("deleteSelectedReturn").addEventListener("click", function () {
    const confirmed = confirm("Delete this return notification?");
    if (confirmed) {
      updateReturnRequest(selected.loanId, "delete");
    }
  });
}

function renderRequestList() {
  const filtered = getFilteredRequests();
  returnRequestsList.innerHTML = "";

  if (!filtered.length) {
    returnRequestsList.innerHTML = `
      <div class="admin-returns-empty-card admin-returns-empty-list">
        <span class="admin-returns-empty-kicker">All Clear</span>
        <p class="empty-text">No return notifications found.</p>
      </div>
    `;
    returnRequestDetails.innerHTML = `
      <div class="admin-returns-empty-card">
        <span class="admin-returns-empty-kicker">Details</span>
        <p class="empty-text">No request selected.</p>
      </div>
    `;
    return;
  }

  if (!filtered.some(request => String(request.loanId) === String(selectedLoanId))) {
    selectedLoanId = filtered[0].loanId;
  }

  filtered.forEach(request => {
    const isActive = String(request.loanId) === String(selectedLoanId);
    const item = document.createElement("button");
    item.type = "button";
    item.className = `admin-return-item ${isActive ? "active" : ""}`;
    item.innerHTML = `
      <span class="admin-return-item-title">${escapeHtml(request.memberName)}</span>
      <span class="admin-return-item-meta">${escapeHtml(request.bookName)}</span>
      <span class="admin-return-item-meta">Library ID: ${escapeHtml(request.libraryId)} | Loan #${escapeHtml(request.loanId)}</span>
      <span class="admin-return-item-meta">Due: ${escapeHtml(request.dueDate)}</span>
    `;

    item.addEventListener("click", function () {
      selectedLoanId = request.loanId;
      renderRequestList();
      renderRequestDetails();
    });

    returnRequestsList.appendChild(item);
  });

  renderRequestDetails();
}

function loadReturnRequests() {
  fetch("../api/get-return-requests.php")
    .then(response => response.json())
    .then(data => {
      allRequests = Array.isArray(data) ? data : [];
      renderRequestList();
    })
    .catch(() => {
      returnRequestsList.innerHTML = "<p class='message'>Could not load return notifications.</p>";
      returnRequestDetails.innerHTML = "<p class='message'>Could not load request details.</p>";
    });
}

function updateReturnRequest(loanId, action) {
  const formData = new FormData();
  formData.append("loanId", loanId);
  formData.append("action", action);

  fetch("../api/update-return-request.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadReturnRequests();
      } else {
        alert(data.message);
      }
    })
    .catch(() => {
      alert("Something went wrong.");
    });
}

returnSearchInput.addEventListener("input", function () {
  renderRequestList();
});

loadReturnRequests();
