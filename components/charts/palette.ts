/**
 * Categorical chart palette, anchored on the signature lime + Inngest matcha.
 * Values are raw CSS RGB triplets so charts can resolve them against the
 * current theme via `rgb(var(--X))` in styles, or convert to hex at build
 * time. In practice we expose them as hex strings for Visx consumption.
 */
export const palette = {
  limeSignature: "#79D617",
  matcha400: "#66BD8B",
  matcha500: "#2C9B63",
  matcha700: "#016239",
  matcha800: "#015430",
  carbon50: "#F6F6F6",
  carbon200: "#CCCCCC",
  carbon400: "#9B9B9B",
  carbon600: "#636363",
  carbon800: "#353535",
  carbon900: "#242424",
  carbon950: "#121212",
} as const;

// Ordered list for categorical series. Lime first (for "hero" series),
// then matcha tones, then neutrals. Designed to degrade sensibly when there
// are more series than colors — cycles through.
export const categoricalColors = [
  palette.limeSignature,
  palette.matcha500,
  palette.matcha700,
  palette.matcha400,
  palette.matcha800,
  palette.carbon400,
];
