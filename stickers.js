/* Stickers. Loaded only on #/stickers. Everything is drawn on a canvas in the visitor's browser: no upload, no server. */
(function () {
  var S = 512, FONT = '"Cairo","IBM Plex Sans Arabic",sans-serif';
  // [caption, eyes, mouth, brows, props]
  var PACKS = [
    { id: 'falcon', ar: 'الصقر', en: 'Sakr the falcon', ch: 'falcon', t: [
      ['صباح الفل', 'open', 'grin', '', ['stars']], ['بحبك يا باشا', 'love', 'smile', '', ['hearts']], ['أنا الصقر', 'cool', 'smirk', '', []], ['تعبت منك', 'open', 'frown', 'sad', ['sweat']],
      ['إيه الاستهبال ده', 'open', 'flat', 'angry', ['vein']], ['يا نهار أبيض', 'shock', 'o', 'up', ['sweat']], ['وحشتني', 'cry', 'frown', 'sad', ['tears']], ['تصبح على خير', 'sleep', 'smile', '', ['zzz']],
      ['هفكر وأرد عليك', 'think', 'flat', 'up', []], ['من عيوني', 'wink', 'grin', '', ['hearts']], ['هموت من الضحك', 'happy', 'laugh', '', []], ['سلام يا عم', 'open', 'smile', '', [], 1]] },
    { id: 'hussein', ar: 'عم حسين', en: 'Uncle Hussein', ch: 'man', t: [
      ['ولا يهمك', 'open', 'smile', '', []], ['على راسي', 'wink', 'grin', '', ['stars']], ['يا عم خلاص', 'side', 'flat', '', []], ['إنت بتهزر؟', 'shock', 'o', 'up', ['sweat']],
      ['ده كلام؟', 'open', 'frown', 'angry', ['vein']], ['اشرب شاي', 'happy', 'smile', '', ['tea']], ['تسلم إيدك', 'love', 'smile', '', ['hearts']], ['مبروك يا بطل', 'happy', 'laugh', '', ['confetti']],
      ['ربنا يسهل', 'think', 'smirk', 'up', []], ['نايم دلوقتي', 'sleep', 'flat', '', ['zzz']], ['مش فارقة', 'cool', 'smirk', '', []], ['زعلان منك', 'open', 'frown', 'sad', ['tears']]] },
    { id: 'souad', ar: 'ست سعاد', en: 'Auntie Souad', ch: 'woman', t: [
      ['يا حبيبي', 'love', 'smile', '', ['hearts']], ['ربنا يخليك', 'happy', 'smile', '', ['stars']], ['كل سنة وإنت طيب', 'happy', 'grin', '', ['confetti']], ['إيه ده؟', 'shock', 'o', 'up', ['sweat']],
      ['عيب كده', 'open', 'flat', 'angry', ['vein']], ['يا ختي', 'side', 'smirk', '', []], ['وحشتني', 'cry', 'frown', 'sad', ['tears']], ['الأكل جاهز', 'open', 'grin', '', ['plate']],
      ['ادعيلي', 'think', 'smile', 'up', ['stars']], ['ماشي يا قلبي', 'wink', 'smile', '', ['hearts']], ['تصبحوا على خير', 'sleep', 'smile', '', ['zzz']], ['هموت من الضحك', 'happy', 'laugh', '', []]] },
    { id: 'sim', ar: 'سمسم الطالب', en: 'Semsem the student', ch: 'sim', t: [
      ['الامتحان بكره', 'shock', 'o', 'up', ['sweat']], ['مذاكرة لا', 'open', 'flat', 'angry', ['vein']], ['محتاج قهوة', 'sleep', 'frown', '', ['zzz']], ['نجحت!', 'happy', 'laugh', '', ['confetti']],
      ['الكود شغال', 'cool', 'smirk', '', ['stars']], ['الكود مش شغال', 'cry', 'frown', 'sad', ['tears']], ['ثانية واحدة', 'think', 'flat', 'up', []], ['في الجامعة', 'open', 'smile', '', []],
      ['ريّح شوية', 'side', 'flat', '', []], ['ديدلاين النهارده', 'dead', 'o', '', ['sweat']], ['شكراً يا دكتور', 'happy', 'smile', '', ['hearts']], ['الواي فاي وقع', 'open', 'frown', 'sad', ['sweat']]] }
  ];
  function spec(ch, it) { return { ch: ch, eyes: it[1], mouth: it[2], brow: it[3], props: it[4], wave: it[5] }; }
  function L(ar) { return ar ? {
    title: 'استيكرز', sub: 'استيكرات مرسومة بشخصيات مصرية وتعابير مختلفة. اختار واحد، عدّل الجملة، ونزّله. أو حوّل صورتك لاستيكر. كله على موبايلك.',
    photo: '📷 اعمل استيكر من صورة', packs: 'باكات الاستيكرز المصرية', text: 'الكلمة على الاستيكر', dl: 'نزّل الاستيكر', sh: 'شارك', own: 'نص الاستيكر (اختياري)',
    note: 'الاستيكر بيتنزل بصيغة WebP 512×512. لإضافته لواتساب: افتح أي تطبيق Sticker Maker واستورد الصورة، أو ابعته كصورة.', bad: 'الملف ده مش صورة أو كبير جداً.', fit: 'اقتصاص', fitb: 'الصورة كاملة', mode: 'الشكل'
  } : {
    title: 'Stickers', sub: 'Hand-drawn Egyptian characters with different moods. Pick one, edit the line, download it. Or turn your photo into a sticker. All on your phone.',
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
  /* ---- illustrated characters, drawn with canvas paths (no image files) ---- */
  var INK = '#1b1530';
  function lw(c, w) { c.lineWidth = w; c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK; }
  function ell(c, x, y, rx, ry, fill, stroke) { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 6.2832); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke !== false) c.stroke(); }
  function grad(c, x0, y0, x1, y1, a, b) { var g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; }
  function heart(c, x, y, s, col) { c.save(); c.translate(x, y); c.scale(s / 20, s / 20); c.beginPath(); c.moveTo(0, 8); c.bezierCurveTo(-22, -6, -10, -20, 0, -8); c.bezierCurveTo(10, -20, 22, -6, 0, 8); c.fillStyle = col || '#ef4444'; c.fill(); c.restore(); }
  function eye(c, x, y, r, k, o) {
    o = o || {};
    if (k === 'happy') { lw(c, 9); c.beginPath(); c.arc(x, y + r * 0.45, r * 0.95, Math.PI * 1.12, Math.PI * 1.88); c.stroke(); return; }
    if (k === 'sleep') { lw(c, 8); c.beginPath(); c.arc(x, y - r * 0.35, r * 0.95, Math.PI * 0.12, Math.PI * 0.88); c.stroke(); return; }
    if (k === 'love') { c.save(); lw(c, 5); heart(c, x, y + 2, r * 1.9, '#ef4444'); c.restore(); return; }
    if (k === 'dead') { lw(c, 8); c.beginPath(); c.moveTo(x - r * .8, y - r * .8); c.lineTo(x + r * .8, y + r * .8); c.moveTo(x + r * .8, y - r * .8); c.lineTo(x - r * .8, y + r * .8); c.stroke(); return; }
    var big = k === 'shock' ? 1.3 : 1, rx = r * big, ry = r * 1.18 * big;
    lw(c, 5); ell(c, x, y, rx, ry, '#fff');
    var px = 0, py = 0, pr = r * (k === 'shock' ? 0.3 : k === 'cry' ? 0.72 : 0.58);
    if (k === 'think') { px = -r * .35; py = -r * .5; } if (k === 'side') { px = r * .55; }
    c.fillStyle = INK; c.beginPath(); c.arc(x + px, y + py, pr, 0, 6.2832); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(x + px - pr * .3, y + py - pr * .3, pr * .3, 0, 6.2832); c.fill();
    if (k === 'cry') { c.fillStyle = 'rgba(125,211,252,.75)'; c.beginPath(); c.ellipse(x, y + ry * .75, rx * .8, ry * .28, 0, 0, 6.2832); c.fill(); }
  }
  function brow(c, x, y, w, k, side, col) { // side: -1 left eye, 1 right eye
    c.save(); lw(c, 9); c.strokeStyle = col || INK; c.beginPath();
    var a = k === 'angry' ? 14 : k === 'sad' ? -14 : k === 'up' ? -6 : 0; // inner end offset (down = positive)
    var ix = x - side * w / 2, ox = x + side * w / 2; // inner toward centre
    if (k === 'up') { c.moveTo(ix, y - 6); c.quadraticCurveTo(x, y - 18, ox, y - 2); } else { c.moveTo(ix, y + a); c.lineTo(ox, y - a * 0.6); }
    c.stroke(); c.restore();
  }
  function mouth(c, x, y, w, k) {
    lw(c, 7);
    if (k === 'smile') { c.beginPath(); c.arc(x, y - w * .25, w * .7, Math.PI * .2, Math.PI * .8); c.stroke(); }
    else if (k === 'frown') { c.beginPath(); c.arc(x, y + w * .55, w * .6, Math.PI * 1.2, Math.PI * 1.8); c.stroke(); }
    else if (k === 'flat') { c.beginPath(); c.moveTo(x - w * .45, y); c.lineTo(x + w * .45, y); c.stroke(); }
    else if (k === 'smirk') { c.beginPath(); c.moveTo(x - w * .45, y + 4); c.quadraticCurveTo(x + w * .1, y + 10, x + w * .5, y - 8); c.stroke(); }
    else if (k === 'o') { ell(c, x, y + 6, w * .24, w * .3, '#5b1523'); }
    else { // grin / laugh / tongue : open mouth
      var h = k === 'laugh' ? w * .9 : w * .62;
      c.beginPath(); c.moveTo(x - w * .6, y - 6); c.quadraticCurveTo(x, y + h * 1.6, x + w * .6, y - 6); c.closePath(); c.fillStyle = '#5b1523'; c.fill(); c.stroke();
      c.save(); c.clip(); c.fillStyle = '#fff'; c.fillRect(x - w, y - 8, w * 2, 14); c.fillStyle = '#f87171'; c.beginPath(); c.ellipse(x, y + h * .95, w * .34, h * .4, 0, 0, 6.2832); c.fill(); c.restore();
      c.beginPath(); c.moveTo(x - w * .6, y - 6); c.quadraticCurveTo(x, y + h * 1.6, x + w * .6, y - 6); c.closePath(); c.stroke();
    }
  }
  function props(c, list) {
    (list || []).forEach(function (p) {
      c.save();
      if (p === 'sweat') { c.fillStyle = '#7dd3fc'; lw(c, 4); c.beginPath(); c.moveTo(402, 92); c.quadraticCurveTo(372, 142, 402, 152); c.quadraticCurveTo(432, 142, 402, 92); c.fill(); c.stroke(); }
      if (p === 'tears') { c.fillStyle = '#7dd3fc'; lw(c, 3); [[214, 215], [298, 215]].forEach(function (q) { c.beginPath(); c.moveTo(q[0], q[1]); c.quadraticCurveTo(q[0] - 26, q[1] + 52, q[0], q[1] + 58); c.quadraticCurveTo(q[0] + 26, q[1] + 52, q[0], q[1]); c.fill(); c.stroke(); }); }
      if (p === 'zzz') { c.fillStyle = '#38bdf8'; lw(c, 5); c.font = '800 54px ' + FONT; c.textAlign = 'center'; c.strokeStyle = '#fff'; c.lineWidth = 8; c.strokeText('Z', 400, 100); c.fillText('Z', 400, 100); c.font = '800 36px ' + FONT; c.strokeText('z', 440, 56); c.fillText('z', 440, 56); }
      if (p === 'hearts') { heart(c, 400, 90, 40, '#fb7185'); heart(c, 112, 70, 28, '#f43f5e'); heart(c, 440, 170, 24, '#fda4af'); }
      if (p === 'vein') { c.strokeStyle = '#ef4444'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(372, 78); c.lineTo(398, 104); c.moveTo(398, 78); c.lineTo(372, 104); c.moveTo(380, 70); c.lineTo(380, 62); c.stroke(); }
      if (p === 'confetti') { var cl = ['#f43f5e', '#facc15', '#22d3ee', '#a78bfa', '#34d399']; for (var i = 0; i < 16; i++) { c.save(); c.translate(40 + (i * 97) % 440, 30 + (i * 53) % 150); c.rotate(i); c.fillStyle = cl[i % 5]; c.fillRect(-7, -4, 14, 8); c.restore(); } }
      if (p === 'stars') { c.fillStyle = '#facc15'; [[96, 110, 16], [430, 120, 20], [110, 250, 12]].forEach(function (s) { c.beginPath(); for (var j = 0; j < 8; j++) { var a = j * Math.PI / 4, rr = j % 2 ? s[2] * .35 : s[2]; c.lineTo(s[0] + Math.cos(a) * rr, s[1] + Math.sin(a) * rr); } c.closePath(); c.fill(); }); }
      if (p === 'tea') { c.translate(420, 330); lw(c, 5); c.beginPath(); c.moveTo(-30, -45); c.lineTo(30, -45); c.lineTo(22, 40); c.lineTo(-22, 40); c.closePath(); c.fillStyle = 'rgba(255,255,255,.85)'; c.fill(); c.stroke(); c.beginPath(); c.moveTo(-26, -20); c.lineTo(26, -20); c.lineTo(20, 38); c.lineTo(-20, 38); c.closePath(); c.fillStyle = '#b45309'; c.fill(); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-6, -58); c.quadraticCurveTo(-18, -74, -6, -90); c.moveTo(10, -58); c.quadraticCurveTo(-2, -74, 10, -90); c.stroke(); }
      if (p === 'plate') { c.translate(418, 340); lw(c, 5); ell(c, 0, 20, 62, 20, '#fff'); ell(c, 0, 8, 40, 22, '#f59e0b'); ell(c, -8, 0, 18, 10, '#fde68a', false); }
      if (p === 'phone') { c.translate(420, 330); c.rotate(.2); lw(c, 5); rrect(c, -26, -46, 52, 92, 10); c.fillStyle = '#334155'; c.fill(); c.stroke(); c.fillStyle = '#38bdf8'; c.fillRect(-18, -36, 36, 66); }
      c.restore();
    });
  }
  function rrect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  var CX = 256, CY = 190;
  function eyesBrows(c, e, ex, ey, er, browCol) {
    var ke = e.eyes || 'open', kl = ke === 'wink' ? 'open' : ke, kr = ke === 'wink' ? 'happy' : ke;
    if (ke === 'cool') {
      lw(c, 6); c.fillStyle = '#111827';
      rrect(c, CX - ex - er * 1.5, ey - er * 1.1, er * 3, er * 2.1, er * .6); c.fill(); c.stroke(); rrect(c, CX + ex - er * 1.5, ey - er * 1.1, er * 3, er * 2.1, er * .6); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(CX - ex + er * 1.5, ey - er * .2); c.lineTo(CX + ex - er * 1.5, ey - er * .2); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(CX - ex - er, ey - er * .8, er * .5, er * 1.2); c.fillRect(CX + ex - er, ey - er * .8, er * .5, er * 1.2);
    } else { eye(c, CX - ex, ey, er, kl); eye(c, CX + ex, ey, er, kr); }
    if (e.brow) { brow(c, CX - ex, ey - er * 1.9, er * 2.2, e.brow, 1, browCol); brow(c, CX + ex, ey - er * 1.9, er * 2.2, e.brow, -1, browCol); }
  }
  function falcon(c, e) {
    // wings (arms)
    lw(c, 7); var wg = grad(c, 0, 300, 0, 420, '#0ea5e9', '#075985');
    [-1, 1].forEach(function (s) { c.save(); c.translate(CX + s * 120, 330); c.rotate(s * (e.wave && s === 1 ? -1.0 : 0.35)); c.beginPath(); c.moveTo(0, -30); c.quadraticCurveTo(s * 70, -10, s * 58, 74); c.quadraticCurveTo(s * 30, 48, s * 12, 86); c.quadraticCurveTo(-s * 8, 40, -s * 14, 10); c.closePath(); c.fillStyle = wg; c.fill(); c.stroke(); c.restore(); });
    // body
    c.beginPath(); c.ellipse(CX, 345, 98, 88, 0, 0, 6.2832); c.fillStyle = grad(c, 0, 270, 0, 430, '#38bdf8', '#0369a1'); c.fill(); c.stroke();
    c.fillStyle = '#e0f2fe'; c.beginPath(); c.ellipse(CX, 360, 58, 62, 0, 0, 6.2832); c.fill();
    c.strokeStyle = '#7dd3fc'; c.lineWidth = 4; for (var i = 0; i < 3; i++) { c.beginPath(); c.arc(CX, 345 + i * 22, 24, .2, 2.94); c.stroke(); }
    lw(c, 7);
    // crest
    c.fillStyle = '#0369a1'; [[-52, -8, 70], [0, 0, 92], [52, -8, 70]].forEach(function (t) { c.beginPath(); c.moveTo(CX + t[0] - 26, 90); c.quadraticCurveTo(CX + t[0] - 8, 90 - t[2] * .5, CX + t[0] + (t[0] > 0 ? 26 : t[0] < 0 ? -22 : 0), 90 - t[2]); c.quadraticCurveTo(CX + t[0] + 14, 90 - t[2] * .4, CX + t[0] + 26, 96); c.closePath(); c.fill(); c.stroke(); });
    // head
    c.beginPath(); c.ellipse(CX, CY, 138, 122, 0, 0, 6.2832); c.fillStyle = grad(c, 0, 70, 0, 310, '#38bdf8', '#0284c7'); c.fill(); c.stroke();
    // face mask
    c.beginPath(); c.moveTo(CX, 150); c.bezierCurveTo(CX - 40, 130, CX - 126, 130, CX - 120, 200); c.bezierCurveTo(CX - 112, 270, CX - 30, 300, CX, 296); c.bezierCurveTo(CX + 30, 300, CX + 112, 270, CX + 120, 200); c.bezierCurveTo(CX + 126, 130, CX + 40, 130, CX, 150); c.fillStyle = '#f0f9ff'; c.fill(); lw(c, 4); c.stroke(); lw(c, 7);
    eyesBrows(c, e, 52, 178, 24, '#0c4a6e');
    // beak
    var m = e.mouth || 'smile', op = (m === 'grin' || m === 'laugh' || m === 'tongue') ? 34 : (m === 'o' ? 26 : 0);
    c.fillStyle = '#fbbf24';
    c.beginPath(); c.moveTo(CX - 40, 212); c.quadraticCurveTo(CX, 190, CX + 40, 212); c.quadraticCurveTo(CX + 22, 250, CX, 262 - (op ? 6 : 0)); c.quadraticCurveTo(CX - 22, 250, CX - 40, 212); c.closePath(); c.fill(); c.stroke();
    if (op) { c.beginPath(); c.moveTo(CX - 30, 246); c.quadraticCurveTo(CX, 258 + op * .6, CX + 30, 246); c.quadraticCurveTo(CX + 14, 262 + op, CX, 266 + op); c.quadraticCurveTo(CX - 14, 262 + op, CX - 30, 246); c.fillStyle = '#f59e0b'; c.fill(); c.stroke(); if (m === 'laugh' || m === 'tongue') { c.fillStyle = '#f87171'; c.beginPath(); c.ellipse(CX, 262 + op * .8, 12, 9, 0, 0, 6.2832); c.fill(); } }
    else if (m === 'frown') { c.beginPath(); c.moveTo(CX - 20, 246); c.quadraticCurveTo(CX, 238, CX + 20, 246); c.stroke(); }
    c.strokeStyle = '#d97706'; c.lineWidth = 4; c.beginPath(); c.moveTo(CX - 4, 204); c.lineTo(CX + 4, 204); c.stroke();
    // cheeks
    c.fillStyle = 'rgba(251,113,133,.45)'; c.beginPath(); c.ellipse(CX - 96, 230, 18, 11, 0, 0, 6.2832); c.fill(); c.beginPath(); c.ellipse(CX + 96, 230, 18, 11, 0, 0, 6.2832); c.fill();
  }
  function human(c, e, k) {
    var skin = k === 'sim' ? '#f1c27d' : k === 'woman' ? '#f0c8a0' : '#d9a066', hair = '#1f1630';
    // body / clothes
    var cloth = k === 'man' ? ['#fafafa', '#cbd5e1'] : k === 'woman' ? ['#0f766e', '#115e59'] : ['#6d28d9', '#4c1d95'];
    if (k === 'woman') { lw(c, 7); c.beginPath(); c.moveTo(CX - 170, 400); c.bezierCurveTo(CX - 190, 250, CX - 150, 60, CX, 56); c.bezierCurveTo(CX + 150, 60, CX + 190, 250, CX + 170, 400); c.closePath(); c.fillStyle = grad(c, 0, 60, 0, 400, '#14b8a6', '#0f766e'); c.fill(); c.stroke(); }
    lw(c, 7); c.beginPath(); c.moveTo(CX - 150, 420); c.quadraticCurveTo(CX - 140, 310, CX - 40, 300); c.lineTo(CX + 40, 300); c.quadraticCurveTo(CX + 140, 310, CX + 150, 420); c.closePath(); c.fillStyle = grad(c, 0, 300, 0, 420, cloth[0], cloth[1]); c.fill(); c.stroke();
    if (k === 'sim') { c.strokeStyle = '#facc15'; c.lineWidth = 10; c.beginPath(); c.arc(CX, 300, 60, .15, 3, false); c.stroke(); c.fillStyle = '#facc15'; ell(c, CX - 62, 330, 20, 26, '#facc15'); ell(c, CX + 62, 330, 20, 26, '#facc15'); lw(c, 6); }
    if (k === 'man') { c.beginPath(); c.moveTo(CX - 30, 302); c.lineTo(CX, 350); c.lineTo(CX + 30, 302); c.stroke(); }
    // neck
    lw(c, 7); c.fillStyle = skin; rrect(c, CX - 36, 270, 72, 50, 14); c.fill(); c.stroke();
    // ears
    ell(c, CX - 126, CY + 8, 22, 30, skin); ell(c, CX + 126, CY + 8, 22, 30, skin);
    if (k === 'sim') { /* hair back */ }
    // head
    c.beginPath(); c.ellipse(CX, CY, 124, 128, 0, 0, 6.2832); c.fillStyle = grad(c, 0, 60, 0, 320, skin, k === 'woman' ? '#e3b184' : '#c88d55'); c.fill(); c.stroke();
    // hair / hats
    if (k === 'man') { c.fillStyle = '#b91c1c'; rrect(c, CX - 72, 22, 144, 82, 16); c.fill(); c.stroke(); c.fillStyle = '#991b1b'; c.beginPath(); c.ellipse(CX, 104, 96, 18, 0, 0, 6.2832); c.fill(); c.stroke(); c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); c.moveTo(CX, 24); c.quadraticCurveTo(CX + 70, 20, CX + 82, 70); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(CX + 82, 78, 9, 0, 6.2832); c.fill(); }
    if (k === 'woman') { c.beginPath(); c.moveTo(CX - 118, 200); c.bezierCurveTo(CX - 128, 110, CX - 70, 78, CX, 80); c.bezierCurveTo(CX + 70, 78, CX + 128, 110, CX + 118, 200); c.bezierCurveTo(CX + 100, 120, CX + 40, 112, CX, 112); c.bezierCurveTo(CX - 40, 112, CX - 100, 120, CX - 118, 200); c.closePath(); c.fillStyle = '#14b8a6'; c.fill(); lw(c, 7); c.stroke(); }
    if (k === 'sim') { c.fillStyle = hair; c.beginPath(); c.moveTo(CX - 126, 170); c.bezierCurveTo(CX - 140, 70, CX - 60, 40, CX - 10, 64); c.lineTo(CX + 10, 36); c.lineTo(CX + 40, 66); c.lineTo(CX + 70, 42); c.bezierCurveTo(CX + 130, 60, CX + 140, 110, CX + 126, 170); c.bezierCurveTo(CX + 100, 120, CX + 40, 104, CX - 10, 118); c.bezierCurveTo(CX - 70, 112, CX - 104, 130, CX - 126, 170); c.closePath(); c.fill(); lw(c, 7); c.stroke(); }
    var browCol = k === 'woman' ? '#3b2417' : hair;
    eyesBrows(c, e, 50, 178, 21, browCol);
    if (k === 'woman') { c.strokeStyle = INK; c.lineWidth = 4; [-1, 1].forEach(function (s) { c.beginPath(); c.moveTo(CX + s * 70, 164); c.lineTo(CX + s * 76, 156); c.moveTo(CX + s * 60, 160); c.lineTo(CX + s * 62, 150); c.stroke(); }); }
    // nose
    lw(c, 5); c.beginPath(); c.moveTo(CX - 8, 206); c.quadraticCurveTo(CX, 226, CX + 12, 214); c.stroke();
    if (k !== 'man') { c.fillStyle = 'rgba(244,114,128,.35)'; c.beginPath(); c.ellipse(CX - 84, 226, 18, 11, 0, 0, 6.2832); c.fill(); c.beginPath(); c.ellipse(CX + 84, 226, 18, 11, 0, 0, 6.2832); c.fill(); }
    mouth(c, CX, k === 'man' ? 262 : 252, 56, e.mouth || 'smile');
    if (k === 'man') { // big mustache over the mouth
      c.fillStyle = hair; lw(c, 5); c.beginPath(); c.moveTo(CX, 236); c.bezierCurveTo(CX - 30, 222, CX - 78, 232, CX - 84, 252); c.bezierCurveTo(CX - 60, 246, CX - 30, 252, CX, 246); c.bezierCurveTo(CX + 30, 252, CX + 60, 246, CX + 84, 252); c.bezierCurveTo(CX + 78, 232, CX + 30, 222, CX, 236); c.closePath(); c.fill(); c.stroke();
    }
    if (k === 'sim') { c.fillStyle = hair; /* stubble none */ }
  }
  function drawArt(c, e) {
    c.save();
    if (e.ch === 'falcon') falcon(c, e); else human(c, e, e.ch);
    props(c, e.props);
    c.restore();
  }

  function caption(c, text) {
    if (!text || !String(text).trim()) return;
    c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.lineJoin = 'round';
    var f = fitText(c, text, 440, 110), y0 = 470 - f.lines.length * f.lh;
    c.font = '800 ' + f.size + 'px ' + FONT;
    f.lines.forEach(function (l, i) { var yy = y0 + f.lh * (i + 0.8); c.lineWidth = Math.max(8, f.size / 4.6); c.strokeStyle = INK; c.strokeText(l, S / 2, yy); c.fillStyle = '#fff'; c.fillText(l, S / 2, yy); });
  }
  function outlined(L, sz) {
    var o = document.createElement('canvas'); o.width = o.height = sz; var c = o.getContext('2d'), k = sz / 512, r = 11 * k;
    var T = document.createElement('canvas'); T.width = T.height = sz; var t = T.getContext('2d'); t.drawImage(L, 0, 0); t.globalCompositeOperation = 'source-in'; t.fillStyle = '#fff'; t.fillRect(0, 0, sz, sz);
    for (var a = 0; a < 20; a++) { var an = a * Math.PI / 10; c.drawImage(T, Math.cos(an) * r, Math.sin(an) * r); }
    c.drawImage(L, 0, 0); return o;
  }
  function build(sp, text, sz) {
    var L = document.createElement('canvas'); L.width = L.height = sz; var c = L.getContext('2d'); c.scale(sz / 512, sz / 512);
    drawArt(c, sp); caption(c, text);
    return outlined(L, sz);
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
    var packs = PACKS.filter(function (p) { return off.indexOf(p.id) < 0; });
    if (extra.length) { var faces = PACKS[0].t; packs = packs.concat([{ id: 'extra', ar: 'إضافات جديدة', en: 'New picks', ch: 'falcon', t: extra.map(function (x, i) { var f = faces[i % faces.length]; return [x, f[1], f[2], f[3], f[4], f[5]]; }) }]); }
    var mode = 'art', sel = packs.length ? { ch: packs[0].ch, it: packs[0].t[0] } : { ch: 'falcon', it: PACKS[0].t[0] }, img = null, fit = false, raf = 0;
    root.innerHTML = '<a class="pf-g-exit" href="#/fun">' + (ar ? '✕ خروج' : '✕ Exit') + '</a><div class="pf-pagehead"><div class="pf-eyebrow">STICKERS</div><h2 class="pf-h2">' + s.title + '</h2></div><p class="pf-para">' + s.sub + '</p>' +
      '<div class="pf-st-prev"><canvas id="pf-st-c" width="' + S + '" height="' + S + '" aria-label="sticker"></canvas></div>' +
      '<label class="pf-mm-lab" for="pf-st-t">' + s.text + '</label><textarea id="pf-st-t" class="pf-mm-in" rows="2" maxlength="40"></textarea>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="pf-st-dl">' + s.dl + '</button><button type="button" class="pf-mm-btn" id="pf-st-sh">' + s.sh + '</button></div>' +
      '<h3 class="pf-h3">' + s.packs + '</h3><div id="pf-st-packs"></div>' +
      '<label class="pf-mm-btn pf-mm-own" for="pf-st-file">' + s.photo + '</label><input type="file" id="pf-st-file" accept="image/*" hidden><p class="pf-mm-note" id="pf-st-err" hidden></p>' +
      '<div class="pf-mm-btns" id="pf-st-fitw" hidden><button type="button" class="pf-mm-btn" id="pf-st-fit">' + s.fitb + '</button></div><p class="pf-mm-note">' + s.note + '</p>';
    var cv = document.getElementById('pf-st-c'), ctx = cv.getContext('2d'), ta = document.getElementById('pf-st-t'), host = document.getElementById('pf-st-packs');
    function draw() { raf = 0; ctx.clearRect(0, 0, S, S); if (mode === 'photo' && img) photoSticker(ctx, img, ta.value, fit); else ctx.drawImage(build(spec(sel.ch, sel.it), ta.value, S), 0, 0); }
    function sched() { if (!raf) raf = requestAnimationFrame(draw); }
    ta.value = sel.it[0]; ta.addEventListener('input', sched);
    var todo = [];
    packs.forEach(function (p) {
      var h = document.createElement('div'); h.className = 'pf-st-pack'; h.innerHTML = '<div class="pf-st-pn">' + (ar ? p.ar : p.en) + '</div>';
      var g = document.createElement('div'); g.className = 'pf-st-grid';
      p.t.forEach(function (it) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'pf-st-chip'; b.setAttribute('aria-label', it[0]);
        var cn = document.createElement('canvas'); cn.width = cn.height = 200; b.appendChild(cn); todo.push([cn, p.ch, it]);
        b.addEventListener('click', function () { mode = 'art'; sel = { ch: p.ch, it: it }; ta.value = it[0]; document.getElementById('pf-st-fitw').hidden = true; sched(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
        g.appendChild(b);
      });
      h.appendChild(g); host.appendChild(h);
    });
    var alive = true;
    function pump() { if (!alive || !document.body.contains(host)) return; var j = todo.shift(); if (!j) return; j[0].getContext('2d').drawImage(build(spec(j[1], j[2]), j[2][0], 200), 0, 0); setTimeout(pump, 16); }
    function start() { setTimeout(pump, 30); }
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
    var go = function () { draw(); start(); };
    if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('800 60px Cairo', 'ابج')]).catch(function () {}).then(go); else go();
  }
  window.pfStickers = { render: render };
})();
