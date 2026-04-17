import { clsx } from "@/lib/clsx";

type Tone = "lime" | "dark";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

/**
 * Monospace bordered label used as a section eyebrow.
 * Renders like: [ AI in Production ]
 *
 * `dark` tone is for use on the green hero gradient (dark text, dark border).
 * `lime` tone is the default for use on the black canvas.
 */
export function Eyebrow({ children, tone = "lime", className }: Props) {
  const toneClasses =
    tone === "dark"
      ? "text-carbon-1000 border-carbon-1000/60"
      : "text-matcha-400 border-matcha-400/60";

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 border px-3 py-1",
        "font-mono text-xs tracking-wide",
        toneClasses,
        className,
      )}
    >
      {children}
    </span>
  );
}
