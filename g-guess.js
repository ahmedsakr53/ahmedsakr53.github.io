(function () {
  window.pfG = window.pfG || {};
  window.pfG.guess = function (root) {
    var L = window.pfLB, ar = L.ar();
    var sh = L.shell(root, 'guess', '<p class="pf-g-hint">' + (ar ? 'فكرت في رقم من 1 لـ 100. خمّنه بأقل محاولات.' : 'I picked a number from 1 to 100. Guess it in few tries.') + '</p><div class="pf-xo-msg" id="g-m">&nbsp;</div><div class="pf-lb-row" dir="ltr"><input type="number" inputmode="numeric" min="1" max="100" id="g-i" placeholder="1 - 100"><button type="button" class="pf-lb-go" id="g-ok">' + (ar ? 'خمّن' : 'Guess') + '</button></div><div class="pf-g-top"><span>' + (ar ? 'المحاولات' : 'Tries') + ' <b id="g-t">0</b></span></div><button type="button" class="pf-mm-btn pf-xo-again" id="g-go">' + (ar ? 'جولة جديدة' : 'New game') + '</button>');
    var n, t, done, m = document.getElementById('g-m'), inp = document.getElementById('g-i');
    function start() { n = 1 + Math.floor(Math.random() * 100); t = 0; done = false; m.textContent = ar ? 'ابدأ التخمين' : 'Start guessing'; m.className = 'pf-xo-msg'; inp.value = ''; document.getElementById('g-t').textContent = 0; document.getElementById('pf-lbs').innerHTML = ''; }
    function ok() {
      if (done) return; var v = parseInt(inp.value, 10); if (!(v >= 1 && v <= 100)) { m.textContent = ar ? 'اكتب رقم من 1 لـ 100' : 'Enter 1 to 100'; return; }
      t++; document.getElementById('g-t').textContent = t; inp.value = '';
      if (v === n) { done = true; m.textContent = (ar ? 'برافو! الرقم ' : 'Yes! It was ') + n; m.className = 'pf-xo-msg x'; sh.end(Math.max(10, (11 - t) * 10)); }
      else { m.textContent = v < n ? (ar ? 'أعلى ⬆️' : 'Higher ⬆️') : (ar ? 'أقل ⬇️' : 'Lower ⬇️'); m.className = 'pf-xo-msg o'; }
    }
    document.getElementById('g-ok').addEventListener('click', ok);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') ok(); });
    document.getElementById('g-go').addEventListener('click', start);
    window.pfGStop = function () {};
    start();
  };
})();
