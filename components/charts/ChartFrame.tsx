import { clsx } from "@/lib/clsx";
import { ChartShare } from "./ChartShare";

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
  label?: string;
  caption?: string;
  source?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Optional aspect ratio class (e.g. "aspect-[16/9]"). Omit for charts
   * that should size to their content (HTML-based horizontal charts).
   */
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
    <figure
      id={anchorId}
      className={clsx(
        "my-10 rounded-tr-[24px] rounded-bl-[24px] p-4 scroll-mt-24 sm:p-5",
        VARIANT_BG[variant],
        className,
      )}
    >
      <div className="rounded-2xl bg-white p-5 shadow-[0_16px_48px_-18px_rgba(0,0,0,0.35)] sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {label ? (
              <div className="font-mono text-[0.6875rem] uppercase tracking-widest text-carbon-500">
                {label}
              </div>
            ) : null}
            {caption ? (
              <div className="mt-1.5 font-heading text-xl font-semibold leading-snug tracking-tight text-carbon-1000 sm:text-2xl">
                {caption}
              </div>
            ) : null}
            {source ? (
              <div className="mt-2 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-carbon-500">
                {source}
              </div>
            ) : null}
          </div>
          {anchorId ? (
            <ChartShare anchorId={anchorId} title={shareTitle} />
          ) : null}
        </div>
        <div className={clsx("w-full", aspect)}>{children}</div>
      </div>
    </figure>
  );
}
