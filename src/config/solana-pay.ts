import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, TransferFee, transfer, TransferFeeAmount, Account } from '@solana/spl-token';

const NETWORK = 'devnet'; // Or 'mainnet-beta'
const CONNECTION = new Connection(`https://api.${NETWORK}.solana.com`);

export const SOLANA_PAY_CONFIG = {
  network: NETWORK,
  connection: CONNECTION,
  token: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC token
};
