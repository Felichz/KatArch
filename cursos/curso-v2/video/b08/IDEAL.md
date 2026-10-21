# Bloque 8 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** una regla que va de "controlo todo" a "opera otro", con las cuatro familias ubicadas sobre ella, y dos casos en los extremos: el hospital con su orquestador y la nube con su plataforma.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **La pila de la instalación** (servidores abajo, orquestador en el medio, copias de los servicios arriba) | Dónde corre y quién lo mantiene vivo | Escenas 1, 2 y 4 |
| **La regla de controlar a operar** (una flecha horizontal: a la izquierda "controlo", a la derecha "opera otro") | Más control trae más trabajo | Escenas 2 y 6 |
| **Tres opciones, dos tachadas** (la comparación del ADR de ShopWise) | Se elige descartando con razón | Escena 3 |
| **El aparato que sigue sin red** (el refrigerador, la red cortada, el chip adentro) | El cómputo en el dispositivo | Escena 5 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 6 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo que se gana; ámbar lo que se paga; rojo la falla.

## 0 · Estás aquí

`T.aqui(8)`, "Bloque 8", "Dónde corre".

## 1 · Un hospital, una instalación (#gancho)

| Frase | Lo que se dibuja |
|---|---|
| «MonitorMe no corre en la nube.» | Sello de MonitorMe. Una nube tachada, a la derecha. |
| «El pedido dice que cada hospital tiene su propia instalación completa…» | Un edificio grande (el hospital) al centro-izquierda; "hasta 500 pacientes" a mano. |
| «Así que el equipo tuvo que decidir cómo correrlo adentro del hospital.» | El edificio crece y se abre: su interior, un rectángulo vacío con borde punteado. |
| «Propone tres servidores físicos separados…» | Tres cajas "servidor" abajo, separadas. |
| «Encima, un orquestador, Kubernetes, que mantiene corriendo copias…» | Una banda "orquestador" encima; sobre ella, copias de servicios (cajas chicas de a dos); una cae (✕ roja) y aparece otra. |
| «Y anotó el costo.» | "costo" a mano en ámbar. |
| «Instalar y mantener un orquestador agrega complejidad…» | La banda del orquestador se repasa en ámbar; una llave inglesa y "atención constante". |

## 2 · Cuatro familias (#familias)

| Frase | Lo que se dibuja |
|---|---|
| «Dónde corre el software decide cuánto controla el equipo y cuánto tiene que operar.» | Barrido. La regla: flecha a lo ancho, "controlo" a la izquierda, "opera otro" a la derecha. |
| «Más control casi siempre trae más trabajo.» | Sobre la izquierda de la regla, una llave inglesa grande en ámbar; sobre la derecha, una chica. |
| «Hay cuatro familias.» | La regla baja; arriba, las regiones con "dónde corre" en naranja. |
| «La primera son las máquinas…» y siguientes | Tarjeta 1 "máquinas": marco y nombre; "gana"; "paga". **«Farmacy Food»**: debajo de la tarjeta, "Farmacy Food" a mano. |
| «La segunda son los contenedores con un orquestador…» y siguientes | Tarjeta 2 "contenedores + orquestador"; **«MonitorMe»**: "MonitorMe" a mano debajo. |
| «La tercera es una plataforma gestionada.» y siguientes | Tarjeta 3 "plataforma gestionada". |
| «La cuarta es correr en el propio dispositivo.» y siguientes | Tarjeta 4 "en el dispositivo". |

## 3 · Una plataforma que opera otro (#shopwise)

| Frase | Lo que se dibuja |
|---|---|
| «ShopWise es una tienda en línea con un asistente de inteligencia artificial.» | Barrido. El mundo de ShopWise (la tienda con el globo de conversación); se achica al sello. |
| «Su equipo tenía que elegir… comparó las mismas familias…» | Tres columnas: "sin contenedores", "Kubernetes propio", "plataforma gestionada". |
| «Correr contenedores en un Kubernetes propio…» | La columna de Kubernetes: "control total" en verde, "excesivo" en ámbar, y se tacha. |
| «Correr sin contenedores era más simple…» | La columna sin contenedores: "más simple" en verde, "cada entorno distinto" en ámbar, y se tacha. |
| «Eligió una plataforma gestionada…» | La tercera se encierra en naranja: "suma copias sola", "paga por uso". |
| «El precio está escrito.» | "precio" a mano en ámbar. |
| «Menos control… procesos que corren mucho tiempo… atado al proveedor.» | Tres renglones en ámbar debajo: "menos control", "procesos largos", "atado al proveedor". |

## 4 · Operar o no operar (#par)

| Frase | Lo que se dibuja |
|---|---|
| «MonitorMe y ShopWise llegaron a lugares distintos por la misma pregunta.» | Barrido. Dos mitades con sus nombres. |
| «MonitorMe tiene que correr dentro del hospital…» | Izquierda: el hospital con la pila (servidores, orquestador, copias); "operamos nosotros" en ámbar. |
| «ShopWise puede correr en la nube…» | Derecha: una nube con la plataforma y los contenedores; "opera el proveedor" en verde; "atados" en ámbar. |
| «Lo que decidió en los dos casos…» | Abajo, la regla de controlar a operar con MonitorMe a la izquierda y ShopWise a la derecha. |

## 5 · El cómputo en el aparato (#dispositivo)

| Frase | Lo que se dibuja |
|---|---|
| «A veces el cómputo tiene que estar en el propio aparato.» | Barrido. El refrigerador de Farmacy Food, grande, al centro-izquierda. |
| «El refrigerador de Farmacy Food puede perder la conexión…» | Sello. Una línea de red del refrigerador a una nube; se corta en rojo. Un cliente se acerca. |
| «Por eso el equipo cuenta con que el refrigerador tiene su propio software y su memoria…» | Adentro del refrigerador, un chip naranja con "procesa pedidos". |
| «Así, la entrega no depende de que la red esté arriba…» | La comida sale hacia el cliente; tilde verde. |

## 6 · La pregunta que decide (#pregunta)

| Frase | Lo que se dibuja |
|---|---|
| «En esta región la pregunta tiene dos partes.» | Barrido. El tramo del mapa con las cuatro tarjetas. |
| «Dónde tiene que estar el cómputo, en el hospital, en la nube o en el aparato.» | Debajo, "¿dónde tiene que estar el cómputo?" en naranja. |
| «Y cuánto quiere controlar el equipo… también lo tiene que operar.» | La regla de controlar a operar debajo de las tarjetas, con "todo lo que controlo, lo opero". |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Instalación en cada hospital; hasta 500 pacientes; tres servidores; Kubernetes; copias que se reponen; costo de complejidad y atención | `BluzBrothers/Business/Requirements.md`; `Deployment/Deployment.md`; `ADR/ADR-018` (Accepted) |
| Máquinas virtuales de Farmacy Food; Kubernetes descartado por el trabajo de aprenderlo y operarlo | `ArchColider/4.ADRs/014 Deployment Strategy.md` (Proposed) |
| Las tres opciones de ShopWise, sus razones y los contras de la elegida; pago por uso | `ConnectedAI/4_adrs/011_adr_containerization.md` (Accepted) |
| El refrigerador procesa pedidos con su propio software y memoria cuando no hay red | `ArchColider/4.ADRs/011 Every meal delivery has pick up pin code.md` (Accepted) |
| La regla de controlar a operar; el chip; el cliente | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | La pila (servidores, orquestador, copias) vuelve igual en el par | Se mantiene |
| 1 | Verificador | "paga por uso" es un "decision driver" del ADR de ShopWise, no una consecuencia | Se muestra como parte de lo elegido, no del costo |
| 1 | Producción | Hace falta el mundo de ShopWise | Agregado a `tiza.js` |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 1 | "adentro del hospital" va centrado arriba; los tres lugares de los servidores se marcan punteados hasta que la voz los nombra | Pegado a la izquierda pisaba el sello; la frontera quedaba vacía unos segundos |
| 3 | Las opciones descartadas se tachan en el título y se apagan, en lugar de una cruz grande | La cruz tapaba las razones de cada descarte |
| 4 | Los dos sistemas aparecen apagados al empezar la escena y se encienden al nombrarse | La primera frase no tenía imagen |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
