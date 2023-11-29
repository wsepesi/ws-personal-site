import Head from "next/head";
import PrintedPhoto from "@/components/PrintedPhoto";
import SiteBase from "@/components/SiteBase";

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <SiteBase title="Home">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <p className="font-medium text-xl pb-1">Hello. My name is William Sepesi.</p>
            <p className="">
              I&apos;m a ML and software engineer.
            </p><p>
              Work in progress, watch this space.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <PrintedPhoto />
          </div>
        </div>
      </SiteBase>
    </>
  )
}