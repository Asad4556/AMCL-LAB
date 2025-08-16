/* ======================================
   login.js - Authentication Controller
   Handles Login, Role-based Redirect
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  // Demo users (Admin, Receptionist, Technician)
  const users = [
    { username: "admin", password: "12345", role: "admin" },
    { username: "reception", password: "12345", role: "reception" },
    { username: "technician", password: "12345", role: "technician" }
  ];

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("login-error");

    // Check credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      errorBox.textContent = "Invalid username or password!";
      errorBox.style.display = "block";
      return;
    }

    // Save session
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect by role
    if (user.role === "admin") {
      window.location.href = "manage-users.html";
    } else if (user.role === "reception") {
      window.location.href = "reception-dashboard.html";
    } else if (user.role === "technician") {
      window.location.href = "technician-dashboard.html";
    }
  });
});
