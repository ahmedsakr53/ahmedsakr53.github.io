/* Ops Room tools: Base64, IPv4 subnet calculator, hash identifier. Client-side only, lazy loaded. */
(function () {
  'use strict';
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(el, s) { return el.querySelector(s); }
  var MAXLEN = 20000;
  function b64enc(s) { var b = new TextEncoder().encode(s), o = ''; for (var i = 0; i < b.length; i += 0x2000) o += String.fromCharCode.apply(null, b.subarray(i, i + 0x2000)); return btoa(o); }
  function b64dec(s) {
    s = s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(s) || s.length % 4 === 1) throw new Error('bad');
    while (s.length % 4) s += '=';
    var bin = atob(s), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8', { fatal: true }).decode(u);
  }
  function ip2n(s) {
    var p = s.trim().split('.'); if (p.length !== 4) return null; var n = 0;
    for (var i = 0; i < 4; i++) { if (!/^\d{1,3}$/.test(p[i])) return null; var v = +p[i]; if (v > 255) return null; n = n * 256 + v; }
    return n;
  }
  function n2ip(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
  function subnet(inp) {
    var m = inp.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\s*\/\s*(\d{1,2})$/); if (!m) return null;
    var ip = ip2n(m[1]), c = +m[2]; if (ip === null || c > 32) return null;
    var mask = c === 0 ? 0 : (0xFFFFFFFF << (32 - c)) >>> 0, net = (ip & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0;
    var total = Math.pow(2, 32 - c), hosts = c >= 31 ? (c === 31 ? 2 : 1) : total - 2;
    var a=ip>>>24,b=(ip>>>16)&255,kind=a===10||(a===172&&b>=16&&b<=31)||(a===192&&b===168)?'private':a===127?'loopback':(a===169&&b===254)?'link-local':a>=224&&a<=239?'multicast':a===0?'this network':'public';
    return { kind: kind, bin: [mask>>>24,(mask>>>16)&255,(mask>>>8)&255,mask&255].map(function(x){return ('00000000'+x.toString(2)).slice(-8);}).join('.'), net: n2ip(net) + '/' + c, mask: n2ip(mask), wild: n2ip(~mask >>> 0), bc: n2ip(bc), first: c >= 31 ? n2ip(net) : n2ip(net + 1), last: c >= 31 ? n2ip(bc) : n2ip(bc - 1), hosts: hosts, total: total };
  }
  var NOTE = { 'bcrypt': ['bcrypt هاش مخصص لكلمات السر: فيه salt جوه الهاش وcost بيخلي التخمين بطيء.', 'bcrypt is built for passwords: the salt is embedded and the cost factor slows guessing.'], 'Argon2': ['Argon2 أحدث معيار لتخزين كلمات السر ومقاوم لهجمات الـ GPU بالذاكرة.', 'Argon2 is the modern password-hashing standard and uses memory-hardness against GPU attacks.'], 'MD5': ['MD5 مكسور للتصادمات وسريع جداً، فمينفعش لكلمات السر. استخدمه لفحص سلامة ملف بس.', 'MD5 has practical collisions and is very fast, so it is unfit for passwords. Fine only for non-security checksums.'], 'SHA-1': ['SHA-1 اتكسر عملياً بتصادمات (SHAttered)، فاتجنبه في أي توقيع أو تخزين كلمات سر.', 'SHA-1 has practical collisions (SHAttered). Avoid it for signatures and password storage.'], 'SHA-256': ['SHA-256 قوي كدالة هاش، لكن سريع، فلكلمات السر استخدم دالة بطيئة مع salt (bcrypt/Argon2).', 'SHA-256 is a strong hash but fast; for passwords use a slow salted function (bcrypt/Argon2).'] };
  function hashId(h) {
    h = h.trim(); var r = [];
    if (!h) return r;
    if (/^\$2[abxy]?\$\d{2}\$[.\/A-Za-z0-9]{53}$/.test(h)) return ['bcrypt'];
    if (/^\$argon2(id|i|d)\$/.test(h)) return ['Argon2'];
    if (/^\$1\$/.test(h)) return ['MD5-crypt'];
    if (/^\$5\$/.test(h)) return ['SHA-256-crypt'];
    if (/^\$6\$/.test(h)) return ['SHA-512-crypt'];
    if (/^\$P\$|^\$H\$/.test(h)) return ['phpass (WordPress/phpBB)'];
    if (/^pbkdf2/i.test(h)) return ['PBKDF2'];
    if (/^[a-f0-9]+$/i.test(h)) {
      var L = h.length;
      if (L === 8) r = ['CRC32 (checksum, not for passwords)'];
      else if (L === 16) r = ['MySQL 3.x / half-MD5'];
      else if (L === 32) r = ['MD5', 'NTLM', 'MD4'];
      else if (L === 40) r = ['SHA-1', 'RIPEMD-160'];
      else if (L === 56) r = ['SHA-224', 'SHA3-224'];
      else if (L === 64) r = ['SHA-256', 'SHA3-256', 'BLAKE2s'];
      else if (L === 96) r = ['SHA-384', 'SHA3-384'];
      else if (L === 128) r = ['SHA-512', 'SHA3-512', 'BLAKE2b'];
    }
    return r;
  }
  function row(k, v) { return '<div class="pf-ops-r"><span>' + esc(k) + '</span><b dir="ltr">' + esc(v) + '</b></div>'; }
  function mount(el, ar) {
    var T = function (a, e) { return ar ? a : e; };
    el.innerHTML =
      '<div class="pf-card pf-pass-card"><h3 class="pf-h3">Base64</h3><div class="pf-card-detail">' + esc(T('حوّل نص لـ Base64 أو فكّه. كل حاجة على جهازك.', 'Encode text to Base64 or decode it. Everything stays on your device.')) + '</div>' +
      '<textarea class="pf-pass-input pf-ops-ta" id="pf-b64-in" dir="ltr" rows="3" maxlength="' + MAXLEN + '" spellcheck="false" autocomplete="off"></textarea>' +
      '<div class="pf-ops-btns"><button type="button" class="pf-btn" id="pf-b64-enc">' + esc(T('تشفير', 'Encode')) + '</button><button type="button" class="pf-btn" id="pf-b64-dec">' + esc(T('فك', 'Decode')) + '</button></div>' +
      '<pre class="pf-ops-out" id="pf-b64-out" dir="ltr" hidden></pre><div class="pf-ops-note">' + esc(T('Base64 ترميز مش تشفير: أي حد يقدر يفكه من غير مفتاح، فمتخبيش بيه أسرار.', 'Base64 is encoding, not encryption: anyone can reverse it without a key, so never hide secrets with it.')) + '</div></div>' +
      '<div class="pf-card pf-pass-card"><h3 class="pf-h3">' + esc(T('حاسبة الشبكات الفرعية', 'Subnet calculator')) + '</h3><div class="pf-card-detail">' + esc(T('اكتب عنوان IPv4 مع الـ CIDR، مثلاً 192.168.1.10/24', 'Enter an IPv4 address with CIDR, for example 192.168.1.10/24')) + '</div>' +
      '<input type="text" class="pf-pass-input" id="pf-sn-in" dir="ltr" inputmode="decimal" maxlength="20" placeholder="192.168.1.10/24" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<button type="button" class="pf-btn" id="pf-sn-go">' + esc(T('احسب', 'Calculate')) + '</button><div class="pf-ops-res" id="pf-sn-out" hidden></div></div>' +
      '<div class="pf-card pf-pass-card"><h3 class="pf-h3">' + esc(T('كاشف نوع الهاش', 'Hash identifier')) + '</h3><div class="pf-card-detail">' + esc(T('الصق هاش وهنقولك الأنواع المحتملة من الطول والشكل. ده تخمين مش تأكيد.', 'Paste a hash to see likely types from its length and format. This is a guess, not proof.')) + '</div>' +
      '<input type="text" class="pf-pass-input" id="pf-h-in" dir="ltr" maxlength="300" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<button type="button" class="pf-btn" id="pf-h-go">' + esc(T('حدد النوع', 'Identify')) + '</button><div class="pf-ops-res" id="pf-h-out" hidden></div></div>';
    var out = $(el, '#pf-b64-out');
    function show(t, bad) { out.hidden = false; out.textContent = t; out.className = 'pf-ops-out' + (bad ? ' bad' : ''); }
    $(el, '#pf-b64-enc').onclick = function () { var v = $(el, '#pf-b64-in').value; if (!v) return show(T('اكتب نص الأول.', 'Type some text first.'), 1); try { show(b64enc(v)); } catch (e) { show(T('مش قدرنا نشفّر ده.', 'Could not encode that.'), 1); } };
    $(el, '#pf-b64-dec').onclick = function () { var v = $(el, '#pf-b64-in').value; if (!v.trim()) return show(T('اكتب نص الأول.', 'Type some text first.'), 1); try { show(b64dec(v)); } catch (e) { show(T('ده مش Base64 سليم أو مش نص UTF-8.', 'That is not valid Base64 or not UTF-8 text.'), 1); } };
    $(el, '#pf-sn-go').onclick = function () {
      var o = $(el, '#pf-sn-out'), r = subnet($(el, '#pf-sn-in').value); o.hidden = false;
      o.innerHTML = r ? row(T('الشبكة', 'Network'), r.net) + row(T('الماسك', 'Subnet mask'), r.mask) + row('Wildcard', r.wild) + row('Broadcast', r.bc) + row(T('أول جهاز', 'First host'), r.first) + row(T('آخر جهاز', 'Last host'), r.last) + row(T('عدد الأجهزة', 'Usable hosts'), String(r.hosts)) + row(T('إجمالي العناوين', 'Total addresses'), String(r.total)) + row(T('الماسك بالثنائي', 'Mask in binary'), r.bin) + row(T('نوع العنوان', 'Address type'), r.kind) + '<div class="pf-ops-note">' + esc(T('الشبكة = العنوان AND الماسك، والبرودكاست = الشبكة OR عكس الماسك. أول وآخر عنوان محجوزين للشبكة والبرودكاست (إلا /31 و/32).', 'Network = address AND mask; broadcast = network OR inverted mask. The first and last addresses are reserved for network and broadcast (except /31 and /32).')) + '</div>'
        : '<div class="pf-ops-bad">' + esc(T('الصيغة غلط. مثال صح: 192.168.1.10/24', 'Invalid format. Example: 192.168.1.10/24')) + '</div>';
    };
    $(el, '#pf-h-go').onclick = function () {
      var o = $(el, '#pf-h-out'), v = $(el, '#pf-h-in').value, r = hashId(v); o.hidden = false;
      o.innerHTML = r.length ? '<div class="pf-ops-r"><span>' + esc(T('محتمل', 'Likely')) + '</span><b dir="ltr">' + esc(r.join(' / ')) + '</b></div><div class="pf-ops-note">' + esc(T('الطول: ', 'Length: ') + v.trim().length + (NOTE[r[0]] ? ' | ' + NOTE[r[0]][ar ? 0 : 1] : '')) + '</div>'
        : '<div class="pf-ops-bad">' + esc(T('مش قادرين نتعرف على النوع.', 'Could not recognise this hash type.')) + '</div>';
    };
  }
  window.pfOps = { mount: mount, _t: { subnet: subnet, hashId: hashId, b64enc: b64enc, b64dec: b64dec } };
})();
