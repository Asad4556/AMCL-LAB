/* ======================================
   technician.js - Technician Dashboard
   Handles Assigned Tests & Results
====================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadAssignedTests();
});

/* ==============================
   LOAD ASSIGNED TESTS
============================== */
function loadAssignedTests() {
  const tableBody = document.getElementById("tests-table-body");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  patients.forEach((patient) => {
    patient.tests.forEach((test, idx) => {
      if (test.status === "Pending") {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${patient.name}</td>
          <td>${test.name}</td>
          <td>${test.status}</td>
          <td>
            <button class="btn btn-small" onclick="completeTest(${patient.id}, ${idx})">
              Mark Completed
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      }
    });
  });
}

/* ==============================
   COMPLETE TEST
============================== */
function completeTest(patientId, testIndex) {
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  const patient = patients.find((p) => p.id === patientId);

  if (patient) {
    const test = patient.tests[testIndex];

    const result = prompt(`Enter result for ${test.name}:`);
    if (!result) return;

    test.status = "Completed";
    test.result = result;

    localStorage.setItem("patients", JSON.stringify(patients));
    alert(`✅ Test '${test.name}' for ${patient.name} marked as completed.`);
    loadAssignedTests();
  }
}
