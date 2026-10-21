# Bloque 12 · guion visual

Qué se ve, por qué tiene esa forma y cómo se dibuja, plano por plano (paso 4 de `cursos/curso-v2/PROCESO.md`). Estilo: `cursos/curso-unico/GUIA-VISUAL.md`. Duraciones estimadas (`timing.mjs estimate`).

**La idea del bloque en una imagen:** tres servicios con sus medidores en verde y, entre ellos, un pedido quieto; un mensaje de prueba que recorre el camino entero y vuelve con un tilde y un cronómetro.

## Las formas del bloque

| Forma | Qué dice | Dónde aparece |
|---|---|---|
| **Los servicios con medidor** (una caja con una barrita verde) y **el latido** (un pulso que sale de cada caja) | La salud técnica | Escenas 1 y 2 |
| **El recorrido de prueba** (un punto naranja que pasa por todas las cajas y vuelve con tilde y cronómetro) | La salud del negocio | Escenas 1, 2 y 4 |
| **La traza** (una fila de pasos con su duración, como barras horizontales escalonadas) | Seguir un pedido o una conversación | Escenas 2, 3 y 4 |
| **La casa** (un borde punteado con forma de casa alrededor de lo propio) | Instalado en sus máquinas | Escena 3 |
| **El silencio** (una curva que se corta en línea plana gris) | Lo que deja de pasar | Escena 5 |
| **El tramo del mapa** | Las cuatro familias de la región | Escenas 2 y 6 |

Colores: blanco lo que está; naranja lo que la voz señala; verde lo sano o lo que se gana; ámbar lo que se paga; rojo la falla.

## 0 · Estás aquí

`T.aqui(12)`, "Bloque 12", "Ver qué pasa".

## 1 · Las máquinas sanas y el negocio roto (#gancho)

**Entiende:** las máquinas pueden estar bien y el negocio no; un mensaje de prueba recorre el camino y mide resultado y tiempo.
**Forma:** tres servicios en fila; arriba de cada uno su medidor; el pedido entre el segundo y el tercero.

| Frase | Lo que se dibuja |
|---|---|
| «Las máquinas de Farmacy Food pueden estar todas sanas y el negocio, trabado.» | Sello de Farmacy Food. Tres servicios en fila con su medidor verde. |
| «Cada servicio responde… un pedido se queda quieto en algún paso.» | Un pedido sale del primero, pasa al segundo y se queda quieto entre el segundo y el tercero; un "?" naranja. |
| «El equipo escribe que las métricas de máquinas y de red no dicen…» | Bajo los medidores, "máquinas: bien" en verde y "negocio: ?" en naranja. |
| «Por eso cada servicio tiene dos controles.» | El pedido trabado se borra. |
| «Uno es técnico, un latido…» | Cada servicio late: un pulso verde sale hacia arriba; "latido". |
| «El otro es de negocio.» | Un supervisor (caja con un ojo) aparece abajo. |
| «Un supervisor lanza cada tanto un mensaje de prueba…» | Un punto naranja sale del supervisor y recorre los tres servicios; "hacer un pedido". |
| «Mide dos cosas…» | El punto vuelve al supervisor con un tilde verde y un cronómetro "1,2 s". |
| «Con eso se enteran cuando las máquinas están sanas pero algo… se trabó.» | Una vuelta más: el punto se queda en el tercero; el supervisor muestra una ✕ roja mientras los medidores siguen verdes. |
| «Y lo que tarda cada recorrido, mirado mes a mes…» | Todo se achica a la izquierda; a la derecha, una curva de tiempos que sube por meses; una línea de umbral; "separar un módulo". |
| «El costo también está escrito.» | "costo" en ámbar. |
| «Los mensajes de prueba hay que diseñarlos dentro del código…» | "más trabajo y complejidad" y "cuidado con los pedidos reales" en ámbar. |

## 2 · Cuatro familias (#familias)

| Frase | Lo que se dibuja |
|---|---|
| «Para enterarse de que algo anda mal hay cuatro familias…» | Barrido. Arriba, las regiones con "ver qué pasa" en naranja. |
| «Los registros son las anotaciones…» y siguientes | Tarjeta 1 "registros". |
| «Las métricas son números a lo largo del tiempo…» y siguientes | Tarjeta 2 "métricas". |
| «Las trazas siguen un mismo pedido…» y siguientes | Tarjeta 3 "trazas". |
| «La salud del negocio prueba un recorrido entero…» y siguientes | Tarjeta 4 "salud del negocio"; "Farmacy Food" a mano debajo. |

## 3 · Las conversaciones, en casa (#shopwise)

| Frase | Lo que se dibuja |
|---|---|
| «ShopWise, la tienda en línea con su asistente…» | Barrido. Sello de ShopWise. Un globo de conversación entra al asistente. |
| «…quería trazas, el recorrido de cada conversación paso por paso.» | Debajo, la traza: cuatro barras escalonadas ("pregunta", "busca", "modelo", "respuesta"). |
| «También quería evaluar las respuestas sin poner cada cambio en producción.» | Al lado, una planilla con tildes: "evaluar". |
| «Comparó tres herramientas.» | Todo sube; tres cajas de herramientas. |
| «La que eligió se puede instalar en sus propias máquinas…» | Dos se apagan; la elegida se rodea en naranja; a su alrededor, una casa punteada. |
| «Así, las trazas de las conversaciones no salen de su infraestructura.» | Las barras de la traza entran a la casa; "datos sensibles, en casa" en verde. |
| «El precio está anotado.» | "precio" en ámbar. |
| «Instalar y mantener esa herramienta…» | "instalar y mantener" y "menos documentación" en ámbar. |

## 4 · Qué mira cada uno (#par)

| Frase | Lo que se dibuja |
|---|---|
| «Farmacy Food y ShopWise miran cosas distintas.» | Barrido. Dos mitades con sus nombres; las figuras apagadas. |
| «Farmacy Food se pregunta si el negocio funciona…» | Izquierda se enciende: el recorrido de prueba con tilde y cronómetro; "¿funciona el negocio?" en verde. |
| «ShopWise se pregunta qué pasó dentro de cada conversación…» | Derecha se enciende: la traza; "¿qué pasó adentro?" en verde. |
| «Y las dos decisiones tienen su costo escrito…» | Debajo de cada mitad: "pruebas que construir" y "una herramienta que operar", en ámbar. |

## 5 · El sensor que se calla (#silencio)

| Frase | Lo que se dibuja |
|---|---|
| «Hay una falla que no hace ruido.» | Barrido. Sello de MonitorMe. Un sensor de pulso a la izquierda; tres piezas: "guarda", "muestra", "analiza" (con su memoria). |
| «…si un sensor deja de mandar datos, nada se rompe.» | El sensor se pone gris; los puntos dejan de salir. |
| «La pantalla simplemente deja de mostrar esa señal.» | En la pantalla de "muestra", la curva se corta en una línea plana gris. |
| «Y un sensor de pulso callado no es lo mismo que un pulso normal.» | "callado ≠ normal" en naranja. |
| «El equipo recorrió el camino del dato, pieza por pieza…» | Un foco pasa por cada pieza. |
| «El que guarda no guarda nada, y el que muestra no muestra nada.» | "nada que guardar", "nada que mostrar". |
| «El que analiza conserva la última lectura con su hora.» | En la memoria del analizador, "pulso 72 · hace 1 h". |
| «…el dato falta o es demasiado viejo.» | "hace 1 h" se pone naranja. |
| «Entonces la regla no se aplica, o salta una alerta.» | Una alerta sale del analizador. |

## 6 · La pregunta que decide (#pregunta)

| Frase | Lo que se dibuja |
|---|---|
| «En esta región la pregunta es cómo se entera el equipo…» | Barrido. El tramo del mapa con las cuatro tarjetas; debajo, la pregunta en naranja. |
| «Eso incluye lo que funciona en cada máquina pero no en el negocio, y lo que… deja de pasar…» | Bajo "salud del negocio", "Farmacy Food"; bajo "métricas", "el sensor callado". |

## Verificación de lo que se dibuja

| Lo que se muestra | Fuente |
|---|---|
| Latido por servicio; supervisor con mensajes de prueba por recorridos críticos; resultado correcto y tiempo; máquinas sanas y negocio trabado; planificar extracción y escalado; costo y riesgo | `ArchColider/4.ADRs/004 Health check endpoints.md` (Accepted) |
| Trazas y evaluación sin desplegar; tres herramientas; instalada en casa por los datos sensibles; costo de mantenerla y documentación | `ConnectedAI/4_adrs/007_adr_evaulation_framework.md` (Accepted) |
| El sensor que falla; nada que guardar ni mostrar; última lectura con hora (una hora); reglas para dato viejo o inexistente; alerta | `BluzBrothers/FitnessFunctions/Failover.md` |
| "1,2 s", "hacer un pedido", la curva por meses, las etapas de la traza, "pulso 72" | Ilustraciones del curso |

## Revisión del guion visual

| Vuelta | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El contraste "máquinas bien, negocio no" tiene que verse a la vez | Medidores verdes y la ✕ del supervisor en el mismo cuadro |
| 1 | Dirección visual | La traza se reusa en la escena 4 | Misma forma de barras escalonadas |
| 1 | Verificador | Las etapas de la traza de ShopWise son ilustración | Marcadas como tales; no se narran |
| 2 | Los siete | Lectura seguida sin hallazgos | Se da por bueno para animar |

## Cambios hechos al animar

| Escena | Qué cambió | Por qué |
|---|---|---|
| 3 | La casa va debajo de las herramientas y la elegida se dibuja de nuevo adentro, con una traza chica debajo; "sus máquinas" sobre el techo | El techo cruzaba la herramienta elegida; moverla desplazaba su ícono dos veces |
| 3 | La flecha de la conversación al asistente se borra con lo demás | Quedaba sola arriba al cambiar de plano |

## Comparación con lo renderizado

Sin render todavía (lo hace Felix con la voz: `README.md`, paso 4.8). Las capturas al final de cada frase y en orden inverso coinciden con este guion visual, plano por plano.
