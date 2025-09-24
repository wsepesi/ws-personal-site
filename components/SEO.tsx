import Head from 'next/head'
import { SITE_URL, siteTitle, fullName } from '@/lib/content'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
  canonical?: string
}

const SEO: React.FC<SEOProps> = ({
  title = siteTitle,
  description = `${fullName}'s personal website - machine learning researcher and engineer`,
  image = `${SITE_URL}/favicon.ico`,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = fullName,
  keywords = ['William Sepesi', 'machine learning', 'AI research', 'ML engineer', 'reinforcement learning', 'LLMs'],
  canonical
}) => {
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`
  const canonicalUrl = canonical || url

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@robot__fan" />
      <meta name="twitter:creator" content="@robot__fan" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Head>
  )
}

export default SEO