import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronDown, ListOrdered, Map, Clock, Footprints, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { Chapter } from '../content/types';
import { Ctx, type ConceptData, type DecisionData, type DocData, type DrawerState } from './CourseContext';
import { Blocks } from './Blocks';
import { Drawer } from './Drawer';
import { Fit } from './Fit';
import { ThemeToggle } from './ThemeToggle';
import { SCENES } from '../visuals';
import { FrameHeadSlot } from '../visuals/kit';
import { saveProgress } from '../lib/progress';
import { LangSwitch } from './LangSwitch';
import { LocaleContext } from '../i18n/react';
import { UI } from '../i18n/ui';
import { LOCALES, readStepHash, stepHash, type Locale } from '../i18n/locales';

interface Props {
  chapter: Chapter;
  concepts: Record<string, ConceptData>;
  docs: Record<string, DocData>;
  decisions: Record<string, DecisionData>;
  next?: { href: string; title: string; available: boolean } | null;
  locale: Locale;
  /** course map URL in this locale */
  home: string;
  /** this chapter's URL in every locale (no hash), for the language switcher */
  alt: Record<Locale, string>;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Reads #step-N (English) or #paso-N (Spanish, and the pre-i18n links). */
function readHash(n: number) {
  if (typeof window === 'undefined') return 0;
  const step = readStepHash(window.location.hash);
  const i = step ? step - 1 : 0;
  return Math.min(Math.max(i, 0), n - 1);
}

export default function Player({ chapter, concepts, docs, decisions, next, locale, home, alt }: Props) {
  const ui = UI[locale];
  const steps = chapter.steps;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [evidence, setEvidence] = useState(false);
  const [asText, setAsText] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [headSlot, setHeadSlot] = useState<HTMLDivElement | null>(null);
  const [chosen, setChosen] = useState<Record<string, number | null>>({});
  const [announce, setAnnounce] = useState('');
  const reduced = !!useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const step = steps[index];
  const layout = step.layout ?? 'split';

  // hydrate from URL hash
  useEffect(() => {
    setIndex(readHash(steps.length));
    const onHash = () => setIndex(readHash(steps.length));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [steps.length]);

  const firstRun = useRef(true);
  useEffect(() => {
    const h = stepHash(locale, index + 1);
    // skip the very first run: the hash may still be about to set a later step
    if (firstRun.current) firstRun.current = false;
    else if (window.location.hash !== h) history.replaceState(null, '', h);
    saveProgress(chapter.id, index, steps.length);
    setEvidence(false);
    setAsText(false);
    setZoom(false);
    panelRef.current?.scrollTo({ top: 0 });
    setAnnounce(ui.player.announce(index + 1, steps.length, step.title));
  }, [index]);

  const go = useCallback(
    (i: number) => {
      if (i < 0 || i >= steps.length) return;
      setDir(i > index ? 1 : -1);
      setIndex(i);
    },
    [index, steps.length],
  );
  const prev = () => go(index - 1);
  const nextStep = () => go(index + 1);
  const isLast = index === steps.length - 1;

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (drawer || zoom || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable || t.getAttribute('role') === 'slider')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') {
        go(0);
      } else if (e.key === 'End') {
        go(steps.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, drawer, zoom, steps.length]);

  // touch swipe
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch') return;
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!touch.current || e.pointerType !== 'touch') return;
    const dx = e.clientX - touch.current.x;
    const dy = e.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) dx < 0 ? nextStep() : prev();
  };

  // delegate clicks on concept chips / doc refs inside rendered html
  const onContentClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-concept],[data-doc]');
    if (!el) return;
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (el.dataset.concept) setDrawer({ kind: 'concept', id: el.dataset.concept });
    else if (el.dataset.doc) setDrawer({ kind: 'doc', id: el.dataset.doc });
  };

  const ctx = useMemo(() => ({ concepts, docs, decisions, open: setDrawer }), [concepts, docs, decisions]);

  const Scene = step.visual ? SCENES[step.visual.scene] : null;
  const sceneKey = step.visual?.scene ?? 'none';

  // group steps by kicker for the progress rail
  const slide = {
    enter: (d: number) => ({ x: reduced ? 0 : d * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduced ? 0 : d * -48, opacity: 0 }),
  };

  const langHref = Object.fromEntries(LOCALES.map((l) => [l, alt[l] + stepHash(l, index + 1)])) as Record<Locale, string>;

  return (
    <LocaleContext.Provider value={locale}>
    <Ctx.Provider value={ctx}>
      <MotionConfig reducedMotion="user">
        <div className={`app app--${layout}`} onClick={onContentClick} onKeyDown={onContentClick}>
          <header className="topbar">
            <a className="brand" href={home} aria-label={ui.player.brandLabel}>
              <span className="brand__mark" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 20V4h4v6l6-6h5l-7.5 7.5L20 20h-5l-5.5-6L8 16v4z" fill="currentColor" /></svg>
              </span>
              <span className="brand__name">KatArch</span>
            </a>
            <button type="button" className="chapter-btn" onClick={() => setDrawer({ kind: 'steps' })} aria-haspopup="dialog">
              <span className="chapter-btn__n mono">{ui.player.chapterShort(chapter.number)}</span>
              <span className="chapter-btn__t">{chapter.title}</span>
              <ChevronDown size={16} aria-hidden />
            </button>
            <div className="rail" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.id} className={`rail__seg ${i < index ? 'is-done' : ''} ${i === index ? 'is-current' : ''}`} />
              ))}
            </div>
            <LangSwitch locale={locale} href={langHref} />
            <ThemeToggle locale={locale} />
          </header>

          <main className="main" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            {layout === 'cover' ? (
              <Cover chapter={chapter} onStart={() => go(1)} go={go} locale={locale} />
            ) : (
              <>
                <section className="panel" ref={panelRef} aria-labelledby="step-title">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div
                      key={step.id}
                      className="panel__inner"
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="panel__kicker">
                        <span className="panel__step">{pad(index + 1)}</span>
                        {step.kicker && <span>{step.kicker}</span>}
                      </p>
                      <h1 id="step-title" className="panel__title">{step.title}</h1>
                      <div className="prose panel__body">
                        <Blocks
                          blocks={step.blocks}
                          chosen={chosen[step.id] ?? null}
                          onChoose={(i) => setChosen((c) => ({ ...c, [step.id]: i }))}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </section>

                <section className="stage" aria-label={ui.player.stage}>
                  {/* one header row for every step: the scene's title and legend on the left, the view tools on the right */}
                  <div className="stage__head">
                    <div className="stage__frame" ref={setHeadSlot} />
                    <div className="stage__tools">
                      {(step.describe || step.evidence) && (
                        <div className="viewswitch" role="group" aria-label={ui.player.view}>
                          <button type="button" aria-pressed={!evidence && !asText} onClick={() => { setEvidence(false); setAsText(false); }}>{ui.player.viewDiagram}</button>
                          {step.describe && <button type="button" aria-pressed={asText} onClick={() => { setAsText(true); setEvidence(false); }}>{ui.player.viewText}</button>}
                          {step.evidence && <button type="button" aria-pressed={evidence} onClick={() => { setEvidence(true); setAsText(false); }}>{ui.player.viewOriginal}</button>}
                        </div>
                      )}
                      {Scene && step.visual?.scene !== 'quiz' && (
                        <button type="button" className="icon-btn stage__zoom" onClick={() => setZoom(true)} aria-haspopup="dialog" aria-label={ui.player.zoom} title={ui.player.zoom} disabled={evidence || asText}>
                          <Maximize2 size={16} aria-hidden />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="stage__canvas">
                    {/* no initial={false} here: it would propagate to every animation inside the first scene and
                        freeze the looping packets on a direct link; the first scene simply fades in */}
                    <AnimatePresence mode="wait">
                      {evidence && step.evidence ? (
                        <motion.figure key="evidence" className="evidence" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                          <a className="evidence__plate" href={step.evidence.src} target="_blank" rel="noopener noreferrer" title={ui.player.openFullSize}>
                            <img src={step.evidence.src} alt={step.evidence.alt} />
                          </a>
                          <figcaption>{step.evidence.caption}</figcaption>
                        </motion.figure>
                      ) : asText && step.describe ? (
                        <motion.div key="text" className="as-text prose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} dangerouslySetInnerHTML={{ __html: step.describe }} />
                      ) : Scene ? (
                        <motion.div key={sceneKey} className="scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                          <FrameHeadSlot.Provider value={headSlot}>
                            <Fit>
                              <Scene
                                state={step.visual?.state}
                                props={step.visual?.props}
                                chosen={chosen[step.id] ?? null}
                                reduced={reduced}
                                onNext={nextStep}
                              />
                            </Fit>
                          </FrameHeadSlot.Provider>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </section>
              </>
            )}
          </main>

          <footer className="bottombar">
            <button type="button" className="btn" onClick={prev} disabled={index === 0} aria-label={ui.player.prevLabel}>
              <ArrowLeft size={16} aria-hidden /> <span className="hide-sm">{ui.player.prev}</span>
            </button>
            <button type="button" className="counter" onClick={() => setDrawer({ kind: 'steps' })} aria-haspopup="dialog" aria-label={ui.player.allSteps}>
              <ListOrdered size={16} aria-hidden className="counter__icon" />
              <span className="counter__n">{pad(index + 1)}<span className="counter__of"> / {pad(steps.length)}</span></span>
              <span className="counter__keys hide-sm" aria-hidden><kbd>←</kbd><kbd>→</kbd></span>
            </button>
            {isLast ? (
              next?.available ? (
                <a className="btn btn--primary" href={next.href}>
                  <span className="hide-sm">{ui.player.nextChapter}</span> <ArrowRight size={16} aria-hidden />
                </a>
              ) : (
                <a className="btn btn--primary" href={home}>
                  <Map size={16} aria-hidden /> <span className="hide-sm">{ui.player.backToMap}</span>
                </a>
              )
            ) : (
              <button type="button" className="btn btn--primary" onClick={nextStep} aria-label={ui.player.nextLabel}>
                <span className="hide-sm">{index === 0 ? ui.player.start : ui.player.next}</span> <ArrowRight size={16} aria-hidden />
              </button>
            )}
          </footer>

          <div className="sr-only" aria-live="polite">{announce}</div>
          <Drawer state={drawer} onClose={() => setDrawer(null)} chapter={chapter} index={index} go={go} home={home} />
          {zoom && Scene && (
            <Zoom title={step.title} labels={{ close: ui.player.zoomClose, zoomIn: ui.player.zoomIn, zoomOut: ui.player.zoomOut, reset: ui.player.zoomReset }} onClose={() => setZoom(false)}>
              <Scene state={step.visual?.state} props={step.visual?.props} chosen={chosen[step.id] ?? null} reduced={reduced} onNext={() => setZoom(false)} />
            </Zoom>
          )}
        </div>
      </MotionConfig>
    </Ctx.Provider>
    </LocaleContext.Provider>
  );
}

const ZOOM_LEVELS = [1, 1.5, 2, 3];

/**
 * The current diagram, large, in a dialog. Zoom in/out with the buttons, + / - or Ctrl + wheel;
 * once zoomed, the view scrolls and can be dragged. Esc, the close button or the backdrop close it.
 */
function Zoom({ title, labels, onClose, children }: { title: string; labels: { close: string; zoomIn: string; zoomOut: string; reset: string }; onClose: () => void; children: React.ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [li, setLi] = useState(0);
  const level = ZOOM_LEVELS[li];

  // keep the point at the center of the view in place when the level changes
  const setLevel = useCallback((next: number) => {
    const el = bodyRef.current;
    const n = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, next));
    if (!el || n === li) return;
    const cx = (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth;
    const cy = (el.scrollTop + el.clientHeight / 2) / el.scrollHeight;
    setLi(n);
    requestAnimationFrame(() => {
      el.scrollLeft = cx * el.scrollWidth - el.clientWidth / 2;
      el.scrollTop = cy * el.scrollHeight - el.clientHeight / 2;
    });
  }, [li]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setLevel(li + 1);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setLevel(li - 1);
      } else if (e.key === '0') {
        setLevel(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, setLevel, li]);

  // Ctrl/Cmd + wheel zooms; a plain wheel scrolls the zoomed view
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setLevel(li + (e.deltaY < 0 ? 1 : -1));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setLevel, li]);

  // drag to pan once zoomed; a real drag (not a click on a box) swallows the click that follows it
  const drag = useRef<{ x: number; y: number; l: number; t: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (level === 1 || e.button !== 0) return;
    const el = bodyRef.current!;
    drag.current = { x: e.clientX, y: e.clientY, l: el.scrollLeft, t: el.scrollTop, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    if (!d.moved) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    const el = bodyRef.current!;
    el.scrollLeft = d.l - dx;
    el.scrollTop = d.t - dy;
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) {
      const swallow = (ev: Event) => { ev.stopPropagation(); ev.preventDefault(); };
      window.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => window.removeEventListener('click', swallow, { capture: true }), 0);
    }
  };

  return (
    <div className="zoom-root" role="dialog" aria-modal="true" aria-label={title}>
      <motion.div className="zoom-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
      <motion.div className="zoom" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
        <header className="zoom__head">
          <span className="zoom__title">{title}</span>
          <div className="zoom__ctl" role="group">
            <button type="button" className="icon-btn" onClick={() => setLevel(li - 1)} disabled={li === 0} aria-label={labels.zoomOut}>
              <ZoomOut size={17} aria-hidden />
            </button>
            <button type="button" className="zoom__level mono" onClick={() => setLevel(0)} aria-label={labels.reset} title={labels.reset}>
              {Math.round(level * 100)}%
            </button>
            <button type="button" className="icon-btn" onClick={() => setLevel(li + 1)} disabled={li === ZOOM_LEVELS.length - 1} aria-label={labels.zoomIn}>
              <ZoomIn size={17} aria-hidden />
            </button>
            <span className="zoom__sep" aria-hidden />
            <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={labels.close}>
              <X size={18} aria-hidden />
            </button>
          </div>
        </header>
        <div
          ref={bodyRef}
          className={`zoom__body ${level > 1 ? 'is-zoomed' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="zoom__canvas" style={{ '--z': level } as React.CSSProperties}>
            <div className="scene">
              <Fit>{children}</Fit>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Cover({ chapter, onStart, go, locale }: { chapter: Chapter; onStart: () => void; go: (i: number) => void; locale: Locale }) {
  const ui = UI[locale].cover;
  const cover = chapter.steps[0];
  // chapter route: group steps by kicker
  const groups: { label: string; first: number; count: number }[] = [];
  chapter.steps.slice(1).forEach((s, k) => {
    const label = s.kicker ?? s.title;
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.count++;
    else groups.push({ label, first: k + 1, count: 1 });
  });
  return (
    <div className="cover">
      <motion.div className="cover__main" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <p className="cover__phase">{chapter.phase}</p>
        <div className="cover__num mono" aria-hidden>{pad(chapter.number)}</div>
        <h1 className="cover__title">{chapter.title}</h1>
        <p className="cover__sub">{chapter.subtitle}</p>
        <div className="cover__meta">
          <span><Clock size={15} aria-hidden /> {ui.minutes(chapter.minutes)}</span>
          <span><Footprints size={15} aria-hidden /> {ui.steps(chapter.steps.length - 1)}</span>
        </div>
        {cover.blocks.length > 0 && (
          <div className="prose cover__intro">
            <Blocks blocks={cover.blocks} chosen={null} onChoose={() => {}} />
          </div>
        )}
        <button type="button" className="btn btn--primary cover__cta" onClick={onStart}>
          {ui.start} <ArrowRight size={16} aria-hidden />
        </button>
      </motion.div>
      <motion.aside className="cover__side" initial={{ x: 18 }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <h2 className="cover__side-title">{ui.learn}</h2>
        <ul className="cover__learn">
          {chapter.learn.map((l, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: l }} />
          ))}
        </ul>
        <h2 className="cover__side-title">{ui.route}</h2>
        <ol className="cover__route">
          {groups.map((g) => (
            <li key={g.first}>
              <button type="button" onClick={() => go(g.first)}>
                <span className="cover__route-dot" aria-hidden />
                <span>{g.label}</span>
                {g.count > 1 && <span className="cover__route-n mono">{g.count}</span>}
              </button>
            </li>
          ))}
        </ol>
      </motion.aside>
    </div>
  );
}
