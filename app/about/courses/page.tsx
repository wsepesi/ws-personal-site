import { Metadata } from 'next'
import SiteBase from "@/components/SiteBase"
import { fullName, SITE_URL } from "@/lib/content"
import CoursesContent from './courses-content'

export const metadata: Metadata = {
  title: 'Coursework',
  description: `${fullName}'s academic coursework at Washington University - computer science and mathematics double major.`,
  keywords: ['William Sepesi education', 'Washington University coursework', 'computer science major', 'mathematics major', 'machine learning courses', 'algorithms', 'real analysis'],
  openGraph: {
    title: 'Coursework | William [dot] Computer',
    description: `${fullName}'s academic coursework.`,
    url: `${SITE_URL}/about/courses`,
  },
}

export default function Courses() {
  return (
    <SiteBase title="Coursework" description={`${fullName}'s personal website coursework page.`}>
      <CoursesContent />
    </SiteBase>
  )
}
