// Completa en textos.en.json los rótulos de varias líneas (con <br>) cuyas partes ya están traducidas,
// uniendo esas traducciones. Así el rótulo entero queda en el diccionario y se puede afinar a mano.
//   node cursos/curso-v2/tools/textos-enteros.mjs cursos/curso-v2/video/bNN [más bloques…]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const here = new URL('./textos.mjs', import.meta.url);
for (const dir of process.argv.slice(2)) {
  const f = `${dir}/textos.en.json`;
  const tx = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  const comun = existsSync(`${dir}/tools/textos.comun.en.json`) ? JSON.parse(readFileSync(`${dir}/tools/textos.comun.en.json`, 'utf8')) : {};
  const faltan = JSON.parse(execFileSync('node', [here.pathname.replace(/^\/([A-Z]:)/, '$1'), dir, '--faltan'], { stdio: ['ignore', 'pipe', 'ignore'] }).toString());
  let n = 0;
  for (const k of Object.keys(faltan)) {
    if (!k.includes('<br>')) continue;
    const parts = k.split('<br>').map((p) => p.trim());
    const t = parts.map((p) => tx[p] ?? comun[p]);
    if (t.every((x) => x != null)) { tx[k] = t.join('<br>'); n++; }
  }
  writeFileSync(f, JSON.stringify(tx, null, 1) + '\n');
  console.log(`${dir}: ${n} rótulos enteros agregados`);
}
