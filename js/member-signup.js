document.getElementById("memberSignupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const errorMessage = document.getElementById("memberSignupMessage");
  const successMessage = document.getElementById("memberSignupSuccess");

  errorMessage.textContent = "";
  successMessage.textContent = "";

  const name = document.getElementById("signupName").value.trim();
  const surname = document.getElementById("signupSurname").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password.length < 8) {
    errorMessage.textContent = "Password must be at least 8 characters long.";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords must match.";
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("confirmPassword", confirmPassword);

  fetch("../api/member-signup.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        successMessage.textContent = "Account created. Your library ID is " + data.libraryId + ". Redirecting...";
        sessionStorage.setItem("memberName", data.name || "");
        sessionStorage.setItem("memberUsername", data.username || "");
        sessionStorage.setItem("memberLibraryId", data.libraryId || "");

        setTimeout(() => {
          window.location.href = "member-dashboard.php";
        }, 1200);
      } else {
        errorMessage.textContent = data.message;
      }
    })
    .catch(() => {
      errorMessage.textContent = "Something went wrong.";
    });
});
