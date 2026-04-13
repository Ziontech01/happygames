'use strict';

// ── Feelings & Coping Quest — Game Engine ────────────────────────────────────
// Depends on: js/questions/feelings.js, js/sound.js

const FeelingsQuest = (() => {

  // ── Constants ─────────────────────────────────────────────────────────────
  const QUESTIONS_PER_SESSION = 8;

  const BADGES = {
    emotion_match: { name: 'Emotion Explorer', emoji: '🔍', color: '#f97316' },
    coping:        { name: 'Calm Champion',     emoji: '🌬️', color: '#10b981' },
    control:       { name: 'Brave Thinker',     emoji: '🧠', color: '#6366f1' },
    think:         { name: 'Kind Speaker',      emoji: '💬', color: '#ec4899' },
    okay_to:       { name: 'Self-Care Hero',    emoji: '🌈', color: '#8b5cf6' },
    affirmations:  { name: 'Affirmation Star',  emoji: '⭐', color: '#f59e0b' },
    calm_corner:   { name: 'Calm Corner Star',  emoji: '🌊', color: '#06b6d4' }
  };

  const CORRECT_MSGS = [
    'Amazing! 🌟',
    'Brilliant! 💛',
    'You got it! ⭐',
    'Fantastic! 🎉',
    'Superstar! 🌈',
    'Well done! 👏',
    'Incredible! 🚀'
  ];

  const TRY_MSGS = [
    'Good try! 🤗',
    "Let's think again... 💭",
    'Nearly there! 💪',
    'Every try helps us learn! 📚',
    'Keep going! 🌟'
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  let state = {};
  let progress = {};

  // ── Helpers ───────────────────────────────────────────────────────────────
  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function _rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function _starsHtml(earned, total, size) {
    size = size || '1.4rem';
    let html = '';
    for (let i = 0; i < total; i++) {
      html += '<span style="font-size:' + size + ';color:' + (i < earned ? '#f59e0b' : '#d1d5db') + '">' +
              (i < earned ? '★' : '☆') + '</span>';
    }
    return html;
  }

  function getContainer() {
    return document.getElementById('feelings-container');
  }

  // ── Progress persistence ──────────────────────────────────────────────────
  function _saveProgress() {
    try {
      localStorage.setItem('hg_feelings_progress', JSON.stringify(progress));
    } catch (e) { /* silently ignore */ }
  }

  function _loadProgress() {
    try {
      const raw = localStorage.getItem('hg_feelings_progress');
      if (raw) progress = JSON.parse(raw);
    } catch (e) { progress = {}; }
    const sections = ['emotion_match', 'coping', 'control', 'think', 'okay_to', 'affirmations'];
    sections.forEach(id => {
      if (!progress[id]) {
        progress[id] = { stars: 0, bestScore: 0, played: 0, badgeEarned: false };
      }
    });
    if (!progress.calm_corner) {
      progress.calm_corner = { visited: false, badgeEarned: false };
    }
  }

  function _totalBadges() {
    let n = 0;
    Object.keys(BADGES).forEach(k => {
      if (progress[k] && progress[k].badgeEarned) n++;
    });
    return n;
  }

  // ── Inject breathing keyframe once ───────────────────────────────────────
  function _injectKeyframes() {
    if (document.getElementById('fq-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'fq-keyframes';
    style.textContent = '@keyframes breathePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}' +
      '@keyframes fqFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);
  }

  // ── init ──────────────────────────────────────────────────────────────────
  function init() {
    _injectKeyframes();
    _loadProgress();
    state = {
      section: null,
      questions: [],
      idx: 0,
      score: 0,
      startTime: null,
      breathingType: null,
      breathingRound: 0,
      breathingStep: 0,
      groundingStep: 0,
      breathingTimer: null
    };
    renderHome();
  }

  // ── renderHome ────────────────────────────────────────────────────────────
  function renderHome() {
    const c = getContainer();
    if (!c) return;

    const totalBadges = _totalBadges();

    let sectionCards = '';
    FEELINGS_DATA.sections.forEach(section => {
      const p = progress[section.id] || { stars: 0, bestScore: 0, played: 0 };
      const stars = _starsHtml(p.stars, 3, '1.2rem');
      const playedText = p.played > 0 ? 'Played ' + p.played + 'x · Best: ' + p.bestScore + '/' + QUESTIONS_PER_SESSION : 'Not played yet';
      sectionCards += '<div onclick="FeelingsQuest.startSection(\'' + section.id + '\')" ' +
        'style="background:#fff;border:3px solid ' + section.color + ';border-radius:20px;padding:20px;' +
        'cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.08);text-align:center;' +
        'transition:transform .15s,box-shadow .15s;animation:fqFadeIn .35s ease both" ' +
        'onmouseover="this.style.transform=\'translateY(-4px)\';this.style.boxShadow=\'0 10px 32px rgba(0,0,0,.14)\'" ' +
        'onmouseout="this.style.transform=\'none\';this.style.boxShadow=\'0 4px 16px rgba(0,0,0,.08)\'">' +
        '<div style="font-size:2.5rem;margin-bottom:8px">' + section.emoji + '</div>' +
        '<div style="font-weight:900;color:#1a1a2e;font-size:1rem;margin-bottom:4px">' + section.name + '</div>' +
        '<div style="color:#6b7280;font-size:.8rem;margin-bottom:10px">' + section.desc + '</div>' +
        '<div style="margin-bottom:10px">' + stars + '</div>' +
        '<div style="color:#9ca3af;font-size:.72rem;margin-bottom:12px">' + playedText + '</div>' +
        '<button style="background:' + section.color + ';color:#fff;border:none;border-radius:50px;' +
        'padding:8px 20px;font-size:.9rem;font-weight:800;cursor:pointer;width:100%;' +
        'font-family:inherit;letter-spacing:.01em">Play!</button>' +
        '</div>';
    });

    // Pick 3 random affirmations for display
    const affSlice = _shuffle(FEELINGS_DATA.affirmations).slice(0, 3);
    const affHtml = affSlice.map(a =>
      '<div style="background:rgba(255,255,255,.25);border-radius:12px;padding:8px 14px;' +
      'font-size:.95rem;font-weight:700;color:#fff">✨ ' + a + '</div>'
    ).join('');

    c.innerHTML =
      '<div style="background:linear-gradient(180deg,#fdf4ff 0%,#eff6ff 100%);' +
      'min-height:100vh;padding:16px 16px 40px">' +

      // Header
      '<div style="max-width:800px;margin:0 auto">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:20px">' +
      '<div>' +
      '<div style="font-size:4rem;line-height:1">🧠</div>' +
      '<h1 style="font-family:\'Fredoka One\',cursive;font-size:2.2rem;color:#1a1a2e;margin:8px 0 4px">' +
      'Feelings &amp; Coping Quest</h1>' +
      '<p style="color:#6b7280;font-size:.95rem;margin:0">Learn about your feelings and how to feel better!</p>' +
      '</div>' +
      '<div style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;' +
      'padding:8px 18px;display:flex;align-items:center;gap:8px;height:fit-content;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.06)">' +
      '<span style="font-size:1.2rem">🏅</span>' +
      '<span style="font-weight:900;color:#1a1a2e;font-size:1rem">' + totalBadges + '</span>' +
      '<span style="color:#6b7280;font-size:.8rem">/ ' + Object.keys(BADGES).length + ' badges</span>' +
      '</div>' +
      '</div>' +

      // Section grid
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px">' +
      sectionCards +
      '</div>' +

      // Calm Corner card
      '<div onclick="FeelingsQuest.openCalmCorner()" ' +
      'style="background:linear-gradient(135deg,#06b6d4,#6366f1);border-radius:20px;' +
      'padding:24px 28px;cursor:pointer;text-align:center;' +
      'box-shadow:0 6px 24px rgba(6,182,212,.35);margin-bottom:20px;' +
      'transition:transform .15s,box-shadow .15s;animation:fqFadeIn .4s ease both" ' +
      'onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 12px 36px rgba(6,182,212,.45)\'" ' +
      'onmouseout="this.style.transform=\'none\';this.style.boxShadow=\'0 6px 24px rgba(6,182,212,.35)\'">' +
      '<div style="font-size:2.5rem;margin-bottom:8px">🌬️</div>' +
      '<div style="font-family:\'Fredoka One\',cursive;font-size:1.5rem;color:#fff;margin-bottom:6px">Calm Corner</div>' +
      '<div style="color:rgba(255,255,255,.85);font-size:.9rem;margin-bottom:16px">' +
      'Breathing &amp; Grounding activities — no quiz, just calm!</div>' +
      (progress.calm_corner && progress.calm_corner.badgeEarned ?
        '<div style="color:rgba(255,255,255,.7);font-size:.8rem;margin-bottom:12px">🌊 Calm Corner Star badge earned!</div>' : '') +
      '<button style="background:#fff;color:#06b6d4;border:none;border-radius:50px;' +
      'padding:10px 28px;font-size:.95rem;font-weight:800;cursor:pointer;font-family:inherit">' +
      'Enter Calm Corner</button>' +
      '</div>' +

      // Affirmations teaser
      '<div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:16px;padding:18px;' +
      'text-align:center;margin-bottom:8px">' +
      '<div style="font-size:1.4rem;margin-bottom:8px">⭐ Today\'s Affirmations ⭐</div>' +
      '<div style="display:flex;flex-direction:column;gap:6px">' +
      affSlice.map(a =>
        '<div style="font-weight:700;color:#92400e;font-size:.95rem">' + a + '</div>'
      ).join('') +
      '</div>' +
      '</div>' +

      '</div>' + // max-width
      '</div>';  // outer wrapper
  }

  // ── startSection ──────────────────────────────────────────────────────────
  function startSection(sectionId) {
    window.SFX?.play('whoosh');
    if (state.breathingTimer) { clearTimeout(state.breathingTimer); state.breathingTimer = null; }
    const pool = FEELINGS_DATA.questions.filter(q => q.section === sectionId);
    const shuffled = _shuffle(pool).slice(0, QUESTIONS_PER_SESSION);
    state = {
      section: sectionId,
      questions: shuffled,
      idx: 0,
      score: 0,
      startTime: Date.now(),
      breathingType: null,
      breathingRound: 0,
      breathingStep: 0,
      groundingStep: 0,
      breathingTimer: null
    };
    renderQuestion();
  }

  // ── renderQuestion ────────────────────────────────────────────────────────
  function renderQuestion() {
    const c = getContainer();
    if (!c) return;
    const q = state.questions[state.idx];
    const section = FEELINGS_DATA.sections.find(s => s.id === state.section);
    const pct = (state.idx / state.questions.length) * 100;
    const letters = ['A', 'B', 'C', 'D'];

    let choicesHtml = '';
    q.choices.forEach((choice, idx) => {
      choicesHtml +=
        '<button id="choice-btn-' + idx + '" onclick="FeelingsQuest.answer(' + idx + ')" ' +
        'style="background:#fff;border:2px solid #e5e7eb;border-radius:14px;' +
        'padding:14px 18px;text-align:left;font-size:1rem;font-weight:700;cursor:pointer;' +
        'display:flex;align-items:center;gap:12px;width:100%;font-family:inherit;' +
        'transition:border-color .15s,background .15s" ' +
        'onmouseover="if(!this.disabled){this.style.borderColor=\'' + section.color + '\';this.style.background=\'#fafafa\'}" ' +
        'onmouseout="if(!this.disabled){this.style.borderColor=\'#e5e7eb\';this.style.background=\'#fff\'}">' +
        '<span style="background:' + section.color + ';color:#fff;border-radius:50%;' +
        'width:28px;height:28px;display:flex;align-items:center;justify-content:center;' +
        'font-size:.85rem;font-weight:900;flex-shrink:0">' + letters[idx] + '</span>' +
        '<span>' + choice + '</span>' +
        '</button>';
    });

    c.innerHTML =
      '<div style="background:linear-gradient(180deg,#fdf4ff 0%,#eff6ff 100%);min-height:100vh;padding:16px">' +
      '<div style="max-width:640px;margin:0 auto">' +

      // Top bar
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">' +
      '<button onclick="FeelingsQuest.init()" ' +
      'style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;padding:6px 14px;' +
      'font-size:.85rem;font-weight:700;cursor:pointer;color:#6b7280;font-family:inherit">' +
      '← Home</button>' +
      '<div style="flex:1">' +
      '<div style="display:flex;justify-content:space-between;font-size:.8rem;color:#6b7280;margin-bottom:4px">' +
      '<span>' + section.emoji + ' ' + section.name + '</span>' +
      '<span>Question ' + (state.idx + 1) + ' of ' + state.questions.length + '</span>' +
      '</div>' +
      '<div style="background:#e5e7eb;border-radius:99px;height:8px;overflow:hidden">' +
      '<div style="background:' + section.color + ';height:100%;border-radius:99px;width:' + pct + '%;' +
      'transition:width .4s ease"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      // Question card
      '<div style="background:#fff;border-radius:24px;box-shadow:0 6px 24px rgba(0,0,0,.09);' +
      'padding:28px;margin-bottom:16px;animation:fqFadeIn .3s ease both">' +
      '<div style="font-size:4rem;text-align:center;margin-bottom:16px">' + q.emoji + '</div>' +
      '<p style="font-size:1.15rem;font-weight:800;color:#1a1a2e;line-height:1.4;' +
      'margin:0 0 24px;text-align:center">' + q.prompt + '</p>' +

      // Choices
      '<div style="display:flex;flex-direction:column;gap:10px" id="choices-container">' +
      choicesHtml +
      '</div>' +

      // Feedback area (hidden initially)
      '<div id="feedback-area" style="display:none;margin-top:16px"></div>' +
      '</div>' +

      // Safety note
      '<p style="font-size:.78rem;color:#9ca3af;font-style:italic;text-align:center;margin:0">' +
      'If you feel very upset, talk to a grown-up you trust.</p>' +

      '</div>' +
      '</div>';

    // Scroll to top
    c.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // ── answer ────────────────────────────────────────────────────────────────
  function answer(chosenIdx) {
    const q = state.questions[state.idx];
    const correct = chosenIdx === q.correct;
    const section = FEELINGS_DATA.sections.find(s => s.id === state.section);
    const isLast = state.idx === state.questions.length - 1;

    if (correct) {
      state.score++;
      window.SFX?.play('quiz_correct');
    } else {
      window.SFX?.play('quiz_wrong');
    }

    // Disable all buttons and highlight
    const btns = document.querySelectorAll('[id^="choice-btn-"]');
    btns.forEach((btn, idx) => {
      btn.disabled = true;
      btn.style.cursor = 'default';
      btn.onmouseover = null;
      btn.onmouseout = null;
      if (idx === q.correct) {
        btn.style.borderColor = '#22c55e';
        btn.style.background = '#f0fdf4';
      } else if (idx === chosenIdx && !correct) {
        btn.style.borderColor = '#f87171';
        btn.style.background = '#fff1f2';
      }
    });

    // Build feedback
    const msg = correct ? _rand(CORRECT_MSGS) : _rand(TRY_MSGS);
    const feedbackBg = correct ? '#f0fdf4' : '#fefce8';
    const feedbackBorder = correct ? '#bbf7d0' : '#fde68a';
    const feedbackIcon = correct ? '✅' : '💛';

    const nextLabel = isLast ? 'See Results 🏆' : 'Next →';

    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
      feedbackArea.style.display = 'block';
      feedbackArea.innerHTML =
        '<div style="background:' + feedbackBg + ';border:2px solid ' + feedbackBorder + ';' +
        'border-radius:14px;padding:14px 16px;margin-bottom:10px">' +
        '<div style="font-size:1.1rem;font-weight:800;color:#1a1a2e;margin-bottom:4px">' +
        feedbackIcon + ' ' + msg + '</div>' +
        '</div>' +
        '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;' +
        'padding:12px 16px;margin-bottom:14px;font-size:.9rem;color:#374151;line-height:1.5">' +
        '<span style="font-weight:800;color:' + section.color + '">Did you know? </span>' +
        q.explanation +
        '</div>' +
        '<button onclick="FeelingsQuest.next()" ' +
        'style="background:' + section.color + ';color:#fff;border:none;border-radius:50px;' +
        'padding:12px 28px;font-size:1rem;font-weight:800;cursor:pointer;width:100%;' +
        'font-family:inherit;letter-spacing:.01em">' +
        nextLabel +
        '</button>';
    }

    // Scroll to show feedback
    setTimeout(() => {
      const fb = document.getElementById('feedback-area');
      if (fb) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  // ── next ──────────────────────────────────────────────────────────────────
  function next() {
    state.idx++;
    if (state.idx < state.questions.length) {
      renderQuestion();
    } else {
      renderResults();
    }
  }

  // ── renderResults ─────────────────────────────────────────────────────────
  function renderResults() {
    const c = getContainer();
    if (!c) return;

    const section = FEELINGS_DATA.sections.find(s => s.id === state.section);
    const badge = BADGES[state.section];
    const pct = Math.round((state.score / state.questions.length) * 100);
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

    let gradeLabel = '';
    let gradeMsg = '';
    if (pct >= 80) {
      gradeLabel = 'Outstanding!';
      gradeMsg = 'You are an emotional wellbeing superstar! 🌟';
      window.SFX?.play('levelup');
    } else if (pct >= 50) {
      gradeLabel = 'Well done!';
      gradeMsg = 'Great effort — you are learning so much! 💛';
      window.SFX?.play('win');
    } else {
      gradeLabel = 'Good try!';
      gradeMsg = 'Every time you play, you learn more. Keep going! 💪';
      window.SFX?.play('win');
    }

    // Update progress
    const p = progress[state.section];
    if (stars > p.stars) p.stars = stars;
    if (state.score > p.bestScore) p.bestScore = state.score;
    p.played++;
    if (stars >= 2) p.badgeEarned = true;
    _saveProgress();

    const starsLarge = _starsHtml(stars, 3, '2.2rem');
    const lastQ = state.questions[state.questions.length - 1];

    let badgePanel = '';
    if (p.badgeEarned) {
      badgePanel =
        '<div style="background:linear-gradient(135deg,' + badge.color + '22,' + badge.color + '11);' +
        'border:2px solid ' + badge.color + ';border-radius:16px;padding:18px;text-align:center;margin-bottom:18px">' +
        '<div style="font-size:2.5rem;margin-bottom:6px">' + badge.emoji + '</div>' +
        '<div style="font-weight:900;color:' + badge.color + ';font-size:1.05rem;margin-bottom:2px">' + badge.name + '</div>' +
        '<div style="color:' + badge.color + ';font-size:.85rem;font-weight:700">🏅 Badge Unlocked!</div>' +
        '</div>';
    } else {
      badgePanel =
        '<div style="background:#fafafa;border:2px dashed #e5e7eb;border-radius:16px;' +
        'padding:14px;text-align:center;margin-bottom:18px">' +
        '<div style="color:#9ca3af;font-size:.9rem">Score 50% or more to unlock: <strong>' + badge.name + '</strong> ' + badge.emoji + '</div>' +
        '</div>';
    }

    c.innerHTML =
      '<div style="background:linear-gradient(180deg,#fdf4ff 0%,#eff6ff 100%);min-height:100vh;padding:16px 16px 40px">' +
      '<div style="max-width:560px;margin:0 auto">' +

      // Banner
      '<div style="background:' + section.color + ';border-radius:24px 24px 0 0;padding:28px;' +
      'text-align:center;animation:fqFadeIn .35s ease both">' +
      '<div style="font-size:3rem;margin-bottom:10px">' + section.emoji + '</div>' +
      '<div style="font-family:\'Fredoka One\',cursive;font-size:1.6rem;color:#fff;margin-bottom:4px">' + gradeMsg + '</div>' +
      '<div style="color:rgba(255,255,255,.85);font-size:.95rem">' + section.name + '</div>' +
      '</div>' +

      // White card
      '<div style="background:#fff;border-radius:0 0 24px 24px;padding:24px;' +
      'box-shadow:0 8px 32px rgba(0,0,0,.1);margin-bottom:16px">' +

      // Stars
      '<div style="text-align:center;margin-bottom:14px">' + starsLarge + '</div>' +

      // Score
      '<div style="text-align:center;font-size:2.2rem;font-weight:900;' +
      'color:' + section.color + ';margin-bottom:6px">' +
      state.score + ' / ' + state.questions.length + ' correct' +
      '</div>' +
      '<div style="text-align:center;color:#6b7280;font-size:1rem;font-weight:700;margin-bottom:20px">' +
      pct + '% — ' + gradeLabel +
      '</div>' +

      badgePanel +

      // Last question explanation
      '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;' +
      'padding:12px 16px;margin-bottom:18px">' +
      '<div style="font-size:.8rem;font-weight:800;color:#6b7280;margin-bottom:4px;' +
      'text-transform:uppercase;letter-spacing:.04em">Did you know?</div>' +
      '<div style="font-size:.92rem;color:#374151;line-height:1.5">' + lastQ.explanation + '</div>' +
      '</div>' +

      // Buttons
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<button onclick="FeelingsQuest.startSection(\'' + state.section + '\')" ' +
      'style="background:' + section.color + ';color:#fff;border:none;border-radius:50px;' +
      'padding:12px 24px;font-size:.95rem;font-weight:800;cursor:pointer;flex:1;font-family:inherit">' +
      '🔄 Play Again' +
      '</button>' +
      '<button onclick="FeelingsQuest.init()" ' +
      'style="background:#f3f4f6;color:#374151;border:none;border-radius:50px;' +
      'padding:12px 24px;font-size:.95rem;font-weight:800;cursor:pointer;flex:1;font-family:inherit">' +
      '🏠 Home' +
      '</button>' +
      '</div>' +
      '</div>' +

      // Note
      '<p style="font-size:.78rem;color:#9ca3af;font-style:italic;text-align:center;margin:12px 0 0">' +
      'All feelings are okay. If you feel very upset, please talk to a trusted adult.' +
      '</p>' +

      '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  // ── openCalmCorner ────────────────────────────────────────────────────────
  function openCalmCorner() {
    window.SFX?.play('whoosh');
    if (state.breathingTimer) { clearTimeout(state.breathingTimer); state.breathingTimer = null; }
    state.section = 'calm_corner';
    progress.calm_corner.visited = true;
    progress.calm_corner.badgeEarned = true;
    _saveProgress();
    renderCalmCorner();
  }

  function renderCalmCorner() {
    const c = getContainer();
    if (!c) return;

    // 3 random affirmations
    const affSlice = _shuffle(FEELINGS_DATA.affirmations).slice(0, 3);

    let breathingCards = '';
    FEELINGS_DATA.breathing.forEach(b => {
      breathingCards +=
        '<div onclick="FeelingsQuest.startBreathing(\'' + b.id + '\')" ' +
        'style="background:#fff;border:2px solid ' + b.color + ';border-radius:16px;' +
        'padding:16px;text-align:center;cursor:pointer;' +
        'transition:transform .15s,box-shadow .15s" ' +
        'onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 24px rgba(0,0,0,.12)\'" ' +
        'onmouseout="this.style.transform=\'none\';this.style.boxShadow=\'none\'">' +
        '<div style="font-size:2.5rem;margin-bottom:8px">' + b.emoji + '</div>' +
        '<div style="font-weight:900;color:#1a1a2e;font-size:.95rem;margin-bottom:10px">' + b.name + '</div>' +
        '<button style="background:' + b.color + ';color:#fff;border:none;border-radius:50px;' +
        'padding:7px 20px;font-size:.85rem;font-weight:800;cursor:pointer;font-family:inherit">' +
        'Start</button>' +
        '</div>';
    });

    c.innerHTML =
      '<div style="background:linear-gradient(135deg,#ecfeff,#eff6ff);min-height:100vh;padding:16px 16px 40px">' +
      '<div style="max-width:700px;margin:0 auto">' +

      // Back button
      '<button onclick="FeelingsQuest.init()" ' +
      'style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;padding:7px 16px;' +
      'font-size:.85rem;font-weight:700;cursor:pointer;color:#6b7280;font-family:inherit;margin-bottom:20px">' +
      '← Back to Home</button>' +

      // Header
      '<div style="text-align:center;margin-bottom:28px;animation:fqFadeIn .3s ease both">' +
      '<div style="font-size:3.5rem;margin-bottom:8px">🌬️</div>' +
      '<h1 style="font-family:\'Fredoka One\',cursive;font-size:2rem;color:#06b6d4;margin:0 0 6px">' +
      'Calm Corner</h1>' +
      '<p style="color:#6b7280;font-size:.95rem;margin:0">Take a breath. You are safe here.</p>' +
      '</div>' +

      // Breathing section
      '<h2 style="font-size:1.1rem;font-weight:900;color:#1a1a2e;margin:0 0 12px">🫁 Breathing Exercises</h2>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:28px">' +
      breathingCards +
      '</div>' +

      // Grounding section
      '<h2 style="font-size:1.1rem;font-weight:900;color:#1a1a2e;margin:0 0 12px">🌿 5-4-3-2-1 Grounding</h2>' +
      '<div onclick="FeelingsQuest.startGrounding()" ' +
      'style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:16px;padding:22px;' +
      'cursor:pointer;text-align:center;margin-bottom:28px;' +
      'transition:transform .15s,box-shadow .15s" ' +
      'onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 10px 30px rgba(99,102,241,.4)\'" ' +
      'onmouseout="this.style.transform=\'none\';this.style.boxShadow=\'none\'">' +
      '<div style="font-size:2rem;margin-bottom:8px">5️⃣4️⃣3️⃣2️⃣1️⃣</div>' +
      '<div style="font-weight:900;color:#fff;font-size:1.05rem;margin-bottom:6px">5-4-3-2-1 Grounding Technique</div>' +
      '<div style="color:rgba(255,255,255,.85);font-size:.88rem;margin-bottom:14px">' +
      'Use your senses to feel present and calm when you feel anxious or overwhelmed.' +
      '</div>' +
      '<button style="background:#fff;color:#6366f1;border:none;border-radius:50px;' +
      'padding:9px 24px;font-size:.9rem;font-weight:800;cursor:pointer;font-family:inherit">' +
      'Start Grounding</button>' +
      '</div>' +

      // Affirmations card
      '<div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:16px;padding:20px;text-align:center">' +
      '<div style="font-size:1.5rem;margin-bottom:12px">⭐ Today\'s Affirmations ⭐</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
      affSlice.map(a =>
        '<div style="background:rgba(255,255,255,.5);border-radius:10px;padding:10px 16px;' +
        'font-size:1rem;font-weight:800;color:#92400e">✨ ' + a + '</div>'
      ).join('') +
      '</div>' +
      '</div>' +

      '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  // ── startBreathing ────────────────────────────────────────────────────────
  function startBreathing(type) {
    window.SFX?.play('whoosh');
    if (state.breathingTimer) { clearTimeout(state.breathingTimer); state.breathingTimer = null; }
    state.breathingType = type;
    state.breathingRound = 1;
    state.breathingStep = 0;
    renderBreathingStep();
  }

  // ── renderBreathingStep ───────────────────────────────────────────────────
  function renderBreathingStep() {
    const c = getContainer();
    if (!c) return;

    const b = FEELINGS_DATA.breathing.find(x => x.id === state.breathingType);
    if (!b) return;

    const step = b.steps[state.breathingStep];
    const isInhale = step.action.toLowerCase().includes('in') || step.action.toLowerCase().includes('rise');
    const animStyle = isInhale
      ? 'animation:breathePulse ' + (step.duration / 1000) + 's ease-in-out infinite'
      : '';

    // Dot indicators
    let dots = '';
    for (let r = 1; r <= b.rounds; r++) {
      const filled = r < state.breathingRound || (r === state.breathingRound);
      dots += '<span style="width:10px;height:10px;border-radius:50%;display:inline-block;' +
        'background:' + (filled ? b.color : '#d1d5db') + ';margin:0 3px"></span>';
    }
    let stepDots = '';
    b.steps.forEach((_, i) => {
      stepDots += '<span style="width:8px;height:8px;border-radius:50%;display:inline-block;' +
        'background:' + (i === state.breathingStep ? b.color : '#d1d5db') + ';margin:0 2px"></span>';
    });

    c.innerHTML =
      '<div style="background:' + b.color + '15;min-height:100vh;padding:16px 16px 40px">' +
      '<div style="max-width:520px;margin:0 auto">' +

      // Back button
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">' +
      '<button onclick="if(window._fqBreathTimer)clearTimeout(window._fqBreathTimer);FeelingsQuest.openCalmCorner()" ' +
      'style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;padding:6px 14px;' +
      'font-size:.85rem;font-weight:700;cursor:pointer;color:#6b7280;font-family:inherit">' +
      '← Calm Corner</button>' +
      '<div style="font-size:.85rem;color:#6b7280;font-weight:700">Round ' + state.breathingRound + ' of ' + b.rounds + '</div>' +
      '</div>' +

      // Header
      '<div style="text-align:center;margin-bottom:24px">' +
      '<div style="font-size:2rem;margin-bottom:6px">' + b.emoji + ' ' + b.name + '</div>' +
      '<div style="color:#6b7280;font-size:.85rem">' + stepDots + '</div>' +
      '</div>' +

      // Animated circle
      '<div style="display:flex;justify-content:center;margin-bottom:28px">' +
      '<div style="border-radius:50%;width:160px;height:160px;background:' + b.color + '30;' +
      'border:4px solid ' + b.color + ';display:flex;align-items:center;justify-content:center;' +
      animStyle + '">' +
      '<span style="color:' + b.color + ';font-weight:900;font-size:1rem;text-align:center;' +
      'padding:10px;line-height:1.3">' + step.action + '</span>' +
      '</div>' +
      '</div>' +

      // Instruction
      '<p style="font-size:1.1rem;color:#1a1a2e;text-align:center;line-height:1.5;' +
      'font-weight:700;margin:0 0 28px;max-width:360px;margin-left:auto;margin-right:auto">' +
      step.instruction +
      '</p>' +

      // Round dots
      '<div style="text-align:center;margin-bottom:20px">' + dots + '</div>' +

      // Skip button
      '<div style="text-align:center">' +
      '<button id="fq-skip-btn" onclick="if(window._fqBreathTimer)clearTimeout(window._fqBreathTimer);' +
      'FeelingsQuest._advanceBreathing()" ' +
      'style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;padding:8px 20px;' +
      'font-size:.82rem;font-weight:700;cursor:pointer;color:#9ca3af;font-family:inherit">' +
      'Skip to next ›</button>' +
      '</div>' +

      '</div>' +
      '</div>';

    // Auto-advance after step.duration
    window._fqBreathTimer = setTimeout(function () {
      _advanceBreathing();
    }, step.duration);
    state.breathingTimer = window._fqBreathTimer;

    window.scrollTo(0, 0);
  }

  // Exposed for inline onclick above
  function _advanceBreathing() {
    if (state.breathingTimer) { clearTimeout(state.breathingTimer); state.breathingTimer = null; }
    const b = FEELINGS_DATA.breathing.find(x => x.id === state.breathingType);
    if (!b) return;
    state.breathingStep++;
    if (state.breathingStep >= b.steps.length) {
      state.breathingStep = 0;
      state.breathingRound++;
      if (state.breathingRound > b.rounds) {
        renderBreathingComplete(state.breathingType);
        return;
      }
    }
    renderBreathingStep();
  }

  // ── renderBreathingComplete ───────────────────────────────────────────────
  function renderBreathingComplete(type) {
    const c = getContainer();
    if (!c) return;
    const b = FEELINGS_DATA.breathing.find(x => x.id === type);
    window.SFX?.play('win');

    c.innerHTML =
      '<div style="background:' + b.color + '15;min-height:100vh;padding:16px 16px 40px">' +
      '<div style="max-width:520px;margin:0 auto;text-align:center">' +

      '<div style="font-size:4rem;margin:40px 0 16px">' + b.emoji + '</div>' +
      '<h2 style="font-family:\'Fredoka One\',cursive;font-size:1.8rem;color:#1a1a2e;margin:0 0 8px">' +
      'You did it! 🌟</h2>' +
      '<p style="color:#6b7280;font-size:1rem;margin:0 0 28px">' +
      'You completed <strong>' + b.name + '</strong>. How do you feel now?' +
      '</p>' +

      // Calm scale
      '<div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:28px">' +
      _calmScaleBtn('😊', 'Calmer', b.color) +
      _calmScaleBtn('😐', 'About the same', b.color) +
      _calmScaleBtn('🤗', 'Much better', b.color) +
      '</div>' +

      '<div id="calm-response" style="display:none;background:#fff;border-radius:14px;' +
      'padding:14px 18px;margin-bottom:24px;font-size:.95rem;color:#374151;font-weight:700">' +
      'That is okay! You can always try again or explore another exercise. 💛' +
      '</div>' +

      '<button onclick="FeelingsQuest.openCalmCorner()" ' +
      'style="background:' + b.color + ';color:#fff;border:none;border-radius:50px;' +
      'padding:12px 28px;font-size:.95rem;font-weight:800;cursor:pointer;font-family:inherit">' +
      '← Back to Calm Corner' +
      '</button>' +

      '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  function _calmScaleBtn(emoji, label, color) {
    return '<button onclick="window.SFX?.play(\'click\');document.getElementById(\'calm-response\').style.display=\'block\'" ' +
      'style="background:#fff;border:2px solid ' + color + ';border-radius:16px;' +
      'padding:14px 18px;cursor:pointer;font-family:inherit;transition:background .15s" ' +
      'onmouseover="this.style.background=\'' + color + '22\'" ' +
      'onmouseout="this.style.background=\'#fff\'">' +
      '<div style="font-size:2rem;margin-bottom:4px">' + emoji + '</div>' +
      '<div style="font-size:.82rem;font-weight:700;color:#374151">' + label + '</div>' +
      '</button>';
  }

  // ── startGrounding ────────────────────────────────────────────────────────
  function startGrounding() {
    window.SFX?.play('whoosh');
    state.groundingStep = 0;
    renderGroundingStep();
  }

  // ── renderGroundingStep ───────────────────────────────────────────────────
  function renderGroundingStep() {
    const c = getContainer();
    if (!c) return;
    const steps = FEELINGS_DATA.grounding;
    if (state.groundingStep >= steps.length) {
      renderGroundingComplete();
      return;
    }
    const step = steps[state.groundingStep];

    c.innerHTML =
      '<div style="background:' + step.color + '15;min-height:100vh;padding:16px 16px 40px">' +
      '<div style="max-width:520px;margin:0 auto">' +

      // Back button
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">' +
      '<button onclick="FeelingsQuest.openCalmCorner()" ' +
      'style="background:#fff;border:2px solid #e5e7eb;border-radius:50px;padding:6px 14px;' +
      'font-size:.85rem;font-weight:700;cursor:pointer;color:#6b7280;font-family:inherit">' +
      '← Calm Corner</button>' +
      '<div style="font-size:.85rem;color:#6b7280;font-weight:700">Step ' + (state.groundingStep + 1) + ' of 5</div>' +
      '</div>' +

      '<div style="text-align:center;animation:fqFadeIn .3s ease both">' +

      // Big number
      '<div style="font-size:5rem;font-weight:900;color:' + step.color + ';line-height:1;margin-bottom:8px">' +
      step.number +
      '</div>' +

      // Emoji
      '<div style="font-size:3rem;margin-bottom:10px">' + step.emoji + '</div>' +

      // Sense label
      '<div style="font-size:1.1rem;font-weight:900;color:' + step.color + ';' +
      'text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px">' +
      step.sense +
      '</div>' +

      // Instruction
      '<p style="font-size:1.05rem;color:#374151;line-height:1.6;max-width:400px;' +
      'margin:0 auto 32px;font-weight:600">' +
      step.instruction +
      '</p>' +

      // Next button
      '<button onclick="state.groundingStep++;FeelingsQuest.renderGroundingStep()" ' +
      'style="background:' + step.color + ';color:#fff;border:none;border-radius:50px;' +
      'padding:14px 32px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit">' +
      "I've named them! →" +
      '</button>' +

      // Progress dots
      '<div style="margin-top:24px">' +
      steps.map((s, i) =>
        '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;margin:0 3px;' +
        'background:' + (i <= state.groundingStep ? step.color : '#d1d5db') + '"></span>'
      ).join('') +
      '</div>' +

      '</div>' +
      '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  // ── renderGroundingComplete ───────────────────────────────────────────────
  function renderGroundingComplete() {
    const c = getContainer();
    if (!c) return;
    window.SFX?.play('levelup');

    c.innerHTML =
      '<div style="background:linear-gradient(135deg,#ecfeff,#eff6ff);min-height:100vh;' +
      'padding:16px 16px 40px">' +
      '<div style="max-width:520px;margin:0 auto;text-align:center">' +

      '<div style="font-size:4rem;margin:40px 0 16px">🌿</div>' +
      '<h2 style="font-family:\'Fredoka One\',cursive;font-size:1.9rem;color:#1a1a2e;margin:0 0 10px">' +
      'You are grounded! 🌟</h2>' +
      '<p style="color:#6b7280;font-size:1rem;line-height:1.6;max-width:380px;margin:0 auto 28px">' +
      'Well done — you just used the 5-4-3-2-1 grounding technique. How do you feel?' +
      '</p>' +

      // Calm scale
      '<div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:28px">' +
      _calmScaleBtn('😊', 'Calmer', '#6366f1') +
      _calmScaleBtn('😐', 'About the same', '#6366f1') +
      _calmScaleBtn('🤗', 'Much better', '#6366f1') +
      '</div>' +

      '<div id="calm-response" style="display:none;background:#fff;border-radius:14px;' +
      'padding:14px 18px;margin-bottom:24px;font-size:.95rem;color:#374151;font-weight:700">' +
      'That is okay! You can always try again or explore another exercise. 💛' +
      '</div>' +

      '<button onclick="FeelingsQuest.openCalmCorner()" ' +
      'style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;' +
      'border-radius:50px;padding:12px 28px;font-size:.95rem;font-weight:800;cursor:pointer;' +
      'font-family:inherit;margin-bottom:16px;display:block;margin-left:auto;margin-right:auto">' +
      '← Back to Calm Corner' +
      '</button>' +

      '<p style="font-size:.78rem;color:#9ca3af;font-style:italic">' +
      'If you still feel upset, please talk to a trusted adult.' +
      '</p>' +

      '</div>' +
      '</div>';

    window.scrollTo(0, 0);
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    init,
    startSection,
    answer,
    next,
    openCalmCorner,
    startBreathing,
    renderBreathingStep,
    _advanceBreathing,
    startGrounding,
    renderGroundingStep
  };

})();
