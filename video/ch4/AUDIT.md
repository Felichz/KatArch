# Auditoría pedagógica · Capítulo 4 · Cuánta maquinaria comprar

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia que nunca diseñó un sistema entero, no vio el capítulo escrito y no puede pausar.

Los segundos se estiman a 2,2 palabras habladas por segundo (se cuentan las palabras de `say` cuando existe).

## 1. El guion anterior (8 escenas, 513 palabras, unos 3:45)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (17 s) | "una pieza o muchas" (monolito frente a microservicios, sin nombrarlos); la trampa, anunciada | 7 s; 8 s | No: "la decisión madre" llega sin decir qué es una pieza | No: "pieza" queda abstracta | No | Sí | Gancho correcto, pero da por sabido qué es un monolito y qué son los microservicios |
| trap (36 s) | Entity Trap; Richards y Ford; componente y servicio; servicio CRUD (solo en pantalla); por qué falla; acciones de actores | Entity Trap 7 s, antes del caso; CRUD 0 s hablado; por qué falla 11 s; acciones de actores 5,5 s | **No**: la primera frase es el nombre en inglés | La trampa sí, en una línea. CRUD y "acciones de actores", no | Sí para la trampa (la compra cruza las cinco cajas). No para la salida: no se dice por qué las acciones de actores arreglan el problema | Nodos bien sincronizados. Los chips "agendar" y "cancelar" aparecen sin que la voz los diga | Seis conceptos en 36 s. La salida de la trampa es un nombre sin contenido. Falta el vínculo con el capítulo: la trampa lleva a microservicios sin hacer la cuenta |
| count (21 s) | El número del capítulo 1 (recuerdo); cuatro restricciones duras | Número 6 s; restricciones 9,5 s **en una sola frase**, unos 2,4 s cada una | Sí | Sí, en las tarjetas | No: no se dice qué consecuencia tiene cada restricción. AWS no pesa en esta decisión | **No**: cuatro tarjetas con unas 50 palabras en 9,5 s | Lista de cuatro en una línea. Las tarjetas no se alcanzan a leer |
| valuemap (32 s) | ADR 002; los cuatro estilos (micro-kernel y monolito modularizado, sin definir); "atributo de calidad"; la escala de ++ a −−; diez atributos; "piénsalo tú"; la respuesta; la regla del contexto | ADR 6 s, sin recordar qué es; la tabla de 40 celdas aparece en unos 6 s; la escala, 0 s hablados (solo la leyenda); la respuesta 7 s; la regla 4,5 s | No: la tabla llega antes de cualquier criterio para leerla | **No**: ni micro-kernel, ni monolito modularizado, ni atributo de calidad, ni la escala | **No**: "pierden justo en deploy e integridad" sin decir por qué esas filas importan para Farmacy Food | **No**: 40 celdas mientras la voz ya habla de otra cosa | **La falla principal del capítulo.** El "piénsalo tú" llega sin herramientas: lo único que sabe el espectador es que los microservicios ganan en la tabla, así que la respuesta "correcta" lo contradice sin explicación |
| modmono (37 s) | Monolito modular; fronteras estrictas; contratos ("como si hubiera red"); telemetría; extracción; "la frontera ya existía"; gran bola de lodo | Monolito modular 8,6 s; contratos 8,2 s; telemetría y extracción 8,2 s juntas; frontera 4,5 s; bola de lodo 7,3 s | Parcial | El monolito modular sí. Contrato, telemetría y bola de lodo, no | No se explica para qué sirve fingir una red. La telemetría aparece como palabra suelta | Las animaciones son buenas, pero cada concepto dura unos 7 s | Cinco ideas fuertes en 37 s: es el núcleo del capítulo y pasa a la carrera |
| board (31 s) | La pizarra y su fecha; núcleo Menu con extensiones (plug-ins); 4 núcleos / 8 GB; pieza de 1 núcleo / 2 GB; mensajes; post-it | Unos 8 s cada detalle | — | Plug-in, LoadBalancer y JAR, sin definir (los dos últimos solo en pantalla) | La conclusión ("esto ya es el monolito modular") queda implícita | **No**: el post-it tiene unas 30 palabras y su línea dura 5,5 s | Evidencia secundaria cargada de números. No enseña nada nuevo |
| fork (33 s) | Los dos extremos descartados y sus razones; punto medio deliberado; Myagis-Forest con Docker; la primera ley | Dos razones en una línea de 21 palabras (unos 5 s cada una); Myagis 7 s; ley 8,6 s | — | "Modelo de dominio estable" y Docker, sin definir | Sí, pero comprimido | Las tres citas aparecen con 1 s de diferencia | Mezcla dos ideas en una escena. La mejor razón del equipo ("todavía no existe un modelo de dominio estable") queda escondida |
| outro (28 s) | La pregunta reformulada; 42 comidas; adelanto del capítulo 5 | Pregunta 14 s; 42 comidas 6 s | — | Sí | Sí | Sí | No repasa las ideas del capítulo (trampa, cómo leer la tabla, monolito modular y extracción) |

### Dónde se pierde el espectador tipo

- **"¿Una pieza de qué?"** El capítulo nunca define monolito ni microservicios. El capítulo 2 los nombra de pasada, y aquí se dan por sabidos.
- **"¿Qué es la Entity Trap?"** El nombre en inglés llega antes del caso. Tampoco se dice quiénes son Richards y Ford, aunque el capítulo 2 ya los presentó con la primera ley y se podía recordar.
- **"¿Qué es un servicio CRUD?"** Está escrito en cada caja y nadie lo explica.
- **"¿Qué son 'acciones de actores' y por qué arreglan el problema?"** Es un nombre, sin definición ni ejemplo de por qué un cambio toca un solo lugar.
- **"¿Qué tiene que ver la trampa con elegir un estilo?"** Falta decir lo esencial: cortar por sustantivos ya te da cinco servicios, o sea, microservicios sin haber hecho la cuenta.
- **"¿Por qué me importan estas cuatro restricciones? ¿Qué cambia AWS?"** No se dice la consecuencia de ninguna.
- **"¿Qué es un ADR? ¿Qué es un atributo de calidad? ¿Qué significan ++ y −−?"**
- **"¿Qué es un micro-kernel? ¿El monolito modularizado no es lo mismo que el monolito modular?"** La tabla dice "modularizado" y la decisión dice "modular", y ninguno se define antes de la pregunta.
- **"Si los microservicios ganan en la tabla, ¿por qué la respuesta es otra?"** El "piénsalo tú" se pregunta antes de dar el criterio para responder.
- **"¿Por qué pesan justo el deploy y la integridad?"** No se dice: equipo pequeño con prisa, y pagos que no se pueden cobrar dos veces.
- **"¿Qué es un contrato? ¿Para qué fingir una red?"**
- **"¿Qué es la telemetría? ¿Quién decide extraer, y cuándo?"**
- **"¿Qué es una gran bola de lodo?"**
- **"¿Por qué me muestran núcleos y gigas? ¿Qué es un JAR o un LoadBalancer?"** (en la pizarra)
- **"¿Qué es un modelo de dominio estable?"** (en el contrapunto)
- **"¿Qué me llevo?"** No hay un repaso final.

## 2. El plan

### Las ideas esenciales del capítulo

1. **No cortes por sustantivos.** La Entity Trap te da un servicio por cada sustantivo, y con eso eliges microservicios sin hacer ninguna cuenta. El equipo cortó por lo que hacen los actores.
2. **La tabla no decide sola.** Un mapa de valores se lee por partes, y el contexto le da peso a cada fila. Con menos de una petición por segundo, la escalabilidad casi no pesa. El deploy (equipo pequeño y con prisa), la integridad (pagos) y la modificabilidad (un negocio que todavía prueba ideas) pesan mucho. La única columna positiva en las tres es el monolito modularizado.
3. **Un monolito modular se diseña para extraer después.** Por fuera es un solo deploy. Por dentro tiene módulos que se hablan por contratos, "como si hubiera red". Cuando la telemetría lo pida, un módulo sale como servicio sin reescribir a los demás: se compra maquinaria cuando los números la piden. El precio es la disciplina, o se termina en una gran bola de lodo.

El cierre ata las tres a la lección transferible: la pregunta no es "¿monolito o microservicios?", sino qué volumen, qué equipo y cuánto cuesta cada estilo.

### Qué recibe más espacio

- **Los dos estilos extremos, definidos antes de todo** (escena nueva `styles`, unos 30 s). Con el caso primero (lo que el sistema hace) y la idea de que cada pieza es maquinaria que se paga.
- **La trampa, en dos escenas** (unos 85 s). Primero el caso y el dolor, después el nombre. Se agrega la consecuencia: elegiste microservicios sin hacer la cuenta. Después, la salida con su porqué: un cambio en "pagar" toca un solo lugar.
- **El mapa de valores, en dos escenas** (unos 2 minutos). En `read` se lee la tabla por partes: qué es un ADR (recuerdo del capítulo 3), las columnas (cada estilo con su mini-dibujo y su definición), las filas (qué es un atributo de calidad) y las celdas (la escala). Después llega la tensión: los microservicios juntan más "++". En `weigh` se pesa cada fila con un hecho del caso: primero una que casi no pesa (escalabilidad) y después tres que pesan mucho. Recién entonces va el "piénsalo tú", que el espectador puede responder mirando 12 celdas. Cierra con la respuesta y la regla.
- **Por qué no microservicios desde el día uno**, con la razón escrita del equipo (escena `why`). El modelo de dominio se define con ejemplos del caso: qué es una orden, una suscripción, un retiro.
- **El monolito modular, en tres escenas**: cómo es por dentro (`modmono`), para qué sirven los contratos y la telemetría (`extract`), y su precio (`price`). Se definen contrato, telemetría y gran bola de lodo.
- **Un repaso final** de las tres ideas, cada una con su línea y su pausa.

### Qué se recorta

- **La pizarra** (escena `board`): es evidencia secundaria, con números de máquinas y un post-it largo que no enseñan un concepto nuevo. El curso escrito la cubre.
- **El contrapunto de Myagis-Forest** (escena `fork`): el capítulo 2 ya lo contó, y aquí partía la escena en dos ideas.
- **AWS** como restricción: no pesa en la elección de estilo. Quedan tres restricciones, cada una con su consecuencia.
- **El recorrido de los diez atributos**: se recorren cuatro filas con su porqué. Las demás se ven, pero la voz no las enumera.
- **La cita del monolito puro** ("simplificación de más"): su razón queda cubierta por la fila de modificabilidad.
- Los chips "agendar" y "cancelar", y los detalles de JAR, LoadBalancer, núcleos y gigas.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 4 | Recuerda el número (42 comidas, menos de una petición por segundo) y plantea la pregunta |
| 2 | `styles` | Las opciones | Monolito y microservicios, definidos con el caso. Cada pieza es maquinaria que se paga |
| 3 | `trap` | La trampa | Caso (sustantivos, cinco servicios), dolor (la compra cruza las cinco), nombre (Entity Trap) y consecuencia (microservicios sin cuenta) |
| 4 | `actions` | La trampa | La salida: los actores y sus acciones. Un cambio en "pagar" toca un solo lugar. Regla |
| 5 | `count` | La cuenta | El volumen y tres restricciones, cada una con su consecuencia. Síntesis: poco volumen, poca gente, poco dinero |
| 6 | `read` | El mapa de valores | Cómo leer la tabla del ADR 002: columnas, filas y celdas. La tensión: los microservicios juntan más "++" |
| 7 | `weigh` | El mapa de valores | El peso de cada fila según el caso, el "piénsalo tú" sobre tres filas, la respuesta y la regla |
| 8 | `why` | La decisión | La razón escrita del equipo contra los microservicios desde el día uno: sin un modelo de dominio estable, se corta a ciegas |
| 9 | `modmono` | La decisión | El monolito modular por fuera y por dentro: fronteras, mensajes, contrato, "como si hubiera red" |
| 10 | `extract` | Diseñado para crecer | La telemetría (recuerdo del capítulo 3), la extracción del catálogo y "la frontera ya existía". Comprar maquinaria cuando los números la piden |
| 11 | `price` | El precio | La gran bola de lodo, definida, y la disciplina como contrapeso |
| 12 | `outro` | Para llevarte | Repaso de las tres ideas, la pregunta bien planteada y el adelanto del capítulo 5 |

## 3. El guion nuevo (12 escenas, 950 palabras)

**Duración estimada:** a 2,2 palabras por segundo, más las pausas escritas (unos 25 s), da unos 7:35. Al ritmo que tuvo la voz real en el render anterior de este capítulo (513 palabras en 225 s, contando los silencios entre frases, o sea, 2,28 palabras por segundo), da unos 7:20. `node tools/timing.mjs estimate` da 494 s (8:14), porque su narrador simulado es más lento que la voz real. Queda un poco por encima de los 7 minutos. Antes de quitar más, se recortaron la pizarra y el contrapunto: lo que sigue sosteniendo las tres ideas centrales.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (18 s) | Recuerdo del número del capítulo 1; la pregunta del capítulo | 9 s; 7 s | Sí: el número antes de la pregunta | Sí | — | Sí: el 42 cuenta y queda, y cada chip llega con su frase | Correcta |
| styles (34 s) | Monolito; microservicios; "cada pieza es maquinaria" | Monolito 13 s (con la frase del caso); microservicios 11 s; costo 9 s. **La idea "una pieza o muchas" recibe 34 s en total**, y los dos estilos vuelven en `read` con su dibujo | Sí: primero lo que el sistema hace, después cada forma de armarlo | Sí, en palabras simples | Sí: cada pieza es un servidor que pagar y vigilar | Sí: las tres funciones, después cada panel y después los servidores, en orden | Correcta |
| trap (51 s) | Entity Trap; su consecuencia | **Entity Trap 51 s**: caso 23 s, dolor 14 s, nombre 8 s, consecuencia 5 s | **Sí**: el nombre llega en la sexta frase | Sí: "un componente por cada sustantivo" | Sí: la compra cruza las cinco cajas, y un cambio toca cinco servicios y cinco deploys | Sí: los sustantivos se subrayan uno por uno y los nodos caen en orden | Correcta. El término "CRUD" se quitó, y la caja dice "servicio · su dato" |
| actions (35 s) | Actor; acción; la regla de corte | **Salida de la trampa 35 s**: actor 6 s, acción y por qué 8 s, regla 8 s | Sí: las cajas tachadas, después el comprador | Sí: "actor: quien usa el sistema", con verbos del caso | Sí: un cambio en "pagar" toca un solo lugar | Sí: la regla queda 7 s en pantalla con su pausa | Correcta. Remite al capítulo 5 sin abrir el tema |
| count (33 s) | Las tres restricciones (recuerdo) | Volumen 10 s; cada restricción, en su frase, de 4 a 7 s; síntesis 7 s | Sí | Sí | Sí: cada restricción con su consecuencia | Sí: una tarjeta por frase, con unas 8 palabras cada una | Correcta. Son recuerdos de contexto, así que no necesitan 20 s cada uno |
| read (56 s) | Mapa de valores; micro-kernel; monolito modularizado; atributo de calidad; la escala de ++ a −− | **Leer el mapa, 56 s en total**: ADR 9 s (recuerdo), columnas 23 s (micro-kernel 5,5 s y monolito modularizado 6,5 s, cada uno con su dibujo), filas 8 s, celdas 7 s, tensión 16 s. Los atributos de calidad se definen aquí y en `weigh` se aplican fila por fila durante 64 s más | Sí: la tabla se arma por partes mientras se explica | Sí, todos | Se plantea la pregunta: ¿por qué no ganan los que juntan más "++"? | Sí: el espectador nunca tiene que leer la tabla entera. Un ejemplo de "++" y uno de "−−" quedan marcados. El conteo de "++" se muestra debajo de cada columna | Correcta |
| weigh (64 s) | Pesar cada fila según el contexto; "piénsalo tú"; la regla | **Pesar filas 64 s**: escalabilidad 15 s, deploy 7 s, integridad 7 s, modificabilidad 8 s, pregunta 9 s (con 3 s de silencio), respuesta 7 s, regla 8 s | Sí: cada fila con un hecho del caso antes de la regla | Sí: cada atributo se dice en palabras simples antes de pesarlo | Sí: menos de una petición por segundo, equipo pequeño con prisa, pagos que no se cobran dos veces, un negocio que todavía prueba ideas | Sí: la pregunta se responde mirando 12 celdas, con la tabla reducida a las tres filas | Correcta. El "piénsalo tú" llega después de dar las herramientas |
| why (25 s) | Modelo de dominio estable | **25 s** | Sí: ejemplos del caso (orden, suscripción, retiro) | Sí | Sí, con la razón escrita del equipo y su cita | Sí: la cita queda unos 7 s, con pausa | Correcta |
| modmono (36 s) | Monolito modular; frontera; contrato; "como si hubiera red" | **Monolito modular 36 s**: por fuera 13 s, por dentro 7 s, contrato 8 s, cita 8,5 s | Sí: el caso (equipo pequeño, presupuesto) antes del interior | Sí: el contrato se define como "un mensaje con un formato acordado" | Sí: cuida al equipo y al presupuesto | Sí: la columna derecha se llena frase a frase | Correcta |
| extract (39 s) | Telemetría (recuerdo del capítulo 3); extracción; "la frontera ya existía" | **Extracción 39 s** | Sí: primero un catálogo con carga alta, después la regla | Sí: "cada módulo mide la carga que recibe" | Sí: por eso se fingía una red, y por eso nadie más se reescribe | Sí: los medidores, el movimiento del catálogo y la ruta de mensajes van con la voz | Correcta. Cierra con la idea del título |
| price (25 s) | Gran bola de lodo; disciplina | **25 s** | Sí: el atajo antes del nombre | Sí: "todo depende de todo" | Sí: lo admite el propio ADR | Sí: una tarjeta por idea | Correcta |
| outro (39 s) | Repaso de las 3 ideas; la pregunta bien planteada; adelanto | Cada idea 6 a 9 s, con pausa; la pregunta 9 s | — | — | — | Sí: las tres tarjetas quedan juntas hasta el final del repaso | Correcta |

**Ningún concepto importante queda por debajo de unos 20 s.** Los dos conceptos breves (micro-kernel y monolito modularizado, unos 6 s cada uno) son columnas de la tabla. Se definen en una línea con su dibujo. El monolito modularizado recibe después tres escenas completas, y el micro-kernel no vuelve a ser necesario.

### Verificación

- `node tools/timing.mjs estimate`: 12 escenas, 67 líneas, 494 s estimados.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout. Contraste: 233 de 233 textos pasan WCAG AA. La única advertencia es la esperada de `#chrome`. Los avisos de superposición son los fundidos entre escenas.
- Capturas en `snapshots/peda`, `snapshots/peda2` y `snapshots/peda3` (al final de cada escena y en los momentos clave). Muestran lo que la voz dice en cada momento. A partir de ellas se corrigieron la fuente de la caja del monolito, la tarjeta del ADR que desbordaba, el tachado de los sustantivos y los cortes que tapaban el título del modelo de dominio.
