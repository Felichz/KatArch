#!/usr/bin/env bash
# Renders lessons one at a time, each as soon as it is ready: voice done (marker .tmp/voiced-N, written by seq.sh) and its visual
# pass done (marker .tmp/polished-N, created by hand when the pass is reviewed). Skips lessons with .tmp/rendered-N.
#   bash render-queue.sh 1 2 3 …     (waits for whatever is not ready yet; log in .tmp/seq.log)
C=/c/Users/felix/dev/katarch-katas/cursos/curso-unico
cd "$C" || exit 1
pending=("$@")
while [ ${#pending[@]} -gt 0 ]; do
  next=()
  started=0
  for n in "${pending[@]}"; do
    if [ -f .tmp/rendered-$n ]; then continue; fi
    voice=0; [ -f .tmp/voiced-$n ] && voice=1
    if [ "$started" = 0 ] && [ -f .tmp/polished-$n ] && [ "$voice" != 0 ]; then
      PHASE=render bash seq.sh $n
      [ video/ch$n/renders/katarch-leccion$n.mp4 -nt .tmp/voiced-$n ] && touch .tmp/rendered-$n
      started=1
    else
      next+=("$n")
    fi
  done
  pending=("${next[@]}")
  [ "$started" = 0 ] && [ ${#pending[@]} -gt 0 ] && sleep 30
done
echo "[$(date +%H:%M:%S)] == render queue done: $*" >> .tmp/seq.log
