import { clsx } from "@/lib/clsx";
import type { SignalRow } from "@/content/report";

type Group = { name: string; rows: SignalRow[] };

type Props = {
  groups: Group[];
  /** Subtitle printed above the chart, e.g. "Net = % confident − % unconfident". */
  subtitle?: string;
};

/**
 * Horizontal diverging-magnitude bar chart for Figure 23. Each row shows a
 * statistical signal's +/− effect size (pp). Bars share a common left origin
 * and their widths represent absolute magnitude; colors encode sign
 * (green = more common among confident, red = among unconfident) and
 * significance (saturated = sig, dim gray = ns).
 */
export function SignificanceSignalsChart({ groups, subtitle }: Props) {
  // Compute a shared scale across all rows so every bar is comparable.
  const allPp = groups.flatMap((g) => g.rows.map((r) => Math.abs(r.pp)));
  const max = Math.max(40, Math.ceil(Math.max(...allPp) / 5) * 5);

  return (
    <div className="flex flex-col gap-5">
      {subtitle ? (
        <p className="text-xs italic leading-relaxed text-carbon-500">
          {subtitle}
        </p>
      ) : null}

      <div className="flex items-center gap-6 font-mono text-[0.7rem] text-carbon-500">
        <span className="text-[#A52015]">← more common among unconfident</span>
        <span className="text-[#016239]">more common among confident →</span>
      </div>

      {groups.map((g) => (
        <div key={g.name} className="flex flex-col gap-2">
          <h4 className="font-mono text-[0.7rem] uppercase tracking-widest text-carbon-500">
            {g.name}
          </h4>
          <ul className="flex flex-col gap-1.5">
            {g.rows.map((r) => (
              <SignalBar key={r.label} row={r} max={max} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SignalBar({ row, max }: { row: SignalRow; max: number }) {
  const abs = Math.abs(row.pp);
  const positive = row.pp >= 0;
  const significant = row.sig !== "ns";

  const barColor = significant
    ? positive
      ? "#016239" // matcha-700 — significant positive
      : "#A52015" // ruby-700 — significant negative
    : "#7C7C7C"; // carbon-500 — not significant

  const barOpacity = significant ? 1 : 0.55;
  const valueColor = significant ? "#FFFFFF" : "#1A161C";

  return (
    <li className="grid items-center gap-x-4 gap-y-0 text-[13px] sm:grid-cols-[auto_minmax(0,1fr)_auto_auto_2rem]">
      <span
        className={clsx(
          "max-w-[18rem] text-left leading-tight",
          significant ? "font-semibold text-carbon-1000" : "text-carbon-700",
        )}
      >
        {row.label}
      </span>
      <div className="relative h-6 min-w-0 overflow-hidden bg-carbon-100">
        <div
          className="flex h-full items-center justify-center whitespace-nowrap font-mono text-xs tabular-nums"
          style={{
            width: `${(abs / max) * 100}%`,
            backgroundColor: barColor,
            opacity: barOpacity,
            color: valueColor,
          }}
        >
          {row.pp > 0 ? "+" : ""}
          {row.pp}pp
        </div>
      </div>
      <span
        className={clsx(
          "whitespace-nowrap text-right font-mono text-xs tabular-nums",
          positive ? "text-[#016239]" : "text-carbon-700",
        )}
      >
        {row.conf}% conf
      </span>
      <span
        className={clsx(
          "whitespace-nowrap text-right font-mono text-xs tabular-nums",
          positive ? "text-carbon-700" : "text-[#A52015]",
        )}
      >
        {row.unconf}% unconf
      </span>
      <span
        className={clsx(
          "text-center font-mono text-[0.7rem]",
          significant ? "font-semibold text-carbon-1000" : "text-carbon-500",
        )}
      >
        {row.sig}
      </span>
    </li>
  );
}
