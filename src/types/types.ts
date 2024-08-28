import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string;           // Name of the site
  description: string;    // Description of the site
  url: string;            // Base URL of the site
  ogImage: string;        // URL for the Open Graph image
  logoUrl: string;        // URL for the site's logo
  links: {
    twitter: string;      // X (Formerly Twitter) profile URL
    instagram: string;    // Instagram profile URL
    github: string;       // GitHub repository URL
    docs: string;         // Documentation URL
  };
};
