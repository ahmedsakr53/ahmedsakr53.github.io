/* Academy pages. Loaded only when a visitor opens #/academy. No images, no video until Play is pressed. */
(function () {
  // Videos, visibility and status come from /academy/config (managed in the admin dashboard).
  var TRACKS = [
    { id: 'cyber', ico: 'navShield', ar: 'أمنك الرقمي ببساطة', en: 'Digital Safety, Made Simple',
      dAr: 'من الصفر لحد ما تحمي نفسك وأهلك على النت. بدون مصطلحات معقدة.', dEn: 'From zero to protecting yourself and your family online. No jargon.',
      eps: [
        ['إيه هو الأمن السيبراني وليه يهمك انت', 'What cybersecurity is and why it matters to you'],
        ['كلمات السر والتحقق بخطوتين', 'Passwords and two-step verification'],
        ['اللينكات المزيفة والنصب (phishing)', 'Fake links and phishing'],
        ['التحقق بخطوتين', 'Two-step verification'],
        ['الفيروسات وبرامج الفدية', 'Viruses and ransomware'],
        ['حماية موبايلك', 'Protect your phone'],
        ['حماية حساباتك على السوشيال', 'Protect your social accounts'],
        ['خصوصيتك وبياناتك على النت', 'Your privacy and data online'],
        ['الهاكر بيفكر إزاي', 'How a hacker thinks'],
        ['طريقك تتعلم سايبر بجد + الاختبار النهائي', 'Your path to real cyber skills + final exam']] },
    { id: 'code', ico: 'chip', ar: 'برمجة من الصفر', en: 'Programming from Scratch',
      dAr: 'JavaScript بتجرّبها لايف من موبايلك، من غير تنزيل أي حاجة.', dEn: 'JavaScript you can try live on your phone, with nothing to install.',
      eps: [
        ['البرمجة أصلاً يعني إيه', 'What programming actually is'],
        ['أول كود في حياتك (JavaScript)', 'Your first code (JavaScript)'],
        ['المتغيرات وأنواع البيانات', 'Variables and data types'],
        ['الشروط (if)', 'Conditions (if)'],
        ['اللوبات (loops)', 'Loops'],
        ['الفانكشنز', 'Functions'],
        ['المصفوفات والأوبجكتس', 'Arrays and objects'],
        ['التعامل مع الصفحة (DOM)', 'Working with the page (DOM)'],
        ['نعمل لعبة صغيرة مع بعض', 'We build a small game together'],
        ['المشروع النهائي + الاختبار والشهادة', 'Final project + exam and certificate']] },
    { id: 'net', ico: 'navGlobe', ar: 'شبكات من الصفر', en: 'Networking from Scratch',
      dAr: 'إزاي الإنترنت بيشتغل فعلاً، خطوة خطوة وبأمثلة من حياتك.', dEn: 'How the internet really works, step by step, with everyday examples.',
      eps: [
        ['الشبكة يعني إيه أصلاً', 'What a network is'],
        ['الـ IP address وإزاي الأجهزة بتتكلم', 'IP addresses and how devices talk'],
        ['الـ DNS: إزاي اسم الموقع بيبقى عنوان', 'DNS: how a site name becomes an address'],
        ['الراوتر بتاع بيتك بيعمل إيه', 'What your home router does'],
        ['TCP و UDP والبورتات', 'TCP, UDP and ports'],
        ['موديل OSI ببساطة', 'The OSI model, simply'],
        ['الـ subnetting من غير وجع دماغ', 'Subnetting without the headache'],
        ['الواي فاي وأمان الشبكات البيتية', 'Wi-Fi and home network security'],
        ['إزاي بتتبعت الداتا عبر العالم', 'How data travels across the world'],
        ['المشروع النهائي + الاختبار والشهادة', 'Final project + exam and certificate']] }
  ];
  function find(id) { for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i]; return null; }
  function n(x, ar) { return ar ? String(x).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }) : String(x); }
  var DEF = { 'cyber-1': 'academy/cyber-1.mp4', 'cyber-2': 'academy/cyber-2.mp4', 'cyber-3': 'academy/cyber-3.mp4', 'cyber-4': 'academy/cyber-4.mp4' };
  var CFG = null, SEL = 0;
  function ep(tid, i) {
    var k = tid + '-' + (i + 1), e = (CFG && CFG.eps && CFG.eps[k]) || (DEF[k] ? { mp4: DEF[k] } : {});
    var has = !!(e.yt || e.mp4);
    return { hidden: e.status === 'hidden', live: has && e.status !== 'soon', yt: e.yt || '', mp4: e.mp4 || '' };
  }
  var NEED = 60, ARL = true;
  function prog(tid) { try { return JSON.parse(localStorage.getItem('pf-acad-' + tid) || '[]'); } catch (e) { return []; } }
  function mark(tid, i) { var a = prog(tid); if (a.indexOf(i) === -1) { a.push(i); try { localStorage.setItem('pf-acad-' + tid, JSON.stringify(a)); } catch (e) {} } return a; }
  function unlocked(tid, i) { return i === 0 || prog(tid).indexOf(i - 1) !== -1; }
  function visible(t) { return !(CFG && CFG.tracks && CFG.tracks[t.id] && CFG.tracks[t.id].visible === false); }
  function liveList(t) { var a = []; for (var i = 0; i < t.eps.length; i++) { var e = ep(t.id, i); if (!e.hidden && e.live) a.push(i); } return a; }

  function render(route, ar, h, cfg) {
    CFG = cfg || null;
    var esc = h.esc, icon = h.icon;
    var parts = route.split('/');
    var tr = parts[2] ? find(parts[2]) : null;
    if (tr && !visible(tr)) tr = null;
    if (!tr) {
      var list = TRACKS.filter(visible);
      return h.pageHead('ACADEMY', ar ? 'صقر أكاديمي' : 'Sakr Academy') +
        '<p class="pf-para">' + esc(ar ? 'ثلاث مسارات مجانية، كل مسار ١٠ حلقات قصيرة بالصوت والصورة، وفي آخره اختبار وشهادة إتمام. نبدأ بمسار الأمن السيبراني، والباقي قريباً.' : 'Three free tracks, each with 10 short video episodes, a final exam and a completion certificate. We start with the cybersecurity track, the rest are coming soon.') + '</p>' +
        '<div class="pf-acad-grid">' + list.map(function (t) {
          var c = liveList(t).length;
          return '<a class="pf-acad-card" href="#/academy/' + t.id + '">' +
            '<span class="pf-acad-ico">' + icon(t.ico) + '</span>' +
            '<b>' + esc(ar ? t.ar : t.en) + '</b>' +
            '<small>' + esc(ar ? t.dAr : t.dEn) + '</small>' +
            '<span class="pf-acad-meta"><i>' + esc(n(10, ar) + (ar ? ' حلقات' : ' episodes')) + '</i>' +
            '<i class="' + (c ? 'pf-acad-on' : '') + '">' + esc(c ? (n(c, ar) + (ar ? ' متاح' : ' available')) : (ar ? 'قريباً' : 'Coming soon')) + '</i></span></a>';
        }).join('') + '</div>';
    }
    var lv = liveList(tr);
    var okL = lv.filter(function (j) { return unlocked(tr.id, j); });
    if (okL.indexOf(SEL) === -1) SEL = okL.length ? okL[0] : (lv.length ? lv[0] : 0);
    var rows = tr.eps.map(function (e, i) {
      var x = ep(tr.id, i);
      if (x.hidden) return '';
      var t = esc(ar ? e[0] : e[1]);
      var lk = x.live && !unlocked(tr.id, i), dn = prog(tr.id).indexOf(i) !== -1;
      var st = esc(!x.live ? (ar ? 'قريباً' : 'Soon') : lk ? (ar ? '🔒 مقفولة' : '🔒 Locked') : dn ? (ar ? '✓ تمت' : '✓ Done') : (ar ? 'متاح' : 'Available'));
      return '<li class="pf-ep' + (x.live && !lk ? ' pf-ep-on' : '') + (lk ? ' pf-ep-lock' : '') + (x.live && !lk && i === SEL ? ' pf-ep-sel' : '') + '"' + (x.live ? ' data-i="' + i + '"' + (lk ? ' aria-disabled="true"' : ' tabindex="0" role="button"') : '') + '><span class="pf-ep-n">' + n(i + 1, ar) + '</span>' +
        '<span class="pf-ep-t">' + t + '</span><span class="pf-ep-s">' + st + '</span></li>';
    }).join('');
    var player = lv.length
      ? '<div class="pf-player" id="pf-player"><button type="button" class="pf-player-btn" id="pf-player-btn" aria-label="' + esc(ar ? 'شغّل الحلقة' : 'Play episode') + '"><span class="pf-player-tri"></span></button>' +
        '<div class="pf-player-cap" id="pf-player-cap">' + esc((ar ? 'الحلقة ' + n(SEL + 1, ar) + ': ' : 'Episode ' + (SEL + 1) + ': ') + (ar ? tr.eps[SEL][0] : tr.eps[SEL][1])) + '</div></div>'
      : '<div class="pf-player pf-player-soon"><div class="pf-player-cap">' + esc(ar ? 'الحلقات قريباً، جاري التجهيز.' : 'Episodes coming soon.') + '</div></div>';
    return '<a class="pf-acad-back" href="#/academy">' + esc(ar ? '← كل المسارات' : '← All tracks') + '</a>' +
      h.pageHead(n(10, ar) + (ar ? ' حلقات' : ' EPISODES'), ar ? tr.ar : tr.en) +
      '<p class="pf-para">' + esc(ar ? tr.dAr : tr.dEn) + '</p>' + player +
      '<ol class="pf-eps">' + rows + '</ol>' +
      '<div class="pf-ep pf-ep-lock pf-exam" aria-disabled="true"><span class="pf-ep-n">🎓</span><span class="pf-ep-t">' + esc(ar ? 'الاختبار والشهادة' : 'Exam and certificate') + '</span><span class="pf-ep-s">' + esc(ar ? '🔒 بعد الحلقات العشر' : '🔒 After all 10 episodes') + '</span></div>' +
      '<p class="pf-acad-note">' + esc(ar ? 'كل حلقة بتتفتح بعد ما تتفرج على دقيقة من اللي قبلها، والاختبار بيتفتح بعد العشر حلقات.' : 'Each episode unlocks after you watch one minute of the previous one. The exam opens after all 10.') + '</p>';
  }

  function unlockNext(tr, i) {
    mark(tr.id, i);
    var cur = document.querySelector('.pf-ep[data-i="' + i + '"] .pf-ep-s'); if (cur && cur.textContent.indexOf('🔒') === -1) cur.textContent = (ARL === false ? '\u2713 Done' : '\u2713 \u062a\u0645\u062a');
    var nx = document.querySelector('.pf-ep[data-i="' + (i + 1) + '"]');
    if (nx && nx.classList.contains('pf-ep-lock')) {
      nx.classList.remove('pf-ep-lock'); nx.classList.add('pf-ep-on'); nx.removeAttribute('aria-disabled'); nx.setAttribute('tabindex', '0'); nx.setAttribute('role', 'button');
      var st = nx.querySelector('.pf-ep-s'); if (st) st.textContent = ARL === false ? 'Available' : '\u0645\u062a\u0627\u062d';
      nx.addEventListener('click', function () { SEL = i + 1; window.dispatchEvent(new HashChangeEvent('hashchange')); });
    }
  }
  function track(tr, i, v) {
    var done = prog(tr.id).indexOf(i) !== -1; if (done) return;
    if (v) {
      var fin = function () { if (v.currentTime >= NEED || v.ended) { v.removeEventListener('timeupdate', fin); v.removeEventListener('ended', fin); unlockNext(tr, i); } };
      v.addEventListener('timeupdate', fin); v.addEventListener('ended', fin);
    } else { setTimeout(function () { unlockNext(tr, i); }, NEED * 1000); }
  }

  var lockT = null;
  function lockMsg(msg) {
    var t = document.getElementById('pf-lock-toast');
    if (!t) { t = document.createElement('div'); t.id = 'pf-lock-toast'; t.className = 'pf-lock-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(lockT);
    lockT = setTimeout(function () { t.classList.remove('on'); }, 3200);
  }
  function wire(ar, route, rerender) {
    ARL = !!ar;
    var parts = route.split('/'), tr = parts[2] ? find(parts[2]) : null;
    if (!tr) return;
    var b = document.getElementById('pf-player-btn'), box = document.getElementById('pf-player');
    if (b && box) b.addEventListener('click', function () {
      var x = ep(tr.id, SEL);
      if (x.yt) { box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(x.yt) + '?autoplay=1&rel=0" title="Episode" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>'; track(tr, SEL, null); }
      else if (x.mp4) { box.style.cssText = 'aspect-ratio:9/16;max-height:78vh;width:min(100%,400px);margin:14px auto'; box.innerHTML = '<video src="' + x.mp4.replace(/"/g, '') + '" controls autoplay playsinline preload="none"></video>'; track(tr, SEL, box.querySelector('video')); }
    });
    document.querySelectorAll('.pf-ep.pf-ep-lock').forEach(function (li) {
      li.addEventListener('click', function () {
        lockMsg(li.classList.contains('pf-exam')
          ? (ar ? '\u0644\u0627\u0632\u0645 \u062a\u0634\u0627\u0647\u062f \u0627\u0644\u062d\u0644\u0642\u0627\u062a \u0627\u0644\u0639\u0634\u0631 \u0627\u0644\u0623\u0648\u0644 \u0639\u0634\u0627\u0646 \u064a\u0641\u062a\u062d \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631.' : 'Watch all 10 episodes first to unlock the exam.')
          : (ar ? '\u0644\u0627\u0632\u0645 \u062a\u0634\u0627\u0647\u062f \u0627\u0644\u062d\u0644\u0642\u0627\u062a \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0648\u0644 \u0639\u0634\u0627\u0646 \u062a\u0641\u062a\u062d \u0627\u0644\u062d\u0644\u0642\u0629 \u062f\u064a.' : 'Watch the previous episodes first to unlock this one.'));
      });
    });
    document.querySelectorAll('.pf-ep[data-i]:not(.pf-ep-lock)').forEach(function (li) {
      function pick() { SEL = +li.dataset.i; rerender(); }
      li.addEventListener('click', pick);
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }
  window.pfAcademy = { render: render, wire: wire, tracks: TRACKS };
})();
