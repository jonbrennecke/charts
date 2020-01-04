import React from 'react';
import styled from 'styled-components';
import noop from 'lodash/noop';
import { ColorTheme, colorThemes } from '../../../theme';
import { unit } from '../../../constants';
import { Text, ITextProps } from '../../text';

type ReactChild = React.ReactElement | React.ReactNode;

export interface IListItemTextProps {
  children?: ITextProps['children'];
  colorTheme?: ColorTheme;
  selected?: boolean;
  onClick?(): void;
}

export interface IListItemTextContainerProps {
  selected: boolean;
  colorTheme: ColorTheme;
}

const ListItemTextContainer = styled.div`
  cursor: pointer;
  background-color: ${(props: IListItemTextContainerProps) =>
    props.selected
      ? props.colorTheme.components.list.item.selectedBackgroundColor
      : 'transparent'};

  & > span {
    display: block;
    padding: ${unit}px;
    border-radius: 2px;
    color: ${(props: IListItemTextContainerProps) =>
      props.selected
        ? props.colorTheme.components.list.item.selectedColor
        : props.colorTheme.components.text.base.color};
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    & > span {
      color: ${(props: IListItemTextContainerProps) =>
        props.colorTheme.components.list.item.hoverColor};
    }
  }
`;

export const ListItemText = ({
  children,
  selected = false,
  onClick = noop,
  colorTheme = colorThemes.light,
}: IListItemTextProps) => (
  <ListItemTextContainer
    data-test="list-item"
    colorTheme={colorTheme}
    onClick={onClick}
    selected={selected}
    aria-selected={selected}
  >
    <Text colorTheme={colorTheme}>{children}</Text>
  </ListItemTextContainer>
);
