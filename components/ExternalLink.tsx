import type { ReactNode } from "react";

/*
  Every link that leaves the site goes through here: a visible ↗ (hidden from
  screen readers), a spoken "(external link)", and rel="noopener noreferrer".
  Opens in the same tab (decided Nov 2026).
*/
export function ExternalLink({
  href,
  children,
  className,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Set false when the caller draws its own ↗ (e.g. inside an ink underline). */
  arrow?: boolean;
}) {
  return (
    <a href={href} rel="noopener noreferrer" className={className}>
      {children}
      {arrow && <span aria-hidden="true">{"\u00a0↗"}</span>}
      <span className="sr-only"> (external link)</span>
    </a>
  );
}
