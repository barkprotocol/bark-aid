import { DashboardConfig } from "@/types";

// Define the dashboard configuration
export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true, // This can be enabled when support functionality is added
    },
  ],
  sidebarNav: [
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: "payments", // Ensure this icon exists in your icon set
    },
    {
      title: "Donations",
      href: "/dashboard/donate",
      icon: "donate", // Ensure this icon exists in your icon set
    },
    {
      title: "Voting",
      href: "/dashboard/vote",
      icon: "vote", // Ensure this icon exists in your icon set
    },
    {
      title: "Staking",
      href: "/dashboard/stake",
      icon: "stake", // Ensure this icon exists in your icon set
    },
    {
      title: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: "subscriptions", // Ensure this icon exists in your icon set
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings", // Ensure this icon exists in your icon set
    },
  ],
};
