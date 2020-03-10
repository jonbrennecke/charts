import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BarChart } from '../BarChart';

export interface HoverTooltipProps {
  point: { x: number; y: number } | null;
}

const positionCss = ({ point }: HoverTooltipProps) =>
  point
    ? css`
        transform: translate(${point.x}px, ${point.y}px);
        opacity: 1;
      `
    : css`
        transform: translate(0, 0);
        opacity: 0;
      `;

const HoverTooltipContainer = styled.div<HoverTooltipProps>`
  position: absolute;
  height: 30px;
  width: 100px;
  left: -50px;
  top: -15px;
  background-color: black;
  z-index: 1000;
  ${positionCss}
`;

export const HoverTooltip = ({ point }: HoverTooltipProps) => (
  <HoverTooltipContainer point={point} />
);

const Container = styled.div`
  position: relative;
`;

export const withHoverBehavior = (ChartComponent: typeof BarChart) => {
  return props => {
    const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
    return (
      <Container>
        <HoverTooltip point={point} />
        <ChartComponent
          {...props}
          onValueClick={(value, point) => setPoint(point)}
          // onValueMouseOver={value => console.log('mouseover', value)}
          // onValueMouseOut={value => console.log('mouseout', value)}
        />
      </Container>
    );
  };
};
