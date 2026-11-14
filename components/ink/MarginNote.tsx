import type { ReactNode } from "react";
import { InkArrow } from "./InkArrow";

const TONE = {
  navy: "text-navy",
  orioles: "text-orioles",
  onNavy: "text-on-navy-muted",
} as const;

const SIZE = {
  note: "text-note", // 20px
  large: "text-lane-title", // 22px
} as const;

/* Handwritten (Caveat) aside, slightly rotated, optionally with an ink arrow. */
export function MarginNote({
  children,
  tone = "navy",
  size = "note",
  rotate = "-rotate-3",
  arrow,
  className = "",
  id,
  decorative = false,
}: {
  children: ReactNode;
  tone?: keyof typeof TONE;
  size?: keyof typeof SIZE;
  /** A Tailwind rotate class, e.g. "-rotate-3", "rotate-6", "-rotate-2". */
  rotate?: string;
  arrow?: "left" | "short";
  className?: string;
  id?: string;
  /** Hide from screen readers when the note only repeats what's around it. */
  decorative?: boolean;
}) {
  return (
    <span aria-hidden={decorative || undefined} className={`inline-flex items-center gap-1 ${TONE[tone]} ${className}`}>
      {arrow && <InkArrow variant={arrow} />}
      <span id={id} className={`inline-block whitespace-nowrap font-hand font-semibold leading-none ${SIZE[size]} ${rotate}`}>
        {children}
      </span>
    </span>
  );
}
