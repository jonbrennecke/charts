import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Placeholder } from './Placeholder';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Placeholder', () => (
    <Placeholder>Lorem ipsum dolor sit amet</Placeholder>
  ));
