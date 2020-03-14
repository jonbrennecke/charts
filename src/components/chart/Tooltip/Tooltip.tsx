import React from 'react';
import styled, { css } from 'styled-components';
import { opacity } from '../../../theme/colorUtils';
import { Text } from '../../text';
import { defaultRangeValueFormatter } from '../common';
import { unit } from '../../../constants';
import { Color } from '../Color';

const positionCss = ({
  point,
  value,
}: {
  point: { x: number; y: number } | null;
  value: any | null;
}) => {
  const transform = point || { x: 0, y: 0 };
  const opacity = point && value ? 1 : 0;
  return css`
    transform: translate(${transform.x}px, ${transform.y}px);
    opacity: ${opacity};
  `;
};

export enum TooltipColorTheme {
  light = 'light',
  dark = 'dark',
}

const TooltipContainer = styled.div<{
  point: { x: number; y: number } | null;
  value: any | null;
  colorTheme: TooltipColorTheme | keyof typeof TooltipColorTheme;
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
      fill: ${props =>
        props.colorTheme === TooltipColorTheme.light ? '#000' : '#fff'};
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

const TooltipValueText = styled(Text)<{
  colorTheme: TooltipColorTheme | keyof typeof TooltipColorTheme;
}>`
  font-size: 11px;
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props =>
    props.colorTheme === TooltipColorTheme.light ? '#fff' : '#000'};
`;

const ToolTipCategoryText = styled(Text)<{
  colorTheme: TooltipColorTheme | keyof typeof TooltipColorTheme;
}>`
  font-size: 11px;
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props =>
    props.colorTheme === TooltipColorTheme.light ? '#fff' : '#000'};
`;

export interface TooltipProps {
  point: { x: number; y: number } | null;
  value: string | null;
  category: string | null;
  color?: string;
  colorTheme?: TooltipColorTheme | keyof typeof TooltipColorTheme;
}

export const Tooltip = ({
  point,
  value,
  category,
  color = 'gray',
  colorTheme = TooltipColorTheme.light,
}: TooltipProps) => (
  <TooltipContainer point={point} value={value} colorTheme={colorTheme}>
    <svg width="93px" height="30px" viewBox="0 0 93 30">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-248.000000, -147.000000)">
          <path d="M339,147 C340.104569,147 341,147.895431 341,149 L341,168 C341,169.104569 340.104569,170 339,170 L299.923,170 L295.299232,176.149104 C294.967297,176.590508 294.340382,176.67925 293.898978,176.347314 C293.823929,176.290878 293.757204,176.224153 293.700768,176.149104 L289.076,170 L250,170 C248.895431,170 248,169.104569 248,168 L248,149 C248,147.895431 248.895431,147 250,147 L339,147 Z"></path>
        </g>
      </g>
    </svg>
    <TextContainer>
      <Color color={color} />
      <ToolTipCategoryText weight="bold" colorTheme={colorTheme}>
        {category ? `${category}:\u00A0` : '\u00A0'}
      </ToolTipCategoryText>
      <TooltipValueText colorTheme={colorTheme}>{value}</TooltipValueText>
    </TextContainer>
  </TooltipContainer>
);
