# Deploy guide — GitHub → Cloudflare Workers → willdarkins.com

This gets you from the repo on your machine to a live "hello world" at
**willdarkins.com** (apex), with `www` redirecting to it. The site deploys to
**Cloudflare Workers** using the **OpenNext** adapter (`@opennextjs/cloudflare`) —
Cloudflare's current recommended way to run Next.js, replacing the older
`@cloudflare/next-on-pages` (now in maintenance mode).

There are two moments: (1) a one-time **CLI deploy** to confirm the build works
and see it live fast, then (2) wiring up **git-push-to-deploy** so every push to
`main` ships automatically. Do both — the CLI deploy is the fastest way to catch
any first-time issue before CI is involved.

---

## Prerequisites

1. **Node 20+** and npm installed locally (`node -v`).
2. A **GitHub** account.
3. Your **Cloudflare** account, with **willdarkins.com already added as a zone**
   (you said it's purchased and managed in Cloudflare — good).
4. Install deps and confirm it runs locally:
   ```bash
   npm install
   npm run dev        # open http://localhost:3000 — you should see the placeholder
   ```

---

## Part 1 — Verify the build and do a first CLI deploy

This proves the OpenNext build works before you involve GitHub/CI.

1. **Log in to Cloudflare from the CLI** (opens a browser to authorize Wrangler):
   ```bash
   npx wrangler login
   ```
2. **Build + preview the Worker locally** (optional but recommended — this runs
   the real Workers runtime, not just `next dev`):
   ```bash
   npm run preview
   ```
   Visit the URL it prints. If the placeholder page renders, the OpenNext build is good.
3. **Deploy:**
   ```bash
   npm run deploy
   ```
   Wrangler creates a Worker named **`willdarkins-com`** (from `wrangler.jsonc`)
   and prints a live URL like `https://willdarkins-com.<your-subdomain>.workers.dev`.
   Open it — that's your hello world. 🎉

> If `wrangler login` can't open a browser (e.g. remote shell), run
> `npx wrangler login` on your local desktop instead, or create an API token and
> set `CLOUDFLARE_API_TOKEN`.

---

## Part 2 — Put the code on GitHub

1. Create a new **empty** repo on GitHub named `willdarkins-com` (no README/gitignore —
   this repo already has them).
2. From the project folder:
   ```bash
   git remote add origin git@github.com:<your-username>/willdarkins-com.git
   # or HTTPS: https://github.com/<your-username>/willdarkins-com.git
   git branch -M main
   git push -u origin main
   ```
   (The repo is already `git init`'d with an initial commit.)

---

## Part 3 — Git-push-to-deploy with Workers Builds

This connects the GitHub repo to your Worker so every push to `main` builds and
deploys automatically.

1. In the **Cloudflare dashboard** → **Workers & Pages** → open your
   **`willdarkins-com`** Worker (created in Part 1).
2. Go to **Settings → Build** (a.k.a. *Builds* / *CI/CD*) → **Connect** your
   GitHub account and select the **`willdarkins-com`** repository, branch `main`.
3. Set the build configuration:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/` (leave default)
4. Save. Trigger a build (push a commit, or use **Retry/Run build**). When it
   finishes, your `*.workers.dev` URL serves the latest `main`.

> Prefer GitHub Actions instead of Workers Builds? You can, but Workers Builds is
> the least-moving-parts option and needs no secrets in the repo. If you ever do
> use Actions, deploy with `cloudflare/wrangler-action` and a scoped API token.

---

## Part 4 — Point willdarkins.com at the Worker (apex, with www → apex)

Because the domain is already in Cloudflare, this is a few clicks — no manual DNS
records or certificates needed.

1. In the dashboard → **Workers & Pages** → **`willdarkins-com`** → **Settings →
   Domains & Routes** → **Add** → **Custom domain**.
2. Enter **`willdarkins.com`** and add it. Cloudflare provisions the DNS record
   and TLS certificate automatically. In a minute or two,
   `https://willdarkins.com` serves the site.
3. **Redirect `www` → apex.** Go to the **willdarkins.com** zone → **Rules →
   Redirect Rules → Create rule**:
   - **Name:** `www to apex`
   - **When incoming requests match:** *Hostname* **equals** `www.willdarkins.com`
   - **Then:** *Static redirect* → URL `https://willdarkins.com` +
     preserve path/query, status **301 (Permanent)**.
   - (If Cloudflare asks for the source expression in Expression Editor:
     `http.host eq "www.willdarkins.com"`.)
   - You also need a DNS record for `www` so the redirect has something to catch:
     in the zone's **DNS** tab add a **CNAME** `www` → `willdarkins.com`, **Proxied**
     (orange cloud). The redirect rule then sends it to the apex.

That's it — `willdarkins.com` is live, `www.willdarkins.com` 301s to it, and every
push to `main` redeploys.

---

## Troubleshooting

- **Fonts fail during build:** `next/font` fetches Newsreader/Inter/Caveat at build
  time. Workers Builds has network access, so this works in CI and locally. Behind a
  strict corporate proxy it can fail — deploy from a normal network.
- **`nodejs_compat` error at deploy:** ensure `wrangler.jsonc` keeps
  `"compatibility_flags": ["nodejs_compat", ...]` and a `compatibility_date` of at
  least `2024-09-23`.
- **Build can't find `.open-next/worker.js`:** the deploy command must run *after*
  the build command. In Workers Builds that's Build = `npx opennextjs-cloudflare build`,
  Deploy = `npx wrangler deploy`. Locally, `npm run deploy` does both in order.
- **Later, when you add ISR / revalidation:** wire an R2 bucket for the incremental
  cache in `open-next.config.ts` and add the `WORKER_SELF_REFERENCE` service binding
  in `wrangler.jsonc` (both are noted inline in those files).
