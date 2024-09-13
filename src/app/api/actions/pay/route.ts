import type { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey, Transaction, Keypair, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getOrCreateAssociatedTokenAccount, transfer, TransferParams } from '@solana/spl-token';
import { SOLANA_PAY_CONFIG } from '@/config/solanaPay';

// Utility function to determine the correct token program ID based on version
const determineTokenProgramId = (tokenVersion: '2022' | 'legacy') => {
  return tokenVersion === '2022' ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
};

// Utility function to calculate transfer fees
const calculateTransferFee = (amount: number) => {
  // Example: 0.01 SOL fee per transfer
  const fee = 0.01; // Replace with actual fee logic
  return fee;
};

// Utility function to encode URL components
const encodeUrl = (url: string) => encodeURIComponent(url);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const { amount, recipient, usdc } = req.body;

    if (!amount || !recipient || !usdc) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const connection = SOLANA_PAY_CONFIG.connection;
    const recipientPublicKey = new PublicKey(recipient);
    const tokenPublicKey = new PublicKey(usdc);

    // Generate Solana Pay URL
    const paymentRequestUrl = `solana:${encodeUrl(recipientPublicKey.toBase58())}?amount=${encodeUrl(amount.toString())}&token=${encodeUrl(tokenPublicKey.toBase58())}`;

    // Handle token transfer
    const senderPublicKey = new PublicKey(process.env.SENDER_PUBLIC_KEY!); // Load sender public key from environment variable
    const senderKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.SENDER_PRIVATE_KEY!))); // Load sender keypair from environment variable
    const tokenProgramId = determineTokenProgramId('2022'); // Adjust based on token version

    // Get or create token accounts
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(connection, senderKeypair, tokenPublicKey, senderPublicKey);
    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, senderKeypair, tokenPublicKey, recipientPublicKey);

    // Adjust amount for fee
    const transferFee = calculateTransferFee(amount);
    const adjustedAmount = amount - transferFee;

    // Create transaction for token transfer
    const transferParams: TransferParams = {
      source: senderTokenAccount.address,
      destination: recipientTokenAccount.address,
      amount: adjustedAmount,
      owner: senderPublicKey,
    };

    const transaction = new Transaction().add(
      transfer(transferParams)
    );

    transaction.feePayer = senderPublicKey;
    await transaction.sign(senderKeypair);
    const { signature } = await connection.sendTransaction(transaction, [senderKeypair], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return res.status(200).json({ success: true, paymentRequest: paymentRequestUrl });
  } catch (error) {
    console.error('Error creating payment request:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error: ' + (error as Error).message });
  }
}
