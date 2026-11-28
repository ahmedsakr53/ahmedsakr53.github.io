/* QR maker and greeting / invitation cards. Loaded only on #/qr. Everything runs in the visitor's browser: nothing is uploaded or stored. */
(function () {
  var FONT = '"Cairo","IBM Plex Sans Arabic",sans-serif';
  // ---- QR encoder (byte mode, error correction M, versions 1-40) ----
  var ECPB = [-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28];
  var NBLK = [-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49];
  function rawModules(v) {
    var r = (16 * v + 128) * v + 64;
    if (v >= 2) { var n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
    return r;
  }
  function dataCodewords(v) { return Math.floor(rawModules(v) / 8) - ECPB[v] * NBLK[v]; }
  var EXP = [], LOG = [];
  (function () { var x = 1; for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  function gmul(a, b) { return a && b ? EXP[LOG[a] + LOG[b]] : 0; }
  function rsDiv(deg) { var r = []; for (var i = 0; i < deg; i++) r[i] = 0; r[deg - 1] = 1; var root = 1; for (i = 0; i < deg; i++) { for (var j = 0; j < deg; j++) { r[j] = gmul(r[j], root); if (j + 1 < deg) r[j] ^= r[j + 1]; } root = gmul(root, 2); } return r; }
  function rsRem(data, div) { var r = div.map(function () { return 0; }); data.forEach(function (b) { var f = b ^ r.shift(); r.push(0); div.forEach(function (c, i) { r[i] ^= gmul(c, f); }); }); return r; }
  function utf8(s) { return Array.prototype.slice.call(new TextEncoder().encode(s)); }
  function makeQR(text) {
    var bytes = utf8(text), v, i;
    for (v = 1; v <= 40; v++) { var cc = v < 10 ? 8 : 16; if (4 + cc + bytes.length * 8 <= dataCodewords(v) * 8) break; }
    if (v > 40) return null;
    var bits = []; function put(val, n) { for (var k = n - 1; k >= 0; k--) bits.push((val >>> k) & 1); }
    put(4, 4); put(bytes.length, v < 10 ? 8 : 16); bytes.forEach(function (b) { put(b, 8); });
    var cap = dataCodewords(v) * 8; put(0, Math.min(4, cap - bits.length)); while (bits.length % 8) bits.push(0);
    for (var pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) put(pad, 8);
    var data = []; for (i = 0; i < bits.length; i += 8) { var b = 0; for (var k = 0; k < 8; k++) b = (b << 1) | bits[i + k]; data.push(b); }
    var nb = NBLK[v], eb = ECPB[v], raw = Math.floor(rawModules(v) / 8), ns = nb - raw % nb, sl = Math.floor(raw / nb), blocks = [], div = rsDiv(eb);
    for (i = 0, k = 0; i < nb; i++) { var dl = sl - eb + (i < ns ? 0 : 1), d = data.slice(k, k + dl); k += dl; var e = rsRem(d, div); if (i < ns) d.push(0); blocks.push(d.concat(e)); }
    var all = []; for (i = 0; i < blocks[0].length; i++) blocks.forEach(function (bl, j) { if (i !== sl - eb || j >= ns) all.push(bl[i]); });
    var n = v * 4 + 17, M = [], F = [];
    for (i = 0; i < n; i++) { M.push(new Array(n).fill(false)); F.push(new Array(n).fill(false)); }
    function setF(x, y, d) { if (x < 0 || y < 0 || x >= n || y >= n) return; M[y][x] = d; F[y][x] = true; }
    for (i = 0; i < n; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
    function finder(cx, cy) { for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var dist = Math.max(Math.abs(dx), Math.abs(dy)); setF(cx + dx, cy + dy, dist !== 2 && dist !== 4); } }
    finder(3, 3); finder(n - 4, 3); finder(3, n - 4);
    var al = []; if (v > 1) { var na = Math.floor(v / 7) + 2, st = v === 32 ? 26 : Math.floor((v * 8 + na * 3 + 5) / (na * 4 - 4)) * 2; al = [6]; for (var p = v * 4 + 10, q = 0; q < na - 1; q++, p -= st) al.splice(1, 0, p); }
    al.forEach(function (ax, ai) { al.forEach(function (ay, aj) { if ((ai === 0 && aj === 0) || (ai === 0 && aj === al.length - 1) || (ai === al.length - 1 && aj === 0)) return; for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) setF(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }); });
    function fmt(mask) {
      var d = (0 << 3) | mask; // ecc M = 0 -> format bits 00
      var rem = d; for (var j = 0; j < 10; j++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      var bt = ((d << 10) | rem) ^ 0x5412;
      function g(j) { return ((bt >>> j) & 1) !== 0; }
      for (var j = 0; j <= 5; j++) setF(8, j, g(j)); setF(8, 7, g(6)); setF(8, 8, g(7)); setF(7, 8, g(8)); for (j = 9; j < 15; j++) setF(14 - j, 8, g(j));
      for (j = 0; j < 8; j++) setF(n - 1 - j, 8, g(j)); for (j = 8; j < 15; j++) setF(8, n - 15 + j, g(j)); setF(8, n - 8, true);
    }
    fmt(0);
    if (v >= 7) { var rem2 = v; for (i = 0; i < 12; i++) rem2 = (rem2 << 1) ^ ((rem2 >>> 11) * 0x1F25); var vb = (v << 12) | rem2; for (i = 0; i < 18; i++) { var bt2 = ((vb >>> i) & 1) !== 0, a = n - 11 + i % 3, bb = Math.floor(i / 3); setF(a, bb, bt2); setF(bb, a, bt2); } }
    var idx = 0; for (var right = n - 1; right >= 1; right -= 2) { if (right === 6) right = 5; for (var vert = 0; vert < n; vert++) for (var j = 0; j < 2; j++) { var x = right - j, up = ((right + 1) & 2) === 0, y = up ? n - 1 - vert : vert; if (!F[y][x] && idx < all.length * 8) { M[y][x] = ((all[idx >>> 3] >>> (7 - (idx & 7))) & 1) !== 0; idx++; } } }
    function mk(mask, x, y) { switch (mask) { case 0: return (x + y) % 2 === 0; case 1: return y % 2 === 0; case 2: return x % 3 === 0; case 3: return (x + y) % 3 === 0; case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; case 5: return x * y % 2 + x * y % 3 === 0; case 6: return (x * y % 2 + x * y % 3) % 2 === 0; default: return ((x + y) % 2 + x * y % 3) % 2 === 0; } }
    function applyMask(mask) { for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (!F[y][x] && mk(mask, x, y)) M[y][x] = !M[y][x]; }
    function penalty() {
      var res = 0, x, y, run, col;
      function hist(h, rl) { var nn = h[1], core = nn > 0 && h[2] === nn && h[3] === nn * 3 && h[4] === nn && h[5] === nn; return (core && h[0] >= nn * 4 && h[6] >= nn ? 1 : 0) + (core && h[6] >= nn * 4 && h[0] >= nn ? 1 : 0); }
      for (y = 0; y < n; y++) { run = 1; col = M[y][0]; var h = [0, 0, 0, 0, 0, 0, 0], cur = 0; for (x = 0; x < n; x++) { if (M[y][x] === col && x > 0) { run++; if (run === 5) res += 3; else if (run > 5) res++; } else if (x > 0) { run = 1; col = M[y][x]; } } }
      for (x = 0; x < n; x++) { run = 1; col = M[0][x]; for (y = 1; y < n; y++) { if (M[y][x] === col) { run++; if (run === 5) res += 3; else if (run > 5) res++; } else { run = 1; col = M[y][x]; } } }
      for (y = 0; y < n - 1; y++) for (x = 0; x < n - 1; x++) { var c = M[y][x]; if (c === M[y][x + 1] && c === M[y + 1][x] && c === M[y + 1][x + 1]) res += 3; }
      var dark = 0; M.forEach(function (r) { r.forEach(function (c) { if (c) dark++; }); }); res += (Math.ceil(Math.abs(dark * 20 - n * n * 10) / (n * n)) - 1) * 10;
      return res;
    }
    var best = 0, bp = 1e9; for (var m = 0; m < 8; m++) { applyMask(m); fmt(m); var pp = penalty(); if (pp < bp) { bp = pp; best = m; } applyMask(m); }
    applyMask(best); fmt(best);
    return M;
  }

  // ---- QR drawing ----
  function qrCanvas(text, fg, bg, size, rounded) {
    var M = makeQR(text); if (!M) return null;
    var n = M.length, q = 4, cs = Math.max(4, Math.floor(size / (n + q * 2))), W = cs * (n + q * 2);
    var cv = document.createElement('canvas'); cv.width = cv.height = W; var c = cv.getContext('2d');
    c.fillStyle = bg; c.fillRect(0, 0, W, W); c.fillStyle = fg;
    function inFinder(x, y) { return (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8); }
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (M[y][x]) {
      var px = (x + q) * cs, py = (y + q) * cs;
      if (rounded && !inFinder(x, y)) { c.beginPath(); c.arc(px + cs / 2, py + cs / 2, cs * 0.5, 0, 6.2832); c.fill(); } else c.fillRect(px, py, cs, cs);
    }
    return cv;
  }
  function toBlob(cv, cb) { if (cv.toBlob) cv.toBlob(function (b) { cb(b); }, 'image/png'); else cb(null); }
  function saveBlob(b, name) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
  function shareBlob(b, name, fallback) {
    var f; try { f = new File([b], name, { type: 'image/png' }); } catch (e) { f = null; }
    if (f && navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f] }).catch(function () {}); else fallback();
  }

  // ---- Cards ----
  var OCC = [
    { id: 'fitr', ar: 'عيد الفطر', en: 'Eid al-Fitr', pal: ['#0f766e', '#134e4a', '#fcd34d'], motif: 'crescent', ch: 'falcon', eyes: 'happy', mouth: 'grin', props: ['stars'], m: ['كل سنة وانت طيب، عيد مبارك عليك وعلى أهلك كلهم.', 'عيدكم مبارك، أعاده الله علينا وعليكم بالخير والفرحة.', 'تقبل الله منا ومنكم، وعيد سعيد.'] },
    { id: 'adha', ar: 'عيد الأضحى', en: 'Eid al-Adha', pal: ['#7c2d12', '#431407', '#fbbf24'], motif: 'crescent', ch: 'falcon', eyes: 'happy', mouth: 'smile', props: ['stars'], m: ['عيد أضحى مبارك، وكل عام وانت بخير.', 'تقبل الله طاعتكم، وعساكم من عواده.', 'أعاده الله عليك بالصحة والسعادة.'] },
    { id: 'ram', ar: 'رمضان كريم', en: 'Ramadan Kareem', pal: ['#312e81', '#1e1b4b', '#fde68a'], motif: 'crescent', ch: 'falcon', eyes: 'happy', mouth: 'smile', props: ['stars'], m: ['رمضان كريم، كل سنة وانت طيب.', 'أهلا رمضان، جعله الله شهر خير وبركة عليك.', 'صيام مقبول وإفطار شهي.'] },
    { id: 'wed', ar: 'دعوة فرح', en: 'Wedding invitation', pal: ['#9d174d', '#500724', '#fda4af'], motif: 'hearts', ch: 'woman', eyes: 'love', mouth: 'smile', props: ['hearts'], extra: 'الموعد والمكان', m: ['يتشرف أهل العروسين بدعوتكم لحضور حفل الزفاف.', 'يسعدنا حضوركم ومشاركتنا فرحتنا في يوم العمر.', 'تعالوا شاركونا فرحتنا، وجودكم يكمل سعادتنا.'] },
    { id: 'eng', ar: 'دعوة خطوبة', en: 'Engagement invitation', pal: ['#be185d', '#701a75', '#fbcfe8'], motif: 'hearts', ch: 'girl', eyes: 'love', mouth: 'smile', props: ['hearts'], extra: 'الموعد والمكان', m: ['بكل سرور ندعوكم لحضور حفل الخطوبة.', 'فرحتنا ما تكملش إلا بوجودكم معانا.', 'يسعدنا دعوتكم لمشاركتنا فرحة الخطوبة.'] },
    { id: 'win', ar: 'مبروك النجاح', en: 'Congrats on passing', pal: ['#065f46', '#064e3b', '#a7f3d0'], motif: 'confetti', ch: 'falcon', eyes: 'happy', mouth: 'laugh', props: ['stars'], m: ['ألف مبروك النجاح، ربنا يوفقك دايمًا.', 'مبروك يا بطل، تعبك ما ضاعش.', 'نجاح يفرّح القلب، وإن شاء الله للأعلى دايمًا.'] },
    { id: 'grad', ar: 'مبروك التخرج', en: 'Congrats graduate', pal: ['#1e3a8a', '#172554', '#93c5fd'], motif: 'confetti', ch: 'eng', eyes: 'happy', mouth: 'grin', props: ['stars'], m: ['مبروك التخرج، بداية طريق جديد مليان نجاح.', 'ألف مبروك يا مهندس، تستاهل كل خير.', 'فرحانين بيك جدًا، ربنا يفتح لك كل الأبواب.'] },
    { id: 'bday', ar: 'عيد ميلاد سعيد', en: 'Happy birthday', pal: ['#c2410c', '#7c2d12', '#fdba74'], motif: 'balloons', ch: 'falcon', eyes: 'happy', mouth: 'laugh', props: ['stars'], m: ['كل سنة وانت طيب، عقبال مية سنة.', 'عيد ميلاد سعيد، ربنا يسعدك ويحقق أمنياتك.', 'سنة جديدة حلوة عليك، وكل يوم أحلى من اللي قبله.'] },
    { id: 'baby', ar: 'مبروك المولود', en: 'New baby', pal: ['#0e7490', '#164e63', '#a5f3fc'], motif: 'balloons', ch: 'girl', eyes: 'happy', mouth: 'smile', props: ['hearts'], m: ['ألف مبروك المولود الجديد، ينبت نباتًا حسنًا.', 'مبروك وحمد الله على السلامة، ربنا يقرّ عينكم.', 'الفرحة كبرت، ربنا يبارك لكم فيه.'] },
    { id: 'thx', ar: 'شكر وتقدير', en: 'Thank you', pal: ['#6d28d9', '#3b0764', '#ddd6fe'], motif: 'hearts', ch: 'falcon', eyes: 'love', mouth: 'smile', props: ['hearts'], m: ['شكرًا من القلب، ما أنساش وقفتك معايا.', 'جزاك الله خير، فضلك على راسي.', 'ألف شكر على ذوقك وكرمك.'] }
  ];
  function wrap(c, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) { var t = cur ? cur + ' ' + w : w; if (cur && c.measureText(t).width > maxW) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur); return lines;
  }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function star(c, x, y, r, col) { c.fillStyle = col; c.beginPath(); for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r * 0.42 : r; c.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad); } c.closePath(); c.fill(); }
  function heart(c, x, y, s, col) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y + s * 0.35); c.bezierCurveTo(x - s * 0.9, y - s * 0.4, x - s * 0.2, y - s * 0.9, x, y - s * 0.25); c.bezierCurveTo(x + s * 0.2, y - s * 0.9, x + s * 0.9, y - s * 0.4, x, y + s * 0.35); c.fill(); }
  function rnd(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
  function decor(c, W, H, o) {
    var r = rnd(7 + o.id.length * 13), acc = o.pal[2], i;
    c.globalAlpha = 0.9;
    if (o.motif === 'crescent') {
      c.fillStyle = acc; c.beginPath(); c.arc(W - 190, 190, 96, 0, 6.2832); c.fill();
      c.fillStyle = o.pal[1]; c.beginPath(); c.arc(W - 150, 170, 88, 0, 6.2832); c.fill();
      for (i = 0; i < 26; i++) star(c, r() * W, r() * H, 6 + r() * 12, 'rgba(255,255,255,' + (0.35 + r() * 0.5) + ')');
      for (i = 0; i < 3; i++) { var lx = 130 + i * 40; c.strokeStyle = acc; c.lineWidth = 3; c.beginPath(); c.moveTo(lx, 0); c.lineTo(lx, 90 + i * 40); c.stroke(); rr(c, lx - 20, 90 + i * 40, 40, 58, 12); c.fillStyle = acc; c.fill(); }
    } else if (o.motif === 'hearts') {
      for (i = 0; i < 24; i++) heart(c, r() * W, r() * H, 22 + r() * 40, 'rgba(255,255,255,' + (0.12 + r() * 0.28) + ')');
    } else if (o.motif === 'balloons') {
      var cols = [acc, '#fff', '#fde047', '#fb7185', '#7dd3fc'];
      for (i = 0; i < 9; i++) { var bx = 60 + r() * (W - 120), by = 120 + r() * 300, bs = 36 + r() * 34; c.fillStyle = cols[i % 5]; c.globalAlpha = 0.55; c.beginPath(); c.ellipse(bx, by, bs * 0.8, bs, 0, 0, 6.2832); c.fill(); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); c.moveTo(bx, by + bs); c.quadraticCurveTo(bx + 18, by + bs + 60, bx, by + bs + 120); c.stroke(); }
    } else {
      var cc = [acc, '#fff', '#fde047', '#fb7185', '#38bdf8'];
      for (i = 0; i < 60; i++) { c.save(); c.translate(r() * W, r() * H); c.rotate(r() * 6); c.fillStyle = cc[i % 5]; c.globalAlpha = 0.55; c.fillRect(-7, -3, 14, 6 + r() * 8); c.restore(); }
      for (i = 0; i < 8; i++) star(c, r() * W, r() * H, 10 + r() * 14, acc);
    }
    c.globalAlpha = 1;
  }
  function drawCard(cv, o, f, art) {
    var W = 1080, H = 1350, c = cv.getContext('2d'); cv.width = W; cv.height = H;
    var g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, o.pal[0]); g.addColorStop(1, o.pal[1]); c.fillStyle = g; c.fillRect(0, 0, W, H);
    decor(c, W, H, o);
    c.fillStyle = 'rgba(255,255,255,.12)'; rr(c, 70, 300, W - 140, H - 400, 56); c.fill();
    c.strokeStyle = o.pal[2]; c.lineWidth = 5; rr(c, 70, 300, W - 140, H - 400, 56); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; rr(c, 90, 320, W - 180, H - 440, 44); c.stroke();
    if (art) c.drawImage(art, W / 2 - 170, 130, 340, 340);
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    c.fillStyle = o.pal[2]; c.font = '800 96px ' + FONT; c.fillText(o.ar, W / 2, 560);
    var y = 640;
    if (f.to) { c.fillStyle = '#fff'; c.font = '700 48px ' + FONT; c.fillText('إلى ' + f.to, W / 2, y); y += 28; }
    c.fillStyle = '#fff'; c.font = '600 50px ' + FONT;
    var lines = wrap(c, f.msg || o.m[0], W - 300).slice(0, 6); y += 40;
    lines.forEach(function (l) { y += 76; c.fillText(l, W / 2, y); });
    if (o.extra && f.extra) { y += 90; c.fillStyle = o.pal[2]; c.font = '800 42px ' + FONT; c.fillText(o.extra, W / 2, y); c.fillStyle = '#fff'; c.font = '600 44px ' + FONT; wrap(c, f.extra, W - 300).slice(0, 3).forEach(function (l) { y += 62; c.fillText(l, W / 2, y); }); }
    if (f.from) { c.fillStyle = o.pal[2]; c.font = '800 54px ' + FONT; c.fillText(f.from, W / 2, H - 150); c.fillStyle = 'rgba(255,255,255,.75)'; c.font = '600 32px ' + FONT; c.fillText('مع أطيب التمنيات', W / 2, H - 200); }
  }

  var T = {
    ar: { title: 'QR وبطاقات', note: 'كل حاجة بتتعمل على موبايلك، ومفيش حاجة بتترفع لأي سيرفر.', tqr: 'منشئ QR', tcards: 'بطاقات', kText: 'نص أو رابط', kWa: 'واتساب', kWifi: 'واي فاي', text: 'اكتب النص أو الرابط', num: 'رقم واتساب مع كود الدولة، مثال 201001234567', wmsg: 'رسالة جاهزة (اختياري)', ssid: 'اسم الشبكة', pass: 'كلمة السر', sec: 'نوع الحماية', open: 'بدون كلمة سر', fg: 'لون الكود', rounded: 'نقاط مدورة', dl: 'تنزيل PNG', sh: 'مشاركة', empty: 'اكتب حاجة الأول عشان يتعمل الكود.', big: 'النص طويل أوي، قصّره شوية.', occ: 'اختار المناسبة', to: 'إلى (الاسم)', from: 'من (اسمك)', msg: 'نص المعايدة', exl: 'التفاصيل', quick: 'نصوص جاهزة' },
    en: { title: 'QR & cards', note: 'Everything is made on your phone. Nothing is uploaded.', tqr: 'QR maker', tcards: 'Cards', kText: 'Text or link', kWa: 'WhatsApp', kWifi: 'Wi-Fi', text: 'Type text or a link', num: 'WhatsApp number with country code, e.g. 201001234567', wmsg: 'Preset message (optional)', ssid: 'Network name', pass: 'Password', sec: 'Security', open: 'No password', fg: 'Code color', rounded: 'Rounded dots', dl: 'Download PNG', sh: 'Share', empty: 'Type something first.', big: 'Text is too long, shorten it.', occ: 'Pick an occasion', to: 'To (name)', from: 'From (your name)', msg: 'Greeting text', exl: 'Details', quick: 'Quick texts' }
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function render(root) {
    var ar = document.documentElement.lang !== 'en', s = T[ar ? 'ar' : 'en'];
    var cfg = (((window.pfGamesCfg || {}).memes || {}).qr) || {}, off = cfg.off || [], extra = (cfg.extra || []).filter(Boolean);
    var occs = OCC.filter(function (o) { return off.indexOf(o.id) < 0; }); if (!occs.length) occs = OCC.slice(0, 1);
    var tab = 'qr', kind = 'text', occ = occs[0], fg = '#111827', rounded = true, qrBlob = null, cardBlob = null, art = null, artKey = '', raf = 0;
    var colors = ['#111827', '#0f766e', '#1d4ed8', '#7c3aed', '#be123c', '#c2410c'];
    root.innerHTML = '<a class="pf-g-exit" href="#/fun">' + (ar ? '✕ خروج' : '✕ Exit') + '</a><div class="pf-pagehead"><div class="pf-eyebrow">QR</div><h2 class="pf-h2">' + s.title + '</h2></div><p class="pf-para">' + s.note + '</p>' +
      '<div class="pf-qr-tabs"><button type="button" class="pf-qr-tab on" data-t="qr">' + s.tqr + '</button><button type="button" class="pf-qr-tab" data-t="cards">' + s.tcards + '</button></div>' +
      '<div id="pf-qr-a"><div class="pf-qr-kinds"><button type="button" class="pf-qr-k on" data-k="text">' + s.kText + '</button><button type="button" class="pf-qr-k" data-k="wa">' + s.kWa + '</button><button type="button" class="pf-qr-k" data-k="wifi">' + s.kWifi + '</button></div>' +
      '<div id="pf-qr-f"></div><div class="pf-qr-cols" id="pf-qr-cols"></div><label class="pf-qr-chk"><input type="checkbox" id="pf-qr-rd" checked> ' + s.rounded + '</label>' +
      '<div class="pf-st-prev pf-qr-prev"><canvas id="pf-qr-c" width="480" height="480"></canvas></div><p class="pf-mm-note" id="pf-qr-err" hidden></p>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-qr-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-qr-sh">' + s.sh + '</button></div></div>' +
      '<div id="pf-qr-b" hidden><label class="pf-mm-lab">' + s.occ + '</label><div class="pf-qr-occ" id="pf-qr-occ"></div>' +
      '<div class="pf-st-prev pf-qr-prev pf-qr-cardprev"><canvas id="pf-cd-c" width="540" height="675"></canvas></div>' +
      '<label class="pf-mm-lab" for="pf-cd-to">' + s.to + '</label><input id="pf-cd-to" class="pf-mm-in" maxlength="30">' +
      '<label class="pf-mm-lab" for="pf-cd-from">' + s.from + '</label><input id="pf-cd-from" class="pf-mm-in" maxlength="30">' +
      '<div id="pf-cd-exw"></div><label class="pf-mm-lab" for="pf-cd-msg">' + s.msg + '</label><textarea id="pf-cd-msg" class="pf-mm-in" rows="3" maxlength="160"></textarea>' +
      '<div class="pf-mm-lab">' + s.quick + '</div><div class="pf-qr-msgs" id="pf-cd-q"></div>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-cd-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-cd-sh">' + s.sh + '</button></div></div>';
    var $ = function (id) { return document.getElementById(id); };
    function fields() {
      var h = '';
      if (kind === 'text') h = '<label class="pf-mm-lab" for="pf-qr-t">' + s.text + '</label><textarea id="pf-qr-t" class="pf-mm-in" rows="3" maxlength="600" dir="auto"></textarea>';
      else if (kind === 'wa') h = '<label class="pf-mm-lab" for="pf-qr-n">' + s.num + '</label><input id="pf-qr-n" class="pf-mm-in" inputmode="numeric" maxlength="16" dir="ltr"><label class="pf-mm-lab" for="pf-qr-m">' + s.wmsg + '</label><input id="pf-qr-m" class="pf-mm-in" maxlength="200">';
      else h = '<label class="pf-mm-lab" for="pf-qr-s">' + s.ssid + '</label><input id="pf-qr-s" class="pf-mm-in" maxlength="32" dir="ltr"><label class="pf-mm-lab" for="pf-qr-p">' + s.pass + '</label><input id="pf-qr-p" class="pf-mm-in" maxlength="63" dir="ltr" autocomplete="off"><label class="pf-mm-lab" for="pf-qr-w">' + s.sec + '</label><select id="pf-qr-w" class="pf-mm-in"><option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="nopass">' + s.open + '</option></select>';
      $('pf-qr-f').innerHTML = h; Array.prototype.forEach.call($('pf-qr-f').querySelectorAll('input,textarea,select'), function (e) { e.addEventListener('input', drawQR); e.addEventListener('change', drawQR); });
    }
    function payload() {
      var v = function (id) { var e = $(id); return e ? e.value.trim() : ''; };
      if (kind === 'text') return v('pf-qr-t');
      if (kind === 'wa') { var n = v('pf-qr-n').replace(/\D/g, ''); if (!n) return ''; var m = v('pf-qr-m'); return 'https://wa.me/' + n + (m ? '?text=' + encodeURIComponent(m) : ''); }
      var ss = v('pf-qr-s'); if (!ss) return ''; var w = v('pf-qr-w') || 'WPA', q = function (x) { return x.replace(/([\\;,:"])/g, '\\$1'); };
      return 'WIFI:T:' + (w === 'nopass' ? 'nopass' : w) + ';S:' + q(ss) + ';' + (w === 'nopass' ? '' : 'P:' + q(v('pf-qr-p')) + ';') + ';';
    }
    function drawQR() {
      var cv = $('pf-qr-c'), c = cv.getContext('2d'), err = $('pf-qr-err'), p = payload(); qrBlob = null;
      c.clearRect(0, 0, 480, 480); c.fillStyle = '#fff'; c.fillRect(0, 0, 480, 480);
      if (!p) { err.hidden = false; err.textContent = s.empty; return; }
      var q = qrCanvas(p, fg, '#ffffff', 1000, rounded);
      if (!q) { err.hidden = false; err.textContent = s.big; return; }
      err.hidden = true; c.drawImage(q, 0, 0, 480, 480); toBlob(q, function (b) { qrBlob = b; });
    }
    $('pf-qr-cols').innerHTML = colors.map(function (x, i) { return '<button type="button" class="pf-qr-col' + (i === 0 ? ' on' : '') + '" data-c="' + x + '" style="background:' + x + '" aria-label="' + x + '"></button>'; }).join('');
    $('pf-qr-cols').addEventListener('click', function (e) { var b = e.target.closest('.pf-qr-col'); if (!b) return; fg = b.dataset.c; Array.prototype.forEach.call($('pf-qr-cols').children, function (x) { x.classList.toggle('on', x === b); }); drawQR(); });
    $('pf-qr-rd').addEventListener('change', function () { rounded = this.checked; drawQR(); });
    Array.prototype.forEach.call(root.querySelectorAll('.pf-qr-k'), function (b) { b.addEventListener('click', function () { kind = b.dataset.k; Array.prototype.forEach.call(root.querySelectorAll('.pf-qr-k'), function (x) { x.classList.toggle('on', x === b); }); fields(); drawQR(); }); });
    $('pf-qr-dl').addEventListener('click', function () { if (qrBlob) saveBlob(qrBlob, 'qr.png'); });
    $('pf-qr-sh').addEventListener('click', function () { if (qrBlob) shareBlob(qrBlob, 'qr.png', function () { saveBlob(qrBlob, 'qr.png'); }); });
    fields(); drawQR();

    // cards
    function occButtons() {
      $('pf-qr-occ').innerHTML = occs.map(function (o) { return '<button type="button" class="pf-qr-oc' + (o === occ ? ' on' : '') + '" data-o="' + o.id + '" style="--a:' + o.pal[0] + ';--b:' + o.pal[2] + '">' + esc(ar ? o.ar : o.en) + '</button>'; }).join('');
    }
    function quick() { $('pf-cd-q').innerHTML = occ.m.concat(extra).map(function (m, i) { return '<button type="button" class="pf-qr-q" data-i="' + i + '">' + esc(m) + '</button>'; }).join(''); $('pf-cd-exw').innerHTML = occ.extra ? '<label class="pf-mm-lab" for="pf-cd-ex">' + s.exl + ' (' + occ.extra + ')</label><input id="pf-cd-ex" class="pf-mm-in" maxlength="90">' : ''; var ex = $('pf-cd-ex'); if (ex) ex.addEventListener('input', sched); }
    function sched() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; drawC(); }); }
    function getArt(cb) {
      var key = occ.ch + occ.eyes + occ.mouth; if (art && artKey === key) return cb(art);
      var mk = function () { try { art = window.pfStickers.art(occ.ch, occ.eyes, occ.mouth, occ.props, 340); artKey = key; } catch (e) { art = null; } cb(art); };
      if (window.pfStickers && window.pfStickers.art) return mk();
      var sc = document.createElement('script'); sc.src = 'stickers.js?v=4'; sc.onload = mk; sc.onerror = function () { cb(null); }; document.head.appendChild(sc);
    }
    function drawC() {
      var f = { to: $('pf-cd-to').value.trim(), from: $('pf-cd-from').value.trim(), msg: $('pf-cd-msg').value.trim(), extra: $('pf-cd-ex') ? $('pf-cd-ex').value.trim() : '' };
      getArt(function (a) {
        var big = document.createElement('canvas'); drawCard(big, occ, f, a); cardBlob = null;
        var cv = $('pf-cd-c'), c = cv.getContext('2d'); c.clearRect(0, 0, 540, 675); c.drawImage(big, 0, 0, 540, 675);
        toBlob(big, function (b) { cardBlob = b; });
      });
    }
    function showOcc() { occButtons(); quick(); $('pf-cd-msg').value = occ.m[0]; sched(); }
    $('pf-qr-occ').addEventListener('click', function (e) { var b = e.target.closest('.pf-qr-oc'); if (!b) return; occ = occs.filter(function (o) { return o.id === b.dataset.o; })[0] || occ; showOcc(); });
    $('pf-cd-q').addEventListener('click', function (e) { var b = e.target.closest('.pf-qr-q'); if (!b) return; $('pf-cd-msg').value = b.textContent; sched(); });
    ['pf-cd-to', 'pf-cd-from', 'pf-cd-msg'].forEach(function (id) { $(id).addEventListener('input', sched); });
    $('pf-cd-dl').addEventListener('click', function () { if (cardBlob) saveBlob(cardBlob, 'card.png'); });
    $('pf-cd-sh').addEventListener('click', function () { if (cardBlob) shareBlob(cardBlob, 'card.png', function () { saveBlob(cardBlob, 'card.png'); }); });
    var started = false;
    Array.prototype.forEach.call(root.querySelectorAll('.pf-qr-tab'), function (b) {
      b.addEventListener('click', function () {
        tab = b.dataset.t; Array.prototype.forEach.call(root.querySelectorAll('.pf-qr-tab'), function (x) { x.classList.toggle('on', x === b); });
        $('pf-qr-a').hidden = tab !== 'qr'; $('pf-qr-b').hidden = tab !== 'cards';
        if (tab === 'cards' && !started) { started = true; var go = function () { showOcc(); }; if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('800 60px Cairo', 'ابج')]).catch(function () {}).then(go); else go(); }
      });
    });
  }
  window.pfQR = { render: render, make: makeQR };
})();
