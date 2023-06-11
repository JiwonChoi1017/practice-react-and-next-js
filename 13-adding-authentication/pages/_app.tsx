import "@/styles/globals.css";

import { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
