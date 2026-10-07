#!/usr/bin/env bash
# Streaming-ready copies of the renders (moov atom first) + posters, then upload to R2.
set -e
cd "$(dirname "$0")"
for n in 1 2 3 4 5 6 7 8 9 10 11; do
  src=ch$n/renders/katarch-cap$n.mp4
  out=dist/cap$n.mp4
  ffmpeg -v error -y -i "$src" -c copy -movflags +faststart "$out"
  # poster: the chapter's title card (intro scene, its last line + 1.2 s)
  t=$(node -e "global.window={};require('vm').runInThisContext(require('fs').readFileSync('ch$n/timing.js','utf8'));const s=window.TIMING.scenes[0];console.log((s.lines.at(-1).start+1.6).toFixed(2))")
  ffmpeg -v error -y -ss "$t" -i "$src" -frames:v 1 -vf scale=1280:-1 -q:v 3 dist/cap$n.jpg
  echo "cap$n ready (poster at ${t}s)"
done
for n in 1 2 3 4 5 6 7 8 9 10 11; do
  cf r2 objects put "cap$n.mp4" --bucket-name katarch-videos --file "dist/cap$n.mp4" --content-type video/mp4 -q >/dev/null && echo "uploaded cap$n.mp4"
done
