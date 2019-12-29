import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ITextProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const Span = styled.span`
  color: ${(props: { colorTheme: ColorTheme }) =>
    props.colorTheme.components.text.color};
  font-family: Cabin;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
`;

export const Text = ({
  children,
  colorTheme = colorThemes.light,
  ...etc
}: ITextProps) => (
  <Span data-test="text" colorTheme={colorTheme} {...etc}>
    {children}
  </Span>
);
