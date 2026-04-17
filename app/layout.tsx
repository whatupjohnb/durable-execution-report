import type { Metadata } from "next";
import { inter, jetbrainsMono, whyte } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://durable-execution-report.vercel.app"),
  title: {
    default: "The 2026 Durable Execution Benchmark Report",
    template: "%s — Durable Execution Report",
  },
  description:
    "A survey of 130 engineers on how production AI workflows are built, run, and kept reliable at scale.",
  openGraph: {
    type: "article",
    title: "The 2026 Durable Execution Benchmark Report",
    description:
      "A survey of 130 engineers on how production AI workflows are built, run, and kept reliable at scale.",
    siteName: "Durable Execution Report",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 2026 Durable Execution Benchmark Report",
    description:
      "A survey of 130 engineers on how production AI workflows are built, run, and kept reliable at scale.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${whyte.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
