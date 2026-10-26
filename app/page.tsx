import Link from "next/link";
import { getAllPosts, CATEGORY_COLOR } from "@/lib/posts";

const TOKENS: { name: string; className: string; hex: string }[] = [
  { name: "navy", className: "bg-navy", hex: "#16305a" },
  { name: "navy-deep", className: "bg-navy-deep", hex: "#0f2444" },
  { name: "gold", className: "bg-gold", hex: "#e9c46a" },
  { name: "ink", className: "bg-ink", hex: "#1a1a1a" },
  { name: "ink-soft", className: "bg-ink-soft", hex: "#3d4149" },
  { name: "paper", className: "bg-paper", hex: "#f7f5f0" },
  { name: "paper-warm", className: "bg-paper-warm", hex: "#efece4" },
  { name: "line", className: "bg-line", hex: "#d9d5cc" },
];

export default function Home() {
  const latest = getAllPosts()[0];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      {/* ── Nameplate: proves the Newsreader serif + the ink-blob dot ── */}
      <header className="text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Will
          <span
            aria-hidden
            className="mx-2 inline-block h-2.5 w-2.5 -translate-y-2 rotate-[-8deg] rounded-full bg-navy"
          />
          Darkins
        </h1>
        <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-ink-soft">
          Security · Fatherhood · Baseball · Field Notes
        </p>

        {/* Nav link with the hover-draw ink underline (reduced-motion safe). */}
        <nav className="mt-8 flex justify-center">
          <Link href="/" className="ink-link relative pb-3 font-sans text-sm font-semibold uppercase tracking-[0.11em] text-navy">
            Home
            <svg
              className="ink-underline pointer-events-none absolute -left-[9%] bottom-0 h-[15px] w-[118%]"
              viewBox="0 0 120 18"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M3 10 C 16 3 27 15 42 8 C 57 2 66 16 82 9 C 96 4 105 14 117 7" />
            </svg>
          </Link>
        </nav>
      </header>

      <hr className="my-12 border-t border-line" />

      {/* ── Font specimens: one visible line per family ── */}
      <section aria-labelledby="fonts-h" className="space-y-6">
        <h2 id="fonts-h" className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
          Fonts load
        </h2>
        <p className="font-serif text-2xl text-ink">
          Newsreader — <em className="italic text-navy">learning to break things on purpose.</em>
        </p>
        <p className="font-sans text-lg text-ink-soft">
          Inter — the sans face used for nav, labels, and UI.
        </p>
        <p className="font-hand text-3xl text-navy">
          Caveat — the hand-drawn ink layer ✎
        </p>
      </section>

      <hr className="my-12 border-t border-line" />

      {/* ── Color tokens: one swatch per token ── */}
      <section aria-labelledby="tokens-h">
        <h2 id="tokens-h" className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
          Design tokens load
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TOKENS.map((t) => (
            <li key={t.name} className="rounded-md border border-line bg-paper-warm p-2">
              <div className={`h-12 w-full rounded ${t.className} border border-black/5`} />
              <div className="mt-2 font-sans text-[11px] font-semibold text-ink">{t.name}</div>
              <div className="font-hand text-base leading-none text-ink-soft">{t.hex}</div>
            </li>
          ))}
        </ul>
      </section>

      <hr className="my-12 border-t border-line" />

      {/* ── Content layer: pulls the latest MDX post through the typed loader ── */}
      <section aria-labelledby="content-h">
        <h2 id="content-h" className="mb-5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
          Content layer loads
        </h2>
        {latest ? (
          <article className="rounded-md border border-line bg-paper-warm p-6">
            <span
              className="font-sans text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: CATEGORY_COLOR[latest.category] }}
            >
              {latest.category}
            </span>
            <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-ink">
              {latest.title}
            </h3>
            <p className="mt-2 font-serif text-ink-soft">{latest.description}</p>
            <p className="mt-3 font-sans text-xs text-ink-soft/80">{latest.formattedDate}</p>
          </article>
        ) : (
          <p className="font-sans text-sm text-ink-soft">No posts found in content/posts/.</p>
        )}
      </section>

      <footer className="mt-16 text-center">
        <p className="font-hand text-3xl text-navy">Will</p>
        <p className="mt-1 font-sans text-[11px] text-ink-soft/70">
          Phase 0 placeholder · © 2026 · Built with Next.js on Cloudflare
        </p>
      </footer>
    </main>
  );
}
