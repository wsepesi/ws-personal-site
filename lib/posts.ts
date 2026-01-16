import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostFrontmatter = {
  title: string
  date: string
  short: boolean
  bskyurl?: string
  cover?: string
}

export type Post = PostFrontmatter & {
  slug: string
  url: string
  content: string
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // Prevent auto-conversion of dates to Date objects
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s) => require('js-yaml').load(s, { schema: require('js-yaml').JSON_SCHEMA }) as object
    }
  })

  // Convert date to string and validate
  const dateValue = data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)
  const dateObj = new Date(dateValue)
  if (isNaN(dateObj.getTime())) {
    console.error(`Invalid date in ${slug}.mdx: ${dateValue}`)
    throw new Error(`Invalid date in ${slug}.mdx: ${dateValue}`)
  }

  return {
    slug,
    url: `/writing/${slug}`,
    title: data.title,
    date: dateValue,
    short: data.short,
    bskyurl: data.bskyurl,
    cover: data.cover,
    content,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Sort posts by date in descending order
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
  return posts
}

export function getRegularPosts(): Post[] {
  return getAllPosts().filter((post) => !post.short)
}

export function getShortPosts(): Post[] {
  return getAllPosts().filter((post) => post.short)
}
