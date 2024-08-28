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
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "Actions - Staking SOL",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: `Stake your SOL to the ${validator.toBase58()} validator to secure the Solana network`,
      label: "Stake your SOL",
      links: {
        actions: [
          {
            label: "Stake 1 SOL",
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Stake 5 SOL",
            href: `${baseHref}&amount=${"5"}`,
          },
          {
            label: "Stake 10 SOL",
            href: `${baseHref}&amount=${"10"}`,
          },
          {
            label: "Stake SOL",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of SOL to stake",
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
    const message = err instanceof Error ? err.message : "An unknown error occurred";
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
    } catch {
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
    const message = err instanceof Error ? err.message : "An unknown error occurred";
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
    const validatorParam = requestUrl.searchParams.get("validator");
    if (validatorParam) {
      validator = new PublicKey(validatorParam);
    }
  } catch {
    throw new Error("Invalid input query parameter: validator");
  }

  try {
    const amountParam = requestUrl.searchParams.get("amount");
    if (amountParam) {
      amount = parseFloat(amountParam);
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Amount is too small or invalid");
      }
    }
  } catch {
    throw new Error("Invalid input query parameter: amount");
  }

  return {
    amount,
    validator,
  };
}
