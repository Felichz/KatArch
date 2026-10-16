# Renunciar, y hacer la cuenta

## Lección 3 {#gancho}

Cinco nueves de disponibilidad, un noventa y nueve coma nueve nueve nueve por ciento, significan que el sistema puede estar caído unos cinco minutos en todo un año. Spotlight, una plataforma para que organizaciones sin fines de lucro acerquen empleo a personas subrepresentadas, escribió que para su caso cinco nueves era irrazonable, y que cuatro también eran demasiado.

La razón está en la misma frase. Spotlight no es un sistema de seguridad pública, ni maneja vidas o dinero de forma directa. Así que eligió entre tres y cuatro nueves, según la parte del sistema.

## Renunciar con razones {#pregunta}

Elegir tres cualidades deja otras abajo, y eso tiene dos mitades. Una es renunciar a una cualidad sin descuidarla. La otra es comprobar, con cifras, que lo que se eligió aguanta. Primero las renuncias, y después las cuentas.

## Una renuncia nombra su condición {#renuncias}

MonitorMe, el sistema de los hospitales, bajó tres cualidades y le dedicó una decisión escrita a cada una. Una es la escalabilidad, que es poder crecer en tamaño total. Quedó abajo porque el pedido ya fija la carga máxima, quinientos pacientes por instalación. Y como el sistema se instala dentro de cada hospital, si un día llegan más sensores, se agregan máquinas a mano. Otra es la facilidad de despliegue, que quedó abajo porque el sistema se instala una sola vez por hospital, sin migraciones.

Cada renuncia trae su costo escrito, y las dos dicen lo mismo: el día que el sistema quiera pasar a la nube, va a costar. Además, cada una nombra la condición del negocio que la hace segura, la carga fija o la instalación única. Si esa condición cambia, la renuncia deja de valer, y quien lea la decisión lo va a saber.

## Dónde se paga lo que se renuncia {#paga}

La tercera renuncia es la disponibilidad, y es distinta. MonitorMe no dice que no importe. Dice que no va a decidir el estilo del sistema, y que se resuelve en otro lugar, en la infraestructura. Todas las instancias van duplicadas en Kubernetes, un programa que mantiene corriendo las copias y levanta una nueva si alguna cae.

El equipo escribe además un supuesto: que una instancia nueva arranca en treinta segundos como máximo. Admite que eso puede no lograrse siempre, y que duplicar todo cuesta más recursos. O sea, la renuncia no ahorró la disponibilidad. La movió de la elección del estilo a la infraestructura, con su precio a la vista.

## Cuando dos cualidades compiten {#compiten}

A veces la renuncia es un empate entre dos cualidades, y para verlo hace falta otro caso. Road Warrior es un panel que reúne todas las reservas de viaje de una persona.

Su equipo tenía que elegir entre elasticidad y evolutividad, o sea, entre aguantar los picos y poder cambiar rápido. Eligió la segunda, porque es una startup y tiene que reaccionar casi de inmediato a lo que piden los usuarios. La elasticidad no desapareció; la cubre una infraestructura que escala sola.

El caso contrario es poner todo al mismo nivel. MobilityCorp escribió su lista de requisitos de calidad agrupada por tema, pero sin prioridad y sin ninguna renuncia. Eso evita discutir, pero cuando una decisión tiene que elegir entre dos de ellos, no hay una prioridad escrita a la que pueda remitir.

## La cuenta del segundo {#cuenta}

Ahora, la otra mitad. Una cualidad elegida se tiene que poder comprobar, y la forma más directa es una cuenta. MonitorMe la hizo con su requisito central, mostrar los signos vitales en un segundo o menos.

Primero calcularon cuántas señales llegan por segundo en el peor momento, y les dio unas cuatro mil. Después siguieron el camino de una señal. Se registra, se muestra, se guarda en la base de datos, pasa por el broker de mensajes, que es el intermediario que los reparte, y viaja por la red del hospital. A cada etapa le pusieron un tiempo y sumaron. Dio poco menos de setecientos milisegundos, por debajo del segundo. Así una frase del pedido se convierte en algo que se puede comprobar.

## El supuesto que decide {#supuesto}

Esa cuenta dice algo más si se la lee con cuidado, y lo que sigue es lectura nuestra de sus números. Más del noventa por ciento del tiempo está en las dos etapas de procesamiento. La base de datos, el broker y la red, que es lo que más se suele discutir, pesan muy poco.

Y esas dos etapas salen de un solo supuesto, sin fuente: que procesar una señal tarda dos milisegundos. Con tres milisegundos, la suma pasa del segundo. Dicho de otro modo, la cuenta no solo aprueba el diseño, también dice qué número hay que medir antes que nada. Y si todavía no se puede medir, la decisión queda condicionada a ese número, y eso también se escribe.

## La cuenta del costo {#costo}

Con el dinero pasa lo mismo. Farmacy Food calculó el costo de su infraestructura para tres escenarios, de quinientas a diez mil solicitudes de clientes por día, con cada servicio, su precio unitario y su total.

Leída con atención, la tabla muestra que veinte veces más tráfico cuesta menos del doble, sin contar el balanceador ni la transferencia de datos, que quedaron por definir. La mayor parte del costo es fijo, y lo deciden los servicios contratados más que el volumen. Esa es la información útil de una cuenta de costo: no el total, sino qué parte se mueve con la carga y qué parte no.

## Cuando el costo son personas {#horas}

A veces el costo no está en los servidores. Certifiable es una empresa que certifica arquitectos de software, y sus exámenes los corrigen a mano trescientos expertos.

Su equipo hizo la cuenta en horas de experto. Con inteligencia artificial y una revisión humana parcial, el costo por candidato bajaba de unos cuatrocientos setenta dólares a unos noventa y cinco. Pero esa cuenta descansa en un supuesto, que solo uno de cada cinco exámenes pasa por un humano.

Rehicimos la cuenta con sus números. El modelo de lenguaje resulta ser apenas el uno coma cuatro por ciento del costo. Si en vez de uno de cada cinco fuera uno de cada dos, el costo por candidato más que se duplicaría. O sea, lo que mueve el costo es cuánto se revisa a mano, y ese es el número que hay que vigilar.

## Números sin cuenta {#sincuenta}

Lo contrario son los números que se escriben y nunca se multiplican. MobilityCorp dice en un documento que cada vehículo manda su posición cada treinta minutos, y en otro, cada treinta segundos. Es una diferencia de sesenta veces en la carga del sistema, y no encontramos una cuenta que diga cuál de las dos vale.

Bastaría con multiplicar la cantidad de vehículos por los mensajes de cada uno para que la diferencia saltara a la vista. Un número que nunca entra en una cuenta puede estar mal durante mucho tiempo sin que nadie lo note.

## El costo de estar caído {#cierre}

Los nueves de Spotlight no eran un capricho. Cuántos nueves pedir es otra forma de decir cuánto cuesta que el sistema esté caído. Spotlight lo dijo en voz alta, sin vidas ni dinero en juego, y por eso pudo pedir menos. MonitorMe, con vidas en juego, no puso un número, pero dejó escrito dónde pagaba la disponibilidad.

Cada cualidad que queda abajo tiene que decir por qué es seguro dejarla ahí, y cada una que queda arriba, cómo se comprueba.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| "Since Spotlight is not a public safety or mission critical (dealing with lives or money directly) platform, 5 nines (99.999% - 5.2 minutes of downtime per year) is unreasonable and 4 nines would also be an overkill"; entre 3 y 4 nueves según quantum | Pegasuz: `README.md` l. 138-140 |
| ADR-008 (escalabilidad: carga máxima definida, on-premises, nodos a mano; costo: nube) y ADR-009 (despliegue: una instalación por hospital); 500 pacientes por instalación | BluzBrothers: `ADR/ADR-008`, `ADR-009`; `ArchitectureCharacteristics/Characteristics.md` l. 32; `Business/Requirements.md` l. 39 |
| ADR-018: duplicación con Kubernetes, costo en recursos; ADR-020: 30 s, "may not always be achievable" | BluzBrothers: `ADR/ADR-018`, `ADR-020` |
| Road Warrior: "when faced with the choice between Elasticity and Evolvability, the team opted for the latter"; startup | Data Alchemists: `README.md` l. 134-160 |
| MobilityCorp: NFR agrupados por categoría, sin prioridad ni renuncias (12 entradas, NFR_7 repetido; la cifra no se narra) | Five Nines: `requirements/3_NFRs.md` l. 19, 30 |
| Cuenta de 693 ms: 4.000 señales/s en pico; 320 + 320 + 16 + 5 + 32; "If we assume that processing 1 signal takes 2 milliseconds" | BluzBrothers: `FitnessFunctions/Sizing.md` |
| 640 de 693 ms (92 %); quiebre en ~2,96 ms | Cuenta nuestra (D1 E1-A) |
| Farmacy Food: "customer requests per day" 500, 1.000 y 10.000; 20× tráfico → 1,84× costo (12.247,57 frente a 22.480,57 USD); Application Load Balancer y Data Transfer marcados "TBD" | ArchColider: `3.ViewsAndPerspectives/CostAnalysis.md` l. 67-69, 286-293; cuenta nuestra |
| Certifiable: 300 expertos; 470 frente a 95 USD; factor 0,2 supuesto; LLM ≈ 1,4 %; con 0,5 ≈ 236 USD | ZAItects: `README.md` l. 53; `other_design_docs/cost-analysis.md`; cuentas nuestras (D1, D6) |
| Telemetría cada 30 min y cada 30 s (ambos documentos hablan de GPS); que no haya cuenta que lo resuelva es lo que encontramos, no una afirmación de la fuente | Five Nines: `requirements/4_Assumptions and constraints.md` l. 8; `Appendix A` l. 36; `SD-001` l. 130 |
| "Bastaría con multiplicar…" y "un número que nunca entra en una cuenta…" | Deducción del curso |
