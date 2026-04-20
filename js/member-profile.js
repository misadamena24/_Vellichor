const memberProfileMessage = document.getElementById("memberProfileMessage");
const memberProfileSuccess = document.getElementById("memberProfileSuccess");
const memberProfileStats = document.getElementById("memberProfileStats");
const memberProfileDisplayName = document.getElementById("memberProfileDisplayName");
const memberProfileBioPreview = document.getElementById("memberProfileBioPreview");
const memberBioForm = document.getElementById("memberBioForm");
const memberBioInput = document.getElementById("memberBioInput");
const memberProfileRatings = document.getElementById("memberProfileRatings");

const memberLibraryId = sessionStorage.getItem("memberLibraryId");

if (!memberLibraryId) {
  window.location.href = "member-login.php";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clearMessages() {
  memberProfileMessage.textContent = "";
  memberProfileSuccess.textContent = "";
}

function getAchievementsCount() {
  const storageKey = "vellichorQuizProgress_" + memberLibraryId;
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return 0;
  }

  try {
    const parsed = JSON.parse(raw);
    const highestPassed = Number(parsed.highestPassed) || 0;
    return Math.max(0, Math.min(100, highestPassed));
  } catch (_error) {
    return 0;
  }
}

function renderProfileStats(member) {
  memberProfileDisplayName.textContent = member.displayName || "Profile";
  memberProfileBioPreview.textContent = member.bio || "No bio yet. Add your bio below.";
  const achievementsCount = getAchievementsCount();

  memberProfileStats.innerHTML = `
    <div class="stats-card">
      <h3>Library ID</h3>
      <p>${escapeHtml(member.libraryId)}</p>
    </div>
    <div class="stats-card">
      <h3>Books Read</h3>
      <p>${escapeHtml(member.booksReadCount)}</p>
    </div>
    <div class="stats-card">
      <h3>Books Borrowed</h3>
      <p>${escapeHtml(member.booksBorrowedCount)}</p>
    </div>
    <div class="stats-card">
      <h3>My Ratings</h3>
      <p>${escapeHtml(member.ratingsCount)}</p>
    </div>
    <div class="stats-card">
      <h3>Achievements</h3>
      <p>${escapeHtml(achievementsCount)}</p>
    </div>
  `;

  memberBioInput.value = member.bio || "";
}

function renderRatings(ratings) {
  memberProfileRatings.innerHTML = "";

  if (!ratings.length) {
    memberProfileRatings.innerHTML = "<p class='empty-text'>You have not rated any books yet.</p>";
    return;
  }

  ratings.forEach(item => {
    const card = document.createElement("div");
    card.className = "book-item";
    card.innerHTML = `
      <div class="book-item-info">
        <h4>${escapeHtml(item.bookName)}</h4>
        <p><strong>Author:</strong> ${escapeHtml(item.author)}</p>
        <p><strong>Rating:</strong> ${escapeHtml(item.rating)} / 5</p>
        <p><strong>Comment:</strong> ${escapeHtml(item.comment || "No comment")}</p>
      </div>
    `;
    memberProfileRatings.appendChild(card);
  });
}

function loadProfile() {
  clearMessages();

  fetch("../api/get-member-profile.php?libraryId=" + encodeURIComponent(memberLibraryId))
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        memberProfileMessage.textContent = data.message || "Could not load profile.";
        return;
      }

      renderProfileStats(data.member || {});
      renderRatings(data.ratings || []);
    })
    .catch(() => {
      memberProfileMessage.textContent = "Could not load profile.";
    });
}

memberBioForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessages();

  const formData = new FormData();
  formData.append("libraryId", memberLibraryId);
  formData.append("bio", memberBioInput.value.trim());

  fetch("../api/update-member-bio.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        memberProfileSuccess.textContent = data.message;
        loadProfile();
      } else {
        memberProfileMessage.textContent = data.message || "Could not update bio.";
      }
    })
    .catch(() => {
      memberProfileMessage.textContent = "Could not update bio.";
    });
});

loadProfile();
