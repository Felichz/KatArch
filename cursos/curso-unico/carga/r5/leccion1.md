Total: 40 ideas, duración 5:34.

| # | Tiempo | Idea | Carga | Fricción | Caso nuevo | Por qué |
|---|---|---|---|---|---|---|
| 1 | 0:01 | (intro) Muchas de las decisiones que más pesan en un sistema se toman antes de escribir código y se siguen pagando después | 2 | 1 | — | Una afirmación con un concepto nuevo (decisiones que pesan); es el arranque. |
| 2 | 0:12 | Este es un curso sobre ellas; trata de diseñar un sistema entero, y se aprende con los años, equivocándose | 3 | 1 | — | "Sistema entero" y "aprender con los años" son dos conceptos nuevos; continúa la idea 1. |
| 3 | 0:23 | Para enseñarlas, el curso usa katas: un equipo pequeño diseña la solución de un caso de negocio y alguien hace de cliente | 4 | 2 | — | Tres elementos nuevos: kata, caso de negocio y el rol de cliente que responde. |
| 4 | 0:35 | O'Reilly, la editorial de libros técnicos, organiza katas; doce equipos las ganaron entre 2020 y 2025 | 5 | 3 | — | O'Reilly, "doce" y el rango 2020–2025, combinados con las katas; cambio de fuente sin puente. |
| 5 | 0:43 | El curso usa lo que esos doce equipos dejaron escrito | 3 | 2 | — | "Lo escrito" como fuente nueva, combinado con los doce; paso lógico. |
| 6 | 0:47 | (ruta) Veamos adónde lleva el curso: frente a un sistema nuevo, decidir qué decisiones tomar, en qué orden y con qué costo | 4 | 3 | — | Objetivo, orden y costo son conceptos nuevos; cambio de tema anunciado. |
| 7 | 0:59 | Empieza por el pedido del cliente, para ver qué importa y a qué se renuncia | 4 | 2 | — | "Pedido del cliente" y "renunciar" son nuevos, combinados con el objetivo. |
| 8 | 0:59 | Después, cortar el sistema en partes y repartir los datos entre ellas | 3 | 1 | — | Dos conceptos nuevos en la misma lista de la ruta. |
| 9 | 1:08 | Luego se mira cómo se hablan esas partes y qué pasa cuando una falla | 4 | 1 | — | Comunicación entre partes y fallas, combinados con las partes de la idea 8. |
| 10 | 1:08 | Más adelante vienen los datos sensibles, los que no pueden filtrarse | 4 | 1 | — | "Datos sensibles" y "filtrarse", combinados con repartir datos (idea 8). |
| 11 | 1:17 | Y también qué conviene comprar hecho y cuándo cambiar lo que se eligió | 3 | 1 | — | Comprar hecho y cambiar lo elegido: dos conceptos nuevos. |
| 12 | 1:21 | Las dos últimas lecciones tratan de los modelos de IA dentro de un sistema, y de lo que debe quedar escrito para que otra persona compruebe una decisión | 3 | 3 | — | Modelos de IA como tema nuevo anunciado; "comprobar una decisión" es un concepto nuevo. |
| 13 | 1:32 | (kata) Antes de usar ese material, conviene saber qué se puede esperar de él: de una kata quedan diseños en papel | 2 | 2 | — | Un elemento nuevo (diseños en papel); vuelve al material tras la ruta, con conector. |
| 14 | 1:37 | Lo que un equipo escribe sobre cuánto tarda su diseño en responder es un cálculo, no una medición; eso cambia cómo se lee cada ejemplo | 5 | 2 | — | Cálculo, medición y tiempo de respuesta son nuevos, y se combinan con los diseños en papel. |
| 15 | 1:51 | (decision) Veamos qué es una decisión de arquitectura en un caso concreto | 2 | 3 | — | Término central nuevo; cambio de tema anunciado. |
| 16 | 1:55 | Farmacy Food es un servicio de comidas preparadas que se entregan en refrigeradores inteligentes | 3 | 3 | Farmacy Food | Caso nuevo (primera vez en el curso); dos elementos nuevos (caso y refrigeradores inteligentes). |
| 17 | 2:01 | Su equipo tuvo que decidir cómo vigilar los servidores; es una decisión de arquitectura por dos motivos | 4 | 2 | — | Monitoreo como decisión, "dos motivos" y el criterio, combinados con la definición de la idea 15. |
| 18 | 2:09 | El primer motivo es que cuesta cambiarla, porque otras decisiones se apoyan en ella; cambiar una variable lleva un minuto | 4 | 2 | — | Criterio de costo de cambio, la cifra "un minuto" y la dependencia entre decisiones. |
| 19 | 2:09 | El propio documento dice que ese monitoreo es la base para decidir cuándo agregar servidores | 4 | 3 | — | "El documento" (el ADR) se usa 79 segundos antes de presentarlo (idea 28); escalar a tiempo es nuevo. |
| 20 | 2:23 | El segundo motivo es que no afecta a una función en particular, sino al sistema entero | 3 | 2 | — | "Función en particular" es nuevo y se contrasta con el motivo 1. |
| 21 | 2:23 | Las propiedades que el sistema tiene aparte de lo que hace se llaman cualidades o características de arquitectura, como cuánto cuesta operarlo | 4 | 2 | — | Cualidad y costo de operar, combinados con "sistema entero". No vuelve a aparecer en la lección. |
| 22 | 2:37 | (ejemplo) Volvamos al monitoreo y a lo que había: herramientas de código abierto, que no cobran licencia pero hay que instalar y mantener | 3 | 2 | — | Código abierto y su costo de mantenerlo; retoma el hilo con un puente explícito. |
| 23 | 2:41 | DataDog, un servicio que opera quien lo vende; cuesta quince dólares por servidor al mes | 5 | 2 | — | DataDog, servicio gestionado, 15 dólares y la unidad "por servidor al mes", todo en una idea. DataDog es herramienta, no caso. |
| 24 | 2:53 | El equipo propuso DataDog, porque casi no pide integración ni mantenimiento | 3 | 2 | — | "Integración" es nuevo; "propuso" es el estado del ADR, que se presenta después (idea 34). |
| 25 | 2:58 | Con una herramienta de código abierto, alguien tendría que dedicar entre un quinto y la mitad de su tiempo, como desarrollador o administrador | 4 | 2 | — | Fracción y rol, combinados con el costo de mantener. La estimación del equipo se narra como dato. |
| 26 | 3:08 | Ese tiempo también es un costo, aunque no figure en listas de precios; trade-off es lo que se gana con una opción junto con lo que se paga a cambio | 4 | 2 | — | "Trade-off" y costo no monetario son nuevos, combinados con el tiempo de la idea 25. |
| 27 | 3:18 | Aquí se gana tiempo del equipo y se paga con dinero; si ninguna opción sale gratis, decidir bien es saber qué se paga | 3 | 2 | — | Aplica el trade-off al caso y agrega el principio de decidir bien. |
| 28 | 3:28 | (adr) Veamos cómo quedó escrita: un ADR, por architecture decision record, un documento corto que usan los doce ganadores | 4 | 3 | — | ADR (sigla nueva), formato de los doce y documento corto. Herramienta nueva en medio de la lección. |
| 29 | 3:41 | Un ADR completo responde cuatro cosas; la primera es por qué había que decidir | 3 | 2 | — | Cifra cuatro y la primera parte del formato. |
| 30 | 3:46 | Aquí el sistema iba a crecer rápido y había que saber qué pasaba en cada servidor para agregarlos a tiempo | 4 | 2 | — | "Crecer rápido" y "saber qué pasaba en cada servidor", combinados con agregar servidores. |
| 31 | 3:53 | Después, las otras opciones, cada una con su costo; luego, lo que cuesta lo elegido | 3 | 2 | — | Alternativas con costo y costo de lo elegido. La tercera opción del ADR (CloudWatch) no se nombra. |
| 32 | 3:58 | Los quince dólares podrían subir, aunque el equipo cree improbable un aumento grande | 4 | 1 | — | Riesgo de suba y "aumento grande", combinados con los quince dólares. |
| 33 | 4:03 | Y por último, el requisito que pide la decisión, algo que el cliente pidió; citarlo permite que otra persona compruebe la decisión | 4 | 2 | — | "Requisito" y comprobación por un tercero, combinados con la cuarta parte del formato. |
| 34 | 4:13 | El ADR también dice en qué estado está: propuesta, o sea que el equipo la plantea y no está aceptada | 4 | 2 | — | Estado, propuesta y aceptada: tres términos nuevos. |
| 35 | 4:23 | (falta) Falta mirar qué tiene el ADR: dice la necesidad, que el sistema crece rápido, pero no remite a ningún requisito | 3 | 2 | — | Revisión del ADR contra las cuatro partes; "no remite" combinado con el requisito. |
| 36 | 4:35 | Cabe preguntarse si es una excepción; contamos a mano las decisiones escritas de los doce ganadores | 3 | 2 | — | Excepción y conteo manual, sin el total que se contó. |
| 37 | 4:41 | Algo más de una de cada cuatro cita el requisito que la origina; por eso, en cada lección, las decisiones van a seguir esas cuatro partes | 4 | 3 | — | Fracción sin base (no se dice 50 de 183), y la promesa de estructura del curso, que es un cambio de nivel. |
| 38 | 4:51 | (cierre) Al comienzo dijimos que las decisiones se siguen pagando; la del monitoreo de Farmacy Food cabe en un documento corto, donde quedó escrito lo que costaría el código abierto | 2 | 2 | — | Vuelta con puente a la idea 1; solo combina elementos ya dichos. |
| 39 | 5:02 | Por eso se pudo comparar con los quince dólares de DataDog; sin esa línea, la comparación habría quedado entre quince dólares y cero | 3 | 2 | — | "Cero" como contrafactual; leído en dólares es cierto (licencia gratis), pero choca con el costo de tiempo de la idea 26. |
| 40 | 5:18 | Lo que cambia es de dónde se aprende: además de los años y los errores propios, se aprende de decisiones ajenas que se pueden comprobar, si están escritas con su razón, su costo y su requisito | 3 | 3 | — | Decisiones ajenas como fuente de aprendizaje, nueva, y cambio de nivel hacia el aprendizaje; combina la comprobación con el formato. |

**Lo que muestran los puntajes**

1. **Pares de ideas seguidas con carga 4 o más.** Son 3–4 (katas, 4 y 5), 6–7 (objetivo y pedido/renuncia), 9–10 (partes que se hablan y datos sensibles), 25–26 (un quinto a la mitad del tiempo y trade-off), y dos tramos de tres ideas seguidas: 17–19 (dos motivos, costo de cambio y el documento) y 32–34 (los quince dólares que podrían subir, el requisito y el estado del ADR). En 17–19 y 32–34 el espectador carga cuatro o más elementos nuevos por cada idea, sin un ejemplo que se los ordene.

2. **Carga 4 o más con fricción 3 o más:** ideas 4, 6, 19, 28 y 37. El caso más claro es 19 con 28: "el propio documento" (2:09) usa el ADR, que recién se presenta en 3:28. El espectador tiene que retener "documento" sin nombre durante casi 80 segundos. La idea 37 combina una fracción sin base con una promesa de estructura, que es un salto de nivel.

3. **Fricción 3 o más con carga 3 o más:** ideas 4, 6, 12, 16, 19, 28, 37 y 40. Las ideas 12 (IA) y 16 (Farmacy Food) son temas nuevos que llegan con un anuncio o sin preparación. La 40 cambia de nivel hacia el aprendizaje en la frase de cierre.

4. **Densidad y picos.** La ruta (0:47–1:21, ideas 6–12) introduce siete temas en 34 segundos. Los picos de carga 5 están en la idea 4 (O'Reilly, doce, 2020–2025), en la 14 (cálculo, medición y tiempo de respuesta) y en la 23 (DataDog, servicio gestionado y 15 dólares por servidor en una sola idea). Casos nuevos: solo Farmacy Food (idea 16), así que no hay pares de casos nuevos a menos de dos minutos.

5. **Promesas sin cumplir y conceptos de una sola aparición.** La idea 14 dice "eso cambia cómo se lee cada ejemplo", pero ningún ejemplo de la lección se vuelve a leer así: el "un quinto a la mitad" (idea 25) es una estimación del equipo (ADR, línea 35) y se narra como dato. "Cualidad" (idea 21) y "trade-off" (idea 26) no vuelven a aparecer por su nombre en la lección, y la lección 2 presenta "cualidad" de nuevo como término nuevo ("Qué es una cualidad").

**Errores de hecho y contradicciones**

Lo confirmé en la fuente de la tabla de verificación, `katas-src/ArchColider/4.ADRs/003 Tracing and Monitoring Sytem.md`:
- Ninguna cifra ni el estado están mal dichos. DataDog: "$15 USD per host, per month" (línea 19). Grafana: "Solution is free of charge" (línea 23). ELK: "there are no financial costs" (línea 27). Decisión: "0.2-0.5 time of a developer / administrator" (línea 35). Estado: "Proposed" (línea 7). Consecuencias: "We will have to spend $15 USD and the price might increase in the future. We think it unlikely it will be a significant increase" (línea 38). La lección coincide con el ADR en todo lo que cita.
- Consistencia con la lección 3: su nota de verificación cuenta DataDog como "15 USD × 8 o 16 hosts" (lección 3, tabla de verificación, línea 133), que coincide con "quince dólares por servidor" de la lección 1 (host = servidor). No hay contradicción.
- Contradicción de redacción con la lección 11: la lección 1 dice "algo más de una de cada cuatro" (idea 37), y la lección 11 dice "apenas una de cada cuatro decisiones lo cita" (`leccion11.md`, línea 23). El dato es 50 de 183 (27 %), que es algo más de un cuarto. "Apenas" dice otra cosa. No revisé el conteo 96/167/50 de `_corpus/dossiers/D7-decisiones-escritas.md`.
- Inferencia presentada como dato: "De una kata no queda un sistema funcionando, sino diseños en papel" (idea 13). La nota de verificación lo marca como "lectura nuestra, no una cita de los repositorios" (`_corpus/DISENO-CURSO.md`, tabla "Lado de la demanda"). La voz no lo marca.
- Omisión, no error: el ADR tiene cuatro opciones (incluye Amazon CloudWatch, "$0.30 USD for first 10,000 metrics", línea 31). La lección nombra solo las de código abierto y DataDog, y la nota dice que CloudWatch no se narra. Está justificado, pero "cada una con su costo" (idea 31) deja una opción sin mencionar.

**Qué cambiaría**

1. **Ruta (ideas 6–12).** Dejar en la ruta solo el hilo (pedido, partes, lo escrito) y mencionar datos sensibles, compra e IA en una sola frase de cierre. Así bajan los siete temas nuevos en 34 segundos a tres.
2. **Presentar el ADR antes de usarlo (ideas 19 y 28).** Cambiar en 2:09 "el propio documento" por "el documento donde se escribe la decisión, que vemos enseguida", o mover la definición del ADR (3:28) antes del primer motivo.
3. **Separar el precio del servicio y marcar la estimación (ideas 23, 25 y 39).** Partir la frase de DataDog para que el precio llegue después de "el equipo propuso", decir "el equipo estimó entre un quinto y la mitad", y cambiar "cero" por "cero dólares de licencia", para que no choque con el costo de tiempo.
4. **Dar la base del conteo (idea 37).** Decir "50 de las 183 decisiones" y explicar en una frase qué se contó. Sin el total, "contamos a mano" no se puede comprobar, que es justo lo que la lección enseña.
