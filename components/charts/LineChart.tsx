"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { palette, categoricalColors } from "./palette";

export type LineSeries = {
  label: string;
  points: Array<{ x: string; y: number }>;
};

type Props = {
  series: LineSeries[];
  yLabel?: string;
  yMax?: number;
};

export function LineChart(props: Props) {
  return (
    <ParentSize>
      {({ width, height }) =>
        width > 0 && height > 0 ? (
          <LineChartInner width={width} height={height} {...props} />
        ) : null
      }
    </ParentSize>
  );
}

function LineChartInner({
  width,
  height,
  series,
  yLabel,
  yMax,
}: Props & { width: number; height: number }) {
  const margin = { top: 16, right: 24, bottom: 36, left: 52 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const xDomain = series[0]?.points.map((p) => p.x) ?? [];
  const computedMax =
    yMax ?? Math.max(...series.flatMap((s) => s.points.map((p) => p.y)));

  const xScale = scalePoint<string>({
    domain: xDomain,
    range: [0, innerW],
    padding: 0.5,
  });
  const yScale = scaleLinear<number>({
    domain: [0, computedMax],
    range: [innerH, 0],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient
        id="line-accent-fill"
        from={palette.limeSignature}
        to={palette.limeSignature}
        fromOpacity={0.35}
        toOpacity={0}
      />
      <Group left={margin.left} top={margin.top}>
        {/* Horizontal gridlines */}
        {yScale.ticks(4).map((t) => (
          <line
            key={t}
            x1={0}
            x2={innerW}
            y1={yScale(t)}
            y2={yScale(t)}
            stroke={palette.carbon800}
            strokeDasharray="2 4"
          />
        ))}

        {series.map((s, i) => {
          const color =
            i === 0
              ? palette.limeSignature
              : categoricalColors[i % categoricalColors.length];
          return (
            <g key={s.label}>
              {i === 0 ? (
                <AreaClosed
                  data={s.points}
                  x={(d) => xScale(d.x) ?? 0}
                  y={(d) => yScale(d.y)}
                  yScale={yScale}
                  curve={curveMonotoneX}
                  fill="url(#line-accent-fill)"
                />
              ) : null}
              <LinePath
                data={s.points}
                x={(d) => xScale(d.x) ?? 0}
                y={(d) => yScale(d.y)}
                stroke={color}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
              {s.points.map((p) => (
                <circle
                  key={`${s.label}-${p.x}`}
                  cx={xScale(p.x) ?? 0}
                  cy={yScale(p.y)}
                  r={3}
                  fill="#020202"
                  stroke={color}
                  strokeWidth={1.5}
                />
              ))}
            </g>
          );
        })}

        <AxisLeft
          scale={yScale}
          numTicks={4}
          label={yLabel}
          labelProps={{
            fill: palette.carbon600,
            fontSize: 10,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAnchor: "middle",
          }}
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

      {/* Legend */}
      {series.length > 1 ? (
        <g transform={`translate(${margin.left}, 2)`}>
          {series.map((s, i) => {
            const color =
              i === 0
                ? palette.limeSignature
                : categoricalColors[i % categoricalColors.length];
            return (
              <g key={s.label} transform={`translate(${i * 120}, 0)`}>
                <rect width={10} height={2} y={5} fill={color} />
                <text
                  x={14}
                  y={8}
                  fontSize={10}
                  fontFamily="var(--font-jetbrains-mono), monospace"
                  fill={palette.carbon400}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}
