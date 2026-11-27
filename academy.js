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
        ['الواي فاي العام', 'Public Wi-Fi'],
        ['الفيروسات والفدية', 'Viruses and ransomware'],
        ['حماية الموبايل', 'Mobile protection'],
        ['الخصوصية والتتبع', 'Privacy and tracking'],
        ['إزاي الهكر بيشتغل فعلاً', 'How a hacker really works'],
        ['هجمات متقدمة والتصدي لها', 'Advanced attacks and how to stop them']] },
    { id: 'code', ico: 'icBraces', ar: 'جافاسكريبت من الصفر', en: 'JavaScript from Scratch',
      dAr: 'لغة الويب كلها: من أول سكربت لحد تطبيق Todo كامل، وبتجرّب كل حاجة لايف.', dEn: 'The language of the web: from your first script to a full Todo app, with everything tried live.',
      eps: [
        ['ليه جافاسكريبت؟ وأول سكربت بـ Node', 'Why JavaScript? Your first script with Node'],
        ['المتغيرات والأنواع: let وconst وtypeof', 'Variables and types: let, const and typeof'],
        ['الشروط والحلقات: if وfor وwhile', 'Conditions and loops: if, for and while'],
        ['الدوال: function وarrow وscope', 'Functions: function, arrow and scope'],
        ['المصفوفات: map وfilter وreduce', 'Arrays: map, filter and reduce'],
        ['الكائنات وJSON: objects وdestructuring', 'Objects and JSON: objects and destructuring'],
        ['الـ DOM: تتحكم في الصفحة', 'The DOM: control the page'],
        ['الأحداث والفورمات: events وlocalStorage', 'Events and forms: events and localStorage'],
        ['async وfetch وPromises', 'async, fetch and Promises'],
        ['المشروع النهائي: Todo app كاملة', 'Final project: a complete Todo app']] },
    { id: 'net', ico: 'navGlobe', ar: 'شبكات من الصفر', en: 'Networking from Scratch',
      dAr: 'إزاي الإنترنت بيشتغل فعلاً، خطوة خطوة وبأمثلة من حياتك.', dEn: 'How the internet really works, step by step, with everyday examples.',
      eps: [
        ['رحلة الضغطة', 'A Click\'s Journey', 'إيه اللي بيحصل من لحظة ما تضغط على رابط لحد ما الصفحة تفتح.', 'What happens from the moment you click a link until the page opens.'],
        ['العناوين والأسماء', 'Addresses and Names', 'الآي بي (خاص/عام) والدي إن إس، وإزاي تلاقي مشكلتك لو واحد منهم وقع.', 'IP (private/public) and DNS, and how to find your problem when one of them fails.'],
        ['جوه بيتك', 'Inside Your Home', 'الراوتر والسويتش والأكسس بوينت، كل واحد بيعمل إيه، وإزاي تختار الجهاز وتحطه صح.', 'Router, switch and access point: what each does, and how to pick and place the right device.'],
        ['الواي فاي من جوه', 'Wi-Fi From the Inside', '2.4 و5 جيجا، القنوات، الحماية، شبكة الضيوف، وقياس الإشارة.', '2.4 and 5 GHz, channels, security, a guest network, and measuring signal.'],
        ['ليه النت بطيء', 'Why Is the Internet Slow', 'السرعة غير التأخير، وخطوات مرتبة تلاقي بيها السبب بالأرقام.', 'Speed is not latency, plus ordered steps to find the cause with numbers.'],
        ['البروتوكولات والتشفير', 'Protocols and Encryption', 'يعني إيه HTTP وHTTPS والقفل الأخضر، وإزاي بياناتك بتتحمي وهي ماشية.', 'What HTTP, HTTPS and the green lock mean, and how your data is protected in transit.'],
        ['النات والفايروول والبورتات', 'NAT, Firewalls and Ports', 'إزاي أجهزة البيت كلها بتشارك عنوان واحد، وإيه اللي الفايروول بيسمح بيه وبيمنعه.', 'How all home devices share one address, and what a firewall allows and blocks.'],
        ['تقسيم الشبكات', 'Network Segmentation', 'شبكات فرعية وVLAN بشكل مبسط، وعزل أجهزة البيت الذكية والضيوف.', 'Subnets and VLANs made simple, and isolating smart-home devices and guests.'],
        ['أدوات التشخيص', 'Diagnostic Tools', 'ping وtraceroute وnslookup والـIP config، وإزاي تقرأ نتايجها وتحدد العطل.', 'ping, traceroute, nslookup and ipconfig, and how to read results and locate the fault.'],
        ['تصميم شبكة مكتب', 'Designing an Office Network', 'مكتب صغير من الصفر، مع VPN ومراقبة، واختبار وشهادة تكمل بيها.', 'A small office from scratch, with VPN and monitoring, plus an exam and certificate.']] },
    { id: 'linux', ico: 'icTerm', ar: 'لينكس من الصفر', en: 'Linux from Scratch',
      dAr: 'تتعلم التيرمنال وأوامر لينكس خطوة خطوة، من غير خبرة قبل كده.', dEn: 'Learn the terminal and Linux commands step by step, with no prior experience.',
      eps: [
        ['ليه لينكس؟', 'Why Linux?'],
        ['الترمنال بعمق', 'The terminal in depth'],
        ['الملفات والمجلدات', 'Files and folders'],
        ['الصلاحيات والمستخدمين', 'Permissions and users'],
        ['البحث والتحكم في النص', 'Searching and controlling text'],
        ['العمليات والموارد', 'Processes and resources'],
        ['تنصيب البرامج', 'Installing software'],
        ['سكربتات Bash', 'Bash scripts'],
        ['الشبكة من التيرمنال', 'Networking from the terminal'],
        ['أمان السيرفر والمشروع النهائي', 'Server security and the final project']] },
    { id: 'py', ico: 'python', ar: 'بايثون من الصفر', en: 'Python from Scratch',
      dAr: 'أسهل لغة تبدأ بيها البرمجة، من أول سطر لحد مشروع صغير بتعمله بنفسك.', dEn: 'The friendliest language to start with, from your first line to a small project you build yourself.',
      eps: [
        ['بايثون يعني إيه وإزاي تبدأ', 'What Python is and how to start'],
        ['المتغيرات وأنواع البيانات', 'Variables and data types'],
        ['الشروط واتخاذ القرار', 'Conditions and decision making'],
        ['التكرار واللوبس', 'Repetition and loops'],
        ['القوائم والقواميس', 'Lists and dictionaries'],
        ['الدوال', 'Functions'],
        ['الملفات والأخطاء', 'Files and errors'],
        ['المكتبات والبيئات', 'Libraries and environments'],
        ['البرمجة الكائنية', 'Object-oriented programming'],
        ['مشروع ختامي وتحدي', 'Final project and challenge']] },
    { id: 'git', ico: 'icGit', ar: 'جيت وجيت هاب من الصفر', en: 'Git and GitHub from Scratch',
      dAr: 'تتعلم تحفظ شغلك وتتابع تغييراته وتشتغل مع فريق، من أول أمر لحد مشروعك على جيت هاب.', dEn: 'Learn to save your work, track changes and collaborate, from your first command to your own project on GitHub.',
      eps: [
        ['ليه Git وأول repository', 'Why Git? Your first repository'],
        ['التاريخ والرجوع في الزمن', 'History and time travel'],
        ['الفروع: branch وswitch', 'Branches: branch and switch'],
        ['الدمج وحل merge conflicts', 'Merging and resolving conflicts'],
        ['GitHub: remote وpush وpull وSSH key', 'GitHub: remote, push, pull and SSH key'],
        ['clone وfork وPull Request', 'clone, fork and Pull Request'],
        ['rebase وstash', 'rebase and stash'],
        ['.gitignore المتقدم وإدارة الأسرار وتنضيف التاريخ', 'Advanced .gitignore, secrets and cleaning history'],
        ['أخطاء الكوارث: reset وrevert وreflog وسر مسرب', 'Disaster mistakes: reset, revert, reflog and a leaked secret'],
        ['المشروع النهائي', 'Final project']] },
    { id: 'websec', ico: 'icLock', ar: 'أمن تطبيقات الويب', en: 'Web Application Security',
      dAr: 'إزاي المواقع بتتخترق وإزاي تحميها: ثغرات الويب الشائعة من ناحية البرمجة والدفاع.', dEn: 'How websites get attacked and how to defend them: the common web vulnerabilities from the code and defence side.',
      eps: [
        ['الحلقة ١ (قريباً)', 'Episode 1 (soon)'],
        ['الحلقة ٢ (قريباً)', 'Episode 2 (soon)'],
        ['الحلقة ٣ (قريباً)', 'Episode 3 (soon)'],
        ['الحلقة ٤ (قريباً)', 'Episode 4 (soon)'],
        ['الحلقة ٥ (قريباً)', 'Episode 5 (soon)'],
        ['الحلقة ٦ (قريباً)', 'Episode 6 (soon)'],
        ['الحلقة ٧ (قريباً)', 'Episode 7 (soon)'],
        ['الحلقة ٨ (قريباً)', 'Episode 8 (soon)'],
        ['الحلقة ٩ (قريباً)', 'Episode 9 (soon)'],
        ['الحلقة ١٠ (قريباً)', 'Episode 10 (soon)']] },
    { id: 'sql', ico: 'icDb', ar: 'قواعد البيانات SQL من الصفر', en: 'SQL Databases from Scratch',
      dAr: 'تتعلم تخزن البيانات وتسأل عنها بلغة SQL، من أول جدول لحد استعلامات حقيقية.', dEn: 'Learn to store and query data with SQL, from your first table to real queries.',
      eps: [
        ['الحلقة ١ (قريباً)', 'Episode 1 (soon)'],
        ['الحلقة ٢ (قريباً)', 'Episode 2 (soon)'],
        ['الحلقة ٣ (قريباً)', 'Episode 3 (soon)'],
        ['الحلقة ٤ (قريباً)', 'Episode 4 (soon)'],
        ['الحلقة ٥ (قريباً)', 'Episode 5 (soon)'],
        ['الحلقة ٦ (قريباً)', 'Episode 6 (soon)'],
        ['الحلقة ٧ (قريباً)', 'Episode 7 (soon)'],
        ['الحلقة ٨ (قريباً)', 'Episode 8 (soon)'],
        ['الحلقة ٩ (قريباً)', 'Episode 9 (soon)'],
        ['الحلقة ١٠ (قريباً)', 'Episode 10 (soon)']] },
    { id: 'api', ico: 'icApi', ar: 'بناء APIs بلغة بايثون', en: 'Building APIs with Python',
      dAr: 'تبني واجهة برمجية كاملة بلغة بايثون، من أول مسار لحد خدمة تقدر تربط بيها أي تطبيق.', dEn: 'Build a complete API in Python, from your first endpoint to a service any app can connect to.',
      eps: [
        ['الحلقة ١ (قريباً)', 'Episode 1 (soon)'],
        ['الحلقة ٢ (قريباً)', 'Episode 2 (soon)'],
        ['الحلقة ٣ (قريباً)', 'Episode 3 (soon)'],
        ['الحلقة ٤ (قريباً)', 'Episode 4 (soon)'],
        ['الحلقة ٥ (قريباً)', 'Episode 5 (soon)'],
        ['الحلقة ٦ (قريباً)', 'Episode 6 (soon)'],
        ['الحلقة ٧ (قريباً)', 'Episode 7 (soon)'],
        ['الحلقة ٨ (قريباً)', 'Episode 8 (soon)'],
        ['الحلقة ٩ (قريباً)', 'Episode 9 (soon)'],
        ['الحلقة ١٠ (قريباً)', 'Episode 10 (soon)']] },
    { id: 'ai', ico: 'icAi', ar: 'الذكاء الاصطناعي للمطورين', en: 'AI for Developers',
      dAr: 'إزاي تستخدم نماذج الذكاء الاصطناعي في برامجك وتبني بيها أدوات حقيقية.', dEn: 'How to use AI models in your own programs and build real tools with them.',
      eps: [
        ['الحلقة ١ (قريباً)', 'Episode 1 (soon)'],
        ['الحلقة ٢ (قريباً)', 'Episode 2 (soon)'],
        ['الحلقة ٣ (قريباً)', 'Episode 3 (soon)'],
        ['الحلقة ٤ (قريباً)', 'Episode 4 (soon)'],
        ['الحلقة ٥ (قريباً)', 'Episode 5 (soon)'],
        ['الحلقة ٦ (قريباً)', 'Episode 6 (soon)'],
        ['الحلقة ٧ (قريباً)', 'Episode 7 (soon)'],
        ['الحلقة ٨ (قريباً)', 'Episode 8 (soon)'],
        ['الحلقة ٩ (قريباً)', 'Episode 9 (soon)'],
        ['الحلقة ١٠ (قريباً)', 'Episode 10 (soon)']] }
  ];
  function find(id) { for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i]; return null; }
  function n(x, ar) { return ar ? String(x).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }) : String(x); }
  var DEF = { 'py-1': 'academy/py-1.mp4', 'py-2': 'academy/py-2.mp4', 'py-3': 'academy/py-3.mp4', 'py-4': 'academy/py-4.mp4', 'py-5': 'academy/py-5.mp4', 'py-6': 'academy/py-6.mp4', 'py-7': 'academy/py-7.mp4', 'py-8': 'academy/py-8.mp4', 'py-9': 'academy/py-9.mp4', 'py-10': 'academy/py-10.mp4', 'linux-1': 'academy/linux-1.mp4', 'linux-2': 'academy/linux-2.mp4', 'linux-3': 'academy/linux-3.mp4', 'linux-4': 'academy/linux-4.mp4', 'linux-5': 'academy/linux-5.mp4', 'linux-6': 'academy/linux-6.mp4', 'linux-7': 'academy/linux-7.mp4', 'linux-8': 'academy/linux-8.mp4', 'linux-9': 'academy/linux-9.mp4', 'linux-10': 'academy/linux-10.mp4', 'code-1': 'academy/code-1.mp4', 'code-2': 'academy/code-2.mp4', 'code-3': 'academy/code-3.mp4', 'code-4': 'academy/code-4.mp4', 'code-5': 'academy/code-5.mp4', 'code-6': 'academy/code-6.mp4', 'code-7': 'academy/code-7.mp4', 'code-8': 'academy/code-8.mp4', 'code-9': 'academy/code-9.mp4', 'code-10': 'academy/code-10.mp4', 'git-1': 'academy/git-1.mp4', 'git-2': 'academy/git-2.mp4', 'git-3': 'academy/git-3.mp4', 'git-4': 'academy/git-4.mp4', 'git-5': 'academy/git-5.mp4', 'git-6': 'academy/git-6.mp4', 'git-7': 'academy/git-7.mp4', 'git-8': 'academy/git-8.mp4', 'net-1': 'academy/net-1.mp4', 'net-2': 'academy/net-2.mp4', 'net-3': 'academy/net-3.mp4', 'net-4': 'academy/net-4.mp4', 'net-5': 'academy/net-5.mp4', 'net-6': 'academy/net-6.mp4', 'net-7': 'academy/net-7.mp4', 'net-8': 'academy/net-8.mp4', 'net-9': 'academy/net-9.mp4', 'net-10': 'academy/net-10.mp4', 'cyber-1': 'academy/cyber-1.mp4', 'cyber-2': 'academy/cyber-2.mp4', 'cyber-3': 'academy/cyber-3.mp4', 'cyber-4': 'academy/cyber-4.mp4', 'cyber-5': 'academy/cyber-5.mp4', 'cyber-6': 'academy/cyber-6.mp4', 'cyber-7': 'academy/cyber-7.mp4', 'cyber-8': 'academy/cyber-8.mp4', 'cyber-9': 'academy/cyber-9.mp4', 'cyber-10': 'academy/cyber-10.mp4' };
  var CFG = null, SEL = 0;
  function ep(tid, i) {
    var k = tid + '-' + (i + 1), e = (CFG && CFG.eps && CFG.eps[k]) || (DEF[k] ? { mp4: DEF[k] } : {});
    var has = !!(e.yt || e.mp4);
    return { hidden: e.status === 'hidden', live: has && e.status !== 'soon', yt: e.yt || '', mp4: e.mp4 || '' };
  }
  var NEED = 60, ARL = true;
  function prog(tid) { try { return JSON.parse(localStorage.getItem('pf-acad-' + tid) || '[]'); } catch (e) { return []; } }
  function mark(tid, i) { var a = prog(tid); if (a.indexOf(i) === -1) { a.push(i); try { localStorage.setItem('pf-acad-' + tid, JSON.stringify(a)); } catch (e) {} try { fetch('https://saqr-ahmed.ahmedsakr5326.workers.dev/academy/view', { method: 'POST', body: JSON.stringify({ t: tid, i: i + 1 }), keepalive: true }); } catch (e) {} } return a; }
  function unlocked(tid, i) { return i === 0 || prog(tid).indexOf(i - 1) !== -1; }
  function visible(t) { return !(CFG && CFG.tracks && CFG.tracks[t.id] && CFG.tracks[t.id].visible === false); }
  function liveList(t) { var a = []; for (var i = 0; i < t.eps.length; i++) { var e = ep(t.id, i); if (!e.hidden && e.live) a.push(i); } return a; }

  var EXAM_OK = { cyber: 1, net: 1, py: 1, linux: 1, code: 1 };
  function examReady(tid) { var a = prog(tid); for (var i = 0; i < 10; i++) if (a.indexOf(i) === -1) return false; return true; }
  function examRow(tr, ar, esc) {
    var ok = !!EXAM_OK[tr.id] && examReady(tr.id);
    return '<div class="pf-ep pf-exam ' + (ok ? 'pf-ep-on' : 'pf-ep-lock') + '"' + (ok ? ' id="pf-exam-open" tabindex="0" role="button"' : ' aria-disabled="true"') + '><span class="pf-ep-n">🎓</span><span class="pf-ep-t">' + esc(ar ? 'الاختبار والشهادة' : 'Exam and certificate') + '</span><span class="pf-ep-s">' + esc(ok ? (ar ? 'ابدأ' : 'Start') : (ar ? '🔒 بعد الحلقات العشر' : '🔒 After all 10 episodes')) + '</span></div>';
  }
  var PG_OK = { py: 1 };
  function pgOn(tr) { return !!PG_OK[tr.id] && !(CFG && CFG.pg && CFG.pg[tr.id] === false); }
  function pgRow(tr, ar, esc) {
    if (!pgOn(tr)) return '';
    return '<div class="pf-ep pf-exam pf-ep-on" id="pf-pg-open" tabindex="0" role="button"><span class="pf-ep-n">🧪</span><span class="pf-ep-t">' + esc(ar ? 'الملعب: جرّب كود بايثون' : 'Playground: try Python code') + '</span><span class="pf-ep-s">' + esc(ar ? 'افتح' : 'Open') + '</span></div><div class="pf-pg-box" id="pf-pg-box" hidden></div>';
  }
  function openPg(ar, tid) {
    var box = document.getElementById('pf-pg-box'); if (!box) return;
    if (!box.hidden) { box.hidden = true; return; }
    box.hidden = false;
    var go = function () { if (!box.firstChild) window.pfPlay.mount(box, ar, tid); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (window.pfPlay) return go();
    box.textContent = ar ? 'لحظة...' : 'One moment...';
    var sc = document.createElement('script'); sc.src = 'playground.js?v=1'; sc.onload = function () { box.textContent = ''; go(); }; sc.onerror = function () { box.textContent = ar ? 'مش قادرين نحمّل الملعب. جرّب تاني.' : 'Could not load the playground. Try again.'; };
    document.head.appendChild(sc);
  }
  function extraRows(tr, ar, esc) {
    if (!EXAM_OK[tr.id]) return '';
    var cy = tr.id === 'cyber', rw = function (id, ic, t) { return '<div class="pf-ep pf-exam pf-ep-on" id="' + id + '" tabindex="0" role="button"><span class="pf-ep-n">' + ic + '</span><span class="pf-ep-t">' + esc(t) + '</span><span class="pf-ep-s">' + esc(ar ? 'افتح' : 'Open') + '</span></div>'; };
    var p = prog(tr.id).length, cert = null, o = {}; try { cert = JSON.parse(localStorage.getItem('pf-cert-' + tr.id) || 'null'); } catch (e) {}
    var B = [['🎬', ar ? '٥ حلقات' : '5 episodes', p >= 5], ['📚', ar ? 'خلّصت العشر' : 'All 10 episodes', p >= 10], ['🎓', ar ? 'نجحت في الاختبار' : 'Passed the exam', !!cert], ['⭐', ar ? 'نجحت من أول مرة' : 'Passed first try', !!cert && localStorage.getItem(cy ? 'pf-ex-first' : 'pf-ex-first-' + tr.id) === '1'], ['💯', ar ? 'درجة كاملة' : 'Perfect score', !!cert && cert.score >= 20]];
    if (cy) B.push(['⚡', ar ? 'سؤال الأسبوع' : 'Weekly question', localStorage.getItem('pf-wq-ok') === '1']);
    return (cy ? rw('pf-board-open', '🏆', ar ? 'المتصدرين' : 'Leaderboard') + rw('pf-weekly-open', '⚡', ar ? 'سؤال الأسبوع' : 'Question of the week') : '') +
      '<p class="pf-bdg-t">' + esc(ar ? '🎖️ إنجازاتك' : '🎖️ Your badges') + '</p><div class="pf-bdg">' + B.map(function (b) { return '<span class="' + (b[2] ? '' : 'off') + '">' + b[0] + ' ' + esc(b[1]) + '</span>'; }).join('') + '</div>';
  }
  function openExam(ar, kind, tid) {
    var box = document.getElementById('pf-exam-box'); if (!box) return;
    kind = kind || 'exam';
    if (!box.hidden && box.getAttribute('data-kind') === kind) { box.hidden = true; return; }
    box.setAttribute('data-kind', kind);
    box.hidden = false; box.innerHTML = '<p class="pf-ex-p">' + (ar ? 'لحظة...' : 'One moment...') + '</p>';
    var go = function () { if (kind === 'board') window.pfExam.board(box, ar); else if (kind === 'weekly') window.pfExam.weekly(box, ar); else window.pfExam.open(box, ar, tid); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    if (window.pfExam) return go();
    var sc = document.createElement('script'); sc.src = 'academy-exam.js?v=8'; sc.onload = go; sc.onerror = function () { box.textContent = ar ? 'مش قادرين نحمّل الاختبار. جرّب تاني.' : 'Could not load the exam. Try again.'; };
    document.head.appendChild(sc);
  }

  function render(route, ar, h, cfg) {
    CFG = cfg || null;
    var esc = h.esc, icon = h.icon;
    var parts = route.split('/');
    var tr = parts[2] ? find(parts[2]) : null;
    if (tr && !visible(tr)) tr = null;
    if (!tr) {
      var list = TRACKS.filter(visible);
      return h.pageHead('ACADEMY', ar ? 'صقر أكاديمي' : 'Sakr Academy') +
        '<p class="pf-para">' + esc(ar ? 'عشرة مسارات مجانية، كل مسار ١٠ حلقات قصيرة بالصوت والصورة، وفي آخره اختبار وشهادة إتمام. نبدأ بمسار الأمن السيبراني، والباقي قريباً.' : 'Ten free tracks, each with 10 short video episodes, a final exam and a completion certificate. We start with the cybersecurity track, the rest are coming soon.') + '</p>' +
        '<div class="pf-acad-grid">' + list.map(function (t) {
          var c = liveList(t).length;
          return '<a class="pf-acad-card pf-t-' + t.id + '" href="#/academy/' + t.id + '">' +
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
        '<span class="pf-ep-t">' + t + (e[2] ? '<small class="pf-ep-d">' + esc(ar ? e[2] : e[3]) + '</small>' : '') + '</span><span class="pf-ep-s">' + st + '</span></li>';
    }).join('');
    var player = lv.length
      ? '<div class="pf-player" id="pf-player"><button type="button" class="pf-player-btn" id="pf-player-btn" aria-label="' + esc(ar ? 'شغّل الحلقة' : 'Play episode') + '"><span class="pf-player-tri"></span></button>' +
        '<div class="pf-player-cap" id="pf-player-cap">' + esc((ar ? 'الحلقة ' + n(SEL + 1, ar) + ': ' : 'Episode ' + (SEL + 1) + ': ') + (ar ? tr.eps[SEL][0] : tr.eps[SEL][1])) + '</div></div>'
      : '<div class="pf-player pf-player-soon"><div class="pf-player-cap">' + esc(ar ? 'الحلقات قريباً، جاري التجهيز.' : 'Episodes coming soon.') + '</div></div>';
    return '<div class="pf-trk pf-t-' + tr.id + '"></div>'.slice(0, -6) + '<a class="pf-acad-back" href="#/academy"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>' + esc(ar ? 'رجوع لكل المسارات' : 'Back to all tracks') + '</span></a>' +
      h.pageHead(n(10, ar) + (ar ? ' حلقات' : ' EPISODES'), ar ? tr.ar : tr.en) +
      '<p class="pf-para">' + esc(ar ? tr.dAr : tr.dEn) + '</p>' + player +
      '<ol class="pf-eps">' + rows + '</ol>' +
      examRow(tr, ar, esc) + pgRow(tr, ar, esc) + extraRows(tr, ar, esc) + '<div class="pf-exam-box" id="pf-exam-box" hidden></div>' +
      '<p class="pf-acad-note">' + esc(ar ? 'كل حلقة بتتفتح بعد ما تتفرج على دقيقة من اللي قبلها، والاختبار بيتفتح بعد العشر حلقات.' : 'Each episode unlocks after you watch one minute of the previous one. The exam opens after all 10.') + '</p></div>';
  }

  function unlockNext(tr, i) {
    mark(tr.id, i);
    if (EXAM_OK[tr.id] && examReady(tr.id)) { var er = document.querySelector('.pf-exam.pf-ep-lock'); if (er) { er.classList.remove('pf-ep-lock'); er.classList.add('pf-ep-on'); er.removeAttribute('aria-disabled'); er.id = 'pf-exam-open'; er.setAttribute('tabindex', '0'); er.setAttribute('role', 'button'); var es = er.querySelector('.pf-ep-s'); if (es) es.textContent = ARL === false ? 'Start' : '\u0627\u0628\u062f\u0623'; er.addEventListener('click', function () { openExam(ARL !== false, 'exam', tr.id); }); } }
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
    var po = document.getElementById('pf-pg-open');
    if (po) { po.addEventListener('click', function () { openPg(ar, tr.id); }); po.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPg(ar, tr.id); } }); }
    var eo = document.getElementById('pf-exam-open');
    [['pf-board-open', 'board'], ['pf-weekly-open', 'weekly']].forEach(function (x) { var e = document.getElementById(x[0]); if (e) { e.addEventListener('click', function () { openExam(ar, x[1]); }); e.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openExam(ar, x[1]); } }); } });
    if (eo) { eo.addEventListener('click', function () { openExam(ar, 'exam', tr.id); }); eo.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openExam(ar, 'exam', tr.id); } }); }
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
