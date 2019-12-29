import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Text } from './Text';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Text', () => <Text>Lorem ipsum dolor sit amet</Text>);
