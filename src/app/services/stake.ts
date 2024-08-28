import { Connection, PublicKey, Transaction, StakeProgram, Keypair } from '@solana/web3.js';

// Define the structure of the request
interface StakeRequest {
  amount: number; // Amount in SOL
  stakeAccount: string; // Stake account public key address
  validator: string; // Validator public key address
}

// Function to handle staking
export async function handleStake(connection: Connection, request: StakeRequest): Promise<{ success: boolean, transactionSignature?: string, errorMessage?: string }> {
  try {
    const { amount, stakeAccount, validator } = request;

    // Convert SOL amount to lamports
    const lamports = amount * 1e9;

    // Create PublicKey instances
    const stakePublicKey = new PublicKey(stakeAccount);
    const validatorPublicKey = new PublicKey(validator);

    // Generate a keypair for the transaction (replace with the actual authorized keypair)
    const authorizedKeypair = Keypair.fromSecretKey(/* Authorized keypair secret key here */);

    // Create the staking instruction
    const stakeInstruction = StakeProgram.delegate({
      stakePubkey: stakePublicKey,
      authorizedPubkey: authorizedKeypair.publicKey,
      votePubkey: validatorPublicKey,
      lamports: lamports, // Amount to stake
    });

    // Create a new transaction and add the stake instruction
    const transaction = new Transaction().add(stakeInstruction);

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [authorizedKeypair], { skipPreflight: false });
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Staking error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while staking." };
  }
}
