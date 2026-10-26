# Portfolio Build — Living State

**How to use this doc:** This is the working memory for the portfolio build across chats and Claude Code sessions. Read it first at the start of any session. Update the **Current Status**, **Next Actions**, and **Session Log** at the end of any session that changes something. Keep it short and current — stale state is worse than none.

Next.js agent docs: @AGENTS.md

**Last updated:** October 26, 2026 · PR #14 (Next.js Phase 0 scaffold) merged to main. Clean install + build + local Worker preview pass on Next 16 (branch `phase0-build-fixes`). Not yet deployed.

---

## Current status

**Repositioned, Oct 2026.** Will's role has moved past QA into security tooling (Snyk/Renovate agent), GRC (DPIA framework, risk register + audits) and platform ownership (Looker + an AI ticket skill). The site no longer pitches "QA → cybersecurity"; it pitches **security, governance and the systems in between**, with QA as background. **Personal writing moves to Substack**; the site becomes the professional portfolio and pulls recent posts in via RSS.

**New approved homepage:** the "Homepage Redesign" canvas artifact (claude.ai Design canvas, `project/Main.dc.html`). It supersedes the copy and structure of `claude/homepage-reference.html`; the visual system (palette, type, ink layer, portrait) is unchanged.

**Phase 0 scaffold is merged** (Next.js + tokens + fonts + MDX layer + OpenNext/Cloudflare wiring). It was hand-authored without `npm install`/`next build`. Leftover `node_modules/`, `.next/`, `.open-next/` and `.wrangler/` folders dated Jul 20 exist on Will's machine, so an install and OpenNext build ran once, but nothing was deployed. Treat those as untrusted: start from a clean reinstall.

---

## Repo

- **GitHub:** `willdarkins/portfolio_v2`. Local clone: `~/Documents/willdarkins-com/willdarkins` (Linux, zsh).
- **main** includes the Next.js scaffold via merged **PR #14** (main at `2fb376f` as of Oct 26). The `nextjs-rebuild` branch is gone (merged).
- **Old Vite site** is preserved under tag **`v2-vite-final`**.
- **Toolchain:** Node v24.15.0, npm 11.12.1.
- **Pushing over HTTPS:** run `gh auth setup-git` once, or push with `git -c credential.helper='!gh auth git-credential' push origin main`.
- **This file lives in the repo as `CLAUDE.md`** so Claude Code loads it automatically.

**Working agreement:** Will's planning chat writes copy-paste prompts; Will runs them in Claude Code (CLI) and pastes results back. Claude Code reports before anything risky and waits for an OK. Never force-push, `reset --hard`, or delete branches.

**Known gaps (found Oct 26, fix in the phase noted):**
- `DEPLOY.md` is stale: it says to create a new repo `willdarkins-com` over SSH and connect that in Workers Builds. The real repo is `willdarkins/portfolio_v2`. Fix at the deploy step. (Worker name `willdarkins-com` in `wrangler.jsonc` is correct.)
- `globals.css` tokens still use blog names (`cyber`, `parenting`, `orioles`, `observations`); rename to lane names and add muted `#6e695f`. Phase 1.
- `lib/posts.ts` + `content/posts/` still use the blog schema; convert to case studies under `content/work/`. Phase 3.
- `README.md` still describes the blog. Update at the end of Phase 0.
- `claude/homepage-reference.html` and the Design canvas live in the claude.ai project, not the repo.
- Deferred major upgrades: ~~Next 16 (removes `next lint`; needs OpenNext support)~~ ✅ done Oct 26 (forced by OpenNext's support-window check after Next 15 EOL'd Oct 21), TypeScript 7, zod 4, next-mdx-remote 6, ESLint 10. Do these deliberately, after launch, one at a time.
- Remaining audit items need zod 4 / next-mdx-remote 6; MDX is first-party only, so the next-mdx-remote advisory doesn't apply yet.
- `public/_headers` security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) apply only to static assets, not to Worker-rendered HTML pages (verified in `npm run preview`). Move them to `headers()` in `next.config.ts` or middleware. Before launch / Phase 5.
- `wrangler.jsonc` `compatibility_date` is `2025-03-25`; wrangler warns it's stale. Bump at the deploy step.
- `next dev` (Next 16) generates an `AGENTS.md`; not yet committed or ignored — decide whether to keep it.
- `@eslint/eslintrc` devDependency is unused since the flat-config switch; remove when convenient.

---

## Locked decisions

- **Positioning (Oct 2026):** Security · Governance · Automation. Hero headline: "I connect the systems that *should talk* — and make sure they do it safely." QA is the origin story, not the label. Employer stays unnamed; work described generically.
- **Writing lives on Substack (Oct 2026).** No on-site blog. Homepage "From the Newsletter" cards are filled from the Substack RSS feed and link out; nav item "Newsletter ↗" links out; subscribe band on the homepage. Optional later: `writing.willdarkins.com` → Substack custom domain. No iframe embeds.
- **Framework:** Next.js (App Router) + React + TypeScript.
- **Content:** ~~MDX blog~~ → MDX is now only for **case studies** (Work pages), reusing the existing loader (gray-matter + Zod + next-mdx-remote/rsc). Frontmatter for case studies: title, tags, summary, outcome, order, draft.
- **Styling:** Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) + `@tailwindcss/typography`.
- **Hosting/deploy:** Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`), git-push-to-deploy (Workers Builds). Replaces the plan's `next-on-pages`.
- **Domain:** willdarkins.com at the apex; `www` 301 → apex.
- **Analytics:** Cloudflare Web Analytics or Plausible, Phase 4.

---

## What's in the repo (Phase 0)

```
app/layout.tsx      fonts (Newsreader/Inter/Caveat via next/font) + <html> font vars + metadata
app/page.tsx        placeholder homepage — proves tokens + all 3 fonts + content layer load
app/globals.css     Tailwind v4 + design tokens in @theme + reduced-motion-safe ink-underline
components/MDXContent.tsx   renders MDX body as RSC (next-mdx-remote/rsc + remark-gfm)
content/posts/hello-world.mdx   sample post — repurpose dir to content/work/ for case studies
lib/posts.ts        typed content layer: Zod schema + loaders — adapt schema for case studies
public/_headers     long-cache for /_next/static + baseline security headers
wrangler.jsonc      Worker config (name willdarkins-com, assets, nodejs_compat)
open-next.config.ts OpenNext adapter config
next.config.ts      initOpenNextCloudflareForDev()
README.md / DEPLOY.md
```

---

## Working in the code

```bash
npm run dev       # next dev — http://localhost:3000
npm run build     # next build (strict: type errors fail the build; Next 16 doesn't lint here)
npm run lint      # eslint . (flat config in eslint.config.mjs)
npm run preview   # opennext build + preview the real Worker locally
npm run deploy    # opennext build + deploy to Cloudflare Workers
```

- **Import alias:** `@/*` → repo root (e.g. `import { getAllPosts } from "@/lib/posts"`).
- **Design tokens — the one rule:** all tokens live once, in `app/globals.css` under `@theme`. Use the generated utilities (`bg-navy`, `text-gold`, `font-serif`…); never hardcode hex values or add ad-hoc CSS. Need a new color or font? Add the token to `@theme`.
- **Scope:** do not change files unless asked.

---

## Design system

**Colors** — navy `#16305a`, navy-deep `#0f2444`, gold `#e9c46a`, ink `#1a1a1a`, ink-soft `#3d4149`, paper `#f7f5f0`, paper-warm `#efece4`, line `#d9d5cc`, muted text `#6e695f` (replaces `#8a857a` for small grey text — passes 4.5:1). Lane/category colors — DevSecOps `#16305a`, Governance & Risk `#6a5a2c`, Platforms & AI `#4a5240`, Orioles `#a8451a`.

**Type** — Newsreader (serif), Inter (sans/UI), Caveat (hand). Confirmed.

**Ink layer** — hover-draw nav underlines (reduced-motion safe), ink-blob nameplate dot, handwritten margin notes, hand-numbered Selected Work, navy pen-and-ink portrait, "Will" footer signature.

**Homepage structure (approved Oct 2026):**
Masthead (tagline **Security · Systems · Fatherhood · Sports**; GitHub/LinkedIn/Bluesky/Substack icons) → Nav (Home · Work · Newsletter ↗ · About) → Hero split (navy panel + portrait; CTAs "See the work" / "Read the newsletter ↗") → **What I Do** (3 lanes: DevSecOps, Governance & Risk, Platforms & AI) → **Selected Work** (4 numbered case studies, each with an Outcome line) → **How I got here** strip (Radio & TV → QA → Release mgmt → Security, governance & platforms) → **From the Newsletter** (3 RSS cards + subscribe band) → Now strip (Building / Studying Security+ / Certified Google Cybersecurity) → Footer.

**Selected Work entries:** 01 Snyk × Renovate Triage Agent · 02 A DPIA Framework From Scratch · 03 Department Risk Register & Audits · 04 Looker, Owned and Automated.

---

## Site architecture (pages)

Home · Work (case-study index + one page per case study) · About (bio + path) · Contact. Newsletter = external Substack link. Nav: Home / Work / Newsletter ↗ / About.

---

## Next actions

**Now (Claude Code, prompted step by step):**
1. ✅ Replace stale `CLAUDE.md` with this doc (Oct 26).
2. ✅ Clean reinstall (remove leftover build folders, `npm ci`/`npm install`), then `npm run build` and `npm run dev`; fix whatever the hand-authored scaffold gets wrong (Oct 26, branch `phase0-build-fixes`).
3. Follow `DEPLOY.md` → live "hello world" at willdarkins.com. Closes Phase 0.

**Will:**
- Create the Substack (name, URL) so the RSS feed exists.

**Then (Claude Code):**
- Phase 1 components per the new homepage structure (incl. work-item, lane, path strip, newsletter card, subscribe band).
- Phase 2: build the approved homepage, Work index + case-study template, About.
- Phase 3 (revised): Substack RSS fetch for newsletter cards (server-side, cached/revalidated) + MDX case studies. Drop the blog index/post template and category filtering.
- Phases 4–6 unchanged (RSS feed of the site itself no longer needed).

---

## Needed from Will (content, non-blocking)

- **Outcome numbers** for each of the 4 case studies (the highest-value content on the page).
- **Substack URL** (and whether to use `writing.willdarkins.com`).
- **Social URLs:** GitHub, LinkedIn, Bluesky.
- **A photo** to trace into the line portrait (vertical ~4:5).

---

## Session log

- **2026-10-26 (Phase 0 build)** — Clean `npm ci`; scaffold built and linted with no code fixes. Next 15 EOL blocked OpenNext, so upgraded to Next 16.4.3 (`eslint .` flat config) + in-range `npm audit fix` (OpenNext 1.20.13, wrangler 4.153.0). Build, lint, dev and `npm run preview` all pass.
- **2026-10-26 (repo sync)** — PR #14 merged; local main synced at `2fb376f`; `nextjs-rebuild` gone. Found leftover Jul 20 build folders locally (never deployed). Replaced stale `CLAUDE.md` with this doc. Next: clean install/build, then deploy.
- **2026-10-26 (repositioning + redesign)** — Role has shifted from QA into security tooling, GRC and platform ownership. Repositioned site around security/governance/systems; QA moved to background. Decided writing lives on Substack (RSS-fed cards, link out, no iframe). Redesigned homepage on a Design canvas, same aesthetic: new hero, What I Do lanes, 4 case studies with outcomes, "how I got here" path, newsletter cards + subscribe band. Tagline → "Security · Systems · Fatherhood · Sports". Employer kept unnamed. Approved.
- **2026-07-20 (Phase 0 build)** — Tailwind v4, custom loader + Zod, OpenNext on Workers, apex domain. Hand-authored scaffold (no npm in sandbox). git init + 2 commits. Pending local install/build/deploy.
- **2026-07-18/20 (design)** — Original homepage design + ink layer; saved as `homepage-reference.html`.
