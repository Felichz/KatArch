// Junta los hallazgos de la fase 1 (solo texto) de los doce repositorios en cursos/_investigacion/texto/INDICE.md.
// Lee cursos/_investigacion/texto/<Repo>.md (los hallazgos "#### H<nn> · título" con sus campos) y, si existe,
// <Repo>.verificacion.md, con una línea "- H<nn> · OK|NO · nota" por hallazgo. No decide nada: solo ordena y cuenta.
//   node scripts/indice-hallazgos.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'cursos/_investigacion/texto')
mkdirSync(dir, { recursive: true })
const repos = [
  'ArchColider', 'Archangels', 'BluzBrothers', 'Celus-Ceals', 'ConnectedAI', 'Five-Nines',
  'MonArch', 'Pegasuz', 'Pragmatic', 'Profitero-Data-Alchemists', 'Team-7', 'ZAITects',
]

const field = (block, name) => {
  const m = block.match(new RegExp(`^- ${name}:\\s*(.*)$`, 'm'))
  return m ? m[1].trim() : ''
}
const completeness = (block) => {
  const m = block.match(/^\s+- \*(completo|parcial|ilustrativo)\*/m)
  return m ? m[1] : field(block, 'Completitud') || 'sin dato'
}

const rows = []
const missing = []
for (const repo of repos) {
  const file = join(dir, `${repo}.md`)
  if (!existsSync(file)) {
    missing.push(repo)
    continue
  }
  const text = readFileSync(file, 'utf8')
  const verFile = join(dir, `${repo}.verificacion.md`)
  const verified = existsSync(verFile) ? readFileSync(verFile, 'utf8') : ''
  const blocks = text.split(/^#### /m).slice(1)
  for (const b of blocks) {
    const head = b.split('\n')[0]
    const m = head.match(/^(H\d+)\s*·\s*(.*)$/)
    if (!m) continue
    const id = m[1]
    const title = m[2].trim()
    const v = verified.match(new RegExp(`^- ${id} · (OK|NO)\\b`, 'm'))
    const status = v ? (v[1] === 'OK' ? 'verificado' : 'no verificado') : 'sin verificar'
    rows.push({
      repo,
      id,
      title,
      idea: field(b, 'Idea'),
      estado: field(b, 'Estado'),
      fuente: field(b, 'Fuente'),
      completitud: completeness(b),
      imagen: field(b, 'Depende de imagen'),
      verificacion: status,
    })
  }
}

const esc = (s) => s.replace(/\|/g, '\\|')
const out = [
  '# Índice de hallazgos · fase 1 (solo texto)',
  '',
  'Generado por `scripts/indice-hallazgos.mjs` a partir de `texto/<Repo>.md` y `texto/<Repo>.verificacion.md`. No es una selección: es todo lo que se extrajo, para el análisis de conjunto.',
  '',
  `Hallazgos: ${rows.length} · repositorios sin extracción: ${missing.length ? missing.join(', ') : 'ninguno'}`,
  '',
  '| Repo | ID | Hallazgo | Idea | Estado | Completitud | Depende de imagen | Verificación | Fuente |',
  '|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.repo} | ${r.id} | ${esc(r.title)} | ${esc(r.idea)} | ${esc(r.estado)} | ${r.completitud} | ${esc(r.imagen)} | ${r.verificacion} | ${esc(r.fuente)} |`),
  '',
]
writeFileSync(join(dir, 'INDICE.md'), out.join('\n'))
console.log(`${rows.length} hallazgos en texto/INDICE.md${missing.length ? ` · faltan: ${missing.join(', ')}` : ''}`)
