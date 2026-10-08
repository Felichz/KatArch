import json, sys
for p in sys.argv[1:]:
    d = json.load(open(p))
    tw = tp = 0
    print(f"== ch{d['chapter']} {d['title']}")
    for s in d['scenes']:
        w = sum(len((l.get('say') or l['text']).split()) for l in s['lines'])
        pa = sum(l.get('pauseAfter', 0) for l in s['lines'])
        tw += w; tp += pa
        print(f"  {s['id']:14s} {w:4d} w  {w/2.2:6.1f} s  +{pa} pausa  | " + " / ".join(f"{len((l.get('say') or l['text']).split())/2.2:.0f}" for l in s['lines']))
    t = tw/2.2 + tp
    print(f"  TOTAL {tw} palabras, {tw/2.2:.0f} s voz + {tp:.1f} s pausas = {t//60:.0f}:{t%60:02.0f}")
