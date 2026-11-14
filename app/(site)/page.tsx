import type { Metadata } from "next";
import { HOME } from "@/content/home";
import { Button } from "@/components/Button";
import { HeroSplit } from "@/components/HeroSplit";
import { LaneCard } from "@/components/LaneCard";
import { NewsletterCard } from "@/components/NewsletterCard";
import { NowStrip } from "@/components/NowStrip";
import { PathStrip } from "@/components/PathStrip";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { SectionHeading, SectionLink } from "@/components/SectionHeading";
import { SubscribeBand } from "@/components/SubscribeBand";
import { WorkItem } from "@/components/WorkItem";
import { InkEmphasis } from "@/components/ink/InkEmphasis";
import { MarginNote } from "@/components/ink/MarginNote";
import { getNewsletterPosts } from "@/lib/newsletter";
import { OPEN_GRAPH_BASE, SUBSTACK_URL } from "@/lib/site";

const TITLE = "Will Darkins — Security · Governance · Automation";
const DESCRIPTION =
  "I connect the systems that should talk — and make sure they do it safely. Security tooling, governance and risk frameworks, and platform automation.";

export const metadata: Metadata = {
  // Next replaces the whole openGraph object per segment, so the shared fields are spread in.
  openGraph: { ...OPEN_GRAPH_BASE, url: "/", title: TITLE, description: DESCRIPTION },
};

/* Section side padding, matching the canvas (20px ≤760px, 46px above). */
const PAD = "px-gutter-sm wide:px-gutter";

export default async function Home() {
  const { hero, lanes, work, path, newsletter, now } = HOME;
  const posts = await getNewsletterPosts();

  return (
    <>
      <HeroSplit
        eyebrow={hero.eyebrow}
        headline={
          <>
            {hero.headline.before}
            <InkEmphasis>{hero.headline.emphasis}</InkEmphasis>
            {hero.headline.after}
          </>
        }
        lede={hero.lede}
        ctas={
          <>
            <Button href={hero.primaryCta.href} tone="onNavy">
              {hero.primaryCta.label}
            </Button>
            <Button href={SUBSTACK_URL} tone="onNavy" variant="secondary" external>
              {hero.newsletterCta.label}
            </Button>
          </>
        }
        note={
          <MarginNote tone="onNavy" size="large" rotate="-rotate-[4deg]" arrow="left" decorative>
            {hero.note}
          </MarginNote>
        }
        portrait={<PortraitPlaceholder note={hero.portraitNote} />}
      />

      <section aria-labelledby="what-i-do" className={`${PAD} pt-section pb-2`}>
        <SectionHeading
          id="what-i-do"
          title={lanes.heading}
          aside={
            <MarginNote tone="orioles" decorative>
              {lanes.note}
            </MarginNote>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-grid">
          {lanes.items.map((l) => (
            <LaneCard key={l.lane} lane={l.lane} label={l.label} title={l.title}>
              {l.body}
            </LaneCard>
          ))}
        </div>
      </section>

      <section aria-labelledby="selected-work" className={`${PAD} pt-section pb-1.5`}>
        <SectionHeading
          id="selected-work"
          title={work.heading}
          tight
          aside={<SectionLink href={work.allLink.href}>{work.allLink.label}</SectionLink>}
        />
        <ol aria-labelledby="selected-work">
          {work.items.map((w, i) => (
            <WorkItem
              key={w.slug}
              number={i + 1}
              href={`/work/${w.slug}`}
              title={w.title}
              tags={w.tags}
              summary={w.summary}
              outcome={w.outcome}
            />
          ))}
        </ol>
      </section>

      {/* No visible heading in the canvas; the handwritten label names the strip, so the landmark repeats it. */}
      <section aria-label="How I got here" className={`${PAD} pt-10 pb-1`}>
        <PathStrip label={path.label} steps={path.steps} />
      </section>

      <section aria-labelledby="from-the-newsletter" className={`${PAD} pt-11.5 pb-2.5`}>
        <SectionHeading
          id="from-the-newsletter"
          title={newsletter.heading}
          aside={
            <SectionLink href={SUBSTACK_URL} external>
              {newsletter.allLink.label}
            </SectionLink>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-grid">
          {posts.map((p, i) => (
            <NewsletterCard
              key={`${i}-${p.url}`}
              href={p.url}
              tone={p.tone}
              kicker={p.kicker}
              title={p.title}
              excerpt={p.excerpt}
              date={p.date}
              note={p.note}
            />
          ))}
        </div>
        <div className="mt-section">
          <SubscribeBand heading={newsletter.subscribe.heading} body={newsletter.subscribe.body} />
        </div>
      </section>

      <section aria-label={now.label} className={`${PAD} pt-9 pb-11.5`}>
        <NowStrip items={now.items} />
      </section>
    </>
  );
}
