import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title="William [dot] Computer">
        <link href="https://fonts.googleapis.com/css?family=Ovo&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Prata&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
