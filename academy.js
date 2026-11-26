/* Academy pages. Loaded only when a visitor opens #/academy. No images, no video until Play is pressed. */
(function () {
  // Set a YouTube ID or a direct .mp4 URL here when the first video is ready.
  var VIDEOS = { 'cyber-1': { yt: '', mp4: '' } };
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

  function render(route, ar, h) {
    var esc = h.esc, icon = h.icon;
    var parts = route.split('/'); // ['#','academy', id?]
    var tr = parts[2] ? find(parts[2]) : null;
    if (!tr) {
      return h.pageHead('ACADEMY', ar ? 'الأكاديمية' : 'Academy') +
        '<p class="pf-para">' + esc(ar ? 'ثلاث مسارات مجانية، كل مسار ١٠ حلقات قصيرة بالصوت والصورة، وفي آخره اختبار وشهادة إتمام. نبدأ بمسار الأمن السيبراني، والباقي قريباً.' : 'Three free tracks, each with 10 short video episodes, a final exam and a completion certificate. We start with the cybersecurity track, the rest are coming soon.') + '</p>' +
        '<div class="pf-acad-grid">' + TRACKS.map(function (t) {
          var live = t.id === 'cyber';
          return '<a class="pf-acad-card" href="#/academy/' + t.id + '">' +
            '<span class="pf-acad-ico">' + icon(t.ico) + '</span>' +
            '<b>' + esc(ar ? t.ar : t.en) + '</b>' +
            '<small>' + esc(ar ? t.dAr : t.dEn) + '</small>' +
            '<span class="pf-acad-meta"><i>' + esc(n(10, ar) + (ar ? ' حلقات' : ' episodes')) + '</i>' +
            '<i class="' + (live ? 'pf-acad-on' : '') + '">' + esc(live ? (ar ? 'الحلقة ١ متاحة' : 'Episode 1 available') : (ar ? 'قريباً' : 'Coming soon')) + '</i></span></a>';
        }).join('') + '</div>';
    }
    var vid = VIDEOS[tr.id + '-1'];
    var rows = tr.eps.map(function (e, i) {
      var avail = tr.id === 'cyber' && i === 0;
      return '<li class="pf-ep' + (avail ? ' pf-ep-on' : '') + '"><span class="pf-ep-n">' + n(i + 1, ar) + '</span>' +
        '<span class="pf-ep-t">' + esc(ar ? e[0] : e[1]) + '</span>' +
        '<span class="pf-ep-s">' + esc(avail ? (ar ? 'متاح' : 'Available') : (ar ? 'قريباً' : 'Soon')) + '</span></li>';
    }).join('');
    var player = tr.id === 'cyber'
      ? '<div class="pf-player" id="pf-player" data-has="' + ((vid && (vid.yt || vid.mp4)) ? '1' : '0') + '">' +
        '<button type="button" class="pf-player-btn" id="pf-player-btn" aria-label="' + esc(ar ? 'شغّل الحلقة' : 'Play episode') + '">' +
        '<span class="pf-player-tri"></span></button>' +
        '<div class="pf-player-cap">' + esc((ar ? 'الحلقة ١: ' : 'Episode 1: ') + (ar ? tr.eps[0][0] : tr.eps[0][1])) + '</div></div>'
      : '';
    return '<a class="pf-acad-back" href="#/academy">' + esc(ar ? '← كل المسارات' : '← All tracks') + '</a>' +
      h.pageHead(n(10, ar) + (ar ? ' حلقات' : ' EPISODES'), ar ? tr.ar : tr.en) +
      '<p class="pf-para">' + esc(ar ? tr.dAr : tr.dEn) + '</p>' + player +
      '<ol class="pf-eps">' + rows + '</ol>' +
      '<p class="pf-acad-note">' + esc(ar ? 'الاختبار النهائي وشهادة الإتمام بيتفتحوا لما الحلقات تكمل.' : 'The final exam and certificate open once the episodes are out.') + '</p>';
  }

  function wire(ar) {
    var b = document.getElementById('pf-player-btn'), box = document.getElementById('pf-player');
    if (!b || !box) return;
    b.addEventListener('click', function () {
      var v = VIDEOS['cyber-1'];
      if (v.yt) {
        box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.yt) + '?autoplay=1&rel=0" title="Episode 1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>';
      } else if (v.mp4) {
        box.innerHTML = '<video src="' + v.mp4.replace(/"/g, '') + '" controls autoplay playsinline preload="none"></video>';
      } else {
        var c = box.querySelector('.pf-player-cap');
        if (c) c.textContent = ar ? 'الفيديو بيتجهّز، هيظهر هنا قريباً.' : 'The video is being prepared and will appear here soon.';
      }
    });
  }
  window.pfAcademy = { render: render, wire: wire };
})();
