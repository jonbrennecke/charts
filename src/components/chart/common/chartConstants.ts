import { DefaultArcObject } from 'd3-shape';
import { IChartDimensions, IChartPadding } from './chartTypes';

export const defaultChartTickLength = 5;
export const defaultChartXAxisHeight = 30;
export const defaultChartYAxisWidth = 30;
export const defaultChartCharLimitBeforeEllipsis = 15;

export const defaultChartColorAccessor = () => '#000000';

// pie chart
export const defaultPieChartPadAngle = 0.01;
export const defaultPieChartOuterRadius = 0.8;
export const defaultPieChartInnerRadius = 0.35;

export const defaultPieChartArcDatum: DefaultArcObject = {
  innerRadius: 40,
  outerRadius: 60,
  startAngle: 0,
  endAngle: Math.PI / 2,
  padAngle: defaultPieChartPadAngle,
};

export const zeroPadding: IChartPadding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

export const zeroDimensions: IChartDimensions = {
  width: 0,
  height: 0,
};
