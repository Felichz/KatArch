// Revisión rápida de un guion narrado (.md). Uso: node check.mjs guion/cap1.md [...]
// Mide lo que cuesta en voz: palabras, duración estimada, frases largas, tics y dos puntos.
import { readFileSync } from 'node:fs'

const MAX_WORDS = 28
const WPM = 140 // ritmo de referencia de Pablo en ElevenLabs

const TICS = [
  [/\bno es [^.]{1,40}, es\b/gi, '"no es X, es Y"'],
  [/\b(?:piensa en|imagina|supón que)\b/gi, '"Piensa en / Imagina / Supón que"'],
  [/\b(?:este capítulo sigue a|hasta aquí)\b/gi, 'fórmula de apertura o de puente (no repetir entre capítulos)'],
  [/\bes curioso\b/gi, 'valoración del narrador'],
  [/\by eso lo cambia todo\b/gi, 'cierre "lo cambia todo"'],
  [/\b(?:a mí me|yo, en su lugar|me gusta|me parece|a mi juicio|lo que más me)/gi, 'opinión del narrador'],
  [/\bacá\b|\bvos\b/gi, 'regionalismo'],
  [/\bcaso de referencia\b|\blo que vamos a mirar\b|\bcomo veremos\b/gi, 'lenguaje de apuntes'],
  [/\bverificar\b|\bantes de publicar\b/gi, 'nota de verificación dentro del texto'],
]

for (const file of process.argv.slice(2)) {
  const raw = readFileSync(file, 'utf8')
  // texto narrado: sin título, sin cursivas de cabecera, sin títulos de sección ni tabla de verificación
  const body = raw.split(/\n##\s+Notas de verificación/i)[0]
  const spoken = body
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('*') && l.trim() !== '---')
    .join('\n')
  const clean = spoken.replace(/\[PAUSA\]/g, '')
  const words = clean.split(/\s+/).filter(Boolean).length
  const sentences = clean.split(/(?<=[.?!…])\s+/).filter((s) => s.trim())
  const long = sentences.filter((s) => s.split(/\s+/).length > MAX_WORDS)
  const colons = (clean.match(/:/g) || []).length
  const pausas = (spoken.match(/\[PAUSA\]/g) || []).length

  console.log(`\n${file}`)
  console.log(`  ${words} palabras ≈ ${(words / WPM).toFixed(1)} min a ${WPM} ppm; ${sentences.length} frases; ${pausas} [PAUSA]`)
  console.log(`  dos puntos: ${colons} (${(colons / sentences.length * 100).toFixed(0)} % de las frases)`)
  console.log(`  frases de más de ${MAX_WORDS} palabras: ${long.length}`)
  for (const s of long) console.log(`    - (${s.split(/\s+/).length}) ${s.slice(0, 110).replace(/\n/g, ' ')}…`)
  for (const [re, name] of TICS) {
    const m = clean.match(re)
    if (m) console.log(`  ! ${name}: ${m.length} → ${[...new Set(m)].slice(0, 3).join(' | ')}`)
  }
  if (pausas > 1) console.log('  ! más de un [PAUSA]')
  const first = (spoken.split('\n')[0] || '').trim()
  if (/^(en este capítulo|este capítulo|bienvenid)/i.test(first)) console.log('  ! abre con anuncio, no con un gancho concreto')
  const last = spoken.split('\n').filter(Boolean).slice(-2).join(' ')
  if (/\b(se estableci|aprendimos|en resumen|repasemos)/i.test(last)) console.log('  ! el cierre parece un recap')
}
