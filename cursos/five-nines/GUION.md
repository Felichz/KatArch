# Five Nines · Guion del curso en video

Curso en video de KatArch sobre el ganador de la O'Reilly Architecture Kata Q4 2025 (*AI-Enabled Architecture*, caso MobilityCorp): el equipo **Five Nines**. Columna vertebral: `HISTORIA.md` (el orden en que el equipo razonó, con commits). Vara pedagógica: `KatArch/video/PEDAGOGY.md`. Formato de los guiones: el de `KatArch/video/ch5/narration.json` (misma configuración de voz). Los archivos de cada capítulo están en `video/chN/narration.json` y coinciden línea por línea con las secciones "Guion" de este documento (este documento y los `narration.json` se generan desde las mismas fuentes, en `fuentes/`, con `python3 fuentes/build.py`).

## 1. Visión general

### El espectador
El mismo de KatArch: un desarrollador con un par de años de experiencia, que programa bien pero nunca diseñó un sistema entero, no conoce la jerga (ADR, MLOps, LLM, human-in-the-loop) y no puede pausar para buscarla. Puede no haber visto el curso de ArchColider: ningún capítulo da por sabido nada de él.

### Qué hace distinto a este curso
Los katas de 2025 piden **arquitectura con IA**. El caso de MobilityCorp no se gana por la elección de estilo (como en Farmacy Food) sino por **dónde se pone la IA, de qué tipo, cómo se confía en ella y cómo se sobrevive a sus proveedores**. El equipo ganador lo resolvió con un método que el historial muestra paso a paso: primero el negocio (la IA no es meta), después un estado de flota confiable, después una herramienta por escenario, después confianza y escape, y al final un relato con compuertas de valor.

### Lo que el espectador puede hacer al terminar
1. Separar metas de soluciones y rastrear cada pieza de IA hasta la meta que mueve.
2. Elegir, escenario por escenario, entre código, aprendizaje automático e IA generativa, y justificar dónde **no** usar IA generativa.
3. Diseñar la confianza en un modelo probabilístico: bandas de confianza, revisión humana y vigilancia en producción.
4. Escribir el precio de atarse a un proveedor y dejar salidas.
5. Presentar un plan de IA por compuertas medibles, distinguiendo números dados, calculados y supuestos.

### Por qué 8 capítulos
El repositorio es más delgado en razonamiento explícito que el de ArchColider (sin pizarras, sin preguntas al cliente, sin costos calculados) pero tiene 22 ADRs, un historial denso de 9 días y un cambio de relato después de la semifinal. Eso sostiene 8 ideas grandes; menos obligaría a comprimir conceptos nuevos (LLM, MLOps, human-in-the-loop) por debajo de los 20 s; más sería relleno (por ejemplo, un capítulo por cada escenario de IA repetiría el mismo patrón).

### Orden y cronología
Los capítulos siguen el orden real del equipo (ver `HISTORIA.md` §3–4), con dos ajustes declarados:
- El capítulo 3 (fuente única de verdad, 16–20 oct) y el 4 (herramienta por escenario, 17–22 oct) se solapan en fechas; va primero el 3 porque los títulos de ADR del 16 (nube y telemetría) son anteriores a la columna "Tech Choice" del 17.
- El capítulo 7 (proveedores) recoge decisiones del 16 al 23; va después del pronóstico porque su contenido más propio (riesgos en cada ADR, MoCoP) se apoya en lo que ya se decidió.

### Términos y dónde se definen
kata, pliego, arquitectura, IA generativa, determinista, ADR (cap. 1) · impulsor, meta, supuesto, restricción (cap. 2) · telemetría, MQTT, Pub/Sub, fuente única de verdad, trade-off, nube (cap. 3) · código vs. aprendizaje automático vs. IA generativa, LLM, híbrido (cap. 4) · confianza, falso positivo, falso negativo, human-in-the-loop, deriva, MLOps (cap. 5) · pronóstico de demanda, serie de tiempo, solver (cap. 6) · vendor lock-in, plano de control de modelos (MoCoP), Model Context Protocol (cap. 7) · compuerta de valor, modo sombra, visión artificial (cap. 8).

### Lo que se deja fuera a propósito (lo cubre el repositorio o un curso escrito)
RAG y búsqueda vectorial (ADRs 0006 y 0008), Agent Builder (0010), retención de fotos y GDPR (0017), datos de entrenamiento y sesgo (0015, salvo la idea de acuerdo entre revisores), el lakehouse de datos y analítica, el contexto completo de autos y camionetas, las multas y tarifas del Apéndice A, el asistente de rutas en detalle (ADR-0005; su cambio borde → nube queda en `HISTORIA.md`), el marketing con IA de "Future scope", los OKRs y la tabla de ROI.

## 2. Lista de capítulos

| # | Título | Ideas esenciales | Anclas (repo y commits) | Al terminar, el espectador puede… | Min |
| - | - | - | - | - | - |
| 1 | El encargo | Dos flotas y sus reglas; los tres problemas (lugar, baterías, hábito); la escala (10.400 por país, 96 % micromovilidad); los criterios del jurado (IA útil, porqué, incertidumbre, verificación) | Subtítulos de la sesión inaugural (8a5ce24, `sessions/#1/captions_en.txt`, borrado en 31d6ccc) | Leer un pliego de IA buscando el problema y los criterios, y hacer la primera cuenta | 6,6 |
| 2 | Antes de la IA, el negocio | La IA es solución, no meta; cadena impulsor → meta → solución; números dados, calculados y supuestos; supuestos contrastados con el pliego | b7d92fb, 338c9ec, 3f7786d (`requirements/1_0_…`); 5c155f1, eea5927 (`4_Assumptions…`); 57b8370 | Filtrar propuestas de IA por la meta que mueven y auditar supuestos | 6,2 |
| 3 | Una sola fuente de verdad | Cuenta del tráfico de telemetría; MQTT + Pub/Sub; Fleet Service absorbe ubicación y se vuelve fuente única de verdad; trade-off del riesgo concentrado; GCP el segundo día | c9524d4, 446bf8a → 8ba0904; ADR-0002 (0f1e34d); ADR-0007 (9ed6b7c); ADR-0001 (938eb08); `hld/core-func/` | Justificar un estado central con reglas frente a copias distribuidas | 6,4 |
| 4 | ¿IA generativa, aprendizaje automático o código? | Las tres herramientas y sus costos; la columna "Tech Choice"; el asistente híbrido (botones en código, dinero en código); dónde no usarla (consejo de carga); precios: ML calcula, IA generativa explica | 0d0036f, 95046f0 (`2_FRs.md`); ADR-0012 (b424c11); ADR-0021 (971a0c1); ADR-0018 (2526e17) | Etiquetar cada escenario con la herramienta más simple que alcanza | 5,8 |
| 5 | Confiar en una IA que se equivoca | Dos errores y cuál duele más; bandas de confianza y human-in-the-loop; correcciones como datos; MLOps, deriva y métricas de negocio | FR#2L (`2_FRs.md`); ADR-0014, 0016 (ac13ebd); ADR-0011 (6e54388); NFR_9; `hld/mlops/README.md` (076f519) | Diseñar umbrales, revisión humana y vigilancia para un modelo probabilístico | 5,8 |
| 6 | El vehículo correcto, en el lugar correcto | El problema n.º 1 se diseñó al final; circuito de operarios (baterías + reubicación); pronóstico como serie de tiempo; escalera Prophet → ML con condición medible; rutas: IA generativa vs. solver (Nimrods) | 34760da, 4b17796 (ADR-0022); 91e0c8b, 9d430ad; ADR-0019; Nimrods `012-redistribution-optimizer-algo.md` | Empezar por un modelo simple y escribir la condición para escalar | 5,8 |
| 7 | Cuando el proveedor cambia las reglas | Lock-in elegido a conciencia; riesgos escritos en cada ADR (desde el 20/10); salidas (API determinista, modelo más chico, portabilidad); el intermediario MoCoP; cabos sueltos | 4497171 + c0d4888…0aa4148; ADR-0004; ADR-0013 (fbab35b → 17db325); `hld/scenarios/feedback-analysis/README.md` | Escribir el precio de una dependencia y diseñar al menos una salida | 5,3 |
| 8 | Contar la arquitectura | Después de la foto solo cambia el relato; reorden a 3 casos de uso con el pronóstico primero; compuertas de valor ("ganar antes, gastar después"); cifras supuestas presentadas como resultados; el método completo | `git diff ebf6d83 e930bcb`; 87da42f, 3b1591c (`video-scenario-…`); 88bedef (`narrative.md`); 02f177b (PDF) | Presentar un plan de IA con compuertas verificables en vez de promesas | 5,4 |

**Total estimado:** unos 47 minutos (voz a 2,2 palabras/s más pausas escritas).

---

## Capítulo 1 · El encargo

### Plan
- **Ideas esenciales:** (1) MobilityCorp y sus dos flotas, con reglas distintas; (2) los tres problemas del cliente, que apuntan a lo mismo; (3) la cuenta de la flota: 96 % es micromovilidad; (4) los cuatro criterios del jurado sobre IA.
- **Anclas:** subtítulos de la sesión inaugural (min 7–17, 25–27, 37, 45–59, ~72), recuperados del commit 8a5ce24. El calendario sale de la misma sesión.
- **Puente de entrada:** ninguno (primer capítulo). Se explica qué es un kata sin suponer el curso de ArchColider.
- **Piénsalo:** después de los criterios del jurado; el espectador los aplica a "un chatbot porque está de moda". La respuesta se retoma en los capítulos 4 y 5.
- **Decisión de fuente:** se usan los subtítulos crudos, no el resumen del equipo. La cuenta de 10.400 y el 96 % se declaran como nuestras.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (85 p) | kata, pliego, arquitectura | ~8 s cada uno; la condición de IA ~7 s + 1 s | Sí: la competencia antes del término | Sí, en una frase cada uno | Sí: el kata como práctica | Sí: tres palabras, una por línea | Bien |
| negocio (127 p) | última milla; dos flotas | Última milla ~8 s; flotas ~40 s | Sí: estación → casa antes del nombre | Sí | Sí: cada flota trae problemas distintos | Sí: dos columnas fijas toda la escena | Bien |
| numeros (90 p) | la cuenta de la flota | ~41 s + 1,6 s | Sí: los números antes de la proporción | — | Sí: el volumen marca dónde están los problemas | Sí: barras que crecen una por vez | Bien |
| desafios (142 p) | tres problemas, preferencia por la flota existente | ~15 s por problema; conexión hábito-confianza ~6 s + 1 s | Sí: el monumento antes del "lugar equivocado" | — | Sí: el cliente los conecta | Sí: cuatro tarjetas acumuladas | Bien |
| entregables (100 p) | ADR; calendario | ADR ~10 s + 1 s; calendario ~20 s | Sí: el repositorio antes del ADR | Sí: qué, alternativas, porqué | Sí: el calendario permite reconstruir el proceso | Sí: línea de tiempo fija | Bien |
| criterios (128 p) | IA generativa; los 4 criterios; determinista | IA generativa ~6 s; cada criterio ~7–9 s; determinista ~12 s + 1 s | A medias: los criterios se enuncian, el caso llega en el piénsalo | Sí | Sí: por qué importa verificar | Sí: 4 casilleros, 6 s juntos al final | Aceptable: lista de 4, cada uno con su frase y su ícono; se trabajan en el resto del curso |
| piensalo (76 p) | aplicar los criterios | ~35 s + 3 s | Sí | — | Sí | Sí | Bien |
| outro (83 p) | repaso | ~5 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería el espectador:** en la lista de criterios (cuatro ideas seguidas). Mitigación: una frase y un ícono por criterio, la definición de "determinista" con su ejemplo, y el piénsalo que obliga a usar dos de ellos. **Qué preguntaría:** "¿por qué me cuentan las reglas de entrega?" Respuesta en la escena: porque git guarda las fechas, y el curso se apoya en ellas.

### Guion
**Total:** 831 palabras habladas, unos 6,3 min de voz a 2,2 palabras/s, más 17,2 s de pausas escritas (≈ 6,6 min).

#### 1. `intro` · Capítulo 1 (85 palabras, ~39 s + 1,6 s de pausas)

*Visual:* Pantalla oscura con el logo genérico de un kata (cinturón de práctica). Aparecen tres palabras, una por línea: pliego, arquitectura, IA. En la línea 5 entra el nombre del equipo, Five Nines, con la insignia de primer puesto redibujada en trazo simple (sin el PNG de GitHub). Título del capítulo al final.

- En octubre de 2025, varios equipos de ingenieros compitieron en una Architecture Kata de O'Reilly.  
  <small>(say: «En octubre de dos mil veinticinco, varios equipos de ingenieros compitieron en una Architecture Kata de O'Reilly.»)</small>
- Una kata es un ejercicio de práctica: una empresa ficticia entrega un pliego, el documento con lo que necesita.
- Y cada equipo diseña la arquitectura: qué piezas tiene el sistema, cómo se hablan, y por qué.  
  <small>(pausa 0,6 s)</small>
- Esta vez el pliego traía una condición central: decidir dónde usar inteligencia artificial, y dónde no.  
  <small>(pausa 1 s)</small>
- Este curso sigue, paso a paso, al equipo que ganó: Five Nines.
- Capítulo 1: el encargo.  
  <small>(say: «Capítulo uno: el encargo.»)</small>

#### 2. `negocio` · El negocio (127 palabras, ~58 s + 1,6 s de pausas)

*Visual:* Mapa estilizado de una ciudad europea genérica. Una estación de tren y una casa unidas por una línea punteada: la última milla. Después la pantalla se parte en dos columnas: izquierda scooters y bicicletas (30 min, hasta 12 h), derecha autos y camionetas (7 días, tiempo fijo, enchufe). Abajo, tres íconos comunes a ambas: reloj por minuto, teléfono NFC, cámara de foto. Cada dato aparece con la frase que lo nombra.

- La empresa se llama MobilityCorp. Alquila vehículos eléctricos por minuto, en ciudades de la Unión Europea.
- Su negocio es la última milla: el tramo final de un viaje, por ejemplo, de la estación de tren a tu casa.
- Tiene dos flotas muy distintas.  
  <small>(pausa 0,6 s)</small>
- La primera: scooters y bicicletas eléctricas. Se reservan hasta 30 minutos antes, o se toman en la calle, y se usan hasta 12 horas.  
  <small>(say: «La primera: scooters y bicicletas eléctricas. Se reservan hasta treinta minutos antes, o se toman en la calle, y se usan hasta doce horas.»)</small>
- La segunda: autos y camionetas eléctricas. Se reservan hasta con 7 días, por un tiempo fijo, y al devolverlos hay que enchufarlos al cargador.  
  <small>(say: «La segunda: autos y camionetas eléctricas. Se reservan hasta con siete días, por un tiempo fijo, y al devolverlos hay que enchufarlos al cargador.»)</small>
- En las dos pagas por minuto, abres el vehículo acercando el teléfono, y al terminar subes una foto como prueba de devolución.  
  <small>(pausa 1 s)</small>
- Dos flotas, dos formas de usar el servicio, y problemas distintos para cada una.

#### 3. `numeros` · Los números (90 palabras, ~41 s + 1,6 s de pausas)

*Visual:* Cuatro barras horizontales que crecen una por una: 200 autos, 200 camionetas, 5.000 bicicletas, 5.000 scooters (escala real, las dos primeras casi invisibles). Luego se apilan en una sola barra de 10.400 con el 96 % de micromovilidad resaltado. Etiqueta pequeña y fija: «cálculo de este curso, no del equipo». Fuente al pie: captions de la sesión inaugural, minuto 26.

- El pliego no traía números. Alguien los pidió en la sesión de preguntas, y el cliente los inventó en vivo.
- Por cada país, más o menos: 200 autos, 200 camionetas, 5.000 bicicletas y 5.000 scooters.  
  <small>(say: «Por cada país, más o menos: doscientos autos, doscientas camionetas, cinco mil bicicletas y cinco mil scooters.»)</small>
- Haz la suma: 10.400 vehículos por país.  
  <small>(say: «Haz la suma: diez mil cuatrocientos vehículos por país.»; pausa 0,6 s)</small>
- Y mira la proporción: más de 9 de cada 10 son scooters y bicicletas.  
  <small>(say: «Y mira la proporción: más de nueve de cada diez son scooters y bicicletas.»; pausa 1 s)</small>
- Esa cuenta es nuestra, no del equipo. Pero conviene hacerla antes de diseñar nada.
- Ahí está el volumen. Y, como vas a ver, ahí están también los dolores de cabeza.

#### 4. `desafios` · Los problemas (142 palabras, ~65 s + 3,6 s de pausas)

*Visual:* Tres tarjetas numeradas que entran una por vez. 1: un monumento con una montaña de bicicletas y el resto del mapa vacío. 2: un ícono de batería que se cambia a mano y una camioneta de operarios con un signo de pregunta sobre el mapa. 3: un calendario con usos salteados que se vuelve una línea diaria. Al final, una cuarta franja horizontal: «usar mejor la flota antes de comprar más». Síntesis en una línea grande.

- El cliente nombró tres problemas.
- Primero, el más grande: los vehículos no están donde la gente los necesita.
- Todos van en bicicleta a un monumento famoso y las dejan ahí. Y en el resto de la ciudad no queda ninguna.  
  <small>(pausa 0,8 s)</small>
- Segundo, las baterías. Scooters y bicicletas usan baterías que se cambian a mano, y un equipo de operarios recorre la ciudad haciéndolo. ¿A dónde mandarlos primero?  
  <small>(pausa 0,8 s)</small>
- Tercero: casi todos usan el servicio de vez en cuando. La empresa quiere que se vuelva un hábito, parte del viaje diario al trabajo.
- Y el cliente los conectó: si el vehículo está ahí, y cargado, la gente empieza a confiar y lo usa todos los días.  
  <small>(pausa 1 s)</small>
- Una preferencia más: antes de comprar vehículos, quiere usar mejor los que ya tiene.  
  <small>(pausa 1 s)</small>
- Los tres problemas apuntan a lo mismo: el vehículo correcto, cargado, en el lugar correcto.

#### 5. `entregables` · Las reglas (100 palabras, ~45 s + 2 s de pausas)

*Visual:* Un repositorio de GitHub dibujado como carpeta con tres subcarpetas: README, diagramas, ADRs. Al nombrar el ADR, se abre una tarjeta con tres renglones: decisión, alternativas, por qué. Luego una línea de tiempo: 15 oct (inicio), 23 oct (foto del repositorio, ícono de cámara), 9 nov (video de semifinal), 13 nov (final). La línea de tiempo queda abajo, pequeña, hasta el final de la escena.

- Las reglas de entrega eran simples: un repositorio público en GitHub.
- Adentro, un README con la historia de la solución, diagramas sencillos de cajas y flechas, y ADRs.
- Un ADR es un registro de decisión de arquitectura: un documento corto que dice qué se decidió, qué alternativas hubo, y por qué.  
  <small>(pausa 1 s)</small>
- El 23 de octubre, los jueces tomaron una foto del repositorio. Los semifinalistas grabaron después un video de 5 minutos, y la final fue el 13 de noviembre.  
  <small>(say: «El veintitrés de octubre, los jueces tomaron una foto del repositorio. Los semifinalistas grabaron después un video de cinco minutos, y la final fue el trece de noviembre.»)</small>
- Ese calendario importa. Git guarda cada cambio con su fecha, y así podemos reconstruir cómo pensó el equipo, día por día.  
  <small>(pausa 1 s)</small>

#### 6. `criterios` · Lo que mira el jurado (128 palabras, ~58 s + 1,6 s de pausas)

*Visual:* Cuatro casilleros que se llenan uno por uno, con un ícono cada uno: chispa (IA generativa útil), engranaje encajando (encaje y porqué), nube con rayo (incertidumbre), lupa con tilde (verificación). Al definir «determinista», una función f(x) que siempre devuelve lo mismo contra un dado que cae distinto. Los cuatro casilleros quedan juntos 6 segundos al final.

- Este kata tenía un tema: arquitecturas con inteligencia artificial.
- Sobre todo, IA generativa: modelos que generan texto, como los chatbots, y entienden lenguaje libre.
- El jurado anunció qué iba a mirar. Primero, usos interesantes de la IA generativa, que resuelvan problemas reales del negocio.
- Segundo, que la solución encaje en el negocio, y que se entienda el porqué de cada decisión.
- Tercero, cómo se defiende el sistema de la incertidumbre: los modelos cambian cada mes, los precios suben y hay proveedores que cierran.
- Y cuarto: cómo sabes si la IA funciona. Porque no es determinista.  
  <small>(pausa 0,6 s)</small>
- Determinista quiere decir que, con la misma entrada, siempre da la misma salida, como una función normal de tu código. La IA generativa no lo garantiza.  
  <small>(pausa 1 s)</small>
- Esas cuatro preguntas guían todo el curso.

#### 7. `piensalo` · Piénsalo tú (76 palabras, ~35 s + 3 s de pausas)

*Visual:* Un teléfono con una burbuja de chat genérica y la etiqueta «de moda». Debajo, los cuatro casilleros del jurado en miniatura. Durante la pausa, anillo de cuenta regresiva de 3 s. Luego aparecen las dos preguntas como tarjetas: «¿qué problema resuelve?» y «¿cómo sabrás si responde bien?». Quedan en pantalla hasta el cambio de escena.

- Ahora tú. Un equipo propone un chatbot en la app, porque la IA generativa está de moda.
- Con los criterios del jurado, ¿qué dos preguntas le harías?  
  <small>(pausa 3 s)</small>
- Primera: ¿qué problema del negocio resuelve? ¿Pone vehículos en el lugar correcto, o crea el hábito?
- Segunda: ¿cómo vas a saber si responde bien, cuando ya esté en manos de los clientes?
- Guarda las dos. El equipo ganador también puso un chatbot, y vamos a ver cómo las respondió.

#### 8. `outro` · Para llevarte (83 palabras, ~38 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso, una por idea: dos flotas con la barra del 96 %, los tres problemas en miniatura, los cuatro casilleros del jurado. Al final, una hoja de borrador con una frase tachada al margen (anticipo del capítulo 2).

- Repasemos. MobilityCorp alquila dos flotas muy distintas, y más de 9 de cada 10 vehículos son scooters y bicicletas.  
  <small>(say: «Repasemos. MobilityCorp alquila dos flotas muy distintas, y más de nueve de cada diez vehículos son scooters y bicicletas.»; pausa 0,6 s)</small>
- Sus problemas: vehículos en el lugar equivocado, baterías que cambiar, y clientes que no vuelven.  
  <small>(pausa 0,6 s)</small>
- Y el jurado pide IA que resuelva problemas reales, con su porqué, sus riesgos y una forma de verificarla.  
  <small>(pausa 1 s)</small>
- En el próximo capítulo, el equipo escribe sus primeros objetivos, y alguien anota al margen de uno: esto no es un objetivo.
- Capítulo 2: antes de la IA, el negocio.  
  <small>(say: «Capítulo dos: antes de la IA, el negocio.»)</small>


---

## Capítulo 2 · Antes de la IA, el negocio

### Plan
- **Ideas esenciales:** (1) la IA es una solución, no un objetivo (la nota al margen); (2) la cadena impulsor → meta → solución como filtro; (3) un número puede ser dado, calculado o supuesto; (4) los supuestos se escriben para compararlos con el pliego.
- **Anclas:** b7d92fb (borrador con la nota), 338c9ec (cadena), 3f7786d (metas con números; "Automate Capabilities" desaparece), 5c155f1 y eea5927 (supuestos), 57b8370 y README (las cuatro áreas), captions min 41 (sin economía).
- **Puente:** "¿Recuerdas los tres problemas?" Y se aclara que el día 2 también se eligió la nube (cap. 3), para no falsear el orden.
- **Piénsalo:** el supuesto del GPS cada 30 minutos contra los 30 segundos del pliego, después de enseñar qué es un supuesto y de mostrar una diferencia (las bicicletas).
- **Decisión de fuente:** ante el choque 30 min / 30 s y 500 / 5.000, se sigue al pliego y se dice en voz alta.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (54 p) | — (andamiaje) | ~25 s | — | — | Sí: aclara el orden real | Sí | Bien |
| nota (102 p) | la IA como solución, no meta | **~46 s + 3 s** | Sí: la lista de seis objetivos antes de la nota | Sí: objetivo = qué gana la empresa | Sí: si la herramienta es meta, cualquier uso parece éxito | Sí: seis renglones acumulados, nota manuscrita 10 s | Bien |
| cadena (128 p) | impulsor, meta, solución; la cadena como filtro | Impulsor ~12 s; meta ~4 s; solución ~4 s; ejemplo ~18 s + 1 s; filtro ~8 s + 1 s (total ~58 s) | Sí: la competencia como impulsor con caso | Sí, los tres | Sí: el filtro | Sí: una fila de ejemplo que se recorre | Bien |
| origen (94 p) | número dado / calculado / supuesto | ~43 s + 2 s | Sí: el 23 % del ejemplo anterior | Sí | Sí: cada tipo merece confianza distinta | Sí: tres cajones fijos | Bien |
| supuestos (108 p) | supuesto, restricción, contraste con el pliego | Supuesto ~6 s; restricción ~5 s; contraste ~30 s + 2,6 s | Sí: el documento antes de las definiciones | Sí | Sí: permite comparar | Sí: dos columnas enfrentadas | Bien |
| piensalo (101 p) | aplicar el contraste | ~46 s + 5 s | Sí | — | Sí: viajes invisibles, scooters fantasma | Sí | Bien |
| alcance (104 p) | las cuatro áreas de IA sobre el núcleo | ~6 s por área; el orden ~10 s | Sí: lo básico del alquiler antes | Sí, cada área en una frase | Sí: anticipa el capítulo 6 | Sí: bloques apilados | Aceptable: lista de cuatro, pero cada área se desarrolla después |
| outro (80 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en "impulsor" (palabra poco usada). Mitigación: definición + ejemplo de la competencia. **Qué preguntaría:** "¿entonces las metas del equipo son inventadas?" La escena `origen` lo responde sin descalificar: son metas elegidas, y hay que saberlo.

### Guion
**Total:** 771 palabras habladas, unos 5,8 min de voz a 2,2 palabras/s, más 20,2 s de pausas escritas (≈ 6,2 min).

#### 1. `intro` · Capítulo 2 (54 palabras, ~25 s + 0,8 s de pausas)

*Visual:* Repaso visual del capítulo 1: los tres problemas en miniatura. Una línea de tiempo con los días 15, 16 y 17 de octubre; en el 16 se encienden dos íconos: una nube (con la nota «capítulo 3») y una hoja de objetivos (resaltada). Título.

- ¿Recuerdas los tres problemas de MobilityCorp? Vehículos fuera de lugar, baterías por cambiar y clientes ocasionales.
- En sus dos primeros días, el equipo hizo dos cosas. Eligió la nube, que veremos en el capítulo 3, y escribió qué quería lograr el negocio.  
  <small>(say: «En sus dos primeros días, el equipo hizo dos cosas. Eligió la nube, que veremos en el capítulo tres, y escribió qué quería lograr el negocio.»)</small>
- Empecemos por lo segundo.  
  <small>(pausa 0,8 s)</small>
- Capítulo 2: antes de la IA, el negocio.  
  <small>(say: «Capítulo dos: antes de la IA, el negocio.»)</small>

#### 2. `nota` · Una nota al margen (102 palabras, ~46 s + 3 s de pausas)

*Visual:* Redibujar el primer borrador real (commit b7d92fb, archivo «business requirements.md»): una hoja con seis renglones que aparecen uno por uno. El sexto, «Leverage AI for Optimization», queda resaltado; a su lado aparece en letra manuscrita la nota original, traducida: «no es un objetivo del negocio, es una solución». Al final, una fecha (19 oct) y el renglón se tacha.

- El 16 de octubre, el primer borrador listaba seis objetivos del negocio.  
  <small>(say: «El dieciséis de octubre, el primer borrador listaba seis objetivos del negocio.»)</small>
- Aumentar ingresos. Crecer en Europa. Operar con más eficiencia. Mejorar la experiencia. Cumplir las normas.
- Y uno más: usar IA para optimizar.  
  <small>(pausa 0,8 s)</small>
- Al lado, una integrante del equipo dejó una nota: eso no es un objetivo del negocio, es una solución.  
  <small>(pausa 1,2 s)</small>
- ¿Por qué importa? Porque un objetivo dice qué gana la empresa. La IA es una forma de lograrlo, entre otras.
- Si pones la herramienta como meta, cualquier uso de IA parece un éxito, aunque no mueva ningún número.  
  <small>(pausa 1 s)</small>
- Tres días después, ese objetivo ya no estaba en la lista.

#### 3. `cadena` · Impulsor, meta, solución (128 palabras, ~58 s + 3 s de pausas)

*Visual:* Redibujar la tabla «Drivers → Goals → Solutions» de requirements/1_0_Business goals & drivers.md como tres columnas unidas por flechas. Cada columna se ilumina al nombrarla. Luego una sola fila de ejemplo recorre la cadena: Eficiencia operativa → bajar costos de mantenimiento 23 % a fines de 2026 → IA para mantenimiento y ubicación de la flota. Al final, una flecha recorre la fila de derecha a izquierda (el filtro).

- El equipo ordenó su razonamiento en una cadena de tres eslabones.
- Primero, los impulsores del negocio: las fuerzas que deciden si le va bien o mal. Por ejemplo, la competencia: si no hay un scooter cerca, el cliente se va a otro servicio.
- Después, las metas: objetivos que se pueden medir y tienen fecha.
- Y recién al final, las soluciones. Ahí aparece la IA.  
  <small>(pausa 1 s)</small>
- Un ejemplo de su tabla. La eficiencia operativa es un impulsor. La meta: bajar los costos de mantenimiento un 23 % para fines de 2026. Y la solución: IA para optimizar el mantenimiento y la ubicación de la flota.  
  <small>(say: «Un ejemplo de su tabla. La eficiencia operativa es un impulsor. La meta: bajar los costos de mantenimiento un veintitrés por ciento para fines de dos mil veintiséis. Y la solución: IA para optimizar el mantenimiento y la ubicación de la flota.»; pausa 1 s)</small>
- Leída de derecha a izquierda, la cadena es un filtro: cada pieza de IA tiene que poder señalar la meta que mueve.  
  <small>(pausa 1 s)</small>

#### 4. `origen` · De dónde salen los números (94 palabras, ~43 s + 2 s de pausas)

*Visual:* Tres cajones etiquetados: «dado por el cliente», «calculado», «supuesto». Las cifras del equipo (23 %, 96 %, 15 %) caen en «supuesto». El 10.400 del capítulo 1 cae en «calculado» y los 5.000 scooters en «dado». Los cajones quedan en pantalla hasta el final de la escena; se reutilizan en el capítulo 8.

- Ojo con ese 23 %. El pliego no traía datos económicos: el cliente dijo en vivo que no los había inventado.  
  <small>(say: «Ojo con ese veintitrés por ciento. El pliego no traía datos económicos: el cliente dijo en vivo que no los había inventado.»)</small>
- Así que las metas del equipo, como un 96 % de satisfacción o un 15 % más de mercado, son metas que el equipo eligió. El repositorio no tiene un cálculo detrás.  
  <small>(say: «Así que las metas del equipo, como un noventa y seis por ciento de satisfacción o un quince por ciento más de mercado, son metas que el equipo eligió. El repositorio no tiene un cálculo detrás.»; pausa 1 s)</small>
- Fijar metas no está mal. Lo importante es saber qué tipo de número tienes delante.
- Un número puede venir dado por el cliente, puede ser calculado, o puede ser supuesto. Cada uno merece una confianza distinta.  
  <small>(pausa 1 s)</small>

#### 5. `supuestos` · Los supuestos (108 palabras, ~49 s + 2,6 s de pausas)

*Visual:* Redibujar requirements/4_Assumptions and constraints.md como dos listas: «Supuestos» y «Restricciones». Al definir cada palabra, se ilumina su lista. Luego dos columnas enfrentadas, «el pliego» y «el equipo», con una sola fila: 5.000 bicicletas por país contra 500 por ciudad; un signo de desigualdad rojo entre ambas. Debajo, una miniatura de la diapositiva 2 de la presentación final con «500 eBikes» marcado.

- Lo mismo vale para lo que el equipo dio por cierto. Lo anotó en un documento de supuestos y restricciones.
- Un supuesto es algo que das por cierto para poder avanzar, aunque nadie te lo confirmó.
- Una restricción es algo que te imponen, como operar solo en la Unión Europea.  
  <small>(pausa 0,8 s)</small>
- Escribirlos tiene una ventaja: cualquiera puede compararlos con el pliego. Y al compararlos, aparecen diferencias.  
  <small>(pausa 0,8 s)</small>
- El cliente habló de 5.000 bicicletas por país. El documento del equipo dice 500 por ciudad. Y esa cifra llegó hasta la presentación final.  
  <small>(say: «El cliente habló de cinco mil bicicletas por país. El documento del equipo dice quinientas por ciudad. Y esa cifra llegó hasta la presentación final.»; pausa 1 s)</small>
- El repositorio no explica el cambio. Puede ser un error al copiar, o una decisión que nadie escribió.

#### 6. `piensalo` · Piénsalo tú (101 palabras, ~46 s + 5 s de pausas)

*Visual:* Mapa con un scooter y su punto de GPS. Etiqueta: «supuesto del equipo: cada 30 minutos». Anillo de cuenta regresiva de 3 s. En la respuesta, el scooter recorre un viaje completo entre dos puntos de GPS (el viaje queda invisible para el sistema) y en la app aparece un scooter fantasma. Al final, dos sellos sobre el documento: «pliego: 30 segundos» y «Apéndice A del propio equipo: 30 segundos».

- Ahora tú. Otro supuesto del equipo: el GPS de cada vehículo informa su posición cada 30 minutos.  
  <small>(say: «Ahora tú. Otro supuesto del equipo: el GPS de cada vehículo informa su posición cada treinta minutos.»)</small>
- El cliente había dicho al menos cada 30 segundos. ¿Qué se rompe si te quedas con el supuesto?  
  <small>(say: «El cliente había dicho al menos cada treinta segundos. ¿Qué se rompe si te quedas con el supuesto?»; pausa 3 s)</small>
- Se rompe todo lo que necesita saber dónde está un vehículo ahora.
- Un viaje corto puede empezar y terminar entre dos reportes. La app mostraría scooters que ya no están ahí.
- El propio repositorio se contradice: otro documento, de los últimos días, dice cada 30 segundos. En este curso seguimos al pliego.  
  <small>(say: «El propio repositorio se contradice: otro documento, de los últimos días, dice cada treinta segundos. En este curso seguimos al pliego.»; pausa 1 s)</small>
- La regla: escribe tus supuestos, y compáralos con el pliego antes de construir encima.  
  <small>(pausa 1 s)</small>

#### 7. `alcance` · Qué se diseña (104 palabras, ~47 s + 1,6 s de pausas)

*Visual:* Una base gris rotulada «lo básico del alquiler: reservar, abrir, pagar, devolver». Encima se apilan cuatro bloques de color, uno por frase: diálogo con el usuario, precios dinámicos, pronóstico de demanda, optimización del mantenimiento (en el orden del README del equipo). Al final, el bloque del pronóstico late y una etiqueta lo une al problema 1 del capítulo 1.

- Con las metas claras, el equipo definió qué iba a diseñar.
- Primero, mantener funcionando lo básico del alquiler: reservar, abrir, pagar y devolver.
- Y encima, cuatro áreas con IA.  
  <small>(pausa 0,6 s)</small>
- El diálogo con el usuario: un asistente dentro de la app.
- Los precios dinámicos: que el precio cambie según la demanda, el clima o la competencia.
- El pronóstico de demanda: saber dónde se van a necesitar vehículos.
- Y la optimización del mantenimiento: baterías, traslados y tareas de los operarios.  
  <small>(pausa 1 s)</small>
- Fíjate: el problema número uno del cliente, los vehículos fuera de lugar, está en la lista. Pero no está primero. Ese orden va a tener consecuencias.

#### 8. `outro` · Para llevarte (80 palabras, ~36 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: la nota al margen, la cadena de tres eslabones, el pliego contra el supuesto. Al final, un enjambre de puntos (vehículos) que envían señales hacia un centro vacío con un signo de pregunta.

- Repasemos. La IA no es un objetivo: es una de las formas de llegar a uno.  
  <small>(pausa 0,6 s)</small>
- La cadena impulsor, meta, solución obliga a cada pieza de IA a señalar qué número mueve.  
  <small>(pausa 0,6 s)</small>
- Y los supuestos se escriben para poder compararlos con el pliego. Ahí aparecieron dos diferencias: las bicicletas y el GPS.  
  <small>(pausa 1 s)</small>
- En el próximo capítulo, miles de vehículos le hablan al sistema cada pocos segundos. ¿Quién sabe la verdad sobre cada uno?
- Capítulo 3: una sola fuente de verdad.  
  <small>(say: «Capítulo tres: una sola fuente de verdad.»)</small>


---

## Capítulo 3 · Una sola fuente de verdad

### Plan
- **Ideas esenciales:** (1) hacer la cuenta del tráfico de telemetría; (2) MQTT para aparatos pequeños y Pub/Sub para publicar una vez; (3) Fleet Service como fuente única de verdad (el cambio desde el primer boceto); (4) el precio: riesgo concentrado.
- **Anclas:** captions min 37 (30 s); ADR-0002 (0f1e34d); `hld/core-func/Vehicle Connectivity.png`; c9524d4 y 446bf8a (Location Service) → 8ba0904 (desaparece) → ADR-0007 (9ed6b7c); ADR-0001 (938eb08).
- **Puente:** la cuenta del capítulo 1.
- **Piénsalo:** dos copias del estado de batería, después de definir fuente única de verdad y antes de su precio.
- **Decisión de fuente:** la cuenta de ~350 mensajes/s es nuestra y se dice. Se usa 30 s (pliego), no 30 min.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (38 p) | — | ~17 s | — | — | — | Sí | Bien |
| volumen (112 p) | telemetría; la cuenta | Telemetría ~8 s; cuenta ~30 s + 1,8 s; orden de magnitud ~10 s + 1 s | Sí | Sí | Sí: muchos mensajes pequeños, señal que va y viene | Sí: la operación escrita y el contador fijo | Bien |
| mqtt (118 p) | MQTT; HTTP descartado; Pub/Sub; publicar/suscribirse | MQTT ~14 s; HTTP ~11 s + 1 s; Pub/Sub ~20 s + 2 s | Sí: el tráfico de la escena anterior | Sí: protocolo liviano; tablero de anuncios | Sí: batería, cortes, entrega garantizada; desacople | Sí: metáfora visual estable | Bien |
| boceto (81 p) | el primer diseño y su cambio | ~37 s + 1,8 s | Sí: se muestra el diseño antes del cambio | — | Se deja abierto a propósito (lo responde la escena siguiente) | Sí: superposición de diagramas lenta | Bien |
| verdad (122 p) | fuente única de verdad; reglas en el estado | Definición ~12 s + 1 s; reglas ~13 s + 1 s; alternativa ~12 s + 1 s (total **~56 s**) | Sí | Sí | Sí: estados que no coinciden, lógica repetida | Sí | Bien |
| piensalo (76 p) | aplicar | ~35 s + 4 s | Sí | — | Sí | Sí: dos medidores distintos | Bien |
| precio (77 p) | trade-off; riesgo concentrado | Trade-off ~8 s + 0,8 s; resto ~25 s | Sí: el costo antes de la palabra | Sí | Sí | Sí: balanza | Bien |
| nube (96 p) | nube; GCP por los mapas | Nube ~5 s; razones ~25 s | Sí | Sí | Sí: los mapas y la IA integrada | Sí | Bien (el lock-in se desarrolla en el cap. 7) |
| outro (77 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en "Pub/Sub" (nombre de producto). Mitigación: se dice qué es (mensajería de Google) y la metáfora del tablero. **Qué preguntaría:** "¿350 por segundo es mucho?" No se compara con nada externo para no inventar; se enfatiza el tipo de tráfico (pequeño, constante, de aparatos con poca batería), que es lo que decide MQTT.

### Guion
**Total:** 797 palabras habladas, unos 6,0 min de voz a 2,2 palabras/s, más 20,6 s de pausas escritas (≈ 6,4 min).

#### 1. `intro` · Capítulo 3 (38 palabras, ~17 s + 1 s de pausas)

*Visual:* La barra de 10.400 vehículos del capítulo 1 se deshace en puntos sobre un mapa; cada punto muestra un mini indicador de batería y posición. Título.

- ¿Recuerdas la cuenta del capítulo 1? Unos 10.400 vehículos por país.  
  <small>(say: «¿Recuerdas la cuenta del capítulo uno? Unos diez mil cuatrocientos vehículos por país.»)</small>
- Cada uno sabe dónde está y cuánta batería le queda. El sistema necesita saberlo también, todo el tiempo.  
  <small>(pausa 1 s)</small>
- Capítulo 3: una sola fuente de verdad.  
  <small>(say: «Capítulo tres: una sola fuente de verdad.»)</small>

#### 2. `volumen` · Haz la cuenta (112 palabras, ~51 s + 2,8 s de pausas)

*Visual:* Un vehículo emite un sobre pequeño (posición, batería) cada 30 s. La operación se escribe a la vista: 10.400 ÷ 30 ≈ 350 mensajes por segundo. Un contador que gira hasta 350 y queda fijo. Etiqueta permanente: «peor caso, todos en uso; cuenta de este curso». Debajo, la cita del ADR-0002: «miles a decenas de miles de dispositivos».

- Cada vehículo envía telemetría: datos sobre su propio estado, como posición y batería, que manda solo, sin que nadie los pida.
- El cliente pidió al menos un reporte cada 30 segundos mientras el vehículo está en uso.  
  <small>(say: «El cliente pidió al menos un reporte cada treinta segundos mientras el vehículo está en uso.»)</small>
- Hagamos el peor caso: los 10.400 en movimiento a la vez. Divides 10.400 entre 30.  
  <small>(say: «Hagamos el peor caso: los diez mil cuatrocientos en movimiento a la vez. Divides diez mil cuatrocientos entre treinta.»; pausa 0,8 s)</small>
- Son unos 350 mensajes por segundo, en un solo país, sin parar.  
  <small>(say: «Son unos trescientos cincuenta mensajes por segundo, en un solo país, sin parar.»; pausa 1 s)</small>
- Esa cuenta es nuestra: el equipo no la escribió. Su ADR habla de miles a decenas de miles de dispositivos.
- Pero el orden de magnitud es claro: muchos mensajes pequeños, de aparatos con poca batería y una señal móvil que va y viene.  
  <small>(pausa 1 s)</small>

#### 3. `mqtt` · Cómo hablan los vehículos (118 palabras, ~54 s + 3 s de pausas)

*Visual:* Redibujar el diagrama original hld/core-func/Vehicle Connectivity.png de izquierda a derecha: Dispositivos → Gateway y balanceador → Event Backbone (MQTT, Pub/Sub). Al hablar de HTTP, una flecha alternativa gruesa aparece tachada. Al explicar Pub/Sub, metáfora visual de un tablero de anuncios: un sobre se clava una vez y tres servicios lo leen. Un cuarto servicio nuevo llega y se suscribe sin tocar al vehículo.

- Para ese tráfico, el equipo eligió dos piezas. La primera se llama MQTT.
- MQTT es un protocolo de mensajes pensado para aparatos pequeños: mensajes livianos, que gastan poca batería y toleran cortes de señal.
- La alternativa obvia era que cada vehículo hiciera peticiones HTTP, como una app cualquiera. El equipo la descartó: es más pesada para estos aparatos y no garantiza la entrega.  
  <small>(pausa 1 s)</small>
- La segunda pieza es Pub/Sub, un servicio de mensajería de Google.  
  <small>(say: «La segunda pieza es Pab Sab, un servicio de mensajería de Google.»)</small>
- Funciona como un tablero de anuncios: quien produce un dato lo publica una vez, y cada servicio interesado se suscribe y lo recibe.  
  <small>(pausa 1 s)</small>
- Así el vehículo no necesita saber quién usa sus datos. Y si mañana aparece un servicio nuevo, solo se suscribe.  
  <small>(pausa 1 s)</small>

#### 4. `boceto` · El primer boceto (81 palabras, ~37 s + 1,8 s de pausas)

*Visual:* Redibujar el primer diagrama C4 (borrado del repositorio, commit c9524d4, archivo proposal_c4_container_scooter_rental_system_overview.mmd): Fleet Service, Location Service y Booking Service, con la flecha «avisa que un vehículo se reservó» de reservas a ubicación. En la línea 4 se superpone el diagrama del 19 de octubre (hld/core-func/Core Containers.drawio.png): el cuadro de Location Service se desvanece y su texto se desliza dentro de Fleet Service.

- Ahora, ¿quién guarda el estado de cada vehículo? El primer boceto del equipo, del 16 de octubre, tenía dos servicios para eso.  
  <small>(say: «Ahora, ¿quién guarda el estado de cada vehículo? El primer boceto del equipo, del dieciséis de octubre, tenía dos servicios para eso.»)</small>
- Un servicio de flota, que recibía los mensajes de los vehículos. Y un servicio de ubicación, que guardaba dónde estaba cada uno.
- El servicio de reservas, además, le avisaba al de ubicación cuando alguien reservaba un vehículo.  
  <small>(pausa 0,8 s)</small>
- Tres días después, en el diagrama nuevo, el servicio de ubicación ya no estaba.  
  <small>(pausa 1 s)</small>
- Su trabajo pasó entero al servicio de flota.

#### 5. `verdad` · Fuente única de verdad (122 palabras, ~55 s + 3 s de pausas)

*Visual:* El Fleet Service al centro, grande, con un sello «ADR-0007». Entra la telemetría por la izquierda; adentro se ven tres pasos: guarda el último estado, evalúa una regla (batería bajo el umbral), publica un evento «no disponible». A la derecha, viajes, mantenimiento y la app escuchan el mismo evento. Luego, versión alternativa en gris: tres servicios con tres copias distintas de la batería, con un signo de alerta.

- El 20 de octubre, el equipo escribió el porqué en su ADR número 7: el servicio de flota es la fuente única de verdad del estado de cada vehículo.  
  <small>(say: «El veinte de octubre, el equipo escribió el porqué en su ADR número siete: el servicio de flota es la fuente única de verdad del estado de cada vehículo.»)</small>
- Fuente única de verdad quiere decir que hay un solo lugar donde ese dato es oficial. Los demás le preguntan a él, o escuchan lo que publica.  
  <small>(pausa 1 s)</small>
- El servicio de flota recibe la telemetría, guarda el último estado y aplica reglas. Por ejemplo: si la batería baja del umbral, el vehículo deja de estar disponible para reservar.  
  <small>(pausa 1 s)</small>
- La alternativa era que cada servicio leyera la telemetría por su cuenta y armara su propia versión.
- El equipo la descartó por el riesgo de estados que no coinciden y de lógica repetida en varios lugares.  
  <small>(pausa 1 s)</small>

#### 6. `piensalo` · Piénsalo tú (76 palabras, ~35 s + 4 s de pausas)

*Visual:* Dos servicios lado a lado, viajes y mantenimiento, cada uno con su propio medidor de batería del mismo scooter: uno marca 40 %, el otro 8 %. Anillo de 3 s. En la respuesta, un operario camina hacia el scooter equivocado y, en la app, un cliente reserva uno que no puede salir. Al final, los dos medidores se funden en uno solo, dentro del Fleet Service.

- Ahora tú. Imagina esa alternativa: el servicio de viajes y el de mantenimiento guardan cada uno su copia de la batería de un scooter.
- Uno ya procesó el último mensaje; el otro, todavía no. ¿Qué puede salir mal?  
  <small>(pausa 3 s)</small>
- Mantenimiento manda a un operario a cambiar una batería que, para el otro servicio, está bien. O la app ofrece un scooter que ya no puede salir.
- Con una sola fuente, las dos decisiones miran el mismo dato.  
  <small>(pausa 1 s)</small>

#### 7. `precio` · El precio (77 palabras, ~35 s + 1,8 s de pausas)

*Visual:* Una balanza: a la izquierda «consistencia», a la derecha «riesgo concentrado». Al definir trade-off, la balanza se inclina hacia la consistencia y en el otro platillo aparecen tres pesas: copias en marcha, escalado automático, observación (las mitigaciones del ADR-0007).

- Nada es gratis. El equipo anotó el costo: el servicio de flota se vuelve crítico. Si se cae, casi todo se detiene.
- Su respuesta: varias copias en marcha, que se agregan solas cuando crece la carga, y buena observación de lo que pasa.
- Esto es un trade-off: un intercambio en el que, para ganar algo, aceptas perder otra cosa.  
  <small>(pausa 0,8 s)</small>
- Aquí ganas consistencia, y a cambio concentras el riesgo en una pieza que hay que cuidar mucho.  
  <small>(pausa 1 s)</small>

#### 8. `nube` · La nube, el segundo día (96 palabras, ~44 s + 1 s de pausas)

*Visual:* Línea de tiempo con el 16 de octubre marcado: aparece la tarjeta del ADR-0001 «GCP como proveedor principal». Tres íconos encajan en la nube: mapa (Google Maps), cerebro (Vertex AI), chispa (Gemini). Al final, un candado pequeño con la etiqueta «capítulo 7».

- Todo esto corre en la nube: servidores que alquilas a otra empresa, en vez de tener los tuyos.
- El equipo eligió Google Cloud el segundo día. El 16 de octubre, el ADR número 1 ya estaba escrito.  
  <small>(say: «El equipo eligió Google Cloud el segundo día. El dieciséis de octubre, el ADR número uno ya estaba escrito.»)</small>
- La razón principal fueron los mapas. Google Cloud se integra directo con Google Maps, y casi todo en este negocio pasa sobre un mapa.
- La segunda razón: sus herramientas de IA, como Vertex AI y los modelos Gemini, vienen integradas.  
  <small>(pausa 1 s)</small>
- Esa comodidad tiene un precio, y lo vamos a ver en el capítulo 7: depender de un solo proveedor.  
  <small>(say: «Esa comodidad tiene un precio, y lo vamos a ver en el capítulo siete: depender de un solo proveedor.»)</small>

#### 9. `outro` · Para llevarte (77 palabras, ~35 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: el contador en 350 por segundo, el tablero de anuncios, el Fleet Service al centro. Al final, la tabla de requisitos del equipo con una columna nueva vacía que se ilumina (anticipo del capítulo 4).

- Repasemos. Haz la cuenta del tráfico: cientos de mensajes por segundo, en un solo país.  
  <small>(pausa 0,6 s)</small>
- MQTT y Pub/Sub: mensajes livianos, publicados una vez, para quien los necesite.  
  <small>(say: «MQTT y Pab Sab: mensajes livianos, publicados una vez, para quien los necesite.»; pausa 0,6 s)</small>
- Y un solo servicio que sabe la verdad sobre cada vehículo, con el riesgo concentrado y cubierto.  
  <small>(pausa 1 s)</small>
- Con los datos en orden, llega la pregunta del kata: ¿dónde va la IA? El equipo la respondió con una columna en una tabla.
- Capítulo 4: ¿IA generativa, aprendizaje automático o código?  
  <small>(say: «Capítulo cuatro: ¿IA generativa, aprendizaje automático o código?»)</small>


---

## Capítulo 4 · ¿IA generativa, aprendizaje automático o código?

### Plan
- **Ideas esenciales:** (1) tres herramientas con costos y riesgos distintos; (2) la columna que obliga a elegir por escenario; (3) el híbrido: IA generativa solo en el borde del lenguaje libre, el dinero siempre en código; (4) dónde no usarla: el consejo de carga.
- **Anclas:** 0d0036f y 95046f0 (`requirements/2_FRs.md`); ADR-0012 (b424c11, 168c5ce); ADR-0021 (971a0c1, 355cdd0); ADR-0018 (2526e17).
- **Puente:** el criterio del jurado del capítulo 1 ("¿dónde decidiste no usarla?").
- **Piénsalo:** precios dinámicos, calcular vs. explicar, después del asistente y del consejo de carga.
- **Honestidad:** se anuncia que no todas las etiquetas siguen la regla (rutas de operarios, cap. 6). En el guion no se discute la etiqueta "GenAI" para el pronóstico de costos de mantenimiento (FR 2K), que también es discutible; queda registrada aquí.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (41 p) | — | ~19 s | — | — | — | Sí | Bien |
| herramientas (143 p) | código; aprendizaje automático; IA generativa; LLM | Código ~13 s + 1 s; ML ~25 s + 1 s; IA generativa y LLM ~23 s + 1 s | Sí: un ejemplo concreto por herramienta | Sí, las tres y LLM | Sí: costo, velocidad, riesgo | Sí: tres tarjetas acumuladas, 65 s en pantalla | Bien |
| columna (96 p) | tabla de escenarios; "híbrido" | ~44 s + 1,8 s | Sí | Sí | Sí: cada fila con su motivo | Sí: solo tres filas | Bien |
| asistente (115 p) | flujo híbrido; dinero en código | ~52 s + 2 s | Sí: lo que pide la gente antes del diseño | — | Sí: costo por mensaje; la IA conversa pero no ejecuta | Sí: flujo de dos ramas | Bien |
| carga (102 p) | no usar IA generativa | ~46 s + 2,2 s | Sí: el scooter con poca batería | — | Sí: plantillas alcanzan, costo | Sí | Bien |
| piensalo (96 p) | aplicar al precio | ~44 s + 4 s | Sí | — | Sí: precisión numérica | Sí: dos casilleros | Bien |
| regla (57 p) | la escalera de herramientas | ~26 s + 1 s | Sí (síntesis de lo visto) | Sí | Sí | Sí | Bien |
| outro (73 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en el flujo del asistente (dos componentes de IA en una frase). Mitigación: el visual de dos ramas y la síntesis "lo caro y probabilístico quedan solo donde aportan". **Qué preguntaría:** "¿por qué no IA generativa para todo, si entiende todo?" Respuestas en el guion: costo por mensaje, latencia, errores con seguridad, sin control para pagos.

### Guion
**Total:** 723 palabras habladas, unos 5,5 min de voz a 2,2 palabras/s, más 17,2 s de pausas escritas (≈ 5,8 min).

#### 1. `intro` · Capítulo 4 (41 palabras, ~19 s + 1 s de pausas)

*Visual:* Los cuatro casilleros del jurado (capítulo 1); se iluminan el primero y una nota: «¿dónde decidiste no usarla?». Luego la tabla de requisitos del equipo, en gris, con una columna vacía a la derecha que se ilumina con la fecha 17 oct. Título.

- ¿Recuerdas al jurado? Quería IA generativa útil, y saber dónde decidiste no usarla.
- El 17 de octubre, el equipo agregó una columna a su tabla de requisitos. Esa columna ordenó todo lo demás.  
  <small>(say: «El diecisiete de octubre, el equipo agregó una columna a su tabla de requisitos. Esa columna ordenó todo lo demás.»; pausa 1 s)</small>
- Capítulo 4: ¿IA generativa, aprendizaje automático o código?  
  <small>(say: «Capítulo cuatro: ¿IA generativa, aprendizaje automático o código?»)</small>

#### 2. `herramientas` · Tres herramientas (143 palabras, ~65 s + 3 s de pausas)

*Visual:* Tres tarjetas que entran una por vez y quedan alineadas: «Código» (un if con umbral; etiquetas: siempre igual, barato, se prueba), «Aprendizaje automático» (una curva aprendida de puntos históricos que predice las 8 de la mañana; etiquetas: necesita datos, rápido, devuelve números), «IA generativa / LLM» (una burbuja con texto libre; etiquetas: entiende lenguaje, cobra por uso, más lenta, puede equivocarse con seguridad). Las tres quedan en pantalla al final.

- Antes de la columna, las tres herramientas, una por una.
- La primera es código: reglas que escribes tú. Si la batería baja de cierto umbral, avisa. Hace siempre lo mismo, es barato, y lo puedes probar.  
  <small>(pausa 1 s)</small>
- La segunda es aprendizaje automático, en inglés machine learning: un modelo que aprende patrones de datos históricos y predice.
- Por ejemplo, cuántas bicicletas se van a pedir mañana a las 8 en una estación. Necesita datos para entrenarse, pero responde rápido, y con números.  
  <small>(say: «Por ejemplo, cuántas bicicletas se van a pedir mañana a las ocho en una estación. Necesita datos para entrenarse, pero responde rápido, y con números.»; pausa 1 s)</small>
- La tercera es IA generativa. Su motor es un LLM, un modelo de lenguaje grande: aprendió de enormes cantidades de texto, y genera texto nuevo.  
  <small>(say: «La tercera es IA generativa. Su motor es un ele ele eme, un modelo de lenguaje grande: aprendió de enormes cantidades de texto, y genera texto nuevo.»)</small>
- Entiende pedidos en lenguaje libre, como «quiero una ruta linda hasta el río». Pero cobra por uso, tarda más, y puede equivocarse con total seguridad.  
  <small>(pausa 1 s)</small>
- Para cada problema, la pregunta es cuál de las tres alcanza.

#### 3. `columna` · La columna (96 palabras, ~44 s + 1,8 s de pausas)

*Visual:* Redibujar la tabla de requirements/2_FRs.md en su versión del 17 de octubre (commits 0d0036f y 95046f0), con solo tres filas visibles y la columna «Tech Choice» resaltada: Pronóstico de demanda → ML; Consejo de precios → Código; Asistente de la app → Híbrido (GenAI, ML, Código). Al final se ilumina el comentario original de la fila del asistente: «Risk of overspending by using GenAI», con su traducción.

- Eso hizo el equipo. Su tabla listaba cada escenario de IA, con sus datos de entrada y de salida.
- Y la columna nueva decía qué herramienta usar: código, aprendizaje automático, IA generativa, o una mezcla, que llamaron híbrido.  
  <small>(pausa 0,8 s)</small>
- El pronóstico de demanda: aprendizaje automático. Es predecir números a partir de la historia.
- El consejo de precios al usuario: código. Solo muestra lo que el motor de precios ya calculó.
- El asistente de la app: híbrido. Y al lado, un comentario: riesgo de gastar de más con la IA generativa.  
  <small>(pausa 1 s)</small>
- Esa nota es el centro del capítulo.

#### 4. `asistente` · El asistente híbrido (115 palabras, ~52 s + 2 s de pausas)

*Visual:* Diagrama de flujo basado en el ADR-0012: un teléfono con botones y un campo de texto. Rama 1 (botones) → «función programada», en verde, con la etiqueta «sin costo por mensaje». Rama 2 (texto libre) → «IA generativa entiende» → «clasificador ML decide» → tres salidas: función programada, soporte, respuesta conversada. Un candado sobre «reservar / pagar» que siempre termina en código.

- El asistente vive dentro de la app. Puedes tocar botones, o escribir lo que quieras.
- Casi todo lo que la gente pide es predecible: reservar, ver un precio, buscar estacionamiento cerca.
- Para eso, el equipo usa código: cada botón dispara una función ya programada. Sin IA generativa, y sin costo por mensaje.  
  <small>(pausa 1 s)</small>
- Cuando escribes texto libre, la IA generativa entiende el pedido. Y un clasificador de aprendizaje automático decide a dónde va: a una función programada, a soporte, o a una respuesta conversada.
- Las acciones con dinero, como reservar o pagar, siempre terminan en código. La IA generativa conversa, pero no ejecuta.  
  <small>(pausa 1 s)</small>
- Así, lo caro y lo probabilístico quedan solo donde aportan: entender lenguaje libre.

#### 5. `carga` · Dónde no usarla (102 palabras, ~46 s + 2,2 s de pausas)

*Visual:* Un scooter avanzando por un mapa con pendiente; su batería baja. Aparece un cálculo simple: carga, distancia, pendiente → «probabilidad de no llegar: alta». Sale una notificación de plantilla con un hueco que se rellena con el estacionamiento más cercano. Al lado, la tarjeta de la IA generativa se tacha con la etiqueta «ADR-0021: no hace falta».

- Ahora el caso contrario: el consejo de carga.
- Vas en un scooter y la batería baja. ¿Llegas a destino, o te conviene cambiar de ruta?
- Un modelo de aprendizaje automático sencillo calcula la probabilidad de quedarte sin batería, con tu carga, la distancia y la pendiente.
- Si el riesgo es alto, te avisa con un mensaje de plantilla: el estacionamiento más cercano está en tal lugar.  
  <small>(pausa 1 s)</small>
- El equipo descartó la IA generativa a propósito: el aviso cabe en plantillas, y no justifica el costo.  
  <small>(pausa 1,2 s)</small>
- Es la respuesta directa a la pregunta del jurado: aquí decidimos no usarla, y este es el porqué.

#### 6. `piensalo` · Piénsalo tú (96 palabras, ~44 s + 4 s de pausas)

*Visual:* Una etiqueta de precio que cambia con íconos alrededor (demanda, nube de lluvia, estadio, competidor). Debajo, dos casilleros vacíos: «calcular el precio» y «explicar el precio». Anillo de 3 s. En la respuesta se llenan: calcular → ML + reglas (margen mínimo, normas locales); explicar → IA generativa, con una burbuja de ejemplo. Fuente: ADR-0018.

- Ahora tú. Los precios dinámicos: el precio cambia según la demanda, el clima, los eventos y la competencia.
- Hay dos trabajos: calcular el precio, y explicárselo al cliente. ¿Qué herramienta pondrías a cargo de cada uno?  
  <small>(pausa 3 s)</small>
- El equipo lo partió así: un modelo de aprendizaje automático calcula el precio, y reglas en código aplican los límites, como el margen mínimo o las normas locales.
- La IA generativa solo explica: el precio está más alto por un evento en la zona.
- Que calculara ella fue una alternativa descartada: no es confiable con la precisión de los números.  
  <small>(pausa 1 s)</small>

#### 7. `regla` · La regla (57 palabras, ~26 s + 1 s de pausas)

*Visual:* Una escalera de tres peldaños: código abajo, aprendizaje automático en el medio, IA generativa arriba, con la leyenda «sube solo si el de abajo no alcanza». Al final, una tarjeta pequeña en gris: «rutas de los operarios → capítulo 6».

- La regla del capítulo: empieza por lo más simple que resuelve el problema.
- Código si alcanza. Aprendizaje automático si hay que predecir. IA generativa solo donde hace falta entender o producir lenguaje.  
  <small>(pausa 1 s)</small>
- No todas las etiquetas del equipo siguen esa regla. En el capítulo 6 veremos una, las rutas de los operarios, que el podio resolvió distinto.  
  <small>(say: «No todas las etiquetas del equipo siguen esa regla. En el capítulo seis veremos una, las rutas de los operarios, que el podio resolvió distinto.»)</small>

#### 8. `outro` · Para llevarte (73 palabras, ~33 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: las tres herramientas, la columna Tech Choice, el asistente con el candado en el pago. Al final, una foto de un auto devuelto con un sello «¿sucio?» y un signo de pregunta (anticipo del capítulo 5).

- Repasemos. Tres herramientas: código, aprendizaje automático e IA generativa, cada una con su costo y su riesgo.  
  <small>(pausa 0,6 s)</small>
- Una columna en la tabla obliga a elegir, escenario por escenario.  
  <small>(pausa 0,6 s)</small>
- Y lo híbrido pone la IA generativa solo donde aporta, con el dinero siempre en código.  
  <small>(pausa 1 s)</small>
- Pero aun bien ubicada, la IA se equivoca. ¿Qué haces cuando una IA decide cobrarle una tarifa a un cliente?
- Capítulo 5: confiar en una IA que se equivoca.  
  <small>(say: «Capítulo cinco: confiar en una IA que se equivoca.»)</small>


---

## Capítulo 5 · Confiar en una IA que se equivoca

### Plan
- **Ideas esenciales:** (1) un modelo probabilístico se equivoca de dos formas, y hay que decidir cuál duele más; (2) bandas de confianza con revisión humana, y la duda a favor del cliente; (3) las correcciones alimentan el modelo siguiente; (4) MLOps: evaluar antes, vigilar la deriva después, y mirar el negocio.
- **Anclas:** FR#2L (`2_FRs.md`, umbrales 90/80 y el riesgo de falsos positivos); ADR-0014 y ADR-0016 (ac13ebd); NFR_9 (80 % durante 14 días); ADR-0011; `hld/mlops/README.md`; ADR-0020 (85/70).
- **Puente:** la foto de devolución del capítulo 1, y la pregunta "¿cómo sabrás si responde bien?" del piénsalo del capítulo 1 (implícita).
- **Piénsalo:** un caso al 85 %, después de las bandas.
- **Honestidad:** los porcentajes son metas, no mediciones (escena `abierto`).

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (57 p) | el caso de la limpieza | ~26 s + 1 s | Sí | — | Sí | Sí | Bien |
| riesgo (104 p) | confianza; falso positivo; falso negativo | Confianza ~9 s; cada error ~8 s + 1 s; cuál duele más ~10 s + 1 s | Sí | Sí, con ejemplo cada uno | Sí: confianza del cliente y el objetivo de hábito | Sí: tabla 2×2 con dos celdas | Bien |
| bandas (102 p) | bandas; human-in-the-loop; costo de los cortes | Bandas ~22 s + 2,2 s; HITL ~10 s + 1 s; costo ~8 s | Sí: las bandas antes del nombre | Sí | Sí: la duda favorece al cliente | Sí: la regla de colores queda fija | Bien |
| circuito (88 p) | correcciones como datos; acuerdo entre revisores | ~40 s + 2 s | Sí | Sí | Sí | Sí | Bien |
| mlops (121 p) | deriva; MLOps; evaluación previa; reentrenamiento | Deriva ~14 s + 1 s; MLOps ~9 s + 1 s; evaluación y monitor ~23 s (total con `negocio` **~81 s**) | Sí: la pregunta "¿un mes después?" antes del nombre | Sí | Sí: cámaras y estaciones cambian | Sí: ciclo de cinco estaciones | Bien |
| negocio (57 p) | métrica de negocio como señal | ~26 s + 2 s | Sí | — | Sí | Sí | Bien |
| piensalo (61 p) | aplicar las bandas | ~28 s + 4 s | Sí | — | Sí | Sí | Bien |
| abierto (56 p) | metas, no resultados; cortes por modelo | ~26 s + 1 s | — | — | Sí: cada decisión tiene su costo de error | Sí | Bien |
| outro (70 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** "deriva" y "MLOps" en la misma escena. Mitigación: deriva con caso propio (cámaras, estaciones) y pausa de 1 s antes de MLOps. **Qué preguntaría:** "¿quién paga las revisiones humanas?" Respondido: los cortes tienen costo, y las revisiones son la fábrica de datos.

### Guion
**Total:** 716 palabras habladas, unos 5,4 min de voz a 2,2 palabras/s, más 20 s de pausas escritas (≈ 5,8 min).

#### 1. `intro` · Capítulo 5 (57 palabras, ~26 s + 1 s de pausas)

*Visual:* La cámara del teléfono del capítulo 1 toma una foto de un auto devuelto. Una caja «IA» mira la foto y emite un sello «limpieza: 100 €». Título.

- ¿Recuerdas la foto que el cliente sube al devolver un vehículo? Es la prueba de que lo dejó bien.
- Con autos y camionetas, el equipo quiso que una IA mirara esas fotos y decidiera si el vehículo quedó sucio. Si quedó sucio, se cobra una tarifa de limpieza.  
  <small>(pausa 1 s)</small>
- Capítulo 5: confiar en una IA que se equivoca.  
  <small>(say: «Capítulo cinco: confiar en una IA que se equivoca.»)</small>

#### 2. `riesgo` · Dos errores (104 palabras, ~47 s + 2,6 s de pausas)

*Visual:* Una regla horizontal de 0 a 100 % con un indicador: la confianza del modelo. Luego una tabla de dos por dos simple: lo que dice la IA (sucio / limpio) contra la realidad. Se iluminan solo dos celdas, una por frase: falso positivo (rojo, cliente cobrado de más) y falso negativo (ámbar, tarifa perdida). Al final, la celda roja crece y aparece la cita del requisito FR#2L: «AI false positives damaging customer trust».

- El modelo mira las fotos y da un veredicto, con un número de confianza: qué tan seguro está, de 0 a 100 %.  
  <small>(say: «El modelo mira las fotos y da un veredicto, con un número de confianza: qué tan seguro está, de cero a cien por ciento.»)</small>
- El problema es que se equivoca. Y hay dos formas de equivocarse.  
  <small>(pausa 0,6 s)</small>
- Un falso positivo: dice sucio, y estaba limpio. Le cobras a alguien que no lo merece.
- Un falso negativo: dice limpio, y estaba sucio. Pierdes la tarifa, y el próximo cliente encuentra el auto sucio.  
  <small>(pausa 1 s)</small>
- El equipo escribió cuál le preocupaba más: los falsos positivos, porque dañan la confianza del cliente.  
  <small>(pausa 1 s)</small>
- Y ese cliente es justo el que la empresa quiere convertir en usuario de todos los días.

#### 3. `bandas` · Tres bandas (102 palabras, ~46 s + 3,2 s de pausas)

*Visual:* La regla de 0 a 100 se parte en tres franjas de color que aparecen una por frase: verde (>90 %, decide solo, guarda evidencia), ámbar (80–90 %, una persona revisa), gris (<80 %, no se cobra). Un ícono de persona entra en la franja ámbar. Al definir human-in-the-loop, un circuito con la persona dentro. Al hablar de costos, los cortes se deslizan y la franja ámbar se ensancha y se angosta.

- La respuesta del equipo fue partir la confianza en tres bandas.
- Por encima del 90 %, el sistema decide solo, y guarda la evidencia.  
  <small>(say: «Por encima del noventa por ciento, el sistema decide solo, y guarda la evidencia.»)</small>
- Entre 80 y 90 %, el caso va a una persona, que mira las fotos y confirma o corrige.  
  <small>(say: «Entre ochenta y noventa por ciento, el caso va a una persona, que mira las fotos y confirma o corrige.»; pausa 1 s)</small>
- Por debajo del 80 %, no se cobra nada. La duda favorece al cliente.  
  <small>(say: «Por debajo del ochenta por ciento, no se cobra nada. La duda favorece al cliente.»; pausa 1,2 s)</small>
- Este diseño se llama human-in-the-loop: humano en el circuito. La máquina decide lo fácil, y una persona decide lo dudoso.  
  <small>(pausa 1 s)</small>
- Y los cortes tienen su costo: más casos a revisión es más trabajo humano; menos casos, más errores automáticos.

#### 4. `circuito` · Cerrar el circuito (88 palabras, ~40 s + 2 s de pausas)

*Visual:* Basado en el ADR-0016: la persona revisora corrige un caso; la corrección se convierte en una foto etiquetada que viaja a una pila de «datos de entrenamiento»; la pila alimenta una versión nueva del modelo (v2). Luego dos revisoras miran la misma foto: si coinciden, tilde; si no, el signo de alerta apunta a las personas, no al modelo.

- Hay un detalle que convierte esto en algo más que un filtro.
- Cada vez que una persona corrige al modelo, esa corrección se guarda como un ejemplo nuevo, bien etiquetado.
- Con esos ejemplos se vuelve a entrenar el modelo, y la versión siguiente duda menos en esos casos.  
  <small>(pausa 1 s)</small>
- El equipo también pidió medir si los revisores coinciden entre sí. Si dos personas no se ponen de acuerdo, el problema no es el modelo.  
  <small>(pausa 1 s)</small>
- Las revisiones no son un costo perdido: son la fábrica de datos del modelo siguiente.

#### 5. `mlops` · MLOps (121 palabras, ~55 s + 2 s de pausas)

*Visual:* Redibujar el diagrama hld/mlops/MLOps on GCP.png simplificado en un ciclo de cinco estaciones: datos → entrenar → evaluar (compuerta: ¿supera al anterior?) → producción → monitorear deriva → vuelta a entrenar. Al hablar de deriva, las fotos de entrada cambian de tono (estaciones del año, cámaras nuevas) y se separan de la nube de entrenamiento. El ciclo queda en pantalla al final, con la etiqueta «Vertex AI».

- Ahora el modelo ya está en producción. ¿Cómo sabes, un mes después, que sigue funcionando?
- Los modelos se degradan. Cambian las cámaras de los teléfonos, cambian las estaciones del año, y los datos dejan de parecerse a los del entrenamiento.
- A eso se le llama deriva.  
  <small>(pausa 1 s)</small>
- Para manejarla existe MLOps: las prácticas que automatizan la vida de un modelo, desde entrenarlo hasta vigilarlo en producción.  
  <small>(say: «Para manejarla existe eme ele ops: las prácticas que automatizan la vida de un modelo, desde entrenarlo hasta vigilarlo en producción.»; pausa 1 s)</small>
- El plan del equipo, sobre Vertex AI, la plataforma de modelos de Google: cada versión nueva se evalúa antes de salir, y solo pasa si supera a la anterior.
- En producción, un monitor vigila la deriva. Si el modelo cae debajo del 80 % de acierto durante 14 días, se vuelve a entrenar.  
  <small>(say: «En producción, un monitor vigila la deriva. Si el modelo cae debajo del ochenta por ciento de acierto durante catorce días, se vuelve a entrenar.»)</small>

#### 6. `negocio` · La señal del negocio (57 palabras, ~26 s + 2 s de pausas)

*Visual:* Dos tableros lado a lado: «métrica técnica» (acierto del modelo, estable) y «métrica del negocio» (costo de mantenimiento por vehículo, subiendo). Un signo de alerta aparece solo en el segundo. Síntesis en dos líneas grandes.

- Una idea más, de su documento de MLOps: mirar también los números del negocio.  
  <small>(say: «Una idea más, de su documento de eme ele ops: mirar también los números del negocio.»)</small>
- Si un modelo de mantenimiento funciona, los costos de mantenimiento deberían bajar. Si suben, algo anda mal, aunque las métricas técnicas digan que todo va bien.  
  <small>(pausa 1 s)</small>
- La métrica técnica dice si el modelo acierta. La del negocio dice si acertar sirvió.  
  <small>(pausa 1 s)</small>

#### 7. `piensalo` · Piénsalo tú (61 palabras, ~28 s + 4 s de pausas)

*Visual:* La regla de tres bandas con un marcador en 85 %. Anillo de 3 s. En la respuesta, el marcador cae en la franja ámbar, entra la persona revisora y la flecha de corrección hacia los datos de entrenamiento.

- Ahora tú. Llega una devolución, y el modelo está seguro en un 85 % de que el auto quedó sucio.  
  <small>(say: «Ahora tú. Llega una devolución, y el modelo está seguro en un ochenta y cinco por ciento de que el auto quedó sucio.»)</small>
- Con las bandas del equipo, ¿qué pasa con esa tarifa?  
  <small>(pausa 3 s)</small>
- Va a revisión humana: está entre 80 y 90.  
  <small>(say: «Va a revisión humana: está entre ochenta y noventa.»)</small>
- Una persona mira las fotos antes de cobrar. Y si el modelo se equivocó, su corrección entrena al siguiente.  
  <small>(pausa 1 s)</small>

#### 8. `abierto` · Lo que queda abierto (56 palabras, ~25 s + 1 s de pausas)

*Visual:* Las tres bandas de limpieza (90 / 80) junto a las de detección de daños (85 / 70), del ADR-0020. Etiqueta sobre ambas: «metas elegidas por el equipo, no resultados medidos».

- Un aviso honesto: esos porcentajes son metas que el equipo eligió, no resultados medidos.
- Y los cortes cambian de modelo a modelo. Para detectar daños en la carrocería, el equipo usó otros: 85 y 70.  
  <small>(say: «Y los cortes cambian de modelo a modelo. Para detectar daños en la carrocería, el equipo usó otros: ochenta y cinco y setenta.»)</small>
- Eso está bien. Cada decisión tiene su propio costo de error, y sus cortes se ajustan con datos reales.  
  <small>(pausa 1 s)</small>

#### 9. `outro` · Para llevarte (70 palabras, ~32 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: la tabla de dos errores con la celda roja, las tres bandas, el ciclo de MLOps. Al final, un monumento con bicicletas amontonadas (el problema 1 del capítulo 1) y un reloj de arena casi vacío.

- Repasemos. Una IA probabilística se equivoca: decide qué error te duele más.  
  <small>(pausa 0,6 s)</small>
- Bandas de confianza: decide solo lo seguro, revisa lo dudoso, y en la duda, favorece al cliente.  
  <small>(pausa 0,6 s)</small>
- Y MLOps vigila la deriva, con métricas técnicas y del negocio.  
  <small>(say: «Y eme ele ops vigila la deriva, con métricas técnicas y del negocio.»; pausa 1 s)</small>
- Ahora sí, el problema número uno del cliente: vehículos en el lugar equivocado. El equipo lo diseñó al final.
- Capítulo 6: el vehículo correcto, en el lugar correcto.  
  <small>(say: «Capítulo seis: el vehículo correcto, en el lugar correcto.»)</small>


---

## Capítulo 6 · El vehículo correcto, en el lugar correcto

### Plan
- **Ideas esenciales:** (1) el problema n.º 1 se diseñó al final (lo prueba git; el porqué es inferencia, y se dice); (2) baterías y reubicación en un mismo circuito de operarios; (3) empezar por un modelo estadístico y escribir la condición para escalar; (4) la debilidad: rutas por IA generativa, frente al solver del segundo puesto.
- **Anclas:** fechas de `hld/scenarios/*` (b1f4b0e, 9fcd218, 1053f20, 4faf79d, 91e0c8b, 34760da); ADR-0022 (4b17796); 9d430ad; diagrama de baterías y asignación de flota; ADR-0019; Nimrods `docs/decisions/012-redistribution-optimizer-algo.md` y `005-dispatch-agent-orchestrator.md`.
- **Puente:** el problema 1 del capítulo 1 y el anuncio del capítulo 2 ("ese orden va a tener consecuencias"); la escalera remite a las bandas del capítulo 5.
- **Piénsalo:** ciudad nueva sin datos, después de la escalera.
- **Contrapunto del podio:** una sola vez, como en ADR-001 de KatArch.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (41 p) | — | ~19 s | — | — | — | Sí | Bien |
| orden (105 p) | el orden real de diseño | ~48 s + 2 s | Sí: las fechas antes de la conclusión | — | Inferencia marcada como "lectura posible" | Sí: línea de tiempo | Bien |
| operarios (125 p) | circuito de mantenimiento; vida útil de la batería; unión de tareas | Circuito ~20 s; batería ~10 s; unión ~17 s + 1 s | Sí | Sí | Sí: el operario ya está en la calle | Sí: flujo numerado | Bien |
| pronostico (87 p) | pronóstico de demanda; serie de tiempo | Pronóstico ~6 s; serie de tiempo ~10 s + 0,8 s; patrones ~15 s + 1 s | Sí: bicicletas y camionetas como ejemplo | Sí | Sí | Sí: gráfico semanal | Bien |
| escalera (122 p) | Prophet; dos modelos por flota; condición para escalar | Prophet ~15 s; separación ~8 s + 1 s; condición ~20 s + 1,2 s (total **~56 s**) | Sí | Sí ("modelo estadístico clásico") | Sí: rápido y explicable; escalar solo con evidencia | Sí: condición escrita a la vista | Bien |
| piensalo (60 p) | aplicar (arranque en frío) | ~27 s + 4 s | Sí | — | Sí | Sí | Bien |
| podio (124 p) | optimización de rutas; solver | ~56 s + 3 s | Sí: el problema de rutas antes de las soluciones | Sí: "herramienta matemática hecha para rutas" | Sí: calcular es matemática, conversar es lenguaje | Sí: pantalla partida | Bien |
| outro (66 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** "Prophet" y "OR-Tools" son nombres propios sin significado. Mitigación: cada uno se presenta por lo que hace, no por su nombre. **Qué preguntaría:** "¿por qué el ganador tiene una debilidad?" Respuesta implícita en el guion: el curso muestra aciertos y huecos; cerrarlo así refuerza la regla del capítulo 4.

### Guion
**Total:** 730 palabras habladas, unos 5,5 min de voz a 2,2 palabras/s, más 18,2 s de pausas escritas (≈ 5,8 min).

#### 1. `intro` · Capítulo 6 (41 palabras, ~19 s + 1 s de pausas)

*Visual:* El monumento con bicicletas amontonadas y el resto del mapa vacío (capítulo 1, problema 1). Debajo, la línea de tiempo del repositorio, todavía apagada. Título.

- ¿Recuerdas el problema más grande de MobilityCorp? Los vehículos no están donde la gente los necesita.
- El historial del repositorio muestra algo curioso: fue lo último que el equipo diseñó en detalle.  
  <small>(pausa 1 s)</small>
- Capítulo 6: el vehículo correcto, en el lugar correcto.  
  <small>(say: «Capítulo seis: el vehículo correcto, en el lugar correcto.»)</small>

#### 2. `orden` · El orden real (105 palabras, ~48 s + 2 s de pausas)

*Visual:* Línea de tiempo del 17 al 23 de octubre con una tarjeta por escenario, en la fecha de su primer commit: opiniones (17), rutas (18–19), precios y baterías (19), pronóstico de demanda (22) y su ADR-0022 (23, junto al ícono de cámara de la foto del repositorio). La tarjeta del pronóstico entra última y más grande. Una marca tenue en el 17 indica «el pronóstico ya era requisito». La frase de inferencia aparece con la etiqueta «lectura posible».

- Mira las fechas de cada escenario en el repositorio.
- El análisis de opiniones, el 17 de octubre. El asistente de rutas, entre el 18 y el 19. Los precios y las baterías, el 19.  
  <small>(say: «El análisis de opiniones, el diecisiete de octubre. El asistente de rutas, entre el dieciocho y el diecinueve. Los precios y las baterías, el diecinueve.»)</small>
- El pronóstico de demanda tuvo su diseño propio recién el 22, y su ADR, un día antes de la entrega.  
  <small>(say: «El pronóstico de demanda tuvo su diseño propio recién el veintidós, y su ADR, un día antes de la entrega.»; pausa 1 s)</small>
- Como requisito, el pronóstico estaba en la tabla desde el tercer día. Lo que llegó tarde fue su diseño.
- El repositorio no dice por qué. Una lectura posible: el jurado premiaba usos interesantes de IA generativa, y los escenarios con chat se diseñaron primero.  
  <small>(pausa 1 s)</small>
- Veamos qué hizo el equipo cuando llegó.

#### 3. `operarios` · El circuito de los operarios (125 palabras, ~57 s + 2 s de pausas)

*Visual:* Redibujar hld/scenarios/battery-replacement-and-fleet-allocation/Battery Replacement and Fleet Allocation.drawio.png como un flujo numerado de izquierda a derecha: scooter → Fleet Service (marca no disponible, avisa al cliente) → pedido de mantenimiento → modelo ML de batería (recargar o reemplazar) → app de los operarios. En la línea 5, una camioneta de operarios con baterías cargadas recoge un scooter y lo deja junto a una estación de tren (unión del 20 de octubre).

- Primero, las baterías. El servicio de flota, ¿recuerdas?, ve que la batería de un scooter bajó del umbral.
- Lo marca como no disponible, le avisa al cliente que termine su viaje, y crea un pedido de mantenimiento.
- Un modelo de aprendizaje automático estima el estado de la batería: cuánta vida útil le queda, para decidir si se recarga o se reemplaza.
- Y la app de los operarios les dice a dónde ir.  
  <small>(pausa 1 s)</small>
- El 20 de octubre, el equipo juntó dos tareas en este mismo circuito: cambiar baterías, y llevar vehículos a donde habrá demanda.  
  <small>(say: «El veinte de octubre, el equipo juntó dos tareas en este mismo circuito: cambiar baterías, y llevar vehículos a donde habrá demanda.»)</small>
- El operario que ya está en la calle con baterías cargadas, de paso, lleva scooters a donde se van a necesitar.  
  <small>(pausa 1 s)</small>
- Pero para eso, alguien tiene que saber dónde habrá demanda.

#### 4. `pronostico` · Pronosticar la demanda (87 palabras, ~40 s + 1,8 s de pausas)

*Visual:* Un gráfico de líneas por hora a lo largo de una semana: picos de bicicletas a la hora de ir y volver del trabajo (curva azul), camionetas que suben el fin de semana (curva naranja). Al nombrar el clima, una nube de lluvia aplana la curva azul; al nombrar eventos, un estadio produce un pico aislado.

- Pronosticar la demanda es predecir cuántos vehículos se van a pedir, en cada zona y a cada hora.
- Es un problema de series de tiempo: datos ordenados en el tiempo, como las reservas de cada hora, que repiten patrones.  
  <small>(pausa 0,8 s)</small>
- Las bicicletas se piden más a la hora de ir al trabajo. Las camionetas, más los fines de semana.
- Y el clima y los eventos de la ciudad lo mueven todo.  
  <small>(pausa 1 s)</small>
- Con aprendizaje automático, podrías lanzarte a un modelo grande y complejo. El equipo no empezó por ahí.

#### 5. `escalera` · Empezar simple (122 palabras, ~55 s + 2,2 s de pausas)

*Visual:* Una escalera de dos peldaños (basada en el ADR-0022). Peldaño 1: «modelo estadístico (Prophet)», con la curva descompuesta en tendencia + patrón diario + patrón semanal + feriados, y dos instancias: scooters y bicicletas / autos y camionetas. Peldaño 2: «ML más potente», con un candado. La condición del candado se escribe a la vista: error a 24 h > 30 % durante 4 semanas seguidas. Al final, un eco visual de las bandas del capítulo 5.

- Su ADR número 22 propone una escalera.  
  <small>(say: «Su ADR número veintidós propone una escalera.»)</small>
- Primer peldaño: un modelo estadístico clásico, llamado Prophet, que entiende patrones por hora, por día y por semana, y también feriados.
- Se pone en marcha rápido, y se puede explicar: muestra cuánto pesa la tendencia y cuánto pesa cada patrón.
- Hay un modelo para scooters y bicicletas, y otro para autos y camionetas, porque sus patrones son distintos.  
  <small>(pausa 1 s)</small>
- Segundo peldaño: modelos de aprendizaje automático más potentes. Pero solo si el primero falla de forma medible.
- La condición está escrita: si el error del pronóstico a 24 horas supera el 30 % durante cuatro semanas seguidas, se sube un peldaño.  
  <small>(say: «La condición está escrita: si el error del pronóstico a veinticuatro horas supera el treinta por ciento durante cuatro semanas seguidas, se sube un peldaño.»; pausa 1,2 s)</small>
- ¿Te suena? Es la lógica del capítulo anterior: una meta medible decide cuándo gastar más.

#### 6. `piensalo` · Piénsalo tú (60 palabras, ~27 s + 4 s de pausas)

*Visual:* Un mapa de una ciudad nueva, sin puntos, con un calendario vacío: «0 meses de datos». Anillo de 3 s. En la respuesta, una línea plana que sigue el promedio de los últimos días, con la etiqueta «hasta tener 3 meses», y flechas que traen patrones de dos ciudades parecidas. Fuente: tabla de riesgos del ADR-0022 (cold start).

- Ahora tú. MobilityCorp abre en una ciudad nueva. No hay historia: cero meses de datos.
- ¿Qué pronóstico usarías al principio?  
  <small>(pausa 3 s)</small>
- El equipo lo anotó en sus riesgos: un promedio simple, que se mueve con los últimos días, hasta juntar 3 meses de datos.  
  <small>(say: «El equipo lo anotó en sus riesgos: un promedio simple, que se mueve con los últimos días, hasta juntar tres meses de datos.»)</small>
- Y patrones prestados de ciudades parecidas. Sin datos, ni el modelo más sofisticado tiene de dónde aprender.  
  <small>(pausa 1 s)</small>

#### 7. `podio` · Lo que el podio hizo distinto (124 palabras, ~56 s + 3 s de pausas)

*Visual:* Un mapa con muchas paradas, una camioneta con capacidad limitada y un reloj de turno. Pantalla partida: izquierda, Five Nines (ADR-0019): «IA generativa arma la ruta + reglas para límites duros»; derecha, Nimrods, segundo puesto (docs/decisions/012-redistribution-optimizer-algo.md): «solver OR-Tools calcula la ruta; IA generativa conversa con el operario». Al final, la escalera de herramientas del capítulo 4 con la frase «calcular es matemática; conversar es lenguaje».

- Falta una pieza: con el pronóstico en la mano, ¿qué ruta sigue cada operario?
- Es un problema clásico de optimización: muchas paradas, camionetas con capacidad limitada, y turnos con horario.
- El equipo le encargó el armado de rutas a la IA generativa, con reglas en código para los límites duros, como la capacidad de cada camioneta.  
  <small>(pausa 1 s)</small>
- El segundo puesto, el equipo Nimrods, eligió otra cosa: un solver, una herramienta matemática hecha para calcular rutas, llamada OR-Tools.
- Su argumento: está diseñada para estos problemas, usa algoritmos probados, y es gratuita. La IA generativa la usaron para conversar con el operario sobre la propuesta.  
  <small>(pausa 1 s)</small>
- Calcular rutas es matemática; conversar es lenguaje. Es la regla del capítulo 4, y aquí el diseño ganador no la siguió.  
  <small>(say: «Calcular rutas es matemática; conversar es lenguaje. Es la regla del capítulo cuatro, y aquí el diseño ganador no la siguió.»; pausa 1 s)</small>

#### 8. `outro` · Para llevarte (66 palabras, ~30 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: la línea de tiempo con el pronóstico al final, la camioneta que cambia baterías y reubica, la escalera con su candado. Al final, el logo de Google Cloud con una etiqueta de precio que sube (anticipo del capítulo 7).

- Repasemos. El problema número uno del cliente se diseñó al final, y vale la pena notarlo.  
  <small>(pausa 0,6 s)</small>
- Cambiar baterías y mover vehículos van en el mismo circuito de los operarios.  
  <small>(pausa 0,6 s)</small>
- Y el pronóstico sube de peldaño solo cuando una meta medible lo pide.  
  <small>(pausa 1 s)</small>
- Hasta aquí, todo el diseño apuesta por Google. ¿Qué pasa si Google cambia los precios mañana?
- Capítulo 7: cuando el proveedor cambia las reglas.  
  <small>(say: «Capítulo siete: cuando el proveedor cambia las reglas.»)</small>


---

## Capítulo 7 · Cuando el proveedor cambia las reglas

### Plan
- **Ideas esenciales:** (1) atarse a un proveedor es válido si se elige con el costo escrito; (2) desde el 20 de octubre, cada ADR trae su tabla de riesgos; (3) salidas concretas; (4) el intermediario que elige el modelo (MoCoP).
- **Anclas:** captions min 54–59, 57–58, 68–69; 4497171, c0d4888, f7d0ef7, d27d2d2, 7dde15d, 0aa4148; ADR-0001 (competidores en GCP); ADR-0004 (respaldo en Maps API); `hld/scenarios/feedback-analysis/README.md`; ADR-0003/0014 (portabilidad); ADR-0013 (fbab35b → 17db325); ADR-0005 (nombre viejo).
- **Puente:** el tercer criterio del jurado (cap. 1) y la nube del día 2 (cap. 3).
- **Piénsalo:** Gemini triplica su precio; aplica la regla del capítulo 4 como defensa.
- **Honestidad:** dos cabos sueltos (ADR-0013 frente a Vertex; la sigla MCP).

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (46 p) | incertidumbre de proveedores | ~21 s + 1 s | Sí: tres ejemplos del anfitrión | — | Sí | Sí | Bien |
| apuesta (109 p) | Vertex AI, Gemini (recordatorio); vendor lock-in | Lock-in ~10 s + 1 s; postura del jurado ~10 s | Sí: la apuesta antes del nombre | Sí | Sí: competidores en GCP; elegir sabiendo el costo | Sí | Bien |
| seccion (89 p) | la tabla de riesgos en cada ADR | ~40 s + 2 s | Sí: ADRs sin riesgos antes del cambio | — | Sí: una decisión sin precio está a medias | Sí: relojes 10:59–11:03 | Bien |
| salidas (95 p) | tres salidas | ~10 s cada una + 1 s; síntesis ~8 s | Sí | Sí ("determinista", ya definido en cap. 1) | Sí | Sí: tres puertas | Bien |
| intermediario (97 p) | plano de control de modelos | **~44 s + 2 s** | Sí: las apps apuntando directo a un modelo antes del intermediario | Sí | Sí: cambiar sin tocar las apps; salir rápido | Sí | Bien |
| cabos (94 p) | dos inconsistencias; Model Context Protocol | ~20 s cada una | — | Sí (MCP en una frase) | Sí: confunde a cualquier lector | Sí: dos tarjetas | Aceptable: dos ideas, pero son honestidad, no conceptos para aprender |
| piensalo (64 p) | aplicar | ~29 s + 4 s | Sí | — | Sí | Sí | Bien |
| outro (71 p) | repaso | ~6 s por idea | — | — | — | Sí | Bien |

**Dónde se perdería:** en la escena `cabos` (dos siglas). Mitigación: el visual muestra los dos globos de MCP; la frase de cierre da la lección (una sigla con dos significados confunde). **Qué preguntaría:** "¿cómo se llama el proveedor del intermediario?" El repositorio no lo nombra; queda en `HISTORIA.md` §6.

### Guion
**Total:** 665 palabras habladas, unos 5,0 min de voz a 2,2 palabras/s, más 16,8 s de pausas escritas (≈ 5,3 min).

#### 1. `intro` · Capítulo 7 (46 palabras, ~21 s + 1 s de pausas)

*Visual:* El tercer casillero del jurado (nube con rayo) del capítulo 1 se agranda. Tres íconos aparecen con cada ejemplo: etiqueta de precio con flecha hacia arriba, calendario que pasa de mes, puerta que se cierra. Título.

- ¿Recuerdas el tercer criterio del jurado? La incertidumbre de la IA.
- El anfitrión del kata dio ejemplos concretos: hoy los precios de la IA generativa están subsidiados, los modelos cambian cada mes, y algunos proveedores van a cerrar.  
  <small>(pausa 1 s)</small>
- Capítulo 7: cuando el proveedor cambia las reglas.  
  <small>(say: «Capítulo siete: cuando el proveedor cambia las reglas.»)</small>

#### 2. `apuesta` · Todo en Google (109 palabras, ~50 s + 2,6 s de pausas)

*Visual:* La nube del capítulo 3 con sus tres piezas: Vertex AI, Gemini, Google Maps. Al definir vendor lock-in, unas cadenas finas unen cada pieza al sistema, y una flecha de «salida» se vuelve más larga con cada pieza agregada. Cita del anfitrión al pie: «puedes ir con todo a un proveedor; explica por qué en un ADR» (captions, minuto 57).

- Ya viste la apuesta del equipo: Google Cloud para todo.
- Vertex AI, la plataforma de Google para entrenar y servir modelos. Gemini, sus modelos de lenguaje. Y Google Maps, para los mapas.  
  <small>(pausa 0,8 s)</small>
- Su ADR de la nube daba un argumento más: competidores directos, como Bird y Dott, ya funcionan sobre Google Cloud. Es una tecnología probada en este negocio.  
  <small>(pausa 0,8 s)</small>
- Eso tiene un nombre en inglés: vendor lock-in, quedar atado a un proveedor. Cuantas más piezas suyas usas, más caro es irte.  
  <small>(pausa 1 s)</small>
- El jurado no prohibía atarse. Pedía otra cosa: que lo eligieras sabiendo el costo, y que lo escribieras.
- Eso hizo el equipo, aunque no desde el principio.

#### 3. `seccion` · Una sección nueva (89 palabras, ~40 s + 2 s de pausas)

*Visual:* Redibujar la plantilla adrs/ADR-0000 - Template.md: secciones Context, Decision, Key Differentiators, Alternatives, Conclusion. El 20 de octubre (commit 4497171) se inserta una sección nueva, «Risks & Trade-offs», con una tabla de tres columnas: riesgo, descripción, mitigación. Luego las tarjetas de los ADRs 1 a 4 reciben la misma tabla, una tras otra, con relojes que marcan 10:59, 11:01, 11:02 y 11:03. Varias tablas muestran «Vendor lock-in» en sus primeras filas.

- Sus primeros ADRs, los de la nube, la telemetría, Vertex y Gemini, explicaban por qué elegir cada pieza. No tenían una tabla de riesgos.
- El 20 de octubre, el equipo agregó esa sección a su plantilla de ADR: riesgos y trade-offs. Y esa misma mañana la completó en los cuatro ADRs anteriores.  
  <small>(say: «El veinte de octubre, el equipo agregó esa sección a su plantilla de ADR: riesgos y trade-offs. Y esa misma mañana la completó en los cuatro ADRs anteriores.»; pausa 1 s)</small>
- Desde ese día, cada decisión trae su tabla: el riesgo, qué lo causa, y cómo se mitiga. En muchas, el lock-in está entre los primeros.  
  <small>(pausa 1 s)</small>
- Una decisión sin su precio escrito está tomada a medias.

#### 4. `salidas` · Las salidas de emergencia (95 palabras, ~43 s + 1 s de pausas)

*Visual:* Un plano de edificio con tres puertas de emergencia que se encienden una por frase: 1) Gemini → API tradicional de Google Maps (ADR-0004), 2) Gemini → modelo propio más chico (hld/scenarios/feedback-analysis/README.md), 3) modelos entrenados → formatos portables (ADR-0003, ADR-0014). Al final, una etiqueta de precio que sube choca contra una pared sin puertas (versión sin salidas).

- Escribir el riesgo no alcanza: hay que dejar puertas para salir.
- Primera puerta: si Gemini falla o cambia, las funciones de mapas críticas vuelven a la API tradicional de Google Maps, que es determinista.
- Segunda: para analizar las opiniones de los usuarios, el equipo anotó que, si Gemini sube mucho de precio, se cambia a un modelo propio más chico.
- Tercera: los modelos que entrena el equipo se guardan en formatos portables, para poder llevarlos a otra plataforma.  
  <small>(pausa 1 s)</small>
- Ninguna puerta es gratis. Pero sin ellas, cada suba de precio del proveedor te encuentra sin opciones.

#### 5. `intermediario` · Un intermediario (97 palabras, ~44 s + 2 s de pausas)

*Visual:* Basado en el ADR-0013: tres aplicaciones (asistente, precios, mantenimiento) que antes apuntaban a un solo modelo ahora apuntan a una caja intermedia, «plano de control de modelos (MoCoP)». De la caja salen flechas a tres modelos; una regla cambia y la flecha salta de un modelo caro a uno más barato sin que las aplicaciones se muevan. Íconos en la caja: monedero (gasto), escudo (políticas), libreta (registro). Al final, un calendario «revisar a los 12 meses».

- La puerta más grande es una pieza que el equipo llamó plano de control de modelos.
- Funciona como un intermediario: las aplicaciones no le hablan directo a un modelo. Le hablan a esta pieza, y ella decide a qué modelo mandar cada pedido.
- Si un modelo empeora o se encarece, cambias la regla en el intermediario, y las aplicaciones ni se enteran.  
  <small>(pausa 1 s)</small>
- Además controla el gasto, aplica políticas, y registra cada pedido para poder auditarlo.
- El equipo eligió contratarlo como servicio, en vez de construirlo, para salir rápido. Y anotó revisar esa decisión a los 12 meses.  
  <small>(say: «El equipo eligió contratarlo como servicio, en vez de construirlo, para salir rápido. Y anotó revisar esa decisión a los doce meses.»; pausa 1 s)</small>

#### 6. `cabos` · Lo que no cierra (94 palabras, ~43 s + 2 s de pausas)

*Visual:* Dos tarjetas de «cabos sueltos». 1: el ADR-0013 tacha la opción «control plane nativo de Vertex» mientras los ADRs 0003, 0009 y 0011 ponen a Vertex en el centro; una flecha de interrogación entre ambos. 2: la sigla MCP con dos globos: «Model Control Plane» y «Model Context Protocol» (el servidor MCP de clima del diagrama de rutas); el commit 17db325 la renombra MoCoP, pero el ADR-0005 conserva «MCP».

- Hay dos cosas que no cierran del todo.
- Primera: ese ADR descarta la versión de Google del intermediario, mientras otros ADRs ponen a Vertex en el centro. El repositorio no explica cómo conviven las dos piezas.  
  <small>(pausa 1 s)</small>
- Segunda: el equipo llamó a esa pieza MCP. Pero MCP también es la sigla de otro estándar que aparece en sus diagramas, el Model Context Protocol, que conecta modelos con herramientas.  
  <small>(say: «Segunda: el equipo llamó a esa pieza eme ce pe. Pero eme ce pe también es la sigla de otro estándar que aparece en sus diagramas, el Model Context Protocol, que conecta modelos con herramientas.»)</small>
- Lo notó y la rebautizó MoCoP, pero en un ADR quedó el nombre viejo. Una sigla con dos significados confunde a cualquier lector.  
  <small>(say: «Lo notó y la rebautizó Mocop, pero en un ADR quedó el nombre viejo. Una sigla con dos significados confunde a cualquier lector.»; pausa 1 s)</small>

#### 7. `piensalo` · Piénsalo tú (64 palabras, ~29 s + 4 s de pausas)

*Visual:* Una etiqueta de Gemini cuyo precio se multiplica por tres. Dos tarjetas: «asistente de la app» y «consejo de carga». Anillo de 3 s. En la respuesta, la tarjeta del consejo de carga muestra la etiqueta «sin IA generativa (capítulo 4)» y no se mueve; la del asistente muestra los botones en verde (código) y solo el campo de texto libre en rojo.

- Ahora tú. Mañana, Gemini triplica su precio.
- ¿Qué sufre menos: el asistente de la app, o el consejo de carga del scooter?  
  <small>(pausa 3 s)</small>
- El consejo de carga no sufre nada: no usa IA generativa. ¿Recuerdas el capítulo 4?  
  <small>(say: «El consejo de carga no sufre nada: no usa IA generativa. ¿Recuerdas el capítulo cuatro?»)</small>
- Y el asistente sufre poco, porque la mayoría de los pedidos van por botones y código.
- Elegir bien la herramienta también es una defensa contra la incertidumbre.  
  <small>(pausa 1 s)</small>

#### 8. `outro` · Para llevarte (71 palabras, ~32 s + 2,2 s de pausas)

*Visual:* Tres tarjetas de repaso: la cadena del lock-in con su tabla de riesgos, las tres puertas, el intermediario. Al final, la cámara de la foto del repositorio (23 oct) y un claquetazo de video (anticipo del capítulo 8).

- Repasemos. Atarse a un proveedor es una decisión válida, si escribes su precio.  
  <small>(pausa 0,6 s)</small>
- Desde el 20 de octubre, cada ADR del equipo trae su tabla de riesgos.  
  <small>(say: «Desde el veinte de octubre, cada ADR del equipo trae su tabla de riesgos.»; pausa 0,6 s)</small>
- Y las salidas: alternativas deterministas, modelos portables, y un intermediario que elige el modelo.  
  <small>(pausa 1 s)</small>
- El 23 de octubre se tomó la foto del repositorio. El equipo pasó a la semifinal, y tenía que contar todo esto en 5 minutos.  
  <small>(say: «El veintitrés de octubre se tomó la foto del repositorio. El equipo pasó a la semifinal, y tenía que contar todo esto en cinco minutos.»)</small>
- Capítulo 8: contar la arquitectura.  
  <small>(say: «Capítulo ocho: contar la arquitectura.»)</small>


---

## Capítulo 8 · Contar la arquitectura

### Plan
- **Ideas esenciales:** (1) después de la foto, la arquitectura no cambia: cambia el relato, para una audiencia de negocio; (2) el reorden: tres casos de uso, con el problema n.º 1 primero; (3) compuertas de valor: "ganar antes, gastar después"; (4) números supuestos presentados como resultados, frente a reglas verificables. Cierre con el método completo.
- **Anclas:** `git diff ebf6d83 e930bcb --stat`; 87da42f y 3b1591c (`video/video-scenario-business-management-5min.md`, cifras en blanco); 88bedef (`video/narrative.md`); 02f177b (`FiveNines - 2025 AI kata final presentation.pdf`, pp. 6–8); d81160a (orden del README).
- **Puente:** la foto del 23 de octubre (caps. 1 y 7); los tres cajones de números (cap. 2); la escalera y las bandas (caps. 5 y 6).
- **Piénsalo:** proyección contra regla, después de mostrar ambas.
- **Decisión de fuente:** ante cifras distintas entre `narrative.md` y el PDF, no se elige ninguna: se muestra la discrepancia.

### Auditoría
| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (40 p) | — | ~18 s + 1 s | — | — | — | Sí: gráfico de commits | Bien |
| congelado (76 p) | solo cambia la comunicación | ~35 s + 2,6 s | Sí: la comparación antes de la conclusión | — | Sí: audiencia de negocio | Sí | Bien |
| reorden (95 p) | tres casos de uso; visión artificial | ~43 s + 2,8 s | Sí: el orden viejo antes del nuevo | Sí (visión artificial) | Sí: el problema n.º 1 primero | Sí: tarjetas que se reacomodan | Bien |
| compuertas (119 p) | compuerta de valor; fases 0–3; modo sombra | Compuerta ~9 s + 1 s; fases ~33 s + 1 s; lema y eco ~12 s + 1 s (total **~54 s**) | Sí: se enlaza con la escalera y las bandas | Sí | Sí: gastar solo con evidencia | Sí: camino con compuertas | Bien |
| cifras (114 p) | número supuesto presentado como resultado | ~52 s + 3,2 s | Sí: las cifras en blanco y después llenas | Sí (vuelve a los tres cajones) | Sí: sin cálculo y con discrepancias | Sí: dos hojas superpuestas | Bien |
| piensalo (73 p) | aplicar | ~33 s + 4 s | Sí | — | Sí | Sí | Bien |
| metodo (85 p) | repaso del método (6 pasos) | ~6 s por paso | — | — | — | Sí: 6 tarjetas, 6 s juntas | Bien (consolidación, no conceptos nuevos) |
| outro (68 p) | cierre | — | — | — | — | Sí | Bien |

**Dónde se perdería:** en la lista de fases (cuatro elementos). Mitigación: una frase por fase y el visual del camino; la idea que importa es la compuerta, no el contenido de cada fase. **Qué preguntaría:** "¿entonces el equipo mintió?" El guion evita juzgar: son supuestos presentados como resultados, y la lección es distinguirlos.

### Guion
**Total:** 670 palabras habladas, unos 5,1 min de voz a 2,2 palabras/s, más 20,8 s de pausas escritas (≈ 5,4 min).

#### 1. `intro` · Capítulo 8 (40 palabras, ~18 s + 1 s de pausas)

*Visual:* Gráfico de commits por día (datos reales del historial): barras altas del 15 al 24 de octubre, un hueco plano del 24 de octubre al 7 de noviembre, y tres barras pequeñas del 7 al 9 de noviembre. En el hueco, una marca «5 nov: semifinalistas (calendario de la sesión inaugural)». Título.

- Después de la foto del 23 de octubre, el repositorio queda quieto dos semanas. Ni un cambio.  
  <small>(say: «Después de la foto del veintitrés de octubre, el repositorio queda quieto dos semanas. Ni un cambio.»)</small>
- Según el calendario, el 5 de noviembre se anunciaron los semifinalistas. El 7, el equipo vuelve a escribir.  
  <small>(say: «Según el calendario, el cinco de noviembre se anunciaron los semifinalistas. El siete, el equipo vuelve a escribir.»; pausa 1 s)</small>
- Capítulo 8: contar la arquitectura.  
  <small>(say: «Capítulo ocho: contar la arquitectura.»)</small>

#### 2. `congelado` · Qué cambió (76 palabras, ~35 s + 2,6 s de pausas)

*Visual:* Un «diff» visual entre el repositorio de la semifinal (ebf6d83) y el final (e930bcb): las carpetas adrs/ y hld/ aparecen en gris con «0 cambios»; se iluminan solo los archivos nuevos: la tabla de metas (OKRs.md), el guion del video, la narrativa, la presentación en PDF y el README.

- Compara el repositorio de la semifinal con el de la final, y verás algo llamativo.
- Ni un ADR cambió. Ni un diagrama.  
  <small>(pausa 0,8 s)</small>
- Todo lo nuevo es comunicación: una tabla de metas de negocio, el guion del video, y la presentación.  
  <small>(pausa 1 s)</small>
- El guion del video lo dice en su título: es para una audiencia de negocio. Y una nota para quien presenta pide nombrar beneficios, no tecnologías.  
  <small>(pausa 0,8 s)</small>
- La arquitectura ya estaba decidida. Faltaba contarla para quien decide.

#### 3. `reorden` · Otro orden (95 palabras, ~43 s + 2,8 s de pausas)

*Visual:* Izquierda: los cinco escenarios en el orden del README (asistente de rutas, opiniones, baterías, precios, pronóstico). Derecha: los tres casos de uso de la presentación final (diapositiva 7). Las tarjetas se reacomodan con animación: el pronóstico salta al primer lugar, mantenimiento al segundo, visión al tercero; el asistente de rutas se desvanece. Al nombrar visión artificial, un ícono de cámara con un marco sobre un rayón.

- ¿Recuerdas el orden del README? Primero el asistente de rutas, después las opiniones, las baterías y los precios. El pronóstico, al final.
- En la presentación final, el orden se dio vuelta.  
  <small>(pausa 0,8 s)</small>
- Tres casos de uso, nada más. Primero, pronosticar la demanda y reubicar vehículos.
- Segundo, mantenimiento predictivo, y uso parejo de la flota.
- Tercero, visión artificial, la IA que analiza fotos, para daños y limpieza, con revisión humana.  
  <small>(pausa 1 s)</small>
- El asistente de rutas, el primero del README, no está entre los tres.
- El problema número uno del cliente pasó a ser lo primero que se cuenta.  
  <small>(pausa 1 s)</small>

#### 4. `compuertas` · Compuertas de valor (119 palabras, ~54 s + 3 s de pausas)

*Visual:* Redibujar la diapositiva 8 («Phased Rollout: Earn Sooner, Spend Later») como cuatro tramos de un camino separados por compuertas: Fase 0 (instrumentos de medición), Fase 1 (pronóstico estadístico, bandas de precio iniciales, registro manual de daños), Fase 2 (consejo de carga, uso parejo, visión en modo sombra con un ojo semitransparente), Fase 3 (automatización). Cada compuerta tiene un medidor que debe llegar a su marca para abrirse. Al final, miniaturas de la escalera del capítulo 6 y las bandas del capítulo 5 se encajan en las compuertas.

- El otro cambio es una idea que ordena todo: un portafolio de IA con compuertas de valor.
- Una compuerta es una condición medible que una fase tiene que cumplir para que se apruebe la siguiente.  
  <small>(pausa 1 s)</small>
- El plan tiene cuatro fases. La fase 0 solo instala medición: cuánto se usa la flota, cuánto se equivoca el pronóstico, cuántas disputas hay.  
  <small>(say: «El plan tiene cuatro fases. La fase cero solo instala medición: cuánto se usa la flota, cuánto se equivoca el pronóstico, cuántas disputas hay.»)</small>
- La fase 1 hace lo simple: pronóstico estadístico, y daños registrados a mano.  
  <small>(say: «La fase uno hace lo simple: pronóstico estadístico, y daños registrados a mano.»)</small>
- La fase 2 suma el consejo de carga y la visión en modo sombra, que observa sin decidir. Y recién la fase 3 automatiza.  
  <small>(say: «La fase dos suma el consejo de carga y la visión en modo sombra, que observa sin decidir. Y recién la fase tres automatiza.»; pausa 1 s)</small>
- Su lema: ganar antes, gastar después.
- ¿Te suena? Es la escalera del pronóstico y las bandas de confianza, llevadas a todo el proyecto.  
  <small>(pausa 1 s)</small>

#### 5. `cifras` · Las cifras del video (114 palabras, ~52 s + 3,2 s de pausas)

*Visual:* Dos hojas superpuestas: el guion del 8 de noviembre (video-scenario-business-management-5min.md) con renglones «__ % → __ %» en blanco, y el texto del 9 de noviembre (narrative.md) con «+32 %» y «240.000 €/mes». Luego, la misma métrica en dos fuentes, lado a lado: costo de mantenimiento por vehículo, narrative.md «78 € → 60 €» contra la diapositiva 7 «117,1 € → 79,08 €», con un signo de desigualdad. Al final vuelven los tres cajones del capítulo 2: las cifras caen en «supuesto».

- Ahora, un punto que hay que mirar con cuidado.
- El 8 de noviembre, el guion del video tenía las cifras en blanco: utilización, de tanto a tanto. Costo por vehículo, de tanto a tanto.  
  <small>(say: «El ocho de noviembre, el guion del video tenía las cifras en blanco: utilización, de tanto a tanto. Costo por vehículo, de tanto a tanto.»)</small>
- Al día siguiente aparecieron: 32 % más de utilización, 240.000 euros más de ingresos por mes.  
  <small>(say: «Al día siguiente aparecieron: treinta y dos por ciento más de utilización, doscientos cuarenta mil euros más de ingresos por mes.»; pausa 1 s)</small>
- Pero el repositorio no tiene el cálculo detrás. Y el texto del video y las diapositivas dan cifras distintas para lo mismo, como el costo de mantenimiento por vehículo.  
  <small>(pausa 1,2 s)</small>
- ¿Recuerdas el capítulo 2? Un número puede ser dado, calculado o supuesto. Estos son supuestos, presentados como resultados.  
  <small>(say: «¿Recuerdas el capítulo dos? Un número puede ser dado, calculado o supuesto. Estos son supuestos, presentados como resultados.»; pausa 1 s)</small>
- Las compuertas, en cambio, se sostienen: son reglas que cualquiera puede verificar.

#### 6. `piensalo` · Piénsalo tú (73 palabras, ~33 s + 4 s de pausas)

*Visual:* Un atril frente a tres siluetas de jueces y un reloj de 5:00. Dos tarjetas en la mano: «+32 % de utilización» y «solo pasamos a la fase 2 si el pronóstico mejora hasta tal error». Anillo de 3 s. En la respuesta, la tarjeta de la regla se apoya sobre una pila de ADRs; la de la proyección queda flotando con un signo de pregunta.

- Ahora tú. Tienes 5 minutos frente al jurado. Puedes mostrar una proyección, 32 % más de utilización, o una regla: solo pasamos a la fase 2 si el pronóstico baja su error hasta cierto punto.  
  <small>(say: «Ahora tú. Tienes cinco minutos frente al jurado. Puedes mostrar una proyección, treinta y dos por ciento más de utilización, o una regla: solo pasamos a la fase dos si el pronóstico baja su error hasta cierto punto.»)</small>
- ¿Cuál puedes defender con lo que hay en tu repositorio?  
  <small>(pausa 3 s)</small>
- La regla. Se apoya en decisiones escritas, y se puede comprobar.
- La proyección necesita su cálculo. Sin él, un juez atento lo va a preguntar.  
  <small>(pausa 1 s)</small>

#### 7. `metodo` · El método (85 palabras, ~39 s + 2 s de pausas)

*Visual:* Seis tarjetas numeradas que se acumulan en una columna, una por frase, cada una con el ícono de su capítulo: nota al margen (2), Fleet Service (3), escalera de herramientas (4), bandas de confianza (5), puertas de emergencia (7), compuertas (6 y 8). Quedan juntas 6 segundos al final.

- Recorramos el método del equipo de punta a punta.
- Uno: la IA es una solución, no un objetivo. Cada pieza señala la meta que mueve.
- Dos: datos en orden, con una sola fuente de verdad.
- Tres: para cada problema, la herramienta más simple que alcanza. Código, aprendizaje automático o IA generativa.
- Cuatro: confiar con método. Bandas de confianza, personas en lo dudoso, y vigilancia en producción.
- Cinco: escribir el precio de cada apuesta, y dejar salidas.  
  <small>(pausa 0,8 s)</small>
- Y seis: crecer por compuertas, ganando antes de gastar.  
  <small>(pausa 1,2 s)</small>

#### 8. `outro` · Para llevarte (68 palabras, ~31 s + 2,2 s de pausas)

*Visual:* La insignia de primer puesto en trazo simple. Debajo, la dirección del repositorio escrita: github.com/TheKataLog/Five-Nines. Las cuatro preguntas finales aparecen una por una y quedan en pantalla hasta el cierre.

- Five Nines ganó el kata con este razonamiento, con sus aciertos y con sus huecos, que también viste.
- Todos sus documentos son públicos, en el repositorio Five-Nines de TheKataLog, en GitHub.  
  <small>(say: «Todos sus documentos son públicos, en el repositorio Five Nines de The Kata Log, en GitHub.»; pausa 1 s)</small>
- Ahora tienes sus preguntas. ¿Qué meta mueve esta IA? ¿Cuál es la herramienta más simple que alcanza?
- ¿Qué pasa cuando se equivoca? ¿Y cuánto cuesta salir?  
  <small>(pausa 1,2 s)</small>
- Gracias por recorrer este curso. Ahora, a diseñar.

