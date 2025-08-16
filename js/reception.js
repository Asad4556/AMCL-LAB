/* ======================================
   reception.js - Receptionist Dashboard
   Handles Patient Registration & Tests
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  initPatientForm();
  loadPatients();
});

/* ==============================
   PATIENT REGISTRATION
============================== */
function initPatientForm() {
  const form = document.getElementById("patient-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const patient = {
      id: Date.now(),
      name: document.getElementById("p-name").value.trim(),
      age: document.getElementById("p-age").value.trim(),
      gender: document.getElementById("p-gender").value,
      contact: document.getElementById("p-contact").value.trim(),
      tests: [],
    };

    // Save in localStorage
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));

    form.reset();
    loadPatients();
  });
}

/* ==============================
   LOAD PATIENT LIST
============================== */
function loadPatients() {
  const tableBody = document.getElementById("patients-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  patients.forEach((patient) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${patient.name}</td>
      <td>${patient.age}</td>
      <td>${patient.gender}</td>
      <td>${patient.contact}</td>
      <td>
        <button class="btn btn-small" onclick="assignTest(${patient.id})">
          Assign Test
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/* ==============================
   ASSIGN TESTS TO PATIENT
============================== */
function assignTest(patientId) {
  const testName = prompt("Enter Test Name (e.g., Blood Test, X-Ray):");
  if (!testName) return;

  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  const index = patients.findIndex((p) => p.id === patientId);

  if (index !== -1) {
    patients[index].tests.push({ name: testName, status: "Pending" });
    localStorage.setItem("patients", JSON.stringify(patients));
    alert(`✅ Test '${testName}' assigned to ${patients[index].name}`);
  }
}
