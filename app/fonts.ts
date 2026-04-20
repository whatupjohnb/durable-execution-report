import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

// ABCWhyte — headings (Medium weight throughout)
export const whyte = localFont({
  src: [
    {
      path: "../public/fonts/ABCWhyte-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ABCWhyte-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ABCWhyte-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-whyte",
});

// ABCWhyte Inktrap — hero headline only
export const whyteInktrap = localFont({
  src: [
    {
      path: "../public/fonts/ABCWhyteInktrap-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-whyte-inktrap",
});

// ABCWhyte Mono — monospaced labels, eyebrows, data
export const whyteMono = localFont({
  src: [
    {
      path: "../public/fonts/ABCWhyteMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-whyte-mono",
});

// Circular XX — body text
export const circular = localFont({
  src: [
    {
      path: "../public/fonts/CircularXXWeb-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CircularXXWeb-Regular.woff",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-circular",
});
