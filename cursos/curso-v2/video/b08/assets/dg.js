/* KatArch · biblioteca de diagramas del curso (cursos/curso-unico/GUIA-VISUAL.md).
 * Las mismas piezas significan lo mismo en todo el curso; los comportamientos son tweens de GSAP sobre la línea de
 * tiempo de la escena, así que se pueden rebobinar (nada de callbacks que solo corren hacia adelante).
 *
 *   const K = KIT.scene('decision'); const D = DG(K);
 *   const a = D.svc({ x, y, t: 'Candidatos' }); const b = D.db({ x, y, t: 'Base' });
 *   const l = D.link(a.b, b.t, 'read'); D.build(K.W(0, 'cuatro'), [a, b]); D.travel(K.W(1, 'viaja'), l);
 */
window.DG = (K) => {
  const { tl, root, sv, el, IC } = K;
  const svg = sv('svg', { class: 'dg-wires', viewBox: '0 0 1920 1080' }, root);
  const layer = el('div', 'dg-layer', null, root);
  const ico = (name) => (name && IC[name]) || '';

  /** The box every piece shares: position, size, the anchor points, and the hidden parts behaviours light up. */
  function box(cls, o, html) {
    const w = o.w ?? 260, h = o.h ?? 96;
    const e = el('div', `dg-p ${cls} pop`, `${html}<i class="dg-hl"></i><i class="dg-down">${ico('zap')}</i>`, o.in ?? layer);
    e.style.cssText = `left:${o.x}px;top:${o.y}px;width:${w}px;height:${h}px;${o.style ?? ''}`;
    if (o.id) e.id = o.id;
    const x = o.x, y = o.y;
    return { e, x, y, w, h, c: [x + w / 2, y + h / 2], l: [x, y + h / 2], r: [x + w, y + h / 2], t: [x + w / 2, y], b: [x + w / 2, y + h], hl: e.querySelector('.dg-hl'), down: e.querySelector('.dg-down') };
  }
  const label = (t, s) => `<span class="dg-t"><b>${t}</b>${s ? `<small>${s}</small>` : ''}</span>`;

  // ── piezas ──
  const svc = (o) => box('dg-svc', o, `${o.icon ? `<span class="dg-ic">${ico(o.icon)}</span>` : ''}${label(o.t, o.s)}`);
  const db = (o) => box('dg-db', { w: 200, h: 120, ...o }, `<span class="dg-db__top"></span>${label(o.t ?? 'Base de datos', o.s)}${o.lock ? `<span class="dg-lock">${ico('lock')}${o.lock}</span>` : ''}`);
  const queue = (o) => box('dg-queue', { w: 300, h: 70, ...o }, `<span class="dg-bands"></span>${label(o.t ?? 'Cola', o.s)}`);
  const stream = (o) => box('dg-stream', { w: 520, h: 64, ...o }, `<span class="dg-ticks"></span>${label(o.t ?? 'Stream', o.s)}`);
  const gw = (o) => box('dg-gw', { w: 64, h: 220, ...o }, `<span class="dg-gw__t">${o.t ?? 'gateway'}</span>`);
  const person = (o) => box('dg-person', { w: 150, h: 150, ...o }, `<span class="dg-ic dg-ic--xl">${ico('user')}</span><span class="dg-role">${o.t}</span>`);
  const ext = (o) => box('dg-ext', o, `${o.icon ? `<span class="dg-ic">${ico(o.icon)}</span>` : ''}${label(o.t, o.s)}`);
  const model = (o) => box('dg-model', o, `<span class="dg-hex"></span>${label(o.t ?? 'Modelo', o.s)}`);
  const zone = (o) => box('dg-zone', { w: 600, h: 400, ...o }, `<span class="dg-zone__t">${o.t ?? ''}</span>`);
  /** A decision document: a sheet with a title and its stripes (contexto, alternativas, costo, requisito). */
  function doc(o) {
    const stripes = o.stripes ?? ['contexto', 'alternativas', 'costo', 'requisito'];
    const p = box('dg-doc', { w: 420, h: 520, ...o }, `<span class="dg-doc__h">${o.t ?? 'ADR'}</span>${stripes.map((s, i) => `<span class="dg-stripe pop" data-k="${i}"><em>${s}</em><span class="dg-stripe__c"></span></span>`).join('')}`);
    p.stripes = [...p.e.querySelectorAll('.dg-stripe')];
    p.fill = (i, html) => (p.stripes[i].querySelector('.dg-stripe__c').innerHTML = html);
    return p;
  }
  /** The case's seal: its name and icon, top left, while the voice talks about it. */
  const seal = (o) => { const e = el('div', 'dg-seal pop', `${ico(o.icon)}<span>${o.t}</span>${o.tag ? `<em>${o.tag}</em>` : ''}`, root); return { e }; };
  /** A key word at the bottom of the screen. */
  const word = (o) => { const e = el('div', 'dg-word pop', o.t, root); if (o.y) e.style.top = o.y + 'px'; return { e }; };
  /** A number in orange with its unit, next to what it refers to. */
  const cifra = (o) => { const e = el('div', 'dg-cifra pop', `<b>${o.n}</b>${o.u ? `<small>${o.u}</small>` : ''}`, layer); e.style.cssText = `left:${o.x}px;top:${o.y}px`; return { e }; };
  /** Free HTML placed on the diagram layer. */
  const html = (o) => { const e = el('div', `dg-free pop ${o.cls ?? ''}`, o.h, layer); e.style.cssText = `left:${o.x}px;top:${o.y}px;${o.style ?? ''}`; return { e }; };

  // ── conexiones ──
  /** kind: 'sync' (azul, continua), 'async' (verde, a trazos), 'read' (gris fina), 'accent' (naranja). */
  function link(a, b, kind = 'read', curve = false) {
    const mx = (a[0] + b[0]) / 2;
    const P = curve ? [a, [mx, a[1]], [mx, b[1]], b] : [a, a, b, b];
    const d = curve ? `M${a[0]} ${a[1]} C${mx} ${a[1]} ${mx} ${b[1]} ${b[0]} ${b[1]}` : `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
    const dashed = kind === 'async';
    const p = sv('path', dashed ? { d, class: `dg-l dg-l--${kind}`, opacity: 0 } : { d, class: `dg-l dg-l--${kind}`, pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1 }, svg);
    const at = (t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
    const mid = at(0.5);
    const brk = sv('g', { class: 'dg-break', opacity: 0, transform: `translate(${mid[0]} ${mid[1]})` }, svg);
    sv('line', { x1: -14, y1: -14, x2: 14, y2: 14 }, brk); sv('line', { x1: -14, y1: 14, x2: 14, y2: -14 }, brk);
    return { p, at, dashed, brk, kind };
  }

  // ── comportamientos ──
  const els = (xs) => [].concat(xs).map((x) => x?.e ?? x?.p ?? x);
  /** construir: pieces appear one after another. */
  const build = (t, items, gap = 0.18) => els(items).forEach((e, i) => tl.fromTo(e, { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }, t + i * gap));
  /** A link appears: drawn if solid, faded if dashed. */
  const show = (t, l, d = 0.6) => (l.dashed ? tl.fromTo(l.p, { opacity: 0 }, { opacity: 1, duration: d }, t) : tl.fromTo(l.p, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: d, ease: 'power2.inOut' }, t));
  /** viajar: a dot rides the link from start to end. `back` makes it return (a sync call). */
  function travel(t, l, o = {}) {
    const color = o.color ?? (l.kind === 'sync' ? '#6ea2ff' : l.kind === 'accent' ? '#ff7a45' : '#3fd694');
    const c = sv('circle', { r: o.r ?? 10, fill: color, opacity: 0 }, svg);
    const d = o.d ?? 0.9, pr = { k: 0 };
    const place = () => { const [x, y] = l.at(o.back ? 1 - Math.abs(1 - 2 * pr.k) : pr.k); c.setAttribute('cx', x); c.setAttribute('cy', y); };
    place();
    tl.fromTo(pr, { k: 0 }, { k: 1, duration: o.back ? d * 2 : d, ease: 'none', onUpdate: place }, t);
    tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.15 }, t);
    tl.to(c, { opacity: 0, duration: 0.2 }, t + (o.back ? d * 2 : d) - 0.1);
    return c;
  }
  /** duplicar: two identical dots reach the same end; the second gets a "×2". */
  function dup(t, l) {
    travel(t, l); travel(t + 0.8, l);
    const [x, y] = l.at(1);
    const tag = el('div', 'dg-x2 pop', '×2', layer); tag.style.cssText = `left:${x + 14}px;top:${y - 40}px`;
    tl.fromTo(tag, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, t + 1.6);
    return tag;
  }
  /** cortar: the link turns red and breaks in the middle. */
  function cut(t, l) {
    tl.to(l.p, { stroke: '#ff6b7a', duration: 0.25 }, t);
    tl.fromTo(l.brk, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: '50% 50%' }, t + 0.1);
  }
  /** Undo a cut (to rewind a "what if" inside a scene). */
  function mend(t, l) {
    tl.to(l.brk, { opacity: 0, duration: 0.25 }, t);
    tl.to(l.p, { stroke: '', duration: 0.25, clearProps: 'stroke' }, t);
  }
  /** caer: the piece goes down (red border, bolt, dimmed content). */
  function fall(t, p) {
    tl.to(p.e, { borderColor: '#ff6b7a', duration: 0.3 }, t);
    tl.fromTo(p.down, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, t);
    tl.to(p.e.querySelector('.dg-t') ?? p.e, { opacity: 0.35, duration: 0.3 }, t);
  }
  function rise(t, p) {
    tl.to(p.down, { opacity: 0, duration: 0.25 }, t);
    tl.to(p.e, { borderColor: '', duration: 0.3, clearProps: 'borderColor' }, t);
    tl.to(p.e.querySelector('.dg-t') ?? p.e, { opacity: 1, duration: 0.3 }, t);
  }
  /** resaltar: orange ring around a piece. */
  const mark = (t, p, on = true) => tl.to(p.hl, { opacity: on ? 1 : 0, duration: 0.35 }, t);
  /** enfocar: one piece highlighted, the others to the background. */
  function focus(t, p, others = []) { mark(t, p); tl.to(els(others), { opacity: 0.35, duration: 0.4 }, t); }
  function unfocus(t, p, others = []) { mark(t, p, false); tl.to(els(others), { opacity: 1, duration: 0.4 }, t); }
  /** separar / mover: a piece or group slides by dx, dy. */
  const move = (t, items, dx, dy = 0, d = 0.8) => tl.to(els(items), { x: `+=${dx}`, y: `+=${dy}`, duration: d, ease: 'power3.inOut' }, t);
  /** comparar: a divider down the middle and two labels on top. */
  function compare(t, left, right) {
    const line = el('div', 'dg-split pop', '', root);
    const a = el('div', 'dg-side dg-side--l pop', left, root), b = el('div', 'dg-side dg-side--r pop', right, root);
    tl.fromTo(line, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.6, ease: 'power3.out', transformOrigin: '50% 0%' }, t);
    tl.fromTo([a, b], { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, t + 0.2);
    return { line, a, b };
  }
  const out = (t, items, d = 0.45) => tl.to(els(items), { opacity: 0, duration: d }, t);
  const into = (t, items, d = 0.45) => tl.fromTo(els(items), { opacity: 0 }, { opacity: 1, duration: d }, t);

  // ── el nivel de todos los bloques (GUIA-VISUAL.md) ──
  /** cámara: acerca el diagrama (cables y piezas juntos) al rectángulo [x, y, w, h]; null vuelve al plano entero.
   *  El sello, los rótulos de la escena y lo que sale con pull() quedan fuera de la cámara. */
  function cam(t, r, d = 1.1) {
    let v = { x: 0, y: 0, scale: 1 };
    if (r) {
      const [x, y, w, h] = r, s = Math.min(1920 / w, 1080 / h) * 0.92;
      v = { x: 960 - (x + w / 2) * s, y: 560 - (y + h / 2) * s, scale: s };
    }
    tl.to([svg, layer], { ...v, transformOrigin: '0 0', duration: d, ease: 'power3.inOut' }, t);
  }
  /** lo que la voz destaca de un documento, fuera de la hoja y en grande. o: { x, y, w, h: html, tone: 'ok'|'ko'|'' } */
  function pull(t, o) {
    const e = el('div', `dg-pull pop ${o.tone ? 'dg-pull--' + o.tone : ''}`, o.h, root);
    e.style.cssText = `left:${o.x}px;top:${o.y}px;${o.w ? `width:${o.w}px;` : ''}`;
    tl.fromTo(e, { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }, t);
    return { e };
  }
  /** el mundo del caso: su ilustración (casos.js) grande en el centro desde t, que a "hasta" se achica hacia el sello. */
  function mundo(t, key, hasta) {
    const art = (window.CASOS || {})[key];
    const e = el('div', 'dg-mundo pop', art ? art.svg : '', root);
    if (art) e.insertAdjacentHTML('beforeend', `<span>${art.t}</span>`);
    tl.fromTo(e, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }, t);
    tl.to(e, { opacity: 0, scale: 0.18, x: -820, y: -440, duration: 0.8, ease: 'power3.in' }, hasta);
    return { e };
  }
  /** estás aquí: el mapa del curso, con el bloque n encendido, de 0 a "hasta". */
  function aqui(n, hasta) {
    const st = [0, 1, 2, 3, 4, 5].map((i) => `<i class="${i === n ? 'here' : i < n ? 'past' : ''}"></i>`).join('<b></b>');
    const reg = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => `<i class="${i === n ? 'here' : ''}"></i>`).join('');
    const e = el('div', 'dg-aqui pop', `<div class="dg-aqui__a"><em>acto 1 · cómo se decide</em><div class="dg-aqui__path">${st}</div></div><div class="dg-aqui__a"><em>acto 2 · el territorio</em><div class="dg-aqui__grid">${reg}</div></div><div class="dg-aqui__a dg-aqui__a--c"><em>cierre</em><i class="${n === 16 ? 'here' : ''}"></i></div><strong>${n === 0 ? 'Apertura' : n === 16 ? 'Cierre' : 'Bloque ' + n}</strong>`, root);
    tl.fromTo(e, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
    tl.to(e, { opacity: 0, duration: 0.5 }, hasta);
    return { e };
  }

  return { svg, layer, svc, db, queue, stream, gw, person, ext, model, zone, doc, seal, word, cifra, html, link, build, show, travel, dup, cut, mend, fall, rise, mark, focus, unfocus, move, compare, out, into, cam, pull, mundo, aqui };
};
