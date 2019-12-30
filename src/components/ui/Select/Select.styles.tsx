import styled from 'styled-components';
import { unit } from '../../../constants';
import { ColorTheme } from '../../../theme';

export interface ISelectOptionsProps {
  colorTheme: ColorTheme;
  visible: boolean;
}

export const SelectOptions = styled.div`
  max-height: ${(props: ISelectOptionsProps) =>
    props.visible ? '1000px' : '0px'};
  overflow: hidden;
  border-radius: ${unit * 0.5}px;
  margin-top: ${unit}px;
  opacity: ${(props: ISelectOptionsProps) => (props.visible ? '1' : '0')};
  transition: height 250ms ease-in-out, opacity 250ms ease-in-out;
  box-shadow: 1px 3px 5px
    ${(props: ISelectOptionsProps) =>
      props.colorTheme.components.card.border.shadowColor};
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.color};
`;

export const SelectCurrentSelection = styled.div`
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.color};
  padding: ${unit}px;
  border-radius: ${unit * 0.5}px;
  cursor: pointer;
  transition: border-color 250ms ease-in-out;

  &:hover {
    border-color: ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.hoverColor};
  }
`;
