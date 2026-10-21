// Sustituye en los hallazgos las rutas abreviadas (`carpeta/nombre-...md`) por el archivo real del repositorio,
// cuando hay una sola coincidencia. Las que quedan ambiguas se listan y no se tocan.
//   node scripts/resolver-rutas.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const repos = ['ArchColider','Archangels','BluzBrothers','Celus-Ceals','ConnectedAI','Five-Nines','MonArch','Pegasuz','Pragmatic','Profitero-Data-Alchemists','Team-7','ZAITects']
for (const repo of repos) {
  const src = join(root, 'katas-src', repo)
  const files = execFileSync('git', ['ls-files'], { cwd: src, encoding: 'utf8' }).split('\n').filter(Boolean)
  const file = join(root, 'cursos/_investigacion/texto', `${repo}.md`)
  let t = readFileSync(file, 'utf8')
  let changed = 0
  const unresolved = []
  t = t.replace(/`([^`\s]*(?:\.\.\.|\*)[^`\s]*)((?::\d+(?:-\d+)?)?)`/g, (m, ref, line) => {
    const dir = dirname(ref) === '.' ? '' : dirname(ref)
    const stem = basename(ref).split(/\.\.\.|\*/)[0]
    const prefix = dir ? `${dir}/${stem}` : stem
    const cands = files.filter((f) => (dir ? f.startsWith(prefix) : basename(f).startsWith(stem)) && !f.endsWith('/'))
    if (ref.includes('*') || cands.length !== 1) { unresolved.push(`${ref} (${cands.length})`); return m }
    changed++
    return `\`${cands[0]}${line}\``
  })
  writeFileSync(file, t, 'utf8')
  console.log(`${repo}: resueltas ${changed}${unresolved.length ? ` · sin resolver: ${[...new Set(unresolved)].join(', ')}` : ''}`)
}
