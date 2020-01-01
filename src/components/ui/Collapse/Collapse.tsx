import React from 'react';
import noop from 'lodash/noop';
import { IHeadingProps, Heading } from '../../text';
import { CollapseContainer } from './CollapseContainer';
import { CollapseHeader } from './CollapseHeader';
import { CollapseContent } from './CollapseContent';
import { ColorTheme, colorThemes } from '../../../theme';

type ReactChild = React.ReactElement | React.ReactNode;

export interface ICollapse {
  heading?: IHeadingProps['children'];
  children?: ReactChild | ReactChild[];
  colorTheme?: ColorTheme;
  collapsed?: boolean;
  onClickHeader?(): void;
}

export const Collapse = ({
  heading,
  children,
  collapsed = false,
  colorTheme = colorThemes.light,
  onClickHeader = noop,
}: ICollapse) => (
  <CollapseContainer data-test="collapse" colorTheme={colorTheme}>
    <CollapseHeader
      data-test="collapse-header"
      colorTheme={colorTheme}
      role="button"
      aria-pressed={collapsed}
      onClick={onClickHeader}
    >
      <Heading colorTheme={colorTheme}>{heading}</Heading>
    </CollapseHeader>
    <CollapseContent data-test="collapse-content" collapsed={collapsed}>
      {children}
    </CollapseContent>
  </CollapseContainer>
);
