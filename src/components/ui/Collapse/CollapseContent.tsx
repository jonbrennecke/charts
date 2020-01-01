import React from 'react';
import styled from 'styled-components';
import { unit } from '../../../constants';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICollapseContent {
  collapsed?: boolean;
  children?: ReactChild | ReactChild[];
}

export const CollapseContentOuter = styled.div`
  overflow: hidden;
  position: relative;
  height: auto;
  max-height: ${(props: ICollapseContent) =>
    props.collapsed ? '0px' : '1000px'};
  transition: all 250ms ease-in-out;
`;

export const CollapseContentInner = styled.div`
  padding: ${1.5 * unit}px;
  max-height: 100%;
`;

export const CollapseContent = ({ children, ...etc }: ICollapseContent) => (
  <CollapseContentOuter {...etc}>
    <CollapseContentInner>{children}</CollapseContentInner>
  </CollapseContentOuter>
);
