(function () {
  window.pfG = window.pfG || {};
  window.pfG.mole = function (root) {
    var L = window.pfLB, ar = L.ar();
    var sh = L.shell(root, 'mole', '<div class="pf-g-top"><span>' + (ar ? 'النتيجة' : 'Score') + ' <b id="g-s">0</b></span><span>' + (ar ? 'الوقت' : 'Time') + ' <b id="g-t">30</b></span></div><div class="pf-mole" id="g-bd" dir="ltr">' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return '<button type="button" class="h" data-i="' + i + '"><i></i></button>'; }).join('') + '</div><button type="button" class="pf-mm-btn pf-xo-again" id="g-go">' + (ar ? 'ابدأ' : 'Start') + '</button>');
    var hs = [].slice.call(root.querySelectorAll('.h')), sEl = document.getElementById('g-s'), tEl = document.getElementById('g-t'), go = document.getElementById('g-go');
    var score = 0, left = 30, up = -1, run = false, tm1, tm2, tm3;
    function clear() { clearInterval(tm1); clearTimeout(tm2); clearTimeout(tm3); }
    function hide() { if (up > -1) hs[up].classList.remove('up'); up = -1; }
    function pop() {
      if (!run) return; hide(); var n; do { n = Math.floor(Math.random() * 9); } while (n === up);
      up = n; hs[n].classList.add('up'); tm3 = setTimeout(function () { hide(); tm2 = setTimeout(pop, 150); }, Math.max(380, 800 - score * 12));
    }
    function end() { run = false; clear(); hide(); go.style.display = ''; go.textContent = ar ? 'جولة جديدة' : 'Play again'; sh.end(score); }
    function start() { clear(); score = 0; left = 30; run = true; sEl.textContent = 0; tEl.textContent = 30; go.style.display = 'none'; document.getElementById('pf-lbs').innerHTML = ''; tm1 = setInterval(function () { left--; tEl.textContent = left; if (left <= 0) end(); }, 1000); pop(); }
    root.querySelector('.pf-mole').addEventListener('click', function (e) { var b = e.target.closest('.h'); if (!b || !run) return; if (+b.getAttribute('data-i') === up) { score++; sEl.textContent = score; hide(); clearTimeout(tm3); tm2 = setTimeout(pop, 120); } });
    go.addEventListener('click', start);
    window.pfGStop = function () { run = false; clear(); };
  };
})();
