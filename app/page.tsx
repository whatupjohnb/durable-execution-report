import { ReportHero } from "@/components/ReportHero";
import { Section } from "@/components/Section";
import { TableOfContents } from "@/components/TableOfContents";
import { Footer } from "@/components/Footer";
import { reportMeta, sections } from "@/content/report";

import ExecutiveSummary from "@/content/sections/01-executive-summary.mdx";
import ReliabilityBurden from "@/content/sections/02-reliability-burden.mdx";
import LLMFailures from "@/content/sections/03-llm-failures.mdx";
import ObservabilityGap from "@/content/sections/04-observability-gap.mdx";
import WhatWorks from "@/content/sections/05-what-works.mdx";
import Methodology from "@/content/sections/06-methodology.mdx";

export default function Home() {
  return (
    <>
      <ReportHero
        eyebrow={reportMeta.eyebrow}
        title={reportMeta.title}
        subtitle={reportMeta.subtitle}
      />

      <div className="mx-auto mt-12 flex max-w-6xl gap-16 px-4 sm:mt-20 sm:px-8">
        <TableOfContents items={[...sections]} />

        <main className="min-w-0 flex-1">
          <Section
            id="executive-summary"
            eyebrow="AI in Production"
            title="Executive summary"
          >
            <ExecutiveSummary />
          </Section>

          <Section
            id="the-reliability-burden"
            eyebrow="Finding 01"
            title="The reliability burden"
          >
            <ReliabilityBurden />
          </Section>

          <Section
            id="llm-failures"
            eyebrow="Finding 02"
            title="LLM failures"
          >
            <LLMFailures />
          </Section>

          <Section
            id="observability-gap"
            eyebrow="Finding 03"
            title="The observability gap"
          >
            <ObservabilityGap />
          </Section>

          <Section
            id="what-works"
            eyebrow="Finding 04"
            title="What works"
          >
            <WhatWorks />
          </Section>

          <Section
            id="methodology"
            eyebrow="Appendix"
            title="Methodology"
          >
            <Methodology />
          </Section>
        </main>
      </div>

      <Footer />
    </>
  );
}
