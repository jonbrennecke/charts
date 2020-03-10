import React from 'react';
import styled from 'styled-components';
import { Text, Heading } from '../../text';
import { unit, mediumGray } from '../../../constants';

const Container = styled.div`
  padding: ${unit}px;
`;

const DescriptionText = styled(Text)`
  color: ${mediumGray};
`;

export interface ChartHeaderProps {
  title?: string;
}

export const ChartHeader = ({ title }: ChartHeaderProps) => (
  <Container>
    <Heading>{title}</Heading>
    <DescriptionText>Current value (or summary)</DescriptionText>
    {/* Legend */}
  </Container>
);
