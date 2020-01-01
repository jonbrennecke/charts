import React from 'react';
import styled, { css } from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../Text';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IHeadingProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadingText = styled(Text)`
  margin: ${unit}px 0;
`;

export const Heading = ({
  children,
  variant = 'h4',
  colorTheme = colorThemes.light,
}: IHeadingProps) => {
  return (
    <HeadingText
      // @ts-ignore
      forwardedAs={variant}
      data-test="heading"
      colorTheme={colorTheme}
    >
      {children}
    </HeadingText>
  );
};
