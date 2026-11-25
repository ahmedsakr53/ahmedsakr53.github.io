/* Ahmed Saqr — personal portfolio. Standalone static site, no external dependencies. */
(function () {
  'use strict';

  var certNames = [
    'Network Technician Career Path Exam',
    'Junior Cybersecurity Analyst Career Path Exam',
    'Introduction to Cybersecurity',
    'Introduction To Networking'
  ];
  var certImages = [
    'photos/cert-network-technician.jpg',
    'photos/cert-junior-cyber.jpg',
    'photos/cert-intro-cyber.jpg',
    'photos/cert-edraak-networking.jpg'
  ];
  var socialLinks = [
    'https://www.facebook.com/share/1ca3HTdTdk/',
    'https://t.me/Ahmedsakr53',
    'https://wa.me/201154655875',
    'https://instagram.com/ahmed.sakr53'
  ];
  var navPaths = ['#/', '#/about', '#/certifications', '#/projects', '#/contact'];

  var T = {
    ar: {
      navAria: 'صفحات الموقع',
      nav: ['الرئيسية', 'نبذة عني', 'الشهادات', 'المشاريع', 'التواصل'],
      heroAlt: 'أحمد صقر ببدلة كحلية رسمية على خلفية استوديو بسيطة',
      nameAr: 'أحمد مختار عوض (صقر)',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      tagline: 'طالب هندسة كهرباء قسم اتصالات — جامعة سوهاج، يشق طريقه في الأمن السيبراني والشبكات بشهادات Cisco وتدريب عملي يومي، وهدفه القريب أول تدريب SOC.',
      visitsTitle: 'عدد زيارات الموقع',
      chips: ['طما، سوهاج، مصر', 'هندسة كهرباء قسم اتصالات — دفعة ٢٠٢٨', 'الهدف: تدريب SOC'],
      ctaProjects: 'استعرض مشاريعي',
      ctaContact: 'تواصل معي',
      aboutEyebrow: 'ABOUT',
      aboutTitle: 'من أنا؟',
      aboutBio: [
        'من طما، محافظة سوهاج، تخرج أحمد مختار عوض (صقر) في الثانوية العامة شعبة علمي رياضة بمجموع 92.25%، والتحق بكلية الهندسة جامعة سوهاج، هندسة كهرباء قسم اتصالات، وهو يعرف تمامًا إلى أين يتجه.',
        'شغفه بالأمن السيبراني والشبكات ليس مادة في منهج، بل حياة يومية: شهادتان من Cisco (محلل أمن سيبراني مبتدئ، وفني شبكات)، وشهادة مقدمة في الأمن السيبراني، وشهادة شبكات من منصة إدراك، وتدريب عملي مستمر على TryHackMe. يبني ويختبر ويتعلم بيده: من أنظمة IoT ذكية إلى مواقع كاملة صممها ونفذها بنفسه.',
        'لا ينتظر شهادة التخرج ليبدأ. مساره بدأ يتشكل من الآن، والهدف واضح: محلل SOC يُعتمد عليه.'
      ],
      facts: [
        ['الموقع', 'طما، سوهاج، مصر'],
        ['التعليم', 'هندسة كهرباء قسم اتصالات، جامعة سوهاج — الفرقة التالتة (٢٠٢٨) • الثانوية العامة علمي رياضة دفعة ٢٠٢٤ — 92.25%'],
        ['الهدف الحالي', 'تدريب SOC أو دعم فني']
      ],
      skillsTitle: 'المهارات',
      skills: [
        'شبكات الحاسب (مسار Cisco)',
        'أساسيات الأمن السيبراني',
        'Nmap',
        'Burp Suite',
        'Python',
        'C++',
        'LaTeX',
        'ICDL',
        'مهارات IT',
        'Arduino',
        'إنترنت الأشياء (IoT)',
        'TryHackMe — تدريب يومي'
      ],
      langsTitle: 'اللغات',
      langs: [
        ['العربية', 'اللغة الأم'],
        ['الإنجليزية', 'مستوى B2']
      ],
      certsEyebrow: 'CERTIFICATIONS',
      certsTitle: 'شهادات معتمدة',
      certsIntro: 'جميعها باسم Ahmed Mokhtar Awad. انقر على أي شهادة لعرضها كاملة.',
      certIssuers: ['Cisco Networking Academy', 'Cisco Networking Academy', 'Cisco Networking Academy — شهادة إتمام المساق', 'منصة إدراك'],
      certDate: '١٣ نوفمبر ٢٠٢٦',
      certAlts: [
        'شهادة Network Technician من Cisco Networking Academy',
        'شهادة Junior Cybersecurity Analyst من Cisco Networking Academy',
        'شهادة Introduction to Cybersecurity من Cisco Networking Academy',
        'شهادة Introduction To Networking من إدراك'
      ],
      certView: 'عرض شهادة',
      certsViewerTitle: 'الشهادات',
      projectsEyebrow: 'PROJECTS',
      projectsTitle: 'مشاريع نفذتها بنفسي',
      projects: [
        { name: 'المطب الصناعي الذكي', detail: 'مشروع إنترنت أشياء باستخدام Arduino: مطب صناعي ذكي يستشعر الحركة ويتفاعل معها.', img: 'photos/speed-bump.jpg', imgAlt: 'أحمد مع النموذج الأولي للمطب الصناعي الذكي أمام كلية الهندسة بجامعة سوهاج' },
        { name: 'منصة تجارية', detail: 'تصميم وتنفيذ منصة تجارية لصالح عميل خاص — تفاصيل المشروع محفوظة التزاماً بسرية العمل مع العملاء.' },
        { name: 'لعبة متحركة عالية الجودة', detail: 'لعبة جري لا نهائية برسوم كرتونية عالية الجودة وتجربة موبايل كاملة — في مراحلها الأخيرة، قريباً.' }
      ],
      contactEyebrow: 'CONTACT',
      contactTitle: 'تواصل معي',
      contactIntro: 'للتدريبات والفرص المهنية، أسهل طريقتين للتواصل معي:',
      followTitle: 'تابعني على',
      socials: ['فيسبوك', 'تليجرام', 'واتساب', 'إنستجرام'],
      closing: 'أُعدت للمراجعة في ٢٥ نوفمبر ٢٠٢٦.',
      toggleLabel: 'English'
    },
    en: {
      navAria: 'Site pages',
      nav: ['Home', 'About', 'Certifications', 'Projects', 'Contact'],
      heroAlt: 'Ahmed Saqr in a formal navy suit on a simple studio background',
      nameAr: 'أحمد مختار عوض (صقر)',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      tagline: 'An Electrical Engineering student, Communications section, at Sohag University, building his path in cybersecurity and networking with Cisco certifications and daily hands-on practice, with a near goal of a first SOC internship.',
      visitsTitle: 'Site visit count',
      chips: ['Tama, Sohag, Egypt', 'EE, Communications — Class of 2028', 'Goal: SOC internship'],
      ctaProjects: 'See my projects',
      ctaContact: 'Contact me',
      aboutEyebrow: 'ABOUT',
      aboutTitle: 'Who am I?',
      aboutBio: [
        'From Tama, Sohag Governorate, Ahmed Mokhtar Awad (Saqr) graduated from Thanaweya Amma, advanced mathematics track, with a score of 92.25%, and entered the Faculty of Engineering at Sohag University, Electrical Engineering, Communications section, knowing exactly where he was headed.',
        'His passion for cybersecurity and networking is not a course in a curriculum; it is a daily life: two Cisco certifications (Junior Cybersecurity Analyst and Network Technician), an Introduction to Cybersecurity certificate, a networking certificate from the Edraak platform, and continuous hands-on training on TryHackMe. He builds, tests, and learns with his own hands: from smart IoT systems to complete websites he designed and built himself.',
        'He is not waiting for his graduation certificate to begin. His path is being built right now, and the goal is clear: a SOC analyst you can rely on.'
      ],
      facts: [
        ['Location', 'Tama, Sohag, Egypt'],
        ['Education', 'Electrical Engineering, Communications section, Sohag University — Third year (2028) • Thanaweya Amma, advanced math track, class of 2024 — 92.25%'],
        ['Current goal', 'SOC internship or technical support']
      ],
      skillsTitle: 'Skills',
      skills: [
        'Computer Networking (Cisco track)',
        'Cybersecurity Fundamentals',
        'Nmap',
        'Burp Suite',
        'Python',
        'C++',
        'LaTeX',
        'ICDL',
        'IT skills',
        'Arduino',
        'Internet of Things (IoT)',
        'TryHackMe — daily practice'
      ],
      langsTitle: 'Languages',
      langs: [
        ['Arabic', 'Native'],
        ['English', 'B2 level']
      ],
      certsEyebrow: 'CERTIFICATIONS',
      certsTitle: 'Certifications',
      certsIntro: 'All awarded to Ahmed Mokhtar Awad. Click any certificate to view it in full.',
      certIssuers: ['Cisco Networking Academy', 'Cisco Networking Academy', 'Cisco Networking Academy — course completion', 'Edraak platform'],
      certDate: 'November 13, 2026',
      certAlts: [
        'Network Technician certificate from Cisco Networking Academy',
        'Junior Cybersecurity Analyst certificate from Cisco Networking Academy',
        'Introduction to Cybersecurity certificate from Cisco Networking Academy',
        'Introduction To Networking certificate from Edraak'
      ],
      certView: 'View certificate',
      certsViewerTitle: 'Certificates',
      projectsEyebrow: 'PROJECTS',
      projectsTitle: 'Things I built myself',
      projects: [
        { name: 'The Smart Speed Bump', detail: 'An Arduino IoT project: a smart speed bump that senses motion and reacts.', img: 'photos/speed-bump.jpg', imgAlt: 'Ahmed holding the Smart Speed Bump prototype at the Faculty of Engineering, Sohag University' },
        { name: 'Commercial Platform', detail: 'Design and delivery of a commercial platform for a private client — project details kept confidential under client privacy.' },
        { name: 'High-Quality Animated Game', detail: 'An endless-runner mobile game with high-quality cartoon art and a full gameplay experience — in final stages, coming soon.' }
      ],
      contactEyebrow: 'CONTACT',
      contactTitle: 'Contact me',
      contactIntro: 'For internships and professional opportunities, the two easiest ways to reach me:',
      followTitle: 'Follow me on',
      socials: ['Facebook', 'Telegram', 'WhatsApp', 'Instagram'],
      closing: 'Prepared for review on November 25, 2026.',
      toggleLabel: 'العربية'
    }
  };

  var lang = 'ar';
  try { lang = localStorage.getItem('pf-lang') === 'en' ? 'en' : 'ar'; } catch (e) {}
  var langParam = (location.search.match(/[?&]lang=(ar|en)/) || [])[1];
  if (langParam) lang = langParam;
  var openCert = -1;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function bdi(s) { return '<bdi>' + esc(s) + '</bdi>'; }

  function pageHead(eyebrow, title) {
    return '<div class="pf-pagehead"><div class="pf-eyebrow">' + esc(eyebrow) + '</div><h2 class="pf-h2">' + esc(title) + '</h2></div>';
  }

  function renderHome(t) {
    return '<div class="pf-page"><div class="pf-hero">' +
      '<div class="pf-hero-glow pf-glow-a"></div><div class="pf-hero-glow pf-glow-b"></div>' +
      '<div class="pf-hero-inner">' +
      '<div class="pf-portrait"><img src="photos/about-studio.jpg" alt="' + esc(t.heroAlt) + '"></div>' +
      '<div class="pf-name-en">AHMED MOKHTAR AWAD (SAQR)</div>' +
      '<h1 class="pf-name">' + esc(t.nameAr) + '</h1>' +
      '<div class="pf-role"><bdi>' + esc(t.role) + '</bdi></div>' +
      '<p class="pf-tagline">' + esc(t.tagline) + '</p>' +
      '<div class="pf-chips">' + t.chips.map(function (c) { return '<span class="pf-chip">' + esc(c) + '</span>'; }).join('') + '</div>' +
      '<div class="pf-cta">' +
      '<a class="pf-btn pf-btn-primary" href="#/projects">' + esc(t.ctaProjects) + '</a>' +
      '<a class="pf-btn pf-btn-ghost" href="#/contact">' + esc(t.ctaContact) + '</a>' +
      '</div>' +
      '<div class="pf-visits" title="' + esc(t.visitsTitle) + '"><img src="https://hits.sh/ahmedsakr53.github.io/hits.svg?label=%F0%9F%91%81&color=2f7fd4&style=flat" alt="' + esc(t.visitsTitle) + '" loading="lazy"></div>' +
      '</div></div></div>';
  }

  function renderAbout(t) {
    return '<div class="pf-page">' + pageHead(t.aboutEyebrow, t.aboutTitle) +
      t.aboutBio.map(function (p) { return '<p class="pf-para">' + esc(p) + '</p>'; }).join('') +
      '<div class="pf-facts">' + t.facts.map(function (f) {
        return '<div class="pf-fact"><span class="pf-fact-label">' + esc(f[0]) + '</span><span class="pf-fact-value">' + esc(f[1]) + '</span></div>';
      }).join('') + '</div>' +
      '<h3 class="pf-h3">' + esc(t.skillsTitle) + '</h3>' +
      '<div class="pf-skills">' + t.skills.map(function (s) { return '<span class="pf-skill"><bdi>' + esc(s) + '</bdi></span>'; }).join('') + '</div>' +
      '<h3 class="pf-h3">' + esc(t.langsTitle) + '</h3>' +
      '<div class="pf-langs">' + t.langs.map(function (l) {
        return '<div class="pf-lang"><span class="pf-lang-name">' + esc(l[0]) + '</span><span class="pf-lang-level">' + esc(l[1]) + '</span></div>';
      }).join('') + '</div></div>';
  }

  function renderCerts(t) {
    var cards = certNames.map(function (name, i) {
      return '<div class="pf-card pf-cert">' +
        '<button type="button" class="pf-cert-imgbtn" data-cert="' + i + '" aria-label="' + esc(t.certView + ' ' + name) + '">' +
        '<img src="' + certImages[i] + '" alt="' + esc(t.certAlts[i]) + '" loading="lazy"></button>' +
        '<div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + bdi(name) + '</div>' +
        '<div class="pf-card-detail">' + bdi(t.certIssuers[i]) + '</div>' +
        '<div class="pf-card-date">' + esc(t.certDate) + '</div></div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.certsEyebrow, t.certsTitle) +
      '<p class="pf-para">' + esc(t.certsIntro) + '</p>' +
      '<div class="pf-grid">' + cards + '</div></div>';
  }

  function renderProjects(t) {
    var cards = t.projects.map(function (p, i) {
      var body = '<div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + esc(p.name) + '</div>' +
        '<div class="pf-card-detail">' + esc(p.detail) + '</div>';
      if (p.img) return '<div class="pf-card pf-card-media">' +
        '<div class="pf-card-media-img"><img src="' + esc(p.img) + '" alt="' + esc(p.imgAlt || p.name) + '" loading="lazy"></div>' +
        '<div class="pf-card-media-body">' + body + '</div></div>';
      return '<div class="pf-card">' + body + '</div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.projectsEyebrow, t.projectsTitle) +
      '<div class="pf-grid">' + cards + '</div></div>';
  }

  function renderContact(t) {
    return '<div class="pf-page">' + pageHead(t.contactEyebrow, t.contactTitle) +
      '<p class="pf-para">' + esc(t.contactIntro) + '</p>' +
      '<div class="pf-contact">' +
      '<a class="pf-btn pf-btn-primary" href="mailto:Ahmedsakr5326@gmail.com"><bdi>Ahmedsakr5326@gmail.com</bdi></a>' +
      '<a class="pf-btn pf-btn-ghost" href="https://linkedin.com/in/ahmed-mokhtar-3b1b3b24a"><bdi>linkedin.com/in/ahmed-mokhtar-3b1b3b24a</bdi></a>' +
      '</div>' +
      '<h3 class="pf-h3">' + esc(t.followTitle) + '</h3>' +
      '<div class="pf-contact">' + socialLinks.map(function (href, i) {
        return '<a class="pf-btn pf-btn-ghost" href="' + href + '" target="_blank" rel="noopener">' + esc(t.socials[i]) + '</a>';
      }).join('') + '</div></div>';
  }

  function currentRoute() {
    var h = location.hash || '#/';
    if (navPaths.indexOf(h) === -1) return '#/';
    return h;
  }

  function render() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar' ? 'أحمد صقر — أمن سيبراني وشبكات' : 'Ahmed Saqr — Cybersecurity & Networking';
    var route = currentRoute();
    var nav = '<nav class="pf-nav" aria-label="' + esc(t.navAria) + '">' +
      t.nav.map(function (label, i) {
        var active = navPaths[i] === route ? ' aria-current="page"' : '';
        return '<a href="' + navPaths[i] + '"' + active + '>' + esc(label) + '</a>';
      }).join('') +
      '<button type="button" class="pf-lang-toggle" aria-label="' + esc(t.toggleLabel) + '">' +
      '<span class="pf-lang-toggle-thumb" aria-hidden="true"></span>' +
      '<span class="pf-lang-toggle-opt' + (lang === 'ar' ? ' pf-lang-toggle-active' : '') + '">ع</span>' +
      '<span class="pf-lang-toggle-opt' + (lang === 'en' ? ' pf-lang-toggle-active' : '') + '">EN</span>' +
      '</button></nav>';
    var page;
    if (route === '#/about') page = renderAbout(t);
    else if (route === '#/certifications') page = renderCerts(t);
    else if (route === '#/projects') page = renderProjects(t);
    else if (route === '#/contact') page = renderContact(t);
    else page = renderHome(t);
    document.getElementById('app').innerHTML = nav + page + '<div class="pf-closing">' + esc(t.closing) + '</div>';
    if (openCert >= 0 && route === '#/certifications') showLightbox(openCert);
  }

  function showLightbox(i) {
    var t = T[lang];
    openCert = i;
    var lb = document.createElement('div');
    lb.className = 'pf-lightbox';
    lb.id = 'pf-lightbox';
    lb.innerHTML = '<img src="' + certImages[i] + '" alt="' + esc(t.certAlts[i]) + '">' +
      '<div class="pf-lightbox-caption">' + esc(t.certsViewerTitle) + ' — ' + bdi(certNames[i]) + '</div>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-prev" aria-label="&#8249;">&#8249;</button>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-next" aria-label="&#8250;">&#8250;</button>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-close" aria-label="&times;">&times;</button>';
    document.body.appendChild(lb);
    lb.querySelector('.pf-lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.pf-lightbox-prev').addEventListener('click', function () { stepLightbox(-1); });
    lb.querySelector('.pf-lightbox-next').addEventListener('click', function () { stepLightbox(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  }
  function stepLightbox(d) {
    var next = (openCert + d + certImages.length) % certImages.length;
    closeLightbox();
    showLightbox(next);
  }
  function closeLightbox() {
    openCert = -1;
    var lb = document.getElementById('pf-lightbox');
    if (lb) lb.remove();
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest && e.target.closest('.pf-lang-toggle');
    if (toggle) {
      lang = lang === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('pf-lang', lang); } catch (err) {}
      render();
      return;
    }
    var certBtn = e.target.closest && e.target.closest('.pf-cert-imgbtn');
    if (certBtn) {
      showLightbox(parseInt(certBtn.getAttribute('data-cert'), 10));
    }
  });

  document.addEventListener('pointerdown', function (e) {
    var target = e.target.closest && e.target.closest('.pf-btn, .pf-nav a, .pf-skill, .pf-cert-imgbtn, .pf-lang-toggle');
    if (!target) return;
    var rect = target.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height) * 2;
    ripple.className = 'pf-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    target.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  window.addEventListener('hashchange', function () { closeLightbox(); render(); window.scrollTo(0, 0); });
  render();
})();
