# Bloque 12 · Ver qué pasa

**Enseña:** cada forma de mirar un sistema contesta una pregunta distinta, y la que importa es si el negocio funciona, no solo si las máquinas están sanas; también se vigila lo que deja de pasar. Cuatro familias (registros, métricas, trazas, salud del negocio) con lo que gana y paga cada una.
**Par:** Farmacy Food prueba sus recorridos críticos con pedidos de prueba; ShopWise sigue cada conversación de su asistente con una herramienta instalada en casa. El silencio: el sensor que deja de mandar datos en MonitorMe.
**Trae (ver `ACTO2-CONTINUIDAD.md`):** Farmacy Food y su monolito modular (bloque 4); ShopWise y su asistente (bloque 8); MonitorMe, sus sensores y el analizador (bloques 2, 3 y 10). **Presenta:** ningún caso; latido, registro, métrica, traza, alerta, salud del negocio.

## Las máquinas sanas y el negocio roto {#gancho}

**Narración**

Las máquinas de Farmacy Food pueden estar todas sanas y el negocio, trabado. Cada servicio responde, la memoria y la red están bien, y aun así un pedido se queda quieto en algún paso. El equipo escribe que las métricas de máquinas y de red no dicen si el sistema está de verdad disponible.

Por eso cada servicio tiene dos controles. Uno es técnico, un latido que manda cada servicio para avisar que sigue vivo. El otro es de negocio. Un supervisor lanza cada tanto un mensaje de prueba por un recorrido crítico, por ejemplo hacer un pedido. Mide dos cosas, si el resultado es correcto y cuánto tardó.

Con eso se enteran cuando las máquinas están sanas pero algo en la lógica del negocio se trabó. Y lo que tarda cada recorrido, mirado mes a mes, muestra cuándo conviene separar un módulo o sumar máquinas, con datos en la mano. Medir el negocio así trae un costo. Los mensajes de prueba hay que diseñarlos dentro del código, eso suma trabajo y complejidad, y si se hacen mal pueden afectar a los pedidos reales.

**Visual**
- Estás aquí: la región "ver qué pasa".
- Sello: Farmacy Food. Tres servicios con medidores en verde (procesador, memoria, red) y un pedido trabado entre dos de ellos. Cada servicio late (un pulso verde). Un supervisor manda un mensaje de prueba que recorre los servicios; vuelve con un tilde y un cronómetro. Después, una curva del tiempo que sube con los meses y una flecha "separar un módulo".

## Cuatro familias {#familias}

**Narración**

Para enterarse de que algo anda mal hay cuatro familias, y cada una contesta una pregunta distinta.

Los registros son las anotaciones que deja cada servicio de lo que hizo, una por una. Ganan con el detalle de qué pasó. Pagan con volumen, porque crecen rápido y hay que saber buscar en ellos.

Las métricas son números a lo largo del tiempo, como cuántos pedidos entran por minuto o cuánto tarda una respuesta, y sobre ellas se ponen las alertas. Ganan con que muestran la tendencia de un vistazo. Pagan con que avisan que algo cambió, pero no por qué.

Las trazas siguen un mismo pedido por todos los servicios que toca. Ganan con que muestran dónde se demoró o dónde falló. Pagan con que cada servicio tiene que pasarle la marca del pedido al siguiente.

La salud del negocio prueba un recorrido entero como lo haría un cliente, como hace Farmacy Food. Gana con que ve lo que el cliente ve. Paga con pruebas que hay que construir y mantener dentro del sistema.

**Visual**
- El tramo del mapa: "ver qué pasa" en naranja y sus cuatro tarjetas.

## Las conversaciones, en casa {#shopwise}

**Narración**

ShopWise, la tienda en línea con su asistente de inteligencia artificial, necesitaba otra mirada. Para saber si el asistente responde bien, el equipo quería trazas, el recorrido de cada conversación paso por paso. También quería evaluar las respuestas sin poner cada cambio en producción.

Comparó tres herramientas. La que eligió se puede instalar en sus propias máquinas, y esa era una de sus condiciones, mantener el control sobre los datos sensibles. Así, las trazas de las conversaciones no salen de su infraestructura.

Tenerla en casa tiene su precio. Instalar y mantener esa herramienta corre por cuenta del equipo, y tiene menos documentación que otras, así que resolver un problema raro puede llevar más tiempo.

**Visual**
- Sello: ShopWise. Una conversación (globos) que entra al asistente; la traza: una fila de pasos con su tiempo. Tres herramientas; dos se apagan; la elegida entra dentro de una casa (el borde de la infraestructura). Debajo, "instalar y mantener" y "menos documentación" en ámbar.

## Qué mira cada uno {#par}

**Narración**

Farmacy Food y ShopWise miran cosas distintas. Farmacy Food se pregunta si el negocio funciona, y lo prueba de punta a punta como un cliente. ShopWise se pregunta qué pasó dentro de cada conversación, y sigue su recorrido paso por paso. Y las dos decisiones tienen su costo escrito, pruebas que construir en un caso y una herramienta que operar en el otro.

**Visual**
- Dos mitades: Farmacy Food (el mensaje de prueba que recorre los servicios y vuelve con tilde y cronómetro, "¿funciona el negocio?") y ShopWise (la traza de una conversación, "¿qué pasó adentro?").

## El sensor que se calla {#silencio}

**Narración**

Hay una falla que no hace ruido. En MonitorMe, si un sensor deja de mandar datos, nada se rompe. La pantalla simplemente deja de mostrar esa señal. Y un sensor de pulso callado no es lo mismo que un pulso normal.

El equipo recorrió el camino del dato, pieza por pieza, para ver qué hace cada una cuando el dato no llega. El que guarda no guarda nada, y el que muestra no muestra nada. El que analiza conserva la última lectura con su hora. Y sus reglas se pueden configurar para el caso en que el dato falta o es demasiado viejo. Entonces la regla no se aplica, o salta una alerta.

**Visual**
- Sello: MonitorMe. Un sensor de pulso → el que guarda, el que muestra, el que analiza (con su memoria). El sensor se apaga; la curva de la pantalla se corta en una línea plana gris. Se recorre cada pieza con un foco: "nada que guardar", "nada que mostrar"; en la memoria del analizador, "pulso 72 · hace 1 h"; la hora se pone naranja y sale una alerta.

## La pregunta que decide {#pregunta}

**Narración**

Todo esto apunta a lo mismo, cómo se entera el equipo de que algo anda mal antes que el cliente. Eso incluye lo que funciona en cada máquina pero no en el negocio, y lo que simplemente deja de pasar, como el sensor que se calla.

**Visual**
- El tramo del mapa con las cuatro familias; debajo, la pregunta.

## Notas de verificación

| Afirmación | Fuente |
|---|---|
| Farmacy Food ADR-004 (Accepted): un endpoint de salud por servicio; chequeo técnico con latido ("heartbeat pattern"); chequeo de negocio con "critical path scenarios" lanzados con un "dummy message from a dedicated supervisor", que mide "correctness of execution and time spent"; planificar la extracción y el escalado "based on facts"; "Business health checks add an additional level of safety in case of a healthy technical case, but something in a business logic stucked"; costo: "requires additional effort and increases cognitive complexity"; riesgo: impacto en los pedidos reales | `ArchColider/4.ADRs/004 Health check endpoints.md` |
| "hardware/network metrics don't provide information about actual system availability" | `ArchColider/2.SolutionBackground/SystemAppoach.md` l. 114-118 |
| "por ejemplo hacer un pedido" como recorrido crítico | Ejemplo del curso: los escenarios se definen en un taller de atributos de calidad (`SystemAppoach.md` l. 116) |
| ShopWise ADR007 (Accepted): evaluación sin desplegar ("offline evaluation"); trazas para depurar y monitorear; "Allow self-hosted deployment to maintain control over sensitive data"; tres opciones (LangFuse, Phoenix Arize, LangSmith); contras: "additional development effort to deploy and maintain a local instance", "less documentation and community support… potentially slowing troubleshooting" | `ConnectedAI/4_adrs/007_adr_evaulation_framework.md` |
| "las trazas de las conversaciones no salen de su infraestructura" | Deducción directa de instalarla en casa |
| MonitorMe, fitness function de un sensor que falla: el Recorder no guarda, el Streamer no muestra; la caché conserva la última señal con hora ("for example, from 1 hour ago"); reglas para dato inexistente o viejo: no se ejecuta o se envía una alerta | `BluzBrothers/FitnessFunctions/Failover.md` |
| Qué son registros, métricas, trazas y alertas; lo que gana y paga cada familia | Conocimiento general (externo), coherente con los ADR citados |

## Revisión por sombreros

| Paso | Sombrero | Qué encontró | Qué se decidió |
|---|---|---|---|
| 1 | Diseño del aprendizaje | El plan proponía la cuenta de latencia de MonitorMe como regla de comprobación; esa cuenta ya es el centro del bloque 3 | Se usa en su lugar el recorrido del sensor callado (ya verificado en la versión anterior del bloque 10): enseña a vigilar la ausencia |
| 1 | Diseño del aprendizaje | La decisión de monitoreo de Farmacy Food (DataDog) es el ejemplo de premisas que envejecen del bloque 13 | No se usa aquí; el gancho es el chequeo de salud (ADR-004) |
| 2 | Arquitecto senior | "Alerta" se menciona en tres lugares | Se define con las métricas ("sobre ellas se ponen las alertas") |
| 3 | Verificador | ADR-004 de Farmacy Food y ADR007 de ShopWise están en Accepted | Se narran como decididos |
| 3 | Verificador | "una hora" en la memoria del analizador es el ejemplo del documento | Se dibuja, no se narra |
| 4 | Guionista | "la medida del tiempo, sostenida en el tiempo" repetía "tiempo" | "lo que tarda cada recorrido, mirado mes a mes" |
| 5 | Espectador de prueba | "Latido" sin imagen | El visual lo dibuja como un pulso de cada servicio |
| 6 | Dirección visual | Tres casos en el bloque | Cada escena, un solo sello |
| 7 | Producción | Ids: `gancho`, `familias`, `shopwise`, `par`, `silencio`, `pregunta` | Bloque nuevo |
| 8 | Espectador de prueba (lectura seguida) | Sin hallazgos nuevos | Etapa terminada; queda la aprobación de Felix |
