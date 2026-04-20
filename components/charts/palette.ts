/**
 * Chart palette for two contexts:
 *  - `onDark`: for anything rendered on the black canvas (StatCallouts,
 *    PullQuotes, etc.) — bright lime + matcha tones
 *  - `onGradient`: for chart bodies that sit on top of the hero gradient —
 *    deep greens and near-black, which pop against lime/white stops
 *
 * The gradient background is vibrant enough that light colors disappear;
 * dark-on-green is the move.
 */
export const palette = {
  limeSignature: "#79D617",
  matcha400: "#66BD8B",
  matcha500: "#2C9B63",
  matcha700: "#016239",
  matcha800: "#015430",
  matcha900: "#004D2B",
  carbon50: "#F6F6F6",
  carbon200: "#CCCCCC",
  carbon400: "#9B9B9B",
  carbon500: "#7C7C7C",
  carbon600: "#636363",
  carbon700: "#4B4B4B",
  carbon800: "#353535",
  carbon900: "#242424",
  carbon950: "#121212",
  carbon1000: "#020202",
} as const;

// Ordered categorical palette drawn from the official Inngest brand colors.
// Used as the default for any BarChart / AreaChart / etc. that doesn't
// specify per-datum colors. Maximizes visual distinction across up to 6
// series while staying within the Inngest palette.
export const categoricalOnGradient = [
  "#FF7300", // citrus-500 — orange
  "#2389F1", // breeze-500 — blue
  "#2C9B63", // matcha-500 — green
  "#8F75B7", // quantum-500 — purple
  "#FCC43F", // honey-300 — gold
  "#F54A3F", // ruby-500 — red
];

// Ordered series colors for charts on the dark canvas (used by SmallMultiples
// if we ever put one outside a ChartFrame).
export const categoricalOnDark = [
  palette.limeSignature,
  palette.matcha500,
  palette.matcha700,
  palette.matcha400,
  palette.matcha800,
  palette.carbon400,
];

// Alias kept for any existing imports.
export const categoricalColors = categoricalOnGradient;

// Shared on-gradient ink colors (text, axes, gridlines)
export const inkOnGradient = {
  base: palette.carbon1000,
  muted: palette.carbon800,
  subtle: palette.carbon700,
  axis: palette.carbon900,
  grid: palette.carbon1000, // with low opacity, specified inline
} as const;
