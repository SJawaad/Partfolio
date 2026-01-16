async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("role").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });

  alert(await res.text());
  if (res.ok) window.location.href = "login.html";
}

async function requestToken() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const msg = await res.text();
  alert(msg);

  if (res.ok) {
    document.getElementById("tokenBox").style.display = "block";
  }
}

async function submitToken() {
  const email = document.getElementById("loginEmail").value;
  const token = document.getElementById("loginToken").value;

  const res = await fetch("/login-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token })
  });

  if (!res.ok) {
    alert(await res.text());
    return;
  }

  const userInfo = await res.json();
  alert("Login complete! Role: " + userInfo.role);
}