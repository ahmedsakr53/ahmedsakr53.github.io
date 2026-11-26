/* Shared game shell + opt-in leaderboard. Loaded only when a game or the board opens. */
(function () {
  var W = 'https://saqr-ahmed.ahmedsakr5326.workers.dev';
  var GN = { xo: ['إكس أو', 'X O'], snake: ['الثعبان', 'Snake'], mem: ['لعبة الذاكرة', 'Memory'], g2048: ['2048', '2048'], mole: ['طرق الخلد', 'Whack-a-mole'], rps: ['حجر ورق مقص', 'Rock Paper Scissors'], guess: ['تخمين الرقم', 'Guess the number'] };
  function ar() { return document.documentElement.lang !== 'en'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pid() { var v = null; try { v = localStorage.getItem('pf-pid'); if (!v) { v = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); localStorage.setItem('pf-pid', v); } } catch (e) { v = 'x' + Math.random().toString(36).slice(2, 10); } return v; }
  function lsGet(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  var cache = null, cacheAt = 0;
  function load(cb) {
    if (cache && Date.now() - cacheAt < 30000) return cb(cache);
    var done = false;
    fetch(W + '/games/lb').then(function (r) { return r.ok ? r.json() : null; }).then(function (d) { if (done) return; done = true; if (d && d.g) { cache = d.g; cacheAt = Date.now(); } cb(cache || {}); }).catch(function () { if (!done) { done = true; cb(cache || {}); } });
  }
  function list(items) {
    if (!items || !items.length) return '<p class="pf-lb-empty">' + (ar() ? 'لسه مفيش نتايج. كن أول واحد.' : 'No scores yet. Be the first.') + '</p>';
    return '<ol class="pf-lb-list">' + items.map(function (x, i) { return '<li><span>' + (i + 1) + '</span><em>' + esc(x.n) + '</em><b>' + x.s + '</b></li>'; }).join('') + '</ol>';
  }
  function top(g, el) { if (!el) return; load(function (all) { if (el.isConnected) el.innerHTML = '<h3>' + (ar() ? 'المتصدرين' : 'Leaderboard') + '</h3>' + list(all[g]); }); }
  function all(el, games) {
    load(function (d) {
      if (!el.isConnected) return;
      var h = '';
      games.forEach(function (g) { var n = GN[g]; h += '<div class="pf-lb-g"><h4>' + (ar() ? n[0] : n[1]) + '</h4>' + list(d[g]) + '</div>'; });
      el.innerHTML = h;
    });
  }
  function offer(el, g, score) {
    if (!el) return;
    var key = 'pf-best-' + g, best = parseInt(lsGet(key) || '0', 10);
    if (score <= 0 || score <= best) { el.innerHTML = ''; return; }
    var nm = lsGet('pf-lbname');
    el.innerHTML = '<div class="pf-lb-offer"><p>' + (ar() ? 'نتيجتك ' + score + '. عايز تدخل المتصدرين؟ (اسمك الأول بس، اختياري)' : 'Score ' + score + '. Join the leaderboard? (first name only, optional)') + '</p>' +
      '<div class="pf-lb-row"><input type="text" maxlength="12" autocomplete="off" value="' + esc(nm) + '" placeholder="' + (ar() ? 'الاسم الأول' : 'First name') + '"><button type="button" class="pf-lb-go">' + (ar() ? 'سجّل' : 'Submit') + '</button></div><small class="pf-lb-st"></small></div>';
    var inp = el.querySelector('input'), st = el.querySelector('.pf-lb-st'), btn = el.querySelector('.pf-lb-go');
    btn.addEventListener('click', function () {
      var n = inp.value.trim().split(/\s+/)[0].replace(/[^\p{L}]/gu, '').slice(0, 12);
      if (n.length < 2) { st.textContent = ar() ? 'اكتب اسمك الأول (حرفين على الأقل)' : 'Enter a first name (2+ letters)'; return; }
      btn.disabled = true; lsSet('pf-lbname', n);
      fetch(W + '/games/score', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ g: g, s: score, n: n, i: pid() }) })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (d) { if (d && d.ok) { lsSet(key, String(score)); cache = null; st.textContent = ar() ? 'اتسجلت 🎉' : 'Saved 🎉'; var t = document.getElementById('pf-lbt'); if (t) top(g, t); } else { btn.disabled = false; st.textContent = ar() ? 'مقدرناش نسجّلها دلوقتي' : 'Could not save right now'; } })
        .catch(function () { btn.disabled = false; st.textContent = ar() ? 'مقدرناش نسجّلها دلوقتي' : 'Could not save right now'; });
    });
  }
  function shell(root, g, body) {
    var n = GN[g];
    root.innerHTML = '<div class="pf-pagehead"><div class="pf-eyebrow">GAME</div><h2 class="pf-h2">' + (ar() ? n[0] : n[1]) + '</h2></div>' +
      '<div class="pf-xo pf-g"><a class="pf-g-exit" href="#/fun">' + (ar() ? '✕ خروج' : '✕ Exit') + '</a>' + body + '<div id="pf-lbs"></div><div class="pf-lb" id="pf-lbt"></div>' +
      '<a class="pf-xo-back" href="#/fun">' + (ar() ? 'رجوع للألعاب' : 'Back to games') + '</a></div>';
    top(g, document.getElementById('pf-lbt'));
    return { end: function (s) { offer(document.getElementById('pf-lbs'), g, s); } };
  }
  function swipe(el, cb) {
    var sx, sy;
    el.addEventListener('touchstart', function (e) { var t = e.touches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) { var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return; cb(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'r' : 'l') : (dy > 0 ? 'd' : 'u')); }, { passive: true });
  }
  window.pfLB = { shell: shell, top: top, all: all, ar: ar, esc: esc, swipe: swipe, names: GN };
  window.pfG = window.pfG || {};
})();
