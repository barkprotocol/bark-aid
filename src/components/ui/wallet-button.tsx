"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const walletButtonStyles = cn(buttonVariants({ variant: "dark", size: "sm" }));

export default function WalletButton() {
  const { connected, connect, disconnect, connecting, disconnecting } = useWallet();
  const [buttonText, setButtonText] = useState<string>("Connect Wallet");

  useEffect(() => {
    setButtonText(connected ? "Disconnect Wallet" : "Connect Wallet");
  }, [connected]);

  const handleClick = async () => {
    try {
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (err) {
      console.error("Failed to toggle wallet connection", err);
      // Optionally display an error message or feedback to the user
    }
  };

  return (
    <button 
      className={walletButtonStyles} 
      onClick={handleClick}
      disabled={connecting || disconnecting}
      aria-label={connected ? "Disconnect Wallet" : "Connect Wallet"}
    >
      {connecting || disconnecting ? (
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="62" strokeDashoffset="31" className="animate-spin" />
        </svg>
      ) : (
        buttonText
      )}
    </button>
  );
}
