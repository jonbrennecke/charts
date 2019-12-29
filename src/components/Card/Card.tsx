import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../theme';
import { unit } from '../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICardProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const Div = styled.div`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.card.border.color};
  padding: ${unit}px
`;

export const Card = ({
  children,
  colorTheme = colorThemes.light,
}: ICardProps) => (
  <Div data-test="card" colorTheme={colorTheme}>
    {children}
  </Div>
);
