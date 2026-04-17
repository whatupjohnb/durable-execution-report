"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { palette, categoricalColors } from "./palette";

export type BarDatum = { label: string; value: number };

type Props = {
  data: BarDatum[];
  valueSuffix?: string;
  horizontal?: boolean;
  accentIndex?: number;
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
}: Props & { width: number; height: number }) {
  const margin = { top: 12, right: 16, bottom: 36, left: 56 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  if (horizontal) {
    const yScale = scaleBand<string>({
      domain: data.map((d) => d.label),
      range: [0, innerH],
      padding: 0.3,
    });
    const xScale = scaleLinear<number>({
      domain: [0, Math.max(...data.map((d) => d.value))],
      range: [0, innerW],
      nice: true,
    });

    return (
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const y = yScale(d.label) ?? 0;
            const w = xScale(d.value);
            const isAccent = accentIndex === i;
            return (
              <g key={d.label}>
                <Bar
                  x={0}
                  y={y}
                  width={w}
                  height={yScale.bandwidth()}
                  fill={
                    isAccent
                      ? palette.limeSignature
                      : categoricalColors[i % categoricalColors.length]
                  }
                  rx={2}
                />
                <text
                  x={w + 8}
                  y={y + yScale.bandwidth() / 2}
                  dy="0.32em"
                  fontSize={11}
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fill={palette.carbon200}
                >
                  {d.value}
                  {valueSuffix}
                </text>
              </g>
            );
          })}
          <AxisLeft
            scale={yScale}
            stroke={palette.carbon800}
            tickStroke={palette.carbon800}
            tickLabelProps={() => ({
              fill: palette.carbon400,
              fontSize: 11,
              fontFamily: "var(--font-inter), sans-serif",
              textAnchor: "end",
              dx: -6,
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
        {data.map((d, i) => {
          const x = xScale(d.label) ?? 0;
          const y = yScale(d.value);
          const h = innerH - y;
          const isAccent = accentIndex === i;
          return (
            <Bar
              key={d.label}
              x={x}
              y={y}
              width={xScale.bandwidth()}
              height={h}
              fill={
                isAccent
                  ? palette.limeSignature
                  : categoricalColors[i % categoricalColors.length]
              }
              rx={2}
            />
          );
        })}
        <AxisLeft
          scale={yScale}
          numTicks={4}
          stroke={palette.carbon800}
          tickStroke={palette.carbon800}
          tickLabelProps={() => ({
            fill: palette.carbon400,
            fontSize: 11,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAnchor: "end",
            dx: -6,
            dy: "0.32em",
          })}
          tickFormat={(v) => `${v}${valueSuffix}`}
        />
        <AxisBottom
          top={innerH}
          scale={xScale}
          stroke={palette.carbon800}
          tickStroke={palette.carbon800}
          tickLabelProps={() => ({
            fill: palette.carbon400,
            fontSize: 11,
            fontFamily: "var(--font-inter), sans-serif",
            textAnchor: "middle",
          })}
        />
      </Group>
    </svg>
  );
}
