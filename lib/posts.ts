import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/*
  The typed content layer.

  Every blog post is an .mdx file in content/posts/. Its YAML frontmatter is
  parsed by gray-matter and then validated by the Zod schema below. Zod is the
  single source of truth for both runtime validation AND the TypeScript type
  (via z.infer), so a malformed post fails the build instead of shipping broken.
*/

export const CATEGORIES = [
  "Cybersecurity",
  "Parenting",
  "Observations",
  "Orioles",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Kicker color token per category — mirrors the design system. */
export const CATEGORY_COLOR: Record<Category, string> = {
  Cybersecurity: "var(--color-cyber)",
  Parenting: "var(--color-parenting)",
  Observations: "var(--color-observations)",
  Orioles: "var(--color-orioles)",
};

const FrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  // Accept YYYY-MM-DD (or any Date-parseable string) and normalize to ISO.
  date: z
    .string()
    .refine((d) => !Number.isNaN(Date.parse(d)), "date must be a valid date"),
  category: z.enum(CATEGORIES),
  description: z.string().min(1, "description is required"),
  hero: z.string().optional(),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type PostMeta = Frontmatter & {
  slug: string;
  /** Pretty date, e.g. "July 15, 2026". */
  formattedDate: string;
};

export type Post = PostMeta & {
  /** Raw MDX body (frontmatter stripped), ready to hand to <MDXContent />. */
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/posts/${fileName}:\n` +
        parsed.error.issues
          .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n"),
    );
  }

  return {
    ...parsed.data,
    slug,
    formattedDate: formatDate(parsed.data.date),
    content,
  };
}

/** Should this post be visible in the current environment? Drafts hide in prod. */
function isVisible(post: Post): boolean {
  return process.env.NODE_ENV === "development" || !post.draft;
}

/**
 * All posts, newest first, drafts excluded in production.
 * Typed as PostMeta[] (listings don't need the body); Post is a superset of
 * PostMeta, so returning the full objects is assignable and avoids extra work.
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .filter(isVisible)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/** One post (metadata + MDX body) by slug, or null if missing/hidden. */
export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const fileName = `${slug}${ext}`;
    if (fs.existsSync(path.join(POSTS_DIR, fileName))) {
      const post = readPostFile(fileName);
      return isVisible(post) ? post : null;
    }
  }
  return null;
}

/** Slugs for generateStaticParams(). */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Posts filtered to a single category, newest first. */
export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
