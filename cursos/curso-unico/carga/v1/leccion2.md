# Carga cognitiva y fricción · Lección 2 · Del pliego a tres características

55 ideas · 6:11 de duración (370,9 s, `video/ch2/timing.js`).

Tiempo = inicio de la línea de voz donde empieza la idea, redondeado hacia abajo. Las ideas que juntan dos cosas que se entienden por separado se partieron. Por eso son más que las 25 a 40 habituales.

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:00 | | | | |
| 1 | 0:01 | El pedido de MonitorMe ocupa una página | 2 | 1 | MonitorMe aparece sin presentación; primer dato |
| 2 | 0:01 | Es un sistema para hospitales que lee ocho signos vitales por paciente, los muestra en la estación de enfermería y avisa si algo sale de rango | **4** | 1 | Dominio, cifra (ocho), dos funciones y "rango" sin definir en una sola frase |
| 3 | 0:12 | Entre sus frases hay dos que pesan más que el resto | 2 | 2 | "Frases" del pedido sin haberlas llamado así; "esas frases" sin antecedente claro |
| 4 | 0:12 | Una pide una respuesta media de un segundo o menos | 3 | 1 | Cifra y métrica ("respuesta media") sin explicar; continúa la 3 |
| 5 | 0:19 | La otra pide que siga funcionando si falla un sensor | 3 | 1 | Falla de componente sin nombre; es la disponibilidad, sin nombrarla |
| 6 | 0:24 | Ninguna de esas frases dice cómo tiene que ser el sistema | 2 | 2 | Cambio de nivel: de frases a la forma del sistema |
| 7 | 0:24 | De frases así salen las pocas cualidades que deciden su forma | 2 | 2 | "Cualidades" usada antes de definirla en esta lección (la lección 1 ya la usó) |
| 8 | 0:32 | El primer paso es encontrarlas, elegir las que mandan y decir qué pasa con las demás | 3 | 1 | Tres verbos en una frase; continuación natural |
| **pregunta** | 0:38 | | | | |
| 9 | 0:38 | Una cualidad es una propiedad que el sistema tiene aparte de lo que hace; se ve en qué tan rápido responde, cuánto aguanta una falla, qué tan fácil es cambiarla y cuánto cuesta | **4** | 3 | Definición abstracta tras casos concretos, más cuatro ejemplos sin nombre; casi igual a la lección 1 |
| 10 | 0:50 | En la comunidad de las katas se las llama "características de arquitectura" | 3 | 2 | Segundo nombre del mismo concepto: el título dice "características" y el cuerpo sigue con "cualidades" |
| 11 | 0:55 | Se eligen pocas porque cada una tira de la estructura hacia un lado | 3 | 1 | Razón central en metáfora; "estructura" sin definir; repite la lección 1 ("tiran en direcciones distintas") |
| 12 | 0:55 | El método que casi todos los ganadores usan pide como mucho siete | 3 | 2 | Cifra; "método" sin nombre; argumento por mayoría, que la autorrevisión 3 de DISENO-CURSO pide no usar sin explicar el porqué |
| 13 | 0:55 | Marcar tres como las que mandan | 2 | 1 | Cifra repetida; continuación |
| 14 | 1:05 | Esas tres son las que se usan para elegir el estilo del sistema | 3 | 3 | "Estilo" aparece aquí por primera vez y no se define; la lección 1 no lo usa |
| **cadena** | 1:09 | | | | |
| 15 | 1:09 | La primera forma de encontrarlas es leer el pedido frase por frase y nombrar la cualidad que pide cada una; así lo hizo MonitorMe | 3 | 2 | Método nuevo con su caso; anuncia una "primera" forma |
| 16 | 1:18 | "El segundo de respuesta pide rendimiento"; "seguir funcionando si falla un sensor pide disponibilidad" | 3 | 2 | "Segundo" como ordinal choca con "un segundo" de la cifra (0:12); "rendimiento" es el primer nombre de cualidad |
| 17 | 1:24 | Agregar sensores en el futuro pide que el sistema se pueda cambiar y que crezca | 3 | 1 | Dos cualidades sin nombre en una frase |
| 18 | 1:30 | De nueve candidatas, MonitorMe se quedó con tres: que el sistema pueda cambiar, que responda rápido y que crezca cuando lleguen más sensores | 3 | 1 | Dos cifras y tres cualidades; "crezca" contradice la lección 3 (hallazgo 4) |
| 19 | 1:41 | Lo que enseña no es el conteo, sino que cada descarte quedó escrito con su razón | 2 | 2 | Cambio de hilo: de la cifra a la moraleja; anticipa la lección 11 |
| **disponibilidad** | 1:46 | | | | |
| 20 | 1:47 | La disponibilidad fue descartada, no por tener pocas menciones sino porque tenía más que dos de las elegidas | **4** | 2 | "Menciones" (notas por cualidad) sin presentar; "más que dos de las elegidas" es elíptico |
| 21 | 1:56 | Salió por un razonamiento: si el sistema responde rápido y crece, va a seguir disponible; para el equipo, la disponibilidad es consecuencia de las otras dos | **4** | 1 | Cadena causal con atribución al equipo; "consecuencia" de dos cualidades a la vez |
| 22 | 2:07 | Y salió por un límite de la herramienta | 2 | 2 | Segunda razón; "herramienta" sin presentar |
| 23 | 2:07 | Para elegir el estilo usaron una hoja de estilos: una tabla que da estrellas a cada estilo en cada cualidad | **4** | 2 | "Hoja de estilos" en español suena a CSS; "estrellas" sin escala; "estilo" sin definir |
| 24 | 2:16 | La tabla no tiene fila para la disponibilidad, y lo dejaron escrito como decisión propia | 3 | 1 | Continuación; "decisión propia" sin explicar |
| 25 | 2:16 | Con el costo admitido: dejarla fuera puede hacer perder optimizaciones pensadas para ella | **4** | 1 | "Costo admitido" y "optimizaciones pensadas para ella" abstractos; "ella" lejos de su antecedente |
| **dificultades** | 2:27 | | | | |
| 26 | 2:27 | La segunda forma de encontrar las cualidades es partir de lo que hace difícil el caso | 3 | 2 | Segundo método; "lo que hace difícil el caso" es abstracto |
| 27 | 2:33 | ClearView, la plataforma de la organización sin fines de lucro | **4** | 3 | Caso nuevo sin decir qué hace (es un sistema de currículums con IA, y eso no se dice hasta después); corte sin puente |
| 28 | 2:33 | Escribió primero sus tres dificultades y después buscó la cualidad que responde a cada una | 2 | 1 | Continuación |
| 29 | 2:43 | La IA no se comporta igual siempre, y una versión nueva del modelo puede cambiar los resultados; eso pide pruebas de regresión, o sea, testabilidad | **4** | 2 | Primer modelo de IA (tema de la lección 10); "pruebas de regresión" glosado; "testabilidad" es un nombre nuevo |
| 30 | 2:53 | Una organización que vive de donaciones corre el riesgo de que el costo del modelo se dispare; eso pide viabilidad | 3 | 2 | Cadena causal corta con dato nuevo del negocio; "viabilidad" sin definir |
| 31 | 3:00 | Cada sistema de recursos humanos con el que hay que integrarse tiene una API distinta; eso pide interoperabilidad | 3 | 1 | Adelanta la integración (lección 6); "API" e "interoperabilidad" sin definir |
| 32 | 3:07 | La seguridad quedó como cualidad implícita, de las que todo sistema necesita | 3 | 1 | "Implícita" sin definir; las lecciones 4 y 8 tratan la seguridad como factor que da forma al sistema |
| **tabla** | 3:11 | | | | |
| 33 | 3:12 | ClearView tropezó con el mismo límite de la herramienta que MonitorMe | 3 | 2 | Puente bien hecho con el límite de la tabla (filas 22 y 23) |
| 34 | 3:12 | Bajó la prioridad de la integridad de los datos, porque esa cualidad no figura en la hoja de estilos y no aporta nada a la elección | 3 | 2 | "Integridad de los datos" nunca estuvo en la lista de la lección; "bajó" supone una prioridad que el espectador no vio |
| 35 | 3:27 | La hoja tiene filas fijas, y lo que no tiene fila no pesa a la hora de elegir el estilo | 3 | 1 | Regla central; "pesa" en sentido figurado |
| 36 | 3:34 | Si una cualidad importa y la tabla no la tiene, hay que decidir por escrito dónde se resuelve; los dos equipos lo hicieron | 3 | 1 | Regla que anticipa la lección 11; "los dos equipos" sin nombrarlos |
| **perder** | 3:43 | | | | |
| 37 | 3:44 | Elegir el estilo con las tres cualidades no garantiza que sea bueno en las tres | 3 | 2 | Cambio de tema hacia lo que se paga al elegir; es el tema de la lección 3 |
| 38 | 3:49 | The Archangels, que diseñaron una comunidad alrededor de la salud de los clientes de Farmacy Food | **4** | 3 | Equipo nuevo, nombre en inglés; "Farmacy Food" aparece como cliente y no se vincula con la cocina de la lección 1; "comunidad" sin definir |
| 39 | 3:49 | Eligieron un estilo que puntúa bajo en dos de sus tres cualidades, y escriben que esas dos pueden seguir siendo trade-offs altos aun después de mitigarlos | **4** | 1 | Dos ideas en una: estilo con dos cualidades bajas y admisión de trade-offs altos tras la mitigación |
| 40 | 4:00 | Escriben la mitigación: una capa propia para todas las integraciones | 3 | 1 | "Capa propia" sin explicar; vuelve a integraciones (lección 6) |
| 41 | 4:10 | El equipo monArch hizo algo parecido con Hey Blue!, una aplicación que acerca a policías y vecinos | **4** | 2 | Equipo y aplicación nuevos; cambio de caso |
| 42 | 4:10 | Eligieron microservicios aunque su propia tabla los puntúa bajo en rendimiento | 3 | 1 | "Microservicios" sin definir; tercera mención de "tabla" |
| 43 | 4:21 | La penalización afecta al sistema entero y no a un servicio aislado, así que lo que necesita velocidad se separa en su propio servicio | 3 | 1 | Razón; "velocidad" es el cuarto nombre de la misma cualidad |
| **corte** | 4:29 | | | | |
| 44 | 4:30 | Hasta aquí hay dos eslabones, y falta el tercero: el que une cada decisión con el requisito que la pide | 3 | 1 | "Pedido", "requisito" y "frase" para lo mismo; metáfora de eslabones |
| 45 | 4:40 | Es el que permite comprobar si la decisión cumple, y es el que casi siempre se corta | 3 | 1 | "Casi siempre" sin cifra en esta lección (la lección 1 da uno de cada cuatro cita el requisito) |
| 46 | 4:46 | En Farmacy Food, ninguna decisión cita uno de sus diez requisitos de arquitectura | **4** | 2 | Caso ya usado en otro sentido; "requisitos de arquitectura" sin definir; cifra diez |
| 47 | 4:52 | MobilityCorp muestra cómo se ve cuando está: su decisión sobre el modelo que detecta daños copia los requisitos que la piden | **4** | 2 | Caso nuevo sin descripción; "cuando está" vago; es el ejemplo que la lección 11 vuelve a usar |
| 48 | 5:00 | Detectar el ochenta por ciento de los daños, con menos de un diez por ciento de falsos positivos, y en menos de cinco segundos por foto | **5** | 1 | Tres cifras en una frase; "falsos positivos" sin definir; la fuente dice "≤5 s p95" y la frase omite el p95 |
| 49 | 5:08 | Con eso, cualquiera puede tomar el diseño y comprobar si cumple esas cifras | 2 | 1 | Cierre del ejemplo; continuación |
| **contraste** | 5:13 | | | | |
| 50 | 5:13 | Ese ejemplo trae una advertencia: en otros documentos de MobilityCorp, las cifras de precisión y de falsos positivos son distintas | 3 | 2 | Afirmación sin cifras ni documento: el espectador no puede ver la diferencia; la lección 11 usa este mismo caso |
| 51 | 5:22 | Copiar el requisito ata la decisión a una versión del requisito; si el requisito cambia y nadie actualiza la decisión, la copia queda vieja | 3 | 1 | Concepto de versión; tema de la lección 11 |
| 52 | 5:33 | Por eso conviene citar el requisito por su identificador, además de copiarlo, para encontrar las decisiones que dependen de él | 2 | 1 | Regla de trazabilidad; pertenece a la lección 11 |
| **cierre** | 5:43 | | | | |
| 53 | 5:44 | En MonitorMe, la disponibilidad salió de la lista de tres, pero no del sistema | 2 | 3 | Vuelve a MonitorMe tras otros dos casos; el cierre es a propósito, pero sin puente explícito |
| 54 | 5:49 | Un hospital no puede tener un monitor que se apague: el pedido dice que hay vidas humanas en juego | 3 | 1 | Motivo de peso del caso; la fuente está en inglés y se parafrasea |
| 55 | 5:58 | Decidir que una cualidad no elige el estilo no significa que deje de importar; significa que se resuelve en otro lugar, y que ese lugar también hay que decidirlo y pagarlo | **4** | 2 | Doble negación; "otro lugar" no se nombra en esta lección (la lección 3 dice que es la infraestructura) |

## Lo que muestran los puntajes

1. **Pico de carga en la frase de las cifras (fila 48, carga 5).** Tres cifras (80 %, 10 %, cinco segundos) y "falsos positivos" en una sola oración. Además, la cifra de tiempo no es la de la fuente: el requisito dice "≤5 s p95" y la lección dice "menos de cinco segundos por foto", sin el percentil. En una lección sobre copiar requisitos sin errores, es el punto más delicado.

2. **Acumulación de C4 entre 1:47 y 2:16 (filas 20, 21, 23 y 25).** Cuatro ideas con carga 4 en 29 segundos: la discusión de las "menciones", una cadena causal con atribución al equipo, la hoja de estilos y el costo admitido. Son los mismos argumentos que la lección 3 desarrolla con más calma (ver hallazgo 4), así que aquí se pagan dos veces.

3. **Cuatro casos nuevos en 2 min 20 s, sin ancla (filas 27, 38, 41 y 47; fricción 2 y 3).** ClearView (2:33), The Archangels (3:49), monArch y Hey Blue! (4:10) y MobilityCorp (4:52): alrededor de 1,7 casos nuevos por minuto. Solo Hey Blue! llega con una descripción clara; The Archangels llega con una a medias, y ClearView y MobilityCorp no dicen qué hacen. Farmacy Food aparece como cliente (fila 38) y como caso (fila 46), y no se vincula con la cocina de la lección 1, que es el mismo caso de ArchColider sin ese nombre.

4. **Contradicción con la lección 3, y solapes de ideas que son de otra lección.** La fila 18 dice que de las nueve candidatas quedó "que crezca cuando lleguen más sensores". La lección 3 dice que "la escalabilidad quedó abajo" y que "si llegan más sensores, se agregan máquinas a mano". Además, la lección 3 habla de "bajó tres cualidades" y la 2 de nueve a tres; la verificación cita 9 candidatas, 7 prioritarias y 3 finales (Evolvability, Performance, Elasticity). Las cuentas no cierran sin una aclaración. Solapes: la definición de cualidad (filas 9 a 11) repite casi textual la lección 1; los trade-offs (filas 37 a 43) son el tema de la lección 3; la disponibilidad de MonitorMe (filas 20 a 25) la razona la lección 3; MobilityCorp y la cita del requisito (filas 47 a 52) abren la lección 11.

5. **Afirmaciones sin cifra o sin sostén.** "Casi siempre se corta" (fila 45) no tiene cifra aquí, aunque la lección 1 da "uno de cada cuatro" y la verificación cita tres repos. "Cifras distintas" en otros documentos (fila 50) no dice cuáles. "Bajó la prioridad" de la integridad de los datos (fila 34) presupone que estaba en la lista de prioritarias, y esa lista no aparece en la lección; hay que confirmarla en `Pragmatic/ArchitectureCharacteristics/Characteristics.md`. "Ese lugar" (fila 55) no se nombra en esta lección.

Vocabulario sin presentar o con dos nombres, transversal a los hallazgos: "estilo" (filas 14, 23, 25, 35, 37, 55) no aparece definido en la lección 1 y la lección 3 lo usa después; "hoja de estilos" (filas 23 a 25, 35, 36) suena a hoja de CSS en español; "cualidad" y "característica" (filas 7, 10), "rendimiento", "velocidad" y "respuesta media" (filas 4, 16, 43) para la misma idea; "pedido", "requisito" y "frase" (filas 3, 44, 47); "pliego" aparece solo en el título.

## Qué cambiaría, en orden de impacto

1. **Resolver la contradicción con la lección 3 antes de mover nada (lecciones 2 y 3).** Confirmar en `BluzBrothers/ArchitectureCharacteristics/Characteristics.md` cuáles son las tres finales y cuántas cualidades se bajaron. Después corregir la fila 18 o la lección 3: escalabilidad y elasticidad no son lo mismo, y "bajó tres" no cuadra con 9, 7 y 3. Hoy el espectador aprende dos cosas incompatibles.

2. **Mover "Elegir sabiendo qué se pierde" (filas 37 a 43) a la lección 3, "Renunciar, y hacer la cuenta".** Ya trata renuncias, costo escrito y la disponibilidad de MonitorMe, y el trade-off se presentó en la lección 1. Ahí entran The Archangels (fila 38, carga 4 y fricción 3) y monArch (fila 41). En la lección 2 queda la fila 55 como puente, y los descartes de MonitorMe (filas 20 a 25) se reducen a una frase, porque la lección 3 los desarrolla. Salen unas 12 ideas de esta lección y se van los picos de carga 4 de 1:47 a 2:16.

3. **Mover "Atar la decisión" (filas 50 a 52) y el ejemplo de MobilityCorp (filas 47 a 49) a la lección 11, "Lo que queda escrito".** La lección 11 abre con el mismo caso de las fotos de MobilityCorp y la cita del requisito, así que aquí se cuenta dos veces. En la lección 2 quedan el tercer eslabón (filas 44 a 46) y Farmacy Food como ejemplo de la cadena que se corta, con la cifra de la lección 1 (uno de cada cuatro cita el requisito). La lección 11 es el lugar natural para "citar por identificador".

4. **Presentar antes "estilo" y unificar el vocabulario (lección 1 y lección 2).** Definir "estilo de arquitectura" en la lección 1, o en una frase en la fila 14, porque hoy ningún capítulo anterior lo define. Cambiar "hoja de estilos" por "tabla de estilos" en las filas 23 a 36, para no chocar con CSS. Elegir una palabra por cualidad ("cualidad", con "características de arquitectura" una sola vez; "rendimiento"; "pedido" o "requisito", pero no los dos). Vincular Farmacy Food con la cocina de ArchColider de la lección 1. Partir la fila 48 en tres oraciones y escribir "95 % de las fotos en cinco segundos o menos", si ese es el texto de NFR_9 (confirmar en la fuente). Cambiar "pliego" del título por "pedido", o definirlo.
