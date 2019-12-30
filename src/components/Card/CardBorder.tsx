import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../theme';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICardBorderProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const Container = styled.div`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.card.border.borderColor};
  border-radius: 2px;
  box-shadow: 1px 3px 5px
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.card.border.shadowColor};
`;

export const CardBorder = ({
  children,
  colorTheme = colorThemes.light,
}: ICardBorderProps) => (
  <Container data-test="card-border" colorTheme={colorTheme}>
    {children}
  </Container>
);
