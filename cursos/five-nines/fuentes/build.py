import importlib, json, sys, os
from pathlib import Path
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from lib import words, spoken
OUT = str(HERE.parent)
# the voice config is copied from chapter 1 (originally from KatArch/video/ch5/narration.json)
src = json.load(open(f"{OUT}/video/ch1/narration.json"))
scripts = {}
for n in range(1, 9):
    m = importlib.import_module(f"ch{n}")
    doc = {"title": f"Capítulo {n} · {m.TITLE}", "chapter": n}
    for k in ("voice", "voiceId", "voiceModel", "voiceSettings"):
        doc[k] = src[k]
    doc["scenes"] = [{"id": s["id"], "kicker": s["kicker"], "lines": s["lines"]} for s in m.SCENES]
    path = f"{OUT}/video/ch{n}/narration.json"
    with open(path, "w") as f:
        f.write(json.dumps(doc, ensure_ascii=False, indent=2) + "\n")
    # markdown script
    md = []
    tw = tp = 0
    for i, s in enumerate(m.SCENES, 1):
        w = sum(words(spoken(l)) for l in s["lines"]); p = sum(l.get("pauseAfter", 0) for l in s["lines"])
        tw += w; tp += p
        md.append(f"#### {i}. `{s['id']}` · {s['kicker']} ({w} palabras, ~{w/2.2:.0f} s + {str(p).replace('.',',').rstrip('0').rstrip(',') if p else '0'} s de pausas)\n")
        md.append(f"*Visual:* {s['visual']}\n")
        for l in s["lines"]:
            extra = []
            if "say" in l: extra.append(f"say: «{l['say']}»")
            if "pauseAfter" in l: extra.append(f"pausa {str(l['pauseAfter']).replace('.',',')} s")
            md.append(f"- {l['text']}" + (f"  \n  <small>({'; '.join(extra)})</small>" if extra else ""))
        md.append("")
    head = f"**Total:** {tw} palabras habladas, unos {tw/2.2/60:.1f} min de voz a 2,2 palabras/s, más {round(tp,1):g} s de pausas escritas (≈ {(tw/2.2+tp)/60:.1f} min).\n"
    head = head.replace(".", ",", 0)
    import re as _re
    head = _re.sub(r"(\d)\.(\d)", r"\1,\2", head)
    scripts[n] = head + "\n" + "\n".join(md)
tpl = open(HERE / "guion_tpl.md").read()
for n, s in scripts.items():
    tpl = tpl.replace(f"{{{{SCRIPT_{n}}}}}", s)
assert "{{SCRIPT" not in tpl
open(f"{OUT}/GUION.md", "w").write(tpl)
print("ok")
