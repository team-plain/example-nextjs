import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * You need to provide your own private key that you created
 */
function privateKeyNotDefined(): string {
  throw new Error("NEXT_PUBLIC_PRIVATE_KEY key not defined");
}

const privateKeyWithNewLines = process.env.NEXT_PUBLIC_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/gm, "\n")
  : null;
const PRIVATE_KEY = privateKeyWithNewLines || privateKeyNotDefined();

/**
   * 
 The customer in the JWT has the following fields:
 
 - `fullName` (string): The full name of the customer.
 
 - `shortName` (string, optional): Typically the first name of the customer
 
 - `email`:
 - `email` (string): Their email address
 - `isVerified` (boolean):  Whether you can confirm the user has access to their email address, 
                            for example they have already verified their email on your app or website. 
                            If this is false, then the customer will have to verify their email 
                            with Plain before they can chat. This verification is handled 
                            in the react chat UI package.
 
 - `externalId` (string): Your customer’s id in your own systems. If provided, this is what is used to identify 
                          customers. If Plain receives a customer with the same `externalId` as one we’ve seen before, 
                          we’ll update any details that have changed. If not, we’ll create a new customer.
 */

type Email = {
  email: string;
  isVerified: boolean;
};

type Customer = {
  fullName: string;
  shortName: string;
  email: Email;
  externalId: string;
};

type Data = {
  customerToken: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

  // The JWT must also be signed with the private key was created when generating the RSA key pair.
  const token = jwt.sign(customer, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  res.status(200).json({ customerToken: token });
}
