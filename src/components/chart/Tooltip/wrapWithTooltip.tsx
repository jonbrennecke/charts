import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, IBarChartProps, BarChartEventPayload } from '../BarChart';
import noop from 'lodash/noop';
import { Tooltip } from './Tooltip';

const Container = styled.div`
  position: relative;
`;

export interface ChartEventPayload<RangeElementType> {
  category: BarChartEventPayload<RangeElementType>['category'] | null;
  color: BarChartEventPayload<RangeElementType>['color'] | null;
  value: BarChartEventPayload<RangeElementType>['value'] | null;
  point: BarChartEventPayload<RangeElementType>['point'] | null;
}

export interface ChartPropsWithHover<RangeElementType>
  extends IBarChartProps<RangeElementType> {
  showTooltipOnHover?: boolean;
}

export const wrapWithTooltip = <RangeElementType extends { value: number }>(
  ChartComponent: typeof BarChart
) => {
  return ({
    showTooltipOnHover = false,
    onValueMouseOver = noop,
    onValueMouseOut = noop,
    ...props
  }: ChartPropsWithHover<RangeElementType>) => {
    const [eventPayload, setEventPayload] = useState<ChartEventPayload<
      RangeElementType
    > | null>(null);
    return (
      <Container>
        {showTooltipOnHover && (
          <Tooltip
            category={eventPayload?.category || null}
            point={eventPayload?.point || null}
            value={eventPayload?.value || null}
            color={eventPayload?.color || undefined}
            valueFormatter={props.rangeLabelFormatter}
          />
        )}
        <ChartComponent
          {...props}
          onValueMouseOver={payload => {
            setEventPayload(payload);
            onValueMouseOver(payload);
          }}
          onValueMouseOut={() => {
            setEventPayload({
              color: null,
              category: null,
              value: null,
              point: eventPayload?.point || null,
            });
            onValueMouseOut();
          }}
        />
      </Container>
    );
  };
};
