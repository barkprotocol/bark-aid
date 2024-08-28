"use client";

import Link from "next/link";
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
    href: "/memo",
    description: "Send and record simple messages on the Solana blockchain using SPL Memo, ensuring transparent communication.",
    icon: <FileTextIcon className="size-12" />,
    badge: "New", // Badge for On-chain Memo
  },
  {
    title: "Staking SOL",
    href: "/stake",
    description: "Contribute to the security and efficiency of the Solana network by staking SOL with validators.",
    icon: <ShieldIcon className="size-12" />,
    badge: "Popular", // Badge for Staking SOL
  },
  {
    title: "Transfer SOL",
    href: "/transfer-sol",
    description: "Seamlessly transfer native SOL tokens between Solana wallets for quick and secure transactions.",
    icon: <WalletIcon className="size-12" />,
    badge: "Essential", // Badge for Transfer SOL
  },
  {
    title: "Transfer BARK",
    href: "/transfer-bark",
    description: "Transfer BARK tokens between Solana wallets to manage and move your assets with ease.",
    icon: <CoinsIcon className="size-12" />,
    badge: "Essential", // Badge for Transfer BARK
  },
  {
    title: "Mint an NFT",
    href: "/mint",
    description: "Create and distribute unique digital collectibles on the Solana blockchain, enabling digital ownership and creativity.",
    icon: <ImageIcon className="size-12" />,
    badge: "New", // Badge for Mint an NFT
  },
  {
    title: "Donate",
    href: "/donate",
    description: "Support causes and projects by making donations through the Solana blockchain, fostering community and growth.",
    icon: <HeartIcon className="size-12" />,
    badge: "Support", // Badge for Donate
  },
  {
    title: "Payments",
    href: "/payments",
    description: "Manage and process payments for various services using secure Solana-based transactions.",
    icon: <CreditCardIcon className="size-12" />,
    badge: "New", // Badge for Payments
  },
  {
    title: "Vote",
    href: "/vote",
    description: "Engage in governance by casting your vote on proposals and decisions within the Solana ecosystem.",
    icon: <CheckCircleIcon className="size-12" />,
    badge: "Governance", // Badge for Vote
  },
  {
    title: "Manage Wallet",
    href: "/wallet",
    description: "View and configure your wallet settings, track your assets, and ensure the security of your holdings.",
    icon: <SettingsIcon className="size-12" />,
    badge: "Essential", // Badge for Manage Wallet
  },
];

export default function Pages() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="container flex flex-col items-center justify-center space-y-6 bg-sand py-16 text-center dark:bg-transparent md:py-24"
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={{ color: colors.black }}>
          Unlock the Power of Solana with BARK Actions & Blinks
        </h1>
        <p className="max-w-2xl leading-relaxed text-grey sm:text-lg sm:leading-7">
          Dive into a wide range of actions that leverage the speed and security of Solana blockchain. From managing tokens to participating in governance, explore how BARK Actions and Blinks can enhance your blockchain experience.
        </p>
        <div className="space-x-4">
          <Link href="/get-started" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
          <Link href="/learn-more" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container space-y-12 py-8 dark:bg-black dark:text-white md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-6xl" style={{ color: colors.black }}>
            Explore BARK Actions & Blinks
          </h2>
          <p className="max-w-[85%] leading-normal text-grey sm:text-lg sm:leading-7">
            Discover various functionalities and actions that showcase the versatility of Solana. Each action is designed to provide seamless interaction with blockchain technology, enhancing your digital experience.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {actionCards.map((item, key) => (
            <Link key={key} href={item.href} className="group">
              <Card className="group-hover:border-sand transition-colors duration-300 dark:border-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    <span className="block font-bold group-hover:text-sand">
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

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-grey dark:text-sand sm:text-lg sm:leading-7">
            Powered by{" "}
            <Button variant={"link"} asChild>
              <Link href="https://solana.com" target="_blank" style={{ color: colors.sand }}>
                Solana
              </Link>
            </Button>{" "}
            and{" "}
            <Button variant={"link"} asChild>
              <Link href="https://barkprotocol.com/" target="_blank" style={{ color: colors.sand }}>
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
