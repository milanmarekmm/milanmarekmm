import { writeFileSync } from 'node:fs'
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,'Helvetica Neue',Arial,sans-serif"
const MONO = "ui-monospace,SFMono-Regular,'SF Mono','Cascadia Code','Roboto Mono',Menlo,Consolas,monospace"
const t = { bg:'#0A0D14', panel:'#0E131E', panelAlt:'#151C2B', border:'#243049',
  text:'#E9EFF8', muted:'#98A5B8', dim:'#6E7E96',
  a1:'#A78BFA', a2:'#22D3EE', a3:'#F472B6', ok:'#34D399' }

// 1584x396. Avatar covers the lower-left on desktop; mobile crops top/bottom.
// Everything that must survive both lives inside x 400..1520, y 110..305.
const W = 1584, H = 396
const NODES = [[1248,116],[1360,84],[1502,138],[1296,194],[1422,180],[1246,284],[1368,298],[1504,250]]
const EDGES = [[0,1],[1,2],[0,3],[1,4],[2,4],[3,4],[3,5],[4,6],[4,7],[5,6],[6,7],[2,7],[0,4]]

const edges = EDGES.map(([a,b],i)=>{const[x1,y1]=NODES[a],[x2,y2]=NODES[b]
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${t.a2}" stroke-width="1.2" opacity=".3"/>`}).join('')
const nodes = NODES.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${i%2?t.a1:t.a2}" opacity=".35"/><circle cx="${x}" cy="${y}" r="4" fill="${i%2?t.a1:t.a2}"/>`).join('')

const PROOF = [['kCalori — live on the App Store', t.a2], ['Next.js · TypeScript · Postgres', t.a1], ['Claude API in production', t.a3]]
let px = 402
const proof = PROOF.map(([label,c])=>{
  const pw = Math.round(label.length*7.35)+46
  const g = `<g transform="translate(${px},272)">
    <rect width="${pw}" height="36" rx="10" fill="${t.panelAlt}" stroke="${t.border}"/>
    <circle cx="19" cy="18" r="4.4" fill="${c}"/>
    <text x="33" y="23.5" font-family="${SANS}" font-size="14.5" fill="${t.text}">${label}</text></g>`
  px += pw + 12; return g }).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="1" fill="${t.border}" opacity=".6"/></pattern>
  <radialGradient id="o1"><stop offset="0" stop-color="${t.a1}" stop-opacity=".34"/><stop offset="1" stop-color="${t.a1}" stop-opacity="0"/></radialGradient>
  <radialGradient id="o2"><stop offset="0" stop-color="${t.a2}" stop-opacity=".30"/><stop offset="1" stop-color="${t.a2}" stop-opacity="0"/></radialGradient>
  <radialGradient id="o3"><stop offset="0" stop-color="${t.a3}" stop-opacity=".26"/><stop offset="1" stop-color="${t.a3}" stop-opacity="0"/></radialGradient>
  <linearGradient id="flow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
    <stop offset="0" stop-color="${t.a1}"/><stop offset=".5" stop-color="${t.a3}"/><stop offset="1" stop-color="${t.a2}"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<rect width="${W}" height="${H}" fill="url(#grid)"/>
<ellipse cx="180" cy="330" rx="470" ry="300" fill="url(#o1)"/>
<ellipse cx="1330" cy="80" rx="470" ry="300" fill="url(#o2)"/>
<ellipse cx="760" cy="400" rx="430" ry="230" fill="url(#o3)"/>
${edges}${nodes}
<text x="402" y="140" font-family="${MONO}" font-size="15" letter-spacing="4.4" font-weight="600"
      fill="${t.a2}">AI &amp; PRODUCT DEVELOPER · PRAGUE, CZECHIA</text>
<text x="400" y="204" font-family="${SANS}" font-size="46" font-weight="800" fill="${t.text}">Designs it. Builds it. Ships it.</text>
<text x="402" y="243" font-family="${SANS}" font-size="19" fill="${t.muted}">schema → API → UI → deploy → App Store listing — same person, one pass.</text>
${proof}
<rect x="0" y="${H-4}" width="${W}" height="4" fill="url(#flow)"/>
</svg>`
writeFileSync(new URL('linkedin-banner.svg', import.meta.url), svg)
console.log('svg written')
