import { scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale';
import { Series, stack, stackOffsetNone, stackOrderNone } from 'd3-shape';
import { List, Map } from 'immutable';
import ceil from 'lodash/ceil';
import floor from 'lodash/floor';
import max from 'lodash/max';
import min from 'lodash/min';
import noop from 'lodash/noop';
import property from 'lodash/property';
import React from 'react';
import styled from 'styled-components';
import { brighter, darker } from '../../../theme/colorUtils';
import { wrapWithChart } from '../Chart';
import { Dimensional } from '../ChartDimensions';
import {
  defaultChartAxisLineColor,
  defaultChartCharLimitBeforeEllipsis,
  defaultChartColorAccessor,
  defaultChartNumberOfYTicks,
  defaultChartTickLength,
  defaultChartXAxisHeight,
  defaultChartYAxisWidth,
  defaultDomainFormatter,
  defaultRangeValueFormatter,
  ellipsis,
  IChartDimensions,
  IChartPadding,
  MouseOverEventProps,
  zeroPadding,
} from '../common';
import { GridLineStyle } from '../GridLines';
import { RectClipPath } from '../RectClipPath';

const calculateDefaultYDomainWithSeries = <T extends any>(
  series: Series<T, string>[]
): [number, number] => {
  const a = floor(min(series.map(s => min(s.map(s => s[1])))) || 0);
  const b = ceil(max(series.map(s => max(s.map(s => s[1])))) || 0);
  return [a, b];
};

const makeBarChartScales = (
  xDomain: number[],
  yDomain: [number, number],
  xAxisHeight: number,
  yAxisWidth: number,
  dimensions: IChartDimensions,
  padding: IChartPadding,
  paddingInner: number,
  paddingOuter: number
) => {
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([dimensions.height - xAxisHeight - padding.bottom, padding.top]);
  const xScale = scaleBand<number>()
    .domain(xDomain)
    .range([yAxisWidth + padding.left, dimensions.width - padding.right])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter);
  return { xScale, yScale };
};

const Stack = styled.g``;

const StackRect = styled.rect`
  cursor: pointer;

  &:hover {
    fill: ${props => (props.fill ? brighter(props.fill, 0.25) : '')};
  }

  &:active {
    fill: ${props => (props.fill ? darker(props.fill, 0.25) : '')};
  }
`;

export type IBarChartData<T> = List<T>;

export interface BarChartEventPayload<RangeElementType> {
  category: string;
  color: string;
  value: RangeElementType;
  point: { x: number; y: number };
}

export interface IBarChartProps<RangeElementType, DomainElementType>
  extends Dimensional,
    MouseOverEventProps<BarChartEventPayload<RangeElementType>> {
  data: IBarChartData<DomainElementType>;
  categories: string[];
  padding?: IChartPadding;
  dataAccessor?(data: DomainElementType): Map<string, RangeElementType>;
  valueAccessor?(data: RangeElementType): number;
  colorAccessor?(key: string): string;
  domainLabelFormatter?(data: DomainElementType): string;
  rangeLabelFormatter?(n: number): string;
  numberOfYTicks?: number;
  axisLineColor?: string;
  gridLineColor?: string;
  paddingInner?: number;
  paddingOuter?: number;
  tickLength?: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  charLimitBeforeEllipsis?: number;
  showVerticalGridLines?: boolean;
  showHorizontalGridLines?: boolean;
  gridlineStyle?: GridLineStyle | keyof typeof GridLineStyle;
  onValueClick?(payload: BarChartEventPayload<RangeElementType>): void;
}

export interface BaseRangeElementType {
  value: number;
}

export interface BaseDomainElementType<R> {
  data: Map<string, R>;
  label: string;
}

export const BarChart = <
  RangeElementType extends BaseRangeElementType,
  DomainElementType extends BaseDomainElementType<RangeElementType>
>({
  data: originalData,
  categories,
  dimensions,
  padding = zeroPadding,
  valueAccessor = property('value'),
  dataAccessor = property('data'),
  paddingInner = 0.25,
  paddingOuter = 0.25,
  xAxisHeight = defaultChartXAxisHeight,
  yAxisWidth = defaultChartYAxisWidth,
  ...props
}: IBarChartProps<RangeElementType, DomainElementType>) => {
  const data = List(originalData);
  const stackGenerator = stack<DomainElementType>()
    .keys(categories)
    .value((x, category) => valueAccessor(dataAccessor(x)[category]) || 0)
    .order(stackOrderNone)
    .offset(stackOffsetNone);
  const series = stackGenerator(data.toJS());
  const xDomain: number[] = data.map((v, i) => i).toJS();
  const yDomain = calculateDefaultYDomainWithSeries(series);
  const { xScale, yScale } = makeBarChartScales(
    xDomain,
    yDomain,
    xAxisHeight,
    yAxisWidth,
    dimensions,
    padding,
    paddingInner,
    paddingOuter
  );
  return (
    <BarChartComponent
      dimensions={dimensions}
      xScale={xScale}
      yScale={yScale}
      data={data}
      series={series}
      xDomain={xDomain}
      {...props}
    />
  );
};

export interface BarChartSvgProps<RangeElementType, DomainElementType>
  extends MouseOverEventProps<BarChartEventPayload<RangeElementType>> {
  series: Series<DomainElementType, string>[];
  data: List<DomainElementType>;
  xDomain: number[];
  xScale: ScaleBand<number>;
  yScale: ScaleLinear<number, number>;
  yAxisWidth?: number;
  tickLength?: number;
  numberOfYTicks?: number;
  charLimitBeforeEllipsis?: number;
  axisLineColor?: string;
  dataAccessor?(data: DomainElementType): Map<string, RangeElementType>;
  colorAccessor?(key: string): string;
  domainLabelFormatter?(data: DomainElementType): string;
  rangeLabelFormatter?(n: number): string;
  onValueClick?(payload: BarChartEventPayload<RangeElementType>): void;
}

export const BarChartSvg = <
  RangeElementType extends BaseRangeElementType,
  DomainElementType extends BaseDomainElementType<RangeElementType>
>({
  data,
  series,
  xDomain,
  xScale,
  yScale,
  yAxisWidth = defaultChartYAxisWidth,
  axisLineColor = defaultChartAxisLineColor,
  numberOfYTicks = defaultChartNumberOfYTicks,
  tickLength = defaultChartTickLength,
  charLimitBeforeEllipsis = defaultChartCharLimitBeforeEllipsis,
  dataAccessor = property('data'),
  domainLabelFormatter = defaultDomainFormatter,
  rangeLabelFormatter = defaultRangeValueFormatter,
  onValueClick = noop,
  onValueMouseOut = noop,
  onValueMouseOver = noop,
  colorAccessor = defaultChartColorAccessor,
}: BarChartSvgProps<RangeElementType, DomainElementType>) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  const bandWidth = xScale.bandwidth();
  return (
    <g data-test="bar-chart">
      <g data-test="stacks">
        <RectClipPath
          id="clipPath"
          x={x0}
          width={x1 - x0}
          y={y0}
          height={y1 - y0}
        />
        {xDomain.map(i => (
          <Stack data-test={`stack-${i}`} key={`stack-${i}`}>
            {series.map((s, j) => {
              const [start, end] = s[i];
              const yStart = yScale(start);
              const yEnd = yScale(end);
              const height = yStart - yEnd;
              const domainValue = data.get(i);
              const category = s.key;
              const color = colorAccessor(category);
              const value =
                domainValue && dataAccessor(domainValue).get(category);
              const makeOnMouseOverOrClickFunction = (
                callback: typeof onValueClick | typeof onValueMouseOver
              ) => (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                if (e.target instanceof SVGGraphicsElement) {
                  const domRect = e.target.getBoundingClientRect();
                  const svgRect = e.target.getBBox();
                  value &&
                    callback({
                      color,
                      category,
                      value,
                      point: {
                        x: svgRect.x + domRect.width * 0.5,
                        y: svgRect.y + domRect.height * 0.5,
                      },
                    });
                }
              };
              return (
                <StackRect
                  data-test={`bar-${j}`}
                  key={`bar-${j}`}
                  clipPath={`url(#clipPath)`}
                  x={Math.max(xScale(i) || 0, 0)}
                  width={Math.max(bandWidth, 0)}
                  y={Math.max(yStart - height, 0)}
                  height={Math.max(height, 0)}
                  fill={color}
                  onClick={makeOnMouseOverOrClickFunction(onValueClick)}
                  onMouseOver={makeOnMouseOverOrClickFunction(onValueMouseOver)}
                  onMouseOut={onValueMouseOut}
                />
              );
            })}
          </Stack>
        ))}
      </g>
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
        {xDomain.map(i => {
          const d = data.get(i)!;
          const label = domainLabelFormatter(d);
          const bandCenter = (xScale(i) || 0) + bandWidth / 2;
          return (
            <g key={`x-tick-${i}`}>
              <line
                x1={bandCenter}
                x2={bandCenter}
                y1={y1}
                y2={y1 + tickLength}
                stroke={axisLineColor}
                fill="transparent"
              />
              <g transform={`translate(${bandCenter}, ${y1 + tickLength})`}>
                <text
                  dy="1em"
                  textAnchor="start"
                  fill={axisLineColor}
                  transform="rotate(45)"
                >
                  {ellipsis(label, charLimitBeforeEllipsis)}
                </text>
              </g>
            </g>
          );
        })}
      </g>
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
              {rangeLabelFormatter(n)}&nbsp;
            </text>
          </g>
        ))}
      </g>
    </g>
  );
};

const BarChartComponent = wrapWithChart(BarChartSvg);
