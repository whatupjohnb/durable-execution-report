import { clsx } from "@/lib/clsx";
import { ChartShare } from "./ChartShare";

export type ChartVariant =
  | "matcha"
  | "honey"
  | "breeze"
  | "purplehaze"
  | "ruby"
  | "blush";

// Static class mapping so Tailwind's JIT picks up every variant at build time.
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
  aspect = "aspect-[16/9]",
  variant = "matcha",
}: Props) {
  const anchorId = label ? `fig-${slugify(label)}` : undefined;
  const shareTitle = caption ?? label ?? "Chart";

  return (
    <figure
      id={anchorId}
      className={clsx(
        "my-10 overflow-hidden rounded-tr-[48px] rounded-bl-[48px] p-6 text-carbon-1000 ring-1 ring-inset ring-carbon-1000/10 sm:p-8 scroll-mt-24",
        VARIANT_BG[variant],
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        {label ? (
          <div className="font-mono text-[0.6875rem] uppercase tracking-widest text-carbon-1000/70">
            {label}
          </div>
        ) : (
          <span />
        )}
        {anchorId ? (
          <ChartShare anchorId={anchorId} title={shareTitle} />
        ) : null}
      </div>
      {caption ? (
        <figcaption className="mb-5 max-w-2xl font-heading text-lg font-semibold leading-snug text-carbon-1000 sm:text-xl">
          {caption}
        </figcaption>
      ) : null}
      <div className={clsx("w-full", aspect)}>{children}</div>
      {source ? (
        <div className="mt-4 font-mono text-[0.6875rem] text-carbon-1000/60">
          {source}
        </div>
      ) : null}
    </figure>
  );
}
