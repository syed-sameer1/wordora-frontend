// Wait for the HTML to fully load
document.addEventListener("DOMContentLoaded", function() {

  // Get the message paragraph
  let message = document.getElementById("message");

  // Register button click
  document.getElementById("register").addEventListener("click", function () {

    // Get values from inputs
    let username = document.getElementById("Username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let experience = document.getElementById("Experience").value;

    // Get selected qualification
    let education = document.querySelector('input[name="education"]:checked');

    // Get selected skills
    let skillCheckboxes = document.querySelectorAll('input[name="skills[]"]:checked');
    let skills = [];
    skillCheckboxes.forEach((checkbox) => skills.push(checkbox.value));

    // ---------- VALIDATION ----------
    if(username === "" || email === "" || password === "" || confirmPassword === ""){
      message.style.color = "red";
      message.innerText = "Please fill all personal information fields";
      return;
    }

    if(password !== confirmPassword){
      message.style.color = "red";
      message.innerText = "Passwords do not match";
      return;
    }

    if(password.length < 6){
      message.style.color = "red";
      message.innerText = "Password must be at least 6 characters";
      return;
    }

    if(!education){
      message.style.color = "red";
      message.innerText = "Please select your qualification";
      return;
    }

    if(skills.length === 0){
      message.style.color = "red";
      message.innerText = "Please select at least one skill";
      return;
    }

    // ---------- SAVE USER ----------
    let user = {
      username: username,
      email: email,
      password: password,
      experience: experience,
      education: education.value,
      skills: skills
    };

    localStorage.setItem("user", JSON.stringify(user));

    console.log('userDate', {user});

    // ---------- SUCCESS MESSAGE ----------
    message.style.color = "green";
    message.innerText = "Registration successful! Redirecting...";

    // ---------- REDIRECT TO MAIN SCREEN ----------
    setTimeout(function(){
      window.location.href = "../dashboard/main.html"; // change "main.html" to your page name
    }, 1000); // wait 1 second to show message
  });

});
