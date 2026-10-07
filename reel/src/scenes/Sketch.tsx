import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { DollarSign, Eye, Filter, Monitor, Soup, Zap, type LucideIcon } from 'lucide-react';
import { C, SANS } from '../theme';
import { EASE, camera, clamp, mix, prog, type Pt } from '../lib/anim';
import { Defs, Kicker, Scrim, Tag, Words } from '../lib/parts';

/**
 * The team's real whiteboard (Oct 29, 2020). Its circles are traced in orange, the paper goes dark,
 * and the sketch becomes the course's redrawn diagram, which then comes alive.
 */
const IMG_W = 1422, IMG_H = 800;
const X0 = 370, Y0 = 40, S = 1180 / IMG_W; // the sketch spans 1180 world units
const m = (px: number, py: number): Pt => [X0 + px * S, Y0 + py * S];
const PAPER = { x: X0, y: Y0, w: IMG_W * S, h: IMG_H * S };

const CORE = { at: m(424, 367), rx: 70 * S, ry: 63 * S };
type Sat = { k: string; label: string; icon: LucideIcon | null; at: Pt; r: number; angle: number };
const SATS: Sat[] = [
  { k: 'n', label: 'nutrition', icon: null, at: m(398, 264), r: 35 * S, angle: -90 },
  { k: 'rec', label: 'recommendations', icon: Zap, at: m(490, 281), r: 37 * S, angle: -38.6 },
  { k: 'rev', label: 'reviews', icon: Eye, at: m(536, 354), r: 38 * S, angle: 12.9 },
  { k: 'fil', label: 'filtering', icon: Filter, at: m(511, 452), r: 35 * S, angle: 64.3 },
  { k: 'meal', label: 'meals', icon: Soup, at: m(410, 465), r: 36 * S, angle: 115.7 },
  { k: 'fe', label: 'front-end', icon: Monitor, at: m(305, 425), r: 32 * S, angle: 167.1 },
  { k: 'dis', label: 'discounts', icon: DollarSign, at: m(311, 313), r: 40 * S, angle: 218.6 },
];
const RING = 250;
const R_NODE = 46;

export function Sketch() {
  const f = useCurrentFrame();
  const enter = prog(f, 0, 18, EASE.outExpo);
  const dark = prog(f, 92, 124, EASE.inOut); // paper → course
  const layout = prog(f, 124, 168, EASE.inOutQuint); // sketch positions → clean ring
  const cam = camera(f, [
    { f: 0, x: 960, y: 483, w: 1700 },
    { f: 88, x: 950, y: 484, w: 1640 },
    { f: 124, x: CORE.at[0] + 140, y: CORE.at[1] + 70, w: 1560 },
    { f: 176, x: CORE.at[0] + 30, y: CORE.at[1] + 64, w: 1500 },
    { f: 200, x: CORE.at[0] + 20, y: CORE.at[1] + 60, w: 1440 },
    { f: 222, x: CORE.at[0], y: CORE.at[1], w: 300 },
  ]);
  const coreR = mix(CORE.rx, 82, layout);
  const satPos = (s: Sat): Pt => {
    const a = (s.angle * Math.PI) / 180;
    const ring: Pt = [CORE.at[0] + Math.cos(a) * RING, CORE.at[1] + Math.sin(a) * RING];
    return [mix(s.at[0], ring[0], layout), mix(s.at[1], ring[1], layout)];
  };
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox={cam.viewBox} style={{ position: 'absolute', inset: 0 }}>
        <Defs />
        {/* the paper */}
        <g opacity={enter} transform={`rotate(${mix(-2.2, 0, enter)} 960 500)`}>
          <rect x={PAPER.x - 14} y={PAPER.y - 14} width={PAPER.w + 28} height={PAPER.h + 28} rx={18} fill={C.bg} stroke={C.line} strokeWidth={2} opacity={dark} />
          <g opacity={1 - dark}>
            <rect x={PAPER.x - 14} y={PAPER.y - 14} width={PAPER.w + 28} height={PAPER.h + 28} rx={18} fill="#f7f7f7" />
            <image href={staticFile('whiteboard-menu-plugins.png')} x={PAPER.x} y={PAPER.y} width={PAPER.w} height={PAPER.h} />
          </g>
        </g>

        {/* the trace: orange strokes over the hand-drawn circles */}
        <g opacity={1 - dark * 0.9}>
          <ellipse cx={CORE.at[0]} cy={CORE.at[1]} rx={CORE.rx} ry={CORE.ry} fill="none" stroke={C.accent} strokeWidth={5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(f, 30, 52, EASE.inOut)} strokeLinecap="round" />
          {SATS.map((s, i) => (
            <circle key={s.k} cx={s.at[0]} cy={s.at[1]} r={s.r} fill="none" stroke={C.accent} strokeWidth={4.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(f, 40 + i * 5, 58 + i * 5, EASE.inOut)} strokeLinecap="round" transform={`rotate(-90 ${s.at[0]} ${s.at[1]})`} />
          ))}
        </g>

        {/* the redrawn diagram, born in the sketch's positions */}
        <g opacity={dark}>
          {SATS.map((s, i) => {
            const p = satPos(s);
            const a = Math.atan2(p[1] - CORE.at[1], p[0] - CORE.at[0]);
            const r0 = coreR + 6, r1 = mix(s.r, R_NODE, layout) + 6;
            const from: Pt = [CORE.at[0] + Math.cos(a) * r0, CORE.at[1] + Math.sin(a) * r0];
            const to: Pt = [p[0] - Math.cos(a) * r1, p[1] - Math.sin(a) * r1];
            const pulse = ((f - 150 - i * 4) % 40) / 40;
            const live = f > 150 && layout > 0.99;
            return (
              <g key={s.k}>
                <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={C.text3} strokeWidth={2} opacity={prog(f, 120 + i * 2, 140 + i * 2)} />
                {live && pulse >= 0 && (
                  <circle cx={mix(from[0], to[0], pulse)} cy={mix(from[1], to[1], pulse)} r={6} fill={C.cmd} opacity={Math.sin(pulse * Math.PI)} />
                )}
              </g>
            );
          })}
          {SATS.map((s) => {
            const p = satPos(s);
            const r = mix(s.r, R_NODE, layout);
            const Icon = s.icon;
            const a = (s.angle * Math.PI) / 180;
            const lx = p[0] + Math.cos(a) * (r + 22), ly = p[1] + Math.sin(a) * (r + 22) + 6;
            const anchor = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
            return (
              <g key={s.k}>
                <circle cx={p[0]} cy={p[1]} r={r} fill={C.surface} stroke="#7e6bbf" strokeWidth={2.2} />
                {Icon ? (
                  <g transform={`translate(${p[0] - r * 0.48} ${p[1] - r * 0.48})`}>
                    <Icon size={r * 0.96} color={C.cmp} strokeWidth={1.8} />
                  </g>
                ) : (
                  <text x={p[0]} y={p[1] + r * 0.32} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={r * 0.9} fill={C.cmp}>N</text>
                )}
                <Tag x={lx} y={Math.sin(a) < -0.7 ? ly - 6 : ly} anchor={anchor} size={15} opacity={prog(f, 150, 170)}>{s.label}</Tag>
              </g>
            );
          })}
          <circle cx={CORE.at[0]} cy={CORE.at[1]} r={coreR + 18} fill={C.accent} opacity={0.3 * prog(f, 150, 175)} filter="url(#glow)" />
          <circle cx={CORE.at[0]} cy={CORE.at[1]} r={coreR} fill="#2a1a12" stroke={C.accent} strokeWidth={3} />
          <text x={CORE.at[0]} y={CORE.at[1] + 11} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={32} fill={C.text} letterSpacing="-0.02em">Menu</text>
        </g>
      </svg>
      <Scrim size={300} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 120px 96px', opacity: 1 - prog(f, 184, 196) }}>
        <Kicker text="The team's whiteboard · October 29, 2020" at={14} out={88} style={{ marginBottom: 18 }} />
        <div style={{ position: 'relative', height: 100 }}>
          <Words text="Every figure from the repository," at={22} out={88} size={82} style={{ position: 'absolute', bottom: 0 }} />
          <Words text="redrawn to be walked through." at={112} size={82} color={C.text} style={{ position: 'absolute', bottom: 0 }} />
        </div>
      </AbsoluteFill>
      {/* paper grain fades in with the sketch only */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: clamp(enter - dark) * 0.0 }} />
    </AbsoluteFill>
  );
}
