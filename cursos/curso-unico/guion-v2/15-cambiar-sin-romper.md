# Bloque 15 · Cambiar sin romper

**Enseña:** un cambio riesgoso entra sin entregar el control hasta que hay datos que muestran que funciona; y lo que se decidió no hacer, o lo que no le toca al sistema, también queda escrito. Cuatro familias (integración continua, infraestructura como código, activar para una parte, sombra y fases) con lo que gana y paga cada una.
**Par:** MobilityCorp prueba un modelo nuevo en sombra; Certifiable corre la IA en paralelo con las personas, por fases. Lo escrito: ClearView rechaza un caché y deja la condición para reabrirlo; MonitorMe escribe lo que queda fuera.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** la cola de reintentos de ClearView (bloque 10); el corrector y el juez de Certifiable (bloque 14); ShopWise y su evaluación (bloques 12 y 14); el estado de una decisión (Proposed, Accepted; bloque 1). **Presenta:** ningún caso; integración continua, infraestructura como código, interruptor, sombra, desvío.
**Pieza de ClearView:** el caché rechazado.

## Un modelo nuevo que todavía no decide {#gancho}

**Narración**

MobilityCorp tiene un modelo que pronostica cuántos vehículos se van a pedir en cada zona de la ciudad. Cuando aparece un modelo nuevo que promete pronosticar mejor, no lo pone a trabajar de un día para el otro.

Primero lo compara con el que está en uso, con una medida del error del pronóstico. El nuevo tiene que reducir ese error en al menos un cinco por ciento. Si lo logra, todavía no decide nada. Corre una semana en sombra, haciendo pronósticos que nadie usa, solo para compararlos con lo que pasa de verdad. Recién después de esa semana toma el control.

**Visual**
- Estás aquí: la región "cambiar sin romper".
- Sello: MobilityCorp. Un mapa de la ciudad en zonas con una barra de pronóstico en cada una. El modelo en uso (hexágono sólido) y el nuevo (hexágono punteado). Un medidor de error: el nuevo baja al menos 5 %. El nuevo corre a la par, en gris ("en sombra"); un calendario de una semana se llena; después el nuevo pasa al frente.

## Cuatro familias {#familias}

**Narración**

Un cambio puede romper lo que andaba, y hay cuatro familias para que no pase.

La primera es la integración continua. Cada cambio pasa por pruebas automáticas antes de entrar. ShopWise, por ejemplo, propone que esas pruebas incluyan evaluar a su asistente contra respuestas conocidas. Gana con que los errores aparecen antes de llegar al cliente. Paga con pruebas que escribir y mantener.

La segunda es la infraestructura como código. Las máquinas, las redes y sus permisos se describen en archivos, como el código. Farmacy Food lo propone para que nadie deje, por ejemplo, una máquina abierta a internet sin darse cuenta. Gana con que todo se puede revisar y repetir igual. Paga con que ya no se pueden hacer cambios a mano sin romper esa descripción.

La tercera es activar el cambio para una parte, con un interruptor que lo prende o lo apaga sin volver a desplegar. Spotlight lo anota entre sus prácticas, para probar con algunos usuarios y apagar rápido si algo sale mal. Gana con un cambio que se puede deshacer en segundos. Paga con interruptores que hay que anotar, vigilar y retirar cuando ya no sirven.

La cuarta es la sombra y las fases, que el cambio corra al lado de lo que ya anda, sin decidir, hasta que los datos dicen que funciona. Gana con evidencia antes de entregar el control. Paga con tiempo y con correr dos cosas a la vez.

**Visual**
- El tramo del mapa: "cambiar sin romper" en naranja y sus cuatro tarjetas.

## La IA al lado de las personas {#paralelo}

**Narración**

Certifiable hizo algo parecido con la corrección de exámenes, pero con personas. Su plan tiene fases. En la primera, la IA y los expertos corrigen en paralelo los mismos exámenes, y se compara cuánto coinciden. En la segunda, la IA corrige primero y los expertos revisan solo los casos en que la IA duda. Recién en la tercera, la IA corrige casi todo, y los expertos quedan supervisando.

**Visual**
- Sello: Certifiable. Una línea de tiempo con tres fases. Fase 1: dos filas iguales de exámenes, IA y expertos, con una flecha de comparación. Fase 2: la IA primero; solo algunos exámenes, en ámbar, pasan a los expertos. Fase 3: la IA corrige casi todo; un experto, chico, mira desde arriba.

## Probar sin entregar el control {#par}

**Narración**

MobilityCorp y Certifiable prueban en producción sin entregar el control. MobilityCorp lo hace con un modelo en sombra, comparado contra lo que pasa de verdad. Certifiable lo hace con personas al lado, comparadas contra la IA. En los dos, el cambio toma el control recién cuando hay datos que muestran que funciona.

**Visual**
- Dos mitades: MobilityCorp (el modelo nuevo en gris al lado del que decide) y Certifiable (las tres fases). Debajo, una puerta "toma el control" que se abre con una hoja de datos.

## Lo que se decidió no hacer {#rechazado}

**Narración**

Cambiar sin romper también depende de lo que quedó escrito. Cada decisión escrita lleva un estado, que dice si rige, si es una propuesta o si se rechazó, y los rechazos sirven tanto como las otras.

Cuando un envío a un sistema de recursos humanos se reintenta, ClearView vuelve a pedir el currículum al servicio de candidatos. El equipo pensó guardarlo en una memoria temporal para aliviar esa carga, y lo rechazó. La razón quedó escrita, que prefiere cargar con ese trabajo antes que pagar la memoria y la complejidad de mantenerla al día. Y dejó la condición para volver a discutirlo, que el servicio de candidatos llegue a ser un cuello de botella.

Quien venga después no repite la discusión desde cero. Sabe qué se pensó, por qué no, y cuándo vale la pena reabrirlo.

**Visual**
- Sello: ClearView. La cola de reintentos (la del bloque 10) pide el currículum al servicio de candidatos, una y otra vez. Entre los dos, una memoria temporal punteada que se tacha. Una hoja de decisión con el estado "rechazada", la razón y, en naranja, la condición "si candidatos se vuelve un cuello de botella, reabrir".

## Lo que no le toca al sistema {#fuera}

**Narración**

MonitorMe escribió otra clase de no, lo que queda fuera de su sistema. Los sensores son de otro contexto, algo que aclaró el cliente cuando el equipo le preguntó. La aplicación del teléfono solo recibe las notificaciones, y no se diseña. Y el equipo lleva una lista de lo que quedó postergado, como la autenticación, cada punto con lo que falta saber. Lo que no se escribe, el próximo que lea el diseño lo tiene que adivinar.

**Visual**
- Sello: MonitorMe. El sistema con su frontera; afuera, los sensores y el teléfono punteados con su motivo. Al lado, una lista "postergado" con la autenticación arriba.

## La pregunta que decide {#pregunta}

**Narración**

La pregunta, antes de darle el control a un cambio, es cómo saber que funciona. Y, junto con eso, qué queda escrito de lo que no se hizo, para que el próximo cambio no empiece a ciegas.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta; el caché rechazado de ClearView marcado al lado.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| MobilityCorp ADR-0022: pronóstico de demanda por zona; error medido con MAPE; "New model must outperform champion by ≥5% MAPE reduction"; "Shadow deployment for 1 week before full promotion" | `Five-Nines/adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md` l. 27, 110-116 |
| ShopWise ADR009 (Proposed): integración y despliegue continuos con pruebas automáticas; "Offline evaluation of the AI assistant against a ground truth testset will be a key component of the CI/CD pipeline" | `ConnectedAI/4_adrs/009_adr_github_actions_ci_cd.md` |
| Farmacy Food ADR-016 (Draft): infraestructura declarativa; "having accidentally added a public IP to a machine, can spell disaster"; evita la deriva; fitness functions sobre la especificación; "The team will lose the ability to make ad-hoc changes without causing drift"; "Manual tweaks to the infrastructure at run-time cause drift" | `ArchColider/4.ADRs/016 Use of Infrastructure as Code.md` |
| Spotlight, prácticas: "turns a functionality on/off at runtime… does not need code changes and deployment"; beneficios: pruebas en producción, "Canary Release", "Rollback switch" | `Pegasuz/engineering-practices/Feature-Toggles.md` |
| Certifiable: fase 1, IA y corrección humana en paralelo; fase 2, IA primero y revisión de los casos de baja confianza; fase 3, IA con supervisión humana mínima | `ZAITects/other_design_docs/roll-out-strategy.md` l. 3-10, 31-35, 56-57 |
| ClearView ADR-024 (Denied): con los reintentos de ADR-023, el currículum se pide de nuevo al servicio de candidatos en cada intento; caché en el adaptador para reducir carga; contra: invalidación (más complejidad) y memoria; "Denied, we prefer the load over the memory cost. Should the load on Job candidate service ever be a bottleneck, the ADR should be considered again." | `Pragmatic/ADR/ADR-024-caching-of-resumes.md` l. 7-25 |
| MonitorMe ADR-006: sensores como contexto separado, aclarado ante una consulta al cliente; ADR-013: la aplicación móvil fuera del diseño, recibe notificaciones | `BluzBrothers/ADR/ADR-006` l. 13-14; `ADR/ADR-013` l. 14-15 |
| Tabla "Postponed decisions or well-known issues": autenticación y autorización, entre otras | `BluzBrothers/README.md` l. 98-104 |
| Lo que gana y paga cada familia; qué es cada práctica | Conocimiento general (externo), coherente con los documentos citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Las cuatro familias necesitan un caso cada una; dos ya tienen escena (sombra y fases) | Integración continua, infraestructura como código e interruptores se ilustran con un caso conocido dentro de su tarjeta, en una frase |
| 1 | Diseño del aprendizaje | El caché rechazado se entiende mejor con los reintentos del bloque 10 | Se cuenta desde la cola de reintentos |
| 1 | Diseño del aprendizaje | El registro de pacientes como subdominio de apoyo (versión anterior) no suma | Se corta |
| 2 | Arquitecto senior | "En sombra" se usa como término | Se define en la misma frase: pronósticos que nadie usa, solo para comparar |
| 3 | Verificador | ShopWise ADR009 está en Proposed; Farmacy Food ADR-016, en Draft; los interruptores de Spotlight son una práctica, no un ADR | "propone", "lo propone", "lo anota entre sus prácticas" |
| 3 | Verificador | "una máquina abierta a internet": el ADR dice "a public IP" | Se mantiene como ejemplo, con "por ejemplo" |
| 4 | Guionista | "En los dos…" es la fórmula de los pares | Se varía: "En los dos, el cambio toma el control recién cuando…" |
| 5 | Espectador de prueba | "Estado" de una decisión ya se vio en el bloque 1 | Se recuerda en la misma frase qué dice |
| 6 | Dirección visual | Cuatro casos con escena propia | Un sello por escena |
| 7 | Producción | Ids: `gancho`, `familias`, `paralelo`, `par`, `rechazado`, `fuera`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
