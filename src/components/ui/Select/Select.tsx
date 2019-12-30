import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../../text';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ISelectProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  placeholder?: string;
}

const Container = styled.div`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.color};
  padding: ${unit}px;
  border-radius: ${unit * 0.5}px;
  cursor: pointer;
  transition: border-color 250ms ease-in-out;

  &:hover {
    border-color: ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.hoverColor};
  }
`;

interface IMenuContainerProps {
  colorTheme: ColorTheme;
  visible: boolean;
}

const MenuContainer = styled.div`
  max-height: ${(props: IMenuContainerProps) =>
    props.visible ? '1000px' : '0px'};
  overflow: hidden;
  border-radius: ${unit * 0.5}px;
  margin-top: ${unit}px;
  /* padding: ${unit}px; */
  /* opacity: ${(props: IMenuContainerProps) => (props.visible ? '1' : '0')}; */
  transition: height 250ms ease-in-out, opacity 250ms ease-in-out;
  box-shadow: 1px 0px 3px
    ${(props: IMenuContainerProps) =>
      props.colorTheme.components.card.border.shadowColor};
`;

export const Select = ({
  children,
  placeholder = '',
  colorTheme = colorThemes.light,
}: ISelectProps) => {
  const [showMenu, setState] = useState(false);
  return (
    <>
      <Container
        data-test="select"
        colorTheme={colorTheme}
        onClick={() => setState(!showMenu)}
      >
        <Text colorTheme={colorTheme}>{placeholder}</Text>
      </Container>
      <MenuContainer visible={showMenu} colorTheme={colorTheme}>
        {children}
      </MenuContainer>
    </>
  );
};
