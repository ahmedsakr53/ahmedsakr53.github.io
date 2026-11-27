/* Sakr Academy: final exam + certificate. Loaded only when the exam is opened. */
(function () {
  'use strict';
  var API = 'https://saqr-ahmed.ahmedsakr5326.workers.dev';
  var QR = 'M0 0.5h7m2 0h2m1 0h2m1 0h2m1 0h1m3 0h7m-29 1h1m5 0h1m1 0h2m6 0h1m2 0h2m1 0h1m5 0h1m-29 1h1m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h6m1 0h1m1 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-29 1h1m1 0h3m1 0h1m1 0h2m2 0h4m2 0h2m2 0h1m1 0h3m1 0h1m-29 1h1m5 0h1m4 0h2m1 0h1m1 0h3m3 0h1m5 0h1m-29 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-21 1h1m1 0h3m2 0h1m3 0h2m-20 1h1m1 0h4m1 0h2m3 0h1m3 0h1m3 0h2m1 0h2m1 0h1m-28 1h1m4 0h1m1 0h2m9 0h4m1 0h5m-27 1h2m1 0h1m1 0h1m1 0h2m2 0h2m3 0h1m2 0h3m1 0h3m-27 1h1m6 0h2m2 0h1m1 0h5m1 0h1m3 0h1m4 0h1m-29 1h2m1 0h2m1 0h1m2 0h6m4 0h4m4 0h1m-28 1h1m1 0h1m2 0h1m3 0h1m2 0h7m3 0h1m1 0h1m1 0h3m-29 1h3m1 0h4m3 0h2m1 0h2m1 0h1m1 0h2m1 0h2m1 0h1m1 0h2m-29 1h1m2 0h1m1 0h1m2 0h1m4 0h3m4 0h1m1 0h1m1 0h3m-27 1h4m2 0h3m2 0h5m2 0h1m1 0h1m2 0h1m1 0h1m1 0h1m-28 1h2m1 0h1m1 0h1m7 0h1m3 0h4m3 0h1m-25 1h4m1 0h2m3 0h5m1 0h2m1 0h1m8 0h1m-29 1h2m3 0h1m1 0h1m2 0h1m3 0h3m1 0h2m1 0h6m1 0h1m-29 1h2m1 0h1m1 0h2m1 0h2m2 0h2m2 0h2m1 0h8m-19 1h2m2 0h2m1 0h1m1 0h1m2 0h1m3 0h4m-28 1h7m3 0h1m3 0h3m2 0h2m1 0h1m1 0h1m1 0h1m-27 1h1m5 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m1 0h2m3 0h2m1 0h1m-28 1h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h12m2 0h1m-28 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m3 0h1m4 0h1m3 0h1m-28 1h1m1 0h3m1 0h1m2 0h5m1 0h4m1 0h2m1 0h6m-29 1h1m5 0h1m1 0h1m2 0h2m1 0h1m1 0h1m2 0h1m4 0h3m1 0h1m-29 1h7m2 0h1m5 0h1m3 0h3m1 0h2';
  var FALCON = 'M100 62L105 65L106 73L109 78L118 80L132 77L146 69L158 60L151 77L158 76L147 90L151 91L137 102L139 104L122 111L116 114L112 126L108 136L104 148L100 152Z';
  var TRK = {
    cyber: { code: 'CYB', en1: 'CYBERSECURITY AWARENESS TRACK', en2: 'Digital Safety, Made Simple', ar2: 'شهادة إتمام مسار «أمنك الرقمي ببساطة»' },
    net: { code: 'NET', en1: 'NETWORKING FUNDAMENTALS TRACK', en2: 'Networking from Scratch', ar2: 'شهادة إتمام مسار «شبكات من الصفر»' },
    py: { code: 'PY', en1: 'PYTHON PROGRAMMING TRACK', en2: 'Python from Scratch', ar2: 'شهادة إتمام مسار «بايثون من الصفر»' },
    code: { code: 'JS', en1: 'JAVASCRIPT TRACK', en2: 'JavaScript from Scratch', ar2: 'شهادة إتمام مسار «جافاسكريبت من الصفر»' },
    linux: { code: 'LNX', en1: 'LINUX TRACK', en2: 'Linux from Scratch', ar2: 'شهادة إتمام مسار «لينكس من الصفر»' }
  };
  var TRACK = 'cyber', LS = 'pf-cert-cyber', CODE = 'CYB';
  function setTrack(t) { TRACK = TRK[t] ? t : 'cyber'; LS = 'pf-cert-' + TRACK; CODE = TRK[TRACK].code; }
  function ex(k) { return k + (TRACK === 'cyber' ? '' : '-' + TRACK); }
  function codeRe() { return new RegExp('^SA-(' + Object.keys(TRK).map(function (k) { return TRK[k].code; }).join('|') + ')-\\d{4}-\\d{6}$'); }
  var ar = true, box = null, S = { step: 'name', nameAr: '', nameEn: '', token: '', qs: [], i: 0, ans: [], busy: false };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(a, e) { return ar ? a : e; }
  function dig(n) { return ar ? String(n).replace(/\d/g, function (d) { return '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[d]; }) : String(n); }
  function saved() { try { return JSON.parse(localStorage.getItem(LS) || 'null'); } catch (e) { return null; } }
  function post(path, body) {
    return fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, err: 'bad' }; }); });
  }
  function view(h) { box.innerHTML = h; box.setAttribute('data-step', S.step); }
  function head(t, sub) { return '<h3 class="pf-ex-h">' + esc(t) + '</h3>' + (sub ? '<p class="pf-ex-p">' + esc(sub) + '</p>' : ''); }
  function btn(id, label, cls) { return '<button type="button" class="pf-ex-btn ' + (cls || '') + '" id="' + id + '">' + esc(label) + '</button>'; }
  function on(id, fn) { var el = box.querySelector('#' + id); if (el) el.addEventListener('click', fn); return el; }
  function errMsg(code) {
    return { rate: T('طلبات كتير، جرّب بعد شوية.', 'Too many tries, try again in a bit.'), name: T('الاسم مش مقبول. راجع الاسمين.', 'The name was not accepted. Check both names.'), expired: T('الوقت خلص. ابدأ اختبار جديد.', 'Time is up. Start a new exam.'), used: T('الاختبار ده اتسلّم قبل كده. ابدأ واحد جديد.', 'This exam was already submitted. Start a new one.'), busy: T('مش قادرين نصدر الشهادة دلوقتي. جرّب بعد شوية.', 'We cannot issue the certificate right now. Try again shortly.') }[code] || T('حصلت مشكلة في الاتصال. جرّب تاني.', 'Connection problem. Please try again.');
  }

  function intro() {
    var c = saved();
    S.step = 'intro';
    view(head(T('الاختبار النهائي', 'Final exam'), T('٢٠ سؤال من محتوى الحلقات العشر. النجاح من ١٤ فما فوق، وتقدر تعيد الاختبار. الأسئلة بتبدأ سهلة وبتصعب لحد الآخر.', '20 questions from the 10 episodes. Pass mark is 14 or more, and you can retake it. Questions start easy and get harder.')) +
      (c ? '<div class="pf-ex-have"><b>' + esc(T('عندك شهادة', 'You already have a certificate')) + '</b><span dir="ltr">' + esc(c.id) + '</span>' + btn('pf-ex-dl0', T('نزّل الشهادة PDF', 'Download certificate PDF'), 'pf-ex-sec') + '</div>' : '') +
      btn('pf-ex-go', c ? T('اعمل الاختبار تاني', 'Take the exam again') : T('ابدأ', 'Start')) +
      '<div class="pf-ex-ver"><b>' + esc(T('تحقق من شهادة', 'Verify a credential')) + '</b><div class="pf-ex-vrow"><input id="pf-ex-vid" class="pf-ex-in" dir="ltr" maxlength="20" placeholder="SA-' + CODE + '-2026-000001" autocomplete="off" autocapitalize="characters">' + btn('pf-ex-vgo', T('تحقق', 'Verify'), 'pf-ex-sec') + '</div><p class="pf-ex-vr" id="pf-ex-vr" role="status"></p></div>');
    on('pf-ex-go', nameStep);
    on('pf-ex-vgo', verify);
    on('pf-ex-dl0', function () { renderCertFile(c, this); });
  }

  function verify() {
    var id = box.querySelector('#pf-ex-vid').value.trim().toUpperCase(), out = box.querySelector('#pf-ex-vr');
    if (!codeRe().test(id)) { out.className = 'pf-ex-vr bad'; out.textContent = T('الرقم شكله غلط. مثال: SA-' + CODE + '-2026-000001', 'Wrong format. Example: SA-' + CODE + '-2026-000001'); return; }
    out.className = 'pf-ex-vr'; out.textContent = T('بنتحقق...', 'Checking...');
    fetch(API + '/verify?id=' + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (r) {
      if (r && r.valid) { out.className = 'pf-ex-vr ok'; out.innerHTML = esc(T('شهادة صحيحة', 'Valid credential')) + ' \u2713<br>' + esc(r.nameEn) + ' / ' + esc(r.nameAr) + '<br>' + '<bdi dir="ltr">' + esc(r.date) + '</bdi> \u00b7 <bdi dir="ltr">' + dig(r.score) + '/' + dig(r.total) + '</bdi>'; }
      else { out.className = 'pf-ex-vr bad'; out.textContent = T('الرقم ده مش موجود عندنا.', 'No credential found with this ID.'); }
    }).catch(function () { out.className = 'pf-ex-vr bad'; out.textContent = errMsg('net'); });
  }

  function nameStep(msg) {
    S.step = 'name';
    var c = saved();
    view(head(T('اسمك على الشهادة', 'Your name on the certificate'), T('اكتب اسمك بالعربي وبالإنجليزي زي ما عايزه يظهر بالظبط.', 'Type your name in Arabic and in English, exactly as you want it printed.')) +
      '<label class="pf-ex-l">' + esc(T('الاسم بالعربي', 'Name in Arabic')) + '<input id="pf-ex-ar" class="pf-ex-in" dir="rtl" lang="ar" maxlength="60" autocomplete="off" value="' + esc(S.nameAr || (c && c.nameAr) || '') + '"></label>' +
      '<label class="pf-ex-l">' + esc(T('الاسم بالإنجليزي', 'Name in English')) + '<input id="pf-ex-en" class="pf-ex-in" dir="ltr" lang="en" maxlength="60" autocomplete="off" value="' + esc(S.nameEn || (c && c.nameEn) || '') + '"></label>' +
      '<label class="pf-ex-chk"><input type="checkbox" id="pf-ex-lb"' + (S.lb ? ' checked' : '') + '> ' + esc(T('ضيف اسمي الأول بس في لوحة المتصدرين لو نجحت (اختياري)', 'Show my first name only on the leaderboard if I pass (optional)')) + '</label>' +
      '<p class="pf-ex-err" id="pf-ex-err" role="alert">' + (typeof msg === 'string' ? esc(msg) : '') + '</p>' + btn('pf-ex-next', T('ابدأ الأسئلة', 'Start the questions')));
    on('pf-ex-next', function () {
      var a = box.querySelector('#pf-ex-ar').value.replace(/\s+/g, ' ').trim(), e = box.querySelector('#pf-ex-en').value.replace(/\s+/g, ' ').trim();
      var er = box.querySelector('#pf-ex-err');
      if (!/^[\u0600-\u06FF\u0750-\u077F ]{2,60}$/.test(a)) { er.textContent = T('الاسم بالعربي: حروف عربي بس (٢ حرف على الأقل).', 'Arabic name: Arabic letters only (at least 2).'); return; }
      if (!/^[A-Za-z][A-Za-z .'\-]{1,59}$/.test(e)) { er.textContent = T('الاسم بالإنجليزي: حروف إنجليزي بس (٢ حرف على الأقل).', 'English name: English letters only (at least 2).'); return; }
      S.nameAr = a; S.nameEn = e; S.lb = !!box.querySelector('#pf-ex-lb').checked; start();
    });
  }

  function start() {
    if (S.busy) return; S.busy = true;
    view('<p class="pf-ex-p">' + esc(T('بنجهّز الأسئلة...', 'Preparing your questions...')) + '</p>');
    S.step = 'load';
    post('/exam/start', { t: TRACK }).then(function (r) {
      S.busy = false;
      if (!r.ok) { nameStep(errMsg(r.err)); return; }
      S.token = r.token; S.qs = r.questions; S.i = 0; S.ans = []; S.pass = r.pass; S.total = r.total;
      question();
    }).catch(function () { S.busy = false; nameStep(errMsg('net')); });
  }

  function question() {
    S.step = 'q';
    var q = S.qs[S.i], n = S.qs.length, sel = S.ans[S.i];
    view('<div class="pf-ex-top"><span>' + esc(T('سؤال ', 'Question ') + dig(S.i + 1) + (ar ? ' من ' : ' of ') + dig(n)) + '</span></div>' +
      '<div class="pf-ex-bar"><i style="width:' + Math.round((S.i / n) * 100) + '%"></i></div>' +
      '<p class="pf-ex-q">' + esc(q.q) + '</p><div class="pf-ex-opts" role="radiogroup">' +
      q.o.map(function (o, k) { return '<button type="button" role="radio" aria-checked="' + (sel === k) + '" class="pf-ex-o' + (sel === k ? ' on' : '') + '" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
      '<div class="pf-ex-nav">' + (S.i ? btn('pf-ex-prev', T('السابق', 'Back'), 'pf-ex-sec') : '') + btn('pf-ex-n', S.i === n - 1 ? T('إنهاء وتسليم', 'Finish and submit') : T('التالي', 'Next')) + '</div>');
    var nb = box.querySelector('#pf-ex-n'); nb.disabled = sel === undefined;
    box.querySelectorAll('.pf-ex-o').forEach(function (b) {
      b.addEventListener('click', function () {
        S.ans[S.i] = +b.dataset.k;
        box.querySelectorAll('.pf-ex-o').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
        nb.disabled = false;
      });
    });
    on('pf-ex-prev', function () { S.i--; question(); });
    on('pf-ex-n', function () { if (S.i === n - 1) submit(); else { S.i++; question(); } });
  }

  function submit() {
    if (S.busy) return; S.busy = true; S.step = 'load';
    view('<p class="pf-ex-p">' + esc(T('بنصحّح إجاباتك...', 'Grading your answers...')) + '</p>');
    post('/exam/submit', { token: S.token, answers: S.ans, nameAr: S.nameAr, nameEn: S.nameEn, lb: !!S.lb }).then(function (r) {
      S.busy = false;
      if (!r.ok) { fail(r.err); return; }
      var tr = +(localStorage.getItem(ex('pf-ex-n')) || 0); try { localStorage.setItem(ex('pf-ex-n'), String(tr + 1)); if (r.pass && tr === 0) localStorage.setItem(ex('pf-ex-first'), '1'); } catch (e) {}
      if (r.pass) { try { localStorage.setItem(LS, JSON.stringify({ id: r.id, date: r.date, nameAr: r.nameAr, nameEn: r.nameEn, score: r.score })); } catch (e) {} passed(r); }
      else failed(r);
    }).catch(function () { S.busy = false; fail('net'); });
  }
  function fail(code) {
    S.step = 'err';
    var retry = code === 'busy' || code === 'net';
    view(head(T('حصلت مشكلة', 'Something went wrong'), errMsg(code)) + (retry ? btn('pf-ex-re', T('حاول تسليم الإجابات تاني', 'Try submitting again')) : '') + btn('pf-ex-new', T('ابدأ اختبار جديد', 'Start a new exam'), 'pf-ex-sec'));
    on('pf-ex-re', submit); on('pf-ex-new', function () { nameStep(); });
  }
  function failed(r) {
    S.step = 'fail';
    view('<div class="pf-ex-score bad"><b>' + dig(r.score) + '</b><span>/ ' + dig(r.total) + '</span></div>' + head(T('لسه مانجحتش، وده طبيعي', 'Not quite there yet, and that is normal'), T('محتاج ' + dig(S.pass) + ' على الأقل. راجع الحلقات وجرّب تاني. الأسئلة هتتغيّر شوية.', 'You need at least ' + S.pass + '. Rewatch the episodes and try again. Questions will vary a little.')) +
      (r.wrong && r.wrong.length ? '<p class="pf-ex-p">' + esc(T('الأسئلة اللي غلطت فيها: ', 'Questions you missed: ') + r.wrong.map(function (x) { return dig(x + 1); }).join(ar ? '، ' : ', ')) + '</p>' : '') +
      btn('pf-ex-again', T('أعد الاختبار', 'Retake the exam')));
    on('pf-ex-again', function () { nameStep(); });
  }
  function passed(r) {
    S.step = 'pass';
    view('<div class="pf-ex-score"><b>' + dig(r.score) + '</b><span>/ ' + dig(r.total) + '</span></div>' + head(T('مبروك، نجحت!', 'Congratulations, you passed!'), T('شهادتك جاهزة. رقمها: ', 'Your certificate is ready. ID: ')) +
      '<p class="pf-ex-id" dir="ltr">' + esc(r.id) + '</p><div class="pf-ex-prev" id="pf-ex-prevw"></div>' +
      btn('pf-ex-dl', T('نزّل الشهادة PDF', 'Download certificate PDF')) + shareBlock(r));
    var b = on('pf-ex-dl', function () { renderCertFile(r, this); });
    wireShare(r);
    renderCert(r).then(function (cv) {
      var im = new Image(); im.alt = T('معاينة الشهادة', 'Certificate preview'); im.src = cv.toDataURL('image/jpeg', .8);
      var p = box.querySelector('#pf-ex-prevw'); if (p) p.appendChild(im);
    }).catch(function () {});
  }

  var ROOT = 'https://ahmedsakr53.github.io/';
  function shareText(r) { return T('نجحت في اختبار «صقر أكاديمي» وخدت شهادتي 🎓 رقمها ' + r.id, 'I passed the Sakr Academy exam and earned my certificate 🎓 ID ' + r.id); }
  function shareBlock(r) {
    var t = encodeURIComponent(shareText(r)), u = encodeURIComponent(ROOT);
    var L = [['Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + u + '&quote=' + t], ['WhatsApp', 'https://wa.me/?text=' + t + '%20' + u], ['LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + u], ['X', 'https://twitter.com/intent/tweet?text=' + t + '&url=' + u], ['Telegram', 'https://t.me/share/url?url=' + u + '&text=' + t]];
    return '<div class="pf-ex-sh"><b>' + esc(T('شارك شهادتك', 'Share your certificate')) + '</b>' + btn('pf-ex-share', T('شارك على كل التطبيقات', 'Share to any app'), 'pf-ex-sec') +
      '<div class="pf-ex-shl">' + L.map(function (x) { return '<a class="pf-ex-sl" target="_blank" rel="noopener noreferrer" href="' + x[1] + '">' + x[0] + '</a>'; }).join('') + '<button type="button" class="pf-ex-sl" id="pf-ex-copy">' + esc(T('نسخ الرابط', 'Copy link')) + '</button></div></div>';
  }
  function wireShare(r) {
    var b = on('pf-ex-share', function () {
      var d = { title: 'Sakr Academy', text: shareText(r), url: ROOT };
      if (navigator.share) navigator.share(d).catch(function () {}); else if (navigator.clipboard) navigator.clipboard.writeText(d.text + ' ' + ROOT).then(function () { b.textContent = T('اتنسخ ✓', 'Copied \u2713'); }).catch(function () {});
    });
    on('pf-ex-copy', function () { var me = this; if (navigator.clipboard) navigator.clipboard.writeText(shareText(r) + ' ' + ROOT).then(function () { me.textContent = T('اتنسخ ✓', 'Copied \u2713'); }).catch(function () {}); });
  }

  /* ---------- leaderboard and weekly question (lazy panels) ---------- */
  function board(el, isAr) {
    box = el; ar = !!isAr; S.step = 'board';
    view(head(T('🏆 المتصدرين', '🏆 Leaderboard'), T('أعلى درجات الاختبار. بيظهر الاسم الأول بس ولمن يوافق صاحبه.', 'Top exam scores. First names only, and only for people who opted in.')) + '<p class="pf-ex-p">' + esc(T('لحظة...', 'One moment...')) + '</p>');
    fetch(API + '/academy/leaderboard').then(function (r) { return r.json(); }).then(function (r) {
      var it = (r && r.items) || [];
      view(head(T('🏆 المتصدرين', '🏆 Leaderboard'), T('أعلى درجات الاختبار. بيظهر الاسم الأول بس ولمن يوافق صاحبه.', 'Top exam scores. First names only, and only for people who opted in.')) +
        (it.length ? '<ol class="pf-lb">' + it.map(function (x, i) { return '<li><span class="pf-lb-r">' + dig(i + 1) + '</span><span class="pf-lb-n">' + esc(ar ? x.a : x.n) + '</span><span class="pf-lb-s">' + dig(x.s) + '/' + dig(20) + '</span></li>'; }).join('') + '</ol>'
          : '<p class="pf-ex-p">' + esc(T('لسه مفيش حد. كون إنت الأول!', 'Nobody yet. Be the first!')) + '</p>'));
    }).catch(function () { view(head(T('🏆 المتصدرين', '🏆 Leaderboard')) + '<p class="pf-ex-err">' + esc(errMsg('net')) + '</p>'); });
  }
  function weekly(el, isAr) {
    box = el; ar = !!isAr; S.step = 'weekly';
    view(head(T('⚡ سؤال الأسبوع', '⚡ Question of the week')) + '<p class="pf-ex-p">' + esc(T('لحظة...', 'One moment...')) + '</p>');
    fetch(API + '/academy/weekly').then(function (r) { return r.json(); }).then(function (r) {
      if (!r || !r.q) throw 0;
      view(head(T('⚡ سؤال الأسبوع', '⚡ Question of the week'), T('سؤال جديد كل أسبوع. جاوب وشوف.', 'A new question every week. Answer and see.')) + '<p class="pf-ex-q">' + esc(r.q) + '</p><div class="pf-ex-opts">' +
        r.o.map(function (o, k) { return '<button type="button" class="pf-ex-o" data-k="' + k + '">' + esc(o) + '</button>'; }).join('') + '</div><p class="pf-ex-vr" id="pf-wq-r"></p>');
      box.querySelectorAll('.pf-ex-o').forEach(function (b) {
        b.addEventListener('click', function () {
          box.querySelectorAll('.pf-ex-o').forEach(function (x) { x.disabled = true; });
          post('/academy/weekly', { week: r.week, a: +b.dataset.k }).then(function (g) {
            var o = box.querySelector('#pf-wq-r'); b.classList.add('on');
            if (g && g.correct) { o.className = 'pf-ex-vr ok'; o.textContent = T('صح! 🎉 ارجع الأسبوع الجاي لسؤال جديد.', 'Correct! 🎉 Come back next week for a new one.'); try { localStorage.setItem('pf-wq-ok', '1'); } catch (e) {} }
            else { o.className = 'pf-ex-vr bad'; o.textContent = T('مش دي. السؤال هيتغيّر الأسبوع الجاي، راجع الحلقات وجرّب تاني.', 'Not this one. It changes next week, review the episodes and try again.'); box.querySelectorAll('.pf-ex-o').forEach(function (x) { x.disabled = false; }); }
          }).catch(function () { box.querySelector('#pf-wq-r').textContent = errMsg('net'); box.querySelectorAll('.pf-ex-o').forEach(function (x) { x.disabled = false; }); });
        });
      });
    }).catch(function () { view(head(T('⚡ سؤال الأسبوع', '⚡ Question of the week')) + '<p class="pf-ex-err">' + esc(errMsg('net')) + '</p>'); });
  }

  /* ---------- certificate: drawn on a canvas, saved as a one-page A4 landscape PDF ---------- */
  var fontsP = null, logoP = null;
  function loadFonts() {
    if (fontsP) return fontsP;
    var base = (document.querySelector('script[src*="academy-exam.js"]') || {}).src || '';
    base = base.replace(/academy-exam\.js.*$/, '');
    var c = new FontFace('CertCairo', 'url(' + base + 'fonts/cairo-ar-700.woff2)', { weight: '700' });
    var g = new FontFace('CertGrot', 'url(' + base + 'fonts/grotesk-400.woff2)', { weight: '400' });
    fontsP = Promise.all([c.load(), g.load()]).then(function (f) { f.forEach(function (x) { document.fonts.add(x); }); return base; });
    return fontsP;
  }
  function loadLogo(base) {
    if (logoP) return logoP;
    logoP = new Promise(function (res) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = base + 'photos/icon-512.png'; });
    return logoP;
  }
  var AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  var EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function renderCert(c) {
    return loadFonts().then(function (base) { return loadLogo(base); }).then(function (logo) {
      var W = 2339, H = 1654, K = W / 297, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
      var x = cv.getContext('2d'); var m = function (v) { return v * K; };
      var NAVY = '#0a2540', BLUE = '#1565c0', GREY = '#5a6b82';
      var d = c.date.split('-'), mo = +d[1] - 1;
      var dEn = (+d[2]) + ' ' + EN_MONTHS[mo] + ' ' + d[0];
      var dAr = String(+d[2]).replace(/\d/g, function (q) { return '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[q]; }) + ' ' + AR_MONTHS[mo] + ' ' + d[0].replace(/\d/g, function (q) { return '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'[q]; });
      x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
      var g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, NAVY); g.addColorStop(.62, NAVY); g.addColorStop(.62, BLUE); g.addColorStop(.88, BLUE); g.addColorStop(.88, '#45c8dd'); g.addColorStop(1, '#45c8dd');
      x.fillStyle = g; x.fillRect(0, 0, W, m(5));
      x.strokeStyle = '#c9d3e0'; x.lineWidth = m(.3); x.strokeRect(m(12), m(12), W - m(24), H - m(24));
      x.strokeStyle = '#e1e7ef'; x.lineWidth = m(.15); x.strokeRect(m(14), m(14), W - m(28), H - m(28));
      function txt(s, px, py, size, font, color, align, rtl, ls) {
        x.font = size + 'px ' + font; x.fillStyle = color; x.textAlign = align || 'left'; x.textBaseline = 'alphabetic';
        x.direction = rtl ? 'rtl' : 'ltr'; try { x.letterSpacing = (ls || 0) + 'px'; } catch (e) {}
        x.fillText(s, px, py);
      }
      var G = 'CertGrot, sans-serif', C = 'CertCairo, sans-serif';
      if (logo) { x.save(); var lx = m(26), ly = m(22), ls = m(15), r = m(3.4); x.beginPath(); x.roundRect ? x.roundRect(lx, ly, ls, ls, r) : x.rect(lx, ly, ls, ls); x.clip(); x.drawImage(logo, lx, ly, ls, ls); x.restore(); }
      txt('Sakr Academy', m(45), m(30.5), m(6), G, NAVY, 'left', false, m(.2));
      txt('صقر أكاديمي', m(45), m(37), m(4.4), C, BLUE, 'left', true);
      txt('PROFESSIONAL CERTIFICATE', W - m(26), m(32), m(2.8), G, GREY, 'right', false, m(.9));
      txt(TRK[TRACK].en1, W - m(26), m(37), m(2.8), G, GREY, 'right', false, m(.9));
      txt('CERTIFICATE OF COMPLETION', m(26), m(48), m(3.2), G, BLUE, 'left', false, m(1.4));
      txt(TRK[TRACK].en2, m(26), m(62), m(11.5), G, NAVY, 'left');
      txt(TRK[TRACK].ar2, m(26), m(72), m(5.6), C, GREY, 'left', true);
      x.fillStyle = BLUE; x.fillRect(m(26), m(77), m(22), m(.9));
      txt('This is to certify that  ·  نشهد بأن', m(26), m(88), m(3.8), G, GREY, 'left');
      var nm = c.nameEn, fs = 11; x.font = m(fs) + 'px ' + G; while (x.measureText(nm).width > m(170) && fs > 6) { fs -= .5; x.font = m(fs) + 'px ' + G; }
      txt(nm, m(26), m(101), m(fs), G, NAVY, 'left');
      var na = c.nameAr, fa = 6.4; x.font = m(fa) + 'px ' + C; while (x.measureText(na).width > m(170) && fa > 4) { fa -= .3; x.font = m(fa) + 'px ' + C; }
      txt(na, m(26), m(111), m(fa), C, NAVY, 'left', true);
      x.fillStyle = '#c9d3e0'; x.fillRect(m(26), m(116), m(170), m(.25));
      txt('has successfully completed all 10 episodes and passed the final exam of the track', m(26), m(124), m(3.5), G, GREY, 'left');
      txt('أتم بنجاح جميع الحلقات العشر واجتاز الاختبار النهائي للمسار', m(26), m(130), m(3.4), C, GREY, 'left', true);
      var fy = 183;
      txt('DATE ISSUED', m(26), m(fy - 20), m(2.5), G, GREY, 'left', false, m(.9)); txt(dEn, m(26), m(fy - 14.5), m(4.2), G, NAVY, 'left');
      txt('تاريخ الإصدار · ' + dAr, m(26), m(fy - 10.5), m(3.2), C, GREY, 'left', true);
      txt('CREDENTIAL ID', m(26 + 62), m(fy - 20), m(2.5), G, GREY, 'left', false, m(.9)); txt(c.id, m(26 + 62), m(fy - 14.5), m(4.2), G, NAVY, 'left');
      txt('رقم الشهادة', m(26 + 62), m(fy - 10.5), m(3.2), C, GREY, 'left', true);
      txt('VALIDITY', m(26 + 118), m(fy - 20), m(2.5), G, GREY, 'left', false, m(.9)); txt('No expiration', m(26 + 118), m(fy - 14.5), m(4.2), G, NAVY, 'left');
      txt('بدون تاريخ انتهاء', m(26 + 118), m(fy - 10.5), m(3.2), C, GREY, 'left', true);
      // QR (points to the site root only)
      var qx = m(26), qy = m(fy - 7.2), qs = m(19); x.strokeStyle = '#c9d3e0'; x.lineWidth = m(.25); x.strokeRect(qx, qy - m(1), qs, qs);
      x.save(); x.translate(qx + m(1.2), qy - m(1) + m(1.2)); var sc = (qs - m(2.4)) / 29; x.scale(sc, sc); x.strokeStyle = NAVY; x.lineWidth = 1; x.lineCap = 'butt'; x.stroke(new Path2D(QR)); x.restore();
      txt('Verify this credential', m(49), m(fy - 2.6), m(3.1), G, BLUE, 'left', false, m(.2));
      txt('Scan the code or visit', m(49), m(fy + 1.2), m(2.8), G, GREY, 'left');
      txt('ahmedsakr53.github.io', m(49), m(fy + 4.6), m(2.8), G, GREY, 'left');
      // signature
      var sx = 297 - 26 - 78; x.fillStyle = NAVY; x.fillRect(m(sx), m(fy - 7.2), m(78), m(.3));
      txt('Ahmed Sakr', m(sx + 39), m(fy - 2.2), m(4.2), G, NAVY, 'center');
      txt('Instructor, Sakr Academy', m(sx + 39), m(fy + 1.6), m(2.8), G, GREY, 'center');
      txt('المحاضر أحمد صقر', m(sx + 39), m(fy + 5.4), m(3.3), C, GREY, 'center', true);
      // stamp
      x.save(); var cx = m(297 - 36 - 19), cy = m(210 - 35 - 19), u = m(38) / 200; x.translate(cx, cy); x.rotate(-8 * Math.PI / 180); x.scale(u, u); x.translate(-100, -100);
      x.strokeStyle = BLUE; x.fillStyle = BLUE; x.globalAlpha = .92;
      [[96, 4], [89, 1.2], [58, 2], [54, .8]].forEach(function (p) { x.lineWidth = p[1]; x.beginPath(); x.arc(100, 100, p[0], 0, 7); x.stroke(); });
      function arcText(s, radius, startDeg, endDeg, font, top, rtl, sp) {
        x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle';
        var chars = rtl ? [s] : s.split(''); var n = chars.length;
        for (var i = 0; i < n; i++) { var t = n === 1 ? .5 : i / (n - 1); var a = (startDeg + (endDeg - startDeg) * t) * Math.PI / 180; x.save(); x.translate(100 + radius * Math.cos(a), 100 + radius * Math.sin(a)); x.rotate(a + (top ? Math.PI / 2 : -Math.PI / 2)); x.fillText(chars[i], 0, 0); x.restore(); }
      }
      x.save(); x.translate(100, 100); x.font = '700 24px CertCairo'; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
      // Arabic text must stay connected: draw it in a few arc segments (words) so letters keep their joins
      var words = ['صقر', 'أكاديمي']; var ws = words.map(function (w) { return x.measureText(w).width; }); var gap = 10, total = ws[0] + ws[1] + gap, R = 70, pos = -total / 2;
      // RTL: first word on the right
      var order = [[words[0], ws[0]], [words[1], ws[1]]]; var cursor = total / 2;
      order.forEach(function (o) { var mid = cursor - o[1] / 2; var a = mid / R; x.save(); x.rotate(a); x.translate(0, -R); x.direction = 'rtl'; x.fillText(o[0], 0, 0); x.restore(); cursor -= o[1] + gap; });
      x.restore();
      x.direction = 'ltr'; try { x.letterSpacing = '0px'; } catch (e) {}
      arcText('SAKR ACADEMY', 82, 150, 30, '17px CertGrot', false, false);
      x.fillStyle = BLUE; x.save(); x.translate(100, 104); x.scale(.8, .8); x.translate(-100, -104); var f = new Path2D(FALCON); x.fill(f); x.save(); x.translate(200, 0); x.scale(-1, 1); x.fill(f); x.restore(); x.restore();
      x.restore();
      return cv;
    });
  }

  function pdfFromJpeg(bytes, w, h) {
    var enc = new TextEncoder(), parts = [], off = [], len = 0;
    function add(u) { parts.push(u); len += u.length; }
    function str(s) { add(enc.encode(s)); }
    var pw = 841.89, ph = 595.28;
    str('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
    off[1] = len; str('1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n');
    off[2] = len; str('2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n');
    off[3] = len; str('3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 ' + pw + ' ' + ph + ']/Resources<</XObject<</Im0 4 0 R>>>>/Contents 5 0 R>>endobj\n');
    off[4] = len; str('4 0 obj<</Type/XObject/Subtype/Image/Width ' + w + '/Height ' + h + '/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length ' + bytes.length + '>>stream\n'); add(bytes); str('\nendstream endobj\n');
    var cs = 'q ' + pw + ' 0 0 ' + ph + ' 0 0 cm /Im0 Do Q';
    off[5] = len; str('5 0 obj<</Length ' + cs.length + '>>stream\n' + cs + '\nendstream endobj\n');
    var xr = len; str('xref\n0 6\n0000000000 65535 f \n');
    for (var i = 1; i <= 5; i++) str(String(off[i]).padStart(10, '0') + ' 00000 n \n');
    str('trailer<</Size 6/Root 1 0 R/Info<</Title(Sakr Academy Certificate)/Producer(Sakr Academy)>>>>\nstartxref\n' + xr + '\n%%EOF');
    var out = new Uint8Array(len), p = 0; parts.forEach(function (u) { out.set(u, p); p += u.length; });
    return out;
  }
  function renderCertFile(c, btnEl) {
    var old = btnEl && btnEl.textContent; if (btnEl) { btnEl.disabled = true; btnEl.textContent = T('بنجهّز الملف...', 'Preparing the file...'); }
    return renderCert(c).then(function (cv) {
      return new Promise(function (res) { cv.toBlob(res, 'image/jpeg', .92); }).then(function (b) { return b.arrayBuffer().then(function (ab) { return pdfFromJpeg(new Uint8Array(ab), cv.width, cv.height); }); });
    }).then(function (pdf) {
      var url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' })), a = document.createElement('a');
      a.href = url; a.download = c.id + '.pdf'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
    }).catch(function () { lockMsg(T('معرفناش نجهّز الملف. جرّب تاني.', 'Could not create the file. Try again.')); })
      .then(function () { if (btnEl) { btnEl.disabled = false; btnEl.textContent = old; } });
  }
  function lockMsg(m) { var t = document.getElementById('pf-lock-toast'); if (t) { t.textContent = m; t.classList.add('on'); setTimeout(function () { t.classList.remove('on'); }, 3000); } }

  window.pfExam = {
    open: function (el, isAr, trk) { setTrack(trk); box = el; ar = !!isAr; S = { step: 'name', nameAr: '', nameEn: '', token: '', qs: [], i: 0, ans: [], busy: false }; intro(); },
    board: board, weekly: weekly,
    _render: renderCert, _pdf: pdfFromJpeg
  };
})();
