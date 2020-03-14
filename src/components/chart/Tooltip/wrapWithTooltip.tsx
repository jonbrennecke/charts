import React, { useState } from 'react';
import styled from 'styled-components';
import isUndefined from 'lodash/isUndefined';
import { BarChartEventPayload } from '../BarChart';
import { Tooltip } from './Tooltip';
import { LineChartEventPayload } from '../LineChart';
import { MouseOverEventProps } from '../common';

const Container = styled.div`
  position: relative;
`;

export interface ChartEventPayload<T> {
  category: string | null;
  color: string | null;
  value: T | null;
  point: { x: number; y: number } | null;
}

export type ChartPayload<T> =
  | BarChartEventPayload<T>
  | LineChartEventPayload<T>;

interface AdditionalComponentProps<T> {
  showTooltipOnHover?: boolean;
  tooltipValueFormatter?(value: T): string;
}

export interface WrapWithTooltipProps<T>
  extends MouseOverEventProps<ChartPayload<T>>,
    AdditionalComponentProps<T> {}

export const wrapWithTooltip = <T, P extends WrapWithTooltipProps<T>>(
  ChartComponent: React.ComponentType<P>
) => (props: P & AdditionalComponentProps<T>) => {
  const [eventPayload, setEventPayload] = useState<ChartEventPayload<T> | null>(
    null
  );
  const showTooltipOnHover = isUndefined(props.showTooltipOnHover)
    ? true
    : props.showTooltipOnHover;
  return (
    <Container>
      {showTooltipOnHover && (
        <Tooltip
          category={eventPayload?.category || null}
          point={eventPayload?.point || null}
          value={
            eventPayload?.value && props.tooltipValueFormatter
              ? props.tooltipValueFormatter(eventPayload.value)
              : null
          }
          color={eventPayload?.color || undefined}
        />
      )}
      <ChartComponent
        {...props}
        onValueMouseOver={payload => {
          setEventPayload(payload);
          props.onValueMouseOver && props.onValueMouseOver(payload);
        }}
        onValueMouseOut={() => {
          setEventPayload({
            color: null,
            category: null,
            value: null,
            point: eventPayload?.point || null,
          });
          props.onValueMouseOut && props.onValueMouseOut();
        }}
      />
    </Container>
  );
};
