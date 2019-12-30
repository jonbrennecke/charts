import React from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../../text';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ISelectOptionProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

interface IContainerProps {
  colorTheme: ColorTheme;
}

const Container = styled.div`
  padding: ${unit}px;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: ${(props: IContainerProps) =>
      props.colorTheme.components.select.option.hoverBackgroundColor};
  }
`;

export const SelectOption = ({
  children,
  colorTheme = colorThemes.light,
}: ISelectOptionProps) => {
  return (
    <Container data-test="select-option" colorTheme={colorTheme}>
      <Text colorTheme={colorTheme}>{children}</Text>
    </Container>
  );
};
