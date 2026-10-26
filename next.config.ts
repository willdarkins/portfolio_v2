import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Keep the build strict — a type error should fail the build, which is what
  // we want gating a git-push-to-deploy pipeline. (Next 16 no longer lints
  // during `next build`; run `npm run lint` separately.)
  typescript: { ignoreBuildErrors: false },

  // Baseline security headers on every route. These live here rather than in
  // public/_headers because Workers only applies _headers to static assets, not
  // to pages rendered by the Worker. Full CSP + HSTS hardening is Phase 5.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

// Enables the OpenNext Cloudflare bindings/dev shim while running `next dev`,
// so local dev matches the Workers runtime. No-op outside of dev.
initOpenNextCloudflareForDev();

export default nextConfig;
