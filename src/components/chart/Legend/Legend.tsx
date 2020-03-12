import React from 'react';
import styled from 'styled-components';
import { Color } from '../Color';
import { mediumGray, unit } from '../../../constants';
import { Text, ITextProps } from '../../text';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${unit}px;
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
