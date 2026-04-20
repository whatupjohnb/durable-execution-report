import { workflowColors } from "@/content/report";

type Row = {
  label: string;
  value: number;
  color?: string;
};

type Cohort = {
  tool: string;
  n: number;
  avg: number;
  accent: string;
  small?: boolean;
  rows: Row[];
};

type Props = {
  cohorts: Cohort[];
  footnote?: string;
};

/**
 * Multi-cohort horizontal-bar breakdown used for Figure 3. Each cohort is a
 * sub-block with its own heading, n, and average. Pure HTML/CSS — the
 * typography density is easier to tune without Visx for this layout.
 */
export function SoloCohortsChart({ cohorts, footnote }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Legend />
      {cohorts.map((c, i) => (
        <CohortBlock key={c.tool} cohort={c} divider={i > 0} />
      ))}
      {footnote ? (
        <p className="mt-2 text-xs italic leading-relaxed text-carbon-500">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}

function Legend() {
  const entries = Object.entries(workflowColors);
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {entries.map(([label, color]) => (
        <div
          key={label}
          className="flex items-center gap-2 text-xs text-carbon-700"
        >
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CohortBlock({
  cohort,
  divider,
}: {
  cohort: Cohort;
  divider: boolean;
}) {
  const max = 100;
  return (
    <div className={divider ? "border-t border-carbon-200/70 pt-6" : ""}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <h4
            className="font-heading text-base font-semibold tracking-tight"
            style={{ color: cohort.accent }}
          >
            {cohort.tool}
          </h4>
          <span className="font-mono text-xs text-carbon-500">
            n={cohort.n}
            {cohort.small ? "*" : ""}
          </span>
        </div>
        <span className="font-mono text-xs text-carbon-500">
          avg {cohort.avg}%
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {cohort.rows.map((r) => {
          const pct = Math.min(100, Math.max(0, r.value));
          const color = r.color ?? "#636363";
          return (
            <li
              key={r.label}
              className="grid grid-cols-[9rem_minmax(0,1fr)_2.75rem] items-center gap-3 text-[13px] sm:grid-cols-[11rem_minmax(0,1fr)_3rem]"
            >
              <span className="text-left text-carbon-800">{r.label}</span>
              <div className="relative h-5 min-w-0 overflow-hidden bg-carbon-100">
                <div
                  className="h-full"
                  style={{
                    width: `${(pct / max) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <span
                className="text-right font-mono font-semibold tabular-nums"
                style={{ color }}
              >
                {r.value}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
