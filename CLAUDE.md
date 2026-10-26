# CLAUDE.md

Personal portfolio + editorial blog for Will Darkins (QA engineer moving into
cybersecurity). Content-driven, statically rendered, security-conscious.

## Stack

- **Next.js 15 (App Router)** + **React 19** + **TypeScript** (strict; builds fail
  on lint/type errors — see `next.config.ts`).
- **Tailwind CSS v4** via `@tailwindcss/postcss`, plus `@tailwindcss/typography`
  (the `prose` classes). No `tailwind.config` — everything is CSS-first in
  `app/globals.css`.
- **MDX content layer**: `.mdx` files in `content/posts/`, parsed by `gray-matter`,
  validated by a **Zod** schema in `lib/posts.ts`, rendered as RSC by
  `next-mdx-remote/rsc` (+ `remark-gfm`) through `components/MDXContent.tsx`.
- **Deploy**: Cloudflare Workers via the OpenNext adapter
  (`@opennextjs/cloudflare`). Config in `wrangler.jsonc` + `open-next.config.ts`.
  Full walkthrough in [DEPLOY.md](./DEPLOY.md).

## Commands

```bash
npm run dev       # next dev — http://localhost:3000
npm run build     # next build (strict)
npm run lint      # next lint
npm run preview   # opennext build + preview the real Worker locally
npm run deploy    # opennext build + deploy to Cloudflare Workers
```

Import alias: `@/*` → repo root (e.g. `import { getAllPosts } from "@/lib/posts"`).

## Design tokens — the one rule

**All design tokens live once, in `app/globals.css` under `@theme`.** Tailwind v4
generates utilities from them automatically — so use the utilities, never hardcode
hex values or add ad-hoc CSS:

- Colors: `bg-navy`, `text-gold`, `border-line`, `bg-paper-warm`, `text-ink-soft`,
  etc. (tokens: `navy`, `navy-deep`, `gold`, `ink`, `ink-soft`, `paper`,
  `paper-warm`, `line`, plus category kickers `cyber`/`parenting`/`orioles`/`observations`).
- Fonts: `font-serif` (Newsreader), `font-sans` (Inter), `font-hand` (Caveat).
  The font CSS vars are injected by `next/font` in `app/layout.tsx` and mapped in
  `@theme`.

Need a new color or font? Add the token to `@theme` and use its generated utility.
Category kicker colors are also exported as `CATEGORY_COLOR` in `lib/posts.ts` for
inline `style={{ color }}` use.

## Adding a blog post

Create `content/posts/<slug>.mdx`. The filename is the slug. Frontmatter is
Zod-validated at build time (`lib/posts.ts`) — a bad `category` or missing field
fails the build rather than shipping broken:

```mdx
---
title: "My Post Title"
date: "2026-07-20"                 # YYYY-MM-DD (any Date-parseable string)
category: "Cybersecurity"          # Cybersecurity | Parenting | Observations | Orioles
description: "One-line summary shown in listings."
hero: "/images/foo.jpg"            # optional
draft: false                       # true = hidden in prod, visible in `next dev`
---

Body — **Markdown** and MDX components both work (GFM enabled).
```

Loaders: `getAllPosts()` (newest first, drafts hidden in prod), `getPostBySlug()`,
`getAllSlugs()` (for `generateStaticParams`), `getPostsByCategory()`.

## Status: Phase 0 (scaffold + first deploy)

Finishing Phase 0 — the scaffold, design tokens, typed content layer, and a
placeholder homepage (`app/page.tsx`) that proves fonts/tokens/content all load.
Real pages, routing, and full design land in later phases. The immediate goal is
the first successful Cloudflare Workers deploy (see [DEPLOY.md](./DEPLOY.md)).
Baseline security headers are in `public/_headers`; full CSP/hardening is Phase 5.

## Scope

Do not change files unless asked. This CLAUDE.md is documentation only.
