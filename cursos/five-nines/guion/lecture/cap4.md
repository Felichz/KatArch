# Capítulo 4 · ¿IA generativa, aprendizaje automático o código?

*Versión «lecture-style» híbrida (skill `guion-curso`). Gancho concreto, pregunta en una frase, pasos con un caso que vuelve (el comentario del asistente), una sola pausa, cierre sobre el argumento. Sin opiniones del narrador. Los títulos son los pasos y no se dicen. [PAUSA] = silencio a propósito.*

---

## Un comentario al costado de una tabla

El viernes diecisiete de octubre, pasadas las ocho y media de la noche, el equipo agrega una columna a su tabla de requisitos. La tabla ya listaba cada escenario donde podía entrar la inteligencia artificial, con los datos que recibe y los que devuelve. La columna nueva pide algo más incómodo: decir con qué herramienta se va a resolver cada uno. Y en la fila del asistente de la aplicación, alguien deja un comentario corto, en inglés: riesgo de gastar de más usando inteligencia artificial generativa.

El comentario apunta a la primera pregunta del jurado vista desde el otro lado: no solo dónde la inteligencia artificial resuelve un problema real, sino dónde es mejor no usarla. Para contestarla, primero hay que conocer las herramientas que había sobre la mesa.

## Tres herramientas, tres costos

La primera es código, o sea, reglas que escribe una persona. Si la batería baja de cierto umbral, el sistema avisa. Hace siempre lo mismo, cuesta casi nada por cada ejecución y se puede probar con un test.

La segunda es aprendizaje automático, machine learning en inglés: un modelo que aprende patrones de datos históricos y con eso predice. Por ejemplo, cuántas bicicletas se van a pedir mañana a las nueve en una estación. Necesita datos para entrenarse, pero una vez entrenado responde rápido y devuelve números.

La tercera es la inteligencia artificial generativa. Su motor es un LLM, un modelo de lenguaje grande, que aprendió de enormes cantidades de texto y genera texto nuevo. Entiende pedidos escritos como los escribiría cualquiera, del estilo de «quiero una ruta tranquila hasta el río». Ahora bien, cobra por cada uso, tarda más que las otras dos, y puede equivocarse con total seguridad. Esa combinación es la que explica el comentario del viernes.

## La columna

Con esas tres opciones, la columna del equipo se lee casi sola. El pronóstico de demanda quedó como aprendizaje automático, porque se trata de predecir números a partir de la historia. El aviso de precio que ve el usuario quedó como código, porque solo muestra un número que ya se calculó en otro lado. Y el asistente de la aplicación quedó como una mezcla de las tres, que el equipo llamó híbrido, con el comentario del costo al lado.

Esa noche no quedó ninguna fila sin herramienta. A lo que obliga la columna es a hacer la pregunta escenario por escenario, en lugar de decidir una vez, en general, que el sistema «usa inteligencia artificial».

## El asistente, partido en tres

Tres días después, el equipo escribió cómo iba a funcionar ese asistente, que es el chatbot del capítulo uno. Vive dentro de la aplicación, y se le puede hablar tocando botones o escribiendo lo que uno quiera. Casi todo lo que la gente pide es previsible: reservar, ver un precio, buscar un estacionamiento cerca. Para eso hay código, de modo que cada botón llama a una función ya programada, sin modelo de lenguaje de por medio y sin costo por mensaje.

Cuando alguien escribe texto libre, la inteligencia artificial generativa entiende el pedido. Después, un clasificador de aprendizaje automático decide a dónde va: a una función programada, a soporte, o a una respuesta conversada. Y las acciones con dinero, como reservar o pagar, terminan siempre en código, porque el documento del equipo dice que la generativa no da control determinista sobre esas operaciones. Dicho de otra forma, conversa, pero no ejecuta. Lo caro y lo impredecible quedan reducidos al único tramo donde aportan algo, que es entender lenguaje libre.

Con esto se pueden contestar las dos preguntas que le hicimos al chatbot en el capítulo uno. ¿Qué problema del negocio resuelve? Según el documento, atraer clientes nuevos y retener a los que ya usan el servicio, que es el tercer problema, el del hábito. ¿Y cómo se sabe si responde bien? Cada conversación queda registrada, y se evalúan la calidad del diálogo y los indicadores del sistema.

## Dónde no usarla

El caso contrario es el consejo de carga. Vas en un scooter, la batería baja, y la pregunta es si llegas a destino o te conviene cambiar de ruta. El equipo resolvió eso con un modelo de aprendizaje automático sencillo. Mira la carga, la distancia y la pendiente del camino, y calcula la probabilidad de quedarte sin batería antes de llegar.

Si el riesgo es alto, el aviso sale de una plantilla: el estacionamiento más cercano está en tal lugar, o mejor elige una ruta más corta. En la decisión que escribió para este caso, el equipo descartó a propósito una capa de inteligencia artificial generativa para redactar ese aviso, porque las plantillas alcanzan. Es lo que pedía el encargo del kata: decir dónde se consideró la inteligencia artificial y se decidió no usarla, y por qué.

## Calcular un precio, y explicarlo

Hay otro escenario donde las tres herramientas se reparten el trabajo, y aquí el reparto es más fino. Son los precios dinámicos: un precio que cambia según la demanda, el clima, los eventos de la ciudad y la competencia. Ahí hay dos trabajos distintos, calcular el precio y explicárselo al cliente. Si tuvieras que repartirlos, ¿qué herramienta pondrías a cargo de cada uno?

[PAUSA]

El equipo lo partió así. Un modelo de aprendizaje automático calcula el precio. Encima, reglas en código aplican los límites que no se negocian, como el margen mínimo o las normas de cada ciudad. La inteligencia artificial generativa solo explica, con frases del estilo de «el precio está más alto por un evento en la zona». Que ella hiciera el cálculo figura entre las alternativas descartadas, con un motivo concreto: no es confiable cuando hace falta precisión con números.

## Lo que pedía el comentario

El comentario del viernes advertía sobre gastar de más. De las decisiones que siguieron sacamos nosotros una forma de decidir, que el equipo no escribió así pero que su columna sigue casi siempre. Se empieza por lo más simple que resuelve el problema. Código si alcanza, aprendizaje automático si hay que predecir, e inteligencia artificial generativa solo donde hace falta entender o producir lenguaje. Cada escalón que se sube agrega costo e incertidumbre.

No todas las etiquetas del equipo siguen esa regla, y en el capítulo seis vamos a ver una, la de las rutas de los operarios. Hay además un problema que la regla no resuelve. Aun bien ubicada, la inteligencia artificial se equivoca, y alguien tiene que decidir qué hacer cuando se equivoca con el dinero de un cliente.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Columna «Tech Choice» agregada el viernes 17 a las 20:39; comentario «Risk of overspending by using GenAI» en el asistente | 0d0036f (`requirements/2_FRs.md`) |
| Pronóstico = ML; consejo de precios = Code; asistente = Hybrid (GenAI, ML, Code); todas las filas con herramienta esa noche (23:36) | 0d0036f, 95046f0 |
| Ejemplos de la ruta hasta el río y de las bicicletas a las nueve | Ilustraciones del curso |
| Asistente híbrido (el chatbot): botones y texto libre; GenAI para entender; clasificador ML que enruta a función, soporte o conversación; reglas para funciones núcleo; sin control determinista para reservas y pagos | ADR-0012 (b424c11, lunes 20 a las 23:08: «tres días después» del 17) |
| Para qué sirve el asistente: «To attract new customers and retain existing ones» | ADR-0012, contexto |
| Cómo se evalúa: conversaciones registradas y evaluadas («dialogue quality and system KPIs») | ADR-0012, decisión (paso 5) y diferenciadores |
| Consejo de carga: ML simple con batería, posición, pendiente y distancia; avisos de plantilla; capa GenAI descartada («templates») | ADR-0021 (971a0c1, 22 de octubre) |
| Precios: ML calcula, reglas aplican margen mínimo y normas locales, GenAI explica; GenAI-only descartado por «numerical precision» | ADR-0018 (2526e17) |
| La escalera de herramientas | **Síntesis del curso**, dicha como tal |
| Las rutas de los operarios no siguen la regla | ADR-0019; ver cap. 6 |
