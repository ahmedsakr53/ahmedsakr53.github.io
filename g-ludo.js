(function () {
  window.pfG = window.pfG || {};
  window.pfG.ludo = function (root) {
    var L = window.pfLB, ar = L.ar();
    var P = [[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0],[7,0],[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[14,7],[14,8],[13,8],[12,8],[11,8],[10,8],[9,8],[8,9],[8,10],[8,11],[8,12],[8,13],[8,14],[7,14],[6,14],[6,13],[6,12],[6,11],[6,10],[6,9],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8],[0,7],[0,6]];
    var HC = [[[1,7],[2,7],[3,7],[4,7],[5,7]], [[7,1],[7,2],[7,3],[7,4],[7,5]], [[13,7],[12,7],[11,7],[10,7],[9,7]], [[7,13],[7,12],[7,11],[7,10],[7,9]]];
    var GOAL = [[6.7,7.5], [7.5,6.7], [8.3,7.5], [7.5,8.3]];
    var BX = [0, 9, 9, 0], BY = [0, 0, 9, 9];
    var COL = ['#22d3ee', '#ff2bd6', '#b6ff3b', '#fbbf24'], NM = ar ? ['سماوي', 'وردي', 'أخضر', 'أصفر'] : ['Cyan', 'Pink', 'Lime', 'Amber'];
    var START = [0, 13, 26, 39], SAFE = [0, 8, 13, 21, 26, 34, 39, 47];
    var PIP = [[], [[12,12]], [[7,7],[17,17]], [[7,7],[12,12],[17,17]], [[7,7],[17,7],[7,17],[17,17]], [[7,7],[17,7],[12,12],[7,17],[17,17]], [[7,6],[17,6],[7,12],[17,12],[7,18],[17,18]]];
    function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lss(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    var cfg = [true, false, false, false], cnt = 2;
    var sh = L.shell(root, 'ludo', '<div id="g-w"></div>');
    var W = document.getElementById('g-w');
    var tms = [], pl = [], S = [], cur = 0, roll = 0, over = true, opts = null, note = '', ph = 0, busy = false;
    var cv, cx, msg, die, scb, dice;
    function T(f, ms) { if (window.__fast) ms = Math.min(ms, window.__fast); var id = setTimeout(function () { var k = tms.indexOf(id); if (k > -1) tms.splice(k, 1); f(); }, ms); tms.push(id); return id; }

    /* ---------- sound (WebAudio, generated in code, starts only after a tap) ---------- */
    var AC = null, sndOn = ls('pf-ludo-snd') !== '0', musOn = ls('pf-ludo-mus') !== '0', musT = null, mstep = 0;
    function ac() {
      if (!sndOn) return null;
      if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { AC = new C(); } catch (e) { return null; } }
      if (AC.state === 'closed') { AC = null; return null; }
      if (AC.state === 'suspended' && AC.resume) { try { var p = AC.resume(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
      return AC;
    }
    function tone(f, d, type, vol, delay, to) {
      var a = ac(); if (!a) return; try {
        var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + (delay || 0);
        o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + 0.02);
      } catch (e) {}
    }
    function click(delay, vol) {
      var a = ac(); if (!a) return; try {
        var n = Math.floor(a.sampleRate * 0.03), b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
        for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
        var s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime + delay;
        s.buffer = b; f.type = 'bandpass'; f.frequency.value = 1800 + Math.random() * 1600; g.gain.value = vol;
        s.connect(f); f.connect(g); g.connect(a.destination); s.start(t);
      } catch (e) {}
    }
    function sRoll() { for (var i = 0; i < 9; i++) click(i * 0.055 + Math.random() * 0.02, 0.5 - i * 0.03); tone(180, 0.12, 'triangle', 0.12, 0.5, 120); }
    function sStep(n) { tone(520 + (n % 6) * 40, 0.06, 'sine', 0.09); }
    function sCap() { tone(520, 0.35, 'sawtooth', 0.08, 0, 70); tone(260, 0.3, 'square', 0.05, 0.05, 60); }
    function sSix() { tone(523, 0.1, 'triangle', 0.1); tone(659, 0.1, 'triangle', 0.1, 0.09); tone(784, 0.16, 'triangle', 0.1, 0.18); }
    function sGoal() { tone(660, 0.12, 'sine', 0.1); tone(880, 0.2, 'sine', 0.1, 0.1); }
    function sWin() { [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { tone(f, 0.22, 'triangle', 0.12, i * 0.14); }); }
    var NOTES = [262, 294, 330, 392, 440, 392, 330, 294], BASS = [131, 147, 165, 196];
    function music() {
      if (musT || !sndOn || !musOn || !ac()) return;
      musT = setInterval(function () {
        if (document.hidden || !sndOn || !musOn) return;
        var k = mstep++; tone(NOTES[(k * 3 + (k >> 3)) % 8] * (k % 16 > 7 ? 1.5 : 1), 0.5, 'triangle', 0.028);
        if (k % 4 === 0) tone(BASS[(k >> 2) % 4], 0.9, 'sine', 0.04);
      }, 420);
    }
    function stopMusic() { if (musT) { clearInterval(musT); musT = null; } }
    function vis() { if (!AC || AC.state === 'closed') return; try { var p = document.hidden ? AC.suspend() : (sndOn ? AC.resume() : 0); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    document.addEventListener('visibilitychange', vis);

    /* ---------- rules ---------- */
    function cell(s, q) { return q >= 0 && q <= 50 ? (START[s] + q) % 52 : -1; }
    function done(i) { return S[i].filter(function (q) { return q === 56; }).length; }
    function moves(i, r) { var o = []; for (var k = 0; k < 4; k++) { var q = S[i][k]; if (q === 56) continue; if (q < 0) { if (r === 6) o.push(k); } else if (q + r <= 56) o.push(k); } return o; }
    function xy(i, k) {
      var s = pl[i].s, q = S[i][k];
      if (q < 0) return [BX[s] + (k % 2 ? 4.1 : 1.9) + 0.5, BY[s] + (k > 1 ? 4.1 : 1.9) + 0.5];
      if (q <= 50) { var c = P[(START[s] + q) % 52]; return [c[0] + 0.5, c[1] + 0.5]; }
      if (q <= 55) { var h = HC[s][q - 51]; return [h[0] + 0.5, h[1] + 0.5]; }
      return [GOAL[s][0], GOAL[s][1]];
    }
    function nm(i) { return pl[i].h ? (ar ? 'لاعب ' + (i + 1) : 'Player ' + (i + 1)) : (ar ? 'كمبيوتر ' + (i + 1) : 'CPU ' + (i + 1)); }

    /* ---------- drawing ---------- */
    function rr(x, y, w, h, r) { cx.beginPath(); cx.moveTo(x + r, y); cx.arcTo(x + w, y, x + w, y + h, r); cx.arcTo(x + w, y + h, x, y + h, r); cx.arcTo(x, y + h, x, y, r); cx.arcTo(x, y, x + w, y, r); cx.closePath(); }
    function pawn(x, y, c, mv, big) {
      var sc = big ? 1.15 : 1;
      cx.save(); cx.translate(x, y);
      cx.beginPath(); cx.ellipse(0, 13 * sc, 12 * sc, 4.5 * sc, 0, 0, 7); cx.fillStyle = 'rgba(0,0,0,.45)'; cx.fill();
      if (mv) { cx.beginPath(); cx.arc(0, 0, 25, 0, 7); cx.lineWidth = 4; cx.strokeStyle = ph ? '#fff' : '#b6ff3b'; cx.shadowColor = '#b6ff3b'; cx.shadowBlur = 18; cx.stroke(); cx.shadowBlur = 0; }
      var g = cx.createLinearGradient(-10, 0, 10, 0); g.addColorStop(0, c); g.addColorStop(0.5, '#ffffffaa'); g.addColorStop(1, c);
      cx.beginPath(); cx.moveTo(-11 * sc, 12 * sc); cx.quadraticCurveTo(-5 * sc, 0, -3.5 * sc, -5 * sc); cx.lineTo(3.5 * sc, -5 * sc); cx.quadraticCurveTo(5 * sc, 0, 11 * sc, 12 * sc); cx.closePath();
      cx.fillStyle = c; cx.shadowColor = c; cx.shadowBlur = 8; cx.fill(); cx.shadowBlur = 0; cx.lineWidth = 2; cx.strokeStyle = 'rgba(5,6,26,.9)'; cx.stroke();
      cx.beginPath(); cx.moveTo(-5 * sc, 8 * sc); cx.quadraticCurveTo(-2 * sc, 0, -1.5 * sc, -4 * sc); cx.lineTo(0, -4 * sc); cx.quadraticCurveTo(0, 2 * sc, -1 * sc, 8 * sc); cx.fillStyle = 'rgba(255,255,255,.35)'; cx.fill();
      var rg = cx.createRadialGradient(-3 * sc, -12 * sc, 1, 0, -9 * sc, 9 * sc); rg.addColorStop(0, '#fff'); rg.addColorStop(0.35, c); rg.addColorStop(1, 'rgba(5,6,26,.85)');
      cx.beginPath(); cx.arc(0, -9 * sc, 8 * sc, 0, 7); cx.fillStyle = rg; cx.fill(); cx.lineWidth = 2; cx.strokeStyle = 'rgba(5,6,26,.9)'; cx.stroke();
      cx.restore();
    }
    function draw() {
      if (!cx) return; var u = 40, a, i, k;
      var bg = cx.createLinearGradient(0, 0, 600, 600); bg.addColorStop(0, '#0b0d2e'); bg.addColorStop(1, '#14103a'); cx.fillStyle = bg; cx.fillRect(0, 0, 600, 600);
      var act = pl.map(function (p) { return p.s; });
      for (var s = 0; s < 4; s++) {
        var on = act.indexOf(s) > -1;
        rr(BX[s] * u + 4, BY[s] * u + 4, 6 * u - 8, 6 * u - 8, 22); cx.fillStyle = COL[s] + (on ? '30' : '10'); cx.fill(); cx.lineWidth = on ? 3 : 1.5; cx.strokeStyle = COL[s] + (on ? 'cc' : '44'); cx.stroke();
        for (k = 0; k < 4; k++) { var bx = (BX[s] + (k % 2 ? 4.1 : 1.9) + 0.5) * u, by = (BY[s] + (k > 1 ? 4.1 : 1.9) + 0.5) * u; cx.beginPath(); cx.arc(bx, by, 19, 0, 7); cx.fillStyle = on ? 'rgba(5,6,26,.55)' : 'rgba(5,6,26,.3)'; cx.fill(); cx.lineWidth = 2; cx.strokeStyle = COL[s] + (on ? '99' : '33'); cx.stroke(); }
      }
      P.forEach(function (c, n) {
        var sc = START.indexOf(n); rr(c[0] * u + 2, c[1] * u + 2, u - 4, u - 4, 7);
        cx.fillStyle = sc > -1 ? COL[sc] + (act.indexOf(sc) > -1 ? 'aa' : '33') : '#1a1d52'; cx.fill(); cx.lineWidth = 1; cx.strokeStyle = '#2b2f6b'; cx.stroke();
        if (SAFE.indexOf(n) > -1) { cx.fillStyle = sc > -1 ? '#fff' : '#a5b4fc'; cx.font = '700 17px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('★', c[0] * u + u / 2, c[1] * u + u / 2 + 1); }
      });
      for (s = 0; s < 4; s++) HC[s].forEach(function (c) { rr(c[0] * u + 2, c[1] * u + 2, u - 4, u - 4, 7); cx.fillStyle = COL[s] + (act.indexOf(s) > -1 ? '88' : '22'); cx.fill(); cx.lineWidth = 1; cx.strokeStyle = COL[s] + '99'; cx.stroke(); });
      var m = 7.5 * u, o = 6 * u, e = 9 * u;
      [[[o, o], [o, e], 0], [[o, o], [e, o], 1], [[e, o], [e, e], 2], [[o, e], [e, e], 3]].forEach(function (t) {
        cx.beginPath(); cx.moveTo(t[0][0], t[0][1]); cx.lineTo(t[1][0], t[1][1]); cx.lineTo(m, m); cx.closePath(); cx.fillStyle = COL[t[2]] + (act.indexOf(t[2]) > -1 ? 'dd' : '33'); cx.fill(); cx.lineWidth = 1.5; cx.strokeStyle = '#05061a'; cx.stroke();
      });
      cx.beginPath(); cx.arc(m, m, 13, 0, 7); cx.fillStyle = '#05061a'; cx.fill(); cx.lineWidth = 2; cx.strokeStyle = '#fff8'; cx.stroke(); cx.fillStyle = '#fff'; cx.font = '700 15px sans-serif'; cx.fillText('★', m, m + 1);
      var seen = {}, list = [];
      for (i = 0; i < pl.length; i++) for (k = 0; k < 4; k++) { var p = xy(i, k); list.push({ i: i, k: k, x: p[0] * u, y: p[1] * u }); }
      list.sort(function (A, B) { return A.y - B.y; });
      list.forEach(function (t) {
        var key = Math.round(t.x) + ',' + Math.round(t.y), n = seen[key] = (seen[key] || 0) + 1, mv = opts && pl[cur] && t.i === cur && opts.indexOf(t.k) > -1;
        pawn(t.x + (n > 1 ? (n - 1) * 7 - 3 : 0), t.y - 2 - (n > 1 ? (n - 1) * 3 : 0), COL[pl[t.i].s], mv, false);
      });
    }

    /* ---------- dice & scoreboard ---------- */
    function dieSvg(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5"/>' + (PIP[n] || []).map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.1"/>'; }).join('') + '</svg>'; }
    function buildDice() {
      dice.innerHTML = pl.map(function (p, i) { return '<div class="pf-ludo-dw pf-ludo-k' + p.s + '" id="g-dw' + i + '" style="--c:' + COL[p.s] + '"><small>' + nm(i) + '</small><div class="pf-ludo-d" id="g-d' + i + '"></div></div>'; }).join('');
      scb.innerHTML = pl.map(function (p, i) { return '<span style="--c:' + COL[p.s] + '"><i></i><b id="g-s' + i + '">0</b>/4</span>'; }).join('');
    }
    function showDie(i, n, on) { var e = document.getElementById('g-d' + i); if (e) { e.innerHTML = n ? dieSvg(n) : ''; e.className = 'pf-ludo-d' + (on ? ' on' : ''); } }
    function mark() { pl.forEach(function (p, i) { var e = document.getElementById('g-dw' + i); if (e) e.className = 'pf-ludo-dw pf-ludo-k' + p.s + (i === cur && !over ? ' act' : ''); var s = document.getElementById('g-s' + i); if (s) s.textContent = done(i); }); }
    function say(t, cls) { msg.textContent = t; msg.className = 'pf-xo-msg ' + (cls || ''); }

    /* ---------- turn flow ---------- */
    function begin() {
      if (over) return; opts = null; roll = 0; busy = false; mark(); draw();
      var nt = note ? note + ' ' : ''; note = '';
      if (pl[cur].h) { die.disabled = false; die.textContent = (ar ? 'ارمِ النرد: ' : 'Roll: ') + nm(cur); say(nt + (ar ? 'دور ' : '') + nm(cur) + (ar ? '، ارمِ النرد' : ', roll the dice'), ''); }
      else { die.disabled = true; die.textContent = nm(cur) + '…'; say(nt + nm(cur) + '…', ''); T(doRoll, 750); }
    }
    function doRoll() {
      if (over || roll || busy) return; busy = true; die.disabled = true; music(); sRoll();
      var who = cur, fin = 1 + Math.floor(Math.random() * 6), n = 0; roll = fin;
      (function spin() { if (over) return; if (n++ < 7) { showDie(who, 1 + Math.floor(Math.random() * 6), true); T(spin, 70); } else settle(who); })();
    }
    function settle(who) {
      if (over) return; showDie(who, roll, true); if (roll === 6) sSix();
      var o = moves(who, roll); say(nm(who) + (ar ? ' رمى ' : ' rolled ') + roll, '');
      if (!o.length) { say(nm(who) + (ar ? ' رمى ' : ' rolled ') + roll + (ar ? ' ومفيش حركة' : ' - no move'), ''); T(function () { next(false); }, 950); return; }
      if (!pl[who].h) { T(function () { run(pick(who, o), false); }, 600); return; }
      var uniq = {}; o.forEach(function (k) { var key = S[who][k] < 0 ? 'b' : S[who][k]; if (uniq[key] === undefined) uniq[key] = k; });
      var ids = Object.keys(uniq).map(function (k) { return uniq[k]; });
      if (ids.length === 1) { say(nm(who) + (ar ? ' رمى ' : ' rolled ') + roll + (ar ? ' (حركة واحدة)' : ' (one move)'), ''); T(function () { run(ids[0], true); }, 650); return; }
      opts = ids; busy = false; say(nm(who) + ' ' + roll + (ar ? ': اضغط على القطعة اللي عايز تحركها' : ': tap the piece you want to move'), 'x'); draw(); pulse();
    }
    function pulse() { if (!opts || over) return; ph = ph ? 0 : 1; draw(); T(pulse, 260); }
    function run(k, human) {
      if (over) return; busy = true; opts = null; say(nm(cur) + ' ' + roll, ''); var i = cur, r = roll, q = S[i][k], target = q < 0 ? 0 : q + r, seq = [];
      if (q < 0) seq.push(0); else for (var z = q + 1; z <= target; z++) seq.push(z);
      (function stepper(n) {
        if (over) return; S[i][k] = seq[n]; sStep(seq[n]); draw();
        if (n + 1 < seq.length) return T(function () { stepper(n + 1); }, 190);
        T(function () { landed(i, k, r); }, 120);
      })(0);
    }
    function landed(i, k, r) {
      var s = pl[i].s, q = S[i][k], c = cell(s, q), cap = false;
      if (c > -1 && SAFE.indexOf(c) < 0) for (var o = 0; o < pl.length; o++) { if (o === i) continue; for (var j = 0; j < 4; j++) if (S[o][j] >= 0 && cell(pl[o].s, S[o][j]) === c) { S[o][j] = -1; cap = true; } }
      var goal = q === 56;
      if (cap) { sCap(); note = nm(i) + (ar ? ' أكل قطعة وهي رجعت بيتها! رمية تانية.' : ' captured a piece, it goes home! Roll again.'); }
      else if (goal) { sGoal(); note = nm(i) + (ar ? ' وصّل قطعة للهدف! رمية تانية.' : ' reached the goal! Roll again.'); }
      else if (r === 6) note = nm(i) + (ar ? ' جاب ٦، رمية تانية.' : ' rolled 6, roll again.');
      draw(); mark();
      if (done(i) === 4) return win(i);
      next(cap || goal || r === 6);
    }
    function next(bonus) { if (over) return; if (!bonus) cur = (cur + 1) % pl.length; T(begin, bonus ? 450 : 250); }
    function win(i) { over = true; busy = false; die.disabled = true; sWin(); mark(); say(nm(i) + (ar ? ' كسب اللعبة! 🎉' : ' wins! 🎉'), 'x'); }
    function pick(i, o) {
      var s = pl[i].s, best = o[0], bs = -1e9;
      o.forEach(function (k) {
        var q = S[i][k], nq = q < 0 ? 0 : q + roll, sc = nq, c = cell(s, nq);
        if (q < 0) sc += 30; if (nq === 56) sc += 70; else if (nq > 50) sc += 15;
        if (c > -1) { for (var a = 0; a < pl.length; a++) { if (a === i) continue; for (var j = 0; j < 4; j++) { var oq = S[a][j]; if (oq >= 0 && cell(pl[a].s, oq) === c && SAFE.indexOf(c) < 0) sc += 80 + oq; } } if (SAFE.indexOf(c) > -1) sc += 12; }
        sc += Math.random() * 3; if (sc > bs) { bs = sc; best = k; }
      });
      return best;
    }

    /* ---------- screens ---------- */
    function setup() {
      tms.forEach(clearTimeout); tms = []; over = true; opts = null; pl = []; S = []; stopMusic();
      var seats = ''; for (var i = 0; i < cnt; i++) seats += '<div class="pf-ludo-seat" style="--c:' + COL[cnt === 2 ? [0, 2][i] : i] + '"><i></i><span>' + (ar ? 'لاعب ' + (i + 1) : 'Player ' + (i + 1)) + '</span><button type="button" data-t="' + i + '" class="' + (cfg[i] ? 'on' : '') + '">' + (cfg[i] ? (ar ? 'إنسان' : 'Human') : (ar ? 'كمبيوتر' : 'Computer')) + '</button></div>';
      W.innerHTML = '<div class="pf-ludo-set"><h3>' + (ar ? 'اختار طريقة اللعب' : 'Choose how to play') + '</h3><div class="pf-ludo-pre"><button type="button" data-p="cpu">' + (ar ? 'ضد الكمبيوتر' : 'vs Computer') + '</button><button type="button" data-p="fr">' + (ar ? 'مع صاحبك' : 'With a friend') + '</button><button type="button" data-p="4">' + (ar ? '٤ لاعبين' : '4 players') + '</button></div>' +
        '<div class="pf-ludo-cnt">' + [2, 3, 4].map(function (n) { return '<button type="button" data-n="' + n + '" class="' + (cnt === n ? 'on' : '') + '">' + n + (ar ? ' لاعبين' : ' players') + '</button>'; }).join('') + '</div>' + seats +
        '<p class="pf-g-hint">' + (ar ? 'كل اللاعبين على نفس الجهاز، بالدور. اللاعب «كمبيوتر» بيلعب لوحده.' : 'All players share this device, in turns. A Computer seat plays by itself.') + '</p><button type="button" class="pf-xo-again" data-go="1">' + (ar ? 'ابدأ اللعب' : 'Start') + '</button></div>';
    }
    function play() {
      var seatIdx = cnt === 2 ? [0, 2] : cnt === 3 ? [0, 1, 2] : [0, 1, 2, 3];
      pl = seatIdx.map(function (s, i) { return { s: s, h: !!cfg[i] }; }); S = pl.map(function () { return [-1, -1, -1, -1]; }); cur = 0; roll = 0; over = false; opts = null; note = ''; busy = false;
      W.innerHTML = '<div class="pf-g-top pf-ludo-sc" id="g-sc"></div><div class="pf-ludo-board"><div class="pf-ludo-dice" id="g-dice"></div><canvas class="pf-g-cv" id="g-cv" width="600" height="600" aria-label="Ludo"></canvas></div>' +
        '<div class="pf-xo-msg" id="g-m"></div><div class="pf-ludo-ctl"><button type="button" class="pf-ludo-die" id="g-die"></button></div>' +
        '<p class="pf-g-hint">' + (ar ? 'القاعدة: لو قطعتك وقفت على قطعة خصم (مش على نجمة ★) بترجّعها بيتها وبتاخد رمية تانية. ٦ بتطلّع قطعة وبتديك رمية تانية.' : 'Rule: landing on an opponent piece (not on a star) sends it home and gives you another roll. A 6 releases a piece and rolls again.') + '</p>' +
        '<div class="pf-ludo-snd"><button type="button" id="g-sn">' + '</button><button type="button" id="g-mu"></button></div><button type="button" class="pf-xo-again" id="g-new">' + (ar ? 'لعبة جديدة' : 'New game') + '</button>';
      cv = document.getElementById('g-cv'); cx = cv.getContext('2d'); msg = document.getElementById('g-m'); die = document.getElementById('g-die'); scb = document.getElementById('g-sc'); dice = document.getElementById('g-dice');
      buildSnd(); buildDice(); music(); begin();
    }
    function buildSnd() {
      document.getElementById('g-sn').textContent = (ar ? 'الصوت: ' : 'Sound: ') + (sndOn ? (ar ? 'شغال' : 'on') : (ar ? 'مكتوم' : 'muted'));
      document.getElementById('g-mu').textContent = (ar ? 'الموسيقى: ' : 'Music: ') + (musOn ? (ar ? 'شغالة' : 'on') : (ar ? 'مقفولة' : 'off'));
    }
    W.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (e.target === cv && opts && !busy && pl[cur] && pl[cur].h) {
        var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 15, y = (e.clientY - r.top) / r.height * 15, bi = -1, bd = 2.2;
        opts.forEach(function (k) { var a = xy(cur, k), d = Math.hypot(a[0] - x, a[1] - y); if (d < bd) { bd = d; bi = k; } }); if (bi > -1) { music(); run(bi, true); } return;
      }
      if (!b) return;
      if (b.getAttribute('data-p')) { var p = b.getAttribute('data-p'); cnt = p === '4' ? 4 : 2; cfg = p === 'fr' ? [true, true, false, false] : p === '4' ? [true, false, false, false] : [true, false, false, false]; return setup(); }
      if (b.getAttribute('data-n')) { cnt = +b.getAttribute('data-n'); return setup(); }
      if (b.getAttribute('data-t') !== null) { var t = +b.getAttribute('data-t'); cfg[t] = !cfg[t]; return setup(); }
      if (b.getAttribute('data-go')) { if (!cfg.slice(0, cnt).some(function (v) { return v; })) { cfg[0] = true; } ac(); return play(); }
      if (b.id === 'g-die') { if (!over && !busy && !roll && pl[cur] && pl[cur].h) doRoll(); return; }
      if (b.id === 'g-new') { return setup(); }
      if (b.id === 'g-sn') { sndOn = !sndOn; lss('pf-ludo-snd', sndOn ? '1' : '0'); if (!sndOn) stopMusic(); else { ac(); music(); } return buildSnd(); }
      if (b.id === 'g-mu') { musOn = !musOn; lss('pf-ludo-mus', musOn ? '1' : '0'); if (!musOn) stopMusic(); else music(); return buildSnd(); }
    });
    window.pfGStop = function () { tms.forEach(clearTimeout); tms = []; over = true; stopMusic(); document.removeEventListener('visibilitychange', vis); if (AC) { try { var p = AC.close(); if (p && p.catch) p.catch(function () {}); } catch (e) {} AC = null; } };
    setup();
  };
})();
