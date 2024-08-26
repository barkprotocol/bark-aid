/**
 * Solana Wallet Example
 */

import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    createActionHeaders,
  } from "@solana/actions";
  import {
    clusterApiUrl,
    Connection,
    PublicKey,
  } from "@solana/web3.js";
  import { DEFAULT_WALLET_ADDRESS } from "./const";
  
  // Create standard headers for this route (including CORS)
  const headers = createActionHeaders();
  
  export const GET = async (req: Request) => {
    try {
      const requestUrl = new URL(req.url);
      const { walletPubkey } = validatedQueryParams(requestUrl);
  
      const connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
      );
  
      const balance = await connection.getBalance(walletPubkey);
  
      const payload: ActionGetResponse = {
        type: "action",
        title: "Action - Wallet Details",
        icon: new URL("/wallet.png", requestUrl.origin).toString(),
        description: `Details for wallet ${walletPubkey.toBase58()}`,
        label: "Wallet Details",
        links: {
          actions: [
            {
              label: `View Balance`,
              href: `${requestUrl.origin}/api/actions/wallet?wallet=${walletPubkey.toBase58()}`,
            },
          ],
        },
        details: {
          balance: balance / 1e9, // Convert lamports to SOL
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
  
  // POST method can be used to add additional functionality if needed
  export const POST = async (req: Request) => {
    // This endpoint is not implemented yet; add functionality if needed
    return new Response("POST method is not implemented", { status: 501, headers });
  };
  
  // Helper function to validate query parameters
  function validatedQueryParams(requestUrl: URL) {
    let walletPubkey: PublicKey = DEFAULT_WALLET_ADDRESS;
  
    try {
      if (requestUrl.searchParams.get("wallet")) {
        walletPubkey = new PublicKey(requestUrl.searchParams.get("wallet")!);
      }
    } catch (err) {
      throw "Invalid input query parameter: wallet";
    }
  
    return {
      walletPubkey,
    };
  }
  