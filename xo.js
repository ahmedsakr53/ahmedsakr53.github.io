/* X O (neon). Loaded only when a visitor opens #/xo. No server. */
(function () {
  var LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function win(b) { for (var i = 0; i < 8; i++) { var l = LINES[i]; if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) return { p: b[l[0]], l: l }; } return null; }
  function full(b) { return b.every(function (x) { return x; }); }
  function minimax(b, turn, me) {
    var w = win(b); if (w) return w.p === me ? 10 : -10; if (full(b)) return 0;
    var best = turn === me ? -99 : 99;
    for (var i = 0; i < 9; i++) if (!b[i]) { b[i] = turn; var v = minimax(b, turn === 'X' ? 'O' : 'X', me); b[i] = null; best = turn === me ? Math.max(best, v) : Math.min(best, v); }
    return best;
  }
  function pick(b, hard) {
    var free = []; for (var i = 0; i < 9; i++) if (!b[i]) free.push(i);
    if (!hard || Math.random() < 0.15 && free.length > 6) return free[Math.floor(Math.random() * free.length)];
    var best = -99, mv = free[0];
    free.forEach(function (i) { b[i] = 'O'; var v = minimax(b, 'X', 'O'); b[i] = null; if (v > best || (v === best && Math.random() < 0.3)) { best = v; mv = i; } });
    return mv;
  }
  function render(root) {
    var ar = document.documentElement.lang !== 'en';
    var tx = ar ? { t: 'إكس أو', vs: 'ضد الكمبيوتر', two: 'لاعبين', easy: 'سهل', hard: 'صعب', you: 'إنت', pc: 'الكمبيوتر', p1: 'لاعب X', p2: 'لاعب O', draw: 'تعادل', again: 'جولة جديدة', turn: 'دور', won: 'كسب!', back: 'رجوع للألعاب', tie: 'تعادل' } :
      { t: 'Tic-Tac-Toe', vs: 'vs Computer', two: '2 players', easy: 'Easy', hard: 'Hard', you: 'You', pc: 'Computer', p1: 'Player X', p2: 'Player O', draw: 'Draw', again: 'New round', turn: 'Turn', won: 'wins!', back: 'Back to games', tie: 'Draw' };
    var st = { mode: 'pc', hard: false, b: Array(9).fill(null), turn: 'X', over: false, sc: { X: 0, O: 0, D: 0 }, start: 'X', line: null };
    root.innerHTML = '<div class="pf-pagehead"><div class="pf-eyebrow">GAME</div><h2 class="pf-h2">' + tx.t + '</h2></div>' +
      '<div class="pf-xo"><a class="pf-g-exit" href="#/fun">' + (ar ? '✕ خروج' : '✕ Exit') + '</a><div class="pf-xo-opts"><button type="button" data-m="pc" class="on">' + tx.vs + '</button><button type="button" data-m="two">' + tx.two + '</button></div>' +
      '<div class="pf-xo-opts" id="pf-xo-lv"><button type="button" data-l="0" class="on">' + tx.easy + '</button><button type="button" data-l="1">' + tx.hard + '</button></div>' +
      '<div class="pf-xo-score"><span class="x"><b id="pf-xo-sx">0</b><em id="pf-xo-nx">' + tx.p1 + '</em></span><span class="d"><b id="pf-xo-sd">0</b>' + tx.draw + '</span><span class="o"><b id="pf-xo-so">0</b><em id="pf-xo-no">' + tx.p2 + '</em></span></div>' +
      '<div class="pf-xo-msg" id="pf-xo-msg"></div><div class="pf-xo-board" id="pf-xo-board"></div>' +
      '<button type="button" class="pf-mm-btn pf-xo-again" id="pf-xo-again">' + tx.again + '</button>' +
      '<a class="pf-xo-back" href="#/fun">' + tx.back + '</a></div>';
    var board = document.getElementById('pf-xo-board'), msg = document.getElementById('pf-xo-msg'), cells = [];
    for (var i = 0; i < 9; i++) { var c = document.createElement('button'); c.type = 'button'; c.className = 'pf-xo-c'; c.setAttribute('data-i', i); c.setAttribute('aria-label', 'cell ' + (i + 1)); board.appendChild(c); cells.push(c); }
    function draw() {
      cells.forEach(function (c, i) { c.textContent = st.b[i] || ''; c.className = 'pf-xo-c' + (st.b[i] ? ' ' + st.b[i].toLowerCase() : '') + (st.line && st.line.indexOf(i) > -1 ? ' w' : ''); c.disabled = !!st.b[i] || st.over; });
      document.getElementById('pf-xo-sx').textContent = st.sc.X; document.getElementById('pf-xo-so').textContent = st.sc.O; document.getElementById('pf-xo-sd').textContent = st.sc.D;
      var nameX = st.mode === 'pc' ? tx.you : tx.p1, nameO = st.mode === 'pc' ? tx.pc : tx.p2;
      document.getElementById('pf-xo-nx').textContent = nameX; document.getElementById('pf-xo-no').textContent = nameO;
      document.getElementById('pf-xo-lv').style.display = st.mode === 'pc' ? '' : 'none';
      if (st.over) { var w = win(st.b); msg.textContent = w ? (w.p === 'X' ? nameX : nameO) + ' ' + tx.won : tx.tie; msg.className = 'pf-xo-msg ' + (w ? w.p.toLowerCase() : ''); }
      else { msg.textContent = tx.turn + ': ' + (st.turn === 'X' ? nameX : nameO); msg.className = 'pf-xo-msg ' + st.turn.toLowerCase(); }
    }
    function finish() { var w = win(st.b); if (w) { st.over = true; st.line = w.l; st.sc[w.p]++; } else if (full(st.b)) { st.over = true; st.sc.D++; } }
    function pcMove() { if (st.over || st.mode !== 'pc' || st.turn !== 'O') return; setTimeout(function () { if (st.over || st.turn !== 'O') return; st.b[pick(st.b, st.hard)] = 'O'; st.turn = 'X'; finish(); draw(); }, 380); }
    function reset() { st.b = Array(9).fill(null); st.over = false; st.line = null; st.start = st.start === 'X' ? 'O' : 'X'; st.turn = st.mode === 'pc' ? 'X' : st.start; if (st.mode === 'pc' && st.start === 'O') st.turn = 'O'; draw(); pcMove(); }
    board.addEventListener('click', function (e) {
      var c = e.target.closest('.pf-xo-c'); if (!c || st.over) return; var i = +c.getAttribute('data-i'); if (st.b[i]) return;
      if (st.mode === 'pc' && st.turn !== 'X') return;
      st.b[i] = st.turn; st.turn = st.turn === 'X' ? 'O' : 'X'; finish(); draw(); pcMove();
    });
    root.querySelector('.pf-xo-opts').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; st.mode = b.getAttribute('data-m'); [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle('on', x === b); }); st.sc = { X: 0, O: 0, D: 0 }; st.start = 'O'; reset(); });
    document.getElementById('pf-xo-lv').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; st.hard = b.getAttribute('data-l') === '1'; [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle('on', x === b); }); st.sc = { X: 0, O: 0, D: 0 }; st.start = 'O'; reset(); });
    document.getElementById('pf-xo-again').addEventListener('click', reset);
    draw();
  }
  window.pfXO = { render: render };
})();
