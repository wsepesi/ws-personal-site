import { getAllPosts } from '@/lib/posts'
import { SITE_URL, fullName, siteTitle } from '@/lib/content'

export async function GET() {
  const posts = getAllPosts()

  const rssItemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_URL}${post.url}`
      const description = post.content.slice(0, 300).replace(/[#*_`]/g, '').trim() + '...'

      return `
        <item>
          <guid>${postUrl}</guid>
          <title><![CDATA[${post.title}]]></title>
          <link>${postUrl}</link>
          <description><![CDATA[${description}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author>hello@william.computer (${fullName})</author>
        </item>
      `
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteTitle}</title>
        <link>${SITE_URL}</link>
        <description>Blog posts and reading notes by ${fullName}.</description>
        <language>en</language>
        <managingEditor>hello@william.computer (${fullName})</managingEditor>
        <webMaster>hello@william.computer (${fullName})</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${rssItemsXml}
      </channel>
    </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
