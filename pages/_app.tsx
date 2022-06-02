import type {AppProps} from "next/app";

import {SessionProvider} from "next-auth/react";
import {AnimatePresence} from "framer-motion";
import {SWRConfig} from "swr";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {AuthProvider, CartProvider, UiProvider} from "../context";
import "../styles/globals.css";

function MyApp({Component, pageProps, router}: AppProps) {
  const url = router.asPath;

  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""}}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <UiProvider>
            <AuthProvider>
              <CartProvider>
                <AnimatePresence exitBeforeEnter initial={false}>
                  <Component {...pageProps} key={url} />;
                </AnimatePresence>
              </CartProvider>
            </AuthProvider>
          </UiProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
