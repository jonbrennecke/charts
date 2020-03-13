import React from 'react';
import { ChartDimensions } from './ChartDimensions';
import { IChartDimensions } from '../common';

export interface DimensionalChartProps {
  dimensions: IChartDimensions;
}

export const resizableChart = <P extends DimensionalChartProps>(
  ChartComponent: React.ComponentType<P>
) => (props: Omit<P, 'dimensions'>) => (
  <ChartDimensions>
    {({ dimensions }) => (
      // @ts-ignore
      <ChartComponent {...props} dimensions={dimensions} />
    )}
  </ChartDimensions>
);
