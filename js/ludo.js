// Happy Games – Ludo (2-player: Blue vs Yellow computer)
// Board: standard 15×15 CSS grid. Blue = bottom-left, Yellow = top-right.
'use strict';

const LudoGame = (() => {

  /* ── Board track (52 cells) ─────────────────────────────────
     Format: [col, row] with col=0 left, row=0 top (0-indexed in 15×15 grid)
     Index 0  = Blue entry (bottom of left channel)
     Index 26 = Yellow entry (top of right channel)
  ─────────────────────────────────────────────────────────────*/
  const MAIN_TRACK = [
    [6,13],[6,12],[6,11],[6,10],[6,9],[6,8],   // 0-5  Blue goes UP left channel
    [5,8],[4,8],[3,8],[2,8],[1,8],[0,8],        // 6-11 turn LEFT
    [0,7],[0,6],                                 // 12-13 go UP
    [1,6],[2,6],[3,6],[4,6],[5,6],              // 14-18 go RIGHT
    [6,5],[6,4],[6,3],[6,2],[6,1],[6,0],        // 19-24 go UP (Yellow entry area)
    [7,0],[8,0],                                 // 25-26 Yellow enters at 26
    [8,1],[8,2],[8,3],[8,4],[8,5],              // 27-31 go DOWN
    [9,6],[10,6],[11,6],[12,6],[13,6],[14,6],   // 32-37 go RIGHT
    [14,7],[14,8],                               // 38-39 go DOWN
    [13,8],[12,8],[11,8],[10,8],[9,8],          // 40-44 go LEFT
    [8,9],[8,10],[8,11],[8,12],[8,13],[8,14],   // 45-50 go DOWN
    [7,14]                                        // 51 last main cell
  ];

  // Home columns (col, row): pieces advance from idx 52 (1st step) to 56 (5th step) then DONE (57)
  const BLUE_HOME   = [[7,13],[7,12],[7,11],[7,10],[7,9]];  // go UP toward center
  const YELLOW_HOME = [[7,1],[7,2],[7,3],[7,4],[7,5]];       // go DOWN toward center

  // Safe squares (absolute indices — no capturing)
  const SAFE = new Set([0, 8, 13, 26, 34, 39]);

  // Home zones for rendering
  const BLUE_HOME_ZONE   = {rowStart:9, rowEnd:14, colStart:0, colEnd:5};
  const YELLOW_HOME_ZONE = {rowStart:0, rowEnd:5,  colStart:9, colEnd:14};

  // Starting positions of pieces within home zones
  const BLUE_STARTS   = [[2,10],[3,11],[2,12],[3,10]];
  const YELLOW_STARTS = [[10,2],[11,3],[10,4],[11,2]];

  /* ── State ─────────────────────────────────────────────────── */
  // pos: -1=haven't entered, 0-51=main track (local pos from entry), 52-56=home col, 57=finished
  let state = {};

  /* ── Public init ───────────────────────────────────────────── */
  function init() {
    state = {
      blue:    [-1,-1,-1,-1],  // Blue piece positions (local from index 0)
      yellow:  [-1,-1,-1,-1],  // Yellow piece positions (local from index 26)
      turn:    'blue',
      die:     null,
      rolled:  false,
      selected:-1,             // selected Blue piece index
      moving:  false,
      over:    false,
      startTime: Date.now(),
      totalMoves: 0
    };
    buildBoard();
    renderPieces();
    setStatus('🔵 Your turn! Roll the dice.', 'blue');
    enableRoll(true);
    hideLoading();
  }

  /* ── Build 15×15 board ─────────────────────────────────────── */
  function buildBoard() {
    const board = document.getElementById('ludo-board');
    if (!board) return;
    board.innerHTML = '';

    // Create lookup sets for fast cell-type detection
    const trackSet = new Set(MAIN_TRACK.map(([c,r]) => `${c},${r}`));
    const blueHomeSet  = new Set(BLUE_HOME.map(([c,r]) => `${c},${r}`));
    const yellowHomeSet = new Set(YELLOW_HOME.map(([c,r]) => `${c},${r}`));
    const safeAbsSet = new Set(SAFE); // we'll mark by track index below

    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const cell = document.createElement('div');
        cell.id = `lc-${col}-${row}`;
        cell.className = 'lc';

        const key = `${col},${row}`;
        // Determine cell type
        if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
          cell.classList.add('lc-center');
          if (row === 7 && col === 7) cell.textContent = '⭐';
        } else if (row >= BLUE_HOME_ZONE.rowStart && row <= BLUE_HOME_ZONE.rowEnd &&
                   col >= BLUE_HOME_ZONE.colStart && col <= BLUE_HOME_ZONE.colEnd) {
          cell.classList.add('lc-home-blue');
        } else if (row >= YELLOW_HOME_ZONE.rowStart && row <= YELLOW_HOME_ZONE.rowEnd &&
                   col >= YELLOW_HOME_ZONE.colStart && col <= YELLOW_HOME_ZONE.colEnd) {
          cell.classList.add('lc-home-yellow');
        } else if (row >= 9 && row <= 14 && col >= 9 && col <= 14) {
          cell.classList.add('lc-corner');  // bottom-right unused corner
        } else if (row >= 0 && row <= 5 && col >= 0 && col <= 5) {
          cell.classList.add('lc-corner');  // top-left unused corner
        } else if (blueHomeSet.has(key)) {
          cell.classList.add('lc-track', 'lc-homecol-blue');
        } else if (yellowHomeSet.has(key)) {
          cell.classList.add('lc-track', 'lc-homecol-yellow');
        } else if (trackSet.has(key)) {
          // Check if safe square
          const trackIdx = MAIN_TRACK.findIndex(([c,r]) => c===col && r===row);
          if (SAFE.has(trackIdx)) cell.classList.add('lc-track', 'lc-safe');
          else cell.classList.add('lc-track');
        } else {
          cell.classList.add('lc-empty');
        }

        board.appendChild(cell);
      }
    }
  }

  /* ── Render all pieces ─────────────────────────────────────── */
  function renderPieces() {
    // Clear all piece indicators from track
    document.querySelectorAll('.lc-piece').forEach(el => el.remove());

    // Blue pieces
    state.blue.forEach((pos, pi) => {
      if (pos === 57) return; // finished — show in home display
      let col, row;
      if (pos === -1) {
        [col, row] = BLUE_STARTS[pi];
      } else if (pos <= 51) {
        [col, row] = MAIN_TRACK[pos];
      } else if (pos <= 56) {
        [col, row] = BLUE_HOME[pos - 52];
      } else return;
      placePiece(col, row, 'blue', pi, pos >= 0 && pos <= 51);
    });

    // Yellow pieces
    state.yellow.forEach((pos, pi) => {
      if (pos === 57) return;
      let col, row;
      if (pos === -1) {
        [col, row] = YELLOW_STARTS[pi];
      } else if (pos <= 51) {
        const absIdx = (pos + 26) % 52;
        [col, row] = MAIN_TRACK[absIdx];
      } else if (pos <= 56) {
        [col, row] = YELLOW_HOME[pos - 52];
      } else return;
      placePiece(col, row, 'yellow', pi, false);
    });

    updateFinishedDisplay();
  }

  function placePiece(col, row, color, pieceIdx, clickable) {
    const cell = document.getElementById(`lc-${col}-${row}`);
    if (!cell) return;
    const span = document.createElement('span');
    span.className = `lc-piece lc-piece-${color}`;
    span.textContent = color === 'blue' ? '🔵' : '🟡';
    span.title = `${color} piece ${pieceIdx + 1}`;
    if (clickable && color === 'blue' && state.turn === 'blue' && state.rolled && !state.moving) {
      span.classList.add('lc-piece-selectable');
      span.onclick = () => _selectPiece(pieceIdx);
    }
    cell.appendChild(span);
  }

  /* ── Roll dice ─────────────────────────────────────────────── */
  async function rollDice() {
    if (state.turn !== 'blue' || state.rolled || state.moving || state.over) return;
    window.SFX?.play('click');
    enableRoll(false);

    const die = await animateDice();
    state.die = die;
    state.rolled = true;
    state.totalMoves++;

    const moveable = getMoveable('blue', die);
    if (moveable.length === 0) {
      setStatus(`🔵 Rolled ${die} — no moves available. Computer's turn.`, 'blue');
      await pause(800);
      endBlueTurn(die !== 6);
    } else if (moveable.length === 1) {
      // Auto-move the only piece
      await movePiece('blue', moveable[0], die);
    } else {
      // Player must choose
      setStatus(`🔵 Rolled ${die}! Click a blue piece to move it.`, 'blue');
      highlightMoveable('blue', moveable);
      renderPieces(); // re-render with click handlers
    }
  }

  function _selectPiece(pi) {
    if (state.turn !== 'blue' || !state.rolled || state.moving) return;
    window.SFX?.play('click');
    movePiece('blue', pi, state.die);
  }

  /* ── Move piece ────────────────────────────────────────────── */
  async function movePiece(color, pi, die) {
    state.moving = true;
    const pieces = color === 'blue' ? state.blue : state.yellow;
    let pos = pieces[pi];

    if (pos === -1 && die === 6) {
      // Enter board
      pieces[pi] = 0;
      renderPieces();
      setStatus(`${color === 'blue' ? '🔵 You enter' : '🟡 Computer enters'} the board!`, color);
      await pause(600);
      checkCapture(color, pi);
    } else if (pos >= 0) {
      const finalPos = pos + die;
      // Can't overshoot home column (max position is 56)
      if (finalPos > 56) {
        setStatus(`${color==='blue'?'🔵 You':'🟡 Computer'} rolled ${die} — would overshoot home! Stay.`, color);
        await pause(700);
      } else {
        // Animate piece moving step-by-step
        for (let step = 1; step <= die; step++) {
          pieces[pi] = pos + step;
          renderPieces();
          await pause(140);
        }
        if (finalPos === 56) {
          pieces[pi] = 57; // finished!
          renderPieces();
          window.SFX?.play('win');
          setStatus(`${color === 'blue' ? '🔵 One of your pieces' : '🟡 Computer piece'} reached home! 🏠`, color);
          await pause(600);
          if (checkWin(color)) { state.moving = false; return; }
        } else {
          pieces[pi] = finalPos;
          renderPieces();
          checkCapture(color, pi);
        }
      }
    }

    state.moving = false;
    if (color === 'blue') {
      endBlueTurn(die !== 6);
    } else {
      endYellowTurn(die !== 6);
    }
  }

  function endBlueTurn(switchTurn) {
    state.rolled = false;
    state.die = null;
    if (switchTurn) {
      state.turn = 'yellow';
      setStatus('🟡 Computer\'s turn…', 'yellow');
      setTimeout(yellowTurn, 900);
    } else {
      // Rolled a 6 — roll again
      state.turn = 'blue';
      setStatus('🔵 You rolled 6 — roll again!', 'blue');
      enableRoll(true);
    }
  }

  function endYellowTurn(switchTurn) {
    state.rolled = false;
    state.die = null;
    if (switchTurn) {
      state.turn = 'blue';
      setStatus('🔵 Your turn! Roll the dice.', 'blue');
      enableRoll(true);
    } else {
      // Computer rolled 6 — rolls again
      setTimeout(yellowTurn, 900);
    }
  }

  /* ── Computer turn ─────────────────────────────────────────── */
  async function yellowTurn() {
    if (state.over || state.turn !== 'yellow') return;
    const die = await animateDice();
    setStatus(`🟡 Computer rolled ${die}`, 'yellow');
    await pause(400);

    const moveable = getMoveable('yellow', die);
    if (moveable.length === 0) {
      setStatus(`🟡 Computer rolled ${die} — no moves. Your turn!`, 'yellow');
      await pause(700);
      endYellowTurn(die !== 6);
      return;
    }

    // AI: prefer capturing, else advance furthest piece
    const capture = moveable.find(pi => {
      const pos = state.yellow[pi];
      const futurePos = pos === -1 ? 0 : pos + die;
      if (futurePos > 51) return false;
      const absIdx = (futurePos + 26) % 52;
      if (SAFE.has(absIdx)) return false;
      return state.blue.some(bp => {
        if (bp < 0 || bp > 51) return false;
        return bp === absIdx; // Blue is at that absolute position
      });
    });

    const chosen = capture !== undefined ? capture :
                   moveable.reduce((best, pi) => {
                     const posB = state.yellow[best] < 0 ? -1 : state.yellow[best];
                     const posP = state.yellow[pi]   < 0 ? -1 : state.yellow[pi];
                     return posP > posB ? pi : best;
                   });

    await movePiece('yellow', chosen, die);
  }

  /* ── Capture logic ─────────────────────────────────────────── */
  function checkCapture(moverColor, moverPi) {
    const moverPieces = moverColor === 'blue' ? state.blue : state.yellow;
    const victimPieces = moverColor === 'blue' ? state.yellow : state.blue;
    const moverPos = moverPieces[moverPi];
    if (moverPos < 0 || moverPos > 51) return;

    // Absolute index of mover
    const moverAbs = moverColor === 'blue' ? moverPos : (moverPos + 26) % 52;
    if (SAFE.has(moverAbs)) return; // safe square — no capture

    victimPieces.forEach((vPos, vi) => {
      if (vPos < 0 || vPos > 51) return;
      const victimAbs = moverColor === 'yellow' ? vPos : (vPos + 26) % 52;
      if (moverAbs === victimAbs) {
        // Capture!
        victimPieces[vi] = -1;
        window.SFX?.play('opponent_move');
        setStatus(`💥 ${moverColor === 'blue' ? '🔵 You' : '🟡 Computer'} captured a piece! It goes back home.`,
          moverColor);
      }
    });
    renderPieces();
  }

  /* ── Win check ─────────────────────────────────────────────── */
  function checkWin(color) {
    const pieces = color === 'blue' ? state.blue : state.yellow;
    if (pieces.every(p => p === 57)) {
      state.over = true;
      endGame(color);
      return true;
    }
    return false;
  }

  async function endGame(winner) {
    enableRoll(false);
    const elapsed = Math.round((Date.now() - state.startTime) / 1000);
    const mm = Math.floor(elapsed/60), ss = String(elapsed%60).padStart(2,'0');
    const timeStr = `${mm}:${ss}`;

    if (winner === 'blue') { window.SFX?.play('win'); setStatus('🏆 YOU WIN! All your pieces are home!', 'blue'); }
    else { window.SFX?.play('lose'); setStatus('🟡 Computer wins! Try again!', 'yellow'); }

    const overlay = document.getElementById('ludo-end');
    if (overlay) {
      overlay.style.display = 'flex';
      document.getElementById('ludo-end-icon').textContent  = winner === 'blue' ? '🏆' : '🟡';
      document.getElementById('ludo-end-title').textContent = winner === 'blue' ? 'You Win!' : 'Computer Wins!';
      document.getElementById('ludo-end-msg').textContent   = winner === 'blue'
        ? 'Brilliant! All your blue pieces made it home!'
        : 'The computer got all pieces home first. Try again!';
      document.getElementById('ludo-end-stats').innerHTML =
        `<span>Moves: ${state.totalMoves}</span><span>Time: ${timeStr}</span>`;
    }

    await saveResult({
      gameType: 'ludo',
      outcome:  winner === 'blue' ? 'win' : 'lose',
      level:    'all',
      moves:    state.totalMoves,
      duration: elapsed,
      timeStr
    });
  }

  /* ── Helpers ───────────────────────────────────────────────── */
  function getMoveable(color, die) {
    const pieces = color === 'blue' ? state.blue : state.yellow;
    return pieces.reduce((acc, pos, pi) => {
      if (pos === 57) return acc; // already finished
      if (pos === -1 && die === 6) { acc.push(pi); return acc; } // can enter
      if (pos === -1) return acc; // can't enter without 6
      const newPos = pos + die;
      if (newPos <= 56) acc.push(pi); // can move without overshooting
      return acc;
    }, []);
  }

  function highlightMoveable(color, moveable) {
    // Styling handled by lc-piece-selectable in renderPieces
  }

  function updateFinishedDisplay() {
    const el = document.getElementById('ludo-finished');
    if (!el) return;
    const blueHome  = state.blue.filter(p => p === 57).length;
    const yellowHome = state.yellow.filter(p => p === 57).length;
    el.innerHTML = `
      🔵 Home: ${Array.from({length:4}, (_,i) => i < blueHome ? '🏠' : '⬜').join('')} &nbsp;
      🟡 Home: ${Array.from({length:4}, (_,i) => i < yellowHome ? '🏠' : '⬜').join('')}`;
  }

  function animateDice() {
    return new Promise(resolve => {
      const diceEl = document.getElementById('ludo-dice-val');
      const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
      const final = Math.floor(Math.random() * 6) + 1;
      let count = 0;
      const iv = setInterval(() => {
        if (diceEl) diceEl.textContent = faces[Math.floor(Math.random() * 6)];
        count++;
        if (count >= 8) {
          clearInterval(iv);
          if (diceEl) diceEl.textContent = faces[final - 1];
          resolve(final);
        }
      }, 80);
    });
  }

  function setStatus(msg, colour) {
    const el = document.getElementById('ludo-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = colour === 'blue' ? 'var(--primary)' :
                     colour === 'yellow' ? '#d97706' : '#374151';
  }

  function enableRoll(on) {
    const btn = document.getElementById('ludo-roll-btn');
    if (btn) { btn.disabled = !on; btn.style.opacity = on ? '1' : '0.5'; }
  }

  function pause(ms) { return new Promise(r => setTimeout(r, ms)); }
  function hideLoading() {
    const ol = document.getElementById('loading-overlay');
    if (ol) ol.classList.add('hidden');
  }

  function restartGame() {
    window.SFX?.play('click');
    const overlay = document.getElementById('ludo-end');
    if (overlay) overlay.style.display = 'none';
    const diceEl = document.getElementById('ludo-dice-val');
    if (diceEl) diceEl.textContent = '🎲';
    init();
  }

  return { init, rollDice, restartGame, _selectPiece };
})();
