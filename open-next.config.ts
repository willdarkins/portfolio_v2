import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Phase 0: the site is statically rendered (SSG) with no revalidation. We serve
// the prerendered pages straight from Workers static assets via the built-in
// static-assets incremental cache. Without an incrementalCache override, OpenNext
// falls back to a no-op cache that MISSES on every request and RE-RENDERS the
// page live in the Worker — where there is no real cwd/filesystem, so the
// content layer's directory read (lib/posts.ts) returns nothing. This override
// makes OpenNext serve the build-time prerender instead. No R2 needed yet.
//
// When you add ISR / on-demand revalidation later, switch this to an R2-backed
// cache (which supports writes), e.g.:
//
//   import r2IncrementalCache from
//     "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
//
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
