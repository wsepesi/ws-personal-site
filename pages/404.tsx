import Link from 'next/link'
import SiteBase from '@/components/SiteBase'
import SEO from '@/components/SEO'
import { fullName, SITE_URL } from '@/lib/content'

export default function Custom404() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist on William Sepesi's website."
        url={`${SITE_URL}/404`}
        keywords={['404', 'page not found', 'William Sepesi']}
      />
      <SiteBase title="Page Not Found">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="space-y-4">
            <div>
              <Link
                href="/"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Go Home
              </Link>
            </div>

            <div className="text-gray-500">
              <p>Or try one of these pages:</p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/about" className="underline hover:italic">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/writing" className="underline hover:italic">
                    Writing
                  </Link>
                </li>
                <li>
                  <Link href="/about/work" className="underline hover:italic">
                    Work Experience
                  </Link>
                </li>
                <li>
                  <Link href="/about/courses" className="underline hover:italic">
                    Coursework
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SiteBase>
    </>
  )
}