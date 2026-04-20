"use client";

import { ParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { inkOnGradient } from "./palette";

type Tool = {
  key: string;
  label: string;
  color: string;
  /** One value per cohort, in cohort order. */
  values: number[];
};

type Cohort = {
  label: string;
  n: number;
};

type Props = {
  cohorts: Cohort[];
  tools: Tool[];
  /** Y-axis max (percent). Defaults to nice-fit. */
  yMax?: number;
};

/**
 * Vertical grouped column chart. Each cohort on the X axis, each tool drawn
 * as a column within the cohort's band. Used for Figure 2b (orchestration
 * platform by team size).
 */
export function GroupedColumnChart(props: Props) {
  return (
    <div className="flex h-full flex-col gap-4">
      <Legend tools={props.tools} />
      <div className="flex-1">
        <ParentSize>
          {({ width, height }) =>
            width > 0 && height > 0 ? (
              <Inner width={width} height={height} {...props} />
            ) : null
          }
        </ParentSize>
      </div>
    </div>
  );
}

function Legend({ tools }: { tools: Tool[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {tools.map((t) => (
        <div key={t.key} className="flex items-center gap-2 text-xs text-carbon-700">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: t.color }}
          />
          <span className="font-medium">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function Inner({
  width,
  height,
  cohorts,
  tools,
  yMax,
}: Props & { width: number; height: number }) {
  const margin = { top: 16, right: 16, bottom: 40, left: 44 };
  const innerW = Math.max(0, width - margin.left - margin.right);
  const innerH = Math.max(0, height - margin.top - margin.bottom);

  const cohortLabels = cohorts.map((c) => `${c.label} (n=${c.n})`);

  const outerScale = scaleBand<string>({
    domain: cohortLabels,
    range: [0, innerW],
    padding: 0.2,
  });
  const innerScale = scaleBand<string>({
    domain: tools.map((t) => t.key),
    range: [0, outerScale.bandwidth()],
    padding: 0.08,
  });
  const allMax = Math.max(...tools.flatMap((t) => t.values));
  const yScale = scaleLinear<number>({
    domain: [0, yMax ?? Math.max(80, Math.ceil(allMax / 10) * 10)],
    range: [innerH, 0],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {yScale.ticks(5).map((t) => (
          <line
            key={t}
            x1={0}
            x2={innerW}
            y1={yScale(t)}
            y2={yScale(t)}
            stroke={inkOnGradient.grid}
            strokeOpacity={0.12}
            strokeDasharray="2 4"
          />
        ))}
        {cohorts.map((c, ci) => {
          const groupX = outerScale(cohortLabels[ci]) ?? 0;
          return (
            <g key={c.label} transform={`translate(${groupX}, 0)`}>
              {tools.map((t) => {
                const v = t.values[ci] ?? 0;
                const x = innerScale(t.key) ?? 0;
                const y = yScale(v);
                const h = innerH - y;
                return (
                  <Bar
                    key={t.key}
                    x={x}
                    y={y}
                    width={innerScale.bandwidth()}
                    height={h}
                    fill={t.color}
                  />
                );
              })}
            </g>
          );
        })}
        <AxisLeft
          scale={yScale}
          numTicks={5}
          hideAxisLine
          hideTicks
          tickFormat={(v) => `${v}%`}
          tickLabelProps={() => ({
            fill: inkOnGradient.muted,
            fontSize: 10,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAnchor: "end",
            dx: -6,
            dy: "0.32em",
          })}
        />
        <AxisBottom
          top={innerH}
          scale={outerScale}
          stroke="rgba(2, 2, 2, 0.25)"
          tickStroke="rgba(2, 2, 2, 0.25)"
          tickLabelProps={() => ({
            fill: inkOnGradient.base,
            fontSize: 11,
            fontFamily: "var(--font-inter), sans-serif",
            textAnchor: "middle",
          })}
        />
      </Group>
    </svg>
  );
}
