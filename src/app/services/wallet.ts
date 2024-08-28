import { Connection, PublicKey } from '@solana/web3.js';

interface WalletRequest {
  walletAddress: string;
}

export async function getWalletBalance(connection: Connection, request: WalletRequest): Promise<{ success: boolean, balance?: number, errorMessage?: string }> {
  try {
    const { walletAddress } = request;
    const walletPublicKey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(walletPublicKey);
    return { success: true, balance: balance / 1e9 }; // Convert lamports to SOL
  } catch (error) {
    console.error("Get wallet balance error:", error);
    return { success: false, errorMessage: error.message || "An error occurred while retrieving wallet balance." };
  }
}
