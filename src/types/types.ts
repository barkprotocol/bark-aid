import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  logoUrl: string;  // Add this line to include logoUrl
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
};
