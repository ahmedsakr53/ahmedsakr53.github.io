/* Stickers. Loaded only on #/stickers. Everything is drawn on a canvas in the visitor's browser: no upload, no server. */
(function () {
  var S = 512, FONT = '"Cairo","IBM Plex Sans Arabic",sans-serif';
  var PACKS = [
    { id: 'daily', ar: 'يوميات مصرية', en: 'Egyptian daily', c: ['#f59e0b', '#111'], t: ['يا عم سيبك', 'ولا يهمك', 'على راسي', 'تمام التمام', 'هنعمل إيه بقى', 'خليها على الله', 'مش فارقة', 'ماشي يا باشا', 'أنا جاي', 'استنى عليا', 'حاضر', 'لا حول ولا قوة'] },
    { id: 'funny', ar: 'قفشات', en: 'Banter', c: ['#e11d48', '#fff'], t: ['إنت بتهزر؟', 'يا نهار أبيض', 'دي حاجة تضحك', 'قفشة جامدة', 'متقولش كده', 'يا ساتر', 'ده أنا اللي غلطان', 'بقى كده؟', 'احنا آسفين', 'ما تيجي تشوف', 'أنا مش هنا', 'عيب'] },
    { id: 'love', ar: 'مجاملات', en: 'Nice words', c: ['#10b981', '#06251a'], t: ['تسلم إيدك', 'ربنا يخليك', 'مبروك', 'الله يبارك فيك', 'وحشتني', 'صباح الخير', 'تصبح على خير', 'جزاك الله خير', 'كل سنة وإنت طيب', 'عقبال عندك', 'يا حبيبي', 'شكراً ليك'] },
    { id: 'study', ar: 'طلبة وشغل', en: 'Study & work', c: ['#6366f1', '#fff'], t: ['مذاكرة لا', 'الامتحان بكره', 'هنجح إن شاء الله', 'محتاج قهوة', 'الكود شغال', 'الكود مش شغال', 'بنام بعد ما أخلص', 'ديدلاين النهارده', 'تمام يا دكتور', 'في الجامعة', 'أنا في الشغل', 'ريست شوية'] }
  ];
  function L(ar) { return ar ? {
    title: 'استيكرز', sub: 'حوّل أي صورة لاستيكر واتساب 512×512، أو خد استيكر نص مصري جاهز. كله على موبايلك.',
    photo: '📷 اعمل استيكر من صورة', packs: 'باكات الاستيكرز المصرية', text: 'الكلمة على الاستيكر', dl: 'نزّل الاستيكر', sh: 'شارك', own: 'نص الاستيكر (اختياري)',
    note: 'الاستيكر بيتنزل بصيغة WebP 512×512. لإضافته لواتساب: افتح أي تطبيق Sticker Maker واستورد الصورة، أو ابعته كصورة.', bad: 'الملف ده مش صورة أو كبير جداً.', fit: 'اقتصاص', fitb: 'الصورة كاملة', mode: 'الشكل'
  } : {
    title: 'Stickers', sub: 'Turn any photo into a 512×512 WhatsApp-style sticker, or grab a ready Egyptian text sticker. It all runs on your phone.',
    photo: '📷 Make a sticker from a photo', packs: 'Egyptian sticker packs', text: 'Sticker text', dl: 'Download sticker', sh: 'Share', own: 'Sticker text (optional)',
    note: 'The sticker downloads as 512×512 WebP. To add it to WhatsApp, import it in any Sticker Maker app, or send it as an image.', bad: 'That file is not an image, or it is too large.', fit: 'Crop', fitb: 'Fit whole photo', mode: 'Mode'
  }; }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function wrap(c, text, maxW) {
    var words = String(text).replace(/\s+/g, ' ').trim().split(' '), lines = [], cur = '';
    words.forEach(function (w) { var t = cur ? cur + ' ' + w : w; if (cur && c.measureText(t).width > maxW) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur); return lines;
  }
  function fitText(c, text, w, h) {
    var size = 120, lines, lh;
    for (; size >= 24; size -= 4) { c.font = '800 ' + size + 'px ' + FONT; lines = wrap(c, text, w); lh = size * 1.25; var ok = lines.length * lh <= h; lines.forEach(function (l) { if (c.measureText(l).width > w) ok = false; }); if (ok) break; }
    return { lines: lines, size: size, lh: lh };
  }
  function textSticker(c, text, col) {
    c.clearRect(0, 0, S, S);
    c.fillStyle = col[0]; rr(c, 16, 16, S - 32, S - 32, 90); c.fill();
    c.lineWidth = 10; c.strokeStyle = 'rgba(255,255,255,.9)'; c.stroke();
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillStyle = col[1];
    var f = fitText(c, text || ' ', S - 110, S - 110), y0 = S / 2 - (f.lines.length * f.lh) / 2;
    c.font = '800 ' + f.size + 'px ' + FONT;
    f.lines.forEach(function (l, i) { c.fillText(l, S / 2, y0 + f.lh * (i + 0.8)); });
  }
  function photoSticker(c, img, text, fit) {
    c.clearRect(0, 0, S, S);
    var pad = 14, A = S - pad * 2, iw = img.width, ih = img.height, sc = fit ? Math.min(A / iw, A / ih) : Math.max(A / iw, A / ih), w = iw * sc, h = ih * sc, x = (S - w) / 2, y = (S - h) / 2;
    c.save(); rr(c, pad, pad, A, A, 70); c.clip(); if (fit) { c.fillStyle = 'rgba(255,255,255,.0)'; } c.drawImage(img, x, y, w, h); c.restore();
    c.lineWidth = 10; c.strokeStyle = '#fff'; rr(c, pad + 5, pad + 5, A - 10, A - 10, 66); c.stroke();
    if (text && text.trim()) {
      c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.lineJoin = 'round';
      var f = fitText(c, text, S - 90, 170), y0 = S - 40 - f.lines.length * f.lh;
      c.font = '800 ' + f.size + 'px ' + FONT;
      f.lines.forEach(function (l, i) { var yy = y0 + f.lh * (i + 0.8); c.lineWidth = Math.max(8, f.size / 5); c.strokeStyle = '#000'; c.strokeText(l, S / 2, yy); c.fillStyle = '#fff'; c.fillText(l, S / 2, yy); });
    }
  }
  function render(root) {
    var ar = document.documentElement.lang !== 'en', s = L(ar), cfg = ((window.pfGamesCfg || {}).memes || {}), stk = cfg.stk || {}, off = stk.off || [], extra = (stk.extra || []).filter(Boolean);
    var packs = PACKS.filter(function (p) { return off.indexOf(p.id) < 0; }).map(function (p) { return { id: p.id, name: ar ? p.ar : p.en, c: p.c, t: p.t }; });
    if (extra.length) packs.push({ id: 'extra', name: ar ? 'إضافات جديدة' : 'New picks', c: ['#0ea5e9', '#06202b'], t: extra });
    var mode = 'text', col = (packs[0] || { c: ['#f59e0b', '#111'] }).c, img = null, fit = false;
    root.innerHTML = '<a class="pf-g-exit" href="#/fun">' + (ar ? '✕ خروج' : '✕ Exit') + '</a><div class="pf-pagehead"><div class="pf-eyebrow">STICKERS</div><h2 class="pf-h2">' + s.title + '</h2></div><p class="pf-para">' + s.sub + '</p>' +
      '<div class="pf-st-prev"><canvas id="pf-st-c" width="' + S + '" height="' + S + '" aria-label="sticker"></canvas></div>' +
      '<label class="pf-mm-lab" for="pf-st-t">' + s.text + '</label><textarea id="pf-st-t" class="pf-mm-in" rows="2" maxlength="40"></textarea>' +
      '<label class="pf-mm-btn pf-mm-own" for="pf-st-file">' + s.photo + '</label><input type="file" id="pf-st-file" accept="image/*" hidden><p class="pf-mm-note" id="pf-st-err" hidden></p>' +
      '<div class="pf-mm-btns" id="pf-st-fitw" hidden><button type="button" class="pf-mm-btn" id="pf-st-fit">' + s.fitb + '</button></div>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-st-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-st-sh">' + s.sh + '</button></div>' +
      '<h3 class="pf-h3">' + s.packs + '</h3><div id="pf-st-packs"></div><p class="pf-mm-note">' + s.note + '</p>';
    var cv = document.getElementById('pf-st-c'), ctx = cv.getContext('2d'), ta = document.getElementById('pf-st-t'), host = document.getElementById('pf-st-packs'), raf = 0;
    function draw() { raf = 0; if (mode === 'photo' && img) photoSticker(ctx, img, ta.value, fit); else textSticker(ctx, ta.value, col); }
    function sched() { if (!raf) raf = requestAnimationFrame(draw); }
    ta.value = packs.length ? packs[0].t[0] : 'تمام'; ta.addEventListener('input', sched);
    packs.forEach(function (p) {
      var h = document.createElement('div'); h.className = 'pf-st-pack'; h.innerHTML = '<div class="pf-st-pn">' + p.name + '</div>';
      var g = document.createElement('div'); g.className = 'pf-st-grid';
      p.t.forEach(function (t) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'pf-st-chip'; b.textContent = t; b.style.background = p.c[0]; b.style.color = p.c[1];
        b.addEventListener('click', function () { mode = 'text'; col = p.c; ta.value = t; document.getElementById('pf-st-fitw').hidden = true; sched(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
        g.appendChild(b);
      });
      h.appendChild(g); host.appendChild(h);
    });
    document.getElementById('pf-st-fit').addEventListener('click', function () { fit = !fit; this.textContent = fit ? s.fit : s.fitb; sched(); });
    document.getElementById('pf-st-file').addEventListener('change', function (e) {
      var fl = e.target.files && e.target.files[0], er = document.getElementById('pf-st-err'); er.hidden = true;
      if (!fl || !/^image\//.test(fl.type) || fl.size > 15 * 1024 * 1024) { er.textContent = s.bad; er.hidden = false; return; }
      var u = URL.createObjectURL(fl), im = new Image();
      im.onload = function () {
        var iw = im.naturalWidth, ih = im.naturalHeight; if (!iw || !ih) { URL.revokeObjectURL(u); return; }
        var sc = Math.min(1, 1024 / Math.max(iw, ih)), t = document.createElement('canvas'); t.width = Math.round(iw * sc); t.height = Math.round(ih * sc); t.getContext('2d').drawImage(im, 0, 0, t.width, t.height); URL.revokeObjectURL(u);
        img = t; mode = 'photo'; fit = false; ta.value = ''; document.getElementById('pf-st-fitw').hidden = false; document.getElementById('pf-st-fit').textContent = s.fitb; sched(); window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      im.onerror = function () { URL.revokeObjectURL(u); er.textContent = s.bad; er.hidden = false; };
      im.src = u; e.target.value = '';
    });
    function blob(cb) { var d = function (b) { if (b && b.type === 'image/webp') cb(b, 'webp'); else cv.toBlob(function (p) { cb(p, 'png'); }, 'image/png'); }; cv.toBlob(d, 'image/webp', 0.92); }
    function save() { blob(function (b, ext) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'sticker.' + ext; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); }); }
    document.getElementById('pf-st-dl').addEventListener('click', save);
    document.getElementById('pf-st-sh').addEventListener('click', function () {
      blob(function (b, ext) {
        var f; try { f = new File([b], 'sticker.' + ext, { type: b.type }); } catch (e) { f = null; }
        if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f] }).catch(function () {}); else save();
      });
    });
    draw();
    if (document.fonts && document.fonts.load) document.fonts.load('800 60px Cairo', 'ابج').catch(function () {}).then(sched);
  }
  window.pfStickers = { render: render, PACKS: PACKS.map(function (p) { return [p.id, p.ar]; }) };
})();
