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
};

/**
 * Bubble-grid matrix: rows = cohorts, columns = themes, bubble area ∝ count.
 * Fluid CSS grid that fits the available width without horizontal scroll —
 * bubble sizes scale to the column width.
 */
export function BubbleMatrix({ themes, cohorts }: Props) {
  const maxValue = Math.max(...cohorts.flatMap((c) => c.values));

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
        className="grid gap-x-1 gap-y-1"
        style={{
          minWidth: `${themes.length * 5}rem`,
          gridTemplateColumns: `minmax(2.75rem,3rem) repeat(${themes.length}, minmax(0, 1fr))`,
        }}
      >
        {/* Header row */}
        <div />
        {themes.map((t) => (
          <div
            key={t}
            className="px-0.5 text-center text-[0.68rem] font-semibold leading-tight text-carbon-700"
          >
            {t}
          </div>
        ))}

        {/* Body rows */}
        {cohorts.map((c, ri) => (
          <div key={c.label} className="contents">
            <div className="flex items-center justify-end pr-1 text-right font-mono text-[11px] text-carbon-500">
              n={c.n}
            </div>
            {c.values.map((v, ci) => (
              <BubbleCell
                key={`${ri}-${ci}`}
                value={v}
                maxValue={maxValue}
                color={c.color}
              />
            ))}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

function BubbleCell({
  value,
  maxValue,
  color,
}: {
  value: number;
  maxValue: number;
  color: string;
}) {
  if (value <= 0) {
    // Reserve vertical rhythm with an invisible spacer so row heights align.
    return <div className="aspect-square w-full max-w-[4.5rem]" />;
  }
  const ratio = Math.sqrt(value / maxValue);
  // Diameter as a % of cell width; capped to leave a little padding.
  const pct = Math.max(30, Math.min(92, ratio * 92));
  return (
    <div className="flex aspect-square w-full max-w-[4.5rem] items-center justify-center mx-auto">
      <div
        className="flex items-center justify-center rounded-full text-sm font-semibold tabular-nums text-white"
        style={{
          width: `${pct}%`,
          height: `${pct}%`,
          backgroundColor: color,
        }}
      >
        {value}
      </div>
    </div>
  );
}
