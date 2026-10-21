# Comparativa de 5 ganadores (primera pasada)

Fuentes: las fichas de `fichas/` (Five Nines, ZAItects, Pragmatic, BluzBrothers, ArchColider), generadas por subagentes Haiku y revisadas por muestreo contra los repos en `katas-src`. Los números de ADR son los de cada ficha. Esto es una **hipótesis de trabajo**: cinco repos, dos eras (3 con IA, 2 clásicos), y las etiquetas de las fichas son demasiado generosas para contar frecuencias (14 etiquetas aparecen en los cinco), así que la comparación sale de las secciones 6 y 8 de cada ficha, no de las etiquetas.

## Lo que se repite entre repos (candidatas a "verdades")

| # | Verdad candidata | Repos que la sostienen | Respaldo |
|---|---|---|---|
| A | Donde hay dinero, sesgo o error inaceptable, la IA no decide sola: reglas deterministas alrededor o en lugar del modelo | Five Nines (ADR-0012 plantillas para intents transaccionales, ADR-0018 GenAI solo para factores en tiempo real, ADR-0021 sin GenAI), Pragmatic (ADR-011 puntaje determinista, ADR-010), ZAItects (README "Anti patterns": sin agentes en los tres casos) | **3 de 3 repos con IA** |
| B | Humano en el circuito con umbral de confianza y un valor por defecto seguro | Five Nines (FR#2L: <80 % sin cargo; ADR-0016 favorable al cliente), ZAItects (Judge → Pending Manual Review; **el umbral no tiene valor**), Pragmatic (anonimización solo verificable con humanos u otro LLM, ADR-025) | 3 de 3 con IA; solo Five Nines da el número |
| C | La evaluación del componente de IA es una decisión de arquitectura, no algo que se hace al final | Five Nines (ADR-0011), Pragmatic (ADR-025, por etapa), ZAItects (ADR-009, referencia humana "gold-standard") | 3 de 3 con IA |
| D | El costo es un criterio de arquitectura y se calcula con supuestos escritos | ZAItects (`cost-analysis.md`), ArchColider (ADR-003 + `CostAnalysis.md`), Five Nines (costo de inferencia en varios ADR), Pragmatic (A17, A22), BluzBrothers (Sizing, pero de latencia) | 4–5 de 5. Dato útil: los modelos de costo de ZAItects y ArchColider tienen errores que solo se ven porque los supuestos están escritos |
| E | Validar la arquitectura contra una cifra del requisito antes de construir | BluzBrothers (cadena 693 ms contra 1 s), Five Nines (disparadores numéricos de la escalera: FP >5 %, mAP <0,75, MAPE >30 %), ZAItects (19.000 h/semana contra 5.400 de capacidad) | 3 de 5 |
| F | Diseñar el fallo, no solo el camino feliz | BluzBrothers (dos canales de alerta con regla de respaldo; instancia nueva en 30 s como supuesto), Pragmatic (cola de reintentos con backoff, un HR caído no bloquea), ArchColider (entrega al menos una vez + dedupe por id y versión; retiro sin red; catálogo local con verificación al pagar), Five Nines (default a favor del cliente) | 4 de 5 |
| G | Registrar lo que queda fuera y lo que no se decidió, con razón | BluzBrothers (ADR-005, 006, 013, 014, citando la respuesta del cliente), Pragmatic (ADR-021 y 024 Denied, ADR-022 Open), Five Nines, ArchColider | 4 de 5 |
| H | Un solo dueño por dato (quién escribe qué) | Pragmatic (ADR-014/015), Five Nines (ADR-0007 Fleet Service como fuente única, con su riesgo declarado), ArchColider (stock propio, ADR-012), BluzBrothers (ADR-019, estado del Analyzer en caché externa) | 4 de 5, formulado de maneras distintas |

## Lo que hizo un solo equipo (material para el video de ese caso, no para la lista global)

- **Five Nines:** la escalera de modelo gestionado a propio con disparadores escritos antes de desplegar; retención de fotos por niveles con legal hold; un modelo de demanda por tipo de vehículo; consistencia declarada por agregado.
- **ZAItects:** separar al que califica del que juzga la calificación; una colección vectorial por tipo de documento; despliegue por fases con IA y humanos en paralelo.
- **Pragmatic:** features legibles fijadas por IA con puntaje determinista (seis opciones comparadas); el acceso a currículums como regla de arquitectura.
- **BluzBrothers:** el cálculo de la cadena sensor→pantalla; la disponibilidad delegada a la instancia.
- **ArchColider:** un actor por heladera; health check por camino de negocio; event sourcing justificado por "cómo llegamos a este estado".

## Lo que NO es un patrón entre repos

- Los **estilos** no coinciden (monolito modular, microservicios, serverless, service-based, event-driven por Kafka): el estilo cambia con el caso. Enseñar "el estilo correcto" no sale de este corpus.
- **Discrepancias entre documentos** aparecen en todos los repos (Five Nines, más de diez; ZAItects, errores aritméticos; ArchColider, filas cruzadas; BluzBrothers, Overview contra Requirements; Pragmatic, ADR truncado). Sirve para marcar huecos con honestidad, pero es una observación sobre los repos, no una enseñanza de arquitectura.
- **Costo declarado de cada decisión** es casi universal; **alternativas declaradas** no (BluzBrothers casi nunca las lista). Dato del corpus, no una verdad.

## Qué falta para confiar en esto

1. Los otros 7 ganadores (ConnectedAI, Data Alchemists, CELUS Ceals, monArch, Pegasuz, The Archangels, Team 7). Las verdades A–C se apoyan solo en los tres repos de IA; D–H en cinco. Con más repos clásicos se vería si F, G y H son de verdad generales.
2. Revisar a mano las filas de ADR clave de cada ficha (solo muestreé 3–4 por ficha).
3. Decidir con Felix qué pesa más en una verdad: que la sostengan muchos repos, o que sea de lo más útil para quien diseña. No siempre coinciden.
