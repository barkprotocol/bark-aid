'use client'

import Link from "next/link"
import HeroSection from "@/components/ui/hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Wallet as WalletIcon,
  Heart as HeartIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  RefreshCw as RefreshCwIcon,
  BookOpen as BookOpenIcon,
  Cog as CogIcon,
  FileText as FileTextIcon,
} from "lucide-react"
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline"

const actionCards = [
  {
    title: "On-chain Memo",
    href: "/actions/memo",
    description: "Send and record simple messages on the Solana blockchain using SPL Memo, ensuring transparent communication.",
    icon: DocumentTextIcon,
    useCase: "Governance",
  },
  {
    title: "Staking SOL",
    href: "/actions/stake",
    description: "Contribute to the security and efficiency of the Solana network by staking SOL with validators.",
    icon: ShieldCheckIcon,
    useCase: "DeFi",
  },
  {
    title: "SPL Token Transactions",
    href: "/actions/transactions",
    description: "Transfer SPL tokens securely and efficiently. Learn to create, mint, and manage custom tokens on Solana.",
    icon: WalletIcon,
    useCase: "Payments",
  },
  {
    title: "Mint an NFT",
    href: "/actions/mint",
    description: "Create and distribute unique digital collectibles on the Solana blockchain, enabling digital ownership and creativity.",
    icon: PhotoIcon,
    useCase: "NFT",
  },
  {
    title: "Charity",
    href: "/actions/donate",
    description: "Support causes and projects by making donations through the Solana blockchain, fostering community and growth.",
    icon: HeartIcon,
    useCase: "Social Impact",
  },
  {
    title: "Payments",
    href: "/actions/payments",
    description: "Manage and process payments for various services using secure Solana-based transactions.",
    icon: CreditCardIcon,
    useCase: "Payments",
  },
  {
    title: "Vote",
    href: "/actions/vote",
    description: "Engage in governance by casting your vote on proposals and decisions within the Solana ecosystem.",
    icon: CheckCircleIcon,
    useCase: "Governance",
  },
  {
    title: "Manage Wallet",
    href: "/actions/wallet",
    description: "View and configure your wallet settings, track your assets, and ensure the security of your holdings.",
    icon: SettingsIcon,
    useCase: "Wallet",
  },
  {
    title: "Token Swap",
    href: "/actions/swap",
    description: "Easily exchange different tokens on the Solana blockchain, providing liquidity and enabling efficient trading.",
    icon: RefreshCwIcon,
    useCase: "DeFi",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      <HeroSection />

      <main className="px-4 sm:px-6 lg:px-8">
        <section
          id="about"
          className="max-w-7xl mx-auto flex flex-col items-center space-y-10 py-20 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-[#D0BFB4] bg-opacity-20 p-3 transition-transform hover:scale-110">
              <BookOpenIcon className="w-6 h-6 text-[#A08D7C]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              About Us
            </h2>
          </div>
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:leading-7">
            We are dedicated to leveraging the full potential of the Solana blockchain to deliver innovative solutions and features. Our goal is to offer a seamless experience for managing assets, participating in governance, and more. Join us as we support the growth and adoption of the Solana ecosystem.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="default" size="lg" className="bg-[#D0BFB4] text-black hover:bg-[#A08D7C] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              <Link href="/services" className="flex items-center gap-2">
                <CogIcon className="w-5 h-5" />
                Our Services
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#D0BFB4] text-[#A08D7C] hover:bg-[#D0BFB4] hover:text-black transition-all duration-300 shadow-md hover:shadow-lg">
              <Link href="https://whitepaper.barkprotocol.net" className="flex items-center gap-2">
                <FileTextIcon className="w-5 h-5" />
                Read Whitepaper
              </Link>
            </Button>
          </div>
        </section>

        <section
          id="features"
          className="max-w-7xl mx-auto space-y-12 py-20"
        >
          <div className="text-center">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="rounded-full bg-[#D0BFB4] bg-opacity-20 p-3 transition-transform hover:scale-110">
                <CogIcon className="w-6 h-6 text-[#A08D7C]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Features
              </h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto sm:leading-7">
              Discover various functionalities and actions that showcase the versatility of Solana. Each action is designed to provide seamless interaction with blockchain technology, enhancing your digital experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actionCards.map((item, index) => (
              <Link key={index} href={item.href} className="group">
                <Card className="h-full transition-all duration-300 hover:border-[#D0BFB4] hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <div className="rounded-full bg-[#D0BFB4] bg-opacity-20 p-1.5 transition-transform group-hover:scale-110">
                        <item.icon className="w-5 h-5 text-[#A08D7C]" aria-hidden="true" />
                      </div>
                      <span className="group-hover:text-[#A08D7C] transition-colors duration-300">
                        {item.title}
                      </span>
                      {item.useCase && (
                        <span className="ml-auto inline-block rounded-full bg-[#D0BFB4] bg-opacity-20 px-2 py-0.5 text-xs font-medium text-[#A08D7C]">
                          {item.useCase}
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}