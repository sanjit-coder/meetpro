import { instanaInit } from "@/utils/scripts";
import Script from 'next/script';
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>
          MeetPro - The tool you need to monetise your time and knowledge
        </title>

        <meta
          name="description"
          content="The tool you need to monetise your time and knowledge"
          key="desc"
        />
        <link rel="icon" href="/footerIcon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: instanaInit(),
          }}
        />
        <script
          defer
          crossOrigin="anonymous"
          src="https://eum.instana.io/eum.min.js"
        ></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
        <NextScript />
        {/* <Script src='https://scripts.openinapp.com/d8f01b18-90ba-4bcc-b4e5-17377cabc4a8.js' defer crossOrigin="anonymous" onLoad={() => {
          console.log('Script has loaded')
        }}
          onError={() => {
            console.log("error script")
          }}
        /> */}
        {/* <script
          defer
          crossOrigin="anonymous"
          src="`https://scripts.openinapp.com/d8f01b18-90ba-4bcc-b4e5-17377cabc4a8.js"
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
