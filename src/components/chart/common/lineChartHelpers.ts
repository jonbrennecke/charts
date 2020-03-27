import { scaleLinear } from 'd3-scale';
import { IChartDimensions, IChartPadding, ILineChartData } from './chartTypes';
import min from 'lodash/min';
import max from 'lodash/max';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';

export const makeLineChartScales = (
  domain: [number, number],
  range: [number, number],
  yAxisWidth: number,
  xAxisHeight: number,
  dimensions: IChartDimensions,
  padding: IChartPadding
) => {
  const xScale = scaleLinear()
    .domain(domain)
    .range([yAxisWidth + padding.left, dimensions.width - padding.right])
    .nice();
  const yScale = scaleLinear()
    .domain(range)
    .range([dimensions.height - xAxisHeight - padding.bottom, padding.top])
    .nice();
  return { xScale, yScale };
};

export const calculateDefaultRangeForLineChart = <T extends any>(
  data: ILineChartData<T>,
  minValueAccessor: (data: T) => number,
  maxValueAccessor: (data: T) => number
): [number, number] => {
  const minData = data.minBy(y => y.map(minValueAccessor)) || [];
  const a = floor(min(minData.map(minValueAccessor)) || 0);
  const maxData = data.maxBy(y => y.map(maxValueAccessor)) || [];
  const b = ceil(max(maxData.map(maxValueAccessor)) || 0);
  return [a, b];
};

export const calculateDefaultDomainForLineChart = <T extends any>(
  data: ILineChartData<T>
): [number, number] => {
  const x: T[] = data.first([]);
  return [0, x.length - 1];
};
