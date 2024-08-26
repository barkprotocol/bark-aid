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
} from "lucide-react";

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
    description:
      "Help secure the Solana network by staking SOL to a validator.",
    icon: <ShieldIcon className="size-12" />,
  },
  {
    title: "Transfer SOL",
    href: "/transfer-sol",
    description: "Easily transfer native SOL to any other Solana wallet.",
    icon: <WalletIcon className="size-12" />,
  },
  {
    title: "Transfer BARK Tokens",
    href: "/transfer-bark",
    description: "Easily transfer BARKs to any other Solana wallet.",
    icon: <CoinsIcon className="size-12" />,
  },
  {
    title: "Mint an NFT",
    href: "/mint-nft",
    description:
      "Allow anyone to claim a digital collectible from a Collection.",
    icon: <ImageIcon className="size-12" />,
  },
];

export default function Pages() {
  return (
    <section
      id="features"
      className="container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Solana Actions
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          This project contains example code snippets for creating Solana
          Actions.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {actionCards.map((item, index) => (
          <Link key={index} href={item.href} passHref>
            <a className="group">
              <Card className="group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="space-y-3">
                    {item.icon}
                    <span className="block font-bold group-hover:text-pretty">
                      {item.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>

      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          You can find the{" "}
          <Button variant="link" asChild>
            <Link href={siteConfig.links.github} target="_blank">
              full source code
            </Link>
          </Button>{" "}
          for this entire repo on GitHub.
        </p>
      </div>
    </section>
  );
}
