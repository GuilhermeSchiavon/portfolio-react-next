export interface ProfileData {
  personal: {
    name: string
    title: string
    subtitle: string
    description: string
    avatar: string
    location: string
    email: string
    phone: string
    availability: boolean
  }
  skills: Array<{
    name: string
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
    icon: string
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other'
  }>
  experience: Array<{
    period: string
    title: string
    company: string
    description: string
    technologies: string[]
  }>
  stats: Array<{
    value: string
    label: string
    description: string
  }>
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export const profileData: ProfileData = {
  personal: {
    name: 'Guilherme Schiavon',
    title: 'Full Stack Developer',
    subtitle: 'Cientista da Computação',
    description: 'Desenvolvedor Full Stack especializado em criar soluções web modernas e escaláveis. Com experiência em Vue.js, React, Node.js e tecnologias de ponta.',
    avatar: '/img/profile/avatar.jpg',
    location: 'Brasil',
    email: 'contato@guilhermeschiavon.com',
    phone: '+55 (11) 99999-9999',
    availability: true
  },
  skills: [
    { name: 'Vue.js', level: 'Expert', icon: 'V', category: 'Frontend' },
    { name: 'React', level: 'Advanced', icon: 'R', category: 'Frontend' },
    { name: 'Node.js', level: 'Expert', icon: 'N', category: 'Backend' },
    { name: 'Python', level: 'Advanced', icon: 'P', category: 'Backend' },
    { name: 'TypeScript', level: 'Advanced', icon: 'T', category: 'Frontend' },
    { name: 'AWS', level: 'Intermediate', icon: 'A', category: 'DevOps' },
    { name: 'MongoDB', level: 'Advanced', icon: 'M', category: 'Database' },
    { name: 'PostgreSQL', level: 'Advanced', icon: 'P', category: 'Database' }
  ],
  experience: [
    {
      period: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions',
      description: 'Liderando o desenvolvimento de aplicações web escaláveis usando tecnologias modernas e melhores práticas.',
      technologies: ['Vue.js', 'Node.js', 'AWS', 'MongoDB']
    },
    {
      period: '2022 - 2023',
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      description: 'Desenvolvimento e manutenção de múltiplos projetos de clientes com foco em performance e experiência do usuário.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Docker']
    },
    {
      period: '2021 - 2022',
      title: 'Frontend Developer',
      company: 'Startup Tech',
      description: 'Especializado na criação de interfaces responsivas e interativas usando Vue.js e React.',
      technologies: ['Vue.js', 'React', 'TailwindCSS', 'Firebase']
    }
  ],
  stats: [
    { 
      value: '50+', 
      label: 'Projetos', 
      description: 'Projetos desenvolvidos e entregues com sucesso' 
    },
    { 
      value: '3+', 
      label: 'Anos Exp.', 
      description: 'Anos de experiência em desenvolvimento web' 
    },
    { 
      value: '15+', 
      label: 'Tecnologias', 
      description: 'Tecnologias dominadas e utilizadas em projetos' 
    }
  ],
  seo: {
    metaTitle: 'Guilherme Schiavon - Full Stack Developer | Portfolio',
    metaDescription: 'Desenvolvedor Full Stack especializado em Vue.js, React e Node.js. Criando soluções web modernas e escaláveis. Veja meu portfolio e projetos.',
    keywords: [
      'guilherme schiavon',
      'full stack developer',
      'desenvolvedor',
      'vue.js',
      'react',
      'node.js',
      'typescript',
      'portfolio',
      'brasil',
      'web developer'
    ]
  }
}