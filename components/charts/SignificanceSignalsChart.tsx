import { clsx } from "@/lib/clsx";
import type { SignalRow } from "@/content/report";

type Group = { name: string; rows: SignalRow[] };

type Props = {
  groups: Group[];
  subtitle?: string;
};

export function SignificanceSignalsChart({ groups, subtitle }: Props) {
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

      {/* Single grid so all columns align across groups */}
      <div className="grid grid-cols-[14rem_minmax(0,1fr)_5rem_5rem_2rem] items-center gap-x-4 gap-y-1.5 text-[13px]">
        {groups.map((g) => (
          <>
            {/* Group header — spans all 5 columns */}
            <div
              key={g.name}
              className="col-span-5 mt-3 first:mt-0 font-mono text-[0.7rem] uppercase tracking-widest text-carbon-500"
            >
              {g.name}
            </div>
            {g.rows.map((r) => (
              <SignalRow key={r.label} row={r} max={max} />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

function SignalRow({ row, max }: { row: SignalRow; max: number }) {
  const abs = Math.abs(row.pp);
  const positive = row.pp >= 0;
  const significant = row.sig !== "ns";

  const barColor = significant
    ? positive
      ? "#016239"
      : "#A52015"
    : "#7C7C7C";

  return (
    <>
      <span
        className={clsx(
          "leading-tight",
          significant ? "font-normal text-carbon-1000" : "font-normal text-carbon-500",
        )}
      >
        {row.label}
      </span>
      <div className="relative h-6 min-w-0 overflow-hidden bg-carbon-100">
        <div
          className="flex h-full items-center justify-center whitespace-nowrap font-mono text-xs tabular-nums text-white"
          style={{
            width: `${(abs / max) * 100}%`,
            backgroundColor: barColor,
            opacity: significant ? 1 : 0.55,
            color: significant ? "#FFFFFF" : "#1A161C",
          }}
        >
          {row.pp > 0 ? "+" : ""}
          {row.pp}pp
        </div>
      </div>
      <span
        className={clsx(
          "text-right font-mono text-xs tabular-nums",
          positive ? "text-[#016239]" : "text-carbon-700",
        )}
      >
        {row.conf}% conf
      </span>
      <span
        className={clsx(
          "text-right font-mono text-xs tabular-nums",
          positive ? "text-carbon-700" : "text-[#A52015]",
        )}
      >
        {row.unconf}% unconf
      </span>
      <span
        className={clsx(
          "text-center font-mono text-[0.7rem]",
          significant ? "font-normal text-carbon-1000" : "font-normal text-carbon-500",
        )}
      >
        {row.sig}
      </span>
    </>
  );
}
