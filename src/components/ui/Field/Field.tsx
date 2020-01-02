import React from 'react';
import { ColorTheme, colorThemes } from '../../../theme';
import styled from 'styled-components';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IFieldProps {
  colorTheme?: ColorTheme;
  children?: ReactChild | ReactChild[];
}

const FieldContainer = styled.div`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.form.field.borderColor};
  border-radius: 2px;
  box-shadow: 1px 1px 1px
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.form.field.shadowColor};
`;

export const Field = ({
  children,
  colorTheme = colorThemes.light,
}: IFieldProps) => (
  <FieldContainer colorTheme={colorTheme} data-test="field">
    {children}
  </FieldContainer>
);
