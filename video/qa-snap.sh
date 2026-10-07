#!/usr/bin/env bash
# QA snapshots with the real voice: the middle and the end of every scene. Usage: video/qa-snap.sh ch4 [outdir]
set -e
cd "$(dirname "$0")/$1"
out=${2:-snapshots/qa}
rm -rf "$out"
T=$(node -e "global.window={};require('vm').runInThisContext(require('fs').readFileSync('timing.js','utf8'));const S=window.TIMING.scenes;const o=[];S.forEach((s,i)=>{const nx=S[i+1]?S[i+1].start:window.TIMING.duration;o.push(((s.start+nx)/2).toFixed(2));o.push((nx-0.4).toFixed(2))});console.log(o.join(','))")
npx --yes hyperframes@0.8.139 snapshot --at "$T" --no-end --timeout 25000 -o "$out" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "saved|rror"
