#!/usr/bin/env bash
# One lesson at a time, start to finish: draft voice (Loquendo Jorge, Pocket TTS, VoxCPM2 or Qwen3-TTS, ENGINE=jorge|pocket|vox|qwen; takes used as generated, no
# time-stretch) → align → import → cut in silences → retime → check → render → long-silence check. The next lesson's
# voice does not start until the previous one is rendered.
#   bash seq.sh 1 2 3 …          voice and render, one lesson at a time (log in .tmp/seq.log)
#   PHASE=voice bash seq.sh 1    only the voice part (vox → … → timing)
#   PHASE=render bash seq.sh 1   only check → render → silence check
#   TTS_DIR=<carpeta de la herramienta local de voz> bash seq.sh 1   (la herramienta vive fuera del repo)
Q=${TTS_DIR:?Falta TTS_DIR: la carpeta de la herramienta local de voz}
C=$(cd "$(dirname "$0")" && pwd)
# forma con letra de unidad para node y python en Windows (Git Bash); en macOS o Linux es la misma ruta
CW=$(command -v cygpath >/dev/null && cygpath -m "$C" || echo "$C")
# python de un entorno virtual: Scripts/ en Windows, bin/ en macOS y Linux
venv() { [ -x "$1/Scripts/python" ] && echo "$1/Scripts/python" || echo "$1/bin/python"; }
ENGINE=${ENGINE:-jorge}   # jorge (Loquendo Jorge, native generator, seconds), pocket (Pocket TTS on CPU), vox (VoxCPM2, GPU) or qwen (Qwen3-TTS, GPU)
if [ "$ENGINE" = qwen ]; then RAW=out/curso-qwen; PY=$(cd $Q && venv .venv); GEN=qwen_course.py;
elif [ "$ENGINE" = jorge ]; then RAW=out/curso-jorge; PY=node; GEN=jorge_course.mjs;
elif [ "$ENGINE" = vox ]; then RAW=out/curso-raw; PY=$(cd $Q && venv ./.venv-vox); GEN=vox_course.py;
else RAW=out/curso-pocket; PY=$(cd $Q && venv ./.venv-pocket); GEN=pocket_course.py; fi
FPS=${FPS:-30}; QUALITY=${QUALITY:-looks}   # FPS=24 QUALITY=draft renders ~25 % faster
OUT=$RAW   # takes are used as generated: no time-stretch
LOG=$C/.tmp/seq.log
log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }

for n in "$@"; do
  D=$C/video/ch$n; DW=$CW/video/ch$n
  log "== ch$n: start (${PHASE:-all})"
  if [ "${PHASE:-all}" != "render" ]; then
  (cd $Q && POCKET_VOICE=${POCKET_VOICE:-lola} PYTHONUTF8=1 PYTHONIOENCODING=utf-8 $PY $GEN "$CW/video" $RAW $n 2>&1 | grep -a "words\|Error\|Traceback" >> "$LOG")
  need=$(node -e "console.log(require('$DW/narration.json').scenes.length)")
  have=$(ls $Q/$RAW/ch$n/*.wav 2>/dev/null | wc -l)
  # Pocket stamps each take with its voice: an interrupted run must not reuse takes from another voice
  [ "$ENGINE" = jorge ] && have=$(grep -l "^jorge|" $Q/$RAW/ch$n/*.wav.txt 2>/dev/null | wc -l)
  [ "$ENGINE" = pocket ] && have=$(grep -l "^${POCKET_VOICE:-lola}|" $Q/$RAW/ch$n/*.wav.txt 2>/dev/null | wc -l)
  if [ "$have" -lt "$need" ]; then log "ch$n: only $have of $need takes; stopping"; exit 1; fi
  (cd $Q && PYTHONIOENCODING=utf-8 $(venv .venv) align_course.py "$CW/video" $OUT $n 2>&1 | grep -a "words ·\|Error\|Traceback" >> "$LOG")
  node $Q/import_takes.mjs "$D" $Q/$OUT/ch$n >> "$LOG" 2>&1 || { log "ch$n: import failed"; exit 1; }
  (cd "$D" && node tools/voice.mjs voxcpm2-local 2>&1 | tail -1 >> "$LOG" && node tools/timing.mjs 2>&1 | tail -1 >> "$LOG")
  fi
  [ "${PHASE:-all}" != "render" ] && touch "$C/.tmp/voiced-$n"
  [ "${PHASE:-all}" = "voice" ] && { log "ch$n: voice ready"; continue; }
  errs=$(cd "$D" && timeout 600 npx --yes hyperframes@0.8.139 check 2>&1 | grep -c "✗")
  if [ "$errs" != "0" ]; then log "ch$n: check has $errs errors; skipping"; (cd "$D" && npx --yes hyperframes@0.8.139 check 2>&1 | grep "✗" >> "$LOG"); continue; fi
  log "ch$n: check ok, rendering"
  mkdir -p "$D/renders"
  (cd "$D" && timeout 7200 npx --yes hyperframes@0.8.139 render -o renders/katarch-leccion$n.mp4 --fps $FPS --quality $QUALITY > renders/render.log 2>&1)
  if [ ! -s "$D/renders/katarch-leccion$n.mp4" ]; then log "ch$n: render failed"; tail -5 "$D/renders/render.log" >> "$LOG"; continue; fi
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$D/renders/katarch-leccion$n.mp4")
  sil=$(ffmpeg -hide_banner -i "$D/renders/katarch-leccion$n.mp4" -af silencedetect=n=-45dB:d=3.8 -f null - 2>&1 | grep -c silence_end)
  log "ch$n: rendered, ${dur}s, $sil silences > 3.8 s"
done
log "== all done: $*"
