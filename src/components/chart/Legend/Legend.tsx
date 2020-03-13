import React from 'react';
import styled from 'styled-components';
import { Color } from '../Color';
import {
  mediumGray,
  unit,
  lightGray,
  transparent,
  darkGray,
} from '../../../constants';
import { Text, ITextProps } from '../../text';
import { opacity } from '../../../theme/colorUtils';

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${lightGray};
  border-radius: ${unit * 0.5}px;
  padding: ${unit * 0.5}px ${unit * 1.5}px;
  box-shadow: 0px 0px 3px ${transparent};

  &:hover {
    border-color: ${props => props.color};
    box-shadow: 0px 0px 3px ${props => opacity(props.color, 0.1)};
  }
`;

const Name = styled(Text)``;

export interface LegendItemProps {
  className?: string;
  color?: string;
  children?: ITextProps['children'];
}

export const LegendItem = ({
  className,
  color = mediumGray,
  children,
}: LegendItemProps) => (
  <Container className={className} color={darkGray}>
    <Color color={color} />
    <Name>{children}</Name>
  </Container>
);

export const Legend = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${-unit * 0.5}px;

  & > div {
    margin: ${unit * 0.5}px;
  }
`;
