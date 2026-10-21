# Carga y fricción · Lección 3, "Renunciar, y hacer la cuenta"

40 ideas, 6:44 de duración (404 s). Tiempos tomados de `video/ch3/timing.js` (modo voz). Las cifras de fuente se verificaron en `katas-src/<Repo>/`.

## Tabla

| # | Tiempo | Idea | Carga | Fricción | Por qué |
|---|---|---|---|---|---|
| **gancho** | 0:00 | | | | |
| 1 | 0:01 | Cinco nueves = 99,999 %, unos cinco minutos caídos al año | 3 | 1 | Apertura. "Nueves" no se define, pero la cifra es concreta. |
| 2 | 0:10 | Spotlight: cinco nueves irrazonable, y cuatro también demasiado | 3 | 3 | Caso nuevo con dos cifras. Salto desde la norma "sistemas serios". |
| 3 | 0:27 | Spotlight no maneja vidas ni dinero de forma directa | 2 | 2 | Conector "la razón está en la misma frase". Una sola idea. |
| 4 | 0:34 | Eligieron entre 3 y 4 nueves "según la parte del sistema" | 3 | 2 | Dos cifras sin decir qué parte. La lección nunca vuelve a esa parte (la promesa queda abierta). |
| **pregunta** | 0:41 | | | | |
| 5 | 0:41 | Elegir tres cualidades deja otras abajo; hay dos mitades: renunciar con cuidado y comprobar con cifras | 3 | 3 | Pasa de lo concreto (nueves) a lo abstracto (tres cualidades) sin enlazar el "tres" con los nueves. |
| **renuncias** | 0:55 | | | | |
| 6 | 0:55 | MonitorMe bajó tres cualidades, con una decisión escrita para cada una | 3 | 3 | Vuelve a MonitorMe después de Spotlight, sin puente. Ver hallazgo 2 (la cuenta de "tres" no cierra con L2). |
| 7 | 0:55 | Escalabilidad abajo: carga máxima fija (500 pacientes por instalación); si llegan sensores, se agregan máquinas a mano | **4** | 2 | Cifra 500, "carga máxima", "escalabilidad" y el caso de sensores nuevos. Ese mismo caso, en L2, es lo que MonitorMe sí mantiene ("que crezca cuando lleguen más sensores"). Ver hallazgo 1. |
| 8 | 1:09 | Facilidad de despliegue abajo: se instala una vez por hospital, sin migraciones | 2 | 1 | Continuación de la lista de renuncias. |
| 9 | 1:20 | Cada renuncia trae su costo: las dos dicen que pasar a la nube va a costar | 3 | 2 | "Nube" aparece por primera vez aquí, como costo de la renuncia. |
| 10 | 1:28 | Cada renuncia nombra la condición del negocio que la hace segura; si cambia, deja de valer | 3 | 2 | Principio abstracto; el ejemplo viene de la frase anterior. |
| **paga** | 1:39 | | | | |
| 11 | 1:39 | La disponibilidad no decide el estilo del sistema: se resuelve en la infraestructura | 3 | 2 | "Estilo del sistema" e "infraestructura" sin definir. "Es distinta" marca el cambio de tipo de renuncia. |
| 12 | 1:45 | Todas las instancias duplicadas en un orquestador, Kubernetes, que levanta copias si una cae | **4** | 3 | Dos nombres nuevos (orquestador, Kubernetes) y "instancias" en una sola frase. Herramienta metida en el argumento, aunque con un apositivo corto. |
| 13 | 1:58 | Supuesto: una instancia nueva arranca en 30 s como máximo; puede no lograrse, y duplicar cuesta más | 3 | 2 | Cifra de 30 s y un supuesto que la fuente admite incierto (ADR-020). |
| 14 | 2:09 | La renuncia no ahorró la disponibilidad: la movió de la elección de estilo a la infraestructura | 2 | 1 | Repite la idea 11 casi con las mismas palabras. Recapitulación sin dato nuevo. |
| **compiten** | 2:17 | | | | |
| 15 | 2:17 | A veces la renuncia es un empate: Road Warrior elige entre elasticidad y evolutividad | **4** | 3 | Caso nuevo y dos cualidades nuevas en una frase. "Elasticidad" queda abajo aquí, y arriba en MonitorMe (hallazgo 1). |
| 16 | 2:27 | Eligió evolutividad porque es una startup y tiene que reaccionar a los usuarios casi de inmediato; la elasticidad la cubre la infraestructura que escala sola | 3 | 2 | Causa explicada. La frase final tiene respaldo: Data Alchemists delega la elasticidad en el autoscaling de Kubernetes. |
| 17 | 2:39 | MobilityCorp escribió doce cualidades, sin orden y sin ninguna renuncia | 3 | 3 | Caso nuevo con cifra. "El caso contrario" lo anuncia. "Sin orden": la fuente las agrupa por categoría; lo que falta es prioridad (hallazgo 5). |
| 18 | 2:47 | Sin prioridad escrita, una decisión entre dos cualidades no tiene a qué remitir | 2 | 2 | Consecuencia del caso anterior, con "pero". |
| **cuenta** | 2:55 | | | | |
| 19 | 2:55 | "La otra mitad": una cualidad elegida se tiene que poder comprobar, y la forma más directa es una cuenta | 2 | 3 | Cambio de hilo anunciado. |
| 20 | 3:02 | MonitorMe: mostrar signos vitales en 1 s o menos; unas 4.000 señales por segundo en el peor momento; el segundo se reparte entre las etapas | **4** | 2 | Tres cifras y un método en un mismo bloque. La vuelta a MonitorMe está anunciada ("MonitorMe la hizo"). |
| 21 | 3:17 | Cinco etapas con su tiempo: registrar, mostrar, guardar en la base, pasar por el broker de mensajes, red del hospital | **4** | 2 | Cinco términos técnicos seguidos. "Broker de mensajes" no se define. Las etapas no se numeran, así que no se sabe cuáles son "las dos de procesamiento" (idea 23). |
| 22 | 3:27 | Suma: poco menos de 700 ms, por debajo del segundo; así una frase del pedido se puede comprobar | 2 | 1 | Una cifra y una conclusión. Continuación directa. |
| **supuesto** | 3:35 | | | | |
| 23 | 3:35 | Más del 90 % del tiempo está en las dos etapas de procesamiento; la base, el broker y la red pesan poco | 3 | 2 | "Las dos etapas de procesamiento" no se nombran. "Lectura nuestra" marca la inferencia. Dato: 640 de 693 ms (92 %). |
| 24 | 3:53 | Esas dos etapas salen de un supuesto: procesar una señal tarda 2 ms, sin fuente | 3 | 2 | Supuesto que el espectador tiene que sostener. Es la pieza central del argumento. |
| 25 | 4:03 | Con 3 ms la suma pasa del segundo; si no se puede medir, la decisión queda condicionada a ese número | 3 | 2 | Hipótesis sin la cifra de resultado (la suma da 1.013 ms, no se dice). "O sea" conecta. |
| **costo** | 4:15 | | | | |
| 26 | 4:15 | Farmacy Food calculó su infraestructura para tres escenarios de pedidos por día, con precio unitario y total por servicio | **4** | 3 | Caso nuevo y tres escenarios sin cifras (la fuente: 500, 1.000 y 10.000 requests por día). "Lo mismo vale para el dinero" anuncia el cambio de tema. |
| 27 | 4:25 | Veinte veces más tráfico cuesta menos del doble (1,84 veces) | 3 | 2 | El espectador recibe la proporción sin los totales (12.248 y 22.481 USD). "La tabla" se cita sin cifras en la voz. |
| 28 | 4:37 | La mayor parte del costo es fijo, lo deciden los servicios contratados; lo útil es saber qué parte se mueve con la carga | 3 | 2 | "Costo fijo" sin definir. "Mayor parte" vale solo en el escenario más bajo (hallazgo 5). |
| **horas** | 4:48 | | | | |
| 29 | 4:49 | Certifiable, que certifica arquitectos: el costo son personas; trescientos expertos corrigen a mano | **4** | 3 | Caso nuevo y una cifra ("trescientos") que la fuente no da (hallazgo 5). |
| 30 | 4:58 | El equipo ZAItects hizo la cuenta en horas de experto; con IA y revisión humana parcial, el costo por candidato baja de unos 470 a unos 95 USD | **4** | **4** | ZAItects aparece como "equipo" sin decir qué es ni qué relación tiene con Certifiable. "Revisión humana parcial" sin definir. Dos cifras. Único salto de fricción 4 de la lección. |
| 31 | 5:11 | El supuesto central: solo uno de cada cinco exámenes pasa por un humano | 3 | 2 | Fracción que decide el resultado. Se nombra bien. |
| 32 | 5:11 | En nuestra cuenta, el modelo de lenguaje es el 1,4 % del costo | 3 | 2 | "Modelo de lenguaje" sin definir en esta lección (L10 lo explica). Cifra propia (1.350 de 95.900 USD), dicha como "nuestra". |
| 33 | 5:22 | Si pasa de uno de cada cinco a uno de cada dos, el costo por candidato más que se duplica; lo que mueve el costo es cuánto se revisa a mano | 3 | 1 | Contrafactual sin la cifra (236 USD, cuenta propia). "Lo que mueve el costo" repite la idea 28. |
| **sincuenta** | 5:33 | | | | |
| 34 | 5:33 | MobilityCorp: posición cada 30 min en un documento y cada 30 s en otro; sesenta veces de diferencia en la carga | **4** | 3 | Dos cifras y el concepto de carga. "Lo contrario" marca cambio de sección. La comparación supone un solo flujo; en la fuente son dos (hallazgo 5). |
| 35 | 5:51 | Road Warrior escribe que tiene que refrescar 150 millones de reservas cada 5 minutos | 3 | 2 | Caso conocido (idea 15) y una cifra grande. Sigue el tema de los números sin cuenta. |
| 36 | 6:01 | Dividido, son 500.000 actualizaciones por segundo; cuenta propia que "cambiaría varias decisiones" | 3 | 1 | La división es correcta (150 M / 300 s). "Varias decisiones" no se nombran: la afirmación no se puede comprobar en el video. |
| **cierre** | 6:08 | | | | |
| 37 | 6:08 | Cuántos nueves pedir es otra forma de decir cuánto cuesta que el sistema esté caído | 3 | 3 | Vuelta a Spotlight desde el minuto 0:10, con dos casos de por medio. Idea abstracta. |
| 38 | 6:16 | Spotlight pudo pedir menos porque no tenía vidas ni dinero en juego; MonitorMe no puso número, pero dejó escrito dónde paga la disponibilidad | 3 | 2 | Cierre con los dos casos, como pide el brief. Buena comparación, con dos casos en un mismo bloque. |
| 39 | 6:28 | Cada cualidad que queda abajo dice por qué es seguro dejarla; cada una arriba, cómo se comprueba | 2 | 1 | Síntesis de la lección. Sin dato nuevo. |
| 40 | 6:35 | Con lo que importa decidido y comprobado, el sistema ya se puede empezar a cortar en partes | 1 | 2 | Puente a la lección 4. Ver nota final. |

Puntajes de 4 o más en negrita. Carga 4 o más: ideas 7, 12, 15, 20, 21, 26, 29, 30, 34. Fricción 4 o más: idea 30.

## Lo que muestran los puntajes

**1. Escalabilidad y elasticidad se usan en sentidos contrarios a lo largo del curso (ideas 7, 15, 16; también L2).** L2 dice que MonitorMe se quedó con "que crezca cuando lleguen más sensores". Esta lección dice que el caso de sensores nuevos queda abajo y se resuelve "a mano" (idea 7). En Road Warrior, "elasticidad" queda abajo (idea 15), mientras que en MonitorMe es la que se queda. La fuente no lo resuelve sola: `BluzBrothers-src/ArchitectureCharacteristics/Characteristics.md` l. 27 pone a los sensores nuevos como motivo de la elasticidad, que queda arriba; la l. 32 y `ADR/ADR-008` bajan la escalabilidad y dicen que el alta de sensores es manual. Las top 3 son Evolvability, Performance y Elasticity (`ADR-011`; Characteristics.md l. 87). La lección sigue a la fuente en la decisión, pero no en el vocabulario. Es la contradicción más fuerte con otra lección.

**2. La cuenta de renuncias no cierra con L2, y la disponibilidad se dice dos veces (ideas 6, 11, 14).** L2 (`guion/leccion2.md`, l. 19): "MonitorMe llegó a nueve candidatas, y se quedó con tres". Esta lección: "MonitorMe bajó tres cualidades". Nueve menos tres son seis fuera de la lista. Tres tienen decisión escrita (ADR-008, 009 y 010); las otras tres (seguridad, tolerancia a fallas, configurabilidad) la fuente las deja como cualidades de módulo (Characteristics.md l. 45), no como renuncias. La lección tendría que decir "de las seis que quedan fuera, tres tienen ADR propio". Las ideas 11 y 14 dicen lo mismo ("no decide el estilo" / "la movió de estilo a infraestructura").

**3. Son demasiados casos para 6:44 (ideas 2, 5, 6, 12, 15, 17, 19, 26, 29, 34, 37; idea 30 con fricción 4).** Hay unos once cambios de caso: Spotlight, MonitorMe, Road Warrior, MobilityCorp, MonitorMe, Farmacy Food, Certifiable, ZAItects, MobilityCorp, Road Warrior, Spotlight. Aparecen seis casos o equipos nuevos. `DISENO-CURSO.md` dice que los invitados entran "solo donde tienen el mejor ejemplo". Spotlight y Road Warrior vuelven en dos pasajes separados por minutos, y ZAItects aparece solo como nombre de equipo (idea 30).

**4. Términos y piezas usados antes de presentarse o sin conectar (ideas 4, 21, 23, 26, 30, 32, 36).** "La parte del sistema" (idea 4) nunca se nombra en la lección. "Broker de mensajes" (21) no se define. Las "dos etapas de procesamiento" (23) no se vinculan con "registrar" y "mostrar" (21). Los tres escenarios de Farmacy (26) no tienen cifras. "Modelo de lenguaje" (32) aparece sin función. "Varias decisiones" (36) no dice cuáles. Cada una pesa 3 o 4 en carga, y la cadena de cinco etapas (21) no está numerada.

**5. Cifras que no se sostienen tal cual, o cambian de sentido (ideas 27, 28, 29, 34, 36; y 17 en menor medida).**
- **Idea 29, "trescientos expertos".** `ZAITects-src/other_design_docs/cost-analysis.md` da 1.880 horas por semana y 94.000 USD (unos 50 USD la hora, implícito). No da una cantidad de expertos. La tabla de verificación cita "300 expertos" a esa fuente y no aparece. Usar las horas, o quitar el número.
- **Idea 34, "sesenta veces en la carga".** `Five-Nines-src/requirements/4_Assumptions and constraints.md` l. 8: el GPS reporta cada 30 min. `Appendix A_ Core functionality.md` l. 36 y `hld/core-func/car-van-rental/4_Sequence_Diagram.md` l. 130-132: la telemetría durante el alquiler va cada 30 s. Son dos flujos. Si son distintos se suman; no se comparan como una diferencia de 60 veces. La lección los presenta como uno solo.
- **Idea 27, "menos del doble (1,84)".** `ArchColider-src/3.ViewsAndPerspectives/CostAnalysis.md` l. 279-293: la suma da 12.247,57 y 22.480,57 USD, cociente 1,84. Pero deja fuera el Application Load Balancer y la transferencia de datos, marcados "TBD", que crecen con el tráfico. El 1,84 es el costo de lo que ya tiene cifra, no el total.
- **Idea 28, "la mayor parte del costo es fijo".** En el escenario mínimo es cierto: DynamoDB, DataDog, SNS, Kafka y VPN suman 6.922 de 12.248 USD (56 %). En el de 10.000 requests por día bajan a 31 % (6.922 de 22.481). Ahí EC2, S3, Tableau y Amazon MQ suben. Hay que decir "en el escenario más bajo".
- **Idea 36, "cambiaría varias decisiones".** No dice cuáles. Sin eso no se puede comprobar. La división (150 M / 300 s = 500.000 por segundo) es correcta.
- **Idea 17, "sin orden".** `Five-Nines-src/requirements/3_NFRs.md` tiene 12 entradas, agrupadas por categoría (núcleo, seguridad, operación, IA, usabilidad). Lo que falta es prioridad, no orden. Además NFR_7 aparece dos veces (Compliance y Observability), así que el número 12 depende de contar las dos.
- **Verificado sin problema:** 693 ms; 92 % (640/693); quiebre cerca de 2,96 ms; 5 nueves = 5,26 min al año; 3 y 4 nueves por quantum (`Pegasuz-src/README.md` l. 138-140); Road Warrior elige evolutividad por ser startup (`Profitero-Data-Alchemists-src/README.md` l. 160); LLM 1,4 % (1.350 / 95.900); 236 USD con factor 0,5 (cuenta propia, sin cifra en la voz).

## Qué cambiaría, en orden de impacto

1. **Fijar el vocabulario de escalabilidad y elasticidad (L2 y L3; impacto alto).** En L2, nombrar la cualidad que se queda como "elasticidad", y definirla ahí: escala sola al sumar nodos. En L3, usar "escalabilidad" solo para la renuncia (carga máxima fija, ampliación a mano), y decir que el alta de sensores queda en la renuncia por esa razón. Usar "elasticidad" para Road Warrior con la misma definición. Así las ideas 7, 15 y 16 dicen lo mismo que L2. Antes de grabar hay que decidir cuál de las dos lecturas de la fuente se sigue (Characteristics.md l. 27 frente a ADR-008).

2. **Mover Kubernetes, instancias y los 30 s (ideas 12 a 14) a la lección 7, "Cuando algo falla".** Duplicar instancias y levantar copias es un caso de falla, que es el tema de L7. En L3 queda una frase: "la disponibilidad se resuelve en la infraestructura; lo vemos en la lección 7". Se quita un salto de fricción 3 y una repetición (idea 14), y se ahorran unos 40 segundos.

3. **Mover Farmacy Food (ideas 26 a 28) a la lección 9, "Comprar, construir y cuándo cambiar".** Su punto es qué contratos pesan en el costo, que es el tema de comprar. Ahí darle los tres escenarios con cifras (500, 1.000 y 10.000 requests por día; 12.248 y 22.481 USD) y aclarar que el 1,84 excluye el balanceador y la transferencia. En L3 queda la cuenta de Certifiable, que L10 ya cita como "la lección tres". Se ahorran unos 35 segundos.

4. **Corregir cifras y presentar antes de contar (L3; impacto medio).** Cambiar "trescientos expertos" por "1.880 horas de experto a la semana" (idea 29). Decir que el 60 veces compara dos flujos distintos, GPS cada 30 min y telemetría cada 30 s durante el alquiler, o quitarla (idea 34). Presentar ZAItects como el equipo que hizo la cuenta de Certifiable (idea 30). Nombrar las cinco etapas con número antes de decir "dos de procesamiento", y definir "broker" al primer uso (ideas 21 y 23). Decir en el gancho qué parte del sistema recibe 3 nueves y cuál 4, o dejar la promesa para L4, donde aparecen los quanta (idea 4). Nota menor: el cierre (idea 40) termina en un puente a la lección 4, y el CLAUDE.md del proyecto pide cerrar volviendo a la historia; se puede quitar esa última frase.

No se editó ningún guion ni otro archivo.
