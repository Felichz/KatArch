# Del pedido a tres cualidades

## Lección 2 {#gancho}

El pedido de MonitorMe, el sistema para hospitales, ocupa una página. Pide leer ocho signos vitales de cada paciente, mostrarlos en la estación de enfermería y avisar cuando algo sale de rango. Entre esas frases hay dos que pesan más que el resto. Una pide una respuesta media de un segundo o menos. La otra dice que, si falla un dispositivo, el sistema tiene que seguir funcionando con los demás.

Ninguna de esas frases dice cómo tiene que ser el sistema. Pero de frases así salen las pocas cualidades que deciden su forma. El primer paso del diseño es encontrarlas, elegir las que mandan y decir qué pasa con las demás.

## Qué es una cualidad {#pregunta}

Una cualidad es una propiedad que el sistema tiene que tener aparte de lo que hace. Por ejemplo, qué tan rápido responde, cuánto aguanta si algo falla, qué tan fácil es cambiarlo o cuánto cuesta. En la comunidad de las katas se las llama características de arquitectura.

Se eligen pocas porque cada una tira de la estructura hacia un lado. MonitorMe siguió un método que pide quedarse con siete y marcar tres como las que mandan. Esas tres sirven para elegir el estilo del sistema, que es su forma general, por ejemplo un monolito o microservicios.

## Leer el pedido frase por frase {#cadena}

La primera forma de encontrarlas es leer el pedido frase por frase y nombrar la cualidad que pide cada una. Así trabajó el equipo de MonitorMe. El segundo de respuesta pide rendimiento. Seguir funcionando si falla un dispositivo pide disponibilidad. Y la posibilidad de agregar sensores en el futuro pide dos cosas. Que el sistema se pueda cambiar, y que aguante la carga extra que traigan, lo que se llama elasticidad.

Leyendo así salen bastantes más de tres. MonitorMe llegó a nueve candidatas y se quedó con tres: que el sistema se pueda cambiar, que responda rápido y la elasticidad. Y cada cualidad que dejó afuera quedó escrita con su razón.

## Por qué no la disponibilidad {#disponibilidad}

La disponibilidad fue una de las que salieron, y salió por un razonamiento. Si el sistema responde rápido y aguanta la carga, dice el equipo, va a seguir disponible. Para ellos, la disponibilidad es una consecuencia de las otras dos.

Y salió también por un límite de la herramienta. Para elegir el estilo usaron una tabla de estilos, que da puntos a cada estilo en cada cualidad, y esa tabla no tiene fila para la disponibilidad. Lo dejaron escrito en una decisión propia, con el costo admitido. Dejarla fuera de la elección puede hacer perder optimizaciones pensadas para ella.

## Encontrarlas en las dificultades {#dificultades}

La segunda forma de encontrar las cualidades es partir de lo que hace difícil el caso. Es lo que hizo ClearView, la plataforma de una organización sin fines de lucro que empareja currículums con puestos. Su equipo escribió tres dificultades, y para cada una buscó la cualidad que le responde.

La inteligencia artificial no se comporta siempre igual, y una versión nueva del modelo puede cambiar los resultados. Eso pide poder repetir las pruebas, o sea, testabilidad. Una organización que vive de donaciones corre el riesgo de que el costo del modelo se dispare. Eso pide viabilidad, que el sistema se pueda sostener con el dinero que hay. Y cada sistema de recursos humanos con el que hay que integrarse tiene una API distinta, lo que pide interoperabilidad.

Esas tres son las que eligen el estilo. La seguridad no está entre ellas, aunque encabeza la lista de prioridades de ClearView, porque lo que vende la plataforma es anonimizar currículums.

## Lo que la tabla no tiene {#tabla}

ClearView tropezó además con el mismo límite que MonitorMe. Bajó la prioridad de la integridad de los datos, que es que los datos sean correctos y no se pierdan. Y una de sus razones es que esa cualidad no figura en la tabla de estilos, así que no aporta nada a la elección.

Fíjate en lo que eso significa. La tabla tiene filas fijas, y lo que no tiene fila no pesa a la hora de elegir el estilo. Si una cualidad importa y la tabla no la tiene, queda por decidir dónde se resuelve. Los dos equipos lo dejaron escrito, y por eso se puede discutir.

## Elegir sabiendo qué se pierde {#perder}

Elegir el estilo con las tres cualidades tampoco sale gratis, y ClearView anotó el precio. Eligió unos pocos servicios grandes que comparten la base de datos.

La decisión dice lo que gana con eso, en costo y en testabilidad. Y dice lo que pierde. Compartir la base debilita la elasticidad, porque las partes que comparten una base no pueden crecer cada una por su lado cuando llega un pico.

El estilo, además, no tiene que valer igual en todo el sistema. Donde ClearView necesita interoperabilidad, para hablar con los sistemas de recursos humanos, usa otro estilo, con partes que se avisan por mensajes. La forma general la eligen las tres cualidades, y una parte con otra necesidad puede apartarse de ella.

## Atar la decisión a lo que la pide {#corte}

La cadena tiene un eslabón más. Del pedido salen las cualidades, de las cualidades sale el estilo, y cada decisión concreta tiene que poder seguirse hasta lo que la pide.

MonitorMe lo resuelve con enlaces en los dos sentidos. Su documento de cualidades enlaza las decisiones que salieron de él, la de las tres que mandan y la de la disponibilidad. Y esas decisiones empiezan con un enlace de vuelta al análisis del que salen. Así, quien lea una decisión puede llegar a su razón, y quien cambie el análisis puede encontrar qué decisiones dependen de él.

## La nota de la disponibilidad {#cierre}

En MonitorMe, la disponibilidad salió de la lista de tres, pero no del sistema. El pedido sigue diciendo que, si falla un dispositivo, el sistema tiene que seguir funcionando con los demás.

Decidir que una cualidad no elige el estilo no significa que deje de importar. Significa que se resuelve en otro lugar, y que ese lugar también hay que decidirlo y pagarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Pedido de MonitorMe: ocho signos vitales, estación de enfermería, alertas; "average response time of 1 second or less"; si falla un dispositivo, "must still function" para el resto | BluzBrothers: `Business/Requirements.md` l. 12, 22 |
| Notas por frase (Performance; Availability y Fault-tolerance; Configurability, Evolvability y Elasticity); Elasticity "as additional sensors may necessitate additional nodes" | BluzBrothers: `ArchitectureCharacteristics/images/characteristics.png` (D1 T0-A); `Characteristics.md` l. 27 |
| 9 candidatas, 7 prioritarias, 3 finales (Evolvability, Performance, Elasticity) | BluzBrothers: `ArchitectureCharacteristics/Characteristics.md`; `ADR/ADR-011` l. 15 |
| "If both are satisfactory, the system should remain available"; ADR-010: la plantilla no incluye availability; costo "may overlook potential architectural optimizations" | BluzBrothers: `ArchitectureCharacteristics/Characteristics.md` l. 86-87; `ADR/ADR-010-…md` |
| Tres dificultades de ClearView y sus tres cualidades (Feasibility, Interoperability, Testability) | Pragmatic: `ArchitectureCharacteristics/Characteristics.md` l. 46-50 |
| Security es la primera de las prioritarias, "Essential, as the product's USP is resume anonymization", pero no está entre las tres finales | Pragmatic: `Characteristics.md` l. 25-27, 50 |
| ADR-004: data integrity no está en la "architecture style worksheet". Definición de integridad: la misma que usan L5 y L7 | Pragmatic: `ADR/ADR-004-data-integrity-downplayed.md` l. 18 |
| ADR-002 (Accepted): "Service Based Architecture"; "Where needed for better inteoperability and deployability we want to use Event Driven Architecture"; Strengthened: Testability, Cost (y Agility, que no se narra); Weakened: "Elasticity (due to shared databases between servuces)". "Unos pocos servicios grandes" es la definición del estilo (L5 lo dice igual). "No pueden crecer cada una por su lado" es explicación del curso | `katas-src/Pragmatic/ADR/ADR-002-architecture-style.md` |
| "Una parte con otra necesidad puede apartarse de la forma general" | Deducción del curso a partir de ADR-002 (misma idea que Hey Blue!, `MonArch Readme.md` l. 115, sin sumar un caso) |
| Characteristics.md enlaza ADR-010 y ADR-011 (l. 86-87); los dos ADR abren con "[context link out](/ArchitectureCharacteristics/Characteristics.md#elasticity)" | `katas-src/BluzBrothers/ArchitectureCharacteristics/Characteristics.md` l. 86-87; `ADR/ADR-010…md`, `ADR/ADR-011…md` l. 11 |
| "Choosing the Top 7 characteristics" | `BluzBrothers/ArchitectureCharacteristics/Characteristics.md` l. 21 |
| "Quien cambie el análisis puede encontrar qué decisiones dependen de él" | Deducción del curso |

## Cambios frente a `leccion2.md`

- `#pregunta`: "el método que usan casi todos los ganadores pide como mucho siete" no tenía fuente y hablaba del corpus. Ahora se atribuye a MonitorMe ("Choosing the Top 7 characteristics").
- `#cadena`: fuera "Lo que enseña no es el conteo, sino…" (meta y "no es X, sino Y"). Se parte la frase larga de los sensores.
- `#disponibilidad`: fuera "no por tener pocas menciones, porque tenía más que dos de las elegidas". Habla de notas adhesivas que nunca se presentan y no cambia lo que se aprende.
- `#dificultades`: se define viabilidad. `#tabla`: se define integridad de los datos antes de usarla.
- `#perder`: Hey Blue! sale y entra ClearView ADR-002. Hey Blue! era un caso invitado nuevo para una sola idea: que un estilo con mala nota en una cualidad se puede usar igual, atendiendo esa cualidad en la parte que la necesita. ClearView, ya presentado en la lección y con el ADR en Accepted, enseña lo mismo y más. Eligió el estilo con lo que pierde escrito, y usa otro estilo solo donde la interoperabilidad lo pide. Se conserva la idea sin sumar un caso.
- `#corte`: fuera Farmacy Food ("diez requisitos y ninguna decisión cita uno": muestra el defecto) y fuera MobilityCorp ADR-0020 (cifras que cambian entre documentos). Entra el propio MonitorMe, que enlaza cualidades y decisiones en los dos sentidos (verificado en el repo). Fuera también "Hasta aquí" (tic prohibido). Citar el requisito por su número ya lo enseña la lección 1; aquí basta cerrar la cadena.
- `#contraste` se elimina: enseñaba a partir de un defecto (la copia del requisito que envejece). Hay que quitar `compositions/contraste.html` y re-anclar `corte`.
