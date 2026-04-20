import { clsx } from "@/lib/clsx";
import { categoricalOnGradient } from "./palette";

export type StackedRow = {
  label: string;
  segments: Record<string, number>;
  /** Optional raw count for the row. */
  n?: number;
  /** When true, appends a * to the label (directional cohort). */
  directional?: boolean;
  /** Optional right-edge label (e.g. "50% / 12%"). */
  rightLabel?: string;
};

type DirectionHint = { left: string; right: string };

type Props = {
  rows: StackedRow[];
  keys: string[];
  /** Explicit per-key fill color; falls back to categorical palette. */
  colors?: Record<string, string>;
  /** Directional hint under the chart. */
  direction?: DirectionHint;
  /** Width of the label column. Default "14rem". */
  labelWidth?: string;
};

/**
 * 100%-stacked horizontal bar chart. Pure HTML/CSS for deterministic row
 * heights. Each row has: label + optional n=, a full-width stacked bar,
 * and an optional right-edge summary label.
 */
export function AreaChart({ rows, keys, colors, direction, labelWidth = "14rem" }: Props) {
  const colorFor = (k: string, i: number): string =>
    colors?.[k] ?? categoricalOnGradient[i % categoricalOnGradient.length];

  return (
    <div className="flex flex-col gap-5">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-carbon-700">
        {keys.map((k, i) => (
          <div key={k} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3"
              style={{ backgroundColor: colorFor(k, i) }}
            />
            <span className="font-medium">{k}</span>
          </div>
        ))}
      </div>

      {/* Rows */}
      <ul className="flex flex-col gap-3">
        {rows.map((r) => {
          const total =
            keys.reduce((acc, k) => acc + (r.segments[k] ?? 0), 0) || 1;
          return (
            <li
              key={r.label}
              className="grid items-center gap-x-4 text-[13px]"
              style={{ gridTemplateColumns: `${labelWidth} minmax(0,1fr) 5.5rem` }}
            >
              <div className="flex flex-col gap-0.5 text-left">
                <span className="font-normal text-carbon-1000">
                  {r.label}
                  {r.directional ? (
                    <span className="text-carbon-500"> *</span>
                  ) : null}
                </span>
                {r.n !== undefined ? (
                  <span className="font-mono text-[11px] tabular-nums text-carbon-500">
                    n={r.n}
                  </span>
                ) : null}
              </div>
              <div className="flex h-7 min-w-0 overflow-hidden">
                {keys.map((k, i) => {
                  const v = r.segments[k] ?? 0;
                  const pct = (v / total) * 100;
                  if (pct <= 0) return null;
                  const color = colorFor(k, i);
                  return (
                    <div
                      key={k}
                      className="flex items-center justify-center overflow-hidden font-mono text-[11px] font-normal tabular-nums text-white"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    >
                      {pct >= 8 ? `${Math.round(pct)}%` : ""}
                    </div>
                  );
                })}
              </div>
              {r.rightLabel ? (
                <div className="whitespace-nowrap font-mono text-[13px] font-normal tabular-nums text-carbon-1000">
                  {r.rightLabel}
                </div>
              ) : (
                <div />
              )}
            </li>
          );
        })}
      </ul>

      {/* Direction arrows */}
      {direction ? (
        <div
          className={clsx(
            "flex justify-between font-mono text-xs italic text-carbon-500",
            "-mt-1",
          )}
        >
          <span>{direction.left}</span>
          <span>{direction.right}</span>
        </div>
      ) : null}
    </div>
  );
}
