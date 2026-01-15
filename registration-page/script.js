document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");

  document.getElementById("register").addEventListener("click", function () {
    const username = Username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value;
    const confirmPasswordVal = confirmPassword.value;
    const experience = Experience.value;

    const education = document.querySelector('input[name="education"]:checked');
    const skills = Array.from(
      document.querySelectorAll('input[name="skills[]"]:checked')
    ).map(cb => cb.value);

    if (!username || !emailVal || !passwordVal || !confirmPasswordVal) {
      message.style.color = "red";
      message.innerText = "Please fill all required fields";
      return;
    }

    if (passwordVal !== confirmPasswordVal) {
      message.style.color = "red";
      message.innerText = "Passwords do not match";
      return;
    }

    if (!education) {
      message.style.color = "red";
      message.innerText = "Please select your qualification";
      return;
    }

    if (skills.length === 0) {
      message.style.color = "red";
      message.innerText = "Please select at least one skill";
      return;
    }

    const user = {
      username,
      email: emailVal,
      password: passwordVal,
      experience,
      education: education.value,
      skills
    };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "lightgreen";
    message.innerText = "Registration successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "../dashboard/main.html";
    }, 1000);
  });
});
