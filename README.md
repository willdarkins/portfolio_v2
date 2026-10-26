# willdarkins.com

Personal portfolio + editorial blog for Will Darkins — a QA engineer moving into
cybersecurity. Built as a credential in its own right: clean, fast, typed, and
security-conscious.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · MDX blog posts
with a typed (Zod-validated) content layer · deployed to Cloudflare Workers via
the OpenNext adapter (`@opennextjs/cloudflare`).

> **Status: Phase 0** — scaffold, design tokens, content layer, and a placeholder
> homepage that proves the system loads. Real pages/design come in later phases.
> See the project plan and `state.md` in the Claude project for the roadmap.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Project layout

```
app/
  layout.tsx         # fonts (Newsreader/Inter/Caveat) + <html> font variables + metadata
  page.tsx           # Phase 0 placeholder homepage (proves tokens/fonts/content layer)
  globals.css        # Tailwind v4 + design tokens in @theme + ink-underline styles
components/
  MDXContent.tsx     # renders an MDX body as RSC (next-mdx-remote/rsc + remark-gfm)
content/
  posts/*.mdx        # blog posts — typed frontmatter (title/date/category/description/hero/draft)
lib/
  posts.ts           # the typed content layer: gray-matter + Zod schema + loaders
public/
  _headers           # long-cache for /_next/static + baseline security headers
wrangler.jsonc       # Cloudflare Worker config (name, assets, nodejs_compat)
open-next.config.ts  # OpenNext adapter config
```

## Design tokens

Colors and fonts live once, in `app/globals.css` under `@theme`, mirrored from the
approved design in the Claude project. Tailwind generates utilities from them:
`bg-navy`, `text-gold`, `border-line`, `font-serif`, `font-hand`, etc. Change a
token there and it updates everywhere.

| Token | Value | | Token | Value |
|---|---|---|---|---|
| navy | `#16305a` | | paper | `#f7f5f0` |
| navy-deep | `#0f2444` | | paper-warm | `#efece4` |
| gold | `#e9c46a` | | line | `#d9d5cc` |
| ink | `#1a1a1a` | | ink-soft | `#3d4149` |

## Writing a post

Add a file to `content/posts/`, e.g. `my-post.mdx`:

```mdx
---
title: "My Post Title"
date: "2026-07-20"
category: "Cybersecurity"   # Cybersecurity | Parenting | Observations | Orioles
description: "One-line summary shown in listings."
draft: false                 # true = hidden in production, visible in `next dev`
---

Body goes here. **Markdown** and MDX components both work.
```

The frontmatter is validated by Zod at build time — a typo in `category` or a
missing `title` fails the build instead of shipping broken.

## Deploying

See [`DEPLOY.md`](./DEPLOY.md) for the full GitHub → Cloudflare Workers → custom
domain walkthrough.

```bash
npm run preview   # build with OpenNext and preview the Worker locally
npm run deploy    # build + deploy to Cloudflare Workers
```
