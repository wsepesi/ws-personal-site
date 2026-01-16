import { Metadata } from 'next'
import {
  fullName,
  siteTitle,
  SITE_URL
} from "@/lib/content"
import { lower, lowerAndTrimSpaces } from "@/lib/utils"

import Link from "next/link"
import { RetroPhoto } from "@/components/retro-photo"
import SiteBase from "@/components/SiteBase"
import bridge from '@/photos/bridge.jpg'

export const metadata: Metadata = {
  title: siteTitle,
  description: `${fullName} - Machine learning researcher and engineer.`,
  keywords: ['William Sepesi', 'machine learning researcher', 'ML engineer', 'reinforcement learning', 'LLMs', 'Microsoft', 'Square', 'Washington University'],
  openGraph: {
    title: siteTitle,
    description: `${fullName} - Machine learning researcher and engineer.`,
    url: SITE_URL,
    siteName: siteTitle,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: `${fullName} - Machine learning researcher and engineer.`,
  },
}

export default function Home() {
  return (
    <SiteBase title={lower(siteTitle)}>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex-1">
          <p className="font-medium text-xl mt-3 pb-2">Hello. My name is William Sepesi.</p>
          <p className="">
            I&apos;m a researcher and engineer. Currently, I&apos;m the Director of AI at a mid-market healthcare software company. I graduated from Washington University with a <Link href="/about/courses" className="underline hover:italic">double major in computer science and mathematics</Link>.
          </p>
          <p className="mt-4">
            My interests lie across reinforcement learning, LLMs, and diffusion. I&apos;ve <Link href="/about/work" className="underline hover:italic">worked as an ML engineer and researcher</Link> at Microsoft, Square, and a handful of startups in these areas and beyond. During my time at university, I was the Head Teaching Assistant for a variety of ML courses.
          </p>
          <p className="mt-4">
            Outside of ML I enjoy music, travel, reading, biking, contemporary art, and speaking French. You can find me at:
          </p>
          <ul className="mt-2 list-disc list-inside">
            <li><a href="mailto:hello@william.computer" className="underline hover:italic">hello [at] william [dot] computer</a></li>
            <li><a href="https://twitter.com/robot__fan" className="underline hover:italic">[at] robot__fan</a> on Twitter</li>
            <li><a href="https://github.com/wsepesi" className="underline hover:italic">[at] wsepesi</a> on Github</li>
          </ul>
          <p className="mt-4">
            Please reach out if you&apos;d like to chat!
          </p>
        </div>
        <div className="flex-1">
           <RetroPhoto src={bridge} alt="currently in: san francisco, ca" />
        </div>
      </div>
    </SiteBase>
  )
}
