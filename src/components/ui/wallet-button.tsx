'use client'

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WalletButton() {
  const { connected, connecting, disconnecting } = useWallet()
  const [buttonText, setButtonText] = useState("Select Wallet")
  const { addToast } = useToast()

  useEffect(() => {
    if (connected) {
      addToast({ message: "Your wallet has been successfully connected.", type: "success" })
    }
  }, [connected, addToast])

  useEffect(() => {
    if (connecting || disconnecting) {
      setButtonText("Connecting...")
    } else if (connected) {
      setButtonText("")
    } else {
      setButtonText("Select Wallet")
    }
  }, [connected, connecting, disconnecting])

  const handleMouseEnter = () => {
    if (connected) {
      setButtonText("Change Wallet")
    }
  }

  const handleMouseLeave = () => {
    if (connected) {
      setButtonText("")
    }
  }

  return (
    <WalletMultiButton
      as={CustomButton}
      startIcon={
        connecting || disconnecting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : connected ? (
          <LogOut className="h-4 w-4" />
        ) : (
          <Wallet className="h-4 w-4" />
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonText}
    </WalletMultiButton>
  )
}

function CustomButton({ children, startIcon, ...props }: React.ComponentPropsWithRef<typeof Button> & { startIcon?: React.ReactNode }) {
  return (
    <Button
      variant="default"
      className="bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105 min-w-[40px] justify-center"
      {...props}
    >
      {startIcon}
      {children}
    </Button>
  )
}