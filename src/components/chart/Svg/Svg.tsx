import React from 'react';
import styled from 'styled-components';

import { IChartDimensions } from '../common';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ISvgProps {
  dimensions: IChartDimensions;
  children: ReactChild | ReactChild[];
}

export const viewBoxString = (dimensions: IChartDimensions) =>
  `${0} ${0} ${dimensions.width} ${dimensions.height}`;

export const chartTickFontFamily = 'Cabin';
export const chartTickFontSize = 8;

export const Svg = ({ dimensions, children }: ISvgProps) => {
  const StyledSvg = styled.svg`
    text {
      font-family: ${chartTickFontFamily};
      font-size: ${chartTickFontSize}pt;
    }
  `;
  return (
    <StyledSvg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={viewBoxString(dimensions)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {children}
    </StyledSvg>
  );
};
