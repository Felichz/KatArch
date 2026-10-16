# Capítulo 1 · El encargo

*Guion narrado, piloto del estilo «razona con ellos». Se lee en voz alta. Los títulos de sección son solo para orientarse: no se dicen. La marca [PAUSA] es el único momento en que la voz se calla a propósito.*

---

## Una cifra inventada en vivo

El miércoles quince de octubre de dos mil veinticinco, en una videollamada de una hora y veinte, alguien le pregunta al anfitrión cuántos vehículos tiene la empresa. El anfitrión, que en esa sesión hace de cliente, contesta casi sin pensar: más o menos cinco mil bicicletas y cinco mil scooters por país, y unos doscientos autos y doscientas camionetas. Y agrega algo que a mí me parece lo más interesante de toda la respuesta: que se lo está inventando en ese momento.

Esa cifra improvisada es un buen punto de partida para este curso, por dos razones. La primera es que gobierna casi todo lo que viene después, y enseguida vamos a ver cómo. La segunda es que es el primer ejemplo de algo que va a pasar muchas veces: números que parecen firmes y que, mirados de cerca, no lo son. Vamos a aprender a distinguirlos.

## Qué es un kata

Lo que presenció esa videollamada se llama kata de arquitectura. La palabra viene de las artes marciales, donde un kata es una secuencia que se practica una y otra vez. Aquí es un ejercicio de práctica: una empresa ficticia, pero realista, entrega un encargo, y los equipos que participan diseñan la arquitectura de un sistema para resolverlo. Arquitectura quiere decir, simplemente, qué piezas tiene un sistema, cómo se hablan entre sí, y por qué se armó así y no de otra forma.

Este kata es de la editorial O'Reilly, y esta edición pedía algo concreto: decidir dónde usar inteligencia artificial en el sistema, y también dónde considerarla y decidir no usarla. Este curso sigue, paso a paso, al equipo que ganó. Se llama Five Nines.

## La empresa

El encargo era para una empresa que se llama MobilityCorp. Alquila vehículos eléctricos por minuto, en ciudades de la Unión Europea, y su negocio es lo que se conoce como la última milla: el tramo final de un viaje, por ejemplo, de la estación de tren hasta tu casa.

Tiene dos flotas que se parecen poco. La primera, de scooters y bicicletas eléctricas: se reservan hasta treinta minutos antes, o se toman directamente en la calle, y se pueden usar hasta doce horas. La segunda, de autos y camionetas eléctricas: se reservan hasta con siete días de anticipación, por un tiempo fijo, y al devolverlos hay que enchufarlos a un cargador. En las dos se paga por minuto, se abre el vehículo acercando el teléfono, y al terminar se sube una foto como prueba de que se dejó bien.

Dos formas de usar el servicio traen, como vas a ver, problemas distintos para cada una.

## Tres problemas que son uno

Hay tres cosas que el cliente nombró como sus dolores, y conviene oírlas en el orden en que las dijo.

La primera, a la que él mismo llamó su mayor desafío, es que los vehículos no están donde la gente los necesita. Puso un ejemplo muy gráfico: todos van en bicicleta a un monumento famoso, la dejan ahí, y en el resto de la ciudad no queda ninguna. La segunda son las baterías. Las bicicletas y los scooters usan baterías que se cambian a mano, un equipo de operarios recorre la ciudad haciéndolo, y hay que decidir a dónde mandarlos primero. Y la tercera es que casi todos los clientes usan el servicio de vez en cuando, y la empresa quiere que se vuelva un hábito, parte del viaje diario al trabajo.

Hasta ahí parecen tres temas distintos. Pero fíjate en lo que dijo después, porque es lo que los une: si el vehículo está donde lo necesitas, y cargado, empiezas a confiar en el servicio, y entonces lo usas todos los días. El tercer problema depende de los otros dos. Y hubo una preferencia más, que a mí me parece importante: antes de comprar más vehículos, la empresa quiere aprovechar mejor los que ya tiene.

## La cuenta

Volvamos a la cifra inventada. Suma: doscientos autos, doscientas camionetas, cinco mil bicicletas y cinco mil scooters. Son diez mil cuatrocientos vehículos por país. Y mira la proporción: casi noventa y seis de cada cien son scooters y bicicletas. Esa suma es nuestra, no del equipo, pero conviene hacerla antes de diseñar nada, porque dice dónde está el volumen. Lo que más hay son vehículos pequeños, con batería chica y con una señal móvil que va y viene, y ahí van a estar, como vamos a ver, los dolores de cabeza.

También hay algo que el cliente no dijo. No compartió ningún dato económico, y lo explicó con una frase muy franca: no lo inventó. Más adelante, cuando el equipo escriba sus metas con cifras, vamos a recordar eso.

## Las reglas del juego

Las reglas de entrega eran simples. Un repositorio público en GitHub, con un archivo de presentación que cuente la historia de la solución, diagramas sencillos de cajas y flechas, y ADRs. Un ADR es un registro de decisión de arquitectura: un documento corto que dice qué se decidió, qué alternativas había, y por qué se eligió esa. Y las fechas importan, porque el repositorio es la fuente de todo lo que vamos a contar. El veintitrés de octubre, a las once y cincuenta y nueve de la noche, hora del este de Estados Unidos, los jueces tomaron una foto del repositorio. El cinco de noviembre se anunciaron los semifinalistas, que grabaron un video de cinco minutos, y la final fue el trece de noviembre.

Que el repositorio tenga fechas es una suerte para nosotros. Git, la herramienta que guarda el historial de un proyecto, registra cada cambio con su día y su hora, y eso nos permite hacer algo poco común: reconstruir cómo fue pensando el equipo, en el orden en que lo pensó. Con una condición, que vamos a mantener todo el curso: lo que el repositorio prueba, lo decimos como un hecho; lo que deducimos nosotros, lo decimos como deducción; y lo que no hay, lo decimos como un hueco.

## Qué quería ver el jurado

Antes de que los equipos se pusieran a trabajar, el jurado dijo qué iba a mirar. Fueron cinco criterios; yo los junté en cuatro preguntas, porque dos van de la mano. Esas cuatro preguntas van a ser la columna vertebral del curso, y cada capítulo va a avisar cuál de ellas está contestando.

La primera: ¿es un uso de la inteligencia artificial que resuelve un problema real del negocio? Sobre todo de la inteligencia artificial generativa, o sea, la que genera texto y entiende lenguaje libre, como los chatbots. La segunda: ¿la solución encaja en el negocio, y se entiende el porqué de cada decisión? Uno de los jueces, Andrew Harmel-Law, lo dijo con una frase que me gusta: quiero ver tu tren de pensamiento. La tercera: ¿cómo te defiendes de la incertidumbre? Porque en este mundo los mejores modelos cambian cada pocos meses, los precios hoy están subsidiados y van a subir, y hay proveedores que pueden cerrar. Y la cuarta: ¿cómo sabes que la inteligencia artificial funciona? Porque no es determinista. Determinista quiere decir que, con la misma entrada, siempre da la misma salida, como una función normal de tu código. La inteligencia artificial generativa no lo garantiza.

Para probar las cuatro preguntas, imagina que un equipo te propone poner un chatbot en la aplicación, porque la inteligencia artificial generativa está de moda. ¿Qué le preguntarías?

[PAUSA]

A mí me salen dos. Primera: ¿qué problema del negocio resuelve? ¿Pone vehículos en el lugar correcto, o crea el hábito de usar el servicio? Y segunda: cuando ya esté en manos de los clientes, ¿cómo vas a saber si responde bien? Guárdalas, porque el equipo ganador también puso un chatbot, y vamos a ver cómo respondió a esas dos preguntas.

## Volver a la cifra

Volvamos al anfitrión inventando números en vivo. Ahora sabes por qué esa cifra importa, porque dice cuánto y qué clase de vehículos hay. Y sabes qué clase de cifra es: una que alguien eligió en el momento, y sobre la que el equipo tuvo que construir. El equipo no se quedó esperando datos mejores. Lo que hizo, al día siguiente, fue escribir qué quería lograr el negocio, y en ese primer borrador hay una nota al margen que cambió la forma en que pensaron todo lo demás. Es lo que sigue.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Sesión inaugural el miércoles 15 de octubre de 2025, una videollamada de 1 h 20 | Subtítulos de la sesión (`sessions/#1/captions_en.txt`, commit 8a5ce24, subidos el 15 de octubre a las 20:06); la fecha de la sesión se deduce del día de la subida |
| El anfitrión, que hace de cliente, improvisa la flota: «me lo invento en vivo» | Subtítulos, min 25–26 |
| Flota: 200 autos, 200 camionetas, 5.000 bicicletas y 5.000 scooters **por país** | Subtítulos, min 25–26 (hay dos deslices orales, «200 bikes» en los min 26 y 40; se sigue la formulación principal) |
| 10.400 vehículos y «casi 96 de cada 100» scooters y bicicletas | **Cuenta del curso** (10.000 / 10.400 = 96,2 %), dicha como nuestra |
| Empresa ficticia pero realista; criterio de decidir dónde usar IA «o dónde la consideraste y decidiste no usarla» | Subtítulos, min 6 |
| MobilityCorp: alquiler de corta duración, última milla, en ciudades de la UE | Subtítulos, min 7–8 |
| Scooters y bicicletas: reserva hasta 30 min antes o toma en la calle, hasta 12 horas; autos y camionetas: reserva hasta 7 días antes, tiempo fijo, enchufar al devolver; pago por minuto; teléfono con NFC para abrir; foto de devolución | Subtítulos, min 9–12 |
| Los tres problemas y su orden; «nuestro mayor desafío» es el primero; el cliente conecta (3) con (1) | Subtítulos, min 14–17 y 34 |
| El ejemplo del monumento famoso | Subtítulos, min 13–14 (Buckingham Palace) |
| Preferencia por usar mejor la flota antes de comprar más | Subtítulos, min 27 |
| «No voy a compartir el modelo económico porque no lo inventé» | Subtítulos, min 41 |
| Entregables: repositorio público, README, diagramas simples (C4 como inspiración), ADRs | Subtítulos, min 45–47 |
| Calendario: foto el 23 de octubre a las 23:59 ET; semifinalistas el 5 de noviembre; video de 5 minutos; final el 13 de noviembre | Subtítulos, ~min 72; el video de la semifinal debía entregarse el 9 de noviembre |
| Los criterios del jurado (cinco en la sesión, cuatro preguntas en el curso) | Subtítulos, min 47–50. **Dos criterios se juntan en la segunda pregunta** («adecuación de la solución» y «nivel de detalle del razonamiento»); el narrador lo dice |
| Incertidumbre: los mejores modelos cambian cada mes, precios subsidiados que van a subir, proveedores que pueden cerrar | Subtítulos, min 54–59 |
| Andrew Harmel-Law: «quiero ver tu tren de pensamiento» | Subtítulos, min 61–62 (cita traducida del inglés) |
| «Determinista» y la IA generativa | Definición del curso |
| El primer borrador de metas, con una nota al margen, «al día siguiente» de la sesión | b7d92fb (jueves 16 de octubre). El miércoles 15 el equipo había hecho un primer README con tres áreas de diseño (57b8370) |

