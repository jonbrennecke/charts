import React from 'react';
import { Dimensional } from '../ChartDimensions';
import { Svg } from '../Svg';
import { GridLines, GridLinesProps } from '../GridLines';
import { SvgProps } from '../Svg';

export interface ChartProps extends Dimensional, GridLinesProps {
  children: SvgProps['children'];
}

export const Chart = ({
  dimensions,
  children,
  ...gridLineProps
}: ChartProps) => (
  <Svg dimensions={dimensions}>
    <GridLines {...gridLineProps} />
    {children}
  </Svg>
);
