import React from 'react';
import { ColorTheme, colorThemes } from '../../../theme';
import styled from 'styled-components';
import { Text } from '../../text';
import isString from 'lodash/isString';
import { unit } from '../../../constants';
import noop from 'lodash/noop';

type ReactChild = React.ReactElement | React.ReactNode;

export enum EButtonType {
  button = 'button',
  submit = 'submit',
}

export interface IButtonProps {
  colorTheme?: ColorTheme;
  children?: ReactChild | ReactChild[];
  onClick?(): void;
}

const StyledButton = styled.button`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.button.base.borderColor};
  border-radius: 2px;
  box-shadow: 1px 1px 1px
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.button.base.shadowColor};
  outline: 0;
  cursor: pointer;
  padding: ${unit}px ${1.5 * unit}px;
  transition: all 200ms ease-in-out;

  &:hover {
    border: 1px solid
      ${(props: { colorTheme: ColorTheme }) =>
        props.colorTheme.components.button.hover.borderColor};
    box-shadow: 1px 1px 3px
      ${(props: { colorTheme: ColorTheme }) =>
        props.colorTheme.components.button.hover.shadowColor};
  }

  &:active {
    background-color: ${(props: { colorTheme: ColorTheme }) =>
        props.colorTheme.components.button.active.backgroundColor};
  }
`;

export const Button = ({
  children,
  onClick = noop,
  colorTheme = colorThemes.light,
}: IButtonProps) => (
  <StyledButton type="button" colorTheme={colorTheme} onClick={onClick}>
    {isString(children) ? <Text>{children}</Text> : children}
  </StyledButton>
);
