import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BookOpen, ChefHat, Filter, Heart, ShoppingCart, Smartphone, Sparkles, Star } from 'lucide-react';
import { C } from '../theme';
import { EASE, camera, prog, type Pt } from '../lib/anim';
import { Chip, Defs, Kicker, Node, Scrim, Tag, Wire, Words } from '../lib/parts';

/**
 * Chapter 5's anti-corruption layer as one continuous shot: the camera rides a piece of kitchen data
 * through its translator into the domain, then pulls back as the domain's event fans out.
 */
const EXT = [
  { k: 'gk', label: 'Ghost Kitchen', icon: ChefHat, y: 400 },
  { k: 'lm', label: 'Loyalty Mgmt', icon: Heart, y: 560 },
  { k: 'fe', label: 'Front End + PoS', icon: Smartphone, y: 720 },
];
const TR = [
  { k: 'mo', label: 'Meals Offer', y: 400 },
  { k: 'ly', label: 'Loyalty', y: 560 },
  { k: 'api', label: 'Menu Catalog API', y: 720 },
];
const CONS = [
  { k: 'cart', label: 'Shopping Cart', icon: ShoppingCart, y: 340 },
  { k: 'rec', label: 'Recommendations', icon: Sparkles, y: 500 },
  { k: 'rev', label: 'Reviews', icon: Star, y: 660 },
  { k: 'fil', label: 'Filtering', icon: Filter, y: 820 },
];
const EX = 330, TX = 680, D: Pt = [1065, 560], CX = 1535;
const dOut = (cy: number): Pt => [D[0] + 135, D[1] + (cy - D[1]) / 5];

const RAW: Pt[] = [[EX, 400], [TX, 400]];
const INTERNAL: Pt[] = [[TX, 400], [800, 400], [928, 534], [D[0], D[1]]];

export function Acl() {
  const f = useCurrentFrame();
  // the raw chip rides 52→96, the translated one 104→146, then the event fans out
  const tRaw = prog(f, 52, 96, EASE.inOut);
  const tInt = prog(f, 104, 146, EASE.inOut);
  const cam = camera(f, [
    { f: 0, x: D[0], y: D[1], w: 420 },
    { f: 34, x: D[0] - 40, y: D[1] - 40, w: 1300 },
    { f: 52, x: 480, y: 370, w: 940 },
    { f: 96, x: TX - 10, y: 370, w: 880 },
    { f: 104, x: TX + 20, y: 362, w: 900 },
    { f: 146, x: 930, y: 404, w: 1080 },
    { f: 188, x: 1080, y: 500, w: 1920 },
    { f: 236, x: 1110, y: 505, w: 1860 },
  ]);
    const flash = prog(f, 96, 102) * (1 - prog(f, 108, 124));
  const pulse = prog(f, 146, 154) * (1 - prog(f, 160, 180));
  const fan = (i: number) => prog(f, 156 + i * 3, 190 + i * 3, EASE.inOut);
  const zones = prog(f, 20, 44);
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} viewBox={cam.viewBox} style={{ position: 'absolute', inset: 0 }}>
        <Defs />
        {/* service boundary and the layer */}
        <rect x={500} y={250} width={1220} height={640} rx={26} fill="none" stroke={C.lineStrong} strokeWidth={2} strokeDasharray="10 9" opacity={zones} />
        <Tag x={524} y={280} opacity={zones} size={15}>Menu Catalog · service</Tag>
        <rect x={548} y={340} width={264} height={458} rx={22} fill="rgba(245,180,84,0.07)" stroke="#f5b454" strokeOpacity={0.55} strokeWidth={2} strokeDasharray="8 7" opacity={zones} />
        <Tag x={TX} y={330} anchor="middle" opacity={zones} size={15} color="#f5b454">Anti-corruption layer</Tag>

        {EXT.map((e) => <Wire key={e.k} pts={[[EX + 138, e.y], [TX - 126, e.y]]} p={prog(f, 26, 44)} />)}
        {TR.map((t) => <Wire key={t.k} pts={[[TX + 124, t.y], dOut(t.y).map((v, i) => (i ? v : D[0] - 140)) as Pt]} p={prog(f, 30, 48)} tone="cmd" dashed />)}
        {CONS.map((c, i) => <Wire key={c.k} pts={[dOut(c.y), [CX - 158, c.y]]} p={prog(f, 34 + i * 2, 52 + i * 2)} tone="evt" dashed />)}
        <Wire pts={[[CX + 158, 340], [1830, 340]]} p={prog(f, 40, 56)} />
        <Tag x={1830} y={318} anchor="end" size={13} opacity={prog(f, 44, 56)}>to Ordering</Tag>
        <Tag x={D[0]} y={D[1] + 96} anchor="middle" size={14} color={C.evt} opacity={prog(f, 150, 166)}>stock updated</Tag>

        {/* the raw chip leaves the kitchen and slides behind the translator */}
        <Chip pts={RAW} t={tRaw} label="40 lasagnas · their format" tone="muted" opacity={prog(f, 50, 56) * (1 - prog(f, 94, 98))} />

        {EXT.map((e, i) => <Node key={e.k} x={EX} y={e.y} w={276} h={80} kind="ext" icon={e.icon} label={e.label} p={prog(f, 14 + i * 3, 34 + i * 3)} hl={e.k === 'gk' ? prog(f, 44, 52) * (1 - prog(f, 70, 84)) : 0} />)}

        {/* translated: it leaves as the domain's own language */}
        <Chip pts={INTERNAL} t={tInt} label="internal format" tone="cmd" opacity={prog(f, 102, 108) * (1 - prog(f, 143, 147))} />
        {CONS.map((c, i) => (
          <Chip key={c.k} pts={[dOut(c.y), [CX - 150, c.y]]} t={fan(i)} tone="evt" opacity={prog(f, 154 + i * 3, 160 + i * 3) * (1 - prog(f, 186 + i * 3, 192 + i * 3))} />
        ))}
        <Chip pts={[[CX + 158, 340], [2020, 340]]} t={prog(f, 214, 246, EASE.in)} tone="cmd" opacity={prog(f, 212, 216)} />

        {TR.map((t, i) => <Node key={t.k} x={TX} y={t.y} w={248} h={80} kind="plain" label={t.label} sub="translates" p={prog(f, 20 + i * 3, 40 + i * 3)} hl={t.k === 'mo' ? flash : 0} />)}
        <Node x={D[0]} y={D[1]} w={270} h={120} kind="core" icon={BookOpen} label="Menu Catalog" sub="the pure domain" labelSize={24} hl={pulse} />
        {CONS.map((c, i) => <Node key={c.k} x={CX} y={c.y} w={312} h={78} kind="cmp" icon={c.icon} label={c.label} p={prog(f, 26 + i * 3, 46 + i * 3)} hl={fan(i) > 0.97 ? 1 - prog(f, 192 + i * 3, 214 + i * 3) : 0} />)}
      </svg>
      <Scrim side="top" size={330} />
      <AbsoluteFill style={{ justifyContent: 'flex-start', padding: '84px 120px 0' }}>
        <Kicker text="Chapter 05 · The customs office" at={40} out={238} style={{ marginBottom: 18 }} />
        <div style={{ position: 'relative', height: 96 }}>
          <Words text="Their format dies at the border." at={52} out={148} size={80} style={{ position: 'absolute', top: 0 }} />
          <Words text="The domain only hears its own language." at={170} out={238} size={80} style={{ position: 'absolute', top: 0 }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
