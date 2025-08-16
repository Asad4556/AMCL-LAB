/* ======================================
   App.js - Global Controller
   Handles Theme, Language, and Logout
====================================== */

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  initLogout();
});

/* ==============================
   THEME HANDLING
============================== */
function initTheme() {
  const themeSelector = document.getElementById("theme-selector");
  if (!themeSelector) return;

  const themes = [
    "blue", "red", "green", "purple", "orange",
    "pink", "teal", "cyan", "lime", "yellow",
    "indigo", "brown"
  ];

  // Populate theme options
  themes.forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    themeSelector.appendChild(option);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "cyan";
  document.body.classList.add(`theme-${savedTheme}`);
  themeSelector.value = savedTheme;

  // Change theme event
  themeSelector.addEventListener("change", () => {
    document.body.className = ""; // Reset classes
    document.body.classList.add(`theme-${themeSelector.value}`);
    localStorage.setItem("theme", themeSelector.value);
  });
}

/* ==============================
   LANGUAGE HANDLING
============================== */
function initLanguage() {
  const langSelector = document.getElementById("lang-selector");
  if (!langSelector) return;

  const savedLang = localStorage.getItem("lang") || "en";
  langSelector.value = savedLang;
  applyLanguage(savedLang);

  langSelector.addEventListener("change", () => {
    const lang = langSelector.value;
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
  });
}

function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
}

// Translation strings
const translations = {
  en: {
    dashboard: "Dashboard",
    logout: "Logout",
    patients: "Patients",
    tests: "Tests",
    reports: "Reports",
    export: "Export Data",
    users: "Manage Users"
  },
  ur: {
    dashboard: "ڈیش بورڈ",
    logout: "لاگ آؤٹ",
    patients: "مریض",
    tests: "ٹیسٹ",
    reports: "رپورٹس",
    export: "ڈیٹا ایکسپورٹ",
    users: "یوزرز منیج کریں"
  }
};

/* ==============================
   LOGOUT HANDLING
============================== */
function initLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
