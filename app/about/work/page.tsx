import { Metadata } from 'next'
import SiteBase from "@/components/SiteBase"
import { fullName, SITE_URL } from "@/lib/content"
import WorkContent from './work-content'

export const metadata: Metadata = {
  title: 'Work Experience',
  description: `${fullName}'s professional experience.`,
  keywords: ['William Sepesi work experience', 'Microsoft ML engineer', 'Square software engineer', 'Therap Services AI', 'ML engineering career', 'AI research positions'],
  openGraph: {
    title: 'Work Experience | William [dot] Computer',
    description: `${fullName}'s professional experience.`,
    url: `${SITE_URL}/about/work`,
  },
}

export default function Work() {
  return (
    <SiteBase title="Work" description={`${fullName}'s personal website work history page.`}>
      <WorkContent />
    </SiteBase>
  )
}
