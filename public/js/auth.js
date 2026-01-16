function showNotice(message, type) {
  const n = document.getElementById("notice");
  if (!n) return alert(message);

  n.className = `notice show ${type}`;
  n.textContent = message;
}

async function register() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("role").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  const msg = await res.text();

  if (!res.ok) {
    showNotice(msg, "error");
    return;
  }

  showNotice(msg, "success");
  setTimeout(() => (window.location.href = "login.html"), 700);
}

async function requestToken() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const msg = await res.text();

  if (!res.ok) {
    showNotice(msg, "error");
    return;
  }

  showNotice(msg, "success");
  document.getElementById("tokenBox").style.display = "block";
}

async function submitToken() {
  const email = document.getElementById("loginEmail").value.trim();
  const token = document.getElementById("loginToken").value.trim();

  const res = await fetch("/login-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });

  if (!res.ok) {
    showNotice(await res.text(), "error");
    return;
  }

  const userInfo = await res.json();
  showNotice(`Login complete! Role: ${userInfo.role}`, "success");

  // Store minimal session info for dashboard display
  localStorage.setItem("userId", userInfo.userId);
  localStorage.setItem("role", userInfo.role);

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
}
