// Happy Games – Language Game Engine
// Flow: Language select → Category select → Flashcard (see & say) → MCQ quiz → Results
'use strict';

const LanguageGame = (() => {

  const PHRASES_PER_ROUND = 8; // flashcard + quiz for each

  let state = {};

  const CATEGORIES = [
    { id:'greetings', name:'Greetings & Phrases', emoji:'👋' },
    { id:'numbers',   name:'Numbers 1–10',         emoji:'🔢' },
    { id:'food',      name:'Food & Drink',          emoji:'🍎' },
    { id:'colours',   name:'Colours',               emoji:'🎨' },
    { id:'family',    name:'Family',                emoji:'👨‍👩‍👧' },
    { id:'school',    name:'School',                emoji:'🎒' }
  ];

  /* ── Public init ───────────────────────────────────────────── */
  function init() {
    state = { step:'language', lang:null, cat:null, phrases:[], idx:0,
              phase:'flash', score:0, startTime:null, showingAnswer:false };
    renderLanguageSelect();
  }

  /* ── Language selection ────────────────────────────────────── */
  function renderLanguageSelect() {
    const langs = Object.values(LANGUAGE_DATA);
    getContainer().innerHTML = `
      <div class="slh-wrap">
        <div class="page-header" style="padding-top:0">
          <div class="page-title">🌍 Language Game</div>
          <div class="page-subtitle">Choose a language to learn!</div>
        </div>
        <div class="lang-grid">
          ${langs.map(l => `
            <button class="lang-card" onclick="LanguageGame._selectLang('${
              Object.keys(LANGUAGE_DATA).find(k=>LANGUAGE_DATA[k]===l) }')">
              <span class="lang-flag">${l.flag}</span>
              <div class="lang-name">${l.name}</div>
              <div class="lang-native">${l.nativeName}</div>
            </button>`).join('')}
        </div>
      </div>`;
    hideLoading();
  }

  /* ── Category selection ────────────────────────────────────── */
  function _selectLang(langId) {
    window.SFX?.play('click');
    state.lang = langId;
    const lang = LANGUAGE_DATA[langId];
    getContainer().innerHTML = `
      <div class="slh-wrap">
        <div class="page-header" style="padding-top:0">
          <div class="page-title">${lang.flag} ${lang.name}</div>
          <div class="page-subtitle">${lang.funFact}</div>
        </div>
        <div class="page-subtitle" style="margin-bottom:16px;font-weight:700;color:var(--dark)">
          Choose a category:
        </div>
        <div class="slh-cats">
          ${CATEGORIES.map(c => {
            const phrases = lang.categories[c.id] || [];
            return phrases.length ? `
              <button class="slh-cat-btn" onclick="LanguageGame._selectCat('${c.id}')">
                <span class="slh-cat-icon">${c.emoji}</span>
                <div class="slh-cat-name">${c.name}</div>
                <div style="font-size:.8rem;color:#888;margin-top:2px">${phrases.length} phrases</div>
              </button>` : '';
          }).join('')}
        </div>
        <div style="text-align:center;margin-top:16px">
          <button class="btn btn-secondary" onclick="LanguageGame.init()">← Back to Languages</button>
        </div>
      </div>`;
  }

  /* ── Start session ─────────────────────────────────────────── */
  function _selectCat(catId) {
    window.SFX?.play('click');
    state.cat = catId;
    const lang = LANGUAGE_DATA[state.lang];
    const pool = [...(lang.categories[catId] || [])].sort(() => Math.random() - 0.5);
    state.phrases = pool.slice(0, PHRASES_PER_ROUND);
    state.idx = 0;
    state.phase = 'flash'; // first: flashcard for each phrase
    state.score = 0;
    state.startTime = Date.now();
    renderFlashcard();
  }

  /* ── Phase 1: Flashcard (show phrase, reveal answer) ───────── */
  function renderFlashcard() {
    state.showingAnswer = false;
    const p = state.phrases[state.idx];
    const lang = LANGUAGE_DATA[state.lang];
    const cat = CATEGORIES.find(c => c.id === state.cat);
    getContainer().innerHTML = `
      <div class="lang-wrap">
        <div class="lang-header">
          <div>${lang.flag} ${lang.name} — ${cat.emoji} ${cat.name}</div>
          <div>Card ${state.idx + 1} / ${state.phrases.length}</div>
        </div>
        <div class="lang-card-big" id="lang-flashcard">
          <div class="lang-card-en">
            <div class="lang-label">🇬🇧 English</div>
            <div class="lang-phrase-en">${p.en}</div>
          </div>
          <div class="lang-reveal-hint" id="reveal-hint">
            <button class="btn btn-primary" onclick="LanguageGame._revealFlash()">
              👀 Show ${lang.name} translation
            </button>
          </div>
          <div class="lang-card-target" id="lang-target" style="display:none">
            <div class="lang-label">${lang.flag} ${lang.name}</div>
            <div class="lang-phrase-target">${p.target}</div>
            <div class="lang-phonetic">🔊 Say it: <em>${p.phonetic}</em></div>
          </div>
        </div>
        <div id="flash-nav" style="display:none;text-align:center;margin-top:20px">
          <button class="btn btn-primary btn-lg" onclick="LanguageGame._nextFlash()">
            ${state.idx + 1 < state.phrases.length ? 'Next Card →' : '🎯 Now take the Quiz!'}
          </button>
        </div>
      </div>`;
  }

  function _revealFlash() {
    window.SFX?.play('click');
    document.getElementById('reveal-hint').style.display = 'none';
    document.getElementById('lang-target').style.display = '';
    document.getElementById('flash-nav').style.display = '';
  }

  function _nextFlash() {
    window.SFX?.play('click');
    state.idx++;
    if (state.idx < state.phrases.length) {
      renderFlashcard();
    } else {
      // Move to quiz phase
      state.idx = 0;
      state.phase = 'quiz';
      renderQuizQuestion();
    }
  }

  /* ── Phase 2: MCQ Quiz ─────────────────────────────────────── */
  function renderQuizQuestion() {
    const p = state.phrases[state.idx];
    const lang = LANGUAGE_DATA[state.lang];
    const cat = CATEGORIES.find(c => c.id === state.cat);

    // Build distractors from same category (other phrases in pool)
    const allInCat = (LANGUAGE_DATA[state.lang].categories[state.cat] || []);
    const distractors = allInCat
      .filter(x => x.target !== p.target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(x => x.target);

    // If not enough distractors, pad from other categories
    while (distractors.length < 3) {
      const other = Object.values(lang.categories).flat()
        .filter(x => x.target !== p.target && !distractors.includes(x.target))
        .sort(() => Math.random() - 0.5);
      if (other.length) distractors.push(other[0].target);
      else distractors.push('???');
    }

    const opts = shuffle([p.target, ...distractors.slice(0,3)]);
    const correctIdx = opts.indexOf(p.target);

    getContainer().innerHTML = `
      <div class="lang-wrap">
        <div class="lang-header">
          <div>${lang.flag} ${lang.name} — ${cat.emoji} ${cat.name} Quiz</div>
          <div>Q${state.idx + 1} / ${state.phrases.length} | ⭐ ${state.score}</div>
        </div>
        <div class="quiz-question-box" style="margin-bottom:20px">
          <div class="lang-quiz-label">What does this mean in ${lang.name}?</div>
          <div class="lang-quiz-en">${p.en}</div>
        </div>
        <div class="quiz-answers">
          ${opts.map((o, i) => `
            <button class="quiz-ans-btn" id="lang-ans-${i}"
              onclick="LanguageGame._answerQuiz(${i}, ${correctIdx})">
              <span class="ans-letter">${['A','B','C','D'][i]}</span>
              <span>${o}</span>
            </button>`).join('')}
        </div>
        <div id="lang-feedback" style="display:none"></div>
      </div>`;
  }

  function _answerQuiz(chosen, correctIdx) {
    // Disable all buttons
    for (let i = 0; i < 4; i++) {
      const b = document.getElementById(`lang-ans-${i}`);
      if (b) b.disabled = true;
    }
    const correct = chosen === correctIdx;
    if (correct) { state.score++; window.SFX?.play('quiz_correct'); }
    else { window.SFX?.play('quiz_wrong'); }

    const p = state.phrases[state.idx];
    const lang = LANGUAGE_DATA[state.lang];

    document.getElementById(`lang-ans-${correctIdx}`)?.classList.add('correct');
    if (!correct) document.getElementById(`lang-ans-${chosen}`)?.classList.add('wrong');

    const fb = document.getElementById('lang-feedback');
    fb.style.display = '';
    fb.innerHTML = `
      <div class="lang-fb ${correct ? 'fb-correct' : 'fb-wrong'}" style="margin-top:16px;padding:14px;border-radius:12px;
        background:${correct?'#f0fdf4':'#fff1f2'};border:2px solid ${correct?'#bbf7d0':'#fecdd3'}">
        <strong>${correct ? '🎉 Correct!' : '❌ The answer was: ' + p.target}</strong><br>
        <span style="font-size:.9rem">${lang.flag} ${p.target} = 🔊 <em>${p.phonetic}</em></span>
      </div>
      <div style="text-align:center;margin-top:14px">
        <button class="btn btn-primary" onclick="LanguageGame._nextQuiz()">
          ${state.idx + 1 < state.phrases.length ? 'Next →' : '🏆 See Results'}
        </button>
      </div>`;
  }

  function _nextQuiz() {
    window.SFX?.play('click');
    state.idx++;
    if (state.idx < state.phrases.length) {
      renderQuizQuestion();
    } else {
      endGame();
    }
  }

  /* ── Results ───────────────────────────────────────────────── */
  async function endGame() {
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    const mm = Math.floor(elapsed / 60), ss = String(elapsed % 60).padStart(2, '0');
    const timeStr = `${mm}:${ss}`;
    const pct = Math.round((state.score / state.phrases.length) * 100);
    const lang = LANGUAGE_DATA[state.lang];
    const cat = CATEGORIES.find(c => c.id === state.cat);

    const grade = pct >= 90 ? '🏆 Language Star!' :
                  pct >= 70 ? '⭐ Brilliant!' :
                  pct >= 50 ? '👍 Good effort!' : '📚 Keep practising!';

    window.SFX?.play(pct >= 70 ? 'win' : pct >= 50 ? 'draw' : 'lose');

    getContainer().innerHTML = `
      <div class="quiz-end-wrap" style="max-width:540px;margin:0 auto;padding:24px 16px;text-align:center">
        <div style="font-size:3.5rem;margin-bottom:8px">${lang.flag}</div>
        <div class="quiz-end-title">${grade}</div>
        <div class="quiz-score-big">${state.score}
          <span style="font-size:1.4rem;color:#aaa"> / ${state.phrases.length}</span>
        </div>
        <div class="quiz-end-pct">${pct}% correct</div>
        <div class="quiz-end-msg">${lang.name} — ${cat.name}</div>
        <div class="quiz-end-stats">
          <div class="qes"><span class="qes-val">${state.score}</span><span class="qes-lab">Correct</span></div>
          <div class="qes"><span class="qes-val">${state.phrases.length - state.score}</span><span class="qes-lab">Missed</span></div>
          <div class="qes"><span class="qes-val">${timeStr}</span><span class="qes-lab">Time</span></div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px">
          <button class="btn btn-primary btn-lg" onclick="LanguageGame._selectCat('${state.cat}')">🔄 Try Again</button>
          <button class="btn btn-secondary" onclick="LanguageGame._selectLang('${state.lang}')">📂 Change Category</button>
          <button class="btn btn-outline" onclick="LanguageGame.init()">🌍 Change Language</button>
        </div>
      </div>`;

    await saveResult({
      gameType:  'language',
      outcome:   'quiz',
      language:  state.lang,
      category:  state.cat,
      level:     state.lang,
      score:     state.score,
      total:     state.phrases.length,
      percent:   pct,
      duration:  elapsed,
      timeStr
    });
  }

  /* ── Helpers ───────────────────────────────────────────────── */
  function getContainer() { return document.getElementById('lang-container'); }
  function hideLoading() {
    const ol = document.getElementById('loading-overlay');
    if (ol) ol.classList.add('hidden');
  }
  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  return { init, _selectLang, _selectCat, _revealFlash, _nextFlash, _answerQuiz, _nextQuiz };
})();
