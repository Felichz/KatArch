import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame } from 'remotion';
import type { LucideIcon } from 'lucide-react';
import { C, MONO, SANS } from '../theme';
import { EASE, along, clamp, mix, prog, roundedD, type Pt } from './anim';

export type Kind = 'plain' | 'core' | 'cmp' | 'ext' | 'evt' | 'cmd' | 'danger' | 'muted';

const STROKE: Record<Kind, string> = {
  plain: C.lineStrong,
  core: C.accent,
  cmp: '#7e6bbf',
  ext: C.ext,
  evt: C.evt,
  cmd: C.cmd,
  danger: C.danger,
  muted: C.lineStrong,
};
const FILL: Record<Kind, string> = {
  plain: C.surface,
  core: '#2a1a12',
  cmp: C.surface,
  ext: C.bg,
  evt: '#0f2a22',
  cmd: '#132038',
  danger: '#2e161b',
  muted: C.bg,
};
const ICON_BG: Record<Kind, [string, string]> = {
  plain: [C.surface3, C.text2],
  core: [C.accent, '#1a0d06'],
  cmp: [C.cmpSoft, C.cmp],
  ext: ['transparent', C.ext],
  evt: [C.evtSoft, C.evt],
  cmd: [C.cmdSoft, C.cmd],
  danger: [C.dangerSoft, C.danger],
  muted: [C.surface2, C.text3],
};

/** Shared SVG defs: glow filter and arrowheads. */
export function Defs() {
  const head = (id: string, color: string) => (
    <marker id={id} viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="15" markerHeight="15" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
      <path d="M1.5 1.5 L8.6 5 L1.5 8.5" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
  return (
    <defs>
      <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      {head('ah', C.text3)}
      {head('ah-cmd', C.cmd)}
      {head('ah-evt', C.evt)}
      {head('ah-accent', C.accent)}
      {head('ah-danger', C.danger)}
    </defs>
  );
}

/** A box in world units, positioned by its center. `p` = appearance, `hl` = glow, `dim` = fade back. */
export function Node({
  x, y, w = 240, h = 76, kind = 'plain', icon: Icon, label, sub, p = 1, hl = 0, dim = 0, dashed, labelSize = 21,
}: {
  x: number; y: number; w?: number; h?: number; kind?: Kind; icon?: LucideIcon; label: string; sub?: string;
  p?: number; hl?: number; dim?: number; dashed?: boolean; labelSize?: number;
}) {
  if (p <= 0.001) return null;
  const s = mix(0.86, 1, EASE.outBack(clamp(p)));
  const iconBox = Icon ? 42 : 0;
  const tx = Icon ? -w / 2 + 20 + iconBox + 14 : 0;
  const isDashed = dashed ?? kind === 'ext';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={clamp(p * 1.4) * (1 - 0.72 * dim)}>
      {hl > 0 && <rect x={-w / 2 - 4} y={-h / 2 - 4} width={w + 8} height={h + 8} rx={18} fill={C.accent} opacity={0.42 * hl} filter="url(#glow)" />}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={15} fill={FILL[kind]} stroke={hl > 0.05 ? C.accent : STROKE[kind]} strokeWidth={kind === 'core' || hl > 0.05 ? 2.6 : 1.8} strokeDasharray={isDashed ? '7 6' : undefined} />
      {Icon && (
        <g transform={`translate(${-w / 2 + 20} ${-iconBox / 2})`}>
          <rect width={iconBox} height={iconBox} rx={11} fill={ICON_BG[kind][0]} stroke={kind === 'ext' ? C.ext : 'none'} strokeDasharray={kind === 'ext' ? '4 3' : undefined} />
          <g transform="translate(10 10)">
            <Icon size={22} color={ICON_BG[kind][1]} strokeWidth={1.9} />
          </g>
        </g>
      )}
      <text x={tx} y={sub ? -3 : labelSize * 0.36} textAnchor={Icon ? 'start' : 'middle'} fontFamily={SANS} fontWeight={700} fontSize={labelSize} fill={C.text} letterSpacing="-0.01em">
        {label}
      </text>
      {sub && (
        <text x={tx} y={labelSize * 0.9} textAnchor={Icon ? 'start' : 'middle'} fontFamily={SANS} fontWeight={500} fontSize={15.5} fill={C.text3}>
          {sub}
        </text>
      )}
    </g>
  );
}

const TONE: Record<string, string> = { plain: C.text3, cmd: C.cmd, evt: C.evt, accent: C.accent, danger: C.danger, muted: C.lineStrong };

/** A connector that draws itself as `p` goes 0→1 (dashed ones fade in instead). */
export function Wire({ pts, p = 1, tone = 'plain', dashed, arrow = true, width = 2.2, r = 14, opacity = 1 }: { pts: Pt[]; p?: number; tone?: keyof typeof TONE; dashed?: boolean; arrow?: boolean; width?: number; r?: number; opacity?: number }) {
  if (p <= 0.001) return null;
  const marker = arrow && p > 0.97 ? `url(#ah${tone === 'plain' || tone === 'muted' ? '' : '-' + tone})` : undefined;
  return (
    <path
      d={roundedD(pts, r)}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={dashed ? undefined : 1}
      strokeDasharray={dashed ? '8 8' : '1 1'}
      strokeDashoffset={dashed ? undefined : 1 - clamp(p)}
      opacity={(dashed ? clamp(p) : 1) * opacity}
      markerEnd={marker}
    />
  );
}

const CHIP: Record<string, [string, string, string]> = {
  cmd: [C.cmdSoft, C.cmd, C.text],
  evt: [C.evtSoft, C.evt, C.text],
  muted: [C.surface3, C.lineStrong, C.text2],
  accent: [C.accent, C.accent, '#1a0d06'],
  danger: [C.dangerSoft, C.danger, C.text],
};

/** A message chip at fraction t of a polyline. */
export function Chip({ pts, t, label, tone = 'cmd', size = 17, opacity = 1, scale = 1 }: { pts: Pt[]; t: number; label?: string; tone?: keyof typeof CHIP; size?: number; opacity?: number; scale?: number }) {
  if (opacity <= 0.001) return null;
  const [x, y] = along(pts, t);
  const w = label ? label.length * size * 0.62 + 30 : 18;
  const h = label ? size + 18 : 18;
  const [fill, stroke, ink] = CHIP[tone];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <rect x={-w / 2 - 6} y={-h / 2 - 6} width={w + 12} height={h + 12} rx={(h + 12) / 2} fill={stroke} opacity={0.22} filter="url(#soft)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} strokeWidth={1.8} />
      {label && (
        <text y={size * 0.36} textAnchor="middle" fontFamily={MONO} fontWeight={650} fontSize={size} fill={ink}>
          {label}
        </text>
      )}
    </g>
  );
}

/** Small uppercase mono label in world units. */
export function Tag({ x, y, children, color = C.text3, size = 14, anchor = 'start', opacity = 1 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; opacity?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontWeight={600} fontSize={size} letterSpacing="0.08em" fill={color} opacity={opacity} style={{ textTransform: 'uppercase' }}>
      {children}
    </text>
  );
}

/* ───────── screen-space typography ───────── */

/**
 * Kinetic type: every word rises out of its own mask, staggered; `out` sends the line up and away.
 */
export function Words({ text, at, out, size = 84, weight = 780, color = C.text, stagger = 3, style }: { text: string; at: number; out?: number; size?: number; weight?: number; color?: string; stagger?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{ fontFamily: SANS, fontWeight: weight, fontSize: size, lineHeight: 1.04, letterSpacing: '-0.042em', color, display: 'flex', flexWrap: 'wrap', columnGap: size * 0.26, ...style }}>
      {words.map((w, i) => {
        const pin = prog(frame, at + i * stagger, at + i * stagger + 18, EASE.outExpo);
        const pout = out === undefined ? 0 : prog(frame, out + i * 2, out + i * 2 + 14, EASE.in);
        const y = (1 - pin) * 108 - pout * 108;
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', padding: '0.06em 0 0.12em', margin: '-0.06em 0 -0.12em' }}>
            <span style={{ display: 'inline-block', transform: `translateY(${y}%)`, willChange: 'transform' }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
}

/** Mono kicker that types itself in. */
export function Kicker({ text, at, out, color = C.accentText, style }: { text: string; at: number; out?: number; color?: string; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const n = Math.round(prog(frame, at, at + text.length * 0.9, (x) => x) * text.length);
  const fade = out === undefined ? 1 : 1 - prog(frame, out, out + 10);
  return (
    <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 20, letterSpacing: '0.14em', textTransform: 'uppercase', color, opacity: fade, ...style }}>
      {text.slice(0, n)}
      <span style={{ opacity: n < text.length && n > 0 ? 1 : 0, color: C.accent }}>▍</span>
    </div>
  );
}

/** Drifting dot grid and vignette behind everything. */
export function Backdrop() {
  const frame = useCurrentFrame();
  const d = (frame * 0.18) % 28;
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.deep, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', inset: -40,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '28px 28px', transform: `translate(${-d}px, ${-d * 0.5}px)`,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />
    </div>
  );
}

/** Dark band behind captions laid over a moving diagram. */
export function Scrim({ side = 'bottom', size = 360 }: { side?: 'bottom' | 'top'; size?: number }) {
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, [side]: 0, height: size, pointerEvents: 'none',
        background: `linear-gradient(to ${side === 'bottom' ? 'top' : 'bottom'}, rgba(7,9,13,0.94) 0%, rgba(7,9,13,0.7) 45%, rgba(7,9,13,0) 100%)`,
      }}
    />
  );
}
