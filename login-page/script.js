document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.getElementById("login");
  const loginMessage = document.getElementById("loginMessage");

  loginBtn.addEventListener("click", function (event) {

    event.preventDefault(); // prevent form submit

    const loginEmail = document.getElementById("loginemail").value;
    const loginPass = document.getElementById("loginpassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      loginMessage.style.color = "red";
      loginMessage.innerText = "No registered user found. Please register first.";
      return;
    }

    if (
      loginEmail === storedUser.email && loginPass === storedUser.password
    ) {
      loginMessage.style.color = "green";
      loginMessage.innerText = "Login successful! Redirecting…";

      setTimeout(function () {
        window.location.href = "../dashboard/main.html"; // change this to your main page filename
      }, 1000);
    } else {
      loginMessage.style.color = "red";
      loginMessage.innerText = "Username/email or password is incorrect.";
    }
  });
});
