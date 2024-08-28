// validate.ts

import { PublicKey } from "@solana/web3.js";
import { SUPPORTED_CURRENCIES, DEFAULT_PAYMENT_ADDRESS, DEFAULT_PAYMENT_AMOUNT } from "./const";
import { PaymentRequest } from "./types";

// Validate and parse query parameters
export function validateQueryParams(requestUrl: URL): PaymentRequest {
  const currency = requestUrl.searchParams.get("currency") || "SOL";
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    throw new Error("Unsupported currency type");
  }

  const toPubkey = new PublicKey(requestUrl.searchParams.get("to") || DEFAULT_PAYMENT_ADDRESS.toBase58());
  const amount = parseFloat(requestUrl.searchParams.get("amount") || DEFAULT_PAYMENT_AMOUNT.toString());
  if (amount <= 0) {
    throw new Error("Amount is too small or invalid");
  }

  return { amount, toPubkey, currency };
}

// Validate the provided account public key
export function validateAccount(accountStr: string): PublicKey {
  try {
    return new PublicKey(accountStr);
  } catch {
    throw new Error('Invalid "account" provided');
  }
}
