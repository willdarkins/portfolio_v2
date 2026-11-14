import type { Metadata } from "next";
import { Newsreader, Inter, Caveat } from "next/font/google";
import { OPEN_GRAPH_BASE } from "@/lib/site";
import "./globals.css";

/*
  Fonts are loaded and self-hosted by next/font (no render-blocking Google
  <link>, no layout shift). Each exposes a CSS variable that the Tailwind
  @theme block in globals.css maps onto --font-serif / --font-sans / --font-hand.
*/
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://willdarkins.com"),
  title: {
    default: "Will Darkins — Security · Governance · Automation",
    template: "%s · Will Darkins",
  },
  description:
    "I connect the systems that should talk — and make sure they do it safely. Security tooling, governance and risk frameworks, and platform automation.",
  // Shared fields only; pages that set openGraph spread OPEN_GRAPH_BASE in
  // (Next replaces the whole openGraph object per segment).
  openGraph: OPEN_GRAPH_BASE,
  // Kept out of search results until launch; comes off in a later PR.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
