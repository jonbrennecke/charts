import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICardHeaderProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const ContainerDiv = styled.div`
  border-bottom: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.card.header.border.color};
  padding: 0 ${1.5 * unit}px;
  box-shadow: 0px 1px 7px
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.card.border.shadowColor};
  overflow: auto;
`;

export const CardHeader = ({
  children,
  colorTheme = colorThemes.light,
}: ICardHeaderProps) => {
  return (
    <ContainerDiv data-test="card-header" colorTheme={colorTheme}>
      {children}
    </ContainerDiv>
  );
};
