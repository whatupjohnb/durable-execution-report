/**
 * Central store for the report's metadata, section list, and chart data.
 *
 * Swap placeholder values here with the real research data — no component
 * changes required.
 */

export const reportMeta = {
  title: "The 2026 Durable Execution Benchmark Report",
  subtitle:
    "Only 19% of AI teams are very confident their infrastructure can handle 2–3× their current scale. At organizations with 500+ engineers, it's 0%. We surveyed 130 engineers to understand how they build, run, and maintain reliability in production AI workflows.",
  eyebrow: "AI in Production",
  publishedOn: "April 2026",
  author: "Inngest Research",
} as const;

export const sections = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "the-reliability-burden", label: "The reliability burden" },
  { id: "llm-failures", label: "LLM failures" },
  { id: "observability-gap", label: "The observability gap" },
  { id: "what-works", label: "What works" },
  { id: "methodology", label: "Methodology" },
] as const;

// ---------------------------------------------------------------------------
// Chart data — all placeholders; replace with real survey numbers.
// ---------------------------------------------------------------------------

export const confidenceByOrgSize = [
  { label: "1–10", value: 34 },
  { label: "11–50", value: 28 },
  { label: "51–200", value: 22 },
  { label: "201–500", value: 14 },
  { label: "500+", value: 0 },
];

export const reliabilityTimeByTeamType = [
  { label: "AI teams", value: 20 },
  { label: "Non-AI teams", value: 10 },
];

export const topFailureCauses = [
  { label: "LLM / external API failures", value: 56 },
  { label: "Infrastructure crashes", value: 41 },
  { label: "Data quality issues", value: 34 },
  { label: "Race conditions", value: 22 },
  { label: "Deploy regressions", value: 18 },
];

export const burdenTrend = [
  {
    label: "AI teams",
    points: [
      { x: "2023", y: 12 },
      { x: "2024", y: 16 },
      { x: "2025", y: 18 },
      { x: "2026", y: 20 },
    ],
  },
  {
    label: "Non-AI teams",
    points: [
      { x: "2023", y: 9 },
      { x: "2024", y: 10 },
      { x: "2025", y: 10 },
      { x: "2026", y: 10 },
    ],
  },
];

export const solvedVsUnsolved = [
  {
    label: "Observability",
    segments: { Solved: 22, "Partially solved": 41, Unsolved: 37 },
  },
  {
    label: "Orchestration",
    segments: { Solved: 48, "Partially solved": 32, Unsolved: 20 },
  },
  {
    label: "Evals",
    segments: { Solved: 18, "Partially solved": 36, Unsolved: 46 },
  },
  {
    label: "Agent frameworks",
    segments: { Solved: 27, "Partially solved": 39, Unsolved: 34 },
  },
];
