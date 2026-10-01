import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Ctx } from './CourseContext';
import { Fit } from './Fit';
import { SCENES } from '../visuals';
import { LocaleContext } from '../i18n/react';

/**
 * The case-study showreel: a fixed 1920×1080 timeline that plays the course's real scenes
 * (not screenshots) under short captions. It runs on performance.now(), so the capture script
 * can drive it frame by frame with a virtual clock; in a browser it simply plays.
 */

type Shot = { id: string; from: number; to: number };
const SHOTS: Shot[] = [
  { id: 'title', from: 0, to: 4.2 },
  { id: 'app', from: 4.2, to: 11 },
  { id: 'actors', from: 11, to: 17 },
  { id: 'stream', from: 17, to: 23.5 },
  { id: 'map', from: 23.5, to: 30 },
  { id: 'bill', from: 30, to: 35.5 },
  { id: 'outro', from: 35.5, to: 40.5 },
];
export const REEL_DURATION = SHOTS[SHOTS.length - 1].to;
const FADE = 0.55;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (v: number) => 1 - Math.pow(1 - clamp(v), 3);
const easeInOut = (v: number) => {
  const x = clamp(v);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/** Entrance of one element: fades and rises in from `at` seconds of the shot, over `dur`. */
const rise = (lt: number, at: number, dur = 0.6, dist = 18) => {
  const p = ease((lt - at) / dur);
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)`, filter: `blur(${(1 - p) * 6}px)` };
};

function useClock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - t0) / 1000;
      setT(s % (REEL_DURATION + 0.5));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

/** Scripted interactions: each fires once when the shot's local time passes `at`. */
function useScript(lt: number, root: React.RefObject<HTMLElement | null>, steps: { at: number; run: (el: HTMLElement) => void }[]) {
  const fired = useRef(new Set<number>());
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    steps.forEach((s, i) => {
      if (lt >= s.at && !fired.current.has(i)) {
        fired.current.add(i);
        s.run(el);
      }
    });
  });
}
const clickText = (el: HTMLElement, selector: string, text: RegExp) => {
  const hit = [...el.querySelectorAll<HTMLElement>(selector)].find((n) => text.test(n.textContent || n.getAttribute('aria-label') || ''));
  if (hit) hit.dispatchEvent(new MouseEvent('click', { bubbles: true }));
};

function Caption({ lt, tag, title, sub }: { lt: number; tag: string; title: string; sub: string }) {
  return (
    <div className="reel-cap">
      <p className="reel-cap__tag mono" style={rise(lt, 0.15)}>{tag}</p>
      <h2 className="reel-cap__title" style={rise(lt, 0.3)}>{title}</h2>
      <p className="reel-cap__sub" style={rise(lt, 0.5)}>{sub}</p>
    </div>
  );
}

/** A real scene of the course, mounted when its shot starts, on the course's own stage styling. */
function Stage({ lt, scene, state, len }: { lt: number; scene: string; state?: string; len: number }) {
  const Scene = SCENES[scene];
  // a slow pull-in that ends at full size, so the camera never crops the diagram's edges
  const push = 0.95 + 0.05 * easeInOut(lt / len);
  return (
    <div className="reel-stage" style={{ ...rise(lt, 0.25, 0.8, 30) }}>
      <div className="reel-stage__cam" style={{ transform: `scale(${push})` }}>
        <div className="scene">
          <Fit>
            <Scene state={state} chosen={null} reduced={false} onNext={() => {}} />
          </Fit>
        </div>
      </div>
    </div>
  );
}

function TitleShot({ lt }: { lt: number }) {
  return (
    <div className="reel-title">
      <div className="reel-title__brand" style={rise(lt, 0.1, 0.7)}>
        <span className="brand__mark reel-title__mark" aria-hidden>
          <svg viewBox="0 0 24 24"><path d="M4 20V4h4v6l6-6h5l-7.5 7.5L20 20h-5l-5.5-6L8 16v4z" fill="currentColor" /></svg>
        </span>
        <span>KatArch</span>
      </div>
      <h1 className="reel-title__h" style={rise(lt, 0.45, 0.8, 26)}>
        How real architecture decisions get made
      </h1>
      <p className="reel-title__sub" style={rise(lt, 0.9, 0.8)}>
        rebuilt step by step from the winning team’s repository
      </p>
      <p className="reel-title__kicker mono" style={rise(lt, 1.35, 0.7)}>O’Reilly Software Architecture Kata · Fall 2020 · Farmacy Food</p>
    </div>
  );
}

/** The embedded course page is served by the dev server: its toolbar stays out of the picture. */
const hideDevToolbar = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
  const doc = e.currentTarget.contentDocument;
  if (!doc) return;
  const style = doc.createElement('style');
  style.textContent = 'astro-dev-toolbar { display: none !important; }';
  doc.head.appendChild(style);
};

function AppShot({ lt, len }: { lt: number; len: number }) {
  // the live course in a browser window; the camera drifts toward the diagram
  const z = easeInOut((lt - 2.2) / (len - 2.6));
  return (
    <div className="reel-app">
      <Caption lt={lt} tag="A guided course · 11 chapters" title="One idea per screen." sub="Every figure from the team, redrawn so you can walk through it step by step." />
      <div className="reel-window" style={rise(lt, 0.2, 0.9, 40)}>
        <div className="reel-window__cam" style={{ transform: `scale(${1 + 0.34 * z}) translate(${-6 * z}%, ${-4 * z}%)` }}>
          <div className="reel-window__inner">
            <div className="reel-window__bar">
              <i /><i /><i />
              <span className="reel-window__url mono">katarch.vercel.app/domain</span>
            </div>
            <iframe className="reel-window__frame" src="/domain/#step-5" title="KatArch, chapter 5" onLoad={hideDevToolbar} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramShot({ lt, len, tag, title, sub, scene, state, script = [] }: { lt: number; len: number; tag: string; title: string; sub: string; scene: string; state?: string; script?: { at: number; run: (el: HTMLElement) => void }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useScript(lt, root, script);
  return (
    <div className="reel-diagram" ref={root}>
      <Caption lt={lt} tag={tag} title={title} sub={sub} />
      <Stage lt={lt} scene={scene} state={state} len={len} />
    </div>
  );
}

function OutroShot({ lt }: { lt: number }) {
  return (
    <div className="reel-outro">
      <span className="brand__mark reel-outro__mark" style={rise(lt, 0.1, 0.7)} aria-hidden>
        <svg viewBox="0 0 24 24"><path d="M4 20V4h4v6l6-6h5l-7.5 7.5L20 20h-5l-5.5-6L8 16v4z" fill="currentColor" /></svg>
      </span>
      <h2 className="reel-outro__h" style={rise(lt, 0.35, 0.8, 24)}>KatArch</h2>
      <p className="reel-outro__facts" style={rise(lt, 0.8, 0.7)}>
        <span>11 chapters</span><i /><span>English and Spanish</span><i /><span>Every claim linked to the team’s repository</span>
      </p>
      <p className="reel-outro__url mono" style={rise(lt, 1.3, 0.7)}>katarch.vercel.app</p>
    </div>
  );
}

function renderShot(id: string, lt: number, len: number): ReactNode {
  switch (id) {
    case 'title':
      return <TitleShot lt={lt} />;
    case 'app':
      return <AppShot lt={lt} len={len} />;
    case 'actors':
      return <DiagramShot lt={lt} len={len} tag="Chapter 06 · The physical world" title="One actor per fridge." sub="Two people want the last meal. Orders line up per fridge, so nobody needs a lock." scene="actors" state="route" />;
    case 'stream':
      return (
        <DiagramShot
          lt={lt}
          len={len}
          tag="Chapter 08 · Landing in the cloud"
          title="No spaghetti with meatballs."
          sub="Producers write once to a log; every consumer reads at its own pace."
          scene="infra-stream"
          script={[
            { at: 0.05, run: (el) => clickText(el, '.frame__foot button, button', /direct calls/i) },
            { at: 2.9, run: (el) => clickText(el, '.frame__foot button, button', /log-based/i) },
          ]}
        />
      );
    case 'map':
      return (
        <DiagramShot
          lt={lt}
          len={len}
          tag="Chapter 10 · The decision map"
          title="Ten decisions, one map."
          sub="Each one as problem, decision and trade-off, with the threads that tie them together."
          scene="map-board"
          state="explore"
          script={[
            { at: 2.0, run: (el) => clickText(el, '[role="button"]', /event sourcing|full history/i) },
            { at: 3.6, run: (el) => clickText(el, '[role="button"]', /offline pin|PIN/i) },
            { at: 5.1, run: (el) => clickText(el, '[role="button"]', /scale up/i) },
          ]}
        />
      );
    case 'bill':
      return (
        <DiagramShot
          lt={lt}
          len={len}
          tag="Chapter 09 · The yearly bill"
          title="Down to the yearly bill."
          sub="Three growth scenarios from the team’s spreadsheet, priced line by line."
          scene="cost-bill"
          state="explore"
          script={[
            { at: 1.9, run: (el) => clickText(el, 'button', /^projected$/i) },
            { at: 3.5, run: (el) => clickText(el, 'button', /rapid/i) },
          ]}
        />
      );
    case 'outro':
      return <OutroShot lt={lt} />;
  }
  return null;
}

export default function Reel() {
  const t = useClock();
  const ctx = { concepts: {}, docs: {}, decisions: {}, open: () => {} };
  const live = (s: Shot) => t >= s.from - 0.001 && t < s.to + FADE;
  // the live-course shot stays mounted from the start (hidden), so its page is loaded before its turn
  const layers = SHOTS.filter((s) => live(s) || s.id === 'app');
  return (
    <LocaleContext.Provider value="en">
      <Ctx.Provider value={ctx}>
        <MotionConfig reducedMotion="never">
          <div className="reel" data-duration={REEL_DURATION}>
            {layers.map((s) => {
              const lt = t - s.from;
              const len = s.to - s.from;
              const out = clamp((t - s.to) / FADE);
              const hidden = !live(s);
              const style = hidden ? { visibility: 'hidden' as const } : out > 0 ? { opacity: 1 - easeInOut(out), filter: `blur(${out * 8}px)`, transform: `scale(${1 + out * 0.025})` } : undefined;
              return (
                <section key={s.id} className="reel-shot" style={style}>
                  {renderShot(s.id, Math.max(0, lt), len)}
                </section>
              );
            })}
            <div className="reel-rail" aria-hidden>
              {SHOTS.slice(1, -1).map((s) => (
                <span key={s.id} className={t >= s.to ? 'is-done' : t >= s.from ? 'is-on' : ''} />
              ))}
            </div>
          </div>
        </MotionConfig>
      </Ctx.Provider>
    </LocaleContext.Provider>
  );
}
