import React from 'react';
import { List } from 'immutable';
import { Link, LinkProps } from 'react-router-dom';

import { Text } from '../../text';
import { BreadcrumbsContainer } from './BreadcrumbsContainer';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import { ColorTheme, colorThemes } from '../../../theme';

export interface IBreadcrumbRoute {
  displayName: string;
  linkProps: LinkProps;
}

export interface IBreadcrumbs {
  route: List<IBreadcrumbRoute>;
  colorTheme?: ColorTheme;
}

export const Breadcrumbs = ({
  route,
  colorTheme = colorThemes.light,
}: IBreadcrumbs) => (
  <BreadcrumbsContainer data-test="breadcrumbs" colorTheme={colorTheme}>
    {route
      .map((route, i) => (
        <Link
          {...route.linkProps}
          data-test="breadcrumb"
          key={`${route.displayName}-${i}`}
        >
          <Text>{route.displayName}</Text>
        </Link>
      ))
      .reduce(
        (list, value, i) =>
          list.concat([
            value,
            <BreadcrumbSeparator
              data-test="separator"
              key={`separator-${i}`}
              colorTheme={colorTheme}
            >
              <Text>/</Text>
            </BreadcrumbSeparator>,
          ]),
        List()
      )
      .pop()}
  </BreadcrumbsContainer>
);
