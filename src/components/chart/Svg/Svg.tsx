import React, { forwardRef } from 'react';
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

const StyledSvg = styled.svg`
  position: relative;
  text {
    font-family: ${chartTickFontFamily};
    font-size: ${chartTickFontSize}pt;
  }
`;

export const Svg = forwardRef(
  ({ dimensions, children }: ISvgProps, ref: React.Ref<SVGSVGElement>) => (
    <StyledSvg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={viewBoxString(dimensions)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      ref={ref}
    >
      {children}
    </StyledSvg>
  )
);
