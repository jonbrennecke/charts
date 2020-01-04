import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IListItemProps {
  children?: ReactChild | ReactChild[];
}

const ListItemContainer = styled.li`
  display: block;
  cursor: pointer;
`;

export const ListItem = ({ children }: IListItemProps) => (
  <ListItemContainer data-test="list-item">{children}</ListItemContainer>
);
