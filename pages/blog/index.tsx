import Link from "next/link"
import SiteBase from "@/components/SiteBase"
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a: Post, b: Post) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post: Post) {
  return (
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
  )
}

type Props = {
    posts: Post[]
}

const Blog = ({posts}: Props) => {
    return (
        <SiteBase title="Blog">
            {posts.map((post, idx) => (
                <PostCard key={idx} {...post} />
            ))}
        </SiteBase>
    )
}

export default Blog