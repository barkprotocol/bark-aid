/**
 * Solana Actions Example
 */

import {
  ActionPostResponse,
  createPostResponse,
  MEMO_PROGRAM_ID,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

// Create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    type: "action",
    title: "Actions Example - Simple On-chain Memo",
    icon: new URL("/solana_devs.jpg", new URL(req.url).origin).toString(),
    description: "Send a message on-chain using a Memo",
    label: "Send Memo",
  };

  return new Response(JSON.stringify(payload), {
    headers,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => {
  return new Response(null, { headers });
};

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();

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
      process.env.SOLANA_RPC || clusterApiUrl("devnet"),
    );

    const transaction = new Transaction().add(
      // Note: `createPostResponse` requires at least 1 non-memo instruction
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000, // Adjust if needed
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple memo message", "utf8"),
        keys: [], // No accounts required for Memo Program
      }),
    );

    // Set the end user as the fee payer
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Post this memo on-chain",
      },
      // No additional signers required for this transaction
      // signers: [],
    });

    return new Response(JSON.stringify(payload), {
      headers,
    });
  } catch (err) {
    console.error("An error occurred:", err);
    return new Response("An unknown error occurred", {
      status: 400,
      headers,
    });
  }
};
