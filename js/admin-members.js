// JavaScript for admin-members page
// TODO: add admin member management logic
const membersList = document.getElementById("membersList");
const memberSearchInput = document.getElementById("memberSearchInput");
const memberDetailsModal = document.getElementById("memberDetailsModal");
const memberDetailsClose = document.getElementById("memberDetailsClose");
const memberDetailsContent = document.getElementById("memberDetailsContent");
let allMembers = [];

function createBookList(items) {
  if (!items.length) {
    return "<p class='member-books-empty'>None</p>";
  }

  return `
    <ul class="member-books-list">
      ${items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function openMemberDetails(member) {
  memberDetailsContent.innerHTML = `
    <div class="member-admin-header">
      <h3>${escapeHtml(member.name)} ${escapeHtml(member.surname)}</h3>
      <span class="member-library-badge">Library ID: ${escapeHtml(member.libraryId)}</span>
    </div>

    <div class="member-admin-details">
      <p><strong>Email:</strong> ${escapeHtml(member.email)}</p>
      <p><strong>Username:</strong> ${escapeHtml(member.username)}</p>
      <p><strong>Status:</strong> ${member.isPassive ? "Passive" : "Active Borrowing"}</p>
    </div>

    <div class="member-admin-books-grid">
      <div class="member-books-box">
        <h4>Books Read</h4>
        ${createBookList(member.booksRead)}
      </div>

      <div class="member-books-box">
        <h4>Books Returned</h4>
        ${createBookList(member.booksReturned)}
      </div>

      <div class="member-books-box">
        <h4>Books Not Returned</h4>
        ${createBookList(member.booksNotReturned)}
      </div>
    </div>
  `;

  memberDetailsModal.hidden = false;
}

function closeMemberDetails() {
  memberDetailsModal.hidden = true;
}

function deleteMember(memberId) {
  fetch("../api/delete-member.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId: memberId })
  })
    .then(response => response.json())
    .then(result => {
      if (!result.success) {
        alert(result.message || "Could not delete member.");
        return;
      }
      loadMembers();
    })
    .catch(() => {
      alert("Could not delete member.");
    });
}

function createMemberCard(member) {
  const memberCard = document.createElement("div");
  memberCard.className = "member-admin-card member-summary-card";

  const statusClass = member.isPassive ? "member-status-passive" : "member-status-active";
  const statusText = member.isPassive ? "Passive" : "Active Borrowing";

  memberCard.innerHTML = `
    <button type="button" class="member-summary-main" data-member-id="${member.id}">
      <div class="member-admin-header">
        <h3>${escapeHtml(member.name)} ${escapeHtml(member.surname)}</h3>
        <span class="member-library-badge">Library ID: ${escapeHtml(member.libraryId)}</span>
      </div>
      <div class="member-admin-details member-summary-details">
        <p><strong>Email:</strong> ${escapeHtml(member.email)}</p>
        <p><strong>Username:</strong> ${escapeHtml(member.username)}</p>
        <p><strong>Status:</strong> <span class="member-status-pill ${statusClass}">${statusText}</span></p>
      </div>
    </button>
    <div class="member-summary-actions">
      <button type="button" class="small-btn member-view-btn" data-view-id="${member.id}">View Details</button>
      <button type="button" class="delete-btn member-delete-btn" data-delete-id="${member.id}">
        Delete Member
      </button>
    </div>
  `;

  memberCard.querySelector(".member-summary-main").addEventListener("click", () => {
    openMemberDetails(member);
  });

  memberCard.querySelector(".member-view-btn").addEventListener("click", () => {
    openMemberDetails(member);
  });

  memberCard.querySelector(".member-delete-btn").addEventListener("click", () => {
    const confirmed = window.confirm(`Delete ${member.name} ${member.surname}?`);
    if (confirmed) {
      deleteMember(member.id);
    }
  });

  return memberCard;
}

function renderMembers() {
  const query = (memberSearchInput.value || "").trim().toLowerCase();

  const filtered = allMembers.filter(member => {
    if (!query) {
      return true;
    }
    const searchable = [
      member.name,
      member.surname,
      member.username,
      member.email,
      member.libraryId
    ].join(" ").toLowerCase();
    return searchable.includes(query);
  });

  membersList.innerHTML = "";

  if (!filtered.length) {
    membersList.innerHTML = "<p class='empty-text'>No members found.</p>";
    return;
  }

  filtered
    .sort((a, b) => `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`))
    .forEach(member => {
    membersList.appendChild(createMemberCard(member));
    });
}

function loadMembers() {
  fetch("../api/get-members.php")
    .then(response => response.json())
    .then(data => {
      allMembers = Array.isArray(data) ? data : [];
      renderMembers();
    })
    .catch(() => {
      membersList.innerHTML = "<p class='message'>Could not load members.</p>";
    });
}

memberSearchInput.addEventListener("input", function () {
  renderMembers();
});

memberDetailsClose.addEventListener("click", closeMemberDetails);
memberDetailsModal.addEventListener("click", function (event) {
  if (event.target === memberDetailsModal) {
    closeMemberDetails();
  }
});

loadMembers();
