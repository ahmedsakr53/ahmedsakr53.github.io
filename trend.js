/* Trend: 5 small client-side tools (names decoration, player card, bio, nickname, name logo). Lazy loaded, nothing leaves the device. */
(function () {
  'use strict';
  var API = 'https://saqr-ahmed.ahmedsakr5326.workers.dev';
  var MARK = 'عالم صقر';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function copy(text, btn, ar) {
    var done = function () { var o = btn.textContent; btn.textContent = ar ? 'اتنسخ ✓' : 'Copied ✓'; setTimeout(function () { btn.textContent = o; }, 1300); };
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(done, function () { fb(); }); } else fb();
    function fb() { var ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { } document.body.removeChild(ta); }
  }
  function download(canvas, name) {
    canvas.toBlob(function (b) { if (!b) return; var u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); }, 'image/png');
  }
  function fonts() { try { return Promise.all([document.fonts.load('700 40px "IBM Plex Sans Arabic"'), document.fonts.load('700 40px "Space Grotesk"')]).catch(function () { }); } catch (e) { return Promise.resolve(); } }

  /* ---------- default text packs (admin can add more) ---------- */
  var BIOS = {
    gamer: ['{name} | لعّيب على الآخر 🎮', 'مش بخسر، بتعلّم 🎮 {name}', '{name}: الجيم عندي أسلوب حياة', 'ريسباون وأرجع أقوى 🔥', 'لو دخلت اللوبي اعرف إن {name} هناك', 'لاعب بالنهار، أسطورة بالليل 🎮'],
    code: ['{name} | بكتب كود وبشرب قهوة ☕', 'بحوّل القهوة لكود 💻', '{name}: المشكلة مش في الكود، المشكلة في الـcache', 'git commit -m "أنا"', 'مطوّر بيدوّر على السيمي كولون الناقصة', 'Hello World من {name} 👋'],
    cyber: ['{name} | بفكّر زي الهاكر وبحمي زي الخبير 🛡️', 'الأمان مش منتج، الأمان عادة 🔐', '{name}: كل باسوورد قوي بيبدأ بقرار', 'ما بضغطش على أي لينك 😎', 'أمن سيبراني تحت التدريب 🔒', 'بدوّر على الثغرات مش على المشاكل'],
    study: ['{name} | طالب جدع وماشي بالهداية 📚', 'نص ساعة مذاكرة ونص ساعة تأجيل 😅', '{name}: الامتحان قرّب والحماس لسه بعيد', 'أحلم كبير وأذاكر صغير ✨', 'قهوة + مذاكرة + أمل = نجاح', 'طالب مجتهد، نايم متأخر'],
    fun: ['{name} | مش كسول، بوفّر طاقة 😴', 'عايش اللحظة، والشحن 5%', '{name}: عندي ثقة، مش عارف منين', 'نمط حياتي: لسه هعمل', 'لو الضحك رياضة كنت بطل 🏆', 'أنا بخير، ده بس وشي كده'],
    chill: ['{name} ✨ هادي وعدّي', 'خليك رايق والدنيا هتمشي 🌙', '{name} | حياة بسيطة وقلب مرتاح', 'ببتسم أكتر ما بشرح', 'كل حاجة في وقتها 🌿', 'سلام نفسي قبل أي حاجة']
  };
  var BIO_LAB = { gamer: 'جيمر', code: 'مبرمج', cyber: 'سايبر', study: 'طالب', fun: 'هزار', chill: 'رايق', custom: 'من الأدمن' };
  var ADJ = ['الصقر', 'الأسطورة', 'الظل', 'الفهد', 'الذهبي', 'الأسود', 'السريع', 'الهادي', 'المجنون', 'الجبّار', 'النيون', 'الملكي'];
  var NOUN = ['صقر', 'ذئب', 'نمر', 'تنين', 'شبح', 'فارس', 'قناص', 'ملك', 'نينجا', 'عفريت', 'رعد', 'برق'];
  var EN_A = ['Dark', 'Swift', 'Neon', 'Silent', 'Iron', 'Shadow', 'Golden', 'Crazy', 'Cyber', 'Royal', 'Frozen', 'Wild'];
  var EN_N = ['Falcon', 'Wolf', 'Tiger', 'Dragon', 'Ghost', 'Knight', 'Sniper', 'King', 'Ninja', 'Storm', 'Blade', 'Viper'];

  /* ---------- 1. names decoration ---------- */
  function mapLatin(upStart, loStart, digStart, exc) {
    return function (s) {
      var out = '';
      for (var ch of s) {
        var c = ch.charCodeAt(0);
        if (exc && exc[ch]) out += exc[ch];
        else if (c >= 65 && c <= 90 && upStart) out += String.fromCodePoint(upStart + c - 65);
        else if (c >= 97 && c <= 122 && loStart) out += String.fromCodePoint(loStart + c - 97);
        else if (c >= 48 && c <= 57 && digStart) out += String.fromCodePoint(digStart + c - 48);
        else out += ch;
      }
      return out;
    };
  }
  var SC = { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ' };
  var FLIP = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z' };
  var STYLES = [
    ['bold', mapLatin(0x1D400, 0x1D41A, 0x1D7CE)],
    ['italic', mapLatin(0x1D434, 0x1D44E, 0, { h: 'ℎ' })],
    ['bold italic', mapLatin(0x1D468, 0x1D482, 0x1D7CE)],
    ['script', mapLatin(0x1D49C, 0x1D4B6, 0, { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' })],
    ['bold script', mapLatin(0x1D4D0, 0x1D4EA, 0x1D7CE)],
    ['fraktur', mapLatin(0x1D504, 0x1D51E, 0, { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' })],
    ['double', mapLatin(0x1D538, 0x1D552, 0x1D7D8, { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' })],
    ['mono', mapLatin(0x1D670, 0x1D68A, 0x1D7F6)],
    ['sans bold', mapLatin(0x1D5D4, 0x1D5EE, 0x1D7EC)],
    ['circle', mapLatin(0x24B6, 0x24D0, 0, {})],
    ['wide', function (s) { var o = ''; for (var ch of s) { var c = ch.charCodeAt(0); o += (c >= 33 && c <= 126) ? String.fromCharCode(c + 0xFEE0) : (c === 32 ? '\u3000' : ch); } return o; }],
    ['small caps', function (s) { var o = ''; for (var ch of s) o += SC[ch.toLowerCase()] && /[a-z]/i.test(ch) ? SC[ch.toLowerCase()] : ch; return o; }],
    ['flip', function (s) { var o = ''; for (var ch of s) o = (FLIP[ch.toLowerCase()] && /[a-z]/i.test(ch) ? FLIP[ch.toLowerCase()] : ch) + o; return o; }],
    ['strike', function (s) { var o = ''; for (var ch of s) o += ch + '\u0336'; return o; }],
    ['underline', function (s) { var o = ''; for (var ch of s) o += ch + '\u0332'; return o; }]
  ];
  var WRAP = [['꧁', '꧂'], ['༺', '༻'], ['★彡', '彡★'], ['♛ ', ' ♛'], ['⚡ ', ' ⚡'], ['【', '】'], ['✦ ', ' ✦'], ['☠ ', ' ☠'], ['«', '»'], ['❖ ', ' ❖'], ['• • ', ' • •'], ['▄︻デ ', ' ══━一']];
  var NOJOIN = 'ادذرزوؤةىإأآء';
  function tatweel(s) {
    var o = '', arr = Array.from(s);
    for (var i = 0; i < arr.length; i++) {
      o += arr[i];
      var n = arr[i + 1];
      if (n && /[\u0621-\u064A]/.test(arr[i]) && /[\u0621-\u064A]/.test(n) && NOJOIN.indexOf(arr[i]) < 0) o += 'ـ';
    }
    return o;
  }
  function decoList(name) {
    var out = [], hasAr = /[\u0600-\u06FF]/.test(name), hasLa = /[A-Za-z0-9]/.test(name);
    if (hasAr) { out.push(tatweel(name)); out.push('ـ' + tatweel(name) + 'ـ'); }
    if (hasLa) STYLES.forEach(function (s) { out.push(s[1](name)); });
    WRAP.forEach(function (w, i) { out.push(w[0] + (hasAr ? tatweel(name) : (hasLa ? STYLES[i % STYLES.length][1](name) : name)) + w[1]); });
    return out;
  }
  function toolDeco(box, ar) {
    box.innerHTML = '<label class="pf-mm-lab" for="trd-in">' + esc(ar ? 'اكتب اسمك' : 'Type your name') + '</label><input class="pf-mm-in" id="trd-in" maxlength="24" autocomplete="off" placeholder="' + esc(ar ? 'مثلاً: Ahmed أو أحمد' : 'e.g. Ahmed') + '"><div id="trd-out" class="pf-tr-list"></div><p class="pf-mm-note">' + esc(ar ? 'الحروف الإنجليزي بتتزخرف بأشكال كتير، والعربي بيتمدّد ويتحط في إطارات.' : 'Latin letters get many styles; Arabic gets stretched and framed.') + '</p>';
    var inp = box.querySelector('#trd-in'), out = box.querySelector('#trd-out');
    function draw() {
      var v = inp.value.trim();
      if (!v) { out.innerHTML = ''; return; }
      out.innerHTML = decoList(v).map(function (t, i) { return '<div class="pf-tr-row"><span class="pf-tr-txt" dir="auto">' + esc(t) + '</span><button type="button" class="pf-tr-cp" data-i="' + i + '">' + esc(ar ? 'نسخ' : 'Copy') + '</button></div>'; }).join('');
      var list = decoList(v);
      Array.prototype.forEach.call(out.querySelectorAll('.pf-tr-cp'), function (b) { b.addEventListener('click', function () { copy(list[+b.dataset.i], b, ar); }); });
    }
    inp.addEventListener('input', draw);
  }

  /* ---------- 2. player card ---------- */
  var THEMES = {
    gold: { a: '#f7e08a', b: '#c8962a', ink: '#3a2a05', lab: 'ذهبي' },
    black: { a: '#3a3a44', b: '#0c0c10', ink: '#f5d36b', lab: 'أسود' },
    cyan: { a: '#8ff3ff', b: '#1585a8', ink: '#032a36', lab: 'سيان' },
    red: { a: '#ff8a8a', b: '#a1121f', ink: '#fff3f3', lab: 'أحمر' },
    green: { a: '#b6ff8a', b: '#168a3c', ink: '#042a10', lab: 'أخضر' }
  };
  var POS = ['ST', 'LW', 'RW', 'CAM', 'CM', 'CDM', 'LB', 'CB', 'RB', 'GK'];
  var STATS = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'];
  function fit(ctx, text, maxW, size, weight, fam) {
    var s = size; ctx.font = weight + ' ' + s + 'px ' + fam;
    while (ctx.measureText(text).width > maxW && s > 14) { s -= 2; ctx.font = weight + ' ' + s + 'px ' + fam; }
    return s;
  }
  function drawCard(cv, d) {
    var W = 600, H = 840; cv.width = W; cv.height = H;
    var x = cv.getContext('2d'), th = THEMES[d.theme] || THEMES.gold, AR = '"IBM Plex Sans Arabic","Space Grotesk",sans-serif', EN = '"Space Grotesk","IBM Plex Sans Arabic",sans-serif';
    x.clearRect(0, 0, W, H);
    x.beginPath();
    x.moveTo(300, 14); x.bezierCurveTo(430, 14, 520, 60, 580, 110); x.lineTo(580, 640); x.bezierCurveTo(580, 730, 470, 790, 300, 826); x.bezierCurveTo(130, 790, 20, 730, 20, 640); x.lineTo(20, 110); x.bezierCurveTo(80, 60, 170, 14, 300, 14); x.closePath();
    var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, th.a); g.addColorStop(1, th.b); x.fillStyle = g; x.fill();
    x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,.45)'; x.stroke();
    x.save(); x.clip();
    var gl = x.createLinearGradient(0, 0, W, 0); gl.addColorStop(0, 'rgba(255,255,255,.22)'); gl.addColorStop(.5, 'rgba(255,255,255,0)'); gl.addColorStop(1, 'rgba(255,255,255,.12)'); x.fillStyle = gl; x.fillRect(0, 0, W, H);
    x.fillStyle = 'rgba(255,255,255,.10)'; x.beginPath(); x.arc(420, 330, 210, 0, 7); x.fill();
    x.restore();
    x.fillStyle = th.ink; x.textBaseline = 'alphabetic';
    x.textAlign = 'center';
    x.font = '800 120px ' + EN; x.fillText(String(d.rating), 150, 220);
    x.font = '700 44px ' + EN; x.fillText(d.pos, 150, 272);
    x.fillRect(100, 292, 100, 4);
    x.font = '60px sans-serif'; x.fillText(d.flag || '🏳️', 150, 372);
    x.font = '120px sans-serif'; x.globalAlpha = .9; x.fillText(d.emoji || '⚽', 400, 330); x.globalAlpha = 1;
    var nm = d.name || (d.ar ? 'اسمك' : 'YOUR NAME');
    var sz = fit(x, nm, 440, 64, '800', /[\u0600-\u06FF]/.test(nm) ? AR : EN);
    x.textAlign = 'center'; x.fillText(nm, 300, 470);
    x.fillStyle = th.ink; x.globalAlpha = .45; x.fillRect(110, 494, 380, 3); x.globalAlpha = 1;
    x.fillStyle = th.ink;
    for (var i = 0; i < 6; i++) {
      var col = i < 3 ? 0 : 1, row = i % 3, bx = col ? 330 : 90, by = 560 + row * 62;
      x.textAlign = 'left'; x.font = '800 44px ' + EN; x.fillText(String(d.stats[i]), bx, by);
      x.font = '600 32px ' + EN; x.globalAlpha = .8; x.fillText(STATS[i], bx + 78, by); x.globalAlpha = 1;
    }
    x.textAlign = 'center'; x.globalAlpha = .6; x.font = '600 22px ' + AR; x.fillText(MARK, 300, 790); x.globalAlpha = 1;
  }
  function toolCard(box, ar) {
    var tOpts = Object.keys(THEMES).map(function (k) { return '<option value="' + k + '">' + esc(THEMES[k].lab) + '</option>'; }).join('');
    var pOpts = POS.map(function (p) { return '<option>' + p + '</option>'; }).join('');
    var sIn = STATS.map(function (s, i) { return '<label class="pf-tr-st"><span>' + s + '</span><input type="number" class="pf-mm-in trc-s" min="1" max="99" value="' + (80 + i * 2) + '" inputmode="numeric"></label>'; }).join('');
    box.innerHTML = '<div class="pf-mm-prev pf-tr-prev"><canvas id="trc-cv" aria-label="' + esc(ar ? 'كارت اللاعب' : 'Player card') + '"></canvas></div>' +
      '<label class="pf-mm-lab" for="trc-n">' + esc(ar ? 'اسم اللاعب' : 'Player name') + '</label><input class="pf-mm-in" id="trc-n" maxlength="16" autocomplete="off" placeholder="' + esc(ar ? 'اسمك' : 'Your name') + '">' +
      '<div class="pf-tr-two"><div><label class="pf-mm-lab" for="trc-p">' + esc(ar ? 'المركز' : 'Position') + '</label><select class="pf-mm-in" id="trc-p">' + pOpts + '</select></div><div><label class="pf-mm-lab" for="trc-r">' + esc(ar ? 'التقييم' : 'Rating') + '</label><input class="pf-mm-in" id="trc-r" type="number" min="40" max="99" value="90" inputmode="numeric"></div></div>' +
      '<div class="pf-tr-two"><div><label class="pf-mm-lab" for="trc-f">' + esc(ar ? 'علم (إيموجي)' : 'Flag (emoji)') + '</label><input class="pf-mm-in" id="trc-f" maxlength="4" value="🇪🇬"></div><div><label class="pf-mm-lab" for="trc-e">' + esc(ar ? 'رمز اللاعب' : 'Icon') + '</label><input class="pf-mm-in" id="trc-e" maxlength="4" value="⚽"></div></div>' +
      '<label class="pf-mm-lab" for="trc-t">' + esc(ar ? 'اللون' : 'Theme') + '</label><select class="pf-mm-in" id="trc-t">' + tOpts + '</select>' +
      '<div class="pf-tr-sts">' + sIn + '</div>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="trc-dl">' + esc(ar ? 'نزّل الكارت' : 'Download card') + '</button></div><p class="pf-mm-note">' + esc(ar ? 'كارت تخيّلي للتسلية. بيتحفظ صورة PNG على جهازك.' : 'A fun fictional card, saved as PNG on your device.') + '</p>';
    var cv = box.querySelector('#trc-cv');
    function val() {
      var r = Math.max(40, Math.min(99, parseInt(box.querySelector('#trc-r').value, 10) || 90));
      return { name: box.querySelector('#trc-n').value.trim(), pos: box.querySelector('#trc-p').value, rating: r, flag: box.querySelector('#trc-f').value, emoji: box.querySelector('#trc-e').value, theme: box.querySelector('#trc-t').value, ar: ar, stats: Array.prototype.map.call(box.querySelectorAll('.trc-s'), function (i) { return Math.max(1, Math.min(99, parseInt(i.value, 10) || 50)); }) };
    }
    var timer = 0;
    function redraw() { clearTimeout(timer); timer = setTimeout(function () { drawCard(cv, val()); }, 60); }
    fonts().then(function () { drawCard(cv, val()); });
    box.addEventListener('input', redraw); box.addEventListener('change', redraw);
    box.querySelector('#trc-dl').addEventListener('click', function () { drawCard(cv, val()); download(cv, 'sakr-card.png'); });
  }

  /* ---------- 3. bio ---------- */
  function toolBio(box, ar, cfg) {
    var cats = Object.keys(BIOS);
    var custom = (cfg.bios || []).filter(Boolean);
    if (custom.length) { BIOS.custom = custom; cats.push('custom'); }
    var chips = cats.map(function (k, i) { return '<button type="button" class="pf-tr-chip' + (i === 0 ? ' on' : '') + '" data-c="' + k + '">' + esc(BIO_LAB[k] || k) + '</button>'; }).join('');
    box.innerHTML = '<label class="pf-mm-lab" for="trb-n">' + esc(ar ? 'اسمك (اختياري)' : 'Your name (optional)') + '</label><input class="pf-mm-in" id="trb-n" maxlength="20" autocomplete="off"><div class="pf-tr-chips">' + chips + '</div><div id="trb-out" class="pf-tr-list"></div><div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="trb-go">' + esc(ar ? 'ولّد بايو' : 'Generate') + '</button></div>';
    var cat = cats[0], out = box.querySelector('#trb-out');
    function gen() {
      var nm = box.querySelector('#trb-n').value.trim(), list = shuffle(BIOS[cat] || []).slice(0, 4);
      var texts = list.map(function (t) { return nm ? t.replace(/\{name\}/g, nm) : t.replace(/\{name\}\s*[|:]?\s*/g, '').trim(); });
      out.innerHTML = texts.map(function (t, i) { return '<div class="pf-tr-row"><span class="pf-tr-txt" dir="auto">' + esc(t) + '</span><button type="button" class="pf-tr-cp" data-i="' + i + '">' + esc(ar ? 'نسخ' : 'Copy') + '</button></div>'; }).join('');
      Array.prototype.forEach.call(out.querySelectorAll('.pf-tr-cp'), function (b) { b.addEventListener('click', function () { copy(texts[+b.dataset.i], b, ar); }); });
    }
    box.querySelector('#trb-go').addEventListener('click', gen);
    Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (c) { c.addEventListener('click', function () { cat = c.dataset.c; Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (o) { o.classList.toggle('on', o === c); }); gen(); }); });
    gen();
  }

  /* ---------- 4. nickname ---------- */
  function toolNick(box, ar, cfg) {
    var adj = ADJ.concat((cfg.adj || []).filter(Boolean)), noun = NOUN.concat((cfg.noun || []).filter(Boolean));
    var mode = 'gamer';
    box.innerHTML = '<label class="pf-mm-lab" for="trn-k">' + esc(ar ? 'كلمة تحبها (اختياري)' : 'A word you like (optional)') + '</label><input class="pf-mm-in" id="trn-k" maxlength="14" autocomplete="off"><div class="pf-tr-chips">' +
      '<button type="button" class="pf-tr-chip on" data-m="gamer">' + esc(ar ? 'جيمر' : 'Gamer') + '</button><button type="button" class="pf-tr-chip" data-m="ar">' + esc(ar ? 'عربي' : 'Arabic') + '</button><button type="button" class="pf-tr-chip" data-m="hack">' + esc(ar ? 'هاكر' : 'Hacker') + '</button></div><div id="trn-out" class="pf-tr-list"></div><div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="trn-go">' + esc(ar ? 'ولّد أسماء' : 'Generate') + '</button></div>';
    var out = box.querySelector('#trn-out');
    function make() {
      var kw = box.querySelector('#trn-k').value.trim(), r = [];
      for (var i = 0; i < 8; i++) {
        var n = Math.floor(Math.random() * 99) + 1, s;
        if (mode === 'gamer') s = (kw && i % 2 ? kw : pick(EN_A)) + pick(EN_N) + (i % 3 ? '_' + n : 'X');
        else if (mode === 'ar') s = (kw || pick(noun)) + ' ' + pick(adj);
        else s = pick(['x', '0x', 'ghost', 'root', 'null', 'zero']) + '_' + (kw || pick(EN_N)).toLowerCase() + (i % 2 ? n : '');
        r.push(s);
      }
      out.innerHTML = r.map(function (t, i) { return '<div class="pf-tr-row"><span class="pf-tr-txt" dir="auto">' + esc(t) + '</span><button type="button" class="pf-tr-cp" data-i="' + i + '">' + esc(ar ? 'نسخ' : 'Copy') + '</button></div>'; }).join('');
      Array.prototype.forEach.call(out.querySelectorAll('.pf-tr-cp'), function (b) { b.addEventListener('click', function () { copy(r[+b.dataset.i], b, ar); }); });
    }
    box.querySelector('#trn-go').addEventListener('click', make);
    Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (c) { c.addEventListener('click', function () { mode = c.dataset.m; Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (o) { o.classList.toggle('on', o === c); }); make(); }); });
    make();
  }

  /* ---------- 5. name logo ---------- */
  var LOGO = [
    { id: 'neon', lab: 'نيون', c1: '#22d3ee', c2: '#ff2bd6', bg: '#0a0b1f' },
    { id: 'gold', lab: 'ذهبي', c1: '#f7e08a', c2: '#c8962a', bg: '#14100a' },
    { id: 'fire', lab: 'نار', c1: '#ffd23f', c2: '#ff3d00', bg: '#1a0a06' },
    { id: 'green', lab: 'هاكر', c1: '#39ff14', c2: '#0b8f2a', bg: '#020a04' },
    { id: 'violet', lab: 'بنفسجي', c1: '#c4b5fd', c2: '#7c3aed', bg: '#0f0a1f' },
    { id: 'mint', lab: 'فاتح', c1: '#0ea5e9', c2: '#6366f1', bg: '#f5f8ff' }
  ];
  function drawLogo(cv, d) {
    var S = 800; cv.width = S; cv.height = S;
    var x = cv.getContext('2d'), AR = '"IBM Plex Sans Arabic","Space Grotesk",sans-serif', EN = '"Space Grotesk","IBM Plex Sans Arabic",sans-serif';
    x.clearRect(0, 0, S, S);
    var shape = d.shape;
    function path() { if (shape === 'circle') { x.beginPath(); x.arc(400, 400, 380, 0, 7); } else if (shape === 'round') { x.beginPath(); if (x.roundRect) x.roundRect(30, 30, 740, 740, 150); else x.rect(30, 30, 740, 740); } else { x.beginPath(); x.rect(0, 0, S, S); } }
    path(); x.fillStyle = d.bg; x.fill();
    var g = x.createLinearGradient(0, 0, S, S); g.addColorStop(0, d.c1); g.addColorStop(1, d.c2);
    if (shape !== 'none') { x.save(); path(); x.lineWidth = 16; x.strokeStyle = g; x.stroke(); x.restore(); }
    var nm = d.name || (d.ar ? 'اسمك' : 'NAME'), fam = /[\u0600-\u06FF]/.test(nm) ? AR : EN;
    x.textAlign = 'center'; x.textBaseline = 'middle';
    var sz = fit(x, nm, 560, 190, '800', fam);
    x.shadowColor = d.c1; x.shadowBlur = d.glow ? 40 : 0;
    x.fillStyle = g; x.fillText(nm, 400, 380);
    x.shadowBlur = 0;
    var lg = x.createLinearGradient(220, 0, 580, 0); lg.addColorStop(0, d.c1); lg.addColorStop(1, d.c2);
    x.fillStyle = lg; x.fillRect(250, 380 + sz * 0.62, 300, 8);
    if (d.tag) { var tsz = fit(x, d.tag, 480, 52, '600', /[\u0600-\u06FF]/.test(d.tag) ? AR : EN); x.fillStyle = d.c1; x.globalAlpha = .9; x.fillText(d.tag, 400, 380 + sz * 0.62 + 62); x.globalAlpha = 1; }
    x.font = '600 24px ' + AR; x.fillStyle = d.c1; x.globalAlpha = .5; x.fillText(MARK, 400, shape === 'none' ? 760 : 700); x.globalAlpha = 1;
  }
  function toolLogo(box, ar) {
    var chips = LOGO.map(function (s, i) { return '<button type="button" class="pf-tr-chip' + (i === 0 ? ' on' : '') + '" data-s="' + i + '">' + esc(s.lab) + '</button>'; }).join('');
    box.innerHTML = '<div class="pf-mm-prev pf-tr-prev"><canvas id="trl-cv" aria-label="' + esc(ar ? 'اللوجو' : 'Logo') + '"></canvas></div><label class="pf-mm-lab" for="trl-n">' + esc(ar ? 'اسمك' : 'Your name') + '</label><input class="pf-mm-in" id="trl-n" maxlength="14" autocomplete="off" placeholder="' + esc(ar ? 'اسمك' : 'Your name') + '">' +
      '<label class="pf-mm-lab" for="trl-t">' + esc(ar ? 'سطر صغير تحته (اختياري)' : 'Small tagline (optional)') + '</label><input class="pf-mm-in" id="trl-t" maxlength="24" autocomplete="off">' +
      '<div class="pf-tr-chips">' + chips + '</div>' +
      '<div class="pf-tr-two"><div><label class="pf-mm-lab" for="trl-c1">' + esc(ar ? 'لون ١' : 'Color 1') + '</label><input type="color" class="pf-tr-col" id="trl-c1" value="' + LOGO[0].c1 + '"></div><div><label class="pf-mm-lab" for="trl-c2">' + esc(ar ? 'لون ٢' : 'Color 2') + '</label><input type="color" class="pf-tr-col" id="trl-c2" value="' + LOGO[0].c2 + '"></div></div>' +
      '<div class="pf-tr-two"><div><label class="pf-mm-lab" for="trl-sh">' + esc(ar ? 'الشكل' : 'Shape') + '</label><select class="pf-mm-in" id="trl-sh"><option value="circle">' + esc(ar ? 'دايرة' : 'Circle') + '</option><option value="round">' + esc(ar ? 'مربع بحواف' : 'Rounded') + '</option><option value="none">' + esc(ar ? 'من غير إطار' : 'No frame') + '</option></select></div><div><label class="pf-mm-lab" for="trl-g">' + esc(ar ? 'توهج' : 'Glow') + '</label><select class="pf-mm-in" id="trl-g"><option value="1">' + esc(ar ? 'آه' : 'Yes') + '</option><option value="0">' + esc(ar ? 'لأ' : 'No') + '</option></select></div></div>' +
      '<div class="pf-mm-btns"><button type="button" class="pf-mm-btn pf-mm-pri" id="trl-dl">' + esc(ar ? 'نزّل اللوجو' : 'Download logo') + '</button></div>';
    var cv = box.querySelector('#trl-cv'), cur = LOGO[0];
    function val() { return { name: box.querySelector('#trl-n').value.trim(), tag: box.querySelector('#trl-t').value.trim(), c1: box.querySelector('#trl-c1').value, c2: box.querySelector('#trl-c2').value, bg: cur.bg, shape: box.querySelector('#trl-sh').value, glow: box.querySelector('#trl-g').value === '1', ar: ar }; }
    var timer = 0; function redraw() { clearTimeout(timer); timer = setTimeout(function () { drawLogo(cv, val()); }, 60); }
    fonts().then(function () { drawLogo(cv, val()); });
    Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (c) { c.addEventListener('click', function () { cur = LOGO[+c.dataset.s]; box.querySelector('#trl-c1').value = cur.c1; box.querySelector('#trl-c2').value = cur.c2; Array.prototype.forEach.call(box.querySelectorAll('.pf-tr-chip'), function (o) { o.classList.toggle('on', o === c); }); redraw(); }); });
    box.addEventListener('input', redraw); box.addEventListener('change', redraw);
    box.querySelector('#trl-dl').addEventListener('click', function () { drawLogo(cv, val()); download(cv, 'sakr-logo.png'); });
  }

  var TOOLS = [
    ['card', 'كارت لاعبك', 'Your player card', '⚽', 'كارت زي الفيفا باسمك ومهاراتك', 'A FIFA-style card with your name and stats', toolCard],
    ['deco', 'زخرفة الأسماء', 'Name decoration', '✨', 'اسمك بخطوط وإطارات مزخرفة', 'Your name in fancy styles', toolDeco],
    ['bio', 'مولد بايو', 'Bio generator', '📝', 'بايو جاهز لحسابك', 'A ready bio for your profile', toolBio],
    ['nick', 'مولد اسم مستعار', 'Nickname generator', '🎭', 'أسماء مستعارة للألعاب والحسابات', 'Nicknames for games and accounts', toolNick],
    ['logo', 'لوجو اسمك', 'Name logo', '🎨', 'لوجو باسمك بألوانك', 'A logo from your name and colors', toolLogo]
  ];

  function mount(host, ar) {
    host.innerHTML = '<p class="pf-para">' + esc(ar ? 'جاري التحميل...' : 'Loading...') + '</p>';
    var cfg = {}, done = false;
    function go() {
      if (done) return; done = true;
      if (cfg.state === 'hidden' || cfg.state === 'soon') { host.innerHTML = '<div class="pf-card pf-pod-soon"><div class="pf-card-name">' + esc(ar ? 'قريباً 🔥' : 'Coming soon 🔥') + '</div></div>'; return; }
      var off = cfg.off || [], list = TOOLS.filter(function (t) { return off.indexOf(t[0]) < 0; });
      if (!list.length) { host.innerHTML = '<div class="pf-card pf-pod-soon"><div class="pf-card-name">' + esc(ar ? 'قريباً 🔥' : 'Coming soon 🔥') + '</div></div>'; return; }
      host.innerHTML = '<div class="pf-tr-wrap">' + list.map(function (t) {
        return '<section class="pf-tr-tool" data-t="' + t[0] + '"><button type="button" class="pf-tr-tg" aria-expanded="false"><span class="pf-tr-ic" aria-hidden="true">' + t[3] + '</span><span class="pf-tr-ht"><b>' + esc(ar ? t[1] : t[2]) + '</b><small>' + esc(ar ? t[4] : t[5]) + '</small></span><span class="pf-tr-chev" aria-hidden="true">&#9662;</span></button><div class="pf-tr-body" hidden></div></section>';
      }).join('') + '</div>';
      Array.prototype.forEach.call(host.querySelectorAll('.pf-tr-tool'), function (sec) {
        var btn = sec.querySelector('.pf-tr-tg'), body = sec.querySelector('.pf-tr-body'), def = TOOLS.filter(function (t) { return t[0] === sec.dataset.t; })[0];
        btn.addEventListener('click', function () {
          var open = body.hidden;
          Array.prototype.forEach.call(host.querySelectorAll('.pf-tr-tool'), function (o) { o.classList.remove('open'); o.querySelector('.pf-tr-body').hidden = true; o.querySelector('.pf-tr-tg').setAttribute('aria-expanded', 'false'); });
          if (open) { body.hidden = false; sec.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); if (!body.firstChild) def[6](body, ar, cfg); }
        });
      });
    }
    var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 3000);
    fetch(API + '/trend/config', { signal: ctl.signal }).then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) { clearTimeout(to); cfg = d || {}; go(); }).catch(function () { clearTimeout(to); go(); });
  }
  window.pfTrend = { mount: mount };
})();
