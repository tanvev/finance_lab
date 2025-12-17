document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      id: "income",
      text: "What best describes your current situation?",
      options: [
        { label: "Student / No stable monthly income yet", value: "student" },
        { label: "Fresher with salary under ₹30,000/month", value: "low_income" },
        { label: "Working professional above ₹30,000/month", value: "steady_income" },
      ],
    },
    {
      id: "pay_habit",
      text: "How do you usually pay back borrowed money?",
      options: [
        { label: "I clear full amount on time, always", value: "full" },
        { label: "Sometimes I delay or pay part of it", value: "partial" },
        { label: "I often pay just the minimum required", value: "minimum" },
      ],
    },
    {
      id: "spend_focus",
      text: "Where does most of your monthly spending go (excluding rent)?",
      options: [
        { label: "Food, groceries, online shopping", value: "food_online" },
        { label: "Daily commute / fuel / cabs", value: "fuel_travel" },
        { label: "Mixed — a bit of everything", value: "mixed" },
        { label: "Very low discretionary spends", value: "minimal" },
      ],
    },
    {
      id: "upi_usage",
      text: "How often do you use UPI or debit card instead of credit?",
      options: [
        { label: "Almost everything is UPI/debit", value: "upi_heavy" },
        { label: "Balanced mix of UPI and card", value: "balanced" },
        { label: "I prefer swiping card for most spends", value: "card_heavy" },
      ],
    },
    {
      id: "mindset",
      text: "Be honest: which one sounds closer to you?",
      options: [
        { label: "I’m disciplined. I can track and pay on time.", value: "disciplined" },
        { label: "Sometimes I get impulsive with offers & sales.", value: "impulsive" },
        { label: "I don’t track spends much — I just tap and go.", value: "no_tracking" },
      ],
    },
  ];

  const stepLabel = document.getElementById("cc-step-label");
  const questionText = document.getElementById("cc-question-text");
  const optionsBox = document.getElementById("cc-options");
  const prevBtn = document.getElementById("cc-prev-btn");
  const nextBtn = document.getElementById("cc-next-btn");
  const resultBox = document.getElementById("cc-result-box");
  const resultSummary = document.getElementById("cc-result-summary");
  const compareWrapper = document.getElementById("cc-compare-wrapper");
  const compareBody = document.getElementById("cc-compare-body");
  const behaviourBox = document.getElementById("cc-behaviour-box");

  let currentIndex = 0;
  const answers = {};

  function renderQuestion() {
    const q = questions[currentIndex];

    stepLabel.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    questionText.textContent = q.text;
    optionsBox.innerHTML = "";
    resultBox.classList.add("hidden");

    q.options.forEach((opt) => {
      const wrapper = document.createElement("button");
      wrapper.type = "button";
      wrapper.className =
        "w-full text-left px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs md:text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition flex items-center gap-2";
      wrapper.dataset.value = opt.value;

      const radio = document.createElement("span");
      radio.className =
        "inline-block w-3 h-3 rounded-full border border-gray-400 dark:border-gray-500 mr-1";
      if (answers[q.id] === opt.value) {
        wrapper.classList.add("ring-1", "ring-blue-500", "bg-blue-50", "dark:bg-gray-700");
        radio.classList.add("bg-blue-500");
      }

      const text = document.createElement("span");
      text.textContent = opt.label;

      wrapper.appendChild(radio);
      wrapper.appendChild(text);

      wrapper.addEventListener("click", () => {
        answers[q.id] = opt.value;
        renderQuestion();
      });

      optionsBox.appendChild(wrapper);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === questions.length - 1 ? "See Result" : "Next";
  }

  function allAnsweredUpTo(index) {
    for (let i = 0; i <= index; i++) {
      if (!answers[questions[i].id]) return false;
    }
    return true;
  }

  function handleNext() {
    if (!answers[questions[currentIndex].id]) {
      // simple nudge
      questionText.classList.add("animate-pulse");
      setTimeout(() => questionText.classList.remove("animate-pulse"), 500);
      return;
    }

    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  }

  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);

  // -----------------------
  // RESULT ENGINE
  // -----------------------
  function showResult() {
    const income = answers["income"];
    const habit = answers["pay_habit"];
    const focus = answers["spend_focus"];
    const upi = answers["upi_usage"];
    const mindset = answers["mindset"];

    let riskLevel = "low";
    if (habit === "minimum" || mindset === "no_tracking") riskLevel = "high";
    else if (habit === "partial" || mindset === "impulsive") riskLevel = "medium";

    // 1) Case: No card recommended yet
    if (income === "student" && riskLevel !== "low") {
      resultSummary.innerHTML =
        `<strong>Right now, you’re better off without a credit card.</strong><br>` +
        `UPI + debit card are enough for your stage. Work first on tracking spends and building a small emergency buffer. ` +
        `Later, when your income is stable and you pay full balances on time, you can consider a beginner card.`;

      compareWrapper.classList.add("hidden");
      behaviourBox.innerHTML =
        `• Focus on 1–2 UPI apps and avoid “Buy Now, Pay Later” options.<br>` +
        `• Start a tiny monthly savings auto-transfer (even ₹500–₹1,000) instead of chasing card points.<br>` +
        `• Think of a future credit card as a tool, not an extra wallet.`

      resultBox.classList.remove("hidden");
      return;
    }

    // If habit is very risky, even for earners
    if (riskLevel === "high") {
      resultSummary.innerHTML =
        `<strong>Your money behaviour suggests high risk with credit cards.</strong><br>` +
        `It’s not that cards are “bad”, but mixing minimum-due habits with credit limits is a fast way to get stuck in debt. ` +
        `Work on paying full amounts on time with UPI/debit expenses first.`;

      compareWrapper.classList.add("hidden");
      behaviourBox.innerHTML =
        `• Make a simple rule: if you can’t pay it off this month, don’t swipe it.<br>` +
        `• Try tracking spends for 30 days — you’ll see where money silently escapes.<br>` +
        `• Once you have 3–6 months of clean repayment habits, a low-limit card can be revisited.`;

      resultBox.classList.remove("hidden");
      return;
    }

    // 2) Decide Card Types: A and B (feature-based only)
    // Default
    let cardA = "Beginner Cashback Card";
    let cardB = "No-Fee Minimalist Card";
    let summaryMain = "";
    let featureRows = [];

    // Choose based on spending focus
    if (focus === "food_online") {
      cardA = "Beginner Cashback Card";
      cardB = "Balanced Everyday Card";
      summaryMain =
        "You look like a good fit for a simple cashback-style card that rewards food and online spending, " +
        "paired with a basic low-maintenance backup option.";
      featureRows = [
        ["Best for", "Food + online orders", "Mixed daily spends"],
        ["Annual fee", "Often ₹0 with minimum spend", "Mostly ₹0 or very low"],
        ["Reward style", "Cashback on food, groceries, online", "Flat low rewards, simple structure"],
        ["Risk level", "Safe if you pay full each month", "Very safe, low limit & low temptation"],
      ];
    } else if (focus === "fuel_travel") {
      cardA = "Fuel Saver Card";
      cardB = "Beginner Cashback Card";
      summaryMain =
        "Since a big chunk of your money goes into commute or fuel, a fuel-saver style card can reduce that cost, " +
        "and a basic cashback card can handle the rest of your spends.";
      featureRows = [
        ["Best for", "Fuel, tolls, commute expenses", "Food, online & everyday spends"],
        ["Annual fee", "Usually justified if commute is high", "Often ₹0 with minimum spend"],
        ["Reward style", "Fuel surcharge waivers + points on fuel", "Cashback on popular categories"],
        ["Risk level", "Medium — travel can tempt extra spending", "Safe if used for planned spends"],
      ];
    } else if (focus === "minimal") {
      cardA = "No-Fee Minimalist Card";
      cardB = "Beginner Cashback Card";
      summaryMain =
        "You don’t spend a lot on extras, which is actually great. A minimal, no-fee card is enough, " +
        "with an optional simple cashback card only if you start using it for planned spends.";
      featureRows = [
        ["Best for", "Building credit history slowly", "Planned food/online spends"],
        ["Annual fee", "₹0 or very low, no pressure to spend", "₹0 if minimum spend done"],
        ["Reward style", "Very basic rewards — focus is simplicity", "Better rewards but higher temptation"],
        ["Risk level", "Very safe, especially with low limit", "Safe if you track usage monthly"],
      ];
    } else {
      // mixed
      cardA = "Beginner Cashback Card";
      cardB = "Balanced Everyday Card";
      summaryMain =
        "Your spends are quite mixed, so a simple cashback card plus a balanced everyday card works best — " +
        "no complex reward structures, just straightforward value.";
      featureRows = [
        ["Best for", "Everyday online + offline spends", "Groceries, bills & general use"],
        ["Annual fee", "Low/zero with minimum annual spend", "Low, with simple conditions"],
        ["Reward style", "Higher rewards on select categories", "Steady but modest rewards overall"],
        ["Risk level", "Safe if you treat it like a debit card", "Safe, especially with low preset limit"],
      ];
    }

    // Adjust recommendation if heavy UPI
    if (upi === "upi_heavy") {
      summaryMain +=
        " Because you already use UPI heavily, think of the card as a backup and for specific offers, not for every transaction.";
    }

    // Behaviour tips
    let behaviourTips =
      "• Always pay the full amount due — never treat “minimum due” as okay.<br>" +
      "• Keep your credit limit low in the beginning, so mistakes stay small.<br>" +
      "• Turn off international usage & cash withdrawal on the card unless you truly need it.";

    if (habit === "full" && mindset === "disciplined") {
      behaviourTips =
        "• You already have the right mindset — just keep the rule: full payment every month.<br>" +
        "• Set an auto-reminder 3–4 days before due date.<br>" +
        "• Use the card only for planned expenses you could have paid via UPI anyway.";
    } else if (mindset === "impulsive") {
      behaviourTips =
        "• Use the card only for fixed things (like fixed monthly bills), not for impulse purchases.<br>" +
        "• Uninstall shopping apps if you tend to “just browse and swipe”.<br>" +
        "• If you ever can’t pay in full, pause using the card until you clear the dues.";
    }

    // Fill summary
    resultSummary.innerHTML =
      `<strong>Suggested primary card type:</strong> ${cardA}<br>` +
      `<strong>Alternative card type:</strong> ${cardB}<br><br>` +
      summaryMain;

    // Fill comparison table
    compareBody.innerHTML = "";
    featureRows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-gray-100 dark:border-gray-800";
      tr.innerHTML = `
        <td class="py-2 pr-2 text-gray-600 dark:text-gray-300">${row[0]}</td>
        <td class="py-2 px-2 text-gray-800 dark:text-gray-100">${row[1]}</td>
        <td class="py-2 px-2 text-gray-800 dark:text-gray-100">${row[2]}</td>
      `;
      compareBody.appendChild(tr);
    });
    compareWrapper.classList.remove("hidden");

    // Behaviour tips
    behaviourBox.innerHTML = behaviourTips;

    resultBox.classList.remove("hidden");
  }

  // Initial render
  renderQuestion();
});
