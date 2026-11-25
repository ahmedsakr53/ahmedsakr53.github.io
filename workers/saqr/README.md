# صقر (Saqr) — AI chat worker

Backend للشات بتاع «صقر» في تطبيق أحمد. Cloudflare Worker مجاني بيكلم Gemini API.
**مفتاح Gemini بيعيش في أسرار الـ Worker بس — ممنوع يتحط في الريبو أو الصفحة.**

## النشر (دقائق، مرة واحدة)

1. اعمل حساب Cloudflare مجاني: https://dash.cloudflare.com/sign-up
2. ثبّت wrangler: `npm install -g wrangler` ثم `wrangler login`
3. من المجلد ده:
   ```bash
   wrangler secret put GEMINI_API_KEY   # الصق مفتاح Gemini لما يطلبه
   wrangler deploy
   ```
4. هيطلعلك رابط زي `https://saqr-ahmed.<account>.workers.dev`
   — حدّث ثابت `SAQR_WORKER_URL` في `app.js` على `<الرابط>/chat`.

## مفتاح Gemini المجاني

من Google AI Studio: https://aistudio.google.com/apikey — «Create API key».
الخطة المجانية بتشيل استخدام موقع شخصي براحة.

## الأمان

- CORS مقفول على دومين الموقع.
- Rate limit لكل IP (20 رسالة / 10 دقائق).
- الرسائل بتتقص لطول معقول، وآخر 12 رسالة بس بتتبعت للنموذج.
- الـ system prompt فيه قاعدة خصوصية صارمة: صقر مايتكلمش غير عن اللي منشور على الموقع.
