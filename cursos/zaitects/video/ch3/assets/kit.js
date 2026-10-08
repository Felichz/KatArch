/* KatArch video kit (ZAItects course copy: shared KatArch base + the ZAItects section at the end). Scenes and the film share these helpers; every cue is anchored to the narration
 * (window.TIMING, from tools/timing.mjs), never to a hard-coded second. */
window.KIT = (() => {
  const TM = window.TIMING, IC = window.ICONS;
  const NS = 'http://www.w3.org/2000/svg';
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]+/g, '');
  const SC = Object.fromEntries(TM.scenes.map((s) => [s.id, s]));
  const el = (tag, cls, html, parent) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; };
  const sv = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

  /** Tween helpers bound to one timeline, with times on that timeline's clock. */
  function tweens(tl) {
    const pop = (t, sel, o = {}) => tl.fromTo(sel, { opacity: 0, y: o.y ?? 16, scale: o.s ?? 0.96 }, { opacity: 1, y: 0, scale: 1, duration: o.d ?? 0.6, ease: o.ease ?? 'power3.out', stagger: o.st ?? 0, transformOrigin: '50% 50%' }, t);
    const fade = (t, sel, d = 0.45) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: 'power1.out' }, t);
    const to = (t, sel, vars) => tl.to(sel, { duration: 0.6, ease: 'power2.inOut', ...vars }, t);
    const draw = (t, path, d = 0.7) => tl.fromTo(path, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: d, ease: 'power2.inOut' }, t);
    /** A number counting up, written into an element. */
    const count = (t, e, v, d = 0.9) => { const pr = { v: 0 }; tl.fromTo(pr, { v: 0 }, { v, duration: d, ease: 'power2.out', onUpdate: () => (e.textContent = Math.round(pr.v).toLocaleString('es-AR')) }, t); };
    // ZAItects additions (seekable, deterministic):
    /** Like count, with decimals and a suffix: num(t, e, 3.5, { dec: 1, suf: '×' }). */
    const num = (t, e, v, o = {}) => { const from = o.from ?? 0, pr = { v: from }; const f = (x) => x.toLocaleString('es-AR', { minimumFractionDigits: o.dec ?? 0, maximumFractionDigits: o.dec ?? 0 }) + (o.suf ?? ''); tl.fromTo(pr, { v: from }, { v, duration: o.d ?? 0.9, ease: 'power2.out', onUpdate: () => (e.textContent = f(pr.v)) }, t); };
    /** A red line drawn across an element (an element, not a selector: scenes pass $('#id')). */
    const strike = (t, e, d = 0.35) => { let s = e.querySelector(':scope > .strike'); if (!s) { s = document.createElement('span'); s.className = 'strike'; e.appendChild(s); } tl.fromTo(s, { scaleX: 0 }, { scaleX: 1, duration: d, ease: 'power2.out' }, t); return s; };
    /** Text typed in, character by character, over d seconds. */
    const type = (t, e, text, d = 1.2) => { const pr = { k: 0 }; e.textContent = ''; tl.fromTo(pr, { k: 0 }, { k: text.length, duration: d, ease: 'none', onUpdate: () => (e.textContent = text.slice(0, Math.round(pr.k))) }, t); };
    return { pop, fade, to, draw, count, num, strike, type };
  }

  /** Everything a scene composition needs: its timeline, its narration cues on the scene's own clock, and diagram helpers. */
  function scene(id) {
    const sc = SC[id];
    if (!sc) throw new Error('no timing for scene ' + id);
    const T0 = sc.start;
    // the runtime clones the composition into its slot (#el-<id>); find the root there
    const slot = document.getElementById('el-' + id);
    const root = slot?.querySelector(`[data-composition-id="${id}"]`) ?? document.querySelector(`[data-composition-id="${id}"]:not([data-composition-src])`) ?? slot;
    if (!root) throw new Error('no root for scene ' + id);
    const tl = gsap.timeline({ paused: true });
    const T = tweens(tl);
    const L = (i) => sc.lines[i].start - T0;
    const LE = (i) => sc.lines[i].end - T0;
    const W = (i, frag, nth = 0) => {
      const hits = sc.lines[i].words.filter((w) => norm(w.w).startsWith(norm(frag)));
      if (!hits[nth]) throw new Error(`cue not found: ${id}[${i}] "${frag}"`);
      return hits[nth].s - T0;
    };
    const END = sc.end - T0;
    const $ = (s) => root.querySelector(s);
    const $$ = (s) => [...root.querySelectorAll(s)];
    root.querySelectorAll('[data-icon]').forEach((e) => (e.innerHTML = IC[e.dataset.icon]));

    function node(parent, o) {
      const w = o.w ?? 360, h = o.h ?? 104;
      const e = el('div', `node node--${o.tone ?? 'phys'} pop`, `<span class="node__ic">${o.mark ?? IC[o.icon]}</span><span class="node__tx"><b>${o.title}</b>${o.sub ? `<small>${o.sub}</small>` : ''}</span>`, parent);
      e.style.cssText = `left:${o.x}px;top:${o.y}px;width:${w}px;height:${h}px`;
      if (o.id) e.id = o.id;
      return { e, x: o.x, y: o.y, w, h, l: [o.x, o.y + h / 2], r: [o.x + w, o.y + h / 2], t: [o.x + w / 2, o.y], b: [o.x + w / 2, o.y + h], c: [o.x + w / 2, o.y + h / 2] };
    }
    function chip(parent, o) {
      const e = el('span', `chip ${o.tone ? 'chip--' + o.tone : ''} pop`, `${o.icon ? IC[o.icon] : ''}${o.text}`, parent);
      e.style.left = o.x + 'px'; e.style.top = o.y + 'px';
      if (o.id) e.id = o.id;
      return e;
    }
    /** A wire between two points: an S-curve, or a straight line with `straight`. Returns the path and a point-at-t function. */
    function wire(svg, a, b, cls = '', straight = false) {
      const mx = (a[0] + b[0]) / 2;
      const P = straight ? [a, a, b, b] : [a, [mx, a[1]], [mx, b[1]], b];
      const d = straight ? `M${a[0]} ${a[1]} L${b[0]} ${b[1]}` : `M${a[0]} ${a[1]} C${mx} ${a[1]} ${mx} ${b[1]} ${b[0]} ${b[1]}`;
      // a dashed wire fades in instead of drawing: pathLength would rescale its dashes into one
      const p = cls.includes('danger') ? sv('path', { d, class: `wire ${cls}` }, svg) : sv('path', { d, class: `wire ${cls}`, pathLength: 1, 'stroke-dasharray': '1', 'stroke-dashoffset': 1 }, svg);
      const at = (t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
      return { p, at };
    }
    /** Packets riding a wire from t0 to t1, one every `every` seconds: built up front, each a seekable tween. */
    function stream(svg, w, t0, t1, o = {}) {
      const every = o.every ?? 1.6, travel = o.travel ?? 1.3, out = [];
      for (let t = t0; t + travel <= t1; t += every) {
        const c = sv('circle', { r: o.r ?? 8, fill: o.color ?? '#b69bff', opacity: 0 }, svg);
        const [x0, y0] = w.at(0); c.setAttribute('cx', x0); c.setAttribute('cy', y0);
        const pr = { k: 0 };
        tl.fromTo(pr, { k: 0 }, { k: 1, duration: travel, ease: 'none', onUpdate: () => { const [x, y] = w.at(pr.k); c.setAttribute('cx', x); c.setAttribute('cy', y); } }, t);
        tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: travel * 0.15, ease: 'none' }, t);
        tl.to(c, { opacity: 0, duration: travel * 0.2, ease: 'none' }, t + travel * 0.8);
        out.push(c);
      }
      return out;
    }
    /** The pause-and-think ring: full while the question is asked, empties during the silence. */
    function ring(t, arc, d) { tl.fromTo(arc, { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': 1 }, duration: d, ease: 'none' }, t); }
    return { id, sc, tl, root, $, $$, L, LE, W, END, IC, el, sv, node, chip, wire, stream, ring, ...T, done: () => (window.__timelines[id] = tl) };
  }

  /** The film's own layer: scene cross-fades and chrome (kicker per section, progress). Captions live in the site's player, not in the render. */
  function film(tl) {
    const T = tweens(tl);
    const kick = document.getElementById('kickers');
    let prevK = null, nK = 0;
    TM.scenes.forEach((sc) => {
      if (sc.kicker === prevK) return;
      const k = el('span', 'kicker', `${nK ? `<i>${String(nK).padStart(2, '0')}</i>` : ''}${sc.kicker}`, kick);
      if (prevK !== null) T.to(sc.start, kick.children[kick.children.length - 2], { opacity: 0, duration: 0.3 });
      tl.fromTo(k, { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, sc.start + 0.25);
      prevK = sc.kicker;
      nK++;
    });
    tl.fromTo('#progress', { scaleX: 0 }, { scaleX: 1, duration: TM.duration, ease: 'none' }, 0);

    // each scene slot fades in over the previous one (the slots overlap by the cross-fade)
    TM.scenes.forEach((sc, i) => {
      const slot = document.getElementById('el-' + sc.id);
      slot.style.zIndex = 10 + i;
      if (i > 0) tl.fromTo(slot, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power1.inOut' }, sc.start);
    });
  }

  return { scene, film, IC, el, sv };
})();
