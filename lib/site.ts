import type { Metadata } from "next";

/*
  Site-wide links and shell copy in one place. Placeholders ("#") are waiting on
  Will (see "Needed from Will" in CLAUDE.md): Substack, LinkedIn and Bluesky URLs.
*/
export type SocialNetwork = "github" | "linkedin" | "bluesky" | "substack";

export const SITE_NAME = "Will Darkins";

export const TAGLINE = "Security · Systems · Fatherhood · Sports";

export const FOOTER_NOTE = "© 2026 · Built with Next.js on Cloudflare · Writing lives on Substack";

/*
  Open Graph fields every page shares. Next replaces (doesn't merge) `openGraph`
  when a page sets its own, so pages spread this in: `{ ...OPEN_GRAPH_BASE, title }`.
*/
export const OPEN_GRAPH_BASE = {
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
} satisfies Metadata["openGraph"];

export const SUBSTACK_URL = "#";

export const SOCIALS: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "github", label: "GitHub", href: "https://github.com/willdarkins" },
  { network: "linkedin", label: "LinkedIn", href: "#" },
  { network: "bluesky", label: "Bluesky", href: "#" },
  { network: "substack", label: "Substack", href: SUBSTACK_URL },
];

export const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Newsletter", href: SUBSTACK_URL, external: true },
  { label: "About", href: "/about" },
];
