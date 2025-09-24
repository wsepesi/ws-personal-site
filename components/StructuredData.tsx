import { SITE_URL, fullName } from '@/lib/content'
import Head from 'next/head'

interface PersonSchemaProps {
  type: 'person'
}

interface ArticleSchemaProps {
  type: 'article'
  title: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
}

interface WebSiteSchemaProps {
  type: 'website'
}

type StructuredDataProps = PersonSchemaProps | ArticleSchemaProps | WebSiteSchemaProps

const StructuredData: React.FC<StructuredDataProps> = (props) => {
  let schema: any = {}

  if (props.type === 'person') {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": fullName,
      "url": SITE_URL,
      "sameAs": [
        "https://twitter.com/robot__fan",
        "https://github.com/wsepesi",
        "https://www.linkedin.com/in/william-sepesi/"
      ],
      "jobTitle": "Machine Learning Researcher and Engineer",
      "description": "Machine learning researcher and engineer specializing in reinforcement learning, LLMs, and mechanistic interpretability",
      "knowsAbout": [
        "Machine Learning",
        "Artificial Intelligence",
        "Reinforcement Learning",
        "Large Language Models",
        "Mechanistic Interpretability",
        "Python",
        "TypeScript"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Washington University in St. Louis",
        "sameAs": "https://wustl.edu"
      },
      "worksFor": [
        {
          "@type": "Organization",
          "name": "Therap Services"
        }
      ]
    }
  } else if (props.type === 'article') {
    schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": props.title,
      "description": props.description,
      "datePublished": props.datePublished,
      "dateModified": props.dateModified || props.datePublished,
      "author": {
        "@type": "Person",
        "name": fullName,
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Person",
        "name": fullName,
        "url": SITE_URL
      },
      "url": props.url,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": props.url
      }
    }
  } else if (props.type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "William [dot] Computer",
      "url": SITE_URL,
      "description": `${fullName}'s personal website - machine learning researcher and engineer`,
      "author": {
        "@type": "Person",
        "name": fullName,
        "url": SITE_URL
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/writing?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
    </Head>
  )
}

export default StructuredData