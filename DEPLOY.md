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
3. Build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - **Non-production branch deploy command:** `npx opennextjs-cloudflare upload`
   - **Root directory:** `/`
4. **Settings → Build → Branch control:** production branch **`main`**; enable
   **builds for non-production branches**. Each PR branch then gets a preview URL.
5. Save and deploy. The first build serves the site at
   `https://willdarkins-com.<your-subdomain>.workers.dev`.

---

## Part 3 — Custom domain (apex, www → apex)

willdarkins.com is already a zone in this Cloudflare account.

1. Worker **`willdarkins-com`** → **Settings → Domains & Routes** → **Add →
   Custom domain** → `willdarkins.com`. Cloudflare creates the DNS record and TLS
   certificate.
2. **DNS** tab of the zone: add **CNAME** `www` → `willdarkins.com`, **Proxied**.
3. **Rules → Redirect Rules → Create rule** "www to apex":
   - When: `http.host eq "www.willdarkins.com"`
   - Then: static redirect to `https://willdarkins.com`, **preserve path and
     query**, status **301**.

---

## Part 4 — Protect `main`

GitHub → `portfolio_v2` → **Settings → Rules → Rulesets** (or **Branches**) → rule
for `main`:

- Require a pull request before merging.
- Require status checks to pass: the **Workers Builds** check for
  `willdarkins-com` (it appears in the list after the first build has run).
- Block force pushes; restrict deletions.

---

## Troubleshooting

- **"Next.js version … is not supported":** OpenNext refuses Next majors past
  their 2-year support window. Upgrade Next rather than using
  `--dangerouslyUseUnsupportedNextVersion`.
- **Build-time Node errors:** the project is developed on Node 24; wrangler needs
  ≥22. If Workers Builds uses an older Node, set the build variable
  `NODE_VERSION=24`.
- **`nodejs_compat` error:** keep `"compatibility_flags": ["nodejs_compat", ...]`
  in `wrangler.jsonc`.
- **Fonts fail during build:** `next/font` downloads Newsreader/Inter/Caveat at
  build time; it needs normal network access.
- **Emergency CLI deploy** (bypasses review — avoid): `npx wrangler login`, then
  `npm run deploy`.
- **Later, ISR / revalidation:** switch `open-next.config.ts` to an R2 incremental
  cache and add the `WORKER_SELF_REFERENCE` service binding (noted in both files).
