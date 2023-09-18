// contentlayer.config.js

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    short: {
      type: 'boolean',
      description: 'Is short-style post?',
      required: true,
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath],
  }
})