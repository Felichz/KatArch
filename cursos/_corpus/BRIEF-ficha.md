# Brief: ficha de un repositorio ganador

Objetivo: describir, con evidencia, qué arquitectura construyó un equipo ganador de una Architecture Kata de O'Reilly, para después compararlo con otros ganadores y decidir qué vale la pena enseñar. NO estás escribiendo un guion ni una reseña: estás extrayendo datos.

## Reglas (obligatorias)
1. **Solo lo que está en el repositorio.** Cada afirmación lleva entre paréntesis el archivo de donde sale (ruta relativa a la raíz del repo, sin la parte `-src`). Si no puedes citar un archivo, no lo escribas.
2. **Distingue tres cosas** y márcalas: `[DATO]` lo que el repo dice explícitamente; `[DEDUCCIÓN]` lo que se infiere de lo que dice (explica de qué); `[HUECO]` lo que el repo no dice o deja sin resolver.
3. **No opines ni elogies.** Nada de "excelente", "interesante", "inteligente", "buena decisión". Si algo es distintivo, di por qué en hechos (qué hizo, qué cuesta, qué evitó).
4. **No inventes** cifras, nombres de ADR, alternativas ni razones. Si un ADR no declara alternativas, escribe "no declara".
5. Español neutro. Términos técnicos en inglés cuando así se dicen (trade-off, event-driven, fitness function).
6. Lee TODOS los ADR y los documentos de requisitos/arquitectura del repo (son pocos). No resumas desde los títulos.
7. Si el repo tiene `git`, puedes consultar la historia en el clon hermano (ver el pedido) con `git log --format='%h %ad %s' --date=short` para el proceso. Es opcional y secundario.

## Formato de salida (un solo archivo .md, estas secciones, en este orden)

# Ficha · <equipo> · <caso> (<edición>)

## 1. El caso
Un párrafo: quién es el cliente, qué pide, cuál es el problema central, qué restricciones duras trae (cifras, plazos, regulación). [DATO] con fuente.

## 2. Qué entregó el equipo
Lista de carpetas/documentos principales y para qué sirve cada uno (una línea cada uno). Cantidad de ADR. Tipos de diagramas. Si hay fitness functions, event storming, C4, OKRs, etc.

## 3. Decisiones (tabla, una fila por ADR, TODOS los ADR)
| ADR | Decisión (una frase) | Alternativas que declara | Razón declarada | Trade-off o costo que admite | Etiquetas (ver lista) |
Si un ADR no declara alternativas o costo, escribe "no declara". Las etiquetas salen de la lista de abajo.

## 4. Patrones y prácticas presentes
Lista de lo que usa el equipo, cada ítem con etiqueta, una línea de qué hace concretamente en este sistema y fuente. Incluye tanto patrones de arquitectura como prácticas de proceso/documentación.

## 5. Cómo llegan de los requisitos a la arquitectura
¿Hay una cadena visible requisito → característica de calidad → decisión? Describe cómo está hecha (qué documento enlaza con cuál). Si no hay cadena, [HUECO]. Cuenta las características de arquitectura que priorizan y cómo las ordenan.

## 6. Lo distintivo
De 3 a 6 cosas que este equipo hizo y que un equipo promedio probablemente no haría. Para cada una: qué hizo (hecho), qué evitó o qué cuesta, fuente.

## 7. Huecos, inconsistencias y cosas fuera de alcance
Lo que el repo declara fuera de alcance o "futuro", contradicciones entre documentos, ADR sin consecuencias, cifras que no cierran. Cada ítem con sus dos fuentes si es una contradicción.

## 8. Candidatas a verdades enseñables (máx. 8)
Cada una: una frase afirmativa y general (que sirva a alguien que no conoce este caso), el ejemplo concreto de este repo que la sostiene, y la fuente. Marca cuánto respalda el repo: `FUERTE` (varios ADR/documentos lo sostienen), `MEDIA` (un documento claro), `DÉBIL` (se deduce).

## 9. Fragmentos citables
5 a 10 frases textuales cortas del repo (máx. 25 palabras cada una), entre comillas, con archivo, que muestren razonamiento (no relleno).

## 10. Etiquetas presentes (para comparar entre repos)
Lista final de las etiquetas de la lista que aplican a este repo, separadas por coma. Si algo importante no está en la lista, agrégalo al final como `otro: nombre`.

## Lista de etiquetas (usa estas y solo estas, salvo `otro:`)
Estilo: monolito-modular, microservicios, event-driven, serverless, CQRS, event-sourcing, batch-analytics, streaming, API-gateway, BFF, hexagonal, DDD
Datos: db-por-servicio, db-compartida, time-series, cache, cola-de-mensajes, kafka, data-lake, retencion-de-datos, fuente-unica-de-verdad
Calidad: disponibilidad-HA, escalabilidad, rendimiento-latencia, seguridad, privacidad-GDPR, observabilidad, resiliencia-fallos, costo, testabilidad, evolutividad, deployability
Proceso: ADR, C4, event-storming, fitness-functions, OKR, supuestos-explicitos, riesgos-explicitos, fuera-de-alcance-explicito, tradeoffs-explicitos, historias-de-usuario, topologia-de-equipos, glosario
Cloud/infra: cloud-gestionada, multi-cloud, IaC, contenedores, zero-trust, edge
IA: ia-generativa, ml-clasico, reglas-deterministas, human-in-the-loop, evaluacion-de-modelos, mlops, sesgo-y-datos, hibrido-ia-reglas, costo-de-inferencia

Longitud: la que haga falta para que cada sección sea completa; la sección 3 es la más larga. No agregues secciones ni resúmenes finales.
