import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom link component to use Next.js Link
    a: ({ href, children, ref, ...props }) => {
      // External links
      if (href?.startsWith('http')) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }
      // Internal links
      return (
        <Link href={href || ''} {...props}>
          {children}
        </Link>
      )
    },
    // Add custom styling for headings, paragraphs, etc. if needed
    h1: ({ children }) => <h1 className="text-3xl font-text font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-text font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-text font-semibold mt-4 mb-2">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-400 pl-6 pr-4 py-3 my-6 bg-slate-50/50 font-text text-slate-700">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Inline code
      if (!className) {
        return (
          <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">
            {children}
          </code>
        )
      }
      // Code blocks
      return <code className={className}>{children}</code>
    },
    pre: ({ children }) => (
      <pre className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">{children}</pre>
    ),
    ...components,
  }
}
