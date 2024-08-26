/**
 * Solana Actions Example - Staking SOL
 */

import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import {
  Authorized,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
} from "@solana/web3.js";
import { DEFAULT_STAKE_AMOUNT, DEFAULT_VALIDATOR_VOTE_PUBKEY } from "./const";

// Create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { validator } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/stake?validator=${validator.toBase58()}`,
      requestUrl.origin,
    ).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "Actions Example - Staking SOL",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: `Stake your SOL to the ${validator.toBase58()} validator to secure the Solana network`,
      label: "Stake your SOL", // This value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: "Stake 1 SOL", // Button text
            href: `${baseHref}&amount=${"1"}`, // Amount in SOL
          },
          {
            label: "Stake 5 SOL", // Button text
            href: `${baseHref}&amount=${"5"}`, // Amount in SOL
          },
          {
            label: "Stake 10 SOL", // Button text
            href: `${baseHref}&amount=${"10"}`, // Amount in SOL
          },
          {
            label: "Stake SOL", // Button text
            href: `${baseHref}&amount={amount}`, // This href will have a text input
            parameters: [
              {
                name: "amount", // Parameter name in the `href` above
                label: "Enter the amount of SOL to stake", // Placeholder of the text input
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
    const { amount, validator } = validatedQueryParams(requestUrl);

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
      process.env.SOLANA_RPC || clusterApiUrl("devnet"),
    );

    const minStake = await connection.getStakeMinimumDelegation();
    if (amount < minStake.value / LAMPORTS_PER_SOL) {
      console.error("Minimum stake:", minStake);
      throw new Error(`The minimum stake amount is ${minStake.value / LAMPORTS_PER_SOL} SOL`);
    }

    const stakeKeypair = Keypair.generate();

    const transaction = new Transaction().add(
      StakeProgram.createAccount({
        stakePubkey: stakeKeypair.publicKey,
        authorized: new Authorized(account, account),
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        // Note: You can time lock the stake account with Lockup if needed
        // lockup: new Lockup(0, 0, account),
      }),
      StakeProgram.delegate({
        stakePubkey: stakeKeypair.publicKey,
        authorizedPubkey: account,
        votePubkey: validator,
      }),
    );

    // Set the end user as the fee payer
    transaction.feePayer = account;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Stake ${amount} SOL to validator ${validator.toBase58()}`,
      },
      signers: [stakeKeypair],
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
  let validator: PublicKey = DEFAULT_VALIDATOR_VOTE_PUBKEY;
  let amount: number = DEFAULT_STAKE_AMOUNT;

  try {
    if (requestUrl.searchParams.get("validator")) {
      validator = new PublicKey(requestUrl.searchParams.get("validator")!);
    }
  } catch (err) {
    throw new Error("Invalid input query parameter: validator");
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }
    if (amount <= 0) throw new Error("Amount is too small");
  } catch (err) {
    throw new Error("Invalid input query parameter: amount");
  }

  return {
    amount,
    validator,
  };
}
