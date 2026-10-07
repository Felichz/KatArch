import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Cpu, Smartphone, Split } from 'lucide-react';
import { C, MONO, SANS } from '../theme';
import { EASE, camera, mix, prog, type Pt } from '../lib/anim';
import { Chip, Defs, Kicker, Node, Scrim, Wire, Words } from '../lib/parts';

/**
 * Chapter 6: two people want the last lasagna in the same fridge. The router puts both orders in that
 * fridge's queue; its actor serves them one at a time. No lock anywhere.
 */
const LANES = [450, 610, 770];
const QX = 1050, AX = 1455, RX = 650;
const SLOT = (i: number) => QX + 75 - i * 50; // slot 0 is the front of the queue, next to the actor

const ANA: Pt[] = [[260, 460], [452, 460], [452, 610], [RX, 610], [832, 610], [832, 450], [SLOT(0), 450]];
const BETO: Pt[] = [[260, 760], [452, 760], [452, 610], [RX, 610], [832, 610], [832, 450], [SLOT(1), 450]];

export function Actors() {
  const f = useCurrentFrame();
  const cam = camera(f, [
    { f: 0, x: 980, y: 640, w: 1860 },
    { f: 80, x: 1100, y: 600, w: 1600 },
    { f: 150, x: 1330, y: 460, w: 1220 },
    { f: 194, x: 1340, y: 440, w: 1160 },
  ]);
  const tAna = prog(f, 22, 78, EASE.inOut);
  const tBeto = prog(f, 26, 84, EASE.inOut);
  const routed = prog(f, 48, 58) * (1 - prog(f, 62, 80));
  // Ana is served first, then Beto finds the shelf empty
  const serveAna = prog(f, 96, 112, EASE.inOut);
  const serveBeto = prog(f, 128, 144, EASE.inOut);
  const stock = f >= 110 ? 0 : 1;
  const anaDone = prog(f, 112, 124, EASE.outBack);
  const betoDone = prog(f, 144, 156, EASE.outBack);
  const actorHl = prog(f, 106, 112) * (1 - prog(f, 118, 128));
  const reject = prog(f, 140, 146) * (1 - prog(f, 150, 166));
  const appear = (i: number) => prog(f, 2 + i * 3, 20 + i * 3);

  const token = (letter: string, slot: number, serve: number, arrive: number, color: string) => {
    if (arrive < 1) return null;
    const x = mix(SLOT(slot), AX - 60, serve);
    const o = 1 - prog(serve, 0.8, 1);
    return (
      <g transform={`translate(${x} 450)`} opacity={o}>
        <rect x={-18} y={-22} width={36} height={44} rx={8} fill={C.cmdSoft} stroke={color} strokeWidth={2} />
        <text y={7} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={18} fill={C.text}>{letter}</text>
      </g>
    );
  };

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox={cam.viewBox} style={{ position: 'absolute', inset: 0 }}>
        <Defs />
        <Wire pts={[[383, 460], [452, 460], [452, 610], [532, 610]]} p={prog(f, 8, 26)} tone="cmd" />
        <Wire pts={[[383, 760], [452, 760], [452, 610], [532, 610]]} p={prog(f, 10, 28)} tone="cmd" />
        {LANES.map((y, i) => (
          <g key={y}>
            <Wire pts={[[768, 610], [832, 610], [832, y], [932, y]]} p={prog(f, 12 + i * 2, 30 + i * 2)} tone="cmd" />
            <Wire pts={[[1168, y], [AX - 140, y]]} p={prog(f, 16 + i * 2, 34 + i * 2)} tone="cmd" opacity={i === 2 ? 1 - prog(f, 130, 160) : 1} />
          </g>
        ))}

        {/* orders travel behind the router, into fridge A's queue */}
        <Chip pts={ANA} t={tAna} label="Ana" tone="cmd" opacity={prog(f, 20, 25) * (tAna < 1 ? 1 : 0)} />
        <Chip pts={BETO} t={tBeto} label="Beto" tone="cmd" opacity={prog(f, 24, 29) * (tBeto < 1 ? 1 : 0)} />

        <Node x={260} y={460} w={246} h={84} icon={Smartphone} label="Ana" sub="buys from the app" p={appear(0)} />
        <Node x={260} y={760} w={246} h={84} icon={Smartphone} label="Beto" sub="the same second" p={appear(1)} />
        <Node x={RX} y={610} w={236} h={94} kind="cmp" icon={Split} label="Router" sub="reads the location" p={appear(2)} hl={routed} />

        {LANES.map((y, i) => (
          <g key={y} opacity={appear(3 + i) * (i === 0 ? 1 : 1 - 0.6 * prog(f, 90, 110)) * (i === 2 ? 1 - prog(f, 130, 160) : 1)}>
            <rect x={QX - 118} y={y - 37} width={236} height={74} rx={15} fill={C.surface} stroke={i === 0 && f > 80 ? '#5d7fbf' : C.lineStrong} strokeWidth={1.8} />
            {[0, 1, 2, 3].map((s) => <rect key={s} x={SLOT(s) - 18} y={y - 22} width={36} height={44} rx={8} fill={C.surface3} />)}
            <text x={QX} y={y + 62} textAnchor="middle" fontFamily={MONO} fontSize={14} fontWeight={600} letterSpacing="0.08em" fill={C.text3}>QUEUE</text>
          </g>
        ))}
        {token('A', 0, serveAna, tAna, C.cmd)}
        {token('B', 1, serveBeto, tBeto, C.cmd)}

        {LANES.map((y, i) => (
          <Node key={y} x={AX} y={y} w={280} h={88} kind="cmp" icon={Cpu} label={`Fridge ${'ABC'[i]} · actor`} sub={i === 0 ? `lasagna: ${stock}` : 'stock in memory'} p={appear(6 + i) * (i === 2 ? 1 - prog(f, 130, 160) : 1)} dim={i === 0 ? 0 : prog(f, 90, 110) * 0.7} hl={i === 0 ? actorHl : 0} />
        ))}
        {reject > 0 && <rect x={AX - 144} y={406} width={288} height={88} rx={16} fill="none" stroke={C.danger} strokeWidth={3} opacity={reject} />}

        <Outcome x={AX + 210} y={402} p={anaDone} color={C.evt} bg={C.evtSoft} text="Ana: bought ✓" />
        <Outcome x={AX + 210} y={500} p={betoDone} color={C.danger} bg={C.dangerSoft} text="Beto: sold out" />
      </svg>
      <Scrim size={300} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 120px 88px', opacity: 1 - prog(f, 182, 194) }}>
        <Kicker text="Chapter 06 · The physical world" at={8} style={{ marginBottom: 18 }} />
        <div style={{ display: 'flex', columnGap: 26 }}>
          <Words text="Two people." at={16} size={80} />
          <Words text="One last meal." at={46} size={80} />
          <Words text="No locks." at={118} size={80} color={C.accentText} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function Outcome({ x, y, p, color, bg, text }: { x: number; y: number; p: number; color: string; bg: string; text: string }) {
  if (p <= 0) return null;
  const w = text.length * 12.2 + 40;
  return (
    <g transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`} opacity={Math.min(1, p * 1.4)}>
      <rect x={0} y={-26} width={w} height={52} rx={14} fill={bg} stroke={color} strokeWidth={2} />
      <text x={20} y={8} fontFamily={SANS} fontWeight={700} fontSize={21} fill={C.text}>{text}</text>
    </g>
  );
}
