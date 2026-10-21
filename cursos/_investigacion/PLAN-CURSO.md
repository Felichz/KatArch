# Plan del curso: organización y contenido (versión 2: método, territorio y práctica)

Un curso de arquitectura de software real hecho con lo mejor de los doce ganadores de las Architecture Katas. Este documento fija **qué se enseña, en qué orden y con qué ejemplos**. La división en videos se decide cuando el contenido esté escrito.

La versión 1 enseñaba el método (cómo se decide) con la práctica de los ganadores. La versión 2 suma **el territorio**: qué tipos de soluciones existen para cada problema típico, y qué gana y qué paga cada una. Sin el territorio, la parte de "qué otras opciones había" queda vacía para quien no las conoce.

## Lo que se lleva el espectador

1. **El territorio:** un mapa mental de las familias de soluciones para los problemas típicos de software, sistemas distribuidos e infraestructura. Familias, no nombres: los nombres cambian cada año, las familias casi no.
2. **El método:** cómo se decide entre ellas (cualidades, renuncias, cuentas, estilo, cortes) y cómo se deja escrito.
3. **La práctica:** decisiones reales de los doce ganadores, que muestran el método aplicado sobre el territorio.
4. **Una idea que atraviesa todo:** cada decisión descansa en premisas (costo de las personas, madurez de una tecnología, escala, presupuesto), y las premisas envejecen. Por eso se escriben: para saber cuándo hay que volver a decidir.

## Cómo aprende el espectador (el diseño se apoya en esto)

- **Organizador previo** (Ausubel): el mapa del territorio aparece vacío al principio, con sus regiones nombradas, para que cada cosa nueva tenga dónde caer.
- **Romance, precisión, generalización** (Whitehead): abrir con el todo (ClearView y el mapa), recorrer cada parte con rigor, cerrar volviendo al todo.
- **Pocas ideas, muchas combinaciones** (Whitehead): las ideas del método vuelven aplicadas en cada región del territorio.
- **Pares contrastados** (Gick y Holyoak; Schwartz y Bransford): en cada región, dos ganadores que eligieron familias distintas, y la comparación dicha en voz alta.
- **Espaciado e intercalado:** ClearView y los casos que vuelven reaparecen en cada bloque; el mapa se actualiza al final de cada uno.
- **Carga cognitiva** (Sweller): como máximo cuatro familias por región, cada una con su trade-off en una línea; un caso nuevo por vez, presentado en su propia frase.
- **La misma forma en cada bloque del territorio:** el espectador aprende la estructura una vez y después solo recibe contenido.

## El arco

| Acto | Bloques | Qué hace |
|---|---|---|
| Apertura | 0 | ClearView entero sin explicar, y el mapa del territorio vacío. Deja preguntas abiertas en los dos. |
| Acto 1 · Cómo se decide | 1 a 5 | El método. |
| Acto 2 · El territorio | 6 a 15 | Una región del mapa por bloque: familias, un par de ganadores, la pregunta que decide. |
| Cierre | 16 | ClearView de punta a punta: cada pieza cae en su región del mapa y la cadena de decisiones se arma encima. |

## Los casos

**Cinco casos que recorren el curso:** ClearView (columna vertebral, abre y cierra), MonitorMe, Farmacy Food, Sysops Squad (todo en Proposed: se dice "propone") y MobilityCorp.

**Invitados**, cada uno presentado en una frase al llegar: Farmacy Family (segunda fase del sistema de Farmacy Food), Spotlight, ShopWise, Certifiable, Wildlife Watcher. Hey Blue! entra solo si una región lo necesita (detectar cercanía en el teléfono o en el servidor, bloque 8).

**Fuera:** Road Warrior. Lo que aporta lo enseñan mejor otros casos, casi todas sus decisiones están en Proposed, y lo propio es detalle técnico.

## Acto 1 · Cómo se decide

Se mantiene el guion escrito en `cursos/curso-unico/guion-v2/` (bloques 1 a 5), con un cambio en el bloque 1.

| # | Bloque | Par | Cambio respecto de la versión 1 |
|---|---|---|---|
| 1 | Qué es una decisión de arquitectura | La base compartida de ClearView (qué la hace de arquitectura) y el ADR de fotos de MobilityCorp (las cuatro partes juntas) | DataDog sale de aquí: su premisa envejeció. Pasa al bloque 13 como el caso de una premisa que cambia. |
| 2 | Cualidades y renuncias | MonitorMe (desde las frases del pedido) y ClearView (desde las dificultades) | Ninguno. La renuncia "nombra la condición que la hace segura" prepara la idea de las premisas. |
| 3 | Comprobar con una cuenta | Latencia de MonitorMe y llamadas al modelo de ClearView | Ninguno. |
| 4 | El estilo | ClearView (basado en servicios, eventos donde hace falta) y Farmacy Food (monolito modular) | Ninguno. |
| 5 | Dónde se corta | Farmacy Family (criterio por dominio, no partir la seguridad) y Sysops Squad (grupos de cualidades) | Ninguno. |

## Acto 2 · El territorio

### La forma de cada bloque

1. **Un caso concreto que abre** el problema de la región.
2. **El problema en general,** en una frase.
3. **Las familias en el mapa:** de dos a cuatro tarjetas en la región, cada una con lo que gana y lo que paga en una línea. Nombres de tecnologías solo como ejemplo.
4. **Un par de ganadores que eligieron familias distintas,** con la comparación en voz alta.
5. **La pregunta que decide** en esta región.
6. **El mapa se actualiza** y vuelve una pieza de ClearView (o de otro caso que vuelve).

### Las regiones

Las familias y los ejemplos del corpus salen de los hallazgos de `texto/`. Lo que no está en el corpus se marca como conocimiento general en la tabla de verificación.

| # | Región | Familias | Par de ganadores | Pregunta que decide |
|---|---|---|---|---|
| 6 | **Guardar datos** | relacional; documentos; clave-valor y caché; series de tiempo; grafo; archivos y objetos; vectores. Más: quién es dueño de cada dato y qué consistencia se acepta | MonitorMe (series de tiempo para lecturas con hora, retención de 24 horas) y Farmacy Family (un almacén por tipo de necesidad: grafo para analítica, archivos para contenido). Dueño: MobilityCorp (un servicio dueño) y ClearView (base compartida, un solo escritor) | ¿Qué forma tiene el dato y cómo se va a consultar? ¿Quién puede cambiarlo? |
| 7 | **Mover y procesar** | llamada que espera; cola; stream; conexión abierta. En línea, por lotes, por calendario | Spotlight (stream: un evento, varios lectores) y Sysops Squad (cola: un mensaje, un destino). Lotes: Sysops Squad asigna tickets por lotes y factura con un trabajo mensual | ¿Hay que esperar la respuesta? ¿Cuántos leen? ¿Hay que guardarlo? ¿Tiene que ser ya? |
| 8 | **Dónde corre** | máquinas propias o en el hospital; contenedores con orquestador; contenedores o funciones gestionadas; en el dispositivo | MonitorMe (contenedores en el hospital, duplicados) y ShopWise (contenedores en una plataforma gestionada, sin operar el orquestador). En el dispositivo: el refrigerador de Farmacy Food con su memoria, la cámara de Wildlife Watcher | ¿Cuánto quiero controlar y cuánto quiero operar? ¿Dónde tiene que estar el cómputo? |
| 9 | **El borde** | gateway; una API por tipo de cliente; archivos directo al almacenamiento; quién inicia la conversación | Spotlight (GraphQL para sus aplicaciones, otro estándar para terceros) y Sysops Squad (un gateway por parte, sin lógica de negocio). Archivos: URL firmadas de Spotlight. Quién inicia: la cámara de Wildlife Watcher | ¿Quién entra, por dónde, y quién controla esa puerta? |
| 10 | **Cuando algo falla** | réplicas; segundo camino; reintentos y cola de fallidos; descartar duplicados; guardar y avisar sin quedar a medias; funcionar sin red | Farmacy Food (código PIN sin red) y MonitorMe (dos canales de alerta). Mensajes: Farmacy Food (descartar el duplicado) y Farmacy Family (bandejas de salida y entrada) | ¿Qué no puede perder el negocio, y qué pasa si esto falla? |
| 11 | **Identidad y datos sensibles** | proveedor de identidad; permisos; cifrado; anonimización; retención por niveles; achicar lo regulado | ClearView (un permiso que impide leer el currículum) y Farmacy Family (borrar una clave). Identidad: Spotlight compra un proveedor y lo envuelve. Retención: MobilityCorp. Alcance regulado: Sysops Squad | ¿Quién lo ve completo, cuánto dura y cómo se borra? |
| 12 | **Ver qué pasa** | registros; métricas; trazas; alertas; salud del negocio; reglas que se comprueban solas | Farmacy Food (pedidos de prueba que miden el negocio, no solo las máquinas) y ShopWise (autoaloja las trazas de conversaciones porque guardan datos sensibles). Reglas: la cuenta de latencia de MonitorMe como regla de comprobación | ¿Cómo me entero de que algo anda mal antes que el cliente? |
| 13 | **Comprar, construir y crecer** | comprar como servicio; abierto y operado por uno; gestionado; construir. Empezar simple con la salida escrita. **Premisas que envejecen** | Spotlight (compra lo que no es núcleo y lo envuelve) y ShopWise (construye su gateway). Crecer: MobilityCorp (umbral para pasar a un modelo propio) y Farmacy Food (medir el negocio para partir). Premisas: DataDog | ¿Qué tan cerca está esto de lo que nos hace distintos, y qué pagamos de cada lado? ¿Qué premisa sostiene la elección? |
| 14 | **IA en el sistema** | modelo gestionado o propio; recuperar contexto o entrenar; gateway de modelos; reglas alrededor; evaluación | ClearView (la IA extrae, una regla compara) y MobilityCorp (reglas y bandas de confianza). Medir: ShopWise (una métrica sola engaña) y Certifiable (un juez separado). Contexto: Certifiable recupera respuestas ya corregidas en vez de entrenar | ¿Qué no puede decidir el modelo y qué pasa cuando duda? |
| 15 | **Cambiar sin romper** | integración continua; infraestructura como código; activar para una parte; sombra; por fases. Lo que queda escrito | MobilityCorp (modelo nuevo en sombra) y Certifiable (IA en paralelo con personas). Escrito: ClearView (un rechazo con condición para reabrir) y MonitorMe (lo que queda fuera) | ¿Cómo sé que el cambio funciona antes de darle el control? |

### Premisas que envejecen (bloque 13)

El ADR de monitoreo de Farmacy Food propuso DataDog porque operar una opción gratuita costaba entre un quinto y la mitad del tiempo de una persona. La decisión estaba bien tomada para esa premisa. Hoy, con agentes de código, montar y configurar algo de código abierto cuesta mucho menos; operarlo (actualizar, atender incidentes, guardar datos) sigue costando. La balanza se movió, no se dio vuelta. La lección: escribir la premisa junto a la decisión, para saber cuándo reabrirla. Lo de los agentes de código es lectura nuestra y se dice como tal.

## El mapa como pieza visual

- **En la apertura:** el mapa vacío, con sus diez regiones nombradas, dispuestas como un plano de barrios. Ninguna familia todavía.
- **Al final de cada bloque del territorio (30 a 60 segundos):** la región se ilumina, aparecen sus familias (tarjetas), y la del ejemplo que se acaba de ver queda resaltada. El resto del mapa en segundo plano.
- **En el cierre:** cada pieza de ClearView vuela a su región del mapa (la base compartida a "guardar datos", la cola de reintentos a "cuando algo falla", el modelo externo a "IA"…), y la cadena de decisiones se dibuja por encima. Las dos cosas que crecieron durante el curso se juntan en una sola imagen.
- **Fuera del video:** el atlas, una página con el mapa completo, que se busca por problema, con familias, trade-offs, ejemplos de cada ganador enlazados a su fuente y una marca de madurez de cada familia (consolidada o en evaluación). Se actualiza sin rehacer videos.

## Cierre (bloque 16)

ClearView de punta a punta, como en la versión 1 (la cadena: poco dinero → base compartida → un escritor con permisos → anonimización impuesta → IA fuera de la decisión → pruebas por paso → integración asíncrona con reintentos → caché rechazado con condición), y además ubicado en el mapa. Termina con la pregunta que el espectador se lleva: qué obliga esta decisión, qué obliga ella, y qué premisa la sostiene.

## Riesgos y cómo se cuidan

- **Que el territorio se vuelva un catálogo:** cuatro familias como máximo por región, siempre con un caso real, y los nombres solo como ejemplo.
- **Dos cosas que crecen a la vez** (ClearView y el mapa): el mapa aparece al final de cada bloque; ClearView, como recordatorio breve. Se juntan solo en el cierre.
- **Que envejezca:** se enseñan familias y premisas, no productos. Los productos viven en el atlas.
- **Largo total:** unos diecisiete bloques. Con los bloques del territorio de 5 a 8 minutos, el curso queda entre una hora y media y dos horas. La división en videos se decide después.

## Del guion escrito a este plan

- **Se mantiene:** apertura (se suma el mapa vacío), bloques 2 a 5, la guía visual, los pares.
- **Cambia:** el bloque 1 (base compartida de ClearView en vez de DataDog).
- **Se reescribe sobre el material existente:** los bloques del territorio. Los actuales 6 (datos), 7 (comunicación), 8 (fallo), 9 (sensibles), 10 (comprar), 11 (IA) y 12 (cambiar) aportan los pares y la narración; se agregan las familias, la pregunta que decide y el tramo del mapa.
- **Nuevos:** dónde corre (8), el borde como bloque propio (9), ver qué pasa (12).
- **Cierre:** se suma ClearView en el mapa.

## Verificación pendiente

Los ejemplos de las regiones nuevas se releen contra la fuente antes de escribir: series de tiempo y caché de MonitorMe (ADR-003, ADR-019), almacenes de Farmacy Family (ADR-008, ADR-009), lotes y trabajos de Sysops Squad (ADR-3, ADR-10), contenedores gestionados de ShopWise (su ADR de despliegue), GraphQL de Spotlight (ADR-004 y ADR-002, Accepted; el ADR-006 de despliegue está en Proposed y no se usa como ejemplo principal), trazas de ShopWise (ADR-011), recuperar respuestas de Certifiable (ADR-003). Lo ya verificado está en la versión anterior de este plan y en las tablas de `guion-v2/`.
