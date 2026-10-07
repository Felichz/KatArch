import React from 'react';
import type { ReactNode } from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Backdrop } from './lib/parts';
import { EASE, prog } from './lib/anim';
import { Title } from './scenes/Title';
import { Sketch } from './scenes/Sketch';
import { Acl } from './scenes/Acl';
import { Actors } from './scenes/Actors';
import { Sieve } from './scenes/Sieve';
import { Bill } from './scenes/Bill';
import { Outro } from './scenes/Outro';

/** Shots and their overlaps (frames at 30 fps). Match cuts overlap briefly; the rest dissolve. */
const SHOTS: { from: number; dur: number; el: ReactNode; fadeIn?: number; fadeOut?: number }[] = [
  { from: 0, dur: 152, el: <Title />, fadeIn: 0, fadeOut: 12 },
  { from: 142, dur: 222, el: <Sketch />, fadeIn: 12, fadeOut: 10 },
  { from: 356, dur: 252, el: <Acl />, fadeIn: 10, fadeOut: 12 },
  { from: 596, dur: 196, el: <Actors />, fadeIn: 12, fadeOut: 14 },
  { from: 778, dur: 196, el: <Sieve />, fadeIn: 14, fadeOut: 14 },
  { from: 960, dur: 156, el: <Bill />, fadeIn: 14, fadeOut: 14 },
  { from: 1102, dur: 140, el: <Outro />, fadeIn: 14, fadeOut: 0 },
];
export const DURATION = SHOTS[SHOTS.length - 1].from + SHOTS[SHOTS.length - 1].dur;

function Shell({ dur, fadeIn = 10, fadeOut = 10, children }: { dur: number; fadeIn?: number; fadeOut?: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const a = fadeIn ? prog(f, 0, fadeIn, EASE.inOut) : 1;
  const b = fadeOut ? 1 - prog(f, dur - fadeOut, dur, EASE.inOut) : 1;
  const o = Math.min(a, b);
  const blur = (1 - o) * 10;
  return <AbsoluteFill style={{ opacity: o, filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>{children}</AbsoluteFill>;
}

export function Reel() {
  return (
    <AbsoluteFill style={{ background: '#07090d' }}>
      <Backdrop />
      {SHOTS.map((s, i) => (
        <Sequence key={i} from={s.from} durationInFrames={s.dur}>
          <Shell dur={s.dur} fadeIn={s.fadeIn} fadeOut={s.fadeOut}>{s.el}</Shell>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
