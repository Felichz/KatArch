"""Genera ../video/chN/narration.json y ../GUION.md desde los .json de esta carpeta.

Uso (desde cualquier lugar): python3 cursos/zaitects/fuentes/build.py
Opcional: python3 build.py <src_dir> <out_dir>
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
src = sys.argv[1] if len(sys.argv) > 1 else HERE
out = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(HERE)
# Misma voz que KatArch (copiada de KatArch/video/ch5/narration.json).
VOICE = {
    "voice": "Pablo Macias (es-MX), calmo y claro, ritmo de clase",
    "voiceId": "68nvxRVrtyK9nd4hTKmR",
    "voiceModel": "eleven_v4",
    "voiceSettings": {"stability": 0.5, "similarity_boost": 0.8, "style": 0.1, "use_speaker_boost": True},
}
plans = json.load(open(os.path.join(src, "plans.json")))
WPS = 2.2

chapters = []
for n in range(1, 9):
    d = json.load(open(os.path.join(src, f"ch{n}.json")))
    chapters.append(d)

def words(line):
    return len((line.get("say") or line["text"]).split())

def stats(scene):
    w = sum(words(l) for l in scene["lines"])
    p = sum(l.get("pauseAfter", 0) for l in scene["lines"])
    return w, w / WPS, p

def mmss(sec):
    sec = round(sec)
    return f"{sec // 60}:{sec % 60:02d}"

def fmt(x):
    return f"{x:.1f}".replace(".", ",")

# ---------- narration.json ----------
for d in chapters:
    n = d["chapter"]
    doc = {"title": f"Capítulo {n} · {d['title']}", "chapter": n, **VOICE, "scenes": []}
    for s in d["scenes"]:
        lines = []
        for l in s["lines"]:
            o = {"text": l["text"]}
            if l.get("say"):
                o["say"] = l["say"]
            if l.get("pauseAfter"):
                o["pauseAfter"] = l["pauseAfter"]
            lines.append(o)
        doc["scenes"].append({"id": s["id"], "kicker": s["kicker"], "lines": lines})
    p = os.path.join(out, "video", f"ch{n}")
    os.makedirs(p, exist_ok=True)
    with open(os.path.join(p, "narration.json"), "w") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
        f.write("\n")

# ---------- GUION.md ----------
tot = []
for d in chapters:
    w = sum(stats(s)[0] for s in d["scenes"])
    p = sum(stats(s)[2] for s in d["scenes"])
    tot.append((w, w / WPS + p, p))

L = []
A = L.append
A("# GUION · Curso en video de ZAItects (Certifiable, Inc., invierno 2025)")
A("")
A("Guion completo del curso en video sobre el equipo ganador del O'Reilly Architecture Kata de invierno 2025 (*AI-Enabled Architecture*). La columna vertebral es `HISTORIA.md`: el orden en que el equipo pensó, reconstruido con la historia de git. Vara pedagógica: `KatArch/video/PEDAGOGY.md`. Formato de los guiones: el de `KatArch/video/ch5/narration.json`, con la misma configuración de voz.")
A("")
A("Este archivo y los `video/chN/narration.json` se generan desde la misma fuente, así que las líneas coinciden exactamente. En el guion, **Voz:** muestra el campo `say` cuando la línea tiene cifras o siglas que se leen distinto.")
A("")
A("## 1. El curso")
A("")
A("**Espectador tipo** (PEDAGOGY.md): desarrollador con un par de años de experiencia, que nunca diseñó un sistema entero ni uno con IA generativa. No sabe qué es RAG, un embedding o un LLM como juez, y no puede pausar.")
A("")
A("**Qué hace distinto a este curso**: no muestra la arquitectura final, reconstruye cómo se llegó a ella. Sigue el orden real del equipo, con sus vueltas atrás: un boceto de solución el primer día, el problema medido tres días después, siete ideas recortadas a tres, un primer borrador con fine-tuning y agentes que se borra, una estimación del test 2 que no cerraba y se reemplaza, y la factura casi al final.")
A("")
A("**Por qué 8 capítulos.** El repo tiene unas 29.000 palabras y 169 commits, pero un solo hilo técnico fuerte (corregir con IA y validar esa corrección) y una sola cuenta (horas de experto). ArchColider dio para 11 capítulos porque cubría negocio, estilo, dominio, mundo físico, nube y costos. Aquí, cada capítulo corresponde a un paso del razonamiento con evidencia propia en la historia; no hay capítulo de relleno. Se descartaron: un capítulo sobre la pila de herramientas (LangChain, Instructor, Langwatch, OWASP, gobernanza), porque son elecciones de catálogo con poco razonamiento propio y el curso escrito las cubre; y un capítulo de método separado, que queda como cierre del capítulo 8.")
A("")
A("**Orden.** Cronológico por la evolución de cada idea, con dos excepciones dichas en la voz o en las notas: la hoja de características (versión del 16 de marzo) se muestra en el capítulo 4 porque explica por qué importa el corrector; y el test 2, que fue lo primero que se bocetó, se estudia en el capítulo 6 porque su diseño maduro llegó al final, cuando heredó el juez del test 1. El capítulo 1 lo anticipa y el 6 lo retoma (\"¿recuerdas el primer documento del equipo?\").")
A("")
A("**Reglas aplicadas**: primero el caso y después el nombre; cada término definido en su primer uso (kata, pliego, restricción, IA generativa, LLM, commit, unidad, rúbrica, persona, característica de arquitectura, explicabilidad, zero-shot, fine-tuning, RAG, ADR, prompt, cadena de pensamiento, embedding, vector store, LLM como juez, puntaje de confianza, umbral, humano en el circuito, trade-off, MVP, fitness function, estrategia multimodelo, agente, antipatrón, AI gateway, inyección de prompt, guardrails, token); un \"piénsalo tú\" por capítulo, siempre después de las herramientas; cada capítulo abre con un \"¿recuerdas…?\" y cierra repasando sus ideas; español neutro con tuteo y sin rayas.")
A("")
A("**Honestidad**: se dice en la voz cuando algo es inferencia nuestra (el 4X, la fecha de la semifinal, por qué se borró la estimación de los 900 expertos, por qué ganó), cuando el equipo supuso algo que el pliego no dice (el 80 % que pasa al test 2, el tope del 30 %, el 20 % de revisión humana), cuando usó IA para escribir (la rúbrica con ChatGPT, el guion de la presentación) y cuando reutilizó ADR de otro kata. Donde el repo se contradice, la voz dice qué fuente sigue (940.000 frente a \"más de un millón\"; el README frente al documento del caso de estudio sobre agentes).")
A("")
A("**Fuentes fuera de ZAITects** (usadas con moderación): el pliego verbatim de Software Architecture Guild (3.º); los criterios del jurado y el umbral de 0,7 de Litmus (2.º); la postura \"la IA solo sugiere\" de Software Architecture Guild, una sola vez, en el capítulo 5; el repo ArchZ (otoño 2024) solo para probar la reutilización, en el capítulo 7.")
A("")
A("## 2. Los capítulos")
A("")
A("Duración estimada: voz a 2,2 palabras por segundo más las pausas escritas.")
A("")
A("| # | Título | Palabras | Duración | Ideas esenciales | Anclas principales |")
A("| - | - | - | - | - | - |")
for d, (w, t, p) in zip(chapters, tot):
    pl = plans[str(d["chapter"])]
    ideas = "<br>".join(f"{i+1}. {x}" for i, x in enumerate(pl["ideas"]))
    A(f"| {d['chapter']} | {d['title']} | {w} | {mmss(t)} | {ideas} | {pl['fase']} |")
tw = sum(x[0] for x in tot); tt = sum(x[1] for x in tot)
A(f"| | **Total** | **{tw}** | **{mmss(tt)}** | | |")
A("")
A("Los capítulos quedan entre 5 y 6,5 minutos estimados. Con la voz real de KatArch, que en el capítulo 5 habló un 15 % más rápido que el estimado, quedarían algo más cortos; ninguno está por debajo de las 640 palabras.")
A("")
A("## 3. Plan, auditoría y guion por capítulo")
A("")

for d, (w, t, p) in zip(chapters, tot):
    n = d["chapter"]; pl = plans[str(n)]
    A(f"### Capítulo {n} · {d['title']}")
    A("")
    A(f"**Momento de la historia**: {pl['fase']}.")
    A("")
    A("**Ideas esenciales**")
    A("")
    for i, x in enumerate(pl["ideas"]):
        A(f"{i+1}. {x}")
    A("")
    A(f"**Anclas en el repositorio**: {pl['anclas']}")
    A("")
    A(f"**Después de este capítulo, el espectador puede**: {pl['aprender']}")
    A("")
    A(f"**Notas de diseño**: {pl['notas']}")
    A("")
    A(f"#### Auditoría ({len(d['scenes'])} escenas, {w} palabras, {mmss(w / WPS)} de voz más {fmt(p)} s de pausas: unos {mmss(t)})")
    A("")
    A("| Escena | Conceptos nuevos | Segundos que recibe cada uno (a 2,2 palabras/s, más pausas) | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |")
    A("| - | - | - | - | - | - | - | - |")
    for s in d["scenes"]:
        sw, ss, sp = stats(s)
        a = pl["audit"][s["id"]]
        A(f"| {s['id']} ({sw} palabras, ~{round(ss)} s) | " + " | ".join(a) + " |")
    A("")
    A("Dónde se perdería el espectador tipo, y cómo lo resuelve el guion:")
    A("")
    for x in pl["perdida"]:
        A(f"- {x}")
    A("")
    A("#### Guion")
    A("")
    for i, s in enumerate(d["scenes"]):
        sw, ss, sp = stats(s)
        A(f"**{i+1}. `{s['id']}` · {s['kicker']}** ({sw} palabras, ~{round(ss + sp)} s)")
        A("")
        A(f"> *Visual:* {s['visual']}")
        A("")
        for l in s["lines"]:
            extra = f" *(pausa {fmt(l['pauseAfter'])} s)*" if l.get("pauseAfter") else ""
            A(f"- {l['text']}{extra}")
            if l.get("say"):
                A(f"  - **Voz:** {l['say']}")
        A("")
    A("---")
    A("")

with open(os.path.join(out, "GUION.md"), "w") as f:
    f.write("\n".join(L))
print("ok", [mmss(x[1]) for x in tot], tw, mmss(tt))
