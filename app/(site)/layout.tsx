import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Masthead } from "@/components/Masthead";
import { SiteNav } from "@/components/SiteNav";
import { FOOTER_NOTE, SOCIALS, TAGLINE } from "@/lib/site";

/*
  Shell for the public pages: skip link, masthead, nav, footer. /styleguide sits
  outside this route group and keeps the root layout only.
*/
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-page">
      <a
        href="#main"
        className="sr-only rounded bg-navy px-4 py-3 text-label font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        Skip to content
      </a>
      <Masthead tagline={TAGLINE} socials={SOCIALS} />
      <SiteNav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer note={FOOTER_NOTE} />
    </div>
  );
}
