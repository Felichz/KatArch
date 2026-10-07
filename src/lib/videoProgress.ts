/** Watching progress for the video edition, kept in this browser only. */
const KEY = 'katarch:video:progress';

export type VideoProgress = Record<string, { t: number; d: number; done: boolean }>;

export function readVideoProgress(): VideoProgress {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

/** Saves the position in a chapter; a chapter counts as seen from 95% on (the recap and the bridge are the tail). */
export function saveVideoProgress(id: string, t: number, d: number) {
  try {
    const p = readVideoProgress();
    const done = (p[id]?.done ?? false) || (d > 0 && t >= d * 0.95);
    p[id] = { t: done && t >= d - 1 ? 0 : t, d, done };
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}
