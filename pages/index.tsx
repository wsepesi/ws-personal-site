import {
  fullName,
  siteTitle,
  SITE_URL
} from "@/lib/content";
import useIsMobile, { lower, lowerAndTrimSpaces } from "@/lib/utils";

import Link from "next/link";
import { RetroPhoto } from "@/components/retro-photo";
import SiteBase from "@/components/SiteBase";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import bridge from '@/photos/bridge.jpg'

export default function Home() {
  const isMobile = useIsMobile(640)
  return (
    <>
      <SEO
        title={siteTitle}
        description={`${fullName} - Machine learning researcher and engineer specializing in reinforcement learning, LLMs, and mechanistic interpretability. Former Microsoft, Square engineer.`}
        url={SITE_URL}
        keywords={['William Sepesi', 'machine learning researcher', 'ML engineer', 'reinforcement learning', 'LLMs', 'mechanistic interpretability', 'Microsoft', 'Square', 'Washington University']}
      />
      <StructuredData type="website" />
      <StructuredData type="person" />
      <SiteBase title={isMobile ? lowerAndTrimSpaces(siteTitle) : lower(siteTitle)}>
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-1">
            <p className="font-medium text-xl pb-1">Hello. My name is William Sepesi.</p>
            <p className="">
              I&apos;m a machine learning researcher and engineer. I graduated from Washington University with a <Link href="/about/courses" className="underline hover:italic">double major in computer science and mathematics</Link>.
            </p>
            <p className="mt-4">
              My interests lie across reinforcement learning, LLMs, and mechanistic interpretability. I&apos;ve <Link href="/about/work" className="underline hover:italic">worked as an ML engineer and researcher</Link> at Microsoft, Square, and a handful of startups in these areas and beyond. During my time at university, I was the Head Teaching Assistant for a variety of ML courses during my undergrad.
            </p>
            {/* <p className="mt-4">
              I also consult on AI, with a focus on bringing my years of research and engineering expertise to help companies succeed in delivering the promises of AI / LLMs.
            </p> */}
            <p className="mt-4">
              Outside of ML I enjoy music, travel, biking, contemporary art, and speaking French. You can contact me at <a href="mailto:hello@william.computer" className="underline hover:italic">hello [at] william [dot] computer</a> or <a href="https://twitter.com/robot__fan" className="underline hover:italic">[at] robot__fan</a> on Twitter, or find me on Github <a href="https://github.com/wsepesi" className="underline hover:italic">[at] wsepesi</a>.
            </p>
          </div>
          <div className="flex-1">
             <RetroPhoto src={bridge} alt="currently in: san francisco, ca" />
          </div>
        </div>
      </SiteBase>
    </>
  )
}