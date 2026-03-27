// Happy Games – Snakes & Ladders (single-player vs computer)
'use strict';

const SnakesLadders = (() => {

  /* ── Board data ────────────────────────────────────────────── */
  // Snakes: head → tail (go DOWN)
  const SNAKES  = { 99:78, 95:75, 93:73, 87:24, 64:60, 62:19, 54:34, 17:7 };
  // Ladders: bottom → top (go UP)
  const LADDERS = { 4:14, 9:31, 20:38, 28:84, 40:59, 51:67, 63:81, 71:91 };

  /* ── State ─────────────────────────────────────────────────── */
  let playerPos = 0;   // 0 = start (before square 1), 100 = finished
  let compPos   = 0;
  let myTurn    = true;
  let rolling   = false;
  let gameOver  = false;
  let startTime = null;
  let totalMoves= 0;

  /* ── Public init ───────────────────────────────────────────── */
  function init() {
    playerPos = 0; compPos = 0;
    myTurn = true; rolling = false; gameOver = false;
    totalMoves = 0; startTime = Date.now();
    renderBoard();
    setStatus('🎲 Your turn! Roll the dice to move.', 'blue');
    enableRoll(true);
    hideLoading();
  }

  /* ── Board rendering ───────────────────────────────────────── */
  function renderBoard() {
    const board = document.getElementById('sl-board');
    if (!board) return;
    board.innerHTML = '';

    for (let gridRow = 1; gridRow <= 10; gridRow++) {
      for (let gridCol = 1; gridCol <= 10; gridCol++) {
        const n = squareNum(gridRow, gridCol);
        const cell = document.createElement('div');
        cell.id = `sq-${n}`;
        cell.className = 'sl-cell';

        // Colour by type
        if (n in SNAKES)       cell.classList.add('sl-has-snake');
        else if (n in LADDERS) cell.classList.add('sl-has-ladder');
        else if ((gridRow + gridCol) % 2 === 0) cell.classList.add('sl-light');
        else cell.classList.add('sl-dark');

        cell.innerHTML = `<span class="sl-num">${n}</span>` +
          (n in SNAKES  ? `<span class="sl-icon" title="Snake! → ${SNAKES[n]}">🐍</span>` : '') +
          (n in LADDERS ? `<span class="sl-icon" title="Ladder! → ${LADDERS[n]}">🪜</span>` : '') +
          `<div class="sl-pieces" id="pieces-${n}"></div>`;
        board.appendChild(cell);
      }
    }
    updatePieces();
  }

  // Map CSS grid position (1-indexed) to square number (1-100)
  // Row 1 (top of grid) = squares 91-100, row 10 = squares 1-10
  function squareNum(gridRow, gridCol) {
    const boardRow = 10 - gridRow;          // 0 = bottom, 9 = top
    const col = (boardRow % 2 === 0)
      ? (gridCol - 1)                       // left→right on even rows
      : (9 - (gridCol - 1));               // right→left on odd rows
    return boardRow * 10 + col + 1;
  }

  function updatePieces() {
    // Clear all piece holders
    document.querySelectorAll('.sl-pieces').forEach(el => el.innerHTML = '');

    if (playerPos > 0 && playerPos <= 100) {
      const el = document.getElementById(`pieces-${playerPos}`);
      if (el) el.innerHTML += `<span class="sl-piece sl-piece-you" title="You">🔵</span>`;
    }
    if (compPos > 0 && compPos <= 100) {
      const el = document.getElementById(`pieces-${compPos}`);
      if (el) el.innerHTML += `<span class="sl-piece sl-piece-comp" title="Computer">🔴</span>`;
    }
  }

  /* ── Roll dice ─────────────────────────────────────────────── */
  async function rollDice() {
    if (!myTurn || rolling || gameOver) return;
    window.SFX?.play('click');
    enableRoll(false);
    rolling = true;
    totalMoves++;

    // Animate dice
    const die = await animateDice();
    const diceEl = document.getElementById('sl-dice-val');
    if (diceEl) diceEl.textContent = die;

    await movePlayer('player', die);

    if (!gameOver) {
      myTurn = false;
      setTimeout(computerTurn, 1000);
    }
    rolling = false;
  }

  async function computerTurn() {
    if (gameOver) return;
    setStatus('🤖 Computer\'s turn…', 'red');
    const die = await animateDice();
    const diceEl = document.getElementById('sl-dice-val');
    if (diceEl) diceEl.textContent = die;
    await movePlayer('computer', die);
    if (!gameOver) {
      myTurn = true;
      setStatus('🎲 Your turn! Roll the dice.', 'blue');
      enableRoll(true);
    }
  }

  function animateDice() {
    return new Promise(resolve => {
      const diceEl = document.getElementById('sl-dice-val');
      const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
      let count = 0;
      const final = Math.floor(Math.random() * 6) + 1;
      const iv = setInterval(() => {
        if (diceEl) diceEl.textContent = faces[Math.floor(Math.random() * 6)];
        count++;
        if (count >= 8) { clearInterval(iv); if (diceEl) diceEl.textContent = faces[final-1]; resolve(final); }
      }, 80);
    });
  }

  async function movePlayer(who, die) {
    const isPlayer = who === 'player';
    let pos = isPlayer ? playerPos : compPos;
    const newPos = pos + die;

    // Overshoot: bounce back
    if (newPos > 100) {
      setStatus(`${isPlayer ? '🔵 You' : '🔴 Computer'} rolled ${die} — need ${100 - pos} to win! Stay.`, isPlayer ? 'blue' : 'red');
      await pause(600);
      return;
    }

    // Move step by step for animation
    for (let i = 1; i <= die; i++) {
      const step = pos + i;
      if (isPlayer) playerPos = step; else compPos = step;
      updatePieces();
      highlightSquare(step);
      await pause(120);
    }
    clearHighlight();

    let finalPos = newPos;
    let extra = '';

    if (SNAKES[newPos]) {
      finalPos = SNAKES[newPos];
      extra = `🐍 Snake! Slid down to ${finalPos}.`;
      window.SFX?.play('lose');
      await pause(400);
      if (isPlayer) playerPos = finalPos; else compPos = finalPos;
      updatePieces();
    } else if (LADDERS[newPos]) {
      finalPos = LADDERS[newPos];
      extra = `🪜 Ladder! Climbed up to ${finalPos}!`;
      window.SFX?.play('win');
      await pause(400);
      if (isPlayer) playerPos = finalPos; else compPos = finalPos;
      updatePieces();
    }

    if (finalPos === 100) {
      await endGame(who);
      return;
    }

    const baseMsg = `${isPlayer ? '🔵 You' : '🔴 Computer'} rolled ${die} → Square ${finalPos}.`;
    setStatus(extra ? `${baseMsg} ${extra}` : baseMsg, isPlayer ? 'blue' : 'red');
  }

  async function endGame(winner) {
    gameOver = true;
    enableRoll(false);
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const mm = Math.floor(elapsed / 60), ss = String(elapsed % 60).padStart(2, '0');
    const timeStr = `${mm}:${ss}`;

    if (winner === 'player') {
      window.SFX?.play('win');
      setStatus('🏆 YOU WIN! You reached square 100!', 'blue');
    } else {
      window.SFX?.play('lose');
      setStatus('😔 Computer wins this time! Try again!', 'red');
    }

    // Show end overlay
    const overlay = document.getElementById('sl-end');
    if (overlay) {
      overlay.style.display = 'flex';
      document.getElementById('sl-end-icon').textContent  = winner === 'player' ? '🏆' : '🤖';
      document.getElementById('sl-end-title').textContent = winner === 'player' ? 'You Win!' : 'Computer Wins!';
      document.getElementById('sl-end-msg').textContent   = winner === 'player'
        ? 'Amazing! You reached square 100 first!'
        : 'Better luck next time! You can do it!';
      document.getElementById('sl-end-stats').innerHTML   =
        `<span>Moves: ${totalMoves}</span><span>Time: ${timeStr}</span>`;
    }

    await saveResult({
      gameType: 'snakes-ladders',
      outcome:  winner === 'player' ? 'win' : 'lose',
      level:    'all',
      moves:    totalMoves,
      duration: elapsed,
      timeStr
    });
  }

  /* ── UI helpers ────────────────────────────────────────────── */
  function setStatus(msg, colour) {
    const el = document.getElementById('sl-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = colour === 'blue' ? 'var(--primary)' : colour === 'red' ? '#ef4444' : '#374151';
  }

  function enableRoll(on) {
    const btn = document.getElementById('sl-roll-btn');
    if (btn) { btn.disabled = !on; btn.style.opacity = on ? '1' : '0.5'; }
  }

  function highlightSquare(n) {
    const el = document.getElementById(`sq-${n}`);
    if (el) el.classList.add('sl-highlight');
  }

  function clearHighlight() {
    document.querySelectorAll('.sl-highlight').forEach(el => el.classList.remove('sl-highlight'));
  }

  function pause(ms) { return new Promise(r => setTimeout(r, ms)); }

  function hideLoading() {
    const ol = document.getElementById('loading-overlay');
    if (ol) ol.classList.add('hidden');
  }

  function restartGame() {
    window.SFX?.play('click');
    const overlay = document.getElementById('sl-end');
    if (overlay) overlay.style.display = 'none';
    const diceEl = document.getElementById('sl-dice-val');
    if (diceEl) diceEl.textContent = '🎲';
    init();
  }

  return { init, rollDice, restartGame };
})();
