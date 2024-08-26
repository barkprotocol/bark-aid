// payments/const.ts

import { PublicKey } from "@solana/web3.js";

// Default address for payment processing
export const DEFAULT_PAYMENT_ADDRESS: PublicKey = new PublicKey(
  "PAYMENT_ADDRESS" // Replace with your actual default payment address
);

// Default payment amount (e.g., 1.0 SOL)
export const DEFAULT_PAYMENT_AMOUNT: number = 1.0; // Amount in SOL
