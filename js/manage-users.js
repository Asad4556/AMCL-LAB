/* ======================================
   manage-users.js - Admin Dashboard
   Handles User Management (Receptionist / Technician)
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  initUserForm();
  loadUsers();
});

/* ==============================
   ADD NEW USER
============================== */
function initUserForm() {
  const form = document.getElementById("user-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      id: Date.now(),
      username: document.getElementById("u-username").value.trim(),
      password: document.getElementById("u-password").value.trim(),
      role: document.getElementById("u-role").value,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate username
    if (users.some((u) => u.username === user.username)) {
      alert("⚠️ Username already exists!");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    loadUsers();
  });
}

/* ==============================
   LOAD USERS LIST
============================== */
function loadUsers() {
  const tableBody = document.getElementById("users-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-small btn-danger" onclick="deleteUser(${user.id})">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/* ==============================
   DELETE USER
============================== */
function deleteUser(userId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((u) => u.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}
