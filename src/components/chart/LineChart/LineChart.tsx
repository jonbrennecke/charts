import { ScaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import noop from 'lodash/noop';
import property from 'lodash/property';
import React from 'react';
import { Dimensional } from '../ChartDimensions';
import {
  calculateDefaultXDomainForLineChart,
  calculateDefaultYDomainForLineChart,
  defaultChartAxisLineColor,
  defaultChartColorAccessor,
  defaultChartNumberOfXTicks,
  defaultChartNumberOfYTicks,
  defaultChartTickLength,
  defaultChartXAxisHeight,
  defaultChartYAxisWidth,
  IChartPadding,
  ILineChartData,
  makeLineChartScales,
  MouseOverEventProps,
  zeroPadding,
  Curve,
  d3CurveFunction,
} from '../common';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithChart } from '../Chart';

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
  curve?: Curve;
  xValueAccessor?(data: LineChartElement): number;
  yValueAccessor?(data: LineChartElement): number;
  colorAccessor?(key: string): string;
  gridLineColor?: string;
  axisLineColor?: string;
  numberOfXTicks?: number;
  numberOfYTicks?: number;
  tickLength?: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
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
  yDomain = calculateDefaultYDomainForLineChart(data, yValueAccessor),
  xDomain = calculateDefaultXDomainForLineChart(data),
  xAxisHeight = defaultChartXAxisHeight,
  yAxisWidth = defaultChartYAxisWidth,
  ...props
}: LineChartProps<LineChartElement>) => {
  const { xScale, yScale } = makeLineChartScales(
    xDomain,
    yDomain,
    yAxisWidth,
    xAxisHeight,
    dimensions,
    padding
  );
  return (
    <LineChartComponent
      dimensions={dimensions}
      xScale={xScale}
      yScale={yScale}
      data={data}
      {...props}
    />
  );
};

export interface LineChartSvgProps<LineChartElement>
  extends MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  data: ILineChartData<LineChartElement>;
  curve?: Curve;
  axisLineColor?: string;
  numberOfXTicks?: number;
  numberOfYTicks?: number;
  tickLength?: number;
  yAxisWidth?: number;
  xValueAccessor?(data: LineChartElement): number;
  yValueAccessor?(data: LineChartElement): number;
  colorAccessor?(key: string): string;
}

export const LineChartSvg = <LineChartElement extends BaseLineChartElement>({
  xScale,
  yScale,
  data,
  curve,
  numberOfXTicks,
  numberOfYTicks,
  tickLength,
  yAxisWidth,
  axisLineColor,
  xValueAccessor,
  yValueAccessor,
  colorAccessor,
  onValueMouseOut,
  onValueMouseOver,
}: LineChartSvgProps<LineChartElement>) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  return (
    <g data-test="line-chart">
      <LineChartPathsSvg
        x0={x0}
        x1={x1}
        y0={y0}
        y1={y1}
        curve={curve}
        xScale={xScale}
        yScale={yScale}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        colorAccessor={colorAccessor}
        data={data}
        onValueMouseOut={onValueMouseOut}
        onValueMouseOver={onValueMouseOver}
      />
      <LineChartXAxisSvg
        x0={x0}
        x1={x1}
        y1={y1}
        xScale={xScale}
        axisLineColor={axisLineColor}
        numberOfXTicks={numberOfXTicks}
        tickLength={tickLength}
      />
      <LineChartYAxisSvg
        x0={x0}
        y0={y0}
        y1={y1}
        yScale={yScale}
        axisLineColor={axisLineColor}
        numberOfYTicks={numberOfYTicks}
        tickLength={tickLength}
        yAxisWidth={yAxisWidth}
      />
    </g>
  );
};

const LineChartComponent = wrapWithChart(LineChartSvg);

export interface LineChartPathsSvgProps<
  LineChartElement extends BaseLineChartElement
> extends MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  curve?: Curve;
  data: ILineChartData<LineChartElement>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  xValueAccessor?(data: LineChartElement): number;
  yValueAccessor?(data: LineChartElement): number;
  colorAccessor?(key: string): string;
}

export const LineChartPathsSvg = <
  LineChartElement extends BaseLineChartElement
>({
  x0,
  x1,
  y0,
  y1,
  data,
  xScale,
  yScale,
  curve = Curve.Linear,
  xValueAccessor = property('x'),
  yValueAccessor = property('y'),
  colorAccessor = defaultChartColorAccessor,
  onValueMouseOver = noop,
  onValueMouseOut = noop,
}: LineChartPathsSvgProps<LineChartElement>) => {
  const lineGenerator = line<LineChartElement>()
    .curve(d3CurveFunction(curve))
    .x(d => xScale(xValueAccessor(d)))
    .y(d => yScale(yValueAccessor(d)));
  return (
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
  );
};

export interface LineChartXAxisSvgProps {
  x0: number;
  x1: number;
  y1: number;
  xScale: ScaleLinear<number, number>;
  axisLineColor?: string;
  numberOfXTicks?: number;
  tickLength?: number;
}

export const LineChartXAxisSvg = ({
  x0,
  x1,
  y1,
  xScale,
  axisLineColor = defaultChartAxisLineColor,
  numberOfXTicks = defaultChartNumberOfXTicks,
  tickLength = defaultChartTickLength,
}: LineChartXAxisSvgProps) => (
  <g data-test="x-axis">
    <line
      x1={x0}
      x2={x1}
      y1={y1}
      y2={y1}
      stroke={axisLineColor}
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
          stroke={axisLineColor}
          fill="transparent"
        />
        <text
          x={xScale(n)}
          y={y1 + tickLength}
          dy="1em"
          textAnchor="middle"
          fill={axisLineColor}
        >
          {n}
        </text>
      </g>
    ))}
  </g>
);

export interface LineChartYAxisSvgProps {
  x0: number;
  y0: number;
  y1: number;
  yScale: ScaleLinear<number, number>;
  axisLineColor?: string;
  numberOfYTicks?: number;
  tickLength?: number;
  yAxisWidth?: number;
}

export const LineChartYAxisSvg = ({
  x0,
  y0,
  y1,
  yScale,
  axisLineColor = defaultChartAxisLineColor,
  numberOfYTicks = defaultChartNumberOfYTicks,
  tickLength = defaultChartTickLength,
  yAxisWidth,
}: LineChartYAxisSvgProps) => (
  <g data-test="y-axis">
    <line
      x1={x0}
      x2={x0}
      y1={y0}
      y2={y1}
      stroke={axisLineColor}
      fill="transparent"
    />
    {yScale.ticks(numberOfYTicks).map(n => (
      <g key={n}>
        <line
          x1={x0 - tickLength}
          x2={x0}
          y1={yScale(n)}
          y2={yScale(n)}
          stroke={axisLineColor}
          fill="transparent"
        />
        <text
          x={x0 - tickLength}
          y={yScale(n)}
          dy="0.28em"
          width={yAxisWidth}
          textAnchor="end"
          fill={axisLineColor}
        >
          {n}&nbsp;
        </text>
      </g>
    ))}
  </g>
);
