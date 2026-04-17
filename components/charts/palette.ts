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
  carbon600: "#636363",
  carbon700: "#4B4B4B",
  carbon800: "#353535",
  carbon900: "#242424",
  carbon950: "#121212",
  carbon1000: "#020202",
} as const;

// Ordered series colors for charts that sit on ANY colored gradient
// background. Pure carbon (monochrome) so bars read consistently whether the
// background is matcha, honey, breeze, purplehaze, ruby, or blush — the
// gradient carries the hue, the bars carry the data.
export const categoricalOnGradient = [
  palette.carbon1000,
  palette.carbon700,
  palette.carbon900,
  palette.carbon600,
  palette.carbon800,
  palette.carbon400,
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
