// ── Shared navigation & auth-guard helpers ──────────────────
// Include this on every page (after firebase-config.js)

let HG = { user: null, profile: null };  // global app state

function logout() { auth.signOut().then(() => window.location.href = rootPath() + 'index.html'); }

function rootPath() {
  // Returns relative path back to root based on current page depth
  const depth = (window.location.pathname.match(/\//g) || []).length;
  if (window.location.pathname.includes('/pages/')) return '../';
  return '';
}

function updateNavUI(user, profile) {
  const userEl = document.getElementById('nav-username');
  const loginBtn = document.getElementById('nav-login-btn');
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (!userEl) return;
  if (user) {
    userEl.textContent  = '👤 ' + (profile?.name || user.displayName || 'Player');
    userEl.style.display = 'inline-flex';
    if (loginBtn) loginBtn.style.display  = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  } else {
    userEl.style.display = 'none';
    if (loginBtn) loginBtn.style.display  = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

// requireAuth: call on protected pages — redirects to login if no user
function requireAuth(callback) {
  auth.onAuthStateChanged(async user => {
    const overlay = document.getElementById('loading-overlay');
    if (!user) {
      window.location.href = rootPath() + 'login.html?next=' + encodeURIComponent(window.location.href);
      return;
    }
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      HG.profile = doc.exists ? doc.data() : { name: user.displayName, username: '' };
    } catch { HG.profile = { name: user.displayName || 'Player', username: '' }; }
    HG.user = user;
    updateNavUI(user, HG.profile);
    if (overlay) overlay.classList.add('hidden');
    if (callback) callback(user, HG.profile);
  });
}

// softAuth: call on public pages — shows nav user if logged in but doesn't redirect
function softAuth(callback) {
  auth.onAuthStateChanged(async user => {
    const overlay = document.getElementById('loading-overlay');
    if (user) {
      try {
        const doc = await db.collection('users').doc(user.uid).get();
        HG.profile = doc.exists ? doc.data() : { name: user.displayName, username: '' };
      } catch { HG.profile = { name: user.displayName || 'Player', username: '' }; }
      HG.user = user;
    }
    updateNavUI(user, HG.profile);
    if (overlay) overlay.classList.add('hidden');
    if (callback) callback(user, HG.profile);
  });
}

// ── gameAuth: protect game pages with a friendly modal ───────
// Use this instead of requireAuth on game pages.
// If not logged in → shows "Login Required" modal (not a hard redirect).
// If logged in    → hides loading overlay and runs callback as normal.
function gameAuth(gameName, callback) {
  auth.onAuthStateChanged(async user => {
    const overlay = document.getElementById('loading-overlay');
    if (!user) {
      if (overlay) overlay.classList.add('hidden');
      _showGameModal(gameName);
      return;
    }
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      HG.profile = doc.exists ? doc.data() : { name: user.displayName, username: '' };
    } catch { HG.profile = { name: user.displayName || 'Player', username: '' }; }
    HG.user = user;
    updateNavUI(user, HG.profile);
    if (overlay) overlay.classList.add('hidden');
    if (callback) callback(user, HG.profile);
  });
}

// ── Modal UI — injected into <body> automatically ─────────
let _hgDestUrl = null;   // destination URL stored when modal opens

function _showGameModal(gameName, destUrl) {
  _hgDestUrl = destUrl || null;
  // Inject modal HTML into the page if it doesn't exist yet
  if (!document.getElementById('hg-auth-modal')) {
    const el = document.createElement('div');
    el.id = 'hg-auth-modal';
    el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);' +
      'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);' +
      'z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px';
    el.innerHTML = `
      <div style="background:#fff;border-radius:24px;padding:38px 32px 30px;
                  max-width:370px;width:100%;text-align:center;position:relative;
                  box-shadow:0 24px 64px rgba(0,0,0,.28);
                  font-family:'Nunito','Segoe UI',sans-serif;animation:hgModalIn .25s ease">
        <button id="hg-modal-close"
          style="position:absolute;top:14px;right:16px;background:none;border:none;
                 font-size:1.25rem;cursor:pointer;color:#9ca3af;line-height:1;
                 width:32px;height:32px;border-radius:50%;display:flex;
                 align-items:center;justify-content:center;transition:background .15s"
          onmouseover="this.style.background='#f3f4f6'"
          onmouseout="this.style.background='none'"
          onclick="closeAuthModal()">✕</button>

        <div style="font-size:3.2rem;margin-bottom:14px">🔒</div>

        <h2 style="font-size:1.55rem;font-weight:900;color:#1a1a2e;margin:0 0 10px;
                   font-family:'Fredoka One','Nunito',cursive">Login Required</h2>

        <p id="hg-auth-modal-msg"
           style="color:#6b7280;font-size:.97rem;margin:0 0 26px;line-height:1.5"></p>

        <div style="display:flex;flex-direction:column;gap:10px">
          <button onclick="goToLogin()"
            style="background:linear-gradient(135deg,#f97316,#f59e0b);color:#fff;
                   border:none;border-radius:50px;padding:14px 28px;
                   font-size:1rem;font-weight:800;cursor:pointer;letter-spacing:.01em;
                   box-shadow:0 4px 16px rgba(249,115,22,.45);transition:opacity .18s"
            onmouseover="this.style.opacity='.88'"
            onmouseout="this.style.opacity='1'">
            🔑 Login / Sign Up
          </button>
          <button onclick="closeAuthModal()"
            style="background:#fff;color:#374151;border:2px solid #e5e7eb;
                   border-radius:50px;padding:12px 28px;font-size:.97rem;
                   font-weight:700;cursor:pointer;transition:border-color .15s"
            onmouseover="this.style.borderColor='#d1d5db'"
            onmouseout="this.style.borderColor='#e5e7eb'">
            Maybe later
          </button>
        </div>
      </div>
      <style>
        @keyframes hgModalIn {
          from { transform:scale(.88); opacity:0; }
          to   { transform:scale(1);   opacity:1; }
        }
      </style>`;
    document.body.appendChild(el);
  }

  const msg = document.getElementById('hg-auth-modal-msg');
  if (msg) msg.textContent = `Sign in to play ${gameName}! It's free and fun. 🎉`;
  document.getElementById('hg-auth-modal').style.display = 'flex';
  window.SFX?.play('error');
}

function closeAuthModal() {
  const modal = document.getElementById('hg-auth-modal');
  if (modal) modal.style.display = 'none';
  _hgDestUrl = null;
  // Only redirect home if we're on a game/sub page — if already on home, just close
  const isHome = !window.location.pathname.includes('/pages/') &&
                 !window.location.pathname.includes('/kids-fun-town/');
  if (!isHome) window.location.href = rootPath() + 'index.html';
}

// Kept for any legacy references
function showAuthModal(gameName, destUrl) { _showGameModal(gameName, destUrl); }

function goToLogin() {
  // Use stored destination (set when modal opened from home page) or current page
  const dest = _hgDestUrl || window.location.href;
  window.location.href = rootPath() + 'login.html?next=' + encodeURIComponent(dest);
}

// ── Save game result to Firestore ────────────────────────────
async function saveResult(data) {
  if (!HG.user) return;
  try {
    await db.collection('results').add({
      uid:       HG.user.uid,
      username:  HG.profile?.username || '',
      name:      HG.profile?.name || HG.user.displayName || 'Player',
      ...data,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) { console.error('saveResult:', e); }
}

// ── Save / get user level ────────────────────────────────────
async function saveUserLevel(level) {
  localStorage.setItem('hg_level', level);
  if (!HG.user) return;
  try { await db.collection('users').doc(HG.user.uid).update({ level }); } catch {}
}

function getUserLevel() {
  return HG.profile?.level || localStorage.getItem('hg_level') || 'year1';
}
