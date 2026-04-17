import { clsx } from "@/lib/clsx";

type Props = {
  href?: string;
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function DownloadButton({
  href = "/report.pdf",
  children = "Download PDF",
  variant = "primary",
  className,
}: Props) {
  const base =
    "inline-flex items-center gap-2 font-mono text-sm tracking-wide px-5 py-3 border transition-colors";

  const variants = {
    primary:
      "bg-carbon-1000 text-carbon-50 border-carbon-1000 hover:bg-carbon-900",
    ghost:
      "bg-transparent text-matcha-400 border-matcha-400/60 hover:bg-matcha-400/10",
  } as const;

  return (
    <a
      href={href}
      download
      className={clsx(base, variants[variant], className)}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 1v8m0 0L3.5 5.5M7 9l3.5-3.5M1 12h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
      {children}
    </a>
  );
}
