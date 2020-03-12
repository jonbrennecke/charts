import React from 'react';
import styled from 'styled-components';
import { Text, Heading } from '../../text';
import { unit, mediumGray } from '../../../constants';
import { LegendItem, Legend } from '../Legend';
import { Map } from 'immutable';

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
  categories: Map<string, string>;
  valueFormatter?(value: T): string;
}

export const ChartHeader = <T extends any>({
  title,
  value,
  categories,
  valueFormatter,
}: ChartHeaderProps<T>) => (
  <Container>
    <Heading>{title}</Heading>
    <DescriptionText>
      {value && valueFormatter ? valueFormatter(value.value) : '\u00A0'}
    </DescriptionText>
    <Legend>
      {categories
        .entrySeq()
        .sortBy(([category]) => category)
        .map(([category, color]) => (
          <LegendItem key={category} color={color}>
            {category}
          </LegendItem>
        ))
        .valueSeq()
        .toArray()}
    </Legend>
  </Container>
);
