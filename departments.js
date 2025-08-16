// ✅ Load departments from localStorage
function loadDepartments() {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const list = document.getElementById("departmentList");
  list.innerHTML = "";

  departments.forEach((dept, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${dept}
      <button onclick="deleteDepartment(${index})">❌ Delete</button>
    `;
    list.appendChild(li);
  });
}

// ✅ Add new department
document.getElementById("departmentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const deptName = document.getElementById("departmentName").value.trim();
  if (!deptName) return;

  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  departments.push(deptName);
  localStorage.setItem("departments", JSON.stringify(departments));

  document.getElementById("departmentName").value = "";
  loadDepartments();
});

// ✅ Delete department
function deleteDepartment(index) {
  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  departments.splice(index, 1);
  localStorage.setItem("departments", JSON.stringify(departments));
  loadDepartments();
}

// ✅ Initial load
loadDepartments();
