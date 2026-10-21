# Bloque 2 · Del requisito a las cualidades, y renunciar por escrito

**Enseña:** nombrar la cualidad que pide cada frase del requisito; quedarse con pocas; dejar escrita cada renuncia con la condición que la hace segura; una cualidad que no elige el estilo se resuelve en otro lugar.
**Par:** MonitorMe encuentra sus cualidades en las frases del pedido; ClearView, en lo que hace difícil el caso.
**Trae (ver `ACTO1-CONTINUIDAD.md`):** el concurso, ClearView y su base compartida, trade-off, ADR. **Presenta:** MonitorMe.

## Dos frases {#gancho}

**Narración**

MonitorMe es un sistema para hospitales. Muestra en la estación de enfermería los signos vitales de los pacientes y avisa cuando algo sale de rango. El pedido del cliente ocupa una página, y pide leer ocho signos vitales de cada paciente. Entre sus frases hay dos que pesan más que el resto. Una pide una respuesta media de un segundo o menos. La otra dice que, si falla un dispositivo, el sistema tiene que seguir funcionando con los demás.

Ninguna de esas frases dice cómo tiene que ser el sistema. Pero de frases así salen las pocas propiedades que deciden su forma.

**Visual**
- Sello: MonitorMe (primera aparición del caso), desde la primera palabra.
- «al decir "un sistema para hospitales"» → ilustración breve con volumen de una pantalla de estación de enfermería con curvas de signos vitales; «al decir "sale de rango"» una curva se pone naranja; la ilustración se reduce al sello (corazón con pulso).
- «al decir "El pedido del cliente"» → imagen central: una hoja de requisito con renglones grises.
- «al decir "ocho signos vitales"» → al costado, ocho íconos pequeños (corazón, presión, oxígeno…) en dos filas.
- «al decir "una respuesta media de un segundo o menos"» → un renglón se resalta en naranja; aparece al costado `cifra` "≤ 1 s".
- «al decir "si falla un dispositivo"» → otro renglón se resalta; al costado, un sensor que `caer` y los demás que siguen con su pulso.
- Al final: la hoja con dos renglones resaltados.

## Qué es una cualidad {#cualidad}

**Narración**

A esas propiedades se las llama cualidades del sistema. Una cualidad es algo que el sistema tiene que tener aparte de lo que hace. Por ejemplo, qué tan rápido responde, cuánto aguanta si algo falla, qué tan fácil es cambiarlo o cuánto cuesta. En los repositorios de las katas aparecen como características de arquitectura.

Se eligen pocas porque cada una tira de la estructura hacia un lado, y no se puede tirar hacia todos a la vez. Lo que una favorece, otra lo paga. Las pocas que mandan sirven para elegir la forma general del sistema, lo que se llama su estilo.

**Visual**
- Imagen central: la palabra "cualidad" en el centro, desde la primera palabra, y cuatro tarjetas alrededor.
- «al decir "qué tan rápido responde"» → tarjeta "rendimiento"; «"cuánto aguanta si algo falla"» → "tolerancia a fallos"; «"qué tan fácil es cambiarlo"» → "evolución"; «"cuánto cuesta"» → "costo".
- «al decir "características de arquitectura"» → debajo de "cualidad", chico, "architecture characteristics".
- «al decir "tira de la estructura hacia un lado"» → un rectángulo-sistema en el centro, con cuatro flechas desde las tarjetas que lo estiran hacia lados distintos; se deforma levemente.
- «al decir "las pocas que mandan"» → tres tarjetas se resaltan y la cuarta pasa a segundo plano; «al decir "estilo"» → el rectángulo toma una forma firme.
- Al final: tres tarjetas resaltadas.

## Frase por frase {#monitorme}

**Narración**

La primera forma de encontrarlas es leer el pedido frase por frase y nombrar la cualidad que pide cada una. Así trabajó el equipo de MonitorMe. El segundo de respuesta pide rendimiento. Seguir funcionando si falla un dispositivo pide tolerancia a fallos. Y poder agregar sensores en el futuro pide dos cosas. Que el sistema se pueda cambiar, lo que llaman evolución, y que pueda sumar máquinas cuando crece la carga, lo que llaman elasticidad.

Leyendo así salen bastantes más de tres. MonitorMe llegó a nueve candidatas y se quedó con tres: la evolución, el rendimiento y la elasticidad.

**Visual**
- Imagen central, desde la primera palabra: la planilla de MonitorMe, recreada: el texto del pedido a la izquierda y notas adhesivas verdes a la derecha (como en `characteristics.png`).
- «al decir "El segundo de respuesta"» → nota "rendimiento" junto al renglón del segundo.
- «al decir "si falla un dispositivo"» → nota "tolerancia a fallos".
- «al decir "agregar sensores"» → notas "evolución" y "elasticidad" junto al renglón de sensores.
- «al decir "nueve candidatas"» → aparecen las demás notas hasta ser nueve, en una columna; «al decir "se quedó con tres"» → tres suben y se resaltan; las demás a segundo plano.
- Al final: las tres elegidas arriba, las otras seis abajo en gris.

## Renunciar con su condición {#renuncias}

**Narración**

Lo que queda abajo también se escribe. MonitorMe dejó cada renuncia en una decisión propia.

Una es la facilidad para desplegar, que es poner en marcha versiones nuevas del sistema. Quedó abajo porque el sistema se instala una sola vez en cada hospital. La renuncia nombra la condición que la hace segura, una instalación por hospital. Y el mismo documento dice qué la rompería. Si un día el sistema pasa a la nube, quien lea la decisión sabe que la renuncia dejó de valer.

La disponibilidad, que el sistema esté siempre en marcha, también quedó afuera de las tres, y con ella pasa algo distinto. MonitorMe no dice que no importe. Dice que no va a decidir el estilo, y que se resuelve en cómo se ponen en marcha las copias del sistema. Cada servicio corre duplicado, y si una copia cae, otra la reemplaza. Admite que duplicarlo todo cuesta más recursos.

**Visual**
- Imagen central, desde la primera palabra: las seis cualidades de abajo; dos de ellas se adelantan.
- «al decir "facilidad para desplegar"» → tarjeta "desplegar" baja; pegada a ella, una hoja pequeña; en la hoja, un hospital con un "1" (una instalación).
- «al decir "nombra la condición"» → en la hoja se resalta "una instalación por hospital" en naranja; una línea punteada la une a la tarjeta.
- «al decir "pasa a la nube"» → aparece una nube sobre la hoja y la línea punteada `cortar`; la tarjeta parpadea.
- «al decir "disponibilidad"» → la tarjeta "disponibilidad" baja hacia una franja inferior rotulada "copias en marcha".
- «al decir "Cada servicio corre duplicado"» → ahí aparecen dos copias de un servicio, una sobre otra; «al decir "si una copia cae"» → una `caer` y la otra se ilumina.
- «al decir "cuesta más recursos"» → al costado, una moneda doble.
- Al final: las dos tarjetas con sus hojas y la franja de copias.

## Desde lo difícil del caso {#clearview}

**Narración**

La segunda forma de encontrar las cualidades parte de lo que hace difícil el caso. Es lo que hizo ClearView. Su equipo escribió tres dificultades, y para cada una buscó la cualidad que le responde.

La inteligencia artificial no se comporta siempre igual, y una versión nueva del modelo puede cambiar los resultados. Eso pide poder repetir las pruebas, la testabilidad. Una organización que vive de donaciones corre el riesgo de que el costo del modelo se dispare. Eso pide que el sistema se pueda sostener con el dinero que hay, lo que el equipo llama factibilidad. Y cada sistema de recursos humanos tiene su propia API, la puerta por la que otro programa le habla. Eso pide interoperabilidad, poder hablar con todos.

ClearView también dejó escrita una renuncia, en su propia decisión. Bajó la integridad de los datos, que es que los datos sean correctos y no se pierdan. Según el equipo importa, pero se cuida sobre todo en el código. Encaja con la base compartida del bloque anterior, que debilitaba justo esa cualidad.

**Visual**
- Sello: ClearView, desde la primera palabra. Ícono pequeño del diagrama maestro en la esquina.
- Imagen central: tres filas, cada una con una dificultad a la izquierda, una flecha y una cualidad a la derecha. Las tres filas vacías, en contorno, desde «"tres dificultades"».
- «al decir "no se comporta siempre igual"» → fila 1: un modelo que da dos salidas distintas para la misma entrada; «al decir "testabilidad"» → tarjeta a la derecha.
- «al decir "el costo del modelo se dispare"» → fila 2: una curva de costo que sube de golpe; «"factibilidad"» → tarjeta.
- «al decir "su propia API"» → fila 3: tres enchufes de formas distintas; «"interoperabilidad"» → tarjeta.
- «al decir "Bajó la integridad de los datos"» → tarjeta "integridad de los datos" baja con su hoja pegada; en la hoja, "se cuida en el código".
- «al decir "la base compartida"» → junto a la hoja, la miniatura de la base compartida del bloque 1 con su lista "pierde", y "integridad" se resalta.
- Al final: tres cualidades a la derecha, una abajo con su hoja.

## Dos caminos {#comparacion}

**Narración**

MonitorMe y ClearView llegan al mismo lugar por caminos distintos. MonitorMe parte de lo que el cliente pide, frase por frase. ClearView parte de lo que puede salir mal. Los dos terminan con tres cualidades que mandan, y los dos dejan escrito qué bajó y por qué. Ese papel permite volver a discutir una renuncia el día que cambie la condición que la sostenía.

**Visual**
- Imagen central: `comparar`, desde la primera palabra. Izquierda, MonitorMe: hoja de requisito → notas → tres cualidades → hoja de renuncia. Derecha, ClearView: dificultades → tres cualidades → hoja de renuncia. Misma disposición vertical.
- «al decir "lo que el cliente pide"» → se resalta la hoja de requisito; «al decir "lo que puede salir mal"» → se resaltan las dificultades.
- «al decir "tres cualidades que mandan"» → se resaltan los dos grupos de tres.
- «al decir "qué bajó y por qué"» → se resaltan las hojas de renuncia en las dos mitades.
- «al decir "cambie la condición"» → en la hoja de MonitorMe, la nube vuelve y la línea punteada se corta otra vez.
- Al final: las dos mitades, con las hojas de renuncia resaltadas.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| MonitorMe: sistema para hospitales; estación de enfermería; alertas fuera de rango; ocho signos vitales; "average response time of 1 second or less"; si falla un dispositivo, "must still function" | `BluzBrothers/Business/Requirements.md` l. 9, 12, 22 |
| Cada frase con su cualidad: Performance por la exigencia del negocio; Fault-tolerance "ensuring system functionality even in scenarios where certain sensors may be non-operational"; Evolvability "seamless integration of new sensors"; Elasticity "as additional sensors may necessitate additional nodes or hardware" | `BluzBrothers/ArchitectureCharacteristics/Characteristics.md` ("Choosing the Top 7 characteristics"); `BluzBrothers/ArchitectureCharacteristics/images/characteristics.png` |
| Nueve candidatas; tres finales: Evolvability, Performance, Elasticity | `BluzBrothers/ADR/ADR-008` (lista de nueve); `ADR/ADR-011` (Accepted) |
| Cada renuncia, en su decisión: escalabilidad (ADR-008), facilidad para desplegar (ADR-009) y disponibilidad fuera de la elección del estilo (ADR-010). Seguridad, tolerancia a fallos y configurabilidad no se renuncian: se asignan a módulos ("significant only for individual modules") | `BluzBrothers/ADR/`; `BluzBrothers/ArchitectureCharacteristics/Characteristics.md` l. 32-45 |
| Desplegar baja (ADR-009, Accepted): "installed locally, serving as a single solution for a hospital"; contra: dificultad "in migrating the solution to a cloud environment" | `BluzBrothers/ADR/ADR-009-deployability-downplayed.md` |
| Disponibilidad, "as the system directly impacts human lives", entre las siete; fuera de la elección del estilo, "addressed outside of the system architecture", a nivel de instancia (ADR-010, Accepted) | `BluzBrothers/ArchitectureCharacteristics/Characteristics.md`; `BluzBrothers/ADR/ADR-010` |
| Todas las instancias duplicadas con un orquestador; costo: "Resource utilization and costs may increase" (ADR-018 y ADR-020, Accepted) | `BluzBrothers/ADR/ADR-018`; `ADR/ADR-020` |
| Tres dificultades de ClearView y sus cualidades (Testability, Feasibility, Interoperability); "each system's API is different" | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` ("Selecting the Top 3") |
| Feasibility como costo que se puede sostener (definición del equipo: decisiones de costo que reducen la varianza del costo de lo básico) | `Pragmatic/ArchitectureCharacteristics/Characteristics.md` |
| Integridad de datos bajada: "While essential, we believe it primarily impacts code implementation"; ADR-004 (Accepted) | `Pragmatic/ArchitectureCharacteristics/Characteristics.md`; `ADR/ADR-004-data-integrity-downplayed.md` |
| La base compartida debilita la integridad (sección "Weakened characteristics": Data integrity) | `Pragmatic/ADR/ADR-014` |
| Que la renuncia a la integridad "encaja" con la base compartida | Lectura del curso (las dos decisiones lo dicen por separado; el equipo no las une) |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | "Quedarse con siete" y "nueve candidatas" ponían dos cifras que no hacen falta para la idea; el bloque no volvía al bloque 1, aunque ClearView bajó justo la cualidad que su base compartida debilitaba | Se va el "siete"; la escena de cualidad ya no habla de MonitorMe; la renuncia de ClearView se une a la base compartida (idea que vuelve combinada) |
| 2 | Arquitecto senior | "Si falla un dispositivo" pide tolerancia a fallos, no disponibilidad; la renuncia a la escalabilidad y la elección de la elasticidad se justifican las dos con "sumar máquinas", y juntas confunden | La frase pide tolerancia a fallos; la elasticidad se define como sumar máquinas cuando crece la carga; la renuncia de ejemplo pasa a ser desplegar |
| 3 | Verificador | ADR-009 trae la condición (una instalación por hospital) y lo que la rompería (la nube), en el mismo documento; la disponibilidad se resuelve "a nivel de instancia", no "en la infraestructura"; ClearView también tiene su ADR de renuncia (ADR-004) | Renuncia de desplegar con su nube; "cómo se ponen en marcha las copias"; "en su propia decisión" |
| 4 | Guionista | "No se borra, se escribe" (fórmula "no X, Y"); "se cruza con las pruebas de la IA" no se entiende | "También se escribe"; se corta la frase de la IA |
| 5 | Espectador de prueba | "API", "migraciones" e "instancias" sin definir | API definida en una frase; las otras dos se reemplazan por palabras comunes |
| 6 | Dirección visual | Varias escenas abrían sin imagen hasta una palabra avanzada; la escena de renuncias necesitaba un objeto para "la nube" | Imagen desde la primera palabra en todas; nube y corte de la línea; la comparación repite el corte al final |
| 7 | Producción | Ids sin cambios (`gancho`, `cualidad`, `monitorme`, `renuncias`, `clearview`, `comparacion`) | Sin cambios |
| 8 | Verificador (al escribir el guion visual) | "MonitorMe le dedicó una decisión a cada cualidad que bajó" no es exacto: hay ADR para escalabilidad, desplegar y disponibilidad; seguridad, tolerancia a fallos y configurabilidad se asignan a módulos, sin ADR propio | "MonitorMe dejó cada renuncia en una decisión propia"; fila nueva en la verificación |
