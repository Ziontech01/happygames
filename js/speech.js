// ── Read Aloud — TTS Utility ──────────────────────────────────────────────
// Priority: pre-generated audio files (ElevenLabs) → browser speech fallback
//
// API:
//   Speech.speakText(text, triggerBtn?, highlightEl?)
//   Speech.stopSpeech()
//   Speech.toggle() / Speech.isEnabled() / Speech.setEnabled(bool)
//   Speech.syncUI()

window.Speech = (() => {
  'use strict';

  const STORAGE_KEY = 'hg_read_aloud';

  // ── Audio base path (works from /pages/ or root) ───────────────────────
  const AUDIO_BASE = window.location.pathname.startsWith('/pages/')
    ? '../audio/tts/'
    : 'audio/tts/';

  // ── Manifest: hash → filename  (loaded once on init) ──────────────────
  let _manifest = null;   // null = loading, {} = loaded (possibly empty)
  let _manifestReady = false;

  function _loadManifest() {
    fetch(AUDIO_BASE + 'manifest.json?v=' + Date.now())
      .then(r => r.ok ? r.json() : {})
      .then(data => { _manifest = data; _manifestReady = true; })
      .catch(() => { _manifest = {}; _manifestReady = true; });
  }

  // djb2 hash → base-36 string (must match tools/generate-audio.js)
  function _hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h) ^ str.charCodeAt(i);
      h |= 0;
    }
    return (h >>> 0).toString(36);
  }

  // ── Voice (browser fallback) ───────────────────────────────────────────
  let _voices = [];
  const FEMALE_NAMES = /hazel|susan|libby|mia|sonia|natasha|serena|emily|zira|samantha/i;
  const MALE_NAMES   = /george|ryan|alfie|james|arthur|daniel|oliver|fred|david|mark/i;

  function _loadVoices() {
    if (!window.speechSynthesis) return;
    _voices = window.speechSynthesis.getVoices();
    if (!_voices.length)
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        _voices = window.speechSynthesis.getVoices();
      });
  }

  function getPreferredVoice() {
    const prefs = [
      v => v.lang === 'en-GB' && FEMALE_NAMES.test(v.name),
      v => v.lang === 'en-GB' && !MALE_NAMES.test(v.name),
      v => v.lang === 'en-GB',
      v => v.lang.startsWith('en') && FEMALE_NAMES.test(v.name),
      v => v.lang.startsWith('en'),
    ];
    for (const fn of prefs) { const v = _voices.find(fn); if (v) return v; }
    return null;
  }

  // ── Toggle state ───────────────────────────────────────────────────────
  function isEnabled() { return localStorage.getItem(STORAGE_KEY) !== 'false'; }
  function setEnabled(val) { localStorage.setItem(STORAGE_KEY, val ? 'true' : 'false'); syncUI(); if (!val) stopSpeech(); }
  function toggle() { setEnabled(!isEnabled()); }

  function syncUI() {
    const on = isEnabled();
    document.querySelectorAll('.ra-toggle').forEach(btn => {
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
      btn.title = on ? 'Read Aloud ON — tap to turn off' : 'Read Aloud OFF — tap to turn on';
      const icon = btn.querySelector('.ra-icon');
      if (icon) icon.textContent = on ? '🔊' : '🔇';
    });
  }

  // ── Text preparation ───────────────────────────────────────────────────
  function prepareText(raw) {
    let t = raw
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g,  '&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
      .replace(/&nbsp;/g, ' ').replace(/&#\d+;/g, ' ');

    t = t
      .replace(/×/g, ' times ').replace(/÷/g, ' divided by ')
      .replace(/²/g, ' squared ').replace(/³/g, ' cubed ')
      .replace(/√/g, ' square root of ').replace(/%/g, ' percent ')
      .replace(/≠/g, ' is not equal to ').replace(/≤/g, ' less than or equal to ')
      .replace(/≥/g, ' greater than or equal to ')
      .replace(/</g, ' less than ').replace(/>/g, ' greater than ');

    if (/=\s*\?/.test(t)) {
      t = t.replace(/=\s*\?/, '').trim();
      t = t.replace(/(\d)\s*\+\s*(\d)/g, '$1 plus $2')
           .replace(/(\d)\s*-\s*(\d)/g,  '$1 minus $2')
           .replace(/(\d)\s*\*\s*(\d)/g, '$1 times $2');
      if (!/^(what|which|how|why|when|where|who|is|are|does|do|can)/i.test(t))
        t = 'What is ' + t.trim() + '?';
      else
        t = t.trim() + '?';
    } else {
      t = t.replace(/(\d)\s*\+\s*(\d)/g, '$1 plus $2')
           .replace(/(\d)\s*-\s*(\d)/g,  '$1 minus $2')
           .replace(/(\d)\s*\*\s*(\d)/g, '$1 times $2')
           .replace(/(\d)\s*=\s*(\d)/g,  '$1 equals $2');
    }

    return t.replace(/[_|\\]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // ── Audio element playback ─────────────────────────────────────────────
  let _currentAudio = null;

  function _playAudioFile(url, fallbackText, triggerBtn, highlightEl) {
    const audio = new Audio();
    _currentAudio = audio;

    if (triggerBtn) { triggerBtn.innerHTML = '⏳'; triggerBtn.classList.add('loading'); }
    if (highlightEl) highlightEl.classList.add('ra-highlight');

    function _cleanup(usesFallback) {
      if (_currentAudio !== audio) return;
      _currentAudio = null;
      if (triggerBtn) {
        triggerBtn.innerHTML = '🔊';
        triggerBtn.classList.remove('speaking', 'loading');
      }
      highlightEl?.classList.remove('ra-highlight');
      if (usesFallback) _browserSpeak(fallbackText, triggerBtn, highlightEl);
    }

    audio.oncanplaythrough = () => {
      if (triggerBtn) {
        triggerBtn.innerHTML = '🔊';
        triggerBtn.classList.remove('loading');
        triggerBtn.classList.add('speaking');
      }
    };
    audio.onended = () => _cleanup(false);
    audio.onerror = () => _cleanup(true);   // seamless fallback on 404 / error

    audio.src = url;
    audio.play().catch(() => _cleanup(true));
  }

  // ── Browser TTS fallback ───────────────────────────────────────────────
  function _browserSpeak(text, triggerBtn, highlightEl) {
    if (!window.speechSynthesis) return;

    const utter = new SpeechSynthesisUtterance(text);
    const voice = getPreferredVoice();
    if (voice) utter.voice = voice;
    utter.lang = 'en-GB'; utter.rate = 0.78; utter.pitch = 1.05; utter.volume = 1;

    if (triggerBtn) triggerBtn.classList.add('speaking');
    if (highlightEl) highlightEl.classList.add('ra-highlight');

    let _keepAlive;
    function _cleanup() {
      clearInterval(_keepAlive);
      document.querySelectorAll('.ra-highlight').forEach(el => el.classList.remove('ra-highlight'));
      document.querySelectorAll('.ra-btn.speaking').forEach(b => b.classList.remove('speaking'));
    }
    utter.onstart = () => {
      _keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) clearInterval(_keepAlive);
        else window.speechSynthesis.resume();
      }, 10000);
    };
    utter.onend = utter.onerror = _cleanup;
    window.speechSynthesis.speak(utter);
  }

  // ── Main API: speakText ────────────────────────────────────────────────
  function speakText(rawText, triggerBtn, highlightEl) {
    stopSpeech();
    if (!isEnabled()) return;

    const clean = prepareText(String(rawText || ''));
    if (!clean) return;

    // Try pre-generated audio first
    if (_manifest) {
      const key = _hash(clean);
      if (_manifest[key]) {
        _playAudioFile(AUDIO_BASE + _manifest[key], clean, triggerBtn, highlightEl);
        return;
      }
    }

    // No audio file — use browser TTS
    _browserSpeak(clean, triggerBtn, highlightEl);
  }

  function stopSpeech() {
    if (_currentAudio) {
      _currentAudio.pause();
      _currentAudio.src = '';
      _currentAudio = null;
    }
    if (window.speechSynthesis) try { window.speechSynthesis.cancel(); } catch (_) {}
    document.querySelectorAll('.ra-highlight').forEach(el => el.classList.remove('ra-highlight'));
    document.querySelectorAll('.ra-btn.speaking,.ra-btn.loading').forEach(b => {
      b.classList.remove('speaking', 'loading');
      b.innerHTML = '🔊';
    });
  }

  // ── Button factory ─────────────────────────────────────────────────────
  function makeBtn(onClick, small) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ra-btn' + (small ? ' ra-btn-sm' : '');
    btn.title = 'Read aloud';
    btn.setAttribute('aria-label', 'Read aloud');
    btn.innerHTML = '🔊';
    btn.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); onClick(btn); });
    return btn;
  }

  // ── Init ───────────────────────────────────────────────────────────────
  _loadVoices();
  _loadManifest();
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', syncUI);
  else
    syncUI();

  return { speakText, stopSpeech, getPreferredVoice, prepareText,
           isEnabled, setEnabled, toggle, syncUI, makeBtn };
})();
