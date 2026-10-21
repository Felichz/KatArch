# tiza.js: el kit de "Pizarra y forma"

Referencia para animar un bloque en el estilo del curso v2 (`cursos/curso-unico/GUIA-VISUAL.md`, "Pizarra y forma"). El código está en `assets/tiza.js` y `assets/tiza.css`; `sync-kit.mjs` los copia a cada `bNN/assets/`. Se cambian **solo aquí**, en `kit/`, y después se corre `sync-kit.mjs`. Un cambio en el kit toca todos los bloques: se vuelven a mirar las capturas de los bloques ya producidos.

Los ejemplos completos son las composiciones de `b01/` y `b02/`.

## Una composición

```html
<!doctype html>
<html lang="es">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <div id="ESCENA" class="scene" data-composition-id="ESCENA" data-width="1920" data-height="1080"></div>
      <script>
        (() => {
          // IDEAL.md, escena N: la forma de la escena en una línea
          const K = KIT.scene('ESCENA');
          const { W, L } = K;
          const T = TZ(K), C = T.C;

          const a = T.box(400, 200, 300, 116, 'Candidatos');
          T.draw(W(0, 'cuatro'), a);          // se traza al decir «cuatro…» en la línea 0
          T.color(W(0, 'guarda'), a, C.or);   // se repasa en naranja
          T.erase(L(1) - 0.3, a);             // se borra justo antes de la línea 1
          K.done();
        })();
      </script>
    </template>
  </body>
</html>
```

- `ESCENA` es el id de la escena del guion (`## Título {#id}`) y el nombre del archivo: `compositions/ESCENA.html`.
- `W(línea, 'prefijo', n = 0)`: el segundo (en el reloj de la escena) en que se dice la `n`-ésima palabra de esa línea que empieza con `prefijo`. Sin acentos ni mayúsculas que importen. Si no existe, la escena falla y `check` lo avisa. Cuidado con las palabras que se repiten en una línea: la primera es `n = 0`.
- `L(i)`: el comienzo de la línea `i`; `K.LE(i)`, su final. Las líneas son los párrafos de la narración de la escena.
- Nunca segundos fijos: todo se ancla a palabras, para que la animación siga a la voz cuando cambia el guion o la voz.
- `K.done()` al final, siempre.

## Coordenadas y colores

Pantalla de 1920 × 1080; las coordenadas son de ese cuadro, antes de la cámara. El sello del caso ocupa arriba a la izquierda (desde x 52, y 96): no poner piezas ahí.

| `C.` | Color | Para |
|---|---|---|
| `ch` | tiza blanca | lo que está |
| `or` | naranja | lo que la voz señala ahora (uno por cuadro) |
| `gr` | verde | lo que se gana; las notas de cualidad |
| `am` | ámbar | lo que se paga o baja |
| `rd` | rojo | solo lo que falla o se rompe |
| `bg` | pizarra | rellenos |
| `dim` | gris | fondo, lo que no importa ahora |

Grises sueltos que usan los bloques: `#a9b0a8` (renglones), `#8b938c` (lugares vacíos, ejes), `#c9c3b4` (rótulos secundarios).

## Piezas

Cada pieza devuelve `{ s: [trazos SVG], ht: [elementos HTML], …anclas }`. Nada se ve hasta que un comportamiento lo muestra. Las opciones comunes son `c` (color), `sw` (grosor), `dash` (punteado, `'12 12'`) y `fill: false` (sin relleno).

| Pieza | Firma | Notas |
|---|---|---|
| Caja | `box(x, y, w, h, texto, o)` | rótulo en tipografía limpia (`o.size`, 38 por defecto); anclas `c`, `l`, `r`, `t`, `b` (puntos `[x, y]`) |
| Punto | `node(cx, cy, r = 46, o)` | un punto de la estrella, con relleno |
| Cilindro | `cyl(cx, cy, w, h, o)` | una base de datos |
| Línea, camino | `line(x1, y1, x2, y2, o)`, `path(d, o)` | `d` es un camino SVG |
| Círculo, elipse | `circle(cx, cy, r, o)`, `ellipse(cx, cy, rx, ry, o)` | `o.rot` gira la elipse |
| Flecha | `arrow(x1, y1, x2, y2, o)` | `o.head` (tamaño de la punta), `o.bend: [dx, dy]` la curva |
| Cruz | `X(cx, cy, w, h, o)` | roja por defecto |
| Tarjeta | `card(x, y, w, h, o)` | caja con tres renglones (un dato, un requisito) |
| Hoja | `sheet(x, y, w, h, título, franjas, o)` | esquina doblada; devuelve `{ outline, st: [franjas] }`. `o.rows: false` sin renglones, o la lista de franjas que los llevan |
| Rótulo | `label(x, y, texto, o)` | tipografía limpia, centrado en (x, y). Para números, códigos y nombres |
| Nota a mano | `note(x, y, texto, o)` | Caveat; `o.anchor: 'c'` centra en x (si no, x es el borde izquierdo). Nunca números ni códigos: a la mitad de tamaño se confunden |
| Ícono | `icon(nombre, cx, cy, tamaño, o)` | un ícono de Lucide en tiza (`assets/icons.js`; para sumar uno, se agrega a la lista de `kit/tools/icons.mjs` y se corre con `NODE_PATH=<raíz>/node_modules node kit/tools/icons.mjs`) |
| Estrella chica | `mini(cx, cy, tipo, k)` | la estrella del bloque 1 con una consecuencia: `gana`, `cambio`, `dato`, `cae`; `k` es la escala |
| Juntar | `join(a, b, …)` | varias piezas como una |
| Grupo | `group(() => ({ … }))` | lo que se crea adentro va a su propio `<g>` y su capa; devuelve `{ g, d, r }` (`r` es lo que devolvió la función) |

## Comportamientos

Todos reciben primero el momento `t` (de `W()` o `L()`) y una pieza o una lista de piezas.

| Comportamiento | Firma | Qué hace |
|---|---|---|
| Trazar | `draw(t, x, { d, st, op })` | los trazos se dibujan de punta a punta en `d` s (0,7); los rellenos llegan después de empezar el trazo; las notas se escriben de izquierda a derecha. `st` escalona una lista |
| Mostrar | `show(t, x, { d, op })` | aparece sin trazar (lo que vuelve) |
| Borrar | `erase(t, x, { d })` | se va |
| Repasar | `color(t, x, color, { labels })` | cambia el color del trazo y del rótulo (`labels: false` deja el rótulo) |
| Apagar | `dim(t, x, op = 0.35, d)` | baja de intensidad; `op: 1` la devuelve |
| Mover | `move(t, x, dx, dy, { d, ease })` | desplaza sin escalar |
| Mover un grupo | `gto(t, G, { x, y, scale, opacity, d, ease }, ox, oy)` | mueve, escala o desvanece un grupo entero alrededor de (ox, oy) |
| Cámara | `cam(t, [x, y, w, h] \| null, d)` | se acerca a un rectángulo (hasta unas 1,6 veces) o vuelve al cuadro entero |
| Barrido | `sweep(t, d)` | el borrador cruza la pantalla: cambio de idea |
| Sello del caso | `seal(t, nombre, ícono, hasta)` | arriba a la izquierda, mientras se habla de un caso |

## Piezas del curso

| Pieza | Firma | Qué hace |
|---|---|---|
| Estás aquí | `aqui(n, hasta, sub)` | el mapa del curso con el bloque `n` encendido, antes de la primera palabra; a `hasta` se barre. Va primero en la primera escena del bloque |
| Mapa | `mapa(t, n, título, sub)` | el mismo mapa en cualquier momento (el cierre del bloque 1 se achica hacia él); devuelve `{ all, station(i) }` |
| Mundo del caso | `mundo(t, clave, hasta, { cx, cy })` | la ilustración del caso al presentarlo; a `hasta` se achica hacia el sello. Claves: `clearview`, `monitorme`, `mobilitycorp`, `farmacy`, `sysops` |

**Falta en el kit** (se agrega en `tiza.js` cuando un bloque lo necesita, y se anota en la revisión del guion visual, sombrero de producción):
- Los mundos de los invitados (Farmacy Family, Spotlight, ShopWise, Certifiable, Wildlife Watcher), en `MUNDOS`, con la misma forma que los tres que hay: tres partes que se trazan una tras otra y el nombre en naranja abajo.
- El tramo del mapa de los bloques del acto 2 (`PLAN-CURSO.md`, "El mapa como pieza visual"): la región del bloque se ilumina, aparecen sus familias como tarjetas y la del ejemplo queda resaltada. Hoy `mapa()` solo marca la región en naranja.

## Lo que ya se rompió (y cómo no volver a romperlo)

- **Todo se anima con tweens**, nunca con callbacks: la escena tiene que poder rebobinarse y el render salta entre cuadros.
- **Lo que hace visible una pieza va en un `tl.set`** (o en los dos lados de un `fromTo`), nunca solo en el valor inicial de un `fromTo`. Si no, en el render algunas piezas no aparecen o aparecen como cajas negras. Prueba: capturas en orden inverso.
- **`fromTo` con `immediateRender: false`**: si no, la pieza toma su valor inicial desde el primer cuadro de la escena.
- **Los rótulos no se centran con `transform` ni `translate`**: GSAP los pisa al moverlos. `lab()` los centra con una caja flex ancha.
- **Las notas a mano se recortan con margen** (`inset(-20% … -12%)`): las colas de Caveat salen de la caja.
- **Los rellenos llegan después del trazo**: si no, una hoja grande se ve medio segundo como un rectángulo negro.
- **Los elementos que crea el script usan clases globales** (`tiza.css`), no clases de la composición: el CSS de la composición no les llega.
- **El objeto de una pieza guarda el HTML en `ht`**, no en `h` (que es el alto de la pieza). Con `h`, GSAP intentaba animar un número.
