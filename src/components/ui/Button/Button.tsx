import React from 'react';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import styled, { keyframes, css } from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../../text';
import { unit } from '../../../constants';
import { cssEllipsis } from '../../styles';

type ReactChild = React.ReactElement | React.ReactNode;

export enum EButtonVariant {
  primary = 'primary',
  default = 'default',
}

export enum EButtonSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface IButtonProps {
  variant?: EButtonVariant | keyof typeof EButtonVariant;
  size?: EButtonSize | keyof typeof EButtonSize;
  colorTheme?: ColorTheme;
  children?: ReactChild | ReactChild[];
  onClick?(): void;
}

export interface IStyledButton {
  variant: EButtonVariant | keyof typeof EButtonVariant;
  size: EButtonSize | keyof typeof EButtonSize;
  colorTheme: ColorTheme['components']['button'];
}

const activeBorderKeyframes = ({ colorTheme, variant }: IStyledButton) =>
  keyframes`
    from {
      opacity: 1;
      box-shadow: 0px 0px 0px 0px ${colorTheme.active.borderShadow[variant]};
    }
    to {
      opacity: 0;
      box-shadow: 0px 0px 1px ${unit}px ${colorTheme.active.borderShadow[variant]};
    }
  `;

const padding = (size: EButtonSize | keyof typeof EButtonSize) => {
  switch (size) {
    case EButtonSize.small:
      return css`
        padding: ${0.25 * unit}px ${unit}px;
      `;
    case EButtonSize.medium:
      return css`
        padding: ${unit}px ${2 * unit}px;
      `;
    case EButtonSize.large:
      return css`
        padding: ${1.5 * unit}px ${4 * unit}px;
      `;
  }
};

// prettier-ignore
const Container = styled.button<IStyledButton>`
  position: relative;
  display: inline-block;
  max-width: 100%;
  text-align: center;
  outline: 0;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  box-shadow:
    0px 1px 0px ${props => props.colorTheme.base.shadow};
  background-color: ${props =>
    props.colorTheme.base.backgroundColor[props.variant]};
  border: 1px solid ${props => props.colorTheme.base.color[props.variant]};
  border-radius: 2px;
  ${props => padding(props.size)}

  &:active::after {
    transition: all 200ms ease-in-out;
    display: block;
    content: '';
    pointer-events: none;
    border-radius: inherit;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0px 0px 0px ${props =>
      props.colorTheme.base.backgroundColor[props.variant]};
    animation: ${activeBorderKeyframes} 350ms ease-in-out;
  }

  span {
    max-width: 100%;
    display: inline-block;
    transition: all 200ms ease-in-out;
    color: ${props =>
      props.variant === EButtonVariant.primary &&
      props.colorTheme.base.primaryText};
    ${cssEllipsis()}
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
  size = EButtonSize.medium,
  children,
  onClick = noop,
  colorTheme = colorThemes.light,
}: IButtonProps) => (
  <Container
    size={size}
    colorTheme={colorTheme.components.button}
    onClick={onClick}
    variant={variant}
  >
    {isString(children) ? <Text>{children}</Text> : children}
  </Container>
);
