"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SolanaQRCode } from "@/components/qr-code"
import { Button } from "@/components/ui/button"
import { DevnetAlert } from "@/components/devnet-alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js'
import { toast } from "@/components/ui/use-toast"

export default function MemoActionPage() {
  const apiPath = "/api/actions/memo"
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [memoText, setMemoText] = useState("")
  const [isValidMemo, setIsValidMemo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()

  useEffect(() => {
    setApiEndpoint(new URL(apiPath, window.location.href).toString())
  }, [])

  useEffect(() => {
    setIsValidMemo(memoText.length > 0 && memoText.length <= 280)
  }, [memoText])

  const handleMemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidMemo || !publicKey || !signTransaction) return

    setIsSubmitting(true)
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey("11111111111111111111111111111111"),
          lamports: 0,
        })
      )

      transaction.add({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from(memoText, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTx = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTx.serialize())

      toast({
        title: "Memo submitted successfully!",
        description: `Transaction ID: ${txid}`,
        duration: 5000,
      })

      setMemoText("")
    } catch (error) {
      console.error("Error submitting memo:", error)
      toast({
        title: "Error submitting memo",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container space-y-12 bg-background py-8 md:py-12 lg:py-24">
      <DevnetAlert />

      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-foreground">
          Memo
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          The following example demonstrates how to publish a simple message
          on-chain using an Action and the SPL Memo program.
        </p>
      </div>

      <Card className="mx-auto max-w-[80vw] md:max-w-[400px] aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <CardContent className="p-0 flex items-center justify-center h-full">
          <div className="bg-gray-800 p-4 rounded-lg">
            <SolanaQRCode
              url={`${apiEndpoint}?memo=${encodeURIComponent(memoText)}`}
              size={360}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-[80vw] md:max-w-[58rem] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Submit Memo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMemoSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memo">Memo Text</Label>
              <Input
                id="memo"
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                placeholder="Enter your memo (max 280 characters)"
                maxLength={280}
              />
            </div>
            <div className="flex items-center space-x-2">
              {isValidMemo ? (
                <CheckCircle className="text-primary" size={16} />
              ) : (
                <AlertCircle className="text-destructive" size={16} />
              )}
              <span className={`text-sm ${isValidMemo ? 'text-primary' : 'text-destructive'}`}>
                {memoText.length}/280 characters
              </span>
            </div>
            <Button 
              type="submit" 
              disabled={!isValidMemo || isSubmitting || !publicKey}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Memo"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-[80vw] md:max-w-[58rem] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Action Endpoint</CardTitle>
        </CardHeader>
        <CardContent>
          <Link
            href={apiEndpoint}
            target="_blank"
            className="text-primary hover:underline break-all"
            rel="noopener noreferrer"
          >
            {apiEndpoint}
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}