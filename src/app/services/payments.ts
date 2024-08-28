import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { Token } from '@solana/spl-token';

// Define interfaces for different payment requests
interface TransferSolRequest {
  amount: number; // Amount in SOL
  senderAddress: string; // Sender's public key address
  recipientAddress: string; // Recipient's public key address
  senderKeypair: Keypair; // Sender's keypair for signing the transaction
}

interface TransferSPLRequest {
  amount: number; // Amount of SPL tokens
  senderAddress: string; // Sender's public key address
  recipientAddress: string; // Recipient's public key address
  tokenMintAddress: string; // SPL token mint address
  senderKeypair: Keypair; // Sender's keypair for signing the transaction
}

// Define the success and error response structure
interface PaymentResponse {
  success: boolean;
  transactionSignature?: string;
  errorMessage?: string;
}

// Function to transfer SOL
export async function transferSol(connection: Connection, request: TransferSolRequest): Promise<PaymentResponse> {
  try {
    const { amount, senderAddress, recipientAddress, senderKeypair } = request;
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderPublicKey,
      toPubkey: recipientPublicKey,
      lamports: amount * 1e9, // Convert SOL to lamports
    });

    const transaction = new Transaction().add(transferInstruction);
    const signature = await connection.sendTransaction(transaction, [senderKeypair], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Transfer SOL error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while transferring SOL." };
  }
}

// Function to transfer SPL tokens
export async function transferSPL(connection: Connection, request: TransferSPLRequest): Promise<PaymentResponse> {
  try {
    const { amount, senderAddress, recipientAddress, tokenMintAddress, senderKeypair } = request;
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);
    const mintPublicKey = new PublicKey(tokenMintAddress);

    const token = new Token(connection, mintPublicKey, Token.TOKEN_PROGRAM_ID, senderKeypair);
    const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(senderPublicKey);
    const toTokenAccount = await token.getOrCreateAssociatedAccountInfo(recipientPublicKey);

    const transferInstruction = Token.createTransferInstruction(
      Token.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      senderPublicKey,
      [],
      amount * Math.pow(10, await token.getDecimals()) // Convert to the smallest unit
    );

    const transaction = new Transaction().add(transferInstruction);
    const signature = await connection.sendTransaction(transaction, [senderKeypair], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Transfer SPL tokens error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while transferring SPL tokens." };
  }
}
