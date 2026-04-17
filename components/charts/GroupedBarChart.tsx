"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
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
 * Horizontal grouped bar chart. One row per category, one bar per series.
 * Ideal for AI-vs-non-AI style comparisons across several causes or options.
 */
export function GroupedBarChart(props: Props) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <GroupedInner width={width} height={height} {...props} />
        ) : null
      }
    </ParentSize>
  );
}

function GroupedInner({
  width,
  height,
  rows,
  series,
  valueSuffix = "%",
}: Props & { width: number; height: number }) {
  const margin = { top: 32, right: 32, bottom: 12, left: 200 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const yScale = scaleBand<string>({
    domain: rows.map((r) => r.label),
    range: [0, innerH],
    padding: 0.25,
  });

  const max = Math.max(
    ...rows.flatMap((r) => series.map((s) => Number(r[s.key] ?? 0))),
  );
  const xScale = scaleLinear<number>({
    domain: [0, max],
    range: [0, innerW],
    nice: true,
  });

  const defaultColors = [palette.limeSignature, palette.carbon400];

  return (
    <svg width={width} height={height}>
      {/* Legend */}
      <g transform={`translate(${margin.left}, 8)`}>
        {series.map((s, i) => (
          <g key={s.key} transform={`translate(${i * 140}, 0)`}>
            <rect
              width={10}
              height={10}
              fill={s.color ?? defaultColors[i] ?? palette.matcha500}
            />
            <text
              x={16}
              y={9}
              fontSize={10}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill={palette.carbon400}
            >
              {s.label}
            </text>
          </g>
        ))}
      </g>
      <Group left={margin.left} top={margin.top}>
        {rows.map((row) => {
          const rowY = yScale(row.label) ?? 0;
          const bandH = yScale.bandwidth();
          const barH = bandH / series.length;
          return (
            <g key={row.label}>
              {series.map((s, i) => {
                const v = Number(row[s.key] ?? 0);
                const w = xScale(v);
                const y = rowY + i * barH;
                const color =
                  s.color ?? defaultColors[i] ?? palette.matcha500;
                return (
                  <g key={s.key}>
                    <Bar x={0} y={y + 1} width={w} height={barH - 2} fill={color} rx={1} />
                    <text
                      x={w + 6}
                      y={y + barH / 2}
                      dy="0.32em"
                      fontSize={10}
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fill={palette.carbon200}
                    >
                      {v}
                      {valueSuffix}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <AxisLeft
          scale={yScale}
          hideAxisLine
          hideTicks
          tickLabelProps={() => ({
            fill: palette.carbon200,
            fontSize: 11,
            fontFamily: "var(--font-inter), sans-serif",
            textAnchor: "end",
            dx: -10,
            dy: "0.32em",
          })}
        />
      </Group>
    </svg>
  );
}
