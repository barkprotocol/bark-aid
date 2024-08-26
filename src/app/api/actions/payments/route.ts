/**
 * Solana Payments Example
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
  import { DEFAULT_PAYMENT_ADDRESS, DEFAULT_PAYMENT_AMOUNT } from "./const";
  
  // Create standard headers for this route (including CORS)
  const headers = createActionHeaders();
  
  export const GET = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { toPubkey } = validatedQueryParams(requestUrl);
  
      const baseHref = new URL(
        `/api/actions/transfer-sol?to=${toPubkey.toBase58()}`,
        requestUrl.origin
      ).toString();
  
      const payload: ActionGetResponse = {
        type: "action",
        title: "Action - Transfer SOL",
        icon: new URL("/sol.png", requestUrl.origin).toString(),
        description: "Transfer SOL to another Solana wallet",
        label: "Transfer", // This value will be ignored since `links.actions` exists
        links: {
          actions: [
            {
              label: "Send 0.1 SOL", // Button text
              href: `${baseHref}&amount=${"0.1"}`, // 0.1 SOL
            },
            {
              label: "Send 0.5 SOL", // Button text
              href: `${baseHref}&amount=${"0.5"}`, // 0.5 SOL
            },
            {
              label: "Send 1.0 SOL", // Button text
              href: `${baseHref}&amount=${"1.0"}`, // 1.0 SOL
            },
            {
              label: "Send SOL", // Button text
              href: `${baseHref}&amount={amount}`, // This href will have a text input
              parameters: [
                {
                  name: "amount", // Parameter name in the `href` above
                  label: "Enter the amount of SOL to send", // Placeholder of the text input
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
      console.error(err);
      const message = typeof err === "string" ? err : "An unknown error occurred";
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  // Include the OPTIONS HTTP method for CORS
  export const OPTIONS = async () => {
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
      } catch {
        return new Response('Invalid "account" provided', {
          status: 400,
          headers,
        });
      }
  
      const connection = new Connection(
        process.env.SOLANA_RPC || clusterApiUrl("devnet")
      );
  
      // Ensure the receiving account will be rent exempt
      const minimumBalance = await connection.getMinimumBalanceForRentExemption(0); // Simple accounts that just store native SOL have `0` bytes of data
      if (amount * LAMPORTS_PER_SOL < minimumBalance) {
        throw new Error(`Account may not be rent exempt: ${toPubkey.toBase58()}`);
      }
  
      // Create an instruction to transfer SOL from one wallet to another
      const transferSolInstruction = SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      });
  
      // Get the latest blockhash and block height
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  
      // Create a transaction
      const transaction = new Transaction({
        feePayer: account,
        blockhash,
        lastValidBlockHeight,
      }).add(transferSolInstruction);
  
      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction,
          message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
        },
        // Note: No additional signers are needed
        // signers: [],
      });
  
      return new Response(JSON.stringify(payload), {
        headers,
      });
    } catch (err) {
      console.error(err);
      const message = typeof err === "string" ? err : "An unknown error occurred";
      return new Response(message, {
        status: 400,
        headers,
      });
    }
  };
  
  // Helper function to validate query parameters
  function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = DEFAULT_PAYMENT_ADDRESS;
    let amount: number = DEFAULT_PAYMENT_AMOUNT;
  
    try {
      if (requestUrl.searchParams.get("to")) {
        toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
      }
    } catch {
      throw new Error("Invalid input query parameter: to");
    }
  
    try {
      if (requestUrl.searchParams.get("amount")) {
        amount = parseFloat(requestUrl.searchParams.get("amount")!);
      }
      if (amount <= 0) throw new Error("Amount is too small");
    } catch {
      throw new Error("Invalid input query parameter: amount");
    }
  
    return {
      amount,
      toPubkey,
    };
  }
  