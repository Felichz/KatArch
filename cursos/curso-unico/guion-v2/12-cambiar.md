# Bloque 12 · Cambiar sin romper, y lo que queda escrito

**Enseña:** un cambio riesgoso entra en sombra o en paralelo antes de tomar el control; lo que se decidió no hacer se escribe con la condición para reabrirlo; lo que no le toca al sistema también se escribe.
**Primer par:** MobilityCorp prueba un modelo nuevo en sombra; Certifiable corre la IA en paralelo con las personas.
**Segundo par:** ClearView rechaza un caché y deja la condición para volver a discutirlo; MonitorMe deja escrito qué queda fuera del sistema.

## Un modelo nuevo que todavía no decide {#sombra}

**Narración**

MobilityCorp tiene un modelo que pronostica cuántos vehículos se van a pedir en cada zona. Cuando aparece un modelo nuevo que promete pronosticar mejor, no lo pone a trabajar de un día para el otro.

Primero lo compara con el que está en uso, con una medida del error del pronóstico. El nuevo tiene que reducir ese error en al menos un cinco por ciento. Si lo logra, todavía no decide nada. Corre una semana en sombra, haciendo pronósticos que nadie usa, solo para compararlos con lo que pasa de verdad. Recién después de esa semana toma el control. Es decir, un modelo nuevo se trata como una versión nueva del sistema.

**Visual**
- Sello: MobilityCorp.
- Imagen central: un mapa de la ciudad en zonas, con una barra de pronóstico por zona.
- «al decir "el que está en uso"» → un modelo "actual" (hexágono, sólido) alimenta las barras del mapa.
- «al decir "un modelo nuevo"» → un segundo hexágono "nuevo", con borde punteado, aparece al lado.
- «al decir "reducir ese error en al menos un cinco por ciento"» → dos barras de error lado a lado; la del nuevo más baja; `cifra` "−5 %" con la etiqueta "mínimo".
- «al decir "en sombra"» → el modelo nuevo produce sus propias barras, transparentes, superpuestas a las del actual; nadie las usa (las flechas hacia "decisiones" salen solo del actual).
- «al decir "con lo que pasa de verdad"» → aparece la demanda real; se compara con las dos series.
- «al decir "toma el control"» → al cumplirse un calendario de 7 días, el nuevo pasa a sólido y el viejo a segundo plano.
- Al final: el nuevo en uso, el viejo en segundo plano.

## La IA al lado de las personas {#paralelo}

**Narración**

Certifiable hizo algo parecido con la corrección de exámenes, pero con personas. Su plan tiene fases. En la primera, la IA y los expertos corrigen en paralelo los mismos exámenes, y se compara cuánto coinciden. En la segunda, la IA corrige primero y los expertos revisan solo los casos en que la IA duda. Recién en la tercera, la IA corrige casi todo, y los expertos quedan supervisando.

MobilityCorp y Certifiable prueban en producción sin entregar el control. MobilityCorp lo hace con un modelo en sombra, comparado contra lo que pasa de verdad. Certifiable lo hace con personas al lado, comparadas contra la IA. Y en ninguno el cambio entra antes de que haya datos que muestren que funciona.

**Visual**
- Sello: Certifiable.
- Imagen central: una línea de tiempo con tres fases.
- «al decir "En la primera"» → fase 1: un examen se duplica; una copia va a la IA y otra a un experto; las dos notas se comparan ("coinciden 92 %", con la etiqueta "ejemplo").
- «al decir "En la segunda"» → fase 2: la IA corrige; los casos con confianza baja (la barra del bloque 11) viajan al experto.
- «al decir "En la tercera"» → fase 3: la IA corrige casi todo; el experto aparece arriba, con una lupa, mirando una muestra.
- «al decir "prueban en producción sin entregar el control"» → `comparar`: izquierda, el modelo en sombra de MobilityCorp; derecha, la fase 1 de Certifiable.
- «al decir "datos que muestren que funciona"» → en las dos mitades aparece un tablero de comparación con un tilde.
- Al final: las dos mitades.

## Lo que se decidió no hacer {#rechazado}

**Narración**

Una decisión no siempre dice que sí. Cada decisión escrita lleva un estado, una palabra que dice si rige, si quedó como propuesta o si se rechazó. Los rechazos son de las más útiles.

ClearView pensó guardar en una memoria temporal los currículums que se mandan a los sistemas de recursos humanos, para aliviar la carga cuando un envío se reintenta. Lo rechazó, y dejó la razón, que prefiere cargar con ese trabajo antes que pagar la memoria. Y dejó escrita la condición para volver a discutirlo, que el servicio de candidatos llegue a ser un cuello de botella. Quien venga después no repite la discusión desde cero. Sabe qué se pensó, por qué no, y cuándo vale la pena reabrirlo.

**Visual**
- Sello: ClearView. Diagrama maestro, zona derecha (integración con recursos humanos).
- «al decir "un estado"» → un documento de decisión con una etiqueta arriba que cambia en tres pasos: "propuesta", "aceptada", "rechazada".
- «al decir "una memoria temporal"» → entre Candidatos e Integración aparece una pieza "caché" punteada, tentativa.
- «al decir "Lo rechazó"» → la caché se tacha y queda en tono tenue; en el documento, "rechazada".
- «al decir "la condición para volver a discutirlo"» → en el documento, una línea resaltada en naranja: "si Candidatos se vuelve cuello de botella"; un indicador de carga en Candidatos, bajo, con una marca en el tope.
- Al final: la caché tachada, el documento con su condición. Esta pieza se guarda en el diagrama que crece.

## Lo que no le toca al sistema {#fuera}

**Narración**

MonitorMe dejó escrito, decisión por decisión, lo que queda fuera de su sistema. Los sensores son otro contexto, algo que aclaró el cliente cuando el equipo le preguntó. La aplicación del teléfono no se diseña, solo recibe las notificaciones. Y el registro de pacientes está adentro, pero como una parte de apoyo a la que no se le dedica esfuerzo. Además, el equipo mantiene una lista de lo que quedó postergado, como la autenticación, cada punto con lo que falta saber.

ClearView y MonitorMe escriben dos tipos de "no". Uno es lo que se pensó hacer y no se hizo. El otro es lo que no le corresponde al sistema. Los dos se escriben, porque lo que no se escribe, el próximo que lea el diseño lo va a tener que adivinar.

**Visual**
- Sello: MonitorMe.
- Imagen central: el sistema de MonitorMe con su frontera; afuera, piezas punteadas.
- «al decir "Los sensores son otro contexto"» → los sensores quedan del lado de afuera de la frontera; una hoja de decisión pequeña entre ellos y el sistema, con un ícono de pregunta y respuesta ("cliente").
- «al decir "La aplicación del teléfono"» → el teléfono afuera, con una flecha de notificación que entra a él desde el sistema.
- «al decir "el registro de pacientes está adentro"» → una pieza adentro, más chica y en tono tenue, con la etiqueta "apoyo".
- «al decir "una lista de lo que quedó postergado"» → una lista al costado con tres renglones ("autenticación", "notificaciones al teléfono", "VPN a sistemas externos"), cada uno con un reloj.
- «al decir "escriben dos tipos de"» → `comparar`: izquierda, la caché tachada de ClearView; derecha, la frontera de MonitorMe con lo de afuera.
- Al final: las dos mitades.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| MobilityCorp ADR-0022: pronóstico de demanda; MAPE como métrica; "New model must outperform champion by ≥5% MAPE reduction"; "Shadow deployment for 1 week before full promotion" | `Five-Nines/adrs/ADR-0022 - Demand Forecasting Model Selection and Architecture.md` l. 27, 110-116 |
| Certifiable: fase 1, IA y corrección humana en paralelo; fase 2, IA primero con revisión humana de casos de baja confianza; fase 3, IA autónoma con supervisión humana mínima | `ZAITects/other_design_docs/roll-out-strategy.md` l. 3-10, 31-35, 56-57 |
| "Coinciden 92 %" | Cifra de ejemplo en la animación, marcada como ejemplo; no se narra |
| ClearView ADR-024 (Denied): caché de currículums en el adaptador de RR. HH. para reducir carga; "we prefer the load over the memory cost"; "Should the load on Job candidate service ever be a bottleneck, the ADR should be considered again." | `Pragmatic/ADR/ADR-024-caching-of-resumes.md` l. 13-25 |
| MonitorMe ADR-006: sensores como contexto separado, aclarado ante una consulta al cliente; ADR-013: la app móvil fuera del diseño, recibe notificaciones push; ADR-005: registro de pacientes como subdominio de apoyo | `BluzBrothers/ADR/ADR-006` l. 13-14; `ADR/ADR-013` l. 14-15; `ADR/ADR-005` l. 14-15 |
| Tabla "Postponed decisions or well-known issues": autenticación y autorización, notificaciones push, VPN a sistemas externos | `BluzBrothers/README.md` l. 98-104 |
