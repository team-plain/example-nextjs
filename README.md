# Plain NextJS Example

This is an example of a NextJS project using the React Chat UI with [Plain](https://plain.com).

<img src="/public/chat.png" width="600" />


In order to run this example, you will need an account with Plain. You can sign up at [plain.com](https://plain.com).

If you already have an account, we recommend you to read
our [chat setup guide](https://docs.plain.com/support-channels/chat/overview) and then follow the steps below!

<br />

## Step 1: 📦 Clone & install this example

After cloning this repository, run this to install dependencies

```bash
npm install
```

<br />

## Step 2: 🔐 Create a private/public key pair

For greater security Plain uses an RSA key pair to verify that all customer details you provide are genuine. The private
key should never be shared with us.

From within this repo you can run this script to generate a public and private key pair:

```
bash <(curl -fsSL https://raw.githubusercontent.com/team-plain/generate-rsa-key-script/main/generate_rsa_key_pairs.sh)
```

<br />

## Step 3: 🖥 Create a workspace app

To create a workspace app, log in into the Plain App at [https://app.plain.com](https://app.plain.com/) .

Then select your workspace and then navigate to “Apps” from the top left menu

Once you’ve created your Workspace App, press [+ Add public key] and paste the entire contents of `plain.key.pem.pub` we
generated above `(including the ---BEGINS..`

<br />

## Step 4: 🔑 Add your appKey

The app key is the unique ID for your workspace app. You need it to instruct the Chat UI which workspace app (and which
corresponding workspace) it should communicate with.

To find the appKey go to the workspace app you created in Step 2 and copy it. It should look something
like: `appKey_uk_01FTGG89Q8N0HEN3572CRN0F2T`

Run this command to create a `.env.local.` containing your app key. Replace `appKey_XXXX` with your appKey.

```
echo -e "NEXT_PUBLIC_APP_KEY=appKey_XXXX" >> .env.local
```

<br />

## Step 5: 🏃‍♀️ Run the example!

This example reads the private key from your environment but you can naturally do this in a few different ways depending
on how you manage secrets.

If you did not change the name or path of the private and public key in Step 1 you can use this command to run the
development server:

```
export PRIVATE_KEY=$(cat ./plain.key.pem) && npm run dev
```

If you did change the name or path you need to insert that like the example below:

```
export PRIVATE_KEY=$(cat path-to/your-key.key.pem) && npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result. You should now see the React
Chat UI and be able to chat to your workspace at [https://app.plain.com](https://app.plain.com/)


----

Any questions? Email help@plain.com or open an issue!
