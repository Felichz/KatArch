# Brief: tapar las pantallas vacías de una lección ya renderizada

La lección `video/chN/` ya tiene voz de borrador (`timing.js` en modo voz, tiempos reales) y un render. Un detector automático (`blank-check.sh`) encontró tramos en los que la zona de contenido (y = 100 a 900) queda sin nada visible durante 2 segundos o más. El pedido trae la lista, con la escena, la línea y las palabras que dice la voz en ese momento. Tu trabajo es que en esos tramos haya siempre algo en pantalla que acompañe lo que se dice, sin cambiar la narración.

## Reglas
- Lee primero `cursos/curso-unico/BRIEF-animacion.md` (kit, anclas `W/L/LE`, reglas que costó aprender, y la nota del piloto sobre usar toda la pantalla). Valen todas.
- Causas típicas y su arreglo:
  - **Comienzo de escena vacío:** el primer elemento está anclado a una palabra tardía de la línea 0. Haz aparecer un encabezado de la escena (el título de lo que se va a contar, el nombre del caso con su ícono, la cifra) en `L(0)` o en la primera palabra con contenido.
  - **Hueco entre dos ideas dentro de la escena:** algo se oculta (`hide`) y lo siguiente aparece segundos después. Oculta lo viejo justo cuando aparece lo nuevo (o atenúalo con `dim` en vez de ocultarlo) para que nunca quede la pantalla en blanco.
- No cambies `narration.json`, ni ids, ni el orden de las escenas, ni `index.html`. No renderices, no generes voz y no corras `hyperframes preview`.
- Verifica: `npx --yes hyperframes@0.8.139 check` en 0 errores, y capturas justo en los tramos de la lista (`npx --yes hyperframes@0.8.139 snapshot --at "t1,t2,…" --no-end --timeout 25000 -o snapshots/huecos`), mirándolas. Una pasada de arreglos y una de confirmación.

## Qué entregar
Para cada tramo: qué lo causaba y qué pusiste. Resultado del último `check`.
