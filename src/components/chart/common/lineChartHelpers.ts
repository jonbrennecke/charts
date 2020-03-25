import { scaleLinear } from 'd3-scale';
import { IChartDimensions, IChartPadding, ILineChartData } from './chartTypes';
import min from 'lodash/min';
import max from 'lodash/max';
import floor from 'lodash/floor';
import ceil from 'lodash/ceil';

export const makeLineChartScales = (
  xDomain: [number, number],
  yDomain: [number, number],
  yAxisWidth: number,
  xAxisHeight: number,
  dimensions: IChartDimensions,
  padding: IChartPadding
) => {
  const xScale = scaleLinear()
    .domain(xDomain)
    .range([yAxisWidth + padding.left, dimensions.width - padding.right])
    .nice();
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([dimensions.height - xAxisHeight - padding.bottom, padding.top])
    .nice();
  return { xScale, yScale };
};

export const calculateDefaultYDomainForLineChart = <T extends any>(
  data: ILineChartData<T>,
  yValueAccessor: (data: T) => number
): [number, number] => {
  const minData = data.minBy(y => y.map(yValueAccessor)) || [];
  const a = floor(min(minData.map(yValueAccessor)) || 0);
  const maxData = data.maxBy(y => y.map(yValueAccessor)) || [];
  const b = ceil(max(maxData.map(yValueAccessor)) || 0);
  return [a, b];
};

export const calculateDefaultXDomainForLineChart = <T extends any>(
  data: ILineChartData<T>
): [number, number] => {
  const x: T[] = data.first([]);
  return [0, x.length - 1];
};
