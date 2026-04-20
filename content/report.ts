/**
 * Central store for the report's metadata, section list, and chart data.
 *
 * Numbers here are sourced from the Inngest 2026 Durable Execution Benchmark
 * survey (n=130). Where the draft quoted an exact figure, we use it; where it
 * characterized a distribution without naming every bucket, we use best-fit
 * illustrative values consistent with the cited summary statistics. Replace
 * with the canonical numbers before publication.
 */

export const reportMeta = {
  title: "AI in Production: The 2026 Benchmark Report",
  subtitle:
    "Only 19% of AI teams are very confident their infrastructure can handle 2–3× their current scale. At organizations with 500+ engineers, it's 0%. We surveyed 130 engineers on how they build, run, and maintain reliability in production AI workflows.",
  eyebrow: "Inngest Research",
  publishedOn: "2026",
  author: "Inngest Research — n=130 backend, full-stack, AI engineers & managers",
} as const;

export const sections = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "confidence-scaling", label: "Confidence at scale" },
  { id: "durable-execution", label: "Durable execution" },
  { id: "reliability-tax", label: "The reliability tax" },
  { id: "observability-edge", label: "The observability edge" },
  { id: "frameworks-evals", label: "Frameworks & evals" },
  { id: "unsolved", label: "What's still unsolved" },
  { id: "conclusion", label: "Conclusion" },
] as const;

// ---------------------------------------------------------------------------
// Durable execution — Section 2
// ---------------------------------------------------------------------------

// A stable color key per workflow type, used across Figures 1 and 3 so the
// same hue always represents the same category. Colors pulled from the
// official Inngest palette: Citrus Glow (orange), Breeze (blue), Matcha
// (green), Honey (gold), Quantum (purple).
export const workflowColors = {
  "Background jobs": "#FF7300",     // citrus-500 / Citrus Glow
  "Event-driven":    "#2389F1",     // breeze-500
  "Long-running":    "#2C9B63",     // matcha-500
  "Data pipelines":  "#FCC43F",     // honey-300
  "AI workflows":    "#8F75B7",     // quantum-500
} as const;

// Figure 1 — workflow types running in production
export const workflowUseCases = [
  { label: "Background jobs or scheduled tasks",          value: 93, color: workflowColors["Background jobs"] },
  { label: "Event-driven automation or webhook processing", value: 87, color: workflowColors["Event-driven"] },
  { label: "Long-running workflows (minutes to days)",    value: 68, color: workflowColors["Long-running"] },
  { label: "AI / LLM workflows",                          value: 68, color: workflowColors["AI workflows"] },
  { label: "Data pipelines (ETL, embedding, enrichment)", value: 63, color: workflowColors["Data pipelines"] },
];

// Figure 2 — how many orchestration tools are teams using?
// All respondents n=130. 56% use more than one tool.
export const toolCountDistribution = [
  { label: "1 tool (solo)",   value: 44, count: 57 },
  { label: "2 tools",         value: 35, count: 45 },
  { label: "3 tools",         value: 15, count: 19 },
  { label: "4+ tools",        value: 2,  count: 3 },
  { label: "None / ad-hoc",   value: 5,  count: 6 },
];

// Figure 2b — orchestration platform by team size.
// Tool colors chosen from the Inngest brand palette for maximum distinction
// at 7 series. Inngest keeps matcha (their own brand green); competitor
// tools fan out across breeze/honey/quantum/ruby/citrus.
export const platformByTeamSize = {
  cohorts: [
    { label: "Solo / 2–10", n: 47 },
    { label: "11–50",       n: 40 },
    { label: "51–500",      n: 27 },
    { label: "500+",        n: 16 },
  ],
  tools: [
    { key: "inngest",  label: "Inngest",            color: "#2C9B63", values: [72, 35, 7,  0 ] }, // matcha-500
    { key: "custom",   label: "Custom-built",       color: "#7C7C7C", values: [32, 40, 44, 75] }, // carbon-500
    { key: "aws",      label: "AWS / Vercel / CF",  color: "#2389F1", values: [15, 28, 33, 62] }, // breeze-500
    { key: "bullmq",   label: "BullMQ / Cel / Sid", color: "#D56B13", values: [11, 30, 11, 12] }, // honey-500
    { key: "prefect",  label: "Prefect / Airflow",  color: "#8F75B7", values: [4,  15, 22, 12] }, // quantum-500
    { key: "temporal", label: "Temporal",           color: "#F54A3F", values: [2,  10, 22, 12] }, // ruby-500
    { key: "none",     label: "None / ad-hoc",      color: "#B0B0B0", values: [11, 18, 22, 31] }, // carbon-300
  ],
};

// Figure 3 — use-case breadth among teams using only one orchestration tool.
// Each cohort has its own brand color on the cohort heading; individual bars
// carry the per-workflow-type color from `workflowColors` so the palette is
// consistent with Figure 1.
export const soloToolCohorts = [
  {
    tool: "Inngest",      n: 29, avg: 75, accent: "#2C9B63", // matcha-500
    rows: [
      { label: "Background jobs", value: 97, color: workflowColors["Background jobs"] },
      { label: "Event-driven",    value: 83, color: workflowColors["Event-driven"] },
      { label: "Long-running",    value: 69, color: workflowColors["Long-running"] },
      { label: "Data pipelines",  value: 52, color: workflowColors["Data pipelines"] },
      { label: "AI workflows",    value: 72, color: workflowColors["AI workflows"] },
    ],
  },
  {
    tool: "Custom-built", n: 15, avg: 73, accent: "#7C7C7C", // carbon-500
    rows: [
      { label: "Background jobs", value: 93, color: workflowColors["Background jobs"] },
      { label: "Event-driven",    value: 87, color: workflowColors["Event-driven"] },
      { label: "Long-running",    value: 67, color: workflowColors["Long-running"] },
      { label: "Data pipelines",  value: 67, color: workflowColors["Data pipelines"] },
      { label: "AI workflows",    value: 53, color: workflowColors["AI workflows"] },
    ],
  },
  {
    tool: "AWS / Vercel / CF", n: 7, avg: 63, accent: "#2389F1", small: true, // breeze-500
    rows: [
      { label: "Background jobs", value: 86, color: workflowColors["Background jobs"] },
      { label: "Event-driven",    value: 86, color: workflowColors["Event-driven"] },
      { label: "Long-running",    value: 43, color: workflowColors["Long-running"] },
      { label: "Data pipelines",  value: 71, color: workflowColors["Data pipelines"] },
      { label: "AI workflows",    value: 29, color: workflowColors["AI workflows"] },
    ],
  },
  {
    tool: "BullMQ / Cel / Sid", n: 6, avg: 57, accent: "#D56B13", small: true, // honey-500
    rows: [
      { label: "Background jobs", value: 83, color: workflowColors["Background jobs"] },
      { label: "Event-driven",    value: 67, color: workflowColors["Event-driven"] },
      { label: "Long-running",    value: 50, color: workflowColors["Long-running"] },
      { label: "Data pipelines",  value: 17, color: workflowColors["Data pipelines"] },
      { label: "AI workflows",    value: 67, color: workflowColors["AI workflows"] },
    ],
  },
];

// Legacy keys kept so other sections still compile while the rest of the
// report gets its real data.
export const orchestrationPlatforms = [
  { label: "Custom-built", value: 40 },
  { label: "AWS / Vercel / CF", value: 32 },
  { label: "Inngest", value: 30 },
  { label: "Temporal", value: 24 },
  { label: "BullMQ / Celery / Sidekiq", value: 22 },
];
export const inngestSoloVsPaired = [
  { label: "Inngest alone", value: 56 },
  { label: "Inngest + custom-built", value: 22 },
  { label: "Inngest + another third-party", value: 22 },
];
export const workflowCoverageByTool = [
  { label: "Inngest", value: 75 },
  { label: "Custom-built", value: 65 },
  { label: "Temporal", value: 58 },
  { label: "BullMQ / Celery / Sidekiq", value: 48 },
  { label: "AWS / Vercel / CF", value: 44 },
];

// ---------------------------------------------------------------------------
// Reliability tax — Section 3
// ---------------------------------------------------------------------------

// Distribution of engineering time spent on reliability, AI vs non-AI.
export const reliabilityTimeAIvsNonAI = [
  {
    label: "AI teams",
    segments: {
      "<10%": 25,
      "10–25%": 48,
      "26–50%": 20,
      "51%+": 7,
    },
  },
  {
    label: "Non-AI teams",
    segments: {
      "<10%": 35,
      "10–25%": 45,
      "26–50%": 10,
      "51%+": 10,
    },
  },
];

// Change in reliability burden over the last 12 months, by orchestration tool.
export const reliabilityBurdenDelta = [
  { label: "Temporal", value: 22 },
  { label: "AWS / Vercel / CF", value: 9 },
  { label: "BullMQ / Celery / Sidekiq", value: -5 },
  { label: "Custom-built", value: -9 },
  { label: "Inngest", value: -10 },
];

// Figure 7 — drivers of rising reliability burden, AI vs non-AI.
// Among respondents who said burden went up. AI n=24, non-AI n=7.
export const reliabilityDrivers = [
  { cause: "Higher traffic & scale",              ai: 62, nonAI: 57 },
  { cause: "Technical debt",                      ai: 54, nonAI: 86 },
  { cause: "Multi-service architectures",         ai: 50, nonAI: 57 },
  { cause: "Faster shipping pressure",            ai: 50, nonAI: 43 },
  { cause: "AI workloads / new failure modes",    ai: 54, nonAI: 14 },
  { cause: "Non-determinism",                     ai: 25, nonAI: 29 },
];

// ---------------------------------------------------------------------------
// Observability edge — Section 4
// ---------------------------------------------------------------------------

// Figure 8 — time to understand what went wrong. All respondents n=130.
// Each bucket has the raw count (n) and the percentage. Colors match the
// same semantic scale used in Figure 9 (green = fast → red = blind).
export const diagnosticSpeed = [
  { label: "Minutes — good tracing, pinpoint fast",        value: 38, count: 49, color: "#2C9B63" }, // matcha-500
  { label: "Under an hour, but it takes digging",          value: 54, count: 70, color: "#2389F1" }, // breeze-500
  { label: "Hours — requires significant investigation",   value: 5,  count: 6,  color: "#FF7300" }, // citrus-500
  { label: "We often can't fully explain what happened",   value: 4,  count: 5,  color: "#F54A3F" }, // ruby-500
];

// Figure 9 — diagnostic speed by observability tool. 100% stacked.
// Sorted by % diagnosing in minutes.
export const diagnosticSpeedByTool = [
  {
    label: "Orchestration platform dashboards",
    n: 70,
    segments: { "Minutes — good tracing": 40, "Under an hour": 55, "Hours": 4, "Can't explain": 1 },
  },
  {
    label: "Logs",
    n: 70,
    segments: { "Minutes — good tracing": 30, "Under an hour": 50, "Hours": 15, "Can't explain": 5 },
  },
  {
    label: "Sentry, Datadog, New Relic",
    n: 86,
    segments: { "Minutes — good tracing": 29, "Under an hour": 55, "Hours": 12, "Can't explain": 4 },
  },
  {
    label: "LangSmith / LangFuse",
    n: 11,
    segments: { "Minutes — good tracing": 25, "Under an hour": 75, "Hours": 0, "Can't explain": 0 },
  },
];

// Figure 10 — customer-visible incidents in past 90 days, AI vs non-AI.
// 100% stacked with an explicit severity order from "more incidents" → "none".
export const incidentsBy90Days = [
  {
    label: "AI in production",
    n: 88,
    segments: {
      "3 or more times":   19,
      "Once or twice":     55,
      "No incidents":      23,
      "Unsure":            3,
    },
  },
  {
    label: "No AI in production",
    n: 42,
    segments: {
      "3 or more times":   17,
      "Once or twice":     45,
      "No incidents":      31,
      "Unsure":            7,
    },
  },
];

// Figure 11 — what breaks. Causes, AI vs non-AI.
export const topFailureCauses = [
  { cause: "LLM / external API failures",       ai: 56, nonAI: 45 },
  { cause: "Infrastructure crashes",            ai: 48, nonAI: 57 },
  { cause: "Concurrency spikes",                ai: 41, nonAI: 29 },
  { cause: "Scaling under load",                ai: 36, nonAI: 29 },
  { cause: "Lost / corrupted state",            ai: 26, nonAI: 26 },
  { cause: "Can't tell — no observability",     ai: 8,  nonAI: 7  },
];

// ---------------------------------------------------------------------------
// Frameworks & evals — Section 5
// ---------------------------------------------------------------------------

// Figure 13 — eval approach by team size. AI teams only. Multi-select.
export const evalApproachByTeamSize = {
  cohorts: [
    { label: "Solo/2–10", n: 35 },
    { label: "11–50",     n: 27 },
    { label: "51–500",    n: 15 },
    { label: "500+",      n: 11 },
  ],
  tools: [
    { key: "own",        label: "Built own pipeline", color: "#E86B5F", values: [49, 37, 60, 64] },
    { key: "none",       label: "Not doing evals",    color: "#242424", values: [34, 44, 27, 27] },
    { key: "langfuse",   label: "LangFuse",           color: "#7BB7E7", values: [11,  7, 20, 18] },
    { key: "langsmith",  label: "LangSmith",          color: "#4EB88A", values: [ 6, 11, 13, 18] },
    { key: "braintrust", label: "Braintrust",         color: "#8B5CC7", values: [ 9, 11,  0, 18] },
    { key: "arize",      label: "Arize / Phoenix",    color: "#E5A83E", values: [ 6,  7,  7,  0] },
  ],
};

// Figure 14 — scaling confidence by eval approach. AI teams only.
// Sorted by % very confident (descending).
export const confidenceByEvals = [
  {
    label: "Braintrust",          n: 8, directional: true,
    rightLabel: "50% / 12%",
    segments: { "Very confident": 50, "Somewhat confident": 38, "Not very confident": 12 },
  },
  {
    label: "Built own pipeline",  n: 43,
    rightLabel: "21% / 16%",
    segments: { "Very confident": 21, "Somewhat confident": 63, "Not very confident": 16 },
  },
  {
    label: "Arize / Phoenix",     n: 5, directional: true,
    rightLabel: "20% / 0%",
    segments: { "Very confident": 20, "Somewhat confident": 80, "Not very confident": 0 },
  },
  {
    label: "LangSmith",           n: 9, directional: true,
    rightLabel: "11% / 11%",
    segments: { "Very confident": 11, "Somewhat confident": 78, "Not very confident": 11 },
  },
  {
    label: "LangFuse",            n: 11,
    rightLabel: "9% / 9%",
    segments: { "Very confident":  9, "Somewhat confident": 82, "Not very confident":  9 },
  },
  {
    label: "Not doing evals",     n: 31,
    rightLabel: "6% / 29%",
    segments: { "Very confident":  6, "Somewhat confident": 65, "Not very confident": 29 },
  },
];

// Figure 15 — perceived limitations of eval solutions (all respondents n=143).
// The "not running evals" row is a non-response — tinted gray so it reads
// distinctly from the other limitations.
export const evalGaps = [
  { label: "Hard to write evals that catch the failures that actually matter", value: 28, count: 40, color: "#1A161C" },
  { label: "LLM-as-judge is too slow or expensive to run at scale",            value: 22, count: 32, color: "#1A161C" },
  { label: "Results live in a separate system from where we debug failures",   value: 18, count: 26, color: "#1A161C" },
  { label: "We're not running evals / don't know enough to comment",           value: 16, count: 23, color: "#9B9B9B" },
  { label: "No way to act on a failed eval — it's observability only",         value: 12, count: 17, color: "#1A161C" },
  { label: "We don't have enough coverage to trust our outputs",               value: 11, count: 16, color: "#1A161C" },
  { label: "Evals are offline only — don't reflect production behavior",       value:  9, count: 13, color: "#1A161C" },
];

// Figure 16 — eval gaps by tool in use (matrix). Values are % of each tool's
// users citing each limitation. Tools with n<3 (W&B, Helicone) excluded.
export const evalGapsByTool = {
  columns: [
    "Hard to write evals that catch the failures that actually matter",
    "LLM-as-judge is too slow or expensive to run at scale",
    "Results live in a separate system from where we debug failures",
    "We don't have enough coverage to trust our outputs",
    "No way to act on a failed eval — it's observability only",
    "Evals are offline only — don't reflect production behavior",
  ],
  rows: [
    { label: "Built own pipeline", n: 43, values: [47, 35, 30, 21, 26, 19] },
    { label: "LangFuse",           n: 11, values: [64, 55, 45, 55, 27, 18] },
    { label: "LangSmith",          n:  9, values: [78, 44, 56,  0, 11, 56] },
    { label: "Braintrust",         n:  8, values: [50, 25, 38, 25,  0, 25] },
    { label: "Arize / Phoenix",    n:  5, values: [80, 20, 60, 40,  0, 20] },
    { label: "Not doing evals",    n: 31, values: [35, 42, 29,  3, 13,  6] },
  ],
};

// Figure 18 — agent framework adoption by team size. AI teams only.
export const frameworkAdoptionByTeamSize = {
  cohorts: [
    { label: "Solo/2–10", n: 35 },
    { label: "11–50",     n: 27 },
    { label: "51–500",    n: 15 },
    { label: "500+",      n: 11 },
  ],
  tools: [
    { key: "direct",    label: "Direct API/DIY",     color: "#E86B5F", values: [77, 59, 67, 73] },
    { key: "vercel",    label: "Vercel AI SDK",      color: "#4F9BE7", values: [34, 33, 20, 18] },
    { key: "langchain", label: "LangChain/LGraph",   color: "#4EB88A", values: [ 6, 22, 33, 45] },
    { key: "llama",     label: "LlamaIndex",         color: "#8B5CC7", values: [ 3, 11, 13,  9] },
    { key: "mastra",    label: "Mastra",             color: "#E5A83E", values: [ 6,  7,  7,  9] },
  ],
};

// Legacy single-bar breakdown, kept for backwards-compat until all charts
// migrate to the by-team-size grouped view.
export const frameworkTools = [
  { label: "Direct LLM calls / homegrown", value: 69 },
  { label: "Vercel AI SDK", value: 9 },
  { label: "LangChain / LangGraph", value: 6 },
  { label: "Mastra", value: 5 },
  { label: "Other", value: 11 },
];

// Figure 19 — scaling confidence by agent framework. AI teams only.
// Sorted by % very confident.
export const confidenceByFramework = [
  {
    label: "Mastra", n: 6, directional: true,
    rightLabel: "50% / 0%",
    segments: { "Very confident": 50, "Somewhat confident": 50, "Not very confident":  0 },
  },
  {
    label: "Vercel AI SDK", n: 26,
    rightLabel: "35% / 8%",
    segments: { "Very confident": 35, "Somewhat confident": 57, "Not very confident":  8 },
  },
  {
    label: "Direct API / DIY", n: 61,
    rightLabel: "16% / 20%",
    segments: { "Very confident": 16, "Somewhat confident": 64, "Not very confident": 20 },
  },
  {
    label: "LlamaIndex", n: 7, directional: true,
    rightLabel: "14% / 14%",
    segments: { "Very confident": 14, "Somewhat confident": 72, "Not very confident": 14 },
  },
  {
    label: "LangChain/LangGraph", n: 18,
    rightLabel: "0% / 22%",
    segments: { "Very confident":  0, "Somewhat confident": 78, "Not very confident": 22 },
  },
];

// Legacy shape retained for any still-wired imports.
export const _legacyConfidenceByFramework = [
  {
    label: "Mastra",
    segments: {
      "Very confident": 40,
      "Somewhat confident": 50,
      "Not confident": 10,
    },
  },
  {
    label: "Vercel AI SDK",
    segments: {
      "Very confident": 24,
      "Somewhat confident": 58,
      "Not confident": 18,
    },
  },
  {
    label: "LangChain / LangGraph",
    segments: {
      "Very confident": 18,
      "Somewhat confident": 54,
      "Not confident": 28,
    },
  },
  {
    label: "Direct / homegrown",
    segments: {
      "Very confident": 16,
      "Somewhat confident": 52,
      "Not confident": 32,
    },
  },
];

// Figure 20 — perceived limitations of agent frameworks (all respondents n=143).
// "Not using frameworks" row tinted gray to read as a non-response.
export const frameworkGaps = [
  { label: "Abstractions make failures harder to trace",                      value: 26, count: 37, color: "#1A161C" },
  { label: "Poor support for long-running or stateful workflows",             value: 19, count: 27, color: "#1A161C" },
  { label: "Only handles orchestration at the application layer (not infra)", value: 15, count: 22, color: "#1A161C" },
  { label: "We're not using frameworks / don't know enough to comment",       value: 15, count: 22, color: "#9B9B9B" },
  { label: "Abstractions are too rigid",                                      value: 15, count: 22, color: "#1A161C" },
  { label: "Lock-in makes it hard to switch models or providers",             value: 13, count: 18, color: "#1A161C" },
  { label: "Doesn't compose well with job orchestration",                     value: 12, count: 17, color: "#1A161C" },
];

// Figure 21 — framework gaps by tool (matrix). Values are % of each tool's
// users citing each limitation. Tools with n<3 excluded.
export const frameworkGapsByTool = {
  columns: [
    "Harder to trace",
    "Poor stateful",
    "App layer only",
    "Too rigid",
    "Lock-in",
  ],
  rows: [
    { label: "Direct/DIY",     n: 61, values: [38, 26, 21, 25, 18] },
    { label: "Vercel AI SDK",  n: 26, values: [54, 35, 38, 23, 35] },
    { label: "LangChain",      n: 18, values: [50, 50, 28, 39, 28] },
    { label: "LlamaIndex",     n:  7, values: [43, 14, 29, 71, 14] },
    { label: "Mastra",         n:  6, values: [67, 17, 33, 17,  0] },
  ],
};

// ---------------------------------------------------------------------------
// Confidence in scaling — Section 6
// ---------------------------------------------------------------------------

// Figure 22 — confidence in scaling AI workloads, by team size. AI teams only.
// 100%-stacked with 4 confidence levels, sorted by team size ascending.
// rightLabel renders "very% / (not very + not at all)%".
export const confidenceByTeamSize = [
  {
    label: "Solo / 2–10", n: 35,
    rightLabel: "26% / 17%",
    segments: {
      "Very confident": 26,
      "Somewhat confident": 57,
      "Not very confident": 14,
      "Not at all confident": 3,
    },
  },
  {
    label: "11–50", n: 27,
    rightLabel: "22% / 19%",
    segments: {
      "Very confident": 22,
      "Somewhat confident": 59,
      "Not very confident": 15,
      "Not at all confident": 4,
    },
  },
  {
    label: "51–500", n: 15,
    rightLabel: "13% / 7%",
    segments: {
      "Very confident": 13,
      "Somewhat confident": 80,
      "Not very confident": 7,
      "Not at all confident": 0,
    },
  },
  {
    label: "500+", n: 11,
    rightLabel: "0% / 27%",
    segments: {
      "Very confident": 0,
      "Somewhat confident": 73,
      "Not very confident": 27,
      "Not at all confident": 0,
    },
  },
];

// Figure 23 — the most statistically significant signals for confidence.
// Net = % confident (n=73) minus % unconfident (n=15). AI teams only.
// sig = "***" (p<0.01), "**" (p<0.05), "*" (p<0.10), or "ns" (not significant).
export type SignalRow = {
  label: string;
  pp: number;
  conf: number;
  unconf: number;
  sig: "***" | "**" | "*" | "ns";
};

export const significanceSignals: Array<{ name: string; rows: SignalRow[] }> = [
  {
    name: "Strongest positive combinations",
    rows: [
      { label: "Durable execution + evals + low burden",          pp: 36, conf: 49, unconf: 13, sig: "**" },
      { label: "Durable execution + evals",                       pp: 33, conf: 60, unconf: 27, sig: "**" },
      { label: "Evals + fast debug",                              pp: 32, conf: 32, unconf:  0, sig: "***" },
      { label: "Durable execution + orch-native insights + low burden", pp: 34, conf: 47, unconf: 13, sig: "ns" },
      { label: "Durable execution + fast debug",                  pp: 30, conf: 37, unconf:  7, sig: "ns" },
      { label: "Orch-native insights + fast debug",               pp: 27, conf: 27, unconf:  0, sig: "ns" },
    ],
  },
  {
    name: "Single factors",
    rows: [
      { label: "Has production evals",             pp: 30, conf: 70, unconf: 40, sig: "**" },
      { label: "Diagnoses failures in minutes",    pp: 29, conf: 42, unconf: 13, sig: "**" },
      { label: "Orchestration-native insights",    pp: 22, conf: 62, unconf: 40, sig: "ns" },
      { label: "Any structured orchestration",     pp: 15, conf: 88, unconf: 73, sig: "ns" },
      { label: "Low reliability burden",           pp: 15, conf: 82, unconf: 67, sig: "ns" },
    ],
  },
  {
    name: "Anti-patterns",
    rows: [
      { label: "No evals + no orch-native insights", pp: -33, conf: 14, unconf: 47, sig: "***" },
      { label: "No production evals",                pp: -30, conf: 30, unconf: 60, sig: "**" },
      { label: "Logs only",                          pp: -10, conf:  3, unconf: 13, sig: "ns" },
      { label: "Ad-hoc or no orchestration",         pp: -25, conf: 15, unconf: 40, sig: "ns" },
      { label: "No structured orchestration",        pp: -15, conf: 12, unconf: 27, sig: "ns" },
    ],
  },
];

// Legacy shape retained in case anything still imports it.
export const stackPredictors = [
  { factor: "All three: durable execution + evals + fast diagnosis", confident: 49, unconfident: 13 },
  { factor: "Production evals in place",                             confident: 68, unconfident: 32 },
  { factor: "Durable execution platform",                            confident: 75, unconfident: 45 },
  { factor: "Diagnose failures in minutes",                          confident: 62, unconfident: 27 },
  { factor: "No evals in place",                                     confident: 12, unconfident: 58 },
];

// ---------------------------------------------------------------------------
// What's still unsolved — Section 7
// ---------------------------------------------------------------------------

export const unsolvedThemes = [
  { label: "Observability", value: 19 },
  { label: "Reliability & state management", value: 16 },
  { label: "Scaling", value: 12 },
  { label: "Cost", value: 10 },
  { label: "Debugging", value: 9 },
  { label: "Evals / quality", value: 8 },
];
