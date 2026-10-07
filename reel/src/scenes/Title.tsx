import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FileText, Users } from 'lucide-react';
import { C, SANS } from '../theme';
import { EASE, camera, clamp, prog } from '../lib/anim';
import { Defs, Node, Wire, Words } from '../lib/parts';

/** "Ten teams. One brief. One winner." The camera then dives into the winner's tile. */
const N = 10;
const WIN = 6;
const TILE = 100;
const tileX = (i: number) => 960 - ((N - 1) * 132) / 2 + i * 132;
const TILE_Y = 720;

export function Title() {
  const f = useCurrentFrame();
  const cam = camera(f, [
    { f: 0, x: 960, y: 560, w: 2050 },
    { f: 124, x: 960, y: 560, w: 1900 },
    { f: 152, x: tileX(WIN), y: TILE_Y, w: 300 },
  ], EASE.inOut);
  const brief = prog(f, 44, 60, EASE.outExpo);
  const win = prog(f, 100, 114);
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox={cam.viewBox} style={{ position: 'absolute', inset: 0 }}>
        <Defs />
        <Node x={960} y={480} w={380} h={96} kind="plain" icon={FileText} label="One brief" sub="Farmacy Food · Fall 2020" p={brief} dim={win * 0.5} labelSize={23} />
        {Array.from({ length: N }, (_, i) => {
          const x = tileX(i);
          const p = prog(f, 52 + Math.abs(i - 4.5) * 2.2, 74 + Math.abs(i - 4.5) * 2.2, EASE.inOut);
          const isWin = i === WIN;
          return (
            <Wire key={i} pts={[[960, 529], [960, 596], [x, 596], [x, TILE_Y - TILE / 2 - 4]]} p={p} tone={isWin && win > 0 ? 'accent' : 'muted'} arrow={false} width={isWin ? 2.4 + win : 1.8} opacity={isWin ? 1 : 1 - win * 0.85} />
          );
        })}
        {Array.from({ length: N }, (_, i) => {
          const x = tileX(i);
          const p = prog(f, 4 + i * 2.5, 22 + i * 2.5, EASE.outBack);
          const isWin = i === WIN;
          const dim = isWin ? 0 : win;
          return (
            <g key={i} transform={`translate(${x} ${TILE_Y}) scale(${0.6 + 0.4 * p})`} opacity={clamp(p * 1.5) * (1 - 0.75 * dim)}>
              {isWin && <rect x={-TILE / 2 - 6} y={-TILE / 2 - 6} width={TILE + 12} height={TILE + 12} rx={26} fill={C.accent} opacity={0.5 * win} filter="url(#glow)" />}
              <rect x={-TILE / 2} y={-TILE / 2} width={TILE} height={TILE} rx={22} fill={isWin ? '#1c130e' : C.surface} stroke={isWin && win > 0.05 ? C.accent : C.lineStrong} strokeWidth={isWin ? 1.8 + 1.4 * win : 1.8} />
              <g transform="translate(-19 -19)">
                <Users size={38} color={isWin ? (win > 0.5 ? C.accent : C.text2) : C.text3} strokeWidth={1.7} />
              </g>
            </g>
          );
        })}
        <text x={tileX(WIN)} y={TILE_Y + 92} textAnchor="middle" fontFamily={SANS} fontWeight={750} fontSize={26} fill={C.accentText} opacity={prog(f, 108, 120) * (1 - prog(f, 132, 142))} letterSpacing="-0.01em">
          ArchColider
        </text>
      </svg>
      <AbsoluteFill style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 170, opacity: 1 - prog(f, 128, 140) }}>
        <div style={{ position: 'relative', height: 140, width: 1400, display: 'grid', placeItems: 'center' }}>
          <Words text="Ten teams." at={8} out={38} size={132} style={{ position: 'absolute', justifyContent: 'center' }} />
          <Words text="One brief." at={56} out={84} size={132} style={{ position: 'absolute', justifyContent: 'center' }} />
          <Words text="One winner." at={102} size={132} style={{ position: 'absolute', justifyContent: 'center' }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
