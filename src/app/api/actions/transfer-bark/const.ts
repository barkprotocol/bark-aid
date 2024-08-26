import { PublicKey } from "@solana/web3.js";

// Default wallet address for BARK donations
export const DEFAULT_BARK_ADDRESS: PublicKey = new PublicKey(
  "BARKkeAwhTuFzcLHX4DjotRsmjXQ1MshGrZbn1CUQqMo" // devnet wallet
);

// Default donation amount in lamports (1 SOL = 1e9 lamports)
// The value should be adjusted according to your needs and may require conversion
export const DEFAULT_BARK_AMOUNT: number = 1_000_000; // 1 million lamports = 0.001 SOL
