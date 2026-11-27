/* Memes. Loaded only when a visitor opens #/memes. Template images load lazily, text is drawn on a canvas in the visitor's browser: no server. */
(function () {
  var CW = 1080, STRIP = 58;
  var FONT = '"Cairo","IBM Plex Sans Arabic",sans-serif';
  var MARK = 'اصنع ميم، القوالب جاهزة 👉 ahmedsakr53.github.io';
  // f: [x, y, w, h, color, angle, default text]  (fractions of the image area; color w = white with outline, k = black)
  var T = [
    { id: 'drake', ar: 'يرفض / يوافق', en: 'Reject / approve', w: 446, h: 698, half: true, f: [[0.5, 0, 0.5, 0.5, 'k', 0, 'أبدأ بدري'], [0.5, 0.5, 0.5, 0.5, 'k', 0, 'أأجّل لآخر لحظة']] },
    { id: 'gb', ar: 'المخ المتوسع', en: 'Expanding brain', w: 600, h: 848, f: [[0, 0, 0.49, 0.245, 'k', 0, 'أرتب يومي'], [0, 0.255, 0.49, 0.246, 'k', 0, 'أعمل قايمة مهام'], [0, 0.51, 0.49, 0.224, 'k', 0, 'أظبط المنبّه'], [0, 0.746, 0.49, 0.255, 'k', 0, 'أنام وأتوكل']] },
    { id: 'db', ar: 'الشاب والبنت', en: 'Distracted boyfriend', w: 800, h: 533, f: [[0.12, 0.7, 0.325, 0.1, 'w', 0, 'النوم'], [0.55, 0.45, 0.175, 0.1, 'w', 0, 'أنا'], [0.74, 0.66, 0.2, 0.1, 'w', 0, 'الشغل']] },
    { id: 'fine', ar: 'كله تمام', en: 'This is fine', w: 640, h: 621, f: [[0, 0, 1, 0.2, 'w', 0, 'المدير: التسليم بكره'], [0, 0.8, 1, 0.2, 'w', 0, 'أنا: كله تمام']] },
    { id: 'ds', ar: 'الاتنين زراير', en: 'Two buttons', w: 458, h: 684, f: [[0.097, 0.108, 0.32, 0.095, 'k', 12.5, 'أشتغل'], [0.467, 0.069, 0.23, 0.09, 'k', 10.5, 'أنام'], [0.04, 0.82, 0.92, 0.15, 'w', 0, 'أنا الساعة ٢ بالليل']] },
    { id: 'woman-cat', ar: 'الست والقطة', en: 'Woman yelling at cat', w: 680, h: 438, f: [[0, 0, 0.5, 0.22, 'k', 0, 'أنت: الموضوع بسيط'], [0.5, 0, 0.5, 0.22, 'k', 0, 'أنا: ده كان غريب']] },
    { id: 'spiderman', ar: 'سبايدرمان بيشاور', en: 'Spider-Man pointing', w: 800, h: 573, f: [[0.05, 0, 0.45, 0.15, 'w', 0, 'أنا'], [0.5, 0.85, 0.45, 0.15, 'w', 0, 'أنا بعد ساعة']] },
    { id: 'pooh', ar: 'ويني الشيك', en: 'Tuxedo Pooh', w: 900, h: 540, f: [[0.5, 0, 0.5, 0.5, 'k', 0, 'أخلص بدري'], [0.5, 0.5, 0.5, 0.5, 'k', 0, 'أخلص آخر دقيقة بالدعاء']] },
    { id: 'gru', ar: 'خطة جرو', en: "Gru's plan", w: 800, h: 512, f: [[0.275, 0.2, 0.2075, 0.2, 'k', 0, 'أقرر أبدأ'], [0.78, 0.2, 0.205, 0.2, 'k', 0, 'أفتح الشغل'], [0.28, 0.7, 0.205, 0.2, 'k', 0, 'أنام'], [0.78, 0.7, 0.205, 0.2, 'k', 0, 'أصحى مصدوم']] },
    { id: 'cmm', ar: 'غيّر رأيي', en: 'Change my mind', w: 800, h: 636, f: [[0.38, 0.45, 0.4, 0.2, 'k', 14, 'النوم بدري أحسن من السهر']] },
    { id: 'os', ar: 'لا أحد يستطيع ببساطة', en: 'One does not simply', w: 568, h: 335, f: [[0, 0, 1, 0.2, 'w', 0, 'لا أحد يستطيع ببساطة'], [0, 0.8, 1, 0.2, 'w', 0, 'يبدأ المذاكرة من أول الترم']] },
    { id: 'mock', ar: 'سبونج بوب الساخر', en: 'Mocking SpongeBob', w: 502, h: 353, f: [[0, 0, 1, 0.2, 'w', 0, 'أنا: هذاكر بكره'], [0, 0.8, 1, 0.2, 'w', 0, 'أنا: هذاكر بكره']] },
    { id: 'disaster', ar: 'البنت والحريق', en: 'Disaster girl', w: 500, h: 375, f: [[0, 0, 1, 0.2, 'w', 0, 'الكل بيجري من الحريق'], [0, 0.8, 1, 0.2, 'w', 0, 'وأنا لسه بخلص تعديل الـ CSS']] },
    { id: 'slap', ar: 'باتمان بيضرب روبن', en: 'Batman slapping Robin', w: 400, h: 387, f: [[0, 0, 1, 0.2, 'w', 0, 'أنا: أنام بدري'], [0, 0.8, 1, 0.2, 'w', 0, 'السهر: لا']] },
    { id: 'blb', ar: 'براين النحس', en: 'Bad Luck Brian', w: 475, h: 562, f: [[0, 0, 1, 0.2, 'w', 0, 'يقرر يبدأ الدايت'], [0, 0.8, 1, 0.2, 'w', 0, 'يوم الجمعة الفطار فول وطعمية']] },
    { id: 'harold', ar: 'هارولد المبتسم', en: 'Hide the Pain Harold', w: 480, h: 601, f: [[0, 0, 1, 0.2, 'w', 0, 'يقولوا الكود شغال'], [0, 0.8, 1, 0.2, 'w', 0, 'وهو شغال بس على جهازي']] },
    { id: 'rollsafe', ar: 'فكّر بذكاء', en: 'Roll Safe', w: 640, h: 360, f: [[0, 0, 1, 0.2, 'w', 0, 'مش لازم أذاكر'], [0, 0.8, 1, 0.2, 'w', 0, 'لو مفيش امتحان']] },
    { id: 'aliens', ar: 'الفضائيين القدماء', en: 'Ancient aliens', w: 500, h: 436, f: [[0, 0, 1, 0.2, 'w', 0, 'مين بنى الأهرامات؟'], [0, 0.8, 1, 0.2, 'w', 0, 'أكيد مبرمج ما فيش إلا هو']] },
    { id: 'oprah', ar: 'أوبرا بتوزع', en: 'Oprah gives', w: 620, h: 464, f: [[0, 0, 1, 0.2, 'w', 0, 'أنت تاخد تاسك'], [0, 0.8, 1, 0.2, 'w', 0, 'وأنت تاخد تاسك والكل تاخد تاسك']] },
    { id: 'skel', ar: 'الهيكل المنتظر', en: 'Waiting skeleton', w: 298, h: 403, f: [[0, 0, 1, 0.2, 'w', 0, 'مستني الواي فاي'], [0, 0.8, 1, 0.2, 'w', 0, 'يرجع من أول وجديد']] },
    { id: 'fry', ar: 'فراي مش متأكد', en: 'Futurama Fry', w: 552, h: 414, f: [[0, 0, 1, 0.2, 'w', 0, 'مش متأكد لو النت ضعيف'], [0, 0.8, 1, 0.2, 'w', 0, 'ولا أنا بس اللي كسلان']] },
    { id: 'grandma', ar: 'الجدة والنت', en: 'Grandma and the internet', w: 640, h: 480, f: [[0, 0, 1, 0.2, 'w', 0, 'الجدة: هو النت ده بيشتغل إزاي؟'], [0, 0.8, 1, 0.2, 'w', 0, 'أنا: بالكابلات يا ستي']] },
    { id: 'skeptic', ar: 'الطفل المتشكك', en: 'Skeptical kid', w: 426, h: 426, f: [[0, 0, 1, 0.2, 'w', 0, 'بتقولي الـ build نجح'], [0, 0.8, 1, 0.2, 'w', 0, 'وأنا هصدق من غير ما أجرب؟']] },
    { id: 'yall', ar: 'في كمان منه؟', en: 'Got any more of that', w: 600, h: 471, f: [[0, 0, 1, 0.2, 'w', 0, 'خلصت التاسكات'], [0, 0.8, 1, 0.2, 'w', 0, 'في كمان شوية؟']] },
    { id: 'pawn', ar: 'أحسن سعر', en: 'Best I can do', w: 624, h: 352, f: [[0, 0, 1, 0.2, 'w', 0, 'تعمل الموقع في ساعة؟'], [0, 0.8, 1, 0.2, 'w', 0, 'أحسن سعر عندي يومين']] },
    { id: 'imag', ar: 'تخيّل', en: 'Imagination', w: 500, h: 366, f: [[0, 0, 1, 0.2, 'w', 0, 'تخيّل'], [0, 0.8, 1, 0.2, 'w', 0, 'نص صفحة الأدمن شغال من أول مرة']] }
  ];
  var cache = {};
  function loadImg(t) {
    if (cache[t.id]) return cache[t.id];
    cache[t.id] = new Promise(function (res) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = 'memes/' + t.id + '.webp?v=1'; });
    return cache[t.id];
  }
  function wrap(c, text, maxW) {
    var words = String(text).replace(/\s+/g, ' ').trim().split(' '), lines = [], cur = '';
    words.forEach(function (w) { var test = cur ? cur + ' ' + w : w; if (cur && c.measureText(test).width > maxW) { lines.push(cur); cur = w; } else cur = test; });
    if (cur) lines.push(cur); return lines;
  }
  function field(c, text, x, y, w, h, col, ang) {
    if (!text || !String(text).trim()) return;
    var size = 78, lines, lh;
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    for (; size >= 18; size -= 2) { c.font = '700 ' + size + 'px ' + FONT; lines = wrap(c, text, w - 16); lh = size * 1.28; if (lines.length * lh <= h - 6) { var ok = true; for (var i = 0; i < lines.length; i++) if (c.measureText(lines[i]).width > w - 10) ok = false; if (ok) break; } }
    var cx = x + w / 2, cy = y + h / 2, startY = -(lines.length * lh) / 2;
    c.save(); c.translate(cx, cy); if (ang) c.rotate(ang * Math.PI / 180);
    c.lineJoin = 'round';
    lines.forEach(function (l, i) { var yy = startY + lh * (i + 0.8); if (col === 'w') { c.lineWidth = Math.max(5, size / 6); c.strokeStyle = '#000'; c.strokeText(l, 0, yy); c.fillStyle = '#fff'; } else c.fillStyle = '#111'; c.fillText(l, 0, yy); });
    c.restore();
  }
  function size(t) { var iw = t.half ? CW / 2 : CW, sc = iw / t.w; return { sc: sc, ih: Math.round(t.h * sc), H: Math.round(t.h * sc) + STRIP }; }
  function paint(c, t, img, vals) {
    var s = size(t), iw = t.half ? CW / 2 : CW, ih = s.ih;
    c.save(); c.fillStyle = '#fff'; c.fillRect(0, 0, CW, s.H);
    if (img) c.drawImage(img, 0, 0, iw, ih);
    var areaW = t.half ? CW : CW;
    t.f.forEach(function (f, i) { field(c, vals[i], f[0] * areaW, f[1] * ih, f[2] * areaW, f[3] * ih, f[4], f[5]); });
    c.fillStyle = '#14161c'; c.fillRect(0, ih, CW, STRIP);
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff';
    var z = 30; c.font = '600 ' + z + 'px ' + FONT; while (c.measureText(MARK).width > CW - 60 && z > 16) { z -= 2; c.font = '600 ' + z + 'px ' + FONT; }
    c.fillText(MARK, CW / 2, ih + STRIP / 2 + 2);
    c.restore();
  }
  function L(ar) { return ar ? {
    title: 'ميمز', sub: 'اختار قالب مشهور، اكتب كلامك، ونزّل الميم أو شاركه. كله على موبايلك، من غير تسجيل.',
    pick: 'القوالب', field: 'النص', dl: 'نزّل الصورة', sh: 'شارك', note: 'لو الشير مش متاح عندك بتتنزل الصورة وتشاركها يدوي.'
  } : {
    title: 'Memes', sub: 'Pick a famous template, write your text, then download or share. It all runs on your phone, no sign-up.',
    pick: 'Templates', field: 'Text', dl: 'Download image', sh: 'Share', note: 'If sharing is not available on your device, the image downloads so you can share it yourself.'
  }; }

  function render(root) {
    var ar = document.documentElement.lang !== 'en', s = L(ar), mc = ((window.pfGamesCfg || {}).memes || {}), TT = T.filter(function (t) { return (mc.off || []).indexOf(t.id) < 0; }), cur = TT[0], curImg = null, raf = 0;
    root.innerHTML = '<a class="pf-g-exit" href="#/fun">' + (ar ? '✕ خروج' : '✕ Exit') + '</a><div class="pf-pagehead"><div class="pf-eyebrow">MEMES</div><h2 class="pf-h2">' + s.title + '</h2></div><p class="pf-para">' + s.sub + '</p>' +
      '<div class="pf-mm-prev"><canvas id="pf-mm-c" width="' + CW + '" height="800" aria-label="meme"></canvas></div>' +
      '<h3 class="pf-h3">' + s.pick + '</h3><div class="pf-mm-list" id="pf-mm-list"></div>' +
      '<div id="pf-mm-fields"></div>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-mm-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-mm-sh">' + s.sh + '</button></div>' +
      '<p class="pf-mm-note">' + s.note + '</p>';
    var cv = document.getElementById('pf-mm-c'), ctx = cv.getContext('2d'), fields = document.getElementById('pf-mm-fields'), list = document.getElementById('pf-mm-list');
    function vals() { return [].map.call(fields.querySelectorAll('textarea'), function (x) { return x.value; }); }
    function redraw() { raf = 0; var sz = size(cur); if (cv.height !== sz.H) cv.height = sz.H; paint(ctx, cur, curImg, vals()); }
    function sched() { if (!raf) raf = requestAnimationFrame(redraw); }
    function select(t, btn) {
      cur = t; curImg = null; [].forEach.call(list.children, function (x) { x.classList.remove('on'); }); btn.classList.add('on');
      fields.innerHTML = t.f.map(function (f, i) { return '<label class="pf-mm-lab" for="pf-mm-f' + i + '">' + s.field + (t.f.length > 1 ? ' ' + (ar ? '٠١٢٣٤٥٦٧٨٩'[i + 1] : (i + 1)) : '') + '</label><textarea id="pf-mm-f' + i + '" class="pf-mm-in" rows="2" maxlength="90"></textarea>'; }).join('');
      [].forEach.call(fields.querySelectorAll('textarea'), function (x, i) { x.value = t.f[i][6]; x.addEventListener('input', sched); });
      var sz = size(t); cv.height = sz.H; paint(ctx, t, null, vals());
      loadImg(t).then(function (im) { if (cur === t) { curImg = im; sched(); } });
    }
    TT.forEach(function (t, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'pf-mm-th';
      var im = document.createElement('img'); im.src = 'memes/t-' + t.id + '.webp'; im.alt = ''; im.loading = 'lazy'; im.width = 80; im.height = 80; b.appendChild(im);
      var sp = document.createElement('span'); sp.textContent = ar ? t.ar : t.en; b.appendChild(sp);
      b.addEventListener('click', function () { select(t, b); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      list.appendChild(b); if (i === 0) select(t, b);
    });
    function blob(cb) { cv.toBlob(cb, 'image/png'); }
    function save() { blob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'meme.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); }); }
    document.getElementById('pf-mm-dl').addEventListener('click', save);
    document.getElementById('pf-mm-sh').addEventListener('click', function () {
      blob(function (b) {
        var f; try { f = new File([b], 'meme.png', { type: 'image/png' }); } catch (e) { f = null; }
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f] }).catch(function () {}); else save();
      });
    });
    if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('700 60px Cairo', 'ابج'), document.fonts.load('600 30px Cairo', 'ابج')]).catch(function () {}).then(sched);
  }
  window.pfMemes = { render: render };
})();
