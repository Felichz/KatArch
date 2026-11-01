#!/usr/bin/env bash
# Renders en cola, uno por vez (sin renders ni ffmpeg en paralelo). Por cada bloque arma el idioma pedido con su voz
# (voice.json o voice.en.json) y el tema (oscuro, o claro con --claro), renderiza, mide los silencios largos y deja el
# bloque en español y oscuro.
#   bash cursos/curso-v2/tools/render-cola.sh es|en [--claro] bNN [bNN…]
# es → renders/katarch-bNN.mp4 · en → renders/katarch-bNN.en.mp4 · con --claro, katarch-bNN[.en].claro.mp4.
# Un render que ya existe y es más nuevo que la voz, la narración y las composiciones no se repite.
set -u
LANG_=$1; shift
TEMA=""; if [ "${1:-}" = "--claro" ]; then TEMA="--claro"; shift; fi
VIDEO=$(cd "$(dirname "$0")/../video" && pwd)
for b in "$@"; do
  dir="$VIDEO/$b"
  if [ "$LANG_" = en ]; then flag=--en; suf=.en; vf=voice.en.json; else flag=; suf=; vf=voice.json; fi
  [ -n "$TEMA" ] && suf="$suf.claro"
  out=renders/katarch-$b$suf.mp4
  cd "$dir"
  if [ ! -f "$vf" ]; then echo "$b: falta $vf, salteado"; continue; fi
  nuevo=$(ls -t "$vf" narration.json compositions/*.html assets/tiza.js | head -1)
  if [ -f "$out" ] && [ "$out" -nt "$nuevo" ]; then echo "$b $LANG_$TEMA: ya renderizado"; continue; fi
  node tools/timing.mjs $flag $TEMA >/dev/null || { echo "$b: timing falló"; continue; }
  mkdir -p renders
  t0=$(date +%s)
  npx --yes hyperframes@0.8.139 render -o "$out" --quality looks --fps 30 > "renders/render-$LANG_${TEMA#--}.log" 2>&1
  ok=$?
  node tools/timing.mjs >/dev/null
  if [ $ok -ne 0 ] || [ ! -f "$out" ]; then echo "$b $LANG_$TEMA: RENDER FALLÓ (renders/render-$LANG_${TEMA#--}.log)"; continue; fi
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")
  # silencios de más de 3,8 s (la pausa más larga del guion es la de entrada y salida, 3,2 s)
  sil=$(ffmpeg -v info -i "$out" -af silencedetect=noise=-45dB:d=3.8 -f null - 2>&1 | grep -c silence_end)
  echo "$b $LANG_$TEMA: ${dur%.*} s, $(( ($(date +%s) - t0) / 60 )) min de render, silencios largos: $sil"
done
