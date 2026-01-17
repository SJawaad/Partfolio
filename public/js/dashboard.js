// ------------------------------
// NAVIGATION HELPERS
// ------------------------------

/**
 * Simple navigation helper.
 * Takes the user to another webpage.
 */
function goTo(page) {
  window.location.href = page;
}

/**
 * Logs the user out by clearing stored session data
 * and redirecting back to the login page.
 */
function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

// ------------------------------
// DASHBOARD INITIALISATION
// ------------------------------

(function init() {
  // Retrieve stored session data from login
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  // If no user data exists, force return to login page
  // (basic front-end access control)
  if (!userId || !role) {
    window.location.href = "login.html";
    return;
  }

  // Update UI with user details
  document.getElementById("userLine").textContent = `User #${userId}`;
  document.getElementById("roleText").textContent = role;
  document.getElementById("welcomeText").textContent =
    `Welcome back — signed in as ${role}`;

  // Get references to role-restricted elements
  const reportsTab = document.getElementById("reportsTab");
  const procureTab = document.getElementById("procureTab");
  const reportsCard = document.getElementById("reportsCard");
  const procureCard = document.getElementById("procureCard");

  // ------------------------------
  // ROLE-BASED UI VISIBILITY
  // (Front-end only — for presentation)
  // ------------------------------

  if (role === "Engineer") {
    // Engineers cannot see reports or procurement
    if (reportsTab) reportsTab.style.display = "none";
    if (procureTab) procureTab.style.display = "none";
    if (reportsCard) reportsCard.style.display = "none";
    if (procureCard) procureCard.style.display = "none";
  } 
  else if (role === "Supervisor") {
    // Supervisors can see reports but not procurement
    if (procureTab) procureTab.style.display = "none";
    if (procureCard) procureCard.style.display = "none";
  }
  // Managers can see everything — no changes needed
})();
