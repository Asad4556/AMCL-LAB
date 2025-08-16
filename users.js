// ✅ Load users in list
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${user.username}</strong> (${user.role})
      <button onclick="deleteUser(${index})">❌ Delete</button>
    `;
    list.appendChild(li);
  });
}

// ✅ Add new user
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !password) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Duplicate check
  if (users.some(u => u.username === username)) {
    alert("⚠ Username already exists!");
    return;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  loadUsers();
});

// ✅ Delete user
function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

// ✅ Initial load
loadUsers();
