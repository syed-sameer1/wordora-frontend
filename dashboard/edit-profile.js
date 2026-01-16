document.addEventListener("DOMContentLoaded", function () {

  // ---------- AUTH GUARD ----------
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    window.location.href = "../login-page/index.html";
    return;
  }

  // ---------- PREFILL DATA ----------
  document.getElementById("username").value = user.name || "";
  document.getElementById("experience").value = user.experience || "";

  // Education
  if (user.education) {
    const eduRadio = document.querySelector(
      `input[name="education"][value="${user.education}"]`
    );
    if (eduRadio) eduRadio.checked = true;
  }

  // Skills (handle array safely)
  const userSkills = Array.isArray(user.skills)
    ? user.skills
    : user.skills.split(",");

  document.querySelectorAll(".skills input[type='checkbox']").forEach(cb => {
    if (userSkills.includes(cb.parentElement.textContent.trim())) {
      cb.checked = true;
    }
  });

  // ---------- SAVE PROFILE ----------
  const saveBtn = document.querySelector(".btn-group button");

  saveBtn.addEventListener("click", async function () {

    const experience = Number(document.getElementById("experience").value);
    const educationEl = document.querySelector("input[name='education']:checked");

    const skills = Array.from(
      document.querySelectorAll(".skills input[type='checkbox']:checked")
    ).map(cb => cb.parentElement.textContent.trim());

    if (!educationEl) {
      alert("Please select qualification");
      return;
    }

    if (skills.length === 0) {
      alert("Please select at least one skill");
      return;
    }

    try {
      saveBtn.disabled = true;
      saveBtn.innerText = "Saving...";

      const response = await fetch(
        `http://127.0.0.1:8000/edit-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            experience,
            education: educationEl.value,
            skills
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      // ---------- UPDATE LOCAL USER ----------
      user.experience = experience;
      user.education = educationEl.value;
      user.skills = skills;

      localStorage.setItem("user", JSON.stringify(user));

      alert("Profile updated successfully");

    } catch (error) {
      alert(error.message);
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerText = "Save Changes";
    }
  });

});
