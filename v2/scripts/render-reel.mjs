/**
 * Renders the showreel (src/pages/reel.astro) to video, frame by frame.
 *
 * The page runs on a virtual clock injected before any script: performance.now, Date.now,
 * requestAnimationFrame, timers and every CSS/Web animation only move when this script
 * advances them, one frame at a time. So the video is smooth and identical on every run,
 * no matter how slow each screenshot is.
 *
 * usage (from v2/, with `npm run dev` running): npm run reel
 *   = node scripts/render-reel.mjs [--url http://localhost:4321/reel/] [--fps 30] [--out ../docs/reel]
 *     [--every N]  (preview: keep only every Nth frame as PNG in the frames folder, no video)
 * needs: puppeteer-core (dev dependency), Google Chrome (--chrome <path> elsewhere), ffmpeg on PATH.
 */
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const arg = (k, d) => {
  const i = process.argv.indexOf(`--${k}`);
  return i > -1 ? process.argv[i + 1] : d;
};
const URL = arg('url', 'http://localhost:4321/reel/');
const FPS = Number(arg('fps', 30));
const OUT = path.resolve(arg('out', '../docs/reel'));
const EVERY = Number(arg('every', 0));
const CHROME = arg('chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe');
// frames are scratch material: they go to the system temp folder, only the videos land in --out
const FRAMES = path.join(os.tmpdir(), 'katarch-reel-frames');

const clock = () => {
  // no hardware (Web Animations) path: Motion then drives every animation from requestAnimationFrame,
  // which this clock controls; CSS transitions are still stepped through document.getAnimations()
  try { delete Element.prototype.animate; } catch {}
  const realST = window.setTimeout.bind(window);
  window.__realSetTimeout = realST;
  let vt = 0;
  const base = Date.now();
  const rafs = new Map();
  let rafId = 1;
  let timers = [];
  let timerId = 1;
  window.requestAnimationFrame = (cb) => { const id = rafId++; rafs.set(id, cb); return id; };
  window.cancelAnimationFrame = (id) => { rafs.delete(id); };
  window.setTimeout = (fn, ms = 0, ...args) => { const id = timerId++; timers.push({ id, at: vt + Math.max(0, Number(ms) || 0), fn, args }); return id; };
  window.setInterval = (fn, ms = 0, ...args) => { const id = timerId++; const every = Math.max(1, Number(ms) || 0); timers.push({ id, at: vt + every, fn, args, every }); return id; };
  window.clearTimeout = window.clearInterval = (id) => { timers = timers.filter((t) => t.id !== id); };
  performance.now = () => vt;
  Date.now = () => base + vt;
  const seen = new WeakMap();
  window.__advance = (ms) => {
    const target = vt + ms;
    for (;;) {
      timers.sort((a, b) => a.at - b.at);
      const t = timers[0];
      if (!t || t.at > target) break;
      vt = t.at;
      if (t.every) t.at += t.every; else timers.shift();
      try { typeof t.fn === 'function' ? t.fn(...t.args) : (0, eval)(t.fn); } catch (e) { console.error(e); }
    }
    vt = target;
    const cbs = [...rafs.values()];
    rafs.clear();
    for (const cb of cbs) { try { cb(vt); } catch (e) { console.error(e); } }
    for (const a of document.getAnimations()) {
      if (!seen.has(a)) { seen.set(a, vt); a.pause(); }
      try { a.currentTime = vt - seen.get(a); } catch {}
    }
    for (const f of document.querySelectorAll('iframe')) {
      try { f.contentWindow.__advance?.(ms); } catch {}
    }
  };
};

fs.mkdirSync(FRAMES, { recursive: true });
for (const f of fs.readdirSync(FRAMES)) fs.unlinkSync(path.join(FRAMES, f));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.evaluateOnNewDocument(clock);
await page.evaluateOnNewDocument(() => { try { localStorage.setItem('katarch:theme', 'dark'); } catch {} });
page.on('console', (m) => { if (m.type() === 'error') console.log('[page]', m.text()); });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.waitForSelector('.reel');
// fonts, and the embedded course page, must be ready before the first frame
await page.evaluate(() => document.fonts.ready);
for (let i = 0; i < 200; i++) {
  const ok = await page.evaluate(() => [...document.querySelectorAll('iframe')].every((f) => f.contentDocument?.readyState === 'complete' && f.contentDocument.querySelector('.app')));
  if (ok) break;
  await new Promise((r) => setTimeout(r, 150));
}
await page.evaluate(async () => { for (const f of document.querySelectorAll('iframe')) await f.contentDocument.fonts.ready; });

const duration = await page.evaluate(() => Number(document.querySelector('.reel')?.dataset.duration) || 40.5);
const total = Math.round(duration * FPS);
const settle = () => page.evaluate(() => new Promise((r) => window.__realSetTimeout(() => window.__realSetTimeout(r, 0), 0)));
console.log(`rendering ${total} frames at ${FPS} fps`);
for (let f = 0; f < total; f++) {
  await page.evaluate((ms) => window.__advance(ms), 1000 / FPS);
  await settle();
  if (!EVERY || f % EVERY === 0) {
    await page.screenshot({ path: path.join(FRAMES, `${String(f).padStart(5, '0')}.${EVERY ? 'png' : 'jpg'}`), ...(EVERY ? {} : { type: 'jpeg', quality: 96 }) });
  }
  if (f % 60 === 0) process.stdout.write(`${f} `);
}
await browser.close();
process.stdout.write('\n');

if (!EVERY) {
  const input = path.join(FRAMES, '%05d.jpg');
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', input, '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, 'katarch-reel.mp4')], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', input, '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', path.join(OUT, 'katarch-reel.webm')], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(FRAMES, `${String(Math.round(FPS * 1.9)).padStart(5, '0')}.jpg`), '-frames:v', '1', path.join(OUT, 'katarch-reel-poster.jpg')], { stdio: 'inherit' });
  console.log('written to', OUT);
}
