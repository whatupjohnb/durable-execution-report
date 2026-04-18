import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // Carbon (neutrals)
        carbon: {
          0: "rgb(var(--color-carbon-0) / <alpha-value>)",
          50: "rgb(var(--color-carbon-50) / <alpha-value>)",
          100: "rgb(var(--color-carbon-100) / <alpha-value>)",
          200: "rgb(var(--color-carbon-200) / <alpha-value>)",
          300: "rgb(var(--color-carbon-300) / <alpha-value>)",
          400: "rgb(var(--color-carbon-400) / <alpha-value>)",
          500: "rgb(var(--color-carbon-500) / <alpha-value>)",
          600: "rgb(var(--color-carbon-600) / <alpha-value>)",
          700: "rgb(var(--color-carbon-700) / <alpha-value>)",
          800: "rgb(var(--color-carbon-800) / <alpha-value>)",
          900: "rgb(var(--color-carbon-900) / <alpha-value>)",
          950: "rgb(var(--color-carbon-950) / <alpha-value>)",
          1000: "rgb(var(--color-carbon-1000) / <alpha-value>)",
        },
        matcha: {
          0: "rgb(var(--color-matcha-0) / <alpha-value>)",
          100: "rgb(var(--color-matcha-100) / <alpha-value>)",
          200: "rgb(var(--color-matcha-200) / <alpha-value>)",
          300: "rgb(var(--color-matcha-300) / <alpha-value>)",
          400: "rgb(var(--color-matcha-400) / <alpha-value>)",
          500: "rgb(var(--color-matcha-500) / <alpha-value>)",
          600: "rgb(var(--color-matcha-600) / <alpha-value>)",
          700: "rgb(var(--color-matcha-700) / <alpha-value>)",
          800: "rgb(var(--color-matcha-800) / <alpha-value>)",
          900: "rgb(var(--color-matcha-900) / <alpha-value>)",
        },
        // Signature lime accent — from the user's Figma hero gradient.
        // Not in the Inngest palette; this is what distinguishes the report.
        lime: {
          signature: "rgb(var(--color-lime-signature) / <alpha-value>)",
        },
        // Breeze / ruby / honey / purplehaze kept defined for forward compat
        breeze: {
          0: "rgb(var(--color-breeze-0) / <alpha-value>)",
          300: "rgb(var(--color-breeze-300) / <alpha-value>)",
          500: "rgb(var(--color-breeze-500) / <alpha-value>)",
          600: "rgb(var(--color-breeze-600) / <alpha-value>)",
          900: "rgb(var(--color-breeze-900) / <alpha-value>)",
        },
        ruby: {
          300: "rgb(var(--color-ruby-300) / <alpha-value>)",
          500: "rgb(var(--color-ruby-500) / <alpha-value>)",
          600: "rgb(var(--color-ruby-600) / <alpha-value>)",
        },
        honey: {
          300: "rgb(var(--color-honey-300) / <alpha-value>)",
          500: "rgb(var(--color-honey-500) / <alpha-value>)",
        },
        purplehaze: {
          300: "rgb(var(--color-purplehaze-300) / <alpha-value>)",
          500: "rgb(var(--color-purplehaze-500) / <alpha-value>)",
        },
        // Semantic aliases (dark-mode resolved)
        canvasBase: "rgb(var(--color-background-canvas-base) / <alpha-value>)",
        canvasSubtle:
          "rgb(var(--color-background-canvas-subtle) / <alpha-value>)",
        surfaceBase:
          "rgb(var(--color-background-surface-base) / <alpha-value>)",
        surfaceSubtle:
          "rgb(var(--color-background-surface-subtle) / <alpha-value>)",
      },
      textColor: {
        basis: "rgb(var(--color-foreground-base) / <alpha-value>)",
        subtle: "rgb(var(--color-foreground-subtle) / <alpha-value>)",
        muted: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        light: "rgb(var(--color-foreground-light) / <alpha-value>)",
        alwaysBlack: "rgb(var(--color-foreground-alwaysBlack) / <alpha-value>)",
        alwaysWhite: "rgb(var(--color-foreground-alwaysWhite) / <alpha-value>)",
      },
      borderColor: {
        subtle: "rgb(var(--color-border-subtle) / <alpha-value>)",
        muted: "rgb(var(--color-border-muted) / <alpha-value>)",
        contrast: "rgb(var(--color-border-contrast) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: [
          "var(--font-whyte)",
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        "2xs": "0.625rem",
        "5xl": ["3rem", "1.1"],
        "6xl": ["4rem", "1.05"],
        "7xl": ["5rem", "1.0"],
      },
      maxWidth: {
        "3xl": "50rem",
        "container-desktop": "1600px",
      },
      backgroundImage: {
        // Hero — exact Figma stops (matcha + signature lime)
        "hero-gradient":
          "linear-gradient(135deg, #FFFFFF 0%, #9ADAB3 33%, #79D617 49%, #2C9B63 64%, #FFFFFF 82%)",
        // Section-specific chart backgrounds — tinted-light → mid → deep →
        // tinted-light. Uses each palette's own 100-level tint instead of
        // pure white so the gradient reads colored end-to-end, with a wider
        // saturated middle band.
        "gradient-matcha":
          "linear-gradient(135deg, #DFF5E6 0%, #9ADAB3 20%, #79D617 50%, #2C9B63 80%, #DFF5E6 100%)",
        "gradient-honey":
          "linear-gradient(135deg, #FFEEC4 0%, #FFE39B 20%, #FCC43F 50%, #D56B13 80%, #FFEEC4 100%)",
        "gradient-breeze":
          "linear-gradient(135deg, #E0F2FF 0%, #CEE9FF 20%, #52B2FD 50%, #1365D6 80%, #E0F2FF 100%)",
        "gradient-purplehaze":
          "linear-gradient(135deg, #F0EDFF 0%, #E6E2FE 20%, #AD9FFC 50%, #6222DF 80%, #F0EDFF 100%)",
        "gradient-ruby":
          "linear-gradient(135deg, #FEEBE9 0%, #FEDEDC 20%, #FA8D86 50%, #CB2A1D 80%, #FEEBE9 100%)",
        "gradient-blush":
          "linear-gradient(135deg, #FFEAED 0%, #FFDDE2 20%, #FD88A0 50%, #CF164B 80%, #FFEAED 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [typography],
};

export default config;
