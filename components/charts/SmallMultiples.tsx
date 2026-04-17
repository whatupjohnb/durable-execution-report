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

export function SmallMultiples({ series, columns = 2 }: Props) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {series.map((s) => (
        <div
          key={s.label}
          className="rounded-lg border border-carbon-800 bg-carbon-950 p-3"
        >
          <div className="mb-2 font-mono text-[0.625rem] uppercase tracking-wider text-carbon-400">
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
