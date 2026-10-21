// Inventario de lo que hay en cada repositorio ganador, para que la investigación no se salte nada.
// Escribe cursos/_investigacion/inventario/<Repo>.md: una fila por archivo versionado, con su tipo y una
// columna "Leído" que se marca a mano (o la marca quien investiga) con la fecha o una x.
// Si el inventario ya existe, conserva las marcas de "Leído" y las notas, y agrega los archivos nuevos.
//   node scripts/clone-katas.mjs && node scripts/inventario-katas.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'katas-src')
const out = join(root, 'cursos/_investigacion/inventario')
if (!existsSync(src)) {
  console.error('Falta katas-src/. Corre primero: node scripts/clone-katas.mjs')
  process.exit(1)
}
mkdirSync(out, { recursive: true })

const IMAGE = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'])
const DIAGRAM = new Set(['.drawio', '.excalidraw', '.puml', '.plantuml', '.mmd', '.dsl', '.vsdx'])
const DOC = new Set(['.md', '.markdown', '.txt', '.adoc', '.rst', '.html'])
const OFFICE = new Set(['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.xls', '.xlsx', '.key', '.odp'])
const DATA = new Set(['.json', '.yml', '.yaml', '.csv', '.xml', '.toml'])
const CODE = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.py', '.java', '.cs', '.go', '.rb', '.kt', '.tf', '.sh', '.sql', '.css', '.scss'])

function kind(path) {
  const ext = extname(path).toLowerCase()
  const lower = path.toLowerCase()
  if (DOC.has(ext)) {
    if (/(^|\/)[\d._ -]*(adrs?|ards?|decisions?)\//.test(lower) || /(^|\/)adr[-_ ]?\d/.test(lower)) return 'ADR'
    if (/require|nfr|frs?\b|assumption|constraint|business|problem/.test(lower)) return 'requisitos'
    return 'documento'
  }
  if (IMAGE.has(ext)) return 'imagen'
  if (DIAGRAM.has(ext)) return 'diagrama fuente'
  if (OFFICE.has(ext)) return 'pdf u office'
  if (DATA.has(ext)) return 'datos'
  if (CODE.has(ext)) return 'código'
  return 'otro'
}

// marcas de una corrida anterior: | archivo | tipo | KB | leído | notas |
function previous(file) {
  const marks = new Map()
  if (!existsSync(file)) return marks
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\| `(.+?)` \| [^|]* \| [^|]* \| ([^|]*) \| ([^|]*) \|$/)
    if (m) marks.set(m[1], { read: m[2].trim(), notes: m[3].trim() })
  }
  return marks
}

const repos = readdirSync(src).filter((d) => !d.startsWith('.') && existsSync(join(src, d, '.git'))).sort()
const summary = []
for (const repo of repos) {
  const files = spawnSync('git', ['ls-files'], { cwd: join(src, repo), encoding: 'utf8' }).stdout.split('\n').filter(Boolean)
  const target = join(out, `${repo}.md`)
  const marks = previous(target)
  const counts = {}
  const rows = files.map((f) => {
    const k = kind(f)
    counts[k] = (counts[k] || 0) + 1
    const kb = Math.max(1, Math.round(statSync(join(src, repo, f)).size / 1024))
    const prev = marks.get(f) || { read: '', notes: '' }
    return `| \`${f}\` | ${k} | ${kb} | ${prev.read} | ${prev.notes} |`
  })
  const read = files.filter((f) => marks.get(f)?.read).length
  writeFileSync(
    target,
    [
      `# Inventario · ${repo}`,
      '',
      `Generado por \`scripts/inventario-katas.mjs\` desde \`katas-src/${repo}\`. Marca "Leído" al leer cada archivo (las imágenes y diagramas también se leen). Las notas son breves: qué tiene de valor o por qué no lo tiene.`,
      '',
      `${files.length} archivos · ${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(' · ')} · leídos ${read}`,
      '',
      '| Archivo | Tipo | KB | Leído | Notas |',
      '|---|---|---|---|---|',
      ...rows,
      '',
    ].join('\n'),
  )
  summary.push(`| ${repo} | ${files.length} | ${counts.ADR || 0} | ${counts.requisitos || 0} | ${counts.documento || 0} | ${(counts.imagen || 0) + (counts['diagrama fuente'] || 0)} | ${counts['pdf u office'] || 0} | ${counts['código'] || 0} | ${read} |`)
}

writeFileSync(
  join(out, 'README.md'),
  [
    '# Inventario de los repositorios ganadores',
    '',
    'Uno por repositorio, generado por `scripts/inventario-katas.mjs`. Es la lista de control de la investigación: nada se da por investigado hasta que todos sus archivos con contenido están leídos.',
    '',
    '| Repo | Archivos | ADR | Requisitos | Documentos | Imágenes y diagramas | PDF u office | Código | Leídos |',
    '|---|---|---|---|---|---|---|---|---|',
    ...summary,
    '',
  ].join('\n'),
)
console.log(`Inventario de ${repos.length} repositorios en cursos/_investigacion/inventario/`)
