import { useState, useEffect } from 'react'
import { Technology } from '@/utils/technologyUtils'

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v2/technologies`)
        if (!response.ok) throw new Error('Erro ao buscar tecnologias')
        
        const data = await response.json()
        setTechnologies(data.filter((tech: Technology) => tech.status === 'ativo'))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  return { technologies, loading, error }
}