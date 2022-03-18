import React from "react";
import { PlainProvider } from "@team-plain/react-chat-ui";
import "../styles/stylesheet.css";
import type { AppProps } from "next/app";
import getCustomerToken from "../data/get-CustomerToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      customerToken: getCustomerToken(),
    },
  };
};

function MyApp({
  Component,
  pageProps,
  customerToken,
}: AppProps & InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PlainProvider
      // You get this from the workspace you've created under settings -> app at app.plain.com
      appKey="appKey_uk_01FVCA9P14STJM1YCQ0QVBW92N"
      // string | null
      // It's up to you how you want to expose the customer token to the frontend
      // In this example we 've exposed via serverside props
      customerToken={customerToken}
    >
      <Component {...pageProps} />
    </PlainProvider>
  );
}

export default MyApp;
