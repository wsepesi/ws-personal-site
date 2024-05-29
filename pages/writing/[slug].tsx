import { format, parseISO } from 'date-fns'
import { allPosts, type Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
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
  const MDXContent = useMDXComponent(post.body.code)
  return (
    <>
      <SiteBase title={post.title}>
        <article>
          <div>
            <time dateTime={post.date} className="text-sm text-slate-600">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <MDXContent />
        </article>
      </SiteBase>
    </>
  )
}

export default PostLayout


// function CustomP({ children }: { children: React.ReactNode }) {
//   return <p className="mb-1 leading-relaxed">{children}</p>
// }

// const components: MDXComponents = {
//   p: CustomP
// }