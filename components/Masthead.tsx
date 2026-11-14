import type { SocialNetwork } from "@/lib/site";
import { SocialIcon } from "./icons/SocialIcons";
import { InkDot } from "./ink/InkDot";

export function Masthead({
  first = "Will",
  last = "Darkins",
  tagline,
  socials,
}: {
  first?: string;
  last?: string;
  tagline: string;
  socials: { network: SocialNetwork; label: string; href: string }[];
}) {
  return (
    <header className="px-gutter-sm pt-8.5 text-center wide:px-gutter">
      <ul className="mb-1 flex flex-wrap items-center justify-center gap-x-4 wide:justify-end">
        {socials.map((s) => (
          <li key={s.network}>
            <a
              href={s.href}
              aria-label={s.label}
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center text-navy/75 hover:text-navy wide:size-7.5"
            >
              <SocialIcon network={s.network} />
            </a>
          </li>
        ))}
      </ul>
      <p className="font-serif text-masthead-sm font-bold tracking-name wide:text-masthead">
        {first}
        <InkDot />
        {last}
      </p>
      <p className="mt-2.75 text-kicker uppercase tracking-tagline text-ink-soft">{tagline}</p>
      <div aria-hidden="true" className="mt-4 border-b-[3px] border-double border-ink" />
    </header>
  );
}
