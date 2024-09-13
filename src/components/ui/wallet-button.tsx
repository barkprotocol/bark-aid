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
      console.error(err);
    }
  };

  return (
    <button 
      className={walletButtonStyles} 
      onClick={handleClick}
      disabled={connecting || disconnecting}
    >
      {connecting || disconnecting ? (
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
          <path d="M12 4v4l4-4-4-4v4h4v4h-4z" fill="currentColor" />
        </svg>
      ) : (
        buttonText
      )}
    </button>
  );
}
