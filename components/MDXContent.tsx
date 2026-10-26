import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";

/*
  Renders an MDX body string as React Server Components — no client-side MDX
  runtime shipped to the browser. GitHub-flavored markdown (tables, strikethrough,
  task lists, autolinks) is enabled via remark-gfm.

  `components` lets you map MDX elements to your own design-system components
  later (e.g. a custom <Callout>, styled headings). For Phase 0 it's empty and
  the Tailwind Typography `prose` classes handle base styling at the call site.
*/
const components: MDXComponents = {};

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
