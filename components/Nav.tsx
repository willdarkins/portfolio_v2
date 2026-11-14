import Link from "next/link";
import { ExternalLink } from "./ExternalLink";

/* One hand-drawn underline path per slot, from the canvas. Drawn in by .ink-link / .ink-underline (globals.css). */
const UNDERLINES = [
  "M3 10 C 16 3 27 15 42 8 C 57 2 66 16 82 9 C 96 4 105 14 117 7",
  "M3 11 C 20 5 32 14 48 9 C 63 4 73 14 88 8 C 100 4 108 13 117 9",
  "M4 9 C 19 15 30 4 46 10 C 60 15 71 5 86 11 C 99 15 108 6 117 10",
  "M4 8 C 17 14 29 5 44 11 C 59 16 68 6 84 10 C 97 13 107 7 117 11",
];

function Underline({ d }: { d: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 18"
      preserveAspectRatio="none"
      className="ink-underline pointer-events-none absolute bottom-0 -left-[9%] h-[15px] w-[118%] overflow-visible"
    >
      <path d={d} />
    </svg>
  );
}

export type NavItem = { label: string; href: string; external?: boolean };

export function Nav({ items, current }: { items: NavItem[]; current?: string }) {
  const linkClass = "ink-link relative pb-3";
  return (
    <nav
      aria-label="Primary"
      className="border-b border-line px-gutter-sm pt-3.25 pb-3.5 text-meta font-semibold uppercase tracking-nav wide:px-gutter"
    >
      <ul className="flex flex-wrap justify-center gap-x-7.5 gap-y-2">
        {items.map((item, i) => {
          const d = UNDERLINES[i % UNDERLINES.length];
          const active = !item.external && item.href === current;
          return (
            <li key={item.label}>
              {item.external ? (
                <ExternalLink href={item.href} className={`${linkClass} text-ink`}>
                  {item.label}
                  <Underline d={d} />
                </ExternalLink>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkClass} ${active ? "text-navy" : "text-ink"}`}
                >
                  {item.label}
                  <Underline d={d} />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
