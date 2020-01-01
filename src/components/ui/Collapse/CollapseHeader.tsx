import styled from 'styled-components';
import { ColorTheme } from '../../../theme';
import { unit } from '../../../constants';

export interface ICollapseHeaderProps {
  colorTheme: ColorTheme;
}

export const CollapseHeader = styled.div`
  box-shadow: 0px 1px 0px
    ${(props: ICollapseHeaderProps) =>
      props.colorTheme.components.card.header.border.color};
  padding: 0 ${1.5 * unit}px;
  overflow: auto;
  cursor: pointer;

  &:hover {
    background-color: ${(props: ICollapseHeaderProps) =>
      props.colorTheme.components.select.option.hoverBackgroundColor};
  }
`;
