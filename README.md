This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Step 1: Create a private/public key pair

```
bash <(curl -fsSL https://raw.githubusercontent.com/team-plain/generate-rsa-key-script/main/generate_rsa_key_pairs.sh)
```

## Step 2: Create a workspace app

To create a workspace app, log in into the Plain App at [https://app.plain.com](https://app.plain.com/) .

Then select your workspace and then navigate to “Apps” from the top left menu

Once you’ve created your Workspace App, press [+ Add public key] and paste the entire contents of `plain.key.pem.pub` we generated above `(including the ---BEGINS..`

## Step 3: Add private key to get-customer-token.ts

Go to `/pages/api/get-customer-token.ts` and add your private key

```
  const token = jwt.sign(customer, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
```
