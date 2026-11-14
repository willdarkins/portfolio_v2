import Link from "next/link";
import { HandNumber } from "./ink/HandNumber";

/* One Selected Work row. Render inside an <ol> (the list carries the order; the hand number is decorative). */
export function WorkItem({
  number,
  title,
  tags,
  summary,
  outcome,
  href,
}: {
  number: number;
  title: string;
  tags: string[];
  summary: string;
  outcome: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group grid grid-cols-[40px_minmax(0,1fr)] items-center gap-6 border-b border-line px-2 py-row text-ink hover:bg-navy/4 motion-safe:transition-colors wide:grid-cols-[52px_minmax(0,1fr)_auto]"
      >
        <HandNumber n={number} />
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <h3 className="font-serif text-title font-semibold tracking-title">{title}</h3>
            <span className="text-tag font-semibold uppercase tracking-tag text-muted">
              {tags.join(" · ")}
            </span>
          </div>
          <p className="mt-1.5 font-serif text-body text-ink-soft">{summary}</p>
          <p className="mt-2 text-meta font-semibold text-navy">Outcome: {outcome}</p>
        </div>
        <span
          aria-hidden="true"
          className="hidden -translate-x-1.5 text-note text-navy opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-safe:transition wide:inline"
        >
          →
        </span>
      </Link>
    </li>
  );
}
