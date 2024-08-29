import { PublicKey } from "@solana/web3.js";

// Default wallet address
export const DEFAULT_WALLET_ADDRESS: PublicKey = new PublicKey(
  process.env.DEFAULT_WALLET_ADDRESS || "YOUR_ACTUAL_DEFAULT_WALLET_ADDRESS_HERE" // Replace with your actual default wallet address or use an environment variable
);
