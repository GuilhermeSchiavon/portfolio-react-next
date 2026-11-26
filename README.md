# Portfólio — Guilherme Schiavon

Site em [schiavon.dev](https://schiavon.dev). Frontend em Next.js (App Router) que lê projetos e tecnologias da API do portfólio ([Portfolio_backend](https://github.com/GuilhermeSchiavon/Portfolio_backend)).

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** para estilo
- **react-i18next** para os textos (português e inglês)
- **Framer Motion** para as animações de entrada
- **sharp** para gerar as imagens do hero

## Como funciona

- **Dados no servidor.** As páginas buscam os projetos na API pelo servidor do Next (`src/lib/api.ts`), com cache de 5 minutos. O HTML já chega com o conteúdo, o navegador não depende de CORS e, se a API cair, a página renderiza sem a lista em vez de quebrar.
- **Um endereço por idioma.** Inglês na raiz (`/`, `/projects/...`) e português em `/pt/...`. O `src/middleware.ts` tira o `/pt` e avisa as páginas pelo cabeçalho `x-site-locale`; as rotas continuam em `src/app`, sem pasta de idioma. Quem abre um endereço sem prefixo e prefere português (cookie `lang` ou `Accept-Language`) é levado ao `/pt`. Robôs não mandam nenhum dos dois: ficam no inglês e chegam ao português pelos `hreflang` de cada página e pelo `sitemap.xml`, que lista os dois idiomas. Links internos usam `LocaleLink` para manter o idioma.
- **Conteúdo visível sem JavaScript.** As animações de entrada (`Reveal`) só escondem um bloco depois que o JavaScript roda, e só se ele estiver abaixo da tela. O que fica recolhido no celular (trajetória, destaques da experiência) continua no HTML.
- **Tema sem "flash".** A classe `dark` do `<html>` vem do cookie `theme`; sem cookie, um script no `<head>` segue o tema do sistema.
- **Hero estático.** As fotos do hero são geradas em dois tamanhos por `scripts/optimize-images.mjs` e servidas como arquivo estático com `srcset`.
- **Números e contatos em um lugar só:** `src/lib/site.ts`.

## Estrutura

```
src/
├── app/                  # Rotas, layout, sitemap e robots
├── components/
│   ├── home/             # Seções da home (hero, sobre, como trabalho, experiência...)
│   ├── layout/           # Cabeçalho, rodapé, tema e idioma
│   ├── seo/              # JSON-LD
│   ├── ui/               # Card de projeto, ícones, utilitários
│   └── views/            # Montagem de cada página
├── lib/                  # API, idioma, SEO, dados do site
├── locales/              # Textos em pt e en
└── types/
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # ajuste as URLs
npm run dev                  # http://localhost:9999
```

Variáveis de ambiente (veja `.env.example`):

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (canonical, sitemap, Open Graph) |
| `NEXT_PUBLIC_API_URL` | API do portfólio e origem das imagens em `/uploads` |
| `API_URL` | Opcional: URL interna da API para as leituras do servidor |
| `GOOGLE_VERIFICATION_CODE` | Opcional: verificação do Search Console |

## Scripts

```bash
npm run dev          # desenvolvimento (porta 9999)
npm run build        # build de produção
npm start            # serve o build (porta 9999)
npm run lint         # ESLint
npm run type-check   # TypeScript
node scripts/optimize-images.mjs   # regenera as imagens do hero
```

## Editando o conteúdo

- **Textos** (hero, sobre, como trabalho, experiência): `src/locales/pt/home.json` e `src/locales/en/home.json`.
- **Números, contatos, redes e stack:** `src/lib/site.ts`.
- **Projetos:** cadastrados no painel do backend; aparecem aqui em até 5 minutos.

## Deploy

Em produção o site roda no servidor Schiavon com PM2 (`ecosystem.config.js`, app `9999_Schiavon-frontend`).
O servidor tem 1 CPU e pouca memória livre, então o build é feito fora dele:

1. Na máquina local, compilar com as URLs de produção:
   `NEXT_PUBLIC_SITE_URL=https://schiavon.dev NEXT_PUBLIC_API_URL=https://server-main.schiavon.dev npm run build`
2. Enviar a pasta `.next` para o servidor como `.next.new` (sem `cache/webpack`, `cache/swc` e `trace`).
3. No servidor: `git pull`, `npm install`, trocar `.next` por `.next.new` (guardando a anterior como `.next.old`) e reiniciar só o app do portfólio.

Para voltar atrás: restaurar `.next.old`, `git checkout` do commit anterior e reiniciar o app.
