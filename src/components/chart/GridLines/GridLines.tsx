import React from 'react';
import { ScaleLinear, ScaleBand } from 'd3-scale';
import { ColorTheme, colorThemes } from '../../../theme';

export interface IGridLinesProps {
  numberOfYTicks: number;
  yScale: ScaleLinear<number, number>;
  // TODO: xScale: ScaleLinear<number, number> |
  xScale: ScaleBand<number>;
  colorTheme?: ColorTheme;
  showVerticalGridLines?: boolean;
  showHorizontalGridLines?: boolean;
}

export const GridLines = ({
  numberOfYTicks,
  yScale,
  xScale,
  colorTheme = colorThemes.light,
  showVerticalGridLines = true,
  showHorizontalGridLines = true,
}: IGridLinesProps) => {
  const [x0, x1] = xScale.range();
  const [y1, y0] = yScale.range();
  const xDomain = xScale.domain();
  const bandWidth = xScale.bandwidth();
  return (
    <g data-test="gridlines">
      {showHorizontalGridLines &&
        yScale.ticks(numberOfYTicks).map(i => (
          <g key={`horizontal-gridline-${i}`}>
            <line
              x1={x0}
              x2={x1}
              y1={yScale(i)}
              y2={yScale(i)}
              stroke={colorTheme.components.chart.axis.gridline.stroke}
              fill="transparent"
            />
          </g>
        ))}

      {showVerticalGridLines &&
        xDomain.map(i => {
          const bandCenter = (xScale(i) || 0) + bandWidth / 2;
          return (
            <g key={`vertical-gridline-${i}`}>
              <line
                x1={bandCenter}
                x2={bandCenter}
                y1={y0}
                y2={y1}
                stroke={colorTheme.components.chart.axis.gridline.stroke}
                fill="transparent"
              />
            </g>
          );
        })}
    </g>
  );
};
