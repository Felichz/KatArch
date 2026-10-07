# Auditoría pedagógica · Capítulo 8 · Aterrizar en la nube

La vara es `video/PEDAGOGY.md`. El espectador tipo es un desarrollador con un par de años de experiencia. Nunca diseñó un sistema entero, no conoce la jerga de redes en la nube, no vio el capítulo escrito y no puede pausar.

Los segundos se estiman a 2,2 palabras habladas por segundo. Cuando existe `say`, se cuentan sus palabras.

## 1. El guion anterior (8 escenas, 529 palabras, unos 4:20)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (10 s) | El salto de la lógica a los servidores | 8 s | Sí | Sí | — | Sí, pero el título se va enseguida | Correcta, aunque muy corta. No anuncia qué preguntas responde el capítulo |
| vpc (39 s) | AWS; región; us-east; VPC; rango de direcciones (CIDR); zona de disponibilidad; subred pública y privada; tabla de rutas; gateway; red local; event store | AWS y región 9 s juntas; VPC 6,4 s; zonas 7,3 s; subredes y tabla de rutas 6,8 s juntas; gateway y event store 9 s juntos. **Unos 3,5 s por concepto** | **No**: abre con "El equipo eligió AWS", sin decir qué problema resuelve una red privada | VPC, a medias ("una red privada"). Zona de disponibilidad, a medias ("un edificio"). Región, subred, tabla de rutas, gateway y event store: **no** | No: nunca dice por qué conviene una subred privada, ni qué se protege ahí, ni por qué dos zonas y no una | **No**: cada línea agrega un recuadro, chips con notación CIDR (`10.0.0.0/16`, `0.0.0.0/0 → igw-1`) y cinco nodos en 9 s | **La falla principal del capítulo.** Diez términos de redes en 39 s. Es la escena que pide el usuario: nombra, no explica |
| gate (39 s con la pausa) | Identidad del visitante; balanceador (sin definir); "piénsalo tú"; Cognito; cabeceras de identidad; federación con Google y Facebook | Pregunta 3 s; "piénsalo tú" 11 s más 3 s de pausa; Cognito y balanceador 8 s juntos; cabeceras 7 s; federación 6 s | Parcial: la pregunta "¿quién es?" llega sin un caso concreto (¿quién pide qué?) | Balanceador, Cognito, token y cabeceras: **no** | La respuesta se da sin razones: no dice por qué fallan las otras tres opciones | Las opciones sí. El chip "n copias del mismo control" aparece y se va sin que la voz lo explique | **El "piénsalo tú" llega sin herramientas.** El espectador no sabe qué es un balanceador, y esa es la respuesta correcta. La federación es un detalle suelto |
| trust (24 s) | Confianza cero; token; claims; proceso; mudar un módulo | Confianza cero 5,5 s, **nombrada antes del caso**; token y claims 6,8 s; la mudanza 6,8 s | **No**: la primera frase es el nombre | Token y claims: **no**. Confianza cero, apenas ("también se piden credenciales") | A medias: se ve la ganancia (la mudanza), pero no la tensión ("¿para qué, si están en el mismo programa?") ni el precio | Sí | Concepto central del capítulo resuelto en 24 s, sin la pregunta que lo vuelve interesante |
| services (41 s) | t3.medium; "1..N"; cola administrada; Amazon MQ; stream; consumidores; espagueti con albóndigas; stream basado en log; productor y consumidor; infraestructura como código; CloudFormation; drift (en pantalla) | Unos **3,5 s por concepto**. CloudFormation, 4,5 s | No | Cola, stream, log, productor, consumidor, infraestructura como código y drift: **no** | No: ni por qué una cola entre módulos, ni por qué un log, ni por qué escribir la red como código | **No**: el mapa tiene 4 nodos, 3 chips, 2 bandas y 3 consumidores en 15 s. La tarjeta de CloudFormation, con 6 líneas de código y una nota, dura 4,5 s | Lista de cuatro temas, cada uno con su jerga, en 41 s. Ninguno se entiende |
| scale (36 s) | Escala vertical; escala horizontal; telemetría; umbral de CPU y memoria; la trampa inversa | Vertical y horizontal 6,4 s juntas; "primero vertical" 5,9 s; umbral 12,7 s; trampa 7,7 s | Sí: "todo sistema crece" | Vertical y horizontal, sí (en una frase). Telemetría y CPU, no | **No**: "eligió primero vertical" sin decir por qué (barato, rápido, menos de una petición por segundo) | La tarjeta de la trampa tiene unas 30 palabras y dura 7,7 s | Bien encaminada, pero la decisión llega sin su porqué |
| extract (38 s) | Extracción de un módulo; Menu Catalog; clonar el lado de consultas; filtrado; cache; balanceador; dominio; cuello de botella; capa anticorrupción (solo en pantalla); cliente sintético; camino crítico | Extracción 8 s; clonar, filtrado y cache 9 s juntos; lecturas frente a reglas 7 s; cliente sintético y camino crítico 7 s juntos; "se entera" 6 s | No | Cache, dominio, cliente sintético y camino crítico: **no**. La capa anticorrupción aparece escrita y nadie la menciona | A medias: "servir lecturas, no aplicar reglas" es la razón, pero no hay caso que muestre por qué hay más lecturas que cambios | **No**: tres diagramas distintos en 38 s, y uno de ellos tiene 12 elementos | Dos temas distintos (extraer y medir) apretados en una escena |
| outro (17 s) | Repaso; adelanto del capítulo 9 | Repaso 9,5 s, **en una sola frase** | — | Sí | — | Sí | El repaso apila las tres ideas en una frase y no les da pausa |

### Dónde se pierde el espectador tipo

- **"¿Para qué quiero una red privada?"** El capítulo nunca plantea el problema: que hay piezas, como los pagos, que nadie de afuera debería poder tocar.
- **"¿Qué es una VPC? ¿Qué es una región? ¿Qué es us-east?"**
- **"¿Qué es `10.0.0.0/16`?"** La notación CIDR está en pantalla todo el tiempo y nadie la explica.
- **"¿Qué es una zona de disponibilidad? ¿Por qué dos y no una, o tres?"**
- **"¿Qué es una subred? ¿Qué la hace pública o privada?"**
- **"¿Qué es una tabla de rutas? ¿Y un gateway?"**
- **"¿Qué es el event store, y por qué va en la privada?"** Se nombra en la última línea de la escena, sin decir qué guarda.
- **"¿Qué es un balanceador?"** Es la respuesta del "piénsalo tú", y no se define en ningún momento del capítulo.
- **"¿Por qué no en cada módulo, o en la app?"** La respuesta no descarta las otras opciones con razones.
- **"¿Qué es Cognito? ¿Lo construyeron ellos?"**
- **"¿Qué es un token? ¿Qué son los claims? ¿Qué es una cabecera?"**
- **"Si los módulos están en el mismo programa, ¿para qué se piden credenciales?"** Esa es la pregunta que hace interesante a la confianza cero, y el guion no la plantea.
- **"¿Qué es una cola? ¿Qué es un stream basado en log? ¿Qué es el espagueti con albóndigas?"**
- **"¿Qué es t3.medium? ¿Qué es 1..N? ¿Qué es CloudFormation? ¿Qué es drift?"**
- **"¿Por qué escalar vertical primero?"** Falta el porqué del caso: menos de una petición por segundo, equipo chico y poco dinero.
- **"¿Qué es la telemetría? ¿Qué es la CPU?"** (para la voz, "ce pe u" sin más)
- **"¿Qué es una capa anticorrupción?"** Aparece escrita en la extracción y nadie la explica. Es la queja literal del usuario.
- **"¿Qué es una cache? ¿Por qué se clona solo el filtrado?"**
- **"¿Qué es un cliente sintético? ¿Qué es el camino crítico?"**
- **"¿Qué me llevo?"** El repaso es una sola frase sin pausas.

## 2. El plan

### Las ideas esenciales del capítulo

El capítulo se ordena alrededor de tres preguntas, anunciadas en la intro y respondidas en el repaso:

1. **¿Quién puede llegar a cada máquina?** Una red privada (VPC) con una sola salida. Lo que no necesita hablar con internet no tiene camino a internet: la subred privada no tiene esa ruta. Todo se repite en dos zonas de disponibilidad, para que la falla de un edificio no apague el negocio.
2. **¿Quién es cada visitante?** La identidad se valida una vez, en la puerta (el balanceador), con una pieza alquilada (Cognito). Adentro, confianza cero: los módulos igual se piden credenciales, para que el día que uno se mude, su seguridad ya esté hecha.
3. **¿Cuándo sumar máquinas?** Cuando los números lo pidan. Primero vertical, porque con menos de una petición por segundo es lo más barato y rápido. El umbral queda escrito de antemano. Además, un cliente sintético mide el negocio, no solo las máquinas.

### Qué recibe más espacio

- **El problema antes que la red** (escena `red`, unos 40 s). Hay piezas que tienen que estar en internet y piezas que no deberían estarlo (el event store, que se define como el historial de cada orden y de cómo se pagó). Recién entonces se nombra la VPC, definida como un terreno con cerca.
- **Subredes y tabla de rutas** (escena `subredes`, unos 45 s). Qué es una subred, qué la vuelve pública o privada (un camino, una línea en la tabla de rutas), qué va en cada una y la regla.
- **Zonas de disponibilidad** (escena `zonas`, unos 45 s). El caso (se cae un edificio), región (la más cercana a Detroit), zona (edificio con su propia energía), la copia en dos zonas y por qué dos: cada zona extra cuesta dinero, y es el trade-off que el equipo dejó escrito.
- **El "piénsalo tú" con herramientas** (escena `puerta`, unos 60 s). Primero se define el balanceador (la única puerta, que reparte entre copias idénticas). Después llega el caso: las comidas de un suscriptor solo debería verlas él. Recién entonces la pregunta, con tres opciones. La respuesta descarta cada opción con su razón.
- **Cognito y el token** (escena `cognito`, unos 50 s). Qué es Cognito y por qué se alquila (recuerdo del capítulo 5). El token como pase firmado, las cabeceras de identidad como una nota, y por qué los servidores nunca ven una contraseña.
- **La confianza cero con su tensión** (escena `confianza`, unos 60 s). Primero el caso: Ordering le pide algo a Scheduling. Después la pregunta incómoda ("¿para qué revisar otra vez?"), la razón (la mudanza del capítulo 4) y la definición de claims. Recién entonces el nombre, el precio y la ganancia.
- **Por qué vertical primero** (escena `crecer`, unos 65 s). Se definen las dos escalas y el trade-off de la horizontal. El porqué sale del número del capítulo 1 y de la frase del equipo (más barato y más rápido mientras la carga es chica). La telemetría se recuerda del capítulo 3 y el umbral queda escrito.
- **El cliente sintético** (escena `sintetico`, unos 40 s), con su caso: una máquina sana mientras nadie logra pagar. Se definen el cliente sintético y el camino crítico.
- **Un repaso real**: las tres respuestas, cada una con su línea y su pausa.

### Qué se recorta

- **Amazon MQ, Kafka y el stream basado en log** (la mitad de la escena `services`): son la versión física de los mensajes entre módulos, que el capítulo 4 ya contó como idea. Hacerlo bien pide su propio minuto, con el "espagueti con albóndigas" como caso, y el capítulo ya tiene tres ideas. El curso escrito lo cubre.
- **CloudFormation, la infraestructura como código y el drift.** Es un detalle de operación y no responde ninguna de las tres preguntas.
- **t3.medium y "1..N"**: es jerga de catálogo, y su lugar natural es la factura del capítulo 9.
- **La notación CIDR** (`10.0.0.0/16`, `0.0.0.0/0`) y los nombres `igw-1` y `subnet-1`: se reemplazan por palabras ("camino a internet", "solo la red de adentro").
- **La federación con Google o Facebook**: es un argumento de producto, no de arquitectura.
- **La base de datos como cuarta opción** del "piénsalo tú": con tres opciones, cada descarte tiene su frase.
- **La extracción del Menu Catalog** (y con ella la capa anticorrupción en pantalla): repite la extracción del capítulo 4 y agregaba tres términos (dominio, filtrado, cache). La idea que sí importa, crecer cuando los números lo pidan, queda en `crecer` y `sintetico`.
- **La trampa inversa** (escalar vertical para siempre): se reemplaza por su consecuencia práctica, que mirar solo el procesador no alcanza, y eso lleva al cliente sintético.

### Las escenas nuevas

| # | id | Kicker | Qué enseña |
| - | - | - | - |
| 1 | `intro` | Capítulo 8 | Del papel a máquinas alquiladas en AWS (restricción del pliego). Las tres preguntas que ordenan el capítulo |
| 2 | `red` | La red privada | El caso: piezas con riesgos distintos (la app frente al event store). La VPC, definida como un terreno con cerca |
| 3 | `subredes` | La red privada | Subred; pública y privada; gateway; tabla de rutas como la lista de caminos. Qué va en cada una. La regla |
| 4 | `zonas` | La red privada | El caso: se cae un edificio. Región (la más cercana a Detroit), zona de disponibilidad, la copia en dos zonas y por qué dos |
| 5 | `puerta` | Identidad en la puerta | Balanceador, definido. El caso del suscriptor. "Piénsalo tú" con tres opciones, y cada descarte con su razón |
| 6 | `cognito` | Identidad en la puerta | Cognito, alquilado (capítulo 5). Token, cabeceras de identidad, y servidores que nunca ven una contraseña |
| 7 | `confianza` | Confianza cero | Ordering y Scheduling. "¿Para qué revisar otra vez?" La mudanza (capítulo 4), claims, el nombre, el precio y la ganancia |
| 8 | `crecer` | Si el negocio crece | Vertical y horizontal con su trade-off. Por qué vertical primero (capítulo 1). La telemetría y el umbral escrito |
| 9 | `sintetico` | Si el negocio crece | El caso: la máquina sana con el pago clavado. Cliente sintético y camino crítico. Medir el negocio |
| 10 | `outro` | Para llevarte | Repaso de las tres respuestas y adelanto del capítulo 9 |

## 3. El guion nuevo (10 escenas, 919 palabras habladas)

A 2,2 palabras por segundo son unos 7 minutos de voz, más 28 s de pausas escritas.

El estimador de `tools/timing.mjs` da 7:48 con los silencios entre escenas. La voz real de los capítulos ya grabados va a unas 2,9 palabras por segundo, así que la toma final debería quedar entre 6 y 6:30.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (25 s) | AWS como restricción del pliego (alquilar, no comprar); las tres preguntas del capítulo | AWS 9,5 s; preguntas 8 s más 1 s de pausa | Sí: del papel a máquinas que alguien paga | Sí: "la nube de Amazon, donde los servidores se alquilan" | Sí: lo pedía el pliego | Sí: tres tarjetas de 5 palabras, una por cada pregunta dicha | Prepara el terreno: el espectador sabe qué tres preguntas va a responder el video |
| red (35 s) | El riesgo distinto de cada pieza; event store; VPC | Caso 19,5 s (con el event store definido); VPC 15 s más 2 s de pausa | **Sí**: primero la app, que tiene que estar en internet, y el historial de pagos, que no | Sí: event store ("el historial de cada orden y de cómo se pagó") y VPC ("una red privada dentro de AWS, como un terreno con cerca") | Sí: lo de afuera entra solo por donde tú lo permitas | Sí: dos nodos, una línea de peligro y la cerca que la corta | Un concepto, con su caso. 35 s |
| subredes (41 s) | Subred; pública y privada; gateway (detalle); tabla de rutas; qué va en cada una | Subred 7,7 s; pública y privada 9,5 s más 1 s de pausa; tabla de rutas 10 s; ubicación 7,7 s; regla 6,4 s más 1,2 s | Sí: sigue el problema de la escena anterior | Sí: subred ("pedazos de la red, cada uno con sus reglas"), tabla de rutas ("la lista de caminos de cada subred"), gateway ("la única salida") | Sí: a la privada le falta la línea hacia internet, y por eso desde afuera no hay por dónde llegar | Sí: las tablas tienen dos filas en palabras (sin CIDR), y la regla queda 8 s en pantalla | El bloque de subredes recibe unos 25 s. La tabla de rutas es un detalle con su definición en una frase |
| zonas (37 s) | Región; zona de disponibilidad; la copia en dos zonas; por qué dos | Caso 4 s; región 8,2 s; zona 7,3 s; copia y falla 10,5 s más 1 s; por qué dos 6,8 s más 1,2 s | **Sí**: "que se caiga un edificio entero" | Sí: región ("AWS agrupa sus datacenters en regiones"), zona ("edificios separados, con su propia energía y su propia red") | Sí: la más cercana a Detroit, y dos zonas porque cada una extra cuesta dinero (el trade-off que el equipo dejó escrito) | Sí: los chips aparecen con cada palabra | La zona de disponibilidad recibe unos 25 s, con caso, nombre, porqué y síntesis |
| puerta (52 s, con la pausa) | Balanceador de carga; la pregunta de identidad; "piénsalo tú"; por qué no en cada servidor ni en el teléfono | Balanceador 14 s; caso 7,3 s más 1 s; pregunta 8,2 s más 3 s de anillo; respuesta y descartes 22 s más 1,2 s | Sí: "las comidas de un suscriptor solo debería verlas él" | Sí: el balanceador se define **antes** de la pregunta ("la única puerta, reparte entre copias idénticas") | Sí: cada opción descartada tiene su razón, en voz y en pantalla | Sí: cada razón aparece en su tarjeta mientras la voz la dice y se queda hasta el final | El "piénsalo tú" llega con las herramientas: que todo pasa por la puerta, que los servidores son copias y que el teléfono no lo controlas |
| cognito (46 s) | Cognito (alquilado); token; cabeceras de identidad | Cognito 15 s (con el recuerdo del capítulo 5); token 11,4 s más 1 s; cabeceras 10,9 s; servidores sin contraseña 5 s más 1 s; síntesis 4,5 s más 1,2 s | Sí: "¿con qué valida la puerta?" | Sí: Cognito ("el servicio de AWS que guarda las cuentas"), token ("un pase firmado que dice quién es"), cabeceras ("una nota con quién es") | Sí: se alquila porque es genérico, y los servidores nunca ven una contraseña | Sí: el token viaja hasta el usuario y la nota aparece sobre el cable. En la síntesis, los detalles se apagan | Tres términos, cada uno con su frase y su imagen |
| confianza (55 s) | La tensión ("¿para qué revisar otra vez?"); claims; confianza cero; precio y ganancia | Caso y tensión 17,7 s más 1 s; porqué 8,2 s; claims 12,7 s; nombre 5 s más 1 s; precio 4,1 s; ganancia 7,7 s más 1,2 s | **Sí**: el nombre llega en la séptima línea, después del caso y de la razón | Sí: claims ("lo que el token afirma de quien llama, como qué puede hacer") y confianza cero ("nadie es confiable solo por estar adentro") | Sí: la mudanza del capítulo 4. El precio es el que admite el ADR 006 | Sí: la tarjeta de claims (dos filas) se queda hasta el final y viaja con la llamada | Es el concepto más difícil del capítulo, y ahora recibe casi un minuto |
| crecer (57 s) | Escala vertical y horizontal; el trade-off de la horizontal; por qué vertical primero; telemetría; el umbral escrito | Las dos escalas 10,9 s; trade-off 7,7 s más 1 s; porqué 14,1 s más 1 s; telemetría 7,3 s; umbral 10,9 s; síntesis 4,1 s más 1,2 s | Sí: "¿cuándo sumar máquinas?" | Sí: las dos escalas en palabras, y la telemetría ("el sistema se mide todo el tiempo") | **Sí**: el número del capítulo 1 y la frase del equipo (más barata y más rápida mientras la carga es chica). El umbral sale del documento de escala | Sí: los chips de pros y contras quedan unos 20 s | La decisión llega con su porqué, atado a un número que el espectador ya conoce |
| sintetico (38 s) | Por qué el procesador no alcanza; cliente sintético; camino crítico; tendencia | Caso 7,3 s más 1 s; cliente sintético 7,3 s; camino crítico 7,7 s; qué mide 6,8 s más 1 s; tendencia 5,5 s; síntesis 3,2 s más 1,2 s | **Sí**: "una máquina puede verse sana mientras nadie logra pagar" | Sí: cliente sintético ("un programa que se hace pasar por cliente") y camino crítico ("sin él no hay venta") | Sí: las máquinas en verde mientras el pago se clava | Sí: el recorrido se dibuja paso a paso, y la tendencia está marcada como ilustrativa | El cliente sintético recibe unos 30 s, con su caso |
| outro (31 s) | Repaso de las tres respuestas; adelanto del capítulo 9 | Una línea y una pausa por respuesta (8 s, 7,7 s y 5,9 s); adelanto 8 s | — | Sí | Sí | Sí: cada tarjeta aparece con su número, ligada a la pregunta de la intro | Cierra las tres preguntas que abrió la intro |

### Lo que se verificó

- Ningún concepto importante recibe menos de unos 20 s (caso, nombre, definición, porqué y síntesis). Los que reciben menos son detalles con su definición en una frase: el gateway, la región y el token.
- Cada escena cierra con una síntesis y una pausa de 1 a 1,2 s. El único "piénsalo tú" tiene 3 s de anillo y llega después de definir el balanceador.
- `node tools/timing.mjs estimate`: 10 escenas, 68 líneas, 467,7 s.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, de runtime y de layout. 112/112 textos pasan el contraste AA. Queda el aviso esperado de `#chrome`. Los 15 avisos informativos de layout son intencionales: el diagrama atenuado detrás de las opciones del "piénsalo tú" y el cruce entre escenas.
- Capturas en `snapshots/peda` (al final de las líneas clave de cada escena) y en `snapshots/peda2` (a mitad de escena). Lo que se ve corresponde a lo que se dice y no hay pantallas vacías mientras habla la voz. Con esas capturas se corrigieron un hueco en la intro, la etiqueta de la VPC tapada, el token que tapaba un cable, la alarma sobre el título del camino crítico y los chips amontonados de la síntesis de Cognito.
