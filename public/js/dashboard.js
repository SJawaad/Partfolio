function goTo(page) {
  // If the page doesn't exist yet, you'll get a 404 — that's fine for now.
  window.location.href = page;
}

function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

(function init() {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // If user is not "logged in", send back to login page
  if (!userId || !role) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeText").textContent = `Welcome (User #${userId})`;
  document.getElementById("roleBox").textContent = `Signed in as: ${role}`;

  // Simple role-based UI hiding (front-end only)
  // Engineers: hide reports + procurement
  if (role === "Engineer") {
    document.getElementById("reportsBtn").style.display = "none";
    document.getElementById("procureBtn").style.display = "none";
  }

  // Supervisors: hide procurement
  if (role === "Supervisor") {
    document.getElementById("procureBtn").style.display = "none";
  }

  // Managers: can see everything (no change)
})();