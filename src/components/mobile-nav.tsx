import * as React from "react";
import Link from "next/link";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import { Icons } from "@/components/icons";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-auto p-6 pb-32 shadow-lg animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 flex flex-col gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2 text-lg font-bold" aria-label="Homepage">
          <Icons.logo className="w-8 h-8 text-sand" />
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              aria-disabled={item.disabled}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
