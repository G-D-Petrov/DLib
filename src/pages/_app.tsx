import { type AppType } from "next/app";
import { ClerkProvider } from '@clerk/nextjs';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} >
      <Head>
        <title>DLib</title>
        <meta name="description" content="Application for managing a library in different locations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
