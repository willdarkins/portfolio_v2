/*
  Site-wide links in one place. Placeholders ("#") are waiting on Will
  (see "Needed from Will" in CLAUDE.md): Substack, LinkedIn and Bluesky URLs.
*/
export type SocialNetwork = "github" | "linkedin" | "bluesky" | "substack";

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
