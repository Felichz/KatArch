// Clona (o actualiza) en katas-src/ los repositorios de los doce ganadores (primer lugar) de las
// Architecture Katas, más el perfil de TheKataLog (jurado, presentadores). La lista sale de WINNERS en
// src/video/meta.ts, así que un ganador nuevo se agrega ahí y nada más.
//   node scripts/clone-katas.mjs            clona lo que falta y actualiza lo que ya está (fast-forward)
//   node scripts/clone-katas.mjs --shallow  clona sin historia (más rápido; los conteos por commit no se pueden hacer)
// katas-src/ está en .gitignore. Las rutas de fichas y dossiers (cursos/_corpus) son relativas a katas-src/<Repo>/.
import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'katas-src')
const shallow = process.argv.includes('--shallow')

const meta = readFileSync(join(root, 'src/video/meta.ts'), 'utf8')
const winners = [...meta.matchAll(/repo:\s*'(https:\/\/github\.com\/TheKataLog\/[\w.-]+)'/g)].map((m) => m[1])
if (winners.length === 0) {
  console.error('No encontré repositorios en WINNERS (src/video/meta.ts).')
  process.exit(1)
}
const repos = [...new Set(winners), 'https://github.com/TheKataLog/.github']

const git = (args, cwd) => spawnSync('git', args, { cwd, stdio: 'inherit' }).status === 0

mkdirSync(dest, { recursive: true })
const failed = []
for (const url of repos) {
  const name = url.split('/').pop()
  const dir = join(dest, name)
  if (existsSync(join(dir, '.git'))) {
    console.log(`\n· ${name}: actualizando`)
    if (!git(['pull', '--ff-only'], dir)) failed.push(name)
  } else {
    console.log(`\n· ${name}: clonando`)
    if (!git(['clone', ...(shallow ? ['--depth', '1'] : []), url, dir], root)) failed.push(name)
  }
}

console.log(`\n${repos.length - failed.length} de ${repos.length} repositorios listos en katas-src/`)
if (failed.length) {
  console.error(`Fallaron: ${failed.join(', ')}`)
  process.exit(1)
}
