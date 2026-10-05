export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#process", label: "Process" },
  { href: "/#reviews", label: "Reviews" },
] as const;

export const QUOTE_LINK = {
  href: "/#quote",
  label: "Request a Quote",
} as const;

export type NavLink = (typeof NAV_LINKS)[number];
