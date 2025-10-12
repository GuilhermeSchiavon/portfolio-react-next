# Portfolio Next.js - Guilherme Schiavon

## 🚀 Migração Vue → React/Next.js

Este projeto é uma migração completa do portfolio Vue 3 para React/Next.js, mantendo todas as funcionalidades originais e melhorando a performance e SEO.

## 📋 Stack Tecnológica

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações avançadas
- **GSAP** - Animações de alta performance

### Estado Global
- **Redux Toolkit** - Gerenciamento de estado (substitui Vuex)
- **RTK Query** - Cache e sincronização de dados

### Internacionalização
- **react-i18next** - Suporte a múltiplos idiomas
- **i18next-browser-languagedetector** - Detecção automática de idioma

### Otimizações
- **Image Optimization** - Otimização automática de imagens
- **Code Splitting** - Carregamento sob demanda
- **SEO Otimizado** - Meta tags dinâmicas e estruturadas

## 🏗️ Arquitetura

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── globals.css        # Estilos globais
│   └── providers.tsx      # Providers (Redux, i18n, Theme)
├── components/
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/              # Componentes da home
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ProjectsSection.tsx
│   ├── ui/                # Componentes reutilizáveis
│   │   ├── AlertSystem.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── ProjectCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── providers/         # Context providers
│   │   ├── ThemeProvider.tsx
│   │   └── I18nProvider.tsx
│   └── views/             # Views principais
│       └── HomeView.tsx
├── store/                 # Redux Toolkit
│   ├── index.ts          # Store configuration
│   └── slices/           # Redux slices
│       ├── helpersSlice.ts
│       ├── languageSlice.ts
│       ├── projectSlice.ts
│       ├── chatSlice.ts
│       └── userSlice.ts
├── lib/                   # Utilitários e configurações
│   └── i18n.ts           # Configuração i18n
├── locales/              # Arquivos de tradução
│   ├── en/
│   ├── pt/
│   └── es/
├── hooks/                # Custom hooks
├── types/                # Definições TypeScript
└── utils/                # Funções utilitárias
```

## 🔧 Configuração e Instalação

### 1. Instalar Dependências
```bash
cd nextjs-portfolio
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_TITLE=Guilherme Schiavon Portfolio
```

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

### 4. Build para Produção
```bash
npm run build
npm start
```

## 🎨 Principais Funcionalidades

### ✅ Migradas do Vue
- [x] **Sistema de Tema** - Dark/Light mode com persistência
- [x] **Internacionalização** - Suporte a EN, PT, ES
- [x] **Gerenciamento de Estado** - Redux Toolkit (ex-Vuex)
- [x] **Sistema de Alertas** - Notificações animadas
- [x] **Navegação Responsiva** - Header com menu mobile
- [x] **Seções Animadas** - Hero, About, Projects, Footer
- [x] **Formulário de Contato** - Integração com backend
- [x] **Loading Screen** - Animação de carregamento
- [x] **SEO Otimizado** - Meta tags dinâmicas

### 🚀 Melhorias Implementadas
- [x] **Performance** - Code splitting automático
- [x] **Animações GSAP** - Animações de alta performance
- [x] **TypeScript** - Tipagem completa
- [x] **Framer Motion** - Animações declarativas
- [x] **Image Optimization** - Otimização automática do Next.js
- [x] **App Router** - Roteamento moderno do Next.js 14

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎭 Animações

### GSAP
- Animações de entrada das seções
- Efeitos de scroll trigger
- Animações de texto e elementos

### Framer Motion
- Transições de página
- Hover effects
- Animações de componentes
- Loading states

## 🌐 SEO e Performance

### Meta Tags Dinâmicas
- Open Graph completo
- Twitter Cards
- Structured Data
- Canonical URLs

### Performance
- **Core Web Vitals** otimizados
- **Image Optimization** automática
- **Code Splitting** por rota
- **Lazy Loading** de componentes

## 🔄 Comparação Vue vs React

| Funcionalidade | Vue 3 | React/Next.js |
|---|---|---|
| **Estado Global** | Vuex | Redux Toolkit |
| **Roteamento** | Vue Router | App Router |
| **i18n** | vue-i18n | react-i18next |
| **Animações** | GSAP + CSS | GSAP + Framer Motion |
| **SEO** | Meta tags manuais | Next.js automático |
| **Performance** | SPA | SSR/SSG + Hydration |
| **TypeScript** | Opcional | Nativo |

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Build Manual
```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting
- `npm run type-check` - Verificação de tipos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ por Guilherme Schiavon**