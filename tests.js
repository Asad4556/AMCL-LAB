// ✅ Load departments in dropdown
function loadDepartmentsDropdown() {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const deptSelect = document.getElementById("departmentSelect");
  deptSelect.innerHTML = "";

  departments.forEach(dept => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    deptSelect.appendChild(option);
  });
}

// ✅ Load tests in list
function loadTests() {
  const tests = JSON.parse(localStorage.getItem("tests")) || [];
  const list = document.getElementById("testList");
  list.innerHTML = "";

  tests.forEach((test, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${test.name}</strong> (${test.department})
      <button onclick="deleteTest(${index})">❌ Delete</button>
    `;
    list.appendChild(li);
  });
}

// ✅ Add new test
document.getElementById("testForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const testName = document.getElementById("testName").value.trim();
  const deptName = document.getElementById("departmentSelect").value;

  if (!testName || !deptName) return;

  let tests = JSON.parse(localStorage.getItem("tests")) || [];
  tests.push({ name: testName, department: deptName });
  localStorage.setItem("tests", JSON.stringify(tests));

  document.getElementById("testName").value = "";
  loadTests();
});

// ✅ Delete test
function deleteTest(index) {
  let tests = JSON.parse(localStorage.getItem("tests")) || [];
  tests.splice(index, 1);
  localStorage.setItem("tests", JSON.stringify(tests));
  loadTests();
}

// ✅ Initial load
loadDepartmentsDropdown();
loadTests();
