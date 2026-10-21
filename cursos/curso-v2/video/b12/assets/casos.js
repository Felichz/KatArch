// El mundo de cada caso (GUIA-VISUAL.md, "El nivel de todos los bloques", punto 4): una ilustración simple, con volumen suave,
// del mismo estilo para todos. Aparece cuando el caso entra en un bloque (D.mundo) y después queda el sello.
(() => {
  const defs = `<defs>
    <linearGradient id="cs-panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3749"/><stop offset="1" stop-color="#19202b"/></linearGradient>
    <linearGradient id="cs-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f4257" stop-opacity=".9"/><stop offset="1" stop-color="#16202c" stop-opacity=".9"/></linearGradient>
    <linearGradient id="cs-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf3"/><stop offset="1" stop-color="#c9d1dc"/></linearGradient>
    <radialGradient id="cs-floor" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7a45" stop-opacity=".16"/><stop offset="1" stop-color="#ff7a45" stop-opacity="0"/></radialGradient>
  </defs><ellipse cx="400" cy="500" rx="330" ry="46" fill="url(#cs-floor)"/>`;
  const svg = (body) => `<svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg">${defs}${body}</svg>`;

  window.CASOS = {
    // un currículum con nombre y foto que sale como historia anónima
    clearview: { t: 'ClearView · currículums anónimos', svg: svg(`
      <g transform="translate(110 90) rotate(-5)">
        <rect width="250" height="330" rx="16" fill="url(#cs-paper)"/>
        <circle cx="62" cy="70" r="34" fill="#ff7a45"/><rect x="112" y="52" width="110" height="16" rx="8" fill="#5b6576"/><rect x="112" y="80" width="80" height="12" rx="6" fill="#8a94a4"/>
        ${[140, 172, 204, 236, 268].map((y, i) => `<rect x="34" y="${y}" width="${[180, 150, 170, 120, 160][i]}" height="12" rx="6" fill="#9aa4b3"/>`).join('')}
      </g>
      <path d="M392 260 h70" stroke="#ff7a45" stroke-width="10" stroke-linecap="round"/><path d="M450 236 l30 24 l-30 24" fill="none" stroke="#ff7a45" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <g transform="translate(510 110) rotate(3)">
        <rect width="200" height="290" rx="16" fill="url(#cs-panel)" stroke="#3a475b" stroke-width="3"/>
        <circle cx="52" cy="58" r="28" fill="none" stroke="#5b6576" stroke-width="4" stroke-dasharray="8 7"/><rect x="96" y="44" width="80" height="14" rx="7" fill="#3a475b"/>
        <text x="28" y="124" fill="#8a94a4" font-family="monospace" font-size="20" letter-spacing="3">HISTORIA</text>
        ${[150, 180, 210, 240].map((y, i) => `<rect x="28" y="${y}" width="${[140, 120, 132, 100][i]}" height="11" rx="5.5" fill="#56627a"/>`).join('')}
      </g>`) },
    // un scooter estacionado y un teléfono que le saca la foto al devolverlo
    mobilitycorp: { t: 'MobilityCorp · vehículos eléctricos de alquiler', svg: svg(`
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="200" cy="420" r="58" stroke="#45d39a" stroke-width="16"/><circle cx="470" cy="420" r="58" stroke="#45d39a" stroke-width="16"/>
        <path d="M200 420 L300 420 L420 420" stroke="#5b6576" stroke-width="18"/>
        <path d="M430 420 L380 170 L330 160" stroke="#8a94a4" stroke-width="16"/><path d="M380 170 L420 160" stroke="#8a94a4" stroke-width="16"/>
        <path d="M220 400 h170" stroke="#2c3749" stroke-width="30"/>
      </g>
      <g transform="translate(560 150) rotate(8)">
        <rect width="150" height="270" rx="26" fill="url(#cs-panel)" stroke="#3a475b" stroke-width="4"/><rect x="14" y="30" width="122" height="190" rx="10" fill="url(#cs-glass)"/>
        <rect x="34" y="70" width="82" height="60" rx="8" fill="none" stroke="#ff7a45" stroke-width="5"/><circle cx="75" cy="100" r="14" fill="#ff7a45"/>
      </g>
      <path d="M560 210 L470 300" stroke="#ff7a45" stroke-width="5" stroke-dasharray="10 10" stroke-linecap="round"/>
      <g fill="#ffd27a"><circle cx="520" cy="196" r="8"/><circle cx="548" cy="176" r="5"/><circle cx="500" cy="174" r="5"/></g>`) },
    // la pantalla de la estación de enfermería con las curvas de los signos vitales
    monitorme: { t: 'MonitorMe · signos vitales en la estación de enfermería', svg: svg(`
      <rect x="130" y="80" width="540" height="330" rx="24" fill="url(#cs-panel)" stroke="#3a475b" stroke-width="4"/>
      <rect x="156" y="106" width="488" height="278" rx="12" fill="#0d131b"/>
      <path d="M176 180 h80 l20 -40 l24 80 l20 -40 h70 l20 -40 l24 80 l20 -40 h170" fill="none" stroke="#45d39a" stroke-width="6" stroke-linejoin="round"/>
      <path d="M176 260 c40 -30 60 30 100 0 s60 30 100 0 s60 30 100 0 s60 30 120 0" fill="none" stroke="#5b9cff" stroke-width="6"/>
      <path d="M176 330 h120 l20 -30 l20 30 h80 l20 -30 l20 30 h170" fill="none" stroke="#ff7a45" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="610" cy="140" r="12" fill="#ff7a45"/>
      <rect x="370" y="410" width="60" height="60" fill="#2c3749"/><rect x="290" y="466" width="220" height="20" rx="10" fill="#2c3749"/>`) },
    // un refrigerador inteligente con puerta de vidrio y comidas preparadas
    farmacy: { t: 'Farmacy Food · comidas en refrigeradores inteligentes', svg: svg(`
      <rect x="250" y="40" width="300" height="440" rx="22" fill="url(#cs-panel)" stroke="#3a475b" stroke-width="4"/>
      <rect x="272" y="64" width="256" height="340" rx="12" fill="url(#cs-glass)" stroke="#4a5b72" stroke-width="3"/>
      ${[110, 210, 310].map((y) => `<rect x="284" y="${y + 52}" width="232" height="6" rx="3" fill="#4a5b72"/>` + [0, 1, 2].map((i) => `<g transform="translate(${292 + i * 76} ${y})"><rect width="64" height="48" rx="8" fill="${['#45d39a', '#ff7a45', '#5b9cff'][(i + y / 100) % 3 | 0]}" opacity=".85"/><rect x="8" y="10" width="48" height="8" rx="4" fill="#0d131b" opacity=".35"/></g>`).join('')).join('')}
      <rect x="300" y="420" width="120" height="40" rx="8" fill="#0d131b"/><rect x="314" y="434" width="60" height="12" rx="6" fill="#45d39a"/>
      <rect x="440" y="424" width="70" height="32" rx="8" fill="#2c3749" stroke="#ff7a45" stroke-width="3"/>`) },
    // el soporte técnico: una pila de tickets que se le cae a un sistema hecho de una sola pieza
    sysops: { t: 'Sysops Squad · el soporte técnico y sus tickets', svg: svg(`
      <rect x="120" y="150" width="300" height="300" rx="20" fill="url(#cs-panel)" stroke="#3a475b" stroke-width="4"/>
      <text x="270" y="310" text-anchor="middle" fill="#8a94a4" font-family="monospace" font-size="26" letter-spacing="4">MONOLITO</text>
      ${[0, 1, 2, 3].map((i) => `<g transform="translate(${470 + i * 6} ${330 - i * 46}) rotate(${[-4, 3, -2, 5][i]})"><rect width="210" height="62" rx="10" fill="url(#cs-paper)"/><rect x="18" y="16" width="110" height="12" rx="6" fill="#5b6576"/><rect x="18" y="36" width="70" height="10" rx="5" fill="#8a94a4"/><circle cx="182" cy="31" r="10" fill="#ff7a45"/></g>`).join('')}
      <g transform="translate(560 410) rotate(24)"><rect width="210" height="62" rx="10" fill="url(#cs-paper)" opacity=".8"/><rect x="18" y="16" width="110" height="12" rx="6" fill="#5b6576"/></g>
      <path d="M200 120 a70 70 0 0 1 140 0" fill="none" stroke="#5b9cff" stroke-width="12" stroke-linecap="round"/><rect x="182" y="112" width="34" height="56" rx="12" fill="#5b9cff"/><rect x="324" y="112" width="34" height="56" rx="12" fill="#5b9cff"/>`) },
  };
})();
