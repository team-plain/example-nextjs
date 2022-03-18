import React from "react";
import { PlainProvider } from "@team-plain/react-chat-ui";
import "../styles/stylesheet.css";
import type { AppProps } from "next/app";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import jwt from "jsonwebtoken";

function privateKeyNotDefined(): string {
  throw new Error("KEY not defined");
}

// The customer in the JWT has the following fields:

type Email = {
  // Their email address
  email: string;

  //  Whether you can confirm the user has access to their email address,
  //  for example they have already verified their email on your app or website.
  //  If this is false, then the customer will have to verify their email
  //  with Plain before they can chat. This verification is handled
  //  in the react chat UI package.
  isVerified: boolean;
};

type Customer = {
  // The full name of the customer
  fullName: string;

  // Typically the first name of the customer
  shortName: string;

  // Type Email - See the type above
  email: Email;

  // Your customer’s id in your own systems. If provided, this is what is used to identify
  // customers. If Plain receives a customer with the same `externalId` as one we’ve seen before,
  // we’ll update any details that have changed. If not, we’ll create a new customer.
  externalId: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // The JWT must include a customer with the following form. See above for more details on the form.
  const customer: Customer = {
    fullName: "Garnett Hermann",
    shortName: "Garnett",
    email: {
      email: "garnett.hermann@aol.com",
      isVerified: false,
    },
    externalId: "your_id",
  };

  const privateKey = process.env.KEY || privateKeyNotDefined();

  // The JWT must also be signed with the private key was created when generating the RSA key pair.
  const token = jwt.sign(customer, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  return {
    props: {
      customerToken: token,
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
      // In this example we 've exposed via server side props
      customerToken={customerToken}
    >
      <Component {...pageProps} />
    </PlainProvider>
  );
}

export default MyApp;
