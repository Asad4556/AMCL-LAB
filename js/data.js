export const Departments = [
  { id:"hemo", name:"Hematology" },
  { id:"bio", name:"Biochemistry" },
  { id:"imm", name:"Immunology" },
  { id:"mic", name:"Microbiology" },
  { id:"mol", name:"Molecular Diagnostics" }
];

export const Tests = {
  hemo: [
    { code:"CBC", name:"Complete Blood Count", unit:"", range:"See differential" },
    { code:"HB", name:"Hemoglobin", unit:"g/dL", range:"13.5–17.5 (M) / 12–15.5 (F)" }
  ],
  bio: [
    { code:"GLU", name:"Fasting Glucose", unit:"mg/dL", range:"70–99" },
    { code:"CHOL", name:"Cholesterol", unit:"mg/dL", range:"< 200" }
  ],
  imm: [
    { code:"CRP", name:"C-Reactive Protein", unit:"mg/L", range:"< 10" }
  ],
  mic: [
    { code:"CULT", name:"Urine Culture", unit:"", range:"No growth" }
  ],
  mol: [
    { code:"HBV-PCR", name:"HBV PCR", unit:"IU/mL", range:"Not detected" }
  ]
};

export const Patients = {
  list: JSON.parse(localStorage.getItem("patients")||"[]"),
  add(p){ this.list.push(p); localStorage.setItem("patients", JSON.stringify(this.list)); },
  all(){ return this.list; }
};

export const Results = {
  list: JSON.parse(localStorage.getItem("results")||"[]"),
  add(r){ this.list.push(r); localStorage.setItem("results", JSON.stringify(this.list)); },
  all(){ return this.list; }
};
