import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoinsIcon,
  FileTextIcon,
  ImageIcon,
  ShieldIcon,
  WalletIcon,
  HeartIcon,       // Icon for Donate
  CreditCardIcon,   // Icon for Payments
  CheckCircleIcon,  // Icon for Vote
  SettingsIcon,     // Icon for Manage Wallet
} from "lucide-react";

// Define color variables
const colors = {
  grey: "#6B7280", // Modern grey
  white: "#FFFFFF", // Pure white
  black: "#000000", // Pure black
  orange: "#F97316", // Modern orange
  sand: "#CBB5A7", // Sand color
};

const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  {
    title: "On-chain Memo",
    href: "/memo",
    description: "Send a simple message on-chain using an SPL Memo.",
    icon: <FileTextIcon className="size-12" />,
  },
  {
    title: "Staking SOL",
    href: "/stake",
    description: "Help secure the Solana network by staking SOL to a validator.",
    icon: <ShieldIcon className="size-12" />,
  },
  {
    title: "Transfer SOL",
    href: "/transfer-sol",
    description: "Easily transfer native SOL to any other Solana wallet.",
    icon: <WalletIcon className="size-12" />,
  },
  {
    title: "Transfer SPL Tokens",
    href: "/transfer-spl",
    description: "Easily transfer SPL tokens to any other Solana wallet.",
    icon: <CoinsIcon className="size-12" />,
  },
  {
    title: "Mint an NFT",
    href: "/mint-nft",
    description: "Allow anyone to claim a digital collectible from a Collection.",
    icon: <ImageIcon className="size-12" />,
  },
  {
    title: "Donate",
    href: "/donate",
    description: "Support a cause or project by making a donation.",
    icon: <HeartIcon className="size-12" />,
  },
  {
    title: "Payments",
    href: "/payments",
    description: "Manage or make payments for various services.",
    icon: <CreditCardIcon className="size-12" />,
  },
  {
    title: "Vote",
    href: "/vote",
    description: "Participate in community or governance voting.",
    icon: <CheckCircleIcon className="size-12" />,
  },
  {
    title: "Manage Wallet",
    href: "/wallet",
    description: "View and manage your wallet settings and details.",
    icon: <SettingsIcon className="size-12" />,
  },
];

export default function Pages() {
  return (
    <>
      {/* Uncomment and adjust the introductory section if needed */}
      {/* <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An example app built using Next.js 13 server components.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section> */}

      <section
        id="features"
        className="container space-y-12 bg-sand py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-6xl" style={{ color: colors.black }}>
            Solana Actions
          </h2>
          <p className="max-w-[85%] leading-normal text-grey sm:text-lg sm:leading-7">
            This project contains example code snippets for creating Solana Actions.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {actionCards.map((item, key) => (
            <Link key={key} href={item.href} className="group">
              <Card className="group-hover:border-sand transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="space-y-3 flex items-center gap-2">
                    {item.icon}
                    <span className="block font-bold group-hover:text-sand">
                      {item.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-grey">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-grey sm:text-lg sm:leading-7">
            Powered by{" "}
            <Button variant={"link"} asChild>
              <Link href="https://solana.com" target="_blank" style={{ color: colors.sand }}>
                Solana
              </Link>
            </Button>{" "}
            and{" "}
            <Button variant={"link"} asChild>
              <Link href="https://solana.com/actions" target="_blank" style={{ color: colors.sand }}>
                Solana Actions
              </Link>
            </Button>
            . You can find the full source code for this entire repo on{" "}
            <Button variant={"link"} asChild>
              <Link href={siteConfig.links.github} target="_blank" style={{ color: colors.sand }}>
                GitHub
              </Link>
            </Button>.
          </p>
        </div>
      </section>

      {/* Uncomment and adjust the open-source section if needed */}
      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section> */}
    </>
  );
}
