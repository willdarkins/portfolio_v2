import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { HeroSplit } from "@/components/HeroSplit";
import { LaneCard } from "@/components/LaneCard";
import { LaneLabel } from "@/components/LaneLabel";
import { Masthead } from "@/components/Masthead";
import { Nav } from "@/components/Nav";
import { NewsletterCard } from "@/components/NewsletterCard";
import { NowStrip } from "@/components/NowStrip";
import { PathStrip } from "@/components/PathStrip";
import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { SectionHeading, SectionLink } from "@/components/SectionHeading";
import { SubscribeBand } from "@/components/SubscribeBand";
import { WorkItem } from "@/components/WorkItem";
import { HandNumber } from "@/components/ink/HandNumber";
import { InkArrow } from "@/components/ink/InkArrow";
import { InkDot } from "@/components/ink/InkDot";
import { InkEmphasis } from "@/components/ink/InkEmphasis";
import { MarginNote } from "@/components/ink/MarginNote";
import { Signature } from "@/components/ink/Signature";
import { NAV_ITEMS, SOCIALS, SUBSTACK_URL } from "@/lib/site";

/*
  Living styleguide: tokens, type, spacing and every Phase 1 component with
  sample content. Not linked from the nav; noindex permanently. All sample data
  is inline — this page must never read files at runtime (Cloudflare preview
  builds render it inside the Worker, where content/ isn't on disk).
*/
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const COLORS: { name: string; swatch: string; hex: string }[] = [
  { name: "navy", swatch: "bg-navy", hex: "#16305a" },
  { name: "navy-deep", swatch: "bg-navy-deep", hex: "#0f2444" },
  { name: "gold", swatch: "bg-gold", hex: "#e9c46a" },
  { name: "ink", swatch: "bg-ink", hex: "#1a1a1a" },
  { name: "ink-soft", swatch: "bg-ink-soft", hex: "#3d4149" },
  { name: "paper", swatch: "bg-paper", hex: "#f7f5f0" },
  { name: "paper-warm", swatch: "bg-paper-warm", hex: "#efece4" },
  { name: "line", swatch: "bg-line", hex: "#d9d5cc" },
  { name: "muted", swatch: "bg-muted", hex: "#6e695f" },
  { name: "input-line", swatch: "bg-input-line", hex: "#827c71" },
  { name: "on-navy", swatch: "bg-on-navy", hex: "#cdd7e6" },
  { name: "on-navy-muted", swatch: "bg-on-navy-muted", hex: "#9db4d8" },
  { name: "devsecops", swatch: "bg-devsecops", hex: "#16305a" },
  { name: "governance", swatch: "bg-governance", hex: "#6a5a2c" },
  { name: "platforms", swatch: "bg-platforms", hex: "#4a5240" },
  { name: "orioles", swatch: "bg-orioles", hex: "#a8451a" },
  { name: "white (Tailwind built-in)", swatch: "bg-white", hex: "#ffffff" },
];

const TYPE: { token: string; className: string; px: number; use: string }[] = [
  { token: "text-tag", className: "text-tag font-sans font-semibold uppercase tracking-tag", px: 10.5, use: "Case-study tags" },
  { token: "text-kicker", className: "text-kicker font-sans font-bold uppercase tracking-kicker", px: 11, use: "Kickers, tagline" },
  { token: "text-meta", className: "text-meta font-sans", px: 12, use: "Nav, dates, Outcome, footer" },
  { token: "text-label", className: "text-label font-sans font-semibold", px: 13, use: "Section headings, buttons" },
  { token: "text-body", className: "text-body font-serif", px: 15, use: "Summaries, descriptions" },
  { token: "text-path", className: "text-path font-serif", px: 16, use: "Path strip" },
  { token: "text-lede", className: "text-lede font-serif", px: 18, use: "Hero lede" },
  { token: "text-note", className: "text-note font-hand font-semibold", px: 20, use: "Margin notes" },
  { token: "text-lane-title", className: "text-lane-title font-serif font-semibold", px: 22, use: "Lane + card titles" },
  { token: "text-title", className: "text-title font-serif font-semibold", px: 24, use: "Case-study titles" },
  { token: "text-hero-sm", className: "text-hero-sm font-serif font-semibold", px: 34, use: "Hero (mobile), signature" },
  { token: "text-work-number", className: "text-work-number font-hand font-bold", px: 36, use: "Hand numbers" },
  { token: "text-masthead-sm", className: "text-masthead-sm font-serif font-bold", px: 40, use: "Masthead (mobile)" },
  { token: "text-hero", className: "text-hero font-serif font-semibold", px: 44, use: "Hero headline" },
  { token: "text-masthead", className: "text-masthead font-serif font-bold", px: 54, use: "Masthead name" },
];

const SPACING: { token: string; bar: string; px: number; use: string }[] = [
  { token: "rule", bar: "w-rule", px: 11, use: "Heading → rule" },
  { token: "gutter-sm", bar: "w-gutter-sm", px: 20, use: "Side padding ≤760px" },
  { token: "row", bar: "w-row", px: 22, use: "Work rows, path strip" },
  { token: "heading", bar: "w-heading", px: 26, use: "Rule → content" },
  { token: "grid", bar: "w-grid", px: 30, use: "Column gap" },
  { token: "section", bar: "w-section", px: 44, use: "Section top padding" },
  { token: "gutter", bar: "w-gutter", px: 46, use: "Side padding" },
  { token: "hero", bar: "w-hero", px: 62, use: "Hero vertical padding" },
];

const SAMPLE_NAV = NAV_ITEMS;

/* One styleguide section; the heading text is what the e2e test looks for. */
function Specimen({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="pt-section">
      <SectionHeading id={id} title={title} />
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-page px-gutter-sm pb-section wide:px-gutter">
      <header className="pt-section">
        <h1 className="font-serif text-hero-sm font-semibold wide:text-hero">Styleguide</h1>
        <p className="mt-3 max-w-150 font-serif text-body text-ink-soft">
          Tokens, type and every component from the approved homepage, with sample content. Not linked
          from the site and never indexed.
        </p>
      </header>

      <Specimen id="sg-colors" title="Color tokens">
        <ul className="grid grid-cols-2 gap-3 wide:grid-cols-4">
          {COLORS.map((c) => (
            <li key={c.name} className="rounded-md border border-line bg-paper-warm p-2">
              <div className={`h-12 rounded border border-line ${c.swatch}`} />
              <p className="mt-2 text-kicker font-semibold text-ink">{c.name}</p>
              <p className="font-mono text-meta text-ink-soft">{c.hex}</p>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen id="sg-type" title="Type scale">
        <ul className="divide-y divide-line">
          {TYPE.map((t) => (
            <li key={t.token} className="grid gap-1 py-3 wide:grid-cols-[180px_minmax(0,1fr)] wide:items-baseline">
              <p className="text-meta text-muted">
                <code className="font-mono text-ink">{t.token}</code> · {t.px}px · {t.use}
              </p>
              <p className={`${t.className} text-ink`}>Security, systems and the habits between</p>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen id="sg-spacing" title="Spacing scale">
        <ul className="space-y-2">
          {SPACING.map((s) => (
            <li key={s.token} className="flex items-center gap-4 text-meta text-ink-soft">
              <code className="w-24 shrink-0 font-mono text-ink">{s.token}</code>
              <span aria-hidden="true" className={`h-3 shrink-0 rounded-sm bg-navy ${s.bar}`} />
              <span>
                {s.px}px · {s.use}
              </span>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen id="sg-masthead" title="Masthead">
        <Masthead tagline="Security · Systems · Fatherhood · Sports" socials={SOCIALS} />
      </Specimen>

      <Specimen id="sg-nav" title="Nav">
        <Nav items={SAMPLE_NAV} current="/" />
      </Specimen>

      <Specimen id="sg-hero" title="Hero split">
        <HeroSplit
          headingLevel={3}
          eyebrow="Security · Governance · Automation"
          headline={
            <>
              I connect the systems that <InkEmphasis>should talk</InkEmphasis> — and make sure they do it
              safely.
            </>
          }
          lede="QA taught me how software breaks. Now I build the security tooling, data-governance frameworks and platform automations that keep it from breaking in the first place."
          ctas={
            <>
              <Button href="#sg-work" tone="onNavy">
                See the work
              </Button>
              <Button href={SUBSTACK_URL} tone="onNavy" variant="secondary" external>
                Read the newsletter
              </Button>
            </>
          }
          note={
            <MarginNote tone="onNavy" size="large" rotate="-rotate-[4deg]" arrow="left" decorative>
              start here
            </MarginNote>
          }
          portrait={<PortraitPlaceholder />}
        />
      </Specimen>

      <Specimen id="sg-buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3.25 rounded-md bg-navy p-6">
          <Button href="#" tone="onNavy">
            Primary on navy
          </Button>
          <Button href={SUBSTACK_URL} tone="onNavy" variant="secondary" external>
            Secondary, external
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3.25 p-6">
          <Button href="#">Primary on paper</Button>
          <Button href="#" variant="secondary">
            Secondary on paper
          </Button>
          <Button href={SUBSTACK_URL} external>
            External
          </Button>
        </div>
      </Specimen>

      <Specimen id="sg-lane-label" title="Lane labels">
        <ul className="flex flex-wrap gap-6">
          <li><LaneLabel lane="devsecops">DevSecOps</LaneLabel></li>
          <li><LaneLabel lane="governance">Governance &amp; Risk</LaneLabel></li>
          <li><LaneLabel lane="platforms">Platforms &amp; AI</LaneLabel></li>
          <li><LaneLabel lane="orioles">Orioles</LaneLabel></li>
        </ul>
      </Specimen>

      <Specimen id="sg-lanes" title="Lane cards">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-grid">
          <LaneCard lane="devsecops" label="DevSecOps" title="Security that lives in the pipeline">
            Vulnerability triage, dependency hygiene and the automation that keeps a scanner queue from
            turning into noise.
          </LaneCard>
          <LaneCard lane="governance" label="Governance & Risk" title="Knowing where the data goes">
            Data-protection impact assessments, risk registers and internal audits — written so
            non-security people can actually use them.
          </LaneCard>
          <LaneCard lane="platforms" label="Platforms & AI" title="Owning the tools, then automating them">
            Running an analytics platform end to end, and building AI agents that take the repetitive work
            off people’s plates.
          </LaneCard>
        </div>
      </Specimen>

      <Specimen id="sg-section-heading" title="Section heading">
        <SectionHeading
          id="sg-sample-heading"
          title="What I Do"
          aside={
            <MarginNote tone="orioles" decorative>
              three lanes, one habit ✎
            </MarginNote>
          }
        />
        <SectionHeading
          id="sg-sample-heading-link"
          title="From the Newsletter"
          aside={
            <SectionLink href={SUBSTACK_URL} external>
              All posts on Substack
            </SectionLink>
          }
        />
      </Specimen>

      <Specimen id="sg-work" title="Work items">
        <SectionHeading
          id="sg-sample-work"
          title="Selected Work"
          tight
          aside={<SectionLink href="#sg-work">All case studies →</SectionLink>}
        />
        <ol aria-labelledby="sg-sample-work">
          <WorkItem
            number={1}
            href="#sg-work"
            title="Snyk × Renovate Triage Agent"
            tags={["DevSecOps", "AI Agents", "CI"]}
            summary="Two tools were flagging the same dependencies and nobody trusted either queue. An agent now reconciles Snyk findings against Renovate PRs so each fix lands once."
            outcome="Sample outcome line — the measurable result goes here."
          />
          <WorkItem
            number={2}
            href="#sg-work"
            title="A DPIA Framework From Scratch"
            tags={["GRC", "Privacy", "Data Mapping"]}
            summary="A data-protection impact assessment with a data-flow matrix for every system, plus a visual stakeholders can read without a privacy background."
            outcome="Sample outcome line — systems mapped, adoption."
          />
        </ol>
      </Specimen>

      <Specimen id="sg-path" title="Path strip">
        <PathStrip
          label="how I got here"
          steps={[
            { strong: "Radio & TV", rest: "production" },
            { strong: "QA", rest: "& Playwright" },
            { strong: "Release", rest: "management" },
            { strong: "Security", rest: ", governance & platforms" },
          ]}
        />
      </Specimen>

      <Specimen id="sg-newsletter" title="Newsletter cards">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-grid pt-4">
          <NewsletterCard
            href={SUBSTACK_URL}
            tone="orioles"
            kicker="Orioles"
            title="Sample Orioles post title"
            excerpt="Filled from the Substack feed in Phase 3 — title, subtitle and date."
            date="Nov 2026"
            note="the fun one ✎"
          />
          <NewsletterCard
            href={SUBSTACK_URL}
            tone="governance"
            kicker="Parenting"
            title="The 5 A.M. Wake-Up Call Nobody Warns You About"
            excerpt="Toddlers, sleep math, and negotiating with someone who can’t tell time."
            date="Nov 2026"
          />
          <NewsletterCard
            href={SUBSTACK_URL}
            tone="platforms"
            kicker="Field Notes"
            title="Sample field-notes post title"
            excerpt="Whatever caught my eye this week."
            date="Oct 2026"
          />
        </div>
      </Specimen>

      <Specimen id="sg-subscribe" title="Subscribe band">
        <SubscribeBand
          heading="Get the newsletter"
          body="Baseball, fatherhood and whatever I notice — the occasional security piece, too. Free, on Substack."
        />
      </Specimen>

      <Specimen id="sg-now" title="Now strip">
        <NowStrip
          items={[
            { label: "Building", text: "security automation with AI agents" },
            { label: "Studying", text: "CompTIA Security+" },
            { label: "Certified", text: "Google Cybersecurity" },
          ]}
        />
      </Specimen>

      <Specimen id="sg-footer" title="Footer">
        <Footer note="© 2026 · Built with Next.js on Cloudflare · Writing lives on Substack" />
      </Specimen>

      <Specimen id="sg-ink" title="Ink layer">
        <dl className="grid gap-6 wide:grid-cols-2">
          <div>
            <dt className="text-meta text-muted">InkDot</dt>
            <dd className="mt-2 font-serif text-title font-bold">
              Will
              <InkDot />
              Darkins
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted">MarginNote (navy, orioles, with arrow)</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-6">
              <MarginNote>a note in the margin</MarginNote>
              <MarginNote tone="orioles" rotate="rotate-3">red pencil ✎</MarginNote>
              <MarginNote arrow="short" size="large" rotate="-rotate-2">with an arrow</MarginNote>
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted">HandNumber</dt>
            <dd className="mt-2 flex gap-6">
              <HandNumber n={1} />
              <HandNumber n={2} />
              <HandNumber n={3} />
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted">Signature</dt>
            <dd className="mt-2">
              <Signature />
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted">InkArrow</dt>
            <dd className="mt-2 flex items-center gap-6 text-navy">
              <InkArrow />
              <InkArrow variant="short" />
            </dd>
          </div>
          <div>
            <dt className="text-meta text-muted">InkEmphasis (on navy)</dt>
            <dd className="mt-2 rounded-md bg-navy p-4 font-serif text-lane-title font-semibold text-white">
              systems that <InkEmphasis>should talk</InkEmphasis>
            </dd>
          </div>
        </dl>
      </Specimen>
    </main>
  );
}
