(function () {
  window.pfG = window.pfG || {};
  window.pfG.ludo = function (root) {
    var L = window.pfLB, ar = L.ar();
    var P = [[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0],[7,0],[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[14,7],[14,8],[13,8],[12,8],[11,8],[10,8],[9,8],[8,9],[8,10],[8,11],[8,12],[8,13],[8,14],[7,14],[6,14],[6,13],[6,12],[6,11],[6,10],[6,9],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8],[0,7],[0,6]];
    var HC = [[[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]], [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]]];
    var BASE = [[[1.5,1.5],[3.5,1.5],[1.5,3.5],[3.5,3.5]], [[10.5,10.5],[12.5,10.5],[10.5,12.5],[12.5,12.5]]];
    var COL = ['#22d3ee', '#ff2bd6'], START = [0, 26], SAFE = [0, 8, 13, 21, 26, 34, 39, 47];
    var sh = L.shell(root, 'ludo', '<div class="pf-g-top"><span>' + (ar ? 'أنت' : 'You') + ' <b id="g-a">0</b>/4</span><span>' + (ar ? 'الكمبيوتر' : 'CPU') + ' <b id="g-c">0</b>/4</span></div>' +
      '<canvas class="pf-g-cv" id="g-cv" width="600" height="600" aria-label="Ludo"></canvas>' +
      '<div class="pf-xo-msg" id="g-m"></div><div class="pf-ludo-ctl"><button type="button" class="pf-ludo-die" id="g-die">' + (ar ? 'ارمِ النرد' : 'Roll Dice') + '</button><div class="pf-ludo-tk" id="g-tk"></div></div><button type="button" class="pf-xo-again" id="g-go">' + (ar ? 'لعبة جديدة' : 'New game') + '</button>');
    var cv = document.getElementById('g-cv'), cx = cv.getContext('2d'), msg = document.getElementById('g-m'), die = document.getElementById('g-die'), tk = document.getElementById('g-tk');
    var S = [[-1,-1,-1,-1], [-1,-1,-1,-1]], turn, roll, over, tms = [], opts;
    function T(f, ms) { tms.push(setTimeout(f, ms)); }
    function cell(p, pos) { return pos < 0 ? null : pos <= 50 ? (START[p] + pos) % 52 : -1; }
    function xy(p, i) { var q = S[p][i]; if (q < 0) return BASE[p][i]; if (q <= 50) { var c = P[(START[p] + q) % 52]; return [c[0] + .5, c[1] + .5]; } var h = HC[p][q - 51]; return [h[0] + .5, h[1] + .5]; }
    function draw() {
      var u = 40; cx.clearRect(0, 0, 600, 600); cx.fillStyle = '#0a0b1f'; cx.fillRect(0, 0, 600, 600);
      [[0,0,0],[9,9,1]].forEach(function (b) { cx.fillStyle = COL[b[2]] + '33'; cx.fillRect(b[0] * u, b[1] * u, 6 * u, 6 * u); cx.strokeStyle = COL[b[2]]; cx.lineWidth = 2; cx.strokeRect(b[0] * u + 1, b[1] * u + 1, 6 * u - 2, 6 * u - 2); });
      [[9,0],[0,9]].forEach(function (b) { cx.fillStyle = '#1c1f5522'; cx.fillRect(b[0] * u, b[1] * u, 6 * u, 6 * u); });
      P.forEach(function (c, i) { cx.fillStyle = SAFE.indexOf(i) > -1 ? '#2a2f7a' : '#12143a'; cx.fillRect(c[0] * u + 1, c[1] * u + 1, u - 2, u - 2); if (i === 0 || i === 26) { cx.fillStyle = COL[i ? 1 : 0] + '88'; cx.fillRect(c[0] * u + 1, c[1] * u + 1, u - 2, u - 2); } if (SAFE.indexOf(i) > -1) { cx.fillStyle = '#fff8'; cx.font = '18px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('★', c[0] * u + u / 2, c[1] * u + u / 2 + 1); } });
      HC.forEach(function (h, p) { h.forEach(function (c) { cx.fillStyle = COL[p] + '55'; cx.fillRect(c[0] * u + 1, c[1] * u + 1, u - 2, u - 2); }); });
      var cnt = {}; 
      for (var p = 0; p < 2; p++) for (var i = 0; i < 4; i++) {
        var a = xy(p, i), k = a[0] + ',' + a[1], n = cnt[k] = (cnt[k] || 0) + 1, off = S[p][i] >= 0 ? (n - 1) * 5 : 0;
        cx.beginPath(); cx.arc(a[0] * u + off - (n > 1 ? 4 : 0), a[1] * u - off, 15, 0, 7); cx.fillStyle = COL[p]; cx.shadowColor = COL[p]; cx.shadowBlur = 10; cx.fill(); cx.shadowBlur = 0; cx.lineWidth = 3; cx.strokeStyle = (opts && turn === 0 && opts.indexOf(i) > -1 && p === 0) ? '#b6ff3b' : '#05061a'; cx.stroke();
      }
    }
    function done(p) { return S[p].filter(function (q) { return q === 56; }).length; }
    function moves(p, r) {
      var o = []; for (var i = 0; i < 4; i++) { var q = S[p][i]; if (q === 56) continue; if (q < 0) { if (r === 6) o.push(i); } else if (q + r <= 56) o.push(i); } return o;
    }
    function apply(p, i, r) {
      var q = S[p][i], nq = q < 0 ? 0 : q + r, cap = false; S[p][i] = nq;
      var c = cell(p, nq);
      if (c !== null && c >= 0 && SAFE.indexOf(c) < 0) { var o = 1 - p; for (var j = 0; j < 4; j++) if (S[o][j] >= 0 && cell(o, S[o][j]) === c) { S[o][j] = -1; cap = true; } }
      return cap;
    }
    function upd() { document.getElementById('g-a').textContent = done(0); document.getElementById('g-c').textContent = done(1); }
    function finish(p) { over = true; die.disabled = true; tk.innerHTML = ''; msg.textContent = p === 0 ? (ar ? 'كسبت! 🎉' : 'You win! 🎉') : (ar ? 'الكمبيوتر كسب' : 'Computer wins'); msg.className = 'pf-xo-msg ' + (p === 0 ? 'x' : 'o'); }
    function next(p, r, bonus) { upd(); draw(); if (done(p) === 4) return finish(p); turn = bonus || r === 6 ? p : 1 - p; roll = 0; opts = null; begin(); }
    function begin() {
      if (over) return; tk.innerHTML = ''; draw();
      if (turn === 0) { die.disabled = false; msg.className = 'pf-xo-msg'; msg.textContent = ar ? 'دورك: ارمِ النرد' : 'Your turn: roll'; }
      else { die.disabled = true; msg.className = 'pf-xo-msg o'; msg.textContent = ar ? 'دور الكمبيوتر…' : 'Computer…'; T(function () { doRoll(); }, 700); }
    }
    function doRoll() {
      if (over) return; roll = 1 + Math.floor(Math.random() * 6); die.disabled = true;
      var o = moves(turn, roll), who = turn;
      msg.textContent = (who === 0 ? (ar ? 'رميت ' : 'You rolled ') : (ar ? 'الكمبيوتر رمى ' : 'CPU rolled ')) + roll;
      if (!o.length) { T(function () { next(who, 0, false); }, 800); return; }
      if (who === 1) { T(function () { var i = pick(o, roll), cap = apply(1, i, roll); upd(); draw(); T(function () { next(1, roll, cap && false); }, 500); }, 700); return; }
      if (o.length === 1) { T(function () { go(o[0]); }, 400); return; }
      opts = o; draw(); tk.innerHTML = o.map(function (i) { return '<button type="button" data-i="' + i + '">' + (ar ? 'حرّك ' : 'Move ') + (i + 1) + '</button>'; }).join('');
    }
    function go(i) { opts = null; tk.innerHTML = ''; var r = roll, cap = apply(0, i, r); upd(); draw(); T(function () { next(0, r, false); }, 350); }
    function pick(o, r) {
      var best = o[0], bs = -1e9;
      o.forEach(function (i) {
        var q = S[1][i], nq = q < 0 ? 0 : q + r, s = nq, c = cell(1, nq);
        if (q < 0) s += 30; if (nq === 56) s += 60;
        if (c !== null && c >= 0) { for (var j = 0; j < 4; j++) { var oq = S[0][j]; if (oq >= 0 && cell(0, oq) === c && SAFE.indexOf(c) < 0) s += 80 + oq; } if (SAFE.indexOf(c) > -1) s += 12; }
        if (nq > 50) s += 15; s += Math.random() * 3;
        if (s > bs) { bs = s; best = i; }
      });
      return best;
    }
    die.addEventListener('click', function () { if (turn === 0 && !roll && !over) doRoll(); });
    tk.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b && opts) go(+b.getAttribute('data-i')); });
    cv.addEventListener('click', function (e) {
      if (!opts || turn !== 0) return; var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 15, y = (e.clientY - r.top) / r.height * 15, bi = -1, bd = 1.2;
      opts.forEach(function (i) { var a = xy(0, i), d = Math.hypot(a[0] - x, a[1] - y); if (d < bd) { bd = d; bi = i; } }); if (bi > -1) go(bi);
    });
    function start() { tms.forEach(clearTimeout); tms = []; S = [[-1,-1,-1,-1], [-1,-1,-1,-1]]; turn = 0; roll = 0; over = false; opts = null; upd(); begin(); }
    document.getElementById('g-go').addEventListener('click', start);
    window.pfGStop = function () { tms.forEach(clearTimeout); tms = []; over = true; };
    start();
  };
})();
