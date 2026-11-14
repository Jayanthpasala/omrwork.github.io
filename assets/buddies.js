/* Truth's buddies, drawn exactly as in the app (lib/widgets/buddy.dart, 200 x 200 grid), alive on the web page:
   their eyes follow your pointer, they blink, and they hop and talk when you tap them. */
(function () {
  var INK = '#0B0B0C', HANDLE = '#1C1C1E', BLUSH = '#FF7A8A';
  var BUDDIES = {
    nimbu:  { name: 'Nimbu',  color: '#D4FF3A', acc: 'headband',   girl: true,  lines: ['Hi, welcome to Truth!', 'Scan a snack with me?', 'Let\'s close your rings today.', 'Almost everything here is free!'] },
    aam:    { name: 'Aam',    color: '#FF9F0A', acc: 'chef',       girl: true,  lines: ['Got rice and dal? I\'ll make a recipe.', 'Home cook, at your service!'] },
    pudina: { name: 'Pudina', color: '#3DD6C6', acc: 'glasses',    girl: false, lines: ['I read every label for you.', 'That E-number? I\'ll explain it.'] },
    jamun:  { name: 'Jamun',  color: '#A78BFA', acc: 'headphones', girl: false, lines: ['Walk with me? Music\'s on.', 'Ten more minutes, you\'ve got this.'] },
    anaar:  { name: 'Anaar',  color: '#FF7A6B', acc: 'cap',        girl: true,  lines: ['Race you to 10,000 steps!', 'Runner here. Ready?'] },
    badal:  { name: 'Badal',  color: '#5EB0FF', acc: 'sprout',     girl: false, lines: ['Greens first, then dessert.', 'One more glass of water?'] }
  };
  window.TRUTH_BUDDIES = BUDDIES;

  function arcPath(cx, cy, r, a0, sweep) {
    var a1 = a0 + sweep;
    return 'M' + (cx + r * Math.cos(a0)).toFixed(2) + ' ' + (cy + r * Math.sin(a0)).toFixed(2) +
      ' A' + r + ' ' + r + ' 0 ' + (sweep > Math.PI ? 1 : 0) + ' 1 ' + (cx + r * Math.cos(a1)).toFixed(2) + ' ' + (cy + r * Math.sin(a1)).toFixed(2);
  }
  function line(x1, y1, x2, y2, c, w, o, cap) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + w + '"' +
      (o != null ? ' stroke-opacity="' + o + '"' : '') + ' stroke-linecap="' + (cap || 'round') + '"/>';
  }
  function accessory(acc, color) {
    switch (acc) {
      case 'headband':
        return '<path d="M36 58 Q90 22 144 58" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>' +
          '<path d="M36 58 Q90 22 144 58" fill="none" stroke="' + INK + '" stroke-width="3"/>';
      case 'chef':
        var parts = '<circle cx="68" cy="24" r="15"/><circle cx="112" cy="24" r="15"/><circle cx="90" cy="18" r="18"/><rect x="60" y="22" width="60" height="26" rx="5"/>';
        return '<g stroke="' + INK + '" stroke-opacity=".85" stroke-width="6" fill="' + INK + '" fill-opacity=".85">' + parts + '</g>' +
          '<g fill="#fff">' + parts + '</g>' + line(60, 36, 120, 36, INK, 2.5, .85) +
          line(75, 39, 75, 45, INK, 2, .3) + line(90, 39, 90, 45, INK, 2, .3) + line(105, 39, 105, 45, INK, 2, .3);
      case 'glasses':
        return '<g fill="none" stroke="' + INK + '" stroke-width="4"><circle cx="72" cy="94" r="15"/><circle cx="108" cy="94" r="15"/></g>' + line(87, 94, 93, 94, INK, 4);
      case 'headphones':
        return '<path d="' + arcPath(90, 96, 64, Math.PI, Math.PI) + '" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/>' +
          '<rect x="14" y="84" width="20" height="34" rx="8" fill="' + INK + '"/><rect x="146" y="84" width="20" height="34" rx="8" fill="' + INK + '"/>';
      case 'cap':
        return '<path d="M32 62 C34 8 146 8 148 62 Z" fill="' + INK + '"/>' +
          '<path d="M118 56 Q166 44 184 62 Q152 72 118 66 Z" fill="' + INK + '"/>' +
          line(90, 24, 90, 58, color, 2.5, .6) + line(38, 60, 142, 60, color, 4) + '<circle cx="90" cy="21" r="5" fill="' + color + '"/>';
      case 'sprout':
        return line(90, 32, 90, 12, '#2E9E4F', 5) +
          '<ellipse cx="0" cy="0" rx="13" ry="7" fill="#30D158" transform="translate(78 12) rotate(-25)"/>' +
          '<ellipse cx="0" cy="0" rx="13" ry="7" fill="#30D158" transform="translate(102 10) rotate(25)"/>';
    }
    return '';
  }
  // face: {lookX, lookY: -1..1, blink: 0 open .. 1 shut, mouth: 0 smile .. 1 wide open}
  function face(b, f) {
    var lx = Math.max(-1, Math.min(1, f.lookX || 0)) * 5, ly = Math.max(-1, Math.min(1, f.lookY || 0)) * 4;
    var eyeH = Math.max(2.5, 18 * (1 - Math.max(0, Math.min(1, f.blink || 0))));
    var s = '';
    [72, 108].forEach(function (x) {
      s += '<ellipse cx="' + (x + lx) + '" cy="' + (94 + ly) + '" rx="7" ry="' + (eyeH / 2) + '" fill="' + INK + '"/>';
      if (eyeH > 8) s += '<circle cx="' + (x + 2 + lx) + '" cy="' + (90 + ly) + '" r="2.4" fill="#fff"/>';
    });
    if (b.girl) s += '<g fill="' + BLUSH + '" fill-opacity=".55"><ellipse cx="60" cy="112" rx="8" ry="5"/><ellipse cx="120" cy="112" rx="8" ry="5"/></g>';
    else s += line(63, 77, 80, 74, INK, 5) + line(100, 74, 117, 77, INK, 5);
    var open = Math.max(0, Math.min(1, f.mouth || 0));
    if (open < .08) {
      s += '<path d="M80 114 Q90 124 100 114" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>';
    } else {
      var d = 6 + 14 * open, m = 'M80 113 Q90 111 100 113 Q98 ' + (113 + d) + ' 90 ' + (113 + d) + ' Q82 ' + (113 + d) + ' 80 113 Z';
      s += '<path d="' + m + '" fill="' + INK + '"/>' +
        '<ellipse cx="90" cy="' + (113 + d * .95) + '" rx="6.5" ry="' + (d * .4) + '" fill="' + BLUSH + '" clip-path="path(\'' + m + '\')"/>';
    }
    return s;
  }
  function svg(id, f) {
    var b = BUDDIES[id] || BUDDIES.nimbu, c = b.color;
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="96" cy="188" rx="58" ry="8" fill="#000" fill-opacity=".22"/>' +
      line(134, 134, 172, 172, HANDLE, 22) + line(150, 150, 166, 166, c, 10) +
      '<g class="f1"><ellipse cx="72" cy="172" rx="16" ry="9" fill="' + HANDLE + '"/></g><g class="f2"><ellipse cx="108" cy="174" rx="16" ry="9" fill="' + HANDLE + '"/></g>' +
      '<g class="armg"><path class="arm" d="M30 104 Q14 116 20 134" fill="none" stroke="' + c + '" stroke-width="11" stroke-linecap="round"/></g>' +
      '<circle cx="90" cy="96" r="66" fill="' + c + '"/><circle cx="90" cy="96" r="66" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3"/>' +
      '<circle cx="90" cy="96" r="50" fill="#FFFCF2"/>' +
      '<path d="' + arcPath(90, 96, 40, Math.PI * 1.05, Math.PI * .4) + '" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>' +
      '<g class="face">' + face(b, f || {}) + '</g>' + accessory(b.acc, c) + '</svg>';
  }
  window.buddySVG = svg;

  if (typeof document === 'undefined' || window.BUDDIES_STATIC) return;

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var live = [];
  var pointer = null;

  function mount(el) {
    var id = el.getAttribute('data-buddy') || 'nimbu', b = BUDDIES[id];
    var st = { lookX: 0, lookY: 0, blink: 0, mouth: 0, talkUntil: 0, line: 0, waveUntil: 0,
      walk: el.hasAttribute('data-walk') && !reduce, x: 0, dir: 1, pauseUntil: 0, step: 0 };
    el.innerHTML = '<span class="b-art">' + svg(id, st) + '</span><span class="b-say" role="status" aria-live="polite"></span>';
    var art = el.querySelector('.b-art'), say = el.querySelector('.b-say');
    var svgEl = art.querySelector('svg'), f1 = art.querySelector('.f1'), f2 = art.querySelector('.f2'), armg = art.querySelector('.armg');
    var faceG = function () { return art.querySelector('.face'); };
    var self = {
      el: el, id: id, st: st, svgEl: svgEl, f1: f1, f2: f2, armg: armg,
      draw: function () { var g = faceG(); if (g) g.innerHTML = face(b, st); },
      talk: function (text) {
        var snd = el.getAttribute('data-sound');
        if (snd) { try { var au = new Audio(snd); au.volume = .8; au.play().catch(function () {}); } catch (e) {} }
        if (el.hasAttribute('data-quiet')) { // just a wave and a chirp, no words
          st.talkUntil = performance.now() + 450; st.waveUntil = performance.now() + 2000;
          el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
          return;
        }
        say.textContent = text || b.lines[st.line++ % b.lines.length];
        el.classList.add('talking');
        st.talkUntil = performance.now() + 2200;
        st.waveUntil = performance.now() + 2000;
        el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop');
        clearTimeout(self.t); self.t = setTimeout(function () { el.classList.remove('talking'); }, 2600);
      }
    };
    el.addEventListener('click', function () { self.talk(el.getAttribute('data-tap') || undefined); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.talk(); } });
    // data-hello: says it once, the first time the buddy comes into view.
    if (el.hasAttribute('data-hello')) {
      var hello = function () { setTimeout(function () { self.talk(el.getAttribute('data-hello')); }, 700); };
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); hello(); } }, { threshold: .6 });
        io.observe(el);
      } else hello();
    }
    live.push(self);
    // Blink now and then.
    (function blink() {
      setTimeout(function () { st.blink = 1; self.draw(); setTimeout(function () { st.blink = 0; self.draw(); blink(); }, 130); }, 1800 + Math.random() * 3200);
    })();
  }

  document.querySelectorAll('[data-buddy]').forEach(mount);
  if (!live.length) return;

  window.addEventListener('pointermove', function (e) { pointer = { x: e.clientX, y: e.clientY, t: performance.now() }; }, { passive: true });

  var last = performance.now();
  function frame(now) {
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    live.forEach(function (o) {
      var r = o.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var st = o.st, waving = now < st.waveUntil, moving = false;
      if (st.walk) {
        // Walk back and forth under the phones; rest a moment at each end; stop to wave when tapped.
        var room = Math.max(0, o.el.parentElement.clientWidth - o.el.offsetWidth - 20);
        if (st.x > room) st.x = room; // the window got narrower
        if (!waving && now > st.pauseUntil) {
          st.x += st.dir * 70 * dt; moving = true;
          if (st.x > room) { st.x = room; st.dir = -1; st.pauseUntil = now + 1400; }
          if (st.x < 0) { st.x = 0; st.dir = 1; st.pauseUntil = now + 1400; }
          st.step += dt * 9;
        }
        o.el.style.transform = 'translateX(' + st.x.toFixed(1) + 'px)';
        var face = moving ? st.dir : 1;
        var bob = moving ? -Math.abs(Math.sin(st.step)) * 4 : 0;
        o.svgEl.style.transform = 'translateY(' + bob.toFixed(1) + 'px) scaleX(' + face + ')';
        var l1 = moving ? Math.max(0, Math.sin(st.step)) * 9 : 0, l2 = moving ? Math.max(0, -Math.sin(st.step)) * 9 : 0;
        o.f1.setAttribute('transform', 'translate(' + (moving ? Math.cos(st.step) * 4 : 0).toFixed(1) + ' ' + (-l1).toFixed(1) + ')');
        o.f2.setAttribute('transform', 'translate(' + (moving ? -Math.cos(st.step) * 4 : 0).toFixed(1) + ' ' + (-l2).toFixed(1) + ')');
      }
      // Wave: the arm swings up beside the head and waves.
      if (waving) {
        var k = Math.min(1, (st.waveUntil - now) / 250, (2000 - (st.waveUntil - now)) / 250);
        o.armg.setAttribute('transform', 'rotate(' + (k * (124 + 22 * Math.sin(now / 75))).toFixed(1) + ' 30 104)');
      } else o.armg.removeAttribute('transform');
      var tx = 0, ty = 0;
      if (moving) { o.st.lookX += (0.9 - o.st.lookX) * .18; o.st.lookY += (0.1 - o.st.lookY) * .18; o.st.mouth = 0; o.draw(); return; }
      if (pointer && now - pointer.t < 4000) {
        var cx = r.left + r.width * .45, cy = r.top + r.height * .48;
        var dx = pointer.x - cx, dy = pointer.y - cy, d = Math.max(60, Math.hypot(dx, dy));
        tx = dx / d; ty = dy / d;
      } else if (!reduce) { // idle: look around slowly
        tx = Math.sin(now / 1900 + o.el.offsetLeft) * .7; ty = Math.sin(now / 2700) * .3;
      }
      o.st.lookX += (tx - o.st.lookX) * .18; o.st.lookY += (ty - o.st.lookY) * .18;
      o.st.mouth = now < o.st.talkUntil && !reduce ? .5 + .45 * Math.sin(now / 70) : (now < o.st.talkUntil ? .5 : 0);
      o.draw();
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
