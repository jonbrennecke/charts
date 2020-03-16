import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Tooltip', () => (
    <>
      <Tooltip
        point={{ x: 200, y: 100 }}
        value="5.4321"
        category="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        color="#ff00ff"
      />
      <Tooltip
        point={{ x: 200, y: 200 }}
        value="5.4321"
        category="Lorem ipsum"
        color="#ff00ff"
      />
    </>
  ));
