/* Podcast page: admin-managed audio episodes. Lazy loaded; audio is fetched only when played. */
(function () {
  'use strict';
  var API = 'https://saqr-ahmed.ahmedsakr5326.workers.dev';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mount(el, ar) {
    var T = function (a, e) { return ar ? a : e; };
    el.innerHTML = '<p class="pf-para">' + esc(T('جاري التحميل...', 'Loading...')) + '</p>';
    var ctl = new AbortController(), to = setTimeout(function () { ctl.abort(); }, 8000);
    fetch(API + '/podcast/config', { signal: ctl.signal }).then(function (r) { return r.json(); }).then(function (d) {
      clearTimeout(to);
      var eps = (d && d.episodes) || [];
      if (!eps.length && !((d && d.shows) || []).length) { el.innerHTML = '<div class="pf-card pf-pod-soon"><div class="pf-card-name">' + esc(T('الحلقة الأولى قريباً 🎙️', 'First episode coming soon 🎙️')) + '</div><div class="pf-card-detail">' + esc(T('جاري التجهيز. هتلاقيها هنا أول ما تنزل.', 'In the works. It will appear here as soon as it is out.')) + '</div></div>'; return; }
      var shows = (d && d.shows) || [];
      var URLS = [];
      function card(e, n) {
        URLS.push(e.url);
        return '<div class="pf-card pf-pod-ep"><div class="pf-card-num">' + n + '</div><div class="pf-card-name">' + esc(ar ? e.ar : (e.en || e.ar)) + '</div>' +
          '<div class="pf-card-detail">' + esc(ar ? e.dAr : (e.dEn || e.dAr)) + '</div>' +
          '<div class="pf-pl" data-i="' + (URLS.length - 1) + '" dir="ltr"><button type="button" class="pf-pl-b" aria-label="' + esc(T('تشغيل', 'Play')) + '">&#9654;</button><input type="range" class="pf-pl-r" min="0" max="1000" value="0" step="1" aria-label="' + esc(T('موضع التشغيل', 'Seek')) + '" disabled><span class="pf-pl-t">0:00</span></div></div>';
      }
      var html = '', used = {};
      shows.forEach(function (sh) {
        var se = eps.filter(function (e) { return e.show === sh.id; });
        se.forEach(function (e) { used[eps.indexOf(e)] = 1; });
        html += '<section class="pf-pod-show" style="--pc1:' + esc(sh.c1) + ';--pc2:' + esc(sh.c2) + '"><div class="pf-pod-head"><b>' + esc(ar ? sh.ar : (sh.en || sh.ar)) + '</b><small>' + esc(ar ? sh.dAr : (sh.dEn || sh.dAr)) + '</small></div>' +
          (se.length ? se.map(function (e, i) { return card(e, i + 1); }).join('') : '<div class="pf-card pf-pod-soon"><div class="pf-card-name">' + esc(T('قريباً', 'Coming soon')) + '</div></div>') + '</section>';
      });
      var rest = eps.filter(function (e, i) { return !used[i]; });
      html += rest.map(function (e, i) { return card(e, rest.length - i); }).join('');
      el.innerHTML = html;
      el.addEventListener('contextmenu', function (ev) { if (ev.target.closest && ev.target.closest('.pf-pl')) ev.preventDefault(); });
      var cur = null;
      function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
      Array.prototype.forEach.call(el.querySelectorAll('.pf-pl'), function (box) {
        var url = URLS[+box.getAttribute('data-i')], btn = box.querySelector('.pf-pl-b'), rng = box.querySelector('.pf-pl-r'), tm = box.querySelector('.pf-pl-t');
        var au = null, loading = false, drag = false;
        function setBtn(on) { btn.innerHTML = on ? '&#10074;&#10074;' : '&#9654;'; btn.setAttribute('aria-label', on ? T('إيقاف مؤقت', 'Pause') : T('تشغيل', 'Play')); }
        function wire() {
          au.addEventListener('timeupdate', function () { if (!drag && au.duration) rng.value = Math.round(au.currentTime / au.duration * 1000); tm.textContent = fmt(au.currentTime) + (au.duration ? ' / ' + fmt(au.duration) : ''); });
          au.addEventListener('ended', function () { setBtn(false); rng.value = 0; });
          au.addEventListener('pause', function () { setBtn(false); });
          au.addEventListener('play', function () { setBtn(true); });
          rng.disabled = false;
          rng.addEventListener('input', function () { drag = true; if (au.duration) tm.textContent = fmt(rng.value / 1000 * au.duration) + ' / ' + fmt(au.duration); });
          rng.addEventListener('change', function () { if (au.duration) au.currentTime = rng.value / 1000 * au.duration; drag = false; });
        }
        function start() {
          if (cur && cur !== au && cur) { try { cur.pause(); } catch (x) { } }
          cur = au; var pr = au.play(); if (pr && pr.catch) pr.catch(function () { setBtn(false); });
        }
        btn.addEventListener('click', function () {
          if (au) { if (au.paused) start(); else au.pause(); return; }
          if (loading) return; loading = true; tm.textContent = T('جاري التحميل...', 'Loading...'); btn.disabled = true;
          var c2 = new AbortController(), t2 = setTimeout(function () { c2.abort(); }, 25000);
          fetch(url, { signal: c2.signal }).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) { clearTimeout(t2); return URL.createObjectURL(b); }).catch(function () { clearTimeout(t2); return url; }).then(function (src) {
            au = new Audio(); au.preload = 'auto'; au.src = src; wire(); loading = false; btn.disabled = false; tm.textContent = '0:00'; start();
          });
        });
      });
      window.addEventListener('hashchange', function () { if (cur) { try { cur.pause(); } catch (x) { } } }, { once: true });
    }).catch(function () { clearTimeout(to); el.innerHTML = '<p class="pf-para">' + esc(T('مش متاح دلوقتي، جرّب بعد شوية.', 'Unavailable right now, try again later.')) + '</p>'; });
  }
  window.pfPodcast = { mount: mount };
})();
