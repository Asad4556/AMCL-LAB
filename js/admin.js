import { Patients, Results } from "./data.js";

function stats(){
  const s = {
    patients: Patients.all().length,
    results: Results.all().length,
    today: Results.all().filter(r=>r.date===new Date().toISOString().slice(0,10)).length
  };
  document.getElementById("statPatients").textContent = s.patients;
  document.getElementById("statResults").textContent = s.results;
  document.getElementById("statToday").textContent = s.today;
}

document.addEventListener("DOMContentLoaded", ()=>{
  App.require(["admin"]);
  stats();
});
