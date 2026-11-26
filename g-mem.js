(function () {
  window.pfG = window.pfG || {};
  window.pfG.mem = function (root) {
    var L = window.pfLB, ar = L.ar(), E = ['🦅', '🚀', '🎮', '⚡', '🔥', '💎', '🎧', '🌙'];
    var sh = L.shell(root, 'mem', '<div class="pf-g-top"><span>' + (ar ? 'حركات' : 'Moves') + ' <b id="g-m">0</b></span><span>' + (ar ? 'أزواج' : 'Pairs') + ' <b id="g-p">0</b>/8</span></div><div class="pf-mem" id="g-bd" dir="ltr"></div><button type="button" class="pf-mm-btn pf-xo-again" id="g-go">' + (ar ? 'جولة جديدة' : 'New game') + '</button>');
    var bd = document.getElementById('g-bd'), mEl = document.getElementById('g-m'), pEl = document.getElementById('g-p'), cards, open, moves, pairs, lock, tms = [];
    function start() {
      tms.forEach(clearTimeout); tms = [];
      cards = E.concat(E).map(function (e) { return { e: e, up: false, ok: false }; });
      for (var i = 15; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = cards[i]; cards[i] = cards[j]; cards[j] = t; }
      open = []; moves = 0; pairs = 0; lock = false; document.getElementById('pf-lbs').innerHTML = ''; draw();
    }
    function draw() { bd.innerHTML = cards.map(function (c, i) { return '<button type="button" class="mc' + (c.up || c.ok ? ' up' : '') + (c.ok ? ' ok' : '') + '" data-i="' + i + '">' + (c.up || c.ok ? c.e : '') + '</button>'; }).join(''); mEl.textContent = moves; pEl.textContent = pairs; }
    bd.addEventListener('click', function (e) {
      var b = e.target.closest('.mc'); if (!b || lock) return; var i = +b.getAttribute('data-i'), c = cards[i]; if (c.up || c.ok) return;
      c.up = true; open.push(i); draw();
      if (open.length === 2) {
        moves++; lock = true; var a = cards[open[0]], d = cards[open[1]];
        tms.push(setTimeout(function () {
          if (a.e === d.e) { a.ok = d.ok = true; pairs++; } a.up = d.up = false; open = []; lock = false; draw();
          if (pairs === 8) sh.end(Math.max(10, 300 - (moves - 8) * 12));
        }, 650));
      }
    });
    document.getElementById('g-go').addEventListener('click', start);
    window.pfGStop = function () { tms.forEach(clearTimeout); };
    start();
  };
})();
