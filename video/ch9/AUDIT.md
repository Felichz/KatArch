# Auditoría pedagógica · Capítulo 9 · La factura anual

Vara: `video/PEDAGOGY.md`. Espectador tipo: un desarrollador con unos 2 años de experiencia que nunca diseñó un sistema entero, no vio el curso escrito y no puede pausar.

## 1. El guion anterior (8 escenas, 539 palabras habladas, unos 4:27 estimados)

Segundos calculados a 2,2 palabras por segundo sobre el texto hablado (`say`).

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (12 s) | ninguno (gancho: "¿cuánto cuesta por año?") | — | sí | — | No ata la pregunta a nada del caso: no dice por qué al dueño le importa tanto el costo (equipo chico, presupuesto mínimo). | Sí | Corta, pero sin tensión. |
| sheet (27 s) | análisis de costos; **TCO**; precio de lista; tres escenarios; vara de 1 petición por segundo | TCO y precio de lista: ~7 s juntos en una sola frase. Escenarios: ~5 s, tres números en una frase. Vara: ~8 s. | No: "Medido como TCO" llega antes de que el espectador sienta por qué el precio de lista no alcanza. | A medias: una cláusula ("el costo anual de tener todo funcionando") sin decir qué incluye ese "todo". | No: ni por qué tres escenarios, ni para qué sirve la vara del capítulo 1 en un capítulo de dinero. | Las 10 tarjetas de finalistas, las dos tarjetas TCO y las barras se reemplazan cada ~6 s. | **Falla.** El concepto central del capítulo (TCO) recibe 7 s y no vuelve a aparecer hasta el final, sin conectarse. |
| volume (34 s) | **volumetría**; pesos en kb; frecuencias; el mensaje más pesado | Volumetría: ~9 s. Dos pesos en una frase (~8 s). | No: abre nombrando ("De la volumetría") antes de plantear el problema (¿cómo sé cuántos servidores necesito?). | Sí, en una línea (peso y frecuencia). | No. El porqué ("bytes antes que servidores") llega como eslogan al final, sin razonarse. | No. La columna de frecuencias (6 filas, ~50 palabras) aparece entera en 1 s. Stock, cancelar y despacho se llenan mientras la voz habla de otra cosa. | **Falla parcial.** La pausa para pensar funciona; la frecuencia (la mitad del concepto) nunca se usa en un ejemplo. |
| forecast (39 s) | crecimiento de la base; **tráfico**; GiB; ×4; fotos; tres supuestos | Base y tráfico: ~8 s cada uno. Supuestos: ~6 s los tres. | No. | GiB y "tráfico" no se definen. No dice qué diferencia hay entre lo que se guarda y lo que viaja. | La causa de las fotos sí; los supuestos no (por qué asumir tráfico uniforme lo vuelve "el extremo alto"). | No. Una grilla de 4 volúmenes con 8 cifras (incluido 5.000 por día, nunca nombrado) aparece de golpe. Tres tarjetas de supuestos con ~25 palabras cada una, más cifras de DynamoDB y EC2 que la voz no dice, duran ~8 s. | **Falla.** Demasiadas cifras por segundo; lo más fuerte (el gigante escondido en las fotos) se diluye. |
| totals (30 s) | totales anuales; ×10 carga → ×1,8 factura | Dos totales en una frase (~12 s). La relación ×1,8: ~3 s. | Sí (pregunta antes de la respuesta). | — | **No.** La pausa para pensar llega antes de dar la herramienta para responder (costos fijos y variables). El espectador solo puede adivinar. | La columna "10 × proyectado, 125.482 USD" aparece sin que la voz la nombre. | **Falla.** Rompe el principio 5: la pregunta va antes de las herramientas. |
| bill (41 s) | líneas de la factura; qué crece y qué no; el monitoreo como ítem más caro; 40% | Tres cambios en una frase (máquinas ×2, Tableau ×2, S3 ×20) ~9 s. Las líneas fijas, una frase. | — | **Nunca nombra costo fijo ni costo variable**, la idea que explica todo. EC2, S3, SNS, DynamoDB aparecen como marcas, sin decir qué son. | A medias: solo la base tiene porqué ("dimensionada para un año"). Las máquinas solo se duplican… ¿por qué? | Las 9 líneas aparecen juntas. El selector compara Mínimo con Rápido (×20 en S3) cuando la pregunta comparaba Proyectado con Rápido (×10): confunde. | **Falla parcial.** Contenido correcto, sin la idea que lo ordena. |
| buy (39 s) | **open source**; comprar o construir; costo en horas de desarrollo; ADR 003 y 010; datos de salud | Monitoreo ~19 s. Encuestas ~16 s. | A medias. | "Open source" y "monitoreo" no se definen. "0,2 a 0,5 de un desarrollador" queda abstracto. | Sí en el monitoreo; en las encuestas, "la misma vara" no se explica (¿qué vara?). | **La mitad derecha queda vacía unos 20 s** mientras se habla del monitoreo. | **Falla parcial.** No vuelve al TCO, que era exactamente esta idea. |
| outro (24 s) | lección: el costo real incluye quién lo mantiene | ~10 s | — | — | — | Sí | **Falla parcial.** No repasa las ideas del capítulo: solo la última. |

### Dónde se pierde el espectador tipo

- **TCO.** Escucha una sigla en inglés, una cláusula y sigue. Nunca vio qué cosas, además del precio de lista, entran en "tener todo funcionando". Cuando al final se dice "el costo real incluye quién lo mantiene", no lo conecta con el TCO.
- **¿Por qué tres escenarios?** Nadie dice que el futuro del negocio es incierto y que por eso se calcula un rango.
- **Volumetría.** "¿Por qué medir bytes antes de elegir servidores?" no se responde nunca. Y la frecuencia, la mitad del concepto, nunca se multiplica por un peso en un ejemplo.
- **GiB y tráfico.** No sabe qué es un GiB ni qué diferencia hay entre lo que la base guarda y lo que viaja por la red.
- **Cifras que vuelan.** La grilla de 4 volúmenes, las tarjetas de supuestos y la columna de 125.482 USD aparecen y se van sin narrarse.
- **"Diez veces la carga, 1,8 veces la factura."** Se le pide adivinar sin darle la herramienta. Y la explicación que sigue no nombra la idea (costos fijos y variables), así que no se lleva una regla que pueda usar en su propio proyecto.
- **EC2, S3, SNS, DynamoDB, Amazon MQ.** Son marcas, no conceptos. Basta con decir qué es cada una ("las máquinas", "los archivos") cuando importa, y no todas.
- **Open source, ADR.** Sin definir ni re-anclar.
- **"0,2 a 0,5 de un desarrollador".** Es una fracción abstracta. En días por semana (de 1 a 2,5) se entiende.
- **"La misma vara"** en las encuestas: ¿qué vara? La pregunta común ("¿cuánto nos cuesta de verdad?") nunca se formula.
- **El cierre** solo repasa la última idea.

### Un problema de datos de la fuente (no resuelto en el curso)

En la tabla resumen de la planilla del equipo (`cost-analysis` en `src/content/original-docs.ts`), las filas de **DataDog** y **Tableau** están intercambiadas respecto del detalle del mismo documento:

- El detalle dice: DataDog cuesta 15 USD por host al mes × 8 instancias = 120 USD al mes, es decir 1.440 al año (240 al mes con 16 instancias: 2.880 al año). Tableau cuesta 278 USD al mes, igual en todos los escenarios: 3.336 al año.
- El resumen dice: DataDog 3.336 fijo y Tableau 1.440 → 2.880.

El curso (`src/content/es/costos.ts`, `src/visuals/ch9.tsx`) y el video anterior copiaron el resumen ("el ítem más caro es el monitoreo, DataDog, 3.336 USD"). **El guion nuevo evita depender del intercambio**: junta monitoreo y reportes en una sola línea (4.776 USD en el proyectado y 6.216 en el rápido, que suman igual con cualquiera de las dos lecturas) y usa el precio que el ADR 003 sí respalda: 15 USD por servidor al mes, 120 al mes con las 8 máquinas. Hay que corregir el curso escrito por separado.

## 2. El plan

**Las tres ideas esenciales**, cada una con caso, nombre, definición, porqué y síntesis:

1. **Medir antes de comprar (volumetría).** Peso × frecuencia de cada mensaje, para saber cuántos datos viajan y cuántos se guardan antes de elegir servidores. El caso: la foto de una review es el mensaje más pesado, y de ahí sale casi todo el tráfico.
2. **Costos fijos y variables.** El porqué de "×10 la carga → ×1,8 la factura": algunas líneas no dependen de la cantidad de clientes (la base contratada para todo el año, el plan mínimo de avisos) y otras sí (las máquinas por hora, los archivos de las fotos). La pausa para pensar llega **después** de esta herramienta.
3. **El costo real incluye a quien lo mantiene (TCO, comprar o construir).** Se planta al principio (precio de lista frente a TCO) y se cobra al final: DataDog a 120 USD al mes contra Grafana gratis, que cuesta de 1 a 2,5 días por semana de un desarrollador. Con las encuestas, la misma pregunta da la respuesta opuesta: el costo de comprar es el riesgo sobre datos de salud.

**Qué recibe espacio:** el TCO, con su caso (qué incluye "tenerlo funcionando"); la volumetría, con un ejemplo de peso × frecuencia; costo fijo y variable, con dos ejemplos de cada uno antes de nombrarlos; el monitoreo, con su porqué en días por semana; un repaso final de las tres ideas.

**Qué se corta (queda para el curso escrito):** la grilla de los cuatro volúmenes (500, 1.000, 5.000 y 10.000) con sus 8 cifras; las tres tarjetas de supuestos (tráfico uniforme, GZIP, DynamoDB contra EC2); el escenario mínimo como base de comparación (todo se compara contra el proyectado, para que el ×10 sea siempre el mismo); stock, cancelación y despacho en la volumetría; la columna "10 × proyectado = 125.482"; el 40% de la factura mínima (que dependía de las filas intercambiadas).

**Escenas nuevas** (9). Un primer borrador tenía una escena aparte para los tres escenarios; se recortó para no pasar de unos 7 minutos. Ahora cada escenario se nombra donde se usa: "lo que el equipo espera, 1.000 peticiones por día" en los pronósticos y la factura, y "un crecimiento rápido, con diez veces más peticiones" en la pausa para pensar. El escenario mínimo queda para el curso escrito.

| # | id | kicker | Qué enseña |
| - | - | - | - |
| 1 | intro | Capítulo 9 | La pregunta del dueño, atada a las restricciones del capítulo 3 (equipo chico, presupuesto mínimo). |
| 2 | sheet | La planilla | El único finalista con planilla. Precio de lista (con los precios reales de la página del proveedor) contra lo que cuesta tenerlo funcionando todo el año. Recién entonces, el nombre: TCO. |
| 3 | volume | Volumetría | Por qué medir antes de comprar. Peso × frecuencia con dos ejemplos trabajados. Pausa: el mensaje más pesado. La foto, que la manda un cliente. |
| 4 | forecast | Los pronósticos | Lo que se guarda (3,96 GiB por mes) frente a lo que viaja (16,5 GiB). Las fotos son 16,4. |
| 5 | bill | La factura | La factura esperada (12.548 USD, unos 1.046 por mes). Costo fijo y costo variable, cada uno con dos ejemplos del caso antes de nombrarlo. |
| 6 | totals | La factura | Pausa: diez veces la carga. Respuesta: 22.481 USD, ×1,8. El porqué, línea por línea, y la vara del capítulo 1. |
| 7 | buy | Comprar o construir | La línea más grande. Qué es el monitoreo y para qué sirve. DataDog a 120 USD al mes contra Grafana gratis, más 1 a 2,5 días por semana de un desarrollador. |
| 8 | privacy | Comprar o construir | La misma pregunta con las encuestas: perfiles de salud, el riesgo de filtrar datos y el feedback propio. |
| 9 | outro | Para llevarte | Repaso de las tres ideas y el capítulo 10. |

## 3. El guion nuevo (9 escenas, 901 palabras habladas, unos 7:32 estimados)

Las palabras se cuentan sobre el texto hablado (`say`), con los números escritos en letras: "doce mil quinientos cuarenta y ocho dólares" cuenta como siete. Los segundos salen de `node tools/timing.mjs estimate`.

| Escena | Conceptos nuevos | Segundos que recibe cada uno | ¿Caso antes del nombre? | ¿Definido? | ¿Se explica el porqué? | ¿Hay tiempo para leer el visual? | Veredicto |
| - | - | - | - | - | - | - | - |
| intro (27 s) | ninguno; andamiaje: las restricciones del capítulo 3 | Restricciones: ~7 s | Sí: la pregunta del dueño antes del título. | — | Sí: equipo chico y presupuesto mínimo vuelven la pregunta urgente. | Sí: las tarjetas quedan más de 7 s, y el subtítulo (6 palabras) unos 3 s. | Bien. |
| sheet (46 s) | precio de lista; **TCO** | Precio de lista: ~11 s. TCO: ~26 s (las tres cosas que cuesta tenerlo funcionando, nombre, definición y el anuncio de que vuelve al final). | Sí: "si te tocara hacer esa cuenta…" y las tres filas que faltan llegan antes de la sigla. | Sí: "todo lo que cuesta tener algo funcionando, no solo comprarlo", y la definición queda en pantalla. | Sí: el precio de lista "se queda corto" porque deja afuera horas de máquina, datos y gente. | Sí: cada fila aparece con su frase, la tarjeta de lista sigue en pantalla los 30 s de la escena y la definición unos 12 s. | Bien. |
| volume (73 s) | por qué medir antes de comprar; **volumetría**; peso × frecuencia | Por qué medir: ~10 s. Volumetría con dos ejemplos y la regla: ~31 s. Pausa y respuesta: ~22 s. Hábito: ~5 s. | Sí: "¿cuántos servidores?" sin datos es adivinar, antes de la tabla. | Sí: "para cada mensaje, cuánto pesa y cuántas veces ocurre". | Sí: sin el dato, elegir servidores es adivinar. La foto: la manda un cliente, uno de cada diez por mes. | Sí: 3 filas en vez de 6. Cada peso y cada frecuencia aparece cuando se nombra, y la fórmula se arma pieza por pieza. | Bien. La pausa llega después de la regla y de ver que el texto pesa kilobytes. |
| forecast (43 s) | lo que se guarda frente a lo que viaja (tráfico) | Base contra tráfico: ~25 s. Las fotos: ~14 s. | Sí: "dos números por mes" con dos casillas en "¿?" antes de llenarlas. | Sí: "lo que viaja por la red, aunque no se guarde: el tráfico". GiB se dice "gigas". | Sí: "¿por qué? Por las fotos". | Sí: dos barras y una etiqueta. Se cortó la grilla de 8 cifras. | Bien. |
| bill (60 s) | **costo fijo**; **costo variable** | Factura y líneas: ~15 s. Costo fijo: ~22 s (dos ejemplos y el nombre). Costo variable: ~12 s, más ~5 s de regla. Después, toda la escena siguiente lo aplica. | Sí: la base comprada con 1 TB para el año y el plan mínimo de avisos, antes de decir "costo fijo". Las máquinas por hora y los archivos de las fotos, antes de decir "variable". | Sí, cada uno en una línea que queda escrita en la columna derecha. | Sí: por qué la base no cambia (se contrató para el año) y por qué las máquinas sí (se pagan por hora). | Sí: las 8 líneas quedan 60 s en pantalla; solo se resaltan las 4 que se nombran. | Bien. "Variable" recibe menos tiempo, pero se apoya en el contraste con "fijo" y se usa de inmediato. |
| totals (53 s) | aplicación: ×10 la carga → ×1,8 la factura | Pausa y respuesta: ~23 s. Porqué línea por línea: ~26 s. | Sí. | — | Sí: líneas fijas iguales, máquinas ×2 (y la vara del capítulo 1: una décima de petición por segundo), archivos ×10. | Sí: las barras de carga y de factura quedan juntas para comparar. Cada fila de la tabla llega con su frase; "el resto" (×1,4), sin narrar, queda atenuada para que la suma cierre. | Bien. La pausa ahora va después de la herramienta (fijo y variable). |
| buy (74 s) | **monitoreo**; **open source**; TCO aplicado (comprar o construir) | Monitoreo: ~8 s. Open source: ~6 s. Precio de lista contra TCO aplicado: ~50 s. | Sí: la línea más grande de la factura antes de la decisión. | Sí: monitoreo ("mira las máquinas y avisa cuando algo falla") y open source ("sin licencia que pagar", más "se descarga gratis y lo instalas tú" en pantalla). | Sí: 0,2 a 0,5 de un desarrollador, traducido a 1 a 2,5 días por semana, contra 120 USD al mes, con un equipo chico. | Sí: DataDog entra centrada y se corre cuando aparece Grafana, así que **no queda ninguna mitad vacía**. La semana se pinta día por día. | Bien. Monitoreo y open source son términos de apoyo: una línea cada uno alcanza. |
| privacy (42 s) | la misma pregunta con la respuesta opuesta | ~41 s | Sí: perfiles de salud y respuestas que viajan a un tercero, antes del veredicto. | — | Sí: arriesgar datos personales también es un costo (ADR 010). | Sí: el diagrama se arma de a un nodo. | Bien. |
| outro (38 s) | repaso de las 3 ideas | ~8 s por idea | — | — | — | Sí: las tres tarjetas numeradas aparecen juntas y se llenan de a una. | Bien. |

**Ningún concepto importante queda con menos de unos 20 s.** TCO recibe ~26 s y vuelve unos 50 s en el monitoreo. La volumetría, ~70 s. Costo fijo y variable, ~40 s más los ~53 s en que se aplican. Los términos de apoyo (monitoreo, open source, tráfico) reciben una línea con su definición, como pide la guía para los detalles menores.

### Qué se verificó

- `node tools/timing.mjs estimate`: 9 escenas, 60 líneas, 451,85 s.
- `npx hyperframes@0.8.139 check`: 0 errores de lint, runtime y layout. Contraste: todos los textos muestreados pasan WCAG AA (141 de 141 en la última pasada). Queda el aviso esperado de `#chrome`.
- Capturas al final de cada una de las 60 líneas (`snapshots/peda`), más 18 capturas de los momentos corregidos (`snapshots/peda2`). Se corrigió lo siguiente:
  - Las fichas con ícono de la fórmula perdían su texto, porque `data-icon` reemplaza el contenido.
  - Media pantalla quedaba vacía en el precio de lista y en DataDog: ahora las tarjetas entran centradas y se corren.
  - La tabla de volumetría y la factura arrancaban vacías durante varios segundos.
  - Las tres ideas del cierre aparecían de a una con dos tercios de pantalla vacíos.
  - El nombre "Monitoreo y reportes" se pisaba con su barra.

### Pendiente

- **Las filas intercambiadas en la planilla del equipo** (DataDog y Tableau, ver arriba). El curso escrito (`src/content/es/costos.ts`, `src/visuals/ch9.tsx`) repite el dato del resumen. El video lo esquiva sin afirmar nada falso, pero conviene corregir el curso.
- **La duración real** depende de la voz. El estimado da unos 7:32, en el borde alto de la guía. Si la voz real queda por encima de los 7:30, lo siguiente que se puede recortar es la frase de la vara del capítulo 1 en `totals` (unos 6 s).
