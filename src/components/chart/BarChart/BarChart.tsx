import { scaleBand, scaleLinear } from 'd3-scale';
import { Series, stack, stackOffsetNone, stackOrderNone } from 'd3-shape';
import { List, Map } from 'immutable';
import ceil from 'lodash/ceil';
import floor from 'lodash/floor';
import max from 'lodash/max';
import min from 'lodash/min';
import property from 'lodash/property';
import React from 'react';
import { ColorTheme, colorThemes } from '../../../theme';
import {
  defaultChartCharLimitBeforeEllipsis,
  defaultChartTickLength,
  defaultChartXAxisHeight,
  defaultChartYAxisWidth,
  ellipsis,
  IChartDimensions,
  IChartPadding,
  zeroPadding,
  defaultRangeValueFormatter,
  defaultDomainFormatter,
} from '../common';
import { GridLines, GridLineStyle } from '../GridLines/GridLines';
import { Svg } from '../Svg';
import styled from 'styled-components';
import { darker, brighter } from '../../../theme/colorUtils';
import noop from 'lodash/noop';

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

export interface IBarChartProps<
  RangeElementType = any,
  DomainElementType = any
> {
  data: IBarChartData<DomainElementType>;
  categories: string[];
  padding?: IChartPadding;
  dimensions: IChartDimensions;
  yDomain?: [number, number];
  xDomain?: [number, number];
  dataAccessor?(data: DomainElementType): Map<string, RangeElementType>;
  valueAccessor?(data: RangeElementType): number;
  colorAccessor?(key: string): string;
  domainLabelFormatter?(data: DomainElementType): string;
  rangeLabelFormatter?(n: number): string;
  numberOfYTicks?: number;
  colorTheme?: ColorTheme;
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
  onValueMouseOver?(payload: BarChartEventPayload<RangeElementType>): void;
  onValueMouseOut?(): void;
}

export const BarChart = <
  RangeElementType extends { value: number },
  DomainElementType extends {
    data: Map<string, RangeElementType>;
    label: string;
  }
>({
  data: originalData,
  categories,
  dimensions,
  padding = zeroPadding,
  valueAccessor = property('value'),
  dataAccessor = property('data'),
  domainLabelFormatter = defaultDomainFormatter,
  rangeLabelFormatter = defaultRangeValueFormatter,
  colorAccessor = () => '#000000',
  numberOfYTicks = 10,
  paddingInner = 0.25,
  paddingOuter = 0.25,
  xAxisHeight = defaultChartXAxisHeight,
  yAxisWidth = defaultChartYAxisWidth,
  tickLength = defaultChartTickLength,
  colorTheme = colorThemes.light,
  charLimitBeforeEllipsis = defaultChartCharLimitBeforeEllipsis,
  showVerticalGridLines = true,
  showHorizontalGridLines = true,
  gridlineStyle,
  onValueClick = noop,
  onValueMouseOut = noop,
  onValueMouseOver = noop,
}: IBarChartProps<RangeElementType, DomainElementType>) => {
  const data = List(originalData);
  const stackGenerator = stack<DomainElementType>()
    .keys(categories)
    .value((x, category) => valueAccessor(dataAccessor(x)[category]) || 0)
    .order(stackOrderNone)
    .offset(stackOffsetNone);
  const series = stackGenerator(data.toJS());
  const xDomain: number[] = data.map((value, i) => i).toJS();
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
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  const bandWidth = xScale.bandwidth();
  return (
    <Svg dimensions={dimensions}>
      <GridLines
        xScale={xScale}
        yScale={yScale}
        numberOfYTicks={numberOfYTicks}
        colorTheme={colorTheme}
        showVerticalGridLines={showVerticalGridLines}
        showHorizontalGridLines={showHorizontalGridLines}
        gridlineStyle={gridlineStyle}
      />
      <g data-test="stacks">
        <clipPath id="clipPath">
          <rect
            x={x0}
            width={Math.max(x1 - x0, 0)}
            y={y0}
            height={Math.max(y1 - y0, 0)}
          />
        </clipPath>
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
                  onMouseOut={() => onValueMouseOut()}
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
          stroke={colorTheme.components.chart.axis.line.stroke}
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
                stroke={colorTheme.components.chart.axis.line.stroke}
                fill="transparent"
              />
              <g transform={`translate(${bandCenter}, ${y1 + tickLength})`}>
                <text
                  dy="1em"
                  textAnchor="start"
                  fill={colorTheme.components.chart.axis.tick.color}
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
              {rangeLabelFormatter(n)}&nbsp;
            </text>
          </g>
        ))}
      </g>
    </Svg>
  );
};
