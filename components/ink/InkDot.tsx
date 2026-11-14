/* The ink-blob dot between "Will" and "Darkins" in the masthead. */
export function InkDot({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 20 20"
      className={`relative -top-[0.16em] mx-[0.24em] inline-block -rotate-[8deg] fill-navy ${className}`}
    >
      <path d="M9 3 C 13 2 18 5 17 10 C 17 15 12 18 8 17 C 4 16 2 12 3 8 C 4 5 5 3 9 3 Z" />
    </svg>
  );
}
