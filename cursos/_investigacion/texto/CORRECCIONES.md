# Correcciones de la fase 1 (sobre los 40 NO de la verificación)

Aplicadas a mano sobre `<Repo>.md`. Los `.verificacion.md` no se reescribieron: siguen mostrando el NO original. Hay que volver a verificar estos hallazgos con una lectura nueva antes de darlos por buenos.

| Repo | Hallazgo | Qué se corrigió |
|---|---|---|
| BluzBrothers | H05 | La cota de 16 ms de InfluxDB se marca como cota calculada por el equipo; el 2 ms por señal, como supuesto (`:51`). |
| Celus-Ceals | H05 | Que la API reciba mensajes de cámaras se marca como deducción a partir del nombre del contenedor. |
| ConnectedAI | H14 | "Pedir historial requiere ID de cliente" pasa de dato a deducción; la línea solo dice que el usuario entra con ID o como invitado. |
| Five-Nines | H05 | La frase "de modo que el reemplazo no cambia a los consumidores" se marca como deducción a partir de `ADR-0020:69`. |
| Five-Nines | H23 | El costo de tokens se atribuye a `ADR-0012:51,69`, no a `ADR-0018`. |
| ZAITects | H11 | El A/B del roll-out aplica a técnicas de prompting (`:11`), no a IA frente a humanos. |
| Team-7 | H03 | "Impide priorizar" pasa a "apenas se logra", con la cita del ADR-3:14 en inglés. |
| Team-7 | H04 | La UI de facturación tras VPN pasa a opción condicional (ADR-4:22). |
| Archangels | H04 | Se corrigen las líneas: "autorización separada" está en `015:27`; la restricción de alta seguridad está en `015:32`, `013:32`, `014:32`. |
| Archangels | H06, H08, H14 | Citas entre comillas en inglés, como aparecen en el repositorio. |
| Pragmatic | H06 | Se completa la lista de "Cost" fortalecido (ADR-006:40, ADR-007:55, ADR-011:78) y se corrige "cada ADR declara su costo". |
| Pragmatic | H08 | ADR-007 cita A20, A21, A24 y A25, no el rango A20-A28. |
| Pragmatic | H16 | La cita de ADR-006 en el C3 de Story es `:9`, no `:25`. |
| Profitero-Data-Alchemists | H08 | El descarte de un servicio gestionado se marca como deducción. |
| Profitero-Data-Alchemists | H11, H12, H13 | "Fuente: las citadas" se reemplaza por los archivos y líneas de la verificación; las citas traducidas se devuelven al inglés. |
| Pegasuz | H01, H03, H04, H05, H07, H09, H11 | Citas traducidas devueltas al inglés del repositorio. H05 apunta a `Requirement-analysis.md:38`. |
| Pegasuz | H15 | Se quita `README.md:127` de la cita (solo remite a otro documento). |
| MonArch | H01–H04, H06–H11, H13, H15 | Citas traducidas devueltas al inglés del repositorio. |
| MonArch | H14 | Las alternativas Azure/AWS se limitan a lo que da el README (Cloud Run, API Gateway, Pub/Sub, BigQuery, Cloud Data Fusion); Cloud SQL no tiene alternativa en esas líneas. |

## Lo que la comprobación mecánica todavía marca

Una comparación de cada cita entre comillas con el texto del repositorio encuentra más citas que no son literales, en hallazgos que no estaban entre los 40 NO. Son sobre todo traducciones (`ArchColider`, `Five-Nines`, `ConnectedAI`, `Pragmatic`, `ZAITects` y otros). Varias pueden ser falsos positivos (frases entre comillas que son títulos o términos). No están corregidas. Hay que decidir si se corrigen con la misma regla antes del análisis de conjunto.

## Segunda pasada (comprobación mecánica)

- Se quitaron las comillas de toda cita que no es literal en el repositorio (quedan como paráfrasis).
- Se resolvieron rutas abreviadas (`carpeta/nombre-...md`) cuando había un único archivo (`scripts/resolver-rutas.mjs`).
- Se igualaron cifras al formato de la fuente (ArchColider: 12548.17 / 22480.57 USD; ZAITects: 960K).
- MonArch: la tarifa de Cloud SQL dice ".035/GB/Hr" en el texto (con el punto inicial), no "0,035".
- Las rutas con comodín (`quanta/*.md`, `c3-*.md`, etc.) se cambiaron por la carpeta.
- Resultado: 198 OK y 8 NO en la comprobación mecánica (`scripts/comprobar-citas.mjs`). No es una verificación de sentido.
