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
};

export function BarChart(props: Props) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <BarChartInner width={width} height={height} {...props} />
        ) : null
      }
    </ParentSize>
  );
}

function BarChartInner({
  width,
  height,
  data,
  valueSuffix = "",
  horizontal = false,
  accentIndex,
  showTrack = false,
}: Props & { width: number; height: number }) {
  const hasAnyCount = data.some((d) => d.count !== undefined);
  const rightPad = hasAnyCount ? 96 : 48;
  const margin = {
    top: 12,
    right: horizontal ? rightPad : 32,
    bottom: 36,
    left: horizontal ? 260 : 56,
  };
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

  const colorFor = (d: BarDatum, i: number, isAccent: boolean): string => {
    if (d.color) return d.color;
    if (isAccent) return palette.carbon1000;
    return categoricalOnGradient[i % categoricalOnGradient.length];
  };

  if (horizontal) {
    const max = Math.max(...data.map((d) => d.value));
    const domainMax = showTrack ? 100 : max;
    const yScale = scaleBand<string>({
      domain: data.map((d) => d.label),
      range: [0, innerH],
      padding: 0.3,
    });
    const xScale = scaleLinear<number>({
      domain: [0, domainMax],
      range: [0, innerW],
      nice: !showTrack,
    });

    return (
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const y = yScale(d.label) ?? 0;
            const w = xScale(d.value);
            const fill = colorFor(d, i, accentIndex === i);
            return (
              <g key={d.label}>
                {showTrack ? (
                  <Bar
                    x={0}
                    y={y}
                    width={innerW}
                    height={yScale.bandwidth()}
                    fill={fill}
                    fillOpacity={0.15}
                  />
                ) : null}
                <Bar
                  x={0}
                  y={y}
                  width={w}
                  height={yScale.bandwidth()}
                  fill={fill}
                />
                {d.count !== undefined ? (
                  <text
                    x={w + 10}
                    y={y + yScale.bandwidth() / 2}
                    dy="0.32em"
                    fontSize={11}
                    fontFamily="var(--font-jetbrains-mono), monospace"
                    fill={palette.carbon500}
                  >
                    n={d.count}
                  </text>
                ) : null}
                <text
                  x={innerW + (hasAnyCount ? 52 : 10)}
                  y={y + yScale.bandwidth() / 2}
                  dy="0.32em"
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
            hideAxisLine
            hideTicks
            tickLabelProps={() => ({
              ...axisLabelProps,
              textAnchor: "end",
              dx: -12,
              dy: "0.32em",
            })}
          />
        </Group>
      </svg>
    );
  }

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
          const fill = colorFor(d, i, accentIndex === i);
          return (
            <g key={d.label}>
              <Bar
                x={x}
                y={y}
                width={xScale.bandwidth()}
                height={h}
                fill={fill}
              />
              <text
                x={x + xScale.bandwidth() / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize={12}
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
            dx: -6,
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
