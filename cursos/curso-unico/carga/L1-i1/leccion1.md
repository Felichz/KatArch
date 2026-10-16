40 ideas; duración 5:29 (tiempos de `carga/L1-i1/tiempos-ch1.txt`).

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Muchas decisiones que más pesan se toman antes del código y se siguen pagando; este curso trata de ellas. | 2 | 1 | — | Tesis nueva, sin nombres ni cifras. |
| 2 | 0:14 | Trata de cómo se diseña un sistema entero; las decisiones se aprenden con los años, equivocándose. | 3 | 1 | — | "Sistema entero" y aprender por error: dos conceptos nuevos. |
| 3 | 0:23 | (katas) Katas: un equipo pequeño diseña la solución de un caso de negocio; alguien hace de cliente y responde preguntas. | 4 | 2 | — | Tres elementos nuevos: kata, caso de negocio, cliente que responde. "Para enseñarlas" es un paso con conector. |
| 4 | 0:36 | O'Reilly, editorial de libros técnicos, organiza katas de arquitectura; las ganaron doce equipos. | 4 | 2 | — | O'Reilly y "doce" (dos nombres o cifras) combinados con las katas. Fuente nueva. |
| 5 | 0:43 | Fue entre 2020 y 2025, y el curso usa lo que esos doce equipos dejaron escrito. | 5 | 1 | — | Dos años, "lo que dejaron escrito" y la combinación con los doce equipos: cuatro o más. Las fechas no las usa el argumento. |
| 6 | 0:48 | (ruta) Con ese material, veamos adónde lleva el curso. | 1 | 3 | — | Anuncia cambio de hilo; sin elementos nuevos. |
| 7 | 0:51 | Al terminar, frente a un sistema nuevo, se sabrá qué decisiones tomar y en qué orden, y justificarlas con lo que cuesta. | 4 | 1 | — | Orden de decisiones y costo como criterio (dos), combinados. |
| 8 | 1:00 | Empieza por el pedido del cliente, para ver qué importa y a qué se renuncia. | 3 | 1 | — | Dos conceptos nuevos: pedido del cliente y renunciar. |
| 9 | 1:00 | Después se corta el sistema en partes, se mira cómo se hablan y qué pasa cuando una falla. | 4 | 1 | — | Tres temas nuevos en una sola frase. |
| 10 | 1:11 | Hacia el final, datos sensibles e IA; cierra con lo que debe quedar escrito para que otra persona compruebe una decisión. | 4 | 1 | — | Tres temas nuevos: datos sensibles, IA, lo que debe quedar escrito. |
| 11 | 1:22 | (kata) Antes de usar ese material, conviene saber qué se puede esperar: en los repositorios hay diseños en papel, no un sistema funcionando. | 3 | 3 | — | "Repositorios" sin explicar y "diseños en papel" (dos elementos), tras un cambio de hilo anunciado. |
| 12 | 1:27 | Por eso, lo que un equipo escribe sobre cuánto tarda su diseño en responder es un cálculo. | 4 | 2 | — | Tiempo de respuesta y cálculo (dos), combinados con la idea anterior ("por eso"). |
| 13 | 1:37 | No es una medición, y eso cambia cómo se lee cada ejemplo. | 3 | 1 | — | "Medición" nueva, contrapuesta a cálculo. |
| 14 | 1:41 | (decision) Veamos qué es una decisión de arquitectura en un caso concreto. | 1 | 3 | — | Anuncia caso y definición; no trae elementos. |
| 15 | 1:46 | Farmacy Food es un servicio de comidas preparadas que entrega en refrigeradores inteligentes. | 4 | 3 | Farmacy Food | Tres elementos en una frase: nombre del caso, comidas preparadas, refrigeradores inteligentes. Primer caso de la lección. |
| 16 | 1:51 | Su equipo tuvo que decidir cómo vigilar los servidores; es una decisión de arquitectura por dos motivos. | 3 | 2 | — | Monitoreo como decisión (uno) combinado con "dos motivos" (uno). |
| 17 | 1:59 | El primero: cuesta cambiarla, porque otras decisiones se apoyan en ella; según el equipo, es la base para decidir cuándo agregar servidores. | 4 | 2 | — | Dependencia entre decisiones y escalado (dos), combinados con el monitoreo. |
| 18 | 2:10 | Cambiar el nombre de una variable, en cambio, lleva un minuto. | 3 | 3 | — | Ejemplo de código contrapuesto al costo de cambio; baja de nivel de abstracción sin puente. |
| 19 | 2:14 | El segundo: afecta al sistema entero, no a una función en particular. | 3 | 2 | — | "Función en particular" nueva, combinada con "sistema entero". |
| 20 | 2:14 | Las propiedades que el sistema tiene aparte de lo que hace, como cuánto cuesta operarlo, se llaman cualidades o características de arquitectura. | 4 | 2 | — | Tres nombres nuevos: cualidad, característica de arquitectura, costo de operar. |
| 21 | 2:28 | (ejemplo) Volvamos al monitoreo y a lo que había: herramientas de código abierto, sin licencia, que hay que instalar y mantener. | 4 | 3 | — | Vuelve a un hilo de hace seis ideas; tres elementos nuevos: código abierto, licencia, instalar y mantener. |
| 22 | 2:32 | Y un servicio que opera quien lo vende: DataDog. | 3 | 1 | — | DataDog y "servicio gestionado" (dos). DataDog es herramienta, no caso. |
| 23 | 2:42 | Cuesta quince dólares por servidor al mes: se paga por cada servidor que se vigila. | 4 | 1 | — | Una cifra y un modelo de cobro, combinados con el servidor vigilado. |
| 24 | 2:47 | El equipo propuso DataDog, porque casi no pide integración ni mantenimiento; pero hay otra razón. | 3 | 2 | — | "Integración" nueva, combinada con las alternativas. |
| 25 | 2:53 | Con código abierto, alguien dedicaría entre un quinto y la mitad de su tiempo, como desarrollador o administrador, a cuidar el monitoreo. | 4 | 2 | — | Fracción y rol (dos), combinados con la alternativa de código abierto. |
| 26 | 3:03 | Ese tiempo también es un costo, aunque no figure en ninguna lista de precios. | 3 | 2 | — | Costo no monetario, combinado con el tiempo de la idea anterior. |
| 27 | 3:03 | A esto se le llama trade-off: lo que se gana con una opción junto con lo que se paga a cambio. | 3 | 2 | — | Término en inglés y su definición (dos). |
| 28 | 3:13 | Aquí se gana tiempo del equipo y se paga con dinero; si ninguna opción sale gratis, decidir bien es saber qué se paga y por qué conviene pagarlo. | 3 | 1 | — | Aplica el trade-off (sin elementos) y agrega un principio nuevo, combinado. |
| 29 | 3:23 | (adr) Veamos cómo quedó escrita esa decisión: un ADR, documento corto, formato que usan los doce ganadores. | 3 | 3 | — | Sigla ADR con su definición (dos). Cambio de hilo anunciado: de la decisión al documento. |
| 30 | 3:37 | Un ADR completo responde cuatro cosas; primero, por qué había que decidir. | 2 | 2 | — | Una estructura nueva de cuatro partes. |
| 31 | 3:41 | Aquí, porque el sistema iba a crecer rápido y había que saber qué pasaba en cada servidor para agregarlos a tiempo. | 4 | 1 | — | Crecer rápido y saber qué pasaba en cada servidor (dos), combinados con agregar servidores. |
| 32 | 3:49 | Después, las otras opciones con su costo; luego, lo que cuesta lo elegido: los quince dólares podrían subir, aunque el equipo cree improbable un aumento grande. | 3 | 1 | — | "Podrían subir" y la incertidumbre (uno), combinados con los quince dólares. |
| 33 | 3:59 | Y por último, el requisito: algo que el cliente pidió; citarlo permite que otra persona compruebe si la decisión lo cumple. | 4 | 2 | — | "Requisito" y "comprobar" (dos), combinados con el ADR. |
| 34 | 4:09 | El ADR también dice en qué estado está: propuesta, o sea que el equipo la plantea, pero no la da por aceptada. | 3 | 2 | — | Estado y propuesta (dos). Es una quinta parte, fuera de las cuatro anunciadas. |
| 35 | 4:19 | (falta) Falta la cuarta parte: el ADR dice la necesidad, que el sistema crece rápido, pero no remite a ningún requisito. | 3 | 2 | — | Necesidad frente a requisito (uno), combinado con las tres partes ya dichas. |
| 36 | 4:32 | Cabe preguntarse si es una excepción: contamos a mano las 183 decisiones de los doce ganadores. | 4 | 2 | — | 183 y el método "a mano" (dos), combinados con los doce. |
| 37 | 4:39 | Solo 50 citan el requisito que las origina, algo más de una de cada cuatro. Esas cuatro partes se van a repetir en el resto del curso. | 4 | 1 | — | 50 y "una de cada cuatro" (dos), combinados con 183. La segunda frase no suma elementos. |
| 38 | 4:48 | (cierre) Al comienzo dijimos que las decisiones que más pesan se siguen pagando; la del monitoreo cabe en un documento corto. | 2 | 2 | — | Recuerdo del inicio y del caso; un elemento combinado. |
| 39 | 4:59 | En ese documento quedó escrito lo que costaría el código abierto en tiempo de desarrollador; por eso se compara con los quince dólares. Sin esa línea, el código abierto habría parecido gratis. | 3 | 1 | — | Paso nuevo: convertir tiempo en dinero (uno), combinado con los quince dólares. |
| 40 | 5:13 | Lo que cambia es de dónde se aprende: además de años y errores propios, de decisiones ajenas; si están escritas con razón, costo y requisito, otra persona puede comprobarlas antes de apoyar nada encima. | 4 | 3 | — | Aprender de decisiones ajenas y comprobarlas sin el autor (dos), combinados con los años y errores de la idea 2. Cambio a un plano de tesis. |

## Lo que muestran los puntajes

1. **La introducción carga antes de cualquier caso.** Las ideas 3, 4 y 5 (0:23 a 0:43) cargan 4, 4 y 5. Suman katas, caso de negocio, cliente, O'Reilly, "doce", dos años y el material escrito, y ningún caso aparece hasta la idea 15. Pares de carga 4 o más seguidas: (3, 4) y (4, 5). La idea 5 es la más pesada de la lección, y sus fechas no las usa ningún paso del argumento.
2. **La hoja de ruta es densa.** Las ideas 8 a 10 (1:00 a 1:11) nombran ocho temas nuevos antes de desarrollar ninguno: pedido, renuncia, corte, comunicación, falla, datos sensibles, IA y lo que queda escrito. Las ideas 9 y 10 cargan 4 cada una, en par.
3. **Cambios de hilo y de nivel sin puente.** Fricción 3 o más con carga 3 o más: ideas 11 (1:22, "antes de usar"), 15 (1:46, Farmacy Food), 18 (2:10, la variable), 21 (2:28, "volvamos"), 29 (3:23, el ADR) y 40 (5:13, la tesis). Con carga 4 o más y fricción 3 o más: 15, 21 y 40. La 18 baja a código sin puente, y la 21 vuelve al monitoreo seis ideas después con tres elementos nuevos.
4. **Farmacy Food entra con tres elementos juntos.** La idea 15 (1:46) es el único caso nuevo de la lección: nombre, comidas preparadas y refrigeradores inteligentes en una frase, después de anunciar "un caso concreto" en la idea 14. No hay pares de casos nuevos a menos de dos minutos, porque solo hay uno.
5. **El bloque de alternativas y costos es el más cargado del medio.** Entre las ideas 20 y 25 (2:14 a 2:53), cuatro tienen carga 4 (20, 21, 23 y 25) y dos tienen carga 3 (22 y 24). Par de carga 4: 20 y 21, con tres nombres nuevos y luego código abierto, licencia e instalar y mantener.
6. **El cierre del ADR acumula cifras.** Las ideas 36 y 37 (4:32 a 4:39) son par de carga 4: 183, "a mano", 50 y "una de cada cuatro". La idea 34 (4:09) introduce el estado después de que la idea 30 anunció cuatro partes, así que el espectador recibe cinco.

Pares de ideas seguidas con carga 4 o más: (3, 4), (4, 5), (9, 10), (20, 21) y (36, 37).

## Errores de hecho y contradicciones

1. **Deducción presentada como lo que quedó escrito (idea 39, 4:59).** La narración dice que en el ADR "quedó escrito" el costo de una herramienta de código abierto y que "por eso se pudo comparar" con los quince dólares. ADR-003, Decision, línea 35: "we would have to appoint 0.2-0.5 time of a developer / administrator". La fuente no pone precio al tiempo. La conversión a dinero es del curso, y la tabla de verificación la presenta como si viniera de la fuente.
2. **Alcance recortado (idea 17, 1:59).** ADR-003, Context, línea 11: "basis for making any decision about infrastructure changes (i.e. scaling and extracting services)". La narración dice "la base para decidir cuándo agregar servidores" y omite "cualquier decisión de cambios de infraestructura" y "extraer servicios". La tabla cita la línea sin marcar el recorte.
3. **"Que las origina" va más allá del conteo (idea 37, 4:39).** D7 §2.1, línea 30, define "requisito citado" como remitir a un identificador o a un enlace a la sección de requisitos. El conteo no mide que sea el requisito de origen. D7 línea 302 dice que los identificadores solo se comprobaron en PR, FN y T7.
4. **"Cuatro cosas" no sale de la plantilla (idea 30, 3:37).** La plantilla del repositorio, `ArchColider-src\4.ADRs\001 We are using ADR (template).md`, tiene Status, Context, Decision y Consequences. Las cuatro partes son construcción del curso, y la plantilla sí incluye el estado (idea 34). La tabla de verificación no cita fuente para "cuatro cosas".
5. **Sin contradicciones con otras lecciones.** DataDog a 15 USD por host y mes coincide con la lección 3 y con `ArchColider-src\3.ViewsAndPerspectives\CostAnalysis.md`, línea 234. Farmacy Food como comidas en refrigeradores inteligentes coincide con las lecciones 3, 5 y 7. "50 de 183" y "algo más de una de cada cuatro" coinciden con la lección 11. Esta lección es la única que usa años.

## Qué cambiaría

1. **Quitar "entre 2020 y 2025" de la idea 5.** Es carga 5 sin función en el argumento, y la memoria del proyecto dice que no se usen fechas ni años. Basta con "las ganaron doce equipos de O'Reilly".
2. **Reducir la hoja de ruta (ideas 8 a 10) a una o dos frases.** Dejar "pedido del cliente y qué se renuncia" y dar el resto del curso en una sola frase. Ocho nombres nuevos en 22 segundos no se retienen.
3. **Presentar Farmacy Food en dos tiempos (ideas 15 y 16).** Primero el problema (el equipo tiene que vigilar sus servidores), y después el negocio (comidas en refrigeradores inteligentes). Y poner un puente antes de la idea 18 (la variable) y de la idea 21 ("volvamos").
4. **Corregir frases contra la fuente y decidir el estado (ideas 17, 32, 34, 39).** (a) En la 17 decir "cualquier decisión de cambios de infraestructura, como agregar servidores". (b) En la 39 marcar la conversión a dinero como deducción del curso. (c) Decidir si el estado va dentro de las "cuatro cosas" o aparte; la plantilla lo incluye como sección. (d) En la 32, "cada una con su costo" promete costos de Grafana, ELK y CloudWatch que no aparecen; decir solo lo que se narra o nombrarlos.
