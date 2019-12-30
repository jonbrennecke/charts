import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../../text';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ISelectOptionProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  selected?: boolean;
  onClick?(): void;
}

interface IContainerProps {
  colorTheme: ColorTheme;
  selected: boolean;
}

const Container = styled.div`
  padding: ${unit}px;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;
  font-weight: ${(props: IContainerProps) => (props.selected ? 'bold' : '')};

  &:hover {
    background-color: ${(props: IContainerProps) =>
      props.colorTheme.components.select.option.hoverBackgroundColor};
  }
`;

export const SelectOption = ({
  children,
  colorTheme = colorThemes.light,
  selected = false,
  onClick = noop,
}: ISelectOptionProps) => {
  return (
    <Container
      data-test="select-option"
      colorTheme={colorTheme}
      onClick={onClick}
      selected={selected}
    >
      <Text colorTheme={colorTheme}>{children}</Text>
    </Container>
  );
};
