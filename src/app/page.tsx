"use client";

import Link from "next/link";
import HeroSection from "@/components/ui/hero-section";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoinsIcon,
  FileTextIcon,
  ImageIcon,
  ShieldIcon,
  WalletIcon,
  HeartIcon,
  CreditCardIcon,
  CheckCircleIcon,
  SettingsIcon,
} from "lucide-react";

// Define color variables for consistent styling
const colors = {
  grey: "#6B7280", // Modern grey
  white: "#FFFFFF", // Pure white
  black: "#000000", // Pure black
  orange: "#F97316", // Modern orange
  sand: "#CBB5A7", // Sand color
};

// Array of action cards with title, href, description, and icon
const actionCards = [
  {
    title: "On-chain Memo",
    href: "/actions/memo",
    description: "Send and record simple messages on the Solana blockchain using SPL Memo, ensuring transparent communication.",
    icon: <FileTextIcon className="w-12 h-12" aria-label="Memo Icon" />,
    badge: "New",
  },
  {
    title: "Staking SOL",
    href: "/actions/stake",
    description: "Contribute to the security and efficiency of the Solana network by staking SOL with validators.",
    icon: <ShieldIcon className="w-12 h-12" aria-label="Staking Icon" />,
    badge: "Popular",
  },
  {
    title: "Transfer SOL",
    href: "/actions/transfer-sol",
    description: "Seamlessly transfer native SOL tokens between Solana wallets for quick and secure transactions.",
    icon: <WalletIcon className="w-12 h-12" aria-label="Wallet Icon" />,
    badge: "Essential",
  },
  {
    title: "Transfer BARK",
    href: "/actions/transfer-bark",
    description: "Transfer BARK tokens between Solana wallets to manage and move your assets with ease.",
    icon: <CoinsIcon className="w-12 h-12" aria-label="BARK Transfer Icon" />,
    badge: "Essential",
  },
  {
    title: "Mint an NFT",
    href: "/actions/mint",
    description: "Create and distribute unique digital collectibles on the Solana blockchain, enabling digital ownership and creativity.",
    icon: <ImageIcon className="w-12 h-12" aria-label="Mint NFT Icon" />,
    badge: "New",
  },
  {
    title: "Charity",
    href: "/actions/donate",
    description: "Support causes and projects by making donations through the Solana blockchain, fostering community and growth.",
    icon: <HeartIcon className="w-12 h-12" aria-label="Charity Icon" />,
    badge: "Support",
  },
  {
    title: "Payments",
    href: "/actions/payments",
    description: "Manage and process payments for various services using secure Solana-based transactions.",
    icon: <CreditCardIcon className="w-12 h-12" aria-label="Payments Icon" />,
    badge: "New",
  },
  {
    title: "Vote",
    href: "/actions/vote",
    description: "Engage in governance by casting your vote on proposals and decisions within the Solana ecosystem.",
    icon: <CheckCircleIcon className="w-12 h-12" aria-label="Vote Icon" />,
    badge: "Governance",
  },
  {
    title: "Manage Wallet",
    href: "/actions/wallet",
    description: "View and configure your wallet settings, track your assets, and ensure the security of your holdings.",
    icon: <SettingsIcon className="w-12 h-12" aria-label="Settings Icon" />,
    badge: "Essential",
  },
];

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="container flex flex-col items-center space-y-6 py-16 text-center dark:bg-black dark:text-white md:py-24"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
          About Us
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-grey sm:text-xl sm:leading-8">
          We are dedicated to leveraging the full potential of the Solana blockchain to deliver innovative solutions and features. Our goal is to offer a seamless experience for managing assets, participating in governance, and more. Join us as we support the growth and adoption of the Solana ecosystem.
        </p>
        <div className="flex gap-4">
          <Link href="/services" className={cn(buttonVariants({ size: "lg", variant: "primary" }))}>
            Services
          </Link>
          <Link href="https://whitepaper.barkprotocol.net" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
            Whitepaper
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container space-y-12 py-8 dark:bg-black dark:text-white md:py-12 lg:py-24"
      >
        <div className="text-center">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white">
            Features
          </h3>
        </div>

        {/* Subtitle */}
        <div className="text-center max-w-3xl mx-auto">
          <h4 className="text-3xl sm:text-4xl font-semibold text-sand">
            Explore Innovative Solutions
          </h4>
          <p className="text-lg leading-relaxed text-grey dark:text-sand sm:text-xl sm:leading-8">
            Discover various functionalities and actions that showcase the versatility of Solana. Each action is designed to provide seamless interaction with blockchain technology, enhancing your digital experience. From creating NFTs to managing your assets, our features are designed to make blockchain interaction smooth and intuitive.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {actionCards.map((item, key) => (
            <Link key={key} href={item.href} className="group">
              <Card className="group-hover:border-sand transition-colors duration-300 border-2 rounded-lg shadow-md hover:shadow-lg dark:border-white dark:hover:border-sand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    {item.icon}
                    <span className="block font-semibold group-hover:text-sand">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="ml-2 inline-block rounded-full bg-orange px-2 py-1 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-grey dark:text-sand">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center md:max-w-3xl mx-auto">
          <p className="text-grey dark:text-sand text-lg leading-relaxed sm:text-xl sm:leading-8">
            Powered by{" "}
            <Button variant={"link"} asChild>
              <Link href="https://solana.com" target="_blank" className="text-sand">
                Solana
              </Link>
            </Button>{" "}
            and{" "}
            <Button variant={"link"} asChild>
              <Link href="https://barkprotocol.com/" target="_blank" className="text-sand">
                BARK Protocol
              </Link>
            </Button>
            . Explore the potential of blockchain technology with Solana’s robust infrastructure.
          </p>
        </div>
      </section>
    </>
  );
}
