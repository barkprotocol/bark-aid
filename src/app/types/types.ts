export interface ActionsJson {
  actionType: string;
  timestamp: number;
  userId: string;
}

// Existing types
export interface MarketingNavItem {
  title: string;
  href: string;
}

export interface MarketingConfig {
  mainNav: MarketingNavItem[];
}
