'use client'

import React from 'react'
import QRCode from '@/components/qr-code'
import { useWallet } from '@solana/wallet-adapter-react'

export default function SolanaPayPage() {
  const { publicKey } = useWallet()

  if (!publicKey) {
    return <div className="text-center py-8">Please connect your wallet to use Solana Pay</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-syne font-bold text-primary mb-8 text-center">Solana Pay</h1>
      <QRCode
        recipient={publicKey.toBase58()}
        amount={0.1}
        label="My Store"
        message="Thanks for your purchase!"
      />
    </div>
  )
}