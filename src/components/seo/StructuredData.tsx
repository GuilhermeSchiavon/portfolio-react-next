interface StructuredDataProps {
  type: 'person' | 'project' | 'organization'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generatePersonSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Guilherme Schiavon",
    "jobTitle": "Full Stack Developer",
    "description": "Desenvolvedor Full Stack especializado em Vue.js, React e Node.js",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "sameAs": [
      data.linkedin || "",
      data.github || "",
      data.twitter || ""
    ].filter(Boolean),
    "knowsAbout": [
      "Vue.js", "React", "Node.js", "TypeScript", "JavaScript",
      "Full Stack Development", "Web Development", "API Development"
    ]
  })

  const generateProjectSchema = () => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": data.title,
    "description": data.description,
    "creator": {
      "@type": "Person",
      "name": "Guilherme Schiavon"
    },
    "dateCreated": data.createdAt,
    "url": data.link,
    "image": data.Images?.[0]?.url,
    "keywords": data.Technologies?.map((tech: any) => tech.name).join(", ")
  })

  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Guilherme Schiavon Portfolio",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": "Guilherme Schiavon"
    }
  })

  const getSchema = () => {
    switch (type) {
      case 'person': return generatePersonSchema()
      case 'project': return generateProjectSchema()
      case 'organization': return generateOrganizationSchema()
      default: return {}
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  )
}