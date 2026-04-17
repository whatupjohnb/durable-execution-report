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
        // Section-specific chart backgrounds, all following the same
        // light → mid-bright → deep → light structure as the hero, varying
        // only the hue. Numbers are sourced from Inngest's carbon/matcha/
        // breeze/ruby/honey/purplehaze/blush scales.
        "gradient-matcha":
          "linear-gradient(135deg, #FFFFFF 0%, #9ADAB3 33%, #79D617 49%, #2C9B63 64%, #FFFFFF 82%)",
        "gradient-honey":
          "linear-gradient(135deg, #FFFFFF 0%, #FFE39B 33%, #FCC43F 49%, #D56B13 64%, #FFFFFF 82%)",
        "gradient-breeze":
          "linear-gradient(135deg, #FFFFFF 0%, #CEE9FF 33%, #52B2FD 49%, #1365D6 64%, #FFFFFF 82%)",
        "gradient-purplehaze":
          "linear-gradient(135deg, #FFFFFF 0%, #E6E2FE 33%, #AD9FFC 49%, #6222DF 64%, #FFFFFF 82%)",
        "gradient-ruby":
          "linear-gradient(135deg, #FFFFFF 0%, #FEDEDC 33%, #FA8D86 49%, #CB2A1D 64%, #FFFFFF 82%)",
        "gradient-blush":
          "linear-gradient(135deg, #FFFFFF 0%, #FFDDE2 33%, #FD88A0 49%, #CF164B 64%, #FFFFFF 82%)",
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
