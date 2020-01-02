import React from 'react';
import { ColorTheme, colorThemes } from '../../../theme';
import styled from 'styled-components';

export enum EInputType {
  text = 'text',
  email = 'email',
  hidden = 'hidden',
  number = 'number',
  password = 'password',
  search = 'search',
  submit = 'submit',
  url = 'url',
}

export interface IInputProps {
  colorTheme?: ColorTheme;
  id?: string;
  placeholder?: string;
  label?: string;
  title?: string;
  type?: EInputType;
}

const StyledInput = styled.input`
  color: ${(props: { colorTheme: ColorTheme }) =>
    props.colorTheme.components.text.input.color};
  font-family: Cabin;
  font-size: 16px;
  margin: 0;
  outline: 0;
  padding: 0;
  border: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;

  &::placeholder {
    color: ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.text.input.placeholderColor};
  }
`;

export const Input = ({
  id,
  title,
  label,
  placeholder = '',
  colorTheme = colorThemes.light,
  type = EInputType.text,
}: IInputProps) => (
  <StyledInput
    id={id}
    type={type}
    placeholder={placeholder}
    aria-label={label}
    title={title}
    colorTheme={colorTheme}
  />
);
