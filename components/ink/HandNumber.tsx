/* Hand-numbered Selected Work index ("01"). The surrounding <ol> carries the order for screen readers. */
export function HandNumber({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="text-center font-hand text-work-number font-bold text-navy/75">
      {String(n).padStart(2, "0")}
    </span>
  );
}
