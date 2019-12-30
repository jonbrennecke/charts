import React from 'react';
import styled, { css } from 'styled-components';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../Text';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IPlaceholderProps {
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
}

const StyledText = styled(Text)`
  color: ${props => props.colorTheme!.components.text.placeholder.color};
`;

export const Placeholder = ({
  children,
  colorTheme = colorThemes.light,
}: IPlaceholderProps) => {
  return (
    <StyledText data-test="placeholder-text" colorTheme={colorTheme}>
      {children}
    </StyledText>
  );
};
