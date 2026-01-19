let currentPage = 1;
const limit = 6;

document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.href = "../login-page/index.html";
    return;
  }

  document.querySelector(".logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../login-page/index.html";
  });

  document.querySelector(".filters button").addEventListener("click", () => {
    currentPage = 1;
    loadJobs();
  });

  // 🔥 First load without filters
  loadJobs();
});

async function loadJobs() {
  const jobList = document.querySelector(".job-list");
  jobList.innerHTML = "<p>Loading jobs...</p>";

  let query = [`page=${currentPage}`, `limit=${limit}`];

  const salary = document.querySelector(".filters select:nth-child(1)").value;
  const experience = document.querySelector(".filters select:nth-child(2)").value;
  const skills = document.querySelector(".filters select:nth-child(3)").value;

  if (salary === "30k - 50k") query.push("min_salary=30000&max_salary=50000");
  if (salary === "50k - 100k") query.push("min_salary=50000&max_salary=100000");
  if (salary === "100k+") query.push("min_salary=100000");

  if (experience === "1–3 Years") query.push("experience=3");
  if (experience === "3+ Years") query.push("experience=5");

  if (skills !== "Skills") query.push(`skills=${skills}`);

  const url = `http://127.0.0.1:8000/dashboard?${query.join("&")}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

  const result = await res.json();

  // 🔥 NEW: Update stats count
  updateRecommendedCount(result.pagination.total);

  renderJobs(result.data);
  renderPagination(result.pagination);
}

function renderJobs(jobs) {
  const jobList = document.querySelector(".job-list");
  jobList.innerHTML = "";

  if (!jobs.length) {
    jobList.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  jobs.forEach(job => {
    const div = document.createElement("div");

    const visibleSkills = job.skills.slice(0, 6);
    const extraCount = job.skills.length - visibleSkills.length;

    div.className = "job";

    div.innerHTML = `
      <div class="job-header">
        <h3>${job.title}</h3>
        <span class="badge">${job.education}</span>
      </div>

      <div class="job-tags">
        ${visibleSkills.map(s => `<span>${s}</span>`).join("")}
        ${extraCount > 0 ? `<span class="more">+${extraCount} more</span>` : ""}
      </div>

      <p class="job-salary">
        PKR ${job.salary.toLocaleString()}
      </p>

      <p class="job-desc">
        ${job.description}
      </p>

      <p class="job-exp">
        Experience required: ${job.experience}+ years
      </p>

    `;

    jobList.appendChild(div);
  });
}

function renderPagination(pagination) {
  const container = document.querySelector(".pagination");
  container.innerHTML = "";

  for (let i = 1; i <= pagination.total_pages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === pagination.page ? "active" : "";

    btn.onclick = () => {
      currentPage = i;
      loadJobs();
    };

    container.appendChild(btn);
  }
}

function updateRecommendedCount(total) {
  const countEl = document.getElementById("recommendedCount");
  if (countEl) {
    countEl.innerText = total;
  }
}