# Lección 1 · Qué es una decisión de arquitectura: análisis de carga y fricción

35 ideas, duración 3:48.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Muchas de las decisiones que más pesan se toman antes de escribir código, y esas mismas decisiones se siguen pagando después | 3 | 1 | — | Dos afirmaciones nuevas en la primera frase; sin término técnico. Primera idea, sin salto |
| 2 | 0:12 | Este es un curso sobre ellas | 1 | 2 | — | Sin elemento nuevo; pasa de la idea general al curso |
| 3 | 0:14 | Trata de cómo se diseña un sistema entero. Son decisiones que casi siempre se aprenden equivocándose | 3 | 1 | — | "Sistema entero" y "aprender equivocándose" son dos ideas nuevas. Sin fuente en la tabla de verificación |
| 4 | 0:21 | Para enseñarlas, el curso usa un material especial | 2 | 2 | — | "Material especial" se nombra sin decir qué es; la idea 5 lo aclara |
| 5 | 0:24 | Son ejercicios de diseño llamados katas | 2 | 2 | — | "Kata" es el término nuevo; define el material de la idea 4 |
| 6 | 0:24 | En una kata, un equipo diseña la solución de un caso de negocio. Alguien hace de cliente | 4 | 1 | — | "Caso de negocio" y el rol de cliente, combinados con la definición de kata |
| 7 | 0:33 | O'Reilly organiza katas de arquitectura | 2 | 2 | — | Nombre propio nuevo; sale de la definición de kata |
| 8 | 0:33 | El curso usa lo que dejaron escrito los equipos que las ganaron | 3 | 1 | — | "Equipos ganadores" como fuente, combinado con O'Reilly |
| 9 | 0:40 | Fue entre 2020 y 2025 | 3 | 1 | — | Dos cifras (años) que la lección no vuelve a usar |
| 10 | 0:42 | (ruta) Con ese material, veamos adónde lleva el curso. Al terminar, frente a un sistema nuevo, vas a poder decir qué decisiones hay que tomar y en qué orden | 2 | 3 | — | Cambio de hilo anunciado (de la fuente al objetivo); "en qué orden" es lo único nuevo |
| 11 | 0:51 | Primero se decide qué importa en el pedido del cliente | 3 | 2 | — | "Pedido del cliente" y el paso "decidir qué importa": dos elementos nuevos |
| 12 | 0:51 | Después, cómo se divide, se conecta y se protege el sistema | 4 | 2 | — | Tres pasos nuevos en una frase, sin explicar; el mapa no dice qué lección trata cada uno |
| 13 | 0:59 | (kata) Antes de seguir, una aclaración sobre ese material. En lo que dejaron esos equipos hay diseños y documentos, no un sistema funcionando | 3 | 3 | — | Vuelta al material anunciada; "diseños y documentos" y "sistema funcionando" son dos elementos. La afirmación no se sostiene para ShopWise (ver errores) |
| 14 | 1:08 | (decision) Con eso claro, pasemos a un caso. El caso se llama Farmacy Food | 2 | 3 | Farmacy Food | Cambio de caso anunciado; el nombre es el único elemento nuevo |
| 15 | 1:12 | Es un servicio de comidas preparadas. Esas comidas se entregan en refrigeradores inteligentes | 3 | 1 | — | Dos conceptos nuevos (comidas preparadas, refrigeradores inteligentes) en la descripción del caso |
| 16 | 1:18 | Su equipo tuvo que decidir cómo vigilar los servidores del sistema | 3 | 2 | — | "Vigilar" (monitoreo) y "servidores del sistema"; el caso entra sin decir todavía por qué importa |
| 17 | 1:18 | Esa decisión es de arquitectura, y hay dos motivos | 4 | 2 | — | "Decisión de arquitectura" (es el título de la lección) y "dos motivos" (cifra), combinados con la decisión de la idea 16. El término se usa antes de definirlo |
| 18 | 1:26 | El primero es que cuesta cambiarla, porque otras decisiones se apoyan en ella. O sea que cambiarla obliga a revisar esas otras decisiones | 4 | 2 | — | Costo de cambio y dependencia entre decisiones, combinados con el motivo de la idea 17 |
| 19 | 1:34 | Por ejemplo, ese monitoreo sirve para decidir cuándo agregar servidores | 4 | 1 | — | "Monitoreo" (término) y "agregar servidores" como uso de la decisión, combinados con la dependencia de la idea 18 |
| 20 | 1:39 | El segundo es que no afecta a una función en particular, sino al sistema entero | 3 | 2 | — | Alcance transversal como segundo motivo, combinado con la idea 17. La definición de la decisión llega en dos ideas (18 y 20) |
| 21 | 1:45 | (ejemplo) Veamos qué opciones tenía ese equipo. Había herramientas gratuitas, de código abierto, que hay que instalar y mantener | 4 | 3 | — | Cambio de hilo anunciado (de motivos a opciones); "código abierto" y "mantener" como costo, combinados con "opciones" |
| 22 | 1:47 | Y estaba DataDog. Cuesta quince dólares por servidor al mes | 4 | 1 | — | Producto nuevo y una cifra (quince dólares), combinados con la lista de opciones |
| 23 | 1:56 | El equipo propuso DataDog, porque casi no pide mantenimiento | 4 | 2 | — | La propuesta del equipo y su razón, combinadas con el costo de la idea 22 |
| 24 | 1:56 | Con una herramienta de código abierto, alguien tendría que dedicar entre un quinto y la mitad de su tiempo a cuidar el monitoreo | 5 | 2 | — | Dos fracciones (un quinto, la mitad), el tiempo de una persona como costo y la comparación con DataDog. Es la idea más cargada de la lección |
| 25 | 2:07 | Ese tiempo también es un costo, aunque no figure en ninguna lista de precios | 3 | 2 | — | Costo que no aparece en precios, combinado con el tiempo de la idea 24 |
| 26 | 2:07 | A esto se le llama trade-off, lo que se gana con una opción junto con lo que se paga a cambio. Aquí se gana tiempo del equipo, y se paga con dinero | 3 | 2 | — | Un término nuevo (trade-off) combinado con el costo oculto de la 25. La aplicación al caso no suma elementos |
| 27 | 2:22 | (adr) Veamos ahora cómo quedó escrita esa decisión. Quedó en un documento corto que se llama ADR, el registro de una decisión de arquitectura | 3 | 3 | — | Cambio de hilo anunciado (de la decisión al documento); la sigla ADR es el elemento nuevo, combinado con la decisión |
| 28 | 2:30 | Un ADR completo responde cuatro cosas: por qué había que decidir; las otras opciones y su costo; lo que cuesta lo elegido; y el requisito que pide la decisión, algo que el cliente pidió | 5 | 2 | — | Cuatro partes nuevas (la última trae el término "requisito") combinadas con el ADR. Es una sola idea por ser una enumeración de un mismo tipo |
| 29 | 2:35 | Aquí, porque el sistema iba a crecer y había que agregar servidores a tiempo | 3 | 1 | — | Ejemplo de la primera parte; el crecimiento es el elemento nuevo, combinado con la parte 1 |
| 30 | 2:50 | (falta) Falta mirar qué tiene ese ADR. Tiene las tres primeras partes y le falta la cuarta. Dice que el sistema crece rápido, pero no remite a ningún requisito del cliente | 4 | 2 | — | Dos elementos (la parte que falta y el ADR sin vínculo a un requisito), combinados con las cuatro partes. "Requisito" todavía no tiene ejemplo |
| 31 | 3:00 | Veamos si eso pasa solo en este ADR. Contamos a mano las decisiones escritas de los equipos ganadores. Algo más de una de cada cuatro cita, con un identificador o un enlace, el requisito que la origina | 5 | 4 | — | Salto de un caso a la estadística de 183 decisiones en una frase: conteo a mano, una cifra y "identificador o enlace" sin ningún ejemplo. Fricción 4 por el cambio de nivel sin mostrar cómo se contó |
| 32 | 3:13 | (cierre) Al comienzo dijimos que las decisiones que más pesan se toman antes de escribir código y se siguen pagando después. La del monitoreo de Farmacy Food cabe en un documento corto | 1 | 2 | — | Repaso de la apertura, con puente explícito ("al comienzo dijimos"); sin elemento nuevo |
| 33 | 3:24 | En ese documento quedó escrito el tiempo que costaría la opción de código abierto. Sin esa línea, habría parecido gratis | 3 | 1 | — | El tiempo escrito como costo es la idea nueva, combinada con el costo oculto de la 25 y con el ADR |
| 34 | 3:32 | Eso cambia de dónde se puede aprender. Además de los errores propios, hay decisiones ajenas, como esta. O sea que se puede aprender de lo que otros dejaron escrito | 3 | 2 | — | "Decisiones ajenas" como fuente de aprendizaje, combinado con los errores propios de la apertura |
| 35 | 3:42 | Si están escritas completas, otra persona puede comprobarlas antes de apoyar nada encima | 3 | 2 | — | Comprobar una decisión sin preguntarle al autor (elemento nuevo), combinado con el "ADR completo" de la idea 28 |

## Lo que muestran los puntajes

1. **Bloque DataDog con carga alta seguida (ideas 21 a 24).** Cuatro ideas seguidas con carga 4 o más: 21 (4), 22 (4), 23 (4) y 24 (5). Son pares seguidos de carga 4 o más: 21-22, 22-23 y 23-24. La idea 24 mete en una sola frase dos fracciones, el tiempo de una persona como costo y la comparación con DataDog.

2. **Ideas con carga 4 o más y fricción 3 o más: 21 (carga 4, fricción 3) y 31 (carga 5, fricción 4).** Ideas con fricción 3 o más y carga 3 o más: 13 (3 y 3), 21 (4 y 3), 27 (3 y 3) y 31 (5 y 4). En los cambios de hilo anunciados (13, 21, 27) llega además un elemento nuevo: "sistema funcionando" en 13, "código abierto" y "mantener" en 21, la sigla ADR en 27.

3. **Cadena de motivos con carga 4 y fricción baja (ideas 17 a 19).** "Decisión de arquitectura", "dos motivos", la dependencia entre decisiones, "monitoreo" y "agregar servidores" entran en tres ideas seguidas con fricción 1 o 2. Son pares seguidos de carga 4: 17-18 y 18-19. El término de la lección se usa en el título y en la idea 17, pero su definición se arma entre las ideas 18 y 20.

4. **Pico en el ADR (ideas 28, 30 y 31).** La idea 28 enumera cuatro partes (carga 5). La 30 introduce el requisito como lo que falta, sin mostrar ninguno. La 31 pasa de un ADR a 183 decisiones en la misma idea (carga 5, fricción 4). Par seguido de carga alta: 30-31 (4 y 5).

5. **Cambios de hilo y promesas.** Seis ideas con fricción 3 o más (10, 13, 14, 21, 27 y 31). La ruta (idea 12, carga 4) promete tres temas y no dice que la lección 9 trata de comprar o construir y la lección 10 de un modelo de IA. Pares de casos nuevos a menos de dos minutos: ninguno. La lección tiene un solo caso nuevo, Farmacy Food (idea 14).

## Errores de hecho y contradicciones

1. **"No un sistema funcionando" (idea 13, 1:02): contradicho por ShopWise.** El repositorio `C:\Users\felix\dev\katarch-corpus\ConnectedAI-src\` (ShopWise) trae código de aplicación en `8_code\apps\api-server\package.json` y `8_code\apps\app-ui\package.json` (el README de app-ui pide `npm run build`, línea 44), una guía para levantar en una máquina local el backend, el frontend y el servidor de IA (`7_deployment\local-machine-deployment.md`, líneas 1-10), y un video de demostración citado en `README.md` línea 11. Lo busqué por extensión en los doce repositorios: solo ShopWise tiene archivos de código de aplicación. No comprobé que el sistema corra. La nota de verificación llama esta frase "lectura nuestra" y no la narra, pero la narración la afirma como un dato sobre lo que dejaron los equipos. `C:\Users\felix\dev\katarch-katas\cursos\_corpus\DISENO-CURSO.md` (línea 72, "ninguno se construyó ni se operó") repite la misma idea.

2. **Cifra de la idea 31 con un sentido un poco distinto.** El 27 % (50 de 183) de `C:\Users\felix\dev\katarch-katas\cursos\_corpus\dossiers\D7-decisiones-escritas.md` (V1, línea 11, y §2.1, línea 30) cuenta los ADR que enlazan "la sección de requisitos o de características de calidad". La narración dice "el requisito que la origina", y la idea 28 define requisito como "algo que el cliente pidió". El número incluye enlaces a características de calidad, no solo al requisito del cliente.

3. **Cuatro partes del ADR (idea 28).** D7 V1 (línea 11) dice "qué otras opciones había y por qué perdieron". La narración dice "las otras opciones y su costo" y deja afuera el motivo por el que perdieron, que es lo que hace comprobable la elección.

4. **Nota de verificación que no coincide con el guion.** La fila "Definiciones de ADR y trade-off" dice que la lección 2 define lo que aquí se nombra sin definir. El trade-off se define en la idea 26 (línea 33 del guion). La palabra "trade-off" no aparece en `leccion2.md`.

5. **Cifras que sí coinciden.** Verificadas sin error: quince dólares por host al mes (ADR-003 de ArchColider, líneas 19 y 38); "entre un quinto y la mitad" frente a 0.2-0.5 (línea 35); "propuesta" (línea 7, Status Proposed); "crece rápido" (línea 10); "algo más de una de cada cuatro" frente a 50 de 183 (D7 V1). "Entre 2020 y 2025" coincide con `C:\Users\felix\dev\katarch-corpus\dotgithub\profile\README.md` (finalistas de Fall 2020 a Q4 2025). Farmacy Food se describe igual en las lecciones 5 y 7.

6. **Afirmaciones generales sin fuente.** Las ideas 1 y 3 ("se toman antes de escribir código", "casi siempre se aprenden equivocándose") no tienen fila en la tabla de verificación.

## Qué cambiaría

1. **Idea 13.** Cambiar "no un sistema funcionando" por algo que el corpus sostiene, por ejemplo: "hay diseños y documentos; en un solo equipo hay además código para levantarlo en una máquina local". Corregir la misma frase en `DISENO-CURSO.md` (línea 72). Antes de decir "la mayoría", hay que leer los doce repositorios, no solo buscar por extensión.

2. **Idea 24 (carga 5).** Partirla en dos: primero la cifra con una persona concreta del equipo ("un quinto y la mitad de su tiempo"), y después que ese tiempo es el costo de la herramienta gratuita; la idea 25 ya dice lo segundo, así que se puede fusionar con ella. La comparación con DataDog pasa a la idea 23. Así ninguna idea del bloque queda en carga 5.

3. **Bloque del ADR (ideas 28, 30 y 31).** (a) Dar un ejemplo de requisito antes de la cuarta parte, con un ADR real del corpus que cite un identificador (por ejemplo, el de Five Nines que menciona FR# en `D7` §2.1). (b) Separar en la idea 31 el paso "veamos si eso pasa solo en este ADR" del conteo de 183 decisiones, y decir en una frase cómo se contó. Así baja la fricción de 4 y la carga de 5.

4. **Ruta y años.** (a) La ruta (idea 10 y 12) debe nombrar lo que viene en las lecciones 9 y 10 (qué se compra o se construye, cómo entra un modelo de IA), o decir que se verá más adelante. (b) Quitar "entre 2020 y 2025" (idea 9) o confirmarlo con Felix: la memoria del proyecto dice "nada de fechas exactas ni años", y la lección no vuelve a usarlo.
