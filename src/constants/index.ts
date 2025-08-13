export type IconKey =
  | "home"
  | "store"
  | "fileText"
  | "lineChart"
  | "headphones"
  | "gift"
  | "settings"
  | "help";

export const MENU_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    iconKey: "home" as const,
  },
  {
    title: "User Management",
    iconKey: "store" as const,
    children: [
      { title: "Riders", href: "/riders" },
      { title: "Drivers", href: "/drivers" },
    ],
  },
  {
    title: "Admin Management",
    iconKey: "store" as const,
    children: [
      { title: "Admin", href: "/admin" },
      { title: "Support", href: "/support" },
      { title: "Supervisor", href: "/supervisor" },
    ],
  },
  {
    title: "Pricing & Tariffs",
    href: "/pricing",
    iconKey: "fileText" as const,
  },
  {
    title: "Financials",
    href: "/financials",
    iconKey: "lineChart" as const,
  },
  {
    title: "Support & Disputes",
    href: "/support-disputes",
    iconKey: "headphones" as const,
  },
  {
    title: "Loyalty & Rewards",
    href: "/loyalty",
    iconKey: "gift" as const,
  },
  {
    title: "Account & Settings",
    href: "/settings",
    iconKey: "settings" as const,
  },
  {
    title: "Help",
    href: "/help",
    iconKey: "help" as const,
  },
] as const

export const DRIVER_TABS = [
  "All Drivers (2097)",
  "Economy (793)",
  "Comfort (419)",
  "XL Van (152)",
  "Delivery (373)",
] as const

export const PROFILE_TABS = ["Trip History", "Withdrawal", "Rating & Feedback"] as const
