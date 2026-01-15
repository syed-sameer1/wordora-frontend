// dashboard.js

// Logout functionality
document.querySelector(".logout").addEventListener("click", function () {
    localStorage.removeItem("userData");
    window.location.href = "../login-page/index.html";
});

// Toggle job details (View / Hide)
document.querySelectorAll(".apply-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const jobCard = button.closest(".job");
        const description = jobCard.querySelector(".job-desc");

        if (description.style.display === "block") {
            description.style.display = "none";
            button.textContent = "View Details";
        } else {
            description.style.display = "block";
            button.textContent = "Hide Details";
        }
    });
});

// Filter jobs
document.querySelector(".filters button").addEventListener("click", function () {
    const selects = document.querySelectorAll(".filters select");
    const selectedValues = Array.from(selects).map(s => s.value.toLowerCase());

    document.querySelectorAll(".job").forEach(function (job) {
        const jobText = job.textContent.toLowerCase();
        const show = selectedValues.every(value =>
            value === "salary" ||
            value === "experience level" ||
            value === "skills" ||
            jobText.includes(value)
        );
        job.style.display = show ? "block" : "none";
    });
});
