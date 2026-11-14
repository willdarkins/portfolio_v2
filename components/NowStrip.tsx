/* "Now" strip: what I'm building, studying, certified in. */
export function NowStrip({ items }: { items: { label: string; text: string }[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-7.5 gap-y-4.5 border-y border-line py-6.5">
      {items.map((item) => (
        <li key={item.label} className="text-center font-serif text-body text-ink-soft">
          <b className="font-semibold text-ink">{item.label}:</b> {item.text}
        </li>
      ))}
    </ul>
  );
}
