# Brief: dossier de evidencia para una parte del curso único de KatArch

## Contexto
KatArch es un curso en video, en español neutro, que enseña arquitectura de software a partir de los 12 equipos que ganaron las O'Reilly Architecture Katas entre 2020 y 2025. El curso NO sigue a un equipo: está organizado por lo que el espectador tiene que aprender (ver `cursos/_corpus/DISENO-CURSO.md`, sección "Etapa 1"), y los repositorios son evidencia. El espectador es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero.

Ya existen fichas de los 12 repos (`cursos/_corpus/fichas/*.md`, hechas por un modelo pequeño: úsalas como índice, NO como fuente) y un mapa de verdades candidatas (`cursos/_corpus/MAPA-VERDADES.md`). Tu trabajo es comprobar contra los **archivos originales** de cada repo si las verdades que te tocan se sostienen, y encontrar los mejores ejemplos para enseñarlas.

## Dónde están los repos (texto)
`C:\Users\felix\dev\katarch-corpus\<Repo>-src\` — Five-Nines, ZAITects, Pragmatic, BluzBrothers, ArchColider, ConnectedAI, Profitero-Data-Alchemists, Celus-Ceals, MonArch, Pegasuz, Archangels, Team-7. En Five-Nines-src los ":" de los nombres de archivo se cambiaron por "_". Los 7 últimos solo tienen archivos de texto (sin imágenes).
Mapeo de nombres: Five Nines = Five-Nines (MobilityCorp, 2025), ZAItects = ZAITects (Certifiable Inc., 2025), Pragmatic (ClearView, 2024), ConnectedAI (ShopWise, 2024), BluzBrothers (MonitorMe, 2024), Data Alchemists = Profitero-Data-Alchemists (Road Warrior, 2023), CELUS Ceals = Celus-Ceals (Wildlife Watcher, 2023), monArch = MonArch (Hey Blue!, 2022), Pegasuz (Spotlight, 2022), The Archangels = Archangels (Farmacy Family, 2021), Team 7 = Team-7 (Sysops Squad, 2021), ArchColider (Farmacy Food, 2020). Los 12 ganaron (primer lugar) su edición.

## Reglas
1. Cada afirmación lleva su fuente: `Repo: ruta/archivo` (y sección o línea si ayuda). Las citas textuales van entre comillas, en el idioma original, máximo 25 palabras, copiadas exactas.
2. Marca `[DATO]` lo que el repo dice, `[DEDUCCIÓN]` lo que se infiere (di de qué), `[HUECO]` lo que no dice.
3. Sin opiniones ni elogios ("excelente", "inteligente", "elegante"). Si algo enseña, di qué enseña en hechos.
4. No inventes cifras, alternativas ni razones. Si un ADR no las declara, dilo.
5. Lee los ADR y documentos relevantes COMPLETOS en los repos marcados en el mapa para tus verdades, y busca (grep) en los demás repos por si alguno también la sostiene y el mapa no lo marcó.
6. Español neutro; términos técnicos en inglés cuando así se usan.

## Formato de salida (un archivo .md)

# Dossier <id> · <resultado de aprendizaje>

## 1. Las verdades, reformuladas
Para cada verdad que te tocó: la formulación que de verdad sostiene la evidencia (puede ser más estrecha o distinta que la del mapa), en una o dos frases que un desarrollador entienda sin jerga. Si una verdad no se sostiene, dilo y propón qué la reemplaza.

## 2. Verificación por repo
Tabla por verdad: | Repo | ¿La sostiene? (sí / parcial / no) | Evidencia (archivo + cita corta) | Detalle concreto (cifras, nombres, qué decidió) |
Incluye todos los repos marcados en el mapa y los que encuentres tú.

## 3. Los mejores ejemplos para enseñar (2 a 4 por verdad)
Para cada uno, contado con detalle suficiente para escribir un guion sin volver al repo:
- El caso en dos frases (quién, qué problema de negocio).
- La situación concreta que obliga a decidir (con cifras si las hay).
- Qué decidió el equipo, qué alternativas declaró y por qué las descartó.
- Qué costo admitió (con cita).
- Qué enseña exactamente, y por qué este ejemplo y no otro.
- Fuentes.

## 4. Decisiones contrarias
Ejemplos donde otro ganador decidió lo opuesto por una razón válida (muestran de qué depende la verdad). Si no hay, dilo.

## 5. Límites
Qué NO se puede afirmar con esta evidencia (por ejemplo: "ningún repo midió esto en producción", "solo lo sostienen katas de IA").

## 6. Para elegir el elenco
El curso tendrá un caso principal que atraviesa todos los módulos (candidatos: Pragmatic y Five Nines) y 2 o 3 casos más. Para tus verdades: cuánto y qué tan bien las ilustra Pragmatic, cuánto Five Nines, y qué otro repo las ilustra mejor que ambos (si alguno). Sé concreto.

## 7. Términos que hay que explicar
Lista de términos técnicos que aparecen en estos ejemplos, con una explicación de una frase para alguien que no los conoce.

## 8. Qué se puede mostrar en pantalla
Cifras, tablas, diagramas o frases del repo que servirían como visual (con fuente).

Longitud: la que haga falta; la sección 3 es la más importante. No escribas guion ni prosa de narrador.
