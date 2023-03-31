// import Balancer from 'react-wrap-balancer';
// import { Mdx } from '@/components/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const Page = () => {
    return (
        <h1>Hello</h1>
    )
}

export default Page;

// export async function generateStaticParams() {
//   return allBlogs.map((post: any) => ({
//     slug: post.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: any): Promise<Metadata | undefined> {
//   const post = allBlogs.find((post: any) => post.slug === params.slug);
//   if (!post) {
//     return;
//   }

//   const {
//     title,
//     publishedAt: publishedTime,
//     summary: description,
//     image,
//     slug,
//   } = post;
//   const ogImage = image
//     ? `https://leerob.io${image}`
//     : `https://leerob.io/api/og?title=${title}`;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: 'article',
//       publishedTime,
//       url: `https://leerob.io/blog/${slug}`,
//       images: [
//         {
//           url: ogImage,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [ogImage],
//     },
//   };
// }

// export default async function Blog({ params }: any) {
//   const post = allBlogs.find((post: any) => post.slug === params.slug);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <section>
//       <script type="application/ld+json">
//         {JSON.stringify(post.structuredData)}
//       </script>
//       <h1 className="font-bold text-3xl font-serif max-w-[650px]">
//         <Balancer>{post.title}</Balancer>
//       </h1>
//       <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
//         <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
//           {post.publishedAt}
//         </div>
//         <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
//       </div>
//       <Mdx code={post.body.code} />
//     </section>
//   );
// }