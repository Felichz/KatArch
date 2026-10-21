/* KatArch · pizarra y forma (cursos/curso-unico/GUIA-VISUAL.md, "Pizarra y forma").
 * Todo se dibuja con trazo de tiza sobre la línea de tiempo de la escena: las formas se trazan (draw), se repasan en otro
 * color (color), se apagan (dim) y se borran (erase). Las piezas son grupos de elementos SVG y HTML dentro de un "mundo"
 * que la cámara puede acercar (cam). Nada de callbacks: todo es un tween, así que la escena se puede rebobinar.
 *
 *   const K = KIT.scene('decision'); const T = TZ(K);
 *   const a = T.box(400, 200, 300, 116, 'Candidatos'); T.draw(K.W(0, 'cuatro'), a);
 *   T.color(K.W(0, 'guarda'), a, T.C.or); T.erase(K.L(1), a);
 */
(() => {
  const NS = 'http://www.w3.org/2000/svg';
  // los filtros de tiza viven una sola vez en el documento
  function defs() {
    if (document.getElementById('tz-defs')) return;
    const s = document.createElementNS(NS, 'svg');
    s.id = 'tz-defs';
    s.setAttribute('width', '0');
    s.setAttribute('height', '0');
    s.style.position = 'absolute';
    s.innerHTML = `<defs>
      <filter id="tz-tiza" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="4.5"/></filter>
      <filter id="tz-polvo" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .93  0 0 0 0 .9  0 0 0 0 .84  0 0 0 .06 0"/></filter>
      <filter id="tz-borron"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>`;
    document.body.appendChild(s);
  }

  window.TZ = (K) => {
    defs();
    const { tl, root, el, IC } = K;
    const C = { ch: '#ece6d6', gr: '#86e3b6', am: '#e9b768', rd: '#ff8576', or: '#ff9a5c', bg: '#171e1b', dim: '#5d665f' };

    // fondo de pizarra, y el mundo (lo que la cámara mueve): un SVG de tiza y una capa HTML encima
    el('div', 'tz-bg', `<svg viewBox="0 0 1920 1080"><rect width="1920" height="1080" filter="url(#tz-polvo)"/><g filter="url(#tz-borron)" opacity=".05"><ellipse cx="500" cy="260" rx="380" ry="90" fill="${C.ch}"/><ellipse cx="1500" cy="900" rx="420" ry="70" fill="${C.ch}"/></g></svg>`, root);
    const world = el('div', 'tz-world', null, root);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('class', 'tz-svg');
    world.appendChild(svg);
    const ink = document.createElementNS(NS, 'g');
    ink.setAttribute('filter', 'url(#tz-tiza)');
    ink.setAttribute('fill', 'none');
    ink.setAttribute('stroke-linecap', 'round');
    ink.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(ink);
    const layer = el('div', 'tz-layer', null, world);
    // lo que no se mueve con la cámara (sello, títulos de pantalla)
    const fixed = el('div', 'tz-fixed', null, root);

    // ── piezas: cada una devuelve { s: [trazos SVG], h: [elementos HTML], ...anclas } ──
    // grupos: lo que se crea dentro de group() va a su propio <g> y su propia capa HTML, para moverlo o escalarlo junto
    let tgtS = ink, tgtH = layer;
    function group(fn) {
      const g = document.createElementNS(NS, 'g');
      ink.appendChild(g);
      const d = el('div', 'tz-group', null, layer);
      const ps = tgtS, ph = tgtH;
      tgtS = g; tgtH = d;
      const r = fn();
      tgtS = ps; tgtH = ph;
      return { g, d, r };
    }
    /** Mover, escalar o desvanecer un grupo entero alrededor de (ox, oy). */
    function gto(t, G, vars, ox = 960, oy = 540) {
      const { d: dur = 0.8, ease = 'power3.inOut', ...v } = vars;
      tl.to(G.g, { ...v, svgOrigin: `${ox} ${oy}`, duration: dur, ease }, t);
      tl.to(G.d, { ...v, transformOrigin: `${ox}px ${oy}px`, duration: dur, ease }, t);
    }
    const sv = (tag, attrs, parent = tgtS) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
      e.setAttribute('opacity', '0');
      parent.appendChild(e);
      return e;
    };
    const stroke = (o, c = C.ch, sw = 4) => ({ stroke: o.c ?? c, 'stroke-width': o.sw ?? sw, 'stroke-dasharray': o.dash ?? null });
    const P = (s = [], h = [], extra = {}) => ({ s, ht: h, ...extra }); // ht: los elementos HTML (h queda para el alto)
    /** Varios grupos como uno solo. */
    const join = (...items) => P(items.flatMap((i) => i.s ?? []), items.flatMap((i) => i.ht ?? []));

    /** Caja de esquinas redondeadas, repasada dos veces, con su nombre en tipografía limpia. */
    function box(x, y, w, h, t, o = {}) {
      const a = sv('rect', { x, y, width: w, height: h, rx: o.r ?? 20, ...stroke(o) });
      const b = sv('rect', { x: x + 2.5, y: y - 2, width: w - 3, height: h + 3, rx: o.r ?? 20, ...stroke(o), 'stroke-opacity': 0.4 });
      const fill = o.fill === false ? [] : [sv('rect', { x, y, width: w, height: h, rx: o.r ?? 20, fill: C.bg, stroke: 'none', class: 'tz-fill' })];
      if (fill.length) a.parentNode.insertBefore(fill[0], a);
      const hs = t ? [lab(x + w / 2, y + h / 2, t, { size: o.size ?? 38 })] : [];
      return P([...fill, a, b], hs, { x, y, w, h, c: [x + w / 2, y + h / 2], l: [x, y + h / 2], r: [x + w, y + h / 2], t: [x + w / 2, y], b: [x + w / 2, y + h] });
    }
    /** Un punto de la estrella: un círculo con relleno de pizarra. */
    function node(cx, cy, r = 46, o = {}) {
      const f = sv('circle', { cx, cy, r, fill: C.bg, stroke: 'none', class: 'tz-fill' });
      const a = sv('circle', { cx, cy, r, ...stroke(o, C.ch, 5) });
      return P([f, a], [], { cx, cy, r, c: [cx, cy] });
    }
    /** Un cilindro (una base de datos). */
    function cyl(cx, cy, w, h, o = {}) {
      const rx = w / 2, ry = h * 0.17, t = cy - h / 2 + ry, b = cy + h / 2 - ry;
      const fill = o.fill ?? C.bg;
      const body = sv('path', { d: `M${cx - rx} ${t} V${b} A${rx} ${ry} 0 0 0 ${cx + rx} ${b} V${t}`, fill, ...stroke(o, C.ch, 5), class: 'tz-fill' });
      const top = sv('ellipse', { cx, cy: t, rx, ry, fill, ...stroke(o, C.ch, 5), class: 'tz-fill' });
      const re = sv('ellipse', { cx: cx + 2, cy: t - 2, rx: rx - 2, ry, ...stroke(o, C.ch, 3), 'stroke-opacity': 0.4 });
      return P([body, top, re], [], { cx, cy, w, h, c: [cx, cy], top: t, bot: b });
    }
    const line = (x1, y1, x2, y2, o = {}) => P([sv('path', { d: `M${x1} ${y1} L${x2} ${y2}`, ...stroke(o, C.ch, 4) })]);
    const path = (d, o = {}) => P([sv('path', { d, ...stroke(o, C.ch, 4) })]);
    const circle = (cx, cy, r, o = {}) => P([sv('circle', { cx, cy, r, ...stroke(o, C.ch, 4) })]);
    const ellipse = (cx, cy, rx, ry, o = {}) => P([sv('ellipse', { cx, cy, rx, ry, transform: o.rot ? `rotate(${o.rot} ${cx} ${cy})` : null, ...stroke(o, C.ch, 4) })]);
    /** Una flecha: la línea (recta o curva) y su punta. */
    function arrow(x1, y1, x2, y2, o = {}) {
      const d = o.bend ? `M${x1} ${y1} Q${(x1 + x2) / 2 + o.bend[0]} ${(y1 + y2) / 2 + o.bend[1]} ${x2} ${y2}` : `M${x1} ${y1} L${x2} ${y2}`;
      const ang = Math.atan2(y2 - (o.bend ? (y1 + y2) / 2 + o.bend[1] : y1), x2 - (o.bend ? (x1 + x2) / 2 + o.bend[0] : x1));
      const s = o.head ?? 24, l = (k) => [x2 - s * Math.cos(ang + k), y2 - s * Math.sin(ang + k)];
      const [a1, b1] = l(0.5), [a2, b2] = l(-0.5);
      return P([sv('path', { d, ...stroke(o, C.ch, 4) }), sv('path', { d: `M${a1} ${b1} L${x2} ${y2} L${a2} ${b2}`, ...stroke(o, C.ch, o.sw ?? 5), 'stroke-dasharray': null })]);
    }
    /** Una cruz de tachado. */
    const X = (cx, cy, w, h, o = {}) => join(line(cx - w, cy - h, cx + w, cy + h, { c: C.rd, sw: 7, ...o }), line(cx + w, cy - h, cx - w, cy + h, { c: C.rd, sw: 7, ...o }));
    /** Una tarjeta con renglones (un dato, una historia, un requisito). */
    function card(x, y, w, h, o = {}) {
      const c = o.c ?? C.ch;
      const r = box(x, y, w, h, null, { r: 12, sw: 3.5, c });
      const ls = [0.32, 0.56, 0.78].map((f, i) => line(x + w * 0.1, y + h * f, x + w * (0.9 - i * 0.12), y + h * f, { c, sw: 3 }));
      return join(r, ...ls);
    }
    /** Una hoja con la esquina doblada y sus franjas (decisión, contexto, …). Devuelve la hoja y cada franja. */
    function sheet(x, y, w, h, title, franjas, o = {}) {
      const k = 50;
      const f = sv('path', { d: `M${x} ${y} H${x + w - k} L${x + w} ${y + k} V${y + h} H${x} Z`, fill: C.bg, stroke: 'none', class: 'tz-fill' });
      const out = sv('path', { d: `M${x} ${y} H${x + w - k} L${x + w} ${y + k} V${y + h} H${x} Z`, ...stroke(o, C.ch, 4) });
      const fold = sv('path', { d: `M${x + w - k} ${y} V${y + k} H${x + w}`, ...stroke(o, C.ch, 3) });
      const hs = title ? [hand(x + 28, y + 18, title, { size: o.tsize ?? 54, c: o.tc ?? C.ch })] : [];
      const top = y + (title ? 100 : 40), gap = 14, fh = (h - (top - y) - 30 - gap * (franjas.length - 1)) / franjas.length;
      const st = franjas.map((t, i) => {
        const fy = top + i * (fh + gap), fx = x + 24, fw = w - 48;
        const r = box(fx, fy, fw, fh, null, { r: 12, sw: 3, fill: false });
        const name = hand(fx + 18, fy + 6, t, { size: o.fsize ?? 44 });
        const rows = o.rows === false || (o.rows && !o.rows.includes(t)) ? 0 : Math.max(1, Math.min(3, Math.floor((fh - 60) / 22)));
        const ls = Array.from({ length: rows }, (_, j) => line(fx + 20, fy + 66 + j * 22, fx + fw - 20 - j * 40, fy + 66 + j * 22, { sw: 3, c: '#8b938c' }));
        return Object.assign(join(r, P([], [name]), ...ls), { x: fx, y: fy, w: fw, h: fh, r: [fx + fw, fy + fh / 2], l: [fx, fy + fh / 2] });
      });
      const outline = P([f, out, fold], hs);
      return Object.assign(join(outline, ...st), { st, outline, x, y, w, h });
    }
    /** Un rótulo en tipografía limpia, centrado en (x, y). */
    function lab(x, y, t, o = {}) {
      // centrado con una caja flex ancha: sin translate, para que los tweens de GSAP no lo pisen
      const H = (o.size ?? 38) * 2;
      const e = el('div', 'tz-lab', t, o.fixed ? fixed : tgtH);
      e.setAttribute('data-layout-allow-overflow', '');
      e.style.cssText = `left:${x - 1200}px;top:${y - H / 2}px;width:2400px;height:${H}px;font-size:${o.size ?? 38}px;${o.c ? `color:${o.c};` : ''}${o.style ?? ''}`;
      e.style.opacity = 0;
      return e;
    }
    /** Una anotación a mano. anchor: 'l' (x es el borde izquierdo, por defecto) o 'c' (x es el centro). */
    function hand(x, y, t, o = {}) {
      const e = el('div', `tz-hand ${o.anchor === 'c' ? 'tz-hand--c' : ''}`, t, o.fixed ? fixed : tgtH);
      e.style.cssText = `left:${x}px;top:${y}px;font-size:${o.size ?? 56}px;color:${o.c ?? C.ch};${o.style ?? ''}`;
      e.style.opacity = 0;
      return e;
    }
    const label = (x, y, t, o) => P([], [lab(x, y, t, o)]);
    const note = (x, y, t, o) => P([], [hand(x, y, t, o)]);
    /** Un ícono de Lucide dibujado en tiza, centrado en (cx, cy). */
    function icon(name, cx, cy, size, o = {}) {
      const g = sv('g', { transform: `translate(${cx - size / 2} ${cy - size / 2}) scale(${size / 24})` });
      g.setAttribute('filter', 'none');
      g.setAttribute('opacity', '1');
      g.innerHTML = (IC[name] || '').replace(/^<svg[^>]*>|<\/svg>$/g, '');
      const parts = [...g.querySelectorAll('path,circle,rect,line,polyline,ellipse,polygon')];
      parts.forEach((p) => { p.setAttribute('stroke', o.c ?? C.ch); p.setAttribute('stroke-width', (o.sw ?? 4) * (24 / size)); p.setAttribute('fill', 'none'); p.setAttribute('opacity', '0'); });
      return P(parts);
    }

    /** La estrella en miniatura, con la marca de una de sus consecuencias. kind: gana | cambio | dato | cae */
    function mini(cx, cy, kind, k = 1) {
      const P = [[-82, -52], [82, -52], [-82, 52], [82, 52]].map(([a, b]) => [cx + a * k, cy + b * k]);
      const c = { gana: C.gr, cambio: C.am, dato: C.ch, cae: C.rd }[kind];
      const parts = [
        ...P.map(([x, y]) => line(x, y, cx, cy, { c: kind === 'cae' ? '#8b938c' : '#c9c3b4', sw: 3, dash: kind === 'cae' ? '6 9' : null })),
        cyl(cx, cy, 58 * k, 46 * k, { c, sw: 3.5 }),
        ...P.map(([x, y]) => node(x, y, 13 * k, { c: kind === 'cambio' ? C.am : C.ch, sw: 3 })),
      ];
      if (kind === 'gana') P.forEach(([x, y]) => { const gx = x + (x < cx ? -34 : 34) * k; parts.push(cyl(gx, y, 26 * k, 22 * k, { c: '#8b938c', sw: 2.5 }), X(gx, y, 16 * k, 14 * k, { c: '#8b938c', sw: 2.5 })); });
      if (kind === 'cambio') parts.push(ellipse(cx, cy, 58 * k, 40 * k, { c: C.am, sw: 2.5 }), ellipse(cx, cy, 84 * k, 58 * k, { c: C.am, sw: 2.5 }));
      if (kind === 'dato') parts.push(arrow(P[0][0], P[0][1], cx - 14 * k, cy - 8 * k, { c: C.am, sw: 3.5, head: 12 }), arrow(P[1][0], P[1][1], cx + 14 * k, cy - 8 * k, { c: C.am, sw: 3.5, head: 12 }), path(`M${cx - 6 * k} ${cy - 10 * k} l${7 * k} ${9 * k} l${-5 * k} ${6 * k} l${8 * k} ${8 * k}`, { c: C.rd, sw: 3.5 }));
      if (kind === 'cae') parts.push(X(cx, cy, 38 * k, 30 * k, { c: C.rd, sw: 4.5 }));
      return join(...parts);
    }

    // ── comportamientos ──
    const items = (x) => (Array.isArray(x) ? x : [x]);
    const svgs = (x) => items(x).flatMap((i) => i.s ?? []);
    const htmls = (x) => items(x).flatMap((i) => i.ht ?? []);
    const isFill = (e) => e.classList && e.classList.contains('tz-fill') && e.getAttribute('stroke') === 'none';
    /** Trazar: los trazos se dibujan de punta a punta, los rellenos aparecen, los rótulos se escriben de izquierda a derecha. */
    function draw(t, x, o = {}) {
      const d = o.d ?? 0.7, st = o.st ?? 0;
      items(x).forEach((it, k) => {
        const tt = t + k * st;
        (it.s ?? []).forEach((e) => {
          // los rellenos llegan cuando el trazo ya empezó: si no, una hoja grande se ve un instante como un rectángulo negro
          if (isFill(e)) { tl.fromTo(e, { opacity: 0 }, { opacity: 1, duration: d * 0.5, ease: 'power1.out', immediateRender: false }, tt + d * 0.45); return; }
          if (e.getAttribute('stroke-dasharray')) { tl.fromTo(e, { opacity: 0 }, { opacity: 1, duration: d * 0.6, ease: 'power1.out', immediateRender: false }, tt); return; }
          e.setAttribute('pathLength', '1');
          // la opacidad se fija con un set propio: un valor que solo está en el "from" no se aplica siempre al renderizar saltando entre cuadros
          tl.set(e, { opacity: 1, attr: { 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 } }, tt);
          tl.to(e, { attr: { 'stroke-dashoffset': 0 }, duration: d, ease: 'power2.inOut' }, tt);
        });
        (it.ht ?? []).forEach((e) => {
          if (e.classList.contains('tz-hand')) { tl.set(e, { opacity: 1, clipPath: 'inset(-20% 100% -20% -12%)' }, tt + d * 0.2); tl.to(e, { clipPath: 'inset(-20% -12% -20% -12%)', duration: Math.max(0.5, d), ease: 'power1.inOut' }, tt + d * 0.2); }
          else tl.fromTo(e, { opacity: 0, y: 6 }, { opacity: o.op ?? 1, y: 0, duration: 0.45, ease: 'power2.out', immediateRender: false }, tt + d * 0.3);
        });
      });
    }
    /** Mostrar sin trazar (lo que ya estaba dibujado y vuelve, o lo que aparece de golpe). */
    function show(t, x, o = {}) {
      const all = [...svgs(x), ...htmls(x)];
      all.forEach((e) => { if (e.getAttribute && e.getAttribute('pathLength')) tl.set(e, { attr: { 'stroke-dashoffset': 0 } }, t); if (e.classList && e.classList.contains('tz-hand')) tl.set(e, { clipPath: 'inset(-20% -12% -20% -12%)' }, t); });
      tl.to(all, { opacity: o.op ?? 1, duration: o.d ?? 0.4, ease: 'power1.out' }, t);
    }
    /** Borrar: se va con un leve corrimiento, como un borrador. */
    function erase(t, x, o = {}) {
      const all = [...svgs(x), ...htmls(x)];
      if (all.length) tl.to(all, { opacity: 0, duration: o.d ?? 0.45, ease: 'power1.in' }, t);
    }
    /** Repasar en otro color (trazos) y teñir los rótulos. */
    function color(t, x, c, o = {}) {
      const s = svgs(x).filter((e) => !isFill(e) && e.getAttribute('stroke') && e.getAttribute('stroke') !== 'none');
      if (s.length) tl.to(s, { attr: { stroke: c }, duration: o.d ?? 0.4, ease: 'power1.inOut' }, t);
      const h = htmls(x);
      if (h.length && o.labels !== false) tl.to(h, { color: c, duration: o.d ?? 0.4 }, t);
    }
    /** Bajar de intensidad (o volver: op 1). */
    function dim(t, x, op = 0.35, d = 0.4) {
      const all = [...svgs(x), ...htmls(x)];
      if (all.length) tl.to(all, { opacity: op, duration: d, ease: 'power1.inOut' }, t);
    }
    /** Mover piezas (dx, dy) sin escalarlas. */
    function move(t, x, dx, dy, o = {}) {
      const all = [...svgs(x), ...htmls(x)];
      tl.to(all, { x: `+=${dx}`, y: `+=${dy}`, duration: o.d ?? 0.9, ease: o.ease ?? 'power3.inOut' }, t);
    }
    /** Cámara: acercarse a un rectángulo [x, y, w, h] (unas 1,6 veces como mucho) o volver al cuadro entero (null). */
    function cam(t, r, d = 1.1) {
      let v = { x: 0, y: 0, scale: 1 };
      if (r) {
        const [x, y, w, h] = r, s = Math.min(1920 / w, 1080 / h);
        v = { x: 960 - (x + w / 2) * s, y: 540 - (y + h / 2) * s, scale: s };
      }
      tl.to(world, { ...v, transformOrigin: '0 0', duration: d, ease: 'power3.inOut' }, t);
    }
    /** El barrido del borrador: una banda clara cruza la pantalla y deja la pizarra limpia. */
    function sweep(t, d = 0.7) {
      const e = el('div', 'tz-sweep', null, root);
      e.style.opacity = 0;
      tl.set(e, { x: -900, opacity: 1 }, t);
      tl.to(e, { x: 2100, duration: d, ease: 'power1.inOut' }, t);
      tl.set(e, { opacity: 0 }, t + d);
    }
    /** El sello del caso, arriba a la izquierda (fijo, fuera de la cámara). */
    function seal(t, name, ic, hasta) {
      const e = el('div', 'tz-seal', `${IC[ic] || ''}<span>${name}</span>`, fixed);
      e.style.opacity = 0;
      tl.to(e, { opacity: 1, duration: 0.4 }, t);
      if (hasta != null) tl.to(e, { opacity: 0, duration: 0.4 }, hasta);
      return e;
    }

    // ── el mundo de cada caso, en tiza ──
    const MUNDOS = {
      clearview: (cx, cy) => {
        const a = [
          box(cx - 470, cy - 230, 330, 430, null, { r: 16 }), circle(cx - 395, cy - 140, 46, { c: C.or, sw: 5 }),
          line(cx - 325, cy - 160, cx - 175, cy - 160, { sw: 6 }), line(cx - 325, cy - 120, cx - 215, cy - 120, { sw: 5 }),
          ...[0, 1, 2, 3].map((i) => line(cx - 435, cy - 30 + i * 50, cx - 185 - (i % 2) * 50, cy - 30 + i * 50, { sw: 4, c: '#a9b0a8' })),
        ];
        const b = [arrow(cx - 110, cy, cx + 70, cy, { c: C.or, sw: 6, head: 30 })];
        const c = [
          box(cx + 120, cy - 230, 330, 430, null, { r: 16 }), circle(cx + 195, cy - 140, 46, { dash: '9 9', c: '#8b938c' }),
          ...[0, 1, 2, 3].map((i) => line(cx + 155, cy - 30 + i * 50, cx + 405 - (i % 2) * 50, cy - 30 + i * 50, { sw: 4, c: '#a9b0a8' })),
        ];
        const t1 = note(cx + 255, cy - 175, 'historia', { size: 44, c: C.or });
        return { parts: [join(...a), join(...b), join(...c, t1)], title: note(cx, cy + 250, 'ClearView', { size: 72, anchor: 'c', c: C.or }) };
      },
      monitorme: (cx, cy) => {
        const scr = [box(cx - 400, cy - 260, 800, 470, null, { r: 26, sw: 5 }), box(cx - 370, cy - 230, 740, 410, null, { r: 14, sw: 3 }), line(cx, cy + 210, cx, cy + 270, { sw: 6 }), line(cx - 140, cy + 275, cx + 140, cy + 275, { sw: 6 })];
        const w = (y0, amp, c) => path(`M${cx - 340} ${y0} h90 l20 ${-amp} l26 ${amp * 2} l20 ${-amp} h110 l20 ${-amp} l26 ${amp * 2} l20 ${-amp} h110 l20 ${-amp} l26 ${amp * 2} l20 ${-amp} h120`, { c, sw: 5 });
        const curves = [w(cy - 130, 40, C.gr), w(cy - 10, 26, '#9cc3ff'), w(cy + 100, 22, C.ch)];
        return { parts: [join(...scr), join(...curves)], title: note(cx, cy + 300, 'MonitorMe', { size: 72, anchor: 'c', c: C.or }) };
      },
      mobilitycorp: (cx, cy) => {
        const sc = [
          circle(cx - 330, cy + 120, 70, { sw: 7 }), circle(cx + 30, cy + 120, 70, { sw: 7 }),
          path(`M${cx - 330} ${cy + 120} L${cx - 200} ${cy + 120} L${cx - 10} ${cy + 120}`, { sw: 8 }),
          path(`M${cx + 10} ${cy + 120} L${cx - 60} ${cy - 200} L${cx - 130} ${cy - 210}`, { sw: 8 }),
          line(cx - 60, cy - 200, cx, cy - 210, { sw: 8 }), line(cx - 290, cy + 92, cx - 60, cy + 92, { sw: 18, c: '#5d665f' }),
        ];
        const ph = [box(cx + 210, cy - 250, 200, 360, null, { r: 30, sw: 5 }), box(cx + 232, cy - 210, 156, 250, null, { r: 12, sw: 3 }), circle(cx + 310, cy - 85, 34, { c: C.or, sw: 5 })];
        const flash = [line(cx + 210, cy - 140, cx + 80, cy - 40, { c: C.or, sw: 4, dash: '10 12' }), ...[[-40, -30], [-10, -60], [-60, -70]].map(([a, b]) => circle(cx + 190 + a, cy - 150 + b, 6, { c: '#ffd27a', sw: 5 }))];
        return { parts: [join(...sc), join(...ph), join(...flash)], title: note(cx, cy + 250, 'MobilityCorp', { size: 72, anchor: 'c', c: C.or }) };
      },
      // un refrigerador inteligente con puerta de vidrio, comidas en sus estantes y la pantallita de retiro
      farmacy: (cx, cy) => {
        const body = [box(cx - 180, cy - 290, 360, 520, null, { r: 24, sw: 5 }), box(cx - 150, cy - 260, 300, 380, null, { r: 12, sw: 3, fill: false })];
        const meals = [];
        [-170, -50, 70].forEach((dy, r) => {
          meals.push(line(cx - 140, cy + dy + 50, cx + 140, cy + dy + 50, { sw: 3, c: '#8b938c' }));
          [-100, 0, 100].forEach((dx, i) => meals.push(box(cx + dx - 38, cy + dy, 76, 46, null, { r: 8, sw: 3.5, c: [C.gr, C.or, '#9cc3ff'][(i + r) % 3] })));
        });
        const panel = [box(cx - 130, cy + 150, 150, 54, null, { r: 8, sw: 3 }), line(cx - 110, cy + 177, cx - 30, cy + 177, { sw: 5, c: C.gr }), box(cx + 50, cy + 154, 80, 46, null, { r: 8, sw: 3, c: C.or })];
        return { parts: [join(...body), join(...meals), join(...panel)], title: note(cx, cy + 260, 'Farmacy Food', { size: 72, anchor: 'c', c: C.or }) };
      },
      // el soporte técnico: un sistema de una sola pieza y la pila de tickets que se le cae
      sysops: (cx, cy) => {
        const mono = [box(cx - 420, cy - 170, 340, 340, null, { r: 20, sw: 5 }), label(cx - 250, cy, 'monolito', { size: 40, c: '#c9c3b4' })];
        const tk = (x, y, rot, c = C.ch) => { const g = [box(x, y, 230, 70, null, { r: 10, sw: 3.5 }), line(x + 20, y + 26, x + 140, y + 26, { sw: 4, c: '#a9b0a8' }), circle(x + 200, y + 35, 11, { c, sw: 4 })]; return join(...g); };
        const pila = [tk(cx + 20, cy + 60, 0, C.or), tk(cx + 30, cy - 20, 0), tk(cx + 14, cy - 100, 0), tk(cx + 70, cy + 160, 0, C.rd)];
        const auri = [path(`M${cx - 330} ${cy - 220} a80 80 0 0 1 160 0`, { sw: 7, c: '#9cc3ff' }), box(cx - 350, cy - 225, 34, 60, null, { r: 10, sw: 4, c: '#9cc3ff' }), box(cx - 184, cy - 225, 34, 60, null, { r: 10, sw: 4, c: '#9cc3ff' })];
        return { parts: [join(...mono), join(...pila), join(...auri)], title: note(cx, cy + 270, 'Sysops Squad', { size: 72, anchor: 'c', c: C.or }) };
      },
      // la comunidad de salud: el refrigerador chico, personas alrededor y lo que comparten (foro, agenda, datos médicos)
      family: (cx, cy) => {
        const nev = [box(cx - 90, cy - 150, 180, 260, null, { r: 16, sw: 4 }), line(cx - 70, cy - 60, cx + 70, cy - 60, { sw: 3, c: '#8b938c' }), line(cx - 70, cy + 20, cx + 70, cy + 20, { sw: 3, c: '#8b938c' })];
        const per = (x, y) => join(circle(x, y - 26, 22, { sw: 4 }), path(`M${x - 38} ${y + 40} q38 -52 76 0`, { sw: 4 }));
        const gente = [per(cx - 300, cy - 120), per(cx + 300, cy - 120), per(cx - 300, cy + 130), per(cx + 300, cy + 130)];
        const cosas = [
          box(cx - 250, cy - 290, 160, 80, null, { r: 18, sw: 3.5, c: '#9cc3ff' }), path(`M${cx - 220} ${cy - 210} l-12 26 l34 -26`, { sw: 3.5, c: '#9cc3ff' }),
          box(cx + 90, cy - 290, 140, 110, null, { r: 10, sw: 3.5, c: C.gr }), line(cx + 90, cy - 255, cx + 230, cy - 255, { sw: 3.5, c: C.gr }),
          path(`M${cx} ${cy + 250} c-60 -40 -60 -90 0 -60 c60 -30 60 20 0 60`, { sw: 4, c: C.or }),
        ];
        return { parts: [join(...nev), join(...gente), join(...cosas)], title: note(cx, cy + 290, 'Farmacy Family', { size: 72, anchor: 'c', c: C.or }) };
      },
      // una tienda en línea con su asistente: la pantalla de la tienda, productos y un globo de conversación
      shopwise: (cx, cy) => {
        const tienda = [box(cx - 380, cy - 250, 560, 420, null, { r: 18, sw: 5 }), line(cx - 380, cy - 180, cx + 180, cy - 180, { sw: 4 }), ...[0, 1, 2].map((i) => circle(cx - 350 + i * 26, cy - 215, 7, { sw: 3 }))];
        const prods = [0, 1, 2, 3, 4, 5].map((i) => box(cx - 350 + (i % 3) * 170, cy - 150 + Math.floor(i / 3) * 150, 140, 120, null, { r: 10, sw: 3.5, c: [C.gr, '#9cc3ff', C.ch][i % 3] }));
        const chat = [box(cx + 120, cy - 70, 300, 150, null, { r: 30, sw: 5, c: C.or }), path(`M${cx + 170} ${cy + 80} l-20 50 l70 -50`, { sw: 5, c: C.or }), ...[0, 1].map((i) => line(cx + 160, cy - 30 + i * 40, cx + 380 - i * 60, cy - 30 + i * 40, { sw: 5, c: C.or }))];
        return { parts: [join(...tienda), join(...prods), join(...chat)], title: note(cx, cy + 240, 'ShopWise', { size: 72, anchor: 'c', c: C.or }) };
      },
      // una plataforma de empleo: un foco que ilumina a una persona y un maletín
      spotlight: (cx, cy) => {
        const foco = [path(`M${cx - 330} ${cy - 250} l90 -40 l40 90 l-90 40 z`, { sw: 5 }), line(cx - 300, cy - 160, cx - 330, cy - 90, { sw: 5 })];
        const luz = [path(`M${cx - 200} ${cy - 210} L${cx + 40} ${cy + 220} M${cx - 150} ${cy - 250} L${cx + 300} ${cy + 220}`, { sw: 3, c: '#ffd27a', dash: '10 12' }), ellipse(cx + 170, cy + 230, 170, 34, { sw: 3, c: '#ffd27a' })];
        const persona = [circle(cx + 170, cy + 20, 44, { sw: 5 }), path(`M${cx + 90} ${cy + 200} q80 -140 160 0`, { sw: 5 }), box(cx + 280, cy + 110, 110, 80, null, { r: 10, sw: 4, c: C.or }), path(`M${cx + 310} ${cy + 110} v-18 h50 v18`, { sw: 4, c: C.or })];
        return { parts: [join(...foco), join(...luz), join(...persona)], title: note(cx, cy + 300, 'Spotlight', { size: 72, anchor: 'c', c: C.or }) };
      },
      // cámaras en la naturaleza: un árbol con una cámara atada, su batería, y un animal que pasa
      wildlife: (cx, cy) => {
        const arbol = [path(`M${cx - 260} ${cy + 240} L${cx - 250} ${cy - 60} M${cx - 190} ${cy + 240} L${cx - 200} ${cy - 60}`, { sw: 6 }),
          path(`M${cx - 225} ${cy - 40} c-200 10 -190 -210 -40 -200 c40 -110 210 -60 160 50 c110 40 40 170 -120 150`, { sw: 5, c: C.gr })];
        const cam = [box(cx - 290, cy + 20, 130, 100, null, { r: 12, sw: 5, c: C.or }), circle(cx - 225, cy + 70, 26, { sw: 5, c: C.or }),
          line(cx - 300, cy + 40, cx - 150, cy + 40, { sw: 3, c: '#8b938c' }), line(cx - 300, cy + 100, cx - 150, cy + 100, { sw: 3, c: '#8b938c' }),
          box(cx - 140, cy + 40, 36, 64, null, { r: 6, sw: 3.5 }), line(cx - 132, cy + 90, cx - 112, cy + 90, { sw: 6, c: C.am })];
        const ciervo = [ellipse(cx + 200, cy + 70, 115, 45, { sw: 5, c: '#c9c3b4' }),
          path(`M${cx + 120} ${cy + 100} l-8 130 M${cx + 160} ${cy + 110} l0 120 M${cx + 240} ${cy + 110} l0 120 M${cx + 280} ${cy + 100} l8 130 M${cx + 300} ${cy + 50} l40 -90`, { sw: 5, c: '#c9c3b4' }),
          ellipse(cx + 360, cy - 50, 34, 20, { sw: 5, c: '#c9c3b4' }),
          path(`M${cx + 340} ${cy - 66} l-20 -60 m10 30 l-30 -10 M${cx + 360} ${cy - 68} l20 -60 m-10 30 l30 -10`, { sw: 4, c: '#c9c3b4' }),
          line(cx - 160, cy + 70, cx + 60, cy + 90, { sw: 3, c: '#ffd27a', dash: '8 10' })];
        return { parts: [join(...arbol), join(...cam), join(...ciervo)], title: note(cx, cy + 300, 'Wildlife Watcher', { size: 72, anchor: 'c', c: C.or }) };
      },
    };
    /** El mundo del caso: se dibuja desde t, y a "hasta" se achica hacia el sello y queda el sello. */
    function mundo(t, key, hasta, o = {}) {
      const cx = o.cx ?? 960, cy = o.cy ?? 500;
      const G = group(() => MUNDOS[key](cx, cy));
      G.r.parts.forEach((p, i) => draw(t + i * (o.st ?? 0.7), p, { d: 0.8 }));
      draw(t + 0.4, G.r.title);
      gto(hasta, G, { x: 140 - cx, y: 60 - cy, scale: 0.12, opacity: 0, d: 0.8, ease: 'power3.in' }, cx, cy);
      return G;
    }

    /** El mapa del curso en tiza: el camino del acto 1, las diez regiones del acto 2 y el cierre. Lo anterior a n, relleno;
     *  n, en naranja. Aparece en t (lo que no es n, casi de una; n se traza). titulo y sub: arriba, opcionales. */
    function mapa(t, n, titulo, sub) {
      const y = 640, x0 = 170, dx = 132;
      const st = [0, 1, 2, 3, 4, 5].map((i) => {
        const done = i < n, here = i === n;
        const c = circle(x0 + i * dx, y, 42, { c: here ? C.or : C.ch, sw: here ? 6 : 4, dash: done || here ? null : '8 10' });
        if (done) c.s.push(sv('circle', { cx: x0 + i * dx, cy: y, r: 30, fill: '#8b938c', stroke: 'none', class: 'tz-fill' }));
        if (here) c.s.push(sv('circle', { cx: x0 + i * dx, cy: y, r: 30, fill: C.or, stroke: 'none', class: 'tz-fill' }));
        return c;
      });
      const links = [0, 1, 2, 3, 4].map((i) => line(x0 + i * dx + 46, y, x0 + (i + 1) * dx - 46, y, { sw: 3, c: '#8b938c' }));
      const regs = Array.from({ length: 10 }, (_, i) => box(1000 + (i % 5) * 116, 560 + Math.floor(i / 5) * 116, 96, 96, null, { r: 12, sw: 3, dash: n === 6 + i ? null : '8 10', c: n === 6 + i ? C.or : C.ch, fill: false }));
      const cierre = circle(1680, y, 42, { dash: n === 16 ? null : '8 10', c: n === 16 ? C.or : C.ch });
      const ks = [note(x0 - 40, 480, 'acto 1 · cómo se decide', { size: 40, c: '#a9b0a8' }), note(1000, 480, 'acto 2 · el territorio', { size: 40, c: '#a9b0a8' }), note(1640, 480, 'cierre', { size: 40, c: '#a9b0a8' })];
      const ts = titulo ? [label(960, 230, titulo, { size: 96, style: 'font-weight:820;letter-spacing:-.03em' })] : [];
      if (sub) ts.push(label(960, 320, sub, { size: 44, c: '#c9c3b4', style: 'font-weight:500' }));
      show(t, join(...st.filter((_, i) => i !== n), ...links, ...regs, cierre, ...ks, ...ts), { d: 0.35 });
      if (n <= 5) draw(t + 0.3, st[n], { d: 0.6 });
      return { all: join(...st, ...links, ...regs, cierre, ...ks, ...ts), station: (i) => [x0 + i * dx, y] };
    }
    /** El tramo del mapa de un bloque del acto 2 (PLAN-CURSO.md, "El mapa como pieza visual"): las diez regiones arriba,
     *  la del bloque n en naranja, y debajo una tarjeta por familia con lo que gana (verde) y lo que paga (ámbar).
     *  fams: [{ t: 'grafo', g: 'datos muy conectados', p: 'otra tecnología' }]. No dibuja nada: devuelve las piezas
     *  { regiones, aqui, cards, ring(i) } para que la composición las trace al ritmo de la voz. */
    const REGIONES = ['guardar datos', 'mover y procesar', 'dónde corre', 'el borde', 'cuando algo falla', 'identidad y sensibles', 'ver qué pasa', 'comprar y construir', 'IA en el sistema', 'cambiar sin romper'];
    function region(n, fams, o = {}) {
      const y0 = o.y ?? 130, rw = 300, rh = 84, gx = 324;
      const boxes = REGIONES.map((t, i) => {
        const x = 160 + (i % 5) * gx, y = y0 + Math.floor(i / 5) * (rh + 20), here = 6 + i === n;
        return join(box(x, y, rw, rh, null, { r: 14, sw: here ? 5 : 3, c: here ? C.or : '#8b938c', fill: !here ? false : undefined }), label(x + rw / 2, y + rh / 2, t, { size: 28, c: here ? C.or : '#a9b0a8', style: here ? 'font-weight:700' : '' }));
      });
      const aquiIdx = n - 6;
      const regiones = join(...boxes.filter((_, i) => i !== aquiIdx));
      const k = fams.length, cy = o.cy ?? 400, ch = o.ch ?? 420, gap = 30, cw = Math.min(520, (1600 - gap * (k - 1)) / k), x0 = 960 - (k * cw + (k - 1) * gap) / 2;
      const cards = fams.map((f, i) => {
        const x = x0 + i * (cw + gap);
        const fr = box(x, cy, cw, ch, null, { r: 20, sw: 4 });
        const tt = label(x + cw / 2, cy + 64, f.t, { size: 42, style: 'font-weight:800' });
        const g = label(x + cw / 2, cy + 190, `<span style="text-align:center;line-height:1.25">gana<br><b style="font-weight:700">${f.g}</b></span>`, { size: 30, c: C.gr });
        const p = label(x + cw / 2, cy + 320, `<span style="text-align:center;line-height:1.25">paga<br><b style="font-weight:700">${f.p}</b></span>`, { size: 30, c: C.am });
        return Object.assign(join(fr, tt, g, p), { frame: fr, x, y: cy, w: cw, h: ch });
      });
      const ring = (i) => box(cards[i].x - 10, cy - 10, cards[i].w + 20, ch + 20, null, { r: 26, sw: 5, c: C.or, fill: false });
      return { regiones, aqui: boxes[aquiIdx], cards, ring };
    }
    /** Estás aquí: el mapa del curso antes de la primera palabra; a "hasta" se barre. */
    function aqui(n, hasta, sub) {
      const m = mapa(0, n, n === 0 ? 'Apertura' : n === 16 ? 'Cierre' : 'Bloque ' + n, sub);
      sweep(hasta - 0.35);
      erase(hasta, m.all, { d: 0.2 });
      return m.all;
    }

    return { C, svg, world, layer, fixed, group, gto, mini, mapa, region, box, node, cyl, line, path, circle, ellipse, arrow, X, card, sheet, lab, hand, label, note, icon, join, draw, show, erase, color, dim, move, cam, sweep, seal, mundo, aqui };
  };
})();
