/* College memes. Loaded only when a visitor opens #/memes. Everything is drawn on a canvas in the visitor's browser: no images, no server. */
(function () {
  var W = 1080, H = 1080, STRIP = 58;
  var FONT = '"Cairo","IBM Plex Sans Arabic",sans-serif';
  var MARK = 'اصنع ميم، القوالب جاهزة 👉 ahmedsakr53.github.io';
  var SKIN = '#f2c9a0';

  function rr(c, x, y, w, h, r, fill, stroke, lw) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 6; c.stroke(); }
  }
  function ci(c, x, y, r, fill, stroke, lw) {
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 6; c.stroke(); }
  }
  function ln(c, x1, y1, x2, y2, col, lw) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.stroke(); }
  function poly(c, pts, fill) { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (var i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath(); c.fillStyle = fill; c.fill(); }

  function face(c, x, y, r, mood) {
    ci(c, x, y, r, SKIN, '#3a2a1a', 6);
    var ex = r * 0.38, ey = y - r * 0.1, k = '#2b1d12';
    if (mood === 'panic') {
      ci(c, x - ex, ey, r * 0.24, '#fff', k, 4); ci(c, x + ex, ey, r * 0.24, '#fff', k, 4);
      ci(c, x - ex, ey, r * 0.08, k); ci(c, x + ex, ey, r * 0.08, k);
      c.beginPath(); c.ellipse(x, y + r * 0.5, r * 0.2, r * 0.3, 0, 0, 7); c.fillStyle = '#7a1f1f'; c.fill();
    } else if (mood === 'sleepy') {
      c.strokeStyle = k; c.lineWidth = 6; c.lineCap = 'round';
      c.beginPath(); c.arc(x - ex, ey, r * 0.17, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
      c.beginPath(); c.arc(x + ex, ey, r * 0.17, 0.1 * Math.PI, 0.9 * Math.PI); c.stroke();
      c.beginPath(); c.ellipse(x, y + r * 0.5, r * 0.12, r * 0.15, 0, 0, 7); c.fillStyle = '#7a1f1f'; c.fill();
      c.strokeStyle = 'rgba(90,60,120,.45)'; c.lineWidth = 8;
      c.beginPath(); c.arc(x - ex, ey + r * 0.2, r * 0.17, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
      c.beginPath(); c.arc(x + ex, ey + r * 0.2, r * 0.17, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
    } else if (mood === 'happy') {
      c.strokeStyle = k; c.lineWidth = 6; c.lineCap = 'round';
      c.beginPath(); c.arc(x - ex, ey + r * 0.08, r * 0.17, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
      c.beginPath(); c.arc(x + ex, ey + r * 0.08, r * 0.17, 1.1 * Math.PI, 1.9 * Math.PI); c.stroke();
      c.beginPath(); c.arc(x, y + r * 0.25, r * 0.42, 0.1 * Math.PI, 0.9 * Math.PI); c.fillStyle = '#7a1f1f'; c.fill();
    } else if (mood === 'smug') {
      ci(c, x - ex, ey, r * 0.15, '#fff', k, 4); ci(c, x + ex, ey, r * 0.15, '#fff', k, 4);
      ci(c, x - ex + 4, ey + 4, r * 0.06, k); ci(c, x + ex + 4, ey + 4, r * 0.06, k);
      ln(c, x - ex - r * 0.2, ey - r * 0.05, x - ex + r * 0.2, ey - r * 0.05, SKIN, 10);
      ln(c, x + ex - r * 0.2, ey - r * 0.05, x + ex + r * 0.2, ey - r * 0.05, SKIN, 10);
      ln(c, x - ex - r * 0.2, ey - r * 0.05, x - ex + r * 0.2, ey - r * 0.05, k, 5);
      ln(c, x + ex - r * 0.2, ey - r * 0.05, x + ex + r * 0.2, ey - r * 0.05, k, 5);
      c.strokeStyle = k; c.lineWidth = 6; c.beginPath(); c.moveTo(x - r * 0.3, y + r * 0.5); c.quadraticCurveTo(x + r * 0.1, y + r * 0.62, x + r * 0.4, y + r * 0.38); c.stroke();
    } else {
      ci(c, x - ex, ey, r * 0.09, k); ci(c, x + ex, ey, r * 0.09, k);
      ln(c, x - r * 0.25, y + r * 0.5, x + r * 0.25, y + r * 0.5, k, 6);
    }
  }
  function person(c, x, y, r, mood, shirt, arms) {
    var bx = x - r * 0.95, by = y + r * 0.9, bw = r * 1.9, bh = r * 2.4;
    if (arms === 'up') { ln(c, x - r * 0.8, by + r * 0.4, x - r * 1.7, y - r * 1.1, SKIN, r * 0.34); ln(c, x + r * 0.8, by + r * 0.4, x + r * 1.7, y - r * 1.1, SKIN, r * 0.34); }
    if (arms === 'head') { ln(c, x - r * 0.8, by + r * 0.5, x - r * 1.0, y - r * 0.1, SKIN, r * 0.34); ln(c, x + r * 0.8, by + r * 0.5, x + r * 1.0, y - r * 0.1, SKIN, r * 0.34); }
    rr(c, bx, by, bw, bh, r * 0.5, shirt, '#3a2a1a', 6);
    face(c, x, y, r, mood);
    c.fillStyle = '#3a2a1a'; c.beginPath(); c.arc(x, y - r * 0.55, r * 1.02, Math.PI * 1.08, Math.PI * 1.92); c.lineTo(x + r * 0.9, y - r * 0.5); c.lineTo(x - r * 0.9, y - r * 0.5); c.closePath(); c.fill();
  }
  function seeded(n) { var s = n; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  var T = [
    { id: 'doc', ar: 'الدكتور غاب', en: 'The doctor is absent', top: 'الدكتور مجاش المحاضرة', bottom: 'الطلبة:', draw: function (c) {
      c.fillStyle = '#dfe9f3'; c.fillRect(0, 0, W, H); c.fillStyle = '#c9b79c'; c.fillRect(0, 700, W, 380);
      rr(c, 160, 120, 760, 380, 18, '#2f5d50', '#6b4a2b', 16); ln(c, 230, 440, 520, 440, 'rgba(255,255,255,.5)', 6);
      c.fillStyle = 'rgba(255,255,255,.8)'; c.font = '700 150px ' + FONT; c.textAlign = 'center'; c.fillText('?', 540, 380);
      rr(c, 380, 540, 320, 200, 14, '#8a5a35', '#4a2f19', 6); rr(c, 450, 600, 180, 130, 8, '#a8703f');
      [[200, '#e76f51'], [440, '#2a9d8f'], [660, '#e9c46a'], [880, '#6a8caf']].forEach(function (p) { person(c, p[0], 810, 70, 'happy', p[1], 'up'); });
    } },
    { id: 'sec8', ar: 'سكشن ٨ الصبح', en: '8 AM section', top: 'سكشن الساعة ٨ الصبح', bottom: 'أنا والمنبه:', draw: function (c) {
      c.fillStyle = '#ffe9c9'; c.fillRect(0, 0, W, H);
      ci(c, 380, 330, 70, '#e63946', '#7a1f27', 8); ci(c, 700, 330, 70, '#e63946', '#7a1f27', 8);
      ci(c, 540, 580, 300, '#e63946', '#7a1f27', 12); ci(c, 540, 580, 255, '#fff', '#c9c9c9', 6);
      for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; ln(c, 540 + Math.sin(a) * 215, 580 - Math.cos(a) * 215, 540 + Math.sin(a) * 240, 580 - Math.cos(a) * 240, '#333', 8); }
      ln(c, 540, 580, 540 + Math.sin(Math.PI * 4 / 3) * 120, 580 - Math.cos(Math.PI * 4 / 3) * 120, '#222', 16); ln(c, 540, 580, 540, 580 - 190, '#222', 10); ci(c, 540, 580, 16, '#222');
      c.strokeStyle = '#222'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.arc(460, 640, 28, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); c.beginPath(); c.arc(620, 640, 28, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke();
      c.fillStyle = '#e76f51'; c.font = '700 90px ' + FONT; c.textAlign = 'center'; c.fillText('ZZZ', 850, 330);
    } },
    { id: 'drake', ar: 'مش مهمة / الامتحان', en: 'Not important / the exam', top: 'المحاضرة دي مش مهمة', bottom: 'الامتحان: سؤال كامل منها', zones: [[20, 250, 'top'], [545, 790, 'top']], draw: function (c) {
      c.fillStyle = '#e8f0ff'; c.fillRect(0, 0, W, 512); c.fillStyle = '#fff3e0'; c.fillRect(0, 512, W, 568); ln(c, 0, 512, W, 512, '#222', 8);
      person(c, 300, 390, 80, 'smug', '#2a9d8f', 'none');
      person(c, 300, 930, 80, 'panic', '#e76f51', 'head');
      c.save(); c.translate(780, 800); c.rotate(-0.12); rr(c, -170, -190, 340, 380, 8, '#fff', '#555', 6);
      for (var i = 0; i < 6; i++) ln(c, -130, -130 + i * 40, 130, -130 + i * 40, '#aaa', 6);
      c.fillStyle = '#e63946'; c.font = '700 150px ' + FONT; c.textAlign = 'center'; c.fillText('٠', 0, 140); c.restore();
      c.fillStyle = '#2a9d8f'; c.font = '700 110px ' + FONT; c.textAlign = 'center'; c.fillText('👍', 800, 400);
    } },
    { id: 'night', ar: 'رسم هندسة ٢ بالليل', en: 'Engineering drawing at 2 AM', top: 'رسم هندسة الساعة ٢ بالليل', bottom: 'التسليم الصبح', draw: function (c) {
      c.fillStyle = '#14213d'; c.fillRect(0, 0, W, H);
      rr(c, 700, 120, 260, 300, 10, '#0b1426', '#6b4a2b', 12); ci(c, 830, 230, 56, '#f4e9a8'); ci(c, 855, 215, 50, '#0b1426'); ci(c, 760, 170, 5, '#fff'); ci(c, 900, 320, 4, '#fff');
      c.fillStyle = '#6b4a2b'; c.fillRect(0, 800, W, 280);
      poly(c, [[200, 380], [330, 380], [440, 800], [90, 800]], 'rgba(255,230,120,.22)'); ln(c, 265, 360, 265, 700, '#bbb', 14); rr(c, 160, 320, 210, 70, 30, '#ffd166', '#a87c1a', 6);
      c.save(); c.translate(640, 760); c.rotate(-0.06); rr(c, -260, -170, 520, 260, 8, '#fff', '#555', 6);
      var r = seeded(7); c.strokeStyle = '#4a6fa5'; c.lineWidth = 5; for (var i = 0; i < 9; i++) { c.beginPath(); c.moveTo(-230 + r() * 440, -140 + r() * 200); c.lineTo(-230 + r() * 440, -140 + r() * 200); c.stroke(); }
      ci(c, 0, -30, 60, null, '#4a6fa5', 5); c.restore();
      person(c, 540, 560, 80, 'sleepy', '#6a8caf', 'none');
      rr(c, 820, 700, 90, 100, 12, '#fff', '#555', 6); ln(c, 855, 660, 845, 630, '#ddd', 8); ln(c, 885, 665, 895, 625, '#ddd', 8);
    } },
    { id: 'coffee', ar: 'بعد تالت قهوة', en: 'After the third coffee', top: 'أنا بعد تالت كوباية قهوة', bottom: 'المذاكرة قبل الامتحان بساعة', draw: function (c) {
      c.fillStyle = '#f1e0d0'; c.fillRect(0, 0, W, H);
      rr(c, 350, 330, 380, 440, 40, '#7b4b2a', '#3d2412', 10); c.beginPath(); c.arc(760, 520, 95, -1.3, 1.3); c.strokeStyle = '#3d2412'; c.lineWidth = 28; c.stroke();
      ci(c, 450, 520, 62, '#fff', '#222', 5); ci(c, 630, 520, 62, '#fff', '#222', 5); ci(c, 462, 510, 14, '#222'); ci(c, 618, 530, 14, '#222');
      c.beginPath(); c.ellipse(540, 660, 90, 50, 0, 0, 7); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = '#222'; c.lineWidth = 5; c.stroke();
      for (var i = 0; i < 5; i++) ln(c, 420 + i * 60, 665, 440 + i * 60, 690, '#222', 5);
      c.strokeStyle = '#c9b7a6'; c.lineWidth = 12; c.lineCap = 'round'; [420, 540, 660].forEach(function (x) { c.beginPath(); c.moveTo(x, 300); c.bezierCurveTo(x - 40, 250, x + 40, 210, x, 150); c.stroke(); });
      poly(c, [[170, 380], [230, 380], [195, 460], [250, 460], [150, 600], [175, 500], [130, 500]], '#ffd166'); poly(c, [[860, 300], [920, 300], [885, 380], [940, 380], [840, 520], [865, 420], [820, 420]], '#ffd166');
    } },
    { id: 'deadline', ar: 'التسليم النهاردة', en: 'Due today', top: 'الواجب: تسليم النهاردة', bottom: 'أنا من ساعة:', draw: function (c) {
      c.fillStyle = '#fff4e6'; c.fillRect(0, 0, W, H);
      var f = ['#ff6b35', '#ffb703', '#e63946'];
      for (var i = 0; i < 8; i++) { var x = 60 + i * 140; poly(c, [[x - 70, 1030], [x, 700 - (i % 3) * 60], [x + 70, 1030]], f[i % 3]); }
      c.save(); c.translate(540, 520); c.rotate(0.05); rr(c, -230, -230, 460, 330, 10, '#fff', '#555', 6);
      c.fillStyle = '#e63946'; c.font = '700 70px ' + FONT; c.textAlign = 'center'; c.direction = 'rtl'; c.fillText('تسليم النهاردة', 0, -90);
      ln(c, -170, -40, 170, -40, '#bbb', 6); ln(c, -170, 10, 130, 10, '#bbb', 6); ln(c, -170, 60, 150, 60, '#bbb', 6); c.restore();
      person(c, 540, 810, 70, 'panic', '#2a9d8f', 'head');
    } },
    { id: 'win', ar: 'أنا لما أنجح', en: 'When I pass', top: 'أنا لما أشوف النتيجة', bottom: 'نجحت! 🎉', draw: function (c) {
      c.fillStyle = '#d7f5e3'; c.fillRect(0, 0, W, H);
      var r = seeded(3), cols = ['#e63946', '#ffb703', '#2a9d8f', '#4a6fa5', '#9b5de5'];
      for (var i = 0; i < 70; i++) { c.save(); c.translate(r() * W, r() * 800); c.rotate(r() * 6); c.fillStyle = cols[i % 5]; c.fillRect(-8, -14, 16, 28); c.restore(); }
      person(c, 540, 500, 100, 'happy', '#e9c46a', 'up');
      rr(c, 470, 830, 140, 30, 6, '#8a5a35'); rr(c, 505, 780, 70, 55, 6, '#8a5a35'); c.beginPath(); c.moveTo(450, 640); c.lineTo(630, 640); c.lineTo(600, 780); c.lineTo(480, 780); c.closePath(); c.fillStyle = '#ffd166'; c.fill(); c.strokeStyle = '#a87c1a'; c.lineWidth = 6; c.stroke();
    } }
  ];
  T.forEach(function (t) { if (!t.zones) t.zones = [[24, 250, 'top'], [770, 1010 - 0, 'bottom']]; });

  function wrap(c, text, maxW) {
    var words = String(text).replace(/\s+/g, ' ').trim().split(' '), lines = [], cur = '';
    words.forEach(function (w) { var test = cur ? cur + ' ' + w : w; if (cur && c.measureText(test).width > maxW) { lines.push(cur); cur = w; } else cur = test; });
    if (cur) lines.push(cur); return lines;
  }
  function caption(c, text, zone) {
    if (!text || !String(text).trim()) return;
    var y1 = zone[0], y2 = Math.min(zone[1], H - STRIP - 14), size = 84, lines, lh;
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    for (; size >= 36; size -= 4) {
      c.font = '700 ' + size + 'px ' + FONT; lines = wrap(c, text, W - 120); lh = size * 1.3;
      if (lines.length * lh <= (y2 - y1) && lines.length <= 4) break;
    }
    var total = lines.length * lh, startY = zone[2] === 'bottom' ? y2 - total : y1;
    c.lineJoin = 'round'; c.lineWidth = Math.max(8, size / 6); c.strokeStyle = '#000'; c.fillStyle = '#fff';
    lines.forEach(function (l, i) { var y = startY + lh * (i + 0.85); c.strokeText(l, W / 2, y); c.fillText(l, W / 2, y); });
  }
  function strip(c) {
    c.fillStyle = 'rgba(0,0,0,.62)'; c.fillRect(0, H - STRIP, W, STRIP);
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff';
    var s = 30; c.font = '600 ' + s + 'px ' + FONT; while (c.measureText(MARK).width > W - 60 && s > 16) { s -= 2; c.font = '600 ' + s + 'px ' + FONT; }
    c.fillText(MARK, W / 2, H - STRIP / 2 + 2);
  }
  function paint(c, t, top, bottom) {
    c.save(); c.clearRect(0, 0, W, H); t.draw(c); c.restore();
    caption(c, top, t.zones[0]); caption(c, bottom, t.zones[1]); strip(c);
  }

  function L(ar) { return ar ? {
    title: 'ميمز الكلية', sub: 'اختار قالب، اكتب كلامك، ونزّل الميم أو شاركه. كله على موبايلك، من غير تسجيل.',
    pick: 'القوالب', top: 'النص الأول', bottom: 'النص التاني', dl: 'نزّل الصورة', sh: 'شارك', note: 'لو الشير مش متاح عندك بتتنزل الصورة وتشاركها يدوي.', back: 'رجوع'
  } : {
    title: 'College memes', sub: 'Pick a template, write your text, then download or share. It all runs on your phone, no sign-up.',
    pick: 'Templates', top: 'First text', bottom: 'Second text', dl: 'Download image', sh: 'Share', note: 'If sharing is not available on your device, the image downloads so you can share it yourself.', back: 'Back'
  }; }

  function render(root) {
    var ar = document.documentElement.lang !== 'en', s = L(ar), cur = T[0];
    root.innerHTML = '<div class="pf-pagehead"><div class="pf-eyebrow">MEMES</div><h2 class="pf-h2">' + s.title + '</h2></div><p class="pf-para">' + s.sub + '</p>' +
      '<div class="pf-mm-prev"><canvas id="pf-mm-c" width="' + W + '" height="' + H + '" aria-label="meme"></canvas></div>' +
      '<h3 class="pf-h3">' + s.pick + '</h3><div class="pf-mm-list" id="pf-mm-list"></div>' +
      '<label class="pf-mm-lab" for="pf-mm-t1">' + s.top + '</label><textarea id="pf-mm-t1" class="pf-mm-in" rows="2" maxlength="120"></textarea>' +
      '<label class="pf-mm-lab" for="pf-mm-t2">' + s.bottom + '</label><textarea id="pf-mm-t2" class="pf-mm-in" rows="2" maxlength="120"></textarea>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-mm-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-mm-sh">' + s.sh + '</button></div>' +
      '<p class="pf-mm-note">' + s.note + '</p>';
    var cv = document.getElementById('pf-mm-c'), ctx = cv.getContext('2d'), t1 = document.getElementById('pf-mm-t1'), t2 = document.getElementById('pf-mm-t2'), raf = 0;
    function redraw() { raf = 0; paint(ctx, cur, t1.value, t2.value); }
    function sched() { if (!raf) raf = requestAnimationFrame(redraw); }
    var list = document.getElementById('pf-mm-list');
    T.forEach(function (t, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'pf-mm-th' + (i === 0 ? ' on' : '');
      var c = document.createElement('canvas'); c.width = 180; c.height = 180; b.appendChild(c);
      var sp = document.createElement('span'); sp.textContent = ar ? t.ar : t.en; b.appendChild(sp);
      var cc = c.getContext('2d'); cc.save(); cc.scale(180 / W, 180 / H); t.draw(cc); cc.restore();
      b.addEventListener('click', function () {
        cur = t; [].forEach.call(list.children, function (x) { x.classList.remove('on'); }); b.classList.add('on');
        t1.value = t.top; t2.value = t.bottom; sched();
      });
      list.appendChild(b);
    });
    t1.value = cur.top; t2.value = cur.bottom;
    t1.addEventListener('input', sched); t2.addEventListener('input', sched);
    function blob(cb) { cv.toBlob(cb, 'image/png'); }
    function save() { blob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'meme.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); }); }
    document.getElementById('pf-mm-dl').addEventListener('click', save);
    document.getElementById('pf-mm-sh').addEventListener('click', function () {
      blob(function (b) {
        var f; try { f = new File([b], 'meme.png', { type: 'image/png' }); } catch (e) { f = null; }
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f] }).catch(function () {});
        else save();
      });
    });
    var ready = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('700 60px Cairo', 'ابج'), document.fonts.load('600 30px Cairo', 'ابج')]).catch(function () {}) : Promise.resolve();
    ready.then(function () { redraw(); });
    redraw();
  }
  window.pfMemes = { render: render };
})();
