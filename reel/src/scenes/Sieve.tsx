import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, MONO, SANS } from '../theme';
import { EASE, camera, clamp, mix, prog, type Pt } from '../lib/anim';
import { Chip, Defs, Kicker, Tag, Wire, Words } from '../lib/parts';

/**
 * Chapter 10: sixteen ADRs fall into place. Five step aside, eleven fly into three pillars (012 and 013
 * become one decision), and the threads between decisions draw themselves.
 */
const ADR_TITLES: Record<number, string> = {
  1: 'Using ADRs (template)', 2: 'System approach', 3: 'Tracing and monitoring', 4: 'Health checks',
  5: 'Readiness checks', 6: 'Zero trust', 7: 'Event sourcing', 8: 'At-least-once delivery',
  9: 'Payment provider', 10: 'Feedback separation', 11: 'Pickup PIN code', 12: 'Stale fridge data',
  13: 'Cache the catalog', 14: 'Deployment strategy', 15: 'Map providers', 16: 'Infrastructure as code',
};
const OFF = new Set([1, 4, 5, 15, 16]);
// pillar columns, left to right as on the course's map: 2 · physical reality, 1 · structural core, 3 · operations
const COL = { p2: 480, p1: 960, p3: 1440 };
const DEST: Record<number, { x: number; y: number; name: string }> = {
  2: { x: COL.p1, y: 470, name: 'Modular monolith' },
  7: { x: COL.p1, y: 620, name: 'Event sourcing' },
  8: { x: COL.p1, y: 770, name: 'Queue with receipts' },
  10: { x: COL.p2, y: 470, name: 'In-house feedback' },
  11: { x: COL.p2, y: 620, name: 'Offline PIN' },
  12: { x: COL.p2, y: 770, name: 'Cached catalog' },
  13: { x: COL.p2, y: 770, name: 'Cached catalog' },
  3: { x: COL.p3, y: 440, name: 'Rented monitoring' },
  6: { x: COL.p3, y: 550, name: 'Identity at the edge' },
  14: { x: COL.p3, y: 660, name: 'Scale up first' },
  9: { x: COL.p3, y: 770, name: 'Payment facade' },
};
const TW = 340, TH = 82;
const grid = (n: number): Pt => [330 + ((n - 1) % 4) * 420, 430 + Math.floor((n - 1) / 4) * 104];
const ZONES = [
  { x: COL.p2, label: '2 · Physical reality and privacy' },
  { x: COL.p1, label: '1 · The structural core' },
  { x: COL.p3, label: '3 · Operations, scale and budget' },
];
const R = COL.p1 + TW / 2, TRUNK = 1202, L3 = COL.p3 - TW / 2;
const THREADS: { pts: Pt[]; at: number }[] = [
  { pts: [[R, 470], [TRUNK, 470], [TRUNK, 440], [L3 - 2, 440]], at: 122 },
  { pts: [[R, 470], [TRUNK, 470], [TRUNK, 550], [L3 - 2, 550]], at: 128 },
  { pts: [[R, 470], [TRUNK, 470], [TRUNK, 660], [L3 - 2, 660]], at: 134 },
  { pts: [[COL.p2 + TW / 2, 770], [COL.p1 - TW / 2 - 2, 770]], at: 146 },
  { pts: [[R, 770], [L3 - 2, 770]], at: 152 },
];
const MONEY: Pt[] = [[COL.p2, 770], [COL.p3, 770]];

export function Sieve() {
  const f = useCurrentFrame();
  const cam = camera(f, [
    { f: 0, x: 960, y: 590, w: 1960 },
    { f: 190, x: 960, y: 600, w: 1800 },
  ], EASE.inOut);
  const zones = prog(f, 96, 116);
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox={cam.viewBox} style={{ position: 'absolute', inset: 0 }}>
        <Defs />
        {ZONES.map((z, i) => (
          <g key={z.x} opacity={zones}>
            <rect x={z.x - 196} y={384} width={392} height={454} rx={22} fill="rgba(255,255,255,0.012)" stroke={i === 1 ? '#5a4a8a' : C.lineStrong} strokeWidth={2} strokeDasharray="9 8" />
            <Tag x={z.x - 176} y={370} size={14}>{z.label}</Tag>
          </g>
        ))}
        {THREADS.map((t, i) => <Wire key={i} pts={t.pts} p={prog(f, t.at, t.at + 18, EASE.inOut)} tone="accent" width={2.6} />)}
        <Chip pts={MONEY} t={prog(f, 160, 186, EASE.inOut)} tone="accent" opacity={prog(f, 158, 162) * (1 - prog(f, 184, 188))} />
        {Array.from({ length: 16 }, (_, k) => k + 1).map((n, k) => {
          const pop = prog(f, 2 + k * 1.8, 18 + k * 1.8, EASE.outBack);
          const [gx, gy] = grid(n);
          const off = OFF.has(n);
          const drop = off ? prog(f, 46 + k, 70 + k, EASE.in) : 0;
          const dest = DEST[n];
          const fly = dest ? prog(f, 70 + k * 1.6, 106 + k * 1.6, EASE.inOutQuint) : 0;
          const x = dest ? mix(gx, dest.x, fly) : gx;
          const y = dest ? mix(gy, dest.y, fly) : gy + drop * 70;
          const swap = prog(f, 98 + k, 110 + k);
          const merged = n === 13 ? 1 - prog(f, 104, 112) : 1;
          const o = clamp(pop * 1.4) * (off ? 1 - drop : 1) * (off ? 1 - 0.55 * prog(f, 38, 48) : 1) * merged;
          if (o <= 0.002) return null;
          const tag = n === 12 ? `ADR 012${swap > 0.5 ? ' + 013' : ''}` : `ADR ${String(n).padStart(3, '0')}`;
          const core = n === 2;
          return (
            <g key={n} transform={`translate(${x} ${y}) scale(${0.8 + 0.2 * pop})`} opacity={o}>
              {core && <rect x={-TW / 2} y={-TH / 2} width={TW} height={TH} rx={16} fill={C.accent} opacity={0.35 * prog(f, 118, 132)} filter="url(#glow)" />}
              <rect x={-TW / 2} y={-TH / 2} width={TW} height={TH} rx={15} fill={core && f > 118 ? '#2a1a12' : C.surface} stroke={core && f > 118 ? C.accent : off ? C.line : C.lineStrong} strokeWidth={core && f > 118 ? 2.6 : 1.8} />
              <text x={-TW / 2 + 22} y={-8} fontFamily={MONO} fontWeight={650} fontSize={14} letterSpacing="0.06em" fill={off ? C.text3 : C.accentText}>{tag}</text>
              <text x={-TW / 2 + 22} y={22} fontFamily={SANS} fontWeight={700} fontSize={21} fill={C.text} opacity={1 - swap}>{ADR_TITLES[n]}</text>
              {dest && <text x={-TW / 2 + 22} y={22} fontFamily={SANS} fontWeight={750} fontSize={22} fill={C.text} opacity={swap}>{dest.name}</text>}
            </g>
          );
        })}
        <Tag x={960} y={905} anchor="middle" size={15} opacity={prog(f, 48, 60) * (1 - prog(f, 76, 86))}>Five stay off the map: useful, not structural</Tag>
      </svg>
      <AbsoluteFill style={{ padding: '92px 120px' }}>
        <Kicker text="Chapter 10 · The decision map" at={6} style={{ marginBottom: 20 }} />
        <div style={{ display: 'flex', gap: 34, alignItems: 'baseline' }}>
          <Words text="16 ADRs." at={10} size={92} color={f > 76 ? C.text3 : C.text} />
          <Words text="10 decisions." at={78} size={92} color={f > 108 ? C.text3 : C.text} />
          <Words text="3 pillars." at={104} size={92} color={C.accentText} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
