import { IChartPadding, IChartDimensions } from './chartTypes';

export const defaultChartTickLength = 5;
export const defaultChartXAxisHeight = 30;
export const defaultChartYAxisWidth = 30;
export const defaultChartCharLimitBeforeEllipsis = 10;

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
