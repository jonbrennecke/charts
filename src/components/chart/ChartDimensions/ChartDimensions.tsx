import React, { useState } from 'react';
import Measure from 'react-measure';
import { IChartDimensions, zeroDimensions } from '../common';
import styled from 'styled-components';

export type ReactChild = React.ReactElement | React.ReactNode;

export interface Dimensional {
  dimensions: IChartDimensions;
}

export interface ChartDimensionsProps {
  children?: (childProps: Dimensional) => ReactChild;
}

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`;

export const ChartDimensions = ({ children }: ChartDimensionsProps) => {
  const [state, setState] = useState({ dimensions: zeroDimensions });
  return (
    <Measure
      bounds
      onResize={contentRect => {
        setState({ dimensions: contentRect.bounds as IChartDimensions });
      }}
    >
      {({ measureRef }) => (
        <StyledDiv ref={measureRef} data-test="chart-dimensions">
          {children && children(state)}
        </StyledDiv>
      )}
    </Measure>
  );
};
