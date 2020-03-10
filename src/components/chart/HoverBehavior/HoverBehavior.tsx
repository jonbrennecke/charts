import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BarChart, IBarChartProps } from '../BarChart';
import { opacity } from '../../../theme/colorUtils';
import { Text } from '../../text';
import { unit } from '../../../constants';
import { defaultRangeValueFormatter } from '../common';

const positionCss = ({
  point,
  value,
}: {
  point: { x: number; y: number } | null;
  value: any | null;
}) => {
  if (point && value) {
    return css`
      transform: translate(${point.x}px, ${point.y}px);
      opacity: 1;
    `;
  } else if (point) {
    return css`
      transform: translate(${point.x}px, ${point.y}px);
      opacity: 0;
    `;
  } else {
    return css`
      transform: translate(0, 0);
      opacity: 0;
    `;
  }
};

const HoverTooltipContainer = styled.div<{
  point: { x: number; y: number } | null;
  value: any | null;
}>`
  position: absolute;
  height: 30px;
  width: 100px;
  left: -50px;
  top: -30px;
  z-index: 1000;
  filter: drop-shadow(0px 0px 3px ${opacity('#000', 0.1)});
  transition: transform 0.05s ease-in-out, opacity 0.05s ease-in-out 0.05s;
  pointer-events: none;
  ${positionCss}

  svg {
    width: 100%;
    height: auto;

    path {
      fill: #fff;
    }
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${unit}px;
`;

const TooltipValueText = styled(Text)`
  font-size: 11px;
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface HoverTooltipProps<RangeElementType extends { value: number }> {
  point: { x: number; y: number } | null;
  value: RangeElementType | null;
  valueFormatter?(value: number): string;
}

export const HoverTooltip = <RangeElementType extends { value: number }>({
  point,
  value,
  valueFormatter = defaultRangeValueFormatter,
}: HoverTooltipProps<RangeElementType>) => (
  <HoverTooltipContainer point={point} value={value}>
    <svg width="93px" height="30px" viewBox="0 0 93 30">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-248.000000, -147.000000)">
          <path d="M339,147 C340.104569,147 341,147.895431 341,149 L341,168 C341,169.104569 340.104569,170 339,170 L299.923,170 L295.299232,176.149104 C294.967297,176.590508 294.340382,176.67925 293.898978,176.347314 C293.823929,176.290878 293.757204,176.224153 293.700768,176.149104 L289.076,170 L250,170 C248.895431,170 248,169.104569 248,168 L248,149 C248,147.895431 248.895431,147 250,147 L339,147 Z"></path>
        </g>
      </g>
    </svg>
    <TextContainer>
      <TooltipValueText>
        {value && valueFormatter(value.value)}
      </TooltipValueText>
    </TextContainer>
  </HoverTooltipContainer>
);

const Container = styled.div`
  position: relative;
`;

export const withHoverBehavior = <RangeElementType extends { value: number }>(
  ChartComponent: typeof BarChart
) => {
  return (props: IBarChartProps<RangeElementType>) => {
    const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
    const [value, setValue] = useState<RangeElementType | null>(null);
    const updateTooltipState = (
      value: RangeElementType,
      point: { x: number; y: number }
    ) => {
      setPoint(point);
      setValue(value as RangeElementType);
    };
    return (
      <Container>
        <HoverTooltip
          point={point}
          value={value}
          valueFormatter={props.rangeLabelFormatter}
        />
        <ChartComponent
          {...props}
          onValueClick={updateTooltipState}
          onValueMouseOver={updateTooltipState}
          onValueMouseOut={() => {
            setValue(null);
          }}
        />
      </Container>
    );
  };
};
