"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import Image from "next/image";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const handleMenuToggle = () => {
    setShowMobileMenu(prevState => !prevState);
  };

  return (
    <div className="flex gap-6 md:gap-10">
      {/* Desktop Logo and Site Name */}
      <Link
        href="/"
        className="hidden text-lg items-center space-x-2 md:flex hover:underline underline-offset-4"
      >
        <Image
          src="/icon.png" // Use Image for optimized loading
          alt="Site Logo"
          width={32} // Adjust the width as needed
          height={32} // Adjust the height as needed
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {/* Desktop Navigation */}
      {items?.length ? (
        <nav className="hidden gap-2 md:flex">
          {items.map((item) => (
            <Button key={item.href} variant="link" asChild>
              <Link
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                aria-disabled={item.disabled} // Accessibility improvement
              >
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      ) : null}

      {/* Mobile Menu Toggle */}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={handleMenuToggle}
        aria-label={showMobileMenu ? "Close menu" : "Open menu"} // Accessibility improvement
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span className="font-bold sr-only">Menu</span>
      </button>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
