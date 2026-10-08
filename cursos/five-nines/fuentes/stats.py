import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import importlib, sys
from lib import words, spoken
for n in (sys.argv[1:] or [str(i) for i in range(1, 9)]):
    m = importlib.import_module(f"ch{n}")
    tw = tp = 0
    for s in m.SCENES:
        w = sum(words(spoken(l)) for l in s["lines"]); p = sum(l.get("pauseAfter", 0) for l in s["lines"])
        tw += w; tp += p
        print(f"  {s['id']:12s} {w:4d} w {w/2.2:6.1f} s +{p}")
    print(f"ch{n}: {tw} words, {tw/2.2/60:.2f} min + {tp}s pauses")
