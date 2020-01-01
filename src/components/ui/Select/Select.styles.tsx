import styled from 'styled-components';
import { unit } from '../../../constants';
import { ColorTheme } from '../../../theme';

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export interface ISelectOptionsProps {
  colorTheme: ColorTheme;
  visible: boolean;
}

export const SelectOptions = styled.div`
  position: fixed;
  width: 100%;
  min-width: 75px;
  z-index: 1000;
  max-height: ${(props: ISelectOptionsProps) =>
    props.visible ? '1000px' : '0px'};
  overflow: hidden;
  border-radius: ${unit * 0.5}px;
  margin-top: ${unit}px;
  background-color: ${(props: ISelectOptionsProps) =>
    props.colorTheme.components.select.options.backgroundColor};
  opacity: ${(props: ISelectOptionsProps) => (props.visible ? '1' : '0')};
  transition: height 250ms ease-in-out, opacity 250ms ease-in-out;
  box-shadow: 1px 3px 5px
    ${(props: ISelectOptionsProps) =>
      props.colorTheme.components.card.border.shadowColor};
  border: 1px solid
    ${(props: { colorTheme: ColorTheme }) =>
      props.colorTheme.components.select.border.color};
`;

export interface ISelectCurrentSelection {
  colorTheme: ColorTheme;
}

export const SelectCurrentSelection = styled.div`
  border: 1px solid
    ${(props: ISelectCurrentSelection) =>
      props.colorTheme.components.select.border.color};
  padding: ${unit}px;
  border-radius: ${unit * 0.5}px;
  cursor: pointer;
  transition: border-color 250ms ease-in-out;

  &:hover {
    border-color: ${(props: ISelectCurrentSelection) =>
      props.colorTheme.components.select.border.hoverColor};
  }
`;
