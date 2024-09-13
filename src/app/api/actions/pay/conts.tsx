import { PublicKey } from '@solana/web3.js';

// Solana Network Configuration
export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const CONNECTION_URL = `https://api.${NETWORK}.solana.com`;

// Token Program IDs
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx'); // Standard SPL Token Program
export const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx'); // New SPL Token Program ID (if applicable)

// USDC Token Address
export const USDC_TOKEN_ADDRESS = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC on Solana

// Payment Request URL Parameters
export const PAYMENT_REQUEST_URL = (amount: number, recipient: PublicKey, token: PublicKey) => {
  const amountInLamports = amount * 1e9; // Convert SOL amount to lamports (example conversion)
  return `solana:${recipient.toBase58()}?amount=${amountInLamports}&token=${token.toBase58()}`;
};

// Additional Configurations
export const FEE_PAYER = new PublicKey(process.env.NEXT_PUBLIC_FEE_PAYER || ''); // Fee payer account (if needed)
export const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || ''); // Program ID for custom logic (if applicable)
