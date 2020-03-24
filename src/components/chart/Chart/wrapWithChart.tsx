import React from 'react';
import { ChartProps, Chart } from './Chart';

export const wrapWithChart = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => (props: P & Omit<ChartProps, 'children'>) => (
  <Chart
    dimensions={props.dimensions}
    xScale={props.xScale}
    yScale={props.yScale}
    numberOfYTicks={props.numberOfYTicks}
    gridLineColor={props.gridLineColor}
    showVerticalGridLines={props.showVerticalGridLines}
    showHorizontalGridLines={props.showHorizontalGridLines}
    gridlineStyle={props.gridlineStyle}
  >
    <WrappedComponent {...props} />
  </Chart>
);
