import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

function getPrivateKey(): string {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("The environment variable `PRIVATE_KEY` is not set");
  }

  return process.env.PRIVATE_KEY;
}

type Customer = {
  // The full name of the customer
  fullName: string;

  // Typically the first name of the customer
  shortName: string;

  email: {
    // Their email address
    email: string;

    //  Whether you can confirm the user has access to their email address,
    //  for example they have already verified their email on your app or website.
    //  If this is false, then the customer will have to verify their email
    //  with Plain before they can chat. This verification is handled
    //  in the react chat UI package.
    isVerified: boolean;
  };

  // Your customer’s id in your own systems. If provided, this is what is used to identify
  // customers. If Plain receives a customer with the same `externalId` as one we’ve seen before,
  // we’ll update any details that have changed. If not, we’ll create a new customer.
  externalId: string;
};

type Data = {
  customerJwt: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Depending on how your back-end works this is where you would
  // have to fetch the current customer's details.
  const customer: Customer = {
    fullName: "Grace Hopper",
    shortName: "Grace",
    email: {
      email: "grace.hopper@example.com",
      isVerified: false,
    },
    externalId: "your_id",
  };

  // Using the above customer detiails you then sign a JWT
  // using your private key. This ensures Plain can trust
  // the customer's details when we receive them.
  const token = jwt.sign(customer, getPrivateKey(), {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  res.status(200).json({ customerJwt: token });
}
