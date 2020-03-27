import { ScaleLinear, ScaleBand, scaleBand } from 'd3-scale';
import { line, area } from 'd3-shape';
import noop from 'lodash/noop';
import property from 'lodash/property';
import uniq from 'lodash/uniq';
import React from 'react';
import { Dimensional } from '../ChartDimensions';
import {
  calculateDefaultDomainForLineChart,
  calculateDefaultRangeForLineChart,
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
import { RectClipPath } from '../RectClipPath';
import min from 'lodash/min';
import max from 'lodash/max';
import times from 'lodash/times';
import shortId from 'shortid';

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

export enum SeriesChartType {
  line = 'line',
  bar = 'bar',
}

export interface LineChartProps<LineChartElement extends BaseLineChartElement>
  extends Dimensional,
    MouseOverEventProps<LineChartEventPayload<LineChartElement>> {
  data: ILineChartData<LineChartElement>;
  padding?: IChartPadding;
  range?: [number, number];
  domain?: [number, number];
  curve?: Curve | keyof typeof Curve;
  fillStyle?: LineChartFillStyle | keyof typeof LineChartFillStyle;
  selectedCategory?: string;
  domainConfig?: {
    accessor?(data: LineChartElement): number;
  };
  rangeConfig?: {
    [key in keyof Partial<LineChartElement>]: {
      chartType?: SeriesChartType | keyof typeof SeriesChartType;
      accessor?(data: LineChartElement): number;
    };
  };
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

const defaultDomainKeys = {
  accessor: property('x'),
};

const defaulRangeKeys = {
  y: {
    chartType: SeriesChartType.line,
    accessor: property('y'),
  },
};

export const LineChart = <LineChartElement extends BaseLineChartElement>({
  data,
  dimensions,
  padding = zeroPadding,
  domainConfig = defaultDomainKeys as NonNullable<
    LineChartProps<LineChartElement>['domainConfig']
  >,
  rangeConfig = defaulRangeKeys as NonNullable<
    LineChartProps<LineChartElement>['rangeConfig']
  >,
  range,
  domain = calculateDefaultDomainForLineChart(data),
  xAxisHeight = defaultChartXAxisHeight,
  yAxisWidth = defaultChartYAxisWidth,
  ...props
}: LineChartProps<LineChartElement>) => {
  const applyRangeAccessor = (value: LineChartElement) =>
    Object.keys(rangeConfig).map(key =>
      rangeConfig[key].accessor
        ? rangeConfig[key].accessor(value)
        : (value[key] as number)
    );
  const { xScale, yScale } = makeLineChartScales(
    domain,
    range ||
      calculateDefaultRangeForLineChart(
        data,
        (value: LineChartElement) => min(applyRangeAccessor(value)),
        (value: LineChartElement) => max(applyRangeAccessor(value))
      ),
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
      rangeConfig={rangeConfig}
      domainConfig={domainConfig}
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
  barPaddingInner?: number;
  barPaddingOuter?: number;
  tickLength?: number;
  yAxisWidth?: number;
  rangeConfig: {
    [key in keyof Partial<LineChartElement>]: {
      chartType?: SeriesChartType | keyof typeof SeriesChartType;
      accessor?(data: LineChartElement): number;
    };
  };
  domainConfig: {
    accessor?(data: LineChartElement): number;
  };
  colorAccessor?(key: string): string;
}

export const LineChartSvg = <LineChartElement extends BaseLineChartElement>({
  xScale,
  yScale,
  data,
  rangeConfig,
  domainConfig,
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
  colorAccessor,
  onValueMouseOut,
  onValueMouseOver,
  barPaddingInner = 0.25,
  barPaddingOuter = 0.25,
}: LineChartSvgProps<LineChartElement>) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  return (
    <g data-test="chart">
      {Object.keys(rangeConfig).map(key => {
        const xValueAccessor = (value: LineChartElement) =>
          domainConfig.accessor ? domainConfig.accessor(value) : value.x;
        const yValueAccessor = (value: LineChartElement) =>
          rangeConfig[key].accessor
            ? rangeConfig[key].accessor(value)
            : (value[key] as number);
        const config = rangeConfig[key as keyof typeof rangeConfig];
        const chartType = config.chartType || SeriesChartType.line;
        switch (chartType) {
          case SeriesChartType.line:
            return (
              <LineChartPathsSvg
                key={`line-chart-${key}`}
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
            );
          case SeriesChartType.bar:
            const barDomain = times(
              max(
                data
                  .valueSeq()
                  .map(key => key.length)
                  .toArray()
              ) || 0
            );
            const barXScale = scaleBand<number>()
              .domain(barDomain)
              .range(xScale.range() as [number, number])
              .paddingInner(barPaddingInner)
              .paddingOuter(barPaddingOuter);
            return (
              <SeriesBarChartSvg
                key={`bar-chart-${key}`}
                x0={x0}
                x1={x1}
                y0={y0}
                y1={y1}
                xScale={barXScale}
                yScale={yScale}
                xValueAccessor={xValueAccessor}
                yValueAccessor={yValueAccessor}
                colorAccessor={colorAccessor}
                data={data}
              />
            );
        }
      })}
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

const SeriesBar = styled.rect``;

export interface SeriesBarChartSvgProps<
  LineChartElement extends BaseLineChartElement
> {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  data: ILineChartData<LineChartElement>;
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  xValueAccessor?(data: LineChartElement): number;
  yValueAccessor?(data: LineChartElement): number;
  colorAccessor?(key: string): string;
}

export const SeriesBarChartSvg = <
  LineChartElement extends BaseLineChartElement
>({
  x0,
  x1,
  y0,
  y1,
  data,
  xScale,
  yScale,
  xValueAccessor = property('x'),
  yValueAccessor = property('y'),
  colorAccessor = defaultChartColorAccessor,
}: SeriesBarChartSvgProps<LineChartElement>) => {
  const uniqueId = shortId.generate();
  const clipPathId = `clipPath-${uniqueId}`;
  const bandWidth = xScale.bandwidth();
  return (
    <g data-test="paths">
      <RectClipPath
        id={clipPathId}
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
      />
      {Object.keys(data.toJS()).map(category => {
        const color = colorAccessor(category);
        const categoryData = data.get(category);
        return categoryData?.map(d => {
          const yStart = yScale(0);
          const yEnd = yScale(yValueAccessor(d));
          const height = yStart - yEnd;
          return (
            <SeriesBar
              key={`bar-${category}-${d.x}`}
              clipPath={`url(#${clipPathId})`}
              fill={color}
              x={Math.max(xScale(xValueAccessor(d)) || 0, 0)}
              width={Math.max(bandWidth, 0)}
              y={Math.max(yStart - height, 0)}
              height={Math.max(height, 0)}
            />
          );
        });
      })}
    </g>
  );
};

const LinePath = styled.path`
  cursor: pointer;
  transition: all 100ms ease-in-out;
`;

const PointCircle = styled.circle<{ showPoints: boolean }>`
  cursor: pointer;
  transition: all 100ms ease-in-out;
  stroke-width: 1.5;
  opacity: ${props => (props.showPoints ? 1 : 0)};

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
  const uniqueId = shortId.generate();
  const clipPathId = `clipPath-${uniqueId}`;
  return (
    <g data-test="paths">
      <RectClipPath
        id={clipPathId}
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
      />
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
        return (
          <LinePathGroup
            key={`line-${category}`}
            category={category}
            selectedCategory={selectedCategory}
            onMouseOver={makeOnMouseOverOrClickFunction(onValueMouseOver)}
            onMouseOut={onValueMouseOut}
          >
            {fillStyle === LineChartFillStyle.area && (
              <path
                clipPath={`url(#${clipPathId})`}
                data-test={`path-${category}`}
                d={areaGenerator(categoryData || []) || ''}
                fill={color}
                fillOpacity={0.1}
                pointerEvents="none"
              />
            )}
            <LinePath
              clipPath={`url(#${clipPathId})`}
              data-test={`path-${category}`}
              d={lineGenerator(categoryData || []) || ''}
              stroke={color}
              fill="transparent"
              pointerEvents="stroke"
            />
            {categoryData?.map(d => (
              <PointCircle
                showPoints={showPoints}
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
