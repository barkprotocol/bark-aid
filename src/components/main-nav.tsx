'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

interface NavItem {
  title: string
  href: string
  description?: string
}

interface MainNavProps {
  items?: NavItem[]
}

const logoUrl = "https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"

function BlinkingLogo() {
  return (
    <span className="font-bold">
      B
      <span className="animate-pulse">Li</span>
      NK
    </span>
  )
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Image
                src={logoUrl}
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <BlinkingLogo />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {items?.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function MobileNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-3">
      <Link
        href="/"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-black dark:text-white" : "text-muted-foreground"
        )}
      >
        <Image
          src={logoUrl}
          alt="Logo"
          width={24}
          height={24}
          className="mr-2"
        />
        <BlinkingLogo />
      </Link>
      {items?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}