/*
  Lane → color classes. Written out in full so Tailwind can see every class name
  (it can't detect classes built from strings at runtime).
*/
export type Lane = "devsecops" | "governance" | "platforms" | "orioles";

export const LANE_TEXT: Record<Lane, string> = {
  devsecops: "text-devsecops",
  governance: "text-governance",
  platforms: "text-platforms",
  orioles: "text-orioles",
};

export const LANE_BG: Record<Lane, string> = {
  devsecops: "bg-devsecops",
  governance: "bg-governance",
  platforms: "bg-platforms",
  orioles: "bg-orioles",
};
