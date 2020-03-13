import React, { useState } from 'react';
import styled from 'styled-components';
import isUndefined from 'lodash/isUndefined';
import {
  IBarChartProps,
  BarChartEventPayload,
  BaseRangeElementType,
  BaseDomainElementType,
} from '../BarChart';
import { Tooltip } from './Tooltip';

const Container = styled.div`
  position: relative;
`;

export interface ChartEventPayload<R> {
  category: BarChartEventPayload<R>['category'] | null;
  color: BarChartEventPayload<R>['color'] | null;
  value: BarChartEventPayload<R>['value'] | null;
  point: BarChartEventPayload<R>['point'] | null;
}

export interface WrapWithTooltipProps<R, D>
  extends Pick<
    IBarChartProps<R, D>,
    'rangeLabelFormatter' | 'onValueMouseOver' | 'onValueMouseOut'
  > {
  showTooltipOnHover?: boolean;
}

export const wrapWithTooltip = <
  R extends BaseRangeElementType,
  D extends BaseDomainElementType<R>,
  P extends WrapWithTooltipProps<R, D>
>(
  ChartComponent: React.ComponentType<P>
) => (props: P & { showTooltipOnHover?: boolean }) => {
  const [eventPayload, setEventPayload] = useState<ChartEventPayload<R> | null>(
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
          value={eventPayload?.value || null}
          color={eventPayload?.color || undefined}
          valueFormatter={props.rangeLabelFormatter}
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
