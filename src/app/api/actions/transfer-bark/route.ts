/**
 * Solana Actions Example
 */

import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    createActionHeaders,
  } from "@solana/actions";
  import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";
  import { DEFAULT_BARK_ADDRESS, DEFAULT_BARK_AMOUNT } from "./const";
  
  // Create the standard headers for this route (including CORS)
  const headers = createActionHeaders();
  
  export const GET = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { toPubkey } = validatedQueryParams(requestUrl);
  
      const baseHref = new URL(
        `/api/actions/transfer-bark?to=${toPubkey.toBase58()}`,
        requestUrl.origin,
      ).toString();
  
      const payload: ActionGetResponse = {
        type: "action",
        title: "Action - Transfer BARK Tokens",
        icon: new URL("/bark.png", requestUrl.origin).toString(),
        description: "Transfer BARK to another Solana wallet",
        label: "Transfer", // This value will be ignored since `links.actions` exists
        links: {
          actions: [
            {
              label: "Send 1.000.000 BARK", // Button text
              href: `${baseHref}&amount=${"1000000"}`,
            },
            {
              label: "Send 5.000.000 BARK", // Button text
              href: `${baseHref}&amount=${"5000000"}`,
            },
            {
              label: "Send 10.000.000 BARK", // Button text
              href: `${baseHref}&amount=${"10000000"}`,
            },
            {
              label: "Send BARK", // Button text
              href: `${baseHref}&amount={amount}`, // This href will have a text input
              parameters: [
                {
                  name: "amount", // Parameter name in the `href` above
                  label: "Enter the amount of BARK to send", // Placeholder of the text input
                  required: true,
                },
              ],
            },
          ],
        },
      };
  
      return new Response(JSON.stringify(payload), {
        headers,
      });
    } catch (err) {
      console.log(err);
      let message = "An unknown error occurred";
      if (typeof err == "string") message = err;
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  // DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
  // THIS WILL ENSURE CORS WORKS FOR BLINKS
  export const OPTIONS = async (req: Request) => {
    return new Response(null, { headers });
  };
  
  export const POST = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { amount, toPubkey } = validatedQueryParams(requestUrl);
  
      const body: ActionPostRequest = await req.json();
  
      // Validate the client-provided input
      let account: PublicKey;
      try {
        account = new PublicKey(body.account);
      } catch (err) {
        return new Response('Invalid "account" provided', {
          status: 400,
          headers,
        });
      }
  
      const connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
      );
  
      // Ensure the receiving account will be rent exempt
      const minimumBalance = await connection.getMinimumBalanceForRentExemption(
        0, // Note: Simple accounts that just store native SOL have `0` bytes of data
      );
      if (amount * LAMPORTS_PER_SOL < minimumBalance) {
        throw `Account may not be rent exempt: ${toPubkey.toBase58()}`;
      }
  
      // Create an instruction to transfer native SOL from one wallet to another
      const transferBarkInstruction = SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      });
  
      // Get the latest blockhash and block height
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
  
      // Create a transaction
      const transaction = new Transaction({
        feePayer: account,
        blockhash,
        lastValidBlockHeight,
      }).add(transferBarkInstruction);
  
      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction,
          message: `Send ${amount} BARK to ${toPubkey.toBase58()}`,
        },
        // Note: No additional signers are needed
        // signers: [],
      });
  
      return new Response(JSON.stringify(payload), {
        headers,
      });
    } catch (err) {
      console.log(err);
      let message = "An unknown error occurred";
      if (typeof err == "string") message = err;
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  // Helper function to validate query parameters
  function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = DEFAULT_BARK_ADDRESS;
    let amount: number = DEFAULT_BARK_AMOUNT;
  
    try {
      if (requestUrl.searchParams.get("to")) {
        toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
      }
    } catch (err) {
      throw "Invalid input query parameter: to";
    }
  
    try {
      if (requestUrl.searchParams.get("amount")) {
        amount = parseFloat(requestUrl.searchParams.get("amount")!);
      }
  
      if (amount <= 0) throw "Amount is too small";
    } catch (err) {
      throw "Invalid input query parameter: amount";
    }
  
    return {
      amount,
      toPubkey,
    };
  }
  