import { Easing, interpolate } from 'remotion';
import { W, H } from '../theme';

export type Pt = [number, number];

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const EASE = {
  out: Easing.out(Easing.cubic),
  outExpo: Easing.out(Easing.exp),
  inOut: Easing.inOut(Easing.cubic),
  inOutQuint: Easing.inOut(Easing.poly(5)),
  in: Easing.in(Easing.cubic),
  outBack: Easing.out(Easing.back(1.4)),
};

/** Progress 0→1 between two frames, eased. */
export const prog = (frame: number, from: number, to: number, ease = EASE.out) =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/** Value through keyframes [[frame, value], ...], eased segment by segment. */
export const kf = (frame: number, keys: [number, number][], ease = EASE.inOut) =>
  interpolate(frame, keys.map((k) => k[0]), keys.map((k) => k[1]), { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Camera as an SVG viewBox: keyframes of (frame, center x, center y, visible width). */
export function camera(frame: number, keys: { f: number; x: number; y: number; w: number }[], ease = EASE.inOutQuint) {
  const fr = keys.map((k) => k.f);
  const o = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const, easing: ease };
  const x = interpolate(frame, fr, keys.map((k) => k.x), o);
  const y = interpolate(frame, fr, keys.map((k) => k.y), o);
  // zoom interpolates in log space, so a push-in feels constant instead of rushing at the end
  const w = Math.exp(interpolate(frame, fr, keys.map((k) => Math.log(k.w)), o));
  const h = (w * H) / W;
  return { viewBox: `${x - w / 2} ${y - h / 2} ${w} ${h}`, x, y, w, scale: W / w };
}

const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
export const pathLength = (pts: Pt[]) => pts.slice(1).reduce((s, p, i) => s + dist(pts[i], p), 0);

/** Point at fraction t (0..1) of a polyline, by distance. */
export function along(pts: Pt[], t: number): Pt {
  const total = pathLength(pts);
  let d = clamp(t) * total;
  for (let i = 1; i < pts.length; i++) {
    const seg = dist(pts[i - 1], pts[i]);
    if (d <= seg || i === pts.length - 1) {
      const k = seg ? d / seg : 0;
      return [mix(pts[i - 1][0], pts[i][0], k), mix(pts[i - 1][1], pts[i][1], k)];
    }
    d -= seg;
  }
  return pts[pts.length - 1];
}

export const pathD = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

/** Rounded polyline path (corner radius r). */
export function roundedD(pts: Pt[], r = 14) {
  if (pts.length < 3) return pathD(pts);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(x - px, y - py), d2 = Math.hypot(nx - x, ny - y);
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const ax = x - ((x - px) / d1) * rr, ay = y - ((y - py) / d1) * rr;
    const bx = x + ((nx - x) / d2) * rr, by = y + ((ny - y) / d2) * rr;
    d += ` L${ax} ${ay} Q${x} ${y} ${bx} ${by}`;
  }
  const l = pts[pts.length - 1];
  return d + ` L${l[0]} ${l[1]}`;
}

/** Counts a number up with thousands separators. */
export const money = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
