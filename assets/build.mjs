// Generates every SVG asset in this profile, in a dark and a light variant.
// Run:  node assets/build.mjs
import { writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = dirname(fileURLToPath(import.meta.url))
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,'Helvetica Neue',Arial,sans-serif"
const MONO = "ui-monospace,SFMono-Regular,'SF Mono','Cascadia Code','Roboto Mono',Menlo,Consolas,monospace"

const THEMES = {
  dark: {
    bg: '#0A0D14', panel: '#0E131E', panelAlt: '#151C2B', border: '#1E2739',
    text: '#E9EFF8', muted: '#98A5B8', dim: '#6E7E96',
    a1: '#A78BFA', a2: '#22D3EE', a3: '#F472B6', ok: '#34D399', warn: '#FBBF24',
    gridOp: '.55', orbOp: '.34', shine: '#FFFFFF', shineOp: '.055', netOp: '.30', ringOp: '.5',
  },
  light: {
    bg: '#FFFFFF', panel: '#FBFCFE', panelAlt: '#F1F4F9', border: '#DCE3ED',
    text: '#0D1626', muted: '#4E5B73', dim: '#64728C',
    a1: '#6D28D9', a2: '#0E7490', a3: '#BE185D', ok: '#047857', warn: '#B45309',
    gridOp: '.75', orbOp: '.16', shine: '#0D1626', shineOp: '.03', netOp: '.45', ringOp: '.6',
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const w = (name, svg) => { writeFileSync(`${OUT}/${name}`, svg.trim() + '\n'); return name }

/* shared <defs> fragments ------------------------------------------------ */
const dotGrid = (t, id = 'grid') => `
  <pattern id="${id}" width="24" height="24" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="1" fill="${t.border}" opacity="${t.gridOp}"/>
  </pattern>`

const orb = (id, color, op) => `
  <radialGradient id="${id}">
    <stop offset="0" stop-color="${color}" stop-opacity="${op}"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0"/>
  </radialGradient>`

const flowGrad = (t, id, x2 = 460) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${x2}" y2="0" spreadMethod="repeat">
    <stop offset="0"    stop-color="${t.a1}"/>
    <stop offset="0.34" stop-color="${t.a3}"/>
    <stop offset="0.67" stop-color="${t.a2}"/>
    <stop offset="1"    stop-color="${t.a1}"/>
    <animateTransform attributeName="gradientTransform" type="translate"
      values="0 0; ${x2} 0" dur="9s" repeatCount="indefinite"/>
  </linearGradient>`

const surface = (t, x, y, ww, hh, r = 16) => `
  <rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${r}" fill="${t.panel}"/>
  <rect x="${x}" y="${y}" width="${ww}" height="${hh}" rx="${r}" fill="url(#grid)"/>
  <rect x="${x + .5}" y="${y + .5}" width="${ww - 1}" height="${hh - 1}" rx="${r}" fill="none" stroke="${t.border}"/>`

/* ── HERO ─────────────────────────────────────────────────────────────── */
const NODES = [
  [664, 74], [762, 50], [848, 100], [700, 136],
  [796, 128], [658, 194], [752, 210], [844, 180],
]
const EDGES = [[0,1],[1,2],[0,3],[1,4],[2,4],[3,4],[3,5],[4,6],[4,7],[5,6],[6,7],[2,7],[0,4]]

function hero(t) {
  const edges = EDGES.map(([a, b], i) => {
    const [x1, y1] = NODES[a], [x2, y2] = NODES[b]
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${t.a2}" stroke-width="1.1" opacity="${t.netOp}">
      <animate attributeName="opacity" values="${t.netOp};${(+t.netOp*1.7).toFixed(2)};${t.netOp}" dur="${4 + (i % 5) * 0.7}s"
        begin="${(i * 0.31).toFixed(2)}s" repeatCount="indefinite"/></line>`
  }).join('\n    ')

  const nodes = NODES.map(([x, y], i) => `<g>
      <circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${i % 2 ? t.a1 : t.a2}" stroke-width="1" opacity="${t.ringOp}">
        <animate attributeName="r" values="6;13;6" dur="${3.4 + i * 0.28}s" begin="${(i * 0.4).toFixed(2)}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="${t.ringOp};0;${t.ringOp}" dur="${3.4 + i * 0.28}s" begin="${(i * 0.4).toFixed(2)}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${x}" cy="${y}" r="3.4" fill="${i % 2 ? t.a1 : t.a2}"/>
    </g>`).join('\n    ')

  const motion = [[0,4,7],[1,4,6],[3,4,2]].map(([a, b, c], i) => {
    const p = `M ${NODES[a][0]} ${NODES[a][1]} L ${NODES[b][0]} ${NODES[b][1]} L ${NODES[c][0]} ${NODES[c][1]}`
    return `<circle r="2.6" fill="${t.a3}" opacity="0">
      <animateMotion path="${p}" dur="${5 + i * 1.6}s" begin="${(i * 1.3).toFixed(1)}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0" dur="${5 + i * 1.6}s" begin="${(i * 1.3).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`
  }).join('\n    ')

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="250" viewBox="0 0 900 250" role="img"
     aria-label="Milan Marek — AI and Product Developer, Prague, Czechia">
  <title>Milan Marek — AI &amp; Product Developer · Prague, Czechia</title>
  <defs>
    ${dotGrid(t)}
    ${orb('o1', t.a1, t.orbOp)}${orb('o2', t.a2, t.orbOp)}${orb('o3', t.a3, t.orbOp)}
    ${flowGrad(t, 'flow')}
    ${flowGrad(t, 'rule', 900)}
    <clipPath id="card"><rect x="1" y="1" width="898" height="248" rx="18"/></clipPath>
  </defs>

  <rect x=".5" y=".5" width="899" height="249" rx="18" fill="${t.bg}"/>
  <g clip-path="url(#card)">
    <rect width="900" height="250" fill="url(#grid)"/>
    <ellipse cx="120" cy="40" rx="300" ry="190" fill="url(#o1)">
      <animate attributeName="cx" values="120;250;120" dur="17s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="40;90;40"   dur="13s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="760" cy="210" rx="280" ry="180" fill="url(#o2)">
      <animate attributeName="cx" values="760;640;760" dur="19s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="210;150;210" dur="15s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="470" cy="250" rx="240" ry="130" fill="url(#o3)">
      <animate attributeName="cy" values="250;196;250" dur="21s" repeatCount="indefinite"/>
    </ellipse>

    <!-- neural constellation -->
    ${edges}
    ${nodes}
    ${motion}

    <!-- copy -->
    <text x="52" y="72" font-family="${MONO}" font-size="11.5" letter-spacing="3.1"
          fill="${t.a2}" font-weight="600">AI &amp; PRODUCT DEVELOPER</text>

    <text x="50" y="132" font-family="${SANS}" font-size="50" font-weight="800"
          fill="url(#flow)" textLength="400" lengthAdjust="spacing">MILAN MAREK</text>

    <text x="52" y="166" font-family="${SANS}" font-size="14.5" fill="${t.muted}">
      I build small products end-to-end — schema, API, UI, deploy, store listing.</text>

    <g transform="translate(52,190)">
      <rect width="176" height="30" rx="15" fill="${t.panelAlt}" stroke="${t.border}"/>
      <circle cx="17" cy="15" r="4" fill="${t.ok}">
        <animate attributeName="opacity" values="1;.25;1" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <text x="30" y="19.5" font-family="${MONO}" font-size="11" fill="${t.text}">open to work</text>
    </g>
    <g transform="translate(238,190)">
      <rect width="150" height="30" rx="15" fill="${t.panelAlt}" stroke="${t.border}"/>
      <text x="16" y="19.5" font-family="${MONO}" font-size="11" fill="${t.muted}">Prague, Czechia</text>
    </g>

    <rect x="0" y="247" width="900" height="3" fill="url(#rule)"/>
  </g>
</svg>`
}

/* ── TERMINAL (animated `whoami`) ─────────────────────────────────────── */
// Reveal uses CSS `clip-path: inset()`, not SMIL on clipPath geometry: browsers do
// not repaint SMIL-animated clip geometry inside an <img>, which is exactly how
// GitHub serves these files. Resting state is fully readable, so the text survives
// anywhere the animation does not run.
const CYCLE = 13
const HOLD = 0.965

function terminal(t) {
  const rows = [
    [0.35, 1.35, (y) => `<text x="34" y="${y}" font-family="${MONO}" font-size="13.5">
      <tspan fill="${t.a2}" font-weight="700">$</tspan><tspan fill="${t.text}" dx="9">milan --whoami</tspan></text>`],
    [1.85, 2.75, (y) => kv(t, y, 'role ', 'AI &amp; Product Developer', ' · Prague, Czechia')],
    [2.90, 3.85, (y) => kv(t, y, 'focus', 'LLMs as production components', ', not demos')],
    [4.00, 5.10, (y) => kv(t, y, 'ships', 'kCalori on the App Store', ' · Next.js platforms for clients')],
    [5.25, 6.20, (y) => kv(t, y, 'stack', 'TypeScript · Swift · Postgres', ' · Claude API')],
    [6.45, 7.20, (y) => kv(t, y, 'edge ', 'designs it, builds it, ships it', ' — same person')],
  ]

  const yFor = (i) => 84 + i * 30 + (i === 0 ? 0 : 14)
  const pct = (v) => ((v / CYCLE) * 100).toFixed(2)

  const css = rows.map(([s, e], i) => `
    .l${i} { animation: k${i} ${CYCLE}s linear infinite; }
    @keyframes k${i} {
      0%, ${pct(s)}%      { clip-path: inset(0 100% 0 0); }
      ${pct(e)}%, ${(HOLD * 100).toFixed(1)}% { clip-path: inset(0 0 0 0); }
      100%                { clip-path: inset(0 100% 0 0); }
    }`).join('')

  const body = rows.map(([, , render], i) =>
    `  <g class="ln l${i}">${render(yFor(i))}</g>`).join('\n')

  const lastY = yFor(rows.length)
  const h = lastY + 34
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${h}" viewBox="0 0 900 ${h}"
     role="img" aria-label="Terminal reading: milan --whoami. Role: AI and Product Developer, Prague, Czechia. Focus: LLMs as production components, not demos. Ships kCalori on the App Store and Next.js platforms for clients. Stack: TypeScript, Swift, Postgres, Claude API.">
  <title>$ milan --whoami</title>
  <defs>${dotGrid(t)}</defs>
  <style>
    .ln { clip-path: inset(0 0 0 0); }
    .caret { animation: blink 1.1s steps(1, end) infinite; }
    @keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
    @media (prefers-reduced-motion: reduce) {
      .ln, .caret { animation: none; clip-path: none; opacity: 1; }
    }
  </style>

  ${surface(t, 0.5, 0.5, 899, h - 1, 14)}

  <line x1="1" y1="43" x2="899" y2="43" stroke="${t.border}"/>
  <circle cx="26" cy="22" r="5.5" fill="#FF5F57" opacity=".9"/>
  <circle cx="46" cy="22" r="5.5" fill="#FEBC2E" opacity=".9"/>
  <circle cx="66" cy="22" r="5.5" fill="#28C840" opacity=".9"/>
  <text x="450" y="26.5" text-anchor="middle" font-family="${MONO}" font-size="11.5"
        fill="${t.dim}">milan@prague — ~/work</text>

${body}

  <text x="34" y="${lastY}" font-family="${MONO}" font-size="13.5"
        font-weight="700" fill="${t.a2}">$</text>
  <rect class="caret" x="50" y="${lastY - 12}" width="8" height="15" fill="${t.a2}"/>
</svg>`
}

function kv(t, y, key, head, tail) {
  return `<text x="34" y="${y}" font-family="${MONO}" font-size="13.5">
      <tspan fill="${t.dim}">${key}</tspan>
      <tspan fill="${t.text}" dx="20" font-weight="600">${head}</tspan><tspan fill="${t.muted}">${tail}</tspan></text>`
}

/* ── STACK ────────────────────────────────────────────────────────────── */
const GROUPS = [
  ['CORE',  'a1', ['TypeScript', 'JavaScript', 'Swift', 'PHP', 'SQL', 'Bash']],
  ['BUILD', 'a2', ['Next.js', 'React', 'Tailwind', 'SwiftUI', 'Node.js', 'WordPress']],
  ['DATA',  'a3', ['PostgreSQL', 'Drizzle ORM', 'Cloudflare D1', 'SQLite']],
  ['AI',    'ok', ['Claude API', 'MCP servers', 'Agent SDK', 'Prompt eval']],
  ['SHIP',  'warn', ['Vercel', 'Cloudflare', 'Docker', 'Linux VPS', 'PostHog']],
]

function stack(t) {
  const rowH = 44, top = 52
  const rows = GROUPS.map(([label, key, items], r) => {
    const y = top + r * rowH
    let x = 152
    const pills = items.map((it, i) => {
      const pw = Math.round(it.length * 6.85) + 40
      const g = `<g transform="translate(${x},${y})">
        <rect width="${pw}" height="30" rx="8" fill="${t.panelAlt}" stroke="${t.border}"/>
        <circle cx="15" cy="15" r="3.6" fill="${t[key]}">
          <animate attributeName="r" values="3.6;5.2;3.6" dur="${(3 + (i % 4) * 0.6).toFixed(1)}s"
            begin="${(0.18 * (r * 6 + i)).toFixed(2)}s" repeatCount="indefinite"/></circle>
        <text x="27" y="19.6" font-family="${SANS}" font-size="12.5" fill="${t.text}">${esc(it)}</text>
      </g>`
      x += pw + 9
      return g
    }).join('\n    ')
    return `
    <text x="34" y="${y + 20}" font-family="${MONO}" font-size="10.5" letter-spacing="2"
          font-weight="700" fill="${t[key]}">${label}</text>
    <line x1="34" y1="${y + 30}" x2="128" y2="${y + 30}" stroke="${t.border}"/>
    ${pills}`
  }).join('\n')

  const h = top + GROUPS.length * rowH + 8
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${h}" viewBox="0 0 900 ${h}"
     role="img" aria-label="Stack: TypeScript, JavaScript, Swift, PHP, SQL, Bash, Next.js, React, Tailwind, SwiftUI, Node.js, WordPress, PostgreSQL, Drizzle ORM, Cloudflare D1, SQLite, Claude API, MCP servers, Agent SDK, prompt eval, Vercel, Cloudflare, Docker, Linux VPS, PostHog">
  <title>Stack</title>
  <defs>
    ${dotGrid(t)}
    <linearGradient id="sheen" gradientUnits="userSpaceOnUse" x1="-260" y1="0" x2="0" y2="0">
      <stop offset="0"  stop-color="${t.shine}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${t.shine}" stop-opacity="${t.shineOp}"/>
      <stop offset="1"  stop-color="${t.shine}" stop-opacity="0"/>
      <animateTransform attributeName="gradientTransform" type="translate"
        values="0 0; 1200 0" dur="7s" repeatCount="indefinite"/>
    </linearGradient>
    <clipPath id="sc"><rect x="1" y="1" width="898" height="${h - 2}" rx="14"/></clipPath>
  </defs>
  ${surface(t, 0.5, 0.5, 899, h - 1, 14)}
  <text x="34" y="34" font-family="${MONO}" font-size="11" letter-spacing="2.6"
        fill="${t.dim}" font-weight="700">TOOLBOX</text>
  ${rows}
  <g clip-path="url(#sc)"><rect width="900" height="${h}" fill="url(#sheen)"/></g>
</svg>`
}

/* ── PROJECT CARDS ────────────────────────────────────────────────────── */
const CARD_W = 440, CARD_H = 226

function card(t, { eyebrow, title, lines, tags, accent, link }) {
  const body = lines.map((l, i) =>
    `<text x="26" y="${107 + i * 20}" font-family="${SANS}" font-size="12.6" fill="${t.muted}">${l}</text>`
  ).join('\n  ')

  let x = 26
  const chips = tags.map((tag) => {
    const cw = Math.round(tag.length * 6.0) + 20
    const g = `<g transform="translate(${x},${CARD_H - 42})">
      <rect width="${cw}" height="22" rx="6" fill="${t.panelAlt}" stroke="${t.border}"/>
      <text x="${cw / 2}" y="15.2" text-anchor="middle" font-family="${MONO}" font-size="10.2" fill="${t.dim}">${esc(tag)}</text>
    </g>`
    x += cw + 7
    return g
  }).join('\n  ')

  const arrow = link ? `
  <g transform="translate(${CARD_W - 44},26)" opacity=".85">
    <circle cx="12" cy="12" r="13" fill="${t.panelAlt}" stroke="${t.border}"/>
    <path d="M8.5 15.5 L15.5 8.5 M9.8 8.5 L15.5 8.5 L15.5 14.2" stroke="${t[accent]}"
          stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <animate attributeName="opacity" values=".55;1;.55" dur="3s" repeatCount="indefinite"/>
  </g>` : ''

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}"
     role="img" aria-label="${esc(title)} — ${esc(lines.join(' '))}">
  <title>${esc(title)}</title>
  <defs>
    ${dotGrid(t)}
    ${orb('cg', t[accent], t.orbOp)}
    <linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${t[accent]}"/>
      <stop offset="1" stop-color="${t[accent]}" stop-opacity=".15"/>
    </linearGradient>
    <clipPath id="cc"><rect x="1" y="1" width="${CARD_W - 2}" height="${CARD_H - 2}" rx="14"/></clipPath>
  </defs>

  <rect x=".5" y=".5" width="${CARD_W - 1}" height="${CARD_H - 1}" rx="14" fill="${t.panel}"/>
  <g clip-path="url(#cc)">
    <rect width="${CARD_W}" height="${CARD_H}" fill="url(#grid)"/>
    <ellipse cx="${CARD_W}" cy="0" rx="230" ry="150" fill="url(#cg)"/>
    <rect x="0" y="0" width="4" height="${CARD_H}" fill="url(#spine)"/>
  </g>
  <rect x=".5" y=".5" width="${CARD_W - 1}" height="${CARD_H - 1}" rx="14" fill="none" stroke="${t.border}"/>

  <text x="26" y="42" font-family="${MONO}" font-size="10.2" letter-spacing="2.2"
        font-weight="700" fill="${t[accent]}">${esc(eyebrow)}</text>
  <text x="25" y="76" font-family="${SANS}" font-size="21" font-weight="750" fill="${t.text}">${esc(title)}</text>
  ${body}
  ${chips}
  ${arrow}
</svg>`
}

const CARDS = {
  kcalori: {
    eyebrow: 'MY OWN PRODUCT · LIVE', accent: 'a2', link: true,
    title: 'kCalori',
    lines: [
      'iOS calorie tracker on the App Store. Local-first,',
      'no account needed. A SwiftUI shell around a JS core in',
      'WKWebView, HealthKit sync, AI coaching via a Claude proxy.',
      'A focused redesign moved activation from 0 → ~60%.',
    ],
    tags: ['SwiftUI', 'WKWebView', 'HealthKit', 'Claude'],
  },
  platforms: {
    eyebrow: 'CLIENT WORK', accent: 'a1', link: false,
    title: 'Marketing platforms',
    lines: [
      'Next.js App Router rebuilds in TypeScript and Tailwind,',
      'Drizzle on Postgres, server actions hardened with honeypots',
      'and rate limits, analytics gated behind real consent.',
      'Copy lives in data files, so non-devs can edit safely.',
    ],
    tags: ['Next.js', 'Drizzle', 'Postgres', 'PostHog'],
  },
  configurator: {
    eyebrow: 'CLIENT WORK', accent: 'a3', link: false,
    title: 'Product configurator',
    lines: [
      'B2C configurator that turns a messy price list into a',
      'four-step flow and drops a qualified lead in the CRM.',
      'Ships as an iframe widget onto partner sites, with a',
      'conditional option matrix behind it.',
    ],
    tags: ['React', 'Vercel', 'REST', 'i18n'],
  },
  infra: {
    eyebrow: 'OPS', accent: 'ok', link: false,
    title: 'Hosting & runbooks',
    lines: [
      'A shared VPS carrying ~70 client sites: deploys, PHP',
      'tuning, backups, TLS, DNS untangling and the 2am',
      'incidents. Every fix is written down as a runbook so it',
      'only has to be solved once.',
    ],
    tags: ['Linux', 'Docker', 'WP-CLI', 'Nginx'],
  },
}

/* ── LINK CHIPS ───────────────────────────────────────────────────────── */
const ICONS = {
  linkedin: (c) => `<rect x="0" y="0" width="20" height="20" rx="4.5" fill="${c}"/>
    <text x="10" y="14.6" text-anchor="middle" font-family="${SANS}" font-size="11.5"
          font-weight="800" fill="#FFFFFF">in</text>`,
  globe: (c) => `<g fill="none" stroke="${c}" stroke-width="1.7">
    <circle cx="10" cy="10" r="8.6"/><ellipse cx="10" cy="10" rx="3.6" ry="8.6"/>
    <path d="M1.6 10h16.8M3.1 5.2h13.8M3.1 14.8h13.8"/></g>`,
  app: (c) => `<g fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <rect x="1.4" y="1.4" width="17.2" height="17.2" rx="5"/>
    <path d="M10 5.4v7.2M6.9 9.6 10 12.7l3.1-3.1"/></g>`,
}

function chip(t, { icon, label, sub, accent }) {
  const cw = Math.max(178, Math.round(label.length * 7.4) + 74)
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="52" viewBox="0 0 ${cw} 52"
     role="img" aria-label="${esc(label)}">
  <title>${esc(label)}</title>
  <defs>${orb('ch', t[accent], t.orbOp)}
    <clipPath id="cl"><rect x="1" y="1" width="${cw - 2}" height="50" rx="12"/></clipPath></defs>
  <rect x=".5" y=".5" width="${cw - 1}" height="51" rx="12" fill="${t.panel}"/>
  <g clip-path="url(#cl)"><ellipse cx="${cw}" cy="52" rx="120" ry="70" fill="url(#ch)"/></g>
  <rect x=".5" y=".5" width="${cw - 1}" height="51" rx="12" fill="none" stroke="${t.border}"/>
  <g transform="translate(18,16)">${ICONS[icon](t[accent])}</g>
  <text x="50" y="22" font-family="${MONO}" font-size="8.8" letter-spacing="1.5" fill="${t.dim}">${esc(sub)}</text>
  <text x="50" y="37" font-family="${SANS}" font-size="13.4" font-weight="650" fill="${t.text}">${esc(label)}</text>
</svg>`
}

const CHIPS = {
  linkedin: { icon: 'linkedin', label: 'Milan Marek',  sub: 'LINKEDIN',   accent: 'a2' },
  site:     { icon: 'globe',    label: 'kcalori.cz',   sub: 'WEBSITE',    accent: 'a1' },
  appstore: { icon: 'app',      label: 'Get kCalori',  sub: 'APP STORE',  accent: 'a3' },
}

/* ── EMIT ─────────────────────────────────────────────────────────────── */
const written = []
for (const [name, t] of Object.entries(THEMES)) {
  written.push(w(`hero-${name}.svg`, hero(t)))
  written.push(w(`whoami-${name}.svg`, terminal(t)))
  written.push(w(`stack-${name}.svg`, stack(t)))
  for (const [k, spec] of Object.entries(CARDS)) written.push(w(`card-${k}-${name}.svg`, card(t, spec)))
  for (const [k, spec] of Object.entries(CHIPS)) written.push(w(`chip-${k}-${name}.svg`, chip(t, spec)))
}
console.log(`✓ ${written.length} assets written to assets/`)
