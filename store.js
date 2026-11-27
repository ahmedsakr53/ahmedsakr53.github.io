/* Store inside Services: order request flow, manual cash / Etisalat Cash, confirmed by hand. Lazy loaded. */
(function () {
  'use strict';
  var API = 'https://saqr-ahmed.ahmedsakr5326.workers.dev';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mount(el, ar) {
    var T = function (a, e) { return ar ? a : e; };
    el.innerHTML = '<p class="pf-para">' + esc(T('جاري تحميل المنتجات...', 'Loading products...')) + '</p>';
    var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 8000);
    fetch(API + '/store/config', { signal: ctl.signal }).then(function (r) { return r.json(); }).then(function (d) {
      clearTimeout(to);
      var ps = (d && d.products) || [];
      if (!ps.length) { el.innerHTML = '<p class="pf-para">' + esc(T('المنتجات الرقمية قريباً.', 'Digital products are coming soon.')) + '</p>'; return; }
      el.innerHTML = '<div class="pf-grid">' + ps.map(function (p) {
        return '<div class="pf-card pf-prod" data-pid="' + esc(p.id) + '"><div class="pf-card-name">' + esc(ar ? p.ar : (p.en || p.ar)) + '</div>' +
          '<div class="pf-card-detail">' + esc(ar ? p.dAr : (p.dEn || p.dAr)) + '</div>' +
          '<div class="pf-prod-price">' + esc(p.price ? p.price + (ar ? ' جنيه' : ' EGP') : T('مجاني', 'Free')) + '</div>' +
          '<button type="button" class="pf-btn pf-btn-primary pf-prod-buy">' + esc(T('اطلب الآن', 'Request now')) + '</button><div class="pf-prod-form" hidden></div></div>';
      }).join('') + '</div>';
      Array.prototype.forEach.call(el.querySelectorAll('.pf-prod'), function (card) {
        var btn = card.querySelector('.pf-prod-buy'), form = card.querySelector('.pf-prod-form');
        btn.onclick = function () {
          if (!form.hidden) { form.hidden = true; return; }
          form.hidden = false;
          form.innerHTML = '<input class="pf-pass-input" maxlength="60" placeholder="' + esc(T('اسمك', 'Your name')) + '" autocomplete="name">' +
            '<input class="pf-pass-input" dir="ltr" maxlength="80" placeholder="' + esc(T('رقم واتساب أو يوزر تليجرام', 'WhatsApp number or Telegram username')) + '">' +
            '<input class="pf-pass-input" maxlength="300" placeholder="' + esc(T('ملاحظة (اختياري)', 'Note (optional)')) + '">' +
            '<input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;width:1px;height:1px" aria-hidden="true">' +
            '<button type="button" class="pf-btn pf-btn-primary pf-prod-send">' + esc(T('ابعت الطلب', 'Send request')) + '</button><div class="pf-prod-msg" role="status"></div>';
          var ins = form.querySelectorAll('input'), send = form.querySelector('.pf-prod-send'), msg = form.querySelector('.pf-prod-msg');
          send.onclick = function () {
            if (ins[0].value.trim().length < 2 || ins[1].value.trim().length < 5) { msg.textContent = T('اكتب اسمك ووسيلة تواصل.', 'Enter your name and a contact.'); return; }
            send.disabled = true; msg.textContent = T('جاري الإرسال...', 'Sending...');
            var c2 = new AbortController(), t2 = setTimeout(function () { c2.abort(); }, 10000);
            fetch(API + '/store/order', { method: 'POST', signal: c2.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pid: card.getAttribute('data-pid'), name: ins[0].value, contact: ins[1].value, note: ins[2].value, website: ins[3].value }) })
              .then(function (r) { return r.json(); }).then(function (o) {
                clearTimeout(t2);
                if (o && o.ok) {
                  var wa = 'https://wa.me/201154655875?text=' + encodeURIComponent(T('طلب رقم ', 'Order ') + o.id);
                  form.innerHTML = '<div class="pf-prod-ok"><b>' + esc(T('تم استلام طلبك ✅', 'Request received ✅')) + '</b><p>' + esc(T('رقم طلبك: ', 'Your order number: ')) + '<b dir="ltr">' + esc(o.id) + '</b></p>' +
                    '<p>' + esc(T('الدفع كاش، أو تحويل على محفظة إيتصالات كاش: ', 'Pay in cash, or transfer to the Etisalat Cash wallet: ')) + '<b dir="ltr">' + esc(o.wallet || '') + '</b> (' + esc(o.price) + esc(T(' جنيه', ' EGP')) + ').</p>' +
                    '<p>' + esc(T('بعد الدفع ابعت رقم الطلب لأحمد، وهيأكد الدفع ويسلّمك الملف بنفسه.', 'After paying, send the order number to Ahmed. He will confirm the payment and deliver the file himself.')) + '</p>' +
                    '<a class="pf-btn pf-btn-primary" href="' + wa + '" target="_blank" rel="noopener">' + esc(T('ابعت الرقم على واتساب', 'Send on WhatsApp')) + '</a></div>';
                } else { send.disabled = false; msg.textContent = o && o.err === 'rate' ? T('طلبات كتير، جرّب بعد شوية.', 'Too many requests, try again later.') : T('حصلت مشكلة، جرّب تاني.', 'Something went wrong, try again.'); }
              }).catch(function () { clearTimeout(t2); send.disabled = false; msg.textContent = T('الشبكة وقفت، جرّب تاني.', 'Network problem, try again.'); });
          };
        };
      });
    }).catch(function () { clearTimeout(to); el.innerHTML = '<p class="pf-para">' + esc(T('المتجر مش متاح دلوقتي، جرّب بعد شوية.', 'The store is unavailable right now, try again later.')) + '</p>'; });
  }
  window.pfStore = { mount: mount };
})();
