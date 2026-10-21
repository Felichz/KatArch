# Curso v2: producción de un bloque, de punta a punta

El plan está en `cursos/_investigacion/PLAN-CURSO.md`; los guiones, en `cursos/curso-unico/guion-v2/`; la gramática visual, en `cursos/curso-unico/GUIA-VISUAL.md`. El estado de cada bloque en el sitio lo dice `src/curso/curso.ts` (`etapas`: guion, visual, voz, video).

| Paso | Sombrero | Comando o archivo | Sale |
|---|---|---|---|
| 1. Guion | guionista, verificador | `guion-v2/NN-slug.md`, aprobado por Felix | prosa con escenas `## Título {#id}` y anclas «al decir "…"» |
| 2. Narración | producción | `node cursos/curso-v2/tools/guion-a-narracion.mjs <guion.md> cursos/curso-v2/video/bNN <slug>` | `bNN/narration.json` |
| 3. Kit | producción | `node cursos/curso-v2/video/sync-kit.mjs` | kit, `dg.js`, `dg.css`, `index.html` en cada `bNN/` |
| 4. Voz | producción | borrador: `node tools/voice-say.mjs` (macOS `say`); producción: `node tools/voice.mjs` (ElevenLabs, clave de Felix por variable de entorno) | `assets/voice/*`, `voice.json` |
| 5. Tiempos | producción | `node tools/timing.mjs` | `timing.js` |
| 6. Animación | dirección visual | `compositions/<escena>.html`, anclada con `W(línea, 'prefijo')` y `L(i)` | |
| 7. Revisión | espectador de prueba | `npx --yes hyperframes@0.8.139 check` (0 errores; falla si un ancla no existe) y `snapshot`; nunca `preview` | `snapshots/` |
| 8. Render | producción | `npx --yes hyperframes@0.8.139 render -o renders/katarch-bNN.mp4 --quality looks --fps 30` (necesita ffmpeg y ffprobe en el PATH) | `renders/` (ignorado) |
| 9. Sitio | producción | `node scripts/build-curso-data.mjs`; en `curso.ts`, `video: 'listo'` | `src/curso/bloques.json`, `public/curso/bNN.webp`, `public/local-video/curso/bNN.mp4` |
| 10. Probar | espectador de prueba | `PUBLIC_LOCAL_VIDEO=curso npm run dev` → `/curso/` | |
| 11. Publicar | **solo Felix** | subir `renders/katarch-bNN.mp4` a R2 como `curso/bNN.mp4`; commit y push a `main` (Vercel) | |

Los pasos 2 a 5 se repiten cada vez que cambia el guion: la animación sigue a las palabras y no hay que mover tiempos a mano.

## Cómo se ve el avance en el sitio

- **Producción** (lo que falta hacer): cada bloque muestra sus cuatro etapas (vacía, en borrador, lista). Un bloque sin video aparece en el mapa con borde punteado y la etiqueta "En producción"; su página es una ficha WIP con lo que enseña, la pregunta, el par de casos y las familias. La barra "Producción del curso" de la portada suma las etapas listas de todos los bloques.
- **Espectador** (lo que vio cada persona, guardado solo en su navegador con la clave `curso2/<slug>`): un bloque visto al 95% se pinta verde en la barra de progreso, en su estación o región, y enciende su pieza en el diagrama de ClearView del cierre. El botón "Empezar" o "Seguir" lleva al primer bloque disponible que falta ver.
- Cuando un bloque pasa a `video: 'listo'` y tiene su entrada en `bloques.json`, el mapa lo muestra disponible sin tocar nada más.
