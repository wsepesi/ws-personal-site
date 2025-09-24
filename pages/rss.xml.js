import { SITE_URL, fullName, siteTitle } from '../lib/content';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

function generateRSSFeed(posts) {
  const rssItemsXml = posts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((post) => {
      const postUrl = `${SITE_URL}${post.url}`;
      const description = post.body.raw.slice(0, 300).replace(/[#*_`]/g, '').trim() + '...';

      return `
        <item>
          <guid>${postUrl}</guid>
          <title><![CDATA[${post.title}]]></title>
          <link>${postUrl}</link>
          <description><![CDATA[${description}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <author>hello@william.computer (${fullName})</author>
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteTitle}</title>
        <link>${SITE_URL}</link>
        <description>Blog posts and reading notes by ${fullName} on machine learning, AI research, reinforcement learning, and technology insights.</description>
        <language>en</language>
        <managingEditor>hello@william.computer (${fullName})</managingEditor>
        <webMaster>hello@william.computer (${fullName})</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
        ${rssItemsXml}
      </channel>
    </rss>`;
}

function RSS() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const rssFeed = generateRSSFeed(allPosts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(rssFeed);
  res.end();

  return {
    props: {},
  };
}

export default RSS;