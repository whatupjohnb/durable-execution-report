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
        title={reportMeta.title}
        subtitle={reportMeta.subtitle}
      />

      <div className="mx-auto mt-12 flex max-w-6xl gap-16 px-4 sm:mt-20 sm:px-8">
        <TableOfContents items={[...sections]} />

        <main className="min-w-0 flex-1 divide-y divide-carbon-800/50">
          <Section
            id="executive-summary"
            title="Executive summary"
          >
            <ExecutiveSummary />
          </Section>

          <Section
            id="confidence-scaling"
            title="Confidence in scaling AI"
          >
            <ConfidenceScaling />
          </Section>

          <Section
            id="durable-execution"

            title="Durable execution: mapping use cases and tools"
          >
            <DurableExecution />
          </Section>

          <Section
            id="reliability-tax"
            title="The reliability tax"
          >
            <ReliabilityTax />
          </Section>

          <Section
            id="observability-edge"
            title="The observability edge"
          >
            <ObservabilityEdge />
          </Section>

          <Section
            id="frameworks-evals"
            title="AI frameworks and evals"
          >
            <FrameworksEvals />
          </Section>

          <Section
            id="unsolved"
            title="What engineers say is still unsolved"
          >
            <Unsolved />
          </Section>

          <Section
            id="conclusion"
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
