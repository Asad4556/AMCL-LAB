import { Results, Patients, Tests } from "./data.js";

function render(){
  const tbody = document.querySelector("#resultTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";
  Results.all().slice().reverse().forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.sampleId}</td><td>${r.patientId}</td><td>${r.testCode}</td><td>${r.value} ${r.unit||""}</td><td>${r.date}</td>`;
    tbody.appendChild(tr);
  });
}

function addResult(e){
  e.preventDefault();
  const form = e.target;
  const r = {
    sampleId: "S"+Date.now().toString(36),
    patientId: form.querySelector("#patientId").value.trim(),
    testCode: form.querySelector("#testCode").value,
    value: form.querySelector("#value").value.trim(),
    unit: form.querySelector("#unit").value.trim(),
    date: new Date().toISOString().slice(0,10)
  };
  Results.add(r);
  alert("Result added: "+r.sampleId);
  form.reset();
  render();
}

document.addEventListener("DOMContentLoaded", ()=>{
  App.require(["technician","admin"]);
  document.querySelector("form[data-result]")?.addEventListener("submit", addResult);
  render();
});
