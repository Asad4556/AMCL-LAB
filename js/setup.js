/* ======================================
   setup.js - Initialize Default Users
   Runs on first load only
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    users = [
      { id: 1, username: "34501-8971113-7", password: "Asad@2723", role: "admin" },
      { id: 2, username: "reception", password: "reception123", role: "receptionist" },
      { id: 3, username: "tech", password: "tech123", role: "technician" }
    ];

    localStorage.setItem("users", JSON.stringify(users));
    console.log("✅ Default users created.");
  }
});
