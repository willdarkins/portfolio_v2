import type { ReactNode } from "react";

/* Gold italic phrase with a static hand-drawn underline ("should talk"). */
export function InkEmphasis({ children }: { children: ReactNode }) {
  return (
    <em className="relative inline-block italic text-gold">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.18em] -left-[3%] h-[0.38em] w-[106%]"
      >
        <path
          d="M6 15 C 70 5 130 21 190 12 S 250 6 294 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </em>
  );
}
