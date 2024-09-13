import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const NETWORK = 'devnet'; // Change to 'mainnet-beta' as needed
const CONNECTION = new Connection(`https://api.${NETWORK}.solana.com`);

// Define a function to create payment request URL
const createPaymentRequestUrl = (amount: number, recipient: PublicKey, token: PublicKey) => {
  return `solana:${recipient.toBase58()}?amount=${amount}&token=${token.toBase58()}`;
};

export async function GET(req: NextRequest, { params }: { params: { publickey: string } }) {
  try {
    const { publickey } = params;
    const { searchParams } = new URL(req.url);
    const amount = searchParams.get('amount');
    const token = searchParams.get('token');

    if (!amount || !token || !publickey) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }

    const recipientPublicKey = new PublicKey(publickey);
    const tokenPublicKey = new PublicKey(token);

    // Generate payment request URL
    const paymentRequestUrl = createPaymentRequestUrl(Number(amount), recipientPublicKey, tokenPublicKey);

    // Respond with the payment request URL
    return NextResponse.json({ success: true, paymentRequest: paymentRequestUrl });
  } catch (error) {
    console.error('Error in /api/pay/[publickey]:', error);
    return NextResponse.json({ success: false, message: 'Failed to create payment request' }, { status: 500 });
  }
}
