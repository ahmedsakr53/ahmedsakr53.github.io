/* Ahmed Sakr — personal portfolio. Standalone static site, no external dependencies. */
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
    'https://instagram.com/ahmed.sakr53',
    'https://github.com/ahmedsakr53',
    'https://www.tiktok.com/@ahmed.sakr.35',
    'https://x.com/sakr5_3',
    'https://s.imoim.net/qkDhIX'
  ];
  var ICON_PATHS = {
    mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
    instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
    tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    moon: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
    sun: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0-5 2.39 3.42a5.09 5.09 0 0 0-4.78 0L12 2zm10 10-3.42 2.39a5.09 5.09 0 0 0 0-4.78L22 12zM12 22l-2.39-3.42a5.09 5.09 0 0 0 4.78 0L12 22zM2 12l3.42-2.39a5.09 5.09 0 0 0 0 4.78L2 12zm17.07-7.07-.72 4.1a5.09 5.09 0 0 0-3.38-3.38l4.1-.72zM4.93 19.07l.72-4.1a5.09 5.09 0 0 0 3.38 3.38l-4.1.72zm14.14 0-4.1-.72a5.09 5.09 0 0 0 3.38-3.38l.72 4.1zM4.93 4.93l4.1.72a5.09 5.09 0 0 0-3.38 3.38l-.72-4.1z',
    imo: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
    x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
  };
  var socialIcons = ['facebook', 'telegram', 'whatsapp', 'instagram', 'github', 'tiktok', 'x', 'imo'];
  function icon(name) {
    return '<svg class="pf-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON_PATHS[name] + '"/></svg>';
  }
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
      socials: ['فيسبوك', 'تليجرام', 'واتساب', 'إنستجرام', 'جيتهاب', 'تيك توك', 'إكس', 'ايمو'],
      closing: 'أُعدت للمراجعة في ٢٥ نوفمبر ٢٠٢٦.',
      toggleLabel: 'English',
      themeLabel: 'الوضع الليلي'
    },
    en: {
      navAria: 'Site pages',
      nav: ['Home', 'About', 'Certifications', 'Projects', 'Contact'],
      heroAlt: 'Ahmed Sakr in a formal navy suit on a simple studio background',
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
        'From Tama, Sohag Governorate, Ahmed Mokhtar Awad (Sakr) graduated from Thanaweya Amma, advanced mathematics track, with a score of 92.25%, and entered the Faculty of Engineering at Sohag University, Electrical Engineering, Communications section, knowing exactly where he was headed.',
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
      socials: ['Facebook', 'Telegram', 'WhatsApp', 'Instagram', 'GitHub', 'TikTok', 'X', 'imo'],
      closing: 'Prepared for review on November 25, 2026.',
      toggleLabel: 'العربية',
      themeLabel: 'Dark mode'
    }
  };

  var lang = 'ar';
  try { lang = localStorage.getItem('pf-lang') === 'en' ? 'en' : 'ar'; } catch (e) {}
  var theme = 'light';
  try { theme = localStorage.getItem('pf-theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}
  var langParam = (location.search.match(/[?&]lang=(ar|en)/) || [])[1];
  if (langParam) lang = langParam;
  var themeParam = (location.search.match(/[?&]theme=(light|dark)/) || [])[1];
  if (themeParam) theme = themeParam;
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
      '<div class="pf-name-en">AHMED MOKHTAR AWAD (SAKR)</div>' +
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
      '<a class="pf-btn pf-btn-primary" href="mailto:Ahmedsakr5326@gmail.com">' + icon('mail') + '<bdi>Ahmedsakr5326@gmail.com</bdi></a>' +
      '<a class="pf-btn pf-btn-ghost" href="https://linkedin.com/in/ahmed-mokhtar-3b1b3b24a">' + icon('linkedin') + '<bdi>linkedin.com/in/ahmed-mokhtar-3b1b3b24a</bdi></a>' +
      '</div>' +
      '<h3 class="pf-h3">' + esc(t.followTitle) + '</h3>' +
      '<div class="pf-contact">' + socialLinks.map(function (href, i) {
        return '<a class="pf-btn pf-btn-ghost pf-btn-social" href="' + href + '" target="_blank" rel="noopener">' + icon(socialIcons[i]) + esc(t.socials[i]) + '</a>';
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
    document.documentElement.dataset.theme = theme;
    document.title = lang === 'ar' ? 'أحمد صقر — أمن سيبراني وشبكات' : 'Ahmed Sakr — Cybersecurity & Networking';
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
      '</button>' +
      '<button type="button" class="pf-theme-toggle" aria-label="' + esc(t.themeLabel) + '" title="' + esc(t.themeLabel) + '">' +
      icon(theme === 'dark' ? 'sun' : 'moon') +
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
    var themeToggle = e.target.closest && e.target.closest('.pf-theme-toggle');
    if (themeToggle) {
      theme = theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('pf-theme', theme); } catch (err) {}
      render();
      return;
    }
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
