# Diseño del curso único de KatArch

Proceso: se diseña de arriba hacia abajo, y cada etapa se cierra con la aprobación de Felix antes de pasar a la siguiente. Primero qué se quiere enseñar; después la evidencia; después cómo, con qué ejemplos, cuándo y en qué orden; y recién al final la prosa. Una pieza entra al curso solo si, al sacarla, el espectador pierde algo del objetivo.

Sin pausas ni preguntas al espectador: el narrador explica todo de forma fluida, en el orden que la mente necesita.

## Etapas

| Etapa | Qué se decide | Entregable | Estado |
|---|---|---|---|
| 1. Qué enseñar | Espectador, objetivo, resultados de aprendizaje, dependencias entre ellos | Sección "Etapa 1" y lado de la demanda | Cerrada (revisión propia, por pedido de Felix: hace todo el proceso sin pedirle revisiones) |
| 2. Evidencia | Qué verdades sobreviven a leer los ADR originales; mejores ejemplos, contraejemplos y límites de cada una | Siete dossiers (`dossiers/D1` a `D7`), Sonnet | Cerrada |
| 3. Elenco y ejemplos | Qué 3 o 4 casos acompañan todo el curso y qué ejemplo va en cada lugar | Sección "Etapas 2 a 4" | Cerrada |
| 4. Arquitectura del curso | Orden de los módulos, el hilo, cómo abre y cierra cada uno, qué se ve en pantalla, duración que pide el contenido | Sección "Etapas 2 a 4" | Cerrada |
| 5. Guion maestro | El curso entero, idea por idea (todavía no en prosa), de principio a fin | `GUION-MAESTRO.md` y los guiones `curso-unico/guion/leccion1-11.md` | Cerrada (once lecciones, ~12.300 palabras, revisadas de corrido: se quitaron la apertura "Esta lección trata de…" y el puente "la próxima lección" repetidos) |
| 6. Piloto | Un módulo en prosa, voz de borrador y animación | La lección 1 hace de piloto: se renderiza y se revisa antes de las demás | En curso |
| 7. Resto | Animación (Sonnet), voz de borrador y render secuencial | Los 11 videos | En curso |

## Etapa 1 · Qué enseñar (borrador 2, después de la autorrevisión)

### Espectador
El de `video/PEDAGOGY.md`: un desarrollador con un par de años de experiencia, que programa bien pero nunca diseñó un sistema entero y no conoce la jerga de arquitectura. No puede pausar para buscar un término: cada palabra técnica se explica la primera vez que aparece.

### Objetivo
Que al terminar, frente a un sistema nuevo, el espectador sepa recorrer el camino que siguieron los ganadores: del problema del negocio a las pocas cualidades que importan, de ahí a dónde cortar el sistema, y de ahí a cada decisión, justificada con lo que cuesta. Lo aprende viendo cómo lo hicieron los doce equipos que ganaron las katas de O'Reilly entre 2020 y 2025.

### Resultados de aprendizaje (lo que el espectador puede hacer al terminar)

| # | Puede… | Respaldo en el corpus (mapa y fichas, sección 5) |
|---|---|---|
| R1 | Pasar del problema del negocio a las pocas características de calidad que importan, decir a cuáles renuncia, y comprobarlas con cifras (carga, latencia, costo) | **El patrón más repetido del corpus:** 10 de 12 repos arman una cadena requisito → característica → estilo o decisión (sección 5 de las fichas); T7, T6 |
| R2 | Cortar el sistema a partir del negocio, darle un dueño a cada dato, y aceptar por escrito lo que se pierde al repartir | T13, T5, T14 |
| R3 | Decidir cómo se hablan las partes y los sistemas externos (síncrono o asíncrono, colas, adaptadores) y qué pasa cuando algo falla | T3, T15 |
| R4 | Decidir dónde vive cada dato sensible, cuánto se guarda y quién puede leerlo, como parte de la estructura | T4a, T4b |
| R5 | Decidir qué se compra y qué se construye, empezar por lo simple y dejar escrita la condición que obliga a cambiar, con reglas que se verifican solas | T2, T1, T12 |
| R6 | Meter un modelo de IA en un sistema aplicando todo lo anterior | T8, T9, T10 (4 repos, todos de katas con IA) |
| Transversal | Dejar escrita cada decisión con su contexto, alternativas, costo y el requisito que la origina (el ADR), y cerrar lo que queda fuera | Los 12 repos tienen ADR; T11. Ver hallazgo 2 |

### Dependencias (qué tiene que entenderse antes)
- R1 va primero: es el orden que siguen los propios ganadores (sección 5 de las fichas), y lo que importa decide todo lo demás.
- R2 necesita a R1: el corte responde a las características elegidas.
- R3 y R4 necesitan a R2: los fallos ocurren entre las partes, y los datos sensibles viven en alguna de ellas.
- R5 necesita a R1 y R2: lo que se compra o se cambia después es una parte ya cortada.
- R6 va al final: aplica R1–R5 a un componente que no es determinista.
- El ADR no es un módulo: aparece desde R1 como la forma de escribir cada decisión, y el espectador lo ve acumularse.

### Hilo (se decide en la etapa 4)
Seguir la lógica del diseño, no la cronología de los equipos. Uno de los casos atraviesa todos los módulos y se ve armarse entero, decisión por decisión; conviene que tenga decisiones clásicas y también un componente de IA, para que llegue a R6 sin cambiar de caso (candidatos a comprobar en los dossiers: Pragmatic y Five Nines). Los demás casos del elenco aparecen solo donde su decisión enseña algo que el caso principal no enseña, con la regla de siempre: un segundo ejemplo entra si muestra el mismo principio en un contexto muy distinto o la decisión contraria por una razón válida.

### Qué queda fuera, a propósito
- Cronología de los equipos, qué revirtieron, quién hizo qué día.
- Presentación de la kata, del jurado y del podio, salvo una frase al principio.
- Estilos de arquitectura como catálogo: el corpus muestra que el estilo cambia con el caso, así que se enseñan las razones de la elección, no "el estilo correcto".
- Tecnologías concretas (Kafka, Vertex AI, ChromaDB) más allá de lo necesario para entender una decisión.

## Lado de la demanda: qué necesita quien diseña su primer sistema

| Necesidad | ¿La cubre el corpus? | Decisión |
|---|---|---|
| Entender el problema y traducirlo a cualidades medibles | Sí, es T0 (10 de 12) | R1 |
| Estimar la carga y comprobar que el diseño aguanta | Parcial: BluzBrothers (cadena de 693 ms), Five Nines (volumen por país), ZAItects (horas de experto), Data Alchemists | Dentro de R1, con los ejemplos que haya |
| Elegir un estilo con razones | Sí, como razones: casi todos tienen un ADR de estilo (Pragmatic, Data Alchemists, Archangels, monArch, Team 7, ArchColider) | Dentro de R2, sin catálogo de estilos |
| Partir el sistema y repartir los datos | Sí: T13, T5, T14 | R2 |
| Cómo se hablan las partes: síncrono o asíncrono, integración con sistemas externos | Sí, y no estaba en el mapa: Pragmatic (ADR-005, ADR-023), Data Alchemists (ADR-5, ADR-7), Team 7 (ADR-5), Pegasuz (integración con ONG), CELUS Ceals (la cámara consulta), BluzBrothers (ADR-012, ADR-016) | Nueva T15, entra en R3 |
| Qué pasa cuando algo falla | Sí: T3 | R3 |
| Seguridad y datos personales | Sí: T4a, T4b | R4 |
| Operar: despliegue, observabilidad, salud del sistema | Parcial: ArchColider (health check de negocio, monitoreo), BluzBrothers (despliegue), Five Nines | Ejemplos sueltos dentro de R3 y R5, no un resultado propio |
| Comprar o construir, y cambiar después | Sí: T2, T1, T12 | R5 |
| Migrar desde un sistema heredado | Un solo repo a fondo (Team 7) | Fuera como resultado; Team 7 puede aparecer como ejemplo en R2 y R5 |
| Comunicar la arquitectura (diagramas, vistas) | Sí como práctica (C4 en la mayoría), sin decisiones que enseñar | Fuera: se usa en pantalla, no se enseña |
| Equipos y ley de Conway | Un repo (BluzBrothers) | Fuera |
| Rendimiento real, operación en producción | **No.** Las katas son diseños en papel que juzga un jurado; ninguno se construyó ni se operó | Se dice una vez al principio y donde haga falta: el curso enseña decisiones de diseño juzgadas por expertos, no resultados medidos en producción |

## Autorrevisión del borrador 1 (14 de octubre)

1. **Faltaba el patrón más fuerte del corpus.** El borrador 1 salió del mapa de verdades, que se armó con las secciones 6 y 8 de las fichas, y dejó afuera la sección 5 ("cómo llegan de los requisitos a la arquitectura"). Ahí está lo que más se repite: 10 de 12 repos arman una cadena requisito → característica de calidad → estilo o decisión (BluzBrothers, Pragmatic, Pegasuz, Team 7, Data Alchemists, ArchColider, Archangels, Five Nines, ZAItects, monArch; CELUS Ceals y ConnectedAI la tienen débil). Pasa a ser el centro de R1, y además da evidencia para el orden del curso, que en el borrador 1 era una construcción nuestra.
2. **La cadena casi siempre se corta en el ADR.** En Team 7, monArch y CELUS Ceals los ADR no citan el requisito que los origina. Eso es material: se enseña a escribir una decisión que diga qué requisito la pide, mostrando qué se pierde cuando no lo dice. Va en el transversal.
3. **Repetirse no prueba que sea independiente.** Parte de lo que se repite (las tres características principales, los quanta, los ADR, las fitness functions) es vocabulario del método que difunden los propios organizadores de las katas, en particular el libro *Fundamentals of Software Architecture*. Que doce equipos lo usen dice que es el método de la comunidad, no que doce equipos lo descubrieran por separado. El curso tiene que explicar por qué funciona cada práctica, no venderla por mayoría. Pendiente: contar qué repos citan el libro.
4. **El borrador 1 era solo oferta.** "Qué enseñar" salió de lo que el corpus tiene, no de lo que el espectador necesita. Falta el lado de la demanda: listar qué necesita alguien que va a diseñar su primer sistema, y marcar lo que el corpus no cubre. Eso queda fuera del curso (el curso enseña lo que muestran los ganadores) o se dice como hueco, pero se decide a sabiendas.
5. **El hilo se contradecía.** Decía que en cada módulo se toma la decisión en cada caso del elenco, y a la vez que un segundo ejemplo solo entra si enseña algo nuevo. Además, los casos sin IA no llegan a R6. Corregido: un caso principal atraviesa todo, y los demás entran solo donde enseñan algo distinto.
6. **"Doce ganadores" está confirmado.** El README de TheKataLog (perfil de la organización) pone a los doce en el primer lugar de su edición. El "semi-finals" del README de ArchColider se escribió antes del resultado.
7. **Las etapas no son una cascada.** La etapa 2 puede tumbar o cambiar resultados de la etapa 1, y en ese caso se vuelve a la 1 antes de seguir. Criterio: un resultado se queda solo si los dossiers lo sostienen con al menos dos repos leídos en sus ADR originales; si no, se saca o se dice como lo que es.

## Etapas 2 a 4 · Lo que dejó la evidencia y cómo queda el curso (14 de octubre)

### Verdades que quedaron, ya estrechadas por los dossiers
| Lección | Verdad, como la sostiene la evidencia | Repos que la sostienen leyendo sus ADR |
|---|---|---|
| 2 | Del problema a pocas características: los dos primeros eslabones (requisito → característica → estilo) se escriben y se pueden seguir; el último (decisión → requisito) casi siempre se corta. La herramienta con la que se compara decide qué se compara. | BluzBrothers, Pragmatic, Archangels, Five Nines, Pegasuz; corte en Pragmatic, ArchColider, Team 7 |
| 3 | Priorizar es renunciar, y la renuncia útil nombra la condición del negocio que la hace segura, su costo y dónde se paga lo renunciado. | BluzBrothers, Pegasuz, Pragmatic, ArchColider, Archangels, Team 7, Data Alchemists (contraste: Five Nines lista 12 sin orden) |
| 3 | Una cuenta con los supuestos a la vista dice qué supuesto decide el resultado, y deja ver sus propios errores. | BluzBrothers (latencia), ArchColider y ZAItects (costo), Pragmatic (tokens) |
| 4 | El dominio da los candidatos a parte; cada corte se justifica por lo que esa parte necesita (seguridad, disponibilidad, dependencias síncronas). El estilo se razona con el estado del negocio y del equipo, no solo con la tabla. | BluzBrothers, Team 7, Pegasuz, Archangels, ArchColider, monArch |
| 5 | Compartir o separar datos son dos opciones con costo; compartir se contiene con un solo escritor por objeto. Al repartir se pierde la transacción única, y la línea entre lo que puede quedar eventual y lo que no la marca lo que se pierde si el dato llega tarde (dinero, vidas). | Pragmatic, Team 7, monArch; ArchColider, Pegasuz, monArch, Five Nines |
| 6 | Cada flecha se decide preguntando si quien llama necesita la respuesta para seguir; con muchos sistemas externos distintos, un adaptador por sistema; y quién inicia la conversación es otra decisión. | Team 7, Pragmatic, Data Alchemists, Five Nines; CELUS Ceals, Pegasuz |
| 7 | Para cada mensaje importante: qué pasa si llega dos veces, cómo se reintenta, qué pasa si nunca llega, qué significa el silencio. Operar es parte del diseño. | ArchColider, Archangels, Five Nines, Pragmatic, BluzBrothers |
| 8 | Un dato sensible es una decisión con cuatro preguntas (dónde vive, quién lo guarda completo, cuánto dura, cómo se borra); la seguridad cambia la forma del sistema, porque la puerta se puede saltar. | Team 7, Five Nines, Archangels, BluzBrothers, Pragmatic; ArchColider, ConnectedAI (contraejemplo: Pegasuz) |
| 9 | Comprar lo que no diferencia, con una capa propia; pero privacidad, costo de operar y coherencia de plataforma deciden a veces al revés. Empezar simple funciona si la condición para cambiar está escrita; con número solo la escribe Five Nines. Las reglas medibles existen en papel; ninguna corre. | Pegasuz, ArchColider, Archangels, ConnectedAI, Data Alchemists; Five Nines, Pegasuz, Team 7; BluzBrothers, Archangels |
| 10 | Con un modelo: el error se paga según la tarea, así que el código fija lo que el modelo no puede violar; cuando el modelo duda decide una persona o un resultado por defecto que no perjudica; se mide con más de un número antes de confiar; cambiar modelo o prompt es una versión nueva. | Five Nines, Pragmatic, ZAItects, ConnectedAI |
| 11 | Un ADR que otro puede comprobar dice por qué hacía falta decidir, qué perdió, qué cuesta y qué requisito lo pide (91 %, 52 % y 27 % de 183 ADR). El estado es información. Lo que queda fuera se cierra con su borde. | Los 12 |

Verdades que se cayeron o quedaron como ejemplo de un solo repo: partir la base por fases (solo Team 7), outbox/inbox (solo Archangels), vía manual (solo CELUS Ceals), condición numérica para pasar de monolito a servicios (ninguno), fitness functions ejecutándose (ninguno), zero trust con mecanismo (solo propuesto en ArchColider).

### Elenco (cambia el plan de la etapa 1)
Ningún repo cruza todas las lecciones: Pragmatic no tiene umbrales ni escaleras; Five Nines no renuncia a nada y se contradice en cifras; R1 lo cubre entero solo BluzBrothers. En vez de un caso principal, el curso tiene **un elenco de cinco casos** que se presentan una vez en la lección 1 y vuelven a lo largo del curso, cada uno donde enseña mejor:

| Caso (equipo, año) | Qué es, en una frase | Lecciones donde ancla |
|---|---|---|
| MonitorMe (BluzBrothers, 2024) | Monitoreo de signos vitales en un hospital, con un segundo de respuesta | 2, 3, 4, 7, 8, 9, 11 |
| ClearView (Pragmatic, 2024) | Una ONG que empareja currículums anonimizados con puestos usando IA | 2, 5, 6, 7, 8, 10, 11 |
| Sysops Squad (Team 7, 2021) | Un sistema de tickets heredado que pierde pedidos y guarda tarjetas | 4, 5, 6, 8, 9 |
| Farmacy Food (ArchColider, 2020) | Comida en heladeras inteligentes, con poco presupuesto | 1, 3, 4, 5, 7, 8, 9 |
| MobilityCorp (Five Nines, 2025) | Alquiler de vehículos eléctricos con IA en Europa | 2, 3, 5, 6, 8, 9, 10, 11 |

Invitados, con una frase de contexto, solo donde tienen el mejor ejemplo: Pegasuz (Spotlight), Archangels (Farmacy Family), ZAItects (Certifiable), ConnectedAI (ShopWise), CELUS Ceals (Wildlife Watcher), monArch (Hey Blue!), Data Alchemists (Road Warrior). Así los doce ganadores aparecen al menos una vez.

### Arquitectura del curso
Once lecciones, en el orden del diseño. Cada una abre con un hecho concreto de un caso, dice la pregunta que responde, avanza en pasos (cada paso: idea, mecanismo, caso real) y cierra volviendo al hecho del principio. Sin pausas ni preguntas al espectador. Duración: la que pide el contenido; estimación 11 a 16 minutos por lección.

1. Qué es una decisión de arquitectura
2. Del pliego a tres características
3. Renunciar, y hacer la cuenta
4. Dónde se corta un sistema
5. De quién es cada dato
6. Cómo se hablan las partes
7. Cuando algo falla
8. Los datos que no se pueden filtrar
9. Comprar, construir y cuándo cambiar
10. Cuando una parte del sistema es un modelo
11. Lo que queda escrito

Hilo: el ADR. La lección 1 lo presenta con un ejemplo completo; cada lección deja una o dos decisiones escritas de los casos; la 11 cierra con qué hace que otro pueda comprobar una decisión sin preguntarle al autor.
