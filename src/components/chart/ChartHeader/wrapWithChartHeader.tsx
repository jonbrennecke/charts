import React, { useState } from 'react';
import { BarChart, IBarChartProps, BarChartEventPayload } from '../BarChart';
import styled from 'styled-components';
import { Map } from 'immutable';
import { ChartHeader } from './ChartHeader';
import { defaultRangeValueFormatter } from '../common';

const Container = styled.div``;

export type ChartPropsWithHeader<ChartProps> = ChartProps & {
  showHeader?: boolean;
};

export const wrapWithChartHeader = <
  RangeElementType extends { value: number },
  DomainElementType extends {
    data: Map<string, RangeElementType>;
    label: string;
  },
  ChartProps extends IBarChartProps<RangeElementType, DomainElementType>
>(
  ChartComponent: React.ComponentType<ChartProps>
) => {
  return (props: ChartProps) => {
    const [eventPayload, setEventPayload] = useState<BarChartEventPayload<
      RangeElementType
    > | null>(null);
    const rangeLabelFormatter =
      props.rangeLabelFormatter || defaultRangeValueFormatter;
    return (
      <Container>
        <ChartHeader
          title="Title"
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
