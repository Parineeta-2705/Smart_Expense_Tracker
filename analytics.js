// analytics.js - Budget Health Score engine (shared by dashboard and API)
const NEEDS = ["Rent", "Groceries", "Transport", "Utilities", "Health", "Education"];

function classifyBudget(spent, budget) {
  const utilization = (spent / budget) * 100;
  return utilization > 100 ? "over" : utilization >= 80 ? "near" : "safe";
}

function findDuplicates(txns) {
  // Same merchant + same amount within 7 days => flagged as possible double charge
  const flagged = [];
  const sorted = [...txns].sort((a, b) => new Date(a.date) - new Date(b.date));
  sorted.forEach((t, i) => {
    const prev = sorted.slice(0, i).find(p =>
      p.merchant === t.merchant && p.amount === t.amount &&
      (new Date(t.date) - new Date(p.date)) / 864e5 <= 7);
    if (prev) flagged.push({ first: prev, repeat: t });
  });
  return flagged;
}

function evaluateDashboardMetrics(txns, budgets) {
  const spentBy = {};
  txns.forEach(t => spentBy[t.category] = (spentBy[t.category] || 0) + t.amount);
  const status = { Safe: 0, Near: 0, Over: 0 };
  const alerts = [];
  Object.keys(budgets).forEach(cat => {
    const tier = classifyBudget(spentBy[cat] || 0, budgets[cat]);
    status[{ safe: "Safe", near: "Near", over: "Over" }[tier]]++;
    if (tier === "over") alerts.push(`${cat} exceeded budget by ₹${(spentBy[cat] - budgets[cat]).toLocaleString("en-IN")}`);
  });
  const dups = findDuplicates(txns);
  dups.forEach(d => alerts.push(`Possible double charge: ${d.repeat.merchant} (₹${d.repeat.amount})`));
  const penalty = status.Over * 12 + status.Near * 4 + dups.length * 3;
  const needs = txns.filter(t => NEEDS.includes(t.category)).reduce((s, t) => s + t.amount, 0);
  const total = txns.reduce((s, t) => s + t.amount, 0);
  return {
    budget_health_score: Math.max(0, Math.min(100, 100 - penalty)),
    status_distribution: status, spentBy, total, needs, wants: total - needs,
    duplicate_count: dups.length, alerts
  };
}
if (typeof module !== "undefined") module.exports = { evaluateDashboardMetrics, classifyBudget, findDuplicates };
