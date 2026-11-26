(function () {
  window.pfG = window.pfG || {};
  window.pfG.g2048 = function (root) {
    var L = window.pfLB, ar = L.ar();
    var sh = L.shell(root, 'g2048', '<div class="pf-g-top"><span>' + (ar ? 'النتيجة' : 'Score') + ' <b id="g-s">0</b></span><span>' + (ar ? 'الأفضل' : 'Best') + ' <b id="g-b">0</b></span></div><div class="pf-2048" id="g-bd" dir="ltr"></div><p class="pf-g-hint">' + (ar ? 'اسحب في أي اتجاه لدمج الأرقام' : 'Swipe to merge tiles') + '</p><button type="button" class="pf-mm-btn pf-xo-again" id="g-go">' + (ar ? 'جولة جديدة' : 'New game') + '</button>');
    var bd = document.getElementById('g-bd'), sEl = document.getElementById('g-s'), bEl = document.getElementById('g-b'), g, score, best = 0, over;
    try { best = +localStorage.getItem('pf-2048-best') || 0; } catch (e) {} bEl.textContent = best;
    function add() { var f = []; g.forEach(function (v, i) { if (!v) f.push(i); }); if (f.length) g[f[Math.floor(Math.random() * f.length)]] = Math.random() < 0.9 ? 2 : 4; }
    function draw() { bd.innerHTML = g.map(function (v) { return '<i class="t t' + (v > 2048 ? 'x' : v) + '">' + (v || '') + '</i>'; }).join(''); sEl.textContent = score; }
    function line(a) { var r = a.filter(Boolean), out = [], i = 0; while (i < r.length) { if (r[i] === r[i + 1]) { out.push(r[i] * 2); score += r[i] * 2; i += 2; } else { out.push(r[i]); i++; } } while (out.length < 4) out.push(0); return out; }
    function can() { for (var i = 0; i < 16; i++) { if (!g[i]) return true; if (i % 4 < 3 && g[i] === g[i + 1]) return true; if (i < 12 && g[i] === g[i + 4]) return true; } return false; }
    function move(d) {
      if (over) return; var old = g.join(), ng = g.slice();
      for (var k = 0; k < 4; k++) {
        var idx = d === 'l' || d === 'r' ? [0, 1, 2, 3].map(function (j) { return k * 4 + j; }) : [0, 1, 2, 3].map(function (j) { return j * 4 + k; });
        if (d === 'r' || d === 'd') idx.reverse();
        var res = line(idx.map(function (i) { return g[i]; })); idx.forEach(function (i, j) { ng[i] = res[j]; });
      }
      g = ng; if (g.join() === old) return; add(); draw();
      if (score > best) { best = score; bEl.textContent = best; try { localStorage.setItem('pf-2048-best', best); } catch (e) {} }
      if (!can()) { over = true; sh.end(score); }
    }
    function start() { g = Array(16).fill(0); score = 0; over = false; add(); add(); document.getElementById('pf-lbs').innerHTML = ''; draw(); }
    document.getElementById('g-go').addEventListener('click', start);
    L.swipe(bd, move);
    function key(e) { var k = { ArrowUp: 'u', ArrowDown: 'd', ArrowLeft: 'l', ArrowRight: 'r' }[e.key]; if (k) { e.preventDefault(); move(k); } }
    document.addEventListener('keydown', key);
    window.pfGStop = function () { document.removeEventListener('keydown', key); };
    start();
  };
})();
