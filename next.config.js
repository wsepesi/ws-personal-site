const createMDX = require('@next/mdx')
const remarkMath = require('remark-math')
const remarkGfm = require('remark-gfm')
const rehypeKatex = require('rehype-katex')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
  },
})

module.exports = withMDX(nextConfig)