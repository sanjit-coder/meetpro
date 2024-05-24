import "semantic-ui-css/semantic.min.css";
import "../styles/scss/main.scss";
import { Provider } from "react-redux";
import { store } from "../store/index";
import ReactHotToast from "@/components/ReactHotToast";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GTM_ID } from "@/utils/constants";
import TagManager from "react-gtm-module";

import Script from "next/script";

const tagManagerArgs = {
  gtmId: GTM_ID,
};

function App({ Component, pageProps }) {
  const router = useRouter();
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  const endUserRoutes = [
    "/",
    "/[...publish]",
    "/authorization",
    "/bookSlot/[id]",
    "/bookSlot/failure",
    "/bookSlot/orderstatus",
    "/bookSlot/pending",
    "/bookSlot/success",
    "/feedback",
    "/listing/astrologers",
  ];

  useEffect(() => {
    if (router?.isReady) {
      const pathname = router?.pathname;
      if (typeof window !== undefined) {
        const token = window.localStorage.getItem("token");

        if (token === undefined || token === null) {
          if (endUserRoutes.includes(pathname)) {
            // DO NOTHING
          } else {
            router.push("/");
          }
        }
      }
    }
  }, [router]);
  return (
    <>
      <Script
        src="https://scripts.openinapp.com/d8f01b18-90ba-4bcc-b4e5-17377cabc4a8.js"
        defer
        crossOrigin="anonymous"
        onLoad={() => {
          console.log("Script has loaded");
        }}
        onError={() => {
          console.log("error script");
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-CP5Q66JWJ5`}
      />

      <Script strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-CP5Q66JWJ5', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <Provider store={store}>
        <Component {...pageProps}></Component>
        {hasWindow && <ReactHotToast />}
      </Provider>
    </>
  );
}

export default App;
