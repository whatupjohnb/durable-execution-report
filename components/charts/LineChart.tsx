"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleLinear, scalePoint } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { palette, categoricalOnGradient, inkOnGradient } from "./palette";

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
  const margin = { top: 40, right: 24, bottom: 36, left: 52 };
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
      <LinearGradient
        id="line-accent-fill"
        from={palette.carbon1000}
        to={palette.carbon1000}
        fromOpacity={0.2}
        toOpacity={0}
      />
      <Group left={margin.left} top={margin.top}>
        {yScale.ticks(4).map((t) => (
          <line
            key={t}
            x1={0}
            x2={innerW}
            y1={yScale(t)}
            y2={yScale(t)}
            stroke={inkOnGradient.grid}
            strokeOpacity={0.18}
            strokeDasharray="2 4"
          />
        ))}

        {series.map((s, i) => {
          const color =
            categoricalOnGradient[i % categoricalOnGradient.length];
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
                strokeWidth={2.5}
                curve={curveMonotoneX}
              />
              {s.points.map((p) => (
                <circle
                  key={`${s.label}-${p.x}`}
                  cx={xScale(p.x) ?? 0}
                  cy={yScale(p.y)}
                  r={3.5}
                  fill={color}
                  stroke={palette.carbon50}
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
            fill: inkOnGradient.muted,
            fontSize: 10,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAnchor: "middle",
          }}
          hideAxisLine
          hideTicks
          tickLabelProps={() => ({
            ...tickLabelProps,
            textAnchor: "end",
            dx: -6,
            dy: "0.32em",
          })}
        />
        <AxisBottom
          top={innerH}
          scale={xScale}
          stroke="rgba(2, 2, 2, 0.3)"
          tickStroke="rgba(2, 2, 2, 0.3)"
          tickLabelProps={() => ({
            ...axisLabelProps,
            textAnchor: "middle",
          })}
        />
      </Group>

      {series.length > 1 ? (
        <g transform={`translate(${margin.left}, 10)`}>
          {series.map((s, i) => {
            const color =
              categoricalOnGradient[i % categoricalOnGradient.length];
            return (
              <g key={s.label} transform={`translate(${i * 140}, 0)`}>
                <rect width={12} height={3} y={6} fill={color} />
                <text
                  x={18}
                  y={9}
                  fontSize={11}
                  fontFamily="var(--font-inter), sans-serif"
                  fill={inkOnGradient.base}
                  fontWeight={500}
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
