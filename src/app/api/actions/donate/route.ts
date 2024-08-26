import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  DONATE_API_PATH,
  DEFAULT_DONATION_ADDRESS,
  DONATION_AMOUNT_MIN,
  DONATION_AMOUNT_MAX,
} from './const';

// Create a new instance of the Solana connection
const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com', 'confirmed');

// Define the route handler for POST requests to the donate API path
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { amount, fromWallet, fromWalletPrivateKey } = await request.json();

    // Validate the donation amount
    if (typeof amount !== 'number' || amount < DONATION_AMOUNT_MIN || amount > DONATION_AMOUNT_MAX) {
      return NextResponse.json({
        error: `Donation amount must be between ${DONATION_AMOUNT_MIN} and ${DONATION_AMOUNT_MAX}`,
      }, { status: 400 });
    }

    // Convert SOL to lamports (1 SOL = 1e9 lamports)
    const lamports = amount * 1e9;

    // Create a transaction instruction to transfer SOL
    const donorPublicKey = new PublicKey(fromWallet);
    const donationAddress = new PublicKey(DEFAULT_DONATION_ADDRESS);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: donorPublicKey,
        toPubkey: donationAddress,
        lamports,
      })
    );

    // Sign the transaction
    const donorPrivateKey = Uint8Array.from(JSON.parse(fromWalletPrivateKey));
    const donorKeypair = Keypair.fromSecretKey(donorPrivateKey);

    transaction.feePayer = donorPublicKey;
    await transaction.sign(donorKeypair);

    // Send and confirm the transaction
    const txId = await sendAndConfirmTransaction(connection, transaction, [donorKeypair]);

    // Return a success response
    return NextResponse.json({ success: true, transactionId: txId });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json({
      error: 'An error occurred while processing the donation',
    }, { status: 500 });
  }
}
