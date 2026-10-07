import { createContext, useContext, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, type Transition } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { useUi } from '../i18n/react';

export interface SceneProps {
  state?: string;
  props?: Record<string, any>;
  chosen: number | null;
  reduced: boolean;
  onNext: () => void;
}

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const spring: Transition = { type: 'spring', stiffness: 170, damping: 24 };

/** Responsive SVG canvas. Children draw in viewBox units. */
export function Canvas({
  w,
  h,
  label,
  children,
  className = '',
}: {
  w: number;
  h: number;
  label: string;
  children: (ids: { arrow: string; arrowCmd: string; arrowEvt: string; arrowAccent: string; arrowDanger: string }) => ReactNode;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const ids = {
    arrow: `a-${uid}`,
    arrowCmd: `ac-${uid}`,
    arrowEvt: `ae-${uid}`,
    arrowAccent: `aa-${uid}`,
    arrowDanger: `ad-${uid}`,
  };
  const marker = (id: string, color: string) => (
    <marker id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1.5 L8.5 5 L1 8.5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </marker>
  );
  return (
    <div className={`dg-wrap ${className}`}>
      {/* past 1.2x the drawing stops growing: on large screens it stays in proportion with the reading panel */}
      <svg className="dg" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet" style={{ maxWidth: w * 1.2, maxHeight: h * 1.2 }}>
        <defs>
          {/* shared material for every node: a soft shadow below and light from above (same ids everywhere on purpose) */}
          <filter id="kt-shadow" x="-30%" y="-30%" width="160%" height="190%">
            <feDropShadow className="kt-shadow-fe" dx="0" dy="6" stdDeviation="7" />
          </filter>
          <linearGradient id="kt-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.07" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {marker(ids.arrow, 'var(--text-3)')}
          {marker(ids.arrowCmd, 'var(--cmd)')}
          {marker(ids.arrowEvt, 'var(--evt)')}
          {marker(ids.arrowAccent, 'var(--accent)')}
          {marker(ids.arrowDanger, 'var(--danger)')}
        </defs>
        {children(ids)}
      </svg>
    </div>
  );
}

export type NodeKind = 'cmp' | 'ext' | 'core' | 'plain' | 'muted' | 'danger' | 'evt' | 'cmd';

/** A box with icon + label, positioned by its CENTER. Animates position/opacity. */
export function Node({
  x,
  y,
  w = 180,
  h = 64,
  kind = 'plain',
  icon: Icon,
  label,
  sub,
  show = true,
  highlight = false,
  dim = false,
  delay = 0,
  crossed = false,
  children,
  onEnter,
  ariaLabel,
  labelTop = false,
}: {
  labelTop?: boolean;
  onEnter?: () => void;
  ariaLabel?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  kind?: NodeKind;
  icon?: LucideIcon;
  label: ReactNode;
  sub?: ReactNode;
  show?: boolean;
  highlight?: boolean;
  dim?: boolean;
  delay?: number;
  crossed?: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ x: x - w / 2, y: y - h / 2, opacity: show ? (dim ? 0.32 : 1) : 0, scale: show ? 1 : 0.92 }}
      transition={{ ...spring, delay: show ? delay : 0, opacity: { duration: 0.35, delay: show ? delay : 0 } }}
      style={{ pointerEvents: show ? 'auto' : 'none', transformBox: 'fill-box', transformOrigin: 'center', cursor: onEnter ? 'pointer' : undefined, outline: 'none' }}
      aria-hidden={!show}
      className={onEnter ? 'nd-hit' : undefined}
      tabIndex={onEnter && show ? 0 : undefined}
      aria-label={onEnter ? ariaLabel : undefined}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onEnter}
    >
      <rect className={`nd nd--${kind} ${highlight ? 'is-hl' : ''}`} width={w} height={h} rx={12} />
      {kind !== 'ext' && kind !== 'muted' && <rect className="nd-sheen" width={w} height={h} rx={12} />}
      <foreignObject width={w} height={h}>
        <div className={`nd-in ${Icon ? '' : 'nd-in--noicon'} ${crossed ? 'is-crossed' : ''} ${labelTop ? 'nd-in--top' : ''}`}>
          {Icon && (
            <span className={`nd-ic nd-ic--${kind}`}>
              <Icon size={18} strokeWidth={1.9} />
            </span>
          )}
          <span className="nd-tx">
            <span className="nd-l">{label}</span>
            {sub && <span className="nd-s">{sub}</span>}
          </span>
        </div>
      </foreignObject>
      {children}
    </motion.g>
  );
}

/** A straight or polyline connector that draws itself in. */
export function Edge({
  points,
  show = true,
  tone = 'plain',
  dashed = false,
  marker,
  delay = 0,
  width = 1.8,
  flow = false,
}: {
  points: [number, number][];
  show?: boolean;
  tone?: 'plain' | 'cmd' | 'evt' | 'accent' | 'danger' | 'muted';
  dashed?: boolean;
  marker?: string;
  delay?: number;
  width?: number;
  /** animated marching dashes (continuous flow) */
  flow?: boolean;
}) {
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  if (dashed || flow) {
    // dash patterns and pathLength drawing both use stroke-dasharray: fade instead of draw
    return (
      <motion.path
        d={d}
        className={`eg eg--${tone} ${dashed ? 'is-dashed' : ''} ${flow ? 'is-flow' : ''}`}
        strokeWidth={width}
        fill="none"
        markerEnd={marker ? `url(#${marker})` : undefined}
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4, delay: show ? delay : 0 }}
      />
    );
  }
  return (
    <motion.path
      d={d}
      className={`eg eg--${tone}`}
      strokeWidth={width}
      fill="none"
      markerEnd={marker ? `url(#${marker})` : undefined}
      initial={false}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ pathLength: { duration: 0.6, ease: EASE, delay: show ? delay : 0 }, opacity: { duration: 0.2, delay: show ? delay : 0 } }}
    />
  );
}

/**
 * Packets are read while they move, so they travel slower than the rest of the
 * motion: every timing a scene passes is stretched by this factor, and no chip
 * crosses its path faster than PACKET_SPEED viewBox units per second.
 */
const PACKET_PACE = 1.5;
const PACKET_SPEED = 150;
const PACKET_FONT_CHAR = 7.7; // JetBrains Mono at 12.5px advances ~0.6em per glyph
const dist = (a: [number, number], b: [number, number]) => Math.hypot(b[0] - a[0], b[1] - a[1]);

/** Distance from the chip's center to its edge along a unit direction. */
const reach = (ux: number, uy: number, pw: number, ph: number) =>
  Math.min(Math.abs(ux) > 1e-6 ? pw / 2 / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-6 ? ph / 2 / Math.abs(uy) : Infinity);

/** Cuts `cut(dir)` off one end of a polyline so the chip starts clear of the box it leaves. */
function trimStart(pts: [number, number][], pw: number, ph: number): [number, number][] | null {
  const out = pts.slice();
  let need: number | null = null;
  while (out.length > 1) {
    const [a, b] = out;
    const L = dist(a, b);
    if (L < 1e-6) { out.shift(); continue; }
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
    if (need === null) need = reach(ux, uy, pw, ph) + 3;
    if (L > need) {
      out[0] = [a[0] + ux * need, a[1] + uy * need];
      return out;
    }
    need -= L;
    out.shift();
  }
  return null;
}

/** A message token (command / event) that travels along a polyline. */
export function Packet({
  points,
  label,
  tone = 'cmd',
  duration = 1.6,
  delay = 0,
  repeat = false,
  repeatDelay = 1.2,
  reduced,
  w,
  hold = false,
}: {
  points: [number, number][];
  label?: string;
  tone?: 'cmd' | 'evt' | 'cmp' | 'accent' | 'danger' | 'muted';
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  reduced: boolean;
  w?: number;
  /** stay visible at the end instead of fading */
  hold?: boolean;
}) {
  const pw = w ?? (label ? Math.max(30, label.length * PACKET_FONT_CHAR + 26) : 14);
  const ph = label ? 26 : 14;
  // the chip never sits on the boxes it connects: both ends of the path are pulled in by the chip's own size
  let path = trimStart(points, pw, ph);
  if (path && !hold) path = trimStart(path.slice().reverse(), pw, ph)?.reverse() ?? null;
  const total = path ? path.slice(1).reduce((acc, p, i) => acc + dist(path![i], p), 0) : 0;
  if (!path || total < 12) {
    // no room to travel between the two boxes: the chip appears in the gap instead of sliding over them
    const mid = lerp(points[0], points[points.length - 1], 0.5);
    path = [mid, mid];
  }
  const at = (p: [number, number]) => ({ x: p[0] - pw / 2, y: p[1] - ph / 2 });
  const end = at(path[path.length - 1]);
  if (reduced) {
    return (
      <g transform={`translate(${end.x} ${end.y})`}>
        <PacketBody pw={pw} ph={ph} label={label} tone={tone} />
      </g>
    );
  }
  // keyframes at every corner, timed by distance so the speed stays constant, plus fade-in / fade-out marks
  const L = Math.max(total, 1);
  const marks: { d: number; p: [number, number] }[] = [];
  let acc = 0;
  path.forEach((p, i) => {
    if (i) acc += dist(path![i - 1], p);
    marks.push({ d: acc, p });
  });
  const pointAt = (d: number): [number, number] => {
    for (let i = 1; i < marks.length; i++) {
      if (d <= marks[i].d) {
        const seg = marks[i].d - marks[i - 1].d || 1;
        return lerp(marks[i - 1].p, marks[i].p, (d - marks[i - 1].d) / seg);
      }
    }
    return marks[marks.length - 1].p;
  };
  const fadeIn = L * 0.14, fadeOut = L * 0.86;
  const ds = [...new Set([...marks.map((m) => m.d), fadeIn, ...(hold ? [] : [fadeOut])])].sort((a, b) => a - b);
  const frames = ds.map((d) => ({ ...at(pointAt(d)), o: d < fadeIn - 1e-6 ? 0 : !hold && d > fadeOut + 1e-6 ? 0 : 1, t: d / L }));
  if (total < 12) {
    // stationary chip: fade in, hold, fade out
    frames.splice(0, frames.length, { ...end, o: 0, t: 0 }, { ...end, o: 1, t: 0.15 }, { ...end, o: 1, t: 0.85 }, { ...end, o: hold ? 1 : 0, t: 1 });
  }
  const time = Math.max(duration * PACKET_PACE, total / PACKET_SPEED);
  return (
    <motion.g
      initial={{ x: frames[0].x, y: frames[0].y, opacity: 0 }}
      animate={{ x: frames.map((f) => f.x), y: frames.map((f) => f.y), opacity: frames.map((f) => f.o) }}
      transition={{
        duration: time,
        delay: delay * PACKET_PACE,
        times: frames.map((f) => f.t),
        // constant speed along the whole route: easing per keyframe would stall the chip at every corner
        ease: 'linear',
        repeat: repeat ? Infinity : 0,
        repeatDelay: repeatDelay * PACKET_PACE,
      }}
    >
      <PacketBody pw={pw} ph={ph} label={label} tone={tone} />
    </motion.g>
  );
}

function PacketBody({ pw, ph, label, tone }: { pw: number; ph: number; label?: string; tone: string }) {
  return (
    <>
      <rect width={pw} height={ph} rx={ph / 2} className={`pk pk--${tone}`} />
      {label && (
        <text x={pw / 2} y={ph / 2 + 4.4} textAnchor="middle" className="pk-t">
          {label}
        </text>
      )}
    </>
  );
}

export const lerp = (a: [number, number], b: [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Small label in the diagram (mono, uppercase) */
export function Label({ x, y, children, anchor = 'middle', tone = 'muted', show = true, delay = 0, size = 11, masked = false }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; tone?: 'muted' | 'cmd' | 'evt' | 'accent' | 'danger' | 'cmp' | 'text'; show?: boolean; delay?: number; size?: number; /** halo in the canvas color, for a label that sits across a line */ masked?: boolean }) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`lb lb--${tone}${masked ? ' lb--masked' : ''}`}
      style={{ fontSize: size }}
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.35, delay: show ? delay : 0 }}
    >
      {children}
    </motion.text>
  );
}

/** HTML legend chip row rendered above the canvas */
export function Legend({ items }: { items: { tone: 'cmd' | 'evt' | 'cmp' | 'ext' | 'accent' | 'danger'; label: string }[] }) {
  return (
    <div className="legend" aria-hidden>
      {items.map((i) => (
        <span key={i.label} className="legend__i">
          <span className={`legend__sw legend__sw--${i.tone}`} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

/** Scene frame: legend + caption + canvas */
/**
 * Where a scene's title and legend go. The player provides the stage header, so title, legend and the stage
 * tools share one row; without a provider (the enlarged view) the head renders in place, above the diagram.
 */
export const FrameHeadSlot = createContext<HTMLElement | null>(null);

export function Frame({ title, legend, children, foot }: { title?: string; legend?: ReactNode; children: ReactNode; foot?: ReactNode }) {
  const slot = useContext(FrameHeadSlot);
  const head = (title || legend) ? (
    <div className="frame__head">
      {title && <span className="frame__title">{title}</span>}
      {legend}
    </div>
  ) : null;
  return (
    <div className="frame">
      {head && (slot ? createPortal(head, slot) : head)}
      <div className="frame__body">{children}</div>
      {foot && <div className="frame__foot">{foot}</div>}
    </div>
  );
}

/** Playback controls for step-through diagrams. */
export function Stepper({
  phase,
  count,
  playing,
  onPlay,
  onPause,
  onGo,
  caption,
  captions,
  labels,
}: {
  phase: number;
  count: number;
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onGo: (p: number) => void;
  caption?: ReactNode;
  /** every phase's caption (html): all of them are laid out in one cell, so the controls never move */
  captions?: (string | ReactNode)[];
  labels?: string[];
}) {
  const ui = useUi().stepper;
  return (
    <div className="stepper">
      <div className="stepper__caption" aria-live="polite">
        {captions ? (
          <div className="stepper__stack">
            {captions.map((c, i) => (
              typeof c === 'string' ? (
                <span key={i} className={i === phase ? 'is-on' : undefined} aria-hidden={i !== phase} dangerouslySetInnerHTML={{ __html: c }} />
              ) : (
                <span key={i} className={i === phase ? 'is-on' : undefined} aria-hidden={i !== phase}>{c}</span>
              )
            ))}
          </div>
        ) : (
          caption
        )}
      </div>
      <div className="stepper__ctl">
        <button type="button" className="icon-btn stepper__b" onClick={() => onGo(phase - 1)} disabled={phase === 0} aria-label={ui.prev}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="stepper__dots">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} type="button" className={`stepper__dot ${i === phase ? 'is-cur' : ''} ${i < phase ? 'is-done' : ''}`} onClick={() => onGo(i)} aria-label={labels?.[i] ?? ui.step(i + 1)} aria-current={i === phase ? 'step' : undefined} />
          ))}
        </div>
        <button type="button" className="icon-btn stepper__b" onClick={() => onGo(phase + 1)} disabled={phase === count - 1} aria-label={ui.next}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <button type="button" className="play-btn" onClick={playing ? onPause : phase === count - 1 ? () => { onGo(0); onPlay(); } : onPlay}>
          {playing ? ui.pause : phase === count - 1 ? ui.replay : ui.play}
        </button>
      </div>
    </div>
  );
}
