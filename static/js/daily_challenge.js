// =======================
// SAFE LOCAL STORAGE FIX
// =======================
function safeStore(key, value) {
  try { localStorage.setItem(key, value); }
  catch (e) { console.warn("Storage blocked"); }
}

function safeRead(key, fallback = null) {
  try { return localStorage.getItem(key) ?? fallback; }
  catch (e) { return fallback; }
}


const dailyBank = [
  // ============================
  // 📈 INVESTING (12)
  // ============================
  {
    text: "You invest ₹2,000/month in a SIP and markets crash. Best move?",
    options: [
      "Stop investing until it recovers",
      "Invest more if possible",
      "Withdraw money immediately",
      "Switch to FD for safety"
    ],
    correct: 1,
    lesson: "Market crash = discount season. It’s the Big Billion Day of investing, not breakup time."
  },
  {
    text: "What matters most for SIP returns over 10 years?",
    options: [
      "The fund that performed best last year",
      "Staying invested without stopping",
      "Timing the market perfectly",
      "Checking NAV daily"
    ],
    correct: 1,
    lesson: "Consistency beats curiosity. SIP doesn’t need daily stalking."
  },
  {
    text: "You increase SIP by ₹200 every year. This strategy is called?",
    options: ["SIP Booster", "Step-up SIP", "Top-up NAV", "Profit Averaging"],
    correct: 1,
    lesson: "Small yearly increase = big future. Like adding chilli flakes to compounding."
  },
  {
    text: "What is the real reason SIP builds wealth?",
    options: [
      "You invest when markets are high",
      "You buy more when markets are low",
      "Returns are guaranteed",
      "Fund manager controls losses"
    ],
    correct: 1,
    lesson: "SIP loves dips. It buys cheaper — like bargain hunting without coupons."
  },
  {
    text: "If you pause your SIP, what happens to existing units?",
    options: [
      "They stop growing",
      "They keep compounding",
      "They expire after 12 months",
      "They convert to FD"
    ],
    correct: 1,
    lesson: "SIP paused ≠ compounding paused. Good investments don’t ghost you."
  },
  {
    text: "Which fund type suits long-term goals (5–10 years)?",
    options: ["Equity Funds", "Liquid Funds", "Bank FD", "Gold Loan"],
    correct: 0,
    lesson: "Long-term goals need equity. Good things take time — like biryani."
  },
  {
    text: "Which habit reduces SIP risk the most?",
    options: [
      "Checking NAV every day",
      "Investing only during high returns",
      "Holding for a long period",
      "Buying only popular funds"
    ],
    correct: 2,
    lesson: "Time in market beats fame in market. Not all heroes trend."
  },
  {
    text: "Which SIP mistake is the worst?",
    options: [
      "Investing in a bad market",
      "Stopping during correction",
      "Investing too early",
      "Not checking expense ratio daily"
    ],
    correct: 1,
    lesson: "Stopping SIP in a crash is like leaving a sale when discounts hit 90%."
  },
  {
    text: "Why shouldn’t you switch mutual funds frequently?",
    options: [
      "You might lose tracking history",
      "Switching costs extra tax & missed compounding",
      "NAV gets manipulated",
      "Fund manager blocks switching"
    ],
    correct: 1,
    lesson: "Frequent switching kills compounding like too many breakups ruin trust."
  },
  {
    text: "Which factor is NOT guaranteed in SIP?",
    options: ["Returns", "NAV", "Units purchased", "Risk level"],
    correct: 0,
    lesson: "SIP guarantees discipline, not profit. Gym membership vibes."
  },
  {
    text: "You start a SIP 2 years late. What’s the effect?",
    options: [
      "You lose only interest amount",
      "You need to invest more monthly later",
      "Returns remain identical",
      "You gain more units"
    ],
    correct: 1,
    lesson: "Late investing hits like late semester studying — more effort needed later."
  },
  {
    text: "Which action increases wealth fastest?",
    options: [
      "Timing the market",
      "Increasing SIP with salary increments",
      "Stopping when markets fall",
      "Only picking 5-star funds"
    ],
    correct: 1,
    lesson: "Salary grows? SIP should too. Don’t upgrade only your phone."
  },

  // ============================
  // 👩‍💼 SALARY / CTC / TAX (12)
  // ============================
  {
    text: "CTC includes employer PF. What does it mean for in-hand?",
    options: [
      "You get more in-hand",
      "You get less in-hand",
      "No change to salary",
      "PF is optional benefit only"
    ],
    correct: 1,
    lesson: "Employer PF is part of CTC like toppings counted in pizza bill."
  },
  {
    text: "A company offers 30% variable pay. Expectation?",
    options: [
      "Paid fully every month",
      "Paid only if targets + company performance are good",
      "Always paid quarterly",
      "Paid only in cash"
    ],
    correct: 1,
    lesson: "Variable = ifs and buts. Like rain during picnic plans."
  },
  {
    text: "Basic Salary determines:",
    options: ["Only PF", "Only HRA", "PF + HRA", "Nothing significant"],
    correct: 2,
    lesson: "Basic decides PF + HRA. It’s the salary heart, not decoration."
  },
  {
    text: "Which part of salary is often UNPAID if you leave early?",
    options: ["Basic", "HRA", "Variable Bonus", "DA (Dearness Allowance)"],
    correct: 2,
    lesson: "Variable doesn’t love short-term relationships."
  },
  {
    text: "Choosing New Tax Regime is best for someone with:",
    options: [
      "Many deductions",
      "No deductions or tax-saving plans",
      "Only home loan",
      "Only insurance"
    ],
    correct: 1,
    lesson: "New regime is for lazy investors — no tax planning required."
  },
  {
    text: "In-hand increases most if you negotiate:",
    options: [
      "CTC value",
      "Fixed salary share",
      "More variable",
      "Free food coupons"
    ],
    correct: 1,
    lesson: "Ask to increase FIXED pay. Don’t negotiate for samosas."
  },
  {
    text: "PF Opt-out increases:",
    options: ["Long-term wealth", "Take-home salary", "Bonus payout", "Tax refund"],
    correct: 1,
    lesson: "Opt-out = more money now, less later. Like skipping veggies for ice-cream."
  },
  {
    text: "What does 'Bond Period' really mean in offer letters?",
    options: [
      "Company pays extra",
      "You must pay penalty if you leave early",
      "Job is permanent",
      "Higher bonus payout"
    ],
    correct: 1,
    lesson: "Bond = breakup fees. HR doesn’t like sudden ghosting."
  },
  {
    text: "Which allowance reduces taxable income under conditions?",
    options: ["HRA", "DA", "City Compensatory Allowance", "Travel Reimbursement"],
    correct: 0,
    lesson: "HRA is tax’s mortal enemy when you have rent receipts."
  },
  {
    text: "A company gives ₹50,000 joining bonus with 1-year bond. If you leave early?",
    options: [
      "Bonus is yours",
      "You return bonus partly or fully",
      "Company pays extra",
      "Only PF deducted"
    ],
    correct: 1,
    lesson: "Joining bonus isn’t a gift. It’s a refundable welcome chocolate."
  },
  {
    text: "Your payslip shows higher gross than in-hand due to:",
    options: ["Extra incentives", "Deductions like PF & Tax", "Salary error", "Pending bonus"],
    correct: 1,
    lesson: "Gross looks rich. Deductions show real life."
  },
  {
    text: "Leaving job before variable cycle impacts?",
    options: [
      "You still get full amount",
      "You may get nothing or reduced amount",
      "You get double",
      "It becomes PF"
    ],
    correct: 1,
    lesson: "Variable ghost you if you leave early. No closure dinners."
  },

  // ============================
  // 💰 BUDGETING (4)
  // ============================
  {
    text: "Budgeting’s main goal is:",
    options: ["Restrict spending", "Give every rupee a purpose", "Track only big expenses", "Save randomly"],
    correct: 1,
    lesson: "Budgeting is assigning jobs. Rupees don’t like unemployment."
  },
  {
    text: "₹200/day on snacks totals around per month?",
    options: ["₹3,000", "₹6,000", "₹9,000", "₹10,000+"],
    correct: 1,
    lesson: "Small cravings + 30 days = big financial calories."
  },
  {
    text: "Which expense grows unnoticed?",
    options: ["Rent", "Subscriptions", "Groceries", "Mobile recharge"],
    correct: 1,
    lesson: "Subscriptions are silent killers. They don’t bark, they just bite monthly."
  },
  {
    text: "Zero-based budgeting means:",
    options: [
      "Don’t spend at all",
      "Assign every rupee a category before month begins",
      "Track only cash expenses",
      "Spend first, save later"
    ],
    correct: 1,
    lesson: "Savings should be planned, not leftovers like cold fries."
  },

  // ============================
  // 🏦 BANKING (4)
  // ============================
  {
    text: "FD interest is taxable. When does bank cut TDS?",
    options: ["Only at maturity", "When interest is credited", "Never", "Only above ₹5 lakh FD"],
    correct: 1,
    lesson: "TDS bites when interest shows up, not when FD ends."
  },
  {
    text: "UPI payment scams mostly happen when you:",
    options: [
      "Share UPI PIN",
      "Just receive money",
      "Scan QR to receive money",
      "Download a payment app"
    ],
    correct: 0,
    lesson: "UPI PIN is like ATM PIN. Don’t share even with best friend + chai."
  },
  {
    text: "Which bank account type earns interest differently?",
    options: ["Salary Account", "Savings Account", "NRE/NRO Accounts", "Company Current Account"],
    correct: 2,
    lesson: "NRE/NRO have tax & foreign rules. They are banking’s NRIs."
  },
  {
    text: "Online bank KYC prevents:",
    options: ["Taxes", "Loan rejection", "Fraud accounts & misuse", "Credit card charges"],
    correct: 2,
    lesson: "KYC = Know Your Customer, not Keep Your Cash."
  },

  // ============================
  // ⚠️ SCAMS (3)
  // ============================
  {
    text: "If someone sends you money on UPI and requests you to send it back:",
    options: [
      "Immediately return",
      "Check bank + statement first",
      "Block payment request",
      "Give OTP to confirm"
    ],
    correct: 1,
    lesson: "Always verify. Returning unknown money is like replying to wrong-number crush."
  },
  {
    text: "Which scam asks you to click a fake job link & fill personal info?",
    options: ["Vishing", "Phishing", "Sim Swap", "Spoofing"],
    correct: 1,
    lesson: "Phishing attacks love resumes more than HR."
  },
  {
    text: "Never share OTP even if caller says:",
    options: [
      "He’s from bank",
      "He’s from UPI support",
      "He’s from police",
      "All of the above"
    ],
    correct: 3,
    lesson: "Scammers can role-play better than theatre artists."
  },

  // ============================
  // 💳 LOANS (2, Rare)
  // ============================
  {
    text: "Longer EMI tenure means:",
    options: ["Lower EMI + higher interest overall", "Higher EMI + lower interest", "No change", "Zero interest"],
    correct: 0,
    lesson: "Small EMI feels sweet now, burns later. Like too much dessert."
  },
  {
    text: "Paying only credit card ‘minimum due' leads to:",
    options: ["Lower debt", "Zero interest", "Heavy compounding interest", "Bonus rewards"],
    correct: 2,
    lesson: "Minimum due = financial friend zone. You pay, it never ends."
  }
];
// ============================
// DAILY QUESTION ENGINE
// ============================

// HTML elements
const qText   = document.getElementById("q-text");
const qOpts   = document.getElementById("q-options");
const qFeed   = document.getElementById("q-feedback");
const qDate   = document.getElementById("q-date");

// Use safe storage (if available)
const todayKey = new Date().toISOString().slice(0,10);
let storedIndex = safeRead("fl_daily_q_index");

// ➤ Pick question either saved or new
function getDailyQuestionIndex(){
  if (storedIndex && safeRead("fl_daily_q_date") === todayKey) {
    return Number(storedIndex);
  }
  // pick NEW question if date changed
  const newIndex = Math.floor(Math.random() * dailyBank.length);
  safeStore("fl_daily_q_index", newIndex);
  safeStore("fl_daily_q_date", todayKey);
  return newIndex;
}

const qIndex = getDailyQuestionIndex();
const question = dailyBank[qIndex];

// Show Question
qText.textContent = question.text;
qDate.textContent = todayKey;

// Show Options
question.options.forEach((opt, i) => {
  const btn = document.createElement("button");
  btn.className = "w-full text-left py-2 px-3 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition";
  btn.textContent = opt;
  btn.onclick = () => checkAnswer(i);
  qOpts.appendChild(btn);
});

// Handle Answer
function checkAnswer(i){
  qFeed.classList.remove("hidden");

  if(i === question.correct){
    qFeed.className = "mt-4 p-3 bg-green-100 dark:bg-green-900 text-gray-900 dark:text-gray-100 rounded";
    qFeed.textContent = "✔ Correct! " + question.lesson;
  } else {
    qFeed.className = "mt-4 p-3 bg-red-100 dark:bg-red-900 text-gray-900 dark:text-gray-100 rounded";
    qFeed.textContent = "✖ Wrong. " + question.lesson;
  }
}
