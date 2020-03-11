import React from 'react';
import { BarChart, IBarChartProps } from '../BarChart';
import styled from 'styled-components';
import { Map } from 'immutable';
import { ChartHeader } from './ChartHeader';

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
  // return ({
  //   showHeader = false,
  //   ...props
  // }: ChartProps & {
  //   showHeader?: boolean;
  // }) => {
  return (props: ChartProps) => {
    return (
      <Container>
        <ChartHeader title="Title" />
        <ChartComponent
          {...props}
          onValueMouseOver={payload => {
            console.log('mouse over', payload);
          }}
          onValueMouseOut={() => {
            // setEventPayload({
            //   color: null,
            //   category: null,
            //   value: null,
            //   point: eventPayload?.point || null,
            // });
          }}
        />
      </Container>
    );
  };
};
