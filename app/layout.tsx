import type { Metadata } from "next";
import { Newsreader, Inter, Caveat } from "next/font/google";
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
    default: "Will Darkins — Security · Fatherhood · Baseball · Field Notes",
    template: "%s · Will Darkins",
  },
  description:
    "QA engineer moving into cybersecurity. Writing about the security-learning journey, fatherhood, the Baltimore Orioles, and whatever else I notice.",
  // Keep the placeholder out of search results until the real homepage ships
  // (Phase 2).
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
