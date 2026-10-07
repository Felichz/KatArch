/* Chapter 10: the decision map, shared by the scenes that show it (core, physical, budget, mother, doors, money).
 * Ten decisions in three pillar zones, the structural core in the middle; solid wires say a decision led to another,
 * the dashed one joins the queue and event sourcing on the money path. Mirrors the course's map-board scene (src/visuals/ch10.tsx). */
window.MAP = (() => {
  const ZW = 520, ZY = 150, ZH = 630, NW = 440, NH = 88;
  const ZONES = [
    { p: 2, x: 130, title: 'La realidad física y la privacidad' },
    { p: 1, x: 700, title: 'El núcleo estructural' },
    { p: 3, x: 1270, title: 'Operación, escala y presupuesto' },
  ];
  const TONE = { 1: 'cmp', 2: 'user', 3: 'evt' };
  // each decision, re-anchored: the problem it solved and the answer, in the words the narration uses (src/content/decision-map.ts)
  const D = {
    privacy: { p: 2, cy: 280, t: 'Feedback propio', ic: 'shieldCheck', ch: 9, adr: '010', prob: 'Las opiniones de los clientes tocan datos de salud', ans: 'Un sistema propio: los datos no salen de la plataforma' },
    'pin-offline': { p: 2, cy: 470, t: 'PIN offline', ic: 'key', ch: 6, adr: '011', prob: 'Un refrigerador se queda sin señal', ans: 'Valida un código que recibió antes, con señal' },
    'catalog-cache': { p: 2, cy: 660, t: 'Catálogo local', ic: 'phone', ch: 6, adr: '012 + 013', prob: 'El stock de los refrigeradores llega tarde', ans: 'Un catálogo en el teléfono, y el stock real al pagar' },
    monolith: { p: 1, cy: 280, t: 'Monolito modular', ic: 'boxes', ch: 4, adr: '002', prob: '¿Cómo organizar el sistema con un equipo pequeño?', ans: 'Una sola aplicación, con módulos de fronteras estrictas' },
    'event-sourcing': { p: 1, cy: 470, t: 'Event sourcing', ic: 'doc', ch: 6, adr: '007', prob: 'Un cliente reclama un cobro', ans: 'Cada orden, una historia de hechos que nunca se borra' },
    rabbitmq: { p: 1, cy: 660, t: 'Cola con acuse', ic: 'mailCheck', ch: 6, adr: '008', prob: 'El mensaje de cobro no puede perderse', ans: 'Espera en la cola hasta que pagos confirma' },
    datadog: { p: 3, cy: 280, t: 'Monitoreo alquilado', ic: 'activity', ch: 9, adr: '003', prob: 'Medir es obligatorio, y mantener lo gratis cuesta horas', ans: 'Las mediciones, con DataDog, un servicio pago' },
    'edge-auth': { p: 3, cy: 407, t: 'Identidad en el borde', ic: 'idCard', ch: 8, adr: '006', prob: '¿Dónde se valida quién es el usuario?', ans: 'Una vez, en la puerta. Adentro, confianza cero' },
    'scale-up': { p: 3, cy: 533, t: 'Escala vertical', ic: 'server', ch: 8, adr: '014', prob: '¿Cómo crecer con poca carga?', ans: 'Primero una máquina más grande; después, más copias' },
    payment: { p: 3, cy: 660, t: 'Fachada de pagos', ic: 'card', ch: 5, adr: '009', prob: 'No quedar atado a un proveedor de pagos', ans: 'Las órdenes le hablan a una pieza propia' },
  };
  // the five decisions that solve today's volume and write down their exit (the course's "doors" thread)
  const DOORS = ['monolith', 'event-sourcing', 'edge-auth', 'scale-up', 'payment'];
  const LEAD = { 'm-dd': ['monolith', 'datadog'], 'm-ea': ['monolith', 'edge-auth'], 'm-su': ['monolith', 'scale-up'], 'cc-rmq': ['catalog-cache', 'rabbitmq'], 'rmq-pay': ['rabbitmq', 'payment'] };
  const SAME = { 'es-rmq': ['event-sourcing', 'rabbitmq'] };

  /** Lays the map out in `parent`.
   *  `o.show`: already on screen when the scene starts; `o.links`: the wires already drawn;
   *  `o.only`: the pillars to build (default all); `o.zx`: a zone's x, overridden ({ 3: 130 } puts pillar 3 on the left). */
  function build(K, parent, pre, o = {}) {
    const shown = new Set(o.links ?? []);
    const only = new Set(o.only ?? [1, 2, 3]);
    const zx = (p) => o.zx?.[p] ?? ZONES.find((z) => z.p === p).x;
    const L = (id) => [zx(D[id].p) + (ZW - NW) / 2, D[id].cy];
    const R = (id) => [zx(D[id].p) + (ZW + NW) / 2, D[id].cy];
    const B = (id) => [zx(D[id].p) + ZW / 2, D[id].cy + NH / 2];
    const T = (id) => [zx(D[id].p) + ZW / 2, D[id].cy - NH / 2];
    const layer = K.el('div', 'layer', null, parent);
    const zones = {};
    ZONES.filter((z) => only.has(z.p)).forEach((z) => {
      const e = K.el('div', `mzone mzone--${z.p} ${o.show ? '' : 'pop'}`, `<span class="mzone__on" style="opacity:0"></span><span class="mzone__h"><i>Pilar ${z.p}</i>${z.title}</span>`, layer);
      e.id = `${pre}-z${z.p}`;
      e.style.cssText = `left:${zx(z.p)}px;top:${ZY}px;width:${ZW}px;height:${ZH}px`;
      zones[z.p] = e;
    });
    const svg = K.sv('svg', { class: 'wires', viewBox: '0 0 1920 1080' }, layer);
    const W = {};
    const S = {};
    if (only.size === 3) {
      for (const [k, [a, b]] of Object.entries(LEAD)) {
        W[k] = K.wire(svg, R(a), L(b), `wire--lead`, D[a].cy === D[b].cy);
        if (shown.has(k)) W[k].p.setAttribute('stroke-dashoffset', 0);
      }
      for (const [k, [a, b]] of Object.entries(SAME)) {
        const [x0, y0] = B(a), [, y1] = T(b);
        S[k] = K.sv('path', { d: `M${x0} ${y0 + 4} L${x0} ${y1 - 4}`, class: 'map-same', opacity: shown.has(k) ? 1 : 0 }, svg);
      }
    }
    const N = {};
    for (const [id, d] of Object.entries(D)) {
      if (!only.has(d.p)) continue;
      const n = K.node(layer, { x: L(id)[0], y: d.cy - NH / 2, w: NW, h: NH, icon: d.ic, title: d.t, sub: `cap. ${d.ch} · ADR ${d.adr}`, tone: TONE[d.p], id: `${pre}-n-${id}` });
      n.e.classList.add('mnode');
      if (o.show) n.e.classList.remove('pop');
      n.on = K.el('span', 'mon', null, n.e);
      n.on.style.opacity = 0;
      if (o.doors && DOORS.includes(id)) {
        n.door = K.el('span', 'mdoor pop', K.IC.doorOpen, n.e);
      }
      N[id] = n;
    }
    // the map carries over from one scene to the next: during the cross-fade the same map sits on top of itself, on purpose
    layer.querySelectorAll('*').forEach((e) => e.setAttribute('data-layout-allow-overlap', ''));
    return { layer, zones, svg, N, W, S };
  }

  /** The decision cards beside a pillar: one per decision, all in the same spot, each with its problem and its answer. */
  function fichas(K, parent, pre, ids, o = {}) {
    const x = o.x ?? 760, y = o.y ?? 196, w = o.w ?? 1030;
    const out = {};
    ids.forEach((id) => {
      const d = D[id];
      const c = K.el('div', `card ficha ficha--${TONE[d.p]} pop`, `
        <div class="ficha__hd"><span class="ficha__ic">${K.IC[d.ic]}</span><span class="ficha__t"><i>Capítulo ${d.ch} · ADR ${d.adr}</i><b>${d.t}</b></span></div>
        <div class="ficha__row pop"><h5>El problema</h5><p>${d.prob}</p></div>
        <div class="ficha__row ficha__row--ans pop"><h5>La respuesta</h5><p>${d.ans}</p></div>`, parent);
      c.id = `${pre}-f-${id}`;
      c.style.cssText = `left:${x}px;top:${y}px;width:${w}px`;
      c.setAttribute('data-layout-allow-overlap', '');
      const [p, a] = c.querySelectorAll('.ficha__row');
      out[id] = { c, p, a };
    });
    return out;
  }
  return { build, fichas, D, ZONES, DOORS };
})();
