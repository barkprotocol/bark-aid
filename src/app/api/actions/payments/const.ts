import { PublicKey } from "@solana/web3.js";

// Default address for payment processing
export const DEFAULT_PAYMENT_ADDRESS: PublicKey = new PublicKey(
  "PAYMENT_ADDRESS" // Replace with your actual default payment address
);

// Default payment amount (e.g., 1.0 SOL)
export const DEFAULT_PAYMENT_AMOUNT: number = 1.0; // Amount in SOL

// Supported currencies
export const SUPPORTED_CURRENCIES = ["SOL", "BARK", "USDC"];

// SPL Token mint & Wrapped SOL addresses (replace with actual addresses)
export const TOKEN_MINT_ADDRESSES: { [key: string]: PublicKey } = {
  SOL: new PublicKey("So11111111111111111111111111111111111111112"),
  USDC: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  BARK: new PublicKey("2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg"),
};

// Currency icons
export const CURRENCY_ICONS: { [key: string]: string } = {
  SOL: "/icons/sol.png",
  BARK: "/icons/bark.png",
  USDC: "/icons/usdc.png",
};
