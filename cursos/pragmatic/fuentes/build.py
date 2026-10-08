"""Genera narration.json por capítulo y las secciones de guion/auditoría de GUION.md
a partir de una sola fuente (chapters.py). Uso: python3 -I fuentes/build.py [carpeta del curso; por defecto, la carpeta padre de fuentes/]"""
import json, re, sys, os, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("chapters", os.path.join(HERE, "chapters.py"))
ch = importlib.util.module_from_spec(spec); spec.loader.exec_module(ch)

WPS = 2.2
VOICE = {
    "voice": "Pablo Macias (es-MX), calmo y claro, ritmo de clase",
    "voiceId": "68nvxRVrtyK9nd4hTKmR",
    "voiceModel": "eleven_v4",
    "voiceSettings": {"stability": 0.5, "similarity_boost": 0.8, "style": 0.1, "use_speaker_boost": True},
}
NUM = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","once","doce","trece",
       "catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte","veintiuno","veintidós",
       "veintitrés","veinticuatro","veinticinco","veintiséis","veintisiete","veintiocho","veintinueve","treinta","treinta y uno"]
LET = {"R": "erre", "Q": "cu", "A": "a"}

def auto_say(text):
    s = text
    s = re.sub(r"ADR (\d)(\d)(\d)", lambda m: "A-D-R " + " ".join(NUM[int(d)] for d in m.groups()), s)
    s = re.sub(r"\bADR\b", "A-D-R", s)
    s = s.replace("top 3", "top tres")
    s = re.sub(r"\bLLM\b", "L-L-M", s)
    s = re.sub(r"\bATS\b", "A-T-S", s)
    s = re.sub(r"\bAPI\b", "A-P-I", s)
    s = re.sub(r"\b([RQA])(\d{1,2})\b", lambda m: LET[m.group(1)] + " " + NUM[int(m.group(2))], s)
    s = re.sub(r"([Cc]apítulo) (\d)\b", lambda m: m.group(1) + " " + NUM[int(m.group(2))], s)
    return s

def spoken(line):
    return line.get("say") or line["text"]

def words(s):
    return len(re.findall(r"[\wáéíóúñü]+(?:[-'][\wáéíóúñü]+)*", s, re.I))

def finalize(chap):
    """Completa say automáticos y verifica que no queden dígitos sin say."""
    for sc in chap["scenes"]:
        for ln in sc["lines"]:
            if "say" not in ln:
                a = auto_say(ln["text"])
                if a != ln["text"]:
                    ln["say"] = a
            sp = spoken(ln)
            if re.search(r"\d", sp):
                raise SystemExit(f"Cap {chap['n']} {sc['id']}: dígitos en lo hablado: {sp}")
            if "—" in ln["text"] or "—" in sp:
                raise SystemExit(f"raya en cap {chap['n']} {sc['id']}")
    return chap

def secs(lines):
    return sum(words(spoken(l)) / WPS + l.get("pauseAfter", 0) for l in lines)

def narration(chap):
    return {
        "title": f"Capítulo {chap['n']} · {chap['title']}",
        "chapter": chap["n"],
        **VOICE,
        "scenes": [
            {"id": sc["id"], "kicker": sc["kicker"],
             "lines": [{k: v for k, v in (("text", l["text"]), ("say", l.get("say")), ("pauseAfter", l.get("pauseAfter"))) if v is not None}
                       for l in sc["lines"]]}
            for sc in chap["scenes"]
        ],
    }

def compact(nj):
    J = lambda v: json.dumps(v, ensure_ascii=False)
    vs = nj["voiceSettings"]
    out = ["{"]
    for k in ("title", "chapter", "voice", "voiceId", "voiceModel"):
        out.append(f'  {J(k)}: {J(nj[k])},')
    out.append('  "voiceSettings": { ' + ", ".join(f"{J(k)}: {J(v)}" for k, v in vs.items()) + " },")
    out.append('  "scenes": [')
    for si, sc in enumerate(nj["scenes"]):
        out.append("    {")
        out.append(f'      "id": {J(sc["id"])},')
        out.append(f'      "kicker": {J(sc["kicker"])},')
        out.append('      "lines": [')
        for li, l in enumerate(sc["lines"]):
            body = ", ".join(f"{J(k)}: {J(v)}" for k, v in l.items())
            out.append("        { " + body + " }" + ("," if li < len(sc["lines"]) - 1 else ""))
        out.append("      ]")
        out.append("    }" + ("," if si < len(nj["scenes"]) - 1 else ""))
    out.append("  ]")
    out.append("}")
    s = "\n".join(out) + "\n"
    assert json.loads(s) == nj
    return s

def fmt_s(x):
    return f"{x:.0f}"

def mmss(x):
    return f"{int(x//60)}:{int(round(x%60)):02d}"

def guion_md(chap):
    out = []
    n = chap["n"]
    total_w = sum(words(spoken(l)) for sc in chap["scenes"] for l in sc["lines"])
    pauses = sum(l.get("pauseAfter", 0) for sc in chap["scenes"] for l in sc["lines"])
    total_s = total_w / WPS + pauses
    out.append(f"## Capítulo {n} · {chap['title']}\n")
    out.append(f"**Duración estimada:** {total_w} palabras habladas, {mmss(total_w / WPS)} de voz a 2,2 palabras/s, más {str(round(pauses,1)).replace('.', ',')} s de pausas escritas: **{mmss(total_s)}**. {len(chap['scenes'])} escenas.\n")
    out.append("### Plan\n")
    out.append("**Ideas esenciales**\n")
    for i, idea in enumerate(chap["ideas"], 1):
        out.append(f"{i}. {idea}")
    out.append("\n**Anclas en el repositorio**\n")
    for a in chap["anchors"]:
        out.append(f"- {a}")
    out.append("\n**Al terminar, el espectador puede**\n")
    for a in chap["learn"]:
        out.append(f"- {a}")
    out.append("\n**Qué se deja afuera (y por qué)**\n")
    for a in chap["cut"]:
        out.append(f"- {a}")
    out.append("\n### Auditoría del guion\n")
    out.append("Segundos estimados a 2,2 palabras por segundo, más las pausas escritas. Los segundos de cada concepto suman las líneas que lo trabajan (calculado, no a ojo).\n")
    out.append("| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |")
    out.append("| - | - | - | - | - | - | - | - |")
    for sc in chap["scenes"]:
        a = sc["audit"]
        w = sum(words(spoken(l)) for l in sc["lines"])
        s = secs(sc["lines"])
        conc = "; ".join(c[0] for c in a["concepts"]) or "—"
        per = "; ".join(f"{c[0]} ~{fmt_s(secs([sc['lines'][i] for i in c[1]]))} s" for c in a["concepts"]) or "—"
        out.append(f"| {sc['id']} ({w} palabras, ~{fmt_s(s)} s) | {conc} | {per} | {a['case']} | {a['defined']} | {a['why']} | {a['read']} | {a['verdict']} |")
    out.append("\n**Tiempo total por concepto clave** (suma de todas las líneas que lo trabajan, en cualquier escena del capítulo)\n")
    out.append("| Concepto clave | Segundos | Dónde |")
    out.append("| - | - | - |")
    byid = {sc["id"]: sc for sc in chap["scenes"]}
    for name, where in chap["keys"]:
        ls = []
        for sid, idx in where.items():
            sc = byid[sid]
            ls += sc["lines"] if idx == "all" else [sc["lines"][i] for i in idx]
        out.append(f"| {name} | ~{fmt_s(secs(ls))} s | {', '.join('`'+k+'`' for k in where)} |")
    out.append("\n**Dónde se perdería el espectador tipo, y cómo lo cubre el guion**\n")
    for q in chap["questions"]:
        out.append(f"- {q}")
    out.append("\n### Guion\n")
    for sc in chap["scenes"]:
        s = secs(sc["lines"])
        out.append(f"#### `{sc['id']}` · {sc['kicker']} (~{fmt_s(s)} s)\n")
        out.append(f"> **Visual.** {sc['visual']}\n")
        for l in sc["lines"]:
            extra = []
            if l.get("pauseAfter"):
                extra.append(f"pausa {l['pauseAfter']:g} s")
            if l.get("say"):
                extra.append(f"dice: «{l['say']}»")
            tail = f" *({'; '.join(extra)})*" if extra else ""
            out.append(f"- {l['text']}{tail}")
        out.append("")
    return "\n".join(out), total_w, total_s

def main(out_dir):
    summary = []
    parts = []
    for chap in ch.CHAPTERS:
        finalize(chap)
        d = os.path.join(out_dir, "video", f"ch{chap['n']}")
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, "narration.json"), "w", encoding="utf-8") as f:
            f.write(compact(narration(chap)))
        md, w, s = guion_md(chap)
        parts.append(md)
        summary.append((chap["n"], chap["title"], len(chap["scenes"]), w, s))
    tw = sum(x[3] for x in summary); ts = sum(x[4] for x in summary)
    rows = ["| # | Capítulo | Escenas | Palabras | Duración estimada |", "| - | - | - | - | - |"]
    for n, t, sc, w, s in summary:
        rows.append(f"| {n} | {t} | {sc} | {w} | {mmss(s)} |")
    rows.append(f"| | **Total** | {sum(x[2] for x in summary)} | {tw} | **{mmss(ts)}** |")
    head = open(os.path.join(HERE, "head.md"), encoding="utf-8").read().replace("{SUMMARY}", "\n".join(rows))
    with open(os.path.join(out_dir, "GUION.md"), "w", encoding="utf-8") as f:
        f.write(head + "\n\n---\n\n".join(parts) + "\n")
    for row in summary:
        print(row[0], row[1], row[2], row[3], mmss(row[4]))
    print("total", tw, mmss(ts))

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(HERE))
