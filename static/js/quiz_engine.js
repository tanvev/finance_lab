// static/js/quiz_engine.js
// Unified Quiz Engine v1
// - initQuiz({ id, title, bank, type }) where:
//    id: 'salary' (used for localStorage keys), title: display title, bank: array of q objects, type: 'random5'|'fixed'
// - Works with 5-question attempts by default (random pick from bank).
(() => {
  // ======= safe storage helpers =======
  function safeSet(key, val){
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){ console.warn("Storage blocked", e); }
  }
  function safeGet(key, fallback=null){
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; }
  }

  // ======= XP / Level helpers =======
  function addXP(id, xp){
    const key = `fl_xp_${id}`;
    const cur = safeGet(key, 0);
    const next = cur + xp;
    safeSet(key, next);
    return next;
  }
  function xpToLevel(xp){
    // simple level formula: level increases per 200 xp (customize)
    const level = Math.floor(xp / 200) + 1;
    return { level, xp };
  }

  // ======= daily streak helpers =======
  function isoDateString(d = new Date()){
    return d.toISOString().slice(0,10);
  }
  function updateDailyStreak(){
    const keyLast = 'fl_daily_last';
    const keyStreak = 'fl_daily_streak';
    const last = safeGet(keyLast, null);
    const today = isoDateString();
    if (last === today) return safeGet(keyStreak, 0);
    const yesterday = (() => {
      const dd = new Date(); dd.setDate(dd.getDate() - 1); return isoDateString(dd);
    })();
    let streak = safeGet(keyStreak, 0);
    if (last === yesterday) streak = streak + 1; else streak = 1;
    safeSet(keyLast, today); safeSet(keyStreak, streak);
    return streak;
  }

  // ======= confetti utility =======
  function launchConfetti(container, pieces=40){
    if (!container) return;
    container.innerHTML = "";
    container.classList.remove("hidden");
    const colors = ["#F4A261", "#A8DADC", "#457B9D", "#E63946", "#A9D957"];
    for (let i=0;i<pieces;i++){
      const p = document.createElement("div");
      const size = 6 + Math.random()*8;
      p.style.position = "absolute";
      p.style.width = `${size}px`;
      p.style.height = `${size*0.4}px`;
      p.style.borderRadius = "2px";
      p.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
      p.style.left = `${Math.random()*100}%`;
      p.style.top = "-10px";
      p.style.opacity = "0";
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      p.style.animation = `fl-confetti-fall ${2 + Math.random()}s ease-out forwards`;
      p.style.animationDelay = `${Math.random()}s`;
      container.appendChild(p);
    }
    setTimeout(()=>{ container.classList.add("hidden"); container.innerHTML = ""; }, 3500);
  }

  // ======= core engine =======
  window.initQuiz = function({ id, title, bank, type = 'randomN', pick = 5 }) {
    // DOM nodes expected:
    // q-counter, q-score, q-text, q-context, q-options, q-feedback, q-warning, q-prev, q-next
    // result-card, quiz-card, result-score, confetti-container, badge-wrapper, badge-title, badge-desc
    if (!bank || !Array.isArray(bank) || bank.length === 0) {
      console.error("Quiz bank missing or empty for", id); return;
    }

    // ====== state ======
    let pool = [];
    let idx = 0;
    let score = 0;
    let answered = {};

    // pick N random questions without replacement
    function pickN(arr, n){
      const copy = arr.slice();
      const out = [];
      for(let i=0;i<n && copy.length;i++){
        const j = Math.floor(Math.random()*copy.length);
        out.push(copy.splice(j,1)[0]);
      }
      return out;
    }

    // prepare pool
    if (type === 'randomN') {
      pool = pickN(bank, pick);
    } else {
      pool = bank.slice(0, pick);
    }

    function render(){
      const q = pool[idx];
      const qTextEl = document.getElementById('q-text');
      const qContextEl = document.getElementById('q-context');
      const qOptionsEl = document.getElementById('q-options');
      const qFeedbackEl = document.getElementById('q-feedback');
      const qWarningEl = document.getElementById('q-warning');
      const qCounterEl = document.getElementById('q-counter');
      const qScoreEl = document.getElementById('q-score');
      const prevBtn = document.getElementById('q-prev');
      const nextBtn = document.getElementById('q-next');

      if (!qTextEl) return;
      qTextEl.textContent = q.text;
      qContextEl.textContent = q.context || "";
      qContextEl.classList.toggle('hidden', !q.context);

      qCounterEl.textContent = `Question ${idx+1} of ${pool.length}`;
      qScoreEl.textContent = `Score: ${score} / ${pool.length}`;

      prevBtn.disabled = idx === 0;
      nextBtn.textContent = idx === pool.length - 1 ? "Finish" : "Next →";

      qOptionsEl.innerHTML = "";
      qFeedbackEl.classList.add('hidden'); qFeedbackEl.textContent = "";
      qWarningEl.classList.add('hidden');

      // render options
      q.options.forEach((opt,i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = "w-full text-left px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 text-xs md:text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition";
        btn.textContent = opt;
        btn.dataset.index = i;
        btn.addEventListener('click', ()=> handleAnswer(i, btn));
        qOptionsEl.appendChild(btn);
      });

      if (answered[idx]) {
        showAnsweredState();
      }
    }

    function showAnsweredState(){
      const q = pool[idx];
      const correctIndex = q.correct;
      const optionButtons = document.querySelectorAll("#q-options button");
      optionButtons.forEach((b, i) => {
        b.disabled = true;
        b.classList.add('cursor-not-allowed');
        if (i === correctIndex) {
          b.classList.remove('bg-gray-50', 'dark:bg-gray-800');
          b.classList.add('bg-green-100', 'dark:bg-green-900', 'border-green-500');
        }
      });
      const qFeedbackEl = document.getElementById('q-feedback');
      qFeedbackEl.classList.remove('hidden');
      qFeedbackEl.innerHTML = `<span class="text-green-700 dark:text-green-300 font-semibold">Answered</span><span class="ml-1 text-gray-700 dark:text-gray-200"> – ${pool[idx].explanation || ""}</span>`;
    }

    function handleAnswer(selectedIndex, clickedBtn){
      if (answered[idx]) return;
      const q = pool[idx];
      const qFeedbackEl = document.getElementById('q-feedback');
      const qWarningEl = document.getElementById('q-warning');
      const optionButtons = document.querySelectorAll("#q-options button");
      optionButtons.forEach(b => { b.disabled = true; b.classList.add('cursor-not-allowed');});
      answered[idx] = true;
      qWarningEl.classList.add('hidden');

      const isCorrect = (selectedIndex === q.correct);
      if (isCorrect) {
        score += 1;
        clickedBtn.classList.remove('bg-gray-50','dark:bg-gray-800');
        clickedBtn.classList.add('bg-green-100','dark:bg-green-900','border-green-500');
      } else {
        clickedBtn.classList.remove('bg-gray-50','dark:bg-gray-800');
        clickedBtn.classList.add('bg-red-100','dark:bg-red-900','border-red-500');
        optionButtons[q.correct].classList.remove('bg-gray-50','dark:bg-gray-800');
        optionButtons[q.correct].classList.add('bg-green-100','dark:bg-green-900','border-green-500');
      }

      qFeedbackEl.classList.remove('hidden');
      qFeedbackEl.innerHTML = `<span class="${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"} font-semibold">${isCorrect ? "Correct" : "Not quite"}</span><span class="ml-1 text-gray-700 dark:text-gray-200"> – ${q.explanation || ""}</span>`;
      document.getElementById('q-score').textContent = `Score: ${score} / ${pool.length}`;

      // Award XP for this answer (10 XP per correct by default)
      if (isCorrect) {
        const totalXP = addXP(id, 10);
        // store last attempt XP (for UI if needed)
        safeSet(`fl_last_xp_${id}`, { date: new Date().toISOString(), xp: 10, total: totalXP });
      }
    }

    function next(){
      if (!answered[idx]) {
        const qWarningEl = document.getElementById('q-warning'); if (qWarningEl) qWarningEl.classList.remove('hidden'); return;
      }
      if (idx === pool.length - 1) {
        showResult(); return;
      }
      idx += 1; render();
    }
    function prev(){
      if (idx === 0) return;
      idx -= 1; render();
    }

    function showResult(){
      // switch UI
      const quizCard = document.getElementById('quiz-card');
      const resultCard = document.getElementById('result-card');
      const resultScore = document.getElementById('result-score');
      if (!quizCard || !resultCard || !resultScore) return;
      quizCard.classList.add('hidden'); resultCard.classList.remove('hidden');

      const total = pool.length;
      const percent = Math.round((score / total) * 100);
      resultScore.textContent = `You scored ${score} out of ${total} (${percent}%).`;

      // determine level
      let level = 'bronze';
      if (percent > 70) level = 'gold';
      else if (percent > 40) level = 'silver';

      // persist badge
      try { safeSet(`fl_badge_${id}`, level); } catch(e) { console.warn(e); }

      // XP & streak: if this is daily challenge (id === 'daily'), handle streak
      if (id === 'daily_challenge') {
        const streak = updateDailyStreak();
        safeSet('fl_last_daily_score', { date: new Date().toISOString(), score, total, streak });
      }

      // render badge
      renderBadge({ id, level, title });

      // confetti for silver+ & show animation
      if (level === 'silver' || level === 'gold') {
        const conf = document.getElementById('confetti-container');
        launchConfetti(conf, 60);
      }
    }

    // mini badge renderer (insert into badge-wrapper)
    function renderBadge({ id, level, title } = {}) {
      const wrapper = document.getElementById('badge-wrapper');
      const titleEl = document.getElementById('badge-title');
      const descEl = document.getElementById('badge-desc');
      if (!wrapper || !titleEl || !descEl) return;

      let shieldColor = "#C08A5B", accentColor = "#8B5E3C", label = `${title} Explorer`, desc = "You completed a quiz.";
      if (level === 'silver') { shieldColor = "#C9D1D9"; accentColor = "#8E99A8"; label = `${title} Adept`; desc = "Nice work — you're getting consistent."; }
      if (level === 'gold') { shieldColor = "#A9D957"; accentColor = "#6EA230"; label = `${title} Pro`; desc = "Excellent — you're a top performer!"; }

      titleEl.textContent = label;
      descEl.textContent = desc;

      const svg = `
        <svg viewBox="0 0 120 150" class="w-28 h-36">
          <defs>
            <linearGradient id="shieldGrad_${id}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${shieldColor}"/>
              <stop offset="100%" stop-color="${accentColor}"/>
            </linearGradient>
          </defs>
          <path d="M60 10 L95 25 L95 70 C95 95 80 120 60 135 C40 120 25 95 25 70 L25 25 Z"
                fill="url(#shieldGrad_${id})" stroke="rgba(0,0,0,0.08)" stroke-width="2"/>
          <text x="60" y="86" text-anchor="middle" font-family="system-ui, -apple-system" font-size="14" fill="white" font-weight="700">${(id||'Q').slice(0,3).toUpperCase()}</text>
          <text x="60" y="105" text-anchor="middle" font-family="system-ui, -apple-system" font-size="10" fill="rgba(255,255,255,0.95)" font-weight="600">${level.toUpperCase()}</text>
        </svg>
      `;
      wrapper.innerHTML = svg;
    }

    // restart
    function restart(){
      // reset state and repick pool
      if (type === 'randomN') pool = pickN(bank, pick); else pool = bank.slice(0,pick);
      idx = 0; score = 0; answered = {};
      document.getElementById('result-card').classList.add('hidden');
      document.getElementById('quiz-card').classList.remove('hidden');
      render();
    }

    // attach events
    document.addEventListener('DOMContentLoaded', ()=> {
      const nextBtn = document.getElementById('q-next');
      const prevBtn = document.getElementById('q-prev');
      if (nextBtn) nextBtn.addEventListener('click', next);
      if (prevBtn) prevBtn.addEventListener('click', prev);
      // expose restart to global so buttons with onclick can call
      window.restartQuiz = restart;
      render();
    });
  };

})();
