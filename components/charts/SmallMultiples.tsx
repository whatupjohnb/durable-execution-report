"use client";

import { ParentSize } from "@visx/responsive";
import { scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { palette } from "./palette";

export type MultiSeries = {
  label: string;
  points: Array<{ x: string; y: number }>;
};

type Props = {
  series: MultiSeries[];
  columns?: number;
};

/**
 * Small multiples grid, styled for the hero-gradient ChartFrame.
 * Each tile is a dark card floating over the gradient.
 */
export function SmallMultiples({ series, columns = 2 }: Props) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {series.map((s) => (
        <div
          key={s.label}
          className="rounded-lg bg-carbon-1000/85 p-3 backdrop-blur-sm"
        >
          <div className="mb-2 font-mono text-[0.625rem] uppercase tracking-wider text-carbon-200">
            {s.label}
          </div>
          <div className="aspect-[3/2]">
            <ParentSize>
              {({ width, height }) =>
                width > 0 && height > 0 ? (
                  <MiniChart
                    width={width}
                    height={height}
                    points={s.points}
                  />
                ) : null
              }
            </ParentSize>
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniChart({
  width,
  height,
  points,
}: {
  width: number;
  height: number;
  points: Array<{ x: string; y: number }>;
}) {
  const margin = { top: 4, right: 4, bottom: 4, left: 4 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const xScale = scalePoint<string>({
    domain: points.map((p) => p.x),
    range: [0, innerW],
    padding: 0.1,
  });
  const yMax = Math.max(...points.map((p) => p.y));
  const yScale = scaleLinear<number>({
    domain: [0, yMax || 1],
    range: [innerH, 0],
  });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <LinePath
          data={points}
          x={(d) => xScale(d.x) ?? 0}
          y={(d) => yScale(d.y)}
          stroke={palette.limeSignature}
          strokeWidth={1.5}
          curve={curveMonotoneX}
        />
      </g>
    </svg>
  );
}
