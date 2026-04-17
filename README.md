# The 2026 Durable Execution Benchmark Report

Microsite for Inngest's durable-execution tech report. Built with Next.js 14,
Tailwind CSS, and Visx.

## Develop

```sh
pnpm install
pnpm dev
# → http://localhost:3000
```

## Build

```sh
pnpm build && pnpm start
```

## Deploy

Push this branch and import the repo on Vercel — zero config needed.

## Authoring

- **Metadata & chart data** live in `content/report.ts`. Edit there to swap
  the title, subtitle, and all chart numbers.
- **Section copy** lives in `content/sections/*.mdx`. Each section is plain
  Markdown with access to React components (`<StatCallout>`, `<PullQuote>`,
  `<BarChart>`, etc.) via MDX.
- **Hero gradient & palette** are in `tailwind.config.ts` (see
  `backgroundImage.hero-gradient` for the five Figma stops).

## Fonts

Headings use **ABC Whyte** (licensed — not shipped in the repo). To enable:

1. Place `.woff2` files in `public/fonts/` (see `public/fonts/README.md`).
2. Uncomment the `localFont` block in `app/fonts.ts`.

Until enabled, the heading font falls through to Inter.

## PDF download

The Download PDF button points at `/public/report.pdf`. A placeholder PDF is
committed; replace with the final report PDF when ready.

## Design tokens

Color and type tokens are ported from
[inngest/website](https://github.com/inngest/website) so the report feels
native to Inngest, with one signature addition: the bright lime `#79D617`
accent used in the hero gradient and as the primary chart color. See
`app/globals.css`.
