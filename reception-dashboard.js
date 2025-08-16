// ✅ Load Departments in dropdown
function loadDepartments() {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const deptSelect = document.getElementById("pDepartment");
  deptSelect.innerHTML = "";

  departments.forEach(dept => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    deptSelect.appendChild(option);
  });
}

// ✅ Load Tests according to department
function loadTests() {
  const tests = JSON.parse(localStorage.getItem("tests")) || [];
  const deptName = document.getElementById("pDepartment").value;
  const testSelect = document.getElementById("pTest");
  testSelect.innerHTML = "";

  tests.filter(t => t.department === deptName).forEach(test => {
    const option = document.createElement("option");
    option.value = test.name;
    option.textContent = test.name;
    testSelect.appendChild(option);
  });
}

// ✅ Load Patients List
function loadPatients() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const list = document.getElementById("patientList");
  list.innerHTML = "";

  patients.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.name}</strong> - ${p.test} (${p.department})
      <br> CNIC: ${p.cnic}, Contact: ${p.contact}
      <button onclick="deletePatient(${index})">❌ Delete</button>
    `;
    list.appendChild(li);
  });
}

// ✅ Register Patient
document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("pName").value.trim();
  const cnic = document.getElementById("pCnic").value.trim();
  const contact = document.getElementById("pContact").value.trim();
  const department = document.getElementById("pDepartment").value;
  const test = document.getElementById("pTest").value;

  if (!name || !cnic || !contact) return;

  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.push({ name, cnic, contact, department, test });
  localStorage.setItem("patients", JSON.stringify(patients));

  document.getElementById("patientForm").reset();
  loadPatients();
});

// ✅ Delete Patient
function deletePatient(index) {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  patients.splice(index, 1);
  localStorage.setItem("patients", JSON.stringify(patients));
  loadPatients();
}

// ✅ Events
document.getElementById("pDepartment").addEventListener("change", loadTests);

// ✅ Initial Load
loadDepartments();
loadTests();
loadPatients();
