document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.getElementById("login");
  const loginMessage = document.getElementById("loginMessage");

  loginBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginemail").value.trim();
    const password = document.getElementById("loginpassword").value;

    // ---------- VALIDATION ----------
    if (!email || !password) {
      loginMessage.style.color = "red";
      loginMessage.innerText = "Please enter email and password";
      return;
    }

    // ---------- API CALL ----------
    try {
      loginBtn.disabled = true;
      loginBtn.innerText = "Logging in...";

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // ---------- SAVE AUTH DATA ----------
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ---------- SUCCESS ----------
      loginMessage.style.color = "green";
      loginMessage.innerText = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "../dashboard/index.html";
      }, 1000);

    } catch (error) {
      loginMessage.style.color = "red";
      loginMessage.innerText = error.message;
    } finally {
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
    }
  });

});
