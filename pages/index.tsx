import Head from "next/head";
import PrintedPhoto from "@/components/PrintedPhoto";
import { RetroPhoto } from "@/components/retro-photo";
import SiteBase from "@/components/SiteBase";
import bridge from '../photos/bridge.jpg'

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <SiteBase title="Home">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex-1">
            <p className="font-medium text-xl pb-1">Hello. My name is William Sepesi.</p>
            <p className="">
              I&apos;m a machine learning researcher and engineer. I&apos;m graduating from Washington University this spring with a double major in 
              computer science and mathematics. 
            </p>
            <p className="mt-4">
              My interests lie across reinforcement learning (particularly incomplete information), LLMs (particularly local models), and information theory, both in theory and practice. I&apos;ve worked as an ML engineer 
              and researcher at Microsoft, Square, Wintics and 4giving on these fields and beyond. I&apos;ve also been the Head Teaching Assistant for a variety of ML courses over the last few years.
            </p>
            {/* TODO: engineering projects? other interests? french, music, etc */}
          </div>
          <div className="flex-1">
             <RetroPhoto src={bridge} alt={"previously in: San Francisco"} />
          </div>
        </div>
      </SiteBase>
    </>
  )
}