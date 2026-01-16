import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Ovo, Prata } from 'next/font/google'

const ovo = Ovo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ovo',
})

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-prata',
})

export const metadata: Metadata = {
  title: {
    default: 'William [dot] Computer',
    template: '%s | William [dot] Computer',
  },
  description: 'William Sepesi - Machine learning researcher and engineer.',
  metadataBase: new URL('https://william.computer'),
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ovo.variable} ${prata.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
