const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

// Plugins are referenced by name so the options stay serializable for Turbopack
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-math', 'remark-gfm'],
    rehypePlugins: ['rehype-katex'],
  },
})

module.exports = withMDX(nextConfig)
