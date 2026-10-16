#!/usr/bin/env bash
# Finds stretches where the rendered lesson shows (almost) nothing in the content area: samples 2 frames per second
# of the region y=100..900, and counts a frame as empty when its brightest pixel is dim (no text or card border).
# Prints runs of empty frames lasting at least MIN seconds.   bash blank-check.sh 2 [MIN=2]
n=$1; MIN=${2:-2}
F=video/ch$n/renders/katarch-leccion$n.mp4
ffmpeg -hide_banner -i "$F" -vf "fps=2,crop=1920:800:0:100,signalstats,metadata=print:key=lavfi.signalstats.YMAX" -f null - 2>&1 \
 | grep -o "pts_time:[0-9.]*\|YMAX=[0-9]*" | paste - - | sed 's/pts_time://; s/lavfi.signalstats.YMAX=//; s/YMAX=//' \
 | awk -v min="$MIN" '{t=$1; y=$2; if (y<110) { if (s=="") s=t; e=t } else { if (s!="" && e-s+0.5>=min) printf "ch'$n' empty %.1f-%.1f s (%.1f s)\n", s, e+0.5, e-s+0.5; s="" } } END { if (s!="" && e-s+0.5>=min) printf "ch'$n' empty %.1f-%.1f s (%.1f s)\n", s, e+0.5, e-s+0.5 }'
