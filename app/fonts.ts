import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

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
