# Acto 1 · Qué sabe el espectador al entrar a cada bloque

Nota de diseño del aprendizaje. Fija qué trae el espectador a cada bloque del acto 1, dónde se presenta cada caso y dónde se define cada término. Si un bloque necesita algo que no está en su fila de "trae", o lo explica él mismo o va antes.

## La regla que sale de acá

Cada caso se presenta en el bloque donde se usa por primera vez, en su propia frase (quién es, qué hace), y nunca en una lista. Por eso desaparece la escena de los cinco casos del bloque 1: presentaba tres casos que ese bloque no usa, y funcionaba como temario. Cada bloque abre además con una frase que ubica a su caso, aunque ya se haya visto, porque un video se puede ver suelto.

## Qué trae y qué agrega cada bloque

| Bloque | Trae al entrar | Casos nuevos (en su propia frase) | Términos nuevos (definidos en el bloque) |
|---|---|---|---|
| Apertura | nada | ClearView | historia anónima, emparejamiento |
| 1 · Decisión | el concurso, ClearView, sus servicios con una base compartida, cuatro preguntas abiertas | MobilityCorp | decisión de arquitectura, trade-off, ADR, requisito citado por número |
| 2 · Cualidades | lo anterior | MonitorMe | cualidad (y "características de arquitectura"), rendimiento, tolerancia a fallos, evolución, elasticidad, estilo (nombrado), facilidad para desplegar, disponibilidad, renuncia con su condición, testabilidad, factibilidad, API, interoperabilidad, integridad de datos |
| 3 · Cuenta | MonitorMe y sus cualidades | ninguno | modelo de lenguaje (pendiente, ver abajo) |
| 4 · Estilo | cualidades, ClearView, MonitorMe | Farmacy Food | estilo, monolito, microservicios, servicios grandes que comparten base, eventos, monolito modular |
| 5 · Corte | estilo, monolito, Farmacy Food | Farmacy Family (al principio), Sysops Squad (a mitad), Spotlight (al final) | criterio de corte, nueves de disponibilidad |

Los casos recurrentes quedan presentados así: ClearView en la apertura, MobilityCorp en el bloque 1, MonitorMe en el 2, Farmacy Food en el 4 y Sysops Squad en el 5. La frase de cada uno es la que antes estaba en la escena de los cinco casos, con su fuente.

## Lo que cambió con esta nota

- **Apertura** (`00-apertura.md`, aprobado): llega a ClearView en unos 30 segundos; se corta la frase de temario del comienzo.
- **Bloque 1** (`01-decision.md`, aprobado): abre ubicando a ClearView, se va la escena de los cinco casos, la frase de la "primera ley" se atribuye a Ford y Richards (ya presentados en la apertura), y "una decisión trae la siguiente" se dice solo en el cierre.
- **Bloques 2, 4 y 5** (borradores, ya cambiados): la presentación de MonitorMe, Farmacy Food y Sysops Squad pasa a su primera aparición, con su ilustración y su fila de verificación.

## Pendientes para cuando se revisen los bloques 2 a 5

- **Bloque 2**: revisado con el proceso de `cursos/curso-v2/PROCESO.md` (tabla al final de `02-cualidades.md`); la API quedó definida. Al escribir su guion visual se corrigió "una decisión a cada cualidad que bajó" (solo tres renuncias tienen ADR). Producido en el estilo pizarra (`cursos/curso-v2/video/b02/IDEAL.md`).
- **Bloque 3**: "intermediario de mensajes" y "modelo de lenguaje" se usan sin definir. El primero necesita una frase; el segundo puede decirse "el modelo de inteligencia artificial", que ya presentó la apertura.
- **Bloque 5**: entran tres casos en unos seis minutos, en el límite de uno cada dos minutos. Se acepta porque Farmacy Family es la segunda fase de un caso conocido y los otros dos llegan separados, cada uno en su frase. Si al leerlo seguido pesa, Spotlight puede pasar al bloque 7, donde vuelve.
