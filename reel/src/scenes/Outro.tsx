import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, MONO, SANS } from '../theme';
import { EASE, mix, prog } from '../lib/anim';
import { Words } from '../lib/parts';

/** The mark, the name, what it is, where it lives. */
export function Outro() {
  const f = useCurrentFrame();
  const mark = prog(f, 0, 22, EASE.outBack);
  const ring = prog(f, 6, 40, EASE.out);
  const facts = ['11 chapters', 'English and Spanish', 'Every claim linked to the team’s repository'];
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 132, height: 132, marginBottom: 40 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 34, border: `3px solid ${C.accent}`, transform: `scale(${1 + ring * 0.9})`, opacity: (1 - ring) * 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: 34, background: C.accent, display: 'grid', placeItems: 'center', transform: `scale(${mix(0.4, 1, mark)})`, opacity: Math.min(1, mark * 1.5), boxShadow: `0 0 80px rgba(255,122,69,${0.35 * mark})` }}>
          <svg viewBox="0 0 24 24" width={76} height={76}><path d="M4 20V4h4v6l6-6h5l-7.5 7.5L20 20h-5l-5.5-6L8 16v4z" fill="#1a0d06" /></svg>
        </div>
      </div>
      <Words text="KatArch" at={14} size={168} weight={800} style={{ justifyContent: 'center', marginBottom: 34 }} />
      <div style={{ display: 'flex', gap: 22, alignItems: 'center', fontFamily: SANS, fontSize: 34, color: C.text2, marginBottom: 56 }}>
        {facts.map((t, i) => {
          const p = prog(f, 40 + i * 6, 58 + i * 6, EASE.outExpo);
          return (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 22, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
              {i > 0 && <i style={{ width: 8, height: 8, borderRadius: 4, background: C.accent, display: 'inline-block' }} />}
              {t}
            </span>
          );
        })}
      </div>
      <div style={{ opacity: prog(f, 66, 80), transform: `translateY(${(1 - prog(f, 66, 84, EASE.outExpo)) * 18}px)`, fontFamily: MONO, fontSize: 30, fontWeight: 600, color: C.text, padding: '16px 34px', border: `1.5px solid ${C.lineStrong}`, borderRadius: 999 }}>
        katarch.vercel.app
      </div>
    </AbsoluteFill>
  );
}
