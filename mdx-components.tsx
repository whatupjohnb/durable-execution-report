import type { MDXComponents } from "mdx/types";

// No overrides — MDX elements inherit styling from .report-prose (see globals.css)
// which gives us first-line paragraph indents, matcha bullets, and Whyte headings.
// Custom components (<StatCallout>, <BarChart>, etc.) are imported directly in
// each MDX file.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
