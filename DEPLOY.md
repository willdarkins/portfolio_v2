# Deploy guide — GitHub → Cloudflare Workers → willdarkins.com

The site runs on **Cloudflare Workers** via the **OpenNext** adapter
(`@opennextjs/cloudflare`). Code lives in **`willdarkins/portfolio_v2`** (already
exists; push over HTTPS with `gh`). **Workers Builds** deploys every merge to
`main` and builds a preview for every other branch. Shipping = merging a PR —
see "Release process" in `CLAUDE.md`.

---

## Part 1 — Verify locally

```bash
npm ci
npm run build && npm run lint
npm run preview      # OpenNext build + local Worker at http://localhost:8787 (no login needed)
```

If the placeholder renders in preview, the Worker build is good.

---

## Part 2 — Connect Workers Builds

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**
   → connect GitHub → select **`willdarkins/portfolio_v2`**.
2. **Project name:** `willdarkins-com` — must match `name` in `wrangler.jsonc`.
3. The rest of the create form only has three things:
   - **Path** (root directory): `/`
   - **API token:** create a new one.
   - **Variable:** `NODE_VERSION=24`. The project is developed on Node 24 and
     wrangler needs ≥22, so don't rely on the Workers Builds default.
4. After creation, **Settings → Build** has **Production** and **Previews Base**
   tabs. `NODE_VERSION=24` goes on both.
   - **Production:** production branch **`main`**; build command
     `npx opennextjs-cloudflare build`; deploy command
     `npx opennextjs-cloudflare deploy`.
   - **Previews Base:** turn on **Builds for Preview branches**; keep the
     **Preview command** at the default `npx wrangler preview` (Cloudflare's
     Previews, beta), which needs `"previews": {}` in `wrangler.jsonc`. The build
     command already does the OpenNext packaging, so the preview step just
     uploads the built Worker. A custom preview command set in the dashboard
     didn't take effect for us (Nov 1). Click **Enable Preview URLs**. Each PR
     branch then gets a preview URL.
5. If the API token card says **"Configured API token unavailable"**, create a new
   token there.
6. The first build serves the site at
   `https://willdarkins-com.<your-subdomain>.workers.dev`.

---

## Part 3 — Custom domain (apex, www → apex)

willdarkins.com is already a zone in this Cloudflare account.

1. Worker **`willdarkins-com`** → **Settings → Domains & Routes** → **Add →
   Custom domain** → `willdarkins.com`. Cloudflare creates the DNS record and TLS
   certificate.
2. **DNS** tab of the zone: add **CNAME** `www` → `willdarkins.com`, **Proxied**.
3. **Rules → Redirect Rules** → template **"Redirect from WWW to root"**:
   - **Request URL:** `http*://www.willdarkins.com/*`
   - **Target URL:** `https://willdarkins.com/${2}` (**not** `${1}`, which is the
     scheme wildcard and sends every path to `/s`)
   - Status **301**, **preserve query string**.
   - The "rule may not apply to your traffic" DNS warning is a false positive when
     the `www` CNAME is proxied — choose **Ignore and deploy**.
4. **SSL/TLS → Edge Certificates:** turn **Always Use HTTPS** on. Leave HSTS off
   (Phase 5).
5. Retest redirects with curl or a private window — browsers cache 301s.

---

## Part 4 — Protect `main`

GitHub → `portfolio_v2` → **Settings → Rules → Rulesets** → new ruleset targeting
the default branch, with no bypass list:

- Require a pull request before merging, with **0** required approvals (solo repo).
- Require status checks to pass: the **Workers Builds** check for
  `willdarkins-com`. It only appears in the picker after it has run on a PR, so
  add it then.
- Block force pushes; restrict deletions.

---

## Troubleshooting

- **"Next.js version … is not supported":** OpenNext refuses Next majors past
  their 2-year support window. Upgrade Next rather than using
  `--dangerouslyUseUnsupportedNextVersion`.
- **`nodejs_compat` error:** keep `"compatibility_flags": ["nodejs_compat", ...]`
  in `wrangler.jsonc`.
- **Fonts fail during build:** `next/font` downloads Newsreader/Inter/Caveat at
  build time; it needs normal network access.
- **Emergency CLI deploy** (bypasses review — avoid): `npx wrangler login`, then
  `npm run deploy`.
- **Later, ISR / revalidation:** switch `open-next.config.ts` to an R2 incremental
  cache and add the `WORKER_SELF_REFERENCE` service binding (noted in both files).
