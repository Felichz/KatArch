# Investigación de los repositorios ganadores

Qué hay aquí y en qué orden se usa. Las reglas de fondo están en `CLAUDE.md` ("Cómo se construye el curso").

## Orden

1. **Inventario** (`inventario/`): lista de todos los archivos de cada repositorio, con tipo, tamaño y la columna "Leído". Se regenera con `node scripts/inventario-katas.mjs` (conserva las marcas).
2. **Fase 1, solo texto** (`texto/<Repo>.md`): hallazgos de cada repositorio con el formato de `FORMATO.md`. Un agente lee todos los archivos de texto y escribe su archivo. Un segundo agente verifica cada hallazgo contra la fuente y deja `texto/<Repo>.verificacion.md`.
3. **Índice de la fase 1** (`texto/INDICE.md`): lista de todos los hallazgos de los doce repositorios, con el estado de verificación. Se genera con `node scripts/indice-hallazgos.mjs`. Es el punto de partida del análisis de conjunto.
4. **Fase 2, imágenes** (pendiente): solo las imágenes de la sección 6 de cada repositorio, y las que el índice marque como "depende de imagen".
5. **Análisis de conjunto** (`ANALISIS-CONJUNTO.md`, primera versión sobre la fase 1; falta verificar el sentido de los ejemplos elegidos): con todos los repositorios investigados, qué enseñan juntos, cuál es el mejor ejemplo de cada idea, qué casos conviene que vuelvan y en qué orden se entiende todo. Lo valioso que no entre queda con su razón.
6. **Plan del curso** (`PLAN-CURSO.md`): organización y contenido en doce bloques, casos, ejemplos verificados y lo que queda fuera. La división en videos se decide después. Los guiones se escriben desde este plan.

## Estado

| Repo | Fase 1 extracción | Fase 1 verificación (Haiku) | Fase 2 imágenes |
|---|---|---|---|
| ArchColider | 27 hallazgos | 27 OK · 0 NO | pendiente |
| Archangels | 17 hallazgos | 13 OK · 4 NO | pendiente |
| BluzBrothers | 13 hallazgos | 12 OK · 1 NO | pendiente |
| Celus-Ceals | 11 hallazgos | 10 OK · 1 NO | pendiente |
| ConnectedAI | 16 hallazgos | 15 OK · 1 NO | pendiente |
| Five-Nines | 23 hallazgos | 21 OK · 2 NO | pendiente |
| MonArch | 15 hallazgos | 2 OK · 13 NO | pendiente |
| Pegasuz | 15 hallazgos | 7 OK · 8 NO | pendiente |
| Pragmatic | 21 hallazgos | 18 OK · 3 NO | pendiente |
| Profitero-Data-Alchemists | 14 hallazgos | 10 OK · 4 NO | pendiente |
| Team-7 | 14 hallazgos | 12 OK · 2 NO | pendiente |
| ZAITects | 20 hallazgos | 19 OK · 1 NO | pendiente |

Fase 1: 206 hallazgos. Pasada de correcciones sobre los 40 NO de la verificación de Haiku (ver `texto/CORRECCIONES.md`) y comprobación mecánica con `scripts/comprobar-citas.mjs`: citas literales, archivos y líneas existentes, y cifras presentes en el repositorio. Resultado: 198 OK y 8 NO. Los 8 NO son referencias reales a archivos que no existen (enlaces rotos que el texto ya señala), cifras calculadas por el equipo de la kata que no están en la fuente (MonArch H14 y H15, 2710) y números de ADR que aparecen en preguntas (no son cifras).

**Importante:** la comprobación mecánica no revisa el sentido de cada afirmación. Los `.verificacion.md` de la verificación de sentido hecha por Haiku se sobrescribieron con la comprobación mecánica, así que esa lectura ya no está en el repositorio. Hay que repetir la verificación de sentido con un lector distinto antes del análisis de conjunto.

Además, la comprobación mecánica encontró citas entre comillas que no son literales en hallazgos que no estaban entre los 40 NO. Se corrigieron quitando las comillas (quedan como paráfrasis), salvo las que sí coinciden con el repositorio.


## Qué no hace esta fase

No escribe guiones, no toca `narration.json`, no toca `cursos/_corpus/`, y no decide qué entra en el curso. El material de `_corpus/` es de una primera vuelta y se usa solo como índice para encontrar archivos, no como fuente de hechos.
