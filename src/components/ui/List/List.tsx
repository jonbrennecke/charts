import React from 'react';
import { IListItemProps } from './ListItem';
import styled from 'styled-components';

export interface IListProps {
  children?:
    | React.ReactElement<IListItemProps>
    | React.ReactElement<IListItemProps>[];
}

const ListContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;
`;

export const List = ({ children }: IListProps) => (
  <ListContainer data-test="list">{children}</ListContainer>
);
