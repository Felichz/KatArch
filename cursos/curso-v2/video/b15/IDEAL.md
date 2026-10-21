# Bloque 15 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** dos carriles, el que decide y el que corre a su lado en gris; una puerta "toma el control" que se abre solo con una hoja de datos. Y al costado, una hoja de decisión con su estado y su condición para reabrir.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **Los dos carriles** (el que decide, sólido; el nuevo, gris punteado) | Sombra y fases: probar sin entregar el control | Escenas 1, 3 y 4 |
| **La puerta con la hoja de datos** | El cambio toma el control cuando hay datos | Escenas 1 y 4 |
| **La hoja de decisión con estado y condición** | Lo que se decidió no hacer, escrito | Escena 5 |
| **La frontera con lo de afuera punteado** | Lo que no le toca al sistema | Escena 6 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 7 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que pasa la prueba; ámbar lo que se paga o queda en duda; rojo lo que falla o se rechaza; violeta claro los modelos.

## 0 · Estás aquí

`T.aqui(15)`, "Bloque 15", "Cambiar sin romper".

## 1 · Un modelo nuevo que todavía no decide (#gancho)

| Frase | Lo que se dibuja |
|---|---|
| «MobilityCorp tiene un modelo que pronostica cuántos vehículos se van a pedir en cada zona…» | Sello de MobilityCorp. Un mapa de la ciudad en seis zonas, cada una con una barra de pronóstico; el modelo en uso (hexágono sólido). |
| «Cuando aparece un modelo nuevo…» | Un hexágono punteado, "nuevo", al costado. |
| «Primero lo compara con el que está en uso, con una medida del error…» | Debajo, dos barras de error: "en uso" y "nuevo". |
| «El nuevo tiene que reducir ese error en al menos un cinco por ciento.» | La barra del nuevo es más corta; "−5 % o más" en verde. |
| «Si lo logra, todavía no decide nada.» | El nuevo sigue gris. |
| «Corre una semana en sombra…» | El nuevo corre en un carril paralelo, en gris, con sus propias barras punteadas; un calendario de siete casillas se llena. |
| «Recién después de esa semana toma el control.» | Los dos hexágonos cambian de lugar: el nuevo, sólido, al frente. |

## 2 · Cuatro familias (#familias)

| Frase | Lo que se dibuja |
|---|---|
| «Un cambio puede romper lo que andaba…» | Barrido. Arriba las regiones con "cambiar sin romper" en naranja. |
| «La primera es la integración continua.» y siguientes | Tarjeta 1 "integración continua"; "ShopWise" a mano debajo. |
| «La segunda es la infraestructura como código.» y siguientes | Tarjeta 2 "infraestructura como código"; "Farmacy Food". |
| «La tercera es activar el cambio para una parte…» y siguientes | Tarjeta 3 "activar para una parte"; "Spotlight". |
| «La cuarta es la sombra y las fases…» y siguientes | Tarjeta 4 "sombra y fases". |

## 3 · La IA al lado de las personas (#paralelo)

| Frase | Lo que se dibuja |
|---|---|
| «Certifiable hizo algo parecido… pero con personas.» | Barrido. Sello de Certifiable. Una línea de tiempo con tres tramos. |
| «Su plan tiene fases.» | "fase 1", "fase 2", "fase 3" sobre los tramos. |
| «En la primera, la IA y los expertos corrigen en paralelo…» | Tramo 1: dos filas de exámenes, "IA" y "expertos"; una flecha que compara; "¿coinciden?". |
| «En la segunda, la IA corrige primero…» | Tramo 2: la fila de la IA completa; solo dos exámenes, en ámbar, bajan a "expertos". |
| «Recién en la tercera, la IA corrige casi todo…» | Tramo 3: la fila de la IA; un experto chico mira desde arriba. |

## 4 · Probar sin entregar el control (#par)

| Frase | Lo que se dibuja |
|---|---|
| «MobilityCorp y Certifiable prueban en producción sin entregar el control.» | Barrido. Dos mitades con sus nombres; las figuras apagadas. |
| «MobilityCorp lo hace con un modelo en sombra…» | Izquierda: el modelo en uso y el nuevo en gris en su carril; "en sombra" en verde. |
| «Certifiable lo hace con personas al lado…» | Derecha: las tres fases chicas; "con personas al lado" en verde. |
| «En los dos, el cambio toma el control recién cuando hay datos…» | Debajo, a lo ancho, una puerta "toma el control" que se abre al llegar una hoja de datos. |

## 5 · Lo que se decidió no hacer (#rechazado)

| Frase | Lo que se dibuja |
|---|---|
| «Cambiar sin romper también depende de lo que quedó escrito.» | Barrido. Una hoja de decisión al centro. |
| «Cada decisión escrita lleva un estado…» | Tres sellos: "rige", "propuesta", "rechazada". |
| «Cuando un envío… se reintenta, ClearView vuelve a pedir el currículum…» | Sello de ClearView. La cola de reintentos a la derecha; el servicio de candidatos a la izquierda; flechas que van y vienen, varias veces. |
| «El equipo pensó guardarlo en una memoria temporal… y lo rechazó.» | Entre los dos, una memoria temporal punteada que se tacha. |
| «La razón quedó escrita…» | Una hoja: estado "rechazada" en rojo; "prefiere la carga a la memoria". |
| «Y dejó la condición para volver a discutirlo…» | En la hoja, en naranja: "si candidatos se vuelve un cuello de botella, reabrir". |
| «Quien venga después no repite la discusión…» | Una persona nueva lee la hoja. |

## 6 · Lo que no le toca al sistema (#fuera)

| Frase | Lo que se dibuja |
|---|---|
| «MonitorMe escribió otra clase de no…» | Barrido. Sello de MonitorMe. El sistema con su frontera. |
| «Los sensores son de otro contexto…» | Afuera, los sensores punteados: "otro contexto (lo aclaró el cliente)". |
| «La aplicación del teléfono solo recibe las notificaciones…» | Afuera, el teléfono punteado: "solo recibe". |
| «Y el equipo lleva una lista de lo que quedó postergado…» | Una lista "postergado": "autenticación · falta saber…". |
| «Lo que no se escribe…» | "escrito, no adivinado" en naranja. |

## 7 · La pregunta que decide (#pregunta)

| Frase | Lo que se dibuja |
|---|---|
| «En esta región la pregunta es…» | Barrido. El tramo del mapa con las cuatro tarjetas; debajo, la pregunta en naranja. |
| «Y, junto con eso, qué queda escrito…» | "+ lo que no se hizo, escrito" en ámbar; "el caché rechazado de ClearView" a mano. |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Pronóstico por zona; comparación con el modelo en uso; 5 % menos de error; una semana en sombra | `Five-Nines/adrs/ADR-0022…` |
| Pruebas automáticas con la evaluación del asistente | `ConnectedAI/4_adrs/009_adr_github_actions_ci_cd.md` (Proposed) |
| Infraestructura descrita en archivos; máquina con IP pública por error; sin cambios a mano | `ArchColider/4.ADRs/016 Use of Infrastructure as Code.md` (Draft) |
| Interruptores sin desplegar; probar con algunos; apagar | `Pegasuz/engineering-practices/Feature-Toggles.md` |
| Tres fases de Certifiable | `ZAITects/other_design_docs/roll-out-strategy.md` |
| Reintentos que vuelven a pedir el currículum; caché rechazado; razón; condición | `Pragmatic/ADR/ADR-024-caching-of-resumes.md` (Denied) |
| Sensores fuera; teléfono que solo recibe; lista de postergados con la autenticación | `BluzBrothers/ADR/ADR-006`, `ADR-013`; `README.md` l. 98-104 |
| El mapa de seis zonas, el calendario, la puerta y la hoja de datos | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Los dos carriles tienen que leerse igual en MobilityCorp y en el par | Mismo dibujo, más chico |
| 1 | Dirección visual | Tres sellos de estado en la escena 5 | Chicos, en fila; solo "rechazada" se resalta |
| 1 | Verificador | "−5 %" es la cifra del ADR | Se dibuja y se narra |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 | El modelo nuevo no cambia de lugar con el viejo: el viejo se apaga, el nuevo se enciende y aparece "toma el control" | Mover los hexágonos movía sus rótulos dos veces |
| 2 | Debajo de la región, "que un cambio no rompa lo que andaba" hasta la primera tarjeta | La primera frase no tenía imagen |
| 4 | La puerta y la hoja de datos, más chicas y más arriba | La puerta llegaba a la franja de los subtítulos |
| 5 | La hoja de la decisión, más ancha, con la condición en una línea | La condición se salía de la hoja |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
