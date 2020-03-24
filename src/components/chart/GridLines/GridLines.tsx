import React from 'react';
import { ScaleLinear, ScaleBand } from 'd3-scale';
import { unit } from '../../../constants';
import { isFunction } from 'util';
import {
  defaultChartGridLineColor,
  defaultChartNumberOfYTicks,
} from '../common';

export enum GridLineStyle {
  solid = 'solid',
  dotted = 'dotted',
  dashed = 'dashed',
}

export interface GridLinesProps {
  numberOfYTicks?: number;
  numberOfXTicks?: number;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number> | ScaleBand<number>;
  gridLineColor?: string;
  showVerticalGridLines?: boolean;
  showHorizontalGridLines?: boolean;
  gridlineStyle?: GridLineStyle | keyof typeof GridLineStyle;
}

const dasharrayForGridLineStyle = (
  gridLineStyle: GridLineStyle | keyof typeof GridLineStyle
) => {
  switch (gridLineStyle) {
    case GridLineStyle.solid:
      return '';
    case GridLineStyle.dotted:
      return '2';
    case GridLineStyle.dashed:
      return `${unit * 2} ${unit}`;
  }
};

export const GridLines = ({
  numberOfYTicks = defaultChartNumberOfYTicks,
  numberOfXTicks = 0,
  yScale,
  xScale,
  gridLineColor = defaultChartGridLineColor,
  showVerticalGridLines = true,
  showHorizontalGridLines = true,
  gridlineStyle = GridLineStyle.solid,
}: GridLinesProps) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  return (
    <g data-test="gridlines">
      {showHorizontalGridLines && (
        <HorizontalGridLines
          x0={x0}
          x1={x1}
          numberOfYTicks={numberOfYTicks}
          yScale={yScale}
          stroke={gridLineColor}
          strokeDasharray={dasharrayForGridLineStyle(gridlineStyle)}
        />
      )}
      {showVerticalGridLines && (
        <VerticalGridLines
          y0={y0}
          y1={y1}
          numberOfXTicks={numberOfXTicks}
          xScale={xScale}
          stroke={gridLineColor}
          strokeDasharray={dasharrayForGridLineStyle(gridlineStyle)}
        />
      )}
    </g>
  );
};

interface HorizontalGridLinesProps {
  x0: number;
  x1: number;
  numberOfYTicks: number;
  yScale: ScaleLinear<number, number>;
  stroke: string;
  strokeDasharray: string | number | undefined;
}

const HorizontalGridLines = ({
  x0,
  x1,
  numberOfYTicks,
  yScale,
  stroke,
  strokeDasharray,
}: HorizontalGridLinesProps) => (
  <>
    {yScale.ticks(numberOfYTicks).map(i => (
      <g key={`horizontal-gridline-${i}`}>
        <line
          x1={x0}
          x2={x1}
          y1={yScale(i)}
          y2={yScale(i)}
          stroke={stroke}
          fill="transparent"
          strokeDasharray={strokeDasharray}
        />
      </g>
    ))}
  </>
);

interface VerticalGridLinesProps {
  y0: number;
  y1: number;
  numberOfXTicks: number;
  xScale: ScaleLinear<number, number> | ScaleBand<number>;
  stroke: string;
  strokeDasharray: string | number | undefined;
}

const VerticalGridLines = ({
  y0,
  y1,
  numberOfXTicks,
  xScale,
  stroke,
  strokeDasharray,
}: VerticalGridLinesProps) => {
  const xDomain = xScale.domain();
  let lines: JSX.Element[];
  if (isFunction((xScale as ScaleBand<number>).bandwidth)) {
    const bandWidth = (xScale as ScaleBand<number>).bandwidth();
    lines = xDomain.map(i => {
      const bandCenter = (xScale(i) || 0) + bandWidth / 2;
      return (
        <g key={`vertical-gridline-${i}`}>
          <line
            x1={bandCenter}
            x2={bandCenter}
            y1={y0}
            y2={y1}
            stroke={stroke}
            fill="transparent"
            strokeDasharray={strokeDasharray}
          />
        </g>
      );
    });
  } else {
    lines = (xScale as ScaleLinear<number, number>)
      .ticks(numberOfXTicks)
      .map(i => {
        const cX = xScale(i);
        return (
          <g key={`vertical-gridline-${i}`}>
            <line
              x1={cX}
              x2={cX}
              y1={y0}
              y2={y1}
              stroke={stroke}
              fill="transparent"
              strokeDasharray={strokeDasharray}
            />
          </g>
        );
      });
  }
  return <>{lines}</>;
};
