# Capítulo 8 · Contar la arquitectura

*Versión «lecture-style» híbrida (skill `guion-curso`). Gancho concreto (un guion con las cifras en blanco), pregunta y ruta en una frase, pasos con el caso que vuelve, una sola pausa, cierre con «lo que el repositorio no tiene» (decisión de `ESTILO.md`). Sin opiniones del narrador. Los títulos no se dicen. [PAUSA] = silencio a propósito.*

---

## Un guion con huecos

El sábado ocho de noviembre, el equipo sube a su repositorio el guion de un video de cinco minutos. Está escrito para una audiencia de negocio, y tiene huecos. Donde debería ir la utilización de la flota dice «de tanto por ciento a tanto por ciento», con dos rayitas en lugar de números. El costo de mantenimiento por vehículo, lo mismo. El tamaño de la flota, también.

Es la última pieza de esta historia, y con ella se ve la diferencia entre un número que se puede defender y uno que solo se puede afirmar.

## Dos semanas de silencio

Después de la foto del veintitrés de octubre, el repositorio queda quieto. Durante dos semanas no hay un solo cambio. Según el calendario de la sesión inaugural, el cinco de noviembre se anunciaron los semifinalistas, que tenían hasta el nueve para mandar su video. El siete, el equipo vuelve a escribir.

Si se compara el repositorio de la entrega con el de la final, aparece esto: no cambió ninguna decisión de arquitectura, ni un diagrama, ni un requisito. Todo lo nuevo es comunicación, una tabla de metas de negocio, el guion del video, el texto que se iba a leer y la presentación final. La arquitectura ya estaba decidida, y lo que faltaba era contarla para gente que no iba a leer veintidós documentos de decisión.

## Otro orden

La página principal del repositorio contaba los escenarios en un orden. Primero el asistente de la aplicación, después las opiniones, las baterías y los precios, y al final el pronóstico de demanda. En las diapositivas de la final, ese orden se invirtió. Quedaron tres casos de uso, y el primero es pronosticar la demanda y reubicar vehículos. El segundo es el mantenimiento predictivo, y el tercero la visión artificial, la que mira las fotos de devolución buscando daños y suciedad, con revisión humana.

El asistente, el chatbot del capítulo uno, que encabezaba la página principal, ya no está entre los tres. Y el problema del monumento, el último que se diseñó, pasó a ser lo primero que se cuenta.

## Ganar antes, gastar después

El otro cambio es una idea que ordena el plan entero, un portafolio de inteligencia artificial con compuertas de valor. Una compuerta es una condición medible que una fase tiene que cumplir para que se apruebe la siguiente. La primera fase, la número cero, solo instala medición: cuánto se usa la flota, cuánto se equivoca el pronóstico, cuántas disputas hay por tarifas. La fase uno hace lo simple, un pronóstico estadístico y los daños registrados a mano. La fase dos suma el consejo de carga y la visión en modo sombra, o sea, un modelo que observa y anota sin decidir nada. Y solo la fase tres automatiza.

El lema del equipo era ganar antes y gastar después. Son las bandas de confianza del capítulo cinco y la escalera del pronóstico del seis, llevadas a todo el proyecto. Cada gasto nuevo espera a que un número medido lo justifique.

## Los huecos, llenos

Al día siguiente del guion con huecos, el nueve de noviembre, el texto del video ya tiene cifras. Habla de treinta y dos por ciento más de utilización, y de unos doscientos cuarenta mil euros por mes de mejora. El repositorio no tiene el cálculo detrás de ninguno de los dos. Y hay algo más: el texto del video y las diapositivas dan cifras distintas para lo mismo. En el texto del video, el costo de mantenimiento por vehículo baja a sesenta euros. En las diapositivas, para lo mismo, baja a setenta y nueve, y parte de otro número.

En el capítulo dos separamos los números en tres categorías: dados, calculados y elegidos. Estos están en la tercera, con una diferencia respecto de las metas de aquel capítulo. Las metas se presentaban como metas, y estas cifras se presentan como resultados.

## Una proyección o una regla

Ponte en el lugar del equipo, con cinco minutos frente al jurado y dos tarjetas en la mano. En una dice treinta y dos por ciento más de utilización. En la otra, una regla: solo pasamos a la fase dos si el pronóstico baja su error hasta cierto punto. ¿Cuál de las dos puedes defender con lo que hay en tu repositorio?

[PAUSA]

La que se sostiene con lo que hay en el repositorio es la regla. Se apoya en decisiones escritas, como la escalera del pronóstico, y cualquiera la puede comprobar cuando llegue el momento. La proyección necesita su cálculo, y sin él, lo primero que puede preguntar un juez es de dónde sale. El equipo ganó con las dos tarjetas sobre la mesa; lo que el repositorio permite separar es cuál de las dos se sostiene sola.

## Lo que el repositorio no tiene

Para cerrar el curso con la misma regla que lo abrió, hecho, deducción y hueco, toca nombrar los huecos. El repositorio no tiene una cuenta del volumen de mensajes: la de trescientos cincuenta por segundo del capítulo tres es nuestra. No tiene un cálculo de los costos de infraestructura, más allá de una cifra suelta en el texto del video. Y no tiene la base de ninguna de sus cifras de negocio, desde el veintitrés por ciento del capítulo dos hasta los doscientos cuarenta mil euros de este. Nada de eso le quita valor al razonamiento que sí quedó escrito, pero marca hasta dónde llega.

## Las rayitas

Las rayitas del guion del ocho de noviembre se llenaron en un día. Es la misma clase de número con la que empezó este curso, el de Sam Newman inventando una flota en vivo: una cifra que parece firme y que, mirada de cerca, es la decisión de alguien. La diferencia está en lo que el equipo escribió alrededor. Donde dejó una regla, cualquiera puede comprobarla el día que lleguen los datos. Donde dejó una proyección sin cuenta, solo queda creerle. Así decidió dónde poner la inteligencia artificial y dónde no, pieza por pieza y con el costo a la vista.

Five Nines ganó el kata con ese razonamiento, con sus aciertos y con los huecos que también vimos. Todo su trabajo es público, en el repositorio Five Nines de The Kata Log, en GitHub.

---

## Notas de verificación

| Afirmación | Fuente |
| - | - |
| Guion del video del sábado 8 de noviembre, para audiencia de negocio, con cifras en blanco («__ % → __ %»), incluido el tamaño de la flota | 87da42f, 3b1591c (`video/video-scenario-business-management-5min.md`) |
| Ningún commit del 24 de octubre al 6 de noviembre; el equipo vuelve el 7 | Historial (`HISTORIA.md` §3) |
| Semifinalistas el 5 de noviembre; videos hasta el 9 | Subtítulos, min ~72 |
| `git diff ebf6d83 e930bcb`: solo cambian `README.md`, `OKRs.md` y `video/`; ningún ADR, diagrama, FR o NFR | `HISTORIA.md` §3 |
| Orden del README: asistente, opiniones, baterías, precios, pronóstico | d81160a |
| Tres casos de uso de la presentación final (pronóstico y reubicación; mantenimiento predictivo; visión con revisión humana) | 02f177b (PDF, diapositiva 7) |
| Portafolio con compuertas de valor; fases 0 a 3; visión en modo sombra; «earn sooner, spend later» | 87da42f, 3b1591c |
| +32 % de utilización y ~240.000 €/mes de mejora («uplift») | `video/narrative.md` (88bedef, 9 de noviembre) |
| Costo de mantenimiento por vehículo: 78 → 60 € (narrativa) contra 117,1 → 79,08 € (diapositivas) | `video/narrative.md`; PDF p. 7 (`HISTORIA.md` §5, inconsistencia 10) |
| Lo que el repositorio no tiene (volumen, costos, base de las cifras) | `HISTORIA.md` §6 |
| Repositorio público | `github.com/TheKataLog/Five-Nines` |
