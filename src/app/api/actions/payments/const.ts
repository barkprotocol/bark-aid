import { PublicKey } from "@solana/web3.js";

// Validate and create default payment address
const defaultPaymentAddress = process.env.DEFAULT_PAYMENT_ADDRESS;
if (!defaultPaymentAddress || !PublicKey.isOnCurve(defaultPaymentAddress)) {
  throw new Error(`Invalid or missing DEFAULT_PAYMENT_ADDRESS environment variable.`);
}
export const DEFAULT_PAYMENT_ADDRESS: PublicKey = new PublicKey(defaultPaymentAddress);

// Validate and set default payment amount
const defaultPaymentAmount = parseFloat(process.env.DEFAULT_PAYMENT_AMOUNT || "1.0");
if (isNaN(defaultPaymentAmount) || defaultPaymentAmount <= 0) {
  throw new Error(`Invalid DEFAULT_PAYMENT_AMOUNT environment variable. Must be a positive number.`);
}
export const DEFAULT_PAYMENT_AMOUNT: number = defaultPaymentAmount;

// Supported currencies with type safety
export const SUPPORTED_CURRENCIES = ["SOL", "BARK", "USDC"] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];

// SPL Token mint & Wrapped SOL addresses
const solMintAddress = process.env.SOL_MINT_ADDRESS || "So11111111111111111111111111111111111111112";
const usdcMintAddress = process.env.USDC_MINT_ADDRESS || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const barkMintAddress = process.env.BARK_MINT_ADDRESS || "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg";

export const TOKEN_MINT_ADDRESSES: { [key: string]: PublicKey } = {
  SOL: new PublicKey(solMintAddress),
  USDC: new PublicKey(usdcMintAddress),
  BARK: new PublicKey(barkMintAddress),
};

// Currency icons
export const CURRENCY_ICONS: { [key: string]: string } = {
  SOL: "/icons/sol.png",
  BARK: "/icons/bark.png",
  USDC: "/icons/usdc.png",
};
