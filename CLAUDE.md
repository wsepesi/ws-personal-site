# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog built with Next.js 15, TypeScript, and Tailwind CSS. Features MDX blog posts with math rendering (KaTeX) and Bluesky social integration for comments.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture

### App Router Structure
Uses Next.js App Router (migrated from Pages Router). Key routes:
- `app/page.tsx` - Home page
- `app/writing/page.tsx` - Blog listing
- `app/writing/[slug]/page.tsx` - Individual blog posts (SSG via `generateStaticParams`)
- `app/about/` - About pages with nested routes (courses, work)
- `app/actions/` - Server actions for contact form and newsletter subscription

### Content System
- **Blog Posts**: MDX files in `posts/` directory
- **Post Processing**: `lib/posts.ts` handles reading posts with gray-matter for frontmatter parsing
- **MDX Compilation**: Posts are compiled at runtime using `@mdx-js/mdx` with remark-math, remark-gfm, and rehype-katex plugins
- **Frontmatter fields**:
  - `title` (required): Post title
  - `date` (required): Publication date (YYYY-MM-DD format)
  - `short` (required): Boolean - true for reading lists/short posts, false for full articles
  - `bskyurl` (optional): Bluesky post URL to enable comments
  - `cover` (optional): Cover image filename (stored in `public/covers/`)

### Key Components
- `components/SiteBase.tsx` - Main layout wrapper
- `components/bsky-comments.tsx` - Bluesky comments integration (uses @atproto/api)
- `components/subscribe-box.tsx` - Newsletter subscription form
- `components/TableOfContents.tsx` - Auto-generated TOC for long posts
- `components/FootnoteTooltips.tsx` - Tooltip display for footnotes

### Database
PostgreSQL database (via `lib/db.ts`) stores contact form submissions and newsletter subscriptions. Requires `POSTGRES_URL` environment variable.

### Styling
Tailwind CSS with custom font families:
- `font-text` - Ovo (body text)
- `font-title` - Prata (headings)

Fonts loaded via `next/font/google` in `app/layout.tsx`.

### Site Configuration
`lib/content.ts` contains site-wide constants (name, URLs, etc.) for easy customization.
