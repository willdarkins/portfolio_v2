import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Keep the build strict — a type error should fail the build, which is what
  // we want gating a git-push-to-deploy pipeline. (Next 16 no longer lints
  // during `next build`; run `npm run lint` separately.)
  typescript: { ignoreBuildErrors: false },
};

// Enables the OpenNext Cloudflare bindings/dev shim while running `next dev`,
// so local dev matches the Workers runtime. No-op outside of dev.
initOpenNextCloudflareForDev();

export default nextConfig;
