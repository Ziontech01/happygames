// ── Chess Game (requires auth, uses chess.js for logic) ───────

gameAuth('Chess', () => { newChessGame(); });

const PIECES = {
  wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',
  bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟'
};
const PIECE_VALUES = { p:1,n:3,b:3,r:5,q:9,k:0 };

let chess, selectedSq=null, legalMoves=[], playerColor='w';
let chessDiff='easy', chessStartTime=null, chessTimerInt=null;
let chessMoves=0, sessW=0, sessL=0, sessD=0, xpTotal=0;

// ── Difficulty ───────────────────────────────────────────────
function setChessDiff(d) {
  chessDiff=d;
  ['easy','medium','hard'].forEach(x=>{
    const btn=document.getElementById('cd-'+x);
    if(btn) btn.classList.toggle('active', x===d);
  });
  if(chess && !chess.game_over()) newChessGame();
}

// ── Side ─────────────────────────────────────────────────────
function setChessSide(s) {
  playerColor=s;
  ['w','b'].forEach(x=>{
    const btn=document.getElementById('csy-'+x);
    if(btn) btn.classList.toggle('active', x===s);
  });
  showMascot(s==='w' ? '♔ Playing as White! You go first!' : '♚ Playing as Black! I\'ll go first…');
  newChessGame();
}

// ── New Game ─────────────────────────────────────────────────
function newChessGame() {
  chess = new Chess();
  selectedSq=null; legalMoves=[]; chessMoves=0;
  clearInterval(chessTimerInt); chessStartTime=null;
  document.getElementById('chs-m').textContent='0';
  document.getElementById('chs-t').textContent='00:00';
  document.getElementById('chess-result').classList.remove('show');
  document.getElementById('move-history').innerHTML='<div style="color:#64748b;font-style:italic">No moves yet</div>';
  document.getElementById('captured-by-player').innerHTML='';
  document.getElementById('captured-by-cpu').innerHTML='';
  renderBoard();
  const status = playerColor==='w' ? '♔ Your turn — White moves first!' : '♚ Your turn — make your move!';
  setChessStatus(status);
  showMascot('♟️ New game started! Good luck! 🍀', 3000);
  if(playerColor==='b') setTimeout(cpuChessMove, 600);
}

// ── Board Rendering ─────────────────────────────────────────
function renderBoard() {
  const board   = document.getElementById('chessboard');
  const rankLbls= document.getElementById('rank-labels');
  const fileLbls= document.getElementById('file-labels');
  if(!board) return;
  board.innerHTML='';
  if(rankLbls) rankLbls.innerHTML='';
  if(fileLbls) fileLbls.innerHTML='';

  const ranks = playerColor==='w' ? [8,7,6,5,4,3,2,1] : [1,2,3,4,5,6,7,8];
  const files = playerColor==='w' ? ['a','b','c','d','e','f','g','h'] : ['h','g','f','e','d','c','b','a'];

  ranks.forEach((rank,ri) => {
    if(rankLbls){
      const lbl=document.createElement('div');
      lbl.className='rank-label';
      lbl.textContent=rank;
      rankLbls.appendChild(lbl);
    }
    const row=document.createElement('div');
    row.className='board-row';
    files.forEach((file,fi) => {
      const sqName=file+rank;
      const isLight=(fi+ri)%2===0;
      const sq=document.createElement('div');
      sq.className='chess-sq '+(isLight?'light':'dark');
      sq.dataset.sq=sqName;

      // Legal move indicators
      if(legalMoves.includes(sqName)) {
        const piece=chess.get(sqName);
        sq.classList.add(piece && piece.color!==playerColor ? 'legal-capture' : 'legal-move');
      }
      // Selected square
      if(selectedSq===sqName) sq.classList.add('selected');

      // Piece
      const piece=chess.get(sqName);
      if(piece) {
        const key=piece.color+piece.type.toUpperCase();
        const inner=document.createElement('span');
        inner.className='piece-inner';
        inner.textContent=PIECES[key]||'';
        inner.style.cssText=`
          display:block;line-height:1;
          color:${piece.color==='w'
            ? '#ffffff'
            : '#0f0a2e'};
          text-shadow:${piece.color==='w'
            ? '0 2px 0 rgba(0,0,0,.6), 0 0 12px rgba(255,255,255,.5), 1px 1px 3px rgba(0,0,0,.9)'
            : '0 2px 0 rgba(255,255,255,.15), 0 0 8px rgba(99,102,241,.4), 1px 1px 4px rgba(0,0,0,.8)'};
          filter:${piece.color==='w'
            ? 'drop-shadow(0 3px 6px rgba(0,0,0,.7))'
            : 'drop-shadow(0 3px 6px rgba(0,0,0,.5))'};
          font-size:inherit;
        `;
        sq.appendChild(inner);
        sq.classList.add('piece-new');
      } else {
        sq.classList.add('empty-sq');
      }

      sq.addEventListener('click', ()=>handleSqClick(sqName));
      row.appendChild(sq);
    });
    board.appendChild(row);
  });

  if(fileLbls) files.forEach(f=>{
    const lbl=document.createElement('div');
    lbl.className='file-label';
    lbl.textContent=f;
    fileLbls.appendChild(lbl);
  });

  // Post-render hooks (check highlight etc.)
  setTimeout(afterRender, 30);
}

// ── Post-Render Hooks ────────────────────────────────────────
function afterRender() {
  if(!chess) return;

  // Highlight king in check + shake board
  if(chess.in_check()) {
    const turnColor=chess.turn();
    chess.board().forEach((row,ri)=>{
      row.forEach((p,fi)=>{
        if(p && p.type==='k' && p.color===turnColor) {
          const sqName=String.fromCharCode(97+fi)+(8-ri);
          const sqEl=document.querySelector(`.chess-sq[data-sq="${sqName}"]`);
          if(sqEl){
            sqEl.classList.add('in-check');
            // If it's a square we know is light/dark, preserve that var
            sqEl.style.setProperty('--sq-bg', sqEl.classList.contains('light')
              ? 'var(--light-sq)' : 'var(--dark-sq)');
          }
        }
      });
    });
    // Shake board ring
    const ring=document.getElementById('chess-board-ring');
    if(ring){
      ring.classList.remove('board-shake');
      void ring.offsetWidth; // reflow to restart anim
      ring.classList.add('board-shake');
      setTimeout(()=>ring.classList.remove('board-shake'), 500);
    }
    window.SFX?.play('error');
    if(chess.turn()===playerColor) {
      setChessStatus('⚠️ You\'re in check! Protect your king!');
      document.getElementById('chess-status')?.classList.add('check-status');
      showMascot('⚠️ You\'re in check! Protect your king!', 3000);
    } else {
      showMascot('🎯 Check! Computer is in trouble!', 3000);
    }
  } else {
    document.getElementById('chess-status')?.classList.remove('check-status');
  }
}

// ── Square Click ────────────────────────────────────────────
function handleSqClick(sq) {
  if(chess.game_over()) return;
  if(chess.turn()!==playerColor) return;

  if(selectedSq && legalMoves.includes(sq)) {
    makeMove(selectedSq, sq);
    return;
  }
  const piece=chess.get(sq);
  if(piece && piece.color===playerColor) {
    selectedSq=sq;
    legalMoves=chess.moves({square:sq, verbose:true}).map(m=>m.to);
    // Mascot piece hints
    const hints={k:'Careful — the king is precious! 👑',q:'The queen is your most powerful piece! ♛',r:'Rooks love open files! ♜',b:'Bishops slash diagonals! ♝',n:'Knights jump over pieces! ♞',p:'Pawns march forward! ♟'};
    if(hints[piece.type]) showMascot(hints[piece.type], 2500);
  } else {
    selectedSq=null; legalMoves=[];
  }
  renderBoard();
}

// ── Make Move ────────────────────────────────────────────────
function makeMove(from, to) {
  if(!chessStartTime) {
    chessStartTime=Date.now();
    chessTimerInt=setInterval(()=>{
      const e=Math.floor((Date.now()-chessStartTime)/1000);
      document.getElementById('chs-t').textContent=fmtT(e);
    },1000);
  }
  const promoRank=playerColor==='w'?'8':'1';
  const piece=chess.get(from);
  const isPromo=piece && piece.type==='p' && to.endsWith(promoRank);
  const move=chess.move({from, to, promotion:isPromo?'q':undefined});
  if(!move) return;

  // Sound
  if(move.captured) {
    window.SFX?.play('win');
    showMascot('😎 Nice capture! Keep it up!', 2000);
  } else {
    window.SFX?.play('click');
  }

  chessMoves++;
  document.getElementById('chs-m').textContent=chessMoves;
  selectedSq=null; legalMoves=[];
  updateHistory(move);
  updateCaptured(move);
  renderBoard();
  if(checkGameEnd()) return;
  setChessStatus('🤖 Archie is thinking…');
  showMascot('🤔 Let me think about your move…', 2500);
  setTimeout(cpuChessMove, 400+Math.random()*500);
}

// ── CPU Move ────────────────────────────────────────────────
function cpuChessMove() {
  if(chess.game_over()) return;
  const cpuColor=playerColor==='w'?'b':'w';
  if(chess.turn()!==cpuColor) return;

  const moves=chess.moves({verbose:true});
  if(!moves.length) return;

  let chosen;
  if(chessDiff==='easy')       chosen=moves[Math.floor(Math.random()*moves.length)];
  else if(chessDiff==='medium') chosen=bestMoveSimple(moves,cpuColor)||moves[Math.floor(Math.random()*moves.length)];
  else                          chosen=minimaxRoot(moves,cpuColor,2);

  const move=chess.move(chosen);
  if(!move) return;

  if(move.captured) window.SFX?.play('opponent_move');
  else              window.SFX?.play('opponent_move');

  chessMoves++;
  document.getElementById('chs-m').textContent=chessMoves;
  updateHistory(move);
  updateCaptured(move);
  renderBoard();
  if(checkGameEnd()) return;

  const turnStatus=playerColor==='w'?'♔ Your turn (White)':'♚ Your turn (Black)';
  setChessStatus(turnStatus);
  if(move.captured) showMascot('😤 Computer captured one of your pieces! Fight back!', 2500);
}

// ── AI ───────────────────────────────────────────────────────
function bestMoveSimple(moves,color) {
  const captures=moves.filter(m=>m.captured);
  if(captures.length){
    captures.sort((a,b)=>(PIECE_VALUES[b.captured]||0)-(PIECE_VALUES[a.captured]||0));
    return captures[0];
  }
  const center=['e4','e5','d4','d5','c4','c5','f4','f5'];
  const central=moves.filter(m=>center.includes(m.to));
  if(central.length) return central[Math.floor(Math.random()*central.length)];
  return null;
}
function minimaxRoot(moves,color,depth) {
  let best=null,bestScore=-Infinity;
  for(const m of moves){
    chess.move(m);
    const score=-minimaxChess(depth-1,-Infinity,Infinity,color==='w'?'b':'w');
    chess.undo();
    if(score>bestScore){bestScore=score;best=m;}
  }
  return best||moves[0];
}
function minimaxChess(depth,alpha,beta,color) {
  if(depth===0||chess.game_over()) return evalBoard(color);
  const moves=chess.moves({verbose:true});
  let score=-Infinity;
  for(const m of moves){
    chess.move(m);
    score=Math.max(score,-minimaxChess(depth-1,-beta,-alpha,color==='w'?'b':'w'));
    chess.undo();
    alpha=Math.max(alpha,score);
    if(alpha>=beta) break;
  }
  return score;
}
function evalBoard(forColor) {
  let score=0;
  chess.board().forEach(row=>row.forEach(sq=>{
    if(!sq) return;
    const v=PIECE_VALUES[sq.type]||0;
    score+=sq.color===forColor?v:-v;
  }));
  return score;
}

// ── History & Captured ──────────────────────────────────────
function updateHistory(move) {
  const hist=chess.history();
  const el=document.getElementById('move-history');
  if(!el) return;
  if(hist.length===1) el.innerHTML='';
  const pairs=[];
  for(let i=0;i<hist.length;i+=2){
    pairs.push(`<div class="move-pair">
      <span class="move-num">${Math.floor(i/2)+1}.</span>
      <span class="move-w">${hist[i]||''}</span>
      <span class="move-b">${hist[i+1]||''}</span>
    </div>`);
  }
  el.innerHTML=pairs.join('');
  el.scrollTop=el.scrollHeight;
}
function updateCaptured(move) {
  if(!move.captured) return;
  const color=move.color===playerColor?'captured-by-player':'captured-by-cpu';
  const el=document.getElementById(color);
  if(el){
    const oppColor=move.color==='w'?'b':'w';
    const key=oppColor+move.captured.toUpperCase();
    const span=document.createElement('span');
    span.textContent=PIECES[key]||'';
    span.style.animation='pieceDrop .3s ease';
    el.appendChild(span);
  }
}

// ── Game End ─────────────────────────────────────────────────
function checkGameEnd() {
  if(!chess.game_over()) return false;
  clearInterval(chessTimerInt);
  const elapsed=chessStartTime?Math.floor((Date.now()-chessStartTime)/1000):0;
  const timeStr=fmtT(elapsed);
  let outcome,emoji,title,msg,cls;

  if(chess.in_checkmate()) {
    if(chess.turn()!==playerColor) {
      outcome='win'; emoji='🏆'; title='You Win!'; cls='win'; msg='Checkmate! Brilliant game! 🎉';
      sessW++; document.getElementById('chs-w').textContent=sessW;
      addXP(50);
    } else {
      outcome='lose'; emoji='😢'; title='Checkmate!'; cls='lose'; msg='Computer got your king. Try again!';
      sessL++; document.getElementById('chs-l').textContent=sessL;
      addXP(10);
    }
  } else {
    outcome='draw'; emoji='🤝'; title='Draw!'; cls='draw';
    msg=chess.in_stalemate()?'Stalemate! No legal moves.':
        chess.in_threefold_repetition()?'Draw by repetition.':
        chess.insufficient_material()?'Insufficient material.':'Draw!';
    sessD++; document.getElementById('chs-d').textContent=sessD;
    addXP(20);
  }

  if(outcome==='win')  { window.SFX?.play('win');  chessConfetti(); showMascot('🏆 CHECKMATE! You\'re a chess star!', 0); }
  else if(outcome==='lose') { window.SFX?.play('lose'); showMascot('💪 So close! Every game makes you stronger!', 0); }
  else                      { window.SFX?.play('draw'); showMascot('🤝 Good game! Nice and even!', 0); }

  saveResult({gameType:'chess',outcome,moves:chessMoves,duration:elapsed,timeStr,difficulty:chessDiff});

  document.getElementById('cr-emoji').textContent=emoji;
  const t=document.getElementById('cr-title'); t.textContent=title; t.className='result-title '+cls;
  document.getElementById('cr-msg').textContent=msg;
  document.getElementById('cr-moves').textContent=chessMoves;
  document.getElementById('cr-time').textContent=timeStr;
  setTimeout(()=>document.getElementById('chess-result').classList.add('show'),700);
  return true;
}

// ── Undo ─────────────────────────────────────────────────────
function undoMove() {
  if(!chess||chessMoves<2) return;
  chess.undo(); chess.undo();
  chessMoves=Math.max(0,chessMoves-2);
  document.getElementById('chs-m').textContent=chessMoves;
  selectedSq=null; legalMoves=[];
  updateHistory({});
  renderBoard();
  setChessStatus(playerColor==='w'?'♔ Your turn (White)':'♚ Your turn (Black)');
  showMascot('↩️ Move undone! Think it through!', 2000);
}

// ── Helpers ──────────────────────────────────────────────────
function setChessStatus(t) {
  const el=document.getElementById('chess-status');
  if(el) el.textContent=t;
}
function fmtT(s){ return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }

// ── XP System ────────────────────────────────────────────────
function addXP(amount) {
  xpTotal=Math.min(xpTotal+amount, 500);
  const pct=Math.round((xpTotal/500)*100);
  const bar=document.getElementById('xp-bar');
  const val=document.getElementById('xp-val');
  if(bar) bar.style.width=pct+'%';
  if(val) val.textContent=xpTotal;
}

// ── Mascot ────────────────────────────────────────────────────
function showMascot(msg, duration=3500) {
  const bubble=document.getElementById('mascot-bubble');
  if(!bubble) return;
  bubble.innerHTML=msg;
  bubble.classList.add('show');
  clearTimeout(showMascot._t);
  if(duration>0) showMascot._t=setTimeout(()=>bubble.classList.remove('show'), duration);
}

// ── Confetti ─────────────────────────────────────────────────
function chessConfetti() {
  const wrap=document.getElementById('chess-confetti');
  if(!wrap) return;
  wrap.innerHTML='';
  const cols=['#FF6B6B','#4ECDC4','#FFE66D','#A855F7','#3B82F6','#22C55E','#f97316','#ec4899'];
  for(let i=0;i<90;i++){
    const p=document.createElement('div');
    p.style.cssText=`
      position:absolute;
      left:${Math.random()*100}vw;
      top:-20px;
      background:${cols[~~(Math.random()*cols.length)]};
      width:${Math.random()*10+5}px;
      height:${Math.random()*10+5}px;
      border-radius:${Math.random()>.5?'50%':'3px'};
      animation:confettiFall ${1.8+Math.random()*2.5}s ease-in forwards;
      animation-delay:${Math.random()*1}s;
    `;
    wrap.appendChild(p);
  }
  setTimeout(()=>{ wrap.innerHTML=''; }, 5000);
}
