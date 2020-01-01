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
  max-height: ${(props: ICollapseContent) =>
    props.collapsed ? '0px' : 'none'};
  transition: height 250ms ease-in-out;
`;

export const CollapseContentInner = styled.div`
  padding: ${1.5 * unit}px;
`;

export const CollapseContent = ({ children, ...etc }: ICollapseContent) => (
  <CollapseContentOuter {...etc}>
    <CollapseContentInner>{children}</CollapseContentInner>
  </CollapseContentOuter>
);
