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
        "my-10 rounded-xl border border-carbon-800 bg-carbon-950 p-5",
        className,
      )}
    >
      {label ? (
        <div className="mb-3 font-mono text-[0.6875rem] uppercase tracking-widest text-matcha-400">
          {label}
        </div>
      ) : null}
      {caption ? (
        <figcaption className="mb-4 font-heading text-lg font-medium leading-snug text-carbon-50">
          {caption}
        </figcaption>
      ) : null}
      <div className={clsx("w-full", aspect)}>{children}</div>
      {source ? (
        <div className="mt-3 font-mono text-[0.6875rem] text-carbon-500">
          {source}
        </div>
      ) : null}
    </figure>
  );
}
