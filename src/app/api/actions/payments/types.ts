import { PublicKey, Transaction } from "@solana/web3.js";

// Represents a request to post an action
export interface ActionPostRequest {
  account: string; // Public key as string
}

// Represents the response for a GET action request
export interface ActionGetResponse {
  type: string;
  title: string;
  icon: string;
  description: string;
  label: string;
  links: {
    actions: {
      label: string;
      href: string;
      parameters?: {
        name: string;
        label: string;
        required: boolean;
      }[];
    }[];
  };
}

// Represents the response for a POST action request
export interface ActionPostResponse {
  fields: {
    transaction: Transaction; // Replace 'any' with specific type
    message: string;
  };
}

// Represents a payment request
export interface PaymentRequest {
  amount: number; // Amount to be transferred
  toPubkey: PublicKey; // Recipient's public key
  currency: string; // Currency type (e.g., SOL, USDC)
}
