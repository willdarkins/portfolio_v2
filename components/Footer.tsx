import { Signature } from "./ink/Signature";

export function Footer({ note }: { note: string }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 px-gutter-sm pt-5.5 pb-8.5 text-meta text-muted wide:px-gutter">
      <Signature />
      <p>{note}</p>
    </footer>
  );
}
