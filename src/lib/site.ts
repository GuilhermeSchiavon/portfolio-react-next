// Dados do site em um lugar só. Tudo que é número ou contato sai daqui,
// para não ficar espalhado (e desatualizado) pelos componentes.

export const site = {
  name: 'Guilherme Schiavon',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9999').replace(/\/$/, ''),
  email: 'guilherme@schiavon.dev',
  whatsapp: {
    number: '5514996427690',
    display: '+55 14 99642-7690',
  },
  social: {
    github: 'https://github.com/GuilhermeSchiavon',
    linkedin: 'https://linkedin.com/in/guilhermeschiavon',
    instagram: 'https://www.instagram.com/guilherme__schiavon/',
  },
  // Primeiro cargo na área (estágio na DevCodes, out/2021).
  careerStart: new Date(2021, 9, 1),
  // Números da operação. Fonte: inventário dos servidores de 22/11/2026
  // (53 apps Node online em 4 servidores + 1 servidor só de WordPress).
  // Arredondados para baixo de propósito; atualizar quando o inventário mudar.
  proof: {
    servicesInProduction: 50,
    servers: 5,
  },
} as const

export function yearsOfExperience(now: Date = new Date()): number {
  const start = site.careerStart
  let years = now.getFullYear() - start.getFullYear()
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())
  if (beforeAnniversary) years -= 1
  return Math.max(years, 0)
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function mailtoLink(subject: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

// Integrações mostradas no hero (ícones em /public/icons).
export const integrations = [
  { name: 'Google', icon: '/icons/google.svg' },
  { name: 'Meta', icon: '/icons/meta.svg' },
  { name: 'WhatsApp', icon: '/icons/whatsapp.svg' },
  { name: 'OpenAI', icon: '/icons/openai.svg' },
  { name: 'Zoom', icon: '/icons/zoom.svg' },
  { name: 'Mercado Pago', icon: '/icons/mercadopago.svg' },
  { name: 'AWS', icon: '/icons/aws.svg' },
] as const

// Stack atual, agrupada por área. Os nomes dos grupos (stack.groups.*) e os
// itens que precisam de tradução (stack.extra.*) ficam em locales/*/home.json.
export const stack: Array<{ group: string; items: string[] }> = [
  { group: 'backend', items: ['Node.js', 'NestJS', 'Express', 'TypeScript', 'Python', 'PHP / WordPress'] },
  { group: 'frontend', items: ['Vue.js', 'React', 'Next.js', 'Tailwind CSS'] },
  { group: 'data', items: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'Bull'] },
  { group: 'infra', items: ['Linux', 'Docker', 'Nginx', 'PM2', 'DigitalOcean', 'AWS', 'GitHub Actions'] },
  { group: 'ai', items: ['Claude Code', 'OpenAI API'] },
]
