const STORAGE_KEY = "optimiam_v1";

/* ---------- icônes (SVG ligne, remplace les emoji) ---------- */

const ICON_PATHS = {
  home: `<path d="M4 11 12 4l8 7"/><rect x="6" y="10.5" width="12" height="9.5" rx="1.2"/><line x1="10" y1="20" x2="10" y2="14"/><line x1="14" y1="20" x2="14" y2="14"/><line x1="10" y1="14" x2="14" y2="14"/>`,
  meal: `<line x1="7" y1="2" x2="7" y2="8"/><line x1="9.5" y1="2" x2="9.5" y2="8"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="7" y1="8" x2="12" y2="8"/><line x1="9.5" y1="8" x2="9.5" y2="21"/><rect x="14" y="2" width="4" height="9" rx="2"/><line x1="16" y1="11" x2="16" y2="21"/>`,
  history: `<path d="M3 17l6-6 4 4 8-8"/><path d="M15 6h6v6"/>`,
  calm: `<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="7.2" stroke-dasharray="2.4 3.4"/><circle cx="12" cy="12" r="10.6" stroke-dasharray="1.6 3.6" opacity="0.55"/>`,
  settings: `<line x1="6" y1="4" x2="6" y2="20"/><circle cx="6" cy="9" r="2"/><line x1="12" y1="4" x2="12" y2="20"/><circle cx="12" cy="15" r="2"/><line x1="18" y1="4" x2="18" y2="20"/><circle cx="18" cy="7" r="2"/>`,
  scan: `<path d="M4 8V4H8"/><path d="M16 4H20V8"/><path d="M4 16V20H8"/><path d="M20 16V20H16"/><line x1="8" y1="9" x2="8" y2="15"/><line x1="10.6" y1="9" x2="10.6" y2="15" stroke-width="3"/><line x1="13.2" y1="9" x2="13.2" y2="15"/><line x1="15.8" y1="9" x2="15.8" y2="15" stroke-width="3"/>`,
  camera: `<path d="M4 7.5h3.2L8.6 5h6.8l1.4 2.5H20a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.2" r="3.4"/>`,
  checkCircle: `<circle cx="12" cy="12" r="8.5"/><path d="M8.2 12.3l2.6 2.6 5-5.4"/>`,
  alertTriangle: `<path d="M12 4.2 21 20H3Z"/><line x1="12" y1="10" x2="12" y2="14.3"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/>`,
  target: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.1" fill="currentColor" stroke="none"/>`,
  lock: `<rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>`,
  unlock: `<rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M11 11V7a4 4 0 0 1 8 0"/>`,
  sparkle: `<path d="M12 3v4.2M12 16.8V21M3 12h4.2M16.8 12H21M6.1 6.1l2.9 2.9M15 15l2.9 2.9M17.9 6.1 15 9M9 15l-2.9 2.9"/>`,
  close: `<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>`,
  ask: `<rect x="3" y="4" width="18" height="12" rx="3"/><path d="M8 16v4l5-4"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="11" x2="13" y2="11"/>`
};

function icon(name, opts = {}) {
  const size = opts.size || 18;
  const strokeWidth = opts.strokeWidth || 1.7;
  const style = opts.color ? ` style="color:${opts.color}"` : "";
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${style}>${ICON_PATHS[name]}</svg>`;
}

const DEFAULT_SETTINGS = {
  mode: "foie", // "standard" | "foie"
  weightStartKg: 74,
  weightGoalKg: 69,
  sugarCutoffHour: 18,
  kcalFloor: 1300,
  sugarBudgetG: 25,
  fatBudgetG: 55,
  saltBudgetG: 6,
  walkGoalMin: 30,
  fatThresholds: { collation: 5, repas: 12 },
  slots: [
    { id: "collation_matin", label: "Collation 10h", type: "collation" },
    { id: "dejeuner", label: "Déjeuner", type: "repas" },
    { id: "collation_am", label: "Collation 16h", type: "collation" },
    { id: "diner", label: "Dîner", type: "repas" }
  ]
};

const BASE_FOOD_CATS = ["Féculents", "Légumes", "Fruits", "Protéines", "Produits laitiers", "Matières grasses"];

const BASE_FOODS = [
  { cat: "Féculents", name: "Pâtes (crues)", kcal: 353, fat: 1.5, carb: 71, sugar: 3, salt: 0.02 },
  { cat: "Féculents", name: "Riz blanc (cru)", kcal: 349, fat: 0.6, carb: 78, sugar: 0.1, salt: 0.01 },
  { cat: "Féculents", name: "Riz complet (cru)", kcal: 350, fat: 2.7, carb: 71, sugar: 0.9, salt: 0.01 },
  { cat: "Féculents", name: "Semoule (crue)", kcal: 360, fat: 1, carb: 76, sugar: 0.5, salt: 0.01 },
  { cat: "Féculents", name: "Quinoa (cru)", kcal: 368, fat: 6, carb: 64, sugar: 1, salt: 0.01 },
  { cat: "Féculents", name: "Flocons d'avoine", kcal: 372, fat: 7, carb: 60, sugar: 1, salt: 0.02 },
  { cat: "Féculents", name: "Pomme de terre", kcal: 77, fat: 0.1, carb: 17, sugar: 0.8, salt: 0.01 },
  { cat: "Féculents", name: "Pain baguette", kcal: 274, fat: 1, carb: 55, sugar: 2, salt: 1.4 },
  { cat: "Féculents", name: "Pain complet", kcal: 246, fat: 2.5, carb: 41, sugar: 3, salt: 1.1 },
  { cat: "Féculents", name: "Lentilles (crues)", kcal: 353, fat: 1, carb: 60, sugar: 2, salt: 0.02 },
  { cat: "Féculents", name: "Pois chiches (cuits)", kcal: 164, fat: 2.6, carb: 27, sugar: 4.8, salt: 0.24 },
  { cat: "Légumes", name: "Tomate", kcal: 18, fat: 0.2, carb: 3.9, sugar: 2.6, salt: 0 },
  { cat: "Légumes", name: "Carotte", kcal: 41, fat: 0.2, carb: 10, sugar: 4.7, salt: 0.07 },
  { cat: "Légumes", name: "Courgette", kcal: 17, fat: 0.3, carb: 3.1, sugar: 2.5, salt: 0 },
  { cat: "Légumes", name: "Brocoli", kcal: 34, fat: 0.4, carb: 7, sugar: 1.7, salt: 0.03 },
  { cat: "Légumes", name: "Haricots verts", kcal: 31, fat: 0.1, carb: 7, sugar: 3.3, salt: 0 },
  { cat: "Légumes", name: "Épinards", kcal: 23, fat: 0.4, carb: 3.6, sugar: 0.4, salt: 0.08 },
  { cat: "Légumes", name: "Salade verte", kcal: 15, fat: 0.2, carb: 2.9, sugar: 0.8, salt: 0 },
  { cat: "Légumes", name: "Poivron", kcal: 31, fat: 0.3, carb: 6, sugar: 4.2, salt: 0 },
  { cat: "Légumes", name: "Aubergine", kcal: 25, fat: 0.2, carb: 6, sugar: 3.5, salt: 0 },
  { cat: "Légumes", name: "Champignons de Paris", kcal: 22, fat: 0.3, carb: 3.3, sugar: 2, salt: 0.01 },
  { cat: "Légumes", name: "Oignon", kcal: 40, fat: 0.1, carb: 9.3, sugar: 4.2, salt: 0 },
  { cat: "Légumes", name: "Concombre", kcal: 12, fat: 0.1, carb: 2, sugar: 1.7, salt: 0 },
  { cat: "Légumes", name: "Chou-fleur", kcal: 25, fat: 0.3, carb: 5, sugar: 2, salt: 0.03 },
  { cat: "Fruits", name: "Pomme", kcal: 52, fat: 0.2, carb: 14, sugar: 10, salt: 0 },
  { cat: "Fruits", name: "Banane", kcal: 89, fat: 0.3, carb: 23, sugar: 12, salt: 0 },
  { cat: "Fruits", name: "Orange", kcal: 47, fat: 0.1, carb: 12, sugar: 9, salt: 0 },
  { cat: "Fruits", name: "Poire", kcal: 57, fat: 0.1, carb: 15, sugar: 10, salt: 0 },
  { cat: "Fruits", name: "Fraises", kcal: 32, fat: 0.3, carb: 8, sugar: 5, salt: 0 },
  { cat: "Fruits", name: "Raisin", kcal: 69, fat: 0.2, carb: 18, sugar: 16, salt: 0 },
  { cat: "Fruits", name: "Kiwi", kcal: 61, fat: 0.5, carb: 15, sugar: 9, salt: 0 },
  { cat: "Fruits", name: "Pêche", kcal: 39, fat: 0.3, carb: 10, sugar: 8, salt: 0 },
  { cat: "Fruits", name: "Ananas", kcal: 50, fat: 0.1, carb: 13, sugar: 10, salt: 0 },
  { cat: "Fruits", name: "Pastèque", kcal: 30, fat: 0.2, carb: 8, sugar: 6, salt: 0 },
  { cat: "Fruits", name: "Melon", kcal: 34, fat: 0.2, carb: 8, sugar: 8, salt: 0.02 },
  { cat: "Fruits", name: "Mangue", kcal: 60, fat: 0.4, carb: 15, sugar: 14, salt: 0 },
  { cat: "Protéines", name: "Poulet (blanc, cuit)", kcal: 165, fat: 3.6, carb: 0, sugar: 0, salt: 0.1 },
  { cat: "Protéines", name: "Dinde (blanc, cuit)", kcal: 135, fat: 1, carb: 0, sugar: 0, salt: 0.09 },
  { cat: "Protéines", name: "Bœuf 5% MG (cuit)", kcal: 172, fat: 5, carb: 0, sugar: 0, salt: 0.09 },
  { cat: "Protéines", name: "Steak haché 15% MG (cuit)", kcal: 254, fat: 15, carb: 0, sugar: 0, salt: 0.1 },
  { cat: "Protéines", name: "Jambon blanc", kcal: 107, fat: 3, carb: 0.5, sugar: 0.5, salt: 1.7 },
  { cat: "Protéines", name: "Œuf entier", kcal: 143, fat: 10, carb: 0.7, sugar: 0.7, salt: 0.37 },
  { cat: "Protéines", name: "Thon au naturel (boîte)", kcal: 116, fat: 1, carb: 0, sugar: 0, salt: 0.4 },
  { cat: "Protéines", name: "Saumon (cuit)", kcal: 208, fat: 13, carb: 0, sugar: 0, salt: 0.09 },
  { cat: "Protéines", name: "Cabillaud (cuit)", kcal: 90, fat: 0.7, carb: 0, sugar: 0, salt: 0.24 },
  { cat: "Protéines", name: "Crevettes (cuites)", kcal: 99, fat: 0.5, carb: 0.3, sugar: 0, salt: 1.3 },
  { cat: "Protéines", name: "Tofu nature", kcal: 76, fat: 4.2, carb: 1.9, sugar: 0.5, salt: 0.01 },
  { cat: "Produits laitiers", name: "Yaourt nature", kcal: 61, fat: 3, carb: 4.7, sugar: 4.7, salt: 0.1 },
  { cat: "Produits laitiers", name: "Fromage blanc 0%", kcal: 45, fat: 0.2, carb: 4, sugar: 4, salt: 0.06 },
  { cat: "Produits laitiers", name: "Fromage blanc 20%", kcal: 90, fat: 3.5, carb: 4, sugar: 4, salt: 0.06 },
  { cat: "Produits laitiers", name: "Skyr nature", kcal: 63, fat: 0.2, carb: 4, sugar: 4, salt: 0.06 },
  { cat: "Produits laitiers", name: "Lait demi-écrémé", kcal: 46, fat: 1.6, carb: 4.8, sugar: 4.8, salt: 0.1 },
  { cat: "Produits laitiers", name: "Comté", kcal: 400, fat: 32, carb: 0, sugar: 0, salt: 0.7 },
  { cat: "Produits laitiers", name: "Emmental", kcal: 380, fat: 29, carb: 0, sugar: 0, salt: 0.6 },
  { cat: "Produits laitiers", name: "Mozzarella", kcal: 280, fat: 22, carb: 2.2, sugar: 2.2, salt: 0.6 },
  { cat: "Produits laitiers", name: "Camembert", kcal: 300, fat: 24, carb: 0.5, sugar: 0.5, salt: 1.5 },
  { cat: "Matières grasses", name: "Huile d'olive", kcal: 900, fat: 100, carb: 0, sugar: 0, salt: 0 },
  { cat: "Matières grasses", name: "Beurre doux", kcal: 717, fat: 82, carb: 0.7, sugar: 0.6, salt: 0.02 },
  { cat: "Matières grasses", name: "Amandes", kcal: 579, fat: 50, carb: 22, sugar: 4, salt: 0 },
  { cat: "Matières grasses", name: "Noix", kcal: 654, fat: 65, carb: 14, sugar: 2.6, salt: 0 },
  { cat: "Matières grasses", name: "Avocat", kcal: 160, fat: 15, carb: 8.5, sugar: 0.7, salt: 0.01 }
];

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const fresh = { settings: structuredClone(DEFAULT_SETTINGS), days: {} };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }
  const parsed = JSON.parse(raw);
  parsed.settings = Object.assign(structuredClone(DEFAULT_SETTINGS), parsed.settings || {});
  parsed.days = parsed.days || {};
  return parsed;
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function getDay(key, create = true) {
  if (!DATA.days[key] && create) {
    DATA.days[key] = { weightKg: null, walkMin: null, meals: [] };
  }
  return DATA.days[key];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

let DATA = loadData();
let currentView = "dashboard";
let historyRange = 7;
let panicTimer = null;

const PANIC_MESSAGES = [
  "Bois un grand verre d'eau et attends 10 minutes — c'est peut-être juste de la fatigue.",
  "Une envie dure rarement plus de 15 minutes si on ne la nourrit pas.",
  "Tu n'as pas besoin de te justifier. Juste de tenir 10 minutes.",
  "Respire lentement en suivant le cercle. Le cerveau se calme avant l'estomac.",
  "T'as déjà tenu pire que ça."
];

/* ---------- helpers de calcul ---------- */

function slotById(id) {
  return DATA.settings.slots.find((s) => s.id === id);
}

function effectiveCarb(m) {
  // le glucide total ne peut pas être < aux sucres qu'il contient
  // (garde-fou pour les repas enregistrés avant l'ajout du champ glucides)
  return Math.max(Number(m.carbG) || 0, Number(m.sugarG) || 0);
}

function sumDay(day) {
  const totals = { kcal: 0, fat: 0, carb: 0, sugar: 0, salt: 0 };
  if (!day) return totals;
  day.meals.forEach((m) => {
    totals.kcal += Number(m.kcal) || 0;
    totals.fat += Number(m.fatG) || 0;
    totals.carb += effectiveCarb(m);
    totals.sugar += Number(m.sugarG) || 0;
    totals.salt += Number(m.saltG) || 0;
  });
  return totals;
}

function mealsBySlot(day, slotId) {
  if (!day) return [];
  return day.meals.filter((m) => m.slotId === slotId);
}

function isAfterCutoff() {
  return new Date().getHours() >= DATA.settings.sugarCutoffHour;
}

function weightSeries(days) {
  const keys = Object.keys(DATA.days).sort();
  const withWeight = keys
    .filter((k) => DATA.days[k].weightKg != null)
    .map((k) => ({ date: k, weightKg: DATA.days[k].weightKg }));
  return withWeight.slice(-days);
}

function weekWeightDelta() {
  const series = weightSeries(30);
  if (series.length < 2) return null;
  const last = series[series.length - 1].weightKg;
  const weekAgoDate = new Date();
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  const cutoff = todayKey(weekAgoDate);
  const before = [...series].reverse().find((s) => s.date <= cutoff);
  if (!before) return null;
  return +(last - before.weightKg).toFixed(1);
}

const WALK_MET = 3.5; // marche modérée ~5 km/h

function estimateWalkKcal(minutes, weightKg) {
  if (!minutes || !weightKg) return 0;
  return (WALK_MET * 3.5 * weightKg / 200) * minutes;
}

function currentWeightRef(day) {
  return day.weightKg ?? DATA.settings.weightStartKg;
}

function budgetItemHTML(label, value, budget) {
  const pct = budget ? Math.min(100, Math.round((value / budget) * 100)) : 0;
  const color = pct > 80 ? "var(--danger)" : pct > 50 ? "var(--gold)" : "var(--ok)";
  return `<div class="detail-item">
    <span class="wlabel">${label}</span>
    <span class="wval">${fmt(value, 1)} / ${fmt(budget)} g</span>
    <span class="gauge-sub" style="color:${color}; font-weight:700;">${pct}%</span>
  </div>`;
}

function mealMetaLine(m) {
  return `${m.kcal || 0} kcal · ${m.fatG || 0}g lipides · ${fmt(effectiveCarb(m), 1)}g glucides (dont ${m.sugarG || 0}g sucres) · ${m.saltG || 0}g sel`;
}

/* ---------- rendu ---------- */

function fmt(n, d = 0) {
  return (Number(n) || 0).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function renderTopbar() {
  document.getElementById("today-label").textContent = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long"
  });
}

function renderDashboard() {
  const key = todayKey();
  const day = getDay(key);
  const totals = sumDay(day);
  const mode = DATA.settings.mode;
  const root = document.getElementById("view-dashboard");

  const cutoffOn = isAfterCutoff();
  const now = new Date();
  const hoursLeft = (DATA.settings.sugarCutoffHour - now.getHours() - now.getMinutes() / 60);
  const cutoffLabel = cutoffOn
    ? `Sucre bloqué — actif (après ${DATA.settings.sugarCutoffHour}h)`
    : `Sucre bloqué après ${DATA.settings.sugarCutoffHour}h — dans ${Math.max(0, hoursLeft).toFixed(1)}h`;

  const saltPct = Math.min(100, Math.round((totals.salt / DATA.settings.saltBudgetG) * 100));
  const saltGaugeHTML = `
    <div class="gauge">
      <div class="gauge-top"><span>Sel</span><span>${saltPct > 80 ? icon("alertTriangle", { size: 15, color: "var(--danger)" }) : icon("checkCircle", { size: 15, color: "var(--ok)" })}</span></div>
      <div class="gauge-bar"><div class="gauge-fill" style="width:${saltPct}%; background:${saltPct > 80 ? "var(--danger)" : saltPct > 50 ? "var(--gold)" : "var(--ok)"};"></div></div>
      <div class="gauge-val">${fmt(totals.salt, 1)} g</div>
      <div class="gauge-sub">/ ${fmt(DATA.settings.saltBudgetG)} g · ${saltPct}%</div>
    </div>`;

  const fatPct = Math.min(100, Math.round((totals.fat / DATA.settings.fatBudgetG) * 100));
  const fatGaugeHTML = `
    <div class="gauge">
      <div class="gauge-top"><span>Lipides</span><span>${fatPct > 80 ? icon("alertTriangle", { size: 15, color: "var(--danger)" }) : icon("checkCircle", { size: 15, color: "var(--ok)" })}</span></div>
      <div class="gauge-bar"><div class="gauge-fill" style="width:${fatPct}%; background:${fatPct > 80 ? "var(--danger)" : fatPct > 50 ? "var(--gold)" : "var(--ok)"};"></div></div>
      <div class="gauge-val">${fmt(totals.fat, 1)} g</div>
      <div class="gauge-sub">/ ${fmt(DATA.settings.fatBudgetG)} g · ${fatPct}%</div>
    </div>`;

  let gaugesHTML = "";
  if (mode === "foie") {
    const sugarPct = Math.min(100, Math.round((totals.sugar / DATA.settings.sugarBudgetG) * 100));
    const lastMeal = day.meals[day.meals.length - 1];
    const lastFat = lastMeal ? Number(lastMeal.fatG) : 0;
    gaugesHTML = `
      <div class="gauge-row">
        <div class="gauge">
          <div class="gauge-top"><span>Fructose</span><span>${cutoffOn ? icon("lock", { size: 15, color: "var(--ink-soft)" }) : icon("unlock", { size: 15, color: "var(--ok)" })}</span></div>
          <div class="gauge-bar"><div class="gauge-fill" style="width:${sugarPct}%; background:${sugarPct > 80 ? "var(--danger)" : sugarPct > 50 ? "var(--gold)" : "var(--ok)"};"></div></div>
          <div class="gauge-val">${fmt(totals.sugar, 1)} g</div>
          <div class="gauge-sub">/ ${fmt(DATA.settings.sugarBudgetG)} g · ${sugarPct}%</div>
        </div>
        <div class="gauge">
          <div class="gauge-top"><span>Dernier repas</span><span>${lastFat > 12 ? icon("alertTriangle", { size: 15, color: "var(--danger)" }) : icon("target", { size: 15, color: "var(--gold)" })}</span></div>
          <div class="gauge-bar"><div class="gauge-fill" style="width:${Math.min(100, (lastFat / 12) * 100)}%; background:${lastFat > 12 ? "var(--danger)" : "var(--gold)"};"></div></div>
          <div class="gauge-val">${fmt(lastFat, 1)} g</div>
          <div class="gauge-sub">/ 12 g seuil</div>
        </div>
        ${fatGaugeHTML}
        ${saltGaugeHTML}
      </div>
      <div class="cutoff-strip"><span class="dot ${cutoffOn ? "on" : "off"}"></span>${cutoffLabel}</div>
      <div class="card">
        <div class="kcal-top"><span class="card-title">Apport du jour</span><span class="kcal-val">${fmt(totals.kcal)} kcal</span></div>
        <div class="kcal-bar"><div class="kcal-fill" style="width:${Math.min(100, (totals.kcal / DATA.settings.kcalFloor) * 100)}%; background:${totals.kcal < DATA.settings.kcalFloor ? "var(--danger)" : "var(--ok)"};"></div></div>
        <div class="kcal-note ${totals.kcal < DATA.settings.kcalFloor ? "warn" : "ok"}">
          ${totals.kcal < DATA.settings.kcalFloor ? `${icon("alertTriangle", { size: 13 })} Sous le plancher de sécurité (${DATA.settings.kcalFloor} kcal)` : `${icon("checkCircle", { size: 13 })} Au-dessus du plancher de sécurité`}
        </div>
      </div>
      <div class="weight-strip">
        <div><div class="wlabel">Objectif</div><div class="wval">-${fmt(DATA.settings.weightStartKg - DATA.settings.weightGoalKg, 1)} kg</div></div>
        <div><div class="wlabel">Cette semaine</div><div class="wval">${weekWeightDelta() != null ? fmt(weekWeightDelta(), 1) + " kg" : "—"}</div></div>
        <div><label class="wlabel" for="weight-input">Poids ajd</label><input id="weight-input" type="number" step="0.1" placeholder="kg" value="${day.weightKg ?? ""}"></div>
      </div>
    `;
  } else {
    const sugarPct = Math.min(100, Math.round((totals.sugar / DATA.settings.sugarBudgetG) * 100));
    gaugesHTML = `
      <div class="gauge-row">
        <div class="gauge">
          <div class="gauge-top"><span>Sucre ajouté</span><span>${sugarPct > 80 ? icon("alertTriangle", { size: 15, color: "var(--danger)" }) : sugarPct > 50 ? icon("alertTriangle", { size: 15, color: "var(--gold)" }) : icon("checkCircle", { size: 15, color: "var(--ok)" })}</span></div>
          <div class="gauge-bar"><div class="gauge-fill" style="width:${sugarPct}%; background:${sugarPct > 80 ? "var(--danger)" : sugarPct > 50 ? "var(--gold)" : "var(--ok)"};"></div></div>
          <div class="gauge-val">${fmt(totals.sugar, 1)} g</div>
          <div class="gauge-sub">/ ${fmt(DATA.settings.sugarBudgetG)} g · ${sugarPct}%</div>
        </div>
        ${fatGaugeHTML}
        ${saltGaugeHTML}
      </div>
      <div class="card">
        <div class="card-title">Apport du jour</div>
        <div class="kcal-val" style="margin-top:0.3rem;">${fmt(totals.kcal)} kcal</div>
      </div>
    `;
  }

  const walkKcal = estimateWalkKcal(day.walkMin, currentWeightRef(day));
  const walkStripHTML = `
    <div class="weight-strip">
      <div><div class="wlabel">Marche</div><div class="wval">${fmt(day.walkMin || 0)} min</div></div>
      <div><div class="wlabel">Objectif</div><div class="wval">${fmt(DATA.settings.walkGoalMin)} min</div></div>
      <div><label class="wlabel" for="walk-input">Ajd</label><input id="walk-input" type="number" min="0" step="1" placeholder="min" value="${day.walkMin ?? ""}"></div>
    </div>
    ${day.walkMin ? `<div class="empty-note" style="margin-top:-0.4rem; margin-bottom:0.8rem;">≈ ${fmt(walkKcal)} kcal brûlées (estimation, marche modérée)</div>` : ""}
  `;

  let slotsHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
      <div class="card-title">Repas du jour${mode === "foie" ? " — seuils par créneau" : ""}</div>
      <button type="button" class="btn ghost small" id="day-recap-btn">Récap du jour</button>
    </div>`;
  DATA.settings.slots.forEach((slot) => {
    const meals = mealsBySlot(day, slot.id);
    const threshold = DATA.settings.fatThresholds[slot.type];
    slotsHTML += `<div class="meal-slot">
      <div class="meal-slot-head"><span>${slot.label}</span>${mode === "foie" ? `<span class="thresh">seuil ${threshold}g</span>` : ""}</div>
      ${meals.length === 0 ? `<div class="empty-note">Rien noté</div>` : meals.map((m) => {
        const over = mode === "foie" && Number(m.fatG) > threshold;
        return `<div class="meal-row" data-view-meal="${m.id}">
          <div>
            <div class="meal-name">${m.name}</div>
            <div class="meal-meta">${mealMetaLine(m)}</div>
          </div>
          <div style="display:flex; align-items:center;">
            <div class="meal-fig ${over ? "warn" : "ok"}">${m.fatG || 0}g ${mode === "foie" ? icon(over ? "alertTriangle" : "checkCircle", { size: 13 }) : ""}</div>
            <button data-del="${m.id}" title="Supprimer">${icon("close", { size: 14 })}</button>
          </div>
        </div>`;
      }).join("")}
    </div>`;
  });

  root.innerHTML = `
    <div class="toggle-pill" id="mode-toggle">
      <button data-mode="standard" class="${mode === "standard" ? "active" : ""}">Standard</button>
      <button data-mode="foie" class="${mode === "foie" ? "active" : ""}">Foie / MASB</button>
    </div>
    ${gaugesHTML}
    ${walkStripHTML}
    ${slotsHTML}
    <button class="btn ${mode === "foie" ? "sauge" : ""}" id="add-meal-btn">+ Ajouter un repas</button>
  `;

  root.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      DATA.settings.mode = btn.dataset.mode;
      saveData();
      renderDashboard();
    });
  });
  root.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      day.meals = day.meals.filter((m) => m.id !== btn.dataset.del);
      saveData();
      renderDashboard();
    });
  });
  root.querySelectorAll("[data-view-meal]").forEach((row) => {
    row.addEventListener("click", () => {
      showMealDetailModal(row.dataset.viewMeal, key, null);
    });
  });
  document.getElementById("day-recap-btn").addEventListener("click", () => showDayDetailModal(key));
  document.getElementById("add-meal-btn").addEventListener("click", () => switchView("ajouter"));
  const weightInput = document.getElementById("weight-input");
  if (weightInput) {
    weightInput.addEventListener("change", () => {
      day.weightKg = weightInput.value ? Number(weightInput.value) : null;
      saveData();
      renderDashboard();
      toast("Poids enregistré");
    });
  }
  document.getElementById("walk-input").addEventListener("change", (e) => {
    day.walkMin = e.target.value ? Number(e.target.value) : null;
    saveData();
    renderDashboard();
    toast("Marche enregistrée");
  });
}

function defaultSlotForNow() {
  const h = new Date().getHours();
  if (h < 12) return "collation_matin";
  if (h < 15) return "dejeuner";
  if (h < 18) return "collation_am";
  return "diner";
}

function renderAjouter() {
  const root = document.getElementById("view-ajouter");
  root.innerHTML = `
    <h2 style="font-size:1.3rem; font-weight:600; margin-bottom:0.8rem;">Ajouter un repas</h2>
    <button type="button" class="btn ghost icon-btn" id="scan-toggle">${icon("scan", { size: 18 })}Scanner un code-barre</button>
    <div id="scanner-wrap" style="display:none; margin-top:0.7rem;">
      <div id="reader" style="border-radius:0.8rem; overflow:hidden;"></div>
      <div class="empty-note" id="scan-status">Vise le code-barre du produit.</div>
    </div>

    <button type="button" class="btn ghost icon-btn" id="photo-toggle" style="margin-top:0.6rem;">${icon("camera", { size: 18 })}Photo de l'étiquette nutritionnelle</button>
    <input type="file" id="photo-input" accept="image/*" capture="environment" style="display:none;">
    <div class="empty-note" id="photo-status" style="display:none; margin-top:0.4rem;"></div>

    <label style="margin-top:1rem;">Aliments de base (sans code-barre ni étiquette)</label>
    <input id="basefood-search" type="text" placeholder="Rechercher un aliment (ex: poulet, yaourt, huile...)">
    <div class="chip-row" id="basefood-cat-toggle">
      ${BASE_FOOD_CATS.map((cat, i) => `<button type="button" data-cat="${cat}" class="${i === 0 ? "active" : ""}">${cat}</button>`).join("")}
    </div>
    <div class="search-results" id="basefood-results" style="max-height:280px;"></div>

    <label style="margin-top:1rem;">Rechercher un produit par nom (Open Food Facts)</label>
    <input id="off-search" type="text" placeholder="ex: yaourt nature, saumon...">
    <div class="search-results" id="off-results"></div>

    <form id="meal-form">
      <label>Créneau</label>
      <select id="f-slot">
        ${DATA.settings.slots.map((s) => `<option value="${s.id}" ${s.id === defaultSlotForNow() ? "selected" : ""}>${s.label}</option>`).join("")}
      </select>
      <label>Nom du repas / aliment</label>
      <input id="f-name" type="text" required placeholder="ex: Bowl saumon avocat">
      <div id="qty-wrap" style="display:none;">
        <label>Quantité consommée (g)</label>
        <input id="f-qty" type="number" min="1" step="1" value="100">
        <div class="empty-note" id="per100-ref"></div>
        <div id="avis-produit-wrap" style="display:none; margin-top:0.6rem;">
          <button type="button" class="btn ghost icon-btn" id="avis-produit-btn">${icon("ask", { size: 16 })}Avis IA sur ce produit</button>
          <div id="avis-produit-answer" style="margin-top:0.6rem;"></div>
        </div>
      </div>
      <div class="form-row">
        <div><label>Calories</label><input id="f-kcal" type="number" min="0" step="1"></div>
        <div><label>Lipides (g)</label><input id="f-fat" type="number" min="0" step="0.1"></div>
      </div>
      <div class="form-row">
        <div><label>Glucides (g)</label><input id="f-carb" type="number" min="0" step="0.1"></div>
        <div><label>dont Sucres (g)</label><input id="f-sugar" type="number" min="0" step="0.1"></div>
      </div>
      <label>Sel (g)</label>
      <input id="f-salt" type="number" min="0" step="0.1">
      <button class="btn" style="margin-top:1.2rem;" type="submit">Enregistrer le repas</button>
    </form>
  `;

  renderBaseFoodResults({ cat: "Féculents" });
  document.getElementById("basefood-cat-toggle").querySelectorAll("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#basefood-cat-toggle [data-cat]").forEach((b) => b.classList.toggle("active", b === btn));
      document.getElementById("basefood-search").value = "";
      renderBaseFoodResults({ cat: btn.dataset.cat });
    });
  });
  let basefoodSearchTimeout = null;
  document.getElementById("basefood-search").addEventListener("input", (e) => {
    clearTimeout(basefoodSearchTimeout);
    const q = e.target.value.trim();
    basefoodSearchTimeout = setTimeout(() => {
      if (q.length === 0) {
        const activeBtn = document.querySelector("#basefood-cat-toggle [data-cat].active") || document.querySelector("#basefood-cat-toggle [data-cat]");
        renderBaseFoodResults({ cat: activeBtn.dataset.cat });
      } else {
        renderBaseFoodResults({ query: q });
      }
    }, 150);
  });

  const results = document.getElementById("off-results");
  const searchInput = document.getElementById("off-search");
  let searchTimeout = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    const q = searchInput.value.trim();
    if (q.length < 3) { results.innerHTML = ""; return; }
    searchTimeout = setTimeout(() => searchOFF(q, results), 450);
  });

  document.getElementById("scan-toggle").addEventListener("click", () => {
    const wrap = document.getElementById("scanner-wrap");
    if (wrap.style.display === "none") {
      wrap.style.display = "block";
      startScanner();
    } else {
      stopScanner();
      wrap.style.display = "none";
    }
  });

  document.getElementById("photo-toggle").addEventListener("click", () => {
    document.getElementById("photo-input").click();
  });
  document.getElementById("photo-input").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const statusEl = document.getElementById("photo-status");
    const btn = document.getElementById("photo-toggle");
    statusEl.style.display = "block";
    statusEl.textContent = "Lecture de la photo...";
    btn.disabled = true;
    try {
      const imageBase64 = await compressImageToBase64(file);
      statusEl.textContent = "Analyse de l'étiquette en cours...";
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, mimeType: "image/jpeg" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      if (data.productName) document.getElementById("f-name").value = data.productName;
      setPer100({
        "energy-kcal_100g": data.kcal100g,
        fat_100g: data.fat100g,
        carbohydrates_100g: data.carbs100g,
        sugars_100g: data.sugars100g,
        salt_100g: data.salt100g
      }, null);
      statusEl.textContent = "Valeurs extraites — vérifie-les avant d'enregistrer.";
    } catch (err) {
      statusEl.textContent = "Lecture de l'étiquette impossible (photo peu nette ou erreur serveur) — saisis les valeurs à la main.";
    } finally {
      btn.disabled = false;
    }
  });

  per100Ref = null;
  document.getElementById("f-qty").addEventListener("input", (e) => {
    applyPer100(Number(e.target.value) || 0);
  });

  document.getElementById("avis-produit-btn").addEventListener("click", () => {
    if (!per100Ref) return;
    const btn = document.getElementById("avis-produit-btn");
    const answerEl = document.getElementById("avis-produit-answer");
    const name = document.getElementById("f-name").value.trim() || "ce produit";
    const qty = Number(document.getElementById("f-qty").value) || 100;
    answerEl.innerHTML = `<div class="empty-note">Analyse en cours...</div>`;
    btn.disabled = true;

    const question = `Que penses-tu de "${name}" pour mon foie si j'en mange ${qty} g maintenant ? Pour 100 g : ${per100Ref.kcal.toFixed(0)} kcal, ${per100Ref.fat.toFixed(1)} g de lipides, ${per100Ref.carb.toFixed(1)} g de glucides dont ${per100Ref.sugar.toFixed(1)} g de sucres.`;

    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context: buildIAContext() })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Erreur");
        answerEl.innerHTML = `<div class="card">${data.answer.replace(/\n/g, "<br>")}</div>`;
      })
      .catch(() => {
        answerEl.innerHTML = `<div class="empty-note">Avis indisponible (hors-ligne ou erreur serveur).</div>`;
      })
      .finally(() => { btn.disabled = false; });
  });

  document.getElementById("meal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const key = todayKey();
    const day = getDay(key);
    day.meals.push({
      id: uid(),
      slotId: document.getElementById("f-slot").value,
      name: document.getElementById("f-name").value.trim() || "Repas",
      kcal: Number(document.getElementById("f-kcal").value) || 0,
      fatG: Number(document.getElementById("f-fat").value) || 0,
      carbG: Number(document.getElementById("f-carb").value) || 0,
      sugarG: Number(document.getElementById("f-sugar").value) || 0,
      saltG: Number(document.getElementById("f-salt").value) || 0,
      time: new Date().toISOString()
    });
    saveData();
    stopScanner();
    toast("Repas ajouté");
    switchView("dashboard");
  });
}

let qrScanner = null;
let per100Ref = null;

function compressImageToBase64(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDim) { height = Math.round((height * maxDim) / width); width = maxDim; }
      else if (height > maxDim) { width = Math.round((width * maxDim) / height); height = maxDim; }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality).split(",")[1]);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image illisible")); };
    img.src = url;
  });
}

const SINGLE_PORTION_MAX_G = 700; // au-delà, on suppose un format multi-portions (riz, pâtes, céréales...)

function parsePackGrams(quantityStr) {
  if (!quantityStr) return null;
  const m = String(quantityStr).trim().match(/^([\d.,]+)\s*(kg|g|l|cl|ml)$/i);
  if (!m) return null;
  const value = parseFloat(m[1].replace(",", "."));
  if (!isFinite(value)) return null;
  const unit = m[2].toLowerCase();
  if (unit === "kg" || unit === "l") return value * 1000;
  if (unit === "cl") return value * 10;
  return value; // g ou ml ~ 1:1
}

function setPer100(n, quantityStr) {
  per100Ref = {
    kcal: n["energy-kcal_100g"] ?? n["energy-kcal"] ?? 0,
    fat: n["fat_100g"] ?? 0,
    carb: n["carbohydrates_100g"] ?? 0,
    sugar: n["sugars_100g"] ?? 0,
    salt: n["salt_100g"] ?? 0
  };
  const packGrams = parsePackGrams(quantityStr);
  const isSinglePortion = packGrams && packGrams <= SINGLE_PORTION_MAX_G;
  const qty = isSinglePortion ? packGrams : 100;

  document.getElementById("qty-wrap").style.display = "block";
  document.getElementById("f-qty").value = qty;

  let note = `Pour 100 g : ${Math.round(per100Ref.kcal)} kcal · ${per100Ref.fat.toFixed(1)} g lipides · ${per100Ref.carb.toFixed(1)} g glucides (dont ${per100Ref.sugar.toFixed(1)} g sucres) · ${per100Ref.salt.toFixed(1)} g sel`;
  if (isSinglePortion) {
    note += ` — paquet entier (${quantityStr}) préremplie, réduis si tu n'as pas tout mangé`;
  } else if (packGrams) {
    note += ` — emballage de ${quantityStr} (format multi-portions), indique ta vraie quantité`;
  } else if (quantityStr) {
    note += ` — poids emballage : ${quantityStr}`;
  }
  document.getElementById("per100-ref").textContent = note;
  document.getElementById("avis-produit-wrap").style.display = "block";
  document.getElementById("avis-produit-answer").innerHTML = "";
  applyPer100(qty);
}

function applyPer100(qtyGrams) {
  if (!per100Ref) return;
  const ratio = qtyGrams / 100;
  document.getElementById("f-kcal").value = Math.round(per100Ref.kcal * ratio);
  document.getElementById("f-fat").value = (per100Ref.fat * ratio).toFixed(1);
  document.getElementById("f-carb").value = (per100Ref.carb * ratio).toFixed(1);
  document.getElementById("f-sugar").value = (per100Ref.sugar * ratio).toFixed(1);
  document.getElementById("f-salt").value = (per100Ref.salt * ratio).toFixed(1);
}

function startScanner() {
  if (typeof Html5Qrcode === "undefined") {
    document.getElementById("scan-status").textContent = "Scanner indisponible (hors-ligne ?)";
    return;
  }
  qrScanner = new Html5Qrcode("reader");
  const config = { fps: 10, qrbox: { width: 250, height: 120 }, formatsToSupport: [
    Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8, Html5QrcodeSupportedFormats.UPC_A
  ] };
  qrScanner.start(
    { facingMode: "environment" },
    config,
    (decodedText) => {
      document.getElementById("scan-status").textContent = `Code détecté : ${decodedText}`;
      stopScanner();
      document.getElementById("scanner-wrap").style.display = "none";
      fetchByBarcode(decodedText);
    },
    () => {}
  ).catch(() => {
    document.getElementById("scan-status").textContent = "Caméra indisponible — autorise l'accès caméra dans les réglages du navigateur.";
  });
}

function stopScanner() {
  if (qrScanner) {
    qrScanner.stop().then(() => qrScanner.clear()).catch(() => {});
    qrScanner = null;
  }
}

async function fetchByBarcode(barcode) {
  toast("Recherche du produit...");
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,nutriments,quantity`);
    const data = await res.json();
    if (data.status !== 1 || !data.product) {
      toast("Produit introuvable dans la base");
      return;
    }
    document.getElementById("f-name").value = data.product.product_name || "Produit scanné";
    setPer100(data.product.nutriments || {}, data.product.quantity);
    toast("Renseigne la quantité consommée");
  } catch (err) {
    toast("Recherche indisponible (hors-ligne ?)");
  }
}

function normalizeText(s) {
  return s
    .replace(/\u0153/gi, "oe")
    .replace(/\u00e6/gi, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function renderBaseFoodResults({ cat, query }) {
  const container = document.getElementById("basefood-results");
  const items = query
    ? BASE_FOODS.filter((f) => normalizeText(f.name).includes(normalizeText(query)))
    : BASE_FOODS.filter((f) => f.cat === cat);
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-note">Aucun aliment trouvé</div>`;
    return;
  }
  container.innerHTML = items.map((f, i) => `<button type="button" class="search-result" data-idx="${i}">
    <strong>${f.name}</strong>
    <span class="brand">${f.cat}</span>
    <span>${f.kcal} kcal · ${f.fat.toFixed(1)}g lipides · ${f.carb.toFixed(1)}g glucides (dont ${f.sugar.toFixed(1)}g sucres) · ${f.salt.toFixed(2)}g sel / 100g</span>
  </button>`).join("");
  container.querySelectorAll("[data-idx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = items[Number(btn.dataset.idx)];
      document.getElementById("f-name").value = f.name;
      setPer100({
        "energy-kcal_100g": f.kcal,
        fat_100g: f.fat,
        carbohydrates_100g: f.carb,
        sugars_100g: f.sugar,
        salt_100g: f.salt
      }, null);
      toast("Renseigne la quantité consommée");
    });
  });
}

async function searchOFF(query, container) {
  container.innerHTML = `<div class="empty-note">Recherche...</div>`;
  try {
    const res = await fetch(`/api/search-off?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    const products = data.results || [];
    if (products.length === 0) {
      container.innerHTML = `<div class="empty-note">Aucun résultat</div>`;
      return;
    }
    container.innerHTML = products.map((p, i) => `<button type="button" class="search-result" data-idx="${i}">
        <strong>${p.name}</strong>
        <span class="brand">${p.brand || "Marque non précisée"}</span>
        <span>${Math.round(p.kcal)} kcal · ${p.fat.toFixed(1)}g lipides · ${p.carb.toFixed(1)}g glucides (dont ${p.sugar.toFixed(1)}g sucres) · ${p.salt.toFixed(1)}g sel / 100g</span>
      </button>`).join("");
    container.querySelectorAll("[data-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = products[Number(btn.dataset.idx)];
        document.getElementById("f-name").value = p.name;
        setPer100({
          "energy-kcal_100g": p.kcal,
          fat_100g: p.fat,
          carbohydrates_100g: p.carb,
          sugars_100g: p.sugar,
          salt_100g: p.salt
        }, p.quantity);
        toast("Renseigne la quantité consommée");
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="empty-note">Recherche indisponible (hors-ligne ou erreur serveur).</div>`;
  }
}

function renderHistorique() {
  const root = document.getElementById("view-historique");
  const keys = Object.keys(DATA.days).sort().reverse().slice(0, historyRange);
  const series = weightSeries(historyRange).reverse();

  let chartSVG = "";
  if (series.length >= 2) {
    const w = 320, h = 120, pad = 10;
    const weights = series.map((s) => s.weightKg);
    const min = Math.min(...weights) - 0.3, max = Math.max(...weights) + 0.3;
    const stepX = (w - pad * 2) / (series.length - 1);
    const points = series.map((s, i) => {
      const x = pad + i * stepX;
      const y = h - pad - ((s.weightKg - min) / (max - min)) * (h - pad * 2);
      return `${x},${y}`;
    }).join(" ");
    chartSVG = `<svg class="history-chart" viewBox="0 0 ${w} ${h}">
      <polyline points="${points}" fill="none" stroke="var(--sauge)" stroke-width="2.5"/>
      ${series.map((s, i) => `<circle cx="${pad + i * stepX}" cy="${h - pad - ((s.weightKg - min) / (max - min)) * (h - pad * 2)}" r="3" fill="var(--coral)"/>`).join("")}
    </svg>`;
  } else {
    chartSVG = `<div class="empty-note">Ajoute un poids sur plusieurs jours pour voir la courbe.</div>`;
  }

  root.innerHTML = `
    <h2 style="font-size:1.3rem; font-weight:600; margin-bottom:0.8rem;">Historique</h2>
    <div class="hist-toggle">
      <button data-range="7" class="${historyRange === 7 ? "active" : ""}">7 jours</button>
      <button data-range="30" class="${historyRange === 30 ? "active" : ""}">30 jours</button>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:0.4rem;">Résumé de la semaine</div>
      <button type="button" class="btn ghost icon-btn" id="resume-hebdo-btn">${icon("ask", { size: 16 })}Générer le résumé (IA)</button>
      <div id="resume-hebdo-answer" style="margin-top:0.6rem;"></div>
    </div>
    <div class="card"><div class="card-title" style="margin-bottom:0.5rem;">Poids</div>${chartSVG}</div>
    <div class="card">
      <div class="card-title" style="margin-bottom:0.4rem;">Journal</div>
      ${keys.length === 0 ? `<div class="empty-note">Aucune donnée pour l'instant.</div>` :
        keys.map((k) => {
          const d = DATA.days[k];
          const t = sumDay(d);
          return `<div class="hist-row" data-day-key="${k}"><span>${new Date(k).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}</span><span>${d.weightKg ? d.weightKg + " kg · " : ""}${fmt(t.kcal)} kcal</span></div>`;
        }).join("")}
    </div>
  `;

  root.querySelectorAll("[data-range]").forEach((btn) => {
    btn.addEventListener("click", () => {
      historyRange = Number(btn.dataset.range);
      renderHistorique();
    });
  });
  root.querySelectorAll("[data-day-key]").forEach((row) => {
    row.addEventListener("click", () => showDayDetailModal(row.dataset.dayKey));
  });

  document.getElementById("resume-hebdo-btn").addEventListener("click", () => {
    const btn = document.getElementById("resume-hebdo-btn");
    const answerEl = document.getElementById("resume-hebdo-answer");
    answerEl.innerHTML = `<div class="empty-note">Analyse de la semaine...</div>`;
    btn.disabled = true;

    const question = "Fais-moi un résumé de ma semaine : tendance du poids, respect des seuils de gras par créneau et du budget sucre, et un conseil concret pour la semaine prochaine.";

    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context: buildWeekContext() })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Erreur");
        answerEl.innerHTML = `<div class="card">${data.answer.replace(/\n/g, "<br>")}</div>`;
      })
      .catch(() => {
        answerEl.innerHTML = `<div class="empty-note">Résumé indisponible (hors-ligne ou erreur serveur).</div>`;
      })
      .finally(() => { btn.disabled = false; });
  });
}

function buildWeekContext() {
  const keys = Object.keys(DATA.days).sort().reverse().slice(0, 7);
  const joursSemaine = keys.map((k) => {
    const d = DATA.days[k];
    const t = sumDay(d);
    return { date: k, poidsKg: d.weightKg, kcal: t.kcal, lipides: t.fat, glucides: t.carb, sucre: t.sugar, sel: t.salt, marcheMin: d.walkMin, kcalBruleesMarcheEstimees: Math.round(estimateWalkKcal(d.walkMin, currentWeightRef(d))), nbRepas: d.meals.length };
  });
  return {
    mode: DATA.settings.mode,
    objectifPoidsKg: DATA.settings.weightGoalKg,
    poidsDepartKg: DATA.settings.weightStartKg,
    deltaSemaineKg: weekWeightDelta(),
    seuilsGrasParCreneau: DATA.settings.fatThresholds,
    budgetSucreJournalierG: DATA.settings.sugarBudgetG,
    budgetLipidesJournalierG: DATA.settings.fatBudgetG,
    budgetSelJournalierG: DATA.settings.saltBudgetG,
    objectifMarcheMin: DATA.settings.walkGoalMin,
    plancherCaloriqueSecurite: DATA.settings.kcalFloor,
    joursSemaine
  };
}

/* ---------- détail repas / récap du jour ---------- */

function showModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal-overlay").classList.add("open");
}

function hideModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

function showMealDetailModal(mealId, dayKey, onBack) {
  const day = getDay(dayKey, false);
  const meal = day && day.meals.find((m) => m.id === mealId);
  if (!meal) return;
  const slot = slotById(meal.slotId);
  const time = meal.time ? new Date(meal.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";
  showModal(`
    <h3 style="font-family:'Fraunces',serif; font-size:1.15rem; margin-bottom:0.2rem;">${meal.name}</h3>
    <div class="empty-note" style="margin-bottom:0.8rem;">${slot ? slot.label : ""}${time ? " · " + time : ""}</div>
    <div class="detail-grid">
      <div class="detail-item"><span class="wlabel">Calories</span><span class="wval">${fmt(meal.kcal)} kcal</span></div>
      <div class="detail-item"><span class="wlabel">Lipides</span><span class="wval">${fmt(meal.fatG, 1)} g</span></div>
      <div class="detail-item"><span class="wlabel">Glucides</span><span class="wval">${fmt(effectiveCarb(meal), 1)} g</span></div>
      <div class="detail-item"><span class="wlabel">dont Sucres</span><span class="wval">${fmt(meal.sugarG, 1)} g</span></div>
      <div class="detail-item" style="grid-column:span 2;"><span class="wlabel">Sel</span><span class="wval">${fmt(meal.saltG, 1)} g</span></div>
    </div>
    ${onBack ? `<button type="button" class="btn ghost" id="modal-back-btn" style="margin-top:1rem;">← Retour au récap du jour</button>` : ""}
  `);
  if (onBack) {
    document.getElementById("modal-back-btn").addEventListener("click", onBack);
  }
}

function buildDayDetailHTML(key) {
  const day = getDay(key, false) || { weightKg: null, walkMin: null, meals: [] };
  const totals = sumDay(day);
  const dateLabel = new Date(key).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  let slotsHTML = "";
  DATA.settings.slots.forEach((slot) => {
    const meals = mealsBySlot(day, slot.id);
    slotsHTML += `<div class="meal-slot">
      <div class="meal-slot-head"><span>${slot.label}</span></div>
      ${meals.length === 0 ? `<div class="empty-note">Rien noté</div>` : meals.map((m) => `
        <div class="meal-row" data-view-meal="${m.id}">
          <div>
            <div class="meal-name">${m.name}</div>
            <div class="meal-meta">${mealMetaLine(m)}</div>
          </div>
        </div>`).join("")}
    </div>`;
  });

  const walkKcal = estimateWalkKcal(day.walkMin, currentWeightRef(day));
  return `
    <h2 style="font-size:1.2rem; margin-bottom:0.2rem; text-transform:capitalize;">${dateLabel}</h2>
    <div class="empty-note" style="margin-bottom:0.8rem;">${day.weightKg ? `Poids : ${fmt(day.weightKg, 1)} kg — ` : ""}Marche : ${day.walkMin ? `${fmt(day.walkMin)} min (≈ ${fmt(walkKcal)} kcal brûlées)` : "non notée"}</div>
    <div class="card">
      <div class="card-title" style="margin-bottom:0.4rem;">Total du jour</div>
      <div class="kcal-val">${fmt(totals.kcal)} kcal</div>
      <div class="meal-meta" style="margin-top:0.3rem;">${fmt(totals.fat, 1)}g lipides · ${fmt(totals.carb, 1)}g glucides (dont ${fmt(totals.sugar, 1)}g sucres) · ${fmt(totals.salt, 1)}g sel</div>
      <div class="detail-grid" style="grid-template-columns:repeat(3, 1fr); margin-top:0.7rem;">
        ${budgetItemHTML("Lipides", totals.fat, DATA.settings.fatBudgetG)}
        ${budgetItemHTML("Sucres", totals.sugar, DATA.settings.sugarBudgetG)}
        ${budgetItemHTML("Sel", totals.salt, DATA.settings.saltBudgetG)}
      </div>
    </div>
    ${slotsHTML}
  `;
}

function showDayDetailModal(key) {
  showModal(buildDayDetailHTML(key));
  document.querySelectorAll("#modal-body [data-view-meal]").forEach((row) => {
    row.addEventListener("click", () => {
      showMealDetailModal(row.dataset.viewMeal, key, () => showDayDetailModal(key));
    });
  });
}

function renderPanique() {
  const root = document.getElementById("view-panique");
  root.innerHTML = `
    <div class="panic-hero">
      <div class="breath-circle">respire</div>
      <div class="panic-timer" id="panic-clock">10:00</div>
      <div class="panic-msg" id="panic-msg">${PANIC_MESSAGES[0]}</div>
      <button class="btn" id="panic-start" style="background:var(--coral);">Démarrer les 10 minutes</button>
      <button class="btn ghost" id="panic-next" style="margin-top:0.6rem;">Message suivant</button>
      <button class="btn ghost icon-btn" id="panic-ia" style="margin-top:0.6rem;">${icon("ask", { size: 16 })}Message perso (IA)</button>
    </div>
  `;
  let msgIdx = 0;
  document.getElementById("panic-next").addEventListener("click", () => {
    msgIdx = (msgIdx + 1) % PANIC_MESSAGES.length;
    document.getElementById("panic-msg").textContent = PANIC_MESSAGES[msgIdx];
  });
  document.getElementById("panic-ia").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const msgEl = document.getElementById("panic-msg");
    const prevText = msgEl.textContent;
    msgEl.textContent = "...";
    btn.disabled = true;

    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "Je suis en pleine envie de craquer là, maintenant. Donne-moi une seule phrase courte, directe et motivante pour tenir 10 minutes sans manger, en tenant compte de ma journée. Pas de liste, pas d'intro, juste la phrase.",
        context: buildIAContext()
      })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Erreur");
        msgEl.textContent = data.answer.trim();
      })
      .catch(() => {
        msgEl.textContent = prevText;
        toast("Message perso indisponible (hors-ligne ou erreur serveur)");
      })
      .finally(() => { btn.disabled = false; });
  });
  document.getElementById("panic-start").addEventListener("click", (e) => {
    if (panicTimer) { clearInterval(panicTimer); panicTimer = null; }
    let remaining = 600;
    const clock = document.getElementById("panic-clock");
    e.target.textContent = "En cours...";
    e.target.disabled = true;
    panicTimer = setInterval(() => {
      remaining--;
      const m = String(Math.floor(remaining / 60)).padStart(2, "0");
      const s = String(remaining % 60).padStart(2, "0");
      clock.textContent = `${m}:${s}`;
      if (remaining <= 0) {
        clearInterval(panicTimer);
        panicTimer = null;
        clock.innerHTML = `${icon("sparkle", { size: 26, color: "var(--gold)" })} Bravo`;
        e.target.textContent = "Démarrer les 10 minutes";
        e.target.disabled = false;
      }
    }, 1000);
  });
}

function buildIAContext() {
  const key = todayKey();
  const day = getDay(key, false) || { weightKg: null, meals: [] };
  const totals = sumDay(day);
  return {
    mode: DATA.settings.mode,
    objectifPoidsKg: DATA.settings.weightGoalKg,
    poidsDepartKg: DATA.settings.weightStartKg,
    poidsAujourdhuiKg: day.weightKg,
    marcheAujourdhuiMin: day.walkMin,
    kcalBruleesMarcheEstimees: Math.round(estimateWalkKcal(day.walkMin, currentWeightRef(day))),
    objectifMarcheMin: DATA.settings.walkGoalMin,
    deltaSemaineKg: weekWeightDelta(),
    seuilsGrasParCreneau: DATA.settings.fatThresholds,
    budgetSucreJournalierG: DATA.settings.sugarBudgetG,
    budgetLipidesJournalierG: DATA.settings.fatBudgetG,
    budgetSelJournalierG: DATA.settings.saltBudgetG,
    plancherCaloriqueSecurite: DATA.settings.kcalFloor,
    heureCoupureSucre: DATA.settings.sugarCutoffHour,
    totalAujourdhui: totals,
    repasAujourdhui: day.meals.map((m) => ({ creneau: m.slotId, nom: m.name, kcal: m.kcal, lipides: m.fatG, glucides: m.carbG, sucre: m.sugarG, sel: m.saltG }))
  };
}

function renderIA() {
  const root = document.getElementById("view-ia");
  root.innerHTML = `
    <h2 style="font-size:1.3rem; font-weight:600; margin-bottom:0.4rem;">Poser une question</h2>
    <p class="empty-note" style="margin-bottom:0.8rem;">Réponses générées à partir de ton suivi du jour — ne remplace pas un avis médical.</p>
    <textarea id="ia-question" rows="3" placeholder="ex: je pars en Sicile, qu'est-ce que je peux manger sans risque ?" style="width:100%; padding:0.7rem 0.8rem; border-radius:0.6rem; border:1px solid var(--line); font-family:inherit; font-size:0.9rem; background:#fff; resize:vertical;"></textarea>
    <button class="btn icon-btn" id="ia-ask-btn" style="margin-top:0.8rem;">${icon("ask", { size: 17 })}Demander</button>
    <div id="ia-answer" style="margin-top:1rem;"></div>
  `;

  document.getElementById("ia-ask-btn").addEventListener("click", () => {
    const questionEl = document.getElementById("ia-question");
    const question = questionEl.value.trim();
    if (!question) return;
    const answerEl = document.getElementById("ia-answer");
    answerEl.innerHTML = `<div class="empty-note">Réflexion en cours...</div>`;

    fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context: buildIAContext() })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.error || "Erreur");
        answerEl.innerHTML = `<div class="card">${data.answer.replace(/\n/g, "<br>")}</div>`;
      })
      .catch(() => {
        answerEl.innerHTML = `<div class="empty-note">Question indisponible (hors-ligne ou erreur serveur).</div>`;
      });
  });
}

function renderReglages() {
  const root = document.getElementById("view-reglages");
  const s = DATA.settings;
  root.innerHTML = `
    <h2 style="font-size:1.3rem; font-weight:600; margin-bottom:0.8rem;">Réglages</h2>
    <form id="settings-form">
      <label>Poids de départ (kg)</label>
      <input type="number" step="0.1" id="s-start" value="${s.weightStartKg}">
      <label>Objectif de poids (kg)</label>
      <input type="number" step="0.1" id="s-goal" value="${s.weightGoalKg}">
      <label>Coupure sucre à partir de (heure)</label>
      <input type="number" min="0" max="23" id="s-cutoff" value="${s.sugarCutoffHour}">
      <label>Plancher calorique de sécurité (kcal)</label>
      <input type="number" step="10" id="s-floor" value="${s.kcalFloor}">
      <label>Budget sucre/jour (g) — mode Foie</label>
      <input type="number" step="1" id="s-sugar" value="${s.sugarBudgetG}">
      <label>Budget lipides/jour (g)</label>
      <input type="number" step="1" id="s-fat-budget" value="${s.fatBudgetG}">
      <label>Budget sel/jour (g)</label>
      <input type="number" step="0.5" id="s-salt" value="${s.saltBudgetG}">
      <label>Objectif marche quotidien (min)</label>
      <input type="number" step="5" id="s-walk" value="${s.walkGoalMin}">
      <div class="form-row">
        <div><label>Seuil gras collation (g)</label><input type="number" step="0.5" id="s-fat-collation" value="${s.fatThresholds.collation}"></div>
        <div><label>Seuil gras repas (g)</label><input type="number" step="0.5" id="s-fat-repas" value="${s.fatThresholds.repas}"></div>
      </div>
      <button class="btn" style="margin-top:1.2rem;" type="submit">Enregistrer les réglages</button>
    </form>
    <div class="settings-actions">
      <button class="btn ghost" id="export-btn">Exporter (backup)</button>
      <button class="btn ghost" id="import-btn">Importer</button>
    </div>
    <input type="file" id="import-file" accept="application/json" style="display:none;">
  `;
  document.getElementById("settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    s.weightStartKg = Number(document.getElementById("s-start").value);
    s.weightGoalKg = Number(document.getElementById("s-goal").value);
    s.sugarCutoffHour = Number(document.getElementById("s-cutoff").value);
    s.kcalFloor = Number(document.getElementById("s-floor").value);
    s.sugarBudgetG = Number(document.getElementById("s-sugar").value);
    s.fatBudgetG = Number(document.getElementById("s-fat-budget").value);
    s.saltBudgetG = Number(document.getElementById("s-salt").value);
    s.walkGoalMin = Number(document.getElementById("s-walk").value);
    s.fatThresholds.collation = Number(document.getElementById("s-fat-collation").value);
    s.fatThresholds.repas = Number(document.getElementById("s-fat-repas").value);
    saveData();
    toast("Réglages enregistrés");
  });
  document.getElementById("export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `optimiam-backup-${todayKey()}.json`;
    a.click();
  });
  document.getElementById("import-btn").addEventListener("click", () => {
    document.getElementById("import-file").click();
  });
  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        DATA = parsed;
        DATA.settings = Object.assign(structuredClone(DEFAULT_SETTINGS), DATA.settings || {});
        DATA.days = DATA.days || {};
        saveData();
        toast("Import réussi");
        renderAll();
      } catch (err) {
        toast("Fichier invalide");
      }
    };
    reader.readAsText(file);
  });
}

/* ---------- navigation ---------- */

function switchView(view) {
  if (currentView === "ajouter" && view !== "ajouter") stopScanner();
  currentView = view;
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${view}`));
  document.querySelectorAll(".bottom-nav button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  if (view === "dashboard") renderDashboard();
  if (view === "ajouter") renderAjouter();
  if (view === "historique") renderHistorique();
  if (view === "panique") renderPanique();
  if (view === "ia") renderIA();
  if (view === "reglages") renderReglages();
  window.scrollTo(0, 0);
}

function renderAll() {
  renderTopbar();
  switchView(currentView);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  document.querySelectorAll(".bottom-nav button").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });
  document.getElementById("modal-close").addEventListener("click", hideModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") hideModal();
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
