(function () {
  window.pfG = window.pfG || {};
  window.pfG.rps = function (root) {
    var L = window.pfLB, ar = L.ar(), I = ['✊', '✋', '✌️'], NM = ar ? ['حجر', 'ورقة', 'مقص'] : ['Rock', 'Paper', 'Scissors'];
    var sh = L.shell(root, 'rps', '<div class="pf-g-top"><span>' + (ar ? 'سلسلة الفوز' : 'Streak') + ' <b id="g-s">0</b></span><span>' + (ar ? 'أفضل سلسلة' : 'Best streak') + ' <b id="g-b">0</b></span></div><div class="pf-rps-show" id="g-sh" dir="ltr"><span>❔</span><em>VS</em><span>❔</span></div><div class="pf-xo-msg" id="g-m">' + (ar ? 'اختار' : 'Pick one') + '</div><div class="pf-rps-btns" dir="ltr">' + I.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + x + '<small>' + NM[i] + '</small></button>'; }).join('') + '</div>');
    var s = 0, b = 0, w = 0, d = 0, l = 0;
    root.querySelector('.pf-rps-btns').addEventListener('click', function (e) {
      var bt = e.target.closest('button'); if (!bt) return; var me = +bt.getAttribute('data-i'), pc = Math.floor(Math.random() * 3), r = (me - pc + 3) % 3, m = document.getElementById('g-m');
      document.getElementById('g-sh').innerHTML = '<span>' + I[me] + '</span><em>VS</em><span>' + I[pc] + '</span>';
      if (r === 0) { m.textContent = ar ? 'تعادل' : 'Draw'; m.className = 'pf-xo-msg'; }
      else if (r === 1) { s++; m.textContent = ar ? 'كسبت! 🎉' : 'You win! 🎉'; m.className = 'pf-xo-msg x'; if (s > b) b = s; }
      else { var was = s; s = 0; m.textContent = ar ? 'الكمبيوتر كسب' : 'Computer wins'; m.className = 'pf-xo-msg o'; if (was > 0) sh.end(b); }
      document.getElementById('g-s').textContent = s; document.getElementById('g-b').textContent = b;
    });
    window.pfGStop = function () {};
  };
})();
