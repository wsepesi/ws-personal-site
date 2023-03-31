import Head from "next/head";
import SiteBase from "@/components/SiteBase";

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <SiteBase title="Home">
        <p className="font-medium text-xl pb-1">Hello. My name is William.</p>
        <p className="">
          I&apos;m a ML and software engineer. Work in progress, watch this space.
        </p>
      </SiteBase>
    </>
  )
}