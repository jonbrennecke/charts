import React from 'react';
import { line } from 'd3-shape';
import property from 'lodash/property';

import { ColorTheme, colorThemes } from '../../../theme';
import { Svg } from '../Svg';
import {
  IChartDimensions,
  IChartPadding,
  zeroPadding,
  defaultChartTickLength,
  defaultChartXAxisHeight,
  defaultChartYAxisWidth,
  makeLineChartScales,
  ILineChartData,
  calculateDefaultYDomainForLineChart,
  calculateDefaultXDomainForLineChart,
} from '../common';
import { GridLines } from '../GridLines/GridLines';

export interface ILineChartProps<T = any> {
  data: ILineChartData<T>;
  padding?: IChartPadding;
  dimensions: IChartDimensions;
  yDomain?: [number, number];
  xDomain?: [number, number];
  xValueAccessor?(data: T): number;
  yValueAccessor?(data: T): number;
  colorAccessor?(key: string): string;
  numberOfXTicks?: number;
  numberOfYTicks?: number;
  tickLength?: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  colorTheme?: ColorTheme;
  showGridLines?: boolean;
}

export const LineChart = <T extends any = { x: number; y: number }>({
  data,
  dimensions,
  padding = zeroPadding,
  xValueAccessor = property('x'),
  yValueAccessor = property('y'),
  colorAccessor = () => '#000000',
  numberOfXTicks = 10,
  numberOfYTicks = 10,
  tickLength = defaultChartTickLength,
  yDomain = calculateDefaultYDomainForLineChart(data, yValueAccessor),
  xDomain = calculateDefaultXDomainForLineChart(data),
  xAxisHeight = defaultChartXAxisHeight,
  yAxisWidth = defaultChartYAxisWidth,
  colorTheme = colorThemes.light,
  showGridLines = true,
}: ILineChartProps<T>) => {
  const { xScale, yScale } = makeLineChartScales(
    xDomain,
    yDomain,
    yAxisWidth,
    xAxisHeight,
    dimensions,
    padding
  );
  const lineGenerator = line<T>()
    .x(d => xScale(xValueAccessor(d)))
    .y(d => yScale(yValueAccessor(d)));
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  return (
    <div data-test="line-chart">
      <Svg dimensions={dimensions}>
        {showGridLines && (
          <GridLines
            xScale={xScale}
            yScale={yScale}
            numberOfYTicks={numberOfYTicks}
            colorTheme={colorTheme}
          />
        )}

        <g data-test="paths">
          <clipPath id="clipPath">
            <rect x={x0} width={x1 - x0} y={y0} height={y1 - y0} />
          </clipPath>

          {Object.keys(data.toJS()).map(key => (
            <path
              clipPath={`url(#clipPath)`}
              data-test={`path-${key}`}
              key={key}
              d={lineGenerator(data.get(key) || []) || ''}
              stroke={colorAccessor(key)}
              fill="transparent"
            />
          ))}
        </g>

        <g data-test="x-axis">
          <line
            x1={x0}
            x2={x1}
            y1={y1}
            y2={y1}
            stroke={colorTheme.components.chart.axis.line.stroke}
            fill="transparent"
            data-test="x-axis-line"
          />
          {xScale.ticks(numberOfXTicks).map(n => (
            <g key={n}>
              <line
                x1={xScale(n)}
                x2={xScale(n)}
                y1={y1}
                y2={y1 + tickLength}
                stroke={colorTheme.components.chart.axis.line.stroke}
                fill="transparent"
              />
              <text
                x={xScale(n)}
                y={y1 + tickLength}
                dy="1em"
                textAnchor="middle"
                fill={colorTheme.components.chart.axis.tick.color}
              >
                {n}
              </text>
            </g>
          ))}
        </g>

        <g data-test="y-axis">
          <line
            x1={x0}
            x2={x0}
            y1={y0}
            y2={y1}
            stroke={colorTheme.components.chart.axis.line.stroke}
            fill="transparent"
          />
          {yScale.ticks(numberOfYTicks).map(n => (
            <g key={n}>
              <line
                x1={x0 - tickLength}
                x2={x0}
                y1={yScale(n)}
                y2={yScale(n)}
                stroke={colorTheme.components.chart.axis.line.stroke}
                fill="transparent"
              />
              <text
                x={x0 - tickLength}
                y={yScale(n)}
                dy="0.28em"
                width={yAxisWidth}
                textAnchor="end"
                fill={colorTheme.components.chart.axis.tick.color}
              >
                {n}&nbsp;
              </text>
            </g>
          ))}
        </g>
      </Svg>
    </div>
  );
};
