"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { AxisLeft } from "@visx/axis";
import { BarStackHorizontal } from "@visx/shape";
import { palette, inkOnGradient } from "./palette";

export type StackedRow = {
  label: string;
  segments: Record<string, number>;
  /** Optional raw count for the row, rendered next to the label. */
  n?: number;
  /** When true, appends a superscript * to the label (directional cohort). */
  directional?: boolean;
  /** Optional right-edge label (e.g. "50% / 12%"). */
  rightLabel?: string;
};

type DirectionHint = { left: string; right: string };

type Props = {
  rows: StackedRow[];
  keys: string[];
  /** Explicit per-key fill color; falls back to categorical palette. */
  colors?: Record<string, string>;
  /**
   * Optional directional hint below the chart, e.g. { left: "← fast",
   * right: "slow →" }. Used on Figures 9 and 10.
   */
  direction?: DirectionHint;
  /** Minimum bar-height feel: tall distribution rows. */
  rowHeight?: number;
};

export function AreaChart(props: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 min-h-0">
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? (
              <Inner width={width} height={height} {...props} />
            ) : null
          }
        </ParentSize>
      </div>
      {props.direction ? (
        <div className="mt-3 flex justify-between font-mono text-xs text-carbon-500">
          <span className="italic">{props.direction.left}</span>
          <span className="italic">{props.direction.right}</span>
        </div>
      ) : null}
    </div>
  );
}

function Inner({
  width,
  height,
  rows,
  keys,
  colors,
}: Props & { width: number; height: number }) {
  const hasRightLabel = rows.some((r) => r.rightLabel);
  const margin = {
    top: 44,
    right: hasRightLabel ? 96 : 16,
    bottom: 16,
    left: 220,
  };
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
    padding: 0.25,
  });
  const xScale = scaleLinear<number>({
    domain: [0, 100],
    range: [0, innerW],
  });
  const fallback = [
    palette.carbon1000,
    palette.carbon700,
    palette.carbon500,
    palette.carbon400,
  ];
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: keys.map((k, i) => colors?.[k] ?? fallback[i % fallback.length]),
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
                  {bar.width > 36 ? (
                    <text
                      x={bar.x + bar.width / 2}
                      y={bar.y + bar.height / 2}
                      textAnchor="middle"
                      dy="0.32em"
                      fontSize={12}
                      fontFamily="var(--font-inter), sans-serif"
                      fontWeight={700}
                      fill={palette.carbon50}
                    >
                      {Math.round(Number(bar.bar.data[bar.key]))}%
                    </text>
                  ) : null}
                </g>
              )),
            )
          }
        </BarStackHorizontal>

        {/* Right-edge labels (e.g. "50% / 12%") */}
        {hasRightLabel
          ? rows.map((r) => {
              if (!r.rightLabel) return null;
              const y = (yScale(r.label) ?? 0) + yScale.bandwidth() / 2;
              return (
                <text
                  key={`rl-${r.label}`}
                  x={innerW + 12}
                  y={y}
                  dy="0.32em"
                  fontSize={13}
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight={600}
                  fill={inkOnGradient.base}
                >
                  {r.rightLabel}
                </text>
              );
            })
          : null}

        <AxisLeft
          scale={yScale}
          hideAxisLine
          hideTicks
          tickComponent={(props) => {
            const idx = data.findIndex((d) => d.label === props.formattedValue);
            const row = rows[idx];
            const n = row?.n;
            const star = row?.directional ? " *" : "";
            return (
              <g transform={`translate(${props.x}, ${props.y})`}>
                <text
                  textAnchor="end"
                  dx={-10}
                  dy="0.32em"
                  fontSize={13}
                  fontFamily="var(--font-inter), sans-serif"
                  fontWeight={600}
                  fill={inkOnGradient.base}
                >
                  {props.formattedValue}
                  {star}
                </text>
                {n !== undefined ? (
                  <text
                    textAnchor="end"
                    dx={-10}
                    dy="1.45em"
                    fontSize={10}
                    fontFamily="var(--font-jetbrains-mono), monospace"
                    fill={palette.carbon500}
                  >
                    n={n}
                  </text>
                ) : null}
              </g>
            );
          }}
        />

        {/* Legend */}
        <g transform={`translate(0, ${-margin.top + 14})`}>
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
      </Group>
    </svg>
  );
}
