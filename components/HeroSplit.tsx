import type { ReactNode } from "react";

/* Navy panel (eyebrow, headline, lede, CTAs) beside the portrait. Stacks below ~880px. */
export function HeroSplit({
  eyebrow,
  headline,
  lede,
  ctas,
  note,
  portrait,
  headingLevel = 1,
}: {
  eyebrow: string;
  headline: ReactNode;
  lede: string;
  ctas: ReactNode;
  /** Margin note after the CTAs ("start here"). */
  note?: ReactNode;
  portrait: ReactNode;
  /** h1 on the homepage; lower on pages that already have one (e.g. /styleguide). */
  headingLevel?: 1 | 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))]">
      <div className="flex flex-col justify-center bg-navy px-gutter-sm py-hero text-white wide:px-gutter">
        <p className="mb-5 text-meta font-semibold uppercase tracking-kicker text-on-navy-muted">{eyebrow}</p>
        <Heading className="font-serif text-hero-sm font-semibold tracking-hero wide:text-hero">{headline}</Heading>
        <p className="mt-4.75 max-w-115 font-serif text-lede text-on-navy">{lede}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3.25">
          {ctas}
          {note && <span className="ml-1.5">{note}</span>}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-gutter-sm py-10 wide:px-gutter">{portrait}</div>
    </section>
  );
}
