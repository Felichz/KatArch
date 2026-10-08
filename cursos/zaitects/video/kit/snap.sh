#!/usr/bin/env bash
# QA snapshots of one chapter (no render): one frame 1.5 s into every line of the narration, plus the end of every scene.
#   video/kit/snap.sh ch1 [outdir]      (stays in the chapter's gitignored snapshots/)
set -e
cd "$(dirname "$0")/../$1"
out=${2:-snapshots/qa}
rm -rf "$out"
T=$(node -e "global.window={};require('vm').runInThisContext(require('fs').readFileSync('timing.js','utf8'));const S=window.TIMING.scenes;const o=[];S.forEach((s,i)=>{const nx=S[i+1]?S[i+1].start:window.TIMING.duration;s.lines.forEach(l=>o.push(Math.min(l.start+1.5,l.end).toFixed(2)));o.push((nx-0.4).toFixed(2))});console.log(o.join(','))")
npx --yes hyperframes@0.8.139 snapshot --at "$T" --no-end --timeout 25000 -o "$out" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "saved|rror" | tail -3
ls "$out" | head -3
