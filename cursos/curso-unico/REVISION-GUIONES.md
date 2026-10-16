# Revisión de los guiones contra los objetivos del curso

Criterio: un párrafo se queda si cambia lo que el espectador puede hacer después (R1 a R6 y lo transversal, en `_corpus/DISENO-CURSO.md`). Si solo informa de un caso, de un proceso o de nuestro análisis del corpus, sobra o pasa a una nota de verificación.

Objetivos:
- **R1** Pasar del problema del negocio a pocas cualidades, decir a cuáles se renuncia y comprobarlas con cifras.
- **R2** Cortar el sistema a partir del negocio, dar un dueño a cada dato y aceptar por escrito lo que se pierde al repartir.
- **R3** Decidir cómo se hablan las partes (síncrono, asíncrono, colas, adaptadores) y qué pasa cuando algo falla.
- **R4** Decidir dónde vive cada dato sensible, cuánto se guarda y quién lo puede leer.
- **R5** Decidir qué se compra y qué se construye, empezar simple y dejar escrita la condición para cambiar.
- **R6** Meter un modelo de IA en un sistema aplicando lo anterior.
- **T** El ADR: contexto, alternativas, costo y requisito; y cerrar lo que queda fuera.

## Diagnóstico

1. **Las lecciones están ordenadas por caso, no por objetivo.** Cada gancho y cada desarrollo siguen la historia de un equipo: qué hizo primero, qué descartó, en qué orden llegó. Por eso aparecen fechas, años y pasos ("destiló el pedido, pegó notas, juntó nueve, se quedó con siete"). El objetivo es lo que el espectador puede hacer; el guion cuenta lo que el equipo hizo.
2. **Hay análisis del corpus que se coló en la narración.** "Según nuestra cuenta", "solo dos de los doce citan el libro", "el repositorio no dice…", "contamos a mano". Son verdades del proceso de investigación, no de arquitectura. Unas pocas sí cambian cómo se usa un dato (por ejemplo, que una cifra cambia entre documentos). El resto va a notas de verificación.
3. **Los cierres son resúmenes.** Muchas lecciones terminan repitiendo lo que acaban de decir ("Renunciar y hacer la cuenta van juntas. La renuncia dice… la cuenta dice…"; "Eso es, en una línea…"; "Termina en el mismo lugar"). Un cierre debe dejar un movimiento nuevo.
4. **Se repiten ejemplos entre lecciones.** El precio de DataDog aparece en L1, L9 y L11. La disponibilidad de MonitorMe, en L2 y L3. Las cifras de Farmacy Food, en L1, L3 y L9. La contradicción de 90/180 días, en L8 y L11. Cada repetición gasta minutos que no enseñan nada nuevo.
5. **Hay cifras que no cambian ninguna decisión.** Las de L3 (montos por escenario, filas del resumen) y las de L10 (mAP, porcentajes). Una cuenta sirve al objetivo R1 si muestra qué supuesto decide el resultado. Si solo muestra el número, sobra.
6. **Hay temas fuera de los objetivos:** estilo como catálogo (L4), chequeos de salud de negocio como operación (L7), numeración de requisitos Q4/Q26 (L2), el error de la tabla de Tableau (L3), plantillas y el libro (L1 y L11).

## Por lección

| Lección | Objetivo | Veredicto | Sobra o desvía | Falta |
|---|---|---|---|---|
| 1 Qué es una decisión | Marco y T | Alineada en la definición de decisión y en el ADR | "Cómo leer lo que sigue" (plantillas, libro) → nota. Las fichas de los casos (tamaño, año, cifra) → solo lo que cada lección usa. "183 / nueve de cada diez / uno de cada cuatro" se conserva una vez; L11 lo repite casi igual. | Quitar "Leímos sus doce repositorios completos": no es exacto (imágenes sin revisar, ConnectedAI sin código, varios repos solo por palabras clave). |
| 2 Del pliego a tres | R1 | Alineada: cadena, renuncia por límite de la herramienta, cualidades desde dificultades, lo que se pierde | "La cadena de MonitorMe" enumera pasos (destiló, pegó, juntó, se quedó con). Dejar el criterio de cada descarte. "Corte" (Q26, Q4): la idea útil cabe en una frase: un requisito citado tiene que existir. | — |
| 3 Renunciar y cuenta | R1 | Alineada: renuncias con condición, dónde se paga, cuenta, supuesto que decide, números sin cuenta | Es la lección con más cifras por minuto. "Costo": montos por escenario y el error de la fila de Tableau (control de calidad del corpus, no enseñanza). "Horas": quedarse con la palanca (cuánto se revisa a mano). | Un paso explícito: qué hacer cuando la cuenta no cierra (se mide, o la decisión queda condicionada). |
| 4 Dónde se corta | R2 | Alineada: gancho PCI, necesidades por área, no partir, corte por dominio | "Eventos" es recuento de proceso (22 eventos, 3 eliminados, 6 contextos). "Quanta" es de R3 (síncrono): recortar o mover a L6. "Estilo" no es un objetivo: justificarlo en una frase como parte de R2 o quitarlo. | — |
| 5 De quién es cada dato | R2 | Alineada fuerte: dueño por dato, compartir con regla, separar por fases, lo que se pierde, la línea | Advertencia de diagramas en "agregados": una frase o nada. | — |
| 6 Cómo se hablan | R3 | Alineada: pregunta por flecha, muchos sistemas, supuesto, quién inicia, precio de lo asíncrono | "Quién inicia" repite la cámara y Spotlight en dos párrafos. | **Error:** el cierre dice "cinco respuestas" y lista cuatro. |
| 7 Cuando algo falla | R3 | Alineada fuerte: duplicado, dos escrituras, reintento, silencio | "Rechazo" (memoria rechazada) trata de carga, no de fallo: cortar o mover. "Negocio" (chequeos de salud) es detección de fallo silencioso: una frase, enlazada con "silencio". | — |
| 8 Datos que no se filtran | R4 | Alineada: dónde vive, cuánto dura, cómo se borra, la seguridad como forma, la puerta, la regla | "Plazo" repite el 90/180 de L11: dejarlo en L11 y aquí solo "tres niveles". "Donde" repite la tarjeta de L4. | — |
| 9 Comprar, construir, cambiar | R5 | Alineada: preguntas de compra, dependencia de lo comprado, alreves, empezar simple, número, reglas | "Precio" repite el DataDog de L1: dejar solo el criterio "el costo de operar se mide en personas". | — |
| 10 Cuando el modelo decide | R6 | Alineada en todo | Ninguno grande. Los umbrales cambian entre documentos: es advertencia útil para R6, se queda. | — |
| 11 Lo que queda escrito | T | Alineada: estado, reemplazo, obsoleto, lo que queda fuera | "Cómo se decide la parte que falta" repite L1. "De dónde viene el método" es meta del corpus: va a nota. El cierre resume. | — |

## Errores de hecho y sobreafirmaciones

1. L1: "Leímos sus doce repositorios completos". Ver tabla.
2. L6: "cinco respuestas" con cuatro listadas.
3. L3: el error de la fila de Tableau es correcto, pero no enseña nada al espectador; si se queda, que sea una frase.

## Cortes transversales (en orden de impacto)

1. **Recuento de proceso** (L2, L4): quitar "lo primero que hizo el equipo", "destiló, pegó, juntó".
2. **Cierres resumen** (L1, L3, L10, L11, y otros): reemplazar por un movimiento nuevo.
3. **Meta del corpus en la narración** (L1, L3, L4, L5, L6, L7, L8, L10, L11): a nota de verificación, salvo cuando cambia cómo usar un dato.
4. **Repeticiones entre lecciones** (DataDog ×3, disponibilidad de MonitorMe ×2, Farmacy Food, 90/180): dejar cada ejemplo en una sola lección.
5. **Cifras que no cambian una decisión** (L3, L10): dejar la cifra que muestra el supuesto que decide.
6. **Cast repetido**: una presentación completa en L1 y en las demás una frase de referencia.

## Consecuencia para la producción

Los cortes cambian el texto, y las animaciones ya están ancladas a palabras de los guiones actuales. Cada lección cambiada necesita: nuevo `narration.json`, re-anclar las escenas afectadas, nueva voz y nuevo render. Conviene decidir los cortes antes de rehacer voz y render.
