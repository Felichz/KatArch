import { useLayoutEffect, useRef, type ReactNode } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Keeps a scene inside its stage. SVG diagrams already scale with their box
 * and stay at 1; HTML scenes (cards, tables, lists) cannot, so when their
 * content is taller or wider than the stage it is scaled down (never up) and
 * re-centered. Phones keep the natural size: there the diagram scrolls.
 */
export function Fit({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const o = outer.current;
    const el = inner.current;
    if (!o || !el) return;
    let raf = 0;
    const timers: number[] = [];

    const measure = () => {
      raf = 0;
      el.style.transform = '';
      if (window.matchMedia('(max-width: 900px)').matches) return;
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return;
      let top = box.top, bottom = box.bottom, left = box.left, right = box.right;
      const walk = (node: Element, depth: number) => {
        for (const c of Array.from(node.children)) {
          const r = c.getBoundingClientRect();
          if (!r.width && !r.height) continue;
          top = Math.min(top, r.top);
          bottom = Math.max(bottom, r.bottom);
          left = Math.min(left, r.left);
          right = Math.max(right, r.right);
          // an SVG or a scroll container already contains its own content
          if (depth < 4 && c.namespaceURI !== SVG_NS && getComputedStyle(c).overflow === 'visible') walk(c, depth + 1);
        }
      };
      walk(el, 0);
      const h = bottom - top, w = right - left;
      const s = Math.min(1, box.height / h, box.width / w);
      if (s > 0.995) return;
      const dx = (box.width - w * s) / 2 - (left - box.left) * s;
      const dy = (box.height - h * s) / 2 - (top - box.top) * s;
      el.style.transformOrigin = '0 0';
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(schedule);
    const observeTree = () => {
      ro.disconnect();
      ro.observe(o);
      el.querySelectorAll(':scope > *, :scope > * > *, :scope > * > * > *').forEach((n) => {
        if (n.namespaceURI !== SVG_NS) ro.observe(n);
      });
    };
    // content that appears or changes (a new card, an answer) is measured again once its entrance settles
    const mo = new MutationObserver(() => {
      observeTree();
      schedule();
      timers.push(window.setTimeout(schedule, 650));
    });
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    observeTree();
    schedule();
    timers.push(window.setTimeout(schedule, 650));
    return () => {
      ro.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={outer} className="fit">
      <div ref={inner} className="fit__in">{children}</div>
    </div>
  );
}
