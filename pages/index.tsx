import Head from "next/head";
import Link from "next/link";
import { RetroPhoto } from "@/components/retro-photo";
import SiteBase from "@/components/SiteBase";
import bridge from '../photos/bridge.jpg'
import me from '../photos/me.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <SiteBase title="william [dot] computer">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-1">
            <p className="font-medium text-xl pb-1">Hello. My name is William Sepesi.</p>
            <p className="">
              I&apos;m a machine learning researcher and engineer. I&apos;m graduating with my B.S. from Washington University this spring with a <Link href="/about/courses" className="underline hover:italic">double major in computer science and mathematics</Link>.
            </p>
            <p className="mt-4">
              My interests lie across reinforcement learning (particularly incomplete information), LLMs (particularly local models), mechanistic interpretability and information theory, all both in theory and practice. I&apos;ve <Link href="/about/work" className="underline hover:italic">worked as an ML engineer and researcher</Link> at Microsoft, Square, and a handful of startups on these fields and beyond. I&apos;ve also been the Head Teaching Assistant for a variety of ML courses over the last few years.
            </p>
            <p className="mt-4">
              Outside of ML I enjoy music, travel, biking, contemporary art, and speaking French. You can contact me at <a href="mailto:hello@william.computer" className="underline hover:italic">hello [at] william [dot] computer</a> or <a href="https://twitter.com/robot__fan" className="underline hover:italic">[at] robot__fan</a> on Twitter, or find me on Github <a href="https://github.com/wsepesi" className="underline hover:italic">[at] wsepesi</a>.
            </p>
            {/* TODO: engineering projects? other interests? french, music, etc */}
          </div>
          <div className="flex-1">
             <RetroPhoto src={me} alt={"paris, france. feb 2023"} /> 
          </div>
        </div>
      </SiteBase>
    </>
  )
}