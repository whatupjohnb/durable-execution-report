"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { BarStackHorizontal } from "@visx/shape";
import { palette, categoricalOnGradient, inkOnGradient } from "./palette";

export type StackedRow = {
  label: string;
  segments: Record<string, number>;
};

type Props = {
  rows: StackedRow[];
  keys: string[];
};

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
  const margin = { top: 44, right: 16, bottom: 28, left: 160 };
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
    range: keys.map(
      (_, i) => categoricalOnGradient[i % categoricalOnGradient.length],
    ),
  });

  const axisLabelProps = {
    fill: inkOnGradient.base,
    fontSize: 11,
    fontFamily: "var(--font-inter), sans-serif",
  } as const;
  const tickLabelProps = {
    fill: inkOnGradient.muted,
    fontSize: 10,
    fontFamily: "var(--font-jetbrains-mono), monospace",
  } as const;

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
          color={(k) => colorScale(k) ?? palette.carbon1000}
        >
          {(barStacks) =>
            barStacks.flatMap((bs) =>
              bs.bars.map((bar) => (
                <g key={`${bs.index}-${bar.index}`}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                  />
                  {bar.width > 30 ? (
                    <text
                      x={bar.x + bar.width / 2}
                      y={bar.y + bar.height / 2}
                      textAnchor="middle"
                      dy="0.32em"
                      fontSize={10}
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fill={palette.carbon50}
                      fontWeight={600}
                    >
                      {Math.round(Number(bar.bar.data[bar.key]))}%
                    </text>
                  ) : null}
                </g>
              )),
            )
          }
        </BarStackHorizontal>

        <AxisLeft
          scale={yScale}
          hideAxisLine
          hideTicks
          tickLabelProps={() => ({
            ...axisLabelProps,
            textAnchor: "end",
            dx: -10,
            dy: "0.32em",
            fontWeight: 500,
          })}
        />
        <AxisBottom
          top={innerH}
          scale={xScale}
          numTicks={5}
          stroke="rgba(2, 2, 2, 0.3)"
          tickStroke="rgba(2, 2, 2, 0.3)"
          tickLabelProps={() => ({
            ...tickLabelProps,
            textAnchor: "middle",
          })}
          tickFormat={(v) => `${v}%`}
        />
      </Group>

      <g transform={`translate(${margin.left}, 14)`}>
        {keys.map((k, i) => (
          <g key={k} transform={`translate(${i * 160}, 0)`}>
            <rect
              width={12}
              height={12}
              fill={colorScale(k) ?? palette.carbon1000}
            />
            <text
              x={18}
              y={10}
              fontSize={11}
              fontFamily="var(--font-inter), sans-serif"
              fill={inkOnGradient.base}
              fontWeight={500}
            >
              {k}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
