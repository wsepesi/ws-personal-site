import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head title="William [dot] Computer">
        <link href="https://fonts.googleapis.com/css?family=Ovo&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Prata&display=swap" rel="stylesheet" />
        <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
                    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
                    crossOrigin="anonymous"
                />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
