import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import {
  stack,
  stackOffsetNone,
  stackOrderAscending,
  stackOrderNone,
  Series,
} from 'd3-shape';
import property from 'lodash/property';
import min from 'lodash/min';
import max from 'lodash/max';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';
import { Map, List } from 'immutable';

import { ColorTheme, colorThemes } from '../../../theme';
import { Svg } from '../Svg';
import { IChartDimensions, IChartPadding, zeroPadding } from '../common';

export type IBarChartData<T> = List<Map<string, T>>;

export interface IBarChartProps<T = any> {
  data: IBarChartData<T>;
  categories: string[];
  padding?: IChartPadding;
  dimensions: IChartDimensions;
  yDomain?: [number, number];
  xDomain?: [number, number];
  valueAccessor?(data: T): number;
  colorAccessor?(key: string): string;
  numberOfYTicks?: number;
  colorTheme?: ColorTheme;
  paddingInner?: number;
  paddingOuter?: number;
}

const calculateDefaultYDomainWithSeries = <T extends any>(
  series: Series<T, string>[]
): [number, number] => {
  const a = floor(min(series.map(s => min(s.map(s => s[1])))));
  const b = ceil(max(series.map(s => max(s.map(s => s[1])))));
  return [a, b];
};

export const BarChart = <T extends any = { value: number }>({
  data,
  categories,
  dimensions,
  padding = zeroPadding,
  valueAccessor = property('value'),
  colorAccessor = () => '#000000',
  numberOfYTicks = 10,
  paddingInner = 0.25,
  paddingOuter = 0.25,
  colorTheme = colorThemes.light,
}: IBarChartProps<T>) => {
  const xAxisHeight = 30;
  const yAxisWidth = 30;
  const tickLength = 5;

  const stackGenerator = stack<{ [key: string]: T }>()
    .keys(categories)
    .value((x, category) => valueAccessor(x[category]))
    .order(stackOrderNone)
    .offset(stackOffsetNone);

  const series = stackGenerator(data.toJS());

  const yDomain = calculateDefaultYDomainWithSeries(series);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([dimensions.height - xAxisHeight - padding.bottom, padding.top]);

  const xDomain = data.map((value, i) => i).toJS();
  const xScale = scaleBand<number>()
    .domain(xDomain)
    .range([yAxisWidth + padding.left, dimensions.width - padding.right])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter);
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  const bandWidth = xScale.bandwidth();
  return (
    <div data-test="line-chart">
      <Svg dimensions={dimensions} colorTheme={colorTheme}>
        <g data-test="stacks">
          <clipPath id="clipPath">
            <rect x={x0} width={x1 - x0} y={y0} height={y1 - y0} />
          </clipPath>

          {xDomain.map(i => (
            <g data-test={`stack-${i}`} key={`stack-${i}`}>
              {series.map((s, j) => {
                const [start, end] = s[i];
                const yStart = yScale(start);
                const yEnd = yScale(end);
                const height = yStart - yEnd;
                return (
                  <rect
                    data-test={`bar-${j}`}
                    key={`bar-${j}`}
                    clipPath={`url(#clipPath)`}
                    x={xScale(i)}
                    width={bandWidth}
                    y={yStart - height}
                    height={height}
                    fill={colorAccessor(s.key)}
                  />
                );
              })}
            </g>
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
