import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true, // You can enable this later when support functionality is ready
    },
  ],
  sidebarNav: [
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: "payments", // Ensure this icon exists in your icons set
    },
    {
      title: "Donations",
      href: "/dashboard/donate",
      icon: "donate", // Ensure this icon exists in your icons set
    },
    {
      title: "Voting",
      href: "/dashboard/vote",
      icon: "vote", // Ensure this icon exists in your icons set
    },
    {
      title: "Staking",
      href: "/dashboard/stake",
      icon: "stake", // Ensure this icon exists in your icons set
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing", // Ensure this icon exists in your icons set
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings", // Ensure this icon exists in your icons set
    },
  ],
};
