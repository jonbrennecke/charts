import styled from 'styled-components';
import { ColorTheme } from '../../../theme';

export interface ICollapseContainerProps {
  colorTheme: ColorTheme;
}

export const CollapseContainer = styled.div`
  border-radius: 2px;
  border: 1px solid
    ${(props: ICollapseContainerProps) =>
      props.colorTheme.components.card.header.border.color};
`;
