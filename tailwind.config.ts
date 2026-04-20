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
        sans: ["var(--font-circular)", "system-ui", "sans-serif"],
        heading: [
          "var(--font-whyte)",
          "system-ui",
          "sans-serif",
        ],
        "heading-inktrap": [
          "var(--font-whyte-inktrap)",
          "var(--font-whyte)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-whyte-mono)",
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
        // Section-specific chart backgrounds — lighter edges → peak saturation
        // at center → lighter edges. Uses brand palette -300 at edges, -500
        // at center, with a -400 intermediate stop each side for smooth bloom.
        "gradient-matcha":
          "linear-gradient(135deg, #9ADAB3 0%, #66BD8B 30%, #2C9B63 50%, #66BD8B 70%, #9ADAB3 100%)",
        "gradient-honey":
          "linear-gradient(135deg, #FCC43F 0%, #E8871F 30%, #D56B13 50%, #E8871F 70%, #FCC43F 100%)",
        "gradient-breeze":
          "linear-gradient(135deg, #9CD2FF 0%, #52AAFD 30%, #2389F1 50%, #52AAFD 70%, #9CD2FF 100%)",
        "gradient-purplehaze":
          "linear-gradient(135deg, #CEC6FD 0%, #AD9FFC 30%, #8B74F9 50%, #AD9FFC 70%, #CEC6FD 100%)",
        "gradient-ruby":
          "linear-gradient(135deg, #FA8D86 0%, #F76A61 30%, #F54A3F 50%, #F76A61 70%, #FA8D86 100%)",
        "gradient-blush":
          "linear-gradient(135deg, #FD88A0 0%, #E6366F 30%, #CF164B 50%, #E6366F 70%, #FD88A0 100%)",
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
