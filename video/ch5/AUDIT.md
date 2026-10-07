# Auditoría pedagógica · Capítulo 5 (Qué se construye y qué se alquila)

Vara: `video/PEDAGOGY.md`. Espectador tipo: un desarrollador con un par de años de experiencia, que nunca diseñó un sistema entero, no conoce DDD ni "capa anticorrupción" y no puede pausar.

Segundos: estimados a 2,2 palabras por segundo, como pide la guía. Entre paréntesis, lo que duró de verdad cada escena con la voz que ya se había generado (el narrador real habló a unas 2,7 palabras por segundo, o sea, todavía más rápido).

## 1. El guion anterior (8 escenas, 518 palabras, 3:45 reales)

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (35 palabras, 16 s; real 16,5 s) | "Fronteras": construir vs pagarle a otro | ~7 s | No: se anuncia la decisión sin el problema que la vuelve necesaria | Sí, en una frase | No: no se dice por qué hace falta cortar bien ni qué pasa si se corta mal | Sí | Floja: no prepara el terreno |
| vara (65 palabras, 30 s; real 33 s) | Domain-Driven Design, "nivel estratégico", las dos preguntas, los tres cajones, la pregunta de pagos | DDD ~5 s; dos preguntas ~7 s; cajones ~2 s (solo aparecen en pantalla); piénsalo ~10 s | No: abre con "el equipo usó Domain-Driven Design estratégico" | No: DDD y "estratégico" nunca se definen; core, soporte y genérico se muestran en pantalla sin decir qué son | No | No: las dos preguntas y los tres cajones aparecen y se van en 13 s | **Falla**: es justo el bloque que el usuario más quería, y recibe 30 s para cinco ideas |
| mapa (66 palabras, 30 s; real 29,7 s) | El mapa del equipo: 8 capacidades en 3 cajones; ejes de unicidad y complejidad; "la foto decide el presupuesto" | Core: 3 capacidades en 9 s (3 s cada una); soporte: 2 en 7 s; genérico: 3 en 3 s; ejes: 0 s (solo en pantalla) | No | Los cajones, a medias ("ahí se gana o se pierde") | **No**: ninguna capacidad tiene su razón. ¿Por qué el catálogo es core? ¿Por qué las opiniones no? | Sí, el mapa queda en pantalla | **Falla**: clasifica sin razonar, que es lo contrario del principio 3 |
| aduana (97 palabras, 44 s; real 39 s) | Capa anticorrupción, Menu Catalog, Meals Offer, comandos y eventos, consumidores, eventos fabricados, Myagis-Forest, wrapper | Capa anticorrupción: nombrada en una frase de 22 palabras que además enumera 4 entradas (~10 s); 40 lasañas ~13 s; Byte ~6 s; Myagis y wrapper ~9 s | A medias: una frase de "proteger" antes del nombre, sin mostrar el daño | **No**: nunca se dice qué es, ni qué "corrompe" | A medias: "hay que protegerlo", sin el costo de no hacerlo | No: un diagrama de 12 cajas se arma en 9 s; la comparación con Myagis (unas 40 palabras en pantalla) aparece en los últimos 4 s | **Falla**: el usuario lo marcó, "ni siquiera explicas qué es" |
| fachada (85 palabras, 39 s; real 35 s) | Fachada, proveedor, redes de tarjetas, trade-off, ADR 015, cuotas de mapas | Fachada ~10 s; mañana ~9 s; trade-off ~8 s; ADR 015 y Here Maps ~11 s | No | No: "fachada" y "ADR" sin definir | A medias: falta por qué no hablarle directo al proveedor | Las 4 tarjetas de mapas, con unas 30 palabras, quedan solo 4 s | Floja: dos temas sin relación en una escena |
| metamodelo (58 palabras, 26 s; real 25 s) | Metamodelo, nivel de conocimiento, nivel operacional, analogía del torneo, promoción | ~5 s cada uno | No | "Metamodelo" no se define | A medias: solo el ejemplo de la promoción | No: 12 cajas, 9 cables y 5 verbos en 5 s | **Falla**: un concepto abstracto en 26 s |
| presupuesto (70 palabras, 32 s; real 29 s) | Presupuesto de calidad, atributos de calidad, offline, flujo de caja, centros de gravedad | ~6 s cada uno | No | No: "atributo de calidad" y "centro de gravedad" sin definir | Sí, con una pregunta ("¿qué pasa si falla?") | No: 4 columnas con unas 50 palabras en 30 s | Floja: buena idea sin espacio |
| outro (42 palabras, 19 s; real 22 s) | Repaso en una frase; avance del capítulo 6 | ~8 s | — | — | — | Sí | Floja: el repaso es un eslogan, no las ideas centrales |

### Dónde se pierde el espectador tipo y qué preguntaría

- **"¿Qué es Domain-Driven Design?"** (vara, 0:17). Se nombra, se le agrega "estratégico" y en la misma frase ya se clasifica. Nunca se dice que "dominio" significa negocio, ni para qué sirve.
- **"¿Core? ¿Soporte? ¿Genérico?"** (vara). Los nombres están solo en las tarjetas, y la voz pasa directo a la pregunta de los pagos. El piénsalo llega **antes** de enseñar los cajones (viola el principio 5).
- **"¿Por qué el catálogo es core y las opiniones no?"** (mapa). Ocho capacidades en unos 20 s, sin una sola razón atada al negocio de Farmacy Food. Es lo que el usuario más pidió.
- **"¿Qué es unicidad y complejidad?"** (ejes del mapa): están en pantalla y nadie los explica.
- **"¿Qué es una capa anticorrupción? ¿Qué corrompe?"** (aduana). El término aparece en medio de una enumeración. No se muestra qué pasaría sin ella: formatos ajenos metidos en el core, cada cambio del proveedor rompiendo el sistema.
- **"¿Menu Catalog es el catálogo? ¿Qué es Meals Offer? ¿Comandos? ¿Consumidores?"** Nombres en inglés y jerga de mensajería sin presentar.
- **"¿Quién es Myagis-Forest? ¿Qué es un wrapper?"** La comparación supone que el espectador recuerda a otro equipo y conoce el patrón.
- **"¿Qué es un ADR? ¿Por qué ahora hablamos de mapas?"** (fachada). Una tangente en medio del tema de pagos.
- **Metamodelo y presupuesto de calidad**: dos conceptos abstractos en 55 s, sin caso previo ni definición.
- **Ritmo**: una sola pausa (la de 3 s del piénsalo). Ninguna escena cierra con una frase que fije la idea.

## 2. El plan

### Las ideas esenciales del capítulo

1. **Dónde invertir**: un monolito modular solo funciona si los módulos están bien cortados, y un equipo chico no puede hacer todo con el mismo cuidado. Domain-Driven Design, en su nivel estratégico, responde con dos preguntas: ¿esto diferencia al negocio? ¿Ya existe, hecho y probado?
2. **Los tres cajones, con el porqué de cada capacidad**: el core se construye, el soporte se adapta y lo genérico se alquila. Se recorre el mapa del equipo capacidad por capacidad, con el razonamiento escrito por el equipo (`original-docs.ts`, *solution-overview*: Strategic domain design).
3. **Proteger el core con una capa anticorrupción**: primero el problema, después el nombre y la definición, por qué va alrededor del catálogo, sus piezas, un dato que la cruza paso a paso, la regla y su costo.
4. (Secundaria, compacta) **Lo alquilado va detrás de una pieza propia**: la fachada de pagos, comprar tiempo sin cerrar puertas.

### Qué recibe más espacio

- DDD: de unos 5 s a unos 35 s, con el dominio explicado como el negocio de Farmacy Food.
- Los tres cajones: una escena propia (40 s), cada uno con su significado, su respuesta a las dos preguntas y su acción.
- El mapa del equipo: de 30 s a unos 100 s, en dos escenas, con una razón por capacidad.
  - Catálogo: Farmacy Food vende comida pensada para necesidades médicas, así que lo que el cliente ve de cada plato es el producto (el equipo: *"a unique way of showing information about the meal"*).
  - Órdenes: suscripciones, cupones y pagos encadenados; *"a standard catering system might not help"*; es la parte que trae el dinero.
  - Lealtad: convertir ocasionales en suscriptores con formas propias, sin atarse a los límites de otro proveedor.
  - Opiniones: importan, pero las encuestas de otros proveedores las cubren con buena integración.
  - Agenda de cocina: convierte órdenes recurrentes en pedidos para la cocina; sirve al core, pero no es por lo que se elige a Farmacy Food.
  - Reportes, notificaciones y pagos: el mercado ya los resolvió; nadie elige dónde comer por el procesador de pagos.
- El piénsalo, **después** de las herramientas: una capacidad nueva (el mapa del refrigerador más cercano), cuya respuesta es la decisión real del equipo (Here Maps). Así el ADR 015 deja de ser una tangente y pasa a ser la respuesta.
- Capa anticorrupción: de unos 40 s a unos 125 s, en tres escenas (el problema, la definición y las piezas, el dato que la cruza).

### Qué se corta (lo cubre el curso escrito)

- El **metamodelo** (reglas arriba, hechos abajo): abstracto, y en 26 s no se entendía.
- El **presupuesto de calidad** y los centros de gravedad.
- La comparación con **Myagis-Forest** (wrapper por tercero). No queda espacio después de desarrollar bien la capa.
- Los ejes de unicidad y complejidad del mapa, y la leyenda de "comandos".
- El ADR 015 como escena aparte (sobrevive como la respuesta del piénsalo).

### La lista nueva de escenas

| # | Escena | Qué hace |
| - | - | - |
| 1 | `intro` | El monolito modular del capítulo 4. Solo funciona si los módulos están bien cortados; si no, es una bola de lodo. Título. |
| 2 | `problema` | Ocho capacidades, un equipo chico y poco dinero. Repartir por igual sería construir un sistema de cobros propio y dejar a medias lo que vende. |
| 3 | `ddd` | Domain-Driven Design en palabras simples: el dominio es el negocio. Nivel estratégico. Las dos preguntas. |
| 4 | `cajones` | Core, soporte y genérico, uno por vez: qué significa cada uno, su respuesta a las dos preguntas y su acción (construir, adaptar, alquilar). |
| 5 | `core` | Catálogo, órdenes y lealtad, cada uno con su razón ligada al negocio. Síntesis: si fallan, se pierde lo que hace distinta a Farmacy Food. |
| 6 | `resto` | Soporte (opiniones, agenda) y genérico (reportes, notificaciones, pagos), cada uno con su razón. Síntesis: el mapa es un presupuesto. |
| 7 | `piensalo` | Se aplica la regla al mapa del refrigerador más cercano (pausa de 3 s). Se alquila; el equipo eligió Here Maps. |
| 8 | `riesgo` | El problema: el catálogo recibe datos de ChefTec, Byte, Toast POS y el programa de lealtad, cada uno con su formato. Sin protección, esos formatos se meten en el core, cada cambio lo rompe y el modelo termina hablando el idioma de ellos. |
| 9 | `capa` | El nombre y la definición (traduce en el borde, en las dos direcciones) y la metáfora de la corrupción. Por qué va alrededor del catálogo. Sus tres traductores, el dominio y los consumidores. |
| 10 | `flujo` | Las 40 lasañas paso a paso: formato ajeno, Meals Offer traduce, el dominio suma, sale el evento "stock actualizado". Byte no publica eventos y la capa los fabrica. La regla y su precio. |
| 11 | `fachada` | Lo genérico va detrás de una pieza propia: hoy un proveedor a cambio de una comisión, mañana una red directa, sin que las órdenes se enteren. |
| 12 | `outro` | Repaso de las 4 ideas, una tarjeta por idea. Avance del capítulo 6. |

## 3. El guion nuevo (12 escenas, 1.004 palabras)

Duración: unos 7:36 de voz a 2,2 palabras por segundo, más 15,6 s de pausas escritas. `tools/timing.mjs estimate` da 8:42, porque su narrador simulado es más lento. Con la voz real del capítulo, que en el guion anterior duró un 15 % menos que el estimado, quedaría en unos **7:20**. Es más que el objetivo de 7 minutos: es el costo de desarrollar los dos bloques que pidió el usuario. Si hay que llegar a 7:00, lo primero que se recorta es la escena `fachada` (unos 35 s), que es la idea secundaria.

| Escena | Conceptos nuevos | Segundos que recibe cada uno (a 2,2 palabras/s, más pausas) | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (44 palabras) | Módulos bien cortados vs bola de lodo (andamiaje al capítulo 4) | ~11 s, más 1 s de pausa | Sí: se ven los 8 módulos, después los cables enredados | Sí: "donde todo depende de todo" | Sí: si se cortan mal, todo depende de todo | Sí: una etiqueta por momento | Bien (es andamiaje, no un concepto nuevo) |
| problema (59 palabras) | Invertir el esfuerzo según lo que vale cada pieza | ~27 s, más 1 s | Sí: medidores de esfuerzo; los pagos se llevan todo y el catálogo queda a medias | Sí | Sí: equipo chico, poco dinero | Sí: la pregunta queda en pantalla hasta el cambio de escena | Bien |
| ddd (75 palabras) | Domain-Driven Design; nivel estratégico; las dos preguntas | DDD y dominio ~14 s; nivel estratégico y preguntas ~15 s, más 1,2 s; transición a los cajones ~5 s (en total, **~35 s**) | Sí: viene de la pregunta de la escena anterior | Sí: "diseño guiado por el dominio"; "el dominio es el negocio: vender comida saludable desde refrigeradores" | Sí: para decidir qué partes importan más | Sí: el título queda 17 s; cada pregunta queda hasta el final | Bien |
| cajones (87 palabras) | Core, soporte, genérico, con su acción | ~12 s cada uno, más 1 s de pausa tras cada acción; síntesis ~6 s. Después, cada cajón se trabaja en el mapa: core ~52 s más, soporte ~21 s, genérico ~18 s, más el piénsalo (~28 s) y el repaso | Sí: las dos preguntas ya están dadas; cada cajón muestra su respuesta | Sí, uno por vez | Sí: dónde se gana o se pierde, qué resolvió ya el mercado | Sí: cada tarjeta se arma en 3 pasos y queda en pantalla toda la escena (45 s) | Bien |
| core (114 palabras) | El porqué de catálogo, órdenes y lealtad | Catálogo ~22 s, más 1 s; órdenes ~12 s, más 1 s; lealtad ~11 s, más 1 s; síntesis ~6 s | Sí: el negocio (comida para necesidades médicas, suscriptores) antes del veredicto | — | **Sí, con el razonamiento del equipo** | Sí: cada razón queda escrita junto a su capacidad hasta el final de la escena (~60 s) | Bien |
| resto (101 palabras) | El porqué de opiniones, agenda, reportes, notificaciones y pagos; el mapa como presupuesto | Opiniones ~10 s; agenda ~11 s, más 1 s; reportes ~7 s; notificaciones ~5,5 s; pagos ~5,5 s, más 1 s; presupuesto ~8 s, más 1 s | Sí | — | Sí, una razón por capacidad | Sí: las razones se acumulan, y el resumen de los 3 cajones queda ~9 s | Bien (los genéricos son detalles menores: una frase cada uno, como admite la guía) |
| piensalo (55 palabras) | Aplicar la regla (mapa del refrigerador más cercano) | ~25 s, más 3 s de pausa con el anillo | Sí: es un caso nuevo, después de las herramientas | — | Sí: no diferencia y ya está resuelto; el equipo eligió Here Maps por su cuota gratuita | Sí: las 4 tarjetas de proveedores quedan ~8 s, con una sola elegida | Bien |
| riesgo (84 palabras) | El problema de los formatos ajenos | **~38 s, más 2 s de pausas** | **Sí: es el caso entero, antes del nombre** | — | Sí: cada cambio de un proveedor rompe el core, y el modelo termina hablando el idioma de ellos | Sí: los formatos entran al core de forma visible, y la consecuencia queda escrita | Bien |
| capa (124 palabras) | Capa anticorrupción (definición y metáfora); por qué alrededor del catálogo; sus piezas | Definición ~13 s; metáfora de la corrupción ~10 s, más 1 s; por qué el catálogo ~7 s; tres traductores ~13 s; dominio, eventos y consumidores ~10 s; síntesis ~4 s, más 1 s (en total, **~58 s**, más 38 s del problema y 52 s del ejemplo) | Sí (viene de `riesgo`) | Sí: "una capa de traducción en el borde del core: convierte los datos de afuera al idioma del core, y al revés"; también "evento", la primera vez que aparece | Sí: "lo que diferencia, se protege" | Sí: el diagrama conceptual queda ~24 s con su definición escrita; el del equipo se arma pieza por pieza al ritmo de la voz | Bien |
| flujo (111 palabras) | El ejemplo trabajado (40 lasañas); eventos fabricados (Byte); la regla y el precio | Lasañas ~25 s, más 1 s, en 4 pasos numerados; Byte ~14,5 s, más 1 s; regla ~5 s; precio ~6 s, más 1 s | Sí | — | Sí: el trade-off, un traductor más por cada sistema externo | Sí: cada paso deja su etiqueta numerada; la regla y el precio quedan ~12 s en tarjetas grandes | Bien |
| fachada (75 palabras) | Fachada de pagos; comprar tiempo | ~34 s en total: fachada y su porqué ~14 s; hoy y comisión ~10 s; mañana ~7 s, más 1 s; síntesis ~3 s | Sí: primero se ve el cable directo al proveedor, tachado | Sí: "una pieza propia que es la única que conoce al proveedor" | Sí: cambiar de proveedor no toca el core | Sí | Aceptable: es la idea secundaria, compacta pero completa |
| outro (74 palabras) | Repaso de las 4 ideas; avance | ~5 s por idea, cada una con su tarjeta, más 1 s de pausa | — | — | — | Sí: las 4 tarjetas quedan juntas ~6 s | Bien |

**Ningún concepto importante queda por debajo de unos 20 s.** DDD recibe ~35 s. Los tres cajones, ~12 s de definición cada uno más su recorrido en el mapa (core ~64 s, soporte ~32 s, genérico ~30 s más el piénsalo). El porqué del mapa recibe ~95 s y la capa anticorrupción ~150 s (problema, definición, piezas y ejemplo). Los únicos elementos que reciben menos de 10 s son detalles menores con su razón en una frase: reportes, notificaciones y pagos como genéricos.

### Verificación hecha

- `node tools/timing.mjs estimate` corrió sin errores: 12 escenas, 71 líneas, 522 s en el estimador.
- `npx hyperframes@0.8.139 check` pasó: 0 errores de lint, de runtime y de layout, y 115 de 115 textos pasan el contraste WCAG AA. Solo queda la advertencia esperada sobre `#chrome`. Los avisos informativos son superposiciones intencionales: el diagrama de `capa` y el de `flujo` son idénticos durante el fundido entre escenas, y en `flujo` el diagrama queda atenuado detrás de las tarjetas de la regla y el precio.
- Capturas en `snapshots/peda`, `snapshots/peda2` y `snapshots/peda3`: el final de cada línea y algunos momentos a mitad de escena. Lo que se ve corresponde a lo que se dice en ese momento.
- Las escenas retiradas (`vara`, `mapa`, `aduana`, `metamodelo`, `presupuesto`) están en `retired/`, por si alguna se recupera para otro formato.
- Pendiente, fuera de esta tarea: generar la voz nueva (`tools/voice.mjs`). Mientras tanto, `node tools/timing.mjs` sin `estimate` falla a propósito, porque `voice.json` todavía es la del guion anterior.
