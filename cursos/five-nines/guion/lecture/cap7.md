# Capítulo 7 · Cuando el proveedor cambia las reglas

*Versión «lecture-style» híbrida (skill `guion-curso`). Incluye «la nube, desde el primer día», movida desde el capítulo 3 (decisión de `ESTILO.md`). Gancho concreto (dos decisiones vacías a las ocho de la mañana), pregunta y ruta en una frase, pasos, una sola pausa, cierre sobre el argumento. Sin opiniones del narrador. Los títulos no se dicen. [PAUSA] = silencio a propósito.*

---

## Dos decisiones vacías

El jueves dieciséis de octubre, a las ocho y nueve de la mañana, el equipo crea dos decisiones de arquitectura que no dicen nada. Solo tienen título. Una se llama «selección del proveedor de nube» y la otra, «cómo se integran los vehículos». Todavía no había un solo requisito escrito. El orden de los archivos sugiere que el equipo ya sabía cuáles eran las dos primeras decisiones difíciles.

La segunda la vimos en el capítulo tres, con el scooter de la esquina. La primera es la que lleva a la tercera pregunta del jurado, la de cómo defenderse de la incertidumbre. La pregunta, en concreto, es qué hace un equipo cuando sabe que va a quedar atado a un proveedor.

## Por qué Google

La nube, dicho de la forma más sencilla, es alquilar servidores a otra empresa en lugar de tener los propios. Ese mismo día, por la noche, la primera decisión quedó escrita: Google Cloud. La razón principal fueron los mapas. Google Cloud se integra directamente con Google Maps, y en este negocio casi todo pasa sobre un mapa, desde reservar un scooter hasta saber dónde quedó. Con otros proveedores, según el documento, los mapas habrían necesitado una integración de terceros. Un rato después, el equipo sumó a Gemini, los modelos de lenguaje de Google, como un argumento más.

Ese documento trae otro dato. Dos competidores directos, Bird y Dott, ya funcionan sobre Google Cloud, y el equipo lo anotó como prueba de que es una tecnología probada en este negocio.

## Lo que cuesta quedarse

Con los días, la apuesta creció. Vertex AI, la plataforma de Google para entrenar y servir modelos, quedó en el centro de toda la inteligencia artificial. Gemini quedó a cargo de la conversación y de las búsquedas sobre mapas. Y Google Maps, de todo lo geográfico. Eso tiene un nombre en inglés, vendor lock-in, que quiere decir quedar atado a un proveedor: cuantas más piezas suyas usas, más caro es irte.

En la sesión inaugural, Sam Newman había sido concreto sobre esto. Los precios de la inteligencia artificial generativa hoy están subsidiados y van a subir, el mejor modelo cambia de un mes a otro, y algunos proveedores van a cerrar. Pero no prohibió atarse. Dijo que ir con todo a un proveedor es válido, siempre que se explique por qué en una decisión escrita.

## El precio, escrito

Los primeros documentos de decisión del equipo, los de la nube, la telemetría, Vertex y Gemini, explicaban por qué elegir cada pieza, pero no tenían una sección de riesgos. El lunes veinte, a las once menos un minuto de la mañana, el equipo agregó esa sección a su plantilla, con el nombre de riesgos y trade-offs. En los cinco minutos siguientes la completó en los cuatro documentos anteriores.

Desde ese día, cada decisión trae su tabla, con el riesgo, qué lo causa y cómo se mitiga. En más de la mitad hay una fila para el lock-in, y en siete es la primera. La decisión de la nube, por ejemplo, anota que el uso intensivo de mensajería, de datos y de mapas puede volver los costos difíciles de prever. Como mitigación, propone alertas de costo y cuotas desde el principio.

## Las salidas

Escribir el riesgo es la mitad del trabajo, y la otra mitad es dejar por dónde salir. El equipo dejó varias salidas, tres pequeñas y una grande. Si Gemini falla o cambia, las funciones de mapas críticas vuelven a la interfaz tradicional de Google Maps, que es determinista: con la misma consulta devuelve lo mismo. Para el análisis de las opiniones de los usuarios, anotó que, si Gemini sube mucho de precio, se cambia a un modelo propio más chico. Y los modelos que entrena el equipo se guardan en formatos que se pueden llevar a otra plataforma.

## Un intermediario entre las aplicaciones y los modelos

La grande es una pieza que el equipo llamó plano de control de modelos. Funciona como un intermediario. Las aplicaciones, el asistente, los precios o el mantenimiento, no le hablan directo a un modelo: le hablan a esta pieza, y ella decide a qué modelo mandar cada pedido. Si un modelo empeora o se encarece, se cambia la regla en el intermediario, y las aplicaciones no se enteran. Además controla el gasto, aplica las políticas de datos y registra cada pedido para poder auditarlo.

El equipo decidió contratarlo como servicio en vez de construirlo, para salir rápido, y anotó que había que revisar esa elección a los doce meses. El repositorio no dice qué proveedor tenía en mente.

## Si Gemini triplica su precio

Ahora juntemos esto con el capítulo cuatro. Pongamos que mañana Gemini triplica su precio. ¿Qué sufre menos, el asistente de la aplicación o el consejo de carga del scooter?

[PAUSA]

El consejo de carga no sufre nada, porque nunca usó inteligencia artificial generativa: el equipo decidió que bastaba un modelo sencillo y unas plantillas. Y el asistente sufre poco, porque la mayoría de los pedidos van por botones y por código, y la generativa solo entra con el texto libre. Esto ya es una lectura nuestra: elegir la herramienta más simple que alcanza también protege contra el proveedor.

## La primera decisión

La decisión que el equipo creó vacía aquel jueves por la mañana fue la primera en escribirse, y todas las demás quedaron apoyadas en ella. El equipo no evitó quedar atado a Google. Lo que hizo fue elegirlo con las razones a la vista. Desde el lunes veinte, cada decisión anotó también sus riesgos, y para los más serios dejó por dónde salir.

El jueves veintitrés, un minuto antes de la medianoche en la costa este de Estados Unidos, los jueces tomaron la foto del repositorio. Después había que contar todo esto en cinco minutos.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Dos ADRs solo con título el jueves 16, 08:09–08:10: «Cloud Provider Selection» y «Vehicle telemetry & integration stack» | 38af982, 9ac6a7d |
| ADR-0001 a las 19:50: GCP por integración nativa con Maps; AWS y Azure requieren integración de mapas de terceros o más trabajo; Gemini agregado a las 20:33 | 938eb08, d46d913 |
| Competidores Bird y Dott sobre GCP, «proven technology stack» | ADR-0001, sección «Competitors» |
| Vertex AI como plataforma central; Gemini con Maps grounding | ADR-0003, ADR-0004 |
| Precios subsidiados que suben, el mejor modelo cambia mes a mes, proveedores que cierran; ir con todo a un proveedor es válido si se escribe en un ADR | Subtítulos, min 54–59, 57–58, 68–69 |
| Sección «Risks & Trade-offs» agregada a la plantilla el lunes 20 a las 10:59 y completada en los ADRs 0001–0004 hasta las 11:04 | 4497171; c0d4888, f7d0ef7, d27d2d2, 7dde15d, 0aa4148 |
| Lock-in en la sección de riesgos de 12 o 13 de los 22 ADRs; primera fila en 0001, 0003, 0006, 0009, 0010, 0011 y 0013 | Conteo sobre el repositorio (12 de octubre de 2026) |
| ADR-0001: costos impredecibles por Pub/Sub, BigQuery y Maps; alertas de costo y cuotas | ADR-0001, tabla de riesgos |
| Respaldo en la API tradicional de Maps | ADR-0004 |
| Modelo propio más chico si sube el precio de Gemini | `hld/scenarios/feedback-analysis/README.md` |
| Formatos portables para los modelos | ADR-0003 («Keep model artifacts portable») y ADR-0014 («Keep artifacts exportable») |
| Plano de control de modelos como SaaS: enrutamiento entre proveedores, políticas, registro para auditoría, control de costos; revisar a los 12 meses | ADR-0013 |
| El proveedor del SaaS no se nombra | `HISTORIA.md` §6 |
| Foto del repositorio el 23 de octubre a las 23:59 ET | Subtítulos, min ~72 |
