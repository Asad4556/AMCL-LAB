/* ======================================
   login.js - Handle User Login
====================================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      msg.style.color = "green";
      msg.textContent = "✅ Login successful! Redirecting...";

      setTimeout(() => {
        if (user.role === "admin") window.location.href = "admin-dashboard.html";
        else if (user.role === "receptionist") window.location.href = "reception-dashboard.html";
        else if (user.role === "technician") window.location.href = "technician-dashboard.html";
      }, 1000);
    } else {
      msg.style.color = "red";
      msg.textContent = "❌ Invalid username or password!";
    }
  });
});
