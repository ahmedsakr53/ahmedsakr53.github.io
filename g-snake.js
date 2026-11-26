(function () {
  window.pfG = window.pfG || {};
  window.pfG.snake = function (root) {
    var L = window.pfLB, ar = L.ar(), N = 15, C = 22;
    var sh = L.shell(root, 'snake', '<div class="pf-g-top"><span>' + (ar ? 'النتيجة' : 'Score') + ' <b id="g-s">0</b></span><span>' + (ar ? 'الأفضل' : 'Best') + ' <b id="g-b">0</b></span></div>' +
      '<canvas id="g-c" width="' + N * C + '" height="' + N * C + '" class="pf-g-cv"></canvas>' +
      '<div class="pf-g-pad" dir="ltr"><button data-d="u">▲</button><div><button data-d="l">◀</button><button data-d="d">▼</button><button data-d="r">▶</button></div></div>' +
      '<button type="button" class="pf-mm-btn pf-xo-again" id="g-go">' + (ar ? 'ابدأ' : 'Start') + '</button>');
    var cv = document.getElementById('g-c'), c = cv.getContext('2d'), sEl = document.getElementById('g-s'), bEl = document.getElementById('g-b'), go = document.getElementById('g-go');
    var best = 0; try { best = +localStorage.getItem('pf-snake-best') || 0; } catch (e) {} bEl.textContent = best;
    var sn, dir, nd, food, score, tm = null, alive = false;
    function place() { do { food = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)]; } while (sn.some(function (p) { return p[0] === food[0] && p[1] === food[1]; })); }
    function draw() {
      c.fillStyle = '#0a0b1f'; c.fillRect(0, 0, N * C, N * C);
      c.strokeStyle = 'rgba(80,90,200,.15)'; for (var i = 1; i < N; i++) { c.beginPath(); c.moveTo(i * C, 0); c.lineTo(i * C, N * C); c.moveTo(0, i * C); c.lineTo(N * C, i * C); c.stroke(); }
      if (!sn) return;
      c.shadowBlur = 12; c.shadowColor = '#ff2bd6'; c.fillStyle = '#ff2bd6'; c.beginPath(); c.arc(food[0] * C + C / 2, food[1] * C + C / 2, C / 2 - 3, 0, 7); c.fill();
      c.shadowColor = '#22d3ee'; sn.forEach(function (p, i) { c.fillStyle = i ? '#22d3ee' : '#b6ff3b'; c.fillRect(p[0] * C + 2, p[1] * C + 2, C - 4, C - 4); }); c.shadowBlur = 0;
    }
    function stop() { if (tm) { clearInterval(tm); tm = null; } }
    function tick() {
      dir = nd; var h = [sn[0][0] + dir[0], sn[0][1] + dir[1]];
      if (h[0] < 0 || h[1] < 0 || h[0] >= N || h[1] >= N || sn.some(function (p) { return p[0] === h[0] && p[1] === h[1]; })) return over();
      sn.unshift(h);
      if (h[0] === food[0] && h[1] === food[1]) { score++; sEl.textContent = score; place(); if (score % 5 === 0) { stop(); tm = setInterval(tick, Math.max(70, 140 - score * 3)); } } else sn.pop();
      draw();
    }
    function over() { stop(); alive = false; if (score > best) { best = score; bEl.textContent = best; try { localStorage.setItem('pf-snake-best', best); } catch (e) {} } go.style.display = ''; go.textContent = ar ? 'جولة جديدة' : 'Play again'; sh.end(score); }
    function start() { sn = [[7, 7], [6, 7], [5, 7]]; dir = nd = [1, 0]; score = 0; sEl.textContent = 0; place(); alive = true; go.style.display = 'none'; document.getElementById('pf-lbs').innerHTML = ''; draw(); stop(); tm = setInterval(tick, 140); }
    var M = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };
    function turn(k) { var v = M[k]; if (!v || !alive) return; if (v[0] === -dir[0] && v[1] === -dir[1]) return; nd = v; }
    go.addEventListener('click', start);
    root.querySelector('.pf-g-pad').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) turn(b.getAttribute('data-d')); });
    L.swipe(cv, turn);
    function key(e) { var k = { ArrowUp: 'u', ArrowDown: 'd', ArrowLeft: 'l', ArrowRight: 'r' }[e.key]; if (k) { e.preventDefault(); turn(k); } }
    function vis() { if (document.hidden && alive) { stop(); alive = false; over(); } }
    document.addEventListener('keydown', key); document.addEventListener('visibilitychange', vis);
    window.pfGStop = function () { stop(); document.removeEventListener('keydown', key); document.removeEventListener('visibilitychange', vis); };
    draw();
  };
})();
