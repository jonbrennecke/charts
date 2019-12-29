import React from 'react';
import styled, { css } from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IHeadingProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const styles = css`
  color: ${(props: { colorTheme: ColorTheme }) =>
    props.colorTheme.components.text.color};
  font-family: Cabin;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  margin: 0
`;

export const Heading = ({
  children,
  variant = 'h4',
  colorTheme = colorThemes.light,
}: IHeadingProps) => {
  // @ts-ignore
  const HeadingComponent = styled[variant](...styles);
  return (
    <HeadingComponent data-test="heading" colorTheme={colorTheme}>
      {children}
    </HeadingComponent>
  );
};
