function updatePlan() {
  const salary = parseInt(document.getElementById("salary").value);
  const city = document.getElementById("city").value;
  const living = document.getElementById("living").value;
  const goal = document.getElementById("goal").value;
  const taxRegime = document.getElementById("tax").value;

  const box = document.getElementById("resultBox");

  if (!salary || salary < 10000) {
    box.style.opacity = "0.40";
    box.style.pointerEvents = "none";
    document.querySelector("#breakdown").innerHTML = "";
    document.querySelector("#alertBox").innerHTML = "";
    document.querySelector("#adviceBox").innerHTML = "";
    document.querySelector("#taxBox").innerHTML = "";
    return;
  }

  box.style.opacity = "1";
  box.style.pointerEvents = "auto";

  // Cost multipliers
  const factor = city === "metro" ? 1 : city === "tier1" ? 0.85 : 0.70;

  const rent = living === "family" ? 0 : living === "pg" ? 0.22 : 0.28;
  const food = 0.14 * factor;
  const transport = 0.05 * factor;
  const wants = 0.18;
  const sip = 0.10;

  const breakdown = {
    Rent: salary * rent,
    Food: salary * food,
    Transport: salary * transport,
    Wants: salary * wants,
    SIP: salary * sip,
  };

  let html = "";
  for (let key in breakdown) {
    html += `<p><strong>${key}:</strong> ₹${Math.round(breakdown[key]).toLocaleString()}</p>`;
  }
  document.getElementById("breakdown").innerHTML = html;

  // Alerts
  let alert = "";
  if (rent > 0.28) alert = "🚨 Rent too high: Try PG/roommates to save ₹3,000–₹6,000 yearly.";
  if (salary < 20000 && goal === "laptop") alert = "💻 Buy refurbished instead of EMI — saves 20–40%.";
  if (goal === "emergency") alert = "🛑 Build 3–6 months safety before lifestyle upgrades.";
  document.getElementById("alertBox").innerHTML = alert;

  // Advice
  const advice = {
    emergency: "🌧 Build ₹15K–₹50K safety buffer before fancy spends.",
    laptop: "💻 Upgrade only if it increases income/skills — not for wallpaper FPS.",
    course: "🎓 Buy courses that offer ROI (placement, income boost).",
    travel: "✈️ Don’t take EMI for sunsets. Save monthly instead.",
  };
  document.getElementById("adviceBox").innerHTML = advice[goal];

  // 💸 TAX LOGIC
  const annual = salary * 12;
  let taxSuggestion = "";

  if (taxRegime === "auto") {
    taxSuggestion =
      annual < 700000
        ? "🟢 <strong>New Tax Regime</strong> saves more — no need for investments just to save tax."
        : "🟡 <strong>Old Tax Regime</strong> can save more if you invest in 80C (PF + ELSS + LIC) + use HRA.";
  }
  else if (taxRegime === "new") {
    taxSuggestion = "👍 <strong>New Regime:</strong> No need for tax-saving investments unless useful to you.";
  }
  else if (taxRegime === "old") {
    taxSuggestion = "💡 <strong>Old Regime:</strong> Use 80C + HRA + health insurance to reduce tax.";
  }

  // — Mini examples
  if (annual > 600000 && taxRegime !== "new") {
    taxSuggestion += "<br>💰 Suggested: Invest ₹30K–₹50K/yr in ELSS or PF to save tax.";
  }

  document.getElementById("taxBox").innerHTML = taxSuggestion;
}
