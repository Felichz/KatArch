import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, FileText, ListVideo, Maximize, Minimize, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';
import { readVideoProgress, saveVideoProgress } from '../../lib/videoProgress';

interface Section { title: string; start: number }
interface Line { start: number; end: number; text: string }
interface Lite { id: string; number: number; title: string; poster: string; duration: number; href: string }
interface Props {
  chapter: {
    id: string; number: number; title: string; blurb: string; phase: string; duration: number; poster: string; src: string;
    sections: Section[]; transcript: Line[]; ideas: string[];
  };
  total: number;
  prev: Lite | null;
  next: Lite | null;
  textHref: string;
}

const RATES = [1, 1.25, 1.5, 2, 0.75];
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

export function Watch({ chapter, total, prev, next, textHref }: Props) {
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

  const line = indexAt(chapter.transcript, t);
  const section = Math.max(0, indexAt(chapter.sections, t));

  // ── wiring the media element ──
  useEffect(() => {
    const v = videoRef.current!;
    try {
      const r = Number(localStorage.getItem('katarch:video:rate'));
      if (RATES.includes(r)) { v.playbackRate = r; setRate(r); }
    } catch {}
    const p = readVideoProgress()[chapter.id];
    const onMeta = () => {
      setDuration(v.duration || chapter.duration);
      if (p && !p.done && p.t > 10 && p.t < v.duration - 5) { v.currentTime = p.t; setT(p.t); setResumed(p.t); }
    };
    if (v.readyState >= 1) onMeta(); else v.addEventListener('loadedmetadata', onMeta, { once: true });
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [chapter.id, chapter.duration]);

  // smooth playhead: the bar follows every frame, the text panels follow timeupdate
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && railRef.current) railRef.current.style.setProperty('--p', String(v.currentTime / (v.duration || chapter.duration)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [chapter.duration]);

  const save = useCallback((force = false) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const now = Date.now();
    if (!force && now - lastSave.current < 4000) return;
    lastSave.current = now;
    saveVideoProgress(chapter.id, v.currentTime, v.duration);
  }, [chapter.id]);

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

  const showControls = !playing || !idle || !!hover;
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
            onTimeUpdate={(e) => { setT(e.currentTarget.currentTime); save(); }}
            onProgress={(e) => { const v = e.currentTarget; if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1) / (v.duration || chapter.duration)); }}
            onEnded={() => { setEnded(true); setPlaying(false); saveVideoProgress(chapter.id, videoRef.current!.duration, videoRef.current!.duration); if (next) setCountdown(NEXT_IN); }}
            onError={() => setError(true)}
            aria-label={`Video del capítulo ${chapter.number}: ${chapter.title}`}
          />

          {!started && !ended && (
            <button type="button" className="vp__big" onClick={play} aria-label="Reproducir el capítulo">
              <Play size={30} fill="currentColor" strokeWidth={0} />
            </button>
          )}
          {waiting && playing && <span className="vp__spin" aria-label="Cargando" />}
          {error && <p className="vp__error" role="alert">No se pudo cargar el video. Revisa tu conexión y vuelve a intentarlo.</p>}
          {resumed !== null && (
            <div className="vp__resume" role="status">
              <span>Retomas en {fmt(resumed)}</span>
              <button type="button" onClick={() => { seek(0); setResumed(null); }}>Empezar de nuevo</button>
            </div>
          )}

          {ended && (
            <div className="vp__end">
              {next ? (
                <>
                  <p className="vp__end-k">Sigue el capítulo {next.number}</p>
                  <a className="vp__next" href={next.href}>
                    <img src={next.poster} alt="" width="320" height="180" />
                    <span className="vp__next-t">{next.title}</span>
                    {countdown !== null && countdown > 0 && (
                      <span className="vp__count" style={{ ['--k' as string]: String(countdown / NEXT_IN) }} aria-label={`Empieza en ${countdown} segundos`}>{countdown}</span>
                    )}
                  </a>
                  <div className="vp__end-a">
                    <a className="vbtn vbtn--primary" href={next.href}><Play size={15} fill="currentColor" strokeWidth={0} /> Ver ahora</a>
                    {countdown !== null && <button type="button" className="vbtn vbtn--quiet" onClick={() => setCountdown(null)}>Quedarme aquí</button>}
                    <button type="button" className="vbtn vbtn--quiet" onClick={() => seek(0, true)}><RotateCcw size={15} /> Ver otra vez</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="vp__end-k">Terminaste el curso</p>
                  <p className="vp__end-t">Ahora, tu próximo sistema.</p>
                  <div className="vp__end-a">
                    <a className="vbtn vbtn--primary" href="/">Volver al inicio</a>
                    <button type="button" className="vbtn vbtn--quiet" onClick={() => seek(0, true)}><RotateCcw size={15} /> Ver otra vez</button>
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
              aria-label="Posición en el video"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(t)}
              aria-valuetext={`${fmt(t)} de ${fmt(duration)}, ${chapter.sections[section]?.title ?? ''}`}
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
              <button type="button" className="vp__btn" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
                {playing ? <Pause size={19} fill="currentColor" strokeWidth={0} /> : <Play size={19} fill="currentColor" strokeWidth={0} />}
              </button>
              <button type="button" className="vp__btn hide-xs" onClick={() => seek(t - 10)} aria-label="Retroceder 10 segundos"><RotateCcw size={17} /></button>
              <button type="button" className="vp__btn hide-xs" onClick={() => seek(t + 10)} aria-label="Adelantar 10 segundos"><RotateCw size={17} /></button>
              <span className="vp__time"><span>{fmt(t)}</span><span className="vp__time-of"> / {fmt(duration)}</span></span>
              <span className="vp__sec hide-xs">{chapter.sections[section]?.title}</span>
              <span className="vp__sp" />
              <button type="button" className="vp__btn vp__rate" onClick={cycleRate} aria-label={`Velocidad: ${rate}x. Cambiar`}>{rate}×</button>
              <button type="button" className="vp__btn" onClick={toggleMute} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button type="button" className="vp__btn" onClick={toggleFull} aria-label={full ? 'Salir de pantalla completa' : 'Pantalla completa'}>
                {full ? <Minimize size={17} /> : <Maximize size={17} />}
              </button>
            </div>
          </div>
        </div>

        <section className="vw__info" aria-labelledby="vw-title">
          <h1 id="vw-title" className="vw__title">{chapter.title}</h1>
          <p className="vw__meta">
            <span>Capítulo {chapter.number} de {total}</span>
            <span>{fmt(chapter.duration)}</span>
            <span>{chapter.phase}</span>
            {playing || t > 1 ? <span className="vw__left">Quedan {remaining}</span> : null}
          </p>
          <p className="vw__blurb">{chapter.blurb}</p>
          <div className="vw__actions">
            {next && <a className="vbtn vbtn--primary" href={next.href}>Siguiente capítulo <ArrowRight size={16} /></a>}
            <a className="vbtn vbtn--quiet" href={textHref}><BookOpen size={16} /> Leer el capítulo escrito</a>
          </div>

          <div className="vw__ideas">
            <h2>Lo que te llevas</h2>
            <ul>
              {chapter.ideas.map((idea) => (
                <li key={idea}><Check size={16} aria-hidden="true" /> <span>{idea}</span></li>
              ))}
            </ul>
          </div>

          <nav className="vw__pn" aria-label="Capítulos">
            {prev ? (
              <a className="vw__pn-a" href={prev.href}>
                <span className="vw__pn-k"><ArrowLeft size={14} /> Anterior</span>
                <span className="vw__pn-t">{prev.number}. {prev.title}</span>
              </a>
            ) : <span />}
            {next ? (
              <a className="vw__pn-a vw__pn-a--next" href={next.href}>
                <span className="vw__pn-k">Siguiente <ArrowRight size={14} /></span>
                <span className="vw__pn-t">{next.number}. {next.title}</span>
              </a>
            ) : <span />}
          </nav>
        </section>
      </div>

      <aside className="vw__side" aria-label="Contenido del capítulo">
        <div className="vtabs" role="tablist" aria-label="Contenido">
          <button type="button" role="tab" id="tab-sec" aria-controls="panel" aria-selected={tab === 'sections'} onClick={() => setTab('sections')}>
            <ListVideo size={16} /> Secciones
          </button>
          <button type="button" role="tab" id="tab-tr" aria-controls="panel" aria-selected={tab === 'transcript'} onClick={() => setTab('transcript')}>
            <FileText size={16} /> Transcripción
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
        <p className="vw__keys"><kbd>Espacio</kbd> pausa · <kbd>←</kbd> <kbd>→</kbd> 5 s · <kbd>F</kbd> pantalla completa</p>
      </aside>
    </main>
  );
}
