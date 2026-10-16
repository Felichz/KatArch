# Capítulo 3 · Una sola fuente de verdad

*Guion narrado, piloto del estilo «razona con ellos». Se lee en voz alta. Los títulos de sección son solo para orientarse: no se dicen. La marca [PAUSA] es el único momento en que la voz se calla a propósito.*

---

## Un scooter a las ocho de la mañana

Imagina un scooter parado en una esquina, a las ocho de la mañana. Alguien lo acaba de dejar con la batería a medias, y en ese momento el scooter sabe dos cosas que a la empresa le importan muchísimo: dónde está y cuánta carga le queda. Cada treinta segundos, más o menos, las dice en voz alta. A eso se le llama telemetría: los datos que un aparato manda sobre sí mismo sin que nadie se los pida.

Ahora multiplícalo. En el capítulo uno hicimos la cuenta: unos diez mil cuatrocientos vehículos por país. Si todos estuvieran en la calle a la vez, que es el peor caso, y cada uno hablara cada treinta segundos, saldrían unos trescientos cincuenta mensajes por segundo. Y una advertencia, que viene del capítulo dos: en la clasificación de los tres cajones, este es un número calculado, y calculado por nosotros, no por el equipo. Lo más cerca que ellos llegan de un número es una frase que habla de «miles a decenas de miles de dispositivos». Pero con el orden de magnitud alcanza para ver el problema. No son muchos mensajes para un servidor. Son muchos mensajes pequeños, que llegan de aparatos con poca batería y con una señal móvil que va y viene, y alguien tiene que escucharlos a todos.

Eso abre tres preguntas: cómo viajan esos mensajes, cómo se entera quien los necesita, y quién guarda lo que dicen. El equipo las contestó más o menos en ese orden, y vamos a hacer lo mismo.

## Cómo viajan

Para el tramo de los mensajes, el equipo eligió un protocolo que se llama MQTT. Un protocolo es un acuerdo sobre cómo se hablan dos máquinas, y este está pensado a propósito para aparatos pequeños: los mensajes pesan poco, gastan poca batería y aguantan que la señal se corte a mitad de camino. La alternativa más obvia era la que usaría cualquier aplicación: que cada vehículo mande una petición web común, HTTP. El equipo la descartó, porque según su documento es más pesada para esta clase de aparatos y no garantiza que el mensaje llegue. A mí me parece una decisión razonable, y por una razón bastante práctica. Un scooter que pierde señal en un túnel no puede quedarse reintentando como lo haría un teléfono, porque cada reintento le cuesta batería, y la batería es justo lo que estamos midiendo.

Los mensajes llegan, entonces, a un servicio de mensajería de Google que se llama Pub/Sub. Piensa en el tablero de anuncios que hay en la entrada de un edificio. Quien tiene algo que decir lo pega una sola vez, y cada vecino interesado pasa y lo lee, sin que el que pegó el papel sepa quiénes son ni cuántos. Con los vehículos pasa igual: el scooter publica su estado una vez, y todo servicio que lo necesite se suscribe. Y eso vale más de lo que parece, porque si mañana aparece un servicio nuevo que necesita saber dónde están los vehículos, se suscribe y listo. Nadie tiene que tocar al scooter.

## ¿Quién guarda el estado?

Y aquí llega la pregunta que, a mi juicio, es la central del capítulo, la que parece menor y no lo es: quién guarda el estado de cada vehículo. Dónde está, cuánta batería tiene, si se puede reservar.

El jueves dieciséis de octubre, el primer boceto de arquitectura del equipo respondía con dos servicios. Uno de flota, que recibía los mensajes de los vehículos, y otro de ubicación, que guardaba dónde estaba cada uno. Tres días después, el domingo, el equipo dibuja un diagrama nuevo, y el servicio de ubicación ya no está. Su trabajo lo absorbió el de flota.

El repositorio no dice por qué pasó ese domingo, y no voy a inventarlo. Lo que sí dice, al día siguiente, es por qué quedó así. El lunes veinte, el equipo escribe lo que numera como su decisión siete: el servicio de flota es la «fuente única de verdad» del estado de cada vehículo. Que es una manera elegante de decir que hay un solo lugar donde ese dato es oficial. Los demás servicios, o le preguntan a él, o escuchan lo que él publica. El servicio de flota recibe la telemetría, guarda el último estado y aplica reglas; por ejemplo, si la batería baja de cierto umbral, ese vehículo deja de estar disponible para reservar.

Para entender qué se están ahorrando, conviene mirar la alternativa que el equipo también consideró y descartó: que cada servicio lea los mensajes por su cuenta y se arme su propia versión del estado. Parece cómodo. Pero piénsalo con un caso concreto. El servicio de viajes y el de mantenimiento, cada uno con su copia de la batería de un mismo scooter. Uno ya procesó el último mensaje, el otro todavía no. ¿Qué pasa?

[PAUSA]

Pasa lo que cualquiera imagina, solo que con consecuencias de verdad. Mantenimiento manda a un operario, con su camioneta y su turno, a cambiar una batería que, para el servicio de viajes, está perfecta. O la aplicación te ofrece un scooter que en realidad ya no puede salir. Nadie se equivocó: cada servicio hizo bien su trabajo con el dato que tenía. El problema es que había dos datos. Ese caso es una ilustración nuestra; el equipo lo escribió de una forma más seca, como el riesgo de estados que no coinciden y de lógica repetida en varios lugares. Pero es la misma idea. Con una sola fuente, las dos decisiones miran lo mismo.

## Lo que cuesta

Ahora, una cosa que me gusta del equipo: no escondieron el precio. En esa misma decisión anotaron lo que se paga por tener una sola fuente. El servicio de flota se vuelve crítico, y si se cae, casi todo se detiene. Y su respuesta fue prepararlo para eso: varias copias del servicio funcionando a la vez, que se suman solas cuando crece la carga, y una buena vigilancia de lo que pasa adentro.

A esto se le llama un trade-off: cuando, para ganar algo, aceptas perder otra cosa. Aquí ganas consistencia, o sea, que los datos coincidan, y a cambio concentras el riesgo en una sola pieza que hay que cuidar muy bien. Yo, en su lugar, habría aceptado ese trato; pero conviene verlo como lo que es, un trato, y no como una solución sin costo.

## La nube, desde el primer día

Todo esto corre en la nube, que dicho de la forma más sencilla es alquilar servidores a otra empresa en lugar de tener los propios. Y esa elección es anterior a todo lo que acabamos de ver. El mismo jueves dieciséis, a las ocho de la mañana, el equipo ya había creado dos decisiones vacías, solo con su título. Una era cuál proveedor de nube usar. La otra, cómo se iban a hablar los vehículos con el sistema. Antes de escribir un solo requisito, ya sabían cuáles eran las dos primeras decisiones difíciles. A mí eso me parece una buena señal, porque saber qué preguntas hay que responder primero es buena parte del trabajo.

Esa misma noche, la decisión número uno quedó escrita: Google Cloud. La razón principal fueron los mapas, porque Google Cloud se integra directamente con Google Maps, y casi todo en este negocio sucede sobre un mapa. También pesaban las herramientas de datos en tiempo real y las de inteligencia artificial que Google trae integradas; y un rato después sumaron a Gemini, sus modelos de lenguaje, como un argumento más. Esa comodidad tiene un precio, y lo vamos a ver con calma en el capítulo siete: quedar atado a un solo proveedor.

## Volver a la esquina

Volvamos a la esquina, a las ocho de la mañana. Ahora podemos contar qué le pasa a ese scooter cuando dice «me queda poca batería». El mensaje viaja liviano hasta el tablero de anuncios. El servicio de flota lo recibe, lo guarda como la versión oficial, y su regla marca al vehículo como no disponible. Y de ese anuncio se enteran, a la vez y sin que nadie tenga que coordinarse, la aplicación de los clientes y el equipo de los operarios. Un solo dato, y muchos que lo escuchan. Esa es la respuesta a la segunda pregunta del jurado, la de entender el porqué de cada decisión, y roza la tercera, la de la incertidumbre, porque concentrar el riesgo en una sola pieza es también una manera de manejarlo.

Hasta aquí todo se trataba de tener los datos en orden. Pero el kata no preguntaba por datos: preguntaba dónde va la inteligencia artificial. Y el equipo lo respondió con una columna que agregó a una tabla, de la que vamos a hablar en el próximo capítulo.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| 10.400 vehículos por país (200 autos + 200 camionetas + 5.000 bicicletas + 5.000 scooters) | Pliego, dicho en la sesión de preguntas (subtítulos, min 26); la suma es del curso |
| Reporte «al menos cada 30 segundos» | Pliego (subtítulos, min 37) |
| ~350 mensajes por segundo | **Cuenta del curso** (10.400 / 30), peor caso; se dice que es nuestra. El ADR-0002 solo habla de «miles a decenas de miles de dispositivos» (0f1e34d) |
| MQTT en clúster + Pub/Sub; HTTP directo y broker independiente descartados | ADR-0002 (0f1e34d) |
| HTTP «más pesada para estos aparatos y no garantiza la entrega» | Tal como lo dice el guion anterior (`GUION.md` cap. 3); el clon del repositorio del equipo no está en esta máquina, **verificar contra ADR-0002** antes de publicar |
| El tablero de anuncios, el túnel y el costo del reintento | Imagen y razonamiento nuestros (el narrador lo presenta como opinión) |
| Primer boceto con servicios de flota y ubicación separados, 16 de octubre | c9524d4 (20:31, +0300) y 446bf8a (17 de octubre) |
| Diagrama nuevo sin servicio de ubicación, domingo 19 | 8ba0904 (16:08) |
| Fleet Service como fuente única de verdad, lunes 20; estado consolidado, motor de reglas con umbral de batería; alternativas de estado distribuido descartadas | ADR-0007 (9ed6b7c, 13:10) |
| El repositorio no explica la fusión del domingo | Ausencia comprobada en `HISTORIA.md` §3 y §6 |
| Riesgo: servicio crítico; mitigación con varias copias, escalado automático y observabilidad | ADR-0007, sección de riesgos, tal como la resume el guion anterior; **verificar contra el ADR** |
| El caso de las dos copias de la batería | Ilustración nuestra, dicha como tal. El equipo habla de estados inconsistentes y lógica repetida |
| Dos ADRs creados solo con título el jueves 16, 08:09–08:10: elección de nube y pila de telemetría | 38af982 y 9ac6a7d |
| ADR-0001: Google Cloud por integración con Maps, datos en tiempo real e IA integrada (19:50); Gemini se agrega a los argumentos (20:33) | 938eb08 y d46d913 |
