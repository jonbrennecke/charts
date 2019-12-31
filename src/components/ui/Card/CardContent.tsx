import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICardContentProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const Container = styled.div`
  padding: ${unit}px;
  height: 100%;
  width: 100%;
`;

export const CardContent = ({
  children,
  colorTheme = colorThemes.light,
}: ICardContentProps) => (
  <Container data-test="card-content">{children}</Container>
);
