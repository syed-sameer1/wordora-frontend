document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");
  const registerBtn = document.getElementById("register");

  registerBtn.addEventListener("click", async function () {

    // ----- GET VALUES -----
    const name = document.getElementById("Username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const experience = Number(document.getElementById("Experience").value);

    const educationEl = document.querySelector('input[name="education"]:checked');
    const skills = Array.from(
      document.querySelectorAll('input[name="skills[]"]:checked')
    ).map(skill => skill.value);

    // ----- VALIDATION -----
    if (!name || !email || !password || !confirmPassword) {
      message.style.color = "red";
      message.innerText = "Please fill all required fields";
      return;
    }

    if (password !== confirmPassword) {
      message.style.color = "red";
      message.innerText = "Passwords do not match";
      return;
    }

    if (!educationEl) {
      message.style.color = "red";
      message.innerText = "Please select your qualification";
      return;
    }

    if (skills.length === 0) {
      message.style.color = "red";
      message.innerText = "Please select at least one skill";
      return;
    }

    // ----- API BODY -----
    const payload = {
      name,
      email,
      password,
      experience,
      education: educationEl.value,
      skills
    };

    // ----- API CALL -----
    try {
      registerBtn.disabled = true;
      registerBtn.innerText = "Registering...";

      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ----- SUCCESS -----
      message.style.color = "lightgreen";
      message.innerText = "Registration successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "../login-page/index.html";
      }, 1000);

    } catch (error) {
      message.style.color = "red";
      message.innerText = error.message;
    } finally {
      registerBtn.disabled = false;
      registerBtn.innerText = "Register";
    }
  });
});
