import { palette } from "./palette";

export type GroupedRow = {
  label: string;
  [series: string]: number | string;
};

type Props = {
  rows: GroupedRow[];
  series: Array<{ key: string; label: string; color?: string }>;
  valueSuffix?: string;
};

/**
 * Horizontal grouped-bar chart built in HTML/CSS. Each row is a cause /
 * predictor; each series is drawn as its own bar within the row, stacked
 * vertically on small screens and side-by-side on larger screens.
 */
export function GroupedBarChart({ rows, series, valueSuffix = "%" }: Props) {
  const defaultColors = [palette.carbon1000, palette.matcha700];

  const max = Math.max(
    ...rows.flatMap((r) => series.map((s) => Number(r[s.key] ?? 0))),
  );
  // Round up to the next 10 for a cleaner implicit scale.
  const domainMax = Math.max(10, Math.ceil(max / 10) * 10);

  return (
    <div className="flex flex-col gap-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-carbon-700">
        {series.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3"
              style={{
                backgroundColor: s.color ?? defaultColors[i] ?? palette.carbon1000,
              }}
            />
            <span className="font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Rows */}
      <ul className="flex flex-col gap-5">
        {rows.map((row) => (
          <li key={row.label as string} className="flex flex-col gap-1.5">
            <div className="text-sm font-semibold text-carbon-1000">
              {row.label as string}
            </div>
            <ul className="flex flex-col gap-1">
              {series.map((s, i) => {
                const v = Number(row[s.key] ?? 0);
                const color =
                  s.color ?? defaultColors[i] ?? palette.carbon1000;
                const pct = (v / domainMax) * 100;
                return (
                  <li
                    key={s.key}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm"
                  >
                    <span className="text-right font-mono text-[0.7rem] uppercase tracking-wider text-carbon-500">
                      {seriesShortLabel(s.label)}
                    </span>
                    <div className="relative h-5 min-w-0 bg-carbon-100">
                      <div
                        className="absolute inset-y-0 left-0 flex items-center justify-end pr-2"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      >
                        {pct > 18 ? (
                          <span className="font-mono text-[0.7rem] font-semibold tabular-nums text-white">
                            {v}
                            {valueSuffix}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span
                      className="text-right font-mono text-sm font-semibold tabular-nums"
                      style={{ color }}
                    >
                      {pct > 18 ? "" : `${v}${valueSuffix}`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Collapse a full series label like "AI teams (n=88)" into a compact row
 * token ("AI", "noAI") that fits the small tag column.
 */
function seriesShortLabel(full: string): string {
  const trimmed = full.replace(/\s*\(.*\)\s*$/, "").trim();
  if (/^no[-\s]?ai/i.test(trimmed)) return "noAI";
  if (/^ai\b/i.test(trimmed)) return "AI";
  if (/confident/i.test(trimmed) && /unconfident|not/i.test(trimmed)) {
    return "Unc";
  }
  if (/confident/i.test(trimmed) && !/not|unconfident/i.test(trimmed)) {
    return "Conf";
  }
  return trimmed.slice(0, 4);
}
