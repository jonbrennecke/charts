import React from 'react';
import { ChartDimensions, Dimensional } from './ChartDimensions';

export const resizableChart = <P extends Dimensional>(
  ChartComponent: React.ComponentType<P>
) => (props: Omit<P, 'dimensions'>) => (
  <ChartDimensions>
    {({ dimensions }) => (
      // @ts-ignore
      <ChartComponent {...props} dimensions={dimensions} />
    )}
  </ChartDimensions>
);
