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

// Whyte (ABC Dinamo, licensed). Drop .woff2 files into /public/fonts/ and
// uncomment the `src` entries you have. Until then, --font-whyte is undefined
// and the font stack falls through to Inter via var(--font-inter).
//
// Expected filenames (match Dinamo's default naming):
//   public/fonts/ABCWhyte-Regular.woff2
//   public/fonts/ABCWhyte-Medium.woff2
//   public/fonts/ABCWhyte-Bold.woff2
//
// Once the files are present, uncomment the block below.
//
// export const whyte = localFont({
//   src: [
//     {
//       path: "../public/fonts/ABCWhyte-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/ABCWhyte-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/ABCWhyte-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   display: "swap",
//   variable: "--font-whyte",
// });

// Placeholder export so layout can reference `whyte.variable` unconditionally
// — it simply won't set a value until the real font is wired up above.
export const whyte = { variable: "" } as { variable: string };
