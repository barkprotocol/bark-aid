"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import WalletButton from "@/components/ui/wallet-button";

// Import Inter font
const inter = Inter({ subsets: ["latin"] });

// Define viewport settings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Wallet adapter configuration
const endpoint = "https://api.devnet.solana.com";

// List of supported wallets
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <div className="flex min-h-screen flex-col bg-sand dark:bg-grey-900">
                {/* Header Section */}
                <header className="container z-40 bg-transparent text-black dark:text-white">
                  <div className="flex h-20 items-center justify-between py-6">
                    {/* Main Navigation */}
                    <MainNav items={marketingConfig.mainNav} />

                    <nav className="flex items-center gap-2">
                      {/* Connect Wallet Button */}
                      <WalletButton />

                      {/* Theme Toggle */}
                      <ThemeModeToggle />
                    </nav>
                  </div>
                </header>

                {/* Background Effects */}
                <div
                  className={cn(
                    "before:absolute z-[-1] before:h-[300px] before:w-full before:translate-x-1/4 before:translate-y-52 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-5 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
                  )}
                ></div>

                {/* Main Content */}
                <main className="flex-1 space-y-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </main>

                {/* Footer Section */}
                <SiteFooter className="bg-white text-black" />
              </div>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
