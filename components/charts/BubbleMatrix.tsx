type Cohort = {
  label: string;
  n: number;
  color: string;
  /** One count per theme, in theme order. 0 renders as an empty cell. */
  values: number[];
};

type Props = {
  themes: string[];
  cohorts: Cohort[];
  /** Minimum bubble diameter in px (for values of 1). Default 22. */
  minPx?: number;
  /** Multiplier applied to sqrt(value). Default 11. */
  scale?: number;
};

/**
 * Bubble-grid matrix: rows = cohorts, columns = themes, bubble area ∝ count.
 * Pure HTML/CSS so long theme labels and row headers flow naturally.
 */
export function BubbleMatrix({
  themes,
  cohorts,
  minPx = 22,
  scale = 11,
}: Props) {
  const maxValue = Math.max(
    ...cohorts.flatMap((c) => c.values),
  );

  const diameter = (v: number) => {
    if (v <= 0) return 0;
    // Area ∝ v, so diameter ∝ sqrt(v)
    const px = minPx + Math.sqrt(v) * scale;
    return px;
  };

  // Row height is driven by the largest bubble in that row so circles don't
  // get cropped. Compute per-row max so small-value rows don't waste space.
  const rowHeights = cohorts.map(
    (c) => Math.max(40, diameter(Math.max(...c.values)) + 16),
  );

  const colWidth = Math.max(80, diameter(maxValue) + 24);

  return (
    <div className="flex flex-col gap-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-carbon-700">
        {cohorts.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <span className="font-medium">
              {c.label}{" "}
              <span className="font-mono text-carbon-500">(n={c.n})</span>
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div
          role="table"
          className="grid gap-2"
          style={{
            gridTemplateColumns: `60px repeat(${themes.length}, minmax(${colWidth}px, 1fr))`,
          }}
        >
          {/* Header row: blank corner, then theme labels */}
          <div />
          {themes.map((t) => (
            <div
              key={t}
              className="px-1 text-center text-[0.72rem] font-semibold leading-tight text-carbon-700"
            >
              {t}
            </div>
          ))}

          {/* Body rows */}
          {cohorts.map((c, ri) => (
            <div key={c.label} className="contents">
              <div
                className="flex items-center justify-end pr-2 text-right font-mono text-xs text-carbon-500"
                style={{ minHeight: rowHeights[ri] }}
              >
                n={c.n}
              </div>
              {c.values.map((v, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="relative flex items-center justify-center"
                  style={{ minHeight: rowHeights[ri] }}
                >
                  {v > 0 ? (
                    <div
                      className="flex items-center justify-center rounded-full text-sm font-semibold tabular-nums text-white"
                      style={{
                        width: diameter(v),
                        height: diameter(v),
                        backgroundColor: c.color,
                      }}
                    >
                      {v}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
