import React from 'react';
import styled from 'styled-components';
import { Color } from '../Color';
import { mediumGray, unit } from '../../../constants';
import { Text, ITextProps } from '../../text';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  /* :not(:first) */
  padding: ${unit * 0.5}px ${unit}px;
`;

const Name = styled(Text)``;

export interface LegendItemProps {
  color?: string;
  children?: ITextProps['children'];
}

export const LegendItem = ({
  color = mediumGray,
  children,
}: LegendItemProps) => (
  <Container>
    <Color color={color} />
    <Name>{children}</Name>
  </Container>
);

export const Legend = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;