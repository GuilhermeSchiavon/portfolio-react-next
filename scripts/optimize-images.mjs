// Gera as versões otimizadas das imagens pesadas de /public.
// Uso: node scripts/optimize-images.mjs
//
// As fotos originais do hero têm 3024x4032 (7,4 MB somadas). Aqui saem prontas
// em dois tamanhos e são servidas como arquivo estático (srcset no HeroSection):
// a imagem principal da página não depende de processamento no servidor.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public')

// Larguras do hero: 1280 atende celulares (até 3x) e 2400 atende telas grandes.
const HERO_WIDTHS = [1280, 2400]

const jobs = [
  ...HERO_WIDTHS.map((width) => ({
    from: 'img/background.jpg',
    to: `img/hero-bg-${width}.webp`,
    run: (img) => img.resize({ width, withoutEnlargement: true }).webp({ quality: 72, effort: 6 }),
  })),
  ...HERO_WIDTHS.map((width) => ({
    from: 'img/My.png',
    to: `img/hero-me-${width}.webp`,
    run: (img) => img.resize({ width, withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 90, effort: 6 }),
  })),
  {
    // Retrato quadrado para JSON-LD / redes sociais.
    from: 'img/background.jpg',
    to: 'img/guilherme-schiavon.jpg',
    run: (img) =>
      img
        .extract({ left: 700, top: 1300, width: 1700, height: 1700 })
        .resize({ width: 800 })
        .jpeg({ quality: 82, mozjpeg: true }),
  },
]

const kb = async (file) => `${Math.round((await stat(file)).size / 1024)} KB`

for (const job of jobs) {
  const from = path.join(root, job.from)
  const to = path.join(root, job.to)
  await job.run(sharp(from).rotate()).toFile(to)
  console.log(`${job.from} (${await kb(from)}) -> ${job.to} (${await kb(to)})`)
}
