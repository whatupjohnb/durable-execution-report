import { clsx } from "@/lib/clsx";

type Props = {
  label?: string;
  caption?: string;
  source?: string;
  children: React.ReactNode;
  className?: string;
  aspect?: string;
};

export function ChartFrame({
  label,
  caption,
  source,
  children,
  className,
  aspect = "aspect-[16/9]",
}: Props) {
  return (
    <figure
      className={clsx(
        "my-10 overflow-hidden rounded-2xl bg-hero-gradient p-6 text-carbon-1000 ring-1 ring-inset ring-carbon-1000/10 sm:p-8",
        className,
      )}
    >
      {label ? (
        <div className="mb-3 font-mono text-[0.6875rem] uppercase tracking-widest text-carbon-1000/70">
          {label}
        </div>
      ) : null}
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
