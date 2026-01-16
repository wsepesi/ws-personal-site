import Link from "next/link"
import Image from "next/image"
import SiteBase from "@/components/SiteBase"
import { format, parseISO } from 'date-fns'
import { getRegularPosts, getShortPosts, type Post } from '@/lib/posts'
import { fullName, siteTitle, SITE_URL } from "@/lib/content"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: `Blog posts and reading notes by ${fullName}.`,
  keywords: ['William Sepesi blog', 'machine learning blog', 'AI research writing', 'ML engineering posts', 'tech insights'],
  openGraph: {
    title: 'Writing | William [dot] Computer',
    description: `Blog posts and reading notes by ${fullName}`,
    url: `${SITE_URL}/writing`,
    siteName: siteTitle,
    type: 'website',
  },
}

function PostCard(post: Post) {
  const hasCover = post.cover && !post.short

  if (hasCover) {
    return (
      <div className="mb-8 flex flex-row gap-4 items-start">
        <Link href={post.url} className="flex-shrink-0">
          <Image
            src={`/covers/${post.cover}`}
            alt={`Cover for ${post.title}`}
            width={240}
            height={160}
            className="w-[180px] h-[120px] object-cover"
          />
        </Link>
        <div>
          <time dateTime={post.date} className="block text-sm text-slate-600">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h2 className="text-lg">
            <Link href={post.url}>
              <p className="text-black underline hover:font-semibold">{post.title}</p>
            </Link>
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-slate-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link href={post.url}>
          <p className="text-black underline hover:font-semibold">{post.title}</p>
        </Link>
      </h2>
    </div>
  )
}

export default function Writing() {
  const regularPosts = getRegularPosts()
  const shortPosts = getShortPosts()

  return (
    <SiteBase title="Writing" description={`${fullName}'s personal website writing page`}>
      <div className="flex flex-col md:flex-row justify-between mx-[3vw] h-full md:space-x-8">
        <div className="flex flex-col flex-1 min-h-0">
          <h3>Posts</h3>
          <hr />
          <div className="overflow-y-auto">
            {regularPosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          <h3>Reading</h3>
          <hr />
          <div className="overflow-y-auto">
            {shortPosts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
      </div>
    </SiteBase>
  )
}
