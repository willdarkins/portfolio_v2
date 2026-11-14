import { LANE_BG, type Lane } from "@/lib/lanes";
import { ExternalLink } from "./ExternalLink";
import { LaneLabel } from "./LaneLabel";
import { MarginNote } from "./ink/MarginNote";

/* A Substack post card. Phase 1 takes props; Phase 3 fills them from the RSS feed. */
export function NewsletterCard({
  href,
  tone,
  kicker,
  title,
  excerpt,
  date,
  note,
}: {
  href: string;
  /** Color for the header block + kicker. The section → color mapping is decided in Phase 3. */
  tone: Lane;
  kicker: string;
  title: string;
  excerpt: string;
  date: string;
  /** Optional handwritten aside pinned to the top-right corner. */
  note?: string;
}) {
  return (
    <ExternalLink href={href} arrow={false} className="group relative block text-ink">
      {note && (
        <MarginNote tone="orioles" rotate="rotate-6" decorative className="absolute -top-4 -right-1">
          {note}
        </MarginNote>
      )}
      <span aria-hidden="true" className={`hatch mb-3.25 block h-30 rounded ${LANE_BG[tone]}`} />
      <LaneLabel lane={tone}>{kicker}</LaneLabel>
      <h3 className="mt-2.25 mb-2 font-serif text-lane-title font-semibold group-hover:text-navy">{title}</h3>
      <p className="font-serif text-body text-ink-soft">{excerpt}</p>
      <p className="mt-2.75 text-meta text-muted">
        {date} · Substack<span aria-hidden="true"> ↗</span>
      </p>
    </ExternalLink>
  );
}
