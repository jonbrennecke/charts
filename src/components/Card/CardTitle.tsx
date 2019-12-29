import React from 'react';
import styled, { css } from 'styled-components';
import { ColorTheme, colorThemes } from '../../theme';
import { Heading } from '../text';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICardTitleProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const HeadingText = styled(Heading)``;

export const CardTitle = ({
  children,
  colorTheme = colorThemes.light,
}: ICardTitleProps) => {
  return (
    <HeadingText
      variant="h2"
      data-test="card-title"
      colorTheme={colorTheme}
    >
      {children}
    </HeadingText>
  );
};
