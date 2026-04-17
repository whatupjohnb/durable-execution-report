import { Eyebrow } from "./Eyebrow";
import { GlitchTexture } from "./GlitchTexture";
import { DownloadButton } from "./DownloadButton";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function ReportHero({
  eyebrow = "AI in Production",
  title,
  subtitle,
}: Props) {
  return (
    <header className="px-4 pt-8 sm:px-8 sm:pt-12">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Base gradient — exact stops from Figma */}
        <div
          className="absolute inset-0 bg-hero-gradient"
          aria-hidden="true"
        />

        {/* Glitch texture — anchored to right edge, tints to darker green */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[40%] text-matcha-800/60"
          aria-hidden="true"
        >
          <GlitchTexture className="h-full w-full" />
        </div>

        {/* Subtle inner vignette to deepen edges */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.18)_100%)]"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[min(68vh,640px)] max-w-3xl flex-col items-center justify-center gap-6 px-6 py-24 text-center sm:py-32">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-carbon-1000 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-xl text-base leading-relaxed text-carbon-1000/80 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-4 print-hide">
            <DownloadButton>Download PDF</DownloadButton>
          </div>
        </div>
      </div>
    </header>
  );
}
