import React, { useState } from 'react';
import {
  IBarChartProps,
  BarChartEventPayload,
  BaseRangeElementType,
  BaseDomainElementType,
} from '../BarChart';
import styled from 'styled-components';
import { Map } from 'immutable';
import {
  defaultRangeValueFormatter,
  defaultChartColorAccessor,
} from '../common';
import { Legend, LegendItem } from './Legend';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

export interface WrapWithLegendProps<R, D>
  extends Pick<
    IBarChartProps<R, D>,
    'colorAccessor' | 'rangeLabelFormatter' | 'categories'
  > {
  showHeader?: boolean;
}

export const wrapWithLegend = <
  R extends BaseRangeElementType,
  D extends BaseDomainElementType<R>,
  P extends WrapWithLegendProps<R, D>
>(
  ChartComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const [eventPayload, setEventPayload] = useState<BarChartEventPayload<
      R
    > | null>(null);
    const rangeLabelFormatter =
      props.rangeLabelFormatter || defaultRangeValueFormatter;
    const colorAccessor = props.colorAccessor
      ? props.colorAccessor
      : defaultChartColorAccessor;
    const categories = Map(
      props.categories.map(category => [category, colorAccessor(category)])
    );
    return (
      <Container>
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
        <ChartComponent
          {...props}
          onValueMouseOver={payload => {
            setEventPayload(payload);
          }}
          onValueMouseOut={() => {
            setEventPayload(null);
          }}
        />
      </Container>
    );
  };
};
