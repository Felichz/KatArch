import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowLeft, ArrowRight, Captions, CaptionsOff, Check, FileText, ListVideo, Maximize, Minimize, Pause, Play, RotateCcw, RotateCw, Settings2, Volume2, VolumeX } from 'lucide-react';
import { readVideoProgress, saveVideoProgress } from '../../lib/videoProgress';
import { useIdioma, type Idioma } from '../../lib/idioma';

interface Section { title: string; start: number }
interface Line { start: number; end: number; text: string }
/** one caption on screen: its words, each with the moment it is spoken */
interface Cue { start: number; end: number; words: [string, number][] }
interface Lite { id: string; number: number; title: string; poster: string; duration: number; href: string; titleEn?: string; posterEn?: string }
interface Props {
  chapter: {
    id: string; number: number; title: string; blurb: string; phase: string; duration: number; poster: string; src: string;
    sections: Section[]; transcript: Line[]; captions: Cue[]; ideas: string[];
  };
  /** the course the chapter belongs to (its page closes the last chapter) */
  course: { title: string; href: string; titleEn?: string };
  /** where this chapter's progress is stored (see progressKey in video/meta) */
  progressKey: string;
  total: number;
  prev: Lite | null;
  next: Lite | null;
  /** what a chapter is called in this course ("lección", "bloque") */
  unit?: string;
  /** the same chapter in English: when present, the page's language (lib/idioma, the switch in the top bar) picks it */
  en?: { title: string; blurb: string; phase: string; ideas: string[]; src: string; poster?: string; duration: number; sections: Section[]; transcript: Line[]; captions: Cue[] };
}

const RATES = [1, 1.25, 1.5, 2, 0.75];

type CcSize = 's' | 'm' | 'l';
type CcStyle = 'box' | 'shadow' | 'contrast';
interface CcPrefs { on: boolean; size: CcSize; style: CcStyle; follow: boolean }
const CC_KEY = 'katarch:video:cc';
const CC_DEFAULT: CcPrefs = { on: true, size: 'm', style: 'box', follow: true };
const CC_SIZES: [CcSize, string, string][] = [['s', 'Chico', 'Small'], ['m', 'Mediano', 'Medium'], ['l', 'Grande', 'Large']];
const CC_STYLES: [CcStyle, string, string][] = [['box', 'Recuadro', 'Box'], ['shadow', 'Sombra', 'Shadow'], ['contrast', 'Contraste', 'Contrast']];
const readCc = (): CcPrefs => {
  try { return { ...CC_DEFAULT, ...JSON.parse(localStorage.getItem(CC_KEY) ?? '{}') }; } catch { return CC_DEFAULT; }
};
const NEXT_IN = 8;
const fmt = (s: number) => {
  const v = Math.max(0, Math.floor(s));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`;
};
/** the last item whose start is at or before t */
const indexAt = (items: { start: number }[], t: number) => {
  let k = -1;
  for (let i = 0; i < items.length; i++) { if (items[i].start <= t + 0.05) k = i; else break; }
  return k;
};

export function Watch({ chapter: base, course, progressKey, total, prev, next, unit = 'lección', en }: Props) {
  /** when the language changes, the new video picks up at the same point of the lesson, playing if the old one was */
  const carry = useRef<{ frac: number; play: boolean } | null>(null);
  const idioma = useIdioma((l: Idioma) => {
    const v = videoRef.current;
    if (!en || !v || l === lang) return;
    carry.current = v.duration ? { frac: v.currentTime / v.duration, play: !v.paused } : null;
    setEnded(false);
  });
  // a chapter without an English version stays in Spanish, UI included
  const lang: Idioma = en ? idioma : 'es';
  const EN = lang === 'en';
  const chapter = EN && en ? { ...base, ...en } : base;
  const tx = (es: string, eng: string) => (EN ? eng : es);
  const u = EN ? (unit === 'bloque' ? 'block' : 'lesson') : unit;
  const Unit = u[0].toUpperCase() + u.slice(1);
  /** "the lesson" / "la lección" / "el bloque" */
  const theU = EN ? `the ${u}` : `${unit === 'lección' ? 'la' : 'el'} ${unit}`;
  const titleOf = (x: Lite) => (EN && x.titleEn ? x.titleEn : x.title);
  const courseTitle = EN && course.titleEn ? course.titleEn : course.title;
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPanelScroll = useRef(0);
  const lastSave = useRef(0);

  const [t, setT] = useState(0);
  const [duration, setDuration] = useState(chapter.duration);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [full, setFull] = useState(false);
  const [idle, setIdle] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [ended, setEnded] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [resumed, setResumed] = useState<number | null>(null);
  const [tab, setTab] = useState<'sections' | 'transcript'>('sections');
  const [hover, setHover] = useState<{ x: number; t: number } | null>(null);
  const [error, setError] = useState(false);
  const [cc, setCc] = useState<CcPrefs>(CC_DEFAULT);
  const [ccMenu, setCcMenu] = useState(false);
  // the caption on screen and how many of its words were already spoken (follows every frame)
  const [cap, setCap] = useState<{ i: number; w: number }>({ i: -1, w: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const line = indexAt(chapter.transcript, t);
  const section = Math.max(0, indexAt(chapter.sections, t));

  // ── wiring the media element ──
  useEffect(() => {
    const v = videoRef.current!;
    try {
      const r = Number(localStorage.getItem('katarch:video:rate'));
      if (RATES.includes(r)) { v.playbackRate = r; setRate(r); }
    } catch {}
    const p = readVideoProgress()[progressKey];
    const onMeta = () => {
      setDuration(v.duration || chapter.duration);
      const c = carry.current;
      if (c) {
        carry.current = null;
        v.currentTime = c.frac * v.duration;
        setT(v.currentTime);
        if (c.play) v.play().catch(() => {});
        return;
      }
      if (p && !p.done && p.t > 10 && p.t < v.duration - 5) { v.currentTime = p.t; setT(p.t); setResumed(p.t); }
    };
    if (v.readyState >= 1) onMeta(); else v.addEventListener('loadedmetadata', onMeta, { once: true });
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [progressKey, chapter.duration, chapter.src]);

  // the caption on screen for a moment (state only changes when the caption or its spoken word does)
  const syncCap = useCallback((now: number) => {
    const cues = chapter.captions;
    let i = -1;
    for (let k = 0; k < cues.length; k++) { if (cues[k].start > now) break; if (now < cues[k].end) { i = k; break; } }
    const w = i < 0 ? 0 : cues[i].words.filter(([, at]) => at <= now).length;
    setCap((c) => (c.i === i && c.w === w ? c : { i, w }));
  }, [chapter.captions]);

  // smooth playhead and captions: they follow every frame, the text panels follow timeupdate
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v) {
        if (railRef.current) railRef.current.style.setProperty('--p', String(v.currentTime / (v.duration || chapter.duration)));
        syncCap(v.currentTime);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [chapter.duration, syncCap]);

  // ── captions: the viewer's choices stay for the next visit ──
  useEffect(() => setCc(readCc()), []);
  const updateCc = useCallback((patch: Partial<CcPrefs>) => {
    setCc((c) => {
      const n = { ...c, ...patch };
      try { localStorage.setItem(CC_KEY, JSON.stringify(n)); } catch {}
      return n;
    });
  }, []);
  useEffect(() => {
    if (!ccMenu) return;
    const onDown = (e: PointerEvent) => { if (!menuRef.current?.contains(e.target as Node)) setCcMenu(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCcMenu(false); };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('pointerdown', onDown); window.removeEventListener('keydown', onKey); };
  }, [ccMenu]);

  const save = useCallback((force = false) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const now = Date.now();
    if (!force && now - lastSave.current < 4000) return;
    lastSave.current = now;
    saveVideoProgress(progressKey, v.currentTime, v.duration);
  }, [progressKey]);

  useEffect(() => {
    const flush = () => save(true);
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [save]);

  const play = useCallback(() => {
    const v = videoRef.current!;
    setEnded(false);
    setCountdown(null);
    v.play().catch(() => setPlaying(false));
  }, []);
  const toggle = useCallback(() => {
    const v = videoRef.current!;
    if (v.paused || v.ended) play(); else v.pause();
  }, [play]);
  const seek = useCallback((to: number, andPlay = false) => {
    const v = videoRef.current!;
    v.currentTime = Math.min(Math.max(0, to), (v.duration || chapter.duration) - 0.1);
    setT(v.currentTime);
    setEnded(false);
    setCountdown(null);
    if (andPlay && v.paused) play();
  }, [chapter.duration, play]);
  const cycleRate = () => {
    const v = videoRef.current!;
    const r = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    v.playbackRate = r;
    setRate(r);
    try { localStorage.setItem('katarch:video:rate', String(r)); } catch {}
  };
  const toggleMute = () => { const v = videoRef.current!; v.muted = !v.muted; setMuted(v.muted); };
  const toggleFull = useCallback(() => {
    const el = wrapRef.current!;
    if (document.fullscreenElement) document.exitFullscreen(); else el.requestFullscreen?.();
  }, []);
  useEffect(() => {
    const on = () => setFull(document.fullscreenElement === wrapRef.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  // ── controls hide while playing and the pointer rests ──
  const idleTimer = useRef<number>(0);
  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 2600);
  }, []);
  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  // ── keyboard, page-wide (except inside fields and the tab list) ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('input, textarea, select, [contenteditable]') || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === ' ' || k === 'k') { if (el.tagName === 'BUTTON' && k === ' ') return; e.preventDefault(); toggle(); wake(); }
      else if (k === 'arrowleft' || k === 'j') { if (el.getAttribute('role') === 'slider') return; e.preventDefault(); seek(videoRef.current!.currentTime - (k === 'j' ? 10 : 5)); wake(); }
      else if (k === 'arrowright' || k === 'l') { if (el.getAttribute('role') === 'slider') return; e.preventDefault(); seek(videoRef.current!.currentTime + (k === 'l' ? 10 : 5)); wake(); }
      else if (k === 'f') { e.preventDefault(); toggleFull(); }
      else if (k === 'm') { e.preventDefault(); toggleMute(); }
      else if (k === 'c') { e.preventDefault(); updateCc({ on: !cc.on }); wake(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ── the next chapter starts on its own after a short countdown ──
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) { if (next) window.location.href = next.href; return; }
    const id = window.setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [countdown, next]);

  // ── the transcript follows the voice, unless the reader is scrolling it ──
  useEffect(() => {
    if (tab !== 'transcript' || line < 0 || !playing) return;
    if (Date.now() - lastPanelScroll.current < 4000) return;
    const panel = panelRef.current;
    const el = panel?.querySelector<HTMLElement>(`[data-line="${line}"]`);
    if (panel && el) panel.scrollTo({ top: el.offsetTop - panel.clientHeight / 2 + el.clientHeight / 2, behavior: 'smooth' });
  }, [line, tab, playing]);

  useEffect(() => {
    if (resumed === null) return;
    const id = window.setTimeout(() => setResumed(null), 7000);
    return () => window.clearTimeout(id);
  }, [resumed]);

  // ── scrubber ──
  const trackRef = useRef<HTMLDivElement>(null);
  const ratioAt = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };
  const onScrubDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    seek(ratioAt(e.clientX) * duration);
  };
  const onScrubMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = ratioAt(e.clientX);
    setHover({ x: r, t: r * duration });
    if (e.buttons & 1) seek(r * duration);
  };
  const onScrubKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const v = videoRef.current!;
    const step = { ArrowLeft: -5, ArrowRight: 5, PageDown: -30, PageUp: 30 }[e.key];
    if (step) { e.preventDefault(); seek(v.currentTime + step); }
    if (e.key === 'Home') { e.preventDefault(); seek(0); }
    if (e.key === 'End') { e.preventDefault(); seek(duration - 1); }
  };
  const hoverSection = hover ? chapter.sections[Math.max(0, indexAt(chapter.sections, hover.t))] : null;

  const showControls = !playing || !idle || !!hover || ccMenu;
  const cue = cc.on && cap.i >= 0 && !ended ? chapter.captions[cap.i] : null;
  const remaining = useMemo(() => fmt(duration - t), [duration, t]);

  return (
    <main className="vw">
      <div className="vw__main">
        <div
          ref={wrapRef}
          className={`vp${playing ? ' is-playing' : ''}${showControls ? '' : ' is-idle'}${full ? ' is-full' : ''}`}
          onPointerMove={wake}
          onPointerLeave={() => playing && setIdle(true)}
        >
          <div className="vp__screen">
          <video
            ref={videoRef}
            className="vp__video"
            src={chapter.src}
            poster={chapter.poster}
            preload="metadata"
            playsInline
            onClick={toggle}
            onDoubleClick={toggleFull}
            onPlay={() => { setPlaying(true); setStarted(true); setResumed(null); wake(); }}
            onPause={() => { setPlaying(false); save(true); }}
            onWaiting={() => setWaiting(true)}
            onPlaying={() => setWaiting(false)}
            onCanPlay={() => setWaiting(false)}
            onTimeUpdate={(e) => { setT(e.currentTarget.currentTime); syncCap(e.currentTarget.currentTime); save(); }}
            onSeeked={(e) => syncCap(e.currentTarget.currentTime)}
            onProgress={(e) => { const v = e.currentTarget; if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1) / (v.duration || chapter.duration)); }}
            onEnded={() => { setEnded(true); setPlaying(false); saveVideoProgress(progressKey, videoRef.current!.duration, videoRef.current!.duration); if (next) setCountdown(NEXT_IN); }}
            onError={() => setError(true)}
            aria-label={`${tx('Video de', 'Video of')} ${theU} ${chapter.number}: ${chapter.title}`}
          />
          <div className={`vcc vcc--${cc.size} vcc--${cc.style}${cc.follow ? ' vcc--follow' : ''}`} aria-hidden="true">
            {cue && (
              <p key={cap.i} className="vcc__box">
                {cue.words.map(([w], k) => (
                  <span key={k} className={k < cap.w ? 'is-said' : undefined}>{w}{k < cue.words.length - 1 ? ' ' : ''}</span>
                ))}
              </p>
            )}
          </div>
          </div>

          {!started && !ended && (
            <button type="button" className="vp__big" onClick={play} aria-label={`${tx('Reproducir', 'Play')} ${theU}`}>
              <Play size={30} fill="currentColor" strokeWidth={0} />
            </button>
          )}
          {waiting && playing && <span className="vp__spin" aria-label={tx('Cargando', 'Loading')} />}
          {error && <p className="vp__error" role="alert">{tx('No se pudo cargar el video. Revisa tu conexión y vuelve a intentarlo.', "The video couldn't load. Check your connection and try again.")}</p>}
          {resumed !== null && (
            <div className="vp__resume" role="status">
              <span>{tx('Retomas en', 'Resuming at')} {fmt(resumed)}</span>
              <button type="button" onClick={() => { seek(0); setResumed(null); }}>{tx('Empezar de nuevo', 'Start over')}</button>
            </div>
          )}

          {ended && (
            <div className="vp__end">
              {next ? (
                <>
                  <p className="vp__end-k">{EN ? `Up next: ${u} ${next.number}` : `Sigue ${theU} ${next.number}`}</p>
                  <a className="vp__next" href={next.href}>
                    <img src={EN && next.posterEn ? next.posterEn : next.poster} alt="" width="320" height="180" />
                    <span className="vp__next-t">{titleOf(next)}</span>
                    {countdown !== null && countdown > 0 && (
                      <span className="vp__count" style={{ ['--k' as string]: String(countdown / NEXT_IN) }} aria-label={EN ? `Starts in ${countdown} seconds` : `Empieza en ${countdown} segundos`}>{countdown}</span>
                    )}
                  </a>
                  <div className="vp__end-a">
                    <a className="vbtn vbtn--primary" href={next.href}><Play size={15} fill="currentColor" strokeWidth={0} /> {tx('Ver ahora', 'Watch now')}</a>
                    {countdown !== null && <button type="button" className="vbtn vbtn--quiet" onClick={() => setCountdown(null)}>{tx('Quedarme aquí', 'Stay here')}</button>}
                    <button type="button" className="vbtn vbtn--quiet" onClick={() => seek(0, true)}><RotateCcw size={15} /> {tx('Ver otra vez', 'Watch again')}</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="vp__end-k">{tx('Terminaste el curso', 'You finished the course')}</p>
                  <p className="vp__end-t">{tx('Ahora, tu próximo sistema.', 'Now, your next system.')}</p>
                  <div className="vp__end-a">
                    <a className="vbtn vbtn--primary" href="/">{tx('Ver otros cursos', 'See other courses')}</a>
                    <a className="vbtn vbtn--quiet" href={course.href}>{tx('Volver al temario', 'Back to the course')}</a>
                    <button type="button" className="vbtn vbtn--quiet" onClick={() => seek(0, true)}><RotateCcw size={15} /> {tx('Ver otra vez', 'Watch again')}</button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="vp__ctrl" aria-hidden={!showControls}>
            <div
              ref={trackRef}
              className="vp__track"
              role="slider"
              tabIndex={0}
              aria-label={tx('Posición en el video', 'Position in the video')}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(t)}
              aria-valuetext={`${fmt(t)} ${tx('de', 'of')} ${fmt(duration)}, ${chapter.sections[section]?.title ?? ''}`}
              onPointerDown={onScrubDown}
              onPointerMove={onScrubMove}
              onPointerLeave={() => setHover(null)}
              onKeyDown={onScrubKey}
            >
              <span ref={railRef} className="vp__rail">
                <span className="vp__buf" style={{ width: `${buffered * 100}%` }} />
                <span className="vp__fill" />
                <span className="vp__knob" />
                {chapter.sections.slice(1).map((s) => (
                  <span key={s.start} className="vp__tick" style={{ left: `${(s.start / duration) * 100}%` }} />
                ))}
              </span>
              {hover && (
                <span className="vp__tip" style={{ left: `${hover.x * 100}%` }}>
                  <b>{fmt(hover.t)}</b>
                  {hoverSection && <span>{hoverSection.title}</span>}
                </span>
              )}
            </div>
            <div className="vp__row">
              <button type="button" className="vp__btn" onClick={toggle} aria-label={playing ? tx('Pausar', 'Pause') : tx('Reproducir', 'Play')}>
                {playing ? <Pause size={19} fill="currentColor" strokeWidth={0} /> : <Play size={19} fill="currentColor" strokeWidth={0} />}
              </button>
              <button type="button" className="vp__btn hide-xs" onClick={() => seek(t - 10)} aria-label={tx('Retroceder 10 segundos', 'Back 10 seconds')}><RotateCcw size={17} /></button>
              <button type="button" className="vp__btn hide-xs" onClick={() => seek(t + 10)} aria-label={tx('Adelantar 10 segundos', 'Forward 10 seconds')}><RotateCw size={17} /></button>
              <span className="vp__time"><span>{fmt(t)}</span><span className="vp__time-of"> / {fmt(duration)}</span></span>
              <span className="vp__sec hide-xs">{chapter.sections[section]?.title}</span>
              <span className="vp__sp" />
              <div className="vp__ccw" ref={menuRef}>
                <button type="button" className={`vp__btn${cc.on ? ' is-on' : ''}`} onClick={() => updateCc({ on: !cc.on })} aria-pressed={cc.on} aria-label={cc.on ? tx('Ocultar subtítulos', 'Hide captions') : tx('Mostrar subtítulos', 'Show captions')}>
                  {cc.on ? <Captions size={19} /> : <CaptionsOff size={19} />}
                </button>
                <button type="button" className="vp__btn" onClick={() => setCcMenu((o) => !o)} aria-expanded={ccMenu} aria-haspopup="dialog" aria-label={tx('Apariencia de los subtítulos', 'Caption appearance')}>
                  <Settings2 size={17} />
                </button>
                {ccMenu && (
                  <div className="vp__menu" role="dialog" aria-label={tx('Subtítulos', 'Captions')}>
                    <div className="vp__menu-r vp__menu-r--h">
                      <span>{tx('Subtítulos', 'Captions')}</span>
                      <button type="button" role="switch" aria-checked={cc.on} aria-label={tx('Mostrar subtítulos', 'Show captions')} className="vsw" onClick={() => updateCc({ on: !cc.on })}><span /></button>
                    </div>
                    <fieldset>
                      <legend>{tx('Tamaño', 'Size')}</legend>
                      <div className="vseg">
                        {CC_SIZES.map(([v, les, len]) => <button key={v} type="button" aria-pressed={cc.size === v} onClick={() => updateCc({ size: v, on: true })}>{EN ? len : les}</button>)}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>{tx('Estilo', 'Style')}</legend>
                      <div className="vseg">
                        {CC_STYLES.map(([v, les, len]) => <button key={v} type="button" aria-pressed={cc.style === v} onClick={() => updateCc({ style: v, on: true })}>{EN ? len : les}</button>)}
                      </div>
                    </fieldset>
                    <div className="vp__menu-r">
                      <span>{tx('Resaltar cada palabra', 'Highlight each word')}</span>
                      <button type="button" role="switch" aria-checked={cc.follow} aria-label={tx('Resaltar cada palabra al decirla', 'Highlight each word as it is spoken')} className="vsw" onClick={() => updateCc({ follow: !cc.follow })}><span /></button>
                    </div>
                  </div>
                )}
              </div>
              <button type="button" className="vp__btn vp__rate" onClick={cycleRate} aria-label={EN ? `Speed: ${rate}x. Change` : `Velocidad: ${rate}x. Cambiar`}>{rate}×</button>
              <button type="button" className="vp__btn" onClick={toggleMute} aria-label={muted ? tx('Activar sonido', 'Unmute') : tx('Silenciar', 'Mute')}>
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button type="button" className="vp__btn" onClick={toggleFull} aria-label={full ? tx('Salir de pantalla completa', 'Exit full screen') : tx('Pantalla completa', 'Full screen')}>
                {full ? <Minimize size={17} /> : <Maximize size={17} />}
              </button>
            </div>
          </div>
        </div>

        <section className="vw__info" aria-labelledby="vw-title">
          <h1 id="vw-title" className="vw__title">{chapter.title}</h1>
          <p className="vw__meta">
            <a href={course.href}>{courseTitle}</a>
            {chapter.number >= 1 && chapter.number <= total && <span>{Unit} {chapter.number} {tx('de', 'of')} {total}</span>}
            <span>{fmt(chapter.duration)}</span>
            <span>{chapter.phase}</span>
            {playing || t > 1 ? <span className="vw__left">{tx('Quedan', 'Left:')} {remaining}</span> : null}
          </p>
          <p className="vw__blurb">{chapter.blurb}</p>
          <div className="vw__actions">
            {next && <a className="vbtn vbtn--primary" href={next.href}>{EN ? `Next ${u}` : `Siguiente ${unit}`} <ArrowRight size={16} /></a>}
          </div>

          <div className="vw__ideas">
            <h2>{tx('Lo que te llevas', 'What you take away')}</h2>
            <ul>
              {chapter.ideas.map((idea) => (
                <li key={idea}><Check size={16} aria-hidden="true" /> <span>{idea}</span></li>
              ))}
            </ul>
          </div>

          <nav className="vw__pn" aria-label={tx('Lecciones', 'Lessons')}>
            {prev ? (
              <a className="vw__pn-a" href={prev.href}>
                <span className="vw__pn-k"><ArrowLeft size={14} /> {tx('Anterior', 'Previous')}</span>
                <span className="vw__pn-t">{prev.number}. {titleOf(prev)}</span>
              </a>
            ) : <span />}
            {next ? (
              <a className="vw__pn-a vw__pn-a--next" href={next.href}>
                <span className="vw__pn-k">{tx('Siguiente', 'Next')} <ArrowRight size={14} /></span>
                <span className="vw__pn-t">{next.number}. {titleOf(next)}</span>
              </a>
            ) : <span />}
          </nav>
        </section>
      </div>

      <aside className="vw__side" aria-label={EN ? `Contents of ${theU}` : `Contenido ${unit === 'lección' ? 'de la' : 'del'} ${unit}`}>
        <div className="vtabs" role="tablist" aria-label={tx('Contenido', 'Contents')}>
          <button type="button" role="tab" id="tab-sec" aria-controls="panel" aria-selected={tab === 'sections'} onClick={() => setTab('sections')}>
            <ListVideo size={16} /> {tx('Secciones', 'Sections')}
          </button>
          <button type="button" role="tab" id="tab-tr" aria-controls="panel" aria-selected={tab === 'transcript'} onClick={() => setTab('transcript')}>
            <FileText size={16} /> {tx('Transcripción', 'Transcript')}
          </button>
        </div>
        <div
          id="panel"
          ref={panelRef}
          className="vw__panel"
          role="tabpanel"
          aria-labelledby={tab === 'sections' ? 'tab-sec' : 'tab-tr'}
          onWheel={() => (lastPanelScroll.current = Date.now())}
          onTouchMove={() => (lastPanelScroll.current = Date.now())}
        >
          {tab === 'sections' ? (
            <ol className="vsecs">
              {chapter.sections.map((s, k) => {
                const end = chapter.sections[k + 1]?.start ?? duration;
                const state = k < section ? 'past' : k === section ? 'now' : 'next';
                return (
                  <li key={s.start}>
                    <button type="button" className={`vsec vsec--${state}`} onClick={() => seek(s.start, true)} aria-current={k === section ? 'true' : undefined}>
                      <span className="vsec__time">{fmt(s.start)}</span>
                      <span className="vsec__t">{s.title}</span>
                      <span className="vsec__len">{fmt(end - s.start)}</span>
                      {k === section && <span className="vsec__bar" style={{ ['--p' as string]: String(Math.min(1, Math.max(0, (t - s.start) / (end - s.start)))) }} />}
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : (
            <ol className="vtr">
              {chapter.transcript.map((l, k) => (
                <li key={k}>
                  <button type="button" data-line={k} className={`vtr__l${k === line ? ' is-now' : k < line ? ' is-past' : ''}`} onClick={() => seek(l.start, true)}>
                    <span className="vtr__time">{fmt(l.start)}</span>
                    <span className="vtr__text">{l.text}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
        <p className="vw__keys"><kbd>{tx('Espacio', 'Space')}</kbd> {tx('pausa', 'pause')} · <kbd>←</kbd> <kbd>→</kbd> 5 s · <kbd>C</kbd> {tx('subtítulos', 'captions')} · <kbd>F</kbd> {tx('pantalla completa', 'full screen')}</p>
      </aside>
    </main>
  );
}
