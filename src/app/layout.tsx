import { Inter } from "next/font/google"
import "./globals.css"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeModeToggle } from "@/components/theme-mode-toggle"
import dynamic from "next/dynamic"

// Import Inter font
const inter = Inter({ subsets: ["latin"] })

// Define viewport settings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

// Dynamically import wallet components to avoid SSR issues
const SolanaWalletProviderWrapper = dynamic(
  () => import("@/components/wallet-providers"),
  { ssr: false }
)

const WalletButton = dynamic(
  () => import("@/components/ui/wallet-button"),
  { ssr: false }
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SolanaWalletProviderWrapper>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
              {/* Header Section */}
              <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4">
                  <div className="flex h-16 items-center justify-between">
                    {/* Main Navigation */}
                    <MainNav items={marketingConfig.mainNav} />

                    <nav className="flex items-center gap-2">
                      {/* Connect Wallet Button */}
                      <WalletButton />

                      {/* Theme Toggle */}
                      <ThemeModeToggle />
                    </nav>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-grow">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>

              {/* Footer Section */}
              <SiteFooter className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700" />
            </div>
          </SolanaWalletProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}