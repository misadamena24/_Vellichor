document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const message = document.getElementById("adminMessage");
  message.textContent = "";

  const formData = new FormData();
  formData.append("identifier", document.getElementById("adminUsername").value.trim());
  formData.append("password", document.getElementById("adminPassword").value);
  formData.append("role", "admin");

  fetch("../api/login.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        sessionStorage.setItem("adminName", data.name || "Admin");
        window.location.href = "admin-dashboard.php";
      } else {
        message.textContent = data.message;
      }
    })
    .catch(() => {
      message.textContent = "Something went wrong.";
    });
});
