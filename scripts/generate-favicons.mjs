// Gera todo o conjunto de favicons a partir da foto do hero.
// Uso: node scripts/generate-favicons.mjs
//
// Para trocar a foto, mude SOURCE e CROP (região quadrada em volta do rosto).
import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')
const SOURCE = path.join(root, 'img/background.jpg')
const CROP = { left: 831, top: 1380, width: 1200, height: 1200 }

// Ícones de aba e Android: cantos arredondados. Apple e Windows aplicam a
// própria máscara, então recebem o quadrado inteiro.
const rounded = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-96x96.png': 96,
  'android-icon-36x36.png': 36,
  'android-icon-48x48.png': 48,
  'android-icon-72x72.png': 72,
  'android-icon-96x96.png': 96,
  'android-icon-144x144.png': 144,
  'android-icon-192x192.png': 192,
}

const square = {
  'apple-icon-57x57.png': 57,
  'apple-icon-60x60.png': 60,
  'apple-icon-72x72.png': 72,
  'apple-icon-76x76.png': 76,
  'apple-icon-114x114.png': 114,
  'apple-icon-120x120.png': 120,
  'apple-icon-144x144.png': 144,
  'apple-icon-152x152.png': 152,
  'apple-icon-180x180.png': 180,
  'apple-icon.png': 192,
  'apple-icon-precomposed.png': 192,
  'ms-icon-70x70.png': 70,
  'ms-icon-144x144.png': 144,
  'ms-icon-150x150.png': 150,
  'ms-icon-310x310.png': 310,
}

const base = await sharp(SOURCE).rotate().extract(CROP).toBuffer()

async function render(size, isRounded) {
  let image = sharp(base).resize(size, size, { kernel: 'lanczos3' })
  if (isRounded) {
    const radius = Math.round(size * 0.22)
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
    )
    image = image.composite([{ input: mask, blend: 'dest-in' }])
  }
  return image.png({ compressionLevel: 9 }).toBuffer()
}

// Um .ico é só um cabeçalho com um diretório de imagens; PNG dentro de ICO é
// aceito por todos os navegadores atuais.
function buildIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size === 256 ? 0 : size, 0)
    entry.writeUInt8(size === 256 ? 0 : size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)])
}

for (const [name, size] of Object.entries(rounded)) {
  await writeFile(path.join(root, 'favicon', name), await render(size, true))
}
for (const [name, size] of Object.entries(square)) {
  await writeFile(path.join(root, 'favicon', name), await render(size, false))
}

const ico = buildIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await render(size, true) }))))
await writeFile(path.join(root, 'favicon', 'favicon.ico'), ico)
// Navegadores pedem /favicon.ico na raiz mesmo sem <link>.
await writeFile(path.join(root, 'favicon.ico'), ico)

console.log(`${Object.keys(rounded).length + Object.keys(square).length} PNGs + favicon.ico gerados em public/favicon`)
