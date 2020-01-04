import React from 'react';
import { Map } from 'immutable';
import styled from 'styled-components';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import { ListItem } from './ListItem';
import { ListItemText } from './ListItemText';
import { ColorTheme, colorThemes } from '../../../theme';
import { unit } from '../../../constants';

export interface IListItem<K extends any = string> {
  label: string;
  items?: Map<K, IListItem<K>>;
}

export interface IListProps<K extends any = string> {
  items?: Map<K, IListItem<K>>;
  selected?: K[];
  colorTheme?: ColorTheme;
  onSelectItem?(keyPath: K[], item: IListItem<K>): void;
}

const ListContainer = styled.div`
  max-height: 100%;
  overflow-y: scroll;
`;

const NestedListContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: ${(props: { nested: boolean }) =>
    props.nested ? unit * 3 : 0}px;
`;

const mapListItems = <K extends any = string>(
  items: Map<K, IListItem<K>>,
  render: (key: K, item: IListItem<K>) => JSX.Element
) =>
  items
    .mapEntries(([key, item]) => [key, render(key, item)])
    .valueSeq()
    .toArray();

const renderListItems = <K extends any = string>(
  items: Map<K, IListItem<K>>,
  selected: K[],
  depth: number = 0,
  colorTheme: ColorTheme,
  keyPath: K[],
  onSelectItem: (keyPath: K[], item: IListItem<K>) => void
) => (
  <NestedListContainer nested={depth > 0}>
    {mapListItems(items, (key, item) => (
      <ListItem key={key}>
        <ListItemText
          colorTheme={colorTheme}
          selected={isEqual([...keyPath, key], selected)}
          onClick={() => onSelectItem([...keyPath, key], item)}
        >
          {item.label}
        </ListItemText>
        {item.items &&
          item.items.size &&
          renderListItems(
            item.items,
            selected,
            depth + 1,
            colorTheme,
            [...keyPath, key],
            onSelectItem
          )}
      </ListItem>
    ))}
  </NestedListContainer>
);

export const List = ({
  items = Map(),
  selected = [],
  colorTheme = colorThemes.light,
  onSelectItem = noop,
}: IListProps) => (
  <ListContainer data-test="list">
    {renderListItems(items, selected, 0, colorTheme, [], onSelectItem)}
  </ListContainer>
);
