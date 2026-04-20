import { clsx } from "@/lib/clsx";

type Row = {
  label: string;
  n: number;
  values: number[];
};

type Props = {
  columns: string[];
  rows: Row[];
  /** Threshold for "red" cell color (high intensity). Default 50. */
  redAt?: number;
  /** Threshold for "amber" cell color. Default 30. */
  amberAt?: number;
  footnote?: string;
};

/**
 * Table/heatmap hybrid used for Figure 16. Each cell is colored by
 * intensity: red for ≥ redAt, amber for ≥ amberAt, plain otherwise.
 * Pure HTML/CSS — no SVG — so long column headers wrap cleanly.
 */
export function HeatmapTable({
  columns,
  rows,
  redAt = 50,
  amberAt = 30,
  footnote,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="align-bottom">
              <th className="w-40 border-b border-carbon-300 py-3 pr-4 text-left font-mono text-xs font-medium uppercase tracking-widest text-carbon-500">
                Tool
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  className="border-b border-carbon-300 px-2 py-3 text-left align-bottom text-[0.72rem] font-normal leading-tight text-carbon-700"
                  style={{ minWidth: "6.5rem" }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr
                key={r.label}
                className={ri > 0 ? "border-t border-carbon-200/70" : ""}
              >
                <td className="py-3 pr-4 align-middle">
                  <div className="font-semibold text-carbon-1000">
                    {r.label}
                  </div>
                  <div className="font-mono text-[0.7rem] text-carbon-500">
                    n={r.n}
                  </div>
                </td>
                {r.values.map((v, ci) => (
                  <td
                    key={ci}
                    className={clsx(
                      "px-2 py-3 text-center align-middle text-sm tabular-nums",
                      v >= redAt
                        ? "bg-[#F54A3F]/15 font-semibold text-[#A52015]"
                        : v >= amberAt
                          ? "bg-[#FCC43F]/25 font-medium text-[#95360F]"
                          : "text-carbon-800",
                    )}
                  >
                    {v}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote ? (
        <p className="text-xs italic leading-relaxed text-carbon-500">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
