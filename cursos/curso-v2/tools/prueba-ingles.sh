#!/usr/bin/env bash
# Prueba la versión en inglés de uno o más bloques: arma los tiempos en inglés (estimados), saca una captura
# al final de cada escena (snapshots/en) y vuelve el bloque a español (con su voz si la tiene).
#   bash cursos/curso-v2/tools/prueba-ingles.sh cursos/curso-v2/video/bNN [más bloques…]
set -e
for dir in "$@"; do
  (
    cd "$dir"
    node tools/timing.mjs estimate --en >/dev/null
    at=$(node -e "const s=require('fs').readFileSync('timing.js','utf8');const T=JSON.parse(s.slice(s.indexOf('{'),s.lastIndexOf('}')+1));console.log(T.scenes.map(x=>(x.lines.at(-1).end-0.3).toFixed(2)).join(','))")
    rm -rf snapshots/en
    npx --yes hyperframes@0.8.139 snapshot --at "$at" --no-end --timeout 25000 -o snapshots/en >/dev/null 2>&1 || true
    if [ -f voice.json ]; then node tools/timing.mjs >/dev/null; else node tools/timing.mjs estimate >/dev/null; fi
    echo "$dir: $(ls snapshots/en/*.png 2>/dev/null | wc -l) capturas en inglés"
  )
done
