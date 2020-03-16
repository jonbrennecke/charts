import React from 'react';
import styled, { css } from 'styled-components';
import { opacity } from '../../../theme/colorUtils';
import { Text } from '../../text';
import { unit, trueBlack } from '../../../constants';
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
    transform: translate(-50%, 0) translate(${transform.x}px, ${transform.y}px);
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
  background-color: ${props =>
    props.colorTheme === TooltipColorTheme.light ? '#000' : '#fff'};
  position: absolute;
  height: 25px;
  max-width: 300px;
  top: -30px;
  z-index: 1000;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: ${unit}px;
  border-radius: ${unit * 0.5}px;
  filter: drop-shadow(0px 0px 3px ${opacity('#000', 0.1)});
  transition: transform 0.05s ease-in-out, opacity 0.05s ease-in-out 0.05s;
  pointer-events: none;
  ${positionCss}

  svg {
    path {
      fill: ${props =>
        props.colorTheme === TooltipColorTheme.light ? '#000' : '#fff'};
    }
  }
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
  max-width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props =>
    props.colorTheme === TooltipColorTheme.light ? '#fff' : '#000'};
`;

const ArrowSvg = styled(({ className }: any) => (
  <svg width="11px" height="7px" viewBox="0 0 11 7" className={className}>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-229.000000, -195.000000)" fill={trueBlack}>
        <g transform="translate(229.000000, 195.000000)">
          <path d="M10.923,0 L6.299232,6.149104 C5.967297,6.590508 5.340382,6.67925 4.898978,6.347314 C4.823929,6.290878 4.757204,6.224153 4.700768,6.149104 L0.076,0 L10.923,0 Z" />
        </g>
      </g>
    </g>
  </svg>
))`
  width: ${unit * 2}px;
  height: auto;
  position: absolute;
  top: calc(100% - 1px);
  left: calc(50% - ${unit}px);
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
    <ArrowSvg />
    <Color color={color} />
    <ToolTipCategoryText weight="bold" colorTheme={colorTheme}>
      {category ? `${category}:\u00A0` : '\u00A0'}
    </ToolTipCategoryText>
    <TooltipValueText colorTheme={colorTheme}>{value}</TooltipValueText>
  </TooltipContainer>
);
