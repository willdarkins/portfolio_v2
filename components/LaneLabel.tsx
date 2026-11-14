import type { ReactNode } from "react";
import { LANE_TEXT, type Lane } from "@/lib/lanes";

/* Small caps kicker in a lane color ("DevSecOps", "Orioles"). */
export function LaneLabel({ lane, children }: { lane: Lane; children: ReactNode }) {
  return (
    <span className={`block text-kicker font-bold uppercase tracking-kicker ${LANE_TEXT[lane]}`}>
      {children}
    </span>
  );
}
