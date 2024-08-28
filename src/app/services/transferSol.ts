import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js';

// Define the structure of the request
interface TransferSolRequest {
  amount: number; // Amount in SOL
  senderAddress: string; // Sender's public key address
  recipientAddress: string; // Recipient's public key address
}

// Function to transfer SOL
export async function transferSol(connection: Connection, request: TransferSolRequest): Promise<{ success: boolean, transactionSignature?: string, errorMessage?: string }> {
  try {
    const { amount, senderAddress, recipientAddress } = request;

    // Convert SOL amount to lamports
    const lamports = amount * 1e9;

    // Create PublicKey instances
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Generate a keypair for the transaction (usually the sender's keypair)
    const senderKeypair = Keypair.fromSecretKey(/* Sender's secret key here */);

    // Create the transfer instruction
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipientPublicKey,
      lamports: lamports,
    });

    // Create a new transaction and add the transfer instruction
    const transaction = new Transaction().add(transferInstruction);

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [senderKeypair], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Transfer SOL error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while transferring SOL." };
  }
}
