import Head from "next/head";
import SiteBase from "@/components/SiteBase";

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <SiteBase title="Home">
        <p className="font-medium text-xl pb-1 text-white">Hello. My name is William.</p>
        <p className="text-white">I&apos;m a ML and software engineer. I&apos;m currently setting this site up, so watch this space.</p>
      </SiteBase>
    </>
  )
}