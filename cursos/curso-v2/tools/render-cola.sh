#!/usr/bin/env bash
# Renders en cola, uno por vez (sin renders ni ffmpeg en paralelo). Por cada bloque arma el idioma pedido con su voz
# (voice.json o voice.en.json), renderiza, mide los silencios largos y deja el bloque en español.
#   bash cursos/curso-v2/tools/render-cola.sh es|en bNN [bNN…]
# es → renders/katarch-bNN.mp4 · en → renders/katarch-bNN.en.mp4. Un render que ya existe y es más nuevo que
# timing.js no se repite.
set -u
LANG_=$1; shift
VIDEO=$(cd "$(dirname "$0")/../video" && pwd)
for b in "$@"; do
  dir="$VIDEO/$b"
  if [ "$LANG_" = en ]; then flag=--en; out=renders/katarch-$b.en.mp4; vf=voice.en.json; else flag=; out=renders/katarch-$b.mp4; vf=voice.json; fi
  cd "$dir"
  if [ ! -f "$vf" ]; then echo "$b: falta $vf, salteado"; continue; fi
  node tools/timing.mjs $flag >/dev/null || { echo "$b: timing falló"; continue; }
  if [ -f "$out" ] && [ "$out" -nt "$vf" ] && [ "$out" -nt narration.json ]; then echo "$b $LANG_: ya renderizado"; node tools/timing.mjs >/dev/null; continue; fi
  mkdir -p renders
  t0=$(date +%s)
  npx --yes hyperframes@0.8.139 render -o "$out" --quality looks --fps 30 > "renders/render-$LANG_.log" 2>&1
  ok=$?
  node tools/timing.mjs >/dev/null
  if [ $ok -ne 0 ] || [ ! -f "$out" ]; then echo "$b $LANG_: RENDER FALLÓ (renders/render-$LANG_.log)"; continue; fi
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")
  # silencios de más de 3,8 s (la pausa más larga del guion es la de entrada y salida, 3,2 s)
  sil=$(ffmpeg -v info -i "$out" -af silencedetect=noise=-45dB:d=3.8 -f null - 2>&1 | grep -c silence_end)
  echo "$b $LANG_: ${dur%.*} s, $(( ($(date +%s) - t0) / 60 )) min de render, silencios largos: $sil"
done
