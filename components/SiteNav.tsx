"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/site";
import { Nav } from "./Nav";

/* The shell's Nav: a layout can't read the pathname on the server, so this sets `current` (aria-current) client-side. */
export function SiteNav() {
  const pathname = usePathname();
  return <Nav items={NAV_ITEMS} current={pathname} />;
}
