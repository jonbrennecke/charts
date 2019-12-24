import React from 'react';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import property from 'lodash/property';
import min from 'lodash/min';
import max from 'lodash/max';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';
import { Map } from 'immutable';

import { ColorTheme, colorThemes } from '../../../theme';
import { Svg } from '../Svg';

export interface IDimensions {
  width: number;
  height: number;
}

export type ILineChartData<T> = Map<string, T[]>;

export interface ILineChartProps<T = any> {
  data: ILineChartData<T>;
  dimensions: IDimensions;
  yDomain?: [number, number];
  xDomain?: [number, number];
  xValueAccessor?(data: T): number;
  yValueAccessor?(data: T): number;
  colorAccessor?(key: string): string;
  numberOfXTicks?: number;
  numberOfYTicks?: number;
  colorTheme?: ColorTheme;
}

const calculateDefaultYDomain = <T extends any>(
  data: ILineChartData<T>,
  yValueAccessor: (data: T) => number
): [number, number] => {
  const minData = data.minBy(y => y.map(yValueAccessor)) || [];
  const a = floor(min(minData.map(yValueAccessor)) || 0);
  const maxData = data.maxBy(y => y.map(yValueAccessor)) || [];
  const b = ceil(max(maxData.map(yValueAccessor)) || 0);
  return [a, b];
};

export const LineChart = <T extends any = { x: number; y: number }>({
  data,
  dimensions,
  xValueAccessor = property('x'),
  yValueAccessor = property('y'),
  colorAccessor = () => '#000000',
  numberOfXTicks = 10,
  numberOfYTicks = 10,
  yDomain = calculateDefaultYDomain(data, yValueAccessor),
  xDomain = [0, data.size],
  colorTheme = colorThemes.light,
}: ILineChartProps<T>) => {
  const xAxisHeight = 30;
  const yAxisWidth = 30;
  const tickLength = 8;

  const xScale = scaleLinear()
    .domain(xDomain)
    .range([yAxisWidth, dimensions.width]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([dimensions.height - xAxisHeight, 0]);

  const lineGenerator = line<T>()
    .x(d => xScale(xValueAccessor(d)))
    .y(d => yScale(yValueAccessor(d)));

  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();

  return (
    <div data-test="line-chart">
      <Svg dimensions={dimensions} colorTheme={colorTheme}>
        <g data-test="paths">
          {Object.keys(data.toJS()).map(key => (
            <path
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
