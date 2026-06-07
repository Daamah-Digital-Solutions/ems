// One-off icon generator. Rasterizes the brand favicon SVG into the PNG/ICO
// assets browsers need. Run with: node scripts/gen-icons.mjs
// (sharp + png-to-ico are installed with --no-save; they are NOT runtime deps.)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const svg = readFileSync(join(pub, 'favicon.svg'))

async function png(size, out) {
  const buf = await sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()
  writeFileSync(join(pub, out), buf)
  return buf
}

// Apple touch icon (iOS home screen) — 180x180.
await png(180, 'apple-touch-icon.png')
// Maskable / PWA-friendly larger raster.
await png(512, 'icon-512.png')
// Favicon raster sizes for the .ico bundle.
const p16 = await png(16, 'favicon-16.png')
const p32 = await png(32, 'favicon-32.png')
const p48 = await png(48, 'favicon-48.png')
const ico = await pngToIco([p16, p32, p48])
writeFileSync(join(pub, 'favicon.ico'), ico)

// OG raster (Twitter/WhatsApp prefer PNG over SVG) — 1200x630.
const ogSvg = readFileSync(join(pub, 'og-image.svg'))
const ogPng = await sharp(ogSvg, { density: 144 }).resize(1200, 630).png().toBuffer()
writeFileSync(join(pub, 'og-image.png'), ogPng)

console.log('icons generated: favicon.ico, apple-touch-icon.png, icon-512.png, favicon-16/32/48.png, og-image.png')
