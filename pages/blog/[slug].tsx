import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'
import SiteBase from '@/components/SiteBase'

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return {
    props: {
      post,
    },
  }
}

type PostProps = {
    post: Post
}

const PostLayout = ({ post }: PostProps) => {
  return (
    <>
      <SiteBase title={post.title}>
        <article>
          <div>
            <time dateTime={post.date} className="text-sm text-slate-600">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <div className="cl-post-body" dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </article>
      </SiteBase>
      {/* <Head>
        <title>{post.title}</title>
      </Head>
      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <Link href="/">
            <p className="text-center text-sm font-bold uppercase text-blue-700">Home</p>
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-slate-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className="cl-post-body" dangerouslySetInnerHTML={{ __html: post.body.html }} />
      </article> */}
    </>
  )
}

export default PostLayout