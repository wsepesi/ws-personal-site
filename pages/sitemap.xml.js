import { EXTERNAL_DATA_URL, SITE_URL } from '../lib/content';

//pages/sitemap.xml.js
import fs from 'fs';
import path from 'path';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--Static pages-->
     <url>
       <loc>${SITE_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about/work</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${SITE_URL}/about/courses</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${SITE_URL}/writing</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.9</priority>
     </url>
     <!--Blog posts-->
     ${posts
       .map(({ id, lastModified }) => {
         return `
       <url>
           <loc>${SITE_URL}/writing/${id}</loc>
           <lastmod>${lastModified || new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.6</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = getPosts()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function getPosts() {
  // get the posts from the file system, from ../posts. return a list of jsons with id and lastModified
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  // then create json with modification dates
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx?$/, '');
    const filePath = path.join(postsDirectory, fileName);
    const stats = fs.statSync(filePath);
    return {
      id,
      lastModified: stats.mtime.toISOString(),
    };
  });

  return posts;
}

export default SiteMap;