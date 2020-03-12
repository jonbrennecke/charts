import React from 'react';
import styled from 'styled-components';
import { Text, Heading } from '../../text';
import { unit, mediumGray } from '../../../constants';
import { LegendItem } from '../Legend';
import { Map } from 'immutable';

const Container = styled.div`
  padding: ${unit}px;
`;

const DescriptionText = styled(Text)`
  color: ${mediumGray};
`;

const Legend = styled.div`
  display: flex;
  flex-direction: row;
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
        .map((color, category) => (
          <LegendItem key={category} color={color}>
            {category}
          </LegendItem>
        ))
        .valueSeq()
        .toArray()}
    </Legend>
  </Container>
);
