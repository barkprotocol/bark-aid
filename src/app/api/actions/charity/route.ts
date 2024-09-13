import React from 'react'
import {
  ActionGetResponse,
  ActionPostResponse,
  ActionGetRequest,
  ACTIONS_CORS_HEADERS,
  MEMO_PROGRAM_ID,
  ActionPostRequest,
  createPostResponse
} from '@solana/actions';
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';

export function GET(req: Request) {
  const metadata = {
    title: 'Charity Donation',
    label: 'Donate to Charity',
    description: 'Donate to the charity or check if the due date has passed to transfer funds.',
    icon: new URL('https://ucarecdn.com/85f54eac-fda3-4d53-82d1-074a934483ff/donation_usdc.png'),
    tags: ['blockchain', 'cryptocurrency', 'decentralized'],
    availableActions: [
      {
        name: 'Donate',
        method: 'POST',
        endpoint: '/donate',
        description: 'Donate lamports to the charity',
      },
      {
        name: 'Check and Transfer',
        method: 'POST',
        endpoint: '/check-and-transfer',
        description: 'Transfer funds to the BARK DAO wallet if the due date has passed.',
      },
    ],
  };
  return new Response(JSON.stringify(metadata), {
    headers: ACTIONS_CORS_HEADERS,
  });
}

export const OPTIONS = GET;

export async function POST(req: Request) {
  try {
    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const transaction = new Transaction();

    // Adding Compute Budget Instruction (if required)
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1,
      })
    );

    // Add Memo instruction to the transaction
    transaction.add(
      new TransactionInstruction({
        keys: [],
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from('This is a simple memo message!', 'utf-8'),
      })
    );

    transaction.feePayer = account;

    // Establish a connection to the Solana cluster
    const connection = new Connection(clusterApiUrl('devnet'));
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    // Create the payload for ActionPostResponse
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
      },
    });

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    // Return a proper error message
    return new Response(
      JSON.stringify({ error: `An unknown error occurred, status: 400 - ${error.message}` }),
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
}
