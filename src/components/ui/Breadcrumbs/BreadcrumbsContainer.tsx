import styled from 'styled-components';
import { ColorTheme } from '../../../theme';

export interface IBreadcrumbsContainerProps {
  colorTheme: ColorTheme;
}

export const BreadcrumbsContainer = styled.div`
  display: flex;
  flex-direction: row;

  a {
    text-decoration: none;

    span {
      color: ${(props: IBreadcrumbsContainerProps) =>
        props.colorTheme.components.text.link.color};
    }

    &:hover span {
      color: ${(props: IBreadcrumbsContainerProps) =>
        props.colorTheme.components.text.link.hoverColor};
    }

    &:active span {
      color: ${(props: IBreadcrumbsContainerProps) =>
        props.colorTheme.components.text.link.activeColor};
    }

    &:last-of-type span {
      color: ${(props: IBreadcrumbsContainerProps) =>
        props.colorTheme.components.text.link.activeColor};
      font-weight: bold;
    }
  }
`;
