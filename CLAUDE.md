# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with Next.js, TypeScript, and Tailwind CSS. The site features a content management system powered by Contentlayer for MDX blog posts and includes Bluesky social integration for comments.

## Commands

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Package Manager
This project uses `pnpm` as the package manager (evidenced by `pnpm-lock.yaml`).

## Architecture

### Content Management
- **Contentlayer**: Configured in `contentlayer.config.js` to process MDX files from the `posts/` directory
- **Blog Posts**: MDX files in `posts/` with frontmatter fields:
  - `title` (required): Post title
  - `date` (required): Publication date
  - `short` (required): Boolean for short-style posts
  - `bskyurl` (optional): Bluesky URL for comments integration
- **Content Processing**: Uses remark-math, remark-gfm, and rehype-katex plugins for math and GitHub-flavored markdown

### Site Structure
- **Pages Router**: Uses Next.js pages directory structure
- **Dynamic Routes**: `/writing/[slug].tsx` for individual blog posts
- **Static Generation**: Posts use `getStaticPaths` and `getStaticProps` for SSG

### Key Components
- **SiteBase**: Main layout wrapper component
- **RetroPhoto**: Image component with retro styling
- **CommentSection**: Bluesky comments integration (requires `bskyurl` in post frontmatter)

### Styling
- **Tailwind CSS**: Custom font families defined in config:
  - `font-text`: "Ovo" serif
  - `font-title`: "Prata" serif
  - `font-marker`: "Permanent Marker" cursive
  - `font-lightmarker`: "Covered By Your Grace" normal
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts

### Content Configuration
Site content is centralized in `lib/content.ts` including:
- Personal information (name, site title)
- Site URLs for sitemap generation
- Template flag for reusability

### TypeScript Configuration
- Strict TypeScript setup with path aliases (`@/` for root)
- Custom type definitions in `types/images.d.ts`

## Development Notes

- Blog posts are automatically processed by Contentlayer and available via `contentlayer/generated`
- The site supports mathematical notation rendering via KaTeX
- Images are handled through Next.js optimization with custom typing
- Comment system integrates with Bluesky when `bskyurl` is provided in post frontmatter