/** @type {import('next').NextConfig} */

// Host da API: usado para liberar a otimização das imagens dos projetos.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
let apiPattern = []
try {
  const { protocol, hostname, port } = new URL(apiUrl)
  apiPattern = [{ protocol: protocol.replace(':', ''), hostname, port, pathname: '/uploads/**' }]
} catch {
  // Sem NEXT_PUBLIC_API_URL: o site sobe, só não lista projetos.
}

const nextConfig = {
  poweredByHeader: false,
  images: {
    // As imagens dos projetos são PNGs de até 3,5 MB; o Next entrega versões
    // redimensionadas em WebP e guarda em cache por 30 dias. Só WebP e poucos
    // tamanhos de propósito: AVIF custa bem mais CPU, e o servidor é pequeno.
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [...apiPattern, { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
