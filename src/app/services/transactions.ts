import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

interface TransferSolRequest {
  amount: number;
  senderAddress: string;
  recipientAddress: string;
}

export async function transferSol(connection: Connection, request: TransferSolRequest): Promise<{ success: boolean, transactionSignature?: string, errorMessage?: string }> {
  try {
    const { amount, senderAddress, recipientAddress } = request;
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipientPublicKey,
      lamports: amount * 1e9, // Convert SOL to lamports
    });

    const transaction = new Transaction().add(transferInstruction);
    const signature = await connection.sendTransaction(transaction, [/* Signers here */], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Transfer SOL error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while transferring SOL." };
  }
}
