// Comprueba los hallazgos de cursos/_investigacion/texto/<Repo>.md contra katas-src/<Repo>/ sin leer el sentido:
//  1. cada cita entre comillas (8 caracteres o más) debe aparecer literal en algún archivo de texto del repo;
//  2. cada archivo:línea citado debe existir y la línea debe estar dentro del archivo;
//  3. cada cifra del hallazgo debe aparecer en algún archivo del repo (coma o punto decimal).
// Con --quitar, las comillas que no son literales se quitan (la frase queda como paráfrasis).
// Escribe cursos/_investigacion/texto/<Repo>.verificacion.md con una línea por hallazgo: "- Hnn · OK|NO · motivo".
//   node scripts/comprobar-citas.mjs [--quitar]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const quitar = process.argv.includes('--quitar')
const repos = ['ArchColider','Archangels','BluzBrothers','Celus-Ceals','ConnectedAI','Five-Nines','MonArch','Pegasuz','Pragmatic','Profitero-Data-Alchemists','Team-7','ZAITects']
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').toLowerCase()
const TEXT = /\.(md|txt|adoc|yml|yaml|json|html|xml|toml)$/i

for (const repo of repos) {
  const src = join(root, 'katas-src', repo)
  const files = execFileSync('git', ['ls-files'], { cwd: src, encoding: 'utf8' }).split('\n').filter((f) => f && TEXT.test(f))
  const bodies = new Map(files.map((f) => [f, readFileSync(join(src, f), 'utf8')]))
  const corpus = norm([...bodies.values()].join('\n'))
  // cifras de al menos tres dígitos o con separador, sin estar pegadas a letras (ADR01, H01, Q4 no cuentan)
  const numbers = (text) => new Set([...text.matchAll(/(?<![\p{L}\d])\d+(?:[.,]\d+)*/gu)].map((m) => m[0]).filter((n) => n.replace(/\D/g, '').length >= 3 || /[.,]/.test(n)))

  const file = join(root, 'cursos/_investigacion/texto', `${repo}.md`)
  let md = readFileSync(file, 'utf8')
  const out = []
  const blocks = md.split(/^(?=#### H\d+ · )/m)
  const results = []
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    const m = b.match(/^#### (H\d+) · /)
    if (!m) continue
    const id = m[1]
    const problems = []
    let nb = b
    // 1. citas entre comillas: se emparejan en orden dentro de cada línea (1.ª con 2.ª, 3.ª con 4.ª)
    for (const line of b.split('\n')) {
      const pos = [...line.matchAll(/"/g)].map((m) => m.index)
      for (let k = 0; k + 1 < pos.length; k += 2) {
        const q = line.slice(pos[k] + 1, pos[k + 1])
        if (q.trim().length < 8) continue
        const parts = q.split(/\s*\.\.\.\s*/).map((p) => p.trim()).filter((p) => p.length >= 8)
        const ok = parts.length > 0 && parts.every((p) => corpus.includes(norm(p).replace(/^[,.;:]+|[,.;:]+$/g, '').trim()))
        if (!ok) {
          if (quitar) nb = nb.replace(`"${q}"`, q)
          else problems.push(`cita no literal: "${q.slice(0, 50)}"`)
        }
      }
    }
    // 2. archivo:línea (la ruta puede venir sin carpeta; se busca cualquier archivo que termine igual)
    const refs = [...b.matchAll(/`([^`\s]+?\.(?:md|txt|adoc|yml|yaml|json|html|xml|toml))(?::(\d+)(?:-(\d+))?)?`/g)]
    for (const [, f, a, c] of refs) {
      const cands = files.filter((x) => x === f || x.endsWith('/' + f) || x.split('/').pop() === f.split('/').pop())
      if (!cands.length) { problems.push(`archivo no existe: ${f}`); continue }
      if (a && !cands.some((x) => +a <= bodies.get(x).split('\n').length && (!c || +c <= bodies.get(x).split('\n').length))) {
        problems.push(`línea fuera de rango: ${f}:${a}`)
      }
    }
    // 3. cifras
    const lines = b.split('\n').filter((l) => !/^- (Verificado|Fuente|Depende)/.test(l)).map((l) => l.replace(/`[^`]*`/g, ' ').replace(/\(\s*\)/g, ' '))
    const nums = [...numbers(lines.join(' ').replace(/\([^()]*\.(?:md|txt|json|yml|yaml|png|jpg|svg|drawio|html|xml|toml|pdf|xlsx|py|gif)[^()]*\)/g, ' ').replace(/[^\s()]*\.(?:md|txt|json|yml|yaml|png|jpg|svg|drawio|html|xml|toml|pdf|xlsx|py|gif)\b[\d:,\s\-–]*/g, ' ').replace(/:\d+(?:-\d+)?/g, ' ').replace(/línea \d+/g, ' '))]
    const swap = (n) => n.replace(/[.,]/g, (c) => (c === '.' ? ',' : '.'))
    const apos = (n) => n.replace(/[.,]/g, "'")
    const missing = nums.filter((n) => ![n, n.replace(/\./g, ','), n.replace(/,/g, '.'), swap(n), n.replace(/[.,]/g, ''), apos(n)].some((v) => corpus.includes(v)))
    if (missing.length) problems.push(`cifras no encontradas: ${missing.slice(0, 6).join(', ')}`)
    results.push({ id, problems })
    md = md.replace(b, nb)
  }
  if (quitar) writeFileSync(file, md, 'utf8')
  const ver = [
    `# Comprobación mecánica · ${repo}`,
    '',
    'Revisa citas literales, archivo:línea existentes y cifras presentes en el repositorio. No revisa el sentido de cada afirmación: eso lo hace una lectura de persona.',
    '',
    ...results.map((r) => (r.problems.length ? `- ${r.id} · NO · ${r.problems.join('; ')}` : `- ${r.id} · OK · citas, archivos, líneas y cifras comprobados`)),
    '',
  ]
  writeFileSync(join(root, 'cursos/_investigacion/texto', `${repo}.verificacion.md`), ver.join('\n'), 'utf8')
  const ok = results.filter((r) => !r.problems.length).length
  console.log(`${repo}: ${ok} OK, ${results.length - ok} NO`)
}
