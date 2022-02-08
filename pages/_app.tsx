import React from "react";
import { PlainProvider } from "@team-plain/react-chat-ui";
import "../styles/stylesheet.css";
import type { AppProps } from "next/app";

function getAppKey(): string {
  if (!process.env.NEXT_PUBLIC_APP_KEY) {
    throw new Error("App Key not defined");
  }

  return process.env.NEXT_PUBLIC_APP_KEY;
}

// Function that fetches the signed JWT token
async function getCustomerToken() {
  return fetch("/api/get-customer-token")
    .then((res) => res.json())
    .then((res) => res.customerToken);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlainProvider
      // You get this from the workspace you've created under settings -> app at app.plain.com
      appKey={getAppKey()}
      // It's up to you how you want to expose the customer token to the frontend
      // In this example we 've exposed via an API
      getCustomerToken={getCustomerToken}
    >
      <Component {...pageProps} />
    </PlainProvider>
  );
}

export default MyApp;
