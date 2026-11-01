# willdarkins.com

Will Darkins' professional portfolio, covering security, governance and the
systems in between. Writing lives on Substack.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · MDX case studies · OpenNext
on Cloudflare Workers (`@opennextjs/cloudflare`).

## Getting started

```bash
npm ci
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production Next.js build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run preview` | OpenNext build + run the Worker locally |
| `npm run deploy` | OpenNext build + deploy to Cloudflare (emergency only) |
| `npm run upload` | OpenNext build + upload a new Worker version |
| `npm run cf-typegen` | Generate Cloudflare binding types |

## Deploys

Merges to `main` deploy via Workers Builds — see [`DEPLOY.md`](./DEPLOY.md).
