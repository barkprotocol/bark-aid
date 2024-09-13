import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Define default values for fallback
const defaultTitle = "BARK Blink";
const defaultDescription = "Solana Actions and Blinks";
const defaultImage = "https://ucarecdn.com/4bc61874-018e-481b-bc07-c3f93956f7bd/tchest.png";

export const metadata: Metadata = {
  title: siteConfig.name || defaultTitle,
  description: siteConfig.description || defaultDescription,
  openGraph: {
    title: siteConfig.name || defaultTitle,
    description: siteConfig.description || defaultDescription,
    url: siteConfig.url || "",
    images: [siteConfig.ogImage || defaultImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name || defaultTitle,
    description: siteConfig.description || defaultDescription,
    image: siteConfig.ogImage || defaultImage,
  },
};
