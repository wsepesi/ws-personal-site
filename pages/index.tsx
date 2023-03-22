import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>William [dot] Computer</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen bg-[#efdcb18a]">
        <h2 className="text-xl font-text">Hello</h2>
        <text className='italic text-xs m-5 font-text'>Watch this space</text>
      </div>
    </>
  )
}