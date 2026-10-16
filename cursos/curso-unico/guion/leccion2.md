# Del pedido a tres cualidades

## Lección 2 {#gancho}

El pedido de MonitorMe, el sistema para hospitales, ocupa una página. Pide leer ocho signos vitales de cada paciente, mostrarlos en la estación de enfermería y avisar cuando algo sale de rango. Entre esas frases hay dos que pesan más que el resto. Una pide una respuesta media de un segundo o menos. La otra dice que, si falla un dispositivo, el sistema tiene que seguir funcionando con los demás.

Ninguna de esas frases dice cómo tiene que ser el sistema. Pero de frases así salen las pocas cualidades que deciden su forma. El primer paso del diseño es encontrarlas, elegir las que mandan y decir qué pasa con las demás.

## Qué es una cualidad {#pregunta}

Una cualidad, en este sentido, es una propiedad que el sistema tiene que tener aparte de lo que hace: qué tan rápido responde, cuánto aguanta si algo falla, qué tan fácil es cambiarlo, cuánto cuesta. En la comunidad de las katas se las llama características de arquitectura.

Se eligen pocas porque cada una tira de la estructura hacia un lado. El método que usan casi todos los ganadores pide como mucho siete, y marcar tres como las que mandan. Esas tres sirven para elegir el estilo del sistema, que es su forma general, por ejemplo un monolito o microservicios.

## Leer el pedido frase por frase {#cadena}

La primera forma de encontrarlas es leer el pedido frase por frase y nombrar la cualidad que pide cada una. Así trabajó el equipo de MonitorMe. El segundo de respuesta pide rendimiento. Seguir funcionando si falla un dispositivo pide disponibilidad. Y la posibilidad de agregar sensores en el futuro pide que el sistema se pueda cambiar, y que aguante la carga extra que traigan, lo que se llama elasticidad.

Leyendo así salen bastantes más de tres. MonitorMe llegó a nueve candidatas y se quedó con tres: que el sistema se pueda cambiar, que responda rápido y la elasticidad. Lo que enseña no es el conteo, sino que cada descarte quedó escrito con su razón.

## Por qué no la disponibilidad {#disponibilidad}

La disponibilidad fue uno de esos descartes, y no por tener pocas menciones, porque tenía más que dos de las elegidas. Salió, primero, por un razonamiento. Si el sistema responde rápido y aguanta la carga, dice el equipo, va a seguir disponible. Para ellos, la disponibilidad es una consecuencia de las otras dos.

Y salió también por un límite de la herramienta. Para elegir el estilo usaron una tabla de estilos, que da puntos a cada estilo en cada cualidad, y esa tabla no tiene fila para la disponibilidad. Lo dejaron escrito en una decisión propia, con el costo admitido: dejarla fuera de la elección puede hacer perder optimizaciones pensadas para ella.

## Encontrarlas en las dificultades {#dificultades}

La segunda forma de encontrar las cualidades es partir de lo que hace difícil el caso. Es lo que hizo ClearView, la plataforma de una organización sin fines de lucro que empareja currículums con puestos. Su equipo escribió primero tres dificultades, y después buscó la cualidad que responde a cada una.

La inteligencia artificial no se comporta siempre igual, y una versión nueva del modelo puede cambiar los resultados. Eso pide poder repetir las pruebas, o sea, testabilidad. Una organización que vive de donaciones corre el riesgo de que el costo del modelo se dispare, y eso pide viabilidad. Y cada sistema de recursos humanos con el que hay que integrarse tiene una API distinta, lo que pide interoperabilidad.

Esas tres son las que eligen el estilo. La seguridad no está entre ellas, aunque encabeza la lista de prioridades de ClearView, porque lo que vende la plataforma es anonimizar currículums.

## Lo que la tabla no tiene {#tabla}

ClearView tropezó además con el mismo límite que MonitorMe. Bajó la prioridad de la integridad de los datos, y una de sus razones es que esa cualidad no figura en la tabla de estilos, así que no aporta nada a la elección.

Fíjate en lo que eso significa. La tabla tiene filas fijas, y lo que no tiene fila no pesa a la hora de elegir el estilo. Si una cualidad importa y la tabla no la tiene, queda por decidir dónde se resuelve. Los dos equipos lo dejaron escrito, y por eso se puede discutir.

## Elegir sabiendo qué se pierde {#perder}

Elegir el estilo con las tres cualidades tampoco garantiza que el estilo sea bueno en las tres. Lo muestra Hey Blue!, una aplicación que acerca a policías y vecinos.

Su equipo eligió microservicios, aunque su propia tabla los puntúa bajo en rendimiento. Y dejó escrita la razón. Esa penalización vale para el sistema entero, no para cada servicio, así que lo que necesita velocidad se puede separar en un servicio propio y atenderse ahí.

## Atar la decisión a lo que la pide {#corte}

Hasta aquí hay dos eslabones, del pedido a las cualidades y de las cualidades al estilo. Falta el tercero, el que une cada decisión concreta con el requisito que la pide. Es el que permite comprobar si la decisión cumple, y es el que más se corta. En Farmacy Food, por ejemplo, el equipo escribió diez requisitos de arquitectura, y ninguna de sus decisiones cita uno.

MobilityCorp, el de los vehículos eléctricos, muestra cómo se ve cuando ese eslabón está. Tiene un modelo que revisa las fotos de los vehículos devueltos y detecta daños, y la decisión sobre ese modelo copia los requisitos que la piden.

El primero es detectar el ochenta por ciento de los daños. El segundo habla de falsos positivos, que son daños marcados donde no los hay, y pide menos del diez por ciento. El tercero es responder en cinco segundos o menos en el noventa y cinco por ciento de las fotos. Con esas cifras a la vista, cualquiera puede tomar el diseño y comprobar si cumple.

## Una copia que envejece {#contraste}

Ese mismo ejemplo trae una advertencia. En otros documentos de MobilityCorp, las cifras de precisión y de falsos positivos son distintas. Copiar el requisito ata la decisión a una versión del requisito, y si después el requisito cambia y nadie actualiza la decisión, la copia queda vieja sin que nadie lo note.

Por eso, además de copiar el requisito, sirve citarlo por su identificador. Así, quien cambie el requisito puede encontrar todas las decisiones que dependen de él.

## La nota de la disponibilidad {#cierre}

En MonitorMe, la disponibilidad salió de la lista de tres, pero no del sistema. El pedido sigue diciendo que, si falla un dispositivo, el sistema tiene que seguir funcionando con los demás.

Decidir que una cualidad no elige el estilo no significa que deje de importar. Significa que se resuelve en otro lugar, y que ese lugar también hay que decidirlo y pagarlo.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Pedido de MonitorMe: ocho signos vitales, estación de enfermería, alertas; "average response time of 1 second or less"; si falla un dispositivo, "must still function" para el resto | BluzBrothers: `Business/Requirements.md` l. 12, 22 |
| Notas por frase (Performance; Availability y Fault-tolerance; Configurability, Evolvability y Elasticity); Elasticity "as additional sensors may necessitate additional nodes" | BluzBrothers: `ArchitectureCharacteristics/images/characteristics.png` (D1 T0-A); `Characteristics.md` l. 27 |
| 9 candidatas, 7 prioritarias, 3 finales (Evolvability, Performance, Elasticity) | BluzBrothers: `ArchitectureCharacteristics/Characteristics.md`; `ADR/ADR-011` l. 15 |
| Availability con 4 notas, más que Elasticity y Performance (3 cada una) | `components-sticky-cards.png` (verificado en `carga/v1/RESUMEN.md` §3) |
| "If both are satisfactory, the system should remain available"; ADR-010: la plantilla no incluye availability; costo "may overlook potential architectural optimizations" | BluzBrothers: `ArchitectureCharacteristics/Characteristics.md` l. 86-87; `ADR/ADR-010-…md` |
| Tres dificultades de ClearView y sus tres cualidades (Feasibility, Interoperability, Testability) | Pragmatic: `ArchitectureCharacteristics/Characteristics.md` l. 46-50 |
| Security es la primera de las prioritarias, "Essential, as the product's USP is resume anonymization", pero no está entre las tres finales | Pragmatic: `Characteristics.md` l. 25-27, 50 |
| ADR-004: data integrity no está en la "architecture style worksheet" | Pragmatic: `ADR/ADR-004-data-integrity-downplayed.md` l. 18 |
| Hey Blue!: "Even though Microservices score low on performance… this performance penalty is applicable to the entire system" | MonArch: `Readme.md` l. 115 |
| Farmacy Food: 10 SAR; ningún ADR cita un SAR | ArchColider: `1.ProblemBackground/BusinessDrivers.md`; D1 T0-D |
| ADR-0020 copia FR#2M (80 %, <10 % FP) y NFR_9 ("≤5 seconds per photo (p95)"); otras cifras en otros documentos | Five Nines: `adrs/ADR-0020…` l. 17-19; D6 §5 |
| Citar por identificador además de copiar | Deducción del curso a partir de los dos casos |
