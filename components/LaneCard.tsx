import type { ReactNode } from "react";
import type { Lane } from "@/lib/lanes";
import { LaneLabel } from "./LaneLabel";

/* One "What I Do" lane: kicker, serif title, short description. */
export function LaneCard({
  lane,
  label,
  title,
  children,
}: {
  lane: Lane;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <LaneLabel lane={lane}>{label}</LaneLabel>
      <h3 className="my-2 font-serif text-lane-title font-semibold">{title}</h3>
      <p className="font-serif text-body text-ink-soft">{children}</p>
    </div>
  );
}
