# Bloque 8 · Dónde corre

**Enseña:** dónde corre el software decide cuánto controla el equipo y cuánto tiene que operar; cuatro familias (máquinas, contenedores con orquestador, plataforma gestionada, en el dispositivo) con lo que gana y paga cada una.
**Par:** MonitorMe corre en cada hospital, con un orquestador que el equipo opera; ShopWise usa una plataforma gestionada y descarta operar el orquestador. Máquinas: Farmacy Food propone máquinas virtuales. En el dispositivo: el refrigerador de Farmacy Food.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** MonitorMe y sus copias duplicadas (bloque 2), Farmacy Food y su presupuesto. **Presenta:** ShopWise; máquina virtual, contenedor, orquestador, plataforma gestionada.

## Un hospital, una instalación {#gancho}

**Narración**

MonitorMe no corre en la nube. El pedido dice que cada hospital tiene su propia instalación completa del sistema, con hasta quinientos pacientes. Así que el equipo tuvo que decidir cómo correrlo adentro del hospital.

Propone tres servidores físicos separados, para que la falla de uno no tire todo. Encima, un orquestador, Kubernetes, que mantiene corriendo copias de cada servicio y levanta otra si alguna cae. Y anotó el costo. Instalar y mantener un orquestador agrega complejidad, y su configuración necesita atención constante.

**Visual**
- Estás aquí: la región "dónde corre".
- Sello: MonitorMe. Un hospital; adentro, tres servidores; encima, las copias de los servicios; una cae y otra la reemplaza.

## Cuatro familias {#familias}

**Narración**

Dónde corre el software decide cuánto controla el equipo y cuánto tiene que operar. Más control casi siempre trae más trabajo. Hay cuatro familias.

La primera son las máquinas, propias o alquiladas por hora, las máquinas virtuales. Ganan con que son simples y el equipo controla todo. Pagan con que agregar capacidad o reponer una que se cae queda a cargo del equipo. Farmacy Food propone eso, y escribe que descartó Kubernetes por el trabajo que lleva aprenderlo y operarlo.

La segunda son los contenedores con un orquestador, como hizo MonitorMe. Un contenedor empaqueta un servicio con todo lo que necesita para correr igual en cualquier lado, y el orquestador lo mantiene vivo. Ganan con copias que se reponen solas. Pagan con un orquestador que hay que operar.

La tercera es una plataforma gestionada. El equipo entrega su contenedor y el proveedor se ocupa de correrlo y de sumar copias cuando sube la carga. Gana con que no hay nada que operar. Paga con menos control y con quedar atado a ese proveedor.

La cuarta es correr en el propio dispositivo. Gana con que funciona aunque no haya red. Paga con que el software queda repartido en muchos aparatos, que hay que actualizar uno por uno.

**Visual**
- El tramo del mapa: "dónde corre" en naranja y sus cuatro tarjetas. Debajo, una regla de "controlo" a "opero menos".

## Una plataforma que opera otro {#shopwise}

**Narración**

ShopWise es una tienda en línea con un asistente de inteligencia artificial. Su equipo tenía que elegir dónde correr los servicios del asistente, y comparó las mismas familias que acabamos de ver.

Correr contenedores en un Kubernetes propio le daba control total, y lo descartó por excesivo para lo que necesitaba, porque suma complejidad de operación. Correr sin contenedores era más simple, y lo descartó porque cada entorno quedaba distinto. Eligió una plataforma gestionada, que corre sus contenedores, suma copias sola cuando llega un pico y cobra por uso.

El precio aparece en la misma página. Menos control sobre la infraestructura, límites para los procesos que corren mucho tiempo, y quedar atado al proveedor.

**Visual**
- Sello: ShopWise (primera aparición): una tienda con un asistente que conversa. Tres opciones en fila: sin contenedores, Kubernetes propio, plataforma gestionada; las dos primeras se tachan con su razón; la tercera se marca.

## Operar o no operar {#par}

**Narración**

MonitorMe y ShopWise llegaron a lugares distintos por la misma pregunta. MonitorMe tiene que correr dentro del hospital, así que opera su propio orquestador y paga con ese trabajo. ShopWise puede correr en la nube, así que le deja la operación a un proveedor y paga con control y con atarse a él. Lo que decidió en los dos casos fue dónde tenía que estar el cómputo y cuánto querían operar.

**Visual**
- Dos mitades: MonitorMe (el hospital con su orquestador, "operamos nosotros") y ShopWise (la nube con su plataforma, "opera el proveedor").

## El cómputo en el aparato {#dispositivo}

**Narración**

A veces el cómputo tiene que estar en el propio aparato. El refrigerador de Farmacy Food puede perder la conexión justo cuando un cliente llega a buscar su comida. Por eso el equipo cuenta con que el refrigerador tiene su propio software y su memoria para procesar los pedidos. Así, la entrega no depende de que la red esté arriba en ese momento.

**Visual**
- Sello: Farmacy Food. El refrigerador con su pantallita; la red se corta (línea roja partida); adentro del refrigerador, un chip con "procesa pedidos", y el cliente se lleva su comida.

## La pregunta que decide {#pregunta}

**Narración**

Para decidir dónde corre, hay que contestar dos cosas. Dónde tiene que estar el cómputo, en el hospital, en la nube o en el aparato. Y cuánto quiere controlar el equipo, sabiendo que todo lo que controla también lo tiene que operar.

**Visual**
- El tramo del mapa con las cuatro familias y la regla de controlar a operar.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| "MonitorMe will be deployed as an on-premises system. Each physical hospital location will have its own installation"; hasta 500 pacientes por instancia | `BluzBrothers/Business/Requirements.md` l. 37-39 |
| Kubernetes en la infraestructura del hospital; "three (or at least two) independent servers to safeguard against hardware failures" | `BluzBrothers/Deployment/Deployment.md` |
| ADR-018 (Accepted): duplicar instancias con un orquestador como Kubernetes, que levanta otra si alguna cae; contras: "Implementation and maintenance of a container orchestration system may introduce complexities"; "relies on accurate configuration and monitoring, requiring ongoing attention" | `BluzBrothers/ADR/ADR-018-high-availability-automated-instance-duplication.md` |
| Farmacy Food (Proposed): máquinas virtuales (EC2); Kubernetes descartado por "the effort of work that needs to be invested into the platform, starting from learning Kubernetes ending on provisioning Kubernetes cluster…" | `ArchColider/4.ADRs/014 Deployment Strategy.md` |
| ShopWise: tienda en línea con asistente de IA | `ConnectedAI/README.md` |
| ADR011 (Accepted): contenedores en Cloud Run, "fully managed serverless platform… removing the need for managing Kubernetes clusters"; Kubernetes (GKE): "Overkill for the project's needs, increases operational complexity"; sin contenedores: "Lacks consistency, scalability…"; contras: "Limited control over infrastructure", "restrictions on non-HTTP workloads or applications requiring long-running processes", "Potential vendor lock-in"; pago por uso | `ConnectedAI/4_adrs/011_adr_containerization.md` |
| Farmacy Food ADR-011 (Accepted): "Network connection might be lost… But the fridge has a pin pad keyboard and still has quite sophisticated software and internal memory to process orders" | `ArchColider/4.ADRs/011 Every meal delivery has pick up pin code.md` l. 11-12 |
| Lo que gana y paga cada familia; "más control casi siempre trae más trabajo"; qué es un contenedor | Conocimiento general (externo), coherente con los ADR citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | Dos casos nuevos posibles (ShopWise y Wildlife Watcher); con los dos, entran a menos de dos minutos | Solo ShopWise; en el dispositivo va el refrigerador de Farmacy Food (caso conocido); Wildlife Watcher se presenta en el bloque 9 |
| 1 | Diseño del aprendizaje | El código PIN del refrigerador es el par del bloque 10 | Aquí solo se dice que el refrigerador procesa pedidos con su propio software; el código queda para cuando algo falla |
| 2 | Arquitecto senior | "Contenedor" y "orquestador" se usan con Kubernetes; hacen falta en una frase | Se definen al presentar la segunda familia |
| 3 | Verificador | Farmacy Food: la decisión de máquinas virtuales está en Proposed; MonitorMe: los tres servidores son una recomendación del documento de despliegue | "Propone" en los dos |
| 4 | Guionista | "las mismas familias que acabamos de ver" es la única referencia hacia atrás | Se mantiene |
| 5 | Espectador de prueba | "Máquinas virtuales" se explica como "alquiladas por hora" | Sin cambios |
| 6 | Dirección visual | Hace falta el mundo de ShopWise | Se agrega al animar |
| 7 | Producción | Ids: `gancho`, `familias`, `shopwise`, `par`, `dispositivo`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
