import { PublicKey } from "@solana/web3.js";

// Default validator public key for staking
export const DEFAULT_VALIDATOR_VOTE_PUBKEY: PublicKey = new PublicKey(
  "5ZWgXcyqrrNpQHCme5SdC5hCeYb2o3fEJhF7Gok3bTVN" // Replace with the actual default validator public key if necessary
);

// Default stake amount in SOL
export const DEFAULT_STAKE_AMOUNT: number = 0.5; // Amount in SOL
