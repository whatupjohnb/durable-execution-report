import { DownloadButton } from "./DownloadButton";
import { InngestWordmark } from "./InngestWordmark";

type Props = {
  title: string;
  subtitle?: string;
};

export function ReportHero({
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

        {/* Layer 3 — Shape.png, pulsing subtly */}
        <div
          className="hero-shape-pulse pointer-events-none absolute -inset-[15%] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/textures/shape.png')" }}
          aria-hidden="true"
        />

        {/* Content — each child enters sequentially */}
        <div className="relative mx-auto flex min-h-[min(88vh,832px)] max-w-3xl flex-col items-center justify-center gap-3 px-6 py-32 text-center sm:py-40">
          <div className="hero-enter hero-enter-1">
            <InngestWordmark className="h-[4rem] w-auto text-carbon-1000" />
          </div>
          <h1 className="hero-enter hero-enter-2 font-heading-inktrap text-4xl font-medium tracking-tight text-carbon-1000 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div className="hero-enter hero-enter-3 mt-4 print-hide">
            <DownloadButton>Download PDF</DownloadButton>
          </div>
        </div>
      </div>
    </header>
  );
}
