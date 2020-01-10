import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../Text';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export enum EHeadingVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export interface IHeadingProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  variant?: EHeadingVariant | keyof typeof EHeadingVariant;
}

const HeadingText = styled(Text)`
  margin: ${unit}px 0;
`;

const fontSizeScale = Object.keys(EHeadingVariant)
  .reverse()
  .reduce(
    (obj, k, i) => ({
      ...obj,
      [k]: Math.pow(2, i / 5),
    }),
    {}
  );

const cssFontSizes = Object.keys(EHeadingVariant).reduce(
  (styles, k) => `
      ${styles}

      ${k}${HeadingText} {
        font-size: ${fontSizeScale[k].toFixed(2)}em;
      }
    `,
  ''
);

const GlobalStyle = createGlobalStyle`
  ${cssFontSizes}
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
      <GlobalStyle />
      {children}
    </HeadingText>
  );
};
