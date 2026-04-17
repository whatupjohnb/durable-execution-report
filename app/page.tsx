import { ReportHero } from "@/components/ReportHero";
import { Section } from "@/components/Section";
import { TableOfContents } from "@/components/TableOfContents";
import { Footer } from "@/components/Footer";
import { reportMeta, sections } from "@/content/report";

import ExecutiveSummary from "@/content/sections/01-executive-summary.mdx";
import DurableExecution from "@/content/sections/02-durable-execution.mdx";
import ReliabilityTax from "@/content/sections/03-reliability-tax.mdx";
import ObservabilityEdge from "@/content/sections/04-observability-edge.mdx";
import FrameworksEvals from "@/content/sections/05-frameworks-evals.mdx";
import ConfidenceScaling from "@/content/sections/06-confidence-scaling.mdx";
import Unsolved from "@/content/sections/07-unsolved.mdx";
import Conclusion from "@/content/sections/08-conclusion.mdx";

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
            id="durable-execution"
            eyebrow="Section 01"
            title="Durable execution: mapping use cases and tools"
          >
            <DurableExecution />
          </Section>

          <Section
            id="reliability-tax"
            eyebrow="Section 02"
            title="The reliability tax"
          >
            <ReliabilityTax />
          </Section>

          <Section
            id="observability-edge"
            eyebrow="Section 03"
            title="The observability edge"
          >
            <ObservabilityEdge />
          </Section>

          <Section
            id="frameworks-evals"
            eyebrow="Section 04"
            title="AI frameworks and evals"
          >
            <FrameworksEvals />
          </Section>

          <Section
            id="confidence-scaling"
            eyebrow="Section 05"
            title="Confidence in scaling AI"
          >
            <ConfidenceScaling />
          </Section>

          <Section
            id="unsolved"
            eyebrow="Section 06"
            title="What engineers say is still unsolved"
          >
            <Unsolved />
          </Section>

          <Section
            id="conclusion"
            eyebrow="Closing"
            title="Conclusion"
          >
            <Conclusion />
          </Section>
        </main>
      </div>

      <Footer />
    </>
  );
}
