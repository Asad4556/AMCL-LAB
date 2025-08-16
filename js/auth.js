document.addEventListener("DOMContentLoaded", function(){
  const form = document.querySelector("form[data-login]");
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const username = form.querySelector("#username")?.value.trim() || "User";
    const role = form.querySelector("#role")?.value || "reception";
    const user = { name: username, role };
    localStorage.setItem("currentUser", JSON.stringify(user));
    const map = { admin:"admin-dashboard.html", reception:"reception-dashboard.html", technician:"technician-dashboard.html" };
    location.href = map[role] || "index.html";
  });
});
