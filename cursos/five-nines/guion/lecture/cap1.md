# Capítulo 1 · El encargo

*Versión «lecture-style» híbrida (skill `guion-curso`): gancho concreto, pregunta y ruta, pasos con un caso que vuelve (la cifra inventada), una sola pausa, cierre sobre el argumento. Sin opiniones del narrador. Se lee en voz alta; los títulos son los pasos de la clase y no se dicen. [PAUSA] = silencio a propósito.*

---

## Una cifra inventada en vivo

El miércoles quince de octubre de dos mil veinticinco, en una videollamada de una hora y veinte, alguien le pregunta a Sam Newman cuántos vehículos tiene la empresa. Sam Newman es el anfitrión del kata, y en esa sesión hace de cliente. Contesta casi sin pensar. Más o menos cinco mil bicicletas y cinco mil scooters por país, y unos doscientos autos y doscientas camionetas. Y aclara que se lo está inventando en ese momento.

De esa cifra se puede sacar cuánto trabajo va a tener el sistema, por ejemplo cuántos mensajes tendría que recibir cada segundo. El equipo no hizo esa cuenta, y en este curso la vamos a hacer nosotros. La cifra es también el primer ejemplo de algo que se repite a lo largo del curso: un número que parece firme y que, mirado de cerca, es la decisión de alguien.

Este curso sigue a un equipo que ganó un concurso de diseño de arquitectura. Lo hace a partir de su repositorio, día por día, para responder una pregunta: cuando una empresa quiere usar inteligencia artificial, ¿cómo decide dónde sí y dónde no? Vamos del negocio a la arquitectura, y de ahí al lugar de la inteligencia artificial, con sus riesgos y la manera de comprobar que funciona. Empezamos por el encargo.

## Qué es un kata de arquitectura

Lo que presenció esa videollamada se llama kata de arquitectura. La palabra viene de las artes marciales, donde un kata es una secuencia que se practica una y otra vez. Aquí es un ejercicio de práctica: una empresa ficticia, pero realista, entrega un encargo, y los equipos que participan diseñan la arquitectura de un sistema para resolverlo. Arquitectura quiere decir qué piezas tiene un sistema, cómo se hablan entre sí y por qué se armó así y no de otra forma. Esa última parte, el porqué, es lo que el jurado dijo que iba a mirar.

Este kata es de la editorial O'Reilly. Esta edición pedía algo particular: decidir dónde usar inteligencia artificial en el sistema y también dónde se la consideró y se decidió no usarla. Ese segundo caso, el de decir que no, cuenta igual que el primero. El equipo que ganó se llama Five Nines.

## La empresa, con sus dos flotas

El encargo era para una empresa llamada MobilityCorp, que alquila vehículos eléctricos por minuto en ciudades de la Unión Europea. Su negocio es la última milla, el tramo final de un viaje, por ejemplo el que va de la estación de tren hasta tu casa.

Tiene dos flotas que se parecen poco. La primera es de scooters y bicicletas eléctricas: se reservan hasta treinta minutos antes, o se toman directamente en la calle, y se pueden usar hasta doce horas. La segunda es de autos y camionetas eléctricas: se reservan con hasta siete días de anticipación, por un tiempo fijo, y al devolverlos hay que enchufarlos a un cargador. En las dos se paga por minuto, el vehículo se abre acercando el teléfono y, al terminar, se sube una foto como prueba de que quedó bien dejado.

Cada flota trae sus propios problemas.

## Tres problemas que son uno

El cliente nombró tres dolores, y el orden en que los dijo importa. El primero, al que él mismo llamó su mayor desafío, es que los vehículos no están donde la gente los necesita. Puso un ejemplo gráfico: todos van en bicicleta a un monumento famoso, la dejan ahí, y en el resto de la ciudad no queda ninguna. De aquí en adelante lo vamos a llamar el problema del monumento. El segundo son las baterías. Las bicicletas y los scooters usan baterías que se cambian a mano, un equipo de operarios recorre la ciudad haciéndolo, y hay que decidir a dónde mandarlos primero. El tercero es que casi todos los clientes usan el servicio de vez en cuando. La empresa quiere que pase a ser un hábito, parte del viaje diario al trabajo.

A primera vista son tres temas separados, pero el propio cliente los conectó. Si el vehículo está donde lo necesitas y cargado, empiezas a confiar en el servicio, y de esa confianza sale el uso diario. Es decir, el tercer problema depende de los dos primeros. Además, el cliente agregó una preferencia: antes de comprar más vehículos, quiere aprovechar mejor los que ya tiene.

## Lo que la cifra inventada ya nos dice

Ahora, la cuenta. Doscientos autos, doscientas camionetas, cinco mil bicicletas y cinco mil scooters suman diez mil cuatrocientos vehículos por país. Esa suma es nuestra, no del equipo. Hacerla antes de diseñar nada muestra dónde está el volumen: casi todos, veinticuatro de cada veinticinco, son scooters y bicicletas. Son vehículos pequeños, con batería chica y con una señal móvil que va y viene, y ahí es donde el sistema va a tener más trabajo.

También hay algo que el cliente no dijo. No compartió ningún dato económico, y lo explicó con una frase franca: no lo inventó. Esa ausencia se vuelve importante en el capítulo dos, cuando el equipo escriba metas con cifras y haya que preguntarse de dónde salieron.

## Las reglas del juego, y por qué las fechas son una ventaja

Las reglas de entrega eran simples: un repositorio público en GitHub, con una página principal que cuente la historia de la solución, diagramas de cajas y flechas, y ADRs. Un ADR es un registro de decisión de arquitectura, un documento corto que dice qué se decidió, qué alternativas había y por qué se eligió esa. El veintitrés de octubre, a las once y cincuenta y nueve de la noche, hora del este de Estados Unidos, los jueces tomaron una foto del repositorio.

Las fechas son una ventaja para este curso por una razón técnica. Git, la herramienta que guarda el historial de un proyecto, registra cada cambio con su día y su hora. Eso permite reconstruir cómo fue pensando el equipo, en el orden en que lo pensó. Hay una condición que mantenemos de aquí al final. Lo que el repositorio prueba, se dice como hecho; lo que deducimos nosotros, como deducción; y lo que no hay, como un hueco.

## Las cuatro preguntas del jurado

Antes de que los equipos empezaran, el jurado dijo qué iba a mirar. Fueron cinco criterios, y en este curso los agrupamos en cuatro preguntas, porque dos de ellos van de la mano. Esas cuatro preguntas son la línea que atraviesa el curso, y cada capítulo va a decir cuál está contestando.

La primera: ¿es un uso de la inteligencia artificial que resuelve un problema real del negocio? El jurado se refería sobre todo a la inteligencia artificial generativa, la que genera texto y entiende lenguaje libre, como los chatbots. La segunda: ¿la solución encaja en el negocio, y se entiende el porqué de cada decisión? Uno de los jueces, Andrew Harmel-Law, lo resumió con una frase: quiero ver cómo llegaste a cada decisión. La tercera: ¿cómo se defiende el equipo de la incertidumbre? Sam Newman la explicó en la misma sesión. Los mejores modelos cambian cada pocos meses, los precios hoy están subsidiados y van a subir, y hay proveedores que pueden cerrar. Y la cuarta: ¿cómo se sabe que la inteligencia artificial funciona? Porque no es determinista. Determinista quiere decir que, con la misma entrada, siempre da la misma salida, como una función común de tu código, y la inteligencia artificial generativa no lo garantiza.

Para probar las cuatro preguntas con un caso, supón que un equipo propone poner un chatbot en la aplicación. ¿Qué le preguntarías?

[PAUSA]

Dos salen enseguida. Una es qué problema del negocio resuelve: si ayuda con el problema del monumento o si crea el hábito de usar el servicio. La otra, que es la cuarta del jurado, es cómo se va a saber, cuando el chatbot esté en manos de los clientes, si responde bien. El equipo ganador también puso un chatbot en su aplicación, al que llamó asistente, y en el capítulo cuatro vamos a ver qué respondió a esas dos preguntas.

## Volver a la cifra

Volvamos a Sam Newman inventando números en vivo. Ahora se sabe por qué esa cifra pesa: dice cuántos vehículos hay y de qué clase. Y se sabe qué clase de cifra es, una que alguien eligió en el momento. Con las cuatro preguntas del jurado a mano, cada decisión que sigue se puede leer.

Lo que todavía no sabemos es qué hizo el equipo con ese punto de partida, ni de dónde sacó los números que usó después, si el cliente no entregó datos económicos. Al día siguiente, el equipo escribió qué quería lograr el negocio. Y en ese primer borrador, alguien dejó una nota al margen que cambió el resto del trabajo.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Sesión inaugural el miércoles 15 de octubre de 2025, una videollamada de 1 h 20 | Subtítulos de la sesión (`sessions/#1/captions_en.txt`, 8a5ce24, subidos el 15 a las 20:06); la fecha se deduce del día de la subida |
| Sam Newman, anfitrión, hace de cliente e improvisa la flota: «me lo invento en vivo» | `HISTORIA.md` §1.2; subtítulos, min 25–26 |
| Flota: 200 autos, 200 camionetas, 5.000 bicicletas y 5.000 scooters **por país** | Subtítulos, min 25–26 (dos deslices orales, «200 bikes»; se sigue la formulación principal) |
| El equipo no hizo la cuenta de volumen; en sus supuestos usó otra flota («200 cars/vans, 500 bikes, 5,000 scooters» por ciudad) | `HISTORIA.md` §5 y §6; eea5927 |
| 10.400 vehículos; 24 de cada 25 (96,2 %) scooters y bicicletas | **Cuenta del curso**, dicha como nuestra |
| Empresa ficticia pero realista; decidir dónde usar IA «o dónde la consideraste y decidiste no usarla» | Subtítulos, min 6 |
| MobilityCorp, última milla, ciudades de la UE; reglas de las dos flotas; pago por minuto; NFC; foto de devolución | Subtítulos, min 7–12 |
| Los tres problemas, su orden y su conexión; el monumento (Buckingham Palace) | Subtítulos, min 13–17 y 34 |
| «El problema del monumento» | Nombre del curso para el primer problema del cliente |
| Preferencia por usar mejor la flota antes de comprar más | Subtítulos, min 27 |
| «No voy a compartir el modelo económico porque no lo inventé» | Subtítulos, min 41 |
| Entregables: repositorio público, README, diagramas simples, ADRs | Subtítulos, min 45–47 |
| Foto del repositorio el 23 de octubre a las 23:59 ET | Subtítulos, min ~72 |
| Cinco criterios agrupados en cuatro preguntas | Subtítulos, min 47–50; agrupación del curso, dicha como tal |
| Andrew Harmel-Law: «quiero ver tu tren de pensamiento» (aquí, «cómo llegaste a cada decisión») | Subtítulos, min 61–62 (traducción libre) |
| Incertidumbre explicada por el anfitrión: modelos que cambian, precios subsidiados, proveedores que cierran | Subtítulos, min 54–59 |
| El asistente del equipo es un chatbot dentro de la aplicación | ADR-0012 («chat-bot functionality»); se responde en el cap. 4 |
| Primer borrador de metas al día siguiente, con una nota al margen | b7d92fb (jueves 16) |
