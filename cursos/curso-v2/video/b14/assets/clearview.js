// El diagrama maestro de ClearView (GUIA-VISUAL.md, "El diagrama que crece"): se dibuja igual en todas las escenas que lo usan.
// Devuelve las piezas sin mostrar; cada escena decide cuándo aparece cada una.
//   const M = CLEARVIEW(D);  M.p.cand, M.s.hist, M.base, M.l.cand (enlace al servicio), ...
window.CLEARVIEW = (D) => {
  const p = {
    cand: D.person({ x: 70, y: 200, t: 'candidato' }),
    emp: D.person({ x: 70, y: 740, t: 'empresa' }),
  };
  const s = {
    cand: D.svc({ x: 470, y: 170, w: 300, t: 'Candidatos', icon: 'user' }),
    hist: D.svc({ x: 830, y: 170, w: 300, t: 'Historia', icon: 'file' }),
    emps: D.svc({ x: 470, y: 760, w: 300, t: 'Empresas', icon: 'building' }),
    match: D.svc({ x: 830, y: 760, w: 300, t: 'Emparejamiento', icon: 'merge' }),
  };
  const base = D.db({ x: 615, y: 420, w: 370, h: 200, t: 'Base', s: 'compartida', lock: 'currículum' });
  const model = D.model({ x: 1400, y: 150, w: 380, h: 110, t: 'Modelos de IA', s: 'externos' });
  const hr = D.svc({ x: 1310, y: 640, w: 330, t: 'Integración RR. HH.', icon: 'plug' });
  const ext = [560, 670, 780].map((y) => D.ext({ x: 1660, y, w: 160, h: 76, t: 'RR. HH.' }));
  const cien = D.html({ x: 1670, y: 870, cls: 'cv-cien', h: '× 100' });
  const l = {
    cand: D.link(p.cand.r, s.cand.l, 'sync'),
    emp: D.link(p.emp.r, s.emps.l, 'sync'),
    db: [D.link(s.cand.b, [715, 428], 'read'), D.link(s.hist.b, [885, 428], 'read'), D.link(s.emps.t, [715, 612], 'read'), D.link(s.match.t, [885, 612], 'read')],
    model: D.link(s.hist.r, model.l, 'sync', true),
    toHr: D.link(s.cand.r, hr.t, 'sync', true),
    ext: ext.map((e) => D.link(hr.r, e.l, 'sync', true)),
  };
  const all = [...Object.values(p), ...Object.values(s), base, model, hr, ...ext, cien];
  const wires = [l.cand, l.emp, ...l.db, l.model, l.toHr, ...l.ext];
  return { p, s, base, model, hr, ext, cien, l, all, wires };
};
