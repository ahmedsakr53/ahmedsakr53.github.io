(function () {
  window.pfG = window.pfG || {};
  window.pfG.domino = function (root) {
    var L = window.pfLB, ar = L.ar();
    var PIPS = [[], [[1,1]], [[0,0],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[2,0],[0,2],[2,2]], [[0,0],[2,0],[1,1],[0,2],[2,2]], [[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]]];
    function half(n, x) { return PIPS[n].map(function (p) { return '<circle cx="' + (x + 5 + p[0] * 5.5) + '" cy="' + (4.5 + p[1] * 6) + '" r="2"/>'; }).join(''); }
    function tg(a, b, tr) { return '<g class="pf-dg" transform="' + tr + '"><rect x=".7" y=".7" width="40.6" height="19.6" rx="4"/><path d="M21 3v15"/>' + half(a, 0) + half(b, 21) + '</g>'; }
    function snake(ch) {
      var per = 4, n = ch.length, out = '', x, y = 0, dir = 1, k = 0, minX = -23, maxX = per * 44 + 21, maxY = 21, ox = n <= per ? (per - n) * 22 : 0;
      x = ox;
      for (var i = 0; i < n; i++) {
        var t = ch[i];
        if (k === per) { // bend tile, vertical, going down
          var bx = dir === 1 ? x : x + 0 - 0;
          if (dir === 1) bx = per * 44; else bx = -23;
          out += tg(t[0], t[1], 'translate(' + (bx + 21) + ',' + y + ') rotate(90)'); maxY = Math.max(maxY, y + 42);
          y += 23; dir = -dir; x = dir === 1 ? 0 : (per - 1) * 44; k = 0; continue;
        }
        if (dir === 1) out += tg(t[0], t[1], 'translate(' + x + ',' + y + ')'); else out += tg(t[0], t[1], 'translate(' + (x + 42) + ',' + (y + 21) + ') rotate(180)');
        maxY = Math.max(maxY, y + 21); x += dir === 1 ? 44 : -44; k++;
      }
      return '<svg class="pf-dmsvg" viewBox="' + minX + ' -1 ' + (maxX - minX) + ' ' + (maxY + 2) + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + out + '</svg>';
    }
    function tile(a, b, cls) { return '<svg class="pf-dm ' + (cls || '') + '" viewBox="0 0 42 21" aria-hidden="true"><rect x=".7" y=".7" width="40.6" height="19.6" rx="4"/><path d="M21 3v15"/>' + half(a, 0) + half(b, 21) + '</svg>'; }
    var sh = L.shell(root, 'domino', '<div class="pf-g-top"><span>' + (ar ? 'أنت' : 'You') + ' <b id="g-a">0</b></span><span>' + (ar ? 'الكمبيوتر' : 'CPU') + ' <b id="g-c">0</b></span></div>' +
      '<div class="pf-dm-info" id="g-i"></div><div class="pf-dm-board" id="g-bd" dir="ltr"></div><div class="pf-xo-msg" id="g-m"></div><div class="pf-dm-hand" id="g-h" dir="ltr"></div><div class="pf-dm-act" id="g-ac"></div><button type="button" class="pf-xo-again" id="g-go">' + (ar ? 'جولة جديدة' : 'New round') + '</button>');
    var bd = document.getElementById('g-bd'), hd = document.getElementById('g-h'), ac = document.getElementById('g-ac'), msg = document.getElementById('g-m'), inf = document.getElementById('g-i');
    var yours, cpu, yard, chain, turn, over, sel, pass, tms = [], wa = 0, wc = 0;
    function T(f, ms) { tms.push(setTimeout(f, ms)); }
    function ends() { return chain.length ? [chain[0][0], chain[chain.length - 1][1]] : null; }
    function can(t) { var e = ends(); return !e || t[0] === e[0] || t[1] === e[0] || t[0] === e[1] || t[1] === e[1]; }
    function place(t, side) { // side 0 = left, 1 = right
      if (!chain.length) { chain.push([t[0], t[1]]); return; }
      var e = ends();
      if (side === 0) chain.unshift(t[1] === e[0] ? [t[0], t[1]] : [t[1], t[0]]); else chain.push(t[0] === e[1] ? [t[0], t[1]] : [t[1], t[0]]);
    }
    function fits(t, side) { var e = ends(); if (!e) return true; var v = e[side]; return t[0] === v || t[1] === v; }
    function sum(h) { return h.reduce(function (s, t) { return s + t[0] + t[1]; }, 0); }
    function render() {
      bd.innerHTML = chain.length ? snake(chain) : '' || '<em>' + (ar ? 'الطاولة فاضية' : 'Empty table') + '</em>';
      inf.textContent = (ar ? 'الكمبيوتر معاه ' : 'CPU has ') + cpu.length + (ar ? ' قطعة، والمخزن ' : ' tiles, boneyard ') + yard.length;
      hd.innerHTML = yours.map(function (t, i) { var ok = turn === 0 && !over && can(t); return '<button type="button" class="pf-dm-b' + (ok ? ' ok' : '') + (sel === i ? ' sel' : '') + '" data-i="' + i + '"' + (ok ? '' : ' disabled') + ' aria-label="' + t[0] + '-' + t[1] + '">' + tile(t[0], t[1]) + '</button>'; }).join('');
      var h = '';
      if (turn === 0 && !over) {
        if (sel !== null && yours[sel] && chain.length && fits(yours[sel], 0) && fits(yours[sel], 1) && ends()[0] !== ends()[1]) h = '<button type="button" data-s="0">' + (ar ? '◀ على اليسار' : '◀ Left') + '</button><button type="button" data-s="1">' + (ar ? 'على اليمين ▶' : 'Right ▶') + '</button>';
        else if (!yours.some(can)) h = yard.length ? '<button type="button" data-d="1">' + (ar ? 'اسحب قطعة' : 'Draw a tile') + '</button>' : '<button type="button" data-p="1">' + (ar ? 'عدّي الدور' : 'Pass') + '</button>';
      }
      ac.innerHTML = h;
    }
    function end(w, blocked) {
      over = true; var a = sum(yours), c = sum(cpu); if (blocked) w = a < c ? 0 : c < a ? 1 : -1;
      if (w === 0) wa++; else if (w === 1) wc++;
      document.getElementById('g-a').textContent = wa; document.getElementById('g-c').textContent = wc;
      msg.className = 'pf-xo-msg ' + (w === 0 ? 'x' : w === 1 ? 'o' : '');
      msg.textContent = w === 0 ? (ar ? 'كسبت الجولة! 🎉' : 'You win the round! 🎉') : w === 1 ? (ar ? 'الكمبيوتر كسب الجولة' : 'Computer wins the round') : (ar ? 'تعادل' : 'Draw');
      render();
    }
    function after(p) {
      if (!(p === 0 ? yours : cpu).length) return end(p, false);
      turn = 1 - p; sel = null; pass = 0; step();
    }
    function step() {
      if (over) return render();
      if (turn === 0) { msg.className = 'pf-xo-msg'; msg.textContent = ar ? 'دورك' : 'Your turn'; render(); return; }
      msg.className = 'pf-xo-msg o'; msg.textContent = ar ? 'دور الكمبيوتر…' : 'Computer…'; render();
      T(function () {
        if (over) return;
        var pl = cpu.filter(can);
        while (!pl.length && yard.length) { cpu.push(yard.pop()); pl = cpu.filter(can); }
        if (!pl.length) { pass++; if (pass >= 2) return end(-1, true); turn = 0; msg.textContent = ar ? 'الكمبيوتر عدّى' : 'Computer passes'; render(); if (!yours.some(can) && !yard.length) { pass++; if (pass >= 2) return end(-1, true); turn = 1; T(step, 600); } return; }
        pl.sort(function (a, b) { return (b[0] + b[1]) - (a[0] + a[1]) || (b[0] === b[1]) - (a[0] === a[1]); });
        var t = pl[0]; cpu.splice(cpu.indexOf(t), 1);
        var e = ends(), side = !e ? 1 : fits(t, 1) ? 1 : 0; place(t, side); pass = 0; after(1);
      }, 800);
    }
    function play(i, side) {
      var t = yours[i]; if (!t || !can(t) || over || turn !== 0) return; yours.splice(i, 1); place(t, side); pass = 0; sel = null; after(0);
    }
    hd.addEventListener('click', function (e) {
      var b = e.target.closest('button.pf-dm-b'); if (!b || b.disabled) return; var i = +b.getAttribute('data-i'), t = yours[i];
      if (!chain.length || (fits(t, 0) && fits(t, 1) && ends()[0] !== ends()[1])) { if (!chain.length) return play(i, 1); sel = i; return render(); }
      play(i, fits(t, 1) ? 1 : 0);
    });
    ac.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.getAttribute('data-s') !== null && sel !== null) play(sel, +b.getAttribute('data-s'));
      else if (b.getAttribute('data-d')) { if (yard.length) { yours.push(yard.pop()); render(); } }
      else if (b.getAttribute('data-p')) { pass++; if (pass >= 2) return end(-1, true); turn = 1; step(); }
    });
    function start() {
      tms.forEach(clearTimeout); tms = []; var all = []; for (var a = 0; a <= 6; a++) for (var b = a; b <= 6; b++) all.push([a, b]);
      for (var i = all.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = all[i]; all[i] = all[j]; all[j] = t; }
      yours = all.slice(0, 7); cpu = all.slice(7, 14); yard = all.slice(14); chain = []; over = false; sel = null; pass = 0;
      function hi(h) { var m = -1; h.forEach(function (t) { if (t[0] === t[1] && t[0] > m) m = t[0]; }); return m; }
      turn = hi(yours) >= hi(cpu) ? 0 : 1; if (hi(yours) < 0 && hi(cpu) < 0) turn = sum(yours) >= sum(cpu) ? 0 : 1;
      step();
    }
    document.getElementById('g-go').addEventListener('click', start);
    window.pfGStop = function () { tms.forEach(clearTimeout); tms = []; over = true; };
    start();
  };
})();
