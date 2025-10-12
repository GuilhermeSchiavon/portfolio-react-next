export interface Project {
  id: number
  title: string
  description: string
  slug: string
  category: string
  image: string
  liveUrl: string
  githubUrl: string
  technologies: string[]
  featured: boolean
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory management and payment processing.',
    slug: 'ecommerce-platform',
    category: 'E-commerce',
    image: '/img/projects/ecommerce.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true,
    seo: {
      metaTitle: 'E-Commerce Platform - Guilherme Schiavon Portfolio',
      metaDescription: 'Modern e-commerce solution with real-time inventory management and payment processing built with Vue.js and Node.js',
      keywords: ['e-commerce', 'vue.js', 'node.js', 'mongodb', 'stripe', 'full-stack']
    }
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team features.',
    slug: 'task-management-app',
    category: 'Web Apps',
    image: '/img/projects/taskapp.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
    featured: true,
    seo: {
      metaTitle: 'Task Management App - Guilherme Schiavon Portfolio',
      metaDescription: 'Collaborative task management application with real-time updates built with React and Express',
      keywords: ['task management', 'react', 'express', 'postgresql', 'socket.io', 'collaboration']
    }
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with location-based forecasts and interactive maps.',
    slug: 'weather-dashboard',
    category: 'Web Apps',
    image: '/img/projects/weather.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    featured: false,
    seo: {
      metaTitle: 'Weather Dashboard - Guilherme Schiavon Portfolio',
      metaDescription: 'Beautiful weather dashboard with location-based forecasts and interactive maps using Vue.js and TypeScript',
      keywords: ['weather dashboard', 'vue.js', 'typescript', 'chart.js', 'api integration']
    }
  },
  {
    id: 4,
    title: 'Restaurant API',
    description: 'RESTful API for restaurant management with order processing and inventory tracking.',
    slug: 'restaurant-api',
    category: 'APIs',
    image: '/img/projects/api.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    featured: false,
    seo: {
      metaTitle: 'Restaurant API - Guilherme Schiavon Portfolio',
      metaDescription: 'RESTful API for restaurant management with order processing and inventory tracking built with Node.js',
      keywords: ['restaurant api', 'node.js', 'express', 'mongodb', 'jwt', 'rest api']
    }
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'Mobile-first fitness tracking application with workout plans and progress monitoring.',
    slug: 'fitness-tracker',
    category: 'Mobile',
    image: '/img/projects/fitness.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
    featured: true,
    seo: {
      metaTitle: 'Fitness Tracker - Guilherme Schiavon Portfolio',
      metaDescription: 'Mobile-first fitness tracking application with workout plans and progress monitoring using React Native',
      keywords: ['fitness tracker', 'react native', 'firebase', 'redux', 'mobile app']
    }
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Modern portfolio website with dynamic content management and contact forms.',
    slug: 'portfolio-website',
    category: 'Web Apps',
    image: '/img/projects/portfolio.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    technologies: ['Vue.js', 'Nuxt.js', 'TailwindCSS', 'Netlify'],
    featured: false,
    seo: {
      metaTitle: 'Portfolio Website - Guilherme Schiavon Portfolio',
      metaDescription: 'Modern portfolio website with dynamic content management and contact forms built with Vue.js and Nuxt.js',
      keywords: ['portfolio website', 'vue.js', 'nuxt.js', 'tailwindcss', 'netlify']
    }
  }
]

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects
  return projects.filter(project => project.category === category)
}