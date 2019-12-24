import React from 'react';
import { ScaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import property from 'lodash/property';

export interface ILineChartProps<T = any> {
  data: T[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  xValueAccessor?(data: T): number;
  yValueAccessor?(data: T): number;
}
export const LineChart = <T extends any = { x: number; y: number }>({
  data,
  xScale,
  yScale,
  xValueAccessor = property('x'),
  yValueAccessor = property('y'),
}: ILineChartProps<T>) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  const lineGenerator = line<T>()
    .x(d => xScale(xValueAccessor(d)))
    .y(d => yScale(yValueAccessor(d)));
  return (
    <div data-test="line-chart">
      <svg
        width={x1}
        height={y1}
        viewBox={`${x0} ${y0} ${x1} ${y1}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d={lineGenerator(data) || ''}
          stroke="#ff0000"
          fill="transparent"
        />
      </svg>
    </div>
  );
};
