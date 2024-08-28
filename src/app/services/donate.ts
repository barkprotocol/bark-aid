import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js';

interface DonateRequest {
  amount: number; // Amount in SOL
  donorAddress: string; // Donor's public key address
  charityAddress: string; // Charity's public key address
}

export async function handleDonation(connection: Connection, request: DonateRequest): Promise<{ success: boolean, transactionSignature?: string, errorMessage?: string }> {
  try {
    const { amount, donorAddress, charityAddress } = request;
    
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    const donorPublicKey = new PublicKey(donorAddress);
    const charityPublicKey = new PublicKey(charityAddress);

    // Create transfer instruction
    const donationInstruction = SystemProgram.transfer({
      fromPubkey: donorPublicKey,
      toPubkey: charityPublicKey,
      lamports: amount * 1e9, // Convert SOL to lamports
    });

    // Create a transaction and add the instruction
    const transaction = new Transaction().add(donationInstruction);

    // The donor must sign the transaction. In this example, we use a dummy Keypair.
    const donorKeypair = Keypair.generate(); // Replace with actual keypair for real use

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [donorKeypair], { skipPreflight: false });
    
    // Confirm the transaction
    await connection.confirmTransaction(signature);

    return { success: true, transactionSignature: signature };
  } catch (error) {
    console.error("Donation error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while making the donation." };
  }
}
