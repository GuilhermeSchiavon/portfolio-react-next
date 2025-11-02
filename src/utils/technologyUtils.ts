export interface Technology {
  id: number
  name: string
  svg?: string
  description?: string
  type: 'frontend' | 'backend' | 'architecture' | 'devops'
  status: 'ativo' | 'inativo'
}

export const getTechTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    'frontend': 'from-blue-500 to-blue-600',
    'backend': 'from-green-500 to-green-600', 
    'architecture': 'from-purple-500 to-purple-600',
    'devops': 'from-orange-500 to-orange-600'
  }
  
  // Normaliza o tipo para lowercase e remove espaços
  const normalizedType = type?.toLowerCase().trim()
  
  return colors[normalizedType] || 'from-neutral-500 to-neutral-600'
}

export const getTechTypeBgColor = (type: string) => {
  const colors: Record<string, string> = {
    'frontend': 'bg-blue-500',
    'backend': 'bg-green-500',
    'architecture': 'bg-purple-500', 
    'devops': 'bg-orange-500'
  }
  
  // Normaliza o tipo para lowercase e remove espaços
  const normalizedType = type?.toLowerCase().trim()
  
  return colors[normalizedType] || 'bg-neutral-500'
}

export const getTechTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'architecture': 'Arquitetura',
    'devops': 'DevOps'
  }
  
  // Normaliza o tipo para lowercase e remove espaços
  const normalizedType = type?.toLowerCase().trim()
  
  return labels[normalizedType] || type
}

export const groupTechnologiesByType = (technologies: Technology[]) => {
  return technologies.reduce((acc, tech) => {
    if (!acc[tech.type]) {
      acc[tech.type] = []
    }
    acc[tech.type].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)
}