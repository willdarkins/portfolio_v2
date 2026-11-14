import type { Lane } from "@/lib/lanes";
import type { NewsletterPost } from "@/lib/newsletter";
import { SUBSTACK_URL } from "@/lib/site";

/*
  All homepage copy, from the approved canvas (docs/design/homepage/Main.dc.html).
  "TK" marks content Will still owes; each has a TK(will) comment saying what's
  needed. Never fill a TK with an invented number or claim.
*/

export type LaneEntry = { lane: Lane; label: string; title: string; body: string };

export type WorkEntry = {
  /** Case-study route: /work/<slug> (built in PR 2B). */
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  outcome: string;
};

export type PathStep = { strong: string; rest: string };

export type NowEntry = { label: string; text: string };

type HomeContent = {
  hero: {
    eyebrow: string;
    headline: { before: string; emphasis: string; after: string };
    lede: string;
    primaryCta: { label: string; href: string };
    newsletterCta: { label: string };
    note: string;
    portraitNote: string;
  };
  lanes: { heading: string; note: string; items: LaneEntry[] };
  work: { heading: string; allLink: { label: string; href: string }; items: WorkEntry[] };
  path: { label: string; steps: PathStep[] };
  newsletter: {
    heading: string;
    allLink: { label: string };
    subscribe: { heading: string; body: string };
    samplePosts: NewsletterPost[];
  };
  now: { label: string; items: NowEntry[] };
};

export const HOME: HomeContent = {
  hero: {
    eyebrow: "Security · Governance · Automation",
    headline: {
      before: "I connect the systems that ",
      emphasis: "should talk",
      after: " — and make sure they do it safely.",
    },
    lede: "QA taught me how software breaks. Now I build the security tooling, data-governance frameworks and platform automations that keep it from breaking in the first place.",
    primaryCta: { label: "See the work", href: "/work" },
    newsletterCta: { label: "Read the newsletter" },
    note: "start here",
    portraitNote: "drawn from life, mostly",
  },

  lanes: {
    heading: "What I Do",
    note: "three lanes, one habit ✎",
    items: [
      {
        lane: "devsecops",
        label: "DevSecOps",
        title: "Security that lives in the pipeline",
        body: "Vulnerability triage, dependency hygiene and the automation that keeps a scanner queue from turning into noise.",
      },
      {
        lane: "governance",
        label: "Governance & Risk",
        title: "Knowing where the data goes",
        body: "Data-protection impact assessments, risk registers and internal audits — written so non-security people can actually use them.",
      },
      {
        lane: "platforms",
        label: "Platforms & AI",
        title: "Owning the tools, then automating them",
        body: "Running an analytics platform end to end, and building AI agents that take the repetitive work off people’s plates.",
      },
    ],
  },

  work: {
    heading: "Selected Work",
    allLink: { label: "All case studies →", href: "/work" },
    items: [
      {
        slug: "snyk-renovate-triage-agent",
        title: "Snyk × Renovate Triage Agent",
        tags: ["DevSecOps", "AI Agents", "CI"],
        summary:
          "Two tools were flagging the same dependencies and nobody trusted either queue. I built an agent that reconciles Snyk findings against Renovate PRs so each fix lands once.",
        // TK(will): measurable result, e.g. duplicate tickets cut by X%.
        outcome: "TK",
      },
      {
        slug: "dpia-framework",
        title: "A DPIA Framework From Scratch",
        tags: ["GRC", "Privacy", "Data Mapping"],
        summary:
          "Designed the company’s data-protection impact assessment: a data-flow matrix for every system, plus a visual stakeholders can read without a privacy background.",
        // TK(will): measurable result, e.g. N systems mapped, adopted company-wide.
        outcome: "TK",
      },
      {
        slug: "risk-register-audits",
        title: "Department Risk Register & Audits",
        tags: ["Risk", "Audit", "Process"],
        summary:
          "Built a department-by-department risk register and use it to run internal audits — turning “we should look at that” into owners, ratings and follow-ups.",
        // TK(will): measurable result, e.g. N departments audited.
        outcome: "TK",
      },
      {
        slug: "looker-owned-automated",
        title: "Looker, Owned and Automated",
        tags: ["Analytics", "Platform Admin", "AI"],
        summary:
          "Took over the company’s Looker instance and built an AI skill that handles most incoming tickets end to end, with a human check before anything ships.",
        // TK(will): measurable result, e.g. ticket turnaround from X days to Y hours.
        outcome: "TK",
      },
    ],
  },

  path: {
    label: "how I got here",
    steps: [
      { strong: "Radio & TV", rest: "production" },
      { strong: "QA", rest: "& Playwright" },
      { strong: "Release", rest: "management" },
      { strong: "Security", rest: ", governance & platforms" },
    ],
  },

  newsletter: {
    heading: "From the Newsletter",
    allLink: { label: "All posts on Substack" },
    subscribe: {
      heading: "Get the newsletter",
      body: "Baseball, fatherhood and whatever I notice — the occasional security piece, too. Free, on Substack.",
    },
    // Static samples until Phase 3's RSS fetch (lib/newsletter.ts). Kickers and
    // colors follow the canvas; everything post-specific is TK.
    samplePosts: [
      {
        // TK(will): filled from the Substack feed in Phase 3 (latest Orioles post).
        title: "TK",
        excerpt: "TK",
        date: "TK",
        url: SUBSTACK_URL,
        kicker: "Orioles",
        tone: "orioles",
        note: "the fun one ✎",
      },
      {
        // TK(will): filled from the Substack feed in Phase 3 (latest Parenting post).
        title: "TK",
        excerpt: "TK",
        date: "TK",
        url: SUBSTACK_URL,
        kicker: "Parenting",
        tone: "governance",
      },
      {
        // TK(will): filled from the Substack feed in Phase 3 (latest Field Notes post).
        title: "TK",
        excerpt: "TK",
        date: "TK",
        url: SUBSTACK_URL,
        kicker: "Field Notes",
        tone: "platforms",
      },
    ],
  },

  now: {
    label: "Now",
    items: [
      { label: "Building", text: "security automation with AI agents" },
      { label: "Studying", text: "CompTIA Security+" },
      { label: "Certified", text: "Google Cybersecurity" },
    ],
  },
};
