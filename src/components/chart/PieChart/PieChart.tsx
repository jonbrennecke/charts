import { pie, arc, Arc, line } from 'd3-shape';
import property from 'lodash/property';
import React from 'react';
import { ColorTheme, colorThemes, HexColor } from '../../../theme';
import {
  IChartDimensions,
  IChartPadding,
  zeroPadding,
  defaultPieChartPadAngle,
  defaultPieChartInnerRadius,
  defaultPieChartOuterRadius,
  defaultPieChartArcDatum,
  defaultChartColorAccessor,
  IChartRect,
  IChartPoint,
} from '../common';
import { Svg } from '../Svg';
import { Map } from 'immutable';
import { transparent, unit } from '../../../constants';
import { ascending } from 'd3-array';

export type IPieChartData<T> = Map<string, T>;

export interface IPieChartProps<T = any> {
  data: IPieChartData<T>;
  padding?: IChartPadding;
  dimensions: IChartDimensions;
  colorAccessor?(key: string): string;
  valueAccessor?(data: T): number;
  labelFormatter?(data: T): string;
  colorTheme?: ColorTheme;
  padAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export const makePieRadius = (
  dimensions: IChartDimensions,
  padding: IChartPadding
) =>
  Math.min(
    dimensions.width - padding.left - padding.right,
    dimensions.height - padding.top - padding.bottom
  ) / 2;

export const makePaddedInsetRect = (
  dimensions: IChartDimensions,
  padding: IChartPadding
): IChartRect => ({
  origin: {
    x: padding.left,
    y: padding.top,
  },
  size: {
    width: dimensions.width - padding.left - padding.right,
    height: dimensions.height - padding.top - padding.bottom,
  },
});

export const PieChart = <T extends any = { value: number; label: string }>({
  data,
  padding = zeroPadding,
  dimensions,
  valueAccessor = property('value'),
  labelFormatter = property('label'),
  colorAccessor = defaultChartColorAccessor,
  colorTheme = colorThemes.light,
  padAngle = defaultPieChartPadAngle,
  innerRadius = defaultPieChartInnerRadius,
  outerRadius = defaultPieChartOuterRadius,
}: IPieChartProps<T>) => {
  const radius = makePieRadius(dimensions, padding);
  const pieGenerator = pie<[string, T]>()
    .value(([k, v]) => valueAccessor(v))
    .sortValues(null) // TODO: sort ascending, descending or neither
    .padAngle(padAngle);
  const pieData = pieGenerator(data.entrySeq().toJS());
  const piePathData = pieData.map(p => ({
    data: p.data,
    arcGenerator: arc()
      .startAngle(p.startAngle)
      .endAngle(p.endAngle)
      .padAngle(p.padAngle)
      .outerRadius(radius * outerRadius)
      .innerRadius(radius * innerRadius),
    labelArcGenerator: arc()
      .startAngle(p.startAngle)
      .endAngle(p.endAngle)
      .padAngle(p.padAngle)
      .outerRadius(radius * outerRadius)
      .innerRadius(radius * 0.9),
  }));
  const insetRect = makePaddedInsetRect(dimensions, padding);
  return (
    <div data-test="pie-chart">
      <Svg dimensions={dimensions} colorTheme={colorTheme}>
        <g
          data-test="pie-paths"
          transform={`translate(${dimensions.width / 2}, ${dimensions.height /
            2})`}
        >
          <g data-test="slices">
            {piePathData.map(({ data: [key, data], arcGenerator }, i) => (
              <g key={`slice-${i}-${key}`}>
                <PieSlice
                  arcGenerator={arcGenerator}
                  color={colorAccessor(key)}
                />
              </g>
            ))}
          </g>
          <g data-test="slice-labels">
            {piePathData.map(
              ({ data: [key, data], arcGenerator, labelArcGenerator }, i) => (
                <g key={`label-${i}-${key}`}>
                  <PieSliceLabel
                    arcGenerator={arcGenerator}
                    labelArcGenerator={labelArcGenerator}
                    color={colorAccessor(key)}
                    colorTheme={colorTheme}
                    radius={2}
                    insetRect={insetRect}
                    center={{
                      x: dimensions.width / 2,
                      y: dimensions.height / 2,
                    }}
                  >
                    {labelFormatter(data)}
                  </PieSliceLabel>
                </g>
              )
            )}
          </g>
        </g>
      </Svg>
    </div>
  );
};

export interface IPieSliceProps {
  arcGenerator: Arc<any, any>;
  color: HexColor;
}

export const PieSlice = ({ arcGenerator, color }: IPieSliceProps) => (
  <path
    d={arcGenerator(defaultPieChartArcDatum) || ''}
    stroke={transparent}
    fill={color}
  />
);

export interface IPieSliceLabelProps<T> {
  arcGenerator: Arc<any, any>;
  labelArcGenerator: Arc<any, any>;
  color: HexColor;
  radius: number;
  colorTheme: ColorTheme;
  insetRect: IChartRect;
  center: IChartPoint;
  children?: SVGTextElement['children'] | string;
}

export const calcPointForPieSliceLabelText = (
  centroid: IChartPoint,
  center: IChartPoint,
  insetRect: IChartRect
): IChartPoint => {
  const xMidPoint = insetRect.origin.x + insetRect.size.width / 2;
  return {
    x:
      centroid.x + center.x > xMidPoint
        ? insetRect.origin.x + insetRect.size.width - center.x
        : insetRect.origin.x - center.x,
    y: centroid.y,
  };
};

export const calcPointsForPieSliceLabelPolyline = (
  centroid: IChartPoint,
  labelPoint: IChartPoint,
  radius: number
): IChartPoint[] => [
  {
    x: centroid.x > 0 ? centroid.x + radius : centroid.x - radius,
    y: centroid.y > 0 ? centroid.y + 0.5 : centroid.y - 0.5,
  },
  {
    x: (labelPoint.x + centroid.x) / 2,
    y: labelPoint.y,
  },
  {
    x: labelPoint.x > 0 ? labelPoint.x - unit : labelPoint.x + unit,
    y: labelPoint.y,
  },
];

export const PieSliceLabel = <T extends any>({
  arcGenerator,
  labelArcGenerator,
  color,
  radius,
  colorTheme,
  children,
  insetRect,
  center,
}: IPieSliceLabelProps<T>) => {
  const [centroidX, centroidY] = arcGenerator.centroid(defaultPieChartArcDatum);
  const [labelCentroidX, labelCentroidY] = labelArcGenerator.centroid(
    defaultPieChartArcDatum
  );
  const labelPoint = calcPointForPieSliceLabelText(
    { x: labelCentroidX, y: labelCentroidY },
    center,
    insetRect
  );
  const points = calcPointsForPieSliceLabelPolyline(
    { x: centroidX, y: centroidY },
    labelPoint,
    radius
  );
  const polylinePointsGenerator = line<IChartPoint>()
    .x(d => d.x)
    .y(d => d.y);
  const polylinePoints = polylinePointsGenerator(points);
  return (
    <g>
      <circle
        cx={centroidX}
        cy={centroidY}
        r={radius}
        fill={color}
        stroke={colorTheme.components.chart.pie.slice.stroke}
      />
      <path
        d={polylinePoints || ''}
        stroke={colorTheme.components.chart.pie.slice.stroke}
        fill={transparent}
      />
      <text
        textAnchor="middle"
        fill={colorTheme.components.chart.axis.tick.color}
        x={labelPoint.x}
        y={labelCentroidY}
        dy="0.333em"
      >
        {children}
      </text>
    </g>
  );
};
