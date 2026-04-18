import { Eyebrow } from "./Eyebrow";
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
      <div className="relative isolate overflow-hidden rounded-tr-[48px] rounded-bl-[48px]">
        {/* Layer 1 — base gradient (exact Figma stops) */}
        <div
          className="absolute inset-0 bg-hero-gradient"
          aria-hidden="true"
        />

        {/* Layer 2 — textured noise, soft-light blend at 35% opacity.
            Drop file at /public/textures/noise.png (see textures/README.md). */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.35] bg-cover bg-center"
          style={{ backgroundImage: "url('/textures/noise.png')" }}
          aria-hidden="true"
        />

        {/* Layer 3 — Shape.png at 5% opacity, scaled up to bleed past the
            frame. Drop file at /public/textures/shape.png. */}
        <div
          className="pointer-events-none absolute -inset-[15%] opacity-[0.05] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/textures/shape.png')" }}
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
