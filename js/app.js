(function(){
  const ACCENTS = ["slate","gray","red","orange","amber","yellow","lime","green","teal","blue","indigo","purple"];
  const state = {
    accent: localStorage.getItem("accent") || "blue",
    user: null,
    lang: localStorage.getItem("lang") || "en"
  };

  function applyAccent(a){
    if(!ACCENTS.includes(a)) a = "blue";
    document.documentElement.setAttribute("data-accent", a);
    localStorage.setItem("accent", a);
  }
  function readUser(){
    try{ return JSON.parse(localStorage.getItem("currentUser")||"null"); }catch(e){return null}
  }
  function logout(){
    localStorage.removeItem("currentUser");
    location.href = "login.html";
  }
  function guard(){
    const isLogin = location.pathname.endsWith("login.html");
    state.user = readUser();
    if(!state.user && !isLogin){
      location.href = "login.html";
    }
    if(state.user && isLogin){
      const map = { admin:"admin-dashboard.html", reception:"reception-dashboard.html", technician:"technician-dashboard.html" };
      location.href = map[state.user.role] || "index.html";
    }
  }
  function navFor(role){
    const base = [
      {href:"index.html",label:t("Home")},
      {href:"view-reports.html",label:t("View Reports")},
      {href:"settings.html",label:t("Settings")}
    ];
    const roleNav = {
      admin:[
        {href:"admin-dashboard.html",label:t("Admin Dashboard")},
        {href:"manage-users.html",label:t("Manage Users")},
        {href:"export.html",label:t("Export")}
      ],
      reception:[
        {href:"reception-dashboard.html",label:t("Reception Dashboard")},
        {href:"register-patient.html",label:t("Register Patient")},
        {href:"slip.html",label:t("Patient Slip")}
      ],
      technician:[
        {href:"technician-dashboard.html",label:t("Technician Dashboard")},
        {href:"add-test-result.html",label:t("Add Test Result")}
      ]
    };
    return (roleNav[role]||[]).concat(base);
  }

  function injectLayout(){
    if(document.body.hasAttribute("data-no-layout")) return;
    const sidebar = document.createElement("aside");
    sidebar.className="sidebar";
    const role = state.user?.role || "guest";
    const items = navFor(role).map(i=>`<a href="${i.href}" class="${location.pathname.endsWith(i.href)?'active':''}">${i.label}</a>`).join("");
    sidebar.innerHTML = `
      <div class="brand">
        <img src="assets/logo.svg" alt="Logo" width="36" height="36"/>
        <div>
          <div class="title">MedLab Pro</div>
          <div class="tag">${t("Dark UI")} • <span id="accentTag">${state.accent}</span></div>
        </div>
      </div>
      <div class="nav">${items}</div>
    `;

    const header = document.createElement("header");
    header.className = "header";
    const options = ["<option disabled>"+t("Accent")+"</option>"].concat(ACCENTS.map(a=>`<option value="${a}" ${a===state.accent?'selected':''}>${a}</option>`)).join("");
    const userTxt = state.user ? `${state.user.name||'User'} • ${t(state.user.role)}` : "Guest";
    header.innerHTML = `
      <div class="left"><strong>${document.title||"MedLab Pro"}</strong></div>
      <div class="right">
        <select id="langSelect" class="input" style="width:auto;min-width:90px">
          <option value="en" ${state.lang==='en'?'selected':''}>EN</option>
          <option value="ur" ${state.lang==='ur'?'selected':''}>UR</option>
        </select>
        <select id="accentSelect" class="input" style="width:auto;min-width:140px">${options}</select>
        <span class="badge">${userTxt}</span>
        ${state.user?'<button id="logoutBtn" class="btn-ghost">'+t("Logout")+'</button>':'<a class="btn btn-primary" href="login.html">'+t("Login")+'</a>'}
      </div>
    `;

    const children = Array.from(document.body.childNodes);
    const container = document.createElement("div"); container.className="container";
    const main = document.createElement("main"); main.innerHTML='<div class="card" id="app-card"></div>';
    document.body.innerHTML="";
    document.body.appendChild(header);
    document.body.appendChild(container);
    container.appendChild(sidebar);
    container.appendChild(main);
    const card = document.getElementById("app-card");
    children.forEach(n=>card.parentNode.appendChild(n));

    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    document.getElementById("accentSelect")?.addEventListener("change", e=>{
      applyAccent(e.target.value);
      const tag = document.getElementById("accentTag"); if(tag) tag.textContent = e.target.value;
    });
    document.getElementById("langSelect")?.addEventListener("change", e=>{
      localStorage.setItem("lang", e.target.value);
      location.reload();
    });
  }

  // --- i18n minimal ---
  const dict = {
    ur: {
      "Home":"ہوم","View Reports":"رپورٹس دیکھیں","Settings":"سیٹنگز",
      "Admin Dashboard":"ایڈمن ڈیش بورڈ","Manage Users":"صارفین مینج کریں","Export":"ایکسپورٹ",
      "Reception Dashboard":"ریسپشن ڈیش بورڈ","Register Patient":"مریض رجسٹر کریں","Patient Slip":"پرچی",
      "Technician Dashboard":"ٹیکنیشن ڈیش بورڈ","Add Test Result":"ٹیسٹ رزلٹ شامل کریں",
      "Dark UI":"ڈارک یو آئی","Accent":"رنگ","Logout":"لاگ آؤٹ","Login":"لاگ اِن",
      "admin":"ایڈمن","reception":"ریسپشن","technician":"ٹیکنیشن"
    }
  };
  function t(key){ const lang = localStorage.getItem("lang")||"en"; return (dict[lang] && dict[lang][key]) || key; }
  window.t = t;

  // Expose to pages
  window.App = {
    user: ()=>state.user,
    require:(roles)=>{ if(state.user && !roles.includes(state.user.role)){ alert("Access denied"); location.href="index.html"; } },
    setAccent: applyAccent
  };

  document.addEventListener("DOMContentLoaded", ()=>{
    applyAccent(state.accent);
    guard();
    injectLayout();
  });
})();
