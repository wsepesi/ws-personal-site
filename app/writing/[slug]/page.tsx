import { format, parseISO } from 'date-fns'
import { getPostSlugs, getPostBySlug } from '@/lib/posts'
import SiteBase from '@/components/SiteBase'
import { CommentSection } from '@/components/bsky-comments'
import { SubscribeBox } from '@/components/subscribe-box'
import { FootnoteTooltips } from '@/components/FootnoteTooltips'
import { SITE_URL } from '@/lib/content'
import { Metadata } from 'next'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import Link from 'next/link'
import { extractTableOfContents } from '@/lib/toc'
import { TableOfContents } from '@/components/TableOfContents'
import Image from 'next/image'
import React from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const description = post.content.slice(0, 160).replace(/[#*_`]/g, '').trim() + '...'

  return {
    title: post.title,
    description,
    keywords: ['William Sepesi', 'blog', post.title.toLowerCase(), 'machine learning', 'AI'],
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}${post.url}`,
      type: 'article',
      publishedTime: post.date,
      ...(post.cover && {
        images: [{ url: `${SITE_URL}/covers/${post.cover}` }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      ...(post.cover && {
        images: [`${SITE_URL}/covers/${post.cover}`],
      }),
    },
  }
}

// Custom MDX components
const components = {
  a: ({ href, children, ...props }: any) => {
    if (href?.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:italic" {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href || ''} className="underline hover:italic" {...props}>
        {children}
      </Link>
    )
  },
  h1: ({ children, id }: any) => <h1 id={id} className="text-3xl font-text font-bold mt-8 mb-4">{children}</h1>,
  h2: ({ children, id }: any) => <h2 id={id} className="text-xl font-text font-bold mt-5 mb-2">{children}</h2>,
  h3: ({ children, id }: any) => <h3 id={id} className="text-lg font-text font-semibold mt-1 mb-1">{children}</h3>,
  p: ({ children }: any) => <p className="mb-2 leading-normal">{children}</p>,
  ul: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
  blockquote: ({ children }: any) => {
    let quoteContent = children
    let attribution = null

    // Check if blockquote has multiple paragraph children
    const childArray = React.Children.toArray(children)

    if (childArray.length > 1) {
      // Multiple paragraphs - check if last one is attribution
      const lastChild = childArray[childArray.length - 1]

      if (lastChild && typeof lastChild === 'object' && 'props' in lastChild) {
        const lastParagraphText = lastChild.props.children
        const text = typeof lastParagraphText === 'string'
          ? lastParagraphText
          : (Array.isArray(lastParagraphText)
              ? lastParagraphText.join('')
              : '')

        // Check if this paragraph is an attribution line
        if (text.trim().startsWith('—') || text.trim().startsWith('–')) {
          attribution = text.trim().replace(/^[—–]\s*/, '')
          quoteContent = childArray.slice(0, -1)
        }
      }
    }

    // Remove bottom margin from last paragraph in quote content
    const contentArray = React.Children.toArray(quoteContent)
    if (contentArray.length > 0) {
      const lastContentChild = contentArray[contentArray.length - 1]
      if (lastContentChild && typeof lastContentChild === 'object' && 'props' in lastContentChild) {
        const modifiedChildren = [...contentArray]
        modifiedChildren[modifiedChildren.length - 1] = React.cloneElement(
          lastContentChild as React.ReactElement,
          { className: 'mb-0 leading-relaxed' }
        )
        quoteContent = modifiedChildren
      }
    }

    return (
      <blockquote className="border-l-4 border-stone-400 pl-6 pr-4 pt-3 pb-1 my-6 bg-stone-100/30 font-text text-black">
        {quoteContent}
        {attribution && (
          <cite className="block text-right italic text-sm mt-3 text-gray-700">
            — {attribution}
          </cite>
        )}
      </blockquote>
    )
  },
  code: ({ children, className }: any) => {
    if (!className) {
      return (
        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
          {children}
        </code>
      )
    }
    return <code className={className}>{children}</code>
  },
  pre: ({ children }: any) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">{children}</pre>
  ),
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  // Extract TOC for regular posts only
  const tocItems = !post.short ? extractTableOfContents(post.content) : []

  // Compile MDX to JavaScript
  const compiled = await compile(post.content, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeKatex],
  })

  // Run the compiled code to get the MDX component
  const { default: MDXContent } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  } as any)

  return (
    <SiteBase title={post.title} showScrollProgress={!post.short}>
      <article>
        <time dateTime={post.date} className="text-sm text-slate-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        {tocItems.length > 0 && (
          <div className="mt-2 mb-4 grid md:grid-cols-2 gap-4">
            {post.cover && (
              <div className="relative h-full min-h-0 overflow-hidden">
                <Image
                  src={`/covers/${post.cover}`}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover object-center"
                  quality={100}
                  priority
                />
              </div>
            )}
            <div className={!post.cover ? "md:col-span-2" : ""}>
              <TableOfContents items={tocItems} />
            </div>
          </div>
        )}
        <FootnoteTooltips>
          <MDXContent components={components} />
        </FootnoteTooltips>
        {!post.short && <SubscribeBox />}
        {post.bskyurl && <CommentSection url={post.bskyurl} />}
      </article>
    </SiteBase>
  )
}
