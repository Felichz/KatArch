# Auditoría pedagógica · Capítulo 7 · El viaje de una comida

La vara es `video/PEDAGOGY.md`. Los segundos se estiman a 2,2 palabras habladas por segundo, más las pausas del guion (`pauseAfter`). Se cuenta la forma hablada (`say`).

## 1. El guion anterior (8 escenas, 526 palabras, unos 4:35)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro | ninguno (retoma la pregunta del cap. 6) | 18 s en total | sí | n/a | n/a | sí | Bien. |
| cabo | suscriptor; meta 1.000 × 10 = 10.000 comidas por semana; "hasta ahora todo fue compra instantánea" | suscriptor 7 s · meta 15 s · contraste 3 s | sí | suscriptor sí; en pantalla aparece "Impulsor de negocio 1" sin definir | a medias: no dice que esas comidas ya están pagadas | sí | Aceptable. Jerga en pantalla, y el problema ("comidas pagadas días antes") queda implícito. |
| idea | pizarra "IDEA!!!"; presente vs. futuro comprometido; puntos de lealtad | pizarra 4,5 s · dos filas 9 s · lealtad 2 s | sí | "casilleros 1d, 2d, 3d" sin explicar | no: nunca dice por qué esa fila importa para lo que sigue | justo | Bonito pero decorativo; la lealtad es un detalle secundario metido en la misma frase. |
| agenda | 20 órdenes futuras; "piénsalo tú" con 4 opciones; agenda; trade-off (procesamiento vs. base inflada); 15 órdenes que reescribir; marcar prepagadas | caso 4,5 s · pregunta 5,5 s + 7 s de opciones + 3 s · elección 6,4 s · trade-off 6,4 s · 15 vs. 1: 9,5 s · prepagadas 3,6 s | sí para el caso; **no** para la pregunta | "agenda" se usa sin definir; "procesamiento" y "base de órdenes" sin explicar | a medias: "infla la base" sin decir por qué importa; "prepagadas" sin decir para qué | 28 palabras de opciones en unos 10 s: al límite | **Apurada.** La pregunta llega 5 s después del caso, antes de que el espectador sepa qué cuesta cada opción. La respuesta se da antes del razonamiento. La decisión central del capítulo recibe unos 26 s de razonamiento real. |
| cycle | cocinas que no trabajan 24/7; planificador; GetScheduledOrders; "proyección"; PrepareOrders; vocabulario de 4 palabras; qué es un evento y qué es publicarlo; OrderDispatched y sus 4 oyentes; despachada ≠ en el refrigerador; OrderPlacedInFridge; OrderAvailableForPicking; PIN; "ningún paso se adelanta" | unos 13 conceptos en 52 s: **4 s cada uno**. Línea 5: 26 palabras con dos nombres de eventos en inglés en 11,8 s | no: los nombres en inglés aparecen antes de saber qué es un evento | no: "planificador", "comando", "evento", "publica", "proyección" sin definir; GetScheduledOrders y PrepareOrders solo en pantalla, nunca dichos | no: por qué cada mañana (sí, rápido), pero no por qué la cocina publica en vez de llamar, ni por qué escucha cada oyente, ni por qué el aviso espera al refrigerador | no: 5 cajas de mensajes, 7 nodos y 4 chips en 52 s | **El agujero principal.** Es exactamente la queja del usuario: conceptos de golpe, sin digerir, en inglés, sin el porqué. |
| cancel | ventana de 30 s del cap. 6 vs. orden programada; "piénsalo tú": ¿quién no necesita enterarse?; respuesta: el catálogo | contraste 11 s · pregunta 8,7 s + 3 s · respuesta 6,8 s | sí | sí | a medias: "el dinero se pagó hace días" sin decir que eso implica un reembolso; el papel del catálogo (stock de los refrigeradores) no se fijó antes | sí | Aceptable, pero la pregunta depende de recordar algo que el video dijo de pasada. |
| refund | MealStockCanceled; ClaimRefund; "en paralelo"; RefundSuccessful; dos hechos separados; regla del día hábil siguiente; ejemplo del martes | 3 nombres en inglés en una línea de 22 palabras (10 s) · RefundSuccessful 5,5 s · dos hechos 6 s · letra chica 4,5 s · ejemplo 8 s | no | no: nunca dice por qué ClaimRefund es comando (azul) y RefundSuccessful es evento (verde) | no: "hechos distintos" sin decir para qué sirve; "día hábil siguiente" sin decir que la cocina ya cocinó a la mañana | el diagrama muestra "Get Scheduled Orders" y "Cancel Order by User", que la voz nunca menciona | **Apurada.** Cinco conceptos en 36 s y dos ideas distintas (el reembolso y la letra chica) en la misma escena. |
| outro | "tres eventos y cuatro palabras"; "modela el futuro como una regla que genera hechos"; puente al cap. 8 | 6 s · 8 s · 8 s | n/a | "regla que genera hechos" es abstracto | no | sí | El repaso repite nombres en vez de ideas: no deja nada que el espectador pueda llevarse. |

### Dónde se pierde el espectador tipo

1. **El ciclo de eventos (escena `cycle`).** Escucha "GetScheduledOrders", "PrepareOrders", "OrderDispatched", "OrderPlacedInFridge" y "OrderAvailableForPicking" en 52 segundos. Nadie le dijo qué es un evento ni por qué el sistema se arma como una cadena de mensajes. Los colores azul y verde nunca se explican.
2. **"La cocina publica OrderDispatched, y lo escuchan cuatro."** ¿Por qué publica en vez de llamar a cada uno? ¿Qué hace cada oyente con eso? El guion lista los cuatro en una línea, sin el porqué.
3. **"Despachada no quiere decir en el refrigerador."** La frase tiene 3,6 s. Nunca se dice qué pasaría si el aviso llegara antes: el suscriptor iría a un refrigerador vacío.
4. **La agenda.** La pregunta "¿cómo guardarías esas veinte órdenes?" llega antes de cualquier herramienta. El espectador no sabe qué significa "guardar" una orden futura, qué cuesta cambiarla ni qué es "procesar". La respuesta llega sin razonamiento, y el trade-off se despacha en dos frases.
5. **"Marcar las órdenes como prepagadas."** ¿Por qué hace falta? Porque una orden normal se cobra al confirmarse, y esta ya se pagó: sin la marca, pagos la cobraría dos veces. El guion no lo dice.
6. **El reembolso.** ¿Por qué ClaimRefund es un comando y RefundSuccessful un evento? ¿Para qué separar "pedí el dinero" de "el dinero volvió"? El razonamiento real del equipo (el negocio decide cómo devolver; soporte necesita saber si se devolvió) no aparece.
7. **Lo que da por sabido.** Qué es un "planificador", una "proyección", una "orden programada", el "PIN", el "reporting". Que el catálogo lleva el stock de cada refrigerador (y es la clave para responder el segundo "piénsalo tú").
8. **Ruido.** Puntos de lealtad, la regla del día hábil siguiente y el vocabulario de cuatro palabras de la cocina son detalles válidos, pero compiten con las ideas centrales en el mismo tiempo.

### Lo que preguntaría si pudiera

- "¿Qué es un evento, y en qué se diferencia de un comando?"
- "¿Por qué la cocina no llama directamente al catálogo y al usuario?"
- "¿Por qué no avisar al suscriptor apenas sale la comida?"
- "¿Por qué la agenda es mejor, si crear todo de antemano es más simple?"
- "¿Qué es eso de prepagada, y por qué es un costo?"
- "¿Por qué el catálogo no se entera de la cancelación?"
- "¿Por qué el reembolso son dos mensajes y no uno?"

## 2. El plan

### Las ideas esenciales (3)

1. **El futuro se guarda como una agenda que genera las órdenes de cada día**, no como una pila de órdenes creadas de antemano. Es un trade-off con el razonamiento real del equipo: crear todo simplifica el procesamiento pero infla la base y vuelve caro cada cambio; la agenda abarata los cambios pero obliga a marcar las órdenes como prepagadas. Se eligió la agenda porque cambiar y cancelar es lo normal en un suscriptor.
2. **El viaje es una cadena de comandos y eventos.** Un comando pide algo y puede fallar; un evento anuncia un hecho y lo escucha quien quiera. La cocina publica un evento porque es un sistema externo que el equipo no puede modificar.
3. **Nada se anuncia antes de que pase.** Solo el refrigerador puede decir "llegó"; solo pagos puede decir "el dinero volvió". La cancelación usa las mismas piezas: el catálogo no se entera porque la comida todavía no existe, y el reembolso es un pedido (comando) más un hecho (evento).

### Qué gana espacio

- La agenda pasa de 48 s a unos 106 s, en dos escenas: el ejemplo trabajado con un "piénsalo tú" que llega **después** de mostrar los dos caminos y el cambio de menú, y una escena aparte para el trade-off, el porqué de la elección y la regla general.
- Comando y evento reciben una escena propia (31 s) antes de que aparezca el primer nombre en inglés, atada al alfabeto del capítulo 6.
- El ciclo de 52 s se parte en tres escenas (136 s en total): la mañana (planificador y comandos), el despacho (qué es publicar un evento, por qué, y qué hace cada oyente) y el refrigerador (por qué el aviso espera al hecho físico).
- El catálogo queda definido como "cuántas comidas hay en cada refrigerador" en la escena del despacho, así el segundo "piénsalo tú" se puede responder con lo que ya se vio.
- El reembolso explica por qué ClaimRefund es comando (el negocio decide cómo devolver: a la tarjeta o a una cuenta virtual) y para qué sirven dos hechos separados (soporte siempre sabe si se devolvió).
- Cada nombre en inglés se dice espaciado (`say`) y va seguido de su traducción: "Order Dispatched, orden despachada".

### Qué se recorta (el curso escrito lo cubre)

- La escena de la pizarra "IDEA!!!" y los puntos de lealtad: el `cabo` ya plantea el problema ("diez mil comidas por semana, ya pagadas").
- El vocabulario de cuatro palabras de la cocina (aceptado, despachado, no puedo, demorado): solo importa "despachado", que pasa a ser el evento.
- La "proyección" (CQRS) que aparecía en pantalla sin decirse.
- La regla del día hábil siguiente y el ejemplo del martes.
- Los mensajes "Get Scheduled Orders" y "Cancel Order by User" del diagrama de cancelación: la app manda "cancela el jueves", en castellano y dicho por la voz.

### Las escenas nuevas (11)

| # | id | Kicker | Qué hace |
| - | - | - | - |
| 1 | `intro` | Capítulo 7 | Retoma la pregunta del capítulo 6 y presenta el viaje de ida y vuelta. |
| 2 | `cabo` | El cabo suelto | El suscriptor, la meta de 10.000 comidas por semana ya pagadas, y la pregunta: ¿cómo llega una comida pagada días antes? |
| 3 | `agenda` | La agenda | Ejemplo trabajado: 20 almuerzos futuros, qué es una orden, los dos caminos, el cambio de menú, "piénsalo tú" y la respuesta (15 órdenes contra 1 cambio). |
| 4 | `precio` | La agenda | Trade-off definido; el costo de cada camino con los hechos del caso; por qué el equipo eligió la agenda; la regla general (regla contra pila). |
| 5 | `alfabeto` | Del calendario al refrigerador | Comando y evento en palabras simples (azul pide, verde anuncia) y la idea de cadena. |
| 6 | `manana` | Del calendario al refrigerador | Por qué cada mañana (las cocinas no trabajan 24/7); el planificador; GetScheduledOrders; dónde trabaja la agenda; PrepareOrders. |
| 7 | `despacho` | Del calendario al refrigerador | OrderDispatched; qué es publicar; por qué la cocina publica (sistema externo); cada oyente con su motivo; síntesis. |
| 8 | `heladera` | Del calendario al refrigerador | Despachada no es "en el refrigerador": el PIN anticipado llevaría a un refrigerador vacío; OrderPlacedInFridge; OrderAvailableForPicking; la regla de la cadena. |
| 9 | `cancel` | El arrepentimiento | Contraste con los 30 s del cap. 6; el caso (cancela el jueves, el lunes); "piénsalo tú"; el catálogo no se entera; la frase del equipo. |
| 10 | `refund` | El arrepentimiento | Cada uno con su mensaje: MealStockCanceled al reporting, ClaimRefund a pagos (y por qué es comando), RefundSuccessful a la app; dos hechos separados y para qué sirven. |
| 11 | `outro` | Para llevarte | Repaso de las tres ideas, una por tarjeta, y el puente al capítulo 8. |

## 3. El guion nuevo (11 escenas, 950 palabras habladas)

Duración estimada: unos **7:35** a 2,2 palabras por segundo, con pausas y transiciones (el narrador simulado de `tools/timing.mjs` da 7:59, porque habla más lento que la voz real). Es más largo que el objetivo de 7 minutos: el recorte ya sacó todo lo secundario, y lo que queda son las tres ideas con su caso, su definición y su porqué. Quitar más volvería a apurar el ciclo de eventos, que era el problema principal.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro | ninguno | 18 s | sí | n/a | n/a | sí (título 3 s más el resto de la escena) | Bien. |
| cabo | el suscriptor y su problema: comidas pagadas antes de cocinarse | **28 s** (suscriptor 8 s, meta 10 s + pausa, contraste y pregunta 10 s) | sí | sí: "paga por adelantado un menú semanal" | sí: la meta del negocio y que esas comidas ya están pagadas | sí: la tarjeta de la meta se arma número por número | Bien. |
| agenda | orden (término menor); los dos caminos; el costo de cambiar | orden 5,5 s · dos caminos **17 s** + pausa · cambio, pregunta y respuesta **28 s** (con 3 s de anillo) | sí: 20 almuerzos concretos antes de "agenda" | sí: "orden: un pedido real, que una cocina prepara"; "agenda: guardar solo el menú y que cada mañana el sistema genere la orden del día" | sí: 15 órdenes que reescribir contra un solo cambio | sí: los paneles quedan 40 s en pantalla; la pregunta tiene 4 s de voz más 3 s de pausa | Bien. El "piénsalo tú" llega después de mostrar los dos caminos y el cambio de menú. |
| precio | trade-off; costo de crear de antemano; costo de la agenda; por qué se eligió; la regla general | trade-off 7 s · costo A **14 s** · costo B **10,5 s** · elección **9 s** + pausa · regla **10 s** + pausa. La decisión completa (agenda + precio) recibe **106 s** | sí: cada costo sale del caso (10.000 comidas por semana; órdenes ya pagadas) | sí: "ganar algo a cambio de pagar otra cosa"; "prepagada… para no cobrarlas dos veces" | sí, con el razonamiento escrito del equipo (info-models: bloat, multiple updates, pre-paid mark) | sí: cada "+" y "−" aparece cuando se dice y queda hasta el final de la escena | Bien. |
| alfabeto | comando; evento; cadena | comando **8,6 s** · evento **9,2 s** + pausa · cadena 6 s · (31 s la escena, y cada escena siguiente vuelve a nombrar comando o evento al usarlo) | se ata al alfabeto del cap. 6, que el espectador ya vio | sí, en una línea cada uno | sí: un comando puede fallar; un evento ya pasó y lo escucha quien quiera | sí: las dos tarjetas quedan 30 s; la cadena anticipa el viaje | Bien. Comando y evento suman unos 50 s contando su uso en las escenas 6 a 10. |
| manana | por qué cada mañana; planificador; GetScheduledOrders; dónde trabaja la agenda; PrepareOrders | cocinas 24/7 **12 s** · planificador 6,4 s · GetScheduledOrders 7,7 s · agenda 5,5 s · PrepareOrders 9 s + pausa (el ciclo de la mañana: **41 s**) | sí: el dato de las cocinas va antes que el planificador | sí: "un componente que trabaja una vez por día"; cada comando con su glosa en pantalla | sí: ADR 013 (la cocina prepara lo que recibe al empezar la jornada) | sí: un mensaje por vez, con glosa | Bien. |
| despacho | publicar un evento; por qué la cocina publica; los cuatro oyentes | evento y qué es publicar **15 s** · por qué **10,5 s** + pausa · oyentes **17 s** (uno por frase) · síntesis 5 s + pausa. Escena: **48 s** | sí | sí: "no le habla a nadie en particular: anuncia lo que pasó, y quien tenga interés, escucha" | sí: la cocina es un sistema externo y queda fuera de alcance modificarlo; cada oyente con su motivo | sí: cada oyente se enciende con su motivo cuando la voz lo nombra | Bien. Antes eran 7,7 s para todo esto. |
| heladera | despachada ≠ en el refrigerador; OrderPlacedInFridge; OrderAvailableForPicking; la regla de la cadena | la trampa y su consecuencia **13,6 s** · solo el refrigerador sabe 5,5 s · los dos eventos **17 s** + pausa · regla **10,5 s** + pausa. Escena: **47 s** | sí: primero el suscriptor frente a un refrigerador vacío, después el evento | sí: cada evento con su traducción; el PIN, "el código para retirarla" | sí: el aviso anticipado mandaría al suscriptor a un refrigerador vacío | sí: un evento por vez, encadenados de izquierda a derecha | Bien. Antes: 15 s. |
| cancel | la cancelación de una orden programada; por qué el catálogo no se entera | contraste **16 s** · caso 5 s · pregunta 7 s + 3 s · respuesta **8 s** + pausa · frase del equipo 6 s. Escena: **46 s** | sí: "el lunes cancela el almuerzo del jueves" | sí | sí, con la frase del equipo: "cancela algo que todavía no existe" | sí: cada opción aparece con su función en pantalla cuando la voz la nombra | Bien. El papel del catálogo ya se fijó en `despacho`, así que la pregunta tiene respuesta. |
| refund | MealStockCanceled; ClaimRefund y por qué es comando; RefundSuccessful; dos hechos separados | cada uno se entera 7,7 s · MealStockCanceled 6 s · ClaimRefund 6 s + por qué **9,5 s** · RefundSuccessful 7,7 s · dos hechos y para qué **14 s**. Escena: **51 s** | sí: sigue la cancelación del jueves | sí: cada nombre con su traducción | sí: el negocio decide cómo devolver (tarjeta o cuenta virtual); soporte siempre sabe si se devolvió | sí: un mensaje por frase; los dos hechos se resumen abajo | Bien. |
| outro | repaso de las 3 ideas | una tarjeta por idea, **8,5 a 9,6 s** cada una con pausa; puente al cap. 8, 8,6 s | n/a | n/a | n/a | sí: las tres tarjetas quedan juntas al final | Bien. |

**Ningún concepto importante recibe menos de unos 20 segundos.** Lo que tiene menos tiempo son términos de una línea (orden, trade-off, planificador, PIN), definidos en una frase y usados después en varias escenas.

## 4. Verificación

- `node tools/timing.mjs estimate`: 11 escenas, 62 líneas, 479 s con el narrador simulado.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout; contraste 106/106 (WCAG AA). Queda la advertencia esperada de `#chrome` y avisos informativos: el cruce entre escenas y una línea corta que baja del evento al cable.
- Capturas en `snapshots/peda` (final de cada línea clave), `snapshots/peda-mid` (mitad de escena) y `snapshots/peda-fix` (después de los arreglos). Muestran lo que dice la voz en cada momento. En las capturas se corrigieron tres cosas: un instante en blanco al pasar a los dos caminos, un chip que pisaba el nodo de pagos y un título que no coincidía con la voz.
