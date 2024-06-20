//pages/sitemap.xml.js
import fs from 'fs';
import path from 'path';
const EXTERNAL_DATA_URL = 'https://william.computer/writing';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://william.computer</loc>
     </url>
     <url>
       <loc>https://william.computer/about/work</loc>
     </url>
     <url>
       <loc>https://william.computer/about/courses</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
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
  // get the posts from the file system, from ../posts. return a list of jsons with id and title. make ids sorted alphabetically
  // first get the file names
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  // then create json
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    return {
      id,
    };
  });

  return posts;
}

export default SiteMap;