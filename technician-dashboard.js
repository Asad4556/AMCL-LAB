// ✅ Load Patients
function loadPatients() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  const list = document.getElementById("patientList");
  list.innerHTML = "";

  patients.forEach((p, index) => {
    const report = reports.find(r => r.cnic === p.cnic && r.test === p.test);
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${p.name}</strong> - ${p.test} (${p.department})
      <br> CNIC: ${p.cnic}, Contact: ${p.contact}
      <br>
      <textarea id="report-${index}" placeholder="Enter report here...">${report ? report.result : ""}</textarea>
      <button onclick="saveReport(${index})">💾 Save Report</button>
    `;
    list.appendChild(li);
  });
}

// ✅ Save Report
function saveReport(index) {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  const patient = patients[index];
  const result = document.getElementById(`report-${index}`).value.trim();

  if (!result) {
    alert("⚠ Report cannot be empty!");
    return;
  }

  // Check if report already exists
  const existingIndex = reports.findIndex(r => r.cnic === patient.cnic && r.test === patient.test);

  if (existingIndex >= 0) {
    reports[existingIndex].result = result; // Update existing
  } else {
    reports.push({
      name: patient.name,
      cnic: patient.cnic,
      test: patient.test,
      department: patient.department,
      result
    });
  }

  localStorage.setItem("reports", JSON.stringify(reports));
  alert("✅ Report saved successfully!");
}

// ✅ Initial Load
loadPatients();
