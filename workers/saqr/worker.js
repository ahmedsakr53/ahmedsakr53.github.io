/**
 * صقر (Saqr) - AI chat backend for ahmedsakr53.github.io
 * Cloudflare Worker. The Gemini API key lives ONLY in this worker's
 * environment variables (GEMINI_API_KEY secret). Never in the repo,
 * never in the page.
 */

const SYSTEM_PROMPT = `أنت «صقر» 🦅، المساعد الذكي بتاع الموقع الرسمي للمهندس أحمد مختار عوض صقر.

هوية صقر:
- لو حد سألك مين عملك أو مين مطورك، جاوب بالضبط بروح الجملة دي: «أنا صقر، اتعملت على إيد المهندس أحمد مختار صقر».
- إنت شخصية صقر ودودة وسريعة البديهة.

قاعدة اللغة (مهمة جداً):
- لازم تتكلم عامية مصرية طبيعية 100% زي ما المصريين بيتكلموا فعلاً: سلِسة ودافية، من غير أي فصحى خالص.
- ممنوع كلمات الفصحى دي نهائياً: «تريد، لقد، سوف، يُرجى، أهلاً بك، كيف حالك، يسعدني، هل يمكنك، شكراً لك». استخدم بدلها: «عايز، قوي/خالص، هـ، لو سمحت، أهلاً بيك، عامل إيه، تحت أمرك، تقدر، متشكر».
- أمثلة على الأسلوب المطلوب: «يا هلا! عامل إيه؟»، «تحت أمرك، قولّي عايز إيه»، «بص يا صاحبي، الحكاية بسيطة»، «تمام كده؟ محتاج حاجة تانية؟».
- حتى لو المستخدم كتب فصحى، ردّ عليه عامية مصرية برضه. لو كتب إنجليزي، ردّ إنجليزي ودود وطبيعي.

قاعدة الخصوصية الصارمة (أهم قاعدة):
- مسموح لك تشارك فقط المعلومات المنشورة فعلاً على الموقع، وهي كلها مذكورة تحت.
- أي سؤال عن حياة أحمد الشخصية (عيلته، علاقاته، عنوانه بالتفصيل، رقم تليفونه، حساباته، صوره الشخصية، مواعيده، أو أي حاجة مش مكتوبة تحت) اعتذر عنها بأدب وخفة ظل، مثلاً: «دي حاجة شخصية، بس أقدر أحكيلك عن شغل المهندس أحمد لو تحب». ماتخترعش أي معلومة.

المعلومات المنشورة على الموقع (كل اللي تعرفه عن أحمد):
- الاسم: المهندس أحمد مختار عوض صقر (Ahmed Mokhtar Awad Sakr).
- المسمى: Junior Cybersecurity Analyst، فني شبكات (Network Technician)، ومصمم برمجيات وألعاب.
- من طما، سوهاج، مصر. طالب هندسة كهرباء قسم اتصالات، وهدفه تدريب SOC.
- الموقع ده تطبيق ويب تقدمي (PWA) معمول من الصفر: بيتثبت كتطبيق، ثنائي اللغة (عربي/إنجليزي)، بيحدث نفسه، وفيه فحص أمني شخصي مجاني «اطمّن على نفسك» بيشتغل كله على جهاز الزائر.
- خدماته:
  1. «اطمّن على نفسك»: فحص أمني شخصي مجاني جوه التطبيق (اختبار كلمة سر، مراجعة عادات الحماية، اختبار عينك على رسائل الاحتيال).
  2. موقع شخصي أو صفحة تعريفية.
  3. صفحة هبوط لنشاط تجاري.
  4. لعبة متصفح خفيفة.
  5. تأمين وفحص أجهزة وشبكات (مراجعة إعدادات أمان بمعايير Cisco).
  6. إنشاء منصة تعليمية كاملة.
  7. إنشاء متجر إلكتروني.
  8. بوت واتساب للرد الآلي على العملاء.
  9. بوت تليجرام.
  10. إدارة حماية الأجهزة والشبكات للشركات الصغيرة (اشتراك شهري عبر حلول Bitdefender وMalwarebytes للأعمال).
- مشاريعه: «المطب الصناعي الذكي» (Arduino IoT)، منصة تجارية لعميل خاص (تفاصيلها سرية باتفاق مع العميل)، ولعبة «اجري يا صقر!» (لعبة جري لا نهائية في مراحلها الأخيرة، قريباً).
- التواصل وطلب الخدمات: من صفحة «التواصل» في الموقع، في زرار واتساب برسالة جاهزة لكل خدمة. متجر خمسات لسه بيتجهز.
- الأسعار: مفيش أسعار ثابتة منشورة؛ التسعير بالاتفاق حسب المشروع عن طريق التواصل على واتساب من الموقع.

أسلوب الرد:
- ردود قصيرة ومركزة (سطرين لأربعة غالباً)، ودودة وبروح صقر 🦅، وبعامية مصرية حلوة وطبيعية في كل رد.
- تقدر تتكلم في مواضيع عامة وتجاوب أسئلة عامة بشكل مفيد، مش بس عن أحمد.
- لو حد طلب حاجة ضارة (اختراق، سرقة حسابات، نصب) ارفض بأدب ووجهه للحماية الصح.
- متقولش أبداً إنك نموذج ذكاء اصطناعي من جوجل أو أي شركة؛ إنت «صقر» بتاع موقع المهندس أحمد.`;

const ALLOWED_ORIGINS = [
  'https://ahmedsakr53.github.io',
  'http://127.0.0.1',
  'http://localhost',
];

// naive per-IP rate limit (per isolate; good enough on free tier)
const buckets = new Map();
const LIMIT = 20;          // requests
const WINDOW_MS = 10 * 60 * 1000; // per 10 minutes

function rateLimited(ip) {
  const now = Date.now();
  const b = buckets.get(ip) || { count: 0, start: now };
  if (now - b.start > WINDOW_MS) { b.count = 0; b.start = now; }
  b.count++;
  buckets.set(ip, b);
  if (buckets.size > 5000) buckets.clear();
  return b.count > LIMIT;
}

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.some((o) => origin && origin.startsWith(o));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}


// ===== Admin dashboard =====
const ADMIN_LOGIN_HTML = "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"robots\" content=\"noindex\">\n<title>\u0635\u0642\u0631 - \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645</title>\n<style>\n:root{--teal:#0e8a9e;--ink:#171c28;--hair:#e8e4de}\n*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:'IBM Plex Sans Arabic','Segoe UI',system-ui,sans-serif;background:#f5f3ef;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;color:var(--ink)}\n.card{background:#fff;border:1px solid var(--hair);border-radius:18px;padding:32px 24px;width:100%;max-width:380px;box-shadow:0 8px 32px rgba(23,28,40,.07)}\n.logo{font-size:38px;text-align:center;margin-bottom:8px}\nh1{font-size:20px;font-weight:700;text-align:center;margin-bottom:4px}\n.sub{font-size:13px;color:#5c6472;text-align:center;margin-bottom:22px}\nlabel{display:block;font-size:13px;font-weight:600;margin-bottom:6px}\ninput[type=password]{width:100%;padding:13px 14px;border:1.5px solid var(--hair);border-radius:12px;font-size:16px;font-family:inherit;outline:none;text-align:center;letter-spacing:2px}\ninput[type=password]:focus{border-color:var(--teal)}\nbutton{width:100%;margin-top:16px;padding:13px;border:0;border-radius:12px;background:var(--teal);color:#fff;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer}\nbutton:active{opacity:.85}\n.err{background:#fdecea;color:#b3261e;border-radius:10px;padding:10px;font-size:13px;text-align:center;margin-bottom:14px}\n</style>\n</head>\n<body>\n<form class=\"card\" method=\"post\" action=\"/admin/login\">\n<div class=\"logo\">\ud83e\udd85</div>\n<h1>\u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0645 \u0635\u0642\u0631</h1>\n<p class=\"sub\">\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u062f\u064a \u0644\u0644\u0623\u062f\u0645\u0646 \u0628\u0633</p>\nERRBLOCK\n<label for=\"pw\">\u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0631</label>\n<input id=\"pw\" name=\"password\" type=\"password\" autocomplete=\"current-password\" required autofocus>\n<button type=\"submit\">\u062f\u062e\u0648\u0644</button>\n</form>\n</body>\n</html>\n";
const ADMIN_PAGE_HTML = "<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<meta name=\"robots\" content=\"noindex\">\n<title>\u0635\u0642\u0631 - \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645</title>\n<style>\n:root{--teal:#0e8a9e;--teal-d:#0a6d7d;--ink:#171c28;--ink2:#5c6472;--hair:#e8e4de;--bg:#f5f3ef}\n*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:'IBM Plex Sans Arabic','Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--ink);min-height:100vh}\n.topbar{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid var(--hair);padding:12px 16px;display:flex;align-items:center;gap:10px}\n.topbar .mark{font-size:24px}\n.topbar h1{font-size:17px;font-weight:700;flex:1}\n.badge{background:#b3261e;color:#fff;font-size:11px;font-weight:700;border-radius:99px;padding:2px 8px;display:none}\n.out{font-size:13px;color:var(--ink2);text-decoration:none;border:1px solid var(--hair);border-radius:99px;padding:5px 12px}\n.tabs{position:sticky;top:57px;z-index:19;background:#fff;display:flex;border-bottom:1px solid var(--hair)}\n.tabs button{flex:1;padding:12px 4px;border:0;background:none;font-family:inherit;font-size:14px;font-weight:600;color:var(--ink2);cursor:pointer;border-bottom:2.5px solid transparent}\n.tabs button.on{color:var(--teal);border-bottom-color:var(--teal)}\nmain{max-width:640px;margin:0 auto;padding:18px 16px 60px}\n.pane{display:none}\n.pane.on{display:block}\n.card{background:#fff;border:1px solid var(--hair);border-radius:16px;padding:18px;margin-bottom:14px}\n.card h2{font-size:15px;font-weight:700;margin-bottom:4px}\n.card .hint{font-size:12px;color:var(--ink2);margin-bottom:14px}\n.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px dashed var(--hair)}\n.row:first-of-type{border-top:0}\n.row .lbl{font-size:14px;font-weight:600}\n.row .dsc{font-size:12px;color:var(--ink2);margin-top:2px}\n.sw{position:relative;flex:none;width:48px;height:26px}\n.sw input{position:absolute;inset:0;opacity:0;cursor:pointer;z-index:2;margin:0}\n.sw i{position:absolute;inset:0;background:#d8d4cd;border-radius:99px;transition:.2s}\n.sw i:after{content:'';position:absolute;top:3px;inset-inline-start:3px;width:20px;height:20px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}\n.sw input:checked+i{background:var(--teal)}\n.sw input:checked+i:after{transform:translateX(-22px)}\ntextarea,input[type=text],select{width:100%;padding:11px 12px;border:1.5px solid var(--hair);border-radius:11px;font-size:14px;font-family:inherit;outline:none;background:#fff}\ntextarea:focus,input[type=text]:focus,select:focus{border-color:var(--teal)}\ntextarea{min-height:64px;resize:vertical}\nlabel.f{display:block;font-size:13px;font-weight:600;margin:12px 0 6px}\n.pal{display:flex;gap:10px;flex-wrap:wrap}\n.pal button{width:52px;height:52px;border-radius:14px;border:3px solid transparent;cursor:pointer;font-size:10px;font-weight:700;color:#fff;display:flex;align-items:flex-end;justify-content:center;padding-bottom:5px;font-family:inherit}\n.pal button.on{border-color:var(--ink)}\n.btn{display:inline-block;padding:11px 22px;border:0;border-radius:11px;background:var(--teal);color:#fff;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer}\n.btn:active{opacity:.85}\n.btn.ghost{background:#fff;color:var(--ink);border:1.5px solid var(--hair)}\n.btn.danger{background:#fdecea;color:#b3261e}\n.btn.sm{padding:7px 14px;font-size:13px}\n.savebar{position:sticky;bottom:12px;display:flex;gap:10px;margin-top:18px}\n.savebar .btn{flex:1;box-shadow:0 4px 16px rgba(14,138,158,.3)}\n.toast{position:fixed;bottom:22px;inset-inline:0;margin-inline:auto;width:fit-content;max-width:86vw;background:var(--ink);color:#fff;padding:11px 20px;border-radius:99px;font-size:14px;font-weight:600;opacity:0;transform:translateY(10px);transition:.25s;z-index:50;pointer-events:none}\n.toast.show{opacity:1;transform:none}\n.chat{background:#fff;border:1px solid var(--hair);border-radius:14px;margin-bottom:10px;overflow:hidden}\n.chat>button.hd{width:100%;background:none;border:0;padding:13px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;font-family:inherit;text-align:start}\n.chat .hd .cid{flex:1;font-size:13px;font-weight:600;direction:ltr;text-align:end;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.chat .hd .cnt{font-size:11px;color:#fff;background:var(--teal);border-radius:99px;padding:2px 9px;flex:none}\n.chat .hd .cnt.new{background:#b3261e}\n.chat .hd time{font-size:11px;color:var(--ink2);flex:none;direction:ltr}\n.chat .body{display:none;border-top:1px solid var(--hair);padding:12px 14px;background:#faf9f7}\n.chat.open .body{display:block}\n.msg{margin-bottom:12px;font-size:13px;line-height:1.7}\n.msg .who{font-weight:700;font-size:12px;color:var(--teal-d)}\n.msg.u .who{color:var(--ink2)}\n.msg time{display:block;font-size:10px;color:var(--ink2);direction:ltr;text-align:end}\n.chat .del{margin-top:6px}\n.empty{text-align:center;color:var(--ink2);font-size:14px;padding:44px 20px}\n.empty .big{font-size:42px;display:block;margin-bottom:10px}\n.feed .item{background:#fff;border:1px solid var(--hair);border-radius:12px;padding:12px 14px;margin-bottom:8px;font-size:13px;display:flex;gap:10px;align-items:flex-start}\n.feed .item .dot{flex:none;width:9px;height:9px;border-radius:50%;background:var(--teal);margin-top:5px}\n.feed .item.new .dot{background:#b3261e}\n.feed .item time{display:block;font-size:11px;color:var(--ink2);direction:ltr;text-align:end}\n.feed .item .pv{color:var(--ink2);margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}\n@media(min-width:640px){.pal button{width:64px;height:64px}}\n</style>\n</head>\n<body>\n<header class=\"topbar\">\n<span class=\"mark\">\ud83e\udd85</span>\n<h1>\u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0645 \u0635\u0642\u0631</h1>\n<span class=\"badge\" id=\"newBadge\"></span>\n<a class=\"out\" href=\"/admin/logout\">\u062e\u0631\u0648\u062c</a>\n</header>\n<nav class=\"tabs\">\n<button class=\"on\" data-tab=\"control\">\u0627\u0644\u062a\u062d\u0643\u0645</button>\n<button data-tab=\"chats\">\u0627\u0644\u0634\u0627\u062a\u0627\u062a</button>\n<button data-tab=\"notif\">\u0627\u0644\u062a\u0646\u0628\u064a\u0647\u0627\u062a</button>\n</nav>\n<main>\n<section class=\"pane on\" id=\"pane-control\">\n  <div class=\"card\">\n    <h2>\u0623\u062c\u0632\u0627\u0621 \u0627\u0644\u0645\u0648\u0642\u0639</h2>\n    <p class=\"hint\">\u0634\u063a\u0651\u0644 \u0623\u0648 \u0637\u0641\u064a \u0623\u062c\u0632\u0627\u0621 \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0646 \u063a\u064a\u0631 \u0645\u0627 \u062a\u0644\u0645\u0633 \u0627\u0644\u0643\u0648\u062f.</p>\n    <div class=\"row\">\n      <div><div class=\"lbl\">\u0635\u0642\u0631 (\u0627\u0644\u0634\u0627\u062a \u0628\u0648\u062a)</div><div class=\"dsc\">\u0644\u0645\u0627 \u064a\u062a\u0642\u0641\u0644\u060c \u0627\u0644\u0632\u0631\u0627\u0631 \u064a\u062e\u062a\u0641\u064a \u0645\u0646 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0628\u0648\u062a \u064a\u0639\u062a\u0630\u0631 \u0644\u0644\u0632\u0648\u0627\u0631</div></div>\n      <span class=\"sw\"><input type=\"checkbox\" id=\"cSaqr\"><i></i></span>\n    </div>\n    <div class=\"row\">\n      <div><div class=\"lbl\">\u0635\u0641\u062d\u0629 \u0627\u0637\u0645\u0651\u0646</div><div class=\"dsc\">\u0627\u0644\u0643\u0648\u064a\u0632 \u0627\u0644\u0644\u064a \u0628\u064a\u0643\u0634\u0641 \u062b\u063a\u0631\u0627\u062a \u0627\u0644\u0623\u0645\u0627\u0646</div></div>\n      <span class=\"sw\"><input type=\"checkbox\" id=\"cCheckup\"><i></i></span>\n    </div>\n  </div>\n  <div class=\"card\">\n    <h2>\u0634\u0643\u0644 \u0627\u0644\u0645\u0648\u0642\u0639</h2>\n    <p class=\"hint\">\u063a\u064a\u0651\u0631 \u0647\u0648\u064a\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0646 \u0647\u0646\u0627 \u0648\u0627\u0644\u062a\u063a\u064a\u064a\u0631 \u064a\u0638\u0647\u0631 \u0641\u0648\u0631\u064b\u0627.</p>\n    <label class=\"f\">\u0644\u0648\u0646 \u0627\u0644\u0645\u0648\u0642\u0639</label>\n    <div class=\"pal\" id=\"pal\">\n      <button data-p=\"teal\" style=\"background:#0e8a9e\">\u0641\u064a\u0631\u0648\u0632\u064a</button>\n      <button data-p=\"navy\" style=\"background:#2f5fb3\">\u0643\u062d\u0644\u064a</button>\n      <button data-p=\"green\" style=\"background:#1f9d63\">\u0623\u062e\u0636\u0631</button>\n      <button data-p=\"purple\" style=\"background:#7c4dbf\">\u0628\u0646\u0641\u0633\u062c\u064a</button>\n      <button data-p=\"orange\" style=\"background:#e07b2a\">\u0628\u0631\u062a\u0642\u0627\u0644\u064a</button>\n    </div>\n    <label class=\"f\">\u0627\u0644\u0625\u0636\u0627\u0621\u0629 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629</label>\n    <select id=\"cAppearance\">\n      <option value=\"auto\">\u0632\u064a \u0645\u0627 \u0627\u0644\u0632\u0627\u0626\u0631 \u0645\u062e\u062a\u0627\u0631</option>\n      <option value=\"light\">\u0641\u0627\u062a\u062d</option>\n      <option value=\"dark\">\u063a\u0627\u0645\u0642</option>\n    </select>\n  </div>\n  <div class=\"card\">\n    <h2>\u0627\u0644\u0623\u0633\u0645\u0627\u0621</h2>\n    <p class=\"hint\">\u0627\u062a\u0631\u0643 \u0623\u064a \u062e\u0627\u0646\u0629 \u0641\u0627\u0636\u064a\u0629 \u0648\u064a\u0641\u0636\u0644 \u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u062d\u0627\u0644\u064a \u0632\u064a \u0645\u0627 \u0647\u0648.</p>\n    <label class=\"f\">\u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0639\u0631\u0628\u064a)</label>\n    <input type=\"text\" id=\"cNameAr\" placeholder=\"\u0623\u062d\u0645\u062f \u0645\u062e\u062a\u0627\u0631 \u0639\u0648\u0636\">\n    <label class=\"f\">\u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0625\u0646\u062c\u0644\u064a\u0632\u064a)</label>\n    <input type=\"text\" id=\"cNameEn\" placeholder=\"ENG. AHMED MOKHTAR AWAD SAKR\">\n    <label class=\"f\">\u0627\u0633\u0645 \u0627\u0644\u0628\u0648\u062a</label>\n    <input type=\"text\" id=\"cSaqrName\" placeholder=\"\u0635\u0642\u0631\">\n  </div>\n  <div class=\"card\">\n    <h2>\u0634\u0631\u064a\u0637 \u0625\u0639\u0644\u0627\u0646</h2>\n    <p class=\"hint\">\u0631\u0633\u0627\u0644\u0629 \u062a\u0638\u0647\u0631 \u0641\u0648\u0642 \u0641\u064a \u0643\u0644 \u0635\u0641\u062d\u0627\u062a \u0627\u0644\u0645\u0648\u0642\u0639. \u0627\u0645\u0633\u062d\u0647\u0627 \u0639\u0634\u0627\u0646 \u062a\u062e\u062a\u0641\u064a.</p>\n    <textarea id=\"cBanner\" placeholder=\"\u0645\u062b\u0627\u0644: \u0645\u062a\u0627\u062d \u0644\u0634\u063a\u0644 \u062c\u062f\u064a\u062f \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631 \ud83d\ude80\"></textarea>\n  </div>\n  <div class=\"savebar\">\n    <button class=\"btn\" id=\"saveBtn\">\u062d\u0641\u0638 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a</button>\n    <button class=\"btn ghost\" id=\"reloadBtn\">\u062a\u0631\u0627\u062c\u0639</button>\n  </div>\n</section>\n<section class=\"pane\" id=\"pane-chats\">\n  <div id=\"chatList\"><div class=\"empty\"><span class=\"big\">\u23f3</span>\u0628\u064a\u062c\u0647\u0651\u0632 \u0627\u0644\u0634\u0627\u062a\u0627\u062a\u2026</div></div>\n</section>\n<section class=\"pane\" id=\"pane-notif\">\n  <div class=\"card\" style=\"display:flex;align-items:center;justify-content:space-between;gap:10px\">\n    <div>\n      <h2 id=\"notifHead\">\u0627\u0644\u062a\u0646\u0628\u064a\u0647\u0627\u062a</h2>\n      <p class=\"hint\" style=\"margin:0\" id=\"notifSub\">\u0622\u062e\u0631 \u0646\u0634\u0627\u0637 \u0641\u064a \u0634\u0627\u062a \u0635\u0642\u0631</p>\n    </div>\n    <button class=\"btn ghost sm\" id=\"seenBtn\">\u062a\u0635\u0641\u064a\u0631 \u0627\u0644\u062c\u062f\u064a\u062f</button>\n  </div>\n  <div class=\"feed\" id=\"feed\"></div>\n</section>\n</main>\n<div class=\"toast\" id=\"toast\"></div>\n<script>\nvar CFG = {};\nvar CHATS = [];\nvar NEWC = 0;\nfunction $(s){return document.querySelector(s)}\nfunction esc(s){return String(s==null?'':s).replace(/[&<>\"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]})}\nfunction toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show')},2200)}\nfunction fdate(ts){if(!ts)return'';var d=new Date(ts);return d.toLocaleDateString('ar-EG',{day:'numeric',month:'short'})+' '+d.toLocaleTimeString('ar-EG',{hour:'numeric',minute:'2-digit'})}\nfunction api(path,body){\n  var opt={headers:{'content-type':'application/json'}};\n  if(body!==undefined){opt.method='POST';opt.body=JSON.stringify(body)}\n  return fetch(path,opt).then(function(r){\n    if(r.status===401){location.href='/admin';throw new Error('auth')}\n    return r.json();\n  });\n}\n/* tabs */\ndocument.querySelectorAll('.tabs button').forEach(function(b){\n  b.addEventListener('click',function(){\n    document.querySelectorAll('.tabs button').forEach(function(x){x.classList.remove('on')});\n    b.classList.add('on');\n    document.querySelectorAll('.pane').forEach(function(p){p.classList.remove('on')});\n    $('#pane-'+b.dataset.tab).classList.add('on');\n    if(b.dataset.tab==='chats')loadChats();\n    if(b.dataset.tab==='notif')loadFeed();\n  });\n});\n/* control */\nvar curPalette='teal';\nfunction fillControl(){\n  $('#cSaqr').checked=CFG.saqr!==false;\n  $('#cCheckup').checked=CFG.checkup!==false;\n  $('#cBanner').value=CFG.banner||'';\n  $('#cAppearance').value=CFG.appearance||'auto';\n  $('#cNameAr').value=CFG.name_ar||'';\n  $('#cNameEn').value=CFG.name_en||'';\n  $('#cSaqrName').value=CFG.saqr_name||'';\n  curPalette=CFG.palette||'teal';\n  document.querySelectorAll('#pal button').forEach(function(b){b.classList.toggle('on',b.dataset.p===curPalette)});\n}\ndocument.querySelectorAll('#pal button').forEach(function(b){\n  b.addEventListener('click',function(){curPalette=b.dataset.p;\n    document.querySelectorAll('#pal button').forEach(function(x){x.classList.toggle('on',x===b)})});\n});\n$('#saveBtn').addEventListener('click',function(){\n  var body={\n    saqr:$('#cSaqr').checked,\n    checkup:$('#cCheckup').checked,\n    banner:$('#cBanner').value.trim(),\n    palette:curPalette,\n    appearance:$('#cAppearance').value,\n    name_ar:$('#cNameAr').value.trim(),\n    name_en:$('#cNameEn').value.trim(),\n    saqr_name:$('#cSaqrName').value.trim()\n  };\n  api('/admin/api/config',body).then(function(r){\n    if(r.ok){CFG=Object.assign(CFG,body);toast('\u0627\u062a\u062d\u0641\u0638 \u2705 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a \u0638\u0627\u0647\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0641\u0648\u0631\u064b\u0627')}\n    else toast('\u062d\u0635\u0644\u062a \u0645\u0634\u0643\u0644\u0629 \u0641\u064a \u0627\u0644\u062d\u0641\u0638');\n  }).catch(function(){toast('\u0627\u0644\u0634\u0628\u0643\u0629 \u0648\u0642\u0641\u062a\u060c \u062c\u0631\u0628 \u062a\u0627\u0646\u064a')});\n});\n$('#reloadBtn').addEventListener('click',function(){fillControl();toast('\u0631\u062c\u0639\u0646\u0627 \u0622\u062e\u0631 \u0646\u0633\u062e\u0629 \u0645\u062d\u0641\u0648\u0638\u0629')});\n/* chats */\nfunction loadChats(){\n  var box=$('#chatList');\n  box.innerHTML='<div class=\"empty\"><span class=\"big\">\u23f3</span>\u0628\u064a\u062c\u0647\u0651\u0632 \u0627\u0644\u0634\u0627\u062a\u0627\u062a\u2026</div>';\n  api('/admin/api/chats').then(function(r){\n    CHATS=r.chats||[];NEWC=r.newCount||0;renderBadge();\n    if(!CHATS.length){box.innerHTML='<div class=\"empty\"><span class=\"big\">\ud83d\udcac</span>\u0644\u0633\u0647 \u0645\u0641\u064a\u0634 \u0634\u0627\u062a\u0627\u062a \u0645\u062a\u0633\u062c\u0644\u0629</div>';return}\n    box.innerHTML='';\n    CHATS.forEach(function(c){\n      var el=document.createElement('div');el.className='chat';\n      var fresh=c.fresh?('<span class=\"cnt new\">'+c.fresh+' \u062c\u062f\u064a\u062f</span>'):('');\n      el.innerHTML='<button type=\"button\" class=\"hd\">'+fresh+'<span class=\"cnt\">'+c.count+' \u0631\u0633\u0627\u0644\u0629</span><span class=\"cid\">'+esc(c.chatId)+'</span><time>'+fdate(c.last)+'</time></button>'+\n        '<div class=\"body\"><div class=\"msgs\"></div><button type=\"button\" class=\"btn danger sm del\">\u0645\u0633\u062d \u0627\u0644\u0634\u0627\u062a \u062f\u0647</button></div>';\n      el.querySelector('.hd').addEventListener('click',function(){el.classList.toggle('open')});\n      el.querySelector('.del').addEventListener('click',function(){\n        if(!confirm('\u0645\u062a\u0623\u0643\u062f \u0625\u0646\u0643 \u0639\u0627\u064a\u0632 \u062a\u0645\u0633\u062d \u0627\u0644\u0634\u0627\u062a \u062f\u0647 \u0646\u0647\u0627\u0626\u064a\u061f'))return;\n        api('/admin/api/delete',{chatId:c.chatId}).then(function(rr){\n          if(rr.ok){el.remove();toast('\u0627\u062a\u0645\u0633\u062d \ud83d\uddd1\ufe0f')}else toast('\u0627\u0644\u0645\u0633\u062d \u0645\u0627 \u062a\u0645\u0634')\n        });\n      });\n      var mbox=el.querySelector('.msgs');\n      c.messages.forEach(function(m){\n        var d=document.createElement('div');\n        d.innerHTML='<div class=\"msg u\"><span class=\"who\">\u0627\u0644\u0632\u0627\u0626\u0631:</span> '+esc(m.user)+'<time>'+fdate(m.ts)+'</time></div>'+\n          '<div class=\"msg\"><span class=\"who\">\u0635\u0642\u0631:</span> '+esc(m.saqr)+'</div>';\n        mbox.appendChild(d);\n      });\n      box.appendChild(el);\n    });\n  }).catch(function(){box.innerHTML='<div class=\"empty\"><span class=\"big\">\ud83d\udce1</span>\u0645\u0634\u0643\u0644\u0629 \u0634\u0628\u0643\u0629\u060c \u062d\u062f\u0651\u062b \u0627\u0644\u0635\u0641\u062d\u0629</div>'});\n}\n/* notifications */\nfunction renderBadge(){\n  var b=$('#newBadge');\n  if(NEWC>0){b.textContent=NEWC+' \u062c\u062f\u064a\u062f';b.style.display='inline-block'}else b.style.display='none';\n}\nfunction loadFeed(){\n  api('/admin/api/chats').then(function(r){\n    var all=[];\n    (r.chats||[]).forEach(function(c){c.messages.forEach(function(m){all.push({ts:m.ts,user:m.user,chatId:c.chatId})})});\n    all.sort(function(a,b){return (b.ts||0)-(a.ts||0)});\n    all=all.slice(0,30);\n    NEWC=r.newCount||0;renderBadge();\n    $('#notifHead').textContent=NEWC>0?('\u0639\u0646\u062f\u0643 '+NEWC+' \u0631\u0633\u0627\u0644\u0629 \u062c\u062f\u064a\u062f\u0629'):'\u0645\u0641\u064a\u0634 \u062c\u062f\u064a\u062f';\n    var f=$('#feed');\n    if(!all.length){f.innerHTML='<div class=\"empty\"><span class=\"big\">\ud83d\udd15</span>\u0645\u0641\u064a\u0634 \u0646\u0634\u0627\u0637 \u0644\u0633\u0647</div>';return}\n    f.innerHTML='';\n    var ls=CFG.lastseen||0;\n    all.forEach(function(m){\n      var d=document.createElement('div');d.className='item'+((m.ts||0)>ls?' new':'');\n      d.innerHTML='<span class=\"dot\"></span><div style=\"flex:1;min-width:0\"><b>\u0631\u0633\u0627\u0644\u0629 \u062c\u062f\u064a\u062f\u0629 \u0641\u064a \u0634\u0627\u062a</b> <span style=\"color:var(--ink2);font-size:12px;direction:ltr\">'+esc(m.chatId)+'</span><div class=\"pv\">'+esc(m.user)+'</div><time>'+fdate(m.ts)+'</time></div>';\n      f.appendChild(d);\n    });\n  });\n}\n$('#seenBtn').addEventListener('click',function(){\n  api('/admin/api/seen',{}).then(function(){\n    CFG.lastseen=Date.now();NEWC=0;renderBadge();\n    $('#notifHead').textContent='\u0645\u0641\u064a\u0634 \u062c\u062f\u064a\u062f';\n    document.querySelectorAll('#feed .item.new').forEach(function(x){x.classList.remove('new')});\n    toast('\u0627\u062a\u0635\u0641\u0651\u0631 \u0627\u0644\u062c\u062f\u064a\u062f \u2705');\n  });\n});\n/* boot */\napi('/admin/api/config').then(function(r){CFG=r.config||{};fillControl();loadChats()});\n</script>\n</body>\n</html>\n";

function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  const m = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : '';
}

async function adminSign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return payload + '.' + btoa(String.fromCharCode(...new Uint8Array(sig)));
}

async function adminVerify(token, secret) {
  if (!token) return false;
  const i = token.lastIndexOf('.');
  if (i <= 0) return false;
  const payload = token.slice(0, i);
  const exp = Number(payload.split(':')[1]);
  if (!exp || Date.now() > exp) return false;
  let sig;
  try {
    sig = Uint8Array.from(atob(token.slice(i + 1)), (c) => c.charCodeAt(0));
  } catch {
    return false;
  }
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  return crypto.subtle.verify('HMAC', key, sig, new TextEncoder().encode(payload));
}

async function isAdmin(request, env) {
  if (!env.ADMIN_PASSWORD) return false;
  return adminVerify(getCookie(request, 'saqr_admin'), env.ADMIN_PASSWORD);
}

async function kvConfig(env) {
  const keys = ['cfg:saqr', 'cfg:checkup', 'cfg:banner', 'cfg:palette', 'cfg:appearance', 'cfg:name_ar', 'cfg:name_en', 'cfg:saqr_name', 'admin:lastseen'];
  const v = await Promise.all(keys.map((k) => env.SAQR_CHATS.get(k)));
  return {
    saqr: v[0] !== '0',
    checkup: v[1] !== '0',
    banner: v[2] || '',
    palette: v[3] || 'teal',
    appearance: v[4] || 'auto',
    name_ar: v[5] || '',
    name_en: v[6] || '',
    saqr_name: v[7] || '',
    lastseen: Number(v[8] || 0),
  };
}

function adminLoginPage(withError) {
  const err = withError ? '<div class="err">كلمة السر غلط، جرب تاني</div>' : '';
  return new Response(ADMIN_LOGIN_HTML.replace('ERRBLOCK', err), {
    status: withError ? 401 : 200,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

async function handleAdminPage(request, env) {
  if (!env.ADMIN_PASSWORD) return new Response('Not found', { status: 404 });
  if (!(await isAdmin(request, env))) return adminLoginPage(false);
  return new Response(ADMIN_PAGE_HTML, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

async function handleAdminLogin(request, env) {
  if (!env.ADMIN_PASSWORD) return new Response('Not found', { status: 404 });
  let pw = '';
  try {
    const form = await request.formData();
    pw = String(form.get('password') || '');
  } catch {
    return adminLoginPage(true);
  }
  if (pw !== env.ADMIN_PASSWORD) return adminLoginPage(true);
  const exp = Date.now() + 7 * 24 * 3600 * 1000;
  const token = await adminSign('admin:' + exp, env.ADMIN_PASSWORD);
  return new Response(null, {
    status: 303,
    headers: {
      location: '/admin',
      'set-cookie': 'saqr_admin=' + encodeURIComponent(token) + '; Path=/admin; HttpOnly; Secure; SameSite=Lax; Max-Age=' + 7 * 24 * 3600,
    },
  });
}

async function handleAdminApi(request, env, url) {
  if (!env.ADMIN_PASSWORD) return new Response('Not found', { status: 404 });
  if (!(await isAdmin(request, env))) return Response.json({ ok: false, error: 'auth' }, { status: 401 });

  if (url.pathname === '/admin/api/config' && request.method === 'GET') {
    return Response.json({ ok: true, config: await kvConfig(env) });
  }

  if (url.pathname === '/admin/api/config' && request.method === 'POST') {
    let b;
    try {
      b = await request.json();
    } catch {
      return Response.json({ ok: false }, { status: 400 });
    }
    const puts = [];
    const boolStr = (v) => (v ? '1' : '0');
    if (typeof b.saqr === 'boolean') puts.push(env.SAQR_CHATS.put('cfg:saqr', boolStr(b.saqr)));
    if (typeof b.checkup === 'boolean') puts.push(env.SAQR_CHATS.put('cfg:checkup', boolStr(b.checkup)));
    if (typeof b.banner === 'string') puts.push(env.SAQR_CHATS.put('cfg:banner', b.banner.slice(0, 300)));
    if (typeof b.palette === 'string' && ['teal', 'navy', 'green', 'purple', 'orange'].indexOf(b.palette) >= 0) puts.push(env.SAQR_CHATS.put('cfg:palette', b.palette));
    if (typeof b.appearance === 'string' && ['auto', 'light', 'dark'].indexOf(b.appearance) >= 0) puts.push(env.SAQR_CHATS.put('cfg:appearance', b.appearance));
    if (typeof b.name_ar === 'string') puts.push(env.SAQR_CHATS.put('cfg:name_ar', b.name_ar.slice(0, 80)));
    if (typeof b.name_en === 'string') puts.push(env.SAQR_CHATS.put('cfg:name_en', b.name_en.slice(0, 80)));
    if (typeof b.saqr_name === 'string') puts.push(env.SAQR_CHATS.put('cfg:saqr_name', b.saqr_name.slice(0, 40)));
    await Promise.all(puts);
    return Response.json({ ok: true });
  }

  if (url.pathname === '/admin/api/chats' && request.method === 'GET') {
    const cfg = await kvConfig(env);
    const list = await env.SAQR_CHATS.list({ limit: 1000 });
    const chatKeys = list.keys.filter((k) => k.name.indexOf('chat:') === 0);
    const vals = await Promise.all(chatKeys.map((k) => env.SAQR_CHATS.get(k.name, 'json')));
    const chats = {};
    let newCount = 0;
    for (const v of vals) {
      if (!v || !v.chatId) continue;
      const c = chats[v.chatId] || (chats[v.chatId] = { chatId: v.chatId, count: 0, last: 0, fresh: 0, messages: [] });
      c.count += 1;
      c.last = Math.max(c.last, v.ts || 0);
      if ((v.ts || 0) > cfg.lastseen) { newCount += 1; c.fresh += 1; }
      c.messages.push({ ts: v.ts, user: v.user, saqr: v.saqr });
    }
    const arr = Object.values(chats).sort((a, b) => b.last - a.last).slice(0, 50);
    for (const c of arr) c.messages.sort((a, b) => (a.ts || 0) - (b.ts || 0));
    return Response.json({ ok: true, chats: arr, newCount });
  }

  if (url.pathname === '/admin/api/seen' && request.method === 'POST') {
    await env.SAQR_CHATS.put('admin:lastseen', String(Date.now()));
    return Response.json({ ok: true });
  }

  if (url.pathname === '/admin/api/delete' && request.method === 'POST') {
    let b;
    try {
      b = await request.json();
    } catch {
      return Response.json({ ok: false }, { status: 400 });
    }
    if (!b.chatId || typeof b.chatId !== 'string') return Response.json({ ok: false }, { status: 400 });
    const list = await env.SAQR_CHATS.list({ limit: 1000 });
    const prefix = 'chat:' + b.chatId + ':';
    const dels = list.keys.filter((k) => k.name.indexOf(prefix) === 0).map((k) => env.SAQR_CHATS.delete(k.name));
    await Promise.all(dels);
    return Response.json({ ok: true, deleted: dels.length });
  }

  return Response.json({ ok: false, error: 'notfound' }, { status: 404 });
}

async function handleStatus(env, origin) {
  const cfg = await kvConfig(env);
  return Response.json(
    { saqr: cfg.saqr, checkup: cfg.checkup, banner: cfg.banner, palette: cfg.palette, appearance: cfg.appearance, name_ar: cfg.name_ar, name_en: cfg.name_en, saqr_name: cfg.saqr_name },
    { headers: { ...corsHeaders(origin), 'cache-control': 'no-store' } },
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (url.pathname === '/chat/status') return handleStatus(env, origin);
    if (url.pathname === '/admin') return handleAdminPage(request, env);
    if (url.pathname === '/admin/login' && request.method === 'POST') return handleAdminLogin(request, env);
    if (url.pathname === '/admin/logout') {
      return new Response(null, { status: 303, headers: { location: '/admin', 'set-cookie': 'saqr_admin=; Path=/admin; HttpOnly; Secure; Max-Age=0' } });
    }
    if (url.pathname.indexOf('/admin/api/') === 0) return handleAdminApi(request, env, url);
    if (url.pathname !== '/chat' || request.method !== 'POST') {
      return new Response('Not found', { status: 404, headers: corsHeaders(origin) });
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) {
      return Response.json(
        { reply: 'مهلة صغيرة يا صاحبي، جربت كتير أوي. ارجع بعد شوية 🦅' },
        { status: 429, headers: corsHeaders(origin) }
      );
    }

    try {
      const saqrOn = await env.SAQR_CHATS.get('cfg:saqr');
      if (saqrOn === '0') {
        return Response.json({ reply: 'صقر واخد بريك صغير دلوقتي، ارجع بعد شوية 🦅' }, { headers: corsHeaders(origin) });
      }
    } catch {
      /* KV unavailable: keep chat running */
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ reply: 'Request not understood.' }, { status: 400, headers: corsHeaders(origin) });
    }

    const msgs = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const contents = msgs
      .filter((m) => m && typeof m.content === 'string' && m.content.length <= 1000)
      .map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content.slice(0, 1000) }],
      }));
    if (!contents.length) {
      return Response.json({ reply: 'اسألني أي حاجة 🦅' }, { status: 400, headers: corsHeaders(origin) });
    }

    const model = env.MODEL || 'gemini-3.5-flash-lite';
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    let gem;
    try {
      gem = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
        }),
      });
    } catch (e) {
      return Response.json({ reply: 'الشبكة وقفت عندي. جرب تاني 🦅' }, { status: 502, headers: corsHeaders(origin) });
    }

    if (!gem.ok) {
      return Response.json({ reply: 'صقر مش لاقي صوته دلوقتي. جرب بعد شوية 🦅' }, { status: 502, headers: corsHeaders(origin) });
    }

    const data = await gem.json();
    const reply =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.map((p) => p.text || '').join('').trim();

    const finalReply = reply || 'معلش، مخي وقف ثانية. اسألني تاني 🦅';

    // Consent-gated logging: only when the visitor explicitly agreed in the widget.
    // Anonymous by design: no IP, no identifiers beyond the random chat id the
    // visitor's browser generated for this visit, and only the text they typed.
    if (body.consent === true && env.SAQR_CHATS) {
      try {
        const chatId = String(body.chatId || '');
        if (/^[A-Za-z0-9-]{8,64}$/.test(chatId)) {
          const lastUser = contents[contents.length - 1].parts[0].text;
          const key = 'chat:' + chatId + ':' + Date.now();
          const val = JSON.stringify({ ts: Date.now(), chatId, user: lastUser, saqr: finalReply });
          ctx.waitUntil(env.SAQR_CHATS.put(key, val, { expirationTtl: 15552000 })); // 180 days
        }
      } catch (e) { /* logging must never break the chat */ }
    }

    return Response.json(
      { reply: finalReply },
      { status: 200, headers: corsHeaders(origin) }
    );
  },
};
