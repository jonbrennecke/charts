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

export interface ChartHeaderProps<T> {
  title?: string;
  value?: {
    category: string;
    color: string;
    value: T;
  };
  valueFormatter?(value: T): string;
}

export const ChartHeader = <T extends any>({
  title,
  value,
  valueFormatter,
}: ChartHeaderProps<T>) => (
  <Container>
    <Heading>{title}</Heading>
    <DescriptionText>
      {value && valueFormatter ? valueFormatter(value.value) : '\u00A0'}
    </DescriptionText>
    {/* Legend */}
  </Container>
);
