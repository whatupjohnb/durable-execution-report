import { clsx } from "@/lib/clsx";
import { ChartShare } from "./ChartShare";
import { InngestWordmark } from "../InngestWordmark";
import { Reveal } from "../Reveal";

export type ChartVariant =
  | "matcha"
  | "honey"
  | "breeze"
  | "purplehaze"
  | "ruby"
  | "blush";

const VARIANT_BG: Record<ChartVariant, string> = {
  matcha: "bg-gradient-matcha",
  honey: "bg-gradient-honey",
  breeze: "bg-gradient-breeze",
  purplehaze: "bg-gradient-purplehaze",
  ruby: "bg-gradient-ruby",
  blush: "bg-gradient-blush",
};

type Props = {
  /** Still accepted (used only for generating the anchor id). Not displayed. */
  label?: string;
  caption?: string;
  source?: string;
  children: React.ReactNode;
  className?: string;
  /** Optional aspect ratio class — omit for HTML-based content-sized charts. */
  aspect?: string;
  variant?: ChartVariant;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ChartFrame({
  label,
  caption,
  source,
  children,
  className,
  aspect,
  variant = "matcha",
}: Props) {
  const anchorId = label ? `fig-${slugify(label)}` : undefined;
  const shareTitle = caption ?? label ?? "Chart";

  return (
    <Reveal as="figure"
      id={anchorId}
      className={clsx(
        "my-10 flex flex-col gap-5 rounded-tr-[24px] rounded-bl-[24px] p-4 pb-6 scroll-mt-24 sm:p-5 sm:pb-7",
        VARIANT_BG[variant],
        className,
      )}
    >
      {/* White card — title + share buttons + chart body */}
      <div className="rounded-tl-none rounded-tr-[24px] rounded-br-none rounded-bl-[24px] bg-white p-5 shadow-[0_16px_48px_-18px_rgba(0,0,0,0.35)] sm:p-7">
        {(caption || anchorId) ? (
          <div className="mb-5 flex items-start justify-between gap-4">
            {caption ? (
              <div className="font-heading text-xl font-semibold leading-snug tracking-tight text-carbon-1000 sm:text-2xl">
                {caption}
              </div>
            ) : (
              <span />
            )}
            {anchorId ? (
              <ChartShare anchorId={anchorId} title={shareTitle} />
            ) : null}
          </div>
        ) : null}
        <div className={clsx("w-full", aspect)}>{children}</div>
      </div>

      {/* Gradient footer — source + Inngest wordmark */}
      <div className="flex flex-col items-center gap-4 rounded-bl-[20px] bg-black/20 px-3 py-3 text-center sm:px-5">
        {source ? (
          <p className="max-w-2xl font-mono text-[0.75rem] leading-relaxed text-white/80">
            {source}
          </p>
        ) : null}
        <InngestWordmark className="text-white/90" />
      </div>
    </Reveal>
  );
}
