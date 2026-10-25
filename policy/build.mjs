// Builds the branded policy documents (AR + EN) as HTML, prints each to an A4
// PDF with headless Chrome, and copies the PDFs to public/docs/ for the
// site's download button.  Run:  node policy/build.mjs
import { writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import en from '../src/i18n/en.js'
import ar from '../src/i18n/ar.js'
import { LATIN_RUN } from '../src/bidi.js'
import { PHONE, EMAIL, SITE, WA } from '../src/constants.js'

const DIR = dirname(fileURLToPath(import.meta.url))
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const WEB = SITE.replace('https://', '')

// ---------------------------------------------------------------- content
// Text comes from the site's locale files (legal.refund), so the web page and
// the PDFs can never drift apart. Only print layout settings live here.
const pad = (n) => String(n).padStart(2, '0')
const fromLocale = (r) => ({
  tag: r.tag, eyebrow: r.eyebrow, title: r.title, accent: r.accent, short: r.short, intro: r.intro,
  meta: [[r.meta.sections, pad(r.sections.length)], [r.meta.scope, r.meta.scopeValue]],
  glanceTitle: r.glanceTitle, glanceNote: r.glanceNote, tiles: r.tiles, sections: r.sections,
  contact: { title: r.contactTitle, sub: r.contactSub, labels: r.contactLabels },
  disclaimer: r.disclaimer,
})
const DOCS = {
  en: {
    dir: 'ltr',
    fonts: 'family=Sora:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700',
    split: 2, // sections on page 1
    ...fromLocale(en.legal.refund),
  },
  ar: {
    dir: 'rtl',
    fonts: 'family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Sora:wght@600;700;800',
    split: 2,
    ...fromLocale(ar.legal.refund),
  },
}

// ---------------------------------------------------------------- helpers
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// In Arabic, isolate Latin runs so bidi never reorders them (shared rule, src/bidi.js).
const txt = (s, rtl) => {
  const e = esc(s)
  return rtl ? e.replace(LATIN_RUN, (m) => `<bdi>${m}</bdi>`) : e
}

const RING = `<svg viewBox="0 0 194.78 193.16" aria-hidden="true"><g fill="currentColor" transform="translate(-502.61 -503.42)"><path d="M616,535V505.42s77.79,7.84,81.41,97.69c0,0,1.8,78.39-81.41,93.47V665.83s41.61-3.62,47-64.83C663,601,667.23,553.06,616,535Z"/><path d="M584,533V503.42s-77.79,7.84-81.41,97.69c0,0-1.8,78.39,81.41,93.47V663.82S542.41,660.2,537,599C537,599,532.77,551.06,584,533Z"/></g></svg>`
const ARC = `<svg class="arc" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true"><path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560"/></svg>`
const brand = (cls = '') => `<div class="brand ${cls}"><span class="ring">${RING}</span><span class="wm"><b>EMS</b> <i>ElRiyadh</i></span></div>`

function section(s, i, rtl) {
  const clauses = s.clauses.map((c) => {
    const head = c.label ? `<h3><span>${txt(c.label, rtl)}</span></h3>` : ''
    const body = c.items
      ? `<ul>${c.items.map((li) => `<li>${txt(li, rtl)}</li>`).join('')}</ul>`
      : `<p>${txt(c.text, rtl)}</p>`
    return `<div class="clause">${head}${body}</div>`
  }).join('')
  return `<section class="sec">
    <div class="sec-num"><span>${pad(i + 1)}</span></div>
    <div class="sec-body"><h2>${txt(s.title, rtl)}</h2>${clauses}</div>
  </section>`
}

function footer(d, n, total) {
  return `<footer class="pf">
    ${brand('mini')}
    <span class="pf-mid"><bdi>${WEB}</bdi> &nbsp;·&nbsp; <bdi>${PHONE}</bdi></span>
    <span class="pf-num"><b>${pad(n)}</b> / ${pad(total)}</span>
  </footer>`
}

function render(lang) {
  const d = DOCS[lang]
  const rtl = d.dir === 'rtl'
  const s1 = d.sections.slice(0, d.split)
  const s2 = d.sections.slice(d.split)

  const tiles = d.tiles.map(([v, l]) => `<div class="tile"><b>${txt(v, rtl)}</b><span>${txt(l, rtl)}</span></div>`).join('')
  const meta = d.meta.map(([k, v]) => `<div><span>${esc(k)}</span><b>${txt(v, rtl)}</b></div>`).join('')
  const c = d.contact
  const contact = `<div class="contact">
    <div class="contact-glow"></div>
    <div class="contact-h"><h2>${esc(c.title)}</h2><p>${esc(c.sub)}</p></div>
    <div class="contact-items">
      <a href="${WA}"><span>${esc(c.labels[0])}</span><b dir="ltr">${PHONE}</b></a>
      <a href="mailto:${EMAIL}"><span>${esc(c.labels[1])}</span><b dir="ltr">${EMAIL}</b></a>
      <a href="https://${WEB}"><span>${esc(c.labels[2])}</span><b dir="ltr">${WEB}</b></a>
    </div>
  </div>
  <p class="disclaimer">${txt(d.disclaimer, rtl)}</p>`

  return `<!doctype html>
<html lang="${lang}" dir="${d.dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(d.short)} — EMS ElRiyadh</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?${d.fonts}&display=block" rel="stylesheet" />
<style>${css(rtl)}</style>
</head>
<body>
  <div class="page p1">
    <header class="hero">
      <div class="hero-glow"></div>
      ${ARC}
      <div class="hero-top">${brand()}<span class="tag">${esc(d.tag)}</span></div>
      <div class="hero-body">
        <span class="eyebrow">${esc(d.eyebrow)}</span>
        <h1>${esc(d.title)} <span class="r">${esc(d.accent)}</span></h1>
        <p class="lede">${txt(d.intro, rtl)}</p>
      </div>
      <div class="meta">${meta}</div>
    </header>
    <div class="content">
      <div class="glance">
        <div class="glance-h"><span>${esc(d.glanceTitle)}</span><i></i></div>
        <div class="tiles">${tiles}</div>
        <p class="glance-note">${esc(d.glanceNote)}</p>
      </div>
      ${s1.map((s, i) => section(s, i, rtl)).join('')}
    </div>
    ${footer(d, 1, 2)}
  </div>

  <div class="page p2">
    <div class="run">${brand('mini')}<span>${esc(d.short)}</span></div>
    <div class="content">
      ${s2.map((s, i) => section(s, i + d.split, rtl)).join('')}
      ${contact}
    </div>
    ${footer(d, 2, 2)}
  </div>
</body>
</html>`
}

// ---------------------------------------------------------------- styles
function css(rtl) {
  const body = rtl ? '"IBM Plex Sans Arabic"' : '"Plus Jakarta Sans"'
  const display = rtl ? '"IBM Plex Sans Arabic"' : '"Sora"'
  return `
:root{
  --red:#ED3B1B; --red-br:#FF5A3A; --ink:#15100E; --ink-2:#231B18;
  --body:#3D3431; --muted:#8C817A; --line:#E6DDD5; --paper:#FBF8F4; --card:#FFFFFF;
  --f-body:${body},system-ui,sans-serif; --f-display:${display},system-ui,sans-serif; --f-latin:"Sora",system-ui,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--f-body);color:var(--body);background:#CFC8C1;-webkit-font-smoothing:antialiased}
bdi{unicode-bidi:isolate}
@page{size:A4;margin:0}

.page{
  width:210mm;height:297mm;margin:10mm auto;background:var(--paper);
  position:relative;overflow:hidden;box-shadow:0 18px 50px rgba(21,16,14,.25);
  display:flex;flex-direction:column;
}
@media print{
  body{background:none}
  .page{margin:0;box-shadow:none;break-after:page}
  .page:last-child{break-after:auto}
}

/* ---------- brand ---------- */
.brand{display:flex;align-items:center;gap:2.6mm;direction:ltr}
.ring{width:8mm;height:8mm;color:var(--red);display:block}
.ring svg{width:100%;height:100%;display:block}
.wm{font-family:var(--f-latin);font-size:13pt;letter-spacing:.2px;color:#fff;white-space:nowrap}
.wm b{font-weight:800} .wm i{font-style:normal;font-weight:600;color:var(--red-br)}
.brand.mini{gap:1.8mm}
.brand.mini .ring{width:4.6mm;height:4.6mm}
.brand.mini .wm{font-size:8.6pt;color:var(--ink)}
.brand.mini .wm i{color:var(--red)}

/* ---------- hero ---------- */
.hero{
  position:relative;overflow:hidden;color:#fff;
  background:linear-gradient(160deg,#1E1513 0%,var(--ink) 55%,#0E0A09 100%);
  padding:13mm 16mm 0;
}
.hero-glow{
  position:absolute;width:150mm;height:150mm;top:-70mm;${rtl ? 'left' : 'right'}:-55mm;border-radius:50%;
  background:radial-gradient(circle,rgba(237,59,27,.55) 0%,rgba(237,59,27,.18) 38%,transparent 68%);
}
.arc{
  position:absolute;top:24mm;${rtl ? 'left' : 'right'}:4mm;width:46mm;height:78mm;
  ${rtl ? 'transform:scaleX(-1);' : ''}
  fill:none;stroke:var(--red-br);stroke-width:5;stroke-linecap:round;
  filter:drop-shadow(0 0 2.2mm rgba(255,90,58,.95)) drop-shadow(0 0 6mm rgba(237,59,27,.6));
  opacity:.95;
}
.hero-top{position:relative;display:flex;align-items:center;justify-content:space-between}
.tag{
  font-family:var(--f-body);font-size:7.6pt;font-weight:600;letter-spacing:${rtl ? '0' : '2.4px'};
  ${rtl ? '' : 'text-transform:uppercase;'}color:rgba(255,255,255,.82);
  border:1px solid rgba(255,255,255,.28);border-radius:99px;padding:1.4mm 3.6mm;background:rgba(255,255,255,.04);
}
.hero-body{position:relative;padding:15mm 0 9mm;max-width:${rtl ? '140mm' : '138mm'}}
.eyebrow{
  display:inline-flex;align-items:center;gap:2.4mm;font-size:8.4pt;font-weight:700;color:var(--red-br);
  letter-spacing:${rtl ? '0' : '2.6px'};${rtl ? '' : 'text-transform:uppercase;'}
}
.eyebrow::before{content:"";width:7mm;height:2px;background:var(--red-br);border-radius:2px}
h1{
  font-family:var(--f-display);font-weight:${rtl ? 700 : 800};color:#fff;
  font-size:${rtl ? '29pt' : '30pt'};line-height:${rtl ? 1.3 : 1.06};letter-spacing:${rtl ? '0' : '-.6px'};margin:4mm 0 5mm;
}
h1 .r{color:var(--red-br)}
.lede{font-size:${rtl ? '10.6pt' : '10.2pt'};line-height:${rtl ? 1.85 : 1.65};color:rgba(255,255,255,.7)}
.meta{
  position:relative;display:grid;grid-template-columns:auto 1fr;
  border-top:1px solid rgba(255,255,255,.13);
}
.meta div{padding:4.4mm 0 5.4mm;padding-inline-end:12mm;display:flex;flex-direction:column;gap:1.2mm}
.meta div + div{padding-inline-start:6mm;border-inline-start:1px solid rgba(255,255,255,.13)}
.meta span{font-size:7.2pt;font-weight:600;color:rgba(255,255,255,.5);letter-spacing:${rtl ? '0' : '1.6px'};${rtl ? '' : 'text-transform:uppercase;'}}
.meta b{font-size:10pt;font-weight:700;color:#fff}

/* ---------- content ---------- */
.content{flex:1;padding:0 16mm 18mm}
.p1 .content{padding-top:8mm}
.p2 .content{padding-top:2mm}

.glance{margin-bottom:2mm}
.glance-h{display:flex;align-items:center;gap:3mm;margin-bottom:3.4mm}
.glance-h span{
  font-family:var(--f-display);font-size:9pt;font-weight:700;color:var(--ink);
  letter-spacing:${rtl ? '0' : '2px'};${rtl ? '' : 'text-transform:uppercase;'}white-space:nowrap
}
.glance-h i{flex:1;height:1px;background:var(--line)}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}
.tile{
  background:var(--card);border:1px solid var(--line);border-radius:3mm;padding:4mm 3.6mm 4.2mm;
  position:relative;overflow:hidden;
}
.tile::before{content:"";position:absolute;inset-inline-start:0;top:0;bottom:0;width:1.1mm;background:var(--red)}
.tile b{
  display:block;font-family:${rtl ? 'var(--f-display)' : 'var(--f-latin)'};font-weight:800;
  font-size:${rtl ? '13.5pt' : '15pt'};color:var(--red);line-height:1.15;margin-bottom:1.6mm
}
.tile span{display:block;font-size:${rtl ? '8.2pt' : '7.9pt'};line-height:${rtl ? 1.65 : 1.5};color:var(--body)}
.glance-note{margin-top:2.6mm;font-size:7.4pt;color:var(--muted)}

/* ---------- sections ---------- */
.sec{display:grid;grid-template-columns:19mm 1fr;gap:3mm;padding-top:5mm;margin-top:5mm;border-top:1px solid var(--line)}
.glance + .sec{border-top:0;margin-top:3mm}
.p2 .content > .sec:first-child{border-top:0;margin-top:0;padding-top:5mm}
.sec-num span{
  display:inline-block;font-family:var(--f-latin);font-weight:800;font-size:22pt;line-height:1;
  color:var(--red);letter-spacing:-.5px;padding-bottom:2mm;border-bottom:2px solid var(--red)
}
.sec-body h2{
  font-family:var(--f-display);font-weight:700;color:var(--ink);
  font-size:${rtl ? '13pt' : '13pt'};line-height:1.3;margin:${rtl ? '0 0 3mm' : '.6mm 0 3mm'}
}
.clause{margin-bottom:3.2mm}
.clause:last-child{margin-bottom:0}
.clause h3{
  font-size:${rtl ? '9.8pt' : '9.4pt'};font-weight:700;color:var(--ink);margin-bottom:1mm;
  display:flex;align-items:center;gap:2mm
}
.clause h3::before{content:"";flex:none;width:1.6mm;height:1.6mm;border-radius:50%;background:var(--red)}
.clause p,.clause li{font-size:${rtl ? '9.6pt' : '9.2pt'};line-height:${rtl ? 1.9 : 1.58};color:var(--body)}
.clause h3 + p,.clause h3 + ul{padding-inline-start:3.6mm}
.clause ul{list-style:none}
.clause li{position:relative;padding-inline-start:5mm;margin-bottom:1mm}
.clause li::before{content:"";position:absolute;inset-inline-start:0;top:${rtl ? '.95em' : '.8em'};width:2.6mm;height:1.5px;background:var(--red)}

/* ---------- running header (page 2) ---------- */
.run{
  display:flex;align-items:center;justify-content:space-between;
  margin:11mm 16mm 0;padding-bottom:3.4mm;border-bottom:1px solid var(--line);
}
.run > span{font-size:7.6pt;font-weight:600;color:var(--muted)}

/* ---------- contact ---------- */
.contact{
  position:relative;overflow:hidden;margin-top:6mm;border-radius:4mm;color:#fff;
  background:linear-gradient(150deg,#211816 0%,var(--ink) 100%);
  padding:6.4mm 7mm;display:grid;grid-template-columns:1fr 1.25fr;gap:6mm;align-items:center;
}
.contact-glow{
  position:absolute;width:80mm;height:80mm;bottom:-50mm;${rtl ? 'left' : 'right'}:-30mm;border-radius:50%;
  background:radial-gradient(circle,rgba(237,59,27,.5) 0%,transparent 65%);
}
.contact-h{position:relative}
.contact-h h2{font-family:var(--f-display);font-size:13pt;font-weight:700;line-height:1.3;margin-bottom:1.6mm}
.contact-h p{font-size:8.6pt;color:rgba(255,255,255,.62);line-height:1.6}
.contact-items{position:relative;display:flex;flex-direction:column;gap:2mm}
.contact-items a{
  display:flex;align-items:center;justify-content:space-between;gap:3mm;text-decoration:none;color:#fff;
  padding:2.4mm 3.6mm;border-radius:2.4mm;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)
}
.contact-items span{font-size:7.6pt;color:rgba(255,255,255,.55);font-weight:600}
.contact-items b{font-family:var(--f-latin);font-size:8.8pt;font-weight:600;letter-spacing:.2px}
.disclaimer{margin-top:3mm;font-size:7.4pt;color:var(--muted);text-align:center;line-height:1.6}

/* ---------- page footer ---------- */
.pf{
  position:absolute;left:16mm;right:16mm;bottom:0;height:13mm;
  display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--line);
}
.pf-mid{font-size:7.4pt;color:var(--muted);letter-spacing:.2px}
.pf-num{font-family:var(--f-latin);font-size:7.6pt;color:var(--muted);direction:ltr}
.pf-num b{color:var(--ink);font-weight:800}
`
}

// ---------------------------------------------------------------- build
const udd = join(tmpdir(), 'ems-policy-chrome')
mkdirSync(udd, { recursive: true })
const PUBLIC_DOCS = join(DIR, '..', 'public', 'docs')
mkdirSync(PUBLIC_DOCS, { recursive: true })

for (const lang of Object.keys(DOCS)) {
  const html = join(DIR, `refund-policy-${lang}.html`)
  const pdf = join(DIR, `refund-policy-${lang}.pdf`)
  writeFileSync(html, render(lang))
  if (process.argv.includes('--html-only')) continue
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--user-data-dir=${udd}`, '--virtual-time-budget=15000', '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${pdf}`, pathToFileURL(html).href,
  ], { stdio: 'ignore' })
  copyFileSync(pdf, join(PUBLIC_DOCS, `refund-policy-${lang}.pdf`))
  console.log(`built ${lang}: ${html} + .pdf (copied to public/docs)`)
}
