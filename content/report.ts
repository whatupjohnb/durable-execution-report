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
  { id: "durable-execution", label: "Durable execution" },
  { id: "reliability-tax", label: "The reliability tax" },
  { id: "observability-edge", label: "The observability edge" },
  { id: "frameworks-evals", label: "Frameworks & evals" },
  { id: "confidence-scaling", label: "Confidence at scale" },
  { id: "unsolved", label: "What's still unsolved" },
  { id: "conclusion", label: "Conclusion" },
] as const;

// ---------------------------------------------------------------------------
// Durable execution — Section 2
// ---------------------------------------------------------------------------

export const workflowUseCases = [
  { label: "Background jobs", value: 92 },
  { label: "Event-driven workflows", value: 88 },
  { label: "Long-running workflows", value: 68 },
  { label: "AI / LLM workflows", value: 68 },
  { label: "Scheduled jobs", value: 60 },
];

export const orchestrationPlatforms = [
  { label: "Custom-built", value: 40 },
  { label: "AWS / Vercel / CF", value: 32 },
  { label: "Inngest", value: 30 },
  { label: "Temporal", value: 24 },
  { label: "BullMQ / Celery / Sidekiq", value: 22 },
];

// Of Inngest users, what else are they running?
export const inngestSoloVsPaired = [
  { label: "Inngest alone", value: 56 },
  { label: "Inngest + custom-built", value: 22 },
  { label: "Inngest + another third-party", value: 22 },
];

// Average % of workflow types covered, among solo-tool cohorts.
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

// Drivers of reliability increase, AI vs non-AI.
export const reliabilityDrivers = [
  {
    cause: "Higher traffic and scale",
    ai: 62,
    nonAI: 50,
  },
  {
    cause: "Technical debt",
    ai: 58,
    nonAI: 86,
  },
  {
    cause: "Multi-service architectures",
    ai: 36,
    nonAI: 33,
  },
  {
    cause: "Faster shipping pressure",
    ai: 30,
    nonAI: 28,
  },
  {
    cause: "AI workloads / new failure modes",
    ai: 24,
    nonAI: 4,
  },
  {
    cause: "Non-deterministic outputs",
    ai: 15,
    nonAI: 2,
  },
];

// ---------------------------------------------------------------------------
// Observability edge — Section 4
// ---------------------------------------------------------------------------

export const diagnosticSpeed = [
  { label: "Minutes", value: 38 },
  { label: "Under an hour (with investigation)", value: 54 },
  { label: "Hours or can't fully explain", value: 9 },
];

// Diagnostic speed split by observability tooling.
export const diagnosticSpeedByTool = [
  {
    label: "Platform-native dashboards",
    segments: {
      Minutes: 40,
      "Under an hour": 59,
      "Hours / blind": 1,
    },
  },
  {
    label: "APM only (Sentry, DataDog, etc.)",
    segments: {
      Minutes: 29,
      "Under an hour": 60,
      "Hours / blind": 11,
    },
  },
  {
    label: "Logs only",
    segments: {
      Minutes: 22,
      "Under an hour": 60,
      "Hours / blind": 18,
    },
  },
];

export const incidentsBy90Days = [
  {
    label: "AI teams",
    segments: {
      "0 incidents": 26,
      "1–2 incidents": 54,
      "3+ incidents": 20,
    },
  },
  {
    label: "Non-AI teams",
    segments: {
      "0 incidents": 38,
      "1–2 incidents": 47,
      "3+ incidents": 15,
    },
  },
];

export const topFailureCauses = [
  { cause: "LLM / external API failures", ai: 56, nonAI: 34 },
  { cause: "Infrastructure crashes", ai: 48, nonAI: 52 },
  { cause: "Data quality issues", ai: 35, nonAI: 28 },
  { cause: "Race conditions", ai: 22, nonAI: 30 },
  { cause: "Deploy regressions", ai: 20, nonAI: 25 },
];

// ---------------------------------------------------------------------------
// Frameworks & evals — Section 5
// ---------------------------------------------------------------------------

export const evalTools = [
  { label: "Not doing evals", value: 35 },
  { label: "Homegrown pipeline", value: 30 },
  { label: "LangSmith", value: 12 },
  { label: "Braintrust", value: 8 },
  { label: "Other third-party", value: 15 },
];

// Confidence by eval presence.
export const confidenceByEvals = [
  {
    label: "Using evals",
    segments: {
      "Very confident": 25,
      "Somewhat confident": 60,
      "Not confident": 15,
    },
  },
  {
    label: "Not using evals",
    segments: {
      "Very confident": 7,
      "Somewhat confident": 48,
      "Not confident": 45,
    },
  },
];

export const evalGaps = [
  { label: "Evals are hard to write", value: 31 },
  { label: "LLM-as-judge cost", value: 25 },
  { label: "Results live in a separate system", value: 20 },
  { label: "No way to act on a failed eval", value: 13 },
  { label: "Insufficient coverage to trust output", value: 12 },
  { label: "Evals offline / disconnected from prod", value: 10 },
];

export const frameworkTools = [
  { label: "Direct LLM calls / homegrown", value: 69 },
  { label: "Vercel AI SDK", value: 9 },
  { label: "LangChain / LangGraph", value: 6 },
  { label: "Mastra", value: 5 },
  { label: "Other", value: 11 },
];

export const confidenceByFramework = [
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

export const frameworkGaps = [
  { label: "Abstractions make failures harder to trace", value: 26 },
  { label: "Poor composability with job orchestration", value: 20 },
  { label: "Poor support for long-running / stateful workflows", value: 19 },
  { label: "Lock-in to specific providers", value: 14 },
  { label: "Immature / unstable APIs", value: 12 },
];

// ---------------------------------------------------------------------------
// Confidence in scaling — Section 6
// ---------------------------------------------------------------------------

export const confidenceByTeamSize = [
  { label: "1–10", value: 28 },
  { label: "11–50", value: 22 },
  { label: "51–200", value: 18 },
  { label: "201–500", value: 12 },
  { label: "500+", value: 0 },
];

// Stack-choice predictors of confidence: share of confident vs unconfident
// teams that report each combination.
export const stackPredictors = [
  {
    factor: "All three: durable execution + evals + fast diagnosis",
    confident: 49,
    unconfident: 13,
  },
  {
    factor: "Production evals in place",
    confident: 68,
    unconfident: 32,
  },
  {
    factor: "Durable execution platform",
    confident: 75,
    unconfident: 45,
  },
  {
    factor: "Diagnose failures in minutes",
    confident: 62,
    unconfident: 27,
  },
  {
    factor: "No evals in place",
    confident: 12,
    unconfident: 58,
  },
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
