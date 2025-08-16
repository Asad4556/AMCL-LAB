import { Departments, Tests, Patients } from "./data.js";

function el(tag, attrs={}, children=[]){
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=> e.setAttribute(k,v));
  (Array.isArray(children)?children:[children]).forEach(c => {
    if(typeof c==="string") e.appendChild(document.createTextNode(c));
    else if(c) e.appendChild(c);
  });
  return e;
}

function populateDepartments(){
  const sel = document.getElementById("department");
  if(!sel) return;
  sel.innerHTML = '<option value="">-- Select Department --</option>';
  Departments.forEach(d => {
    const o = document.createElement("option"); o.value=d.id; o.textContent=d.name; sel.appendChild(o);
  });
}
function populateTests(){
  const dep = document.getElementById("department")?.value;
  const list = document.getElementById("tests");
  if(!list) return;
  list.innerHTML="";
  (Tests[dep]||[]).forEach(t => {
    const label = el("label", {}, [
      el("input", {type:"checkbox", value:t.code}),
      ` ${t.name} (${t.code})`
    ]);
    label.style.display="block";
    list.appendChild(label);
  });
}

function registerPatient(e){
  e.preventDefault();
  const form = e.target;
  const p = {
    id: "P"+Date.now().toString(36),
    name: form.querySelector("#pname").value.trim(),
    phone: form.querySelector("#pphone").value.trim(),
    dob: form.querySelector("#pdob").value,
    tests: Array.from(document.querySelectorAll("#tests input[type='checkbox']:checked")).map(i=>i.value),
    department: document.getElementById("department").value
  };
  Patients.add(p);
  alert("Patient registered with ID: "+p.id);
  form.reset();
  populateTests();
  renderPatientTable();
}

function renderPatientTable(){
  const tbody = document.querySelector("#patientTable tbody");
  if(!tbody) return;
  tbody.innerHTML = "";
  Patients.all().slice().reverse().forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.phone}</td><td>${p.department}</td><td>${p.tests.join(", ")}</td>`;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  App.require(["reception","admin"]);
  populateDepartments();
  document.getElementById("department")?.addEventListener("change", populateTests);
  document.querySelector("form[data-register]")?.addEventListener("submit", registerPatient);
  renderPatientTable();
});
