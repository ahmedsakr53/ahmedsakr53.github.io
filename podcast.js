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
      function card(e, n) {
        return '<div class="pf-card pf-pod-ep"><div class="pf-card-num">' + n + '</div><div class="pf-card-name">' + esc(ar ? e.ar : (e.en || e.ar)) + '</div>' +
          '<div class="pf-card-detail">' + esc(ar ? e.dAr : (e.dEn || e.dAr)) + '</div>' +
          '<audio controls preload="none" src="' + esc(e.url) + '"></audio></div>';
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
      var as = el.querySelectorAll('audio');
      Array.prototype.forEach.call(as, function (a) { a.addEventListener('play', function () { Array.prototype.forEach.call(as, function (o) { if (o !== a) o.pause(); }); }); });
    }).catch(function () { clearTimeout(to); el.innerHTML = '<p class="pf-para">' + esc(T('مش متاح دلوقتي، جرّب بعد شوية.', 'Unavailable right now, try again later.')) + '</p>'; });
  }
  window.pfPodcast = { mount: mount };
})();
