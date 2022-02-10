# Plain NextJS Example

This is an example of a NextJS project using the React Chat UI from Plain.com.

![Plain React Chat UI](/public/chat.gif)

<br /> <br />
There are a few steps you need to do in order for the chat to work. Follow the guide below:
<br /> <br /> <br />

## Step 1: 🔐 Create a private/public key pair

For greater security Plain uses an RSA key pair to verify that all customer details you provide are genuine. The private key should never be shared with us.

To make it easy to generate a private + public key you can run this script.

```
bash <(curl -fsSL https://raw.githubusercontent.com/team-plain/generate-rsa-key-script/main/generate_rsa_key_pairs.sh)
```

<br /> <br />

## Step 2: 🖥 Create a workspace app

To create a workspace app, log in into the Plain App at [https://app.plain.com](https://app.plain.com/) .

Then select your workspace and then navigate to “Apps” from the top left menu

Once you’ve created your Workspace App, press [+ Add public key] and paste the entire contents of `plain.key.pem.pub` we generated above `(including the ---BEGINS..`

<br /> <br />

## Step 3: 📦 Install packages

Install packages

```bash
npm install
```

<br /> <br />

## Step 4: 🔑 Add your appKey

The app key is a unique ID that Plain uses to know which workspace app you are setting up chat for.

To find the appKey go to the workspace app you created in Step 2 and copy it. It should look something like: `appKey_uk_01FTGG89Q8N0HEN3572CRN0F2T`

Add it to the `PlainProvider` here [/pages/\_app.ts](/pages/_app.ts)

```
<PlainProvider appKey="ADD_YOUR_APP_KEY_HERE" getCustomerToken={getCustomerToken} >
```

<br /> <br />

## Step 5: 🏃‍♀️ Run the example!

We read the private key from a variable we export on the computer. There are lots of other ways to read the private key.
If you did not change the name or path of the private and public key you can use this command to run the development server

```
export KEY=$(cat ./plain.key.pem) && npm run dev
```

If you did change the name or path you need to insert that like the example below:

```
export KEY=$(cat path-to/your-key.key.pem) && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You should now see the React Chat UI and be able to chat to your workspace at [https://app.plain.com](https://app.plain.com/)

<br /> <br />

## Optional: ⚙️

If you wish to read the private key differently (e.g. from an .env.local file) you need to add the private key in [/pages/api/get-customer-token.ts](/pages/api/get-customer-token.ts).
Change `process.env.PRIVATEKEY` to where you are getting your private key from.

```
  const privateKey = process.env.KEY || privateKeyNotDefined();

  const token = jwt.sign(customer, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
```
