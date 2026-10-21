---
name: guion-curso
description: Escribir o revisar el guion narrado de un capítulo de curso en video de KatArch (ArchColider, Five Nines y los que vengan). Úsalo cuando haya que redactar un capítulo en prosa, reescribir uno, revisar su estilo o prepararlo para cortarlo en narration.json. Fija estructura, voz y verificación; no cubre las animaciones.
---

# Guion de un capítulo de curso (KatArch)

Un solo narrador lleva a alguien de no saber a poder explicar. El guion se escribe primero como prosa para leer en voz alta, se aprueba leído, y solo después se corta en `narration.json`. Base: `lecture-style` de OpenMAIC, adaptado a capítulos de 8 a 10 minutos con animación y sin interactividad.

Las reglas del proyecto están en `CLAUDE.md` (raíz del repo), empezando por "Lo que manda: enseñar arquitectura de software real"; esto las ordena en un procedimiento. Antes de verificar hechos, `node scripts/clone-katas.mjs` deja los doce repositorios en `katas-src/`.

## Estructura de un capítulo

1. **Gancho concreto.** Abre con una imagen, un dato o una escena del caso (una fecha, un número, una nota escrita). Nunca con una pregunta abstracta ni con "en este capítulo veremos".
2. **Pregunta y ruta, en dos o tres frases justo después del gancho.** Qué pregunta responde el capítulo y por dónde va. Del capítulo 2 en adelante, la ruta es una sola frase. Si es capítulo de curso con jurado o hilo (en Five Nines, las cuatro preguntas del jurado), dice cuál contesta.
3. **Cuerpo en pasos.** Cada paso lleva una idea de la afirmación al mecanismo y de ahí a un caso real que la pone a prueba. Tres a cinco pasos por capítulo.
4. **Un caso que vuelve.** Un solo caso recorre el capítulo (una cifra, una nota, un scooter) y se retoma en cada paso; no un ejemplo nuevo por sección.
5. **Cierre sobre el argumento.** Vuelve al gancho y dice qué cambió en cómo se ve el problema, sin lista ni repaso numerado, y deja lo que sigue abierto como puente al próximo capítulo. Sin párrafo de "se estableció tres cosas".

Sin pausas de "piénsalo" ni preguntas al espectador (decisión de Felix, 14 de octubre de 2026): la explicación fluye de punta a punta y el narrador explica todo, en el orden que la mente necesita. Las preguntas que el narrador se hace y responde en el mismo párrafo siguen valiendo como recurso de prosa.

## Voz

- **Sin opiniones del narrador.** Ni "a mí me parece", ni "me gusta", ni "yo, en su lugar". Donde habría una valoración va el hecho o la razón. Si Felix dicta o aprueba una opinión, se marca como suya; por defecto, ninguna.
- **Hecho, deducción, hueco.** Lo que el repositorio prueba se dice como hecho; lo que deducimos, como deducción ("lo deducimos nosotros"); lo que falta, como hueco. Las ilustraciones propias (el túnel, las dos copias de la batería) se dicen como propias.
- **Lenguaje hablado, no de apuntes.** Fuera "nuestro caso de referencia", "lo que vamos a mirar ahora", "como veremos en la sección". La estructura se nota por cómo avanza el texto, no porque se anuncie.
- **Frases de hasta unas 28 palabras** (límite del TTS), de largo variado. Subordinadas y conectores de habla ("o sea", "fíjate", "ahora bien") sí; dos puntos en cada oración, no.
- **Español neutro**, tuteo, sin regionalismos ("acá", "vos"). Términos técnicos que se dicen en inglés se dejan en inglés ("trade-off").
- **Tics prohibidos:** "no es X, es Y" repetido, frases-eslogan seguidas, tríadas por reflejo, repasos numerados dichos en voz alta, "Piensa en…/Imagina…" como muletilla, cierres tipo "y eso lo cambia todo", preguntas retóricas con respuesta de una palabra.
- **Leer los capítulos seguidos antes de darlos por buenos.** Los tics nuevos aparecen entre capítulos, no dentro de uno: en Five Nines salieron «Supón que…» antes de cada pausa, «Este capítulo sigue a…» en las aperturas y «Hasta aquí…» en los puentes. Cada fórmula, como mucho una vez en el curso.
- **Sin ritual idéntico entre capítulos.** Los cierres no empiezan siempre igual: "Volvamos a…" se usa como mucho en uno de cada tres capítulos; en los demás el cierre arranca por la idea o por el hecho que cambia.
- **Sin calificativos sin base** ("lo más importante", "precioso", "audaz").

## Verificación

- Cada afirmación factual va en la **tabla de verificación** al final del `.md`, con su fuente (commit, ADR, minuto de los subtítulos). Cifras, fechas y nombres se comprueban contra la fuente.
- Lo pendiente de comprobar ("verificar contra el ADR…") va **solo** en esa tabla, nunca dentro del texto narrado.
- Cifras calculadas por el curso se dicen como nuestras.

## Cómo trabajar

1. Redactar el capítulo en `guion/<capN>.md` según la estructura (títulos de sección = pasos, no se dicen en voz).
2. Correr `node .claude/skills/guion-curso/check.mjs guion/capN.md`: cuenta palabras y duración estimada, lista frases largas, tics y conteo de dos puntos. Corregir lo que marca.
3. Leerlo completo en voz alta (mentalmente) buscando: apertura concreta, caso que vuelve, cierre distinto al de los otros capítulos, cero opiniones.
4. Felix lo aprueba leído. Recién entonces se corta en `narration.json` (aplicar `PEDAGOGY.md`) y sigue la cadena de producción del `CLAUDE.md`.
5. Para revisar un capítulo ya escrito: mismo `check.mjs` más la lista de arriba, y entregar los cambios con la razón de cada uno.

## Límites

Pensado para video corto con narración continua. No sirve tal cual para prácticas guiadas ni para cursos centrados en manipular un mecanismo.

## Carga cognitiva (guiones del curso único)

Cada idea del guion se puntúa en **carga** (1 a 5: elementos nuevos que sostiene el espectador, contados, no sentidos: nombres propios, términos o siglas, cifras, pasos de razonamiento, más 1 si hay que combinarlos con algo anterior) y **fricción** (1 a 5: salto desde la idea anterior). Reglas acordadas:

1. Carga 4 o más solo con fricción 1 o 2: la idea difícil llega con el caso, el término y la herramienta ya presentados.
2. Un caso o término nuevo (fricción 3 o más) entra con carga 1 o 2, en una frase simple (quién es, qué hace) antes de usarlo en un argumento.
3. Nunca dos ideas de carga 4 seguidas: tras una pesada va una liviana que la aplica o la repite con otras palabras.
4. Como máximo un caso nuevo cada dos minutos; los casos recurrentes cargan la lección y un caso invitado entra solo si la idea lo exige.
5. Si un ADR o ejemplo obliga a narrar complejidad que la idea no necesita (caso nuevo, términos, cifras que no coinciden, salvedades, estado Proposed), se busca otro del corpus que enseñe lo mismo sin ese peso. La complejidad extra se acepta solo si no hay alternativa, y se anota por qué en la tabla de verificación (detalle en `CLAUDE.md`, "El ejemplo más simple que enseñe lo mismo").
6. Antes de cortar una idea que aporta, se busca dónde cuenta con menos fricción, mejor con un caso que ya está en pantalla (`CLAUDE.md`, "Exprimir el jugo de las katas, sin sumar complejidad").

Las reglas se aplican **a mano, como criterio de lectura**, sin perder la voz de "Cómo suena": un caso invitado se presenta en su propia frase antes de usarlo y no entra a mitad de un argumento (si la idea no lo exige, se corta); un término se define antes del primer uso; una frase con varias cifras o varios nombres se parte; después de una idea pesada va una que la aplica a un caso conocido, dicha con naturalidad.

**No usar bucles de revisores que puntúan con números** (Felix, octubre de 2026). Se probó: un revisor Haiku por lección + `carga/check-reglas.cjs`, doce rondas. El recuento no bajó (98 a 128 violaciones, ±20 de ruido con el mismo texto) y el texto empeoró: "o sea" de relleno (de 6 a 86 en el curso), puentes vacíos ("Veamos ahora…"), escenas reducidas a una frase y ~3.000 palabras de contenido perdidas. Se volvió a la versión previa y se aplicaron las reglas a mano. Quien juzga es la lectura de Felix.
