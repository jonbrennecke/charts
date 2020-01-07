import React from 'react';
import { ColorTheme, colorThemes } from '../../../theme';
import styled, { StyledFunction } from 'styled-components';
import { Text } from '../../text';
import isString from 'lodash/isString';
import { unit, transparent } from '../../../constants';
import noop from 'lodash/noop';

type ReactChild = React.ReactElement | React.ReactNode;

export enum EButtonVariant {
  primary = 'primary',
  default = 'default',
}

export interface IButtonProps {
  variant?: EButtonVariant;
  colorTheme?: ColorTheme;
  children?: ReactChild | ReactChild[];
  onClick?(): void;
}

export interface IStyledButton {
  variant: EButtonVariant;
  colorTheme: ColorTheme['components']['button'];
}

// prettier-ignore
const StyledButton = styled.button<IStyledButton>`
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  outline: 0;
  cursor: pointer;
  padding: ${unit}px ${2 * unit}px;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 1px 0px ${props => props.colorTheme.base.shadow};
  background-color: ${props =>
    props.colorTheme.base.backgroundColor[props.variant]};
  border: 1px solid ${props => props.colorTheme.base.color[props.variant]};
  border-radius: 2px;

  span {
    display: inline-block;
    transition: all 200ms ease-in-out;
    color: ${props =>
      props.variant === EButtonVariant.primary &&
      props.colorTheme.base.primaryText};
  }

  &:hover {
    border-color: ${props => props.colorTheme.hover.border[props.variant]};
    box-shadow: 0px 1px 2px ${props => props.colorTheme.hover.shadow};
    background-color: ${props =>
      props.colorTheme.hover.backgroundColor[props.variant]};

    span {
      color: ${props => props.colorTheme.hover.color[props.variant]};
    }
  }

  &:active {
    border-color: ${props => props.colorTheme.active.border[props.variant]};
    background-color: ${props =>
      props.colorTheme.active.backgroundColor[props.variant]};

    span {
      color: ${props => props.colorTheme.active.color[props.variant]};
    }
  }
`;

export const Button = ({
  variant = EButtonVariant.default,
  children,
  onClick = noop,
  colorTheme = colorThemes.light,
}: IButtonProps) => (
  <StyledButton
    colorTheme={colorTheme.components.button}
    onClick={onClick}
    variant={variant}
  >
    {isString(children) ? <Text>{children}</Text> : children}
  </StyledButton>
);
