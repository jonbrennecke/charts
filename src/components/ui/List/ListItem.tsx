import React from 'react';
import styled from 'styled-components';
import { ITextProps, Text } from '../../text';
import { ColorTheme, colorThemes } from '../../../theme';
import { unit } from '../../../constants';
import noop from 'lodash/noop';

export interface IListItemProps {
  children?: ITextProps['children'];
  colorTheme?: ColorTheme;
  selected?: boolean;
  onClick?(): void;
}

export interface IListItemContainerProps {
  selected: boolean;
  colorTheme: ColorTheme;
}

const ListItemContainer = styled.div`
  padding: ${unit}px;
  cursor: pointer;
  border-radius: 2px;

  span {
    color: ${(props: IListItemContainerProps) =>
      props.selected
        ? props.colorTheme.components.list.item.selectedColor
        : props.colorTheme.components.text.base.color};
  }

  &:hover {
    background-color: ${(props: IListItemContainerProps) =>
      props.colorTheme.components.list.item.hoverBackgroundColor};

    span {
      color: ${(props: IListItemContainerProps) =>
        props.colorTheme.components.list.item.hoverColor};
    }
  }
`;

export const ListItem = ({
  children,
  selected = false,
  onClick = noop,
  colorTheme = colorThemes.light,
}: IListItemProps) => (
  <ListItemContainer
    data-test="list-item"
    colorTheme={colorTheme}
    onClick={onClick}
    selected={selected}
  >
    <Text>{children}</Text>
  </ListItemContainer>
);
