"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { BarStackHorizontal } from "@visx/shape";
import { palette, categoricalColors } from "./palette";

export type StackedRow = {
  label: string;
  segments: Record<string, number>;
};

type Props = {
  rows: StackedRow[];
  keys: string[];
};

/**
 * Horizontal 100%-stacked bar — effective for survey distributions
 * ("How confident are you…?"). Uses lime as the most-positive color.
 */
export function AreaChart({ rows, keys }: Props) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <AreaChartInner
            width={width}
            height={height}
            rows={rows}
            keys={keys}
          />
        ) : null
      }
    </ParentSize>
  );
}

function AreaChartInner({
  width,
  height,
  rows,
  keys,
}: Props & { width: number; height: number }) {
  const margin = { top: 36, right: 16, bottom: 24, left: 140 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const data = rows.map((r) => {
    const total = keys.reduce((acc, k) => acc + (r.segments[k] ?? 0), 0) || 1;
    const out: Record<string, number> & { label: string } = {
      label: r.label,
    } as never;
    for (const k of keys) {
      out[k] = ((r.segments[k] ?? 0) / total) * 100;
    }
    return out;
  });

  const yScale = scaleBand<string>({
    domain: data.map((d) => d.label),
    range: [0, innerH],
    padding: 0.35,
  });
  const xScale = scaleLinear<number>({
    domain: [0, 100],
    range: [0, innerW],
  });
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: keys.map((_, i) => categoricalColors[i % categoricalColors.length]),
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <BarStackHorizontal<(typeof data)[number], string>
          data={data}
          keys={keys}
          height={innerH}
          width={innerW}
          y={(d) => d.label}
          xScale={xScale}
          yScale={yScale}
          color={(k) => colorScale(k) ?? palette.matcha500}
        >
          {(barStacks) =>
            barStacks.flatMap((bs) =>
              bs.bars.map((bar) => (
                <rect
                  key={`${bs.index}-${bar.index}`}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={bar.color}
                />
              )),
            )
          }
        </BarStackHorizontal>

        <AxisLeft
          scale={yScale}
          stroke={palette.carbon800}
          tickStroke={palette.carbon800}
          hideAxisLine
          tickLabelProps={() => ({
            fill: palette.carbon200,
            fontSize: 11,
            fontFamily: "var(--font-inter), sans-serif",
            textAnchor: "end",
            dx: -8,
            dy: "0.32em",
          })}
        />
        <AxisBottom
          top={innerH}
          scale={xScale}
          numTicks={5}
          stroke={palette.carbon800}
          tickStroke={palette.carbon800}
          tickLabelProps={() => ({
            fill: palette.carbon400,
            fontSize: 10,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAnchor: "middle",
          })}
          tickFormat={(v) => `${v}%`}
        />
      </Group>

      {/* Legend */}
      <g transform={`translate(${margin.left}, 12)`}>
        {keys.map((k, i) => (
          <g key={k} transform={`translate(${i * 140}, 0)`}>
            <rect
              width={10}
              height={10}
              fill={colorScale(k) ?? palette.matcha500}
            />
            <text
              x={16}
              y={9}
              fontSize={10}
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill={palette.carbon400}
            >
              {k}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
