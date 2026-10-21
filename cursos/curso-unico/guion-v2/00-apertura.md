# Apertura · Un sistema entero, antes de explicarlo

Bloque corto (unos 2 minutos y medio). **Cambio aprobado (ver `ACTO1-CONTINUIDAD.md`):** se corta la frase de temario del comienzo y el párrafo del concurso se acorta, para llegar a ClearView en unos 30 segundos. Presenta de dónde sale el material y muestra un sistema terminado sin explicar ninguna decisión: deja preguntas abiertas que el curso va a contestar. Es la etapa de "romance" del plan.

## El curso {#intro}

**Narración**

Este curso sale de un concurso de diseño de software que organiza O'Reilly, las Architecture Katas. Lo presentan Neal Ford y Mark Richards, autores del libro Fundamentals of Software Architecture. Un jurado que encabeza Jacqui Read elige al ganador de cada edición.

En cada edición se presenta el caso de un negocio, y equipos pequeños diseñan la solución en poco tiempo. Entregan requisitos, diagramas y decisiones escritas. Un catálogo llamado TheKataLog reúne los repositorios de los ganadores, y este curso usa doce.

**Visual**
- Imagen central: ninguna todavía; el fondo del tema y palabras clave.
- Desde la primera palabra → cuatro piezas sueltas de la gramática (un servicio, una flecha, una pieza caída, una base de datos), sin conectar, en gris.
- «al decir "Architecture Katas"» → las piezas se apartan y aparece el nombre del concurso, centrado.
- «al decir "Neal Ford y Mark Richards"» → debajo, sus dos nombres; «al decir "Jacqui Read"» → el de ella, con la palabra "jurado".
- «al decir "un catálogo llamado TheKataLog"» → doce tarjetas pequeñas en una grilla de 4 × 3, cada una con el nombre de un ganador; se quedan hasta el final de la frase siguiente, el tiempo de leerse.
- Al final: las doce tarjetas se encogen y una, ClearView, crece hacia el centro.

## Un sistema terminado {#clearview}

**Narración**

Uno de esos ganadores diseñó ClearView, la plataforma de una organización sin fines de lucro que vive de donaciones. Una persona que busca trabajo sube su currículum. El sistema le quita todo lo que la identifica y escribe con él una historia anónima de lo que sabe hacer. Una empresa publica un puesto, y el sistema propone qué historias encajan con él.

La empresa ve solo la historia. Si le interesa, desbloquea el emparejamiento, y recién entonces el currículum completo viaja al sistema de recursos humanos de esa empresa.

Así se ve el sistema que diseñó el equipo. A la izquierda, las personas. En el centro, varios servicios que comparten una misma base de datos. A la derecha, los modelos de inteligencia artificial, que no son de ClearView, y los sistemas de recursos humanos de las empresas, que son unos cien distintos.

**Visual**
- Imagen central: el diagrama maestro de ClearView (ver `GUIA-VISUAL.md`, "El diagrama que crece"), completo pero sin explicaciones.
- Sello: ClearView (ícono de currículum).
- «al decir "sube su currículum"» → a la izquierda, la persona "candidato" con un currículum; el documento se desplaza hacia el centro.
- «al decir "le quita todo lo que la identifica"» → el currículum pasa por la pieza Historia; sale una tarjeta sin foto ni nombre (líneas grises donde estaban).
- «al decir "publica un puesto"» → aparece la persona "empleador" y una tarjeta de puesto que entra por la izquierda.
- «al decir "qué historias encajan"» → la historia y el puesto se encuentran en Emparejamiento; aparece un enlace verde entre ellas.
- «al decir "desbloquea"» → un candado que se abre sobre el enlace; «al decir "viaja al sistema de recursos humanos"» → el currículum completo recorre el camino hasta un sistema externo punteado a la derecha.
- «al decir "Así se ve el sistema"» → zoom hacia atrás: el diagrama maestro completo aparece por partes (`construir`) siguiendo la voz: personas («izquierda»), servicios y base compartida («centro»), modelos externos y sistemas de recursos humanos («derecha»). Los sistemas de recursos humanos se dibujan como tres rectángulos punteados con "×100" al lado.
- Al final: el diagrama completo, quieto, a intensidad normal.

## Lo que no se ve {#preguntas}

**Narración**

Cada pieza de este dibujo es una decisión, y ninguna se ve a simple vista. Por qué varios servicios comparten una misma base, si lo habitual es darle una a cada uno. Por qué el servicio que empareja no puede leer el currículum, si lo tiene a un paso. Por qué la inteligencia artificial no decide quién encaja con qué puesto, si para eso está. Y qué pasa cuando uno de esos cien sistemas de recursos humanos no contesta.

El curso responde a esas preguntas con lo que dejaron escrito los ganadores. Al final, este mismo dibujo va a volver, y cada pieza va a tener su porqué.

**Visual**
- Imagen central: el diagrama maestro, con cuatro signos de pregunta que aparecen sobre cuatro piezas.
- «al decir "comparten una misma base"» → `enfocar` la base compartida; aparece un signo de pregunta naranja encima.
- «al decir "no puede leer el currículum"» → `enfocar` el enlace entre Emparejamiento y la tabla del currículum (con candado); signo de pregunta.
- «al decir "no decide quién encaja"» → `enfocar` el modelo de IA; signo de pregunta.
- «al decir "no contesta"» → uno de los sistemas de recursos humanos `caer`; signo de pregunta.
- «al decir "este mismo dibujo va a volver"» → el diagrama se encoge y se guarda en una esquina (se convierte en un ícono pequeño que reaparece al inicio de cada bloque que agrega una pieza).

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Presentan Neal Ford y Mark Richards; jurado encabezado por la Head Judge Jacqui Read | `.github/profile/README.md:259` |
| Ford y Richards, autores de *Fundamentals of Software Architecture* | Conocimiento externo al corpus |
| TheKataLog reúne los repositorios de los ganadores; el curso usa los doce primeros lugares | `.github/profile/README.md`; `src/video/meta.ts` (WINNERS) |
| ClearView: ONG financiada con donaciones; anonimiza currículums | `Pragmatic/README.md`; `Pragmatic/ArchitectureCharacteristics/Characteristics.md:27` |
| La historia anónima ("S.M.A.R.T stories", "from the anonymized resume") se genera desde el currículum anonimizado | `Pragmatic/C4/C2-container.md` (Story Container) |
| El currículum viaja al sistema de RR. HH. cuando el emparejamiento se desbloquea | `Pragmatic/C4/C2-container.md` (HR Integration); `C4/C3-components-hr-integration.md` (Uploading the Resume) |
| Servicios que comparten una base de datos | `Pragmatic/C4/C2-container.md:7`; `ADR/ADR-014` |
| Modelos de IA como servicios externos | `Pragmatic/C4/C2-container.md:9`; `ADR/ADR-007` |
| Unos cien sistemas de RR. HH. distintos (supuesto del equipo) | `Pragmatic/Requirements/requirements-and-assumptions.md` (A29) |
