import { format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import SiteBase from '@/components/SiteBase'
import { CommentSection } from '@/components/bsky-comments'
import SEO from '@/components/SEO'
import StructuredData from '@/components/StructuredData'
import { SITE_URL } from '@/lib/content'

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
  const MDXContent = useMDXComponent(post.body.code)
  const description = post.body.raw.slice(0, 160).replace(/[#*_`]/g, '').trim() + '...'

  return (
    <>
      <SEO
        title={post.title}
        description={description}
        url={`${SITE_URL}${post.url}`}
        type="article"
        publishedTime={post.date}
        keywords={['William Sepesi', 'blog', post.title.toLowerCase(), 'machine learning', 'AI']}
      />
      <StructuredData
        type="article"
        title={post.title}
        description={description}
        datePublished={post.date}
        url={`${SITE_URL}${post.url}`}
      />
      <SiteBase title={post.title}>
        <article>
          <div>
            <time dateTime={post.date} className="text-sm text-slate-600">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <MDXContent />
          {post.bskyurl &&  <CommentSection url={post.bskyurl} />}
        </article>
      </SiteBase>
    </>
  )
}

export default PostLayout