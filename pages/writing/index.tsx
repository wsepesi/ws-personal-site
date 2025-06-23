import Link from "next/link"
import SiteBase from "@/components/SiteBase"
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'
import Head from "next/head"
import { fullName, siteTitle } from "@/lib/content"

export async function getStaticProps() {
  const posts = allPosts.sort((a: Post, b: Post) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post: Post) {
  const title = `${siteTitle} | Writing`
  return (
    <>
    <Head>
        <title>{title}</title>
        <meta name="description" content={`blog post from ${fullName}`} />
      </Head>
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link href={post.url}>
          <p className="text-blue-700 hover:text-blue-900">{post.title}</p>
        </Link>
      </h2>
    </div>
    </>
  )
}

type Props = {
    posts: Post[]
}

const Writing = ({posts}: Props) => {
    return (
        <SiteBase title="Writing" description={`${fullName}'s personal website writing page`}>
          <div className="flex flex-col md:flex-row justify-between mx-[3vw] h-full md:space-x-8">
            <div className="flex flex-col flex-1 min-h-0">
              <h3>Posts</h3>
              <hr />
              <div className="overflow-y-auto">
                {posts.filter(post => !post.short).map((post, idx) => (
                  <PostCard key={idx} {...post} />
                ))}
              </div>
            </div>
            <div className="flex flex-col flex-1 min-h-0">
              <h3>Reading</h3>
              <hr />
              <div className="overflow-y-auto">
                {posts.filter(post => post.short).map((post, idx) => (
                  <PostCard key={idx} {...post} />
                ))}
              </div>
            </div>
          </div>
            
        </SiteBase>
    )
}

export default Writing