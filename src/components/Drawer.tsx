import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ExternalLink, FileText, Scale, BookOpen, ListOrdered, Map } from 'lucide-react';
import { useCourse, GH_BLOB_BASE, type DrawerState } from './CourseContext';
import type { Chapter } from '../content/types';
import { useUi } from '../i18n/react';

function DocBody({ id }: { id: string }) {
  const { docs } = useCourse();
  const ui = useUi().drawer;
  const d = docs[id];
  const [lang, setLang] = useState<'es' | 'en'>(d?.htmlEs ? 'es' : 'en');
  if (!d) return <p>{ui.docNotFound}</p>;
  return (
    <>
      <div className="drawer__meta">
        <span className="mono">{d.file}</span>
        {d.htmlEs && (
          <div className="seg" role="group" aria-label={ui.docLanguage}>
            <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>{ui.translation}</button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>{ui.original}</button>
          </div>
        )}
      </div>
      <div className="doc-html prose" dangerouslySetInnerHTML={{ __html: lang === 'es' && d.htmlEs ? d.htmlEs : d.html }} />
      <a className="btn btn--sm drawer__gh" href={GH_BLOB_BASE + d.file} target="_blank" rel="noopener noreferrer">
        {ui.viewOnGitHub} <ExternalLink size={14} aria-hidden />
      </a>
    </>
  );
}

function DecisionBody({ id }: { id: string }) {
  const { decisions, open } = useCourse();
  const ui = useUi().drawer;
  const d = decisions[id];
  if (!d) return null;
  return (
    <div className="dec">
      <section className="dec__row dec__row--problem">
        <h3>{ui.problem}</h3>
        <div className="prose doc-html" dangerouslySetInnerHTML={{ __html: d.problem }} />
      </section>
      <section className="dec__row dec__row--decision">
        <h3>{ui.theDecision}</h3>
        <div className="prose doc-html" dangerouslySetInnerHTML={{ __html: d.decision }} />
      </section>
      <section className="dec__row dec__row--tradeoff">
        <h3>{ui.tradeoff}</h3>
        <div className="prose doc-html" dangerouslySetInnerHTML={{ __html: d.tradeoff }} />
      </section>
      <div className="dec__adrs">
        {d.adrs.map((a) => (
          <button key={a.id} type="button" className="btn btn--sm" onClick={() => open({ kind: 'doc', id: 'adr-' + a.id })}>
            <FileText size={14} aria-hidden /> {ui.readAdr(a.label)}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepsBody({ chapter, index, go, home }: { chapter: Chapter; index: number; go: (i: number) => void; home: string }) {
  const ui = useUi().drawer;
  return (
    <>
      <ol className="steps-list">
        {chapter.steps.map((s, i) => (
          <li key={s.id}>
            <button type="button" className={i === index ? 'is-current' : ''} aria-current={i === index ? 'step' : undefined} onClick={() => go(i)}>
              <span className="steps-list__n mono">{String(i + 1).padStart(2, '0')}</span>
              <span>
                {s.kicker && <span className="steps-list__k">{s.kicker}</span>}
                <span className="steps-list__t">{s.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <a className="btn btn--sm" href={home}>
        <Map size={14} aria-hidden /> {ui.courseMap}
      </a>
    </>
  );
}

export function Drawer({
  state,
  onClose,
  chapter,
  index,
  go,
  home,
}: {
  state: DrawerState;
  onClose: () => void;
  chapter: Chapter;
  index: number;
  go: (i: number) => void;
  /** course map URL in the current locale */
  home: string;
}) {
  const { concepts, docs, decisions } = useCourse();
  const ui = useUi().drawer;
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (state) {
      lastFocus.current = lastFocus.current ?? document.activeElement;
      requestAnimationFrame(() => panel.current?.focus());
    } else if (lastFocus.current instanceof HTMLElement) {
      lastFocus.current.focus();
      lastFocus.current = null;
    }
  }, [state]);

  // simple focus trap
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panel.current) return;
    const f = panel.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  let title = '';
  let label = '';
  let Icon = BookOpen;
  if (state?.kind === 'concept') {
    title = concepts[state.id]?.title ?? '';
    label = ui.concept;
    Icon = BookOpen;
  } else if (state?.kind === 'doc') {
    title = docs[state.id]?.title ?? '';
    label = ui.doc;
    Icon = FileText;
  } else if (state?.kind === 'decision') {
    title = decisions[state.id]?.title ?? '';
    label = ui.decision;
    Icon = Scale;
  } else if (state?.kind === 'steps') {
    title = chapter.title;
    label = ui.steps(chapter.number);
    Icon = ListOrdered;
  }

  return (
    <AnimatePresence>
      {state && (
        <div className="drawer-root" onKeyDown={onKeyDown}>
          <motion.div
            className="drawer-scrim"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            ref={panel}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="drawer__head">
              <div>
                <div className="drawer__label">
                  <Icon size={14} aria-hidden /> {label}
                </div>
                <h2 id="drawer-title">{title}</h2>
              </div>
              <button type="button" className="icon-btn" onClick={onClose} aria-label={ui.close}>
                <X size={18} />
              </button>
            </header>
            <div className="drawer__body">
              {state.kind === 'concept' && (
                <div className="prose doc-html" dangerouslySetInnerHTML={{ __html: concepts[state.id]?.body ?? '' }} />
              )}
              {state.kind === 'doc' && <DocBody key={state.id} id={state.id} />}
              {state.kind === 'decision' && <DecisionBody id={state.id} />}
              {state.kind === 'steps' && (
                <StepsBody
                  chapter={chapter}
                  index={index}
                  home={home}
                  go={(i) => {
                    go(i);
                    onClose();
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
