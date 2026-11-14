import { HOME } from "@/content/home";
import type { Lane } from "@/lib/lanes";

/*
  One Substack post as the homepage cards need it. Phase 3 fills this from the
  Substack RSS feed (server-side, cached); until then the cards use static
  samples from content/home.ts.
*/
export type NewsletterPost = {
  title: string;
  excerpt: string;
  /** Link out to the post on Substack. */
  url: string;
  /** Already formatted for display (e.g. "Nov 2026"). */
  date: string;
  /** Substack section name shown as the kicker ("Orioles"). */
  kicker: string;
  /** Color for the card header + kicker. */
  tone: Lane;
  /** Optional handwritten aside on the card. */
  note?: string;
};

/* Phase 3: replace the body with the RSS fetch; callers already await it. */
export async function getNewsletterPosts(): Promise<NewsletterPost[]> {
  return HOME.newsletter.samplePosts;
}
