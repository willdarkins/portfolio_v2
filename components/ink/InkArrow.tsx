/* Hand-drawn arrow that points a margin note at something. Decorative. */
export function InkArrow({
  variant = "left",
  className = "",
}: {
  /** "left": long sweep (hero "start here"); "short": compact (portrait note). */
  variant?: "left" | "short";
  className?: string;
}) {
  if (variant === "short") {
    return (
      <svg aria-hidden="true" width="26" height="20" viewBox="0 0 26 20" className={`shrink-0 ${className}`}>
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 4 C 14 4 6 8 4 16" />
          <path d="M4 16 l 8 -1 M4 16 l 2 -8" />
        </g>
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" width="46" height="30" viewBox="0 0 46 30" className={`shrink-0 rotate-6 ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M42 8 C 30 6 16 10 8 22" />
        <path d="M8 22 l 11 -1 M8 22 l 3 -10" />
      </g>
    </svg>
  );
}
