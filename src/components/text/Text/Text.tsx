import React from 'react';
import styled from 'styled-components';
import { trueBlack } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export enum ETextWeight {
  bold = 'bold',
  medium = 'medium',
  regular = 'regular',
}

export type ITextProps = {
  children?: ReactChild | ReactChild[];
  color?: string;
  weight?: ETextWeight | keyof typeof ETextWeight;
} & React.HTMLAttributes<{}>;

const textWeightToFontWeight = (
  weight: ETextWeight | keyof typeof ETextWeight
) =>
  ({
    [ETextWeight.bold]: '700',
    [ETextWeight.medium]: '500',
    [ETextWeight.regular]: 'normal',
  }[weight]);

const Span = styled.span<{
  color: string;
  weight: ETextWeight | keyof typeof ETextWeight;
}>`
  color: ${props => props.color};
  font-family: Cabin, sans-serif;
  font-size: 16px;
  font-weight: ${props => textWeightToFontWeight(props.weight)};
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
`;

export const Text = ({
  children,
  color = trueBlack,
  weight = ETextWeight.regular,
  ...etc
}: ITextProps) => (
  <Span data-test="text" color={color} weight={weight} {...etc}>
    {children}
  </Span>
);
