import Link from "next/link"
import SiteBase from "@/components/SiteBase"
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'
import Head from "next/head"

export async function getStaticProps() {
  const posts = allPosts.sort((a: Post, b: Post) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post: Post) {
  return (
    <>
    <Head>
        <title>William [dot] Computer</title>
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
        <SiteBase title="Writing">
          <div className="flex flex-col md:flex-row justify-between mx-[3vw]">
            <div className="">
              <h3>Posts</h3>
              <hr />
              {posts.filter(post => !post.short).map((post, idx) => (
                <PostCard key={idx} {...post} />
              ))}
            </div>
            <div className="">
              <h3>Reading</h3>
              <hr />
              {posts.filter(post => post.short).map((post, idx) => (
                <PostCard key={idx} {...post} />
              ))}
            </div>
          </div>
            
        </SiteBase>
    )
}

export default Writing