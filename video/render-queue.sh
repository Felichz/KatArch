#!/usr/bin/env bash
# Renders chapters one after another, then lists every silence longer than 3.8 s (the scripted think pause is ~3.4 s).
# Usage: video/render-queue.sh ch4 ch5 ...
cd "$(dirname "$0")"
for c in "$@"; do
  n=${c#ch}
  out="$c/renders/katarch-cap$n.mp4"
  echo "== $c: rendering"
  (cd $c && npx --yes hyperframes@0.8.139 render -o "renders/katarch-cap$n.mp4" --quality looks 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "MB ·|rror" | tail -2)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")
  echo "== $c: duration $dur"
  ffmpeg -i "$out" -af silencedetect=n=-40dB:d=3.8 -f null - 2>&1 | grep -o "silence_start: [0-9.]*\|silence_duration: [0-9.]*" | paste - - | sed "s/^/   gap? /"
  echo "== $c: done"
done
