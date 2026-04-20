"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { palette, categoricalOnGradient, inkOnGradient } from "./palette";

export type BarDatum = {
  label: string;
  value: number;
  /** Optional per-bar color (hex). Falls back to categorical palette. */
  color?: string;
  /** Optional raw count shown next to the value (e.g. "n=57  44%"). */
  count?: number;
};

type Props = {
  data: BarDatum[];
  valueSuffix?: string;
  horizontal?: boolean;
  accentIndex?: number;
  /** Show an inline track behind each bar for "of 100%" reads. */
  showTrack?: boolean;
  /**
   * When true (horizontal only), the % value is rendered white inside the
   * right end of the bar instead of outside it. Best when bars fill ~half
   * the chart width or more.
   */
  insideLabels?: boolean;
};

export function BarChart(props: Props) {
  if (props.horizontal) return <HorizontalBars {...props} />;
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <ColumnInner width={width} height={height} {...props} />
        ) : null
      }
    </ParentSize>
  );
}

// ---------------------------------------------------------------------------
// Horizontal mode — HTML/CSS for deterministic bar heights and typography.
// ---------------------------------------------------------------------------
function HorizontalBars({
  data,
  valueSuffix = "",
  accentIndex,
  showTrack,
  insideLabels = false,
}: Props) {
  // Percent charts default to showing the 0–100 track so bars across charts
  // share a visual scale. Non-percent charts (e.g. "pp" delta) opt out.
  const isPercent = valueSuffix === "%";
  const effectiveShowTrack = showTrack ?? isPercent;

  const domainMax = effectiveShowTrack
    ? 100
    : Math.max(...data.map((d) => d.value));

  const colorFor = (d: BarDatum, i: number): string => {
    if (d.color) return d.color;
    if (accentIndex === i) return palette.carbon1000;
    return categoricalOnGradient[i % categoricalOnGradient.length];
  };

  return (
    <ul className="flex flex-col gap-3">
      {data.map((d, i) => {
        const pct = Math.max(0, (d.value / domainMax) * 100);
        const color = colorFor(d, i);
        return (
          <li
            key={d.label}
            className="grid items-center gap-x-4 gap-y-1 text-[13px] sm:grid-cols-[14rem_minmax(0,1fr)_auto] sm:gap-x-5"
          >
            <div className="flex flex-col gap-0.5 text-left">
              <span className="font-medium leading-snug text-carbon-900">
                {d.label}
              </span>
              {d.count !== undefined ? (
                <span className="font-mono text-[11px] tabular-nums text-carbon-500">
                  n={d.count}
                </span>
              ) : null}
            </div>
            <div className="relative h-7 min-w-0">
              {effectiveShowTrack ? (
                <div className="absolute inset-0 bg-carbon-100" />
              ) : null}
              <div
                className="absolute inset-y-0 left-0 flex items-center justify-end pr-2"
                style={{ width: `${pct}%`, backgroundColor: color }}
              >
                {insideLabels && pct > 12 ? (
                  <span className="font-mono text-[11px] font-semibold tabular-nums text-white">
                    {d.value}
                    {valueSuffix}
                  </span>
                ) : null}
              </div>
            </div>
            {!insideLabels ? (
              <span
                className="min-w-[2.5rem] text-right font-mono text-[13px] font-bold tabular-nums"
                style={{ color }}
              >
                {d.value}
                {valueSuffix}
              </span>
            ) : (
              <span />
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Column mode — Visx for axis + gridline rendering.
// ---------------------------------------------------------------------------
function ColumnInner({
  width,
  height,
  data,
  valueSuffix = "",
  accentIndex,
}: Props & { width: number; height: number }) {
  const margin = { top: 24, right: 24, bottom: 40, left: 48 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const axisLabelProps = {
    fill: inkOnGradient.base,
    fontSize: 12,
    fontFamily: "var(--font-inter), sans-serif",
  } as const;
  const tickLabelProps = {
    fill: inkOnGradient.muted,
    fontSize: 10,
    fontFamily: "var(--font-jetbrains-mono), monospace",
  } as const;

  const colorFor = (d: BarDatum, i: number): string => {
    if (d.color) return d.color;
    if (accentIndex === i) return palette.carbon1000;
    return categoricalOnGradient[i % categoricalOnGradient.length];
  };

  const xScale = scaleBand<string>({
    domain: data.map((d) => d.label),
    range: [0, innerW],
    padding: 0.3,
  });
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.value))],
    range: [innerH, 0],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {yScale.ticks(4).map((t) => (
          <line
            key={t}
            x1={0}
            x2={innerW}
            y1={yScale(t)}
            y2={yScale(t)}
            stroke={inkOnGradient.grid}
            strokeOpacity={0.15}
            strokeDasharray="2 4"
          />
        ))}
        {data.map((d, i) => {
          const x = xScale(d.label) ?? 0;
          const y = yScale(d.value);
          const h = innerH - y;
          const fill = colorFor(d, i);
          return (
            <g key={d.label}>
              <Bar x={x} y={y} width={xScale.bandwidth()} height={h} fill={fill} />
              <text
                x={x + xScale.bandwidth() / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize={13}
                fontFamily="var(--font-inter), sans-serif"
                fontWeight={700}
                fill={fill}
              >
                {d.value}
                {valueSuffix}
              </text>
            </g>
          );
        })}
        <AxisLeft
          scale={yScale}
          numTicks={4}
          hideAxisLine
          hideTicks
          tickLabelProps={() => ({
            ...tickLabelProps,
            textAnchor: "end",
            dx: -8,
            dy: "0.32em",
          })}
          tickFormat={(v) => `${v}${valueSuffix}`}
        />
        <AxisBottom
          top={innerH}
          scale={xScale}
          stroke="rgba(2, 2, 2, 0.25)"
          tickStroke="rgba(2, 2, 2, 0.25)"
          tickLabelProps={() => ({
            ...axisLabelProps,
            textAnchor: "middle",
          })}
        />
      </Group>
    </svg>
  );
}
