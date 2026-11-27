/* Sakr Academy playground. Lazy: this file loads on tap, Python (Pyodide from CDN) loads only on the first Run, inside a worker that is killed on timeout. */
(function () {
  'use strict';
  var PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  var WSRC = "var ready=null,out=[];\n" +
    "self.onmessage=async function(e){var m=e.data;try{\n" +
    "if(m.t==='init'){importScripts('" + PYODIDE + "pyodide.js');var py=await loadPyodide({indexURL:'" + PYODIDE + "'});\n" +
    "py.setStdout({batched:function(s){out.push(s)}});py.setStderr({batched:function(s){out.push(s)}});\n" +
    "await py.runPythonAsync('import builtins\\ndef _no_input(*a,**k):\\n    raise RuntimeError(\"input() غير متاح هنا\")\\nbuiltins.input=_no_input');ready=py;postMessage({t:'ready'});}\n" +
    "else if(m.t==='run'){out=[];try{var r=await ready.runPythonAsync(m.code);if(r!==undefined&&r!==null&&out.length===0)out.push(String(r))}catch(err){out.push(String(err.message||err).split('\\n').slice(-6).join('\\n'))}postMessage({t:'done',out:out.join('\\n')});}\n" +
    "}catch(err){postMessage({t:'fail',msg:String(err&&err.message||err)})}};";
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var W = null, isReady = false, loading = false;
  function killWorker() { if (W) { try { W.terminate(); } catch (e) {} } W = null; isReady = false; loading = false; }
  function mount(box, ar, tid) {
    var T = function (a, e) { return ar ? a : e; };
    var START = 'print("أهلاً من عالم صقر")\nfor i in range(3):\n    print("رقم", i)\n';
    box.innerHTML = '<div class="pf-pg"><label class="pf-pg-l" for="pf-pg-code">' + esc(T('اكتب كود بايثون وجرّبه', 'Write Python code and run it')) + '</label>' +
      '<textarea id="pf-pg-code" class="pf-pg-code" dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" rows="9" maxlength="4000">' + esc(START) + '</textarea>' +
      '<div class="pf-pg-bar"><button type="button" class="pf-pg-run" id="pf-pg-run">▶ ' + esc(T('شغّل', 'Run')) + '</button><button type="button" class="pf-pg-reset" id="pf-pg-reset">' + esc(T('إعادة', 'Reset')) + '</button><span class="pf-pg-st" id="pf-pg-st" role="status"></span></div>' +
      '<pre class="pf-pg-out" id="pf-pg-out" dir="ltr" aria-live="polite"></pre>' +
      '<p class="pf-pg-note">' + esc(T('بتشتغل على جهازك بس، ومفيش حاجة بتتبعت لأي مكان. أول مرة بتحتاج تحميل بايثون (حوالي ١٠ ميجا)، وأي كود بياخد أكتر من ١٠ ثواني بيتوقف.', 'Runs on your device only, nothing is sent anywhere. The first run downloads Python (about 10 MB). Code running over 10 seconds is stopped.')) + '</p></div>';
    var code = box.querySelector('#pf-pg-code'), run = box.querySelector('#pf-pg-run'), out = box.querySelector('#pf-pg-out'), st = box.querySelector('#pf-pg-st');
    box.querySelector('#pf-pg-reset').addEventListener('click', function () { code.value = START; out.textContent = ''; st.textContent = ''; });
    var timer = null, busy = false;
    function done(msg, isErr) { clearTimeout(timer); busy = false; run.disabled = false; st.textContent = ''; out.textContent = msg; out.classList.toggle('err', !!isErr); }
    function start() {
      if (busy) return; busy = true; run.disabled = true; out.textContent = ''; out.classList.remove('err');
      var src = code.value.slice(0, 4000);
      function send() {
        st.textContent = T('بيشتغل...', 'Running...');
        timer = setTimeout(function () { killWorker(); done(T('الكود اتوقف لأنه خد أكتر من ١٠ ثواني (ممكن لوب مالوش نهاية).', 'Stopped: the code ran longer than 10 seconds (maybe an endless loop).'), true); }, 10000);
        W.postMessage({ t: 'run', code: src });
      }
      function handler(e) {
        var m = e.data || {};
        if (m.t === 'ready') { isReady = true; loading = false; clearTimeout(timer); send(); }
        else if (m.t === 'done') { done(m.out || T('(مفيش ناتج)', '(no output)'), false); }
        else if (m.t === 'fail') { killWorker(); done(T('حصلت مشكلة في تحميل بايثون. اتأكد من النت وجرّب تاني.', 'Could not load Python. Check your connection and try again.'), true); }
      }
      if (!W) {
        try { W = new Worker(URL.createObjectURL(new Blob([WSRC], { type: 'application/javascript' }))); } catch (e) { return done(T('المتصفح مش بيدعم الملعب.', 'This browser does not support the playground.'), true); }
        W.onmessage = handler; W.onerror = function () { killWorker(); done(T('حصلت مشكلة في تحميل بايثون. اتأكد من النت وجرّب تاني.', 'Could not load Python. Check your connection and try again.'), true); };
      }
      if (isReady) send();
      else {
        st.textContent = T('بنحمّل بايثون (أول مرة بس)...', 'Loading Python (first time only)...');
        timer = setTimeout(function () { killWorker(); done(T('التحميل خد وقت طويل. جرّب تاني.', 'Loading took too long. Try again.'), true); }, 60000);
        if (!loading) { loading = true; W.postMessage({ t: 'init' }); }
      }
    }
    run.addEventListener('click', start);
  }
  window.pfPlay = { mount: mount, stop: killWorker };
})();
