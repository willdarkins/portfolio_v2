import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

const BASE =
  "inline-flex items-center rounded px-5 text-label font-semibold motion-safe:transition-colors";

const STYLES = {
  onNavy: {
    primary: "bg-white py-3.25 text-navy hover:bg-gold focus-visible:outline-gold",
    secondary: "border border-white/45 py-3 text-white hover:border-white focus-visible:outline-gold",
  },
  onPaper: {
    primary: "bg-navy py-3.25 text-white hover:bg-navy-deep",
    secondary: "border border-navy py-3 text-navy hover:bg-navy hover:text-white",
  },
} as const;

/* CTA link styled as a button. `external` routes through ExternalLink (↗ + label + rel). */
export function Button({
  href,
  children,
  variant = "primary",
  tone = "onPaper",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  tone?: "onNavy" | "onPaper";
  external?: boolean;
}) {
  const className = `${BASE} ${STYLES[tone][variant]}`;
  return external ? (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
