export type TocItem = {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Slugify text to match rehype-slug's behavior
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')     // Trim leading/trailing hyphens
}

/**
 * Extracts h2 and h3 headings from raw MDX content
 */
export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TocItem[] = []
  const slugCounts = new Map<string, number>()

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()

    // Generate slug (matching rehype-slug behavior)
    let slug = slugify(text)

    // Handle duplicate slugs
    const count = slugCounts.get(slug) || 0
    slugCounts.set(slug, count + 1)
    if (count > 0) {
      slug = `${slug}-${count}`
    }

    toc.push({ id: slug, text, level })
  }

  return toc
}
