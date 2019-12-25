import React from 'react';
import { ScaleLinear } from 'd3-scale';
import { ColorTheme, colorThemes } from '../../../theme';

export interface IGridLinesProps {
  numberOfYTicks: number;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number>;
  colorTheme?: ColorTheme;
}

export const GridLines = ({
  numberOfYTicks,
  yScale,
  xScale,
  colorTheme = colorThemes.light,
}: IGridLinesProps) => {
  const [x0, x1] = xScale.range();
  return (
    <g data-test="gridlines">
      {yScale.ticks(numberOfYTicks).map(n => (
        <g key={n}>
          <line
            x1={x0}
            x2={x1}
            y1={yScale(n)}
            y2={yScale(n)}
            stroke={colorTheme.components.chart.axis.gridline.stroke}
            fill="transparent"
          />
        </g>
      ))}
    </g>
  );
};
