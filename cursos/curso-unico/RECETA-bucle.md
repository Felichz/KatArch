# Bucle de refinamiento por lección (lo corre cada reescritor por su cuenta)

Reglas que se miden en cada vuelta (las cuenta `carga\check-reglas.cjs` sobre la tabla de un revisor Haiku independiente):
- **R1** carga ≥ 4 con fricción ≥ 3.
- **R2** fricción ≥ 3 con carga 3.
- **R3** dos ideas seguidas con carga ≥ 4.
- **R4** dos casos nuevos a menos de 120 s.
Objetivo: **cero violaciones**, con los hechos verificados contra la fuente. Máximo **3 vueltas**; si al terminar quedan violaciones, dilo con el número y qué ideas son.

## Cómo editar (cambios mínimos)
La ronda 5 reescribió guiones enteros y cada reescritura trae violaciones nuevas. **Esta vez no reescribas.** Para cada idea que marque el revisor:
1. Busca la frase exacta en tu guion (la columna "Idea" de la tabla del revisor la cita).
2. **Cambia solo esa frase y, si hace falta, la siguiente.** Todo lo demás queda **palabra por palabra** igual.
3. Cómo arreglar:
   - **R3 (dos pesadas seguidas):** intercala una frase de carga 1 entre ellas (una que aplica lo dicho a un caso ya conocido: "o sea…", "es decir…") **o** baja una de las dos partiéndola. La frase intercalada no puede traer elementos nuevos.
   - **R1 / R2 (llega pesada con salto, o algo nuevo con carga 3):** deja la frase solo con **un** elemento nuevo; el resto va en la frase siguiente. Si la idea es un cambio de caso o de tema, antepón un puente de 6 a 10 palabras que no lleve elementos nuevos.
   - **Término o nombre sin presentar:** presentarlo en una frase propia, antes.
   - **Si una idea no se puede aligerar sin perder lo que enseña, córtala** (cortar es mejor que apretar).
4. **Presupuesto de palabras:** no pases de 1.150 (1.200 la lección 1). Cada frase que añadas obliga a cortar otra.

## Un paso de la vuelta k (k = 1, 2, 3); N es tu lección
```
REPO=$(git rev-parse --show-toplevel)
cd "$REPO/cursos/curso-unico"
node narr-merge.cjs N
cd "$TTS_DIR"
node jorge_course.mjs "$REPO/cursos/curso-unico/video" out/curso-jorge N
cd "$REPO/cursos/curso-unico/carga"
mkdir -p LN-ik
node tiempos.mjs LN-ik N
```
(con `LN-ik` = por ejemplo `L5-i1`). Después **lanza un subagente de modelo `haiku`** (herramienta Agent, `subagent_type: general-purpose`, `model: haiku`) con este pedido, cambiando N, el nombre de carpeta y el número de lección:

> Sigue al pie de la letra el brief `cursos/curso-unico/BRIEF-carga.md` para la **lección N** (guion `cursos/curso-unico/guion/leccionN.md`). Aplica la rúbrica de carga del brief **contando elementos nuevos**, idea por idea (un elemento que ya apareció antes en la lección, o que es de una lección anterior y se recuerda, no es nuevo). Los tiempos de cada línea de la narración están en `cursos/curso-unico/carga/LN-ik/tiempos-chN.txt` (usa ese archivo para la columna Tiempo, no `timing.js`). Léelo todo primero. **Escribe el resultado en `cursos/curso-unico/carga/LN-ik/leccionN.md`.** Puntúa el guion actual con la cabecera de tabla exacta del brief. No leas nada de las demás carpetas de `carga`: tu puntaje tiene que ser independiente.

Cuando termine, corre:
```
node cursos/curso-unico/carga/check-reglas.cjs LN-ik N
```
Si no hay ninguna violación (R1 = R2 = R3 = R4 = 0), **terminaste**. Si hay, edita según la receta de arriba y haz la vuelta siguiente. Si no puedes lanzar subagentes, edita lo que tengas y dilo en tu respuesta final.

## Qué entregar (respuesta final corta)
- Número de vueltas y violaciones en cada una (R1/R2/R3/R4).
- Palabras finales.
- Qué cambiaste y qué cortaste en cada vuelta.
- Los hechos que corregiste (verificados en la fuente).
- Lo que no pudiste arreglar.
