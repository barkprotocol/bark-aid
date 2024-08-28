// types.ts

import { PublicKey } from "@solana/web3.js";

export interface ActionPostRequest {
  account: string; // Public key as string
}

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

export interface ActionPostResponse {
  fields: {
    transaction: any; // Transaction object
    message: string;
  };
}

export interface PaymentRequest {
  amount: number;
  toPubkey: PublicKey;
  currency: string;
}
