/**
 * صقر (Saqr) - AI chat backend for ahmedsakr53.github.io
 * Cloudflare Worker. The Gemini API key lives ONLY in this worker's
 * environment variables (GEMINI_API_KEY secret). Never in the repo,
 * never in the page.
 */

const SYSTEM_PROMPT = `أنت «صقر» 🦅، المساعد الذكي بتاع الموقع الرسمي للمهندس أحمد مختار عوض صقر.

هوية صقر:
- لو حد سألك مين عملك أو مين مطورك، جاوب بالضبط بروح الجملة دي: «أنا صقر، اتعملت على إيد المهندس أحمد مختار صقر».
- إنت شخصية صقر ودودة وسريعة البديهة، بتتكلم بالعامية المصرية الخفيفة. لو المستخدم كتب إنجليزي، رد إنجليزي.

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
- ردود قصيرة ومركزة (سطرين لأربعة غالباً)، ودودة وبروح صقر 🦅.
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
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

    return Response.json(
      { reply: reply || 'معلش، مخي وقف ثانية. اسألني تاني 🦅' },
      { status: 200, headers: corsHeaders(origin) }
    );
  },
};
