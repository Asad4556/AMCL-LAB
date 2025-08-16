// Hamesha purane users delete karo
localStorage.removeItem("users");
localStorage.removeItem("usersInitialized");

// Naye users add karo
const users = [
  { username: "34501-8971113-7", password: "Asad@2723", role: "admin" },
  { username: "reception", password: "reception123", role: "receptionist" },
  { username: "tech", password: "tech123", role: "technician" }
];
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("usersInitialized", "true");

// Login handling
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMessage");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    msg.style.color = "lightgreen";
    msg.textContent = "✅ Login successful!";
    localStorage.setItem("currentUser", JSON.stringify(user));
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
