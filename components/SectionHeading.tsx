import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

/* Section title in small caps over a 2px ink rule, with an optional aside (link or margin note) on the right. */
export function SectionHeading({
  id,
  title,
  aside,
  tight = false,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
  /** Selected Work sits its rows right under the rule. */
  tight?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-rule ${tight ? "mb-1" : "mb-heading"}`}
    >
      <h2 id={id} className="text-label font-bold uppercase tracking-kicker">
        {title}
      </h2>
      {aside}
    </div>
  );
}

/* The small link that sits at the right of a SectionHeading ("All case studies →"). */
export function SectionLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "text-meta font-semibold text-navy hover:text-navy-deep";
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
