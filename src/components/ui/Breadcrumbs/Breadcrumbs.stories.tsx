import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter as Router } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { List } from 'immutable';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Router>{story()}</Router>)
  .add('Breadcrumbs', () => (
    <Breadcrumbs
      route={List([
        {
          displayName: 'Home',
          linkProps: {
            to: '/',
          },
        },
        {
          displayName: 'Nested Page',
          linkProps: {
            to: '/',
          },
        },
        {
          displayName: 'Another Nested Page',
          linkProps: {
            to: '/',
          },
        },
        {
          displayName: 'Last Nested Page',
          linkProps: {
            to: '/',
          },
        },
      ])}
    />
  ));
