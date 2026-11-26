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
        ['الواي فاي العام والشبكات', 'Public Wi-Fi and networks'],
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
  var CFG = null, SEL = 0;
  function ep(tid, i) {
    var e = (CFG && CFG.eps && CFG.eps[tid + '-' + (i + 1)]) || {};
    var has = !!(e.yt || e.mp4);
    return { hidden: e.status === 'hidden', live: has && e.status !== 'soon', yt: e.yt || '', mp4: e.mp4 || '' };
  }
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
    if (lv.indexOf(SEL) === -1) SEL = lv.length ? lv[0] : 0;
    var rows = tr.eps.map(function (e, i) {
      var x = ep(tr.id, i);
      if (x.hidden) return '';
      var t = esc(ar ? e[0] : e[1]);
      var st = esc(x.live ? (ar ? 'متاح' : 'Available') : (ar ? 'قريباً' : 'Soon'));
      return '<li class="pf-ep' + (x.live ? ' pf-ep-on' : '') + (x.live && i === SEL ? ' pf-ep-sel' : '') + '"' + (x.live ? ' data-i="' + i + '" tabindex="0" role="button"' : '') + '><span class="pf-ep-n">' + n(i + 1, ar) + '</span>' +
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
      '<p class="pf-acad-note">' + esc(ar ? 'الاختبار النهائي وشهادة الإتمام بيتفتحوا لما الحلقات تكمل.' : 'The final exam and certificate open once the episodes are out.') + '</p>';
  }

  function wire(ar, route, rerender) {
    var parts = route.split('/'), tr = parts[2] ? find(parts[2]) : null;
    if (!tr) return;
    var b = document.getElementById('pf-player-btn'), box = document.getElementById('pf-player');
    if (b && box) b.addEventListener('click', function () {
      var x = ep(tr.id, SEL);
      if (x.yt) box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(x.yt) + '?autoplay=1&rel=0" title="Episode" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
      else if (x.mp4) box.innerHTML = '<video src="' + x.mp4.replace(/"/g, '') + '" controls autoplay playsinline preload="none"></video>';
    });
    document.querySelectorAll('.pf-ep[data-i]').forEach(function (li) {
      function pick() { SEL = +li.dataset.i; rerender(); }
      li.addEventListener('click', pick);
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }
  window.pfAcademy = { render: render, wire: wire, tracks: TRACKS };
})();
