import { Connection, PublicKey, Transaction, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface MintRequest {
  amount: number;
  mintAddress: string;
  recipientAddress: string;
  mintAuthority: Keypair; // Add mint authority for authorization
}

// Handle minting of tokens
export async function handleMint(
  connection: Connection,
  request: MintRequest
): Promise<{ success: boolean; transactionSignature?: string; errorMessage?: string }> {
  try {
    const { amount, mintAddress, recipientAddress, mintAuthority } = request;
    const mintPublicKey = new PublicKey(mintAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Create a Token object to interact with the SPL Token program
    const token = new Token(connection, mintPublicKey, TOKEN_PROGRAM_ID, mintAuthority);

    // Prepare the mint instruction
    const mintInstruction = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mintPublicKey,
      recipientPublicKey,
      mintAuthority.publicKey, // Mint authority must sign this transaction
      [],
      amount
    );

    // Create a new transaction
    const transaction = new Transaction().add(mintInstruction);

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [mintAuthority], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Minting error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while minting the token." };
  }
}
