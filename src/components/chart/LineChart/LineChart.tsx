import { ScaleLinear } from 'd3-scale';
import { line, area } from 'd3-shape';
import noop from 'lodash/noop';
import property from 'lodash/property';
import uniq from 'lodash/uniq';
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
  IChartDimensions,
} from '../common';
import { GridLineStyle } from '../GridLines/GridLines';
import { wrapWithChart } from '../Chart';
import styled from 'styled-components';

export interface LineChartEventPayload<Value> {
  category: string;
  color: string;
  value: Value | null;
  point: { x: number; y: number };
}

export interface BaseLineChartElement {
  x: number;
  y: number;
}

export enum LineChartFillStyle {
  line = 'line',
  area = 'area',
}

export interface LineChartProps<LineChartElement extends BaseLineChartElement>
  extends Dimensional,
    MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  data: ILineChartData<LineChartElement>;
  padding?: IChartPadding;
  yDomain?: [number, number];
  xDomain?: [number, number];
  curve?: Curve | keyof typeof Curve;
  fillStyle?: LineChartFillStyle | keyof typeof LineChartFillStyle;
  selectedCategory?: string;
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
  showPoints?: boolean;
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
  showPoints?: boolean;
  curve?: Curve | keyof typeof Curve;
  fillStyle?: LineChartFillStyle | keyof typeof LineChartFillStyle;
  dimensions: IChartDimensions;
  selectedCategory?: string;
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
  selectedCategory,
  showPoints,
  curve,
  fillStyle,
  dimensions,
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
        selectedCategory={selectedCategory}
        showPoints={showPoints}
        curve={curve}
        dimensions={dimensions}
        fillStyle={fillStyle}
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

const LinePath = styled.path`
  cursor: pointer;
  transition: all 100ms ease-in-out;
`;

const PointCircle = styled.circle`
  cursor: pointer;
  transition: all 100ms ease-in-out;
  stroke-width: 1.5;

  &:hover {
    stroke-width: 5;
  }
`;

const LinePathGroup = styled.g<{
  category?: string;
  selectedCategory?: string;
}>`
  opacity: ${props =>
    props.selectedCategory
      ? props.category === props.selectedCategory
        ? 1
        : 0.25
      : 1};

  &:hover {
    ${LinePath} {
      stroke-width: 2;
    }

    ${PointCircle} {
      stroke-width: 2.5;

      &:hover {
        stroke-width: 3.5;
      }
    }
  }
`;

export interface LineChartPathsSvgProps<
  LineChartElement extends BaseLineChartElement
> extends MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  selectedCategory?: string;
  showPoints?: boolean;
  curve?: Curve | keyof typeof Curve;
  fillStyle?: LineChartFillStyle | keyof typeof LineChartFillStyle;
  data: ILineChartData<LineChartElement>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  dimensions: IChartDimensions;
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
  dimensions,
  selectedCategory,
  showPoints = false,
  curve = Curve.Linear,
  fillStyle = LineChartFillStyle.line,
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
  const areaGenerator = area<LineChartElement>()
    .curve(d3CurveFunction(curve))
    .x(d => xScale(xValueAccessor(d)))
    .y0(dimensions.height)
    .y1(d => yScale(yValueAccessor(d)));
  return (
    <g data-test="paths">
      <clipPath id="clipPath">
        <rect x={x0} width={x1 - x0} y={y0} height={y1 - y0} />
      </clipPath>
      {Object.keys(data.toJS()).map(category => {
        const categoryData = data.get(category);
        const color = colorAccessor(category);
        const makeOnMouseOverOrClickFunction = (
          callback: typeof onValueMouseOver,
          value?: LineChartElement
        ) => (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
          e.stopPropagation();
          categoryData &&
            callback({
              color,
              category,
              value: value
                ? ({
                    x: value.x,
                    y: value.y,
                  } as LineChartElement)
                : null,
              point: {
                x: value ? xScale(value.x) : e.clientX,
                y: value ? yScale(value.y) : e.clientY,
              },
            });
        };
        return fillStyle === LineChartFillStyle.line ? (
          <LinePathGroup
            key={`line-${category}`}
            category={category}
            selectedCategory={selectedCategory}
            onMouseOver={makeOnMouseOverOrClickFunction(onValueMouseOver)}
            onMouseOut={onValueMouseOut}
          >
            <LinePath
              clipPath={`url(#clipPath)`}
              data-test={`path-${category}`}
              d={lineGenerator(categoryData || []) || ''}
              stroke={color}
              fill="transparent"
            />
            {showPoints &&
              categoryData?.map(d => (
                <PointCircle
                  key={`point-${d.x}-${d.y}`}
                  cx={xScale(d.x)}
                  cy={yScale(d.y)}
                  fill={color}
                  stroke={color}
                  r={1}
                  onMouseOver={makeOnMouseOverOrClickFunction(
                    onValueMouseOver,
                    d
                  )}
                  onMouseOut={onValueMouseOut}
                />
              ))}
          </LinePathGroup>
        ) : (
          <g key={`line-${category}-area`}>
            <path
              clipPath={`url(#clipPath)`}
              data-test={`path-${category}`}
              d={areaGenerator(categoryData || []) || ''}
              fill={color}
              fillOpacity={0.1}
            />
            <path
              clipPath={`url(#clipPath)`}
              data-test={`path-${category}`}
              d={lineGenerator(categoryData || []) || ''}
              stroke={color}
              fill="transparent"
            />
            {showPoints &&
              categoryData?.map(d => (
                <PointCircle
                  key={`point-${d.x}-${d.y}`}
                  r={1}
                  cx={xScale(d.x)}
                  cy={yScale(d.y)}
                  stroke={color}
                  fill="transparent"
                  onMouseOver={makeOnMouseOverOrClickFunction(
                    onValueMouseOver,
                    d
                  )}
                  onMouseOut={onValueMouseOut}
                />
              ))}
          </g>
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
    {uniq(xScale.ticks(numberOfXTicks).concat(xScale.domain())).map(n => (
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
