#!/usr/bin/env bash
# Sube los renders a Cloudflare R2 (bucket katarch-videos) como curso/bNN.mp4 y curso/bNN.en.mp4, en una copia con
# el índice al principio (faststart: el video arranca antes de bajarse entero). Reintenta si la subida se corta.
#   bash cursos/curso-v2/tools/subir-r2.sh [bNN…]      (sin bloques: todos los que tienen render)
VIDEO=$(cd "$(dirname "$0")/../video" && pwd)
BL=${*:-$(cd "$VIDEO" && ls -d b?? | tr '\n' ' ')}
for b in $BL; do
  for suf in "" ".en"; do
    src="$VIDEO/$b/renders/katarch-$b$suf.mp4"
    [ -f "$src" ] || { echo "$b$suf: sin render"; continue; }
    mkdir -p "$VIDEO/$b/renders/web"
    web="$VIDEO/$b/renders/web/$b$suf.mp4"
    [ "$web" -nt "$src" ] || ffmpeg -v error -y -i "$src" -c copy -movflags +faststart "$web"
    ok=0
    for try in 1 2 3 4; do
      if (cd "$VIDEO/$b/renders/web" && timeout 600 cf r2 objects put "curso/$b$suf.mp4" --bucket-name katarch-videos --file "$b$suf.mp4" --content-type video/mp4 2>&1 | grep -q '"etag"'); then ok=1; break; fi
    done
    [ $ok = 1 ] && echo "$b$suf: subido ($(du -h "$web" | cut -f1))" || echo "$b$suf: FALLÓ"
  done
done
