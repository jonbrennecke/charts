import React, { useState } from 'react';
import {
  IBarChartProps,
  BarChartEventPayload,
  BaseRangeElementType,
  BaseDomainElementType,
} from '../BarChart';
import styled from 'styled-components';
import { Map } from 'immutable';
import { ChartHeader } from './ChartHeader';
import {
  defaultRangeValueFormatter,
  defaultChartColorAccessor,
} from '../common';

const Container = styled.div`
  position: relative;
  height: 100%;
`;

export interface WrapWithChartHeaderProps<R, D>
  extends Pick<
    IBarChartProps<R, D>,
    'colorAccessor' | 'rangeLabelFormatter' | 'categories'
  > {
  showHeader?: boolean;
}

export const wrapWithChartHeader = <
  R extends BaseRangeElementType,
  D extends BaseDomainElementType<R>,
  P extends WrapWithChartHeaderProps<R, D>
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
    return (
      <Container>
        <ChartHeader
          title="Title"
          categories={Map(
            props.categories.map(category => [
              category,
              colorAccessor(category),
            ])
          )}
          value={
            eventPayload
              ? {
                  category: eventPayload.category,
                  color: eventPayload.color,
                  value: eventPayload.value,
                }
              : undefined
          }
          valueFormatter={value => rangeLabelFormatter(value.value)}
        />
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
