// Load Departments on page load
document.addEventListener("DOMContentLoaded", loadDepartments);

// Add Department
document.getElementById("departmentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("departmentName").value.trim();
  if (!name) return;

  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  if (departments.some(d => d.name === name)) {
    alert("⚠ Department already exists!");
    return;
  }

  departments.push({ name: name, tests: [] });
  localStorage.setItem("departments", JSON.stringify(departments));
  document.getElementById("departmentName").value = "";
  loadDepartments();
});

// Load Departments
function loadDepartments() {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const list = document.getElementById("departmentList");
  list.innerHTML = "";

  departments.forEach((dept, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${dept.name}
      <button onclick="manageTests('${dept.name}')">🧪 Manage Tests</button>
      <button onclick="deleteDepartment(${index})">🗑 Delete</button>
    `;
    list.appendChild(li);
  });
}

// Delete Department
function deleteDepartment(index) {
  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  departments.splice(index, 1);
  localStorage.setItem("departments", JSON.stringify(departments));
  loadDepartments();
}

// Show Test Management for a department
function manageTests(departmentName) {
  const testSection = document.getElementById("testSection");
  testSection.innerHTML = `
    <h3>Tests for ${departmentName}</h3>
    <form onsubmit="addTest(event, '${departmentName}')">
      <input type="text" id="testName" placeholder="Enter test name" required>
      <button type="submit">➕ Add Test</button>
    </form>
    <ul id="testList"></ul>
    <button onclick="loadDepartments();document.getElementById('testSection').innerHTML='<p>Select a department to manage tests.</p>';">⬅ Back to Departments</button>
  `;

  loadTests(departmentName);
}

// Load Tests
function loadTests(departmentName) {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const dept = departments.find(d => d.name === departmentName);
  const testList = document.getElementById("testList");
  testList.innerHTML = "";

  if (!dept) return;

  dept.tests.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t} 
      <button onclick="deleteTest('${departmentName}', ${index})">🗑 Delete</button>
    `;
    testList.appendChild(li);
  });
}

// Add Test
function addTest(e, departmentName) {
  e.preventDefault();
  const testInput = document.getElementById("testName");
  const testName = testInput.value.trim();
  if (!testName) return;

  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  const deptIndex = departments.findIndex(d => d.name === departmentName);

  if (deptIndex >= 0) {
    departments[deptIndex].tests.push(testName);
    localStorage.setItem("departments", JSON.stringify(departments));
    testInput.value = "";
    loadTests(departmentName);
  }
}

// Delete Test
function deleteTest(departmentName, index) {
  let departments = JSON.parse(localStorage.getItem("departments")) || [];
  const deptIndex = departments.findIndex(d => d.name === departmentName);

  if (deptIndex >= 0) {
    departments[deptIndex].tests.splice(index, 1);
    localStorage.setItem("departments", JSON.stringify(departments));
    loadTests(departmentName);
  }
}
