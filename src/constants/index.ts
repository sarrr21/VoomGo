export const MENU_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: "📊",
  },
  {
    title: "User Management",
    icon: "👥",
    children: [
      { title: "Riders", href: "/riders" },
      { title: "Drivers", href: "/drivers" },
    ],
  },
  {
    title: "Admin Management",
    icon: "⚙️",
    children: [
      { title: "Admin", href: "/admin" },
      { title: "Support", href: "/support" },
      { title: "Supervisor", href: "/supervisor" },
    ],
  },
  {
    title: "Pricing & Tariffs",
    href: "/pricing",
    icon: "💰",
  },
  {
    title: "Financials",
    href: "/financials",
    icon: "📈",
  },
  {
    title: "Support & Disputes",
    href: "/support-disputes",
    icon: "🎧",
  },
  {
    title: "Loyalty & Rewards",
    href: "/loyalty",
    icon: "🎁",
  },
  {
    title: "Account & Settings",
    href: "/settings",
    icon: "⚙️",
  },
  {
    title: "Help",
    href: "/help",
    icon: "❓",
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
