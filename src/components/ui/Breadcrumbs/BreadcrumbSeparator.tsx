import styled from 'styled-components';
import { unit } from '../../../constants';
import { ColorTheme } from '../../../theme';

export interface IBreadcrumbSeparatorProps {
  colorTheme: ColorTheme;
}

export const BreadcrumbSeparator = styled.div`
  margin: 0 ${unit}px;

  span {
    color: ${(props: IBreadcrumbSeparatorProps) =>
      props.colorTheme.components.text.link.color};
  }
`;
