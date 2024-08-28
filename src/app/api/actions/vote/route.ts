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
import { DEFAULT_VALIDATOR_VOTE_PUBKEY, DEFAULT_VOTE_AMOUNT } from "./const";

// Create standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { validatorPubkey } = validateQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/vote?validator=${validatorPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "Action - Vote for Validator",
      icon: new URL("/vote.png", requestUrl.origin).toString(),
      description: "Governance vote for a validator on the Solana network",
      label: "Vote",
      links: {
        actions: [
          {
            label: "Vote 500 BARK",
            href: `${baseHref}&amount=${"500000000"}`, // 500 BARK in lamports
          },
          {
            label: "Vote 1,000 BARK",
            href: `${baseHref}&amount=${"1000000000"}`, // 1,000 BARK in lamports
          },
          {
            label: "Vote 1,500 BARK",
            href: `${baseHref}&amount=${"1500000000"}`, // 1,500 BARK in lamports
          },
          {
            label: "Vote BARK",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of BARK tokens to vote",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

// Include the OPTIONS HTTP method for CORS
export const OPTIONS = async () => new Response(null, { headers });

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, validatorPubkey } = validateQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();
    const account = validateAccount(body.account);

    const connection = new Connection(process.env.SOLANA_RPC || clusterApiUrl("devnet"));

    // Ensure the receiving account is rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw new Error(`Account may not be rent exempt: ${validatorPubkey.toBase58()}`);
    }

    // Create an instruction to vote for the validator
    const voteInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: validatorPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // Get the latest blockhash and block height
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Create a transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(voteInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Vote ${amount} BARK to ${validatorPubkey.toBase58()}`,
      },
      // No additional signers are needed
    });

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "An unknown error occurred";
    return new Response(message, { status: 400, headers });
  }
};

// Helper function to validate query parameters
function validateQueryParams(requestUrl: URL) {
  let validatorPubkey: PublicKey = DEFAULT_VALIDATOR_VOTE_PUBKEY;
  let amount: number = DEFAULT_VOTE_AMOUNT;

  const validatorParam = requestUrl.searchParams.get("validator");
  if (validatorParam) {
    try {
      validatorPubkey = new PublicKey(validatorParam);
    } catch {
      throw new Error("Invalid input query parameter: validator");
    }
  }

  const amountParam = requestUrl.searchParams.get("amount");
  if (amountParam) {
    amount = parseFloat(amountParam);
    if (isNaN(amount) || amount <= 0) {
      throw new Error("BARK amount is too small or invalid");
    }
  }

  return {
    amount,
    validatorPubkey,
  };
}

// Validate the provided account public key
function validateAccount(accountStr: string): PublicKey {
  try {
    return new PublicKey(accountStr);
  } catch {
    throw new Error('Invalid "account" provided');
  }
}
