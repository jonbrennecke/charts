import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Heading } from './Heading';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Heading', () => <Heading>Lorem ipsum dolor sit amet</Heading>);
