import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, MONO, SANS } from '../theme';
import { EASE, mix, money, prog } from '../lib/anim';
import { Kicker, Words } from '../lib/parts';

/**
 * Chapter 9: the team's year-one bill, line by line. Then rapid growth (ten times the projected load)
 * and the total less than doubles.
 */
const LINES: { label: string; min: number; rapid: number }[] = [
  { label: 'Monitoring (DataDog)', min: 3336, rapid: 3336 },
  { label: 'Reporting (Tableau)', min: 1440, rapid: 2880 },
  { label: 'Database (DynamoDB)', min: 3072, rapid: 3072 },
  { label: 'Machines (EC2)', min: 3114.96, rapid: 6230.04 },
  { label: 'Queues (Amazon MQ)', min: 508.32, rapid: 1203.36 },
  { label: 'Notifications (SNS)', min: 366.12, rapid: 366.12 },
  { label: 'Files (S3)', min: 262.32, rapid: 5245.2 },
  { label: 'Log streams (Kafka)', min: 138.72, rapid: 138.72 },
  { label: 'VPN', min: 9.13, rapid: 9.13 },
];
const MIN_TOTAL = LINES.reduce((s, l) => s + l.min, 0);
const RAPID_TOTAL = LINES.reduce((s, l) => s + l.rapid, 0);
const K = 0.118; // px per dollar
const LX = 640, BX = 680, Y0 = 430, STEP = 48;

export function Bill() {
  const f = useCurrentFrame();
  const grow = (i: number) => prog(f, 10 + i * 3, 40 + i * 3, EASE.outExpo);
  const sw = prog(f, 62, 94, EASE.inOutQuint);
  const total = f < 60 ? mix(0, MIN_TOTAL, prog(f, 14, 52, EASE.out)) : mix(MIN_TOTAL, RAPID_TOTAL, sw);
  const pill = prog(f, 56, 66);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ padding: '92px 120px' }}>
        <Kicker text="Chapter 09 · The yearly bill" at={6} style={{ marginBottom: 20 }} />
        <Words text="Ten times the load." at={64} size={88} />
        <Words text="Less than twice the bill." at={98} size={88} color={C.accentText} />
      </AbsoluteFill>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <g transform="translate(140 0)">
          {/* scenario switch */}
          <g transform={`translate(${BX + 440} ${Y0 - 62})`} opacity={prog(f, 8, 20)}>
            <rect x={0} y={-24} width={420} height={48} rx={24} fill={C.surface} stroke={C.line} strokeWidth={1.5} />
            <rect x={mix(4, 168, pill)} y={-20} width={mix(160, 248, pill)} height={40} rx={20} fill={mix(0, 1, pill) > 0.5 ? C.accentSoft : C.surface3} stroke={pill > 0.5 ? C.accent : 'none'} strokeWidth={1.6} />
            <text x={84} y={7} textAnchor="middle" fontFamily={SANS} fontWeight={650} fontSize={18} fill={pill < 0.5 ? C.text : C.text3}>Minimum</text>
            <text x={292} y={7} textAnchor="middle" fontFamily={SANS} fontWeight={650} fontSize={18} fill={pill >= 0.5 ? C.accentText : C.text3}>Rapid growth ×10</text>
          </g>
          {LINES.map((l, i) => {
            const y = Y0 + i * STEP;
            const v = mix(l.min, l.rapid, sw);
            const changed = l.rapid !== l.min;
            const w = Math.max(4, v * K * grow(i));
            const o = prog(f, 4 + i * 3, 16 + i * 3);
            const ratio = l.rapid / l.min;
            return (
              <g key={l.label} opacity={o}>
                <text x={LX} y={y + 7} textAnchor="end" fontFamily={SANS} fontWeight={changed && sw > 0.5 ? 700 : 550} fontSize={20} fill={changed && sw > 0.5 ? C.text : C.text2}>{l.label}</text>
                <rect x={BX} y={y - 15} width={760} height={30} rx={7} fill={C.surface2} />
                <rect x={BX} y={y - 15} width={w} height={30} rx={7} fill={changed && sw > 0.02 ? C.accent : '#3b4757'} opacity={changed && sw > 0.02 ? mix(0.55, 1, sw) : 1} />
                <text x={BX + w + 14} y={y + 7} fontFamily={MONO} fontWeight={650} fontSize={18} fill={C.text2}>{money(v * grow(i))}</text>
                {changed && (
                  <text x={BX + 800} y={y + 7} fontFamily={MONO} fontWeight={700} fontSize={18} fill={C.accentText} opacity={prog(f, 92 + i, 104 + i)}>×{ratio >= 3 ? Math.round(ratio) : ratio.toFixed(1).replace('.0', '')}</text>
                )}
              </g>
            );
          })}
          <line x1={LX - 260} x2={BX + 860} y1={Y0 + 9 * STEP - 6} y2={Y0 + 9 * STEP - 6} stroke={C.line} strokeWidth={2} opacity={prog(f, 34, 46)} />
          <g opacity={prog(f, 12, 24)}>
            <text x={LX} y={Y0 + 9 * STEP + 44} textAnchor="end" fontFamily={SANS} fontWeight={700} fontSize={24} fill={C.text}>Total, year 1</text>
            <text x={BX} y={Y0 + 9 * STEP + 56} fontFamily={SANS} fontWeight={800} fontSize={60} letterSpacing="-0.03em" fill={sw > 0.5 ? C.accentText : C.text}>{money(total)}</text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
}
