import { Header } from './Header'
import { Footer } from './Footer'

// Estrutura comum das páginas: cabeçalho, um único <main> e rodapé.
// `padded` reserva o espaço do cabeçalho fixo (a home não usa: o hero passa por baixo).
export function PageShell({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main id="content" className={padded ? 'pt-16 lg:pt-20' : undefined}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
