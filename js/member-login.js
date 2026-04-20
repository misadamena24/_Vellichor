document.getElementById("memberLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const message = document.getElementById("memberLoginMessage");
  message.textContent = "";

  const identifier = document.getElementById("memberIdentifier").value.trim();
  const password = document.getElementById("memberPassword").value;

  const formData = new FormData();
  formData.append("identifier", identifier);
  formData.append("password", password);
  formData.append("role", "member");

  fetch("../api/login.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem("memberName", data.name || data.username);
        sessionStorage.setItem("memberUsername", data.username || "");
        sessionStorage.setItem("memberLibraryId", data.libraryId || "");
        window.location.href = "member-dashboard.php";
      } else {
        message.textContent = data.message;
      }
    })
    .catch(() => {
      message.textContent = "Something went wrong.";
    });
});
