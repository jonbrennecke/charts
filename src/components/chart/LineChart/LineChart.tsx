import React from 'react';
import { line } from 'd3-shape';
import property from 'lodash/property';

import { ColorTheme, colorThemes } from '../../../theme';
import {
  IChartPadding,
  zeroPadding,
  defaultChartTickLength,
  defaultChartXAxisHeight,
  defaultChartYAxisWidth,
  makeLineChartScales,
  ILineChartData,
  calculateDefaultYDomainForLineChart,
  calculateDefaultXDomainForLineChart,
  MouseOverEventProps,
} from '../common';
import { GridLineStyle } from '../GridLines/GridLines';
import { Dimensional } from '../ChartDimensions';
import { Chart } from '../Chart/Chart';
import noop from 'lodash/noop';

export interface LineChartEventPayload<Value> {
  category: string;
  color: string;
  value: Value;
  point: { x: number; y: number };
}

export interface BaseLineChartElement {
  x: number;
  y: number;
}

export interface LineChartProps<LineChartElement extends BaseLineChartElement>
  extends Dimensional,
    MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  data: ILineChartData<LineChartElement>;
  padding?: IChartPadding;
  yDomain?: [number, number];
  xDomain?: [number, number];
  xValueAccessor?(data: LineChartElement): number;
  yValueAccessor?(data: LineChartElement): number;
  colorAccessor?(key: string): string;
  numberOfXTicks?: number;
  numberOfYTicks?: number;
  tickLength?: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  colorTheme?: ColorTheme;
  gridlineStyle?: GridLineStyle | keyof typeof GridLineStyle;
  showVerticalGridLines?: boolean;
  showHorizontalGridLines?: boolean;
}

export const LineChart = <LineChartElement extends BaseLineChartElement>({
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
  gridlineStyle,
  showVerticalGridLines = true,
  showHorizontalGridLines = true,
  onValueMouseOver = noop,
  onValueMouseOut = noop,
}: LineChartProps<LineChartElement>) => {
  const { xScale, yScale } = makeLineChartScales(
    xDomain,
    yDomain,
    yAxisWidth,
    xAxisHeight,
    dimensions,
    padding
  );
  const lineGenerator = line<LineChartElement>()
    .x(d => xScale(xValueAccessor(d)))
    .y(d => yScale(yValueAccessor(d)));
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  return (
    <div data-test="line-chart">
      <Chart
        dimensions={dimensions}
        xScale={xScale}
        yScale={yScale}
        numberOfYTicks={numberOfYTicks}
        numberOfXTicks={numberOfXTicks}
        stroke={colorTheme.components.chart.axis.gridline.stroke}
        showVerticalGridLines={showVerticalGridLines}
        showHorizontalGridLines={showHorizontalGridLines}
        gridlineStyle={gridlineStyle}
      >
        <g data-test="paths">
          <clipPath id="clipPath">
            <rect x={x0} width={x1 - x0} y={y0} height={y1 - y0} />
          </clipPath>

          {Object.keys(data.toJS()).map(category => {
            const categoryData = data.get(category);
            const color = colorAccessor(category);
            categoryData && categoryData;

            const makeOnMouseOverOrClickFunction = (
              callback: typeof onValueMouseOver
            ) => (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
              const x = xScale.invert(e.clientX);
              const y = yScale.invert(e.clientY);
              categoryData &&
                callback({
                  color,
                  category,
                  value: {
                    x: x,
                    y: y,
                  } as LineChartElement,
                  point: {
                    x: e.clientX,
                    y: e.clientY,
                  },
                });
            };
            return (
              <path
                clipPath={`url(#clipPath)`}
                data-test={`path-${category}`}
                key={category}
                d={lineGenerator(data.get(category) || []) || ''}
                stroke={color}
                fill="transparent"
                onMouseOver={makeOnMouseOverOrClickFunction(onValueMouseOver)}
                onMouseOut={onValueMouseOut}
              />
            );
          })}
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
      </Chart>
    </div>
  );
};
