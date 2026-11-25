import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Raleway } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { PersonStructuredData } from '@/components/seo/StructuredData'
import { getRequestLocale, getRequestTheme } from '@/lib/request'
import { htmlLang, THEME_COOKIE } from '@/lib/locale'
import { getMeta, pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

// Inter e Raleway são fontes variáveis: um arquivo cobre todos os pesos.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', display: 'swap' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export function generateMetadata(): Metadata {
  const locale = getRequestLocale()
  const meta = getMeta(locale)

  return {
    metadataBase: new URL(site.url),
    ...pageMetadata(locale, { title: meta.home.title, description: meta.home.description }),
    title: { default: meta.home.title, template: `%s | ${site.name}` },
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: [
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/favicon/apple-icon-180x180.png', sizes: '180x180' }],
    },
    manifest: '/favicon/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    ...(process.env.GOOGLE_VERIFICATION_CODE
      ? { verification: { google: process.env.GOOGLE_VERIFICATION_CODE } }
      : {}),
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

// Sem preferência salva, segue o tema do sistema antes da primeira pintura
// (evita o "flash" de tema claro para quem usa o sistema em modo escuro).
const themeScript = `(function(){try{if(document.cookie.indexOf('${THEME_COOKIE}=')===-1&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getRequestLocale()
  const theme = getRequestTheme()
  const meta = getMeta(locale)

  return (
    <html lang={htmlLang[locale]} className={theme === 'dark' ? 'dark' : undefined} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PersonStructuredData jobTitle={meta.jobTitle} description={meta.home.description} />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${raleway.variable} font-sans antialiased`}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  )
}
